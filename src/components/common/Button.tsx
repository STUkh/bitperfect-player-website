import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { styleOf, type ClassProps, type StyleInput } from '../class-props';

type NativeProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'>;

export interface ButtonProps extends NativeProps, ClassProps {
  /** An object from React; CSS text (`"--i: 2"`) from an `.astro` caller. */
  style?: StyleInput;
  /** `primary` is the machined gold key-cap, `secondary` the glass pill, `outline` the gold hairline. */
  variant?: 'primary' | 'secondary' | 'outline';
  /** With an `href` it renders an `<a>`, otherwise a `<button>`. */
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

/* One focus treatment for the whole site: the `focus-ring` utility in
   global.css. Never a second, hand-rolled outline. */
const baseStyles =
  'inline-flex items-center justify-center font-semibold rounded-full cursor-pointer focus-visible:focus-ring select-none';

const sizeStyles = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-base',
  lg: 'px-9 py-4 text-body-lg',
};

const variantStyles = {
  primary: 'btn-primary-gradient',
  secondary:
    'btn-secondary-glow bg-white/10 text-white/90 hover:text-white hover:bg-white/18 active:bg-white/10 border border-white/12 hover:border-white/28',
  outline:
    'bg-transparent text-gold border border-gold/75 hover:border-gold hover:text-gold-light hover:bg-gold/10 hover:-translate-y-0.5 active:translate-y-0 active:bg-gold/16 transition-all duration-[var(--d-ui)] ease-ui',
};

/**
 * THE button: one full-radius chassis in three variants. Use `primary` for the
 * one main action in a band (the install), `secondary` beside it, `outline` on
 * its own on graphite.
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
