import Button from './Button';
import Container from './Container';
import Logo from './Logo';
import StoreBadges from './StoreBadges';
import Icon from '../Icon';
import { footerLinks } from '../../data/navigation';
import { site } from '../../data/site';
import { resolveHref, withBase } from '../../utils/nav';
import { useTranslations } from '../../i18n/utils';
import { styleOf } from '../_lib/class-props';
import './Footer.css';

export interface FooterProps {
  /** The current page's path, which resolves the in-page link hrefs. */
  pathname?: string;
  /** The page's locale (`Astro.currentLocale`); the default language when unset. */
  locale?: string;
}

/**
 * The site footer, on a raised graphite ground: the brand block (logo, tagline,
 * store badges), one link column per section of `footerLinks`, and a bottom bar
 * with the copyright, the trademark notice and the official social channels.
 * Takes no content props; links and copy come from the site data and translations.
 */
export default function Footer({ pathname = '/', locale }: FooterProps) {
  const t = useTranslations(locale);
  const sectionTitle = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');
    const key = `footer.${slug}` as any;
    const translated = t(key);
    return translated && translated !== key ? translated : title;
  };
  type FooterLink = (typeof footerLinks)[keyof typeof footerLinks]['links'][number];
  const getLocalizedFooterLinkLabel = (link: FooterLink) => {
    if (link.href === '/faq') return t('footer.all_questions');
    if (link.href === '/privacy') return t('footer.privacy_policy');
    if (link.href === '/terms') return t('footer.terms_of_use');
    if (
      link.href.startsWith('mailto:') ||
      (link.label as string) === 'Email support' ||
      (link.label as string) === 'Email Support' ||
      (link.label as string) === 'Contact Support'
    ) {
      return t('footer.email_support');
    }
    if (
      (link.label as string) === 'Google Play' ||
      (link.label as string) === 'Get it on Google Play'
    ) {
      return t('store.google_play') || 'Get it on Google Play';
    }
    return link.label;
  };

  const sections = Object.values(footerLinks);
  const isExternal = (href: string) => /^https?:\/\//.test(href);

  /*
  The desktop track list, DERIVED from the sections rather than hardcoded.

  It was two literal templates picked by `sections.length <= 1`, and the wide one
  declared five tracks: brand + features(2) + support + legal. Removing the
  features column while the site is parked left three items in five tracks, which
  does not collapse — it leaves two empty columns and pushes the two lists that
  remain into the middle of the row with the brand block stranded from them.

  A track per section, two for a section wide enough to flow (those carry
  `lg:col-span-2`), and the brand block's 1.6. It travels as a custom property
  because Tailwind cannot generate an arbitrary class it never sees in source, and
  an inline style cannot carry the `lg` breakpoint on its own.
*/
  const footerCols = ['1.5fr', ...sections.map(() => '1fr')].join(' ');

  return (
    <footer className="site-footer border-t border-border-subtle bg-surface-raised">
      <Container>
        <div className="py-12 lg:py-20">
          {/*
        Mobile (< 640px):   single column stack
        Tablet (640-1023px): brand full-width row, then link cols side by side
        Desktop (1024px+):   brand (2fr) + link cols (1fr each) in one row
      */}
          <div
            className="footer-grid grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12"
            style={styleOf(`--footer-cols: ${footerCols}`)}
          >
            {/* Brand Column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <a
                href={withBase('/')}
                className="mb-5 inline-flex min-h-11 w-fit cursor-pointer items-center gap-2.5 rounded-lg py-1.5 focus-visible:focus-ring"
              >
                <Logo size="md" /> <span className="text-body-lg font-bold text-text-primary">{site.name}</span>
              </a>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-pretty text-text-secondary">
                {t('footer.tagline')}
              </p>
              <StoreBadges className="flex-row flex-wrap" />
            </div>
            {/*
          Link Columns.

          A list longer than four flows in TWO sub-columns and takes a wider cell.
          `Features` carries seven links, `Support` one and `Legal` three, so at
          equal widths the footer was a seven-row column beside a one-row column
          beside a three-row column, with the brand block and two of the three
          lists ending in mid-air. Flowed, the tall list is four rows instead of
          seven and the whole row finishes within one line of itself.
        */}
            {sections.map((section: any) => (
              <div key={String(section.title)} className="col-span-1">
                <h2 className="mb-4 text-sm font-semibold tracking-label text-text-primary uppercase">
                  {section.href ? (
                    <a
                      href={resolveHref(section.href, pathname)}
                      className="inline-flex min-h-[44px] items-center rounded py-1.5 transition-colors hover:text-gold focus-visible:focus-ring"
                    >
                      {sectionTitle(section.title)}
                    </a>
                  ) : (
                    sectionTitle(section.title)
                  )}
                </h2>
                <ul className="space-y-1">
                  {section.links.map((link: FooterLink) => (
                    <li key={link.href}>
                      <a
                        href={resolveHref(link.href, pathname)}
                        rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
                        className="footer-link inline-flex min-h-[44px] cursor-pointer items-center rounded py-2 text-sm text-text-secondary hover:text-text-primary active:text-gold focus-visible:focus-ring"
                      >
                        {getLocalizedFooterLinkLabel(link)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Bar */}
        {/* footer-safe-bottom (defined in global.css) overrides py-6's padding-bottom on notched devices. */}
        <div className="footer-safe-bottom flex flex-col items-center gap-6 border-t border-border-subtle py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <p className="text-sm text-text-tertiary">
              {`© ${new Date().getFullYear()} ${site.name}. ${t('footer.rights')}`}
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-text-tertiary">{t('footer.trademark_notice')}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0" aria-label={t('footer.aria_channels')}>
            {site.socials.map((social) => (
              <Button
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                aria-label={t('footer.social_aria', { name: site.name, label: social.label, handle: social.handle })}
                title={t('footer.social_title', { label: social.label, handle: social.handle })}
                className="h-11 w-11 shrink-0 p-0"
              >
                <Icon name={social.id} size={18} />
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
