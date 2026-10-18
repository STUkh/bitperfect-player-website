import { Button } from '@bitperfect/website-ds';

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

export function FullWidthLarge() {
  return (
    <div className="w-full max-w-[420px]">
      <Button href="#" size="lg" className="w-full">Claim Founder Offer</Button>
    </div>
  );
}
