/**
 * Responsive variants of every raster in `public/img` and `public/screens`.
 *
 *   node scripts/images.mjs          (also runs inside `astro dev` / `astro build`,
 *                                     see `responsiveImages()` in astro.config.mjs)
 *
 * For each source it writes, under `public/_img/` (gitignored, rebuilt on demand):
 *
 *   - AVIF and WebP at a ladder of widths capped at the source width, so a 390px
 *     phone takes a 828px file instead of the 2560px master;
 *   - art-directed CROPS for the frames whose shape changes on a phone (a 16:9
 *     backdrop behind a tall portrait section). A crop is cut with the SAME
 *     percentage rule CSS `object-position` uses, which makes it lossless: an
 *     object-fit: cover of the crop shows exactly the pixels a cover of the master
 *     showed, as long as the crop is at least as wide (in aspect) as the frame;
 *   - a 32px LQIP, inlined into the manifest as a data URI. `Picture` paints it
 *     blurred under the real image, so a lazy plate arrives as its own colours
 *     rather than as a hole.
 *
 * And `src/data/images.json`, the manifest `Picture` reads at render time. A
 * source is only re-encoded when its bytes or its recipe change.
 */
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const OUT = join(PUBLIC, '_img');
const MANIFEST = join(ROOT, 'src/data/images.json');

/** Bump to force every variant to re-encode. */
const RECIPE = 3;

/** Photographs and plates. Capped at the source width; the master is always the top rung. */
const PHOTO_WIDTHS = [480, 768, 1080, 1440, 1920, 2560];
/** App captures: 1x, 1.5x, 2x of the 278 CSS px the device frame is at its widest. */
const SCREEN_WIDTHS = [278, 417];

/**
 * Art direction. `ratio` is width / height of the crop; `pos` is the CSS
 * object-position of the frame that shows it, as fractions. Keep `pos` in step with
 * the stylesheet, or the crop and the cover disagree about where the subject is.
 */
const CROPS = {
  /* Phone frames are portrait, at most square. HomeOpening.css / PricingSection.css. */
  'img/hero-backdrop.webp': [{ name: 'square', ratio: 1, pos: [0.74, 0.4] }],
  'img/showcase-backdrop.webp': [{ name: 'square', ratio: 1, pos: [0.5, 1] }],
  'img/pricing-backdrop.webp': [{ name: 'square', ratio: 1, pos: [0.5, 0.8] }],
  /* The features index drops its cards to 4:3 below 640px; x is centred there. */
  ...Object.fromEntries(
    ['usb-dac', 'eq', 'library', 'casting', 'dsp', 'ai-enhancer'].map((s) => [
      `img/features/${s}.webp`,
      [{ name: '4x3', ratio: 4 / 3, pos: [0.5, 0.5] }],
    ]),
  ),
};

/**
 * Not encoded: hand-made pre-sizes this pipeline replaces, and uncalled alternate
 * crops. Tiles repeat in CSS at their own height, so they get one AVIF, no ladder.
 */
const SKIP = /-(960|5x1|3x1|16x9)\.webp$/;
const TILE = /-tile\.webp$/;

const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
      )
    : [];

const quality = (isScreen) =>
  isScreen
    ? /* UI type: full chroma, or every coloured glyph edge smears. */
      { avif: { quality: 62, effort: 5, chromaSubsampling: '4:4:4' }, webp: { quality: 82, effort: 5 } }
    : { avif: { quality: 52, effort: 5 }, webp: { quality: 76, effort: 5 } };

/** Crop box for `ratio` inside w x h, placed the way object-position places it. */
function cropBox(w, h, ratio, [px, py]) {
  let cw = w;
  let ch = Math.round(w / ratio);
  if (ch > h) {
    ch = h;
    cw = Math.round(h * ratio);
  }
  return { left: Math.round((w - cw) * px), top: Math.round((h - ch) * py), width: cw, height: ch };
}

async function encodeLadder(input, box, widths, base, q) {
  const out = { avif: [], webp: [] };
  const rungs = [...widths.filter((x) => x < box.width), box.width];
  for (const width of rungs) {
    for (const fmt of ['avif', 'webp']) {
      const file = `${base}-${width}.${fmt}`;
      const abs = join(OUT, file);
      mkdirSync(dirname(abs), { recursive: true });
      let img = sharp(input).extract(box);
      if (width < box.width) img = img.resize({ width, kernel: 'lanczos3' });
      await img[fmt](q[fmt]).toFile(abs);
      out[fmt].push([width, `_img/${file}`]);
    }
  }
  return out;
}

async function lqip(input) {
  const buf = await sharp(input).resize({ width: 32 }).webp({ quality: 40 }).toBuffer();
  const { width, height } = await sharp(buf).metadata();
  return { w: width, h: height, src: `data:image/webp;base64,${buf.toString('base64')}` };
}

export async function buildImages({ log = console.log } = {}) {
  const prev = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
  const next = {};
  let encoded = 0;

  const sources = [...walk(join(PUBLIC, 'img')), ...walk(join(PUBLIC, 'screens'))]
    .filter((f) => /\.(webp|png|jpe?g)$/.test(f) && !SKIP.test(f))
    .sort();

  for (const abs of sources) {
    const rel = relative(PUBLIC, abs).split('\\').join('/');
    const isScreen = rel.startsWith('screens/');
    const isTile = TILE.test(rel);
    const crops = CROPS[rel] ?? [];
    /* Content, not mtime: a CI checkout stamps every file with the clone's time. */
    const input = readFileSync(abs);
    const key = createHash('sha1')
      .update(JSON.stringify([RECIPE, crops, isScreen, isTile]))
      .update(input)
      .digest('hex')
      .slice(0, 12);

    const old = prev[rel];
    const files = old ? Object.values(old.sources ?? {}).flatMap((s) => [...s.avif, ...s.webp]) : [];
    if (old?.key === key && files.every(([, f]) => existsSync(join(PUBLIC, f)))) {
      next[rel] = old;
      continue;
    }

    const { width: w, height: h } = await sharp(input).metadata();
    const q = quality(isScreen);
    const base = rel.replace(/\.[a-z]+$/, '');
    const entry = { key, w, h, lqip: await lqip(input), sources: {} };

    if (isTile) {
      /* One rung: the strip draws the tile at its own height at every width. */
      entry.sources.default = await encodeLadder(input, { left: 0, top: 0, width: w, height: h }, [], base, q);
    } else {
      const full = { left: 0, top: 0, width: w, height: h };
      entry.sources.default = await encodeLadder(input, full, isScreen ? SCREEN_WIDTHS : PHOTO_WIDTHS, base, q);
      for (const c of crops) {
        const box = cropBox(w, h, c.ratio, c.pos);
        entry.sources[c.name] = await encodeLadder(input, box, PHOTO_WIDTHS, `${base}.${c.name}`, q);
        entry.sources[c.name].w = box.width;
        entry.sources[c.name].h = box.height;
      }
    }
    next[rel] = entry;
    encoded++;
  }

  /* Every file in public/_img ships, so a variant no entry names is deleted. */
  const live = new Set(
    Object.values(next).flatMap((e) => Object.values(e.sources).flatMap((s) => [...s.avif, ...s.webp].map(([, f]) => f))),
  );
  for (const f of walk(OUT)) if (!live.has(relative(PUBLIC, f).split('\\').join('/'))) rmSync(f);

  const json = `${JSON.stringify(next, null, 1)}\n`;
  if (!existsSync(MANIFEST) || readFileSync(MANIFEST, 'utf8') !== json) writeFileSync(MANIFEST, json);
  log(`[images] ${sources.length} sources, ${encoded} re-encoded`);
  return next;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await buildImages();
}
