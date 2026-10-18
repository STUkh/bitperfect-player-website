import { PhoneFrame } from './PhoneFrame';
import { PhoneScreen } from './PhoneScreen';
import { cx, scope } from '../lib/site';

export interface PhoneTrioProps {
  /** Screen key for the tilted phone behind on the left. Default "library". */
  leftScreen?: string;
  /** Screen key for the front, centre phone. Default "now-playing". */
  centerScreen?: string;
  /** Screen key for the tilted phone behind on the right. Default "eq". */
  rightScreen?: string;
  /** Accessible names of the three phones, left to right. */
  labels?: [string, string, string];
  className?: string;
  /** Load the centre screen eagerly (above the fold). */
  priority?: boolean;
  /** Prefix for each frame's SVG ids ("-left", "-center", "-right" appended). */
  idPrefix?: string;
}

const S = scope('om3pbwsj');

/**
 * Three overlapping phones: a centre device in front, two tilted and receded
 * behind it, each lifting with a gold rim on hover or focus. The showpiece under
 * the features hub header; centre it in a Container on a dark band.
 */
export function PhoneTrio({
  leftScreen = 'library',
  centerScreen = 'now-playing',
  rightScreen = 'eq',
  labels = ['Library screen showcase', 'Now Playing screen showcase', 'Equalizer screen showcase'],
  className = '',
  priority = false,
  idPrefix = 'trio',
}: PhoneTrioProps) {
  return (
    <div className={cx('phone-trio-stage relative mx-auto flex items-center justify-center select-none', className)} {...S}>
      {/* Left Phone Slot (Fixed Layout Container) */}
      <div
        className="phone-trio-slot phone-trio-slot-left relative z-10 shrink-0 -mr-[105px] min-[390px]:-mr-[115px] sm:-mr-[160px] md:-mr-[190px] lg:-mr-[220px]"
        {...S}
      >
        <div className="phone-trio-chassis phone-trio-chassis-left cursor-pointer transform-gpu" tabIndex={0} role="region" aria-label={labels[0]} {...S}>
          <div className="w-[145px] min-[390px]:w-[160px] sm:w-[220px] md:w-[260px] lg:w-[300px]" {...S}>
            <PhoneFrame fill idPrefix={`${idPrefix}-left`}>
              <PhoneScreen name={leftScreen} />
            </PhoneFrame>
          </div>
        </div>
      </div>

      {/* Center Phone Slot (Fixed Layout Container) */}
      <div className="phone-trio-slot phone-trio-slot-center relative z-20 shrink-0" {...S}>
        <div className="phone-trio-chassis phone-trio-chassis-center cursor-pointer transform-gpu" tabIndex={0} role="region" aria-label={labels[1]} {...S}>
          <div className="w-[160px] min-[390px]:w-[175px] sm:w-[240px] md:w-[280px] lg:w-[320px]" {...S}>
            <PhoneFrame fill idPrefix={`${idPrefix}-center`}>
              <PhoneScreen name={centerScreen} priority={priority} />
            </PhoneFrame>
          </div>
        </div>
      </div>

      {/* Right Phone Slot (Fixed Layout Container) */}
      <div
        className="phone-trio-slot phone-trio-slot-right relative z-10 shrink-0 -ml-[105px] min-[390px]:-ml-[115px] sm:-ml-[160px] md:-ml-[190px] lg:-ml-[220px]"
        {...S}
      >
        <div className="phone-trio-chassis phone-trio-chassis-right cursor-pointer transform-gpu" tabIndex={0} role="region" aria-label={labels[2]} {...S}>
          <div className="w-[145px] min-[390px]:w-[160px] sm:w-[220px] md:w-[260px] lg:w-[300px]" {...S}>
            <PhoneFrame fill idPrefix={`${idPrefix}-right`}>
              <PhoneScreen name={rightScreen} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
