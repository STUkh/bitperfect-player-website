import { HoldingPage } from '@bitperfect/website-ds';

/* The page the site shows at / while it is parked: the needle photograph as the
   ground, one headline, the Play install button and the two legal links. */
export function UnderConstruction() {
  return (
    <HoldingPage
      eyebrow="Under construction"
      headline="New site on the way."
      lede="The player is still on Google Play, ready for your USB DAC."
    />
  );
}
