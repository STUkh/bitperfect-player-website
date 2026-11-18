import type { FlowProps } from './FlowBackdrop';
import Band from '../sections/Band';
import SectionHeading from '../sections/SectionHeading';
import { withBase } from '../../utils/nav';

const aiEnhancerHref = withBase('features/ai-enhancer/');
const compatibilityHref = withBase('faq/why-npu-ai-enhancer-not-working/#supported-neural-chips');

/**
 * AI Enhanced Audio Player band.
 *
 * Ivory surface (`bg-band-ivory`) preceding AudioEngineBand.
 * Typographic and hairline-ruled layout without cards or boxes.
 * Presents three on-device AI modules: AI Enhancer, AI Karaoke, and AI Mix.
 */
export interface AiModule {
  title: string;
  description: string;
  note?: string;
  href?: string;
  linkText?: string;
}

export interface AiPlayerBandProps extends FlowProps {
  title?: string;
  titleAccent?: string;
  lede?: string;
  modules?: AiModule[];
  footnote?: string;
  compatibilityLabel?: string;
}

const defaultModules: AiModule[] = [
  {
    title: 'AI Enhancer',
    description: 'Restores 14–22 kHz high-frequency harmonics lost to lossy compression. Runs on-device via NPU with automatic CPU fallback.',
    note: 'Signal badge confirms Enhanced status.',
    href: aiEnhancerHref,
    linkText: 'Read more',
  },
  {
    title: 'AI Karaoke',
    description: 'Real-time 2- and 4-stem vocal and instrument isolation. Mute vocals or extract solo parts offline with zero latency.',
    note: '100% offline. Zero audio leaves your phone.',
  },
  {
    title: 'AI Mix',
    description: 'Sonic Scan maps timbre and energy across your library for seamless, harmonically matched transitions.',
    note: 'On-device CPU analysis. No tracking or cloud metadata.',
  },
];

export default function AiPlayerBand({
  backgroundVariant,
  title = 'AI Enhanced Audio Player. ',
  titleAccent = 'Three on-device neural modules.',
  lede = 'Running 100% offline on your phone\'s silicon. Real-time high-frequency harmonic restoration, stem isolation, and acoustic timbral matching—engineered with mathematical honesty. No audio ever leaves your phone.',
  modules: customModules,
  footnote = 'Full neural model requires a supported hardware neural accelerator.',
  compatibilityLabel = 'Check compatibility',
}: AiPlayerBandProps = {}) {
  const activeModules = customModules && customModules.length > 0 ? customModules : defaultModules;
  return (
    <Band
      backgroundVariant={backgroundVariant}
      id="ai-player"
      tone="ivory"
      ground="ground-statement"
      containerClassName="lg:px-20"
    >
      <div className="mx-auto max-w-[820px] text-center">
        <SectionHeading
          className="flex flex-col items-center text-center"
          title={title}
          titleAccent={titleAccent}
          titleClassName="text-headline-m lg:text-headline"
          reveal={0}
        />
        <p className="mx-auto mt-4 max-w-[700px] text-body-sm leading-[1.65] text-pretty text-band-ink-muted lg:text-lede">
          {lede}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 border-t border-band-rule pt-8 lg:mt-14 lg:grid-cols-3 lg:pt-10">
        {activeModules.map((module, idx) => (
          <div
            key={module.title}
            className={
              idx === 0
                ? 'py-6 lg:py-0 lg:pr-8 xl:pr-10'
                : idx === 1
                ? 'border-t border-band-rule py-6 lg:border-t-0 lg:border-l lg:border-band-rule lg:py-0 lg:px-8 xl:px-10'
                : 'border-t border-band-rule py-6 lg:border-t-0 lg:border-l lg:border-band-rule lg:py-0 lg:pl-8 xl:pl-10'
            }
          >
            <h3 className="text-title-sm font-semibold tracking-title text-band-ink lg:text-title">
              {module.title}
            </h3>
            <p className="mt-2.5 text-sm leading-[1.65] text-pretty text-band-ink-muted lg:text-[15px]">
              {module.description}
            </p>
            {module.note && (
              <p className="mt-2.5 text-xs font-medium text-band-ink-muted/80">
                {module.note}
              </p>
            )}
            {module.href && (
              <div className="mt-5">
                <a
                  href={module.href}
                  aria-label={`Read more about ${module.title}`}
                  className="text-small font-semibold text-band-gold-ink hover:underline focus-visible:focus-ring"
                >
                  {module.linkText || 'Read more'}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Outside footnote row: Check compatibility */}
      <div className="mt-10 border-t border-band-rule pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-small">
        <p className="text-band-ink-muted text-sm">
          {footnote}
        </p>
        <a
          href={compatibilityHref}
          className="font-semibold text-band-gold-ink hover:underline focus-visible:focus-ring shrink-0"
        >
          {compatibilityLabel}
        </a>
      </div>
    </Band>
  );
}
