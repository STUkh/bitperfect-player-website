import type { ReactNode, ElementType } from 'react';
import { cn } from '../lib/site';

export interface ContainerProps {
  /** Extra classes; tailwind-merge lets a `lg:px-N` here replace the default gutter. */
  className?: string;
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  children?: ReactNode;
}

/**
 * The page column: max-w-7xl (1280px) centred, 20px gutter on phones, 32px at
 * `sm`, 80px from `lg`. Every band's content sits in one, so header, footer and
 * content share one grid.
 */
export function Container({ className, as: Tag = 'div', children }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-20', className)}>{children}</Tag>;
}
