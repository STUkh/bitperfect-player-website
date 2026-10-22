import type { ReactNode } from 'react';
import Icon from '../Icon';
import { useBehaviour } from '../behaviour';
import { setupLegalDocument } from './LegalDocument.client';
import './LegalDocument.css';

/**
 * The shell both legal routes render: a sticky section index on the left, the
 * rendered markdown on the right, and a build-time banner when the source
 * document still carries an unfilled placeholder.
 *
 * It lives here rather than in each page because /privacy and /terms are the
 * same document type twice. When it sat inline in `privacy.astro`, adding
 * `/terms` meant a second copy of three hundred lines of the same CSS — the
 * only kind of copy that can drift.
 *
 * Its behaviour is `setupLegalDocument`: the index collapses on phones and marks
 * the section being read. On the site `LegalDocument.astro` mounts it (the
 * collapse inline, before first paint), in React `useBehaviour` does.
 */
export interface LegalDocumentProps {
  /** The rendered markdown body: `h2` sections with `id`s matching `headings`. */
  children?: ReactNode;
  /** `getHeadings()` from the imported markdown module. Only `depth: 2` entries become index links; a leading "1. " is stripped from the label. */
  headings: { depth: number; slug: string; text: string }[];
  /** Placeholder tokens still present in the source (e.g. `["[LEGAL ENTITY NAME]"]`), detected by the caller. Any entry shows the "Not yet publishable" banner. Default none. */
  unresolved?: string[];
  /** Repo path of the markdown, named in the banner so the gap is fixable. */
  source: string;
}

export default function LegalDocument(props: LegalDocumentProps) {
  const { headings, unresolved = [], source, children } = props;
  const ref = useBehaviour<HTMLDivElement>(setupLegalDocument);

  /** Top-level sections only: the index is for wayfinding, not an outline. */
  const sections = headings.filter((h) => h.depth === 2);

  return (
    <div ref={ref} className="legal-grid">
      {/* Left Navigation Sidebar */}
      <aside className="legal-toc-wrapper">
        {/*
      `open` in the MARKUP, closed on phones by the inline script below.

      Open is the correct no-JS state and the only correct desktop state, where
      this is not a disclosure at all but a sticky sidebar. On a phone it is a
      disclosure sitting above the document, and the Terms of Use has 21
      sections: expanded, it puts about 1800px of index between the visitor and
      the first line of the agreement they came to read. The privacy policy's
      nine sections hid the problem; the second document surfaced it.
    */}
        <details className="legal-toc-details lacquer" open>
          <summary className="legal-toc-summary focus-visible:focus-ring">
            <span className="legal-toc-title">Table of Contents</span>{' '}
            <svg
              className="legal-toc-chevron h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <nav className="legal-toc" aria-label="Sections">
            <ul>
              {sections.map((h) => (
                <li>
                  <a href={`#${h.slug}`} className="legal-toc-link focus-visible:focus-ring">
                    {h.text.replace(/^\d+\.\s*/, '')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </aside>
      {/* Main Content Column */}
      <div className="md-content">
        {unresolved.length > 0 && (
          <div className="legal-notice" role="note">
            <span className="text-resampled">
              <Icon name="sig-resampled" size={20} />
            </span>
            <p>
              <strong>Not yet publishable.</strong> This document still contains{' '}
              {unresolved.map((p, i) => (
                <>
                  {i > 0 && ' and '}
                  <code>{p}</code>
                </>
              ))}{' '}
              . Fill {unresolved.length > 1 ? 'them' : 'it'} in at <code>{source}</code> before submitting this URL to a
              store console: a legal document with no effective date or contact address will not pass review.
            </p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
