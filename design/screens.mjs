/**
 * Turn raw device captures into the shipping screen assets.
 *
 *   node design/screens.mjs <raw-dir>
 *
 * `<raw-dir>` holds the capture session's PNGs at the emulator's native
 * 1080x2400. SCREENS below maps a capture file to the name the site uses;
 * anything not listed is ignored, so a session can over-shoot and the site takes
 * only what it uses. Writes `public/screens/<name>.webp` and rewrites
 * `src/data/screens.ts`.
 *
 * WHY A SCRIPT AND NOT A DROP-IN
 *
 * The device frame is 278px of screen at 1x. A 1080px capture dropped in raw is
 * nearly 4x oversampled: a megabyte of PNG per phone, three phones on the home
 * page, and the browser resampling all of it on every paint of a scroll-driven
 * section. The device is also drawn for the capture's own size, so the one thing
 * this must never do is change the geometry — no crop, no letterbox, no squash.
 * It resizes and encodes, and that is all.
 *
 * SHIP AT 2x, NOT 3x. 556px is the device-pixel width of the screen on a retina
 * display at the widest the frame ever gets. A third pixel of detail is invisible
 * at 278 CSS px and costs about 60% more bytes. Lanczos down from 1080 is a 1.94x
 * reduction, inside the range where the kernel is averaging rather than throwing
 * rows away.
 *
 * NO SHARPENING. The source is a screenshot: already nyquist-clean vector output,
 * and unsharp-masking a downsampled UI puts halos on every 1px divider. The app's
 * own type is what carries these images; leave it alone.
 *
 * WHY THESE ARE CAPTURES AND NOT DRAWINGS
 *
 * The site drew these screens by hand for a year. `design/APP-PARITY.md` is the
 * bill for that: fifteen claims that had drifted from the app, three of them
 * inventions of features that never existed. A drawing of a UI drifts from the UI
 * on every release and nothing catches it. A capture cannot drift, and re-taking
 * one is a script run rather than a redraw.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** 2x the widest the screen is ever drawn. See "SHIP AT 2x" above. */
const W = 556;

/**
 * site name -> [capture file, what it shows].
 *
 * This list is exactly what the site RENDERS, and it is shorter than what the
 * capture session produced — `design/CAPTURES.md` is the full inventory, including
 * the home screen, the queue, the library-tab editor, the EQ's radar view and the
 * radio browser, none of which the six feature routes have a beat for. An asset in
 * `public/` that no page names is dead weight in every deploy, so a capture earns
 * its place here by having somewhere to go.
 *
 * The name is the contract: `<Phone screen>` renders `/screens/<name>.webp` and
 * nothing else, so putting a screen on the site is a capture plus a line here,
 * and no page is edited either way.
 *
 * Every one of these was taken against the same library — eighteen CC0 classical
 * recordings at 24-bit / 88.2, 96 and 192 kHz — so the device tells one story
 * across the whole site rather than a different one per page.
 */
const SCREENS = {
  // The lineup on the home page
  "now-playing": [
    "player-now-playing.png",
    "The player, mid-track, Handel, embedded portrait art",
  ],
  eq: ["eq-parametric.png", "The parametric equaliser with a multi-band curve"],
  library: ["library-albums.png", "The album grid"],

  // The hero
  /* Shot for this slot specifically. The hero renders the title at ~14px, the one
     place on the site where a track name is properly legible, so it needs a title
     short enough not to marquee — an earlier capture caught a long one mid-scroll
     and the first words a visitor read were "…Country) - II. Vltava". */
  "now-playing-hero": [
    "player-hero.png",
    "The player, Wagner, mid-track, above the fold",
  ],

  // usb-dac
  output: [
    "settings-output.png",
    "Output settings: USB DAC, direct path, on-board mode",
  ],
  "track-info": [
    "extra-track-metadata.png",
    "Track info: codec, sample rate, bit depth, path",
  ],
  fidelity: [
    "extra-fidelity-analysis-top.png",
    "Fidelity analysis: score, DR, loudness, peaks",
  ],
  "signal-path": [
    "player-signal.png",
    "The signal path, stage by stage, with added latency",
  ],
  /* The same sheet over a 44.1 kHz source with the DSP rack switched off, so the
     chain is four stages and the DSP row reads "Bit-exact bypass". The badge still
     says Resampled, because the emulator's only working output is AAudio SHARED at
     f32 and nothing on a virtual device can open an exclusive path. That is not a
     defect in the capture — it is the evidence for the beat it illustrates, which
     is that the badge refuses to claim bit-perfect when it has not got it. */
  "signal-clean": [
    "signal-clean.png",
    "The signal path over a matched-rate file, DSP bypassed",
  ],

  // eq
  "eq-filters": [
    "eq-filters.png",
    "One band open: the seven filter shapes, frequency, gain and Q",
  ],
  "eq-presets": ["eq-detail.png", "The preset list"],
  "eq-sculptor": [
    "extra-eq-sculptor.png",
    "The Sculptor tab: perceptual rather than numeric",
  ],

  // library
  tracks: [
    "library-tracks.png",
    "The flat track list with per-track format chips",
  ],
  sources: [
    "library-sources.png",
    "Library sources: local folder, network, sonic scan",
  ],
  album: ["library-album-detail.png", "One album open, tracklist and art"],

  // casting
  cast: [
    "settings-cast.png",
    "Cast discovery, real devices found on the network",
  ],
  "cast-sheet": ["extra-player-cast-sheet.png", "The in-player cast sheet"],
  receiver: [
    "extra-receiver.png",
    "The phone as a network endpoint: DLNA, FCast, MPD, LMS",
  ],

  // dsp
  dsp: [
    "settings-dsp.png",
    "The DSP rack: EQ, upsampler, limiter, crossfeed, dither",
  ],
  "dsp-sheet": [
    "extra-dsp-quick-sheet.png",
    "The in-player audio-processing sheet",
  ],
  playback: [
    "extra-settings-playback.png",
    "Playback: bit-perfect lock, DSD, precision, karaoke",
  ],

  // ai-enhancer
  ai: ["settings-ai.png", "The AI features hub and its model status"],
  "ai-enhancer": [
    "extra-ai-enhancer-on.png",
    "The AI enhancer on, and saying when it stands down",
  ],
  "ai-karaoke": [
    "extra-ai-karaoke-config.png",
    "AI karaoke: stem, quality, accelerator",
  ],
  "ai-neural": [
    "extra-ai-neural-processing.png",
    "The neural processing sheet with its CPU meter",
  ],
};

const rawDir = process.argv[2];
if (!rawDir) {
  console.error("usage: node design/screens.mjs <raw-dir>");
  process.exit(1);
}

const outDir = join(ROOT, "public", "screens");
mkdirSync(outDir, { recursive: true });

const built = [];
const missing = [];
for (const [name, [file, note]] of Object.entries(SCREENS)) {
  const raw = join(rawDir, file);
  if (!existsSync(raw)) {
    missing.push(`${name} <- ${file}`);
    continue;
  }

  const out = join(outDir, `${name}.webp`);
  const info = await sharp(raw)
    .resize(W, null, { kernel: "lanczos3" })
    .webp({ quality: 88, effort: 6 })
    .toFile(out);

  built.push({
    name,
    note,
    w: info.width,
    h: info.height,
    kb: info.size / 1024,
  });
  console.log(
    `${name.padEnd(18)} ${file.padEnd(34)} -> ${info.width}x${info.height} ` +
      `${(info.size / 1024).toFixed(0).padStart(3)}KB`,
  );
}

/* Each capture's size is written out rather than assumed, because the device is
   drawn for the image it holds: a capture from a differently-shaped phone gets a
   differently-shaped chassis instead of a crop or a letterbox. */
writeFileSync(
  join(ROOT, "src", "data", "screens.ts"),
  `/**
 * Which app captures ship, and the size of each.
 * GENERATED by \`design/screens.mjs\` — do not hand-edit; run the script instead.
 *
 * These are screenshots of the shipping Android app, taken on an emulator against
 * a library of CC0 classical recordings. They replace hand-drawn reproductions of
 * the same screens: a drawing of a UI drifts from the UI — see
 * \`design/APP-PARITY.md\` for the fifteen claims that already had — and a capture
 * cannot.
 */

/** A capture's pixel size, which the \`Phone\` draws its device for, and what it shows. */
export interface Capture {
  w: number;
  h: number;
  note: string;
}

export const screens = {
${built.map((b) => `  ${JSON.stringify(b.name)}: { w: ${b.w}, h: ${b.h}, note: ${JSON.stringify(b.note)} },`).join("\n")}
} satisfies Record<string, Capture>;

/** A capture's name: \`public/screens/<name>.webp\`. */
export type ScreenName = keyof typeof screens;
`,
);

console.log(
  `\n${built.length} screen(s) -> public/screens, manifest -> src/data/screens.ts`,
);
if (missing.length) console.log(`not captured yet: ${missing.join(", ")}`);
