import { PhoneShowcase } from '@bitperfect/website-ds';

/* On the home page it shares one ground with HeroSection: wrap both in
   `.hero-showcase-zone` and pass withZone={false} / ground={false}. */

export function Default() {
  return <PhoneShowcase />;
}

export function SignalPathLineup() {
  return <PhoneShowcase farScreen="output" midScreen="signal-path" anchorScreen="track-info" />;
}

export function CastingLineup() {
  return <PhoneShowcase farScreen="receiver" midScreen="cast" anchorScreen="cast-sheet" />;
}
