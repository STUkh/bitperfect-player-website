import { PagerPair } from '@bitperfect/website-ds';

export function Default() {
  return (
    <PagerPair
      ariaLabel="More features"
      prev={{ href: '#', label: 'Previous', title: 'Direct USB DAC output' }}
      next={{ href: '#', label: 'Next', title: 'Local library' }}
    />
  );
}
