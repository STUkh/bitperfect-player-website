import type { FlowProps } from '../common/FlowBackdrop';
import CloseBand from '../sections/CloseBand';
import PlayCta from '../primitives/PlayCta';
import { reveal } from '../sections/bands';
import { pro } from '../../data/site';
import './CTASection.css';

/* Read the headline term off the pricing model, so the closing action and the
   pricing card can never state two different prices. */
const headline = pro.periods.find((p) => p.id === pro.defaultPeriodId) ?? pro.periods[0];

/* The same conditional trial the pricing card uses, in the same order: the trial
   first, because it is what happens first. Null `trialDays` silences it here too. */
const closingPrice = pro.trialDays
  ? `Eligible new customers get ${pro.trialDays} days free. Then $${pro.founderPrice} a year, the Founder price, if you subscribe by ${pro.founderEndDate}. That price stays yours while you stay subscribed. Cancel anytime in Google Play.`
  : `$${headline.price} a year, the Founder price, if you subscribe by ${pro.founderEndDate}. That price stays yours while you stay subscribed. Cancel anytime in Google Play.`;

/**
 * Closing call to action. No props; the copy is the site's own.
 *
 * Last band of the landing page, after PricingSection. Ivory surface (`bg-band-ivory`)
 * on the `ground-cta` backdrop. No card, glass or shadow: an ivory band separates with
 * hairlines and space (DESIGN.md, "The Ivory Band Has No Shadows"), so the action
 * stands on the paper.
 *
 * Content: headline "Your music, bit for bit." (accent phrase in `band-gold-ink`,
 * since gold ink on white is 1.06:1), one line of subtext, the gold `PlayCta` install
 * key-cap (large; filled with dark text, so it stays legible on white), and the price
 * line. The price line is built from `pro` in `src/data/site.ts` (trial days, Founder
 * price and end date, same wording as PricingSection) and is dropped to the no-trial
 * sentence when `pro.trialDays` is null. The Android floor comes from `site.minAndroid`.
 * No eyebrow, and no build stamp under the button.
 */
export default function CTASection({ backgroundVariant }: FlowProps) {
  return (
    <CloseBand
      backgroundVariant={backgroundVariant}
      id="cta"
      tone="ivory"
      ground="ground-cta"
      className="overflow-hidden pt-16 pb-18 lg:pt-30 lg:pb-32"
      containerClassName="relative"
      /*
        No eyebrow. `Begin listening` sat directly above `Start listening bit for
        bit.`: the same sentence twice, in two type styles, on the last thing the
        visitor reads. DESIGN.md, "The Eyebrow Budget Rule".
      */
      title="Your music, "
      titleAccent="bit for bit."
      titleClassName="text-headline-m max-w-[16ch] lg:text-headline"
      lede="Install the app from Google Play and plug in your USB DAC."
      ledeClassName="mt-4 max-w-[42ch] text-body-sm text-pretty lg:mt-6 lg:text-body-lg"
      action={
        <div className="r-rise mt-8 lg:mt-10" style={reveal(2)}>
          <PlayCta label="Get it on Google Play" size="lg" />
        </div>
      }
    >
      {/*
        The one line that belongs here and nowhere else on this band. This is the
        last thing read before the store, and the app is a subscription. The old copy
        said "Free to install, no account, nothing to sign up for", which was left
        over from the free-forever model and is now simply untrue.

        It then read "Subscription from $35 for 12 months", and `from` names a
        floor: $35 was the largest number on a card that offered three terms.
        There is one term now, so there is no floor to name and nothing to hedge:
        the sentence is built from the same two values the pricing card uses, in
        the same order, so the two closing statements of price agree word for word.
      */}
      <p className="r-fade mt-5 text-caption text-band-ink-muted lg:mt-6" style={reveal(3)}>
        {closingPrice}
      </p>
      {/*
        The `ANDROID 8.0+ · COM.BITPERFECT.PLAYER` strip that closed this band is
        gone. Both facts were already on the page: the Android version one line
        above, in the footnote where it does work, and the package id in the footer,
        where an identifier belongs. Set again in mono caps under the final action it
        was doing nothing but ending the page on a build stamp, which is the shape of
        a devtool fixture rather than a closing line.
        DESIGN.md, "Don't number sections, add scroll cues, locale strips, version
        stamps or build footers".
      */}
    </CloseBand>
  );
}
