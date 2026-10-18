// Renders one React port at desktop and mobile width against the sync's real
// stylesheet and images, and stacks it under its reference render for review.
//
//   node .design-sync/tools/shot.mjs --name StatementBand [--props '{"variant":"secondary"}'] [--wrap dark|light] [--label Variant] [--height 900] [--page]
//
// --label names the output files (default: --name) so a state or variant can
// be captured without overwriting the default render; it has no reference, so
// its sheet shows the port alone. The sheet reports a pixel mismatch % per
// width when the reference and the port have the same size. --page captures the
// whole viewport instead of the first element (open panels, overlays, fragments).
//
// Needs .design-sync/react/dist/site.css (node .design-sync/build-css.mjs) and
// a reference from ref.mjs. Writes .design-sync/.cache/port/<Name>.{desktop,mobile}.png
// and .design-sync/.cache/compare/<Name>.png (reference above, port below, per width).
import { chromium } from 'playwright';
import { build } from 'esbuild';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { serve } from './serve.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const name = arg('name'), props = arg('props', '{}'), wrap = arg('wrap', ''), label = arg('label', arg('name')), vh = Number(arg('height', 900));
if (!name) throw new Error('--name is required');
const root = resolve(new URL('../..', import.meta.url).pathname);
const cache = resolve(root, '.design-sync/.cache');
const work = resolve(cache, `harness/${label}`);
for (const d of [work, `${cache}/port`, `${cache}/compare`]) mkdirSync(d, { recursive: true });

// Import the component's own module (src/<group>/<Name>.tsx), not the shared
// index, so ports being written in parallel never block each other.
const srcRoot = resolve(root, '.design-sync/react/src');
const modPath = readdirSync(srcRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => resolve(srcRoot, d.name, `${name}.tsx`))
  .find((p) => existsSync(p));
if (!modPath) throw new Error(`no .design-sync/react/src/*/${name}.tsx`);
writeFileSync(resolve(work, 'entry.tsx'), `
import { createRoot } from 'react-dom/client';
import * as DS from ${JSON.stringify(modPath)};
const C = (DS as any)[${JSON.stringify(name)}];
if (!C) throw new Error('not exported: ${name}');
createRoot(document.getElementById('root')!).render(<C {...${props}} />);
`);
await build({
  entryPoints: [resolve(work, 'entry.tsx')], outfile: resolve(work, 'bundle.js'), bundle: true, format: 'iife',
  jsx: 'automatic', tsconfig: resolve(root, '.design-sync/react/tsconfig.json'), logLevel: 'error',
  nodePaths: [resolve(root, '.ds-sync/node_modules')],
  define: { 'import.meta.env.BASE_URL': '"/"', 'import.meta.env.DEV': 'false', 'import.meta.env.PROD': 'true', 'process.env.NODE_ENV': '"production"' },
});
const bg = wrap === 'light' ? 'background:#fff' : '';
writeFileSync(resolve(work, 'index.html'), `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/site.css"></head>
<body style="margin:0;${bg}"><div id="root"></div><script src="/bundle.js"></script></body></html>`);

const srv = await serve([
  ['/site.css', resolve(root, '.design-sync/react/dist/site.css')],
  ['/assets/', resolve(root, 'public')],
  ['/fonts/', resolve(root, 'public/fonts')],
  ['/', work],
]);
const browser = await chromium.launch();
const errors = [];
for (const [w, width] of [['desktop', 1280], ['mobile', 390]]) {
  const ctx = await browser.newContext({ viewport: { width, height: vh }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  pg.on('pageerror', (e) => errors.push(`${w}: ${e.message}`));
  pg.on('console', (m) => m.type() === 'error' && errors.push(`${w} console: ${m.text()}`));
  await pg.goto(srv.origin + '/', { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(200);
  const el = pg.locator('#root > *').first();
  if (!(await el.count())) { errors.push(`${w}: rendered nothing`); await ctx.close(); continue; }
  const shotOpts = { path: resolve(cache, `port/${label}.${w}.png`), animations: 'disabled' };
  await (process.argv.includes('--page') ? pg.screenshot(shotOpts) : el.screenshot(shotOpts));
  await ctx.close();
}

// Compare sheet: reference over port, desktop then mobile, each labelled, with
// a pixel mismatch % (channel delta > 24) when both images share a size.
const img = (p) => existsSync(p) ? `data:image/png;base64,${readFileSync(p).toString('base64')}` : '';
const ref = (w) => label === name ? img(`${cache}/ref/${name}.${w}.png`) : '';
const port = (w) => img(`${cache}/port/${label}.${w}.png`);
const sheet = await browser.newPage({ viewport: { width: 1320, height: 800 } });
await sheet.setContent(`<style>body{margin:0;padding:12px;background:#777;font:600 14px system-ui;color:#fff}
figure{margin:0 0 14px}figcaption{margin-bottom:4px}img{display:block;max-width:1280px;outline:1px solid #f0f}</style><div id="s"></div>`);
const diffs = await sheet.evaluate(async ({ title, cells }) => {
  const load = (src) => new Promise((ok) => { if (!src) return ok(null); const i = new Image(); i.onload = () => ok(i); i.src = src; });
  const px = (i) => { const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const x = c.getContext('2d'); x.drawImage(i, 0, 0); return x.getImageData(0, 0, i.width, i.height).data; };
  const out = {}; let html = '';
  for (const { w, ref, port } of cells) {
    const [a, b] = await Promise.all([load(ref), load(port)]);
    let note = '';
    if (a && b) {
      if (a.width === b.width && a.height === b.height) {
        const da = px(a), db = px(b); let bad = 0;
        for (let k = 0; k < da.length; k += 4) if (Math.max(Math.abs(da[k] - db[k]), Math.abs(da[k + 1] - db[k + 1]), Math.abs(da[k + 2] - db[k + 2])) > 24) bad++;
        out[w] = `${((bad / (da.length / 4)) * 100).toFixed(2)}% pixels differ`;
      } else out[w] = `size differs: ref ${a.width}x${a.height}, port ${b.width}x${b.height}`;
      note = ` — ${out[w]}`;
    }
    html += `<div style="${w === 'mobile' ? 'display:flex;gap:16px' : ''}">`
      + (ref ? `<figure><figcaption>${title} REFERENCE ${w}</figcaption><img src="${ref}"></figure>` : '')
      + `<figure><figcaption>${title} PORT ${w}${note}</figcaption>${port ? `<img src="${port}">` : '<p>missing</p>'}</figure></div>`;
  }
  document.getElementById('s').innerHTML = html;
  return out;
}, { title: label, cells: ['desktop', 'mobile'].map((w) => ({ w, ref: ref(w), port: port(w) })) });
await sheet.waitForTimeout(100);
await sheet.screenshot({ path: resolve(cache, `compare/${label}.png`), fullPage: true });
await browser.close();
srv.close();
for (const [w, d] of Object.entries(diffs)) console.log(`${w}: ${d}`);
if (errors.length) console.log(`errors:\n  ${errors.join('\n  ')}`);
console.log(`compare: .design-sync/.cache/compare/${label}.png`);
