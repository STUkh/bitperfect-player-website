import Button from '../common/Button';
import PlayCta from '../common/PlayCta';
import { withBase } from '../../utils/nav';
import PhoneNowPlaying from '../PhoneNowPlaying';
import PhoneFrame from '../feature/PhoneFrame';
import PhoneScreen from '../feature/PhoneScreen';
import { useBehaviour } from '../behaviour';
import { pro } from '../../data/site';
import { setupHomeOpening } from './HomeOpening.client';
import './HomeOpening.css';

/**
 * The opening: hero and phone lineup as ONE pinned stage.
 *
 * It used to be two components (a hero with its own phone, a showcase with three
 * of its own), and the hand-off between them jumped because the hero phone and the
 * showcase's centre phone were different objects. Now there is one Now Playing
 * phone. It starts in the hero's right column and travels to the centre while the
 * Equaliser and Library phones slide out from behind it.
 *
 * One scalar, `p` (0 to 1 over the track), drives everything; the script smooths
 * it and paints transform and opacity only (`HomeOpening.client.ts`). Below 1024px,
 * with reduced motion, or with scripting off, nothing pins and the CSS resting
 * state is a finished composition: the copy, the phone, the heading, then the other two screens.
 *
 * The four spec chips the hero once carried are gone for good (DESIGN.md, "The
 * Hero Holds Four Things"): an eyebrow, a headline, one line of subtext and two
 * actions. Each chip is stated again where the page argues for it.
 */

/*
  The trial, under the actions, in the smallest type on the fold.

  It earns its place because it changes what the primary button COSTS the reader,
  which is the one objection a paid-up-front subscription raises at first contact.
  It stays one line and it stays quiet: the fight about price is had in the pricing
  section.

  Conditional on `pro.trialDays`, and phrased for NEW customers, because the store
  decides eligibility (roughly one trial per store account). Setting `trialDays`
  back to null removes the line rather than leaving a broken promise on the fold.
*/
const trialLine = pro.trialDays
  ? `Eligible new customers get ${pro.trialDays} days free. Then $${pro.founderPrice} a year, the Founder price, if you subscribe by ${pro.founderEndDate}. That price stays yours while you stay subscribed.`
  : null;

export default function HomeOpening() {
  const ref = useBehaviour<HTMLElement>(setupHomeOpening);

  return (
    <section ref={ref} id="hero" className="home-opening" data-home-opening="">
      <div className="home-opening-stage">
        {/* The listening room behind the copy, then the acoustic hall behind the
            lineup. Decorative, so no alt. Their opacities follow `--p`. */}
        <div className="ho-backdrop ho-backdrop-hero" aria-hidden="true">
          <div className="ho-backdrop-frame">
            <img
              src={withBase('img/hero-backdrop.webp')}
              srcSet={`${withBase('img/hero-backdrop-960.webp')} 960w, ${withBase('img/hero-backdrop.webp')} 1672w`}
              sizes="100vw"
              width="1672"
              height="941"
              alt=""
              loading="eager"
              decoding="async"
              {...({ fetchpriority: "low" } as object)}
            />
          </div>
        </div>
        <div className="ho-backdrop ho-backdrop-show" aria-hidden="true">
          <img
            src={withBase('img/showcase-backdrop.webp')}
            srcSet={`${withBase('img/showcase-backdrop-960.webp')} 960w, ${withBase('img/showcase-backdrop.webp')} 1672w`}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="ho-inner">
          <div className="ho-copy" data-copy="">
            <span className="hero-in mono-spec block text-micro tracking-[1.9px] text-gold uppercase">
              Bit-perfect playback for Android
            </span>
            <h1 className="hero-in hero-in-2 ho-title text-headline-m text-balance text-text-primary lg:text-headline">
              Pure sound.
              <br /> <span className="text-gold">Nothing in between.</span>
            </h1>
            <div className="hero-in hero-in-3 mt-9 flex flex-col items-start lg:mt-14">
              <p className="max-w-[44ch] text-body-sm text-pretty text-text-secondary lg:text-lede">
                Your music goes straight to your USB DAC. A live badge shows whether it arrives unchanged.
              </p>
              <div className="mt-[26px] flex w-full flex-col gap-3 min-[641px]:w-auto min-[641px]:flex-row min-[641px]:items-center lg:mt-9 lg:gap-4">
                <PlayCta label="Get it on Google Play" className="h-[52px] text-body-sm lg:h-[54px] lg:px-[30px]" />
                <Button
                  href="#features"
                  variant="secondary"
                  className="h-[52px] text-small font-medium lg:h-[54px] lg:px-[26px]"
                >
                  <span>See what it does</span>
                </Button>
              </div>
              {trialLine && <p className="mt-4 text-caption text-text-tertiary lg:mt-5">{trialLine}</p>}
            </div>
          </div>

          {/* No eyebrow: `The app itself` captioned a picture that captions itself
              (DESIGN.md, "The Eyebrow Budget Rule"). */}
          <h2 className="ho-heading text-section-sm text-balance text-text-primary lg:text-headline-sm" data-heading="">
            Every screen runs on the same engine.
          </h2>

          <div className="ho-group" data-group="">
            <span className="ho-glow" aria-hidden="true"></span>
            {/* The screens are captures of the app with empty alt text because
                this label already names all three. */}
            <div
              className="ho-lineup"
              role="group"
              aria-label="Three app screens: Now Playing, equaliser and library"
            >
              <div className="ho-side ho-left" data-phone="left">
                <PhoneFrame fill>
                  <PhoneScreen name="eq" />
                </PhoneFrame>
              </div>
              <div className="ho-centre" data-phone="centre">
                <PhoneNowPlaying />
              </div>
              <div className="ho-side ho-right" data-phone="right">
                <PhoneFrame fill>
                  <PhoneScreen name="library" />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
