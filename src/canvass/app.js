/* app.js — UI only. All data access goes through window.API (see api.js). */

const $  = (s, r = document) => r.querySelector(s);
const el = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstElementChild; };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const app = $('#app');
// CFG is declared in api.js (classic scripts share one global scope).

const TYPES = [
  { k:'V', label:'VIP',        long:'VIP' },
  { k:'Y', label:'Supporter',  long:'Supporter' },
  { k:'S', label:'Swing',      long:'Swing voter' },
  { k:'U', label:'Uncertain',  long:'Uncertain / unaware' },
  { k:'N', label:'Competitor', long:'Competitor voter' },
];
const TYPE_COLOR = { V:'var(--brand)', Y:'var(--st-green)', S:'var(--st-orange)',
                     U:'var(--st-yellow)', N:'var(--st-red)' };

const state = { screen:'landing', role:null, hood:null, area:null, q:'' };
const rules = { mode:'majority', minResp:30, minCov:0.10 };

/* ---------------- demo activity -------------------------------------------
   The prototype ships with illustrative activity so the dashboard isn't blank.
   Real logging (localStorage) is layered on top and always wins.
   Delete seedDemo() once the backend is live.                                */
function hash(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return (h>>>0); }
const PROFILES = [
  { cov:.42, d:{V:.12,Y:.46,S:.16,U:.18,N:.08} },  // green
  { cov:.36, d:{V:.02,Y:.13,S:.56,U:.18,N:.11} },  // orange
  { cov:.31, d:{V:.01,Y:.11,S:.15,U:.58,N:.15} },  // yellow
  { cov:.28, d:{V:.01,Y:.08,S:.14,U:.14,N:.63} },  // red
  { cov:.34, d:{V:.05,Y:.28,S:.26,U:.24,N:.17} },  // no majority -> grey
  { cov:.05, d:{V:.06,Y:.34,S:.22,U:.24,N:.14} },  // too little   -> grey
  { cov:0,   d:{V:0,Y:0,S:0,U:0,N:0} },            // untouched    -> grey
];
function demoFor(a){
  const p = PROFILES[hash(API.areaKey(a)) % PROFILES.length];
  const knocked = Math.round(a.doors * p.cov);
  const c = { V:0,Y:0,S:0,U:0,N:0 };
  let left = knocked;
  TYPES.forEach((t,i) => {
    const n = i === TYPES.length-1 ? left : Math.round(knocked * p.d[t.k]);
    c[t.k] = Math.max(0, Math.min(left, n)); left -= c[t.k];
  });
  const flyerStreets = Math.round(a.streets * Math.min(1, p.cov + .3));
  return { knocked, counts:c, flyerStreets };
}

/* ---------------- aggregation --------------------------------------------- */
function aggregate(a){
  const d = demoFor(a);
  const counts = { ...d.counts };
  let knocked = d.knocked;
  const log = API.getLog();
  const key = API.areaKey(a);
  // real logged doors override the demo baseline
  let real = 0;
  for (const id in log){
    const e = log[id];
    if (e.areaKey !== key) continue;
    real++;
    if (e.type) counts[e.type] = (counts[e.type]||0) + 1;
  }
  if (real) knocked += real;
  const resp = TYPES.reduce((s,t)=>s+counts[t.k],0);
  const flyer = (API.getFlyer()[key]||[]).length || d.flyerStreets;
  return { counts, knocked:Math.min(knocked,a.doors), resp,
           cov:a.doors? Math.min(knocked,a.doors)/a.doors : 0,
           flyerStreets:Math.min(flyer,a.streets) };
}
function classify(a, agg){
  if (agg.resp < rules.minResp || agg.cov < rules.minCov)
    return { c:'grey', why:`Not enough data — ${agg.resp} responses, ${Math.round(agg.cov*100)}% knocked` };
  const c = agg.counts, half = agg.resp/2;
  const friendly = c.V + c.Y;
  if (rules.mode === 'majority'){
    if (friendly > half) return { c:'green',  why:`VIP + Supporter majority (${pc(friendly,agg.resp)})` };
    if (c.S > half)      return { c:'orange', why:`Swing majority (${pc(c.S,agg.resp)})` };
    if (c.U > half)      return { c:'yellow', why:`Uncertain majority (${pc(c.U,agg.resp)})` };
    if (c.N > half)      return { c:'red',    why:`Competitor majority (${pc(c.N,agg.resp)})` };
    return { c:'grey', why:'No group above 50% — mixed area' };
  }
  const rank = [['green',friendly],['orange',c.S],['yellow',c.U],['red',c.N]]
    .sort((x,y)=>y[1]-x[1]);
  if (!rank[0][1]) return { c:'grey', why:'No responses' };
  return { c:rank[0][0], why:`Largest group ${pc(rank[0][1],agg.resp)}` };
}
const pc = (n,d) => d ? Math.round(n/d*100)+'%' : '0%';
const COLORVAR = { green:'--st-green', orange:'--st-orange', yellow:'--st-yellow',
                   red:'--st-red', grey:'--st-grey' };

/* ---------------- chrome --------------------------------------------------- */
function topbar(title, sub, onBack){
  const b = el(`<div class="topbar">
      ${onBack ? '<button class="back" aria-label="Back">‹</button>' : ''}
      <h1>${esc(title)}${sub?`<div class="sub">${esc(sub)}</div>`:''}</h1>
      <span class="chip" id="chip"></span>
    </div>`);
  if (onBack) b.querySelector('.back').onclick = onBack;
  return b;
}

/* One live subscription for the life of the page; the chip is re-found on each
   render because render() replaces the DOM. */
API.onSync(st => {
  const c = document.getElementById('chip');
  if (c) {
    const n = st.pending;
    if (!CFG.SCRIPT_URL)          { c.textContent = 'On device'; c.dataset.s = 'local'; }
    else if (st.status==='offline'){ c.textContent = n ? n+' waiting' : 'Offline'; c.dataset.s='off'; }
    else if (n)                    { c.textContent = n + ' waiting'; c.dataset.s = 'wait'; }
    else                           { c.textContent = 'Synced';       c.dataset.s = 'ok'; }
  }
  const card = document.getElementById('synccard');
  if (card) paintSyncCard();
});
function render(nodes){ app.innerHTML=''; nodes.filter(Boolean).forEach(n=>app.appendChild(n)); }
function go(screen, patch={}){ Object.assign(state, patch, {screen, q:''}); draw(); window.scrollTo(0,0); }

/* ---------------- screens -------------------------------------------------- */
function landing(){
  document.body.classList.remove('wide');
  render([
    el(`<div class="ticker">Vote 4 Yu &middot; Vote 4 Yu &middot; Vote 4 Yu</div>`),
    el(`<div class="wrap" style="padding-top:32px">
        <div class="logo" style="margin-bottom:6px">VOTE 4 <em>YU</em></div>
        <div style="color:var(--ink-500);font-size:14px;margin-bottom:8px">
          Canvassing &middot; Markham Ward 2</div>
        <div id="who" style="font-size:13px;color:var(--ink-600);margin-bottom:22px"></div>
        <button class="btn" id="b1">Flyer drop</button>
        <div class="hint">Tick off whole streets as you deliver.</div>
        <button class="btn accent" id="b2">Door knocking</button>
        <div class="hint">Log each door and who you spoke to.</div>
        <button class="btn ghost" id="b3">Dashboard</button>
        <div id="synccard"></div>
      </div>`)
  ]);
  paintWho();
  $('#b1').onclick = () => go('hoods',{role:'vol'});
  $('#b2').onclick = () => go('hoods',{role:'dave'});
  $('#b3').onclick = () => go('dash',{role:'dash'});
  paintSyncCard();
}

function paintWho(){
  const box = $('#who'); if (!box) return;
  const name = API.volunteer();
  box.innerHTML = name
    ? `Signed in as <b>${esc(name)}</b> &middot; <a href="#" id="chg">change</a>`
    : `<a href="#" id="chg">Add your name</a> so your work is credited`;
  const a = $('#chg');
  if (a) a.onclick = (e) => { e.preventDefault(); askName(true); };
}

function askName(force){
  if (!CFG.ASK_NAME) return;
  if (!force && API.volunteer()) return;
  const v = prompt('Your name (so your logged doors are credited to you):',
                   API.volunteer() || '');
  if (v !== null) { API.volunteer(v.trim()); paintWho(); }
}

function paintSyncCard(){
  const box = $('#synccard'); if (!box) return;
  const st = API.syncState(), n = API.queueLength();
  if (!CFG.SCRIPT_URL){
    box.innerHTML = `<div class="note" style="margin-top:22px">
      <b>Saving on this phone only.</b> No sync destination is set up yet, so nothing
      is sent anywhere. Use <b>Export walklist</b> at the end of your shift.</div>`;
    return;
  }
  if (n){
    box.innerHTML = `<div class="note warn" style="margin-top:22px">
      <b>${n} change${n>1?'s':''} waiting to send.</b>
      ${st.status==='offline' ? 'You are offline — they will send automatically when you have signal.'
        : 'Sending…'} Nothing is lost if you close the page.</div>`;
  } else {
    box.innerHTML = `<div class="note" style="margin-top:22px">
      <b>Everything sent.</b> Your logged doors are saved to the campaign sheet.</div>`;
  }
}

function hoods(){
  document.body.classList.remove('wide');
  const isDave = state.role === 'dave';
  const groups = API.getNeighbourhoods();
  const list = groups.map(([hood, areas]) => {
    const doors = areas.reduce((s,a)=>s+a.doors,0);
    return `<button class="row" data-h="${esc(hood)}">
      <div class="rt"><div>
        <div class="nm">${esc(hood)}</div>
        <div class="meta">${areas.length} areas · ${doors.toLocaleString()} doors</div>
      </div><span class="chev">›</span></div></button>`;
  }).join('');
  render([
    topbar('Choose a neighbourhood', isDave?'Door knocking':'Flyer drop', ()=>go('landing')),
    el(`<div class="wrap">${list}</div>`)
  ]);
  app.querySelectorAll('.row').forEach(b =>
    b.onclick = () => go('areas',{hood:b.dataset.h}));
}

function areas(){
  const isDave = state.role === 'dave';
  const list = API.getAreas().filter(a => a.hood === state.hood);
  const rows = list.map(a => {
    const agg = aggregate(a);
    const flyPc = a.streets ? Math.round(agg.flyerStreets/a.streets*100) : 0;
    const cls = classify(a, agg);
    return `<button class="row" data-k="${esc(API.areaKey(a))}">
      <div class="rt"><div style="flex:1;min-width:0">
        <div class="nm">${esc(a.name)}
          ${isDave?`<span class="swatch" style="background:var(${COLORVAR[cls.c]})"></span>`:''}
        </div>
        <div class="meta">${a.doors.toLocaleString()} doors · ${a.streets} streets</div>
      </div><span class="chev">›</span></div>
      <div class="bar flyer"><i style="width:${flyPc}%"></i></div>
      <div class="plabel"><span>Flyers: ${agg.flyerStreets}/${a.streets} streets</span>
        <span>${flyPc}%</span></div>
      ${isDave?`<div class="bar"><i style="width:${Math.round(agg.cov*100)}%"></i></div>
      <div class="plabel"><span>Knocked: ${agg.knocked.toLocaleString()}/${a.doors.toLocaleString()}</span>
        <span>${Math.round(agg.cov*100)}%</span></div>`:''}
    </button>`;
  }).join('');
  render([
    topbar(state.hood, isDave?'Dave':'Volunteer', ()=>go('hoods')),
    el(`<div class="wrap">${rows}</div>`)
  ]);
  app.querySelectorAll('.row').forEach(b => b.onclick = () => {
    const a = API.getAreas().find(x => API.areaKey(x) === b.dataset.k);
    go('area',{area:a});
  });
}

function areaScreen(){
  const a = state.area, isDave = state.role === 'dave';
  render([
    topbar(`${state.hood} · ${a.name}`, isDave?'Door knocking':'Flyer drop', ()=>go('areas')),
    el(`<div class="wrap">
        <div id="map"></div>
        <div class="toolrow">
          <button class="btn sm ghost" id="exp">Export walklist</button>
          ${isDave?'<input class="search" id="q" placeholder="Find an address…">':''}
        </div>
        <div id="body"><div class="spin">Loading addresses from York Region…</div></div>
      </div>`)
  ]);
  drawMap(a);
  $('#exp').onclick = () => exportCsv(a);

  API.getAddresses(a).then(res => {
    state.rows = res.rows;
    if ($('#q')) $('#q').oninput = e => { state.q = e.target.value.toLowerCase(); paintBody(); };
    paintBody(res);
  }).catch(err => {
    $('#body').innerHTML =
      `<div class="note err"><b>Could not load addresses.</b> ${esc(err.message)}</div>`;
  });
}

function byStreet(rows){
  const m = new Map();
  rows.forEach(r => { if (!m.has(r.street)) m.set(r.street, []); m.get(r.street).push(r); });
  return [...m.entries()].sort((x,y)=>x[0].localeCompare(y[0]))
    .map(([name, list]) => [name, list.sort((p,q)=>(+p.num||0)-(+q.num||0))]);
}

function paintBody(res){
  const a = state.area, key = API.areaKey(a);
  const groups = byStreet(state.rows);
  const body = $('#body');
  if (state.role === 'vol'){
    const done = new Set(API.getFlyer()[key] || []);
    body.innerHTML =
      (res && res.excluded ? `<div class="note warn"><b>${res.excluded} address${res.excluded>1?'es':''} hidden.</b>
         Assigned but not yet occupied — no one lives there yet.</div>` : '') +
      `<div class="stgroup">Streets in this area <span class="n">${done.size}/${groups.length} done</span></div>` +
      groups.map(([st, list]) => `
        <div class="item ${done.has(st)?'done':''}" data-st="${esc(st)}">
          <button class="tick" aria-pressed="${done.has(st)}">${done.has(st)?'✓':''}</button>
          <div class="lbl">${esc(st)}<div class="sm">${list.length} doors</div></div>
        </div>`).join('') +
      `<button class="btn accent" id="done" style="margin-top:18px">Done</button>`;
    body.querySelectorAll('.item').forEach(it => it.onclick = () => {
      const st = it.dataset.st, now = !it.classList.contains('done');
      API.setStreetFlyer(key, st, now, { hood: a.hood, area: a.name });
      paintBody();
    });
    $('#done').onclick = () => go('areas');
  } else {
    const log = API.getLog();
    const q = state.q;
    let shown = 0;
    const html = groups.map(([st, list]) => {
      const vis = list.filter(r => !q || r.full.toLowerCase().includes(q));
      if (!vis.length) return '';
      shown += vis.length;
      const knocked = vis.filter(r => log[r.id] && log[r.id].knocked).length;
      return `<div class="stgroup">${esc(st)}<span class="n">${knocked}/${vis.length} knocked</span></div>` +
        vis.map(r => {
          const e = log[r.id] || {};
          return `<div class="addr" data-id="${r.id}">
            <div class="hd">
              <button class="tick" aria-pressed="${!!e.knocked}"
                style="${e.knocked?'background:var(--st-green);border-color:var(--st-green)':''}">
                ${e.knocked?'✓':''}</button>
              <div class="lbl">${esc(r.num)} ${esc(r.street)}
                <div class="sm">${esc(r.postal||'')}</div></div>
            </div>
            <div class="types">${TYPES.map(t =>
              `<button class="tp" data-t="${t.k}" title="${t.long}"
                 aria-pressed="${e.type===t.k}">${t.k}</button>`).join('')}</div>
          </div>`;
        }).join('');
    }).join('');
    body.innerHTML =
      (res && res.excluded ? `<div class="note warn"><b>${res.excluded} unoccupied address${res.excluded>1?'es':''} hidden.</b>
         Assigned but not yet lived in.</div>` : '') +
      (shown ? html : '<div class="spin">No address matches that search.</div>');
    body.querySelectorAll('.addr').forEach(card => {
      const id = card.dataset.id;
      const row = (state.rows||[]).find(r => String(r.id) === String(id)) || {};
      const meta = { hood: state.area.hood, area: state.area.name,
                     street: row.street, number: row.num };
      card.querySelector('.tick').onclick = () => {
        const cur = (API.getLog()[id]||{}).knocked;
        API.setDoor(id, { knocked: !cur, areaKey: API.areaKey(state.area) }, meta);
        paintBody();
      };
      card.querySelectorAll('.tp').forEach(btn => btn.onclick = () => {
        const cur = (API.getLog()[id]||{}).type;
        API.setDoor(id, { type: cur === btn.dataset.t ? null : btn.dataset.t,
                          knocked: true, areaKey: API.areaKey(state.area) }, meta);
        paintBody();
      });
    });
  }
}

let mapObj = null;
function drawMap(a){
  if (mapObj) { mapObj.remove(); mapObj = null; }
  mapObj = L.map('map', { scrollWheelZoom:false });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom:19, attribution:'© OpenStreetMap' }).addTo(mapObj);
  const latlngs = a.ring.map(p => [p[1], p[0]]);
  const poly = L.polygon(latlngs, { color:'#ec078d', weight:3, fillOpacity:.08 }).addTo(mapObj);
  mapObj.fitBounds(poly.getBounds(), { padding:[16,16] });
  setTimeout(()=>mapObj.invalidateSize(), 60);
}

function exportCsv(a){
  const rows = state.rows || [];
  const log = API.getLog();
  const head = 'house_number,street,postal_code,knocked,voter_type,latitude,longitude\n';
  const body = rows.map(r => {
    const e = log[r.id] || {};
    return [r.num, r.street, r.postal||'', e.knocked?'yes':'no', e.type||'',
            r.lat||'', r.lon||''].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',');
  }).join('\n');
  const blob = new Blob([head+body], { type:'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `walklist-${a.hood}-${a.name}`.replace(/\s+/g,'-').toLowerCase()+'.csv';
  link.click();
  setTimeout(()=>URL.revokeObjectURL(link.href), 1000);
}

/* ---------------- dashboard ------------------------------------------------ */
function dashboard(){
  document.body.classList.add('wide');
  const all = API.getAreas();
  const tot = { doors:0, knocked:0, resp:0, V:0,Y:0,S:0,U:0,N:0, flyer:0, streets:0 };
  const rowsByHood = new Map();
  all.forEach(a => {
    const agg = aggregate(a), cls = classify(a, agg);
    tot.doors += a.doors; tot.knocked += agg.knocked; tot.resp += agg.resp;
    tot.flyer += agg.flyerStreets; tot.streets += a.streets;
    TYPES.forEach(t => tot[t.k] += agg.counts[t.k]);
    if (!rowsByHood.has(a.hood)) rowsByHood.set(a.hood, []);
    rowsByHood.get(a.hood).push({ a, agg, cls });
  });

  const mix = (c, resp) => resp ? TYPES.map(t =>
    `<span style="width:${c[t.k]/resp*100}%;background:${TYPE_COLOR[t.k]}"
       title="${t.long}: ${c[t.k]}"></span>`).join('') : '';

  const hoodCards = [...rowsByHood.entries()].map(([hood, list]) => {
    const doors = list.reduce((s,r)=>s+r.a.doors,0);
    const knock = list.reduce((s,r)=>s+r.agg.knocked,0);
    const c = { V:0,Y:0,S:0,U:0,N:0 };
    list.forEach(r => TYPES.forEach(t => c[t.k] += r.agg.counts[t.k]));
    const resp = TYPES.reduce((s,t)=>s+c[t.k],0);
    const hAgg = { counts:c, resp, cov: doors?knock/doors:0, knocked:knock };
    const hCls = classify({ doors }, hAgg);
    return `<div class="hoodcard">
      <div class="hh" style="border-left-color:var(${COLORVAR[hCls.c]})">
        <div><div class="t">${esc(hood)}</div>
          <div style="font-size:12px;color:var(--ink-500)">${hCls.why}</div></div>
        <div style="text-align:right">
          <div style="font-family:var(--font-display);font-weight:800;font-size:20px">
            ${Math.round(hAgg.cov*100)}%</div>
          <div style="font-size:11px;color:var(--ink-500)">knocked</div></div>
      </div>
      <div class="scroll"><table class="areatable">
        <tr><th>Area</th><th>Doors</th><th>Knocked</th><th>Flyers</th>
            <th>Responses</th><th style="width:130px">Mix</th><th>Read</th></tr>
        ${list.map(({a,agg,cls}) => `<tr>
          <td><span class="swatch" style="background:var(${COLORVAR[cls.c]})"></span>${esc(a.name)}</td>
          <td>${a.doors.toLocaleString()}</td>
          <td>${Math.round(agg.cov*100)}%</td>
          <td>${a.streets?Math.round(agg.flyerStreets/a.streets*100):0}%</td>
          <td>${agg.resp}</td>
          <td><div class="mixbar">${mix(agg.counts, agg.resp)}</div></td>
          <td style="font-size:12px;color:var(--ink-500)">${esc(cls.why)}</td>
        </tr>`).join('')}
      </table></div></div>`;
  }).join('');

  render([
    topbar('Campaign dashboard', 'All neighbourhoods', ()=>go('landing')),
    el(`<div class="dash">
      <div class="mobonly note warn"><b>Best on a larger screen.</b>
        The dashboard is designed for desktop; the volunteer and Dave views are built for phones.</div>

      <div class="kpis">
        <div class="kpi"><div class="v">${tot.doors.toLocaleString()}</div><div class="k">Walkable doors</div></div>
        <div class="kpi"><div class="v">${Math.round(tot.knocked/tot.doors*100)}%</div><div class="k">Doors knocked</div></div>
        <div class="kpi"><div class="v">${Math.round(tot.flyer/tot.streets*100)}%</div><div class="k">Streets flyered</div></div>
        <div class="kpi"><div class="v">${tot.resp.toLocaleString()}</div><div class="k">Voter IDs</div></div>
        <div class="kpi"><div class="v">${pc(tot.V+tot.Y, tot.resp)}</div><div class="k">VIP + supporter</div></div>
      </div>

      <h2>Voter mix — all areas</h2>
      <div class="mixbar" style="height:30px">${mix(tot, tot.resp)}</div>
      <div class="legend">${TYPES.map(t=>
        `<span><span class="swatch" style="background:${TYPE_COLOR[t.k]}"></span>
         <b>${t.long}</b> ${tot[t.k].toLocaleString()} (${pc(tot[t.k],tot.resp)})</span>`).join('')}</div>

      <h2>Colour rule</h2>
      <div class="ctrls">
        <label>Rule
          <select id="mode">
            <option value="majority">Majority — over 50%</option>
            <option value="plurality">Plurality — largest group</option>
          </select></label>
        <label>Min responses <input type="number" id="mr" value="${rules.minResp}" min="0" step="5"></label>
        <label>Min knocked % <input type="number" id="mc" value="${Math.round(rules.minCov*100)}" min="0" max="100" step="5"></label>
        <span style="color:var(--ink-400)">green = VIP + supporters · orange = swing ·
          yellow = uncertain · red = competitor · grey = not significant</span>
      </div>

      <h2>Neighbourhoods</h2>
      <div class="hoodgrid">${hoodCards}</div>

      <div class="note" style="margin-top:26px">Areas and door counts are live from the
        Dave Canvassing map and York Region Open Data. Canvassing activity is illustrative
        sample data for layout purposes — real figures arrive with the backend.</div>
    </div>`)
  ]);
  $('#mode').value = rules.mode;
  $('#mode').onchange = e => { rules.mode = e.target.value; dashboard(); };
  $('#mr').oninput = e => { rules.minResp = +e.target.value||0; dashboard(); };
  $('#mc').oninput = e => { rules.minCov = (+e.target.value||0)/100; dashboard(); };
}

/* ---------------- router --------------------------------------------------- */
function draw(){
  ({ landing, hoods, areas, area:areaScreen, dash:dashboard }[state.screen] || landing)();
}
draw();
if (CFG.ASK_NAME && !API.volunteer()) setTimeout(()=>askName(false), 400);
