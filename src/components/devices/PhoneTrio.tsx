import { clsx as cx } from 'clsx';
import Phone from './Phone';
import { fanStyle } from './phone-fan';
import { scaleSizes } from './phone-geometry';
import type { ScreenName } from '../../data/screens';
import type { ClassProps } from '../_lib/class-props';
import { useBehaviour } from '../_lib/behaviour';
import { setupPhoneTrio } from './PhoneTrio.client';
import './PhoneTrio.css';

/**
 * Three phones in a shallow 3D fan: the centre one upright, the sides turned
 * toward it and set back in depth. They reveal once, sliding out from behind
 * the centre phone when the stage scrolls into view. Side phones are dimmed
 * with brightness, never opacity, so no bezel shows through another.
 * Stacking comes from translateZ alone: hover never changes z-index. Each phone
 * is a `Phone` showing a capture. Fills its parent's width.
 */
export interface PhoneTrioProps extends ClassProps {
  /** Capture for the left phone (see `Phone` `screen`). Default `library`. */
  leftScreen?: ScreenName;
  /** Capture for the centre phone. Default `now-playing`. */
  centerScreen?: ScreenName;
  /** Capture for the right phone. Default `eq`. */
  rightScreen?: ScreenName;
  /** Load the centre screen eagerly. Only when the trio is above the fold. Default false. */
  priority?: boolean;
  /** The trio's rendered width, in `sizes` syntax, so each screen loads at the size it shows. Default a `Container` column, capped at the trio's 1120px. */
  sizes?: string;
}

/* Container: 20px gutters, 32px from sm; the trio stops at 1120px. */
const COLUMN = '(min-width: 1184px) 1120px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)';
/* Each phone is 30% of the stage (PhoneTrio.css). */
const PHONE = 0.3;

export default function PhoneTrio({
  leftScreen = 'library',
  centerScreen = 'now-playing',
  rightScreen = 'eq',
  className = '',
  priority = false,
  sizes = COLUMN,
}: PhoneTrioProps) {
  const ref = useBehaviour<HTMLDivElement>(setupPhoneTrio);
  const frameSizes = scaleSizes(sizes, PHONE);
  return (
    <div ref={ref} className={cx(['phone-trio', className])} data-phone-trio="" style={fanStyle}>
      <div className="phone-trio-glow" aria-hidden="true" />
      <div className="phone-trio-floor" aria-hidden="true" />
      <div className="phone-trio-scene">
        <div className="phone-trio-phone phone-trio-left">
          <Phone screen={leftScreen} fill frameSizes={frameSizes} />
        </div>
        <div className="phone-trio-phone phone-trio-right">
          <Phone screen={rightScreen} fill frameSizes={frameSizes} />
        </div>
        <div className="phone-trio-phone phone-trio-center">
          <Phone screen={centerScreen} fill frameSizes={frameSizes} priority={priority} />
        </div>
      </div>
    </div>
  );
}
