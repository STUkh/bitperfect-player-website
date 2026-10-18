import { getLocalizedFeatureName } from '@site/data/navigation';
import { indexOrder } from '@site/components/feature/content';
import { Container } from '../common/Container';
import { FeatureArt, type FeatureArtSlug } from '../feature/FeatureArt';
import { t, withBase, stagger, scope } from '../lib/site';

export interface FeaturesTeaserItem {
  /** Feature slug: picks the card's drawing. */
  slug: FeatureArtSlug;
  /** Card title (the feature's name). */
  title: string;
  /** One short line under the title. */
  desc: string;
  /** Where the card links. */
  href: string;
}

export interface FeaturesTeaserProps {
  /** Section headline, top left. */
  heading?: string;
  /** Label of the "All features" link (top right on desktop, under the grid on phones). */
  allFeaturesLabel?: string;
  /** Target of the "All features" link. */
  allFeaturesHref?: string;
  /** The cards, in order (six on the site, three per row on desktop). */
  items?: FeaturesTeaserItem[];
}

const S = scope('jtkkmgkm');

const arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="all-features-arrow" aria-hidden="true" {...S}>
    <path d="M5 12h14M13 6l6 6-6 6" {...S} />
  </svg>
);

/**
 * Graphite features section: a headline with an "All features" link, then an
 * equal grid of lacquer cards (1 / 2 / 3 columns), each a FeatureArt plate
 * over the feature name and one line, lifting with a gold sheen on hover.
 * Sits on the home page between StatementBand and a full-bleed ImageSlot band.
 */
export function FeaturesTeaser({
  heading = t('features.teaser_heading'),
  allFeaturesLabel = t('features.all_features'),
  allFeaturesHref = withBase('features'),
  items = indexOrder.map((slug) => ({
    slug: slug as FeatureArtSlug,
    title: getLocalizedFeatureName(slug, 'en'),
    desc: t(`features.teaser_desc.${slug}` as never),
    href: withBase(`features/${slug}`),
  })),
}: FeaturesTeaserProps) {
  return (
    <section id="features" className="ground ground-samples scroll-mt-20 bg-surface-base pt-14 pb-15 lg:pt-32 lg:pb-38" {...S}>
      <Container>
        <div className="flex items-end justify-between gap-12 lg:mb-11" {...S}>
          <div className="max-w-[620px]" {...S}>
            <h2 className="r-rise text-headline-sm-m text-balance text-text-primary lg:text-headline-sm" style={stagger(0)} {...S}>
              {heading}
            </h2>
          </div>
          <a
            href={allFeaturesHref}
            className="focus-visible:focus-ring r-fade all-features hidden min-h-11 shrink-0 cursor-pointer items-center gap-2 pb-1.5 text-body-sm font-semibold text-gold hover:text-gold-light active:text-gold-deep lg:inline-flex"
            style={stagger(1)}
            {...S}
          >
            <span {...S}>{allFeaturesLabel}</span>
            {arrow}
          </a>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-6" {...S}>
          {items.map((item, i) => (
            <a
              key={item.slug + i}
              href={item.href}
              className="feature-card r-rise focus-visible:focus-ring group relative flex cursor-pointer flex-col overflow-hidden lacquer-card rounded-card-inner lg:rounded-card"
              style={stagger(i % 3)}
              {...S}
            >
              <div className="art-clip relative overflow-hidden" {...S}>
                <FeatureArt slug={item.slug} className="art w-full" />
              </div>
              <div className="relative flex flex-1 flex-col px-6 pt-3 pb-6 lg:px-7 lg:pt-4 lg:pb-7" {...S}>
                <h3 className="text-title-sm font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-[var(--d-ui)] ease-ui group-hover:text-gold-light lg:text-title" {...S}>
                  {item.title}
                </h3>
                <p className="mt-2 text-body-sm text-pretty text-text-secondary transition-colors duration-[var(--d-ui)] ease-ui group-hover:text-text-primary" {...S}>
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

        <a
          href={allFeaturesHref}
          className="focus-visible:focus-ring all-features mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 py-2 text-body-sm font-semibold text-gold hover:text-gold-light active:text-gold-deep lg:hidden"
          {...S}
        >
          <span {...S}>{allFeaturesLabel}</span>
          {arrow}
        </a>
      </Container>
    </section>
  );
}
