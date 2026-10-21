import Container from '../common/Container';
import PhoneNowPlaying from '../PhoneNowPlaying';
import { pro, site } from '../../data/site';
import './HeroSection.css';

/**
 * Hero banner.
 *
 * Depth is one directional light: a neutral overhead wash painted on the
 * section itself. No orbs, no gold aura (DESIGN.md, "No Floating Glow" and
 * "Gold Emits Nothing"). Nothing here carries a reveal class: the Still Fold
 * Rule says hero copy paints on load rather than waiting for an observer.
 */

/*
 * The four spec chips are removed, and this note is what is left of them.
 *
 * They read as specifications rather than as marketing, which is exactly why they
 * survived two passes. The problem was never the chips, it was the count: the hero
 * holds an eyebrow, a headline, one line of subtext and two actions, and the chip
 * row was a fifth element turning the fold into a section (DESIGN.md, "The Hero
 * Holds Four Things").
 *
 * Nothing was lost with them. Every one of the four is stated again below, in the
 * place that argues for it: `Android 8.0 and up` in the closing footnote,
 * `Exclusive USB DAC output` in the statement band, `No account, no ads` and
 * `AI runs on the phone` in the privacy band. The hero was carrying a summary of
 * the page it opens.
 */
/*
  The trial, under the actions, in the smallest type on the fold.

  It earns its place because it changes what the primary button COSTS the reader,
  which is the one objection a paid-up-front subscription raises at first contact. It stays
  one line and it stays quiet: the hero's job is the headline and the phone, not a
  price argument, and that fight is had properly in the pricing section.

  Conditional on `pro.trialDays`, and phrased for NEW customers, because the store
  decides eligibility (roughly one trial per store account). Setting `trialDays`
  back to null removes the line rather than leaving a broken promise on the fold.
*/
const trialLine = pro.trialDays
  ? `Free for ${pro.trialDays} days for new customers, then $${pro.periods[0].price} a year.`
  : null;

export default function HeroSection() {
  /*
    The hero's height cap is load-bearing, not decoration.

    The device is ~700px tall and it was setting the grid row, so the row ran 700px
    while the copy beside it is 155px: 545px of nothing under the buttons, on the
    first screen of the site, with all the mass in the bottom right. A device that
    bleeds off the fold is the point of this composition; a device that DICTATES the
    fold is the bug.

    Capped, the phone crops at a chosen line instead of an accidental one, and what
    is left under the copy reads as the bottom margin it actually is. The cap
    applies from `lg` only, where the two columns exist at all.
  */
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-surface-base bg-[radial-gradient(ellipse_120%_78%_at_50%_-10%,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.012)_42%,transparent_72%)] pt-11 pb-14 lg:max-h-[920px] lg:pt-28 lg:pb-26"
    >
      <Container className="relative lg:px-20">
        {/*
      A mono eyebrow, not a badge.

      This was a pill: rounded-full, a hairline border, a glass fill, a 15px glyph
      and uppercase letterspaced text, sitting directly above the H1. That exact
      component above that exact position is one of the most reliably generated
      gestures on the web, and stacking it over an accent-coloured second headline
      line put two of them in the first frame a visitor sees.

      The copy was always the good part and it survives unchanged. Set as a plain
      mono line it matches every other section eyebrow on the site, which makes the
      hero part of the same document rather than a landing page bolted to the front.
    */}
        <span className="mono-spec block text-micro tracking-[1.9px] text-gold uppercase">
          Bit-perfect playback for Android
        </span>
        {/*
      The display step is 128px, and 128px inside a 7-column cell wraps a two-word
      line five ways. So the headline takes the full container and the split starts
      underneath it. This is the shape every reference that ships display type this
      large uses, and it is the only way the size and the composition both survive.
    */}
        <h1 className="text-display-m text-balance text-text-primary lg:text-display">
          Pure sound.
          <br /> <span className="text-gold">In its original light.</span>
        </h1>
        <div className="mt-9 grid items-start gap-11 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start lg:col-span-6">
            <p className="max-w-[44ch] text-body-sm text-pretty text-text-secondary lg:text-lede">
              Every sample goes straight to your USB DAC, exactly as it was recorded.
            </p>
            <div className="mt-[26px] flex w-full flex-col gap-3 lg:mt-9 lg:w-auto lg:flex-row lg:items-center lg:gap-4">
              <a
                href={site.playUrl}
                rel="noopener noreferrer"
                className="btn-primary-gradient focus-visible:focus-ring inline-flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-full text-body-sm font-semibold text-on-gold lg:h-[54px] lg:px-[30px]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M5 3.5v17a1 1 0 0 0 1.52.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z" />
                </svg>{' '}
                <span>Get it on Google Play</span>
              </a>{' '}
              <a
                href="#features"
                className="btn-secondary-glow hero-secondary focus-visible:focus-ring group inline-flex h-[52px] cursor-pointer items-center justify-center gap-[9px] rounded-full border border-border-subtle bg-glass-surface text-small font-medium text-text-secondary hover:border-glass-border-hover hover:bg-white/[0.075] hover:text-text-primary active:bg-white/[0.045] lg:h-[54px] lg:px-[26px]"
              >
                <span>See what it does</span>{' '}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="hero-secondary-arrow"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            {trialLine && <p className="mt-4 text-caption text-text-tertiary lg:mt-5">{trialLine}</p>}
            {/*
          The four spec chips are gone. See the note above `chips` for why.
        */}
          </div>
          <div className="relative flex justify-center lg:col-span-6 lg:justify-end">
            <div className="w-full max-w-[344px]">
              <PhoneNowPlaying />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
