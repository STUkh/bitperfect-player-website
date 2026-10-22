import { Footer, ClosingBanner } from '@bitperfect/website-ds';

export function SiteFooter() {
  return <Footer />;
}

/* How an inner page ends: the install banner, then the footer. */
export function PageEnding() {
  return (
    <div>
      <ClosingBanner
        title="Start listening bit for bit."
        description="Connect your DAC for bit-perfect output."
        primaryHref="https://play.google.com/store/apps/details?id=com.bitperfect.player"
        primaryLabel="Get it on Google Play"
        primaryExternal
      />
      <Footer />
    </div>
  );
}
