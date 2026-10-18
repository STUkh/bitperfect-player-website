import { MobileMenu } from '@bitperfect/website-ds';

export function Open() {
  return (
    <div style={{ width: 390 }}>
      <MobileMenu open position="static" hideOnDesktop={false} />
    </div>
  );
}

export function OnFeaturesRoute() {
  return (
    <div style={{ width: 390 }}>
      <MobileMenu open position="static" hideOnDesktop={false} currentPath="/features" />
    </div>
  );
}
