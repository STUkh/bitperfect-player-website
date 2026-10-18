import { TechnicalCatalog } from '@bitperfect/website-ds';

export function Default() {
  return <TechnicalCatalog id="all-capabilities" />;
}

export function FilteredToStreaming() {
  return <TechnicalCatalog id="all-capabilities" defaultFilter="streaming" />;
}

export function FilteredToHardware() {
  return <TechnicalCatalog id="all-capabilities" defaultFilter="hardware" />;
}
