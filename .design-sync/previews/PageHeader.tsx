import { PageHeader } from '@bitperfect/website-ds';

export function WithBackLink() {
  return (
    <PageHeader
      backHref="/features"
      backLabel="Back to Features Overview"
      title="27 Audiophile Capabilities"
      description="Android's default audio mixer resamples and compresses audio streams. Bitperfect Player bypasses the OS using custom user-space USB drivers, a Rust playback engine, and hardware isolation."
    />
  );
}

export function Narrow() {
  return (
    <PageHeader
      maxWidth="760px"
      title="Terms of Use"
      description="The subscription, the free trial for new customers, billing and cancellation, in plain words."
    />
  );
}

export function WideWithSearch() {
  return (
    <PageHeader
      maxWidth="wide"
      title="Frequently Asked Questions"
      description="Clear, direct answers on Android OS mixer bypass, USB DAC connections, hardware NPU requirements for neural audio, and battery management."
    >
      <div className="mt-8 relative max-w-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-tertiary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search questions (e.g., USB DAC, NPU, Bitperfect Lock, battery, DSD)..."
          className="w-full rounded-lg border border-border-subtle bg-surface-raised pl-10 pr-4 py-3 text-small text-text-primary placeholder:text-text-tertiary focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
        />
      </div>
    </PageHeader>
  );
}

export function WithEyebrowAndMeta() {
  return (
    <PageHeader
      eyebrow="Legal"
      meta={<p className="mb-3 text-caption text-text-tertiary">Last updated 1 October 2026</p>}
      title="Privacy Policy"
      description="What the app collects, which is almost nothing, and what never leaves your phone."
    />
  );
}
