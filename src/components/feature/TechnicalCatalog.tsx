import { clsx as cx } from 'clsx';
import Container from '../common/Container';
import { technicalFeatures, technicalCategories } from '../../data/technical-features';
import type { ClassProps } from '../class-props';
import { useBehaviour } from '../behaviour';
import { setupCatalogFilter } from './TechnicalCatalog.client';
import './TechnicalCatalog.css';

export interface TechnicalCatalogProps extends ClassProps {
  /** The section's anchor. */
  id?: string;
}

/**
 * The full technical catalogue: editorial filter tabs over a grid of capability
 * cards, one per entry in `technicalFeatures`. The tabs' behaviour is
 * `setupCatalogFilter`; on the site `TechnicalCatalog.astro` mounts it, in React
 * `useBehaviour` does.
 *
 * Labels that mix text and values are one template string, not `{a} ({b})`:
 * React writes adjacent text as separate DOM text nodes, and the browser
 * positions their glyphs a sub-pixel differently from the single node the page
 * has always rendered.
 */
export default function TechnicalCatalog(props: TechnicalCatalogProps) {
  const { id = 'technical-catalogue', className } = props;
  const ref = useBehaviour<HTMLElement>(setupCatalogFilter);

  return (
    <section
      ref={ref}
      id={id}
      className={cx(['relative scroll-mt-20 py-12 lg:py-16', className])}
      data-technical-catalog=""
    >
      <Container>
        {/* Filter Navigation - Editorial Tabs */}
        <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-border-subtle pb-4" id="catalog-filter-bar">
          <button
            type="button"
            data-filter="all"
            className="catalog-filter-btn active-filter cursor-pointer inline-flex items-center min-h-[44px] border-b-2 border-gold px-3 sm:px-4 py-2 text-small font-medium text-gold focus-visible:focus-ring"
          >
            {`All Capabilities (${technicalFeatures.length})`}
          </button>{' '}
          {technicalCategories.map((cat) => {
            const count = technicalFeatures.filter((f) => f.category === cat.id).length;
            return (
              <button
                type="button"
                data-filter={cat.id}
                className="catalog-filter-btn cursor-pointer inline-flex items-center min-h-[44px] border-b-2 border-transparent px-3 sm:px-4 py-2 text-small font-medium text-text-secondary hover:text-text-primary focus-visible:focus-ring"
              >
                {`${cat.name} (${count})`}
              </button>
            );
          })}
        </div>
        {/* Feature Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3" id="features-catalog-grid">
          {technicalFeatures.map((feat) => (
            <article
              data-category={feat.category}
              id={`feature-${feat.id}`}
              className="catalog-card lacquer lacquer-lift flex flex-col justify-between rounded-card-sm p-5 lg:rounded-card lg:p-6"
            >
              <div>
                {/* Top Category Label */}
                <span className="mono-spec text-micro font-semibold uppercase tracking-wider text-gold/90">
                  {feat.categoryLabel}
                </span>
                {/* Title */}
                <h2 className="mt-2 text-body-lg font-bold text-text-primary">{feat.title}</h2>
                {/* Concise Description */}
                <p className="mt-2 text-small leading-relaxed text-text-secondary">{feat.description}</p>
                {/* Clean Benefit Line — Simple Hairline, No Clutter */}
                <div className="mt-3.5 border-t border-border-subtle/50 pt-2.5">
                  <p className="text-caption text-text-tertiary">
                    <strong className="font-semibold text-text-secondary">Benefit:</strong>
                    {` ${feat.audiophileBenefit}`}
                  </p>
                </div>
              </div>
              {/* Optional Public SDK Link */}
              {feat.sdkUrl && (
                <div className="mt-4 border-t border-border-subtle/50 pt-2.5">
                  <a
                    href={feat.sdkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded text-caption font-medium text-gold hover:underline focus-visible:focus-ring"
                  >
                    <span>View Public SDK on GitHub</span>{' '}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
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
