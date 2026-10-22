import FlowBackdrop, { type FlowProps } from './FlowBackdrop';
import { clsx as cx } from 'clsx';
import Button from '../primitives/Button';
import Container from '../primitives/Container';
import PlayCta from '../primitives/PlayCta';
import SectionHeading from '../sections/SectionHeading';
import { reveal as stagger } from '../sections/bands';
import Picture from '../primitives/Picture';
import { CHECK_SOLID_PATH, LINK_ARROW_PATH } from '../primitives/glyphs';
import { pro, site } from '../../data/site';
import { useTranslations } from '../../i18n/utils';
import { withBase } from '../../utils/nav';
import './PricingSection.css';

/*
  Every string is a key in src/i18n/locales/en/landing.ts and every figure comes from
  `pro.plans`, never typed here. The trial is conditional copy: with `pro.trialDays`
  null the chip and the trial sentence disappear instead of leaving a dangling claim,
  and eligibility is the store's call, so the copy says "new customers" and never "you".
*/
const t = useTranslations();
const founder = pro.plans.founder;
const standard = pro.plans.standard;
const trialDays = pro.trialDays;
const trialBadge = trialDays ? t('pricing.trial_badge', { days: trialDays }) : null;

const plans = [
  {
    id: 'founder',
    featured: true,
    label: t('pricing.founder_label'),
    chip: trialBadge,
    title: t('pricing.founder_title'),
    price: founder.price,
    perYear: t('pricing.founder_per_year'),
    perMonth: t('pricing.founder_per_month'),
    points: [
      t('pricing.founder_renewal'),
      t('pricing.founder_expiry'),
      t('pricing.founder_trial', { days: trialDays ?? 14 }),
      t('pricing.standard_devices'),
    ],
    cta: t('pricing.founder_cta'),
    note: trialDays
      ? t('pricing.renew_trial', { days: trialDays, price: founder.price })
      : t('pricing.disclosure_cancel'),
  },
  {
    id: 'standard',
    featured: false,
    label: t('pricing.standard_label'),
    chip: t('pricing.standard_from'),
    title: t('pricing.standard_title'),
    price: standard.price,
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

const unlocks = [
  { name: t('pricing.unlock_dac_name'), desc: t('pricing.unlock_dac_desc'), isAi: false },
  { name: t('pricing.unlock_ai_name'), desc: t('pricing.unlock_ai_desc'), isAi: true },
  { name: t('pricing.unlock_eq_name'), desc: t('pricing.unlock_eq_desc'), isAi: false },
];

const disclosures = [
  t('pricing.disclosure_usd'),
  t('pricing.disclosure_inapp'),
  t('pricing.disclosure_devices'),
  t('pricing.disclosure_trial'),
  t('pricing.disclosure_cancel'),
];

const governed = t('pricing.disclosure_governed', {
  termsLink: `<a href="${withBase('terms')}" class="pricing-legal-link focus-visible:focus-ring">${t('nav.terms')}</a>`,
  privacyLink: `<a href="${withBase('privacy')}" class="pricing-legal-link focus-visible:focus-ring">${t('nav.privacy')}</a>`,
});

/**
 * Pricing band. No props; prices and copy are the site's own.
 *
 * Fifth band of the landing page, after PrivacyBand and before CTASection. Graphite
 * surface (`bg-surface-base`, anchor `#pricing`) over the `pricing-backdrop`
 * photograph with an overhead wash and a stage glow.
 *
 * Content: heading and lede, then TWO lacquered plan cards side by side on a subgrid
 * so their rows align: the Founder plan on sale now (gold, the only gold card; install
 * key-cap `PlayCta`) beside the Standard plan it becomes on 1 June 2027 (graphite;
 * secondary `Button` to Google Play). Below: a hairline row of three things the
 * subscription covers (the AI entry links to the compatibility check), then small-print
 * disclosures with Terms and Privacy links.
 *
 * Data: every figure comes from `pro.plans`, `pro.trialDays` in `src/data/site.ts`;
 * every string is a `pricing.*` key in `src/i18n/locales/en/landing.ts` via
 * `useTranslations()`. With `pro.trialDays` null the trial chip and sentence vanish.
 */
export default function PricingSection({ backgroundVariant }: FlowProps) {
  return (
    <section
      id="pricing"
      className={`${backgroundVariant ? "flow-surface " : ""}relative scroll-mt-20 overflow-hidden bg-surface-base section-default`}
    >
      {backgroundVariant ? <FlowBackdrop variant={backgroundVariant} /> : (<>
      <div className="pricing-backdrop pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="pricing-backdrop-frame">
          <Picture
            src="img/pricing-backdrop.webp"
            sizes="100vw"
            art={[{ media: '(max-width: 767px) and (orientation: portrait)', crop: 'square', sizes: '100vh' }]}
            position="50% 80%"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 overhead-wash z-[1]" aria-hidden="true"></div>
      <div className="pricing-stage pointer-events-none absolute inset-0 z-[1]" aria-hidden="true"></div>
      </>)}

      <Container className="relative z-[2]">
        <SectionHeading
          tone="graphite"
          className="lg:mx-auto lg:mb-13 lg:max-w-column lg:text-center"
          title={t('pricing.heading')}
          titleClassName="text-section-sm lg:text-headline-sm"
          lede={t('pricing.subheading')}
          ledeClassName="mt-3.5 text-base leading-[1.6] text-pretty lg:mx-auto lg:mt-5 lg:max-w-measure-lede lg:text-body-lg"
          reveal={0}
        />

        <div
          className="r-rise mx-auto mt-[26px] grid max-w-[920px] grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:mt-0 lg:gap-6"
          style={stagger(2)}
        >
          {plans.map((p) => (
            <article
              key={p.id}
              className={cx(
                'plan relative isolate grid grid-cols-1 overflow-hidden rounded-card-sm p-6 md:row-span-4 md:grid-rows-subgrid lg:p-8',
                p.featured ? 'plan-founder' : 'plan-standard',
              )}
              aria-labelledby={`plan-${p.id}`}
            >
              <span className="plan-sheen" aria-hidden="true"></span>

              <header>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cx(
                      'inline-flex items-center gap-2 text-micro leading-none font-semibold tracking-tag uppercase',
                      p.featured ? 'text-gold' : 'text-text-tertiary',
                    )}
                  >
                    {p.featured && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true"></span>}
                    {p.label}
                  </span>
                  {p.chip && (
                    <span className={cx('plan-chip', p.featured ? 'plan-chip-gold' : 'plan-chip-neutral')}>
                      {p.chip}
                    </span>
                  )}
                </div>
                <h3 id={`plan-${p.id}`} className="mt-4 text-title-sm font-bold text-text-primary lg:text-title">
                  {p.title}
                </h3>
              </header>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-2 border-b border-white/[0.08] pb-5">
                <span className="plan-price tabular-nums">
                  <span className={cx('plan-currency', p.featured ? 'text-gold-light' : 'text-text-tertiary')}>$</span>
                  {p.price}
                </span>
                <span className="text-small font-medium text-text-secondary">/ {p.perYear}</span>
                <span className="text-caption tabular-nums text-text-tertiary">({p.perMonth})</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-small text-text-secondary" role="list">
                {p.points.map((point, i) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <svg
                      className={cx('mt-[3px] h-4 w-4 shrink-0', p.featured ? 'text-gold' : 'text-text-tertiary')}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d={CHECK_SOLID_PATH} clipRule="evenodd" />
                    </svg>
                    <span className={cx('leading-snug', p.featured && i === 0 && 'font-semibold text-text-primary')}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 self-start">
                {p.featured ? (
                  <PlayCta label={p.cta} size="md" className="flex w-full" />
                ) : (
                  <Button
                    href={site.playUrl}
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    className="flex w-full"
                  >
                    <span>{p.cta}</span>
                  </Button>
                )}
                <p className="mt-3 text-center text-micro font-medium leading-[1.5] text-pretty tabular-nums text-text-tertiary">
                  {p.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className="r-rise mt-[34px] border-t border-border-subtle pt-6 lg:mx-auto lg:mt-18 lg:max-w-pricing lg:pt-[34px]"
          style={stagger(3)}
        >
          <span className="block text-caption text-text-tertiary lg:mb-[26px] lg:text-center">{t('pricing.covers_title')}</span>
          <div className="mt-[18px] lg:mt-0 lg:grid lg:grid-cols-3">
            {unlocks.map((unlock, i) => (
              <div
                key={unlock.name}
                className={cx(
                  'lg:px-[34px] lg:text-center',
                  i > 0 && 'mt-[18px] border-t border-border-subtle pt-[18px] lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0',
                )}
              >
                <span className="block text-body-sm font-semibold tracking-title text-balance text-text-primary lg:text-body-lg">
                  {unlock.name}
                </span>
                {/* The one entry with a hardware condition gets a way to check it. */}
                {unlock.isAi && (
                  <a
                    href={withBase('features#compatibility')}
                    className="focus-visible:focus-ring mt-2 inline-flex min-h-10 cursor-pointer items-center gap-1.5 py-1.5 text-caption text-gold transition-colors duration-[var(--d-ui)] ease-ui hover:text-gold-light active:text-gold-deep"
                  >
                    {t('pricing.check_phone')}{' '}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={LINK_ARROW_PATH} />
                    </svg>
                  </a>
                )}
                <p className="mt-2 text-caption leading-[1.6] text-pretty text-text-tertiary lg:mt-2.5 lg:text-small lg:leading-[1.62]">
                  {unlock.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Centred under the centred heading and plans on desktop: the lines wrap as
            a balanced block rather than a ragged left column. */}
        <div className="mt-8 flex flex-col gap-1.5 lg:mx-auto lg:mt-9 lg:max-w-pricing lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-[22px] lg:gap-y-2 lg:text-center">
          {disclosures.map((line) => (
            <span key={line} className="text-xs text-text-tertiary">
              {line}
            </span>
          ))}
          <span className="text-xs text-text-tertiary" dangerouslySetInnerHTML={{ __html: governed }}></span>
        </div>
      </Container>
    </section>
  );
}
