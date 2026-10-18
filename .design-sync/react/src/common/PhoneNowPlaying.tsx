import { PhoneFrame } from '../feature/PhoneFrame';
import { PhoneScreen } from '../feature/PhoneScreen';
import { t, scope } from '../lib/site';

export interface PhoneNowPlayingProps {
  /** Screen key from `src/data/screens.ts`. Default "now-playing". */
  screen?: string;
  /** Alt text: the hero phone is the only place this screen is described, so it carries one. */
  alt?: string;
  className?: string;
}

const S = scope('vywklzor');

/**
 * The hero phone: one 330px device (capped at its column's width, centred)
 * showing the Now Playing capture, loaded eagerly. It sits in the home hero's
 * art column beside the headline and store badges.
 */
export function PhoneNowPlaying({ screen = 'now-playing', alt = t('hero.phone_alt'), className = '' }: PhoneNowPlayingProps) {
  return (
    <div className={`phone ${className}`} data-hero-phone="" {...S}>
      <PhoneFrame fill idPrefix="hero-s25u">
        <PhoneScreen name={screen} priority alt={alt} />
      </PhoneFrame>
    </div>
  );
}
