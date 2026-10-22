import { BackLink, Surface } from '@bitperfect/website-ds';

export function Graphite() {
  return (
    <Surface className="p-10">
      <BackLink href="#" label="Back to features" />
    </Surface>
  );
}

export function Ivory() {
  return (
    <Surface tone="ivory" className="p-10">
      <BackLink href="#" label="All 27 capabilities" tone="ivory" />
    </Surface>
  );
}
