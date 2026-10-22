import { Button, PlayCta } from '@bitperfect/website-ds';

export function Primary() {
  return <Button href="#">Get it on Google Play</Button>;
}

export function PrimaryAndSecondary() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button href="#">Get it on Google Play</Button>
      <Button href="#" variant="secondary">See what it does</Button>
    </div>
  );
}

export function Outline() {
  return <Button href="#" variant="outline">View on Google Play</Button>;
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button href="#" size="sm">Small</Button>
      <Button href="#" size="md">Medium</Button>
      <Button href="#" size="lg">Large</Button>
    </div>
  );
}

export function SecondarySizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button href="#" variant="secondary" size="sm">Small</Button>
      <Button href="#" variant="secondary" size="md">Medium</Button>
      <Button href="#" variant="secondary" size="lg">Large</Button>
    </div>
  );
}

/* The install is PlayCta (Button plus the Play mark), never a hand-built button. */
export function WithPlayCta() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <PlayCta label="Get it on Google Play" size="lg" />
      <Button href="#" variant="secondary" size="lg">Read the FAQ</Button>
    </div>
  );
}

export function FullWidthLarge() {
  return (
    <div className="w-full max-w-[420px]">
      <Button href="#" size="lg" className="w-full">Claim Founder Offer</Button>
    </div>
  );
}
