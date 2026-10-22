import { HomeOpening } from '@bitperfect/website-ds';

/* The landing page's opening, one pinned block. On the site it scrolls: the Now
   Playing phone travels from the hero's right column to the centre while the
   Equaliser and Library phones slide out from behind it. The card shows the resting
   state, which is also what phones, reduced motion and no-script visitors get: hero
   copy beside the Now Playing phone, then the heading, then the other two screens. */
export function Default() {
  return <HomeOpening />;
}
