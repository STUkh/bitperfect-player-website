import { useEffect, useRef } from 'react';
import { Container } from '../common/Container';
import { PhoneFrame } from '../feature/PhoneFrame';
import { PhoneScreen } from '../feature/PhoneScreen';
import { asset } from '../lib/asset';
import { cx, t, stagger, scope } from '../lib/site';

export interface PhoneShowcaseProps {
  /** Small left-aligned heading above the lineup. */
  title?: string;
  /** Accessible name of the three-phone group; it carries the screens, whose images have empty alt text. */
  stripLabel?: string;
  /** Screen key (`src/data/screens.ts`) for the far-left phone. */
  farScreen?: string;
  /** Screen key for the middle phone. */
  midScreen?: string;
  /** Screen key for the right-hand anchor phone, the one the hero phone hands off to (first in the mobile strip). */
  anchorScreen?: string;
  /** Paint the section on `bg-surface-base`. On the site the section is transparent over the hero/showcase zone's own surface-base; turn this off when composing it inside such a zone so the zone's ambient light shows through. */
  ground?: boolean;
}

const S = scope('xhemsvl3');

/**
 * Three-phone lineup that follows the home hero: a small heading, then the
 * anchor phone on the right with two more screens fanned out to its left, over
 * a dim acoustic-stage backdrop. It takes a full viewport plus a short track on
 * desktop; below 1024px it becomes a horizontal snapping strip that opens on the
 * anchor screen. Pair it directly after HeroSection on a dark ground.
 */
export function PhoneShowcase({
  title = t('showcase.title'),
  stripLabel = t('showcase.strip_aria'),
  farScreen = 'library',
  midScreen = 'eq',
  anchorScreen = 'now-playing',
  ground = true,
}: PhoneShowcaseProps) {
  const strip = useRef<HTMLDivElement>(null);

  /* The strip only scrolls below 1024px, so it only takes a tab stop there. */
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const sync = () => {
      if (desktop.matches) el.removeAttribute('tabindex');
      else el.setAttribute('tabindex', '0');
    };
    sync();
    desktop.addEventListener('change', sync);
    return () => desktop.removeEventListener('change', sync);
  }, []);

  return (
    <section className={cx('showcase relative', ground && 'bg-surface-base')} data-showcase="" {...S}>
      <div className="stage" data-stage="" {...S}>
        {/* Atmospheric acoustic stage backdrop plate */}
        <div className="showcase-backdrop pointer-events-none absolute inset-0 z-0" aria-hidden="true" {...S}>
          <div className="showcase-backdrop-frame" {...S}>
            <img
              src={asset('img/showcase-backdrop.webp')}
              srcSet={`${asset('img/showcase-backdrop-960.webp')} 960w, ${asset('img/showcase-backdrop.webp')} 1920w`}
              sizes="100vw"
              width="1920"
              height="1080"
              alt=""
              decoding="async"
              fetchPriority="low"
              {...S}
            />
            <div className="showcase-stage-ambient" {...S}></div>
          </div>
        </div>

        <Container className="relative z-[2]">
          <h2
            className="r-rise showcase-heading max-w-[36ch] text-title-lg text-balance text-text-primary lg:text-section-sm"
            style={stagger(0)}
            {...S}
          >
            {title}
          </h2>
        </Container>

        <Container className="riser-container relative z-[2]">
          <div className="riser" data-riser="" {...S}>
            <div className="fitbox" {...S}>
              <div
                ref={strip}
                className="fit focus-visible:focus-ring-inset rounded-card-sm"
                data-strip=""
                role="group"
                aria-label={stripLabel}
                {...S}
              >
                <div className="phone phone-far" data-phone="left" {...S}>
                  <PhoneFrame fill idPrefix="far-s25u">
                    <PhoneScreen name={farScreen} />
                  </PhoneFrame>
                </div>
                <div className="phone phone-mid" data-phone="centre" {...S}>
                  <PhoneFrame fill idPrefix="mid-s25u">
                    <PhoneScreen name={midScreen} />
                  </PhoneFrame>
                </div>
                <div className="phone phone-anchor" data-phone="right" {...S}>
                  <PhoneFrame fill idPrefix="anchor-s25u">
                    <PhoneScreen name={anchorScreen} />
                  </PhoneFrame>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
