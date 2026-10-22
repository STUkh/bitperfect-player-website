import { PlayCta } from '@bitperfect/website-ds';

/* No `label`: the default is the store line, "Get it on Google Play". */
export function Default() {
  return <PlayCta size="lg" />;
}

export function Medium() {
  return <PlayCta label="Claim Founder Offer" size="md" />;
}

export function Secondary() {
  return <PlayCta label="View on Google Play" variant="secondary" size="md" />;
}

export function Small() {
  return <PlayCta label="Get it on Google Play" size="sm" />;
}

export function Outline() {
  return <PlayCta label="View on Google Play" variant="outline" size="md" />;
}
