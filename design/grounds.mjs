/**
 * Section grounds: the drawn texture behind each band.
 *
 * Run `node design/grounds.mjs` and it writes `public/grounds/*.svg`.
 *
 * A flat fill read as unfinished, so every major band carries one hairline motif
 * of its own. Each motif is something audio hardware or a signal actually is,
 * drawn the way an engraver would draw it: one ink, hairline strokes, no glow.
 * A band's motif is chosen once in its component with a `ground-*` class, and
 * no two adjacent bands share one. The catalogue and the placement live in
 * DESIGN.md, "Section Grounds".
 *
 * Colours are the band's own ink tokens at low alpha, baked into the file, so a
 * light motif only ever sits on `band-ivory` and a dark one on graphite. The
 * fade toward the copy is drawn inside the SVG as well, which keeps the CSS to a
 * placement and a size.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "grounds",
);
mkdirSync(OUT, { recursive: true });

const INK = "#171717"; // band-ink
const GOLD_INK = "#a16400"; // band-gold-ink
const WHITE = "#ffffff";
const GOLD = "#e8b84b";

const TAU = Math.PI * 2;
const f1 = (n) => Math.round(n * 10) / 10;

/* Deterministic, so a re-run is a no-op diff. */
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}

function svg(name, w, h, body) {
  const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>\n`;
  writeFileSync(join(OUT, `${name}.svg`), out);
  console.log(`${name}.svg  ${(out.length / 1024).toFixed(1)}K`);
}

/* Whole pixels: these are drawn at 1:1 or larger, so a tenth of a pixel is
   file size nobody can see. */
function polyline(pts) {
  return (
    "M" + pts.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join("L")
  );
}

/* ── grooves · light ─────────────────────────────────────────────────────────
   A record seen from above, its centre off the right edge. Grooves run in
   tracks with a wider land between them, as a pressed side really does, and two
   opposed sectors catch the overhead light. Fades out toward the copy. */
{
  const W = 2000,
    H = 1000,
    cx = 2080,
    cy = 500;
  const r = rng(7);
  let rings = "",
    lit = "";
  let rad = 230;
  while (rad < 1560) {
    const track = 26 + Math.floor(r() * 30);
    for (let i = 0; i < track && rad < 1560; i++) {
      rings += `<circle cx="${cx}" cy="${cy}" r="${f1(rad)}"/>`;
      const a0 = (196 * Math.PI) / 180,
        a1 = (226 * Math.PI) / 180;
      lit += `<path d="M${f1(cx + rad * Math.cos(a0))} ${f1(cy + rad * Math.sin(a0))}A${f1(rad)} ${f1(rad)} 0 0 1 ${f1(cx + rad * Math.cos(a1))} ${f1(cy + rad * Math.sin(a1))}"/>`;
      rad += 5.6;
    }
    rad += 15; // the land between two tracks
  }
  svg(
    "grooves",
    W,
    H,
    `
<defs><linearGradient id="f" x1="0" x2="1"><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset=".72" stop-color="#fff" stop-opacity=".45"/><stop offset=".9" stop-color="#fff"/></linearGradient>
<linearGradient id="v" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".14" stop-color="#fff"/><stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="m"><rect width="${W}" height="${H}" fill="url(#f)"/></mask><mask id="n"><rect width="${W}" height="${H}" fill="url(#v)"/></mask></defs>
<g mask="url(#n)"><g mask="url(#m)" fill="none" stroke="${INK}">
<g stroke-opacity=".085" stroke-width=".8">${rings}</g>
<g stroke-opacity=".07" stroke-width="1.6">${lit}</g>
<circle cx="${cx}" cy="${cy}" r="214" stroke-opacity=".16" stroke-width="1"/>
</g></g>`,
  );
}

/* ── samples · dark ──────────────────────────────────────────────────────────
   A discrete-time plot: the signal as the DAC receives it, one stem per sample,
   with the continuous curve it reconstructs to drawn as a single gold hairline.
   This is what "bit-perfect" is about, drawn rather than said. */
{
  const W = 2400,
    H = 640,
    base = 320,
    step = 22;
  const sig = (x) =>
    0.58 * Math.sin((TAU * x) / 760 + 0.4) +
    0.27 * Math.sin((TAU * x) / 270 + 1.1) +
    0.1 * Math.sin((TAU * x) / 104);
  const env = (x) => 0.35 + 0.65 * Math.sin((Math.PI * x) / W) ** 1.4;
  const A = 230;
  let stems = "",
    heads = "";
  for (let x = step / 2; x < W; x += step) {
    const y = base - A * env(x) * sig(x);
    stems += `M${f1(x)} ${base}V${f1(y)}`;
    heads += `<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6"/>`;
  }
  const curve = [];
  for (let x = 0; x <= W; x += 6) curve.push([x, base - A * env(x) * sig(x)]);
  /* The sample grid itself, one dot per sample instant and amplitude step, as
     Column draws its plots. */
  const grid = `<pattern id="d" width="${step}" height="16" patternUnits="userSpaceOnUse" x="${step / 2 - 0.6}"><rect width="1.2" height="1.2" fill="${WHITE}" fill-opacity=".09"/></pattern>`;
  svg(
    "samples",
    W,
    H,
    `
<defs><linearGradient id="f" x1="0" x2="1"><stop offset=".08" stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff" stop-opacity=".45"/><stop offset=".55" stop-color="#fff"/><stop offset=".9" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="m"><rect width="${W}" height="${H}" fill="url(#f)"/></mask>${grid}</defs>
<g mask="url(#m)">
<rect width="${W}" height="${H}" fill="url(#d)"/>
<path d="M0 ${base}H${W}" stroke="${WHITE}" stroke-opacity=".07" stroke-dasharray="2 6"/>
<path d="${stems}" stroke="${WHITE}" stroke-opacity=".075" stroke-width="1"/>
<path d="${polyline(curve)}" fill="none" stroke="${GOLD}" stroke-opacity=".16" stroke-width="1.2"/>
<g fill="${GOLD}" fill-opacity=".3">${heads}</g>
</g>`,
  );
}

/* ── halftone · light ────────────────────────────────────────────────────────
   A printed dot screen whose dots swell toward the two top corners and vanish
   before they reach the centred headline. Paper, not pixels. */
{
  const W = 2400,
    H = 1100,
    s = 18;
  let dots = "";
  for (let y = s / 2; y < H; y += s) {
    for (let x = s / 2; x < W; x += s) {
      const dl = Math.hypot(x / W, (y / H) * 0.55);
      const dr = Math.hypot((W - x) / W, (y / H) * 0.55);
      const t = Math.max(0, 1 - Math.min(dl, dr) / 0.5);
      const rad = 3.6 * t ** 1.35;
      if (rad > 0.45)
        dots += `<circle cx="${Math.round(x)}" cy="${Math.round(y)}" r="${f1(rad)}"/>`;
    }
  }
  svg("halftone", W, H, `<g fill="${INK}" fill-opacity=".13">${dots}</g>`);
}

/* ── dither · light ──────────────────────────────────────────────────────────
   "Bit for bit", drawn: a tonal ramp rising off the floor of the band, rendered
   the way a 1-bit display has to, through a 4x4 Bayer matrix. Every square is
   either on or off; the gradient exists only in their density. */
{
  const W = 2400,
    H = 420,
    c = 10,
    sq = 3.4;
  const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  let d = "";
  for (let j = 0; j < H / c; j++) {
    for (let i = 0; i < W / c; i++) {
      const x = i * c,
        y = j * c;
      const rise = Math.max(0, (y / H - 0.12) / 0.88) ** 1.7;
      const side = 0.42 + 0.58 * Math.min(1, Math.abs(x - W / 2) / (W * 0.3));
      const v = rise * side;
      if (v > (bayer[(j % 4) * 4 + (i % 4)] + 0.5) / 16)
        d += `M${x + 3} ${y + 3}h${sq}v${sq}h-${sq}z`;
    }
  }
  svg("dither", W, H, `<path d="${d}" fill="${INK}" fill-opacity=".11"/>`);
}

/* ── guilloche · dark ────────────────────────────────────────────────────────
   The engraved rosette of a certificate or a watch dial: interleaved waved
   rings, every line one gold hairline. It sits behind the pricing band, which
   is the one place the site talks about value. */
{
  const W = 1600,
    H = 1600,
    cx = 800,
    cy = 800,
    N = 260;
  const ring = (R, A, lobes, count, mod = 0) => {
    let d = "";
    for (let k = 0; k < count; k++) {
      const ph = (k / count) * TAU;
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * TAU;
        const rr =
          R + A * Math.sin(lobes * t + ph) + mod * Math.sin(lobes * 3 * t - ph);
        pts.push([cx + rr * Math.cos(t), cy + rr * Math.sin(t)]);
      }
      d += polyline(pts) + "Z";
    }
    return d;
  };
  svg(
    "guilloche",
    W,
    H,
    `
<defs><radialGradient id="f"><stop offset=".25" stop-color="#fff" stop-opacity=".35"/><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="m"><rect width="${W}" height="${H}" fill="url(#f)"/></mask></defs>
<g mask="url(#m)" fill="none" stroke="${GOLD}" stroke-width=".8">
<path stroke-opacity=".085" d="${ring(620, 48, 28, 14)}"/>
<path stroke-opacity=".07" d="${ring(455, 36, 40, 12, 5)}"/>
<path stroke-opacity=".065" d="${ring(300, 26, 22, 10)}"/>
<circle cx="${cx}" cy="${cy}" r="720" stroke-opacity=".12"/>
<circle cx="${cx}" cy="${cy}" r="728" stroke-opacity=".08"/>
</g>`,
  );
}

/* ── interference · dark ─────────────────────────────────────────────────────
   Two point sources above the band and the rings they throw: where the rings
   cross, the moiré is the interference pattern itself. Physics, not a filter. */
{
  const W = 2400,
    H = 1400;
  const src = [
    [860, -160],
    [1540, -160],
  ];
  let d = "";
  for (const [x, y] of src)
    for (let r = 40; r < 1700; r += 13)
      d += `<circle cx="${x}" cy="${y}" r="${r}"/>`;
  svg(
    "interference",
    W,
    H,
    `
<defs><linearGradient id="f" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".85" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="g" cx=".5" cy="0" r=".7"><stop offset=".2" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="m"><rect width="${W}" height="${H}" fill="url(#f)"/></mask><mask id="n"><rect width="${W}" height="${H}" fill="url(#g)"/></mask></defs>
<g mask="url(#m)"><g mask="url(#n)" fill="none" stroke="${WHITE}" stroke-opacity=".085" stroke-width=".9">${d}</g></g>`,
  );
}

/* ── spectrum · light ────────────────────────────────────────────────────────
   A third-octave analyser along the foot of the band: hairline bars rising out
   of the floor, each with its peak-hold cap. The caps are the only gold. */
{
  const W = 2400,
    H = 520,
    n = 128,
    pitch = W / n;
  const r = rng(31);
  let bars = "",
    caps = "";
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    const tilt = 0.82 - 0.38 * u; // pink-ish roll-off
    const body =
      0.18 * Math.exp(-(((u - 0.18) / 0.09) ** 2)) +
      0.12 * Math.exp(-(((u - 0.55) / 0.14) ** 2));
    const v = Math.min(0.96, (tilt + body) * (0.62 + 0.38 * r()));
    const h = v * 0.62 * H;
    const x = i * pitch + pitch / 2;
    bars += `<rect x="${f1(x - 2)}" y="${f1(H - h)}" width="4" height="${f1(h)}"/>`;
    caps += `M${f1(x - 3)} ${f1(H - h - 6 - r() * 10)}h6`;
  }
  svg(
    "spectrum",
    W,
    H,
    `
<defs><linearGradient id="b" x2="0" y2="1"><stop offset=".35" stop-color="${INK}" stop-opacity="0"/><stop offset="1" stop-color="${INK}" stop-opacity=".085"/></linearGradient>
<linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".25" stop-color="#fff"/><stop offset=".4" stop-color="#fff" stop-opacity=".45"/><stop offset=".6" stop-color="#fff" stop-opacity=".45"/><stop offset=".75" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity=".3"/></linearGradient>
<mask id="m"><rect width="${W}" height="${H}" fill="url(#f)"/></mask></defs>
<g mask="url(#m)"><g fill="url(#b)">${bars}</g><path d="${caps}" stroke="${GOLD_INK}" stroke-opacity=".22" stroke-width="1.2"/></g>`,
  );
}

/* ── harmonograph · light ───────────────────────────────────────────────────
   The Victorian drawing machine: two damped pendulums at a 3:2 ratio, a perfect
   fifth, with a slight detune so the figure precesses as it decays. One
   continuous line, the interval itself made visible. */
{
  const W = 1400,
    H = 1400,
    cx = 700,
    cy = 700,
    R = 300,
    N = 7000,
    T = 240;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * T;
    const d = Math.exp(-0.0085 * t);
    const x = R * d * (Math.sin(3.006 * t + 1.2) + 0.12 * Math.sin(1.002 * t));
    const y = R * d * (Math.sin(2 * t) + 0.12 * Math.cos(1.002 * t));
    pts.push([cx + x * 1.9, cy + y * 1.9]);
  }
  svg(
    "harmonograph",
    W,
    H,
    `<path d="${polyline(pts)}" fill="none" stroke="${INK}" stroke-opacity=".075" stroke-width=".8"/>`,
  );
}
