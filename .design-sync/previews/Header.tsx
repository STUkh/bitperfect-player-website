import { Header } from '@bitperfect/website-ds';

export function Default() {
  return <Header position="static" />;
}

export function OnPrivacy() {
  return <Header position="static" currentPath="/privacy" />;
}

export function FeaturesPanelOpen() {
  return (
    <div style={{ minHeight: 520 }}>
      <Header position="static" defaultFeaturesOpen currentPath="/features/eq" />
    </div>
  );
}
