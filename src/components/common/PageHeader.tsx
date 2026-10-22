import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import BackLink from '../sections/BackLink';
import Container from '../primitives/Container';
import './PageHeader.css';

/**
 * The top band of an inner page, on a brushed-metal ground: an optional back link,
 * meta, eyebrow, the page `h1` and a description, with any extra content (a search
 * field, actions) below. Use once per page, directly under the Header.
 */
export interface PageHeaderProps {
  /** Extra content under the description (a search field, buttons, a date row). */
  children?: ReactNode;
  /** Content above the eyebrow (Astro's `slot="meta"`), e.g. a "Last updated" line. */
  meta?: ReactNode;
  /** Small gold uppercase label above the title. */
  eyebrow?: string;
  /** The page title (the `h1`). */
  title: string;
  /** One or two sentences under the title, capped at 68 characters wide. */
  description: string;
  /** `wide` drops the centred column and aligns to the Container edge, for
   *  pages whose body is a sidebar grid (FAQ, like the legal pages). Default `840px`. */
  maxWidth?: '760px' | '840px' | 'wide';
  /** Destination of the back link above the title; it shows only with `backLabel` too. */
  backHref?: string;
  /** Text of the back link, e.g. "Back to Features". */
  backLabel?: string;
}

/** The inner-page title band; see `PageHeaderProps`. */
export default function PageHeader(props: PageHeaderProps) {
  const { eyebrow, title, description, maxWidth = '840px', backHref, backLabel, meta, children } = props;

  const maxWidthClass =
    maxWidth === 'wide' ? 'max-w-[840px] lg:mx-0' : maxWidth === '760px' ? 'max-w-[760px]' : 'max-w-[840px]';

  return (
    <section className="ground ground-brushed border-b border-border-subtle/50 overhead-wash pt-10 pb-12 lg:pt-16 lg:pb-16">
      <Container>
        <div className={cx(['mx-auto', maxWidthClass])}>
          {backHref && backLabel && <BackLink href={backHref} label={backLabel} tone="graphite" className="mb-4" />}
          {meta}
          {eyebrow && (
            <span className="mono-spec block text-eyebrow text-gold uppercase tracking-widest">{eyebrow}</span>
          )}
          <h1
            className={cx([
              'text-section-m lg:text-headline-sm font-bold text-text-primary text-balance',
              eyebrow ? 'mt-3' : 'mt-4',
            ])}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-[68ch] text-body text-pretty text-text-secondary lg:text-body-lg leading-relaxed">
            {description}
          </p>
          {children}
        </div>
      </Container>
    </section>
  );
}
