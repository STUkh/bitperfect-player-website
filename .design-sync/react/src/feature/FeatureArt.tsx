import { cx } from '../lib/site';

export type FeatureArtSlug = 'usb-dac' | 'eq' | 'library' | 'casting' | 'dsp' | 'ai-enhancer';

export interface FeatureArtProps {
  /** Which feature's drawing: usb-dac, eq, library, casting, dsp or ai-enhancer. */
  slug: FeatureArtSlug;
  /** CSS aspect-ratio of the band. Default `3 / 1`. */
  ratio?: string;
  /** Extra classes on the root (usually `w-full`). */
  className?: string;
}

const W = 600;
const H = 152; // the horizon
const X0 = 48;
const X1 = 552;

const path = (pts: [number, number][]) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');
const sample = (fn: (t: number) => number, x0: number, x1: number, n = 120) =>
  Array.from({ length: n + 1 }, (_, i) => [x0 + (i / n) * (x1 - x0), fn(i / n)] as [number, number]);
const area = (line: string, x0: number, x1: number) => `${line}L${x1},${H}L${x0},${H}Z`;

const eqFn = (t: number) =>
  H - 44 + 26 * Math.exp(-(((t - 0.2) / 0.11) ** 2)) - 58 * Math.exp(-(((t - 0.6) / 0.05) ** 2)) - 22 / (1 + Math.exp(-(t - 0.86) * 20));
const eqLine = path(sample(eqFn, X0, X1));
const eqPeak: [number, number] = [X0 + 0.6 * (X1 - X0), eqFn(0.6)];
const eqTicks = Array.from({ length: 32 }, (_, i) => X0 + (i * (X1 - X0)) / 31);

const COVER = 54;
const covers = Array.from({ length: 8 }, (_, i) => ({ x: 57 + i * 62, lit: i === 3 }));

const partials = Array.from({ length: 8 }, (_, i) => ({ x: 84 + i * 62, y: H - 112 / (i + 1) ** 0.75 }));
const envelope = path(sample((t) => H - 112 / (1 + t * 7) ** 0.75, 84, 84 + 7 * 62, 60));

const CUT = 0.58;
const specFn = (t: number) => H - 96 * (1 - 0.45 * t) * (1 - 0.08 * Math.cos(t * 9));
const specEnd = W + 8;
const cutX = X0 + CUT * (specEnd - X0);
const measured = path(sample((t) => specFn(t * CUT), X0, cutX, 80));
const inferred = path(sample((t) => specFn(CUT + t * (1 - CUT)), cutX, specEnd, 60));

/**
 * The drawn plate at the head of a feature card: a short 3:1 band with one
 * gold idea per feature (direct path, EQ curve, album row, cast arc, harmonic
 * partials, inferred spectrum) standing on a faint horizon. No text and no
 * ground of its own, so it takes the card's surface; FeaturesTeaser puts one
 * on each of its six cards.
 */
export function FeatureArt({ slug, ratio = '3 / 1', className }: FeatureArtProps) {
  const uid = `fa-${slug}`;
  return (
    <div className={cx('feature-art relative overflow-hidden', className)} style={{ aspectRatio: ratio }} aria-hidden="true">
      <svg viewBox={`0 0 ${W} 200`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${uid}-ink`} gradientUnits="userSpaceOnUse" x1={X0} y1="0" x2={X1} y2="0">
            <stop offset="0%" stopColor="var(--color-gold-deep)"></stop>
            <stop offset="50%" stopColor="var(--color-gold)"></stop>
            <stop offset="100%" stopColor="var(--color-gold-light)"></stop>
          </linearGradient>
          <linearGradient id={`${uid}-fall`} gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2={H}>
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.2"></stop>
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0"></stop>
          </linearGradient>
        </defs>

        <g transform="translate(0 14)">
          <line x1="0" y1={H + 0.5} x2={W} y2={H + 0.5} stroke="rgba(255,255,255,0.08)" strokeWidth="1"></line>

          {slug === 'usb-dac' && (
            <g fill="none" strokeLinecap="round">
              <path d={`M${X0 + 14},${H - 30} C110,56 190,48 262,48`} stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="2 8" />
              <path d={`M338,48 C410,48 490,56 ${X1 - 14},${H - 30}`} stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="2 8" />
              <path d={`M${X0},${H - 30}H${X1}`} stroke={`url(#${uid}-ink)`} strokeWidth="3.5" />
              <circle cx={X0} cy={H - 30} r="7" fill="var(--color-glass-surface)" stroke="var(--color-gold-deep)" strokeWidth="3" />
              <circle cx={X1} cy={H - 30} r="7" fill="var(--color-gold-light)" />
            </g>
          )}

          {slug === 'eq' && (
            <g fill="none">
              {eqTicks.map((x) => (
                <line key={x} x1={x} y1={H} x2={x} y2={H - 6} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
              ))}
              <path d={area(eqLine, X0, X1)} fill={`url(#${uid}-fall)`} />
              <path d={eqLine} stroke={`url(#${uid}-ink)`} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx={eqPeak[0]} cy={eqPeak[1]} r="7" fill="var(--color-glass-surface)" stroke="var(--color-gold-light)" strokeWidth="3" />
            </g>
          )}

          {slug === 'library' && (
            <g>
              {covers.map(({ x, lit }) =>
                lit ? (
                  <g key={x}>
                    <rect x={x - 5} y={H - COVER - 20} width={COVER + 10} height={COVER + 10} rx="6" fill="rgba(232,184,75,0.12)" stroke={`url(#${uid}-ink)`} strokeWidth="3" />
                    <circle cx={x + COVER / 2} cy={H - COVER / 2 - 15} r="15" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" />
                    <circle cx={x + COVER / 2} cy={H - COVER / 2 - 15} r="3.5" fill="var(--color-gold-light)" />
                  </g>
                ) : (
                  <rect key={x} x={x} y={H - COVER - 10} width={COVER} height={COVER} rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
                ),
              )}
            </g>
          )}

          {slug === 'casting' && (
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={`M${X0 + 22},${H - 44} C170,24 430,24 ${X1 - 22},${H - 44}`} stroke={`url(#${uid}-ink)`} strokeWidth="3.5" />
              <path d="M514,105 L530,108 L524.5,93" stroke="var(--color-gold-light)" strokeWidth="3.5" />
              <path d={`M${X1 - 22},${H - 22} C430,${H + 4} 170,${H + 4} ${X0 + 22},${H - 22}`} stroke="rgba(255,255,255,0.22)" strokeWidth="2" strokeDasharray="2 8" />
              <circle cx={X0 + 6} cy={H - 34} r="10" fill="var(--color-glass-surface)" stroke="var(--color-gold)" strokeWidth="3" />
              <circle cx={X1 - 6} cy={H - 34} r="10" fill="var(--color-glass-surface)" stroke="rgba(255,255,255,0.32)" strokeWidth="2" />
            </g>
          )}

          {slug === 'dsp' && (
            <g strokeLinecap="round">
              <path d={envelope} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeDasharray="2 6" />
              {partials.map(({ x, y }, i) => (
                <g key={x} opacity={1 - i * 0.07}>
                  <line x1={x} y1={H} x2={x} y2={y} stroke={`url(#${uid}-ink)`} strokeWidth="3.5" />
                  <circle cx={x} cy={y} r="5.5" fill={i === 0 ? 'var(--color-gold-light)' : 'var(--color-gold)'} />
                </g>
              ))}
            </g>
          )}

          {slug === 'ai-enhancer' && (
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={area(inferred, cutX, specEnd)} fill={`url(#${uid}-fall)`} />
              <line x1={cutX} y1="36" x2={cutX} y2={H} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="2 6" />
              <path d={measured} stroke="rgba(255,255,255,0.55)" strokeWidth="3.5" />
              <path d={inferred} stroke="var(--color-gold-light)" strokeWidth="5" strokeDasharray="0.5 10" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
