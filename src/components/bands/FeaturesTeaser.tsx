import type { CSSProperties } from 'react';
import Container from '../primitives/Container';
import FeatureArt from '../primitives/FeatureArt';
import featureArtY from '../../data/feature-art.json';
import FeatureLinkCard from '../sections/FeatureLinkCard';
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
export interface FeatureTeaserItem {
  slug: string;
  desc: string;
}

export interface FeaturesTeaserProps extends FlowProps {
  title?: string;
  catalogLabel?: string;
  items?: FeatureTeaserItem[];
}

const defaultItems: FeatureTeaserItem[] = [
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

const allFeaturesHref = withBase('features/catalog');

export default function FeaturesTeaser({
  backgroundVariant,
  title = 'Things it does',
  catalogLabel = 'All features',
  items: customItems,
}: FeaturesTeaserProps = {}) {
  const activeItems = customItems && customItems.length > 0 ? customItems : defaultItems;
  return (
    <section id="features" className={`${backgroundVariant ? 'flow-surface ' : ''}ground features-ground relative scroll-mt-20 overflow-hidden bg-surface-base section-spacious`}>
      {backgroundVariant && <FlowBackdrop variant={backgroundVariant} />}
      <Container className="lg:px-20">
        <div className="flex items-end justify-between gap-12 lg:mb-15">
          <div className="max-w-[620px]">
            <h2
              className="r-rise text-headline-sm-m text-balance text-text-primary lg:text-headline-sm"
              style={{ '--i': '0' } as CSSProperties}
            >
              {title}
            </h2>
          </div>
          <a
            href={allFeaturesHref}
            className="focus-visible:focus-ring r-fade features-teaser-all hidden shrink-0 cursor-pointer items-center pb-1.5 text-[15px] font-semibold text-gold hover:underline active:text-gold-deep lg:inline-flex"
            style={{ '--i': '1' } as CSSProperties}
          >
            <span>{catalogLabel}</span>
          </a>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-6">
          {activeItems.map((item, i) => (
            <FeatureLinkCard
              key={item.slug}
              href={withBase(`features/${item.slug}`)}
              title={featureName(item.slug)}
              body={item.desc}
              className="lacquer lacquer-lift features-card"
              style={{ '--i': i % 3, '--art-y': `${Math.round((artY[item.slug] ?? 0.5) * 100)}%` } as CSSProperties}
              art={
                <div className="features-card-art relative overflow-hidden rounded-t-[15px] lg:rounded-t-[23px]">
                  <FeatureArt slug={item.slug} ratio="16 / 7" crop="16x7" sizes={cardSizes} />
                </div>
              }
            />
          ))}
          <a
            href={allFeaturesHref}
            className="focus-visible:focus-ring features-teaser-all inline-flex cursor-pointer items-center pt-1 text-[15px] font-semibold text-gold hover:underline active:text-gold-deep lg:hidden"
          >
            <span>{catalogLabel}</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
