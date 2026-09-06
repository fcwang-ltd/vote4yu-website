/**
 * Bundles the canvassing app into a single self-contained HTML file served at
 *   /private-62e6aed4888d372bb76bcb97/
 * The app is deliberately NOT password-gated: the URL is unlisted and shared
 * directly with volunteers, who open it and start logging.
 *
 * Output goes to public/, which Astro copies to the site root verbatim, so the
 * bundle is served as-is at that path.
 *
 * The generated file is gitignored and must stay that way. The Apps Script
 * endpoint and token are injected here from the environment, so the built file
 * CONTAINS THE SYNC TOKEN IN CLEARTEXT. Anyone with the URL can read it. That
 * is an accepted trade-off for an unlisted volunteer link, but it means the
 * file must never be committed — this repository is PUBLIC.
 *
 * Missing env vars are a warning, not an error: a build without them still
 * succeeds and simply ships an app that saves locally and exports CSV.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = resolve(root, 'src/canvass');
const outFile = resolve(root, 'public/private-62e6aed4888d372bb76bcb97/index.html');

const SCRIPT_URL = process.env.CANVASS_SCRIPT_URL ?? '';
const TOKEN = process.env.CANVASS_TOKEN ?? '';

if (!existsSync(resolve(srcDir, 'index.html'))) {
  console.warn('[canvass] src/canvass/index.html not found — skipping bundle.');
  process.exit(0);
}

/** A literal </script> inside inlined JS would close the wrapper tag early. */
const safe = (js) => js.replace(/<\/script>/gi, '<\\/script>');

let config = readFileSync(resolve(srcDir, 'config.js'), 'utf8');
config = config
  .replace(/SCRIPT_URL:\s*'[^']*'/, `SCRIPT_URL: ${JSON.stringify(SCRIPT_URL)}`)
  .replace(/TOKEN:\s*'[^']*'/, `TOKEN: ${JSON.stringify(TOKEN)}`);

const parts = {
  'config.js': config,
  'areas.js': readFileSync(resolve(srcDir, 'areas.js'), 'utf8'),
  'api.js': readFileSync(resolve(srcDir, 'api.js'), 'utf8'),
  'app.js': readFileSync(resolve(srcDir, 'app.js'), 'utf8'),
};

let html = readFileSync(resolve(srcDir, 'index.html'), 'utf8');
for (const [name, code] of Object.entries(parts)) {
  const tag = `<script src="${name}"></script>`;
  if (!html.includes(tag)) {
    console.error(`[canvass] expected ${tag} in index.html — bundle would be broken.`);
    process.exit(1);
  }
  html = html.replace(tag, `<script>\n${safe(code)}\n</script>`);
}

if (/<script src="(?!https?:)/.test(html)) {
  console.error('[canvass] a local <script src> remains; the bundle is not self-contained.');
  process.exit(1);
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, html);

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`[canvass] wrote public/private-62e6aed4888d372bb76bcb97/index.html (${kb(html.length)})`);
console.log(`[canvass] sync endpoint: ${SCRIPT_URL ? 'configured' : 'NOT SET — app will save locally only'}`);
console.log(`[canvass] sync token:    ${TOKEN ? 'configured' : 'NOT SET'}`);
