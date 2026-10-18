import { PhoneFrame, PhoneScreen } from '@bitperfect/website-ds';

export function Default() {
  return (
    <div className="flex justify-center p-10">
      <PhoneFrame screen="eq-filters" />
    </div>
  );
}

export function WithChildScreen() {
  return (
    <PhoneFrame>
      <PhoneScreen name="library" />
    </PhoneFrame>
  );
}

export function FillParent() {
  return (
    <div style={{ width: 220 }}>
      <PhoneFrame fill screen="cast" idPrefix="preview-fill" />
    </div>
  );
}

export function DarkTitanium() {
  return (
    <div className="flex justify-center p-10">
      <PhoneFrame screen="output" phoneColor="#3A3836" idPrefix="preview-dark" />
    </div>
  );
}

export function EmptyScreen() {
  return <PhoneFrame idPrefix="preview-empty" />;
}
