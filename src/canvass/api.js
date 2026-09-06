/* ============================================================================
   api.js — THE DATA LAYER. This is the file your backend engineer replaces.

   Everything the UI needs goes through `API`. Right now:
     • READS  are live — straight from Google My Maps + York Region Open Data.
     • WRITES go to localStorage, so the prototype works with no server.

   To go to production, keep these signatures and swap the bodies for fetch()
   calls to your API. Nothing in app.js needs to change. See BACKEND-PROPOSAL.md.
   ========================================================================== */

const YORK_URL =
  'https://ww8.yorkmaps.ca/arcgis/rest/services/OpenData/Location/MapServer/0/query';
const MAP_ID = '1C7Iqd47oG8UA3mXrfYa0bs6ZwOo8DbY';

const norm = s => (s || '').replace(/ /g, ' ').trim();
const areaKey = a => `${a.hood}/${a.idx}`;          // names are NOT unique — key by folder+index

/* ---- reads ---------------------------------------------------------------- */

const memCache = new Map();

async function getAddresses(area) {
  const key = areaKey(area);
  if (memCache.has(key)) return memCache.get(key);

  const ls = localStorage.getItem('addr:' + key);
  if (ls) { const v = JSON.parse(ls); memCache.set(key, v); return v; }

  const body = new URLSearchParams({
    geometry: JSON.stringify({ rings: [area.ring], spatialReference: { wkid: 4326 } }),
    geometryType: 'esriGeometryPolygon',
    inSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: '*',
    returnGeometry: 'true',
    outSR: '4326',
    f: 'json',
    resultRecordCount: '2000',
  });

  const res = await fetch(YORK_URL, { method: 'POST', body });
  if (!res.ok) throw new Error('York Region service returned ' + res.status);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || 'query failed');

  // Guard the failure mode that reads as "no houses here" instead of "wrong region".
  if (!data.features || !data.features.length) {
    throw new Error(
      'No addresses returned. If this area is outside York Region ' +
      '(Markham, Vaughan, Richmond Hill, Newmarket, Aurora, King, ' +
      'East Gwillimbury, Georgina, Whitchurch-Stouffville) this layer ' +
      'cannot serve it and a different municipal source is required.');
  }
  if (data.exceededTransferLimit) {
    console.warn('[api] >2000 records in', key, '— production must page with resultOffset.');
  }

  const rows = data.features
    .filter(f => f.attributes.MAIL_STATUS !== 'N')   // exclude, never "keep V"
    .map(f => ({
      id: f.attributes.PNT_GIS_ID,
      num: f.attributes.ADDRESS_NUMBER,
      street: norm(f.attributes.FULL_STREET_NAME),
      full: norm(f.attributes.FULL_CIVIC_ADDR),
      unit: f.attributes.SUITE_NUMBER || null,
      postal: f.attributes.MAIL_POSTAL_CODE,
      lat: f.geometry && f.geometry.y,
      lon: f.geometry && f.geometry.x,
    }));

  const excluded = data.features.length - rows.length;
  const out = { rows, excluded, raw: data.features.length };
  memCache.set(key, out);
  try { localStorage.setItem('addr:' + key, JSON.stringify(out)); } catch (_) {}
  return out;
}

/* ---- writes — replace these with API calls -------------------------------- */

const LOG_KEY = 'canvass:log';     // { [addressId]: {type, knocked, at} }
const FLY_KEY = 'canvass:flyer';   // { [areaKey]: [streetName, ...] }

const readJSON = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; }
                             catch (_) { return d; } };
const writeJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); }
                              catch (_) {} };

/* ---- sync to Google Sheets ------------------------------------------------
   Events queue in localStorage and flush in batches. localStorage stays the
   source of truth for what the volunteer sees, so a failed sync never blanks
   their screen and nothing is ever dropped.                                  */

const Q_KEY  = 'canvass:queue';
const WHO_KEY = 'canvass:volunteer';
const CFG = (window.CONFIG || {});

const uuid = () => (crypto.randomUUID ? crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    }));

const listeners = new Set();
const syncState = { status: 'idle', pending: 0, lastError: null };
function notify() {
  syncState.pending = readJSON(Q_KEY, []).length;
  listeners.forEach(fn => { try { fn(syncState); } catch (_) {} });
}

function volunteer(name) {
  if (name !== undefined) { localStorage.setItem(WHO_KEY, name); return name; }
  return localStorage.getItem(WHO_KEY) || '';
}

function enqueue(ev) {
  const q = readJSON(Q_KEY, []);
  q.push({ ...ev, eventId: uuid(), at: Date.now(), volunteer: volunteer() });
  writeJSON(Q_KEY, q);
  notify();
  scheduleFlush();
}

let flushTimer = null, backoff = 2000, flushing = false;
function scheduleFlush(delay = 1200) {
  clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, delay);
}

async function flush() {
  if (flushing) return;
  const q = readJSON(Q_KEY, []);
  if (!q.length) { syncState.status = 'idle'; notify(); return; }
  if (!CFG.SCRIPT_URL) { syncState.status = 'local'; notify(); return; }
  if (!navigator.onLine) { syncState.status = 'offline'; notify(); scheduleFlush(5000); return; }

  flushing = true;
  syncState.status = 'syncing'; notify();
  const batch = q.slice(0, 100);
  try {
    // NO headers object and NO Content-Type. A string body defaults to
    // text/plain, which is a "simple request" and skips CORS preflight.
    // Apps Script never answers preflight, so adding either one breaks this
    // call with an opaque CORS error. See apps-script/Code.gs.
    const res = await fetch(CFG.SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ token: CFG.TOKEN, events: batch }),
    });
    const out = await res.json();
    if (!out.ok) throw new Error(out.error || 'rejected');

    const ids = new Set(batch.map(e => e.eventId));
    writeJSON(Q_KEY, readJSON(Q_KEY, []).filter(e => !ids.has(e.eventId)));
    backoff = 2000;
    syncState.status = 'idle'; syncState.lastError = null;
    flushing = false; notify();
    if (readJSON(Q_KEY, []).length) scheduleFlush(300);
  } catch (err) {
    // Never drop the queue — retry with backoff.
    syncState.status = 'error'; syncState.lastError = String(err.message || err);
    flushing = false; notify();
    backoff = Math.min(backoff * 2, 60000);
    scheduleFlush(backoff);
  }
}

addEventListener('online', () => { backoff = 2000; scheduleFlush(400); });
addEventListener('offline', () => { syncState.status = 'offline'; notify(); });

const API = {
  areaKey,
  getAreas: () => {
    const allow = CFG.NEIGHBOURHOODS;
    return (!allow || !allow.length) ? window.AREAS
      : window.AREAS.filter(a => allow.indexOf(a.hood) !== -1);
  },
  getNeighbourhoods() {
    const m = new Map();
    API.getAreas().forEach(a => {
      if (!m.has(a.hood)) m.set(a.hood, []);
      m.get(a.hood).push(a);
    });
    return [...m.entries()];
  },
  getAddresses,

  getLog: () => readJSON(LOG_KEY, {}),
  setDoor(id, patch, meta) {
    const log = readJSON(LOG_KEY, {});
    log[id] = { ...(log[id] || {}), ...patch, at: Date.now() };
    writeJSON(LOG_KEY, log);
    enqueue({ kind: 'door', addressId: id,
              knocked: log[id].knocked === true, type: log[id].type || '',
              ...(meta || {}) });
    return log[id];
  },

  getFlyer: () => readJSON(FLY_KEY, {}),
  setStreetFlyer(key, street, done, meta) {
    const f = readJSON(FLY_KEY, {});
    const cur = new Set(f[key] || []);
    done ? cur.add(street) : cur.delete(street);
    f[key] = [...cur];
    writeJSON(FLY_KEY, f);
    enqueue({ kind: 'flyer', street, knocked: done, type: '',
              addressId: '', ...(meta || {}) });
    return f[key];
  },

  /* sync surface used by the UI */
  volunteer,
  onSync(fn) { listeners.add(fn); fn(syncState); return () => listeners.delete(fn); },
  syncNow() { backoff = 2000; scheduleFlush(0); },
  syncState: () => ({ ...syncState }),
  queueLength: () => readJSON(Q_KEY, []).length,

  reset() { [LOG_KEY, FLY_KEY, Q_KEY].forEach(k => localStorage.removeItem(k)); notify(); },
};

window.API = API;
notify();
scheduleFlush(1500);   // flush anything left over from a previous session
