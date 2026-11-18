import { useState, useMemo, type ChangeEvent } from 'react';
import { clsx as cx } from 'clsx';
import {
  neuralChipFamilies,
  liteModeNote,
  executionTiers,
  systemRequirements,
  type NeuralChipFamily,
} from '../../data/neural-chips';
import { toneText, useTone, type Tone } from '../sections/bands';
import type { ClassProps } from '../_lib/class-props';
import { withBase } from '../../utils/nav';

export interface SupportedDevicesProps extends ClassProps {
  /** Text and hairline tokens. Defaults to graphite. */
  tone?: Tone;
  /** Anchor id, for hash navigation (e.g. `supported-neural-chips`). */
  id?: string;
  /** Presentation variant: 'full' (with search & tabs), 'reference' (2-column list), or 'compact'. */
  variant?: 'full' | 'reference' | 'compact';
  /** Whether to render execution tier cards in full view (defaults to true in full variant). */
  showTiers?: boolean;
  /** Whether to show a link to the troubleshooting guide. */
  showTroubleshootingLink?: boolean;
}

export default function SupportedDevices({
  tone = 'graphite',
  id = 'supported-neural-chips',
  variant = 'reference',
  showTiers = true,
  showTroubleshootingLink = true,
  className,
}: SupportedDevicesProps) {
  const currentTone = useTone(tone);
  const t = toneText[currentTone];
  const isGraphite = currentTone === 'graphite';

  // Interactive search and category filters for 'full' variant
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'snapdragon' | 'dimensity' | 'lite'>('all');

  const normalizedQuery = query.trim().toLowerCase();

  // Filtered chip families based on search query and active tab
  const filteredFamilies = useMemo(() => {
    if (activeTab === 'lite') return [];

    return neuralChipFamilies
      .filter((family) => activeTab === 'all' || family.id === activeTab)
      .map((family) => {
        if (!normalizedQuery) return family;

        const familyMatches =
          family.name.toLowerCase().includes(normalizedQuery) ||
          family.shortName.toLowerCase().includes(normalizedQuery);

        if (familyMatches) return family;

        // Build set of chip names matching query directly or through device examples
        const matchingChipSet = new Set<string>();

        family.chips.forEach((chip) => {
          if (chip.toLowerCase().includes(normalizedQuery)) {
            matchingChipSet.add(chip);
          }
        });

        family.examples.forEach((ex) => {
          if (
            ex.devices.toLowerCase().includes(normalizedQuery) ||
            ex.chip.toLowerCase().includes(normalizedQuery)
          ) {
            matchingChipSet.add(ex.chip);
          }
        });

        const chipsToShow = family.chips.filter((c) => matchingChipSet.has(c));

        if (chipsToShow.length > 0) {
          return {
            ...family,
            chips: chipsToShow,
            examples: family.examples.filter((ex) => matchingChipSet.has(ex.chip)),
          };
        }

        return null;
      })
      .filter((f): f is NeuralChipFamily => f !== null);
  }, [normalizedQuery, activeTab]);

  const hasSpecificMatches = filteredFamilies.length > 0;
  const isQueryingLiteCandidate = useMemo(() => {
    if (!normalizedQuery) return false;
    const liteKeywords = ['pixel', 'tensor', 'exynos', 'samsung a', 'kirin', 'snapdragon 6', 'snapdragon 888', 'snapdragon 870', 'snapdragon 865', 'snapdragon 855', 'g1', 'g2', 'g3', 'g4'];
    return liteKeywords.some((kw) => normalizedQuery.includes(kw));
  }, [normalizedQuery]);

  const compatibilityPageHref = withBase('compatibility');
  const troubleshootingHref = withBase('faq/why-npu-ai-enhancer-not-working');

  /* ──────────────────────────────────────────────────────────────────────────
   * Reference / Compact Layout
   * ────────────────────────────────────────────────────────────────────────── */
  if (variant === 'reference' || variant === 'compact') {
    return (
      <div id={id} className={cx(['scroll-mt-24', className])}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          {neuralChipFamilies.map((family) => (
            <section key={family.id} aria-labelledby={`neural-chips-${family.id}`}>
              <div className="flex items-center justify-between gap-2">
                <h3 id={`neural-chips-${family.id}`} className={cx(['text-body font-semibold', t.title])}>
                  {family.name}
                </h3>
                <span className={cx([
                  'mono-spec text-micro px-2 py-0.5 rounded font-medium',
                  isGraphite
                    ? 'bg-gold/10 text-gold border border-border-gold/30'
                    : 'bg-band-gold-ink/10 text-band-gold-ink border border-band-gold-ink/25',
                ])}>
                  Full NPU
                </span>
              </div>
              <ul className="mt-3" role="list">
                {family.chips.map((chip) => (
                  <li
                    key={chip}
                    className={cx([
                      'border-t py-2 text-small tabular-nums flex items-baseline justify-between gap-2',
                      t.rule,
                      t.body,
                    ])}
                  >
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className={cx(['mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t pt-4', t.rule])}>
          <p className={cx(['text-small text-pretty', t.body])}>
            {liteModeNote}
          </p>
          <a
            href={compatibilityPageHref}
            className={cx([
              'focus-visible:focus-ring inline-flex items-center text-small font-semibold transition-colors shrink-0',
              isGraphite ? 'text-gold hover:text-gold-light' : 'text-band-gold-ink hover:underline',
            ])}
          >
            Check compatibility
          </a>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────────────
   * Full Detailed Interactive Layout (for /compatibility)
   * ────────────────────────────────────────────────────────────────────────── */
  return (
    <div id={id} className={cx(['scroll-mt-24 space-y-12', className])}>
      {/* ── 3 Execution Tiers ── */}
      {showTiers && (
        <section aria-labelledby="execution-tiers-title">
          <div className="flex flex-col gap-2">
            <span className="mono-spec text-micro uppercase tracking-wider text-gold font-bold">
              Architecture & Execution Tiers
            </span>
            <h2 id="execution-tiers-title" className="text-title-lg font-bold text-text-primary text-balance">
              How AI Enhancer executes on your hardware
            </h2>
            <p className="max-w-measure-legal text-body text-text-secondary">
              Bitperfect Player is engineered with audio fidelity and signal honesty. Depending on your phone&apos;s processor, AI Enhancer operates within distinct execution tiers.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {executionTiers.map((tier) => (
              <div
                key={tier.id}
                className="lacquer relative flex flex-col justify-between rounded-card-sm border border-border-subtle/70 bg-surface-raised p-6 transition-all hover:border-border-gold/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-spec text-micro text-gold uppercase tracking-wider font-semibold">
                      {tier.tier}
                    </span>
                    <span className="inline-flex rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-gold border border-border-gold/20">
                      {tier.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 text-body-lg font-semibold text-text-primary">
                    {tier.title}
                  </h3>
                  <p className="mt-2 text-small text-text-secondary leading-relaxed">
                    {tier.description}
                  </p>
                </div>
                <div className="mt-5 border-t border-border-subtle/50 pt-3">
                  <span className="mono-spec block text-[11px] text-text-tertiary uppercase tracking-wider">
                    Requirement
                  </span>
                  <span className="mt-0.5 block text-caption text-text-primary font-medium">
                    {tier.requirements}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Interactive Processor Matrix & Search ── */}
      <section aria-labelledby="supported-processors-title" className="border-t border-border-subtle pt-10">
        <div className="flex flex-col gap-2">
          <span className="mono-spec text-micro uppercase tracking-wider text-gold font-bold">
            Supported Processors
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 id="supported-processors-title" className="text-title-lg font-bold text-text-primary text-balance">
                Find your processor or phone model
              </h2>
              <p className="mt-1 max-w-measure-legal text-body text-text-secondary">
                Search by chipset name (e.g. <em>Snapdragon 8 Gen 3</em>, <em>Dimensity 9300</em>) or phone model (e.g. <em>Galaxy S24</em>, <em>OnePlus 12</em>).
              </p>
            </div>

            {/* Troubleshooting link */}
            {showTroubleshootingLink && (
              <a
                href={troubleshootingHref}
                className="focus-visible:focus-ring inline-flex items-center text-small font-semibold text-gold hover:text-gold-light shrink-0"
              >
                Troubleshooting guide →
              </a>
            )}
          </div>
        </div>

        {/* Search Input & Category Filter Tabs */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Search chip or phone (e.g. 8 Gen 3, 9400, S24, Pixel)..."
              aria-label="Search supported neural chips or phones"
              className="w-full rounded-lg border border-border-subtle bg-surface-raised px-4 py-2.5 text-small text-text-primary placeholder:text-text-tertiary focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-caption text-text-tertiary hover:text-text-primary"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter chips by family">
            {(
              [
                { id: 'all', label: 'All Chips' },
                { id: 'snapdragon', label: 'Snapdragon (NPU)' },
                { id: 'dimensity', label: 'Dimensity (NPU)' },
                { id: 'lite', label: 'Lite Mode (CPU)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cx([
                  'rounded-full px-3 py-1.5 text-caption font-semibold transition-colors duration-150',
                  activeTab === tab.id
                    ? 'bg-gold text-surface-base'
                    : 'bg-surface-raised text-text-secondary hover:text-text-primary hover:bg-surface-raised/80 border border-border-subtle',
                ])}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lite Mode Dedicated Tab View */}
        {activeTab === 'lite' && (
          <div className="mt-8 rounded-card border border-border-subtle/80 bg-surface-raised p-6 lg:p-8">
            <div className="flex items-center gap-2">
              <span className="mono-spec text-micro uppercase tracking-wider text-gold font-bold">
                Tier 2 · Universal CPU Execution
              </span>
            </div>
            <h3 className="mt-2 text-title font-bold text-text-primary">
              Lite Mode on Main Processor
            </h3>
            <p className="mt-2 max-w-measure-legal text-body text-text-secondary leading-relaxed">
              When your phone lacks a dedicated Snapdragon or Dimensity neural accelerator, Bitperfect Player runs AI Enhancer in Lite mode on your main 64-bit CPU cores.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="border-t border-border-subtle/60 pt-4">
                <h4 className="text-small font-semibold text-text-primary">
                  Supported CPU Families
                </h4>
                <ul className="mt-3 space-y-2 text-small text-text-secondary list-disc pl-5">
                  <li><strong>Google Tensor:</strong> Tensor G1, G2, G3, G4 (Pixel 6, 7, 8, 9 series)</li>
                  <li><strong>Samsung Exynos:</strong> Exynos 2400, 2200, 1480, 1380 (Galaxy S &amp; A series)</li>
                  <li><strong>Other Snapdragon:</strong> Snapdragon 888, 870, 865, 855, 778G, 6-series</li>
                  <li><strong>Other MediaTek:</strong> Dimensity 7050, 7200, 1080, Helio series</li>
                </ul>
              </div>

              <div className="border-t border-border-subtle/60 pt-4">
                <h4 className="text-small font-semibold text-text-primary">
                  How Lite Mode Performs
                </h4>
                <ul className="mt-3 space-y-2 text-small text-text-secondary list-disc pl-5">
                  <li>Runs a streamlined neural kernel optimized for ARM NEON vector instructions</li>
                  <li>Processes live 44.1 and 48 kHz audio with zero cloud dependency</li>
                  <li>Automatically disengages if buffer headroom drops to prevent audio glitches</li>
                  <li>Included with the same subscription—no upgrade required</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Informative message for Tensor/Exynos/Pixel searches */}
        {isQueryingLiteCandidate && activeTab !== 'lite' && (
          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/5 p-4 text-small text-text-primary">
            <span className="font-semibold text-gold">Lite Mode Match: </span>
            Phones powered by Google Tensor (Pixel series) or Samsung Exynos execute AI Enhancer via <strong>Tier 2 Lite mode on the main processor</strong>. Full NPU acceleration is reserved for Snapdragon and Dimensity silicon.
          </div>
        )}

        {/* Empty Search Result */}
        {!hasSpecificMatches && activeTab !== 'lite' && !isQueryingLiteCandidate && (
          <div className="mt-8 rounded-card border border-border-subtle bg-surface-raised/50 p-8 text-center">
            <p className="text-body font-semibold text-text-primary">
              No specific NPU entry matches &ldquo;{query}&rdquo;
            </p>
            <p className="mt-2 text-small text-text-secondary max-w-measure mx-auto">
              If your phone is not in the dedicated NPU list, it runs AI Enhancer smoothly in <strong>Lite mode on the main processor</strong>, provided it runs 64-bit Android 8.0 or newer.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActiveTab('all');
              }}
              className="focus-visible:focus-ring mt-4 inline-flex items-center text-small font-semibold text-gold hover:text-gold-light"
            >
              Reset search filters
            </button>
          </div>
        )}

        {/* Chip Family Grids */}
        {hasSpecificMatches && activeTab !== 'lite' && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {filteredFamilies.map((family) => (
              <div
                key={family.id}
                className="lacquer rounded-card border border-border-subtle bg-surface-raised p-6 lg:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/80 pb-4">
                  <div>
                    <h3 className="text-title font-bold text-text-primary">
                      {family.name}
                    </h3>
                    <span className="mono-spec text-micro text-text-tertiary">
                      {family.npuName}
                    </span>
                  </div>
                  <span className="mono-spec text-micro rounded-full bg-gold/10 px-3 py-1 font-semibold text-gold border border-border-gold/30">
                    Full NPU Support
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className="mono-spec text-micro uppercase tracking-wider text-text-tertiary">
                    Supported Processors ({family.chips.length})
                  </h4>
                  <ul className="mt-3 divide-y divide-border-subtle/60" role="list">
                    {family.chips.map((chip) => {
                      const example = family.examples.find((e) => e.chip === chip);
                      return (
                        <li key={chip} className="py-3">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-body-sm font-semibold text-text-primary tabular-nums">
                              {chip}
                            </span>
                            <span className="mono-spec text-[11px] text-gold font-medium">
                              Full Model
                            </span>
                          </div>
                          {example && (
                            <p className="mt-1 text-caption text-text-tertiary">
                              Found in: {example.devices}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lite Mode Summary Banner in All Chips view */}
        {activeTab !== 'lite' && !normalizedQuery && (
          <div className="mt-8 rounded-card border border-border-subtle/80 bg-surface-raised p-6 lg:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="mono-spec text-micro uppercase tracking-wider text-gold font-bold">
                    Tier 2 Fallback
                  </span>
                  <span className="text-micro rounded-full bg-gold/10 px-2.5 py-0.5 font-semibold text-gold border border-border-gold/20">
                    Universal 64-bit CPU
                  </span>
                </div>
                <h3 className="mt-1.5 text-body-lg font-semibold text-text-primary">
                  Have a Google Pixel, Samsung Exynos, or another processor?
                </h3>
                <p className="mt-1 text-small text-text-secondary leading-relaxed">
                  Phones with Google Tensor, Samsung Exynos, and other modern 64-bit processors run AI Enhancer in <strong>Lite mode on the main processor</strong>. It executes optimized vector floating-point kernels with zero audio lag.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('lite')}
                className="focus-visible:focus-ring inline-flex items-center justify-center rounded-lg border border-border-subtle bg-surface-base px-4 py-2.5 text-small font-semibold text-text-primary hover:border-border-gold/40 hover:text-gold transition-colors shrink-0"
              >
                Learn about Lite mode
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── System & Audio Requirements ── */}
      <section aria-labelledby="system-req-title" className="border-t border-border-subtle pt-10">
        <div className="flex flex-col gap-2">
          <span className="mono-spec text-micro uppercase tracking-wider text-gold font-bold">
            Hardware & Platform Requirements
          </span>
          <h2 id="system-req-title" className="text-title-lg font-bold text-text-primary text-balance">
            Audio format and hardware compatibility
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lacquer rounded-card-sm border border-border-subtle/70 bg-surface-raised p-5">
            <span className="mono-spec text-micro text-gold uppercase tracking-wider font-semibold">
              Android OS
            </span>
            <h3 className="mt-2 text-body font-semibold text-text-primary">
              {systemRequirements.android.minVersion}
            </h3>
            <p className="mt-1.5 text-caption text-text-secondary">
              {systemRequirements.android.recommendedVersion}. 64-bit ARM architecture.
            </p>
          </div>

          <div className="lacquer rounded-card-sm border border-border-subtle/70 bg-surface-raised p-5">
            <span className="mono-spec text-micro text-gold uppercase tracking-wider font-semibold">
              Sample Rates
            </span>
            <h3 className="mt-2 text-body font-semibold text-text-primary">
              44.1 kHz &amp; 48 kHz PCM
            </h3>
            <p className="mt-1.5 text-caption text-text-secondary">
              {systemRequirements.audio.hiResBehavior}.
            </p>
          </div>

          <div className="lacquer rounded-card-sm border border-border-subtle/70 bg-surface-raised p-5">
            <span className="mono-spec text-micro text-gold uppercase tracking-wider font-semibold">
              USB DAC Support
            </span>
            <h3 className="mt-2 text-body font-semibold text-text-primary">
              UAC1 &amp; UAC2 Class
            </h3>
            <p className="mt-1.5 text-caption text-text-secondary">
              Direct exclusive USB hardware lock bypassing Android mixer.
            </p>
          </div>

          <div className="lacquer rounded-card-sm border border-border-subtle/70 bg-surface-raised p-5">
            <span className="mono-spec text-micro text-gold uppercase tracking-wider font-semibold">
              Privacy &amp; Data
            </span>
            <h3 className="mt-2 text-body font-semibold text-text-primary">
              100% On-Device
            </h3>
            <p className="mt-1.5 text-caption text-text-secondary">
              Zero audio telemetry. Works completely offline after initial download.
            </p>
          </div>
        </div>
      </section>

      {/* ── Troubleshooting Callout Banner ── */}
      <section className="rounded-card border border-border-subtle/80 bg-gradient-to-r from-surface-raised via-surface-raised to-surface-raised/60 p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="mono-spec text-micro uppercase tracking-wider text-gold font-bold">
              Troubleshooting &amp; Support
            </span>
            <h3 className="mt-2 text-title font-bold text-text-primary">
              Has a supported chip but AI Enhancer isn&apos;t working?
            </h3>
            <p className="mt-2 text-small text-text-secondary leading-relaxed">
              Certain manufacturers (such as Motorola) lock third-party apps out of the neural chip in system firmware. In other cases, high-res audio (96+ kHz) or active Bit-perfect lock will keep the enhancer off by design.
            </p>
          </div>
          <a
            href={troubleshootingHref}
            className="focus-visible:focus-ring inline-flex items-center justify-center rounded-lg bg-gold px-5 py-3 text-small font-semibold text-surface-base transition-colors hover:bg-gold-light shrink-0"
          >
            Why AI Enhancer may be unavailable
          </a>
        </div>
      </section>
    </div>
  );
}
