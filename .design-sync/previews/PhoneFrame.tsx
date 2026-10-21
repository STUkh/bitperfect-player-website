import { PhoneFrame, PhoneScreen } from '@bitperfect/website-ds';

export function WithScreen() {
  return (
    <div className="flex justify-center p-10">
      <PhoneFrame>
        <PhoneScreen name="eq-filters" />
      </PhoneFrame>
    </div>
  );
}

export function FillParent() {
  return (
    <div style={{ width: 220 }}>
      <PhoneFrame fill>
        <PhoneScreen name="cast" />
      </PhoneFrame>
    </div>
  );
}

export function EmptyScreen() {
  return (
    <div className="flex justify-center p-10">
      <PhoneFrame />
    </div>
  );
}
