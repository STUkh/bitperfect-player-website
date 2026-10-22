/**
 * Every glyph the site draws, as data: the one source of SVG path data.
 *
 * A glyph is a list of shapes, each an SVG element name (`el`) and its
 * attributes, written in React's camelCase. `Icon` renders the two authored
 * sets (`ICON_GLYPHS`, and `FEATURE_GLYPHS` through `FeatureMark`). The brand
 * marks and the one-off glyphs at the end are drawn by the component that uses
 * them, in that component's own box and stroke, but their geometry lives here.
 * Plain data, no React, so `.astro` pages can import it too.
 *
 * Copy a path in, never redraw one here: every glyph is pinned by the visual
 * regression baseline.
 */

export type ShapeTag = 'path' | 'circle' | 'rect' | 'polyline' | 'line';
export type Shape = { el: ShapeTag } & Record<string, string>;
export type Glyph = readonly Shape[];

/** Types a set as `Record<name, Glyph>`, keeping its names for the props. */
const glyphSet = <K extends string>(set: Record<K, Glyph>) => set;

/**
 * `Icon`'s authored set. One geometry system: 24x24 box, round caps, 9px
 * nominal radius for every circular form so the signal-path marks read as one
 * family at any size. The four social marks are the exception (`PHOSPHOR`).
 *
 * The `sig-*` icons are the app's signal-path status vocabulary
 * (Color.kt / AGENTS.md) redrawn as vectors. The app pairs every status colour
 * with a mark for colourblind accessibility; the site inherits that rule.
 */
export const ICON_GLYPHS = glyphSet({
  // ── Signal-path status marks ───────────────────────────────────────────
  'sig-bitperfect': [
    { el: 'circle', cx: '12', cy: '12', r: '9' },
    { el: 'circle', cx: '12', cy: '12', r: '4.25', fill: 'currentColor', stroke: 'none' },
  ],
  /*
    No `sig-lossless` and no `sig-hires`. Both were drawn here and neither was ever
    asked for, because neither can be: `src/data/colors.ts` records them as tokens
    the app declares in `Color.kt` and never maps in `signalQualityColor()`, so the
    app has no such runtime state and the site must never show one. A glyph for a
    state that cannot occur is an invitation to render it.
  */
  'sig-resampled': [
    { el: 'circle', cx: '12', cy: '12', r: '9' },
    { el: 'path', d: 'M12 3a9 9 0 0 0 0 18Z', fill: 'currentColor', stroke: 'none' },
  ],
  'sig-lossy': [{ el: 'circle', cx: '12', cy: '12', r: '9' }],
  'sig-enhanced': [
    { el: 'circle', cx: '12', cy: '12', r: '9' },
    { el: 'path', d: 'M12 7.25 13.3 10.7 16.75 12 13.3 13.3 12 16.75 10.7 13.3 7.25 12 10.7 10.7Z', fill: 'currentColor', stroke: 'none' },
  ],

  // ── Chain nodes ────────────────────────────────────────────────────────
  'node-file': [
    { el: 'path', d: 'M13.5 3H6.75A1.75 1.75 0 0 0 5 4.75v14.5A1.75 1.75 0 0 0 6.75 21h10.5A1.75 1.75 0 0 0 19 19.25V8.5Z' },
    { el: 'path', d: 'M13.5 3v5.5H19' },
  ],
  'node-decode': [
    { el: 'rect', x: '3.75', y: '7.5', width: '16.5', height: '9', rx: '1.75' },
    { el: 'path', d: 'M7.25 11v2M10.5 9.75v4.5M13.75 10.5v3M17 11.25v1.5' },
  ],
  'node-engine': [
    { el: 'rect', x: '4.5', y: '4.5', width: '15', height: '15', rx: '2' },
    { el: 'rect', x: '9', y: '9', width: '6', height: '6', rx: '1' },
    { el: 'path', d: 'M9 1.75v2.75M15 1.75v2.75M9 19.5v2.75M15 19.5v2.75M1.75 9H4.5M1.75 15H4.5M19.5 9h2.75M19.5 15h2.75' },
  ],
  'node-usb': [
    { el: 'rect', x: '5.5', y: '8', width: '13', height: '8', rx: '2.5' },
    { el: 'path', d: 'M9.5 12h5' },
    { el: 'path', d: 'M2 12h3.5M18.5 12H22' },
  ],
  'node-dac': [
    { el: 'rect', x: '2.75', y: '7', width: '18.5', height: '10', rx: '2' },
    { el: 'circle', cx: '7.75', cy: '12', r: '2' },
    { el: 'path', d: 'M13 10h5.25M13 14h5.25' },
  ],

  // ── Feature marks ──────────────────────────────────────────────────────
  eq: [
    { el: 'path', d: 'M6 20V14M6 10V4M12 20v-9M12 7V4M18 20v-4M18 12V4' },
    { el: 'path', d: 'M3.75 14h4.5M9.75 7h4.5M15.75 12h4.5' },
  ],
  cast: [
    { el: 'path', d: 'M2.75 20.25h.01M2.75 16.5a3.75 3.75 0 0 1 3.75 3.75M2.75 12.5a7.75 7.75 0 0 1 7.75 7.75' },
    { el: 'path', d: 'M8 4.75h11.5a1.75 1.75 0 0 1 1.75 1.75v11a1.75 1.75 0 0 1-1.75 1.75H15' },
  ],
  sparkle: [
    { el: 'path', d: 'M12 3.25 13.9 9.1 19.75 11 13.9 12.9 12 18.75 10.1 12.9 4.25 11 10.1 9.1Z' },
    { el: 'path', d: 'M18.5 3v3M20 4.5h-3' },
  ],
  shield: [
    { el: 'path', d: 'M12 2.75 4.75 5.5v6c0 4.4 2.95 8.35 7.25 9.75 4.3-1.4 7.25-5.35 7.25-9.75v-6Z' },
    { el: 'path', d: 'm9 11.75 2.25 2.25 4-4.25' },
  ],
  plug: [
    { el: 'path', d: 'M9 2.75v5.5M15 2.75v5.5' },
    { el: 'path', d: 'M6.5 8.25h11v3.25a5.5 5.5 0 0 1-11 0Z' },
    { el: 'path', d: 'M12 17v4.25' },
  ],
  cable: [
    { el: 'path', d: 'M2.75 12h3.5' },
    { el: 'rect', x: '6.25', y: '9', width: '4', height: '6', rx: '1.25' },
    { el: 'path', d: 'M10.25 12h3.5' },
    { el: 'rect', x: '13.75', y: '9', width: '4', height: '6', rx: '1.25' },
    { el: 'path', d: 'M17.75 12h3.5' },
  ],
  library: [
    { el: 'path', d: 'M4.75 8.5 12 4.75l7.25 3.75L12 12.25Z' },
    { el: 'path', d: 'M4.75 12.75 12 16.5l7.25-3.75' },
    { el: 'path', d: 'M4.75 17 12 20.75 19.25 17' },
  ],
  download: [
    { el: 'path', d: 'M12 3.5v10.75' },
    { el: 'path', d: 'm7.75 10.5 4.25 4.25 4.25-4.25' },
    { el: 'path', d: 'M4.75 16.75v2.5a1.75 1.75 0 0 0 1.75 1.75h11a1.75 1.75 0 0 0 1.75-1.75v-2.5' },
  ],
  phone: [
    { el: 'rect', x: '7', y: '2.75', width: '10', height: '18.5', rx: '2.25' },
    { el: 'path', d: 'M10.25 18.25h3.5' },
  ],
  waveform: [{ el: 'path', d: 'M2.75 12h2.5l2-6 3 13 3-17 3 14 2-4h3' }],
  android: [
    { el: 'path', d: 'M4.75 10.75h14.5v6.5a1.75 1.75 0 0 1-1.75 1.75H6.5a1.75 1.75 0 0 1-1.75-1.75Z' },
    { el: 'path', d: 'M4.75 10.75a7.25 7.25 0 0 1 14.5 0' },
    { el: 'path', d: 'm7.25 5.25-1.5-2.5M16.75 5.25l1.5-2.5' },
    { el: 'path', d: 'M9.25 8h.01M14.75 8h.01' },
  ],
  // Neutral list mark. Deliberately not a `sig-*` glyph: the status marks are a
  // taught vocabulary and must not be borrowed as decoration.
  bullet: [{ el: 'path', d: 'M6.5 12h11' }],
  chevron: [{ el: 'path', d: 'm6 9.5 6 6 6-6' }],
  arrow: [{ el: 'path', d: 'M4.75 12h14.5m0 0-5.5-5.5m5.5 5.5-5.5 5.5' }],
  play: [{ el: 'path', d: 'M7.5 4.75 19 12 7.5 19.25Z', fill: 'currentColor', stroke: 'none' }],
  external: [
    { el: 'path', d: 'M13.75 4.75h5.5v5.5' },
    { el: 'path', d: 'm19.25 4.75-7.5 7.5' },
    { el: 'path', d: 'M18 14.5v4.75H4.75V6h4.75' },
  ],

  // ── Social / Brand marks (Phosphor Light, 256x256) ─────────────────────
  telegram: [
    {
      el: 'path',
      d: 'M227.57,27.7a7,7,0,0,0-7.13-1.22L17.78,105.79a12.23,12.23,0,0,0,2.1,23.39L74,139.81V200a14,14,0,0,0,24.08,9.71l26.64-27.63,41.58,36.45a13.9,13.9,0,0,0,9.2,3.49,14.33,14.33,0,0,0,4.36-.69,13.86,13.86,0,0,0,9.34-10.17L229.82,34.57A7,7,0,0,0,227.57,27.7ZM22.05,117.37h0a.46.46,0,0,1,0-.32.51.51,0,0,1,.15-.08L181.91,54.45l-103.3,74L22.2,117.41Zm67.39,84A2,2,0,0,1,86,200V148.11l29.69,26Zm88.07,7.08a1.93,1.93,0,0,1-1.34,1.44,2,2,0,0,1-2-.4L89.64,135.34,215,45.5Z',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
  tiktok: [
    {
      el: 'path',
      d: 'M224,74a50.06,50.06,0,0,1-50-50,6,6,0,0,0-6-6H128a6,6,0,0,0-6,6V156a22,22,0,1,1-31.43-19.89A6,6,0,0,0,94,130.69V88a6,6,0,0,0-7-5.91C52.2,88.28,26,120.05,26,156a74,74,0,0,0,148,0V112.93A101.28,101.28,0,0,0,224,126a6,6,0,0,0,6-6V80A6,6,0,0,0,224,74Zm-6,39.8a89.13,89.13,0,0,1-46.5-16.69A6,6,0,0,0,162,102v54a62,62,0,0,1-124,0c0-27.72,18.47-52.48,44-60.38v31.53A34,34,0,1,0,134,156V30h28.29A62.09,62.09,0,0,0,218,85.71Z',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
  instagram: [
    {
      el: 'path',
      d: 'M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162ZM176,26H80A54.06,54.06,0,0,0,26,80v96a54.06,54.06,0,0,0,54,54h96a54.06,54.06,0,0,0,54-54V80A54.06,54.06,0,0,0,176,26Zm42,150a42,42,0,0,1-42,42H80a42,42,0,0,1-42-42V80A42,42,0,0,1,80,38h96a42,42,0,0,1,42,42ZM190,76a10,10,0,1,1-10-10A10,10,0,0,1,190,76Z',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
  x: [
    {
      el: 'path',
      d: 'M213.06,212.78l-63.42-99.66L212.44,44A6,6,0,1,0,203.56,36L143,102.62l-41.9-65.84A6,6,0,0,0,96,34H48a6,6,0,0,0-5.06,9.22l63.42,99.66L43.56,212A6,6,0,0,0,52.44,220L113,153.38l41.9,65.84A6,6,0,0,0,160,222h48a6,6,0,0,0,5.06-9.22ZM163.29,210,58.93,46H92.71L197.07,210Z',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
});

export type IconName = keyof typeof ICON_GLYPHS;

/** The social marks are Phosphor Light glyphs, drawn on a 256 grid and filled. */
export const PHOSPHOR: readonly string[] = ['telegram', 'tiktok', 'instagram', 'x'];

/**
 * `FeatureMark`'s set: the six feature identity marks (`usb-dac`, `eq`,
 * `library`, `casting`, `dsp`, `ai-enhancer`), plus the utility glyphs the
 * feature routes need. Same 24px grid as `ICON_GLYPHS`, a separate set because
 * three names (`eq`, `library`, `play`) are drawn differently in each.
 *
 * The six identity marks, transcribed from design/FeaturesIndex.dc.html.
 *
 * They replace six Lucide defaults that shipped here by mistake: a plug, a
 * sliders-vertical, a disc, a cast arc, a zigzag, and a four-pointed sparkle.
 * That set is the visual vocabulary of every generated product page on the
 * internet, and the sparkle in particular has been the universal "AI" glyph
 * since 2023. Six stock glyphs say nothing about this product and make it look
 * like every other one.
 *
 * Each of these draws the thing the feature actually does, in a way that only
 * makes sense for an audio player: the pin diagram of a USB connector, a
 * response curve carrying its own control points, a library spine with index
 * ticks, a fader that reads in both directions because the app both sends and
 * receives, a shelf curve on an axis, and a quantised staircase beside the
 * band a reconstruction puts back, drawn dashed because it is inferred rather
 * than recorded.
 */
export const FEATURE_GLYPHS = glyphSet({
  'usb-dac': [
    { el: 'path', d: 'M3 8v8' },
    { el: 'path', d: 'M3 8h6' },
    { el: 'path', d: 'M13 8h5' },
    { el: 'path', d: 'M9.5 10.2 12.5 5.8' },
    { el: 'path', d: 'M3 16h15' },
    { el: 'rect', x: '18', y: '13', width: '3', height: '6', rx: '1' },
  ],
  // The control points are solid: a hollow ring at this weight reads as a
  // hole in the curve rather than a handle on it.
  eq: [
    { el: 'path', d: 'M2 13h20' },
    { el: 'path', d: 'M4 13C6 3 10 3 12 13' },
    { el: 'path', d: 'M15 13c1.5 0 1.5-4 3-4h4' },
    { el: 'circle', cx: '8', cy: '5.5', r: '1.4', fill: 'currentColor', stroke: 'none' },
    { el: 'circle', cx: '16.5', cy: '11', r: '1.4', fill: 'currentColor', stroke: 'none' },
  ],
  library: [
    { el: 'path', d: 'M7 4H4v16h3' },
    { el: 'path', d: 'M7 7h10' },
    { el: 'path', d: 'M7 12h8' },
    { el: 'path', d: 'M7 17h11' },
    { el: 'path', d: 'M20 5v2M20 9v2M20 13v2M20 17v2' },
  ],
  // Two heads, pointing opposite ways: the app is a renderer and a source.
  casting: [
    { el: 'path', d: 'M7 4v16' },
    { el: 'path', d: 'M3 6h4M3 10h4M3 14h4M3 18h4' },
    { el: 'path', d: 'M7 12h13' },
    { el: 'path', d: 'M12 10.5v3M15.5 10.5v3M19 10.5v3' },
    { el: 'path', d: 'M18.5 9.8 21 12l-2.5 2.2' },
    { el: 'path', d: 'M11 9.8 8.5 12l2.5 2.2' },
  ],
  dsp: [
    { el: 'path', d: 'M2 6h20' },
    { el: 'path', d: 'M2 18c3 0 4-10.4 7-10.4h6c3 0 4 10.4 7 10.4' },
  ],
  'ai-enhancer': [
    { el: 'path', d: 'M2 20h20' },
    { el: 'path', d: 'M2 6h3v2.5h3.5V11h3v2h2.5' },
    { el: 'path', d: 'M14 4v16' },
    { el: 'path', d: 'M14 13h3v2h3v2h2', strokeDasharray: '2 2' },
  ],
  'arrow-right': [{ el: 'path', d: 'M5 12h14M13 6l6 6-6 6' }],
  'arrow-left': [{ el: 'path', d: 'M19 12H5M11 6l-6 6 6 6' }],
  'chevron-right': [{ el: 'path', d: 'M9 6l6 6-6 6' }],
  check: [{ el: 'path', d: 'M4 12.5 9.5 18 20 6.5' }],
  play: [
    { el: 'path', d: 'M5 3.5v17a1 1 0 0 0 1.52.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z', fill: 'currentColor', stroke: 'none' },
  ],
  file: [
    { el: 'path', d: 'M4 6.5A2.5 2.5 0 0 1 6.5 4H14l6 6v7.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5Z' },
    { el: 'path', d: 'M14 4v6h6' },
  ],
  chip: [
    { el: 'rect', x: '4', y: '4', width: '16', height: '16', rx: '3' },
    { el: 'rect', x: '9', y: '9', width: '6', height: '6', rx: '1.2' },
    { el: 'path', d: 'M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2' },
  ],
  dac: [
    { el: 'rect', x: '2.5', y: '7', width: '19', height: '10', rx: '2' },
    { el: 'circle', cx: '7.5', cy: '12', r: '1.6' },
    { el: 'path', d: 'M12 10.5h6M12 13.5h6' },
  ],
});

export type FeatureGlyphName = keyof typeof FEATURE_GLYPHS;

/** Both authored sets, by `Icon`'s `set` prop. */
export const GLYPH_SETS: Record<'icon' | 'feature', Record<string, Glyph>> = {
  icon: ICON_GLYPHS,
  feature: FEATURE_GLYPHS,
};

// ── Brand marks, drawn filled in `currentColor` on a 24-unit grid ─────────

/** The Google Play mark: the one source for every place the site says "Google Play". */
export const PLAY_STORE_PATH =
  'M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19 0 .5-.25.92-.59 1.19l-2.27 1.31-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z';

/** The Apple mark, for the App Store badge. */
export const APPLE_PATH =
  'M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.207-2.98.804-.94 2.142-1.64 3.157-1.68.03.13.14.29.14.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.335-1.36-3.348-2.7-1.293-1.72-2.353-4.42-2.353-6.98 0-4.28 2.845-6.54 5.685-6.54 1.517 0 2.784.94 3.685.94.875 0 2.303-1.03 3.994-1.03.673 0 3.079.06 4.61 2.36-.13.08-2.716 1.61-2.716 4.65 0 3.61 3.207 4.9 3.207 4.94z';

// ── One-off glyphs, drawn in place by the component named ─────────────────

/** Solid check on a 20-unit grid, `fillRule="evenodd"`: the pricing points and the signal-path stages. */
export const CHECK_SOLID_PATH =
  'M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z';

/** "Check your phone" link arrow in the pricing unlocks (24 grid, 2.2 stroke). */
export const LINK_ARROW_PATH = 'M5 12h14m0 0-6-6m6 6-6 6';

/** `BackLink`'s left chevron (24 grid, 2 stroke). */
export const BACK_CHEVRON_POINTS = '15 18 9 12 15 6';

/** The FAQ disclosure chevron (24 grid, 2 stroke). */
export const DISCLOSURE_CHEVRON_POINTS = '6 9 12 15 18 9';

/** `ImageSlot`'s prompt disclosure chevron (24 grid, 2.4 stroke). */
export const PROMPT_CHEVRON_PATH = 'M9 5l7 7-7 7';

/** `LegalDocument`'s table-of-contents chevron (24 grid, 2.1 stroke). */
export const TOC_CHEVRON_PATH = 'M19 9l-7 7-7-7';

/** External-link mark beside a link that leaves the site (24 grid, 2 stroke). */
export const EXTERNAL_LINK: Glyph = [
  { el: 'path', d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' },
  { el: 'polyline', points: '15 3 21 3 21 9' },
  { el: 'line', x1: '10', y1: '14', x2: '21', y2: '3' },
];

/** The FAQ search field's magnifier (24 grid, 2 stroke). */
export const SEARCH: Glyph = [
  { el: 'circle', cx: '11', cy: '11', r: '8' },
  { el: 'line', x1: '21', y1: '21', x2: '16.65', y2: '16.65' },
];
