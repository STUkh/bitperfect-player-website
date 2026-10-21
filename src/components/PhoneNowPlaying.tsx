import type { CSSProperties } from 'react';
import { clsx as cx } from 'clsx';
import PhoneScreen from './feature/PhoneScreen';
import { screenAspect } from '../data/screens';
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
 * The CHASSIS stays hand-built rather than reusing `PhoneFrame`, and that is not
 * an oversight. This one instance is lit differently from every other device on
 * the site: a gold rim (`--color-border-gold`) and `--shadow-device` rather than
 * the neutral hairline and `--shadow-device-cast` the lineup and the feature beats
 * share. It is the only phone that stands alone above the fold, and it is the only
 * one allowed to catch the light that way. Two frames, on purpose; the screen
 * inside them is the same asset pipeline.
 *
 * `priority` because this is the one screen above the fold. Every other capture on
 * the site is lazy.
 */
export type PhoneNowPlayingProps = ClassProps;

const screenStyle: CSSProperties = { aspectRatio: screenAspect };

export default function PhoneNowPlaying({ className }: PhoneNowPlayingProps) {
  return (
    <div className={cx('phone-now-playing', className)}>
      <div className="phone-now-playing-screen" style={screenStyle}>
        <PhoneScreen
          name="now-playing-hero"
          priority
          alt="The Bitperfect Player Now Playing screen, mid-track, showing the album artwork, the transport controls and the file's FLAC format and rate"
        />
      </div>
    </div>
  );
}
