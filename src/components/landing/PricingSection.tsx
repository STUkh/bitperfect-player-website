import type { CSSProperties } from 'react';
import { clsx as cx } from 'clsx';
import Container from '../common/Container';
import { pro, site } from '../../data/site';
import { withBase } from '../../utils/nav';
import './PricingSection.css';

/*
  ONE plan, so there is no selector any more.

  This card used to carry a three-segment radiogroup (3 / 6 / 12 months) and about
  eighty lines of script to swap five strings and translate an indicator. All of it
  is gone, because `pro.periods` now holds one term: the app's subscription gate
  sells the annual package and nothing else, so a control offering three choices
  was offering two the buyer could never complete.

  What replaces it is nothing at all. A single price needs no control, and the card
  is stronger for it: the 128px numeral is now the first thing the eye lands on
  instead of the second.

  Still read from `pro.periods`, never typed. `plan` is looked up by id rather than
  taken at [0], so restoring a second term stays a data change.
*/
const plan = pro.periods.find((p) => p.id === pro.defaultPeriodId) ?? pro.periods[0];

/*
  The trial is CONDITIONAL copy, in two senses.

  `pro.trialDays` may go back to null (the Play Console offer is the authority, not
  this site), and every trial string below is written so that setting it to null
  removes the claim rather than leaving a dangling sentence.

  And eligibility is the store's decision, roughly one trial per store account, so
  the copy says "new customers" rather than "you". Promising a specific visitor a
  trial the store will refuse them is the one way this section could lie.
*/
const trialDays = pro.trialDays;
const trialBadge = trialDays ? `${trialDays} days free` : null;

/* Term, amount and exit in one sentence, under the action. The trial leads when
   there is one, because it is the first thing that happens to a new customer. */
const renewNote = trialDays
  ? `Free for ${trialDays} days for new customers, then $${plan.price} a year until you cancel in Play subscriptions. Cancel before the trial ends and nothing is charged.`
  : `Renews every ${plan.label} at $${plan.price} until you cancel in Play subscriptions.`;

/**
 * Pricing, graphite. ONE card, never three.
 *
 * Three side-by-side cards is a COMPARISON grammar. Used for three billing
 * durations it tells the reader there are three products, then makes them read
 * three identical feature lists to discover there are not. When a second term
 * returns it gets a CONTROL inside this card, because a term is a setting; it
 * does not get a second card.
 *
 * Gold appears exactly twice here: the action and the badge. Any third gold mass
 * in a 540px card and the button stops reading as the destination — which is why
 * a restored term selector's indicator has to be graphite.
 *
 * What the subscription covers sits BELOW the card rather than inside it. A
 * single-plan card has nothing to compare against, so an in-card checklist is
 * decoration that dilutes the price (Roon does the same, for the same reason).
 *
 * Every state is rendered from `pro.periods`; the script only swaps text and
 * translates the indicator. Nothing here computes a price at runtime.
 */
export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 overflow-hidden bg-surface-base pt-14 pb-15 lg:pt-29 lg:pb-30"
    >
      {/* One directional overhead wash. Nothing on this site emits light. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_62%_at_50%_-6%,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.012)_42%,transparent_72%)]"
        aria-hidden="true"
      ></div>
      <Container className="relative lg:px-20">
        {/*
      No eyebrow. `Pricing` restated the section id, the nav item and the headline
      below it. DESIGN.md, "The Eyebrow Budget Rule".
    */}
        <div className="lg:mx-auto lg:mb-13 lg:max-w-[720px] lg:text-center">
          <h2
            className="r-rise text-section-sm text-balance text-text-primary lg:text-headline-sm"
            style={{ '--i': '0' } as CSSProperties}
          >
            One price buys the whole player.
          </h2>
          <p
            className="r-rise mt-3.5 text-base leading-[1.6] text-pretty text-text-secondary lg:mx-auto lg:mt-5 lg:max-w-[48ch] lg:text-body-lg"
            style={{ '--i': '1' } as CSSProperties}
          >
            Nothing is held back. There is no higher tier and no feature switched off to sell you one.
          </p>
        </div>
        {/* ── The card ── */}
        <div
          className="r-rise relative isolate mt-[26px] overflow-hidden rounded-card-sm border border-border-subtle bg-glass-surface p-[22px] pb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.10),0_20px_48px_-18px_rgba(0,0,0,0.55)] lg:mx-auto lg:mt-0 lg:w-[540px] lg:rounded-card lg:p-10 lg:pt-9 lg:pb-9"
          style={{ '--i': '2' } as CSSProperties}
        >
          {/*
        One directional wash off the top edge, the same idiom the sections use.
        A flat dark rectangle reads as a swatch; a lit one reads as an object, and
        the reference cards that feel expensive all carry some version of this.

        NEUTRAL, not gold. Raycast's is a grey radial and ours has to be too: gold
        here would be a third gold mass in a component whose whole discipline is
        that gold appears exactly twice, on the action and on the savings badge.
        Capped at 96px, about 19% of the card, which is where the references sit
        once their proportions are scaled to a card this size.
      */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-[radial-gradient(56%_100%_at_50%_0%,rgba(255,255,255,0.055)_0%,transparent_72%)]"
            aria-hidden="true"
          ></span>
          {/*
        The answer the whole band exists to give, set as the largest thing on it.

        It used to be a 72px numeral on a left-aligned baseline with the term and
        the per-month figure trailing off to its right: four typographic objects
        strung along one line, which made the price read as one more row of the
        card rather than as the answer. It is now CENTRED and 128px.

        THE `$` IS SET AT THE FIGURE SIZE, on the baseline, not cap-hung above the
        numeral. Measured in Manrope at 128px/600: the digits have a 92.2px ascent
        and a 1.9px descent, and the `$` has 104.9 above and 12.7 below. The glyph
        is DRAWN to overshoot the caps by 14% and descend below the baseline, which
        is a typeface saying it expects to be set at the figure size. Hanging a 40px
        version from the cap line made its ink 36% of the digit height and left a
        59px void inside the lockup. Six of seven shipped references set the symbol
        inline at full size for the same reason; the one that superscripts it is the
        least premium page in the set.

        The term rides INLINE on the same baseline rather than sitting under the
        numeral as a caption. Every reference sets it inline; stacked, the lockup
        reads as a number with a caption rather than as a price.

        Fixed height and tabular figures, so the action never moves when the term
        changes and the numerals never re-space when a figure changes length.
      */}
          {/*
        No `aria-live` on this block. It wrapped the numeral, the term, the
        per-month figure and the badge, so one term change announced all four as
        a single run-on string. The sentence a screen reader should hear is
        written once, in the visually hidden live region below the action.
      */}
          <div className="mt-8 flex min-h-[128px] flex-col items-center lg:mt-11 lg:min-h-[176px]">
            {/*
          `flex-wrap` with a `nowrap` term is the safety net under a 320px viewport,
          not the layout. Inline is the rule and it holds from 360px up; below that
          the term drops WHOLE to a second line instead of splitting into `/` on one
          line and `year` on the next, which is what an unguarded inline span does
          and which reads as a typo rather than as a price.
        */}
            <div className="flex flex-wrap items-baseline justify-center">
              <span className="text-price-sm text-champagne/80 lg:text-price">$</span>{' '}
              <span className="text-price-sm tabular-nums text-band-ivory lg:text-price">{plan.price}</span>{' '}
              <span className="ml-2.5 text-body-sm font-medium whitespace-nowrap text-white/60 lg:ml-4 lg:text-title-sm">
                / {plan.per}
              </span>
            </div>
            {/*
          The gold badge slot survives the selector's removal, holding the TRIAL
          instead of a saving. That keeps the card's colour discipline intact:
          gold appears exactly twice here, on the action and on this badge, and
          with one term there is no longer a saving for it to carry.

          When `pro.trialDays` is null the badge is not rendered at all. Nothing
          reserves its width any more, because with one term the row never
          changes after paint.
        */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:mt-7 lg:gap-3">
              <span className="text-body-sm tabular-nums text-white/58">${plan.perMonth} per month</span>{' '}
              {trialBadge && (
                <span className="inline-flex h-7 items-center rounded-full border border-gold/24 bg-gold/11 px-3 text-[11px] font-bold tracking-[0.06em] text-gold-light uppercase">
                  {trialBadge}
                </span>
              )}
            </div>
          </div>
          <a
            href={site.playUrl}
            rel="noopener noreferrer"
            className="btn-primary-gradient focus-visible:focus-ring mt-[22px] flex h-[54px] cursor-pointer items-center justify-center gap-2.5 rounded-full text-base font-semibold text-on-gold lg:mt-6 lg:h-14"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M5 3.5v17a1 1 0 0 0 1.52.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z" />
            </svg>{' '}
            <span>Get it on Google Play</span>
          </a>
          {/*
        The billing model, stated once, directly under the action.

        This read "Billed once through Google Play. Cancel any time.", which is
        what a one-off purchase does. The app is an auto-renewing subscription,
        and the disclosure row 200px below said so on the same screen: the page
        contradicted itself at the moment of purchase. It now carries the term,
        the amount and the exit, swapped by the selector along with the price.
      */}
          <p className="mt-4 text-center text-caption text-white/52 lg:mt-[18px]">{renewNote}</p>
          {/*
        The visually hidden live region is gone with the selector. It existed to
        speak a price that changed after paint; this one never changes, so the
        visible text is already the whole announcement and a second copy of it
        would just be read twice.
      */}
        </div>
        {/* ── What the subscription covers. Below the card, on hairlines, no boxes. ── */}
        <div
          className="r-rise mt-[34px] border-t border-border-subtle pt-6 lg:mx-auto lg:mt-18 lg:max-w-[1040px] lg:pt-[34px]"
          style={{ '--i': '3' } as CSSProperties}
        >
          {/*
        A label, not an eyebrow. It names the three columns underneath and they are
        ungrounded without it, so it stays. What goes is the caps-and-tracking
        gesture: set in sentence case at `caption`, it names a group inside a section
        instead of announcing a section, which is the line the budget draws.
        DESIGN.md, "The Eyebrow Budget Rule".
      */}
          <span className="block text-caption text-text-tertiary lg:mb-[26px]">What the subscription covers</span>
          <div className="mt-[18px] lg:mt-0 lg:grid lg:grid-cols-3">
            {pro.unlocks.map((unlock, i) => (
              <div
                key={unlock.name}
                className={cx([
                  i > 0 &&
                    'mt-[18px] border-t border-border-subtle pt-[18px] lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[34px]',
                  i < 2 && 'lg:pr-[34px]',
                ])}
              >
                <span className="block text-body-sm font-semibold tracking-[-0.01em] text-text-primary lg:text-body-lg">
                  {unlock.name}
                </span>{' '}
                {/* The one entry with a hardware condition gets a way to check it.
                  `pro.unlocks` has carried a note about this link since the
                  rewrite and the link itself never existed. */}
                {unlock.name === 'AI Enhancer' && (
                  <a
                    href={withBase('features#compatibility')}
                    className="focus-visible:focus-ring mt-2 inline-flex min-h-6 cursor-pointer items-center gap-1.5 text-caption text-gold transition-colors duration-[var(--d-ui)] ease-ui hover:text-gold-light active:text-gold-deep"
                  >
                    Check your phone{' '}
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
                      <path d="M5 12h14m0 0-6-6m6 6-6 6" />
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
        {/*
      The disclosures, and the two documents they summarise.

      This is the surface a visitor reads immediately before the store, and it is
      the one place the site states a price, a term and a renewal. Until now it
      reached neither document: the Terms of Use, which owns the trial conversion,
      the renewal, cancellation and refunds, and the Privacy Policy, which owns
      what a purchase discloses. Both were reachable only from the footer, four
      screens down. TERMS_OF_USE.md §2 says the terms govern the purchase, so the
      purchase moment has to be able to reach them.
    */}
        <div className="mt-8 flex flex-col gap-1.5 lg:mx-auto lg:mt-9 lg:max-w-[1040px] lg:flex-row lg:flex-wrap lg:gap-x-[22px]">
          {pro.disclosures.map((line) => (
            <span key={line} className="text-xs text-text-tertiary">
              {line}
            </span>
          ))}{' '}
          <span className="text-xs text-text-tertiary">
            <a href={withBase('/terms')} className="pricing-legal-link focus-visible:focus-ring">
              Terms of Use
            </a>
            {' and '}
            <a href={withBase('/privacy')} className="pricing-legal-link focus-visible:focus-ring">
              Privacy Policy
            </a>
            .
          </span>
        </div>
      </Container>
    </section>
  );
}
