import type { CSSProperties } from 'react';
import Container from '../primitives/Container';
import FeatureArt from '../primitives/FeatureArt';
import featureArtY from '../../data/feature-art.json';
import FeatureLinkCard from '../sections/FeatureLinkCard';
import FeatureMark from '../primitives/FeatureMark';
import { withBase } from '../../utils/nav';
import { featureName } from '../../data/navigation';
import FlowBackdrop, { type FlowProps } from './FlowBackdrop';
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
    desc: "Direct USB DAC output, past the system mixer. Up to 768 kHz and DSD512.",
  },
  {
    slug: 'ai-enhancer',
    desc: 'Rebuilds high frequencies that compression removes. Off by default.',
  },
  { slug: 'eq', desc: 'Parametric EQ, graphic EQ, or AutoEQ calibration profiles. One-tap bypass.' },
  {
    slug: 'library',
    desc: 'Browse your local files instantly by folder, album, artist or tag.',
  },
  { slug: 'casting', desc: 'Stream to cast-enabled speakers and TVs, or receive from your network.' },
  {
    slug: 'dsp',
    desc: 'Headphone crossfeed, tag-based ReplayGain, and true-peak protection.',
  },
];

/* Where each photo's subject sits, so the wide crop keeps it. Shared with
   scripts/images.mjs, which cuts the matching 16:7 crop from it. */
const artY = featureArtY as Record<string, number>;

/* The card's width: one column on a phone (the 20px gutters), two from `sm` (32px
   gutters, a 24px gap), three from `lg` inside the band, 355px at the 1280 column. */
const cardSizes =
  '(min-width: 1280px) 355px, (min-width: 1024px) calc((100vw - 214px) / 3), (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 42px)';

const allFeaturesHref = withBase('features');

/**
 * Features teaser. No props; the copy is the site's own.
 *
 * Follows StatementBand and precedes PrivacyBand. Graphite
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
export default function FeaturesTeaser({ backgroundVariant }: FlowProps = {}) {
  return (
    <section id="features" className={`${backgroundVariant ? 'flow-surface ' : ''}ground features-ground relative scroll-mt-20 overflow-hidden bg-surface-base section-spacious`}>
      {backgroundVariant && <FlowBackdrop variant={backgroundVariant} />}
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
            <FeatureLinkCard
              key={item.slug}
              href={withBase(`features/${item.slug}`)}
              title={featureName(item.slug)}
              body={item.desc}
              className="lacquer lacquer-lift features-card"
              style={{ '--i': i % 3, '--art-y': `${Math.round((artY[item.slug] ?? 0.5) * 100)}%` } as CSSProperties}
              art={
                /* The plate clips itself, 1px inside the card's radius: the card cannot
                   clip, because its hover layer sits on the border (lacquer.css). */
                <div className="features-card-art relative overflow-hidden rounded-t-[15px] lg:rounded-t-[23px]">
                  <FeatureArt slug={item.slug} ratio="16 / 7" crop="16x7" sizes={cardSizes} />
                </div>
              }
            />
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
