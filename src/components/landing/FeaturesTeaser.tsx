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
    desc: "Direct USB DAC output, past Android's mixer. Up to 768 kHz and DSD512.",
  },
  {
    slug: 'ai-enhancer',
    desc: 'Rebuilds high frequencies that compression removes. Off by default.',
  },
  { slug: 'eq', desc: 'Parametric, graphic or AutoEQ. Turn it off in one tap.' },
  {
    slug: 'library',
    desc: 'Browse your local files instantly by folder, album, artist or tag.',
  },
  { slug: 'casting', desc: 'Stream to cast-enabled speakers and TVs, or receive from your network.' },
  {
    slug: 'dsp',
    desc: 'Crossfeed for headphones, album loudness and clip protection.',
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
 * Features teaser. No props; the copy is the site's own.
 *
 * Follows StatementBand and precedes the TextureStrip and PrivacyBand. Graphite
 * surface (`bg-surface-base`) on the `features-ground` backdrop; the `#features`
 * anchor that the hero's "See what it does" button targets.
 *
 * Content: the heading "Six things it does", then six lacquered cards (`lacquer
 * lacquer-lift`) in a 1/2/3-column grid. Each card is a link to its feature page
 * with a `FeatureArt` photograph, a title and one line. Titles come from
 * `featureName()` in `src/data/navigation.ts`, so they match the nav; the one-line
 * descriptions are local to the file. An "All features" link sits beside the heading
 * on desktop and after the grid on mobile. Cards are told apart by photograph and
 * content, never by hue. No eyebrow.
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
              className="focus-visible:focus-ring r-rise lacquer lacquer-lift features-card group relative flex cursor-pointer flex-col rounded-card-inner lg:rounded-card"
              style={{ '--i': i % 3, '--art-y': artY[item.slug] ?? '50%' } as CSSProperties}
            >
              {/* The plate clips itself, 1px inside the card's radius: the card cannot
                  clip, because its hover layer sits on the border (lacquer.css). */}
              <div className="features-card-art relative overflow-hidden rounded-t-[15px] lg:rounded-t-[23px]">
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
