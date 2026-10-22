import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { styleOf, type ClassProps, type StyleInput } from '../_lib/class-props';
import './Button.css';

type NativeProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'>;

export interface ButtonProps extends NativeProps, ClassProps {
  /** An object from React; CSS text (`"--i: 2"`) from an `.astro` caller. */
  style?: StyleInput;
  /**
   * `primary` (default) is the machined gold key-cap: the install, one per band.
   * `secondary` is the lacquered graphite key-cap, for every other action and for
   * store badges. `outline` is a gold hairline on a transparent ground, colour-only hover.
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /** With an `href` it renders an `<a>`, otherwise a `<button>`. */
  href?: string;
  /** `sm` (px-5 py-2, 14px), `md` (default, px-7 py-3, 16px), `lg` (px-9 py-4, large type). */
  size?: 'sm' | 'md' | 'lg';
  /** The label, optionally with a leading icon (children sit on a `gap-2.5` row). Never an arrow or chevron. */
  children?: ReactNode;
}

/* One focus treatment for the whole site: the `focus-ring` utility in
   global.css. Never a second, hand-rolled outline. */
const baseStyles =
  'inline-flex items-center justify-center gap-2.5 font-semibold rounded-full cursor-pointer focus-visible:focus-ring select-none';

const sizeStyles = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-base',
  lg: 'px-9 py-4 text-body-lg',
};

const variantStyles = {
  primary: 'btn-primary-gradient',
  secondary:
    'btn-secondary-glow bg-glass-surface text-text-secondary border border-border-subtle hover:text-text-primary hover:border-glass-border-hover',
  outline:
    'bg-transparent text-gold border border-gold/75 hover:border-gold hover:text-gold-light hover:bg-gold/10 active:bg-gold/16 transition-all duration-[var(--d-ui)] ease-ui',
};

/**
 * THE button: one full-radius chassis in three variants and three sizes. Use
 * `primary` for the one main action in a band (the install), `secondary` beside
 * it, `outline` on its own on graphite. It is stationary on hover and press (light
 * only), carries no arrow or chevron, and for the Google Play install use `PlayCta`.
 * Extra `className` is merged with tailwind-merge, so `w-full` and the like win.
 */
export default function Button({ variant = 'primary', href, size = 'md', className, style, children, ...rest }: ButtonProps) {
  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} className={classes} style={styleOf(style)} {...rest}>
      {children}
    </Tag>
  );
}
