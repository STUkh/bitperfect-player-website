import { clsx as cx } from 'clsx';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import type { ClassProps } from '../class-props';
import './PhoneTrio.css';

/**
 * A tactile 3-phone overlapping composition (inspired by flagship hardware showcases).
 *
 * Shows three coordinated app screens in authentic S24/S25 Ultra hardware frames:
 * - Center: prominent, foreground (`z-20`), scale-100, anchor of the composition.
 * - Left: angled/offset slightly behind (`z-10`, gentle tilt, scale-95, opacity-90).
 * - Right: angled/offset slightly behind (`z-10`, gentle tilt, scale-95, opacity-90).
 *
 * Engineered with:
 * - Isolated layout slots (negative margins never animate, zero layout thrashing or overflow)
 * - Agency-grade hardware hover physics (fluid depth parallax, 3% micro-scale, gold rim glow)
 * - Staged sibling coordination (non-hovered phones gracefully recede)
 * - Hardware GPU acceleration & strict prefers-reduced-motion
 */

export interface PhoneTrioProps extends ClassProps {
  leftScreen?: string;
  centerScreen?: string;
  rightScreen?: string;
  priority?: boolean;
  idPrefix?: string;
}

export default function PhoneTrio({
  leftScreen = 'library',
  centerScreen = 'now-playing',
  rightScreen = 'eq',
  className = '',
  priority = false,
  idPrefix = 'trio',
}: PhoneTrioProps) {
  return (
    <div className={cx(['phone-trio-stage relative mx-auto flex items-center justify-center select-none', className])}>
      {/* Left Phone Slot (Fixed Layout Container) */}
      <div className="phone-trio-slot phone-trio-slot-left relative z-10 shrink-0 -mr-[105px] min-[390px]:-mr-[115px] sm:-mr-[160px] md:-mr-[190px] lg:-mr-[220px]">
        <div
          className="phone-trio-chassis phone-trio-chassis-left cursor-pointer transform-gpu"
          tabIndex={0}
          role="region"
          aria-label="Library screen showcase"
        >
          <div className="w-[145px] min-[390px]:w-[160px] sm:w-[220px] md:w-[260px] lg:w-[300px]">
            <PhoneFrame fill idPrefix={`${idPrefix}-left`}>
              <PhoneScreen name={leftScreen} />
            </PhoneFrame>
          </div>
        </div>
      </div>
      {/* Center Phone Slot (Fixed Layout Container) */}
      <div className="phone-trio-slot phone-trio-slot-center relative z-20 shrink-0">
        <div
          className="phone-trio-chassis phone-trio-chassis-center cursor-pointer transform-gpu"
          tabIndex={0}
          role="region"
          aria-label="Now Playing screen showcase"
        >
          <div className="w-[160px] min-[390px]:w-[175px] sm:w-[240px] md:w-[280px] lg:w-[320px]">
            <PhoneFrame fill idPrefix={`${idPrefix}-center`}>
              <PhoneScreen name={centerScreen} priority={priority} />
            </PhoneFrame>
          </div>
        </div>
      </div>
      {/* Right Phone Slot (Fixed Layout Container) */}
      <div className="phone-trio-slot phone-trio-slot-right relative z-10 shrink-0 -ml-[105px] min-[390px]:-ml-[115px] sm:-ml-[160px] md:-ml-[190px] lg:-ml-[220px]">
        <div
          className="phone-trio-chassis phone-trio-chassis-right cursor-pointer transform-gpu"
          tabIndex={0}
          role="region"
          aria-label="Equalizer screen showcase"
        >
          <div className="w-[145px] min-[390px]:w-[160px] sm:w-[220px] md:w-[260px] lg:w-[300px]">
            <PhoneFrame fill idPrefix={`${idPrefix}-right`}>
              <PhoneScreen name={rightScreen} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
