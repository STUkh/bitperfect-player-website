import { StatementBand } from '@bitperfect/website-ds';

export function Default() {
  return <StatementBand />;
}

export function CustomCopy() {
  return (
    <StatementBand
      eyebrow="Who it's for"
      titleLead="Built for people who own a USB DAC."
      titleAccent="And want to hear what they paid for."
      facts={[
        { title: 'Your own files', desc: 'Lossless and hi-res formats played from the phone, a MicroSD card or a USB drive.' },
        { title: 'Straight to your DAC', desc: 'Exclusive USB access at the file’s native sample rate.' },
      ]}
    />
  );
}
