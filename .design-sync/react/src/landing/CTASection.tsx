import { site, pro } from '@site/data/site';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { t, stagger } from '../lib/site';

export interface CTASectionProps {
  /** Headline, first part, in band ink. */
  titleLead?: string;
  /** Headline, closing part, in gold ink. */
  titleAccent?: string;
  /** Lede under the headline. */
  lede?: string;
  /** Label of the gold install action. */
  ctaLabel?: string;
  /** Href of the install action (the Play Store listing). */
  ctaHref?: string;
  /** Small price line under the action. */
  priceNote?: string;
}

const headline = pro.periods.find((p) => p.id === pro.defaultPeriodId) ?? pro.periods[0];
const closingPrice = pro.trialDays
  ? t('cta.closing_trial', { days: pro.trialDays, price: headline.price })
  : t('cta.closing_standard', { price: headline.price, label: headline.label });

/**
 * The closing action on an ivory band: a centred two-tone headline, one lede,
 * the gold "Get it on Google Play" button and a single price line. No card and
 * no shadow; the action stands on the paper. Use it as the last band of a page,
 * directly above the footer (after PricingSection on the home page).
 */
export function CTASection({
  titleLead = t('cta.heading_p1'),
  titleAccent = t('cta.heading_p2'),
  lede = t('cta.lede', { version: site.minAndroid }),
  ctaLabel = t('hero.cta_play'),
  ctaHref = site.playUrl,
  priceNote = closingPrice,
}: CTASectionProps) {
  return (
    <section id="cta" className="ground ground-cta overflow-hidden bg-band-ivory pt-16 pb-18 lg:pt-30 lg:pb-32">
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <h2 className="r-rise text-headline-m max-w-[16ch] text-balance text-band-ink lg:text-headline" style={stagger(0)}>
            {titleLead} <span className="text-band-gold-ink">{titleAccent}</span>
          </h2>

          <p
            className="r-rise mt-4 max-w-[42ch] text-body-sm text-pretty text-band-ink-muted lg:mt-6 lg:text-body-lg"
            style={stagger(1)}
          >
            {lede}
          </p>

          <div className="r-rise mt-8 lg:mt-10" style={stagger(2)}>
            <Button href={ctaHref} rel="noopener noreferrer" variant="primary" size="lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 3.5v17a1 1 0 0 0 1.52.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z"></path>
              </svg>
              {ctaLabel}
            </Button>
          </div>

          <p className="r-fade mt-5 text-caption tabular-nums text-band-ink-muted lg:mt-6" style={stagger(3)}>
            {priceNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
