import { createContext, useContext, type CSSProperties } from 'react';

/**
 * The two grounds a band sits on: `graphite` (the site's dark `#191919`) and
 * `ivory` (the white paper band). Every band shell takes one, and its text
 * follows it: `text-text-*` on graphite, `text-band-*` on ivory.
 */
export type Tone = 'graphite' | 'ivory';

/**
 * `Band` provides its tone to the shells inside it, so a TSX band can write
 * `<SectionHeading>` without repeating `tone`. Astro renders each React
 * component it meets as its own root, so context never crosses from an `.astro`
 * page: there, pass `tone` to every shell.
 */
export const ToneContext = createContext<Tone>('graphite');

/** The explicit `tone` if there is one, else the enclosing `Band`'s. */
export const useTone = (tone?: Tone): Tone => {
  const inherited = useContext(ToneContext);
  return tone ?? inherited;
};

/**
 * The vertical padding of a band, from the section rhythm in `global.css`:
 * `compact` 48/80px (listings: the catalog groups, the FAQ), `default` 56/112px
 * (most bands and the closing bands), `spacious` 64/128px (the landing feature
 * grid, the ivory capability bands). `none` leaves padding to the caller, for
 * the openings and the pager strip.
 */
export type BandSpace = 'compact' | 'default' | 'spacious' | 'none';

/** Padding class of each step. */
export const bandSpace: Record<BandSpace, string | undefined> = {
  compact: 'section-compact',
  default: 'section-default',
  spacious: 'section-spacious',
  none: undefined,
};

/** Ground colour of a band. */
export const toneGround: Record<Tone, string> = {
  graphite: 'bg-surface-base',
  ivory: 'bg-band-ivory',
};

/**
 * The text tokens of each tone. `accent` is gold (gold ink on ivory, since gold
 * on white is 1.06:1), `quiet` the tertiary line colour, `rule` the hairline.
 */
export const toneText: Record<Tone, { title: string; body: string; quiet: string; accent: string; rule: string }> = {
  graphite: {
    title: 'text-text-primary',
    body: 'text-text-secondary',
    quiet: 'text-text-tertiary',
    accent: 'text-gold',
    rule: 'border-border-subtle',
  },
  ivory: {
    title: 'text-band-ink',
    body: 'text-band-ink-muted',
    quiet: 'text-band-ink-muted',
    accent: 'text-band-gold-ink',
    rule: 'border-band-rule',
  },
};

/** The reveal stagger: `style={reveal(2)}` on an `r-rise`/`r-fade` element sets `--i`. */
export const reveal = (i: number) => ({ '--i': String(i) }) as CSSProperties;
