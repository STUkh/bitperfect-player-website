import { cn } from '../lib/site';
import { asset } from '../lib/asset';

export interface LogoProps {
  /** `sm` 24px, `md` 32px (header), `lg` 40px. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Empty by default: beside the wordmark the mark is decorative. */
  alt?: string;
}

const sizeMap = { sm: 'h-6 w-6', md: 'h-8 w-8', lg: 'h-10 w-10' };

/** The Bitperfect mark (brand/logo.svg). Pair it with the "Bitperfect Player" wordmark in body-lg bold. */
export function Logo({ size = 'md', className, alt = '' }: LogoProps) {
  return (
    <img
      src={asset('brand/logo.svg')}
      alt={alt}
      width={32}
      height={32}
      loading="eager"
      decoding="async"
      className={cn(sizeMap[size], className)}
    />
  );
}
