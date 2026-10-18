import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cx, t, scope } from '../lib/site';

export interface LegalHeading {
  /** Markdown heading level; only level 2 is listed in the index. */
  depth: number;
  /** The heading's id (the anchor the index links to). */
  slug: string;
  /** Heading text; a leading "1. " section number is dropped in the index. */
  text: string;
}

export interface LegalDocumentProps {
  /** The rendered document: `<h2 id="...">` sections, paragraphs, lists, tables. */
  children?: ReactNode;
  /** The same as an HTML string (rendered markdown), used when `children` is not given. */
  html?: string;
  /** Index entries. Default: read from the body's `h2[id]` headings after it renders. */
  headings?: LegalHeading[];
  /** Slug of the index entry shown as the current section (gold rail). None by default. */
  activeSlug?: string;
  /** Index disclosure state below lg (from lg it is a sidebar and always open). Open by default, the no-JS state; `false` is what a phone visitor sees on the live site. */
  tocOpen?: boolean;
  /** Wrap in `article.prose-legal`, the typography the legal pages give the body. Turn off when the page already provides it. */
  prose?: boolean;
}

const S = scope('p7tv7n7s');

/**
 * The legal page shell (Privacy Policy, Terms of Use): a sticky section index
 * on the left and the document on the right; below lg the index becomes a
 * disclosure above the text. Place it under the page's h1 and "last updated"
 * line, between Header and Footer.
 */
export function LegalDocument({ children, html, headings, activeSlug, tocOpen = true, prose = true }: LegalDocumentProps) {
  const body = useRef<HTMLDivElement>(null);
  const [found, setFound] = useState<LegalHeading[]>([]);
  const [open, setOpen] = useState(tocOpen);

  // Like the site: from lg the index is a sidebar, never a closed disclosure.
  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const sync = () => setOpen(tocOpen || desktop.matches);
    sync();
    desktop.addEventListener('change', sync);
    return () => desktop.removeEventListener('change', sync);
  }, [tocOpen]);
  useLayoutEffect(() => {
    if (headings || !body.current) return;
    setFound(
      Array.from(body.current.querySelectorAll<HTMLElement>('h2[id]')).map((h) => ({
        depth: 2,
        slug: h.id,
        text: h.textContent ?? '',
      })),
    );
  }, [headings, children, html]);

  /** Top-level sections only: the index is for wayfinding, not an outline. */
  const sections = (headings ?? found).filter((h) => h.depth === 2);

  const grid = (
    <div className="legal-grid" {...S}>
      <aside className="toc-wrapper" {...S}>
        <details
          className="toc-details"
          open={open}
          onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
          {...S}
        >
          <summary className="toc-summary focus-visible:focus-ring" {...S}>
            <span className="toc-title" {...S}>{t('legal.table_of_contents')}</span>
            <svg
              className="toc-chevron h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              {...S}
            >
              <path d="M19 9l-7 7-7-7" {...S} />
            </svg>
          </summary>
          <nav className="toc" aria-label={t('legal.sections')} {...S}>
            <ul {...S}>
              {sections.map((h) => (
                <li key={h.slug} {...S}>
                  <a href={`#${h.slug}`} className={cx('toc-link focus-visible:focus-ring', h.slug === activeSlug && 'is-active')} {...S}>
                    {h.text.replace(/^\d+\.\s*/, '')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </aside>

      {children !== undefined ? (
        <div ref={body} className="md-content" {...S}>{children}</div>
      ) : (
        <div ref={body} className="md-content" dangerouslySetInnerHTML={{ __html: html ?? '' }} {...S} />
      )}
    </div>
  );

  return prose ? <article className="prose-legal">{grid}</article> : grid;
}
