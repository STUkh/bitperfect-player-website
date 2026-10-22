import { clsx as cx } from 'clsx';
import type { ClassProps } from '../class-props';
import { withBase } from '../../utils/nav';

export interface FeatureArtProps extends ClassProps {
  slug: string;
  /** The frame's aspect, as a CSS aspect-ratio value. A card may crop wider than 16:9. */
  ratio?: string;
}

/**
 * The feature's photograph in a clipped, aspect-ratio frame. The image fills the
 * frame (cover), so a wide crop keeps the subject and costs nothing else. Carries
 * no text: the card around it says what the feature is.
 */
export default function FeatureArt({ slug, className, ratio = 'var(--art-ratio, 16 / 9)' }: FeatureArtProps) {
  return (
    <div className={cx(['feature-art relative overflow-hidden', className])} style={{ aspectRatio: ratio }} aria-hidden="true">
      <img
        src={withBase(`img/features/${slug}.webp`)}
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: '50% var(--art-y, 50%)' }}
        className="feature-art-img absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
