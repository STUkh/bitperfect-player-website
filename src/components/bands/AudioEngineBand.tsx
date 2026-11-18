import type { FlowProps } from './FlowBackdrop';
import Band from '../sections/Band';
import SectionHeading from '../sections/SectionHeading';

const defaultCapabilities = [
  {
    title: '8× Studio Upsampling',
    specs: 'Up to 768 kHz · Sinc & polyphase filters',
    desc: 'Linear- and minimum-phase oversampling pushing anti-aliasing artifacts far beyond human hearing.',
  },
  {
    title: 'Clip Guard (True-Peak Limiter)',
    specs: '-0.6 dBTP ceiling · Inter-sample detection',
    desc: 'Catches inter-sample digital peaks cleanly without audible compression, distortion, or pumping.',
  },
  {
    title: '32-Band Parametric & AutoEQ',
    specs: '7 filter shapes · 5,000+ headphone profiles',
    desc: 'Studio bell, shelf, and notch filters with one-tap calibration against measured AutoEQ targets.',
  },
  {
    title: 'Crossfeed & Harmonic Tuning',
    specs: 'Bauer, Meier & BS2B · Vacuum tube voicings',
    desc: 'Natural loudspeaker acoustic crossfeed for headphones, plus warm analogue even-order harmonics.',
  },
];

/**
 * Audio Engine & DSP band.
 *
 * Graphite surface (`bg-surface-base`) following AiPlayerBand (Ivory) and
 * preceding StatementBand (Ivory). 4-column architectural technical grid
 * highlighting the player's 64-bit studio sound processing algorithms.
 */
export interface AudioEngineCapability {
  title: string;
  specs: string;
  desc: string;
}

export interface AudioEngineBandProps extends FlowProps {
  title?: string;
  titleAccent?: string;
  lede?: string;
  capabilities?: AudioEngineCapability[];
}

export default function AudioEngineBand({
  backgroundVariant,
  title = 'Beyond bit-perfect. ',
  titleAccent = 'Studio sound processing.',
  lede = 'When you want untouched sound, Bitperfect delivers pure bit-exact transmission. When you want to tailor your listening, our 64-bit audio engine offers precision studio algorithms for uncompromising fidelity.',
  capabilities: customCapabilities,
}: AudioEngineBandProps = {}) {
  const activeCapabilities = customCapabilities && customCapabilities.length > 0 ? customCapabilities : defaultCapabilities;
  return (
    <Band
      backgroundVariant={backgroundVariant}
      id="audio-engine"
      tone="graphite"
      space="default"
      containerClassName="lg:px-20"
      className="scroll-mt-20 border-t border-border-subtle/40"
    >
      <div className="max-w-[820px]">
        <SectionHeading
          tone="graphite"
          title={title}
          titleAccent={titleAccent}
          titleClassName="text-headline-m lg:text-headline"
          reveal={0}
        />
        <p className="mt-4 text-body-sm leading-[1.65] text-pretty text-text-secondary lg:text-lede">
          {lede}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
        {activeCapabilities.map((cap) => (
          <div
            key={cap.title}
            className="border-t border-border-subtle/80 pt-6"
          >
            <h3 className="text-title-sm font-semibold tracking-title text-text-primary">
              {cap.title}
            </h3>
            <span className="mt-1.5 block text-micro font-medium tracking-label text-gold uppercase tabular-nums font-mono">
              {cap.specs}
            </span>
            <p className="mt-2.5 text-sm leading-[1.6] text-pretty text-text-secondary">
              {cap.desc}
            </p>
          </div>
        ))}
      </div>
    </Band>
  );
}
