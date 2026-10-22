/**
 * Turn a generated raw plate into the shipping plate.
 *
 * The image model returns whatever landscape size it supports (1774x887 in
 * practice), and the site needs eleven specific aspect ratios at specific pixel
 * widths. That conversion is deterministic, so it lives here rather than in the
 * generator's hands: the model composes, this crops, scales, seams and encodes.
 *
 *   node design/plates.mjs <raw-dir>
 *
 * `<raw-dir>` holds `<slot>-raw.png` for any slot listed below. Missing raws are
 * skipped, so this is safe to re-run while plates are still being generated. It
 * writes `public/img/<slot>.webp` and rewrites `src/data/plates.ts`, which is the
 * manifest `ImageSlot` reads to decide whether a slot has a plate at all.
 *
 * FIT is the one judgement call per slot, and it is recorded rather than guessed:
 *
 *   'fill'  anisotropic. Correct for a plate whose composition is horizontal
 *           bands — a filament, a tonal lift, a material cut. Squashing those
 *           vertically keeps every element at its intended fraction of the height,
 *           which is exactly what the seam rules depend on. A straight line stays
 *           a straight line.
 *   'cover' geometry-preserving centre (or edge) crop. Correct wherever the plate
 *           contains an OBJECT whose own proportions are stated in the prompt: the
 *           block on paper is "two and a half times as wide as it is tall", and a
 *           squash would make it four. The cost is that cropping 3:2 down to 3:1
 *           magnifies the subject — it fills more of the plate than the prompt
 *           asked for — which is the lesser of the two errors: right shape, wrong
 *           size beats wrong shape.
 *
 * `home-interstitial-2` was cut with 'cover' anchored to the bottom, to protect the
 * machined edge its prompt puts across the last 6%. It protected the edge and lost
 * the picture: a 4:1 slice off the bottom of a 3:2 frame is the empty half, and the
 * dongle the plate exists to show was above the crop. It takes 'fill' too — the
 * whole composition, at every element's intended share of the height.
 *
 * `home-statement` takes 'fill' rather than 'cover' even though it holds an object,
 * because what its prompt fixes is the bar's SHARE OF THE FRAME ("about one seventh
 * of the frame height") and not the bar's own aspect: the bar runs out of both
 * edges, so it has no aspect to preserve. Cropping made it a third of the height.
 *
 * FLOOR: every plate is lifted so its darkest pixel lands on the value of the
 * SECTION IT MEETS, not on a fixed number. DESIGN.md's Graphite Floor Rule is the
 * one a generated plate fails most often — the model returns darks at `#101012`,
 * because that is what "low key" means to it, and the plate then reads as a hole
 * punched in the page. But lifting every plate to one floor just inverts the
 * defect: `#1c1c1c` against `surface-raised` is a plate that glows. So the target
 * is the neighbour's own ground (`#222222` under the pinned moment, `#191919`
 * under the rest), which makes the top edge of a full-bleed band disappear. The
 * lift is a straight two-point map (darkest -> floor, white -> white): a little
 * shadow contrast, no hue shift.
 *
 * The two ivory plates are contained objects on paper with a hairline around them,
 * so they have no seam to hide and take the design system's own `#1c1b21` floor.
 *
 * SEAM: `white-bottom` guarantees the last rows arrive at #ffffff across the full
 * width. Two bands sit directly on top of an ivory section with no rule between
 * them (DESIGN.md, "The Seam Rule"), and a plate that stops two points short of
 * paper draws a grey line across the page at exactly the join it was supposed to
 * dissolve. The model gets close; this closes it.
 */
import sharp from "sharp";
import { readdirSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** ship: [w, h] is the pixel size in `ImageSlot`'s `ships` prop, and the ratio it renders at. */
const RAISED = 34; // surface-raised #222222, the pinned moment's ground
const BASE = 25; // surface-base #191919, every other dark section's ground
const GRAPHITE = 28; // #1c1b21, the design system's own darkest value

const PLATES = {
  "home-interstitial-1": {
    ship: [2560, 512],
    fit: "fill",
    floor: RAISED,
    seam: "white-bottom",
  },
  "home-statement": { ship: [2560, 1440], fit: "cover", floor: GRAPHITE },
  "home-interstitial-2": { ship: [2560, 640], fit: "fill", floor: BASE },
  "home-privacy": {
    ship: [2560, 1440],
    fit: "cover",
    position: "centre",
    floor: GRAPHITE,
  },
  "home-interstitial-3": {
    ship: [2880, 480],
    fit: "fill",
    floor: BASE,
    seam: "white-bottom",
  },
  "feature-usb-dac-interstitial": {
    ship: [2560, 512],
    fit: "fill",
    floor: BASE,
  },
  "feature-eq-interstitial": { ship: [2560, 512], fit: "fill", floor: BASE },
  "feature-library-interstitial": {
    ship: [2560, 512],
    fit: "fill",
    floor: BASE,
  },
  "feature-casting-interstitial": {
    ship: [2560, 512],
    fit: "fill",
    floor: BASE,
  },
  "feature-dsp-interstitial": { ship: [2560, 512], fit: "fill", floor: BASE },
  "feature-ai-enhancer-interstitial": {
    ship: [2560, 512],
    fit: "fill",
    floor: BASE,
  },
};

/**
 * A short linear ramp to opaque white over the last rows, composited after the
 * resize. It is deliberately tiny — under 3% of the plate — because it is closing
 * a two-point gap, not painting a fade: a long ramp would flatten the physical
 * lift the plate already carries and turn a photograph into a CSS gradient.
 */
function whiteBottom(width, height) {
  const band = Math.round(height * 0.028);
  return Buffer.from(
    `<svg width="${width}" height="${height}">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
           <stop offset="1" stop-color="#ffffff" stop-opacity="1"/>
         </linearGradient>
       </defs>
       <rect x="0" y="${height - band}" width="${width}" height="${band}" fill="url(#g)"/>
     </svg>`,
  );
}

const rawDir = process.argv[2];
if (!rawDir) {
  console.error("usage: node design/plates.mjs <raw-dir>");
  process.exit(1);
}

const outDir = join(ROOT, "public", "img");
mkdirSync(outDir, { recursive: true });

const built = [];
for (const [slot, spec] of Object.entries(PLATES)) {
  const raw = join(rawDir, `${slot}-raw.png`);
  if (!existsSync(raw)) continue;

  const [w, h] = spec.ship;

  /* Two-point levels: the plate's own darkest channel value lands on the floor and
     white stays white. Read off the source rather than assumed, because each
     generation comes back with a different black point. */
  const FLOOR = spec.floor;
  /*
     The black point is the 1st PERCENTILE, not the minimum.

     A single stray pixel decides `min` — the raws come back with a handful of true
     zeros beside a specular highlight — and anchoring the lift to that outlier
     leaves the actual dark field 15 points above where it was aimed. The
     percentile is read off a downsample, which is both faster and steadier than
     the full plate.
  */
  const { data: sample } = await sharp(raw)
    .resize(320)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const values = new Uint8Array(sample.length);
  for (let i = 0; i < sample.length; i++) values[i] = sample[i];
  values.sort();
  const black = values[Math.floor(values.length * 0.01)];
  const a = (255 - FLOOR) / (255 - black);
  const b = FLOOR - a * black;

  let pipeline = sharp(raw)
    .linear(a, b)
    .resize(w, h, {
      fit: spec.fit,
      position: spec.position ?? "centre",
      kernel: "lanczos3",
    });

  if (spec.seam === "white-bottom") {
    pipeline = pipeline.composite([
      { input: whiteBottom(w, h), top: 0, left: 0 },
    ]);
  }

  const out = join(outDir, `${slot}.webp`);
  const info = await pipeline.webp({ quality: 82, effort: 6 }).toFile(out);

  /* The seam is measured, not assumed: the mean of the bottom row, per channel. */
  const { data } = await sharp(out)
    .extract({ left: 0, top: h - 1, width: w, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let sum = 0;
  for (let i = 0; i < data.length; i += 3)
    sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
  const bottom = Math.round(sum / (data.length / 3));

  built.push(slot);
  /* Report the same percentile on the way out, not the minimum: lanczos rings a
     few pixels below the floor at every hard specular edge, and a `min` of 0 next
     to a field sitting at 34 says nothing about whether the lift landed. */
  const { data: after } = await sharp(out)
    .resize(320)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sorted = Uint8Array.from(after).sort();
  const floorAfter = sorted[Math.floor(sorted.length * 0.01)];
  console.log(
    `${slot.padEnd(34)} ${w}x${h} ${(info.size / 1024).toFixed(0).padStart(4)}KB fit=${spec.fit.padEnd(5)} ` +
      `floor ${black}->${floorAfter} (aim ${FLOOR}) bottom=${bottom}`,
  );
}

writeFileSync(
  join(ROOT, "src", "data", "plates.ts"),
  `/**
 * Which slots have a shipping plate. GENERATED by \`design/plates.mjs\` — do not
 * hand-edit; run the script instead.
 *
 * \`ImageSlot\` reads this rather than taking a \`src\` at every call site. A slot's
 * name already IS its filename (\`/img/<name>.webp\`), so a manifest is the whole of
 * the wiring: dropping a plate in \`public/img\` and re-running the script fills the
 * slot, and deleting one empties it back to the section's own ground, with no page
 * edited either way. DESIGN.md, "The Wrapper Survives".
 */
export const plates = new Set<string>([
${built.map((s) => `  '${s}',`).join("\n")}
]);
`,
);
console.log(
  `\n${built.length} plate(s) -> public/img, manifest -> src/data/plates.ts`,
);
