import type { ReactNode } from 'react';
import { cx } from '../lib/site';

export interface SurfaceProps {
  /** `graphite` = the site's page ground (#191919, primary text); `ivory` = a white light band with band ink. */
  tone?: 'graphite' | 'ivory';
  className?: string;
  children?: ReactNode;
}

/**
 * The page ground every site component sits on: graphite with white-ish text,
 * as the site's <body> sets it. Wrap a page (or a loose component in a mockup)
 * in it so dark-band pieces read correctly; bands that carry their own ground
 * (StatementBand, CTASection, Footer...) paint over it.
 */
export function Surface({ tone = 'graphite', className, children }: SurfaceProps) {
  return (
    <div className={cx(tone === 'graphite' ? 'bg-surface-base text-text-primary' : 'bg-band-ivory text-band-ink', 'font-sans', className)}>
      {children}
    </div>
  );
}
