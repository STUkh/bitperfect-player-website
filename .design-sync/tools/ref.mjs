// Captures a component's reference render from the built site (dist/), with
// JavaScript off: the site gates its reveal motion on `html.js`, so the no-JS
// render is the finished, static state the React ports reproduce by default.
//
//   node .design-sync/tools/ref.mjs --name StatementBand --page / --selector "section.ground-statement" [--nth 0] [--js]
//
// Writes .design-sync/.cache/ref/<Name>.{desktop,mobile}.png and <Name>.html
// (the element's outerHTML at desktop width: the markup to port from).
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { serve } from './serve.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const name = arg('name'), page = arg('page', '/'), selector = arg('selector'), nth = Number(arg('nth', 0));
if (!name || !selector) throw new Error('--name and --selector are required');
const root = resolve(new URL('../..', import.meta.url).pathname);
const outDir = resolve(root, '.design-sync/.cache/ref');
mkdirSync(outDir, { recursive: true });

const srv = await serve([['/', resolve(root, 'dist')]]);
const browser = await chromium.launch();
for (const [label, width] of [['desktop', 1280], ['mobile', 390]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: process.argv.includes('--js'), deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.goto(srv.origin + page, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  // The fixed header paints over whatever it overlaps in an element
  // screenshot; hide it unless it is the thing being captured.
  // (pg.evaluate, not addStyleTag: addStyleTag waits on a script that never
  // runs with JavaScript off.) Lazy images are forced to load first.
  await pg.evaluate((hideHeader) => {
    if (hideHeader) document.getElementById('site-header')?.style.setProperty('visibility', 'hidden', 'important');
    for (const img of document.images) img.loading = 'eager';
  }, !/site-header|^header/.test(selector));
  await pg.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
  const el = pg.locator(selector).nth(nth);
  if (!(await el.count())) throw new Error(`no element for ${selector} (nth ${nth}) on ${page}`);
  await el.screenshot({ path: resolve(outDir, `${name}.${label}.png`), animations: 'disabled' });
  if (label === 'desktop') writeFileSync(resolve(outDir, `${name}.html`), await el.evaluate((n) => n.outerHTML));
  await ctx.close();
}
await browser.close();
srv.close();
console.log(`ref: .design-sync/.cache/ref/${name}.{desktop,mobile}.png + ${name}.html`);
