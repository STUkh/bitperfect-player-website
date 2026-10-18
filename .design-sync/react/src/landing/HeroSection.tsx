import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { PhoneNowPlaying } from '../common/PhoneNowPlaying';
import { pro, site } from '@site/data/site';
import { t, scope } from '../lib/site';
import { asset } from '../lib/asset';

export interface HeroSectionProps {
  /** Mono eyebrow above the headline. */
  eyebrow?: string;
  /** Headline, first line, in primary ink. */
  titleLead?: string;
  /** Headline, second line, in gold. */
  titleAccent?: string;
  /** The one line of subtext under the headline. */
  lede?: string;
  /** Primary (gold) action label; carries the Play glyph. */
  primaryLabel?: string;
  /** Primary action link. Default: the Google Play listing. */
  primaryHref?: string;
  /** Secondary (glass) action label. */
  secondaryLabel?: string;
  /** Secondary action link. Default "#features". */
  secondaryHref?: string;
  /** The quiet trial line under the actions; `null` removes it. */
  trialLine?: string | null;
  /** Screen key from `src/data/screens.ts` shown on the hero phone. Default "now-playing". */
  screen?: string;
  /** Wrap the hero in the home page's graphite zone and its ambient light (the site renders the hero inside it). Turn off when the page already provides `.hero-showcase-zone`, e.g. above PhoneShowcase. */
  withZone?: boolean;
}

const S = scope('zypivoos');
/** The site passes the scope id to Button as a prop, so its `<a>` carries the value "true". */
const SB = { 'data-astro-cid-zypivoos': 'true' } as Record<string, string>;

const defaultTrialLine = pro.trialDays
  ? t('hero.trial', { days: pro.trialDays, price: pro.periods[0].price })
  : null;

/**
 * The home page's opening fold: mono eyebrow, a two-line display headline
 * (second line gold), one line of subtext, the Google Play and "See what it
 * does" actions with the trial line, and the Now Playing phone standing at the
 * right over a defocused listening-room backdrop. It goes first on the home
 * page, directly under the Header, and hands off to PhoneShowcase below.
 */
export function HeroSection({
  eyebrow = t('hero.eyebrow'),
  titleLead = t('hero.title_p1'),
  titleAccent = t('hero.title_p2'),
  lede = t('hero.lede'),
  primaryLabel = t('hero.cta_play'),
  primaryHref = site.playUrl,
  secondaryLabel = t('hero.cta_features'),
  secondaryHref = '#features',
  trialLine = defaultTrialLine,
  screen = 'now-playing',
  withZone = true,
}: HeroSectionProps) {
  const hero = (
    <section id="hero" className="relative min-h-[640px] md:min-h-screen" {...S}>
      <div className="hero-backdrop" aria-hidden="true" data-hero-backdrop="" {...S}>
        <div className="hero-backdrop-frame" {...S}>
          <img
            src={asset('img/hero-backdrop.webp')}
            srcSet={`${asset('img/hero-backdrop-960.webp')} 960w, ${asset('img/hero-backdrop.webp')} 1672w`}
            sizes="100vw"
            width="1672"
            height="941"
            alt=""
            decoding="async"
            fetchPriority="low"
            {...S}
          />
          <span className="hero-backdrop-glow" {...S}></span>
        </div>
      </div>

      <div className="relative z-[1] pt-[109px] pb-14 lg:pt-[193px] lg:pb-26" {...S}>
        <Container className="relative">
          <span className="mono-spec block text-micro tracking-[1.9px] text-text-tertiary uppercase" {...S}>
            {eyebrow}
          </span>

          <h1 className="text-headline-m text-balance text-text-primary lg:text-headline" {...S}>
            {titleLead}
            <br {...S} />
            <span className="text-gold" {...S}>{titleAccent}</span>
          </h1>

          <div className="mt-9 grid gap-11 lg:mt-14 lg:grid-cols-12 lg:gap-10" {...S}>
            <div className="flex flex-col items-start lg:col-span-6" {...S}>
              <p className="max-w-[44ch] text-body-sm text-pretty text-text-secondary lg:text-lede" {...S}>
                {lede}
              </p>

              <div
                className="mt-[26px] flex w-full flex-col gap-3 lg:mt-9 lg:w-auto lg:flex-row lg:items-center lg:gap-4"
                {...S}
              >
                <Button href={primaryHref} rel="noopener noreferrer" variant="primary" {...SB}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...S}>
                    <path d="M5 3.5v17a1 1 0 0 0 1.52.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z" {...S}></path>
                  </svg>
                  <span {...S}>{primaryLabel}</span>
                </Button>
                <Button href={secondaryHref} variant="secondary" className="hero-secondary text-small font-medium" {...SB}>
                  <span {...S}>{secondaryLabel}</span>
                </Button>
              </div>

              {trialLine && (
                <p className="mt-4 text-caption tabular-nums text-text-tertiary lg:mt-5" {...S}>{trialLine}</p>
              )}
            </div>
          </div>

          <div
            className="mt-11 flex justify-center lg:absolute lg:top-[-80px] lg:right-20 lg:mt-0 lg:block lg:w-[330px] lg:justify-end"
            {...S}
          >
            <div className="w-full max-w-[380px]" data-hero-phone-slot="" {...S}>
              <PhoneNowPlaying screen={screen} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );

  if (!withZone) return hero;
  return (
    <div className="hero-showcase-zone relative bg-surface-base">
      <div className="hero-showcase-ambient" aria-hidden="true"></div>
      {hero}
    </div>
  );
}
