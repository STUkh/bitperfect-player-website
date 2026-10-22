import type { CSSProperties } from 'react';

/**
 * The three-phone fan, shared by `PhoneTrio` (CSS) and the home opening's lineup
 * (its script): how far a side phone's centre sits from the centre phone's, in
 * phone widths; how far it turns toward the centre; and how far it is dimmed
 * (brightness, never opacity, so no bezel shows through another).
 */
export const FAN = { spread: 1.04, turn: 20, dim: 0.72 } as const;

/** The fan as custom properties for the stylesheets: `--fan-spread` (a percentage of the phone), `--fan-turn` (deg), `--fan-dim`. */
export const fanStyle = {
  '--fan-spread': `${FAN.spread * 100}%`,
  '--fan-turn': `${FAN.turn}deg`,
  '--fan-dim': `${FAN.dim}`,
} as CSSProperties;
