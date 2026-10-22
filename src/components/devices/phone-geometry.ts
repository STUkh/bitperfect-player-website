/*
  The device's geometry, from the size of the image it must hold. Pure: no React,
  no DOM, so the chassis, the frame and the image's `sizes` all read one answer.

  The chassis is a 395.5-unit-wide S25 Ultra drawing (392 of titanium plus the
  side buttons) with a 12-unit bezel round a 368-unit-wide screen. Only the long
  side follows the image: corners, rails, camera and buttons keep their size and
  the straight runs grow, so any aspect in range is one seamless device.
*/

/** Width / height of a portrait screen the chassis will draw: 9:22.5 to 9:16, the range of real phones. */
export const PORTRAIT_ASPECT = { min: 0.4, max: 0.5625 } as const;

/** Short side / long side above which an image is too square to call landscape; it is drawn portrait (and clamped to 9:16). */
const SQUARE = 0.8;

/** The drawing's short side, its bezel and its screen width, in SVG units. */
export const DEVICE_WIDTH = 395.5;
export const BEZEL = 12;
export const SCREEN_WIDTH = 368;
/** The titanium's outer corner radius. */
const CORNER = 3.5;
/** How far the side buttons stand proud of the titanium: right of it in portrait, above it in landscape. */
const BUTTON_PROUD = DEVICE_WIDTH - 392;

export type Orientation = 'portrait' | 'landscape';

export interface PhoneGeometry {
  orientation: Orientation;
  /** Portrait width / height of the screen after the clamp (a landscape screen is measured turned upright). */
  aspect: number;
  /** True when the image was outside PORTRAIT_ASPECT: it is cropped object-cover from the top. */
  clamped: boolean;
  /** The device's long side in SVG units: 24 + 368 / aspect. */
  length: number;
  viewBox: { w: number; h: number };
  /** The screen cutout as percentages of the box. */
  cutout: { left: string; top: string; width: string; height: string };
  /** CSS border-radius matching the titanium's 3.5-unit corner, for the cast shadow. */
  radius: string;
  /** Cutout width / box width, for the image's `sizes`. */
  screenFraction: number;
  /** `${orientation}-${length}`: two phones with one key draw identical SVG. */
  key: string;
}

const round3 = (n: number) => Math.round(n * 1000) / 1000;
const pct = (n: number) => `${round3(n * 100)}%`;

/** The device that holds a `width` x `height` image. Landscape when the image is clearly wider than tall. */
export function phoneGeometry(width: number, height: number): PhoneGeometry {
  const long = Math.max(width, height);
  const short = Math.min(width, height);
  const orientation: Orientation = width > height && short / long < SQUARE ? 'landscape' : 'portrait';
  const raw = orientation === 'landscape' ? height / width : width / height;
  const aspect = Math.min(PORTRAIT_ASPECT.max, Math.max(PORTRAIT_ASPECT.min, raw));
  /* A crop under half a percent (a 1672x941 "16:9" photograph) is rounding, not a clamp worth a warning. */
  const clamped = Math.abs(aspect - raw) > raw * 0.005;
  if (clamped && import.meta.env?.DEV) {
    console.warn(
      `Phone: a ${width}x${height} image is outside the phone range (9:22.5 to 9:16); it is cropped from the top.`,
    );
  }

  const length = round3(BEZEL * 2 + SCREEN_WIDTH / aspect);
  const W = DEVICE_WIDTH;
  const L = length;
  const portrait = orientation === 'portrait';

  return {
    orientation,
    aspect,
    clamped,
    length,
    viewBox: portrait ? { w: W, h: L } : { w: L, h: W },
    /* Portrait: x 12, y 12, 368 wide. Landscape turns the drawing a quarter left,
       so the buttons' 3.5 units sit above the titanium and the cutout starts 15.5 down. */
    cutout: portrait
      ? {
          left: `${(BEZEL / W) * 100}%`,
          top: `${(BEZEL / L) * 100}%`,
          width: `${(SCREEN_WIDTH / W) * 100}%`,
          height: `${((L - 2 * BEZEL) / L) * 100}%`,
        }
      : {
          left: `${(BEZEL / L) * 100}%`,
          top: `${((BEZEL + BUTTON_PROUD) / W) * 100}%`,
          width: `${((L - 2 * BEZEL) / L) * 100}%`,
          height: `${(SCREEN_WIDTH / W) * 100}%`,
        },
    radius: portrait ? `${pct(CORNER / W)} / ${pct(CORNER / L)}` : `${pct(CORNER / L)} / ${pct(CORNER / W)}`,
    screenFraction: portrait ? SCREEN_WIDTH / W : (L - 2 * BEZEL) / L,
    key: `${orientation}-${length}`,
  };
}
