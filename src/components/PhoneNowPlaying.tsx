import { clsx as cx } from 'clsx';
import PhoneFrame from './feature/PhoneFrame';
import PhoneScreen from './feature/PhoneScreen';
import type { ClassProps } from './class-props';
import './PhoneNowPlaying.css';

/**
 * The hero device: the app's Now Playing screen, as a capture.
 *
 * A screenshot of the shipping app playing a real CC0 recording, inside the
 * site's phone frame. Takes only `className`; it fills the width of its parent, so
 * size it with a wrapper (about 220-300px wide in a column).
 *
 * The chassis is the same S25 Ultra `PhoneFrame` every other device on the site
 * wears, so the hero phone is one object with the lineup it travels into.
 *
 * `priority` because this is the one screen above the fold. Every other capture on
 * the site is lazy.
 */
/** Only `className`: the device sizes itself to its container. */
export type PhoneNowPlayingProps = ClassProps;

export default function PhoneNowPlaying({ className }: PhoneNowPlayingProps) {
  return (
    <div className={cx('phone-now-playing', className)}>
      <PhoneFrame fill idPrefix="hero-s25u">
        <PhoneScreen
          name="now-playing-hero"
          priority
          alt="The Bitperfect Player Now Playing screen, mid-track, showing the album artwork, the transport controls and the file's FLAC format and rate"
        />
      </PhoneFrame>
    </div>
  );
}
