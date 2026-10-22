import { clsx as cx } from 'clsx';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import type { ClassProps } from '../class-props';
import { useBehaviour } from '../behaviour';
import { setupPhoneTrio } from './PhoneTrio.client';
import './PhoneTrio.css';

/**
 * Three phones in a shallow 3D fan: the centre one upright, the sides turned
 * toward it and set back in depth. They reveal once, sliding out from behind
 * the centre phone when the stage scrolls into view. Side phones are dimmed
 * with brightness, never opacity, so no bezel shows through another.
 * Stacking comes from translateZ alone: hover never changes z-index. Each phone
 * is a `PhoneFrame` with a `PhoneScreen`. Fills its parent's width.
 */
export interface PhoneTrioProps extends ClassProps {
  /** Screen key for the left phone (see `PhoneScreen` `name`). Default `library`. */
  leftScreen?: string;
  /** Screen key for the centre phone. Default `now-playing`. */
  centerScreen?: string;
  /** Screen key for the right phone. Default `eq`. */
  rightScreen?: string;
  /** Load the centre screen eagerly. Only when the trio is above the fold. Default false. */
  priority?: boolean;
  /** Prefix for the three frames' SVG ids; make it unique when two trios share a page. Default `trio`. */
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
  const ref = useBehaviour<HTMLDivElement>(setupPhoneTrio);
  return (
    <div ref={ref} className={cx(['phone-trio', className])} data-phone-trio="">
      <div className="phone-trio-glow" aria-hidden="true" />
      <div className="phone-trio-floor" aria-hidden="true" />
      <div className="phone-trio-scene">
        <div className="phone-trio-phone phone-trio-left">
          <PhoneFrame fill idPrefix={`${idPrefix}-left`}>
            <PhoneScreen name={leftScreen} />
          </PhoneFrame>
        </div>
        <div className="phone-trio-phone phone-trio-right">
          <PhoneFrame fill idPrefix={`${idPrefix}-right`}>
            <PhoneScreen name={rightScreen} />
          </PhoneFrame>
        </div>
        <div className="phone-trio-phone phone-trio-center">
          <PhoneFrame fill idPrefix={`${idPrefix}-center`}>
            <PhoneScreen name={centerScreen} priority={priority} />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
