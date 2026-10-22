import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import PhoneChassis from './PhoneChassis';
import type { PhoneGeometry } from './phone-geometry';
import type { ClassProps } from '../_lib/class-props';
import './PhoneFrame.css';

export interface PhoneFrameProps extends ClassProps {
  /** The device to draw, from `phoneGeometry(imageWidth, imageHeight)`. */
  geometry: PhoneGeometry;
  /** Take the parent's width instead of the frame's own size. */
  fill?: boolean;
  /** What sits in the screen cutout. */
  children?: ReactNode;
}

/** The frame's width when it does not `fill`: portrait 296px, 344px from lg; landscape the column, up to 620px. */
export const FRAME_WIDTH = {
  portrait: { base: 296, lg: 344 },
  landscape: { max: 620 },
} as const;

/**
 * The sized box for one device: the screen cutout, the chassis over it and the cast
 * shadow under it. Internal to `Phone`, which works the geometry out from the image.
 */
export default function PhoneFrame({ geometry, fill = false, className, children }: PhoneFrameProps) {
  const { viewBox, cutout, radius, orientation } = geometry;
  return (
    <div
      className={cn(
        'phone-frame-s25u relative shrink-0',
        fill ? 'w-full' : orientation === 'portrait' ? 'w-[296px] lg:w-[344px]' : 'w-full max-w-[620px]',
        className,
      )}
      style={{ aspectRatio: `${viewBox.w} / ${viewBox.h}`, borderRadius: radius }}
    >
      <div className="phone-screen-cutout absolute overflow-hidden rounded-[2px] bg-phone-screen" style={cutout}>
        {children}
      </div>
      <PhoneChassis geometry={geometry} />
    </div>
  );
}
