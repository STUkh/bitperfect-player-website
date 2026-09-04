# Block graphics: the twelve slots

> **Read `SECTION-IMAGES.md` first.** It is the current authority on what imagery the
> site carries: 25 big-plate slots, one per section, with safe areas, ship sizes and
> the registration-frame placeholders that are drawn into the artboards today. It
> supersedes this file wherever the two disagree, because it was written after the
> brief changed to big artistic plates and interstitial bands.
>
> This file is still current for what it uniquely holds, and nothing here duplicates
> `SECTION-IMAGES.md`.

What this file uniquely holds: the generate-or-draw verdicts, and the reasoning for why the six feature marks, the two ivory diagrams and the pricing mark are DRAWN as inline SVG rather than generated. That reasoning still stands and will come up again: a generated schematic invents detail it cannot justify, a mark set is a set because of shared grid and optical weight, and a drawn mark takes currentColor where a raster cannot.

Companion to `IMAGE-PROMPTS.md`, which holds the nine photographic plates. This file covers the page's own block graphics. Same usage rules: paste one Prompt block at a time; Midjourney gets the prose plus the MJ tail and never the Negative block; Flux and Ideogram get the Negative block in the negative field with Magic Prompt off; Nano Banana and Gemini get the prose then `Do not include: ` plus the Negative block.

## Read this first: seven of the twelve should not be generated at all

| Slot                       | Verdict                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1 to 6, the feature marks  | **Draw as inline SVG.** Already drawn in the artboards.                                                 |
| 7, hero backdrop           | Generate only if it can sit behind the CSS wash without competing. Otherwise the wash is finished work. |
| 8, ivory statement diagram | **Draw.** Contrast-critical ink values, and it is the most valuable graphic in the set.                 |
| 9, ivory privacy diagram   | **Draw.** Same reasons.                                                                                 |
| 10, pricing mark           | **Draw.**                                                                                               |
| 11, CTA horizon            | **Do not generate.** The CSS gradient already is the asset.                                             |
| 12, feature page backdrop  | **Generate.** The one unambiguous case.                                                                 |

The reasoning, which is worth keeping because it will come up again:

A generated schematic invents detail it cannot justify, and on a brand whose whole proposition is that it does not embellish, an invented detail in a technical figure is a credibility cost rather than a cosmetic one. Three further reasons specific to this set. A mark set is a set because of shared grid and shared optical weight, which is exactly the property no image model holds across seven generations: six marks each individually decent but drawn at six different weights look worse in a row than six plainer marks drawn identically. Marks 2, 5 and 6 are curves, and a generated curve arrives with hallucinated axes, gridlines and kHz labels a large fraction of the time, which turns a schematic into a fabricated measurement, the one thing this design system forbids outright. And drawn marks take `currentColor`, so they inherit hover, focus and any future placement on the white band automatically, where a raster cannot.

The practical point: a generated mark has to be traced by hand to become an SVG anyway, and tracing is slower than drawing from the geometry below. Use generation here only to sanity-check whether a shape reads, at 1024px, before committing.

Items 8 and 9 sit on ivory, where the ink values are contrast-critical: `#7d5a12` at 5.4:1 and `#14131a` at 15.9:1 are measured. A generated approximation of either fails the band's contrast floor while looking almost right, which is the worst failure mode available. Generated versions also arrive with a soft drop shadow more often than not, and the white band rule forbids shadows outright.

Item 12 is atmosphere with no information content, no type, no measured contrast ratio and no small geometry, which is exactly the shape of task where a generated plate wins. One plate serves all six routes.

**Every one of the twelve ships wordless.** Generated type is wrong every time, and here it is wrong twice over: the `Fig.` numbers are the mechanism that replaced colour as the way the six routes are told apart, so they are set in code, in mono, with tabular figures, and never inside an image.

---

## The six feature marks, as drawn

All six are in the artboards now. Geometry is given in a 24px box, stroke 1.5, round caps, `currentColor`, no fill except the two node dots on Fig. 02. Each carries information its heading does not.

**Fig. 01, Direct USB DAC output.** Two horizontal runs from one origin. The upper run breaks and a diagonal strike cancels it; the lower runs unbroken into a connector body. _Carries: that there is a road not taken. The heading says the output is direct; the mark says a second path exists and is switched off._

**Fig. 02, 32-band parametric EQ.** A zero line, one bell, one shelf, two node dots. _Carries: that this is a curve editor with shapes and continuous parameters, not a bank of graphic-EQ sliders. The heading already gives the band count, so drawing 32 of anything is redundant._

**Fig. 03, Local lossless library.** Three unequal rows inside a left containment bracket, with a four-tick index rail on the right. Nothing crosses either. _Carries: that the catalogue is bounded and indexed on the device._

**Fig. 04, Network streaming.** A vertical bus, four inbound stubs, one outbound line carrying evenly pitched ticks, arrowheads both ways. _Carries: how many ways in, and that what arrives is what leaves. Two arrows alone would add nothing._

**Fig. 05, Studio DSP.** A ceiling rule with a contour rising to a flat plateau one stroke-width beneath it, never touching. _Carries: that there is a hard ceiling and the signal is held under it. The gap is the mark; if it closes, the drawing says the limiter is clipping, which is the opposite claim._

**Fig. 06, AI Enhancer.** A baseline, a solid stepped contour, a boundary rule, then the same contour continuing dotted. _Carries: where the processing acts, and that the added region is inference rather than measurement. Solid is what was in the file, dotted is what the model produced. This is an honesty statement drawn into the geometry._

A note on the set: marks 1, 4 and 6 read left to right along a horizontal axis, 2 and 5 hang off a horizontal rule, and 3 is the only vertical stack. That is deliberate and the set holds together, but it makes 3 the odd one in a row of six. Its bracket runs the full box height to compensate; do not thicken its stroke.

---

## Placeholder framing, for the live page

While a real image is missing, ship a flat `#24232b` block at the exact final aspect ratio, a `1px` `border-subtle` outline, the standard `inset 0 1px 0 rgba(255,255,255,0.05)` top-rim specular, and one centred 13px mono `Fig. 0X` in `text-tertiary`. Nothing else.

No dashed border, no diagonal cross, no image icon, no "image" label, no skeleton shimmer. Those all read as broken. An empty card in the site's own chassis vocabulary reads as an intentional plate that happens to be quiet, which is something this design does anyway.

For the two full-bleed cases, 7 and 11, the placeholder is the section's own ground plus its specified CSS gradient. No block, no border. Both sections are already complete without an image.

The `Artwork slots` artboard uses a dashed frame deliberately, because it is a catalogue of what is outstanding rather than a live page.

---

## Style suffix, monochrome revision

Replaces the suffix in `IMAGE-PROMPTS.md`.

```
Rendered in the Bitperfect Player visual world: a deep neutral graphite ground #1c1b21, with raised chassis surfaces #232228, card surfaces #24232b and #26242e, and darker inline detail #2b2934; brushed champagne gold #e8b84b and #f2c65e accents, warm amber #ffb347 in the hottest light, and champagne ivory #fbe9c4 highlights. Champagne gold is the only colour in the frame: there is no second accent hue anywhere, no emerald, no azure, no indigo, no teal, no blue, no violet. Machined audio hardware and vacuum-tube filament warmth, deep optical space, generous negative space, fine physical film grain, brushed metal micro-texture, thin specular top-rim highlights on every edge, raking low-angle light with almost no fill. Low-key and low-contrast, but the shadows resolve into an even neutral graphite floor rather than crushing to pure black: no #000000 anywhere in the frame, and no blue or violet cast in the darks. Photographic and physical rather than rendered. No text, no lettering, no logo, no UI.
```

Pair with `--style raw --v 7`, your aspect ratio, and `--no pure black background, crushed shadows, blue-black, second accent colour`.

**Ivory variant**, for anything on the light band:

```
Printed as a flat two-ink letterpress figure on clean uncoated white paper stock #ffffff, in the manner of a mid-century instrument manual plate. Two inks only: near-black #14131a for structure and deep gold #7d5a12 for the one thing being singled out. Flat solid ink with no tints, no gradients, no shading, no drop shadows, no glow, no halftone. Crisp edges with the slight bite of letterpress impression, fine uncoated paper tooth, generous empty margin. Fresh clean stock, never aged, yellowed, stained or torn. The bright gold #e8b84b never appears on ivory: it measures 1.60:1 there and disappears. No axes, no gridlines, no scale, no numbers, no labels, no text.
```

---

## Why the white pair is the hard part

It is not that the models dislike light grounds. It is that every other word in an audiophile prompt votes dark. Audiophile, low-key, machined, signal, DSP, raking light: the whole vocabulary that makes the other ten work is a vote for a graphite floor, and one hex code cannot outvote a dozen semantic cues. So an ivory prompt has to lead with a printing process instead, uncoated stock and letterpress and a two-ink plate, and let the subject arrive as geometry rather than as audio. That reordering matters more than any negative term.

Three failures in the order they bite. **The gold:** `#e8b84b` on `#ffffff` is 1.60:1, not a weak accent but invisible; use `#7d5a12` and put the bright gold in the negative block. **The shadow:** a soft drop shadow under a figure is the single most common thing every model adds to a light-ground graphic, and the white band rule forbids shadows outright; list it twice, as `drop shadow` and as `cast shadow`, because one phrasing does not hold it. **The paper:** "warm paper" pulls straight to aged parchment, so say fresh uncoated stock and list the ageing failures individually.

Generate them as a pair, 8 first, then 9 from its seed with 8 attached as a reference. Two ivories differing by a few points will not read as one press, and on the loudest sections of the site that is visible in a way an off graphite plate is not.

---

## One content decision on the privacy diagram

The privacy band also carries the honest note about the app's three optional network calls. A graphic showing a sealed boundary with nothing crossing it would contradict the note printed directly beneath it, which is exactly the kind of small overclaim this brand exists not to make, and exactly the kind an audiophile audience checks.

So the specified figure shows three paths turning back at the boundary and a fourth crossing through an explicitly drawn gate, with the gate and the crossing segment in the second ink. A closed-loop version is defensible only while the honest note sits immediately adjacent and readable at the same glance. The gate version is safe in either layout.
