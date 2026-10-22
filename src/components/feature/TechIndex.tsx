import { clsx as cx } from 'clsx';
import Container from '../common/Container';
import FeatureMark from './FeatureMark';
import { technicalFeatures, technicalCategories } from '../../data/technical-features';
import type { ClassProps } from '../_lib/class-props';
import './TechIndex.css';

/**
 * The capability index on `/features/catalog`: every entry in
 * `src/data/technical-features.ts`, grouped into its six categories (it takes no
 * content props).
 *
 * One section per category, in `technicalCategories` order, each with the
 * category id as its anchor (`#engine`, `#dsp`, `#hardware`, `#ai`, `#streaming`,
 * `#media`). From `lg` a section is two columns: on the left, sticky under the
 * header, a mono label (the group number in gold from a CSS counter, a short gold
 * hairline, then `5 entries` in tertiary), the category name (`h2`) and
 * its description; on the right a hairline-ruled list of rows. Below `lg` the
 * label block sits above the list.
 *
 * Each row is a text link to the capability's own page
 * (`<base>features/catalog/<id>`): the catalogue number (01 to 27) in tertiary
 * mono, the title (gold on hover), the summary under it, and a trailing arrow that
 * nudges right on hover (held still under reduced motion). It is a link row, not
 * a button, so the arrow is allowed (DESIGN.md, rule 6). On the graphite ground
 * only: no ivory variant.
 */
export interface TechIndexProps extends ClassProps {
  /** Prefix for the row links, the site's base path with a trailing slash. Default `/`. Pages pass `withBase('/')`. */
  base?: string;
  /** The wrapper's anchor id. Default `all-capabilities`. */
  id?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** The grouped capability index; see `TechIndexProps`. */
export default function TechIndex({ base = '/', id = 'all-capabilities', className }: TechIndexProps) {
  const prefix = base.endsWith('/') ? base : `${base}/`;

  return (
    <div id={id} className={cx(['tech-index bg-surface-base', className])}>
      {technicalCategories.map((cat, ci) => {
        const entries = technicalFeatures
          .filter((f) => f.category === cat.id)
          .sort((a, b) => a.number - b.number);
        if (entries.length === 0) return null;
        return (
          <section
            key={cat.id}
            id={cat.id}
            aria-labelledby={`tech-index-${cat.id}`}
            className={cx(['tech-index-group scroll-mt-20 py-12 lg:scroll-mt-24 lg:py-20', ci > 0 && 'border-t border-border-subtle'])}
          >
            <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="tech-index-label mono-spec flex items-baseline gap-3 text-micro font-medium tracking-[1.2px] uppercase tabular-nums lg:tracking-[1.5px]">
                    <span className="tech-index-num text-gold" aria-hidden="true" />
                    <span className="tech-index-rule" aria-hidden="true" />
                    <span className="text-text-tertiary">{`${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`}</span>
                  </p>
                  <h2
                    id={`tech-index-${cat.id}`}
                    className="mt-3 text-section-m text-balance text-text-primary lg:mt-4 lg:text-section"
                  >
                    {cat.name}
                  </h2>
                  <p className="mt-3 max-w-[38ch] text-body text-pretty text-text-secondary lg:mt-4">{cat.description}</p>
                </div>
              </div>

              <ul className="lg:col-span-8" role="list">
                {entries.map((feat, i) => (
                  <li key={feat.id} className={cx(['border-t border-border-subtle', i === entries.length - 1 && 'border-b'])}>
                    <a
                      href={`${prefix}features/catalog/${feat.id}/`}
                      className="tech-index-row grid cursor-pointer grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 py-5 focus-visible:focus-ring lg:grid-cols-[3rem_1fr_auto] lg:gap-x-5 lg:py-6"
                    >
                      <span className="mono-spec text-small tabular-nums text-text-tertiary">{pad(feat.number)}</span>
                      <span className="flex min-w-0 flex-col gap-1.5">
                        <span className="tech-index-title text-body-lg font-semibold tracking-[-0.01em] text-text-primary lg:text-title">
                          {feat.title}
                        </span>
                        <span className="text-small text-pretty text-text-secondary lg:text-body">{feat.summary}</span>
                      </span>
                      <FeatureMark
                        name="arrow-right"
                        size={16}
                        className="tech-index-arrow self-center text-text-tertiary"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
