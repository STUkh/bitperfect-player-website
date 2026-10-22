import { clsx as cx } from 'clsx';
import { useTone, type Tone } from './bands';
import type { ClassProps } from '../class-props';

export interface BackLinkProps extends ClassProps {
  /** Where it goes: the parent page. */
  href: string;
  /** The text, e.g. "Back to features", "All 27 capabilities". */
  label: string;
  /** Tertiary turning gold on graphite, muted ink turning gold ink on ivory. Inherited from the enclosing `Band` in TSX. */
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  graphite: 'text-text-tertiary hover:text-gold',
  ivory: 'text-band-ink-muted hover:text-band-gold-ink',
};

/**
 * The quiet link above an opening band's title, back to the parent page: a
 * left chevron and the label, a 44px target. It is a link, so the chevron is
 * allowed (buttons never carry one). Spacing below is the caller's (`mb-4`).
 */
export default function BackLink({ href, label, className, ...props }: BackLinkProps) {
  return (
    <a
      href={href}
      className={cx(
        'inline-flex min-h-[44px] items-center gap-1.5 rounded text-caption font-medium transition-colors duration-[var(--d-ui)] focus-visible:focus-ring',
        tones[useTone(props.tone)],
        className,
      )}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>{' '}
      <span>{label}</span>
    </a>
  );
}
