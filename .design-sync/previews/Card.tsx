import { Card } from '@bitperfect/website-ds';

export function Default() {
  return (
    <div className="bg-surface-base p-8">
      <Card className="max-w-[420px] p-[22px] lg:p-8">
        <p className="text-title-sm font-semibold tracking-[-0.01em] text-text-primary">Every sample, untouched</p>
        <p className="mt-2 text-body-sm text-text-secondary">The chassis is the card; padding and shadow are the caller's classes.</p>
      </Card>
    </div>
  );
}

export function Linked() {
  return (
    <div className="bg-surface-base p-8">
      <Card
        as="a"
        href="#"
        className="block max-w-[420px] cursor-pointer p-[22px] hover:border-glass-border-hover hover:bg-white/[0.025] lg:p-8"
      >
        <p className="text-body-lg font-semibold tracking-[-0.01em]-lg text-text-primary">A linked card</p>
        <p className="mt-2 text-body-sm text-text-secondary">as="a" with an href.</p>
      </Card>
    </div>
  );
}
