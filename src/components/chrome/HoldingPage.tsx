import PlayCta from '../primitives/PlayCta';
import Container from '../primitives/Container';
import Logo from '../primitives/Logo';
import Icon from '../primitives/Icon';
import Picture from '../primitives/Picture';
import { site } from '../../data/site';
import { withBase } from '../../utils/nav';
import '../primitives/Button.css';
import './HoldingPage.css';

export interface HoldingPageProps {
  /** The plain-language line above the headline. Never a pill: DESIGN.md, "No Badge Above the Headline". */
  eyebrow: string;
  headline: string;
  lede: string;
}

/**
 * The holding page: one screen, one picture, one action. A full page, not a band.
 *
 * The site shows this at `/` (and at any dead link) while the full pages are parked
 * under `src/pages/_index.astro` and `src/pages/_features/`; only `/privacy`, `/terms`
 * and `/policy` still serve their own content. It is deliberately not wrapped in
 * `ContentLayout`: it carries its own bar (logo and wordmark only) and its own footer
 * (copyright, social links, contact email), because the full header and footer name
 * routes that do not build.
 *
 * Surface: graphite. The ground is the `holding-plate` photograph (a cartridge hung
 * above the groove, `img/holding/needle.webp`, 3:4 portrait crop below 1024px) under a
 * scrim. The copy column holds a gold mono eyebrow (plain text, never a pill), the
 * headline, the lede, a hairline `holding-signal` sweep, the gold `PlayCta`, and quiet
 * Privacy / Terms links. No percentage or progress bar anywhere: a number would be
 * invented.
 *
 * Motion: copy paints on load (no reveal classes, no script). The signal sweep is the
 * only movement and rests under `prefers-reduced-motion`.
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
      <Picture
        src="img/holding/needle.webp"
        sizes="100vw"
        art={[{ media: '(max-width: 1023px)', src: 'img/holding/needle-portrait.webp', sizes: '100vw' }]}
        position="50% 58%"
        priority
        pictureClassName="holding-plate"
      />
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
