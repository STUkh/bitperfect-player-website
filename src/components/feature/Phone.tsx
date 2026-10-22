import { screens, type ScreenName } from '../../data/screens';
import Picture from '../common/Picture';
import PhoneFrame, { FRAME_WIDTH } from './PhoneFrame';
import { phoneGeometry, type PhoneGeometry } from './phone-geometry';
import type { ClassProps } from '../class-props';

type Source =
  | {
      /**
       * A capture of the shipping app, by name: now-playing, now-playing-hero, eq,
       * eq-filters, eq-presets, eq-sculptor, library, sources, tracks, album, output,
       * track-info, playback, fidelity, signal-path, signal-clean, cast, cast-sheet,
       * receiver, dsp, dsp-sheet, ai, ai-enhancer, ai-karaoke, ai-neural (keys of
       * `src/data/screens.ts`). An unknown name leaves the screen dark.
       */
      screen: ScreenName;
      src?: never;
      width?: never;
      height?: never;
    }
  | {
      screen?: never;
      /** Any other image, as a path under `public/` (`img/x.webp`). Needs its pixel `width` and `height`. */
      src: string;
      /** The image's pixel width. The device is drawn for width / height. */
      width: number;
      /** The image's pixel height. Wider than tall (and not near square) draws the phone in landscape. */
      height: number;
    };

export type PhoneProps = ClassProps &
  Source & {
    /** Default empty (decorative): the copy beside the phone already says what it shows. Pass a real one only where the screen is the only place the information exists. */
    alt?: string;
    /** Load eagerly with high fetch priority. Only for the one screen above the fold. Default lazy. */
    priority?: boolean;
    /** Take the parent's width instead of the device's own (portrait 296px, 344px from lg; landscape the column up to 620px). */
    fill?: boolean;
    /** The image's rendered width, for the responsive pick. Default from the device's width; pass it with `fill`. */
    sizes?: string;
  };

const px = (n: number) => `${Math.round(n)}px`;

/* What the screen measures at the device's own width. A filled phone's width is
   the parent's, which only the caller knows: 278px is the portrait screen at its
   common size, and the 556px master is its 2x. */
function defaultSizes(geometry: PhoneGeometry, fill: boolean) {
  const f = geometry.screenFraction;
  if (fill) return '278px';
  if (geometry.orientation === 'landscape') {
    const max = FRAME_WIDTH.landscape.max;
    return `(min-width: ${max}px) ${px(max * f)}, ${Math.round(f * 100)}vw`;
  }
  const { base, lg } = FRAME_WIDTH.portrait;
  return `(min-width: 1024px) ${px(lg * f)}, ${px(base * f)}`;
}

/**
 * The site's one device: a Galaxy S25 Ultra (titanium rails, black bezel,
 * punch-hole camera, side buttons, cast shadow) drawn for the image it holds. Use
 * it for every phone on the site, beside feature copy or in a lineup. Never draw
 * an app screen: name a capture with `screen`, or pass any other image as `src`
 * with its `width` and `height`.
 *
 * The device fits the image. A screen between 9:22.5 and 9:16 fills the cutout
 * edge to edge with nothing cropped: corners, camera and buttons keep their size
 * and only the straight runs grow. Outside that range the device is drawn at the
 * nearest bound and the image is cropped from the top. A clearly wide image turns
 * the phone landscape (camera left, buttons on top, the image upright); a
 * near-square one is drawn portrait at 9:16.
 *
 * Width: portrait 296px, 344px from `lg`; landscape the column's width up to
 * 620px; `fill` takes the parent's. Ivory bands null the cast shadow.
 */
export default function Phone({ className, alt = '', priority = false, fill = false, sizes, ...source }: PhoneProps) {
  const capture = source.screen !== undefined ? (screens as Record<string, { w: number; h: number }>)[source.screen] : undefined;
  const fallback = Object.values(screens)[0];
  const [w, h] = source.src !== undefined ? [source.width, source.height] : [capture?.w ?? fallback.w, capture?.h ?? fallback.h];
  const geometry = phoneGeometry(w, h);
  const src = source.src ?? (capture ? `screens/${source.screen}.webp` : undefined);

  return (
    <PhoneFrame geometry={geometry} fill={fill} className={className}>
      {src && (
        <Picture
          src={src}
          alt={alt}
          sizes={sizes ?? defaultSizes(geometry, fill)}
          priority={priority}
          position="50% 0%"
          className="h-full w-full object-cover object-top"
        />
      )}
    </PhoneFrame>
  );
}
