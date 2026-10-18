import { useState } from 'react';
import {
  technicalFeatures,
  technicalCategories,
  type TechnicalFeature,
  type CategoryInfo,
} from '@site/data/technical-features';
import { Container } from '../common/Container';
import { cx, scope } from '../lib/site';

export interface TechnicalCatalogProps {
  /** Section id (anchor target). The catalog page passes "all-capabilities". */
  id?: string;
  /** Extra classes on the section. */
  className?: string;
  /** The capability cards (27 on the site). */
  features?: TechnicalFeature[];
  /** The filter tabs after "All", one per category; counts are derived from `features`. */
  categories?: CategoryInfo[];
  /** Which tab starts active: "all" or a category id. */
  defaultFilter?: string;
  /** Label of the first tab (the count is appended). */
  allLabel?: string;
  /** Bold lead-in of each card's benefit line. */
  benefitLabel?: string;
  /** Link label on cards that carry an SDK url. */
  sdkLabel?: string;
}

const S = scope('aqdjk73k');

/**
 * The full technical capability catalog: a row of editorial underline tabs
 * (All plus one per category, each with its count) over a 1/2/3-column grid of
 * spec cards, each with category label, title, description, a hairline benefit
 * line and an optional SDK link. Clicking a tab filters the grid. Goes on the
 * catalog page below its intro band.
 */
export function TechnicalCatalog({
  id = 'technical-catalogue',
  className,
  features = technicalFeatures,
  categories = technicalCategories,
  defaultFilter = 'all',
  allLabel = 'All Capabilities',
  benefitLabel = 'Benefit:',
  sdkLabel = 'View Public SDK on GitHub',
}: TechnicalCatalogProps) {
  const [filter, setFilter] = useState(defaultFilter);

  const tab = (value: string, label: string) => {
    const active = filter === value;
    return (
      <button
        key={value}
        type="button"
        data-filter={value}
        onClick={() => setFilter(value)}
        className={cx(
          'catalog-filter-btn',
          active && 'active-filter',
          'cursor-pointer inline-flex items-center min-h-[44px] border-b-2',
          active ? 'border-gold' : 'border-transparent',
          'px-3 sm:px-4 py-2 text-small font-medium',
          active ? 'text-gold' : 'text-text-secondary',
          'transition-colors duration-[var(--d-ui)]',
          value !== 'all' && 'hover:text-text-primary',
          'focus-visible:focus-ring',
        )}
        {...S}
      >
        {label}
      </button>
    );
  };

  return (
    <section id={id} className={cx('relative scroll-mt-20 py-12 lg:py-16', className)} {...S}>
      <Container>
        <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-border-subtle pb-4" id="catalog-filter-bar" {...S}>
          {tab('all', `${allLabel} (${features.length})`)}
          {categories.map((cat) => tab(cat.id, `${cat.name} (${features.filter((f) => f.category === cat.id).length})`))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3" id="features-catalog-grid" {...S}>
          {features.map((feat) => (
            <article
              key={feat.id}
              data-category={feat.category}
              id={`feature-${feat.id}`}
              className="catalog-card flex flex-col justify-between rounded-card-sm border border-border-subtle bg-surface-raised/80 p-5 transition-all duration-[var(--d-ui)] hover:border-border-gold/40 hover:bg-surface-raised"
              style={filter === 'all' || feat.category === filter ? undefined : { display: 'none' }}
              {...S}
            >
              <div {...S}>
                <span className="mono-spec text-micro font-semibold uppercase tracking-wider text-gold/90" {...S}>
                  {feat.categoryLabel}
                </span>

                <h3 className="mt-2 text-body-lg font-bold text-text-primary" {...S}>
                  {feat.title}
                </h3>

                <p className="mt-2 text-small leading-relaxed text-text-secondary" {...S}>
                  {feat.description}
                </p>

                <div className="mt-3.5 border-t border-border-subtle/50 pt-2.5" {...S}>
                  <p className="text-caption text-text-tertiary" {...S}>
                    <strong className="font-semibold text-text-secondary" {...S}>{benefitLabel}</strong> {feat.audiophileBenefit}
                  </p>
                </div>
              </div>

              {feat.sdkUrl && (
                <div className="mt-4 border-t border-border-subtle/50 pt-2.5" {...S}>
                  <a
                    href={feat.sdkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded text-caption font-medium text-gold hover:underline focus-visible:focus-ring"
                    {...S}
                  >
                    <span {...S}>{sdkLabel}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...S}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" {...S}></path>
                      <polyline points="15 3 21 3 21 9" {...S}></polyline>
                      <line x1="10" y1="14" x2="21" y2="3" {...S}></line>
                    </svg>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
