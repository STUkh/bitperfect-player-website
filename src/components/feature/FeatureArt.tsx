import { clsx as cx } from 'clsx';
import type { ClassProps } from '../_lib/class-props';
import Picture from '../common/Picture';

export interface FeatureArtProps extends ClassProps {
  /** Which feature's photograph: `usb-dac`, `eq`, `library`, `casting`, `dsp` or `ai-enhancer` (public/img/features/<slug>.webp). */
  slug: string;
  /** The frame's aspect, as a CSS aspect-ratio value (default `var(--art-ratio, 16 / 9)`, e.g. pass `"4 / 3"` for the compact crop). A card may crop wider than 16:9. */
  ratio?: string;
  /** Rendered width of the frame, per breakpoint (default: full width on a phone, half the 1280 column on desktop). */
  sizes?: string;
  /** The frame drops to 4:3 below 640px (the features index): ships the matching centred crop there. */
  compactBelowSm?: boolean;
}

/**
 * The feature's photograph in a clipped, aspect-ratio frame. The image fills the
 * frame (cover), so a wide crop keeps the subject and costs nothing else. Carries
 * no text: the card around it says what the feature is. Decorative (`aria-hidden`).
 * Give it a width (`className="w-full"`); the vertical focus follows `--art-y`.
 */
export default function FeatureArt({
  slug,
  className,
  ratio = 'var(--art-ratio, 16 / 9)',
  sizes = '(max-width: 1023px) 100vw, 640px',
  compactBelowSm = false,
}: FeatureArtProps) {
  return (
    <div className={cx(['feature-art relative overflow-hidden', className])} style={{ aspectRatio: ratio }} aria-hidden="true">
      <Picture
        src={`img/features/${slug}.webp`}
        sizes={sizes}
        art={compactBelowSm ? [{ media: '(max-width: 639px)', crop: '4x3' }] : []}
        position="50% var(--art-y, 50%)"
        style={{ objectPosition: '50% var(--art-y, 50%)' }}
        className="feature-art-img absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
