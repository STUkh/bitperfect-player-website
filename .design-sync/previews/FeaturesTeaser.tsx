import { FeaturesTeaser } from '@bitperfect/website-ds';

export function Default() {
  return <FeaturesTeaser />;
}

export function ThreeCards() {
  return (
    <FeaturesTeaser
      heading="The three things that change what you hear"
      items={[
        { slug: 'usb-dac', title: 'Direct USB DAC output', desc: 'Your DAC at the file’s native rate, past the Android mixer.', href: '/features/usb-dac' },
        { slug: 'eq', title: '32-band parametric EQ', desc: 'Precise tone control with a one-tap bypass.', href: '/features/eq' },
        { slug: 'ai-enhancer', title: 'AI Enhancer', desc: 'On-device restoration for lossy tracks.', href: '/features/ai-enhancer' },
      ]}
    />
  );
}
