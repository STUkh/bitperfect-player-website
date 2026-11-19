import type { FlowProps } from './FlowBackdrop';
import Band from '../sections/Band';
import SectionHeading from '../sections/SectionHeading';

const defaultCapabilities = [
  {
    title: '8× Studio Upsampling',
    specs: 'Up to 768 kHz · Sinc & polyphase filters',
    desc: 'Linear- and minimum-phase oversampling pushing anti-aliasing artifacts far beyond human hearing.',
    badge: '768 kHz FIR',
  },
  {
    title: 'Clip Guard (True-Peak Limiter)',
    specs: '-0.6 dBTP ceiling · Inter-sample detection',
    desc: 'Catches inter-sample digital peaks cleanly without audible compression, distortion, or pumping.',
    badge: '-0.6 dBTP Guard',
  },
  {
    title: '32-Band Parametric & AutoEQ',
    specs: '7 filter shapes · 5,000+ headphone profiles',
    desc: 'Studio bell, shelf, and notch filters with one-tap calibration against measured AutoEQ targets.',
    badge: '5,000+ Profiles',
  },
  {
    title: 'Crossfeed & Harmonic Tuning',
    specs: 'Bauer, Meier & BS2B · Vacuum tube voicings',
    desc: 'Natural loudspeaker acoustic crossfeed for headphones, plus warm analogue even-order harmonics.',
    badge: 'Analogue Voicing',
  },
];

/**
 * Audio Engine & DSP band.
 *
 * Graphite surface (`bg-surface-base`) following AiPlayerBand (Ivory) and
 * preceding StatementBand (Ivory). Bespoke 2×2 Master Studio Rack module layout:
 * editorial header with technical telemetry, followed by four precision DSP modules.
 */
export interface AudioEngineCapability {
  title: string;
  specs: string;
  desc?: string;
  badge?: string;
}

export interface AudioEngineBandProps extends FlowProps {
  title?: string;
  titleAccent?: string;
  lede?: string;
  capabilities?: AudioEngineCapability[];
}

const defaultBadges = ['768 kHz FIR', '-0.6 dBTP Guard', '5,000+ Profiles', 'Analogue Voicing'];

export default function AudioEngineBand({
  backgroundVariant,
  title = 'Beyond bit-perfect. ',
  titleAccent = 'Studio sound processing.',
  lede = 'When you want untouched sound, Bitperfect delivers pure bit-exact transmission. When you want to tailor your listening, our 64-bit engine offers precision studio algorithms for uncompromising fidelity.',
  capabilities: customCapabilities,
}: AudioEngineBandProps = {}) {
  const activeCapabilities =
    customCapabilities && customCapabilities.length > 0 ? customCapabilities : defaultCapabilities;

  return (
    <Band
      backgroundVariant={backgroundVariant}
      id="audio-engine"
      tone="graphite"
      space="spacious"
      containerClassName="lg:px-20"
      className="scroll-mt-20 border-t border-border-subtle/40"
    >
      {/* Header lockup: Headline on the left, refined editorial lede on the right on desktop */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-10 border-b border-border-subtle/40">
        <div className="max-w-[640px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-micro font-mono uppercase tracking-label text-gold font-medium">
              64-Bit Studio DSP Engine
            </span>
          </div>
          <SectionHeading
            tone="graphite"
            title={title}
            titleAccent={titleAccent}
            titleClassName="text-headline-m lg:text-headline"
            reveal={0}
          />
        </div>
        <p className="max-w-[420px] text-body-sm leading-relaxed text-text-secondary text-pretty lg:pb-1">
          {lede}
        </p>
      </div>

      {/* 2×2 Precision Studio Rack Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {activeCapabilities.map((cap, i) => {
          const badge = cap.badge || defaultBadges[i] || 'Studio DSP';
          return (
            <div
              key={cap.title}
              className="group relative rounded-2xl border border-border-subtle/80 bg-surface-raised/30 p-6 sm:p-7 hover:border-gold/40 hover:bg-surface-raised/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-micro font-mono tracking-label text-text-tertiary">
                  DSP · 0{i + 1}
                </span>
                <span className="text-micro font-mono uppercase tracking-label text-gold font-medium px-2.5 py-0.5 rounded-full bg-gold/[0.08] border border-gold/20">
                  {badge}
                </span>
              </div>
              <h3 className="mt-4 text-title-sm sm:text-title font-semibold tracking-title text-text-primary group-hover:text-gold transition-colors">
                {cap.title}
              </h3>
              <span className="mt-1.5 block text-micro font-mono tracking-label text-text-secondary uppercase">
                {cap.specs}
              </span>
              {cap.desc && (
                <p className="mt-3 text-body-sm leading-relaxed text-text-secondary/90 text-pretty">
                  {cap.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Band>
  );
}
