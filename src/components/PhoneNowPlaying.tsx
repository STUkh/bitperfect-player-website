import { clsx as cx } from 'clsx';
import PhoneFrame from './feature/PhoneFrame';
import PhoneScreen from './feature/PhoneScreen';
import type { ClassProps } from './class-props';
import './PhoneNowPlaying.css';

/**
 * The hero device: the app's Now Playing screen, as a capture.
 *
 * This was 377 lines of hand-built DOM reproducing the Compose UI in HTML, down
 * to a pulsing bit-perfect dot and a fabricated track — "Nocturne in Amber" by
 * "Hale & the Quiet Room", a record that does not exist, sitting above a headline
 * about honesty. It is now a screenshot of the shipping app playing a real CC0
 * recording, which is both truer and a tenth of the code.
 *
 * The chassis is the same S25 Ultra `PhoneFrame` every other device on the site
 * wears, so the hero phone is one object with the lineup it travels into.
 *
 * `priority` because this is the one screen above the fold. Every other capture on
 * the site is lazy.
 */
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
