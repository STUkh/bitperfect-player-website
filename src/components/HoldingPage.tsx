import PlayCta from './common/PlayCta';
import Container from './common/Container';
import Logo from './common/Logo';
import Icon from './Icon';
import { site } from '../data/site';
import { withBase } from '../utils/nav';
import './HoldingPage.css';

export interface HoldingPageProps {
  /** The plain-language line above the headline. Never a pill: DESIGN.md, "No Badge Above the Headline". */
  eyebrow: string;
  headline: string;
  lede: string;
}

/**
 * The holding page. One screen, one picture, one action.
 *
 * The whole site is parked behind this while it is rebuilt: `/` and everything a
 * dead link can reach render this component, and only `/privacy`, `/terms` and
 * their `/policy` alias still serve their own content. The full pages are parked,
 * not deleted, under `src/pages/_index.astro` and `src/pages/_features/` — Astro
 * does not route a path with a leading underscore, so bringing the site back is a
 * rename rather than a restore.
 *
 * WHY IT IS NOT `ContentLayout`. That layout brings the fixed header, the mobile
 * menu and the seven-column footer, all of which name routes that no longer
 * build. A holding page whose navigation is a list of 404s is worse than one with
 * no navigation, so this carries its own bar and its own footer, and the only
 * links on it are the three destinations that still exist.
 *
 * THE PICTURE. `public/img/holding/needle.webp`: a cartridge suspended above the
 * groove, not touching it. It is the argument the page is making, which is why
 * there is no second graphic and no progress bar. The site's house style is
 * cinematic macro photography of hardware in graphite with one warm gold rake
 * (DESIGN.md, "Imagery"), and this was generated to it and floored to
 * `surface-base` by `design/holding.mjs` so its darks and the page's ground are
 * the same value.
 *
 * There is no percentage anywhere on this page. A number would have to be
 * invented, and CONTENT.md does not allow an invented number on a marketing
 * surface however small it is. The hairline under the copy carries the same
 * "something is still running" idea honestly: a signal sweeping a line, not a
 * bar filling toward a date nobody has committed to.
 *
 * MOTION. DESIGN.md's Still Fold Rule: copy on the first screen paints on load
 * rather than waiting for an observer, so nothing here carries a reveal class and
 * this component ships no script. The sweep is the page's only movement and it
 * has a real resting state under `prefers-reduced-motion`.
 */
export default function HoldingPage({ eyebrow, headline, lede }: HoldingPageProps) {
  return (
    <div className="holding">
      {/*
    ONE picture element, two layouts. A phone gets the 3:4 crop and a desktop the
    full landscape negative, and `<source media>` means only one of the two is
    ever fetched — `hidden` on a duplicate <img> would download both.

    `aria-hidden` and an empty alt: it is the section's ground, not information.
    Everything it says, the headline says in words.
  */}
      <picture className="holding-plate" aria-hidden="true">
        <source media="(max-width: 1023px)" srcSet={withBase('img/holding/needle-portrait.webp')} />{' '}
        <img
          src={withBase('img/holding/needle.webp')}
          alt=""
          width="1536"
          height="1024"
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="holding-scrim" aria-hidden="true" />
      <header className="holding-bar">
        <Container>
          <div className="flex h-16 items-center lg:h-20">
            <a href={withBase('/')} className="holding-wordmark focus-visible:focus-ring">
              <Logo size="md" />{' '}
              <span className="text-body-sm font-bold whitespace-nowrap text-text-primary sm:text-body-lg">
                Bitperfect<span className="hidden sm:inline"> Player</span>
              </span>
            </a>
          </div>
        </Container>
      </header>
      <main id="main-content" className="holding-stage">
        <Container className="lg:px-20">
          <div className="holding-column">
            <span className="mono-spec block text-micro tracking-[1.9px] text-gold uppercase">{eyebrow}</span>
            <h1 className="mt-4 text-display-m text-balance text-text-primary md:text-headline lg:mt-5 lg:text-headline-xl">
              {headline}
            </h1>
            <p className="mt-5 max-w-[42ch] text-body-sm text-pretty text-text-secondary lg:mt-7 lg:text-lede">
              {lede}
            </p>
            {/* The one moving thing on the page. See the note at the top of this file. */}
            <div className="holding-signal" role="presentation" />
            <div className="holding-actions">
              <PlayCta
                label="Get it on Google Play"
                size="md"
                className="h-[52px] text-body-sm lg:h-[54px] lg:px-[30px]"
              />
              {/*
            The two documents that are still live, stated as the two documents they
            are. `nav` rather than a pair of loose links: on a page with no header
            navigation, this IS the navigation.
          */}
              <nav className="holding-quiet" aria-label="Legal">
                <a className="holding-quiet-link focus-visible:focus-ring" href={withBase('privacy')}>
                  Privacy policy
                </a>{' '}
                <span className="holding-quiet-sep" aria-hidden="true" />{' '}
                <a className="holding-quiet-link focus-visible:focus-ring" href={withBase('terms')}>
                  Terms of Use
                </a>
              </nav>
            </div>
          </div>
        </Container>
      </main>
      <footer className="holding-foot">
        <Container>
          <div className="holding-foot-row">
            <p className="text-caption text-text-tertiary">
              {`© ${new Date().getFullYear()} ${site.name}`}
            </p>
            <div className="flex items-center gap-2.5" aria-label="Official channels">
              {site.socials.map((social) => (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${social.label} (${social.handle})`}
                  className="holding-social-link btn-secondary-glow inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-subtle bg-white/[0.04] text-text-secondary hover:border-gold hover:text-gold hover:bg-gold/[0.06] focus-visible:focus-ring"
                  title={`${social.label}: ${social.handle}`}
                >
                  <Icon name={social.id} size={15} />
                </a>
              ))}
            </div>
            <a className="holding-foot-link focus-visible:focus-ring" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
