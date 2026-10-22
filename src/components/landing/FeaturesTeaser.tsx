import type { CSSProperties } from 'react';
import Container from '../common/Container';
import FeatureArt from '../feature/FeatureArt';
import FeatureMark from '../feature/FeatureMark';
import { withBase } from '../../utils/nav';
import { featureName } from '../../data/navigation';
import './FeaturesTeaser.css';

/*
  One line each. The NAME is not written here: this list carried its own titles,
  and three of them disagreed with the nav link pointing at the same route
  (`Studio DSP` against `DSP rack`, `Network streaming` against `Network
  casting`, `Local lossless library` against `Local library`).
  See `featureRoutes` in src/data/navigation.ts.
*/
const items = [
  {
    slug: 'usb-dac',
    desc: "Your DAC follows each file's rate, up to 768 kHz if it supports it. DSD plays as DSD where it can.",
  },
  {
    slug: 'ai-enhancer',
    desc: "Rebuilds the missing highs in 44.1 and 48 kHz files, on your phone. Off by default.",
  },
  { slug: 'eq', desc: 'Parametric, graphic or AutoEQ. Off means no change.' },
  {
    slug: 'library',
    desc: 'Browse by album or folder. Your library stays on your phone.',
  },
  { slug: 'casting', desc: 'Send to network speakers, or turn the phone into one.' },
  {
    slug: 'dsp',
    desc: 'Crossfeed, ReplayGain and clip protection. All optional.',
  },
];

/* Where each photo's subject sits, so the wide crop keeps it. */
const artY: Record<string, string> = {
  'usb-dac': '48%',
  'ai-enhancer': '45%',
  eq: '55%',
  library: '50%',
  casting: '66%',
  dsp: '62%',
};

const allFeaturesHref = withBase('features');

/**
 * Features teaser, graphite.
 *
 * Six hairline-separated rows in two columns, not cards and not one hue per
 * item. The items are told apart by their mark and their content, never by
 * colour. The eyebrow here is monospace neutral: on graphite, gold belongs to
 * the primary action and almost nothing else.
 *
 * This section runs taller than its neighbours on purpose. It is the densest band
 * on the page, twelve items in two columns against three facts either side of it,
 * and four consecutive sections at an identical vertical rhythm read as a template
 * even when each one is good on its own.
 *
 * The marks come from FeatureMark rather than being inlined here. They used to
 * be six Lucide defaults, and the one for the AI Enhancer was the four-pointed
 * sparkle every generated product page has used since 2023.
 */
export default function FeaturesTeaser() {
  return (
    <section id="features" className="ground features-ground relative scroll-mt-20 bg-surface-base pt-14 pb-15 lg:pt-36 lg:pb-38">
      <Container className="lg:px-20">
        <div className="flex items-end justify-between gap-12 lg:mb-15">
          {/*
        No eyebrow. `Features` restated the section: the nav says it, the anchor
        says it, and the headline underneath says it a third time. The heading now
        opens the section on its own. DESIGN.md, "The Eyebrow Budget Rule".
      */}
          <div className="max-w-[620px]">
            <h2
              className="r-rise text-headline-sm-m text-balance text-text-primary lg:text-headline-sm"
              style={{ '--i': '0' } as CSSProperties}
            >
              Six things it does
            </h2>
          </div>
          <a
            href={allFeaturesHref}
            className="focus-visible:focus-ring r-fade features-teaser-all hidden shrink-0 cursor-pointer items-center gap-2 pb-1.5 text-[15px] font-semibold text-gold hover:text-gold-light active:text-gold-deep lg:inline-flex"
            style={{ '--i': '1' } as CSSProperties}
          >
            <span>All features</span> <FeatureMark name="arrow-right" size={18} className="features-teaser-all-arrow" />
          </a>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => (
            <a
              key={item.slug}
              href={withBase(`features/${item.slug}`)}
              className="focus-visible:focus-ring r-rise lacquer lacquer-lift features-card group relative flex cursor-pointer flex-col overflow-hidden rounded-card-inner lg:rounded-card"
              style={{ '--i': i % 3, '--art-y': artY[item.slug] ?? '50%' } as CSSProperties}
            >
              <div className="features-card-art relative overflow-hidden">
                <FeatureArt slug={item.slug} ratio="16 / 7" />
              </div>
              <div className="relative flex flex-1 flex-col px-6 pt-3 pb-6 lg:px-7 lg:pt-4 lg:pb-7">
                <h3 className="text-title-sm font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-[var(--d-ui)] ease-ui group-hover:text-gold-light lg:text-title">
                  {featureName(item.slug)}
                </h3>
                <p className="mt-2 text-body-sm text-pretty text-text-secondary transition-colors duration-[var(--d-ui)] ease-ui group-hover:text-text-primary">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
          <a
            href={allFeaturesHref}
            className="focus-visible:focus-ring features-teaser-all inline-flex cursor-pointer items-center gap-2 pt-1 text-[15px] font-semibold text-gold hover:text-gold-light active:text-gold-deep lg:hidden"
          >
            <span>All features</span> <FeatureMark name="arrow-right" size={18} className="features-teaser-all-arrow" />
          </a>
        </div>
      </Container>
    </section>
  );
}
