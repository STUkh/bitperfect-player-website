import { footerLinks } from '@site/data/navigation';
import { site } from '@site/data/site';
import { Container } from './Container';
import { Logo } from './Logo';
import { StoreBadges } from './StoreBadges';
import { t, resolveHref, withBase, scope } from '../lib/site';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  /** Column heading (uppercase label); links to `href` when one is given. */
  title: string;
  href?: string;
  links: readonly FooterLink[];
}

export interface FooterProps {
  /** Current route: resolves hash links like "/faq#need-external-dac" the way the site does. Default "/". */
  currentPath?: string;
  /** Line under the wordmark in the brand column. */
  tagline?: string;
  /** Link columns beside the brand column. Default: the site's Features, FAQ, Releases and Legal & Support. */
  sections?: readonly FooterSection[];
  /** Copyright year. Default: the current year. */
  year?: number;
}

const S = scope('l3trhy4j');

const sectionTitle = (title: string) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const key = `footer.${slug}` as never;
  const translated = t(key);
  return translated && translated !== key ? translated : title;
};
const linkLabel = (link: FooterLink) => {
  if (link.href === '/faq') return t('footer.all_questions');
  if (link.href === '/changelog') return t('footer.all_releases');
  if (link.href === '/privacy') return t('footer.privacy_policy');
  if (link.href === '/terms') return t('footer.terms_of_use');
  if (
    link.href.startsWith('mailto:') ||
    link.label === 'Email support' ||
    link.label === 'Email Support' ||
    link.label === 'Contact Support'
  ) {
    return t('footer.email_support');
  }
  if (link.label === 'Google Play') return t('store.google_play');
  return link.label;
};
const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * The site footer on raised graphite: brand column (mark, wordmark, tagline,
 * Google Play badge) beside one link column per section, then a hairline and
 * the copyright and trademark notice. Place it once at the foot of every page,
 * after the last band.
 */
export function Footer({
  currentPath = '/',
  tagline = t('footer.tagline'),
  sections = Object.values(footerLinks),
  year = new Date().getFullYear(),
}: FooterProps) {
  const footerCols = ['1.5fr', ...sections.map(() => '1fr')].join(' ');
  return (
    <footer className="border-t border-border-subtle bg-surface-raised" {...S}>
      <Container>
        <div className="py-12 lg:py-20" {...S}>
          <div
            className="footer-grid grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12"
            style={{ '--footer-cols': footerCols } as React.CSSProperties}
            {...S}
          >
            <div className="col-span-2 sm:col-span-3 lg:col-span-1" {...S}>
              <a
                href={withBase('/')}
                className="mb-5 inline-flex min-h-11 w-fit cursor-pointer items-center gap-2.5 rounded-lg py-1.5 focus-visible:focus-ring"
                {...S}
              >
                <Logo size="md" />
                <span className="text-body-lg font-bold text-text-primary" {...S}>{site.name}</span>
              </a>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-pretty text-text-secondary" {...S}>
                {tagline}
              </p>
              <StoreBadges variant="dark" className="flex-row flex-wrap" />
            </div>

            {sections.map((section) => (
              <div key={section.title} className="col-span-1" {...S}>
                <h2 className="mb-4 text-sm font-semibold tracking-label text-text-primary uppercase" {...S}>
                  {section.href ? (
                    <a
                      href={resolveHref(section.href, currentPath)}
                      className="inline-flex min-h-[44px] items-center rounded py-1.5 transition-colors hover:text-gold focus-visible:focus-ring"
                      {...S}
                    >
                      {sectionTitle(section.title)}
                    </a>
                  ) : (
                    sectionTitle(section.title)
                  )}
                </h2>
                <ul className="space-y-1" {...S}>
                  {section.links.map((link) => (
                    <li key={link.href} {...S}>
                      <a
                        href={resolveHref(link.href, currentPath)}
                        rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
                        className="footer-link inline-flex min-h-[44px] cursor-pointer items-center rounded py-2 text-sm text-text-secondary hover:text-text-primary active:text-gold focus-visible:focus-ring"
                        {...S}
                      >
                        {linkLabel(link)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-safe-bottom flex flex-col items-center gap-4 border-t border-border-subtle py-6 sm:items-start" {...S}>
          <div className="flex w-full flex-col items-center gap-2 sm:items-start" {...S}>
            <p className="text-sm text-text-tertiary" {...S}>&copy; {year} {site.name}. {t('footer.rights')}</p>
            <p className="max-w-3xl text-center text-xs leading-relaxed text-text-tertiary sm:text-left" {...S}>
              {t('footer.trademark_notice')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
