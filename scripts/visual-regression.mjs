// Visual regression for the React migration: proves a refactor changed no pixels.
//
//   node scripts/visual-regression.mjs baseline   # build, capture every page -> .vr/baseline/
//   node scripts/visual-regression.mjs compare    # build, capture -> .vr/current/, diff against baseline
//   node scripts/visual-regression.mjs compare --no-build   # reuse .vr/dist
//   node scripts/visual-regression.mjs compare --only /features/,/faq/
//
// Pages render with JavaScript OFF: the site gates its reveal motion on `html.js`,
// so the no-JS render is the finished static state and identical run to run.
// A short list of JS scenarios (SCENARIOS below) then covers the client scripts.
//
// The JS scenarios capture the landing page under a stable extra route: for the
// length of the build this script adds `src/pages/vr-home.astro`, which renders
// `index.astro`, and removes it again in a `finally`. It builds into `.vr/dist`,
// never into `dist/`.
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const vr = resolve(root, '.vr');
const outDir = resolve(vr, 'dist');
const mode = process.argv[2];
if (!['baseline', 'compare'].includes(mode)) throw new Error('usage: visual-regression.mjs baseline|compare [--no-build] [--only a,b]');
const argOf = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : undefined; };
const only = argOf('--only')?.split(',');
const WIDTHS = [1280, 390];
// A mismatch below this share of pixels is antialiasing noise, not a change.
const TOLERANCE = 0.0005;

if (!process.argv.includes('--no-build')) {
  const shim = resolve(root, 'src/pages/vr-home.astro');
  writeFileSync(shim, `---\nimport Home from './index.astro';\n---\n<Home />\n`);
  try {
    execFileSync('npx', ['astro', 'build', '--outDir', outDir], { cwd: root, stdio: ['ignore', 'ignore', 'inherit'] });
  } finally {
    rmSync(shim, { force: true });
  }
}

// Components are React but must never ship it: nothing hydrates. A client script
// that imports anything touching `react` bundles the runtime onto the page (React
// is not tree-shakeable), so fail on any script a page loads that carries it.
// Astro still emits an unreferenced `client.*.js` renderer chunk; only what a
// page actually references counts.
const reactLeaks = new Set();
(function scan(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (f !== '_astro') scan(p); continue; }
    if (!f.endsWith('.html')) continue;
    for (const [, src] of readFileSync(p, 'utf8').matchAll(/<script[^>]*\bsrc="\/?([^"]+)"/g)) {
      const js = resolve(outDir, src);
      const seen = new Set();
      const walk = (file) => {
        if (seen.has(file) || !existsSync(file)) return;
        seen.add(file);
        const code = readFileSync(file, 'utf8');
        if (/react(-dom)?\.production/.test(code)) reactLeaks.add(`${relative(outDir, p)} -> ${relative(outDir, file)}`);
        for (const [, imp] of code.matchAll(/(?:import|from)\s*["'](\.{1,2}\/[^"']+)["']/g)) walk(resolve(dirname(file), imp));
      };
      walk(js);
    }
  }
})(outDir);
if (reactLeaks.size) {
  console.error(`React reached the browser:\n  ${[...reactLeaks].join('\n  ')}`);
  process.exit(1);
}

const routes = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') routes.push('/' + relative(outDir, dir).split('\\').join('/') + (dir === outDir ? '' : '/'));
  }
})(outDir);
const pages = routes.map((r) => r.replace('//', '/')).filter((r) => !r.startsWith('/policy')).sort()
  .filter((r) => !only || only.includes(r));

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = createServer((req, res) => {
  let p = resolve(outDir, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!p.startsWith(outDir) || !existsSync(p)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' }).end(readFileSync(p));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const slug = (route, w) => `${route.replace(/^\/|\/$/g, '').replace(/\//g, '__') || 'root'}.${w}.png`;
const shotDir = resolve(vr, mode === 'baseline' ? 'baseline' : 'current');
const diffDir = resolve(vr, 'diff');
rmSync(shotDir, { recursive: true, force: true });
if (mode === 'compare') rmSync(diffDir, { recursive: true, force: true });
mkdirSync(shotDir, { recursive: true });
mkdirSync(diffDir, { recursive: true });

// The repo's playwright-core may pin a Chromium build that is not downloaded;
// fall back to any cached headless shell rather than fetching ~200MB.
const executablePath = (() => {
  if (process.env.VR_CHROMIUM) return process.env.VR_CHROMIUM;
  const cache = resolve(process.env.HOME ?? '', 'Library/Caches/ms-playwright');
  if (!existsSync(cache)) return undefined;
  const shell = readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().pop();
  if (!shell) return undefined;
  const dir = resolve(cache, shell);
  const sub = readdirSync(dir).find((d) => d.startsWith('chrome-headless-shell-'));
  const bin = sub && resolve(dir, sub, 'chrome-headless-shell');
  return bin && existsSync(bin) ? bin : undefined;
})();
const browser = await chromium.launch({ executablePath });
for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, javaScriptEnabled: false, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  for (const route of pages) {
    await pg.goto(origin + route, { waitUntil: 'networkidle' });
    await pg.evaluate(() => { for (const img of document.images) img.loading = 'eager'; });
    await pg.waitForLoadState('networkidle');
    await pg.waitForFunction(() => document.fonts.status === 'loaded' && [...document.images].every((i) => i.complete), null, { timeout: 20000 }).catch(() => {});
    // `complete` is not `painted`: a large plate can still be decoding when the
    // shot is taken, which showed up as a band of noise on unchanged pages.
    await pg.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
    await pg.screenshot({ path: resolve(shotDir, slug(route, w)), fullPage: true, animations: 'disabled' });
  }
  await ctx.close();
}

// The page captures run with JS off, so they cannot see behaviour. Each scenario
// drives one client script with JS ON and captures the state it produces: a
// script that stops running or targets the wrong node shows up as a diff here.
const settle = (pg, ms = 1200) => pg.waitForTimeout(ms);
const SCENARIOS = [
  { name: 'js__menu-open', route: '/features/', w: 390, run: async (pg) => { await pg.click('#mobile-menu-toggle'); await settle(pg, 600); } },
  { name: 'js__legal-toc', route: '/privacy/', w: 1280, run: async (pg) => { await pg.locator('.md-content h2[id]').nth(3).scrollIntoViewIfNeeded(); await pg.mouse.wheel(0, 200); await settle(pg); } },
  { name: 'js__legal-toc', route: '/privacy/', w: 390, run: async () => {} },
  { name: 'js__showcase', route: '/vr-home/', w: 1280, run: async (pg) => {
    const top = await pg.evaluate(() => document.querySelector('[data-home-opening]').getBoundingClientRect().top + scrollY);
    // A pointerdown first, as a click on a link would: it holds the opening's glide,
    // so the page stays mid-track instead of gliding on to the lineup.
    await pg.evaluate((y) => {
      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      scrollTo(0, y + innerHeight * 0.8);
    }, top);
    // The smoothing loop snaps to its exact target when it stops, so wait for the
    // transforms to stop changing rather than for a fixed time: headless rAF is
    // slow enough that 2s sometimes caught it a frame short.
    // Lazy images below the fold load after the jump and can restart the loop, so
    // let them land first, then require two quiet windows in a row.
    await pg.waitForLoadState('networkidle');
    // Only images that have loaded: decode() on a lazy image that never starts
    // loading never settles, and hung this run for good.
    await pg.evaluate(() => Promise.all([...document.images].filter((i) => i.complete).map((i) => i.decode().catch(() => {}))));
    await pg.waitForFunction(() => new Promise((ok) => {
      const read = () => [...document.querySelectorAll('[data-phone]')].map((p) => p.style.transform + p.style.opacity).join();
      const a = read();
      setTimeout(() => { const b = read(); setTimeout(() => ok(a === b && b === read()), 600); }, 600);
    }), null, { timeout: 15000, polling: 100 });
  } },
].filter((s) => !only || only.includes(s.route));
for (const s of SCENARIOS) {
  const ctx = await browser.newContext({ viewport: { width: s.w, height: 900 }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.goto(origin + s.route, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await s.run(pg);
  await pg.screenshot({ path: resolve(shotDir, `${s.name}.${s.w}.png`), fullPage: !!s.fullPage, animations: 'disabled' });
  await ctx.close();
}

const report = [];
if (mode === 'compare') {
  // Pixel diff in the browser: two canvases, one pass, and a red-on-grey diff image.
  const pg = await (await browser.newContext()).newPage();
  const captures = [
    ...pages.flatMap((route) => WIDTHS.map((w) => ({ route, w, name: slug(route, w) }))),
    ...SCENARIOS.map((s) => ({ route: `${s.route} ${s.name}`, w: s.w, name: `${s.name}.${s.w}.png` })),
  ];
  for (const { route, w, name } of captures) {
    const basePath = resolve(vr, 'baseline', name);
    if (!existsSync(basePath)) { report.push({ route, w, status: 'NEW' }); continue; }
    const r = await pg.evaluate(async ([a, b]) => {
      const load = (src) => new Promise((ok, err) => { const i = new Image(); i.onload = () => ok(i); i.onerror = err; i.src = src; });
      const [ia, ib] = await Promise.all([load(a), load(b)]);
      const W = Math.max(ia.width, ib.width), H = Math.max(ia.height, ib.height);
      const px = (img) => { const c = new OffscreenCanvas(W, H); const x = c.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, W, H).data; };
      const da = px(ia), db = px(ib);
      const out = new OffscreenCanvas(W, H); const ox = out.getContext('2d'); const od = ox.createImageData(W, H);
      let bad = 0;
      for (let i = 0; i < da.length; i += 4) {
        const d = Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
        const g = (da[i] + da[i + 1] + da[i + 2]) / 9;
        if (d > 24) { bad++; od.data.set([255, 0, 0, 255], i); } else od.data.set([g, g, g, 255], i);
      }
      ox.putImageData(od, 0, 0);
      const blob = await out.convertToBlob({ type: 'image/png' });
      const buf = new Uint8Array(await blob.arrayBuffer());
      let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      return { share: bad / (W * H), sizeA: `${ia.width}x${ia.height}`, sizeB: `${ib.width}x${ib.height}`, png: btoa(bin) };
    }, [`data:image/png;base64,${readFileSync(basePath).toString('base64')}`, `data:image/png;base64,${readFileSync(resolve(shotDir, name)).toString('base64')}`]);
    const sizeChanged = r.sizeA !== r.sizeB;
    const status = sizeChanged ? 'SIZE' : r.share > TOLERANCE ? 'DIFF' : 'OK';
    if (status !== 'OK') writeFileSync(resolve(diffDir, name), Buffer.from(r.png, 'base64'));
    report.push({ route, w, status, pct: +(r.share * 100).toFixed(3), ...(sizeChanged ? { from: r.sizeA, to: r.sizeB } : {}) });
  }
}
await browser.close();
server.close();

if (mode === 'baseline') {
  console.log(`baseline: ${pages.length} pages x ${WIDTHS.length} widths + ${SCENARIOS.length} JS scenarios -> ${relative(root, shotDir)}/`);
} else {
  writeFileSync(resolve(vr, 'report.json'), JSON.stringify(report, null, 2));
  const failing = report.filter((r) => r.status !== 'OK');
  for (const r of report) console.log(`${r.status.padEnd(4)} ${String(r.w).padEnd(4)} ${r.route}${r.pct ? `  ${r.pct}%` : ''}${r.from ? `  ${r.from} -> ${r.to}` : ''}`);
  console.log(failing.length ? `\n${failing.length} of ${report.length} captures changed; diffs in .vr/diff/` : `\nall ${report.length} captures match`);
  process.exitCode = failing.length ? 1 : 0;
}
