/**
 * Bundles the canvassing app into a single self-contained HTML file at
 * private/canvass.html, which the build then encrypts with lockContent().
 *
 * Why a bundle rather than files in public/:
 *   Astro copies public/ to the site root verbatim, so anything there is
 *   fetchable by direct URL and cannot be password-gated. Keeping the app in
 *   src/canvass/ means it is never emitted as a static asset; the only copy
 *   that reaches the deployed site is the ciphertext.
 *
 * The Apps Script endpoint and token are injected here from the environment,
 * so neither is ever committed. This repository is PUBLIC.
 *
 * Missing env vars are a warning, not an error: a build without them still
 * succeeds and simply ships an app that saves locally and exports CSV. This
 * mirrors lockContent(), which returns null rather than failing the build.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = resolve(root, 'src/canvass');
const outFile = resolve(root, 'private/canvass.html');

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
console.log(`[canvass] wrote private/canvass.html (${kb(html.length)})`);
console.log(`[canvass] sync endpoint: ${SCRIPT_URL ? 'configured' : 'NOT SET — app will save locally only'}`);
console.log(`[canvass] sync token:    ${TOKEN ? 'configured' : 'NOT SET'}`);
