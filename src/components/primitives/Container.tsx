import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { ClassProps } from '../_lib/class-props';

export interface ContainerProps extends ClassProps {
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  /** The band's content. */
  children?: ReactNode;
}

/**
 * The page column: `max-w-7xl` (1280px) centred, a 20px gutter on phones and
 * 32px from `sm`. Every band's content sits in one, so header, footer and
 * content share one grid. Extra classes go through tailwind-merge, so a `px-*`
 * here replaces the default gutter rather than fighting it.
 */
export default function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>{children}</Tag>;
}
