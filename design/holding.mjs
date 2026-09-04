/**
 * Turn the generated raw into the two shipping plates for the holding page.
 *
 *   node design/holding.mjs <raw-dir>
 *
 * `<raw-dir>` holds `under-construction-raw.png`, the 1536x1024 landscape the
 * image model returns. This writes `public/img/holding/needle.webp` (landscape,
 * the desktop backdrop) and `public/img/holding/needle-portrait.webp` (the same
 * negative cropped to 3:4, for a phone).
 *
 * It is a separate script from `design/plates.mjs` on purpose. That one owns the
 * eleven numbered SLOTS of the real site and rewrites `src/data/plates.ts` from
 * its own list; the holding page is not one of those slots, it is referenced by
 * filename from one component, and it must survive `plates.mjs` being re-run.
 * Hence its own directory under `public/img/`.
 *
 * FLOOR. DESIGN.md's Graphite Floor Rule: darks are an even neutral graphite and
 * are never crushed to `#000000`. The model returns this scene at about `#060606`
 * because that is what "near darkness" means to it, and at that value the plate
 * reads as a hole punched in the page rather than as the page's own ground. The
 * lift is the same two-point map `plates.mjs` uses (darkest -> floor, white ->
 * white), and the floor is `surface-base` `#191919`, because that is the ground
 * the holding page paints behind it and the two have to meet invisibly.
 *
 * The black point is read off the 1st PERCENTILE rather than off the darkest
 * pixel: a handful of true zeros beside the specular on the tonearm would
 * otherwise decide the map for the whole frame and leave the dark field fifteen
 * points high.
 *
 * CROP. The landscape keeps the full negative. The portrait takes a 768x1024
 * window whose left edge sits at x=620, which is the widest 3:4 window that
 * still holds the whole cartridge and the arm's exit; anchored any further right
 * the stylus tip lands under the phone's own copy.
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/img/holding");

/** `surface-base` #191919: the ground the holding page paints behind the plate. */
const FLOOR = 0x19;

const rawDir = process.argv[2];
if (!rawDir) {
  console.error("usage: node design/holding.mjs <raw-dir>");
  process.exit(1);
}

const raw = join(rawDir, "under-construction-raw.png");
if (!existsSync(raw)) {
  console.error(`missing ${raw}`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

/* The 1st percentile of the luminance histogram, as the black point. */
const { data, info } = await sharp(raw)
  .greyscale()
  .resize(256, null, { fit: "inside" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const histogram = new Array(256).fill(0);
for (const value of data) histogram[value] += 1;
const floorIndex = Math.round(info.width * info.height * 0.01);
let seen = 0;
let black = 0;
for (let value = 0; value < 256; value += 1) {
  seen += histogram[value];
  if (seen >= floorIndex) {
    black = value;
    break;
  }
}

/* linear(a, b) is a*x + b. Two points: black -> FLOOR, 255 -> 255. */
const a = (255 - FLOOR) / (255 - black);
const b = FLOOR - a * black;
console.log(`black point ${black} -> ${FLOOR}  (a=${a.toFixed(4)} b=${b.toFixed(2)})`);

const lifted = await sharp(raw).linear(a, b).toBuffer();

await sharp(lifted)
  .webp({ quality: 82 })
  .toFile(join(OUT, "needle.webp"));

await sharp(lifted)
  .extract({ left: 620, top: 0, width: 768, height: 1024 })
  .webp({ quality: 82 })
  .toFile(join(OUT, "needle-portrait.webp"));

console.log("wrote public/img/holding/needle.webp and needle-portrait.webp");
