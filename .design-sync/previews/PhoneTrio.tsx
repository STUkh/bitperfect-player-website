import { PhoneTrio } from '@bitperfect/website-ds';

export function Default() {
  return <PhoneTrio priority />;
}

export function CastingLineup() {
  return <PhoneTrio leftScreen="receiver" centerScreen="cast" rightScreen="signal-path" />;
}

export function OutputLineup() {
  return <PhoneTrio leftScreen="output" centerScreen="now-playing-hero" rightScreen="dsp" />;
}
