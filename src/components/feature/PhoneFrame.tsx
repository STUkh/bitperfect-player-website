import type { CSSProperties, ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import { screenAspect } from '../../data/screens';
import type { ClassProps } from '../class-props';

/**
 * The device chassis. 296px wide once the rail collapses, 344px on the full
 * rail, matching design/FeatureMobile.dc.html. `fill` hands the width to the
 * parent instead, which is what the home lineup needs: there the three phones
 * are positioned boxes and the frame has to be exactly as wide as its box.
 *
 * THE SCREEN RESERVES THE CAPTURE'S ASPECT, and this is the change that made the
 * frame a phone. It used to be a grid sized by whatever was slotted into it, so
 * the "device" came out at roughly 1:1.65 — a shape no phone has been since about
 * 2016, and one that quietly said "drawing" to anyone who looked. The screens are
 * now captures off a real device at 1080x2400, so the box is 9:20 and the object
 * reads as what it is. `screenAspect` is generated beside the assets rather than
 * typed here, because a frame that disagrees with its image letterboxes silently.
 *
 * The cast shadow is `--shadow-device-cast`, not a literal. This frame stands on
 * graphite on half the feature beats and on WHITE on the other half, and the
 * hardcoded `0 24px 70px rgba(0,0,0,0.72)` laid a grey halo across the paper on
 * every white one. The white bands null the token; the rim highlight stays,
 * because that is the chassis lighting itself rather than a cast on the ground.
 * DESIGN.md, "The Ivory Band Has No Shadows".
 */

export interface PhoneFrameProps extends ClassProps {
  children?: ReactNode;
  /** Take the parent's width instead of the frame's own two steps. */
  fill?: boolean;
  idPrefix?: string;
}

const screenStyle: CSSProperties = { aspectRatio: screenAspect };

export default function PhoneFrame({ fill = false, className, children }: PhoneFrameProps) {
  return (
    <div
      className={cx([
        'relative shrink-0 rounded-phone-outer-sm border border-white/14 p-2.5 lg:rounded-phone-outer lg:p-[11px]',
        fill ? 'w-full' : 'w-[296px] lg:w-[344px]',
        'bg-[linear-gradient(160deg,rgba(27,24,36,0.88),rgba(20,19,25,0.96)_45%,rgba(27,24,36,0.8))]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),var(--shadow-device-cast)]',
        className,
      ])}
    >
      <div
        className="relative overflow-hidden rounded-phone-screen-sm border border-border-subtle bg-phone-screen lg:rounded-phone-screen"
        style={screenStyle}
      >
        {children}
      </div>
    </div>
  );
}
