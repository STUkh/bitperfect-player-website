import type { CSSProperties } from 'react';
import manifest from '../../data/images.json';
import { withBase } from '../../utils/nav';

type Ladder = { avif: [number, string][]; webp: [number, string][] };
type Entry = {
  w: number;
  h: number;
  lqip: { w: number; h: number; src: string };
  sources: Record<string, Ladder>;
};
/*
  The design build (.design-sync/react/build.mjs) swaps the manifest for an empty
  one: in Claude Design only the masters sit beside the stylesheet, so a variant
  URL would 404, and every lookup below then falls back to the master.
*/
const images = manifest as unknown as Record<string, Entry>;

export interface PictureArt {
  /** Media query the source applies under, e.g. `(max-width: 639px)`. */
  media: string;
  /** A generated crop of `src` (`square`, `4x3`: see CROPS in scripts/images.mjs). */
  crop?: string;
  /** Or a separate master, for a crop an artist made by hand. */
  src?: string;
  /** `sizes` for this source; defaults to the picture's own. */
  sizes?: string;
}

export interface PictureProps {
  /** Master path under public/, e.g. `img/features/eq.webp`. */
  src: string;
  alt?: string;
  /** Rendered width of the image, per breakpoint. Required for a correct pick from the ladder. */
  sizes: string;
  /** Art direction, first match wins. */
  art?: PictureArt[];
  /** The LCP image: eager, high fetch priority. */
  priority?: boolean;
  /** Eager but behind everything else (an above-the-fold backdrop that is not the LCP). */
  eager?: boolean;
  /** The CSS object-position, mirrored onto the blur placeholder so the two agree. */
  position?: string;
  /** On the <picture>. Without one the picture is `display: contents`, so the <img> lays out as before. */
  pictureClassName?: string;
  className?: string;
  style?: CSSProperties;
}

const set = (pairs: [number, string][]) => pairs.map(([w, f]) => `${withBase(f)} ${w}w`).join(', ');

/*
  The placeholder is the 32px LQIP drawn through an SVG blur, the technique Next.js
  ships: the browser scales the SVG, not the bitmap, so a 300-byte thumbnail fills a
  full-bleed plate without blocky pixels. It is the <img>'s own background, so it
  sits exactly under the image, clips with it and fades with it, needs no script and
  is simply painted over when the image decodes. Alpha is forced to 1 so the blur's
  soft edge does not turn the plate's border transparent.
*/
function blur({ w, h, src }: Entry['lqip']) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'><filter id='b' color-interpolation-filters='sRGB'><feGaussianBlur stdDeviation='1.2'/><feComponentTransfer><feFuncA type='discrete' tableValues='1 1'/></feComponentTransfer></filter><image width='100%' height='100%' preserveAspectRatio='none' filter='url(#b)' href='${src}'/></svg>`;
  return `url("data:image/svg+xml;charset=utf-8,${svg.replace(/%/g, '%25').replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E')}")`;
}

/**
 * A responsive raster from the build-time pipeline (scripts/images.mjs): AVIF then
 * WebP at a ladder of widths, optional art-directed crops for phones, intrinsic
 * width/height, and a blurred LQIP under it while it loads. Lazy and async by
 * default; `priority` for the one LCP image, `eager` for an above-the-fold extra.
 *
 * A path the pipeline has not seen (or the Claude Design build) renders the plain
 * master as before, so nothing breaks while an asset is new.
 */
export default function Picture({
  src,
  alt = '',
  sizes,
  art = [],
  priority = false,
  eager = false,
  position,
  pictureClassName,
  className,
  style,
}: PictureProps) {
  const entry = images[src];
  const loading = priority || eager ? 'eager' : 'lazy';
  const fetchpriority = priority ? 'high' : eager ? 'low' : undefined;

  if (!entry) {
    return (
      <picture className={pictureClassName ?? 'contents'}>
        {art
          .filter((a) => a.src)
          .map((a) => (
            <source key={a.media} media={a.media} srcSet={withBase(a.src!)} />
          ))}
        <img
          src={withBase(src)}
          alt={alt}
          loading={loading}
          decoding="async"
          {...(fetchpriority ? ({ fetchpriority } as object) : {})}
          className={className}
          style={style}
        />
      </picture>
    );
  }

  const base = entry.sources.default;
  const sources = art.flatMap((a) => {
    const ladder = a.src ? images[a.src]?.sources.default : a.crop ? entry.sources[a.crop] : undefined;
    if (!ladder) return [];
    return [
      <source key={`${a.media}-avif`} media={a.media} type="image/avif" srcSet={set(ladder.avif)} sizes={a.sizes ?? sizes} />,
      <source key={`${a.media}-webp`} media={a.media} type="image/webp" srcSet={set(ladder.webp)} sizes={a.sizes ?? sizes} />,
    ];
  });

  return (
    <picture className={pictureClassName ?? 'contents'}>
      {sources}
      <source type="image/avif" srcSet={set(base.avif)} sizes={sizes} />
      <img
        src={withBase(base.webp.at(-1)![1])}
        srcSet={set(base.webp)}
        sizes={sizes}
        width={entry.w}
        height={entry.h}
        alt={alt}
        loading={loading}
        decoding="async"
        {...(fetchpriority ? ({ fetchpriority } as object) : {})}
        className={className}
        style={{
          backgroundImage: blur(entry.lqip),
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: position ?? '50% 50%',
          ...style,
        }}
      />
    </picture>
  );
}

/** The CSS `image-set()` for a pipeline image, for a `background-image`. Undefined when it has no variants. */
export function imageSet(src: string): string | undefined {
  const ladder = images[src]?.sources.default;
  if (!ladder) return undefined;
  const top = (l: [number, string][]) => withBase(l.at(-1)![1]);
  return `image-set(url("${top(ladder.avif)}") type("image/avif"), url("${top(ladder.webp)}") type("image/webp"))`;
}
