import type { ReactNode, AnchorHTMLAttributes } from 'react';
import { cn } from '../lib/site';

export interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'type'> {
  /** `primary` = machined gold key-cap; `secondary` = glass pill; `outline` = gold hairline. */
  variant?: 'primary' | 'secondary' | 'outline';
  /** With an href it renders an `<a>`, otherwise a `<button>`. */
  href?: string;
  /** `md` is the 54px pill (52px below lg). `lg` is the full-width action at 54/56. */
  size?: 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  /** Layout only (width, margins). The chassis is not overridable. */
  className?: string;
  children?: ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold cursor-pointer focus-visible:focus-ring';

const sizeStyles = {
  md: 'h-[52px] text-body-sm lg:h-[54px]',
  lg: 'h-[54px] text-base lg:h-14',
};

const padStyles = {
  md: { primary: 'px-7 lg:px-[30px]', secondary: 'px-6 lg:px-[26px]', outline: 'px-6 lg:px-[26px]' },
  lg: { primary: 'px-8 lg:px-9', secondary: 'px-8 lg:px-9', outline: 'px-8 lg:px-9' },
};

const variantStyles = {
  primary: 'btn-primary-gradient text-on-gold',
  secondary:
    'btn-secondary-glow border border-border-subtle bg-glass-surface text-text-secondary hover:border-glass-border-hover hover:bg-glass-elevated-surface hover:text-text-primary active:bg-surface-raised',
  outline:
    'bg-transparent text-gold border border-gold hover:bg-gold/10 hover:text-gold-light active:bg-gold/16 transition-[background-color,color] duration-[var(--d-ui)] ease-ui',
};

/**
 * THE button: one full-radius chassis in three variants. Use `primary` for the
 * one main action in a band (the install), `secondary` beside it, `outline`
 * on its own on graphite.
 */
export function Button({ variant = 'primary', href, size = 'md', type, className, children, ...rest }: ButtonProps) {
  const classes = cn(baseStyles, sizeStyles[size], padStyles[size][variant], variantStyles[variant], className);
  if (href) return <a href={href} className={classes} {...rest}>{children}</a>;
  return <button type={type ?? 'button'} className={classes} {...(rest as object)}>{children}</button>;
}
