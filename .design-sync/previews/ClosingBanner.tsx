import { ClosingBanner } from '@bitperfect/website-ds';

export function InstallAndFaq() {
  return (
    <ClosingBanner
      eyebrow="Get the app"
      title="Ready to hear your music bit-for-bit?"
      description="Download Bitperfect Player on Google Play and bypass Android OS limitations today."
      primaryHref="https://play.google.com/store/apps/details?id=com.bitperfect.player"
      primaryLabel="Get it on Google Play"
      primaryExternal
      secondaryHref="/faq"
      secondaryLabel="Read the FAQ"
    />
  );
}

export function SupportContact() {
  return (
    <ClosingBanner
      maxWidth="760px"
      eyebrow="Support"
      title="Contact Audio Engineering Support"
      description="Our engineering team answers DAC compatibility, NPU hardware, and technical audio questions directly."
      primaryHref="mailto:support@bit-perfect.com"
      primaryLabel="Email Engineering Support"
      secondaryHref="/faq"
      secondaryLabel="Read All FAQs"
    />
  );
}

export function PrimaryOnly() {
  return (
    <ClosingBanner
      maxWidth="760px"
      eyebrow="Updates"
      title="Automatic updates on Google Play"
      description="Download Bitperfect Player on Google Play to receive automatic updates and driver optimizations."
      primaryHref="https://play.google.com/store/apps/details?id=com.bitperfect.player"
      primaryLabel="Get on Google Play"
      primaryExternal
    />
  );
}
