import { FeatureScreens } from '@bitperfect/website-ds';

export function UsbDacFirstBeat() {
  return <FeatureScreens slug="usb-dac" state={0} />;
}

export function UsbDacBadgeBeat() {
  return <FeatureScreens slug="usb-dac" state={3} />;
}

export function EqFilters() {
  return <FeatureScreens slug="eq" state={1} />;
}

export function LibraryFormats() {
  return <FeatureScreens slug="library" state={2} />;
}

export function CastingReceiver() {
  return <FeatureScreens slug="casting" state={1} />;
}

export function DspGuard() {
  return <FeatureScreens slug="dsp" state={3} />;
}

export function AiEnhancerStandsDown() {
  return <FeatureScreens slug="ai-enhancer" state={2} />;
}
