import { Logo } from '@bitperfect/website-ds';

export function Sizes() {
  return (
    <div className="flex items-center gap-6">
      <Logo size="sm" />
      <Logo size="md" />
      <Logo size="lg" />
    </div>
  );
}

export function WithWordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size="md" />
      <span className="text-body-lg font-bold whitespace-nowrap text-text-primary">Bitperfect Player</span>
    </div>
  );
}
