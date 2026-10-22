import { StoreBadges } from '@bitperfect/website-ds';

export function GooglePlay() {
  return <div className="p-6"><StoreBadges size="md" /></div>;
}

export function Small() {
  return <div className="p-6"><StoreBadges size="sm" /></div>;
}

export function Large() {
  return <div className="p-6"><StoreBadges size="lg" /></div>;
}

export function IconOnly() {
  return <div className="p-6"><StoreBadges size="icon" /></div>;
}
