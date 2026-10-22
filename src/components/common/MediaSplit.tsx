import type { CSSProperties, ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import type { ClassProps } from '../class-props';

export interface MediaSplitProps extends ClassProps {
  /** The art: a `Phone`, `FeatureScreens`, a picture, centred in its column. From `.astro`, a child with `slot="media"`. */
  media?: ReactNode;
  /** Which side the media sits on from `lg`. Alternate it with the band's tone down a page. */
  mediaSide: 'left' | 'right';
  /**
   * Columns of twelve from `lg`, copy first. `7/5` (default) is the capability
   * band, the split DESIGN.md's "The alternating band" asks for; `6/6` is what
   * the feature route's beats ship today.
   */
  split?: '7/5' | '6/6';
  /**
   * DOM order, which is also the order below `lg` where the split is one column.
   * `false` (default): the copy leads and the media follows. `true`: the media leads.
   */
  mediaFirst?: boolean;
  /** Classes for the copy column (`flex flex-col gap-4`). */
  copyClassName?: string;
  /** Classes for the media column (`r-fade`). */
  mediaClassName?: string;
  /** Style for the media column, e.g. its reveal stagger. */
  mediaStyle?: CSSProperties;
  /** The copy. */
  children?: ReactNode;
}

/* Each split's columns, gaps and side offsets, as the two bands set them. */
const splits = {
  '7/5': {
    grid: 'gap-12',
    copy: { right: 'lg:col-span-7 lg:order-1 lg:pr-6', left: 'lg:col-span-7 lg:order-2 lg:col-start-6 lg:pl-6' },
    media: { right: 'lg:col-span-5 lg:order-2', left: 'lg:col-span-5 lg:order-1 lg:col-start-1 lg:row-start-1' },
  },
  '6/6': {
    grid: 'gap-10',
    copy: { right: 'lg:col-span-6 lg:order-1', left: 'lg:col-span-6 lg:order-2 lg:justify-self-end' },
    media: { right: 'lg:col-span-6 lg:order-2', left: 'lg:col-span-6 lg:order-1' },
  },
} as const;

/**
 * Copy on one side, media on the other, vertically centred, on a twelve-column
 * grid from `lg` and one column below it. `mediaSide` mirrors it; the DOM order
 * (`mediaFirst`) sets what leads on a phone, so mirroring never flips the phone
 * order the way `flex-direction: row-reverse` would.
 */
export default function MediaSplit(props: MediaSplitProps) {
  const { media, mediaSide, split = '7/5', mediaFirst = false, copyClassName, mediaClassName, mediaStyle, className, children } = props;
  const s = splits[split];
  const copy = <div className={cx(copyClassName, s.copy[mediaSide])}>{children}</div>;
  const art = (
    <div className={cx(mediaClassName, 'flex justify-center', s.media[mediaSide])} style={mediaStyle}>
      {media}
    </div>
  );
  return (
    <div className={cx('grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-12', s.grid, className)}>
      {mediaFirst ? art : copy}
      {mediaFirst ? copy : art}
    </div>
  );
}
