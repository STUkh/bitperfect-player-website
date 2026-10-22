import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { styleOf, type ClassProps, type StyleInput } from '../class-props';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>, ClassProps {
  /** Element to render. Defaults to `div`; pass `a` with an `href` for a linked card. */
  as?: ElementType;
  /** Destination when `as="a"`. */
  href?: string;
  /** An object from React; CSS text (`"--i: 2"`) from an `.astro` caller. */
  style?: StyleInput;
  /** The card's content. Padding is the caller's: pass it in `className`. */
  children?: ReactNode;
}

/**
 * THE lacquered card chassis: `rounded-card-sm` stepping up to `rounded-card` at
 * `lg`, the lacquer surface (src/styles/lacquer.css: diagonal wash, specular rim,
 * sheen). Padding, shadow and hover are the caller's, so a card differs from
 * another by its classes, never by a new component. Add `lacquer-gold` for the
 * gold-rimmed variant (the Founder plan only) and `lacquer-lift` for a card that
 * rises a hair and brightens its sheen on hover.
 */
export default function Card({ as: Tag = 'div', className, style, children, ...rest }: CardProps) {
  return (
    <Tag
      className={cn('lacquer rounded-card-sm lg:rounded-card', className)}
      style={styleOf(style)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
