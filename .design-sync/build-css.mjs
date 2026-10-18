// Compiles the stylesheet for the Claude Design sync.
//
// The site is Astro: its CSS is inlined per page at build time, so there is no
// single compiled stylesheet in dist/ to point the converter at. This runs the
// same Tailwind 4 compile the Vite plugin runs (src/styles/global.css, scanning
// src/ for candidates, plus a safelist), appends src/styles/animations.css and
// every component's scoped styles, and rewrites root-absolute URLs so fonts land
// in fonts/ and images in assets/ next to the uploaded stylesheet.
//
// Usage: node .design-sync/build-css.mjs [out.css]
import { compile, optimize } from '@tailwindcss/node';
import { Scanner } from '@tailwindcss/oxide';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const out = resolve(process.argv[2] ?? '.design-sync/react/dist/site.css');
const globalPath = resolve(root, 'src/styles/global.css');

const compiler = await compile(readFileSync(globalPath, 'utf8'), {
  base: dirname(globalPath),
  onDependency() {},
});
const scanner = new Scanner({
  // The ports are scanned too, so a class only a port uses still compiles.
  sources: [
    { base: resolve(root, 'src'), pattern: '**/*', negated: false },
    { base: resolve(root, '.design-sync/react/src'), pattern: '**/*', negated: false },
  ],
});

// The site only needs the classes it already uses, but the design agent writes
// new markup: a class the site never used would compile to nothing and the
// design would ship silently unstyled. So every token-backed utility, and the
// core spacing and layout scale, is compiled whether or not a page uses it.
const globalCss = readFileSync(globalPath, 'utf8');
const tokens = (prefix) =>
  [...new Set([...globalCss.matchAll(new RegExp(`^\\s*--${prefix}-([a-z0-9-]+):`, 'gm'))]
    .map((m) => m[1])
    .filter((name) => !name.includes('--')))];
const responsive = (list) => ['', 'sm:', 'md:', 'lg:'].flatMap((bp) => list.map((c) => bp + c));
const colors = tokens('color');
const steps = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '29', '32', '40'];
const spacing = ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'gap', 'gap-x', 'gap-y', 'space-y', 'space-x']
  .flatMap((u) => steps.map((s) => `${u}-${s}`));
const layout = [
  'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'hidden', 'contents',
  'flex-row', 'flex-col', 'flex-wrap', 'flex-1', 'flex-none', 'shrink-0', 'grow',
  'items-start', 'items-center', 'items-end', 'items-baseline', 'items-stretch',
  'justify-start', 'justify-center', 'justify-end', 'justify-between', 'self-start', 'self-center', 'self-end',
  ...Array.from({ length: 12 }, (_, i) => `grid-cols-${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `col-span-${i + 1}`),
  'w-full', 'w-auto', 'h-full', 'h-auto', 'min-h-screen', 'mx-auto',
  'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl', 'max-w-5xl', 'max-w-6xl', 'max-w-7xl', 'max-w-[760px]', 'max-w-[840px]',
  'text-left', 'text-center', 'text-right', 'relative', 'absolute', 'inset-0', 'overflow-hidden', 'isolate',
  'order-first', 'order-last',
];
const safelist = [
  ...colors.flatMap((c) => [`bg-${c}`, `text-${c}`, `border-${c}`, `fill-${c}`, `stroke-${c}`]),
  ...tokens('radius').map((r) => `rounded-${r}`), 'rounded-full', 'rounded-none',
  ...responsive(tokens('text').map((t) => `text-${t}`)),
  ...tokens('shadow').map((s) => `shadow-${s}`),
  ...responsive(spacing), ...responsive(layout),
  'border', 'border-t', 'border-b', 'border-l', 'border-r', 'border-y', 'border-x', 'border-0',
  'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-mono', 'font-sans',
  'uppercase', 'tabular-nums', 'text-balance', 'text-pretty', 'leading-none', 'leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed',
  'focus-ring', 'focus-ring-inset', 'focus-visible:focus-ring', 'focus-visible:focus-ring-inset',
  'heading-section', 'text-eyebrow', 'mono-spec', 'overhead-wash',
];
const css = compiler.build([...scanner.scan(), ...safelist]);
const animations = readFileSync(resolve(root, 'src/styles/animations.css'), 'utf8');

// The components' own scoped <style> blocks. Astro inlines a different set per
// page, so a second build with external stylesheets (astro.ds.config.mjs)
// collects them. Astro's scope hash is derived from the component's file path
// alone, so the React ports carry the same data-astro-cid-* attributes and
// these rules apply to them unchanged. Only scoped rules are kept from each
// chunk: the global sheet is already compiled above, with the safelist.
execFileSync('npx', ['astro', 'build', '--config', '.design-sync/astro.ds.config.mjs'], { cwd: root, stdio: 'ignore' });
const chunkDir = resolve(root, '.design-sync/.cache/astro-dist/_astro');
const chunks = readdirSync(chunkDir).filter((f) => f.endsWith('.css')).sort()
  .map((f) => readFileSync(join(chunkDir, f), 'utf8'));

// Top-level blocks of a minified sheet, brace-aware (strings in this CSS never
// contain braces). At-rule groups are filtered recursively.
function blocks(text) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}' && --depth === 0) { out.push(text.slice(start, i + 1).trim()); start = i + 1; }
    else if (text[i] === ';' && depth === 0) start = i + 1; // @charset, @import
  }
  return out;
}
const keyframes = new Map();
function scopedOnly(text) {
  const kept = [];
  for (const b of blocks(text)) {
    const brace = b.indexOf('{');
    const prelude = b.slice(0, brace);
    if (/^@keyframes\s/.test(prelude)) { keyframes.set(prelude.split(/\s+/)[1], b); continue; }
    if (/^@(media|supports|layer|container)/.test(prelude)) {
      const inner = scopedOnly(b.slice(brace + 1, -1));
      if (inner.length) kept.push(`${prelude}{${inner.join('')}}`);
    } else if (prelude.includes('astro-cid')) kept.push(b);
  }
  return kept;
}
const scoped = [...new Set(chunks.flatMap(scopedOnly))];
const scopedCss = scoped.join('\n');
const usedKeyframes = [...keyframes].filter(([name]) => new RegExp(`\\b${name}\\b`).test(scopedCss) && !css.includes(`@keyframes ${name}`));

// Site images ship as files under assets/ beside the stylesheet (sync.mjs copies
// them). Root-absolute URLs in any rule are pointed there.
const ASSET_DIRS = ['screens', 'img', 'brand', 'grounds'];
const assetUrl = (text) => text.replace(
  new RegExp(`url\\((["']?)/(${ASSET_DIRS.join('|')})/`, 'g'),
  (_, q, dir) => `url(${q}./assets/${dir}/`,
);

// One probe rule per image. A React port asks for an image by its site path;
// the runtime reads the probe's computed background-image, which the browser has
// already resolved against wherever this stylesheet was actually loaded from.
// See .design-sync/react/src/lib/asset.ts.
const walkFiles = (dir, rel = '') => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walkFiles(join(dir, e.name), `${rel}${e.name}/`) : [`${rel}${e.name}`]);
const probes = ASSET_DIRS.flatMap((d) => walkFiles(resolve(root, 'public', d)).map((f) => `${d}/${f}`))
  .filter((f) => /\.(webp|png|jpe?g|svg|avif)$/.test(f))
  .map((f) => {
    // A small SVG (the logo) is inlined: an <img> refuses an SVG served without
    // an image/svg+xml type, and not every host sets one. Large SVGs (the
    // grounds) stay files; CSS references them directly, not through a probe.
    const file = resolve(root, 'public', f);
    const url = f.endsWith('.svg') && statSync(file).size < 8192
      ? `data:image/svg+xml;base64,${readFileSync(file).toString('base64')}`
      : `./assets/${f}`;
    return `.bpa-${f.replace(/[^a-zA-Z0-9]/g, '-')}{background-image:url("${url}")}`;
  });

const fontsFixed = (text) => text
  .replaceAll('url("/fonts/', 'url("./fonts/')
  .replaceAll("url('/fonts/", "url('./fonts/")
  .replaceAll('url(/fonts/', 'url(./fonts/');
const body = optimize(`${css}\n${animations}`, { minify: false }).code;
const merged = assetUrl(fontsFixed([
  body,
  '/* ── Component scoped styles (from the Astro build) ── */',
  ...usedKeyframes.map(([, b]) => b),
  scopedCss,
  '/* ── Image probes (see react/src/lib/asset.ts) ── */',
  ...probes,
].join('\n'))) + '\n';

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, merged);
// The converter lifts @font-face files relative to this stylesheet and only
// from inside the package, so the Manrope files sit beside it as real copies.
cpSync(resolve(root, 'public/fonts'), join(dirname(out), 'fonts'), { recursive: true });
console.log(`wrote ${out} (${merged.length} bytes)`);
