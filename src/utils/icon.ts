/**
 * One stroke system for every authored icon on the site.
 *
 * Every mark is drawn on a 24-unit grid, so a stroke-width left constant in
 * viewBox units scales in lockstep with the box: a 15px icon renders a 0.9px
 * hairline and a 36px one renders 2.4px of ink. Neither reads as the same
 * weight. Perceived weight tracks the box sublinearly, so the *rendered* stroke
 * grows on an exponent of 0.55 off a 1.6px anchor at 20px — a 2.4x jump in size
 * buys only 1.6x the ink.
 *
 *   15px -> 1.35 device px    24px -> 1.75    36px -> 2.20
 *   20px -> 1.60 device px    28px -> 1.90    48px -> 2.60
 *
 * `iconStroke` converts that target back into the `stroke-width` the 24-unit
 * viewBox needs to land on it. Callers only ever pass a size.
 */

/** Every authored mark shares this drawing grid. */
export const ICON_VIEWBOX = 24;

/** Sizes the ramp is tuned against: inline steps, then tile and identity steps. */
export const ICON_SIZES = [15, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40] as const;

/** Target rendered stroke, in device pixels, for an icon drawn at `size`. */
export function iconWeight(size: number): number {
  const px = 1.6 * Math.pow(size / 20, 0.55);
  return Math.min(2.6, Math.max(1.2, Math.round(px * 20) / 20));
}

/** `stroke-width` in viewBox units that renders `iconWeight(size)` at `size`. */
export function iconStroke(size: number): number {
  if (!Number.isFinite(size) || size <= 0) return 1.75;
  return Math.round(((iconWeight(size) * ICON_VIEWBOX) / size) * 100) / 100;
}
