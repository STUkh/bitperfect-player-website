import { pro, site } from '@site/data/site';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { asset } from '../lib/asset';
import { cx, t, withBase, stagger, scope } from '../lib/site';

export interface PricingPlan {
  /** Stable id: names the card's heading (`plan-<id>`). */
  id: string;
  /** Featured = gold lacquer card, gold bullets, gold play-button action. */
  featured: boolean;
  /** Small uppercase label top-left (featured adds a gold dot). */
  label: string;
  /** Pill top-right (gold when featured, neutral otherwise); null hides it. */
  chip: string | null;
  /** Card title under the label row. */
  title: string;
  /** Price without the currency sign. */
  price: number | string;
  /** Unit after the price ("year"). */
  perYear: string;
  /** Monthly equivalent shown in brackets. */
  perMonth: string;
  /** Bullet points; on the featured card the first one is set bold. */
  points: string[];
  /** Action label. */
  cta: string;
  /** Small centred note under the action. */
  note: string;
}

export interface PricingUnlock {
  /** Name of what the subscription covers. */
  name: string;
  /** One-line description under the name. */
  desc: string;
  /** Adds the gold "Check your phone" compatibility link under the name. */
  isAi: boolean;
}

export interface PricingSectionProps {
  /** Section heading. */
  heading?: string;
  /** Lede under the heading (centred from lg). */
  subheading?: string;
  /** The plan cards, side by side from md (two on the site). */
  plans?: PricingPlan[];
  /** Small caption above the covers row. */
  coversTitle?: string;
  /** The hairline-separated "what the subscription covers" columns (three on the site). */
  unlocks?: PricingUnlock[];
  /** Label for the compatibility link on the AI unlock. */
  checkPhoneLabel?: string;
  /** Href of the compatibility link. */
  checkPhoneHref?: string;
  /** Href for every plan's action (the Play Store listing). */
  ctaHref?: string;
  /** The small-print disclosure lines at the foot. */
  disclosures?: string[];
  /** Final legal line as HTML (carries the Terms and Privacy links). */
  governedHtml?: string;
}

const S = scope('rgecj55v');

const plan = pro.periods.find((p) => p.id === pro.defaultPeriodId) ?? pro.periods[0];
const founderPlan = pro.plans.founder;
const standardPlan = pro.plans.standard;
const trialDays = pro.trialDays;
const trialBadge = trialDays ? t('pricing.trial_badge', { days: trialDays }) : null;
const renewNote = trialDays
  ? t('pricing.renew_trial', { days: trialDays, price: founderPlan.price })
  : t('pricing.renew_standard', { label: plan.label, price: founderPlan.price });

const defaultPlans: PricingPlan[] = [
  {
    id: 'founder',
    featured: true,
    label: t('pricing.founder_label'),
    chip: trialBadge,
    title: t('pricing.founder_title'),
    price: founderPlan.price,
    perYear: t('pricing.founder_per_year'),
    perMonth: t('pricing.founder_per_month'),
    points: [
      t('pricing.founder_renewal'),
      t('pricing.founder_expiry'),
      t('pricing.founder_trial'),
      t('pricing.standard_devices'),
    ],
    cta: t('pricing.founder_cta'),
    note: renewNote,
  },
  {
    id: 'standard',
    featured: false,
    label: t('pricing.standard_label'),
    chip: t('pricing.standard_from'),
    title: t('pricing.standard_title'),
    price: standardPlan.price,
    perYear: t('pricing.standard_per_year'),
    perMonth: t('pricing.standard_per_month'),
    points: [
      t('pricing.standard_renewal'),
      t('pricing.standard_cancel_note'),
      t('pricing.standard_devices'),
    ],
    cta: t('pricing.standard_cta'),
    note: t('pricing.disclosure_cancel'),
  },
];

const defaultUnlocks: PricingUnlock[] = [
  { name: t('pricing.unlock_dac_name'), desc: t('pricing.unlock_dac_desc'), isAi: false },
  { name: t('pricing.unlock_ai_name'), desc: t('pricing.unlock_ai_desc'), isAi: true },
  { name: t('pricing.unlock_eq_name'), desc: t('pricing.unlock_eq_desc'), isAi: false },
];

const defaultDisclosures = [
  t('pricing.disclosure_usd'),
  t('pricing.disclosure_inapp'),
  t('pricing.disclosure_devices'),
  t('pricing.disclosure_trial'),
  t('pricing.disclosure_cancel'),
];

const defaultGoverned = t('pricing.disclosure_governed', {
  termsLink: `<a href="${withBase('terms')}" class="legal-link focus-visible:focus-ring">${t('nav.terms')}</a>`,
  privacyLink: `<a href="${withBase('privacy')}" class="legal-link focus-visible:focus-ring">${t('nav.privacy')}</a>`,
});

const CHECK =
  'M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z';

/**
 * The pricing band on graphite: heading and lede, then two lacquered plan
 * cards side by side (gold Founder card beside a neutral Standard card, rows
 * aligned on a subgrid), a hairline row of what the subscription covers, and
 * the small-print disclosures. Sits on the home page after the feature bands,
 * before the closing CTASection.
 */
export function PricingSection({
  heading = t('pricing.heading'),
  subheading = t('pricing.subheading'),
  plans = defaultPlans,
  coversTitle = t('pricing.covers_title'),
  unlocks = defaultUnlocks,
  checkPhoneLabel = t('pricing.check_phone'),
  checkPhoneHref = withBase('features#compatibility'),
  ctaHref = site.playUrl,
  disclosures = defaultDisclosures,
  governedHtml = defaultGoverned,
}: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 overflow-hidden bg-surface-base pt-14 pb-15 lg:pt-29 lg:pb-30"
      {...S}
    >
      <div className="pricing-backdrop pointer-events-none absolute inset-0 z-0" aria-hidden="true" {...S}>
        <div className="pricing-backdrop-frame" {...S}>
          <img
            src={asset('img/pricing-backdrop.webp')}
            srcSet={`${asset('img/pricing-backdrop-960.webp')} 960w, ${asset('img/pricing-backdrop.webp')} 1920w`}
            sizes="100vw"
            width={1920}
            height={1080}
            alt=""
            decoding="async"
            {...({ fetchpriority: 'low' } as object)}
            {...S}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overhead-wash z-[1]" aria-hidden="true" {...S} />
      <div className="pricing-stage pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" {...S} />

      <Container className="relative z-[2]">
        <div className="lg:mx-auto lg:mb-13 lg:max-w-[760px] lg:text-center" {...S}>
          <h2 className="r-rise text-section-sm text-balance text-text-primary lg:text-headline-sm" style={stagger(0)} {...S}>
            {heading}
          </h2>
          <p
            className="r-rise mt-3.5 text-base leading-[1.6] text-pretty text-text-secondary lg:mx-auto lg:mt-5 lg:max-w-[56ch] lg:text-body-lg"
            style={stagger(1)}
            {...S}
          >
            {subheading}
          </p>
        </div>

        <div
          className="r-rise mx-auto mt-[26px] grid max-w-[920px] grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:mt-0 lg:gap-6"
          style={stagger(2)}
          {...S}
        >
          {plans.map((p) => (
            <article
              key={p.id}
              className={cx(
                'plan relative isolate grid grid-cols-1 overflow-hidden rounded-card-sm p-6 md:row-span-4 md:grid-rows-subgrid lg:p-8',
                p.featured ? 'plan-founder' : 'plan-standard',
              )}
              aria-labelledby={`plan-${p.id}`}
              {...S}
            >
              <span className="plan-sheen" aria-hidden="true" {...S} />

              <header {...S}>
                <div className="flex items-center justify-between gap-3" {...S}>
                  <span
                    className={cx(
                      'inline-flex items-center gap-2 text-micro leading-none font-semibold tracking-[0.08em] uppercase',
                      p.featured ? 'text-gold' : 'text-text-tertiary',
                    )}
                    {...S}
                  >
                    {p.featured && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" {...S} />}
                    {p.label}
                  </span>
                  {p.chip && (
                    <span className={cx('plan-chip', p.featured ? 'plan-chip-gold' : 'plan-chip-neutral')} {...S}>
                      {p.chip}
                    </span>
                  )}
                </div>
                <h3 id={`plan-${p.id}`} className="mt-4 text-title-sm font-bold text-text-primary lg:text-title" {...S}>
                  {p.title}
                </h3>
              </header>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-2 border-b border-white/[0.08] pb-5" {...S}>
                <span className="plan-price tabular-nums" {...S}>
                  <span className={cx('plan-currency', p.featured ? 'text-gold-light' : 'text-text-tertiary')} {...S}>$</span>
                  {p.price}
                </span>
                <span className="text-small font-medium text-text-secondary" {...S}>/ {p.perYear}</span>
                <span className="text-caption tabular-nums text-text-tertiary" {...S}>({p.perMonth})</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-small text-text-secondary" role="list" {...S}>
                {p.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5" {...S}>
                    <svg
                      className={cx('mt-[3px] h-4 w-4 shrink-0', p.featured ? 'text-gold' : 'text-text-tertiary')}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      {...S}
                    >
                      <path fillRule="evenodd" d={CHECK} clipRule="evenodd" {...S} />
                    </svg>
                    <span className={cx('leading-snug', p.featured && i === 0 && 'font-semibold text-text-primary')} {...S}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 self-start" {...S}>
                <Button
                  href={ctaHref}
                  rel="noopener noreferrer"
                  variant={p.featured ? 'primary' : 'secondary'}
                  size="md"
                  className="flex w-full"
                  {...S}
                >
                  {p.featured && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...S}>
                      <path d="M5 3.5v17a1 1 0 0 0 1.52.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z" {...S} />
                    </svg>
                  )}
                  <span {...S}>{p.cta}</span>
                </Button>
                <p className="mt-3 text-center text-micro font-medium leading-[1.5] text-pretty tabular-nums text-text-tertiary" {...S}>
                  {p.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className="r-rise mt-[34px] border-t border-border-subtle pt-6 lg:mx-auto lg:mt-18 lg:max-w-[1040px] lg:pt-[34px]"
          style={stagger(3)}
          {...S}
        >
          <span className="block text-caption text-text-tertiary lg:mb-[26px]" {...S}>
            {coversTitle}
          </span>
          <div className="mt-[18px] lg:mt-0 lg:grid lg:grid-cols-3" {...S}>
            {unlocks.map((unlock, i) => (
              <div
                key={i}
                className={cx(
                  i > 0 && 'mt-[18px] border-t border-border-subtle pt-[18px] lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[34px]',
                  i < 2 && 'lg:pr-[34px]',
                )}
                {...S}
              >
                <span className="block text-body-sm font-semibold tracking-[-0.01em] text-text-primary lg:text-body-lg" {...S}>
                  {unlock.name}
                </span>
                {unlock.isAi && (
                  <a
                    href={checkPhoneHref}
                    className="focus-visible:focus-ring mt-2 inline-flex min-h-10 cursor-pointer items-center gap-1.5 py-1.5 text-caption text-gold transition-colors duration-[var(--d-ui)] ease-ui hover:text-gold-light active:text-gold-deep"
                    {...S}
                  >
                    {checkPhoneLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...S}>
                      <path d="M5 12h14m0 0-6-6m6 6-6 6" {...S} />
                    </svg>
                  </a>
                )}
                <p className="mt-2 text-caption leading-[1.6] text-pretty text-text-tertiary lg:mt-2.5 lg:text-small lg:leading-[1.62]" {...S}>
                  {unlock.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-1.5 lg:mx-auto lg:mt-9 lg:max-w-[1040px] lg:flex-row lg:flex-wrap lg:gap-x-[22px]"
          {...S}
        >
          {disclosures.map((line, i) => (
            <span key={i} className="text-xs text-text-tertiary" {...S}>{line}</span>
          ))}
          <span className="text-xs text-text-tertiary" {...S} dangerouslySetInnerHTML={{ __html: governedHtml }} />
        </div>
      </Container>
    </section>
  );
}
