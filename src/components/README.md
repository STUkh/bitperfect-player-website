# Components

Components are React (`.tsx`) and render to static HTML at build time through
`@astrojs/react`. Nothing hydrates: no component carries a `client:*` directive,
and no React reaches the browser. The same files are what Claude Design builds
with, so there is one source for the site and for design work.

Pages, layouts and `SEOHead` stay Astro: routing, content collections and the
document head are Astro's job.

## Layout

One folder per role. A component's `.css`, `.client.ts` and `.astro` wrapper sit
beside it.

| Folder | Holds |
|---|---|
| `primitives/` | the atoms: `Button`, `PlayCta`, `PlayStoreMark`, `StoreBadges`, `Icon` and `glyphs.ts`, `FeatureMark`, `Picture`, `FeatureArt`, `ImageSlot`, `Card`, `Container`, `Logo` |
| `sections/` | the band shells: `Band` and `bands.ts` (tone), `SectionHeading`, `MediaSplit`, `SpecList`, `RuleList`, `CloseBand`, `ClosingBanner`, `BackLink`, `CrossLinkRow`, `PagerPair` and `PagerLink`, `FeatureLinkCard` |
| `devices/` | the phones: `Phone`, `PhoneFrame`, `PhoneChassis`, `phone-geometry.ts`, `phone-fan.ts`, `PhoneTrio`, `FeatureScreens` |
| `chrome/` | `Header` (and its `MobileMenu`), `Footer`, `PageHeader`, `SEOHead.astro`, `HoldingPage` |
| `bands/` | the concrete bands: the landing bands (`HomeOpening` through `CTASection`), `CapabilityBand`, `TechIndex`, the `FlowBackdrop`/`SoftBackdrop` grounds |
| `legal/` | `LegalDocument` |
| `_lib/` | `behaviour.ts` (`useBehaviour`), `class-props.ts` (`ClassProps`, `styleOf`) |
| `preview/` | the `/preview/*` background studies; whole pages, not components |

Each folder has an `index.ts` barrel of its React components and types. Pages
and other components import a component by its own path
(`../components/primitives/Button`), which keeps every page's stylesheet
exactly what it uses; `.astro` wrappers and `.client.ts` behaviour are never in
a barrel. Page data that only pages read lives in `src/data/` (the feature
routes' copy is `src/data/feature-pages.ts`).

## Writing a component

- **Classes.** Tailwind utilities in `className`. A component that takes extra
  classes extends `ClassProps` (`_lib/class-props.ts`) and merges them with `cn()`
  (tailwind-merge, so a caller's `px-*` replaces the default rather than
  fighting it). Conditional lists use `cx()` (clsx).
- **From `.astro` callers, always `className=`, never `class=`.** Astro's React
  renderer deletes a framework component's `class` prop, silently.
- **Tokens, not values.** Colour, radius, shadow, tracking and measure come from
  the `@theme` tokens in `styles/global.css` (`tracking-micro`, `max-w-measure`,
  `max-w-column`, `var(--radius-panel)`). A value used twice becomes a token
  there. Gold or amber at an alpha is `bg-gold/8` in a class or
  `color-mix(in srgb, var(--color-gold) 8%, transparent)` in CSS, never a raw
  `rgba(232, 184, 75, …)`. A new `--text-*`, `--shadow-*`, `--tracking-*` or
  `--container-*` token also goes into `utils/cn.ts`, or tailwind-merge drops it.
- **Styles that utilities cannot express** go in `<Name>.css` next to the
  component, imported by it. It is plain global CSS (Astro's scoping is gone), so
  every class it defines must be specific to the component (`.store-badge`,
  `.mobile-nav-link`), and no selector may start with a bare tag name.
- **Behaviour** (anything that was a client `<script>`) is a plain function in
  `<Name>.client.ts`: `setupX(root: HTMLElement) => cleanup`. It is wired twice:
  - in React, `const ref = useBehaviour(setupX)` on the root element
    (`_lib/behaviour.ts`), which runs in Claude Design and never on the site;
  - on the site, a thin `<Name>.astro` wrapper renders the component and carries
    a `<script>` that imports the `.client.ts` and calls it on every element
    carrying the component's `data-*` hook, `data-<name>=""` on the same element
    the ref sits on: `document.querySelectorAll('[data-<name>]').forEach(...)`,
    never an id or a styling class (`behaviour.ts`). That script must not
    import `behaviour.ts` or anything else that imports `react`: React is not
    tree-shakeable and would ship to every page. `Header.astro` is the example.
- **Astro context** (`Astro.url`, the current path) comes in as a prop, supplied
  by the wrapper or the calling page.
- **Slots.** The default slot is `children`. A named slot (`slot="actions"`) arrives
  as a camelCased prop (`actions`), typed `ReactNode`.
- **`inert`** is typed by `src/types/react-inert.d.ts`; write it `inert=""`.
- **One run of text, one string.** React renders `{name} ({count})` as separate
  text nodes with `<!-- -->` between them, and Chromium can place the glyphs a
  sub-pixel off where Astro wrote one node. Build a label that mixes text and
  values as a template string: `` {`${name} (${count})`} ``.

## Migrating an `.astro` component

1. `node scripts/astro-to-tsx.mjs src/components/<folder>/Name.astro` writes
   `Name.tsx` and `Name.css` and prints a TODO for everything it cannot port:
   scripts, `Astro.*`, named slots, generic classes in the stylesheet.
2. Finish the TODOs by hand (above).
3. Repoint imports from `Name.astro` to `Name` (or keep `Name.astro` if it
   became the wrapper), then `node scripts/codemod-react-class.mjs Name` to move
   the call sites to `className`.
4. `git rm` the old `.astro` unless it is now the wrapper.
5. `npx astro check` (0 errors) and `node scripts/visual-regression.mjs compare`:
   every capture must match, and the script fails if React reaches a page.
