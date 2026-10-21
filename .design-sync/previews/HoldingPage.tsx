import { HoldingPage } from '@bitperfect/website-ds';

/* The page the site shows at / while it is parked. */
export function UnderConstruction() {
  return (
    <HoldingPage
      eyebrow="Under construction"
      headline="The needle is still up."
      lede="We are rebuilding this site. The player is unchanged and still on Google Play."
    />
  );
}
