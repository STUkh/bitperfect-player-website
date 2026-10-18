import { Surface, Button } from '@bitperfect/website-ds';

export function Graphite() {
  return (
    <Surface className="p-10">
      <p className="text-eyebrow text-gold">Page ground</p>
      <p className="mt-3 text-body text-text-secondary">Graphite #191919, never black. Dark-band components sit here.</p>
      <div className="mt-6"><Button href="#">Get it on Google Play</Button></div>
    </Surface>
  );
}

export function Ivory() {
  return (
    <Surface tone="ivory" className="p-10">
      <p className="text-eyebrow text-band-gold-ink">Light band</p>
      <p className="mt-3 text-body text-band-ink-muted">White paper with band ink. Never dark text tokens outside it.</p>
    </Surface>
  );
}
