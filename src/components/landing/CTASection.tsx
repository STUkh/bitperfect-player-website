import type { CSSProperties } from 'react';
import Container from '../common/Container';
import PlayCta from '../common/PlayCta';
import { site, pro } from '../../data/site';
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
 * The closing action, on white.
 *
 * It used to be a graphite section holding a glass card, which made three graphite
 * blocks in a row at the foot of the page and left the composition ending on the
 * same note it opened with. The page now closes on light, so the white bands
 * alternate properly across the page: statement, privacy, close.
 *
 * There is no card in here. An white band separates with hairlines and space and
 * carries no glass and no shadow (DESIGN.md, "The Ivory Band Has No Shadows"), so
 * the action stands directly on the paper.
 *
 * The gold ingot survives the move because it is a FILLED button with dark text.
 * Gold as ink on white measures 1.06:1 and disappears entirely, which is why the
 * eyebrow and the accent word run `band-gold-ink` instead.
 */
export default function CTASection() {
  return (
    <section id="cta" className="ground ground-cta overflow-hidden bg-band-ivory pt-16 pb-18 lg:pt-30 lg:pb-32">
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          {/*
        No eyebrow. `Begin listening` sat directly above `Start listening bit for
        bit.`: the same sentence twice, in two type styles, on the last thing the
        visitor reads. DESIGN.md, "The Eyebrow Budget Rule".
      */}
          <h2
            className="r-rise text-headline-m max-w-[16ch] text-balance text-band-ink lg:text-headline"
            style={{ '--i': '0' } as CSSProperties}
          >
            Start listening <span className="text-band-gold-ink">bit for bit.</span>
          </h2>
          <p
            className="r-rise mt-4 max-w-[42ch] text-body-sm text-pretty text-band-ink-muted lg:mt-6 lg:text-body-lg"
            style={{ '--i': '1' } as CSSProperties}
          >
            On Google Play, for Android {site.minAndroid} and up. Plug in a USB DAC. The badge shows whether the sound is bit-perfect.
          </p>
          <div className="r-rise mt-8 lg:mt-10" style={{ '--i': '2' } as CSSProperties}>
            <PlayCta label="Get it on Google Play" size="lg" />
          </div>
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
          <p className="r-fade mt-5 text-caption text-band-ink-muted lg:mt-6" style={{ '--i': '3' } as CSSProperties}>
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
        </div>
      </Container>
    </section>
  );
}
