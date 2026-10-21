import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import Container from './Container';

export interface PageHeaderProps {
  children?: ReactNode;
  /** Above the eyebrow (Astro's `slot="meta"`). */
  meta?: ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  /** `wide` drops the centred column and aligns to the Container edge, for
   *  pages whose body is a sidebar grid (FAQ, like the legal pages). */
  maxWidth?: '760px' | '840px' | 'wide';
  backHref?: string;
  backLabel?: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const { eyebrow, title, description, maxWidth = '840px', backHref, backLabel, meta, children } = props;

  const maxWidthClass =
    maxWidth === 'wide' ? 'max-w-[840px] lg:mx-0' : maxWidth === '760px' ? 'max-w-[760px]' : 'max-w-[840px]';

  return (
    <section className="ground ground-brushed border-b border-border-subtle/50 overhead-wash pt-10 pb-12 lg:pt-16 lg:pb-16">
      <Container>
        <div className={cx(['mx-auto', maxWidthClass])}>
          {backHref && backLabel && (
            <a
              href={backHref}
              className="mb-4 inline-flex items-center gap-1.5 min-h-[44px] rounded text-caption font-medium text-text-tertiary transition-colors duration-[var(--d-ui)] hover:text-gold focus-visible:focus-ring"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>{' '}
              <span>{backLabel}</span>
            </a>
          )}
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
          <p className="mt-4 text-body text-pretty text-text-secondary lg:text-body-lg leading-relaxed">
            {description}
          </p>
          {children}
        </div>
      </Container>
    </section>
  );
}
