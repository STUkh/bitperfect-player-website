import { PrivacyBand } from '@bitperfect/website-ds';

export function Default() {
  return <PrivacyBand />;
}

export function WithoutPlate() {
  return <PrivacyBand plate={null} />;
}
