import { PageHeader } from '@bitperfect/website-ds';

export function WithBackLink() {
  return (
    <PageHeader
      backHref="/features"
      backLabel="Back to Features Overview"
      eyebrow="Full Specification Manual"
      title="27 Audiophile Capabilities"
      description="Android's default audio mixer resamples and compresses audio streams. Bitperfect Player bypasses the OS using custom user-space USB drivers, a Rust playback engine, and hardware isolation."
    />
  );
}

export function Narrow() {
  return (
    <PageHeader
      maxWidth="760px"
      eyebrow="Version History"
      title="Changelog & Release Notes"
      description="Release notes and version history for Bitperfect Player, documenting audio engine updates, driver additions, and stability improvements."
    />
  );
}

export function WideWithSearch() {
  return (
    <PageHeader
      maxWidth="wide"
      eyebrow="Knowledge Base & FAQ"
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

export function ReleaseWithMeta() {
  return (
    <PageHeader
      maxWidth="760px"
      title="Major Audio Engine & 120 FPS UI Update"
      description="Rebuilt the audio pipeline in Rust with Symphonia and ARM NEON vectorization. Added a 60/120 FPS decoupled UI, dyadic lossless volume, and a 4-mode equalizer."
      meta={
        <div>
          <nav className="flex items-center gap-2 text-caption text-text-tertiary" aria-label="Breadcrumb">
            <a href="/changelog" className="inline-flex items-center min-h-[44px] rounded hover:text-gold transition-colors focus-visible:focus-ring">
              Changelog
            </a>
            <span>/</span>
            <span className="text-text-secondary font-medium">Version 1.2.0</span>
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="mono-spec text-headline-sm-m font-extrabold text-gold sm:text-section-sm">v1.2.0</span>
            <span className="mono-spec text-caption text-text-tertiary">Released October 12, 2026</span>
            <span className="mono-spec text-micro font-semibold uppercase tracking-wider text-gold">· Latest Release</span>
          </div>
        </div>
      }
    />
  );
}
