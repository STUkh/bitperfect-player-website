import type { CSSProperties } from 'react';
import Container from '../common/Container';
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
    desc: "Your DAC, driven at the file's own rate. Up to 768 kHz and DSD512.",
  },
  {
    slug: 'ai-enhancer',
    desc: "Rebuilds what compression discarded, on your phone's own hardware.",
  },
  { slug: 'eq', desc: 'Seven filter shapes, one tap back to bit-perfect.' },
  {
    slug: 'library',
    desc: 'Albums to folders, indexed on device. Nothing travels.',
  },
  { slug: 'casting', desc: 'Send to any UPnP renderer, or become one.' },
  {
    slug: 'dsp',
    desc: 'Crossfeed, ReplayGain, true-peak guard. All optional.',
  },
];

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
    <section id="features" className="relative scroll-mt-20 bg-surface-base pt-14 pb-15 lg:pt-36 lg:pb-38">
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
              Six things it does, each worth a page of its own
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
        <div className="mt-7 grid grid-cols-1 lg:mt-0 lg:grid-cols-2 lg:gap-x-[72px]">
          {items.map((item, i) => (
            <a
              key={item.slug}
              href={withBase(`features/${item.slug}`)}
              className="focus-visible:focus-ring r-rise features-teaser-row group flex cursor-pointer items-start justify-between gap-6 border-t border-border-subtle py-6 hover:border-glass-border-hover lg:gap-[22px] lg:py-8"
              style={{ '--i': i % 2 } as CSSProperties}
            >
              <div>
                {/* No mark. See the note in src/pages/features/index.astro. */}
                <div className="text-title-sm tracking-[-0.01em] text-text-primary lg:text-title">
                  {featureName(item.slug)}
                </div>
                <p className="mt-2 max-w-[31ch] text-body-sm text-pretty text-text-secondary transition-colors duration-[var(--d-ui)] ease-ui group-hover:text-text-primary lg:mt-2.5">
                  {item.desc}
                </p>
              </div>
              {/*
              The affordance. These six rows are the most valuable destinations on
              the home page and they carried NO cue that they were destinations: a
              title, a paragraph, a hairline, and nothing else until the pointer
              happened to land on one. A visitor read them as bullets and left
              having never seen the pages the heading promises. Nobody hovers on a
              touchscreen, so a hover-only affordance is no affordance at all.

              The arrow is the same mark the two `All features` links already use,
              at rest in the quiet ink and answering the pointer with the section's
              own gold-and-3px idiom, so it reads as one vocabulary rather than a
              seventh widget.
            */}
              <FeatureMark
                name="arrow-right"
                size={18}
                className="features-teaser-row-arrow mt-1 shrink-0 text-text-tertiary lg:mt-1.5"
              />
            </a>
          ))}{' '}
          <a
            href={allFeaturesHref}
            className="focus-visible:focus-ring features-teaser-all inline-flex cursor-pointer items-center gap-2 border-t border-border-subtle pt-6 text-[15px] font-semibold text-gold hover:text-gold-light active:text-gold-deep lg:hidden"
          >
            <span>All features</span> <FeatureMark name="arrow-right" size={18} className="features-teaser-all-arrow" />
          </a>
        </div>
      </Container>
    </section>
  );
}
