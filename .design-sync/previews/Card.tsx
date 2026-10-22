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
        className="block max-w-[420px] cursor-pointer p-[22px] lacquer-lift lg:p-8"
      >
        <p className="text-body-lg font-semibold tracking-[-0.01em] text-text-primary">A linked card</p>
        <p className="mt-2 text-body-sm text-text-secondary">as="a" with an href.</p>
      </Card>
    </div>
  );
}

/* The gold-rimmed variant: the Founder plan only. */
export function LacquerGold() {
  return (
    <div className="bg-surface-base p-8">
      <Card className="lacquer-gold max-w-[420px] p-[22px] lg:p-8">
        <p className="text-title-sm font-semibold tracking-[-0.01em] text-text-primary">Founder plan</p>
        <p className="mt-2 text-body-sm text-text-secondary">The one card that wears the gold rim.</p>
      </Card>
    </div>
  );
}

/* Cards that answer hover with light (lacquer-lift), side by side. */
export function Lift() {
  return (
    <div className="grid gap-5 bg-surface-base p-8 sm:grid-cols-2">
      {['Bit-perfect output', 'Parametric EQ'].map((t) => (
        <Card key={t} className="lacquer-lift p-[22px] lg:p-8">
          <p className="text-title-sm font-semibold tracking-[-0.01em] text-text-primary">{t}</p>
          <p className="mt-2 text-body-sm text-text-secondary">Hover: it rises a hair and the sheen brightens.</p>
        </Card>
      ))}
    </div>
  );
}
