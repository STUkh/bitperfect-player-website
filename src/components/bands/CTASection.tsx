import type { FlowProps } from './FlowBackdrop';
import CloseBand from '../sections/CloseBand';
import PlayCta from '../primitives/PlayCta';
import { reveal } from '../sections/bands';

/**
 * Closing call to action. No props; the copy is the site's own.
 *
 * Last band of the landing page, after PricingSection. Ivory surface (`bg-band-ivory`)
 * on the `ground-cta` backdrop. No card, glass or shadow: an ivory band separates with
 * hairlines and space (DESIGN.md, "The Ivory Band Has No Shadows"), so the action
 * stands on the paper.
 *
 * Content: headline "Your music, bit for bit." (accent phrase in `band-gold-ink`,
 * since gold ink on white is 1.06:1), one line of subtext, and the gold `PlayCta` install
 * key-cap (large; filled with dark text, so it stays legible on white).
 * No eyebrow, and no build stamp under the button.
 */
export interface CTASectionProps extends FlowProps {
  title?: string;
  titleAccent?: string;
  lede?: string;
  buttonLabel?: string;
}

export default function CTASection({
  backgroundVariant,
  title = 'Your music, ',
  titleAccent = 'bit for bit.',
  lede = 'Install the app from Google Play and plug in your USB DAC.',
  buttonLabel = 'Get it on Google Play',
}: CTASectionProps = {}) {
  return (
    <CloseBand
      backgroundVariant={backgroundVariant}
      id="cta"
      tone="ivory"
      ground="ground-cta"
      className="overflow-hidden"
      containerClassName="relative"
      title={title}
      titleAccent={titleAccent}
      titleClassName="text-headline-m max-w-[16ch] lg:text-headline"
      lede={lede}
      ledeClassName="mt-4 max-w-measure-short text-body-sm text-pretty lg:mt-6 lg:text-body-lg"
      action={
        <div className="r-rise mt-8 lg:mt-10" style={reveal(2)}>
          <PlayCta label={buttonLabel} size="lg" />
        </div>
      }
    />
  );
}
