# Motion reference

Working notes behind the Motion section of DESIGN.md. Every number marked measured was read out of a shipped stylesheet, not recalled.

## The reference the client named

eventbeds.com was the animation reference. Two findings changed how we used it.

**Its ideas are good.** Contrast alternates in clusters, not A/B/A/B: three light sections, then three dark, then three light, then single alternations. Strict alternation reads as a template; clustered blocks read as chapters. A pinned dark section is pulled up under the preceding light one with `top: -100vh` so the changeover is a curtain rather than a seam. A 200px gradient scrim (`linear-gradient(#0000, <next section colour> 90%)`) pinned to a section's bottom dissolves one ground into the next, which is directly useful for our graphite to ivory handoffs.

**Its engineering is not worth copying.** Four unthrottled scroll listeners, three of them calling `getBoundingClientRect()` on every scroll event. Zero `IntersectionObserver` in the entire page. No `prefers-reduced-motion` block anywhere in 156KB of CSS. Its scroll-progress text reveal sets binary 0/1 opacity per word with no easing. Its device mockups compute their width in JavaScript from a measured height, forcing synchronous layout on every resize frame, to reproduce what `aspect-ratio: 1 / 2` gives free.

**Its scroll budget is the real problem.** A 400vh track drives one pinned stage, then a 600vh track drives another: roughly ten viewport-heights of scrolling for two ideas. On a trackpad it feels stuck.

Its per-interaction durations and easings could not be read. The motion lives in Webflow IX2 interaction data fetched at runtime from a CDN path that returns 403 to a non-browser client. What is readable is the whole declarative vocabulary of the site: durations from 0.1s to 0.5s, and exactly one custom curve, `cubic-bezier(.39,.575,.565,1)` (easeOutSine), used four times.

## Where our numbers actually come from

**Bang & Olufsen** ships our exact intended architecture, CSS keyframes toggled by an observer class, and it is the system DESIGN.md now describes. Measured: one curve for everything reveal-shaped, `cubic-bezier(0.165, 0.84, 0.44, 1)` (easeOutQuart), 64 occurrences. Every reveal keyframe holds still for its first 10% before moving. Stagger is a flat 50ms ladder. And the inversion worth stealing: 20px travels over 1200ms while 80px travels over 800ms, so short distance takes the long duration. The naive mapping is the other way round and reads cheap. B&O also ships no `prefers-reduced-motion` block; we fixed that in ours.

**Apple** (iPhone 17 Pro) is the origin of the sticky-device-plus-scrolling-copy genre. Measured: `320ms` used 33 times and `cubic-bezier(0.4, 0, 0.6, 1)` used 122 times. One duration, one curve, and `transition-delay` doing all the choreography. Our 320ms screen crossfade is their number.

**Arc, family.co and Master & Dynamic** all ship the two-column sticky rail, and all three agree on the details in DESIGN.md: `align-self: flex-start` is mandatory (a stretched grid item has no travel and never sticks, which is the single most common failure of this pattern), the top offset should be `calc(var(--header-height) + Npx)` rather than a magic number, and no ancestor may have `overflow: hidden` or sticky dies silently. None of the three ships any JavaScript for the unpin: a sticky element is confined to its containing block, so it releases exactly when the rail section ends. That is the strongest argument against reaching for a scroll library here.

Their mobile fallback resets both properties, `position: relative; top: 0`. Setting `grid-template-columns: 1fr` alone is not enough; the element stays sticky and pins over the stacked copy on the device with the least viewport to spare.

**Astell&Kern**, the closest direct competitor, is the cautionary reference: it loads AOS, WOW.js, Swiper, Lenis and roughly twelve GSAP plugins. Beating that on smoothness is a real and defensible differentiator for a brand whose claim is that it does not touch the signal path.

## Scroll-driven CSS

Four things in the brief are progress-linked rather than threshold-triggered and `IntersectionObserver` cannot express them: a word-by-word reveal across a section, a hero that dims scrolling under the fold, a progress rail that grows with scroll, and a pinned scene's internal choreography.

`animation-timeline: view()` does express them, but support as of today is Chrome and Edge 115+, Safari 26+, and **not Firefox**, which still has it behind a flag. Status is "Limited availability", baseline blocked by Firefox since September 2025. A general web search will claim Firefox 132+; the Web Platform DX features explorer and MDN both contradict that.

So: progressive enhancement only, always inside `@supports`, never load-bearing. At most one flourish, and not the word reveal, because in Firefox the text would simply sit there and the effect is the content.

## The judgement call worth putting to the client

eventbeds gets its big-banner feeling from a 300vh-per-pin scroll track and a layered full-viewport illustration hero. Both are expensive in scroll budget and both work against an honest-technical brand.

Bang & Olufsen gets the same feeling from `position: sticky; top: 0; height: 100vh` on the hero background while the foreground copy scrolls off it. The banner holds, the copy departs, no 400vh track and no JavaScript. That is the grown-up version of what the client asked for, at roughly a fifth of the scroll distance.

## Sources

bang-olufsen.com · apple.com/iphone-17-pro · arc.net · family.co · masterdynamic.com · raycast.com · nothing.tech · copilot.money · amie.so · astellnkern.com · eventbeds.com
Checked and less useful: analogue.co (light palette), teenage.engineering (playful register), roonlabs.com (no motion system), moogmusic.com (14KB CSS, no system), qobuz.com (GSAP, back-in/out easings).
Unreachable: devialet.com, frame.work, sonos.com (403); bezel.it, danclarkaudio (connection failed); elektron.se (JS-injected styles, no readable numbers).
