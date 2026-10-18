import { Container } from '../common/Container';
import { cx, t, stagger } from '../lib/site';

export interface StatementFact {
  title: string;
  desc: string;
}

export interface StatementBandProps {
  /** Gold-ink eyebrow above the headline. */
  eyebrow?: string;
  /** Headline, first part, in band ink. */
  titleLead?: string;
  /** Headline, closing part, in gold ink. */
  titleAccent?: string;
  /** The hairline-separated facts in the right column (three on the site). */
  facts?: StatementFact[];
}

/**
 * Ivory statement band: an 8/4 split with the claim on the left and supporting
 * facts on a hairline stack to the right. No cards, shadows or icons: inside a
 * light band separation is hairlines and space. Carries the `ground-statement`
 * texture.
 */
export function StatementBand({
  eyebrow = t('statement.eyebrow'),
  titleLead = t('statement.title_p1'),
  titleAccent = t('statement.title_p2'),
  facts = [
    { title: t('statement.fact1_title'), desc: t('statement.fact1_desc') },
    { title: t('statement.fact2_title'), desc: t('statement.fact2_desc') },
    { title: t('statement.fact3_title'), desc: t('statement.fact3_desc') },
  ],
}: StatementBandProps) {
  return (
    <section className="ground ground-statement bg-band-ivory pt-14 pb-15 lg:pt-29 lg:pb-30">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <span className="text-eyebrow r-fade block text-band-gold-ink">{eyebrow}</span>
            <h2
              className="r-rise text-headline-m mt-4 text-balance text-band-ink lg:mt-[22px] lg:text-headline"
              style={stagger(1)}
            >
              {titleLead} <span className="text-band-gold-ink">{titleAccent}</span>
            </h2>
          </div>
          <div className="flex flex-col lg:col-span-4">
            {facts.map((fact, i) => (
              <div
                key={i}
                className={cx(
                  'r-rise border-t border-band-rule py-5 lg:py-[26px]',
                  i === facts.length - 1 && 'border-b border-band-rule',
                )}
                style={stagger(i)}
              >
                <div>
                  <div className="text-base font-semibold tracking-[-0.01em] text-band-ink lg:text-[17px]">{fact.title}</div>
                  <p className="mt-1.5 text-sm leading-[1.6] text-pretty text-band-ink-muted lg:text-[15px]">{fact.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
