import { HeroSection } from '@bitperfect/website-ds';

export function Default() {
  return <HeroSection />;
}

export function CustomHeadline() {
  return (
    <HeroSection
      eyebrow="Exclusive USB DAC output"
      titleLead="Your DAC."
      titleAccent="Unmixed."
      lede="The phone stops resampling. Every file reaches your hardware at the rate it was mastered."
    />
  );
}

export function NoTrialLine() {
  return <HeroSection trialLine={null} />;
}

export function EqualizerScreen() {
  return <HeroSection screen="eq-filters" secondaryLabel="Explore the EQ" secondaryHref="/features/eq/" />;
}
