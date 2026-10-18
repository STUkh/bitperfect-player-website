import { CTASection } from '@bitperfect/website-ds';

export function Default() {
  return <CTASection />;
}

export function FeaturePageClose() {
  return (
    <CTASection
      titleLead="Hear your DAC"
      titleAccent="as it was built."
      lede="Plug in over USB-C and Bitperfect Player hands every sample to your DAC untouched."
    />
  );
}
