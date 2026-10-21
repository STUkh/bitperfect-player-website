import type { CSSProperties } from 'react';

/**
 * Components take their extra classes as `className`, from React and from
 * `.astro` callers alike. Astro's React renderer deletes a framework component's
 * `class` prop (it reserves it for an island wrapper), so an `.astro` caller
 * that wrote `class=` would silently lose its classes:
 * `scripts/codemod-react-class.mjs` rewrote every call site to `className`.
 */
export interface ClassProps {
  className?: string;
}

/**
 * An `.astro` caller writes `style` as CSS text (`style="--i: 2"`, the reveal
 * stagger), React wants an object. This takes either. A custom property keeps
 * its name as written, which React accepts; a hyphenated standard property is
 * camel-cased.
 */
export type StyleInput = string | CSSProperties | undefined;

export const styleOf = (style: StyleInput): CSSProperties | undefined => {
  if (typeof style !== 'string') return style;
  const out: Record<string, string> = {};
  for (const decl of style.split(';')) {
    const at = decl.indexOf(':');
    if (at < 0) continue;
    const prop = decl.slice(0, at).trim();
    const value = decl.slice(at + 1).trim();
    if (!prop) continue;
    out[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = value;
  }
  return out as CSSProperties;
};
