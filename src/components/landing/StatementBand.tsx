import type { CSSProperties } from 'react';
import { clsx as cx } from 'clsx';
import Container from '../common/Container';
import ImageSlot from '../common/ImageSlot';
import './StatementBand.css';

const facts = [
  {
    title: 'Your own files',
    desc: 'FLAC, ALAC, WAV and DSD, from your own storage.',
  },
  {
    title: 'Straight to your DAC',
    desc: 'The app talks to your DAC directly. While it does, other apps cannot play through it.',
  },
  {
    title: 'Your music stays on the phone',
    desc: 'No account needed. No analytics, no ads.',
  },
];

/**
 * Statement band, ivory. The first of the page's two full-bleed light bands.
 *
 * A 7/5 split: the claim on the left, three supporting facts on a hairline
 * stack to the right. No cards, no glass and no shadows in here: separation
 * is hairlines and space (DESIGN.md, "The Ivory Band Has No Shadows").
 *
 * No icons either. Each fact used to carry a Lucide default (a file, a
 * microphone, a shield-check) inside a tinted rounded square. An icon in a
 * soft-cornered tinted tile is the single most recognisable component of a
 * generated product page, and a shield does not mean "it stays on the phone",
 * it means a stock illustrator once drew a shield for "security".
 */
export default function StatementBand() {
  return (
    <section className="ground ground-statement bg-band-ivory pt-14 pb-15 lg:pt-29 lg:pb-30">
      <Container className="lg:px-20">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* 8/4, not 7/5. At 7 columns this headline set five lines of 46px type in
          a 633px track while the fact list beside it ran out 120px early: one
          column too dense, the other stranded. Eight columns takes the headline to
          four lines and gives the facts a measure that wraps to two, so the pair
          finishes level. */}
          <div className="lg:col-span-8">
            <h2
              className="r-rise text-headline-m text-balance text-band-ink lg:text-headline"
              style={{ '--i': '1' } as CSSProperties}
            >
              Many phones change your music on the way out.{' '}
              <span className="text-band-gold-ink">This app sends it to your USB DAC unchanged.</span>
            </h2>
          </div>
          <div className="flex flex-col lg:col-span-4">
            {facts.map((fact, i) => (
              <div
                key={fact.title}
                className={cx([
                  'r-rise border-t border-band-rule py-5 lg:py-[26px]',
                  i === facts.length - 1 && 'border-b border-band-rule',
                ])}
                style={{ '--i': i } as CSSProperties}
              >
                <div>
                  <div className="text-base font-semibold tracking-[-0.01em] text-band-ink lg:text-[17px]">
                    {fact.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-[1.6] text-pretty text-band-ink-muted lg:text-[15px]">
                    {fact.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ImageSlot
          name="home-statement"
          variant="ivory"
          ratio="var(--listening-art-ratio, 16 / 9)"
          ships="2560x1440"
          alt="A phone connected by USB to a DAC and wired headphones."
          className="r-rise mt-10 sm:[--listening-art-ratio:2/1] lg:mt-18"
        />
      </Container>
    </section>
  );
}
