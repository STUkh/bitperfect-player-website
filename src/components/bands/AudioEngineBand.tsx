import type { FlowProps } from './FlowBackdrop';
import Band from '../sections/Band';
import SectionHeading from '../sections/SectionHeading';
import { clsx as cx } from 'clsx';
import { reveal } from '../sections/bands';

/**
 * Each capability is a title and one plain line of what it does. Checked against
 * the app (bitperfect-player): upsampler max 384 kHz (`UPSAMPLER_MAX_RATE_OPTIONS_HZ`),
 * linear or minimum phase; inter-sample headroom Auto or fixed -1 to -6 dB
 * (`IspHeadroomMode`); PEQ 32 bands, 7 filter types (`EqFilterType`); crossfeed
 * Subtle/Natural/Strong (`CrossfeedPreset`); harmonics "Tube Voice" with even/odd tilt.
 */
const defaultCapabilities: AudioEngineCapability[] = [
  { title: '8× upsampling', specs: 'Up to 384 kHz, with linear or minimum phase filters.' },
  { title: 'Inter-sample headroom', specs: 'Lowers the level just enough that peaks never clip inside the DAC.' },
  { title: '32-band parametric EQ', specs: 'Seven filter shapes and AutoEQ profiles for your headphones.' },
  { title: 'Crossfeed and tube warmth', specs: 'Three crossfeed presets for headphones, plus even and odd harmonics.' },
];

export interface AudioEngineCapability {
  title: string;
  /** One plain line under the title. */
  specs: string;
  /** Optional longer line; leave empty, the cards read best with the title and one line. */
  desc?: string;
  /** Unused since the 2026-11 redesign (no tags on the cards); kept so older content still parses. */
  badge?: string;
}

export interface AudioEngineBandProps extends FlowProps {
  title?: string;
  titleAccent?: string;
  /** Optional paragraph beside the headline; empty by default. */
  lede?: string;
  capabilities?: AudioEngineCapability[];
}

/**
 * Audio Engine & DSP band. Graphite with a warm glow only (`ground-engine`),
 * between AiPlayerBand and StatementBand (both ivory). The headline on the left
 * from xl, four capabilities on the right in a 2×2 open-cross grid of hairlines
 * (no cards): a title and one line each. No kicker, no numbering, no badges.
 */
export default function AudioEngineBand({
  backgroundVariant,
  title = 'Beyond bit-perfect. ',
  titleAccent = 'Studio sound processing.',
  lede,
  capabilities: customCapabilities,
}: AudioEngineBandProps = {}) {
  const capabilities =
    customCapabilities && customCapabilities.length > 0 ? customCapabilities : defaultCapabilities;
  const hasLede = Boolean(lede?.trim());
  // Keep "bit-perfect" on one line: a break at its hyphen reads as two words.
  const titleNode = title
    .split(/(bit-perfect)/i)
    .map((part, i) => (i % 2 === 1 ? <span key={i} className="whitespace-nowrap">{part}</span> : part));

  return (
    <Band
      backgroundVariant={backgroundVariant}
      id="audio-engine"
      tone="graphite"
      containerClassName="lg:px-20"
      className="ground ground-engine scroll-mt-20 border-t border-border-subtle/40"
    >
      {/* From xl the headline sits left and the grid right; below xl the 72px
          headline needs the full width, so it stacks over the grid. */}
      <div className="grid grid-cols-1 items-start xl:grid-cols-12 xl:gap-12">
        <div className="xl:col-span-6">
          <SectionHeading
            tone="graphite"
            title={titleNode}
            titleAccent={titleAccent}
            titleClassName="type-headline max-w-[16ch]"
            reveal={0}
          />
          {hasLede && <p className="stack-lede max-w-measure-lede type-lede text-text-secondary">{lede}</p>}
        </div>

        {/* 2×2 on the site's hairlines, as an open cross: no rule over the grid,
            and the rule between the columns and the one between the rows each
            stop short of the centre, so they never meet. On phones a plain stack
            with a full hairline between entries. */}
        <ul role="list" className="stack-content grid grid-cols-1 sm:grid-cols-2 xl:col-span-6 xl:mt-3!">
          {capabilities.map((cap, i) => {
            const left = i % 2 === 0;
            const topRow = i < 2;
            return (
              <li
                key={cap.title}
                className={cx(
                  'r-rise relative py-7 sm:py-0',
                  i > 0 && 'border-t border-border-subtle sm:border-t-0',
                  i === 0 && 'pt-0',
                  topRow ? 'sm:pb-10 lg:pb-12' : 'sm:pt-10 lg:pt-12',
                  left ? 'sm:pr-10' : 'sm:pl-10',
                )}
                style={reveal(i + 1)}
              >
                {topRow && (
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute bottom-0 hidden h-px bg-border-subtle sm:block',
                      left ? 'left-0 right-6' : 'left-6 right-0',
                    )}
                  />
                )}
                {left && (
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute right-0 hidden w-px bg-border-subtle sm:block',
                      topRow ? 'top-0 bottom-6' : 'top-6 bottom-0',
                    )}
                  />
                )}
                <h3 className="type-item text-text-primary">{cap.title}</h3>
                <p className="mt-2.5 type-item-body text-text-secondary">{cap.specs}</p>
                {cap.desc?.trim() && <p className="mt-2.5 text-small text-pretty text-text-tertiary">{cap.desc}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </Band>
  );
}
