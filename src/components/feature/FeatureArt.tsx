import { clsx as cx } from 'clsx';
import type { ClassProps } from '../class-props';
import './FeatureArt.css';

/**
 * The one axis that varies.
 *
 * Six drawings sharing a ground, a horizon, one ink and one stroke weight is a
 * shared ROOM, and it was one constant too many: nothing distinguished plate two
 * from plate five except its subject. Stripe's card system is the model — geometry
 * byte-identical across the set, exactly one variable moving. Here the variable is
 * where the light sits, stepping 60 degrees around the plate, so the six read as
 * one hand drawing six things under six times of day.
 */
const LIGHT: Record<string, [number, number]> = {
  'usb-dac': [26, 86],
  eq: [74, 88],
  library: [12, 70],
  casting: [88, 64],
  dsp: [42, 94],
  'ai-enhancer': [64, 46],
};

/* The 32 EQ bands, as a real response curve: one broad cut at 250 Hz, one narrow
   peak at 3.1 kHz, a shelf lifting the top. Heights are the drawn magnitude. */
const EQ_BANDS = Array.from({ length: 32 }, (_, i) => {
  const t = i / 31;
  const dip = -30 * Math.exp(-(((t - 0.22) / 0.1) ** 2));
  const peak = 42 * Math.exp(-(((t - 0.62) / 0.045) ** 2));
  const shelf = 26 / (1 + Math.exp(-(t - 0.82) * 18));
  return dip + peak + shelf;
});
const eqX = (i: number) => 78 + (i * (640 - 156)) / 31;
const eqY = (v: number) => 252 - v;
const eqCurve = EQ_BANDS.map((v, i) => `${i === 0 ? 'M' : 'L'}${eqX(i).toFixed(1)},${eqY(v).toFixed(1)}`).join(' ');

/* The AI plate: one spectrum, drawn twice.
   A lossy encoder puts a brick wall at the top of the band, so the compressed take
   falls off a cliff at CUT and the restored take carries the top octave on. The two
   curves have to be the SAME curve up to the cliff, or the plate is arguing that
   the processing changed something it does not change. */
const CUT = 0.6;
/* The only plate that BLEEDS. Everything else terminates inside the safe area
   because its last node means something; a spectrum has no last node, and
   closing the reconstructed fill inside the frame drew a hard vertical edge
   in the middle of the plate that read as a clipping bug. */
const specX = (t: number) => 78 + t * (664 - 78);
/** The shared envelope: full band energy, gently declining with frequency. */
const body = (t: number) => 252 - 118 * (1 - 0.42 * t) * (1 - 0.1 * Math.cos(t * 9));
const restored = (t: number) => body(t);
const compressed = (t: number) => (t <= CUT ? body(t) : 252 - (252 - body(CUT)) * Math.exp(-((t - CUT) / 0.028)));
const trace = (fn: (t: number) => number, from = 0, to = 1) => {
  const n = 120;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = from + ((to - from) * i) / n;
    return `${i === 0 ? 'M' : 'L'}${specX(t).toFixed(1)},${fn(t).toFixed(1)}`;
  }).join(' ');
};
/** The reconstructed region as a shape bounded by the curve, never a rectangle. */
const rebuilt = `${trace(restored, CUT, 1)} L${specX(1).toFixed(1)},252 L${specX(CUT).toFixed(1)},252 Z`;

export interface FeatureArtProps extends ClassProps {
  slug: string;
  /**
   * The plate's aspect. Given as a CSS custom property so the GRID can change it
   * per breakpoint: a narrow card wraps its title onto a second line, which grows
   * the copy block while the plate shrinks with the column, and the plate's share
   * of the card falls away. Measured at 768 it was 52%, under the floor of every
   * shipped reference (Linear 100%, Raycast `margin-top:auto`, Clerk 59% floor).
   */
  ratio?: string;
}

/**
 * Six plates, one grammar.
 *
 * The features index was six wide rows of body copy, which is a table of
 * contents rather than a page: nothing had mass, so nothing invited a click. It
 * becomes a 2x3 grid, and a grid of six cards needs six pieces of art. We have no
 * photography and will not have any, so the art is drawn.
 *
 * The hard part of six drawings is not drawing them, it is making them read as a
 * FAMILY rather than as six unrelated pictures. Five things are held constant and
 * nothing else is:
 *
 *   1. One ground. Every plate is the same radial off `art-mid` into `art-edge`,
 *      seated low and left, so the six sit on the page like one material.
 *   2. One horizon. Every drawing rests its weight on y=252 of a 640x360 stage,
 *      which is 70% down. It was 79%, and that put the subject inside the card's
 *      dissolve: the casting plate lost its return arc and the library plate lost
 *      the feet of its sleeves. The 30% below the horizon is now empty ground, and
 *      the dissolve has somewhere to happen that costs no drawing anything.
 *      Six drawings that each find their own baseline read as a collage.
 *   3. One ink. Gold draws the SUBJECT and only the subject. Everything the
 *      subject is measured against is white at 8 to 14%.
 *   4. One weight. 2px for the subject, 1px for the scaffolding, at stage scale.
 *   5. One idea per plate, carrying one real number from `src/data/features.ts`.
 *      No plate is decorative and no plate invents a figure.
 *
 * The stage is 640x360 and the drawings keep their subject inside the middle 78%,
 * so a card can crop with `slice` at any aspect from 21:9 down to 4:3 without
 * cutting the argument. That is what makes it "recalculated for different widths":
 * the art is geometry, not a bitmap, so it re-fits rather than re-scaling.
 */
export default function FeatureArt({ slug, className, ratio = 'var(--art-ratio, 16 / 9)' }: FeatureArtProps) {
  const uid = `fa-${slug}`;
  const [lx, ly] = LIGHT[slug] ?? [26, 86];

  return (
    <div
      className={cx(['feature-art relative overflow-hidden', className])}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 360"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={`${uid}-ground`} cx={`${lx}%`} cy={`${ly}%`} r="96%">
            <stop offset="0%" stopColor="var(--color-art-mid)" />
            <stop offset="58%" stopColor="var(--color-art-edge)" />
            <stop offset="100%" stopColor="var(--color-phone-screen)" />
          </radialGradient>
          {/*
        USER SPACE, not objectBoundingBox. The default units resolve the gradient
        against the shape's bounding box, and a horizontal line has a box of zero
        height: the gradient degenerates and the stroke falls back to nothing. That
        is what silently greyed out the USB path and all four DSP bars.
      */}
          <linearGradient id={`${uid}-ink`} gradientUnits="userSpaceOnUse" x1="78" y1="0" x2="562" y2="0">
            <stop offset="0%" stopColor="var(--color-gold-deep)" />
            <stop offset="46%" stopColor="var(--color-gold)" />
            <stop offset="100%" stopColor="var(--color-gold-light)" />
          </linearGradient>
          <linearGradient id={`${uid}-fade`} gradientUnits="userSpaceOnUse" x1="78" y1="252" x2="78" y2="120">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="640" height="360" fill={`url(#${uid}-ground)`} />
        {/* The horizon every plate stands on. */}
        <line x1="0" y1="252.5" x2="640" y2="252.5" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        {slug === 'usb-dac' && (
          <g>
            {/* What Android does to the file: a path that steps down twice and thins
              as it loses rate and then depth. */}
            <path
              d="M78,158 H236 V186 H400 V214 H562"
              fill="none"
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="7"
              strokeLinecap="square"
            />
            {/* What this app does: one width, one level, four stops, no steps. */}
            <path d="M78,252 H562" fill="none" stroke={`url(#${uid}-ink)`} strokeWidth="7" strokeLinecap="round" />
            {[78, 239, 400, 562].map((x) => (
              <g>
                <circle cx={x} cy="252" r="13" fill="var(--color-art-edge)" />
                <circle cx={x} cy="252" r="13" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
                <circle cx={x} cy="252" r="4.5" fill="var(--color-gold)" />
              </g>
            ))}
            <text x="78" y="122" fill="rgba(255,255,255,0.95)" fontSize="76" fontWeight="700" letterSpacing="-2.6">
              768
              <tspan dx="16" fill="rgba(255,255,255,0.34)" fontSize="26" fontWeight="600" letterSpacing="0">
                kHz
              </tspan>
            </text>
          </g>
        )}
        {slug === 'eq' && (
          <g>
            {EQ_BANDS.map((v, i) => (
              <line
                x1={eqX(i)}
                y1="252"
                x2={eqX(i)}
                y2={eqY(v)}
                stroke={v > 6 || v < -6 ? 'rgba(232,184,75,0.34)' : 'rgba(255,255,255,0.10)'}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            <path d={eqCurve} fill="none" stroke={`url(#${uid}-ink)`} strokeWidth="5" strokeLinejoin="round" />
            <text x="78" y="122" fill="rgba(255,255,255,0.95)" fontSize="76" fontWeight="700" letterSpacing="-2.6">
              32
              <tspan dx="16" fill="rgba(255,255,255,0.34)" fontSize="26" fontWeight="600" letterSpacing="0">
                bands
              </tspan>
            </text>
          </g>
        )}
        {slug === 'library' && (
          <g>
            {/* Twelve sleeves on a shelf. Two are lit, which is the whole point of
              eight ways in: any one of them lands on the same record. */}
            {Array.from({ length: 12 }, (_, i) => {
              const x = 78 + i * 40;
              const h = 78 + ((i * 37) % 5) * 10;
              const lit = i === 4 || i === 9;
              return (
                <g>
                  <rect
                    x={x}
                    y={252 - h}
                    width="30"
                    height={h}
                    rx="4"
                    fill={lit ? 'rgba(232,184,75,0.16)' : 'rgba(255,255,255,0.045)'}
                    stroke={lit ? 'var(--color-gold)' : 'rgba(255,255,255,0.11)'}
                    strokeWidth={lit ? 2 : 1}
                  />
                  <line
                    x1={x + 7}
                    y1={252 - h + 16}
                    x2={x + 23}
                    y2={252 - h + 16}
                    stroke={lit ? 'var(--color-gold)' : 'rgba(255,255,255,0.14)'}
                    strokeWidth="2"
                  />
                </g>
              );
            })}
            <text x="78" y="122" fill="rgba(255,255,255,0.95)" fontSize="76" fontWeight="700" letterSpacing="-2.6">
              15
              <tspan dx="16" fill="rgba(255,255,255,0.34)" fontSize="26" fontWeight="600" letterSpacing="0">
                formats
              </tspan>
            </text>
          </g>
        )}
        {slug === 'casting' && (
          <g>
            {/* Both directions at once, which is the feature: send to a renderer, or
              be one for four protocols. */}
            <circle cx="118" cy="252" r="17" fill="var(--color-art-edge)" stroke="var(--color-gold)" strokeWidth="2" />
            <circle cx="118" cy="252" r="5.5" fill="var(--color-gold)" />
            <circle
              cx="522"
              cy="252"
              r="17"
              fill="var(--color-art-edge)"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="2"
            />
            <path d="M135,236 C240,180 400,180 505,236" fill="none" stroke={`url(#${uid}-ink)`} strokeWidth="4" />
            <path
              d="M505,264 C400,320 240,320 135,264"
              fill="none"
              stroke="rgba(255,255,255,0.20)"
              strokeWidth="4"
              strokeDasharray="9 9"
            />
            {[1, 2, 3].map((n) => (
              <circle cx="118" cy="252" r={17 + n * 26} fill="none" stroke="rgba(232,184,75,0.13)" strokeWidth="1.5" />
            ))}
            <text x="78" y="122" fill="rgba(255,255,255,0.95)" fontSize="76" fontWeight="700" letterSpacing="-2.6">
              4
              <tspan dx="16" fill="rgba(255,255,255,0.34)" fontSize="26" fontWeight="600" letterSpacing="0">
                protocols
              </tspan>
            </text>
          </g>
        )}
        {slug === 'dsp' && (
          <g>
            {/* Headroom, drawn to scale. 16, 24, 32 and 64 bit as four bars whose
              lengths are their real ratios, and only the last one is gold. */}
            {[
              { bits: 16, y: 144 },
              { bits: 24, y: 180 },
              { bits: 32, y: 216 },
              { bits: 64, y: 252 },
            ].map(({ bits, y }) => {
              const w = (bits / 64) * 484;
              const lit = bits === 64;
              return (
                <g>
                  <line x1="78" y1={y} x2="562" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  <line
                    x1="78"
                    y1={y}
                    x2={78 + w}
                    y2={y}
                    stroke={lit ? `url(#${uid}-ink)` : 'rgba(255,255,255,0.17)'}
                    strokeWidth={lit ? 9 : 6}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
            <text x="78" y="122" fill="rgba(255,255,255,0.95)" fontSize="76" fontWeight="700" letterSpacing="-2.6">
              8
              <tspan dx="16" fill="rgba(255,255,255,0.34)" fontSize="26" fontWeight="600" letterSpacing="0">
                voicings
              </tspan>
            </text>
          </g>
        )}
        {slug === 'ai-enhancer' && (
          <g>
            {/* The same spectrum twice. The compressed take stops at the brick wall
              the encoder left; the restored take carries the top octave on. */}
            <path d={rebuilt} fill={`url(#${uid}-fade)`} />
            <path d={trace(compressed)} fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="4" />
            <path d={trace(restored)} fill="none" stroke={`url(#${uid}-ink)`} strokeWidth="4" />
            <line
              x1={specX(CUT)}
              y1="150"
              x2={specX(CUT)}
              y2="252"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
              strokeDasharray="5 6"
            />
            <text x="78" y="122" fill="rgba(255,255,255,0.95)" fontSize="76" fontWeight="700" letterSpacing="-2.6">
              22
              <tspan dx="16" fill="rgba(255,255,255,0.34)" fontSize="26" fontWeight="600" letterSpacing="0">
                kHz rebuilt
              </tspan>
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
