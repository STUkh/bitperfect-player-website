# Section images: the big plates

Third document in the image set, and the one that changed the design.

- `IMAGE-PROMPTS.md` holds nine **photographic plates** — hero field, product shot, texture strip, OG card, 404, album art, the tall feature-page rail. Those stay.
- `BLOCK-GRAPHICS.md` holds twelve **block graphic slots**, of which seven were ruled draw-not-generate. Those stay too, and this file **demotes** them: the six feature marks drop to 24px inline glyphs sitting beside a heading, not as anything anyone is asked to look at.
- **This file** holds the twenty-five **big plates**: full-bleed backdrops behind every major section, and the interstitial bands that sit between blocks.

Same usage rules as the other two. Paste one Prompt block at a time. Midjourney gets the prose plus the MJ tail and never the Negative block. Flux and Ideogram get the Negative block in the negative field with Magic Prompt off. Nano Banana and Gemini get the prose, then `Do not include: ` plus the Negative block.

Artboards are 1440 wide with 80px gutters, so the content column is 1280. **Full-bleed means 2560 shipped minimum**, generated larger and downscaled. Never upscale a small generation.

---

## Part A. What was learned before writing these

Twelve premium sites were loaded and read for one question: what makes a large image read expensive rather than stocky.

### The reference set, and what each one actually does

| Site                            | How big                                                              | Crop                                                                               | Type                                                           | The seam                                                                        |
| ------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **nothing.tech**                | Full-viewport bands, alternating                                     | Landscape, product large in frame                                                  | **Overlaid**, semi-transparent layers                          | Image band runs edge to edge, then yields hard to a flat neutral nav/link block |
| **analogue.co**                 | Full-width hero, tall                                                | Tight, centred, device isolated, almost no environment                             | **Below the image, never on it**                               | Flat colour zones butt against photographic content with no fade — a cut        |
| **masterdynamic.com**           | Multiple full-width bands separating content, ~60–80% of the section | Deliberately varied: 3/4 product, macro cable and case detail, lifestyle, isolated | Overlaid, but only where the plate was shot with a hole for it | White/light neutral between bands; the bands are the punctuation                |
| **teenage.engineering**         | The counterexample. 128px uniform thumbnails, no big imagery at all  | Square, standardised                                                               | Caption below                                                  | SVG rules divide sections                                                       |
| **aesop.com**, **devialet.com** | Both 403 to a fetch — noted rather than guessed at                   |

Teenage Engineering is the useful outlier. It is one of the most respected product sites in the world and it has _no_ large imagery, because its authority comes from a rigid grid and identical crops. That is the fallback position if generation goes badly: uniformity beats scale. But it is not what was asked for here.

### What actually makes big imagery read premium

1. **The subject is one thing.** Every plate on Analogue and Nothing has a single object. The moment a plate has two competing masses it reads as a collage, and collage reads as stock.
2. **The crop is braver than comfortable.** The premium move is to run the object off two or more edges. A whole object centred with air around it is a catalogue photo; the same object cropped so you infer the rest is an editorial one.
3. **The empty region is designed, not left over.** Master & Dynamic's overlaid headlines work because the plates were shot with a hole in them. Every plate below has a stated safe area for exactly this reason, and a plate that fills its safe area is a reject even if it is beautiful.
4. **The light source is singular and low.** One raking source with almost no fill. Two sources make it a product listing.
5. **The transition is a cut or it is a physical falloff — never a CSS fade.** Analogue cuts hard. The plates below either end on a machined edge (a cut) or carry the falloff _inside the photograph_ as real light on a real surface, which is why several prompts describe a source below the bottom edge of the frame.
6. **Restraint scales.** At 2560 wide, an effect you can just about see at 1440 becomes a texture you cannot stop seeing. Every plate here is specified quieter than feels right at authoring size.
7. **Grain is the tell.** Fine physical film grain across the whole plate is the single cheapest thing that separates a photograph from a render, and the first thing every model drops.

### Six antipatterns

1. **The gradient band.** A full-bleed "image" that is really a colour ramp with some noise on it. It looks fine in the artboard and looks like a placeholder that shipped on a real screen. If the plate has no object, it needs a _surface_ — a lit material — or it is not a plate.
2. **The centred hero object with a headline on top of it.** The type lands on the busiest part of the frame. This is the most common failure and it is a composition failure, not a contrast one; adding a scrim does not fix it, it just makes the plate dimmer and still busy.
3. **Bands at every seam.** Once an image band appears at every section boundary it stops being punctuation and becomes wallpaper, and the page reads as a slideshow. Three on a six-block page is the ceiling.
4. **Wrong band aspect.** A 16:9 plate used as an interstitial is not a band, it is a second hero and it stops the page dead. Bands are 4:1 and wider. The width is what makes them read as punctuation.
5. **The lifestyle drift.** A hand, a desk, a coffee cup, a person "enjoying music". Every one of these converts an editorial plate to stock in a single element. Forbidden outright across this whole set.
6. **The invented measurement.** A generated plate with an axis, a gridline, a tick or a kHz label is a fabricated data claim on a brand whose entire proposition is that it does not embellish. Several plates below are _shaped like_ curves and rows because that is what the product is; every one of them is specified as a machined solid with the axis, baseline and ticks explicitly negated.

---

## Part B. The slots

Twenty-four specified, plus one optional. Filenames are `public/img/<slot-id>.webp`, and the placeholder carries `data-img-slot="<slot-id>"`.

### Priority, if only some get generated

**Ship first (6):** `home-hero`, `home-interstitial-2`, `home-statement`, `home-privacy`, `home-phonefan-stage`, `features-index-interstitial`.
**Then the six feature heroes.** **Then the six feature interstitials.** **Last, and genuinely optional:** the three backdrops (`home-features-backdrop`, `home-pricing-backdrop`, `features-index-hero`) and `home-cta`, all four of which have a fallback that is already finished work.

---

# HOME — `design/Main.dc.html`

---

## 1. `home-hero`

**Where** Full-bleed behind section 1, the hero banner. Above it: the 80px translucent header. Below it: the white statement band at `#ffffff`. Currently a radial white wash over `#1c1b21`. The plate goes underneath that wash, which stays.

**Size** 2:1. Generate 3200x1600, ship 2560x1280.

**Safe area** The headline block occupies the **left 52%**, vertically centred, from the eyebrow chip down through the two buttons to the four-item spec row. That whole column must be an unbroken flat field with no detail an eye can catch. The phone mockup sits in the **right 30%**. So the only region that may carry structure is the vertical strip between them and the outer right margin.

**Prompt**

```
An immense slab of anodised graphite aluminium, photographed straight on so it fills the entire frame edge to edge and reads as architecture rather than as an object. The left two thirds of the surface is a completely uninterrupted brushed field in deep neutral graphite #1c1b21, its fine horizontal brush grain the only thing happening there, holding no feature, no seam and no highlight of any kind. Running vertically down the right third, one deep milled channel is cut into the slab, its walls falling away into a slightly deeper graphite #232228, and lying along the bottom of that channel is a single unbroken hairline of brushed champagne gold #e8b84b light, warming toward amber #ffb347 at its lowest point and cooling to nothing at the top. A thin specular top-rim highlight traces the near edge of the channel where the milling broke the surface. One raking source from high left, almost no fill. Fine physical film grain across the entire plate, faint machining micro-texture in the brushed field, restrained global contrast, no bloom and no vignette. The darks are an even neutral graphite floor, never crushed to pure black and never tinted blue or violet. Cinematic macro photograph of an object that does not exist. Vast, machined, quiet.
```

**MJ tail** `--ar 2:1 --style raw --v 7 --no pure black background, crushed shadows, blue-black, neon, glow bloom, lens flare, cyan, blue, purple, teal, green, cyberpunk, 3D render, CGI, gradient mesh, sparkles, bokeh, text, letters, logo, watermark, UI, people, busy left side, centred subject`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, violet cast in the darks, neon, glow, bloom, glow halo, lens flare, cyan, electric blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, octane, CGI, gradient mesh, iridescent, holographic, chrome, mirror polish, sparkles, bokeh, busy left side, detail across the whole frame, centred subject, symmetry, high contrast, text, letters, numbers, logo, watermark, UI elements, screens, people, hands
```

**Check** Eyedropper five points across the left 52%: every one within a few points of `#1c1b21`, none brighter than `#26242e`. Then lay the real headline over it at 78px and confirm nothing is visible behind any glyph. The channel must not land under the phone mockup — if the model centres it, regenerate rather than shifting it in an editor, because the milling highlight will not survive the move.

**Fallback** The existing hero background ships unchanged: `radial-gradient(ellipse 120% 78% at 50% -10%, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.012) 42%, transparent 72%), #1c1b21`. It is complete work on its own.

---

## 2. `home-phonefan-stage`

**Where** `design/PhoneShowcase.dc.html`, the pinned sticky stage. Full-bleed behind all three scroll states. Above: the hero. Below: `home-interstitial-1`, then the white statement band. The plate has to work identically at scroll 0 (one phone, centred, with the headline present) and scroll 100 (three phones spread across the full width).

**Size** 16:9. Generate 3840x2160, ship 2560x1440.

**Safe area** The **entire middle 62% of the height** is where the phones travel, and at scroll 0 the headline sits over the left half of that band. It must be dead flat. Structure lives only in the top 12% and the bottom 26%.

**Prompt**

```
The floor and rear wall of an empty photographic stage, shot in very low light. A seamless infinite-curve cyclorama sweeps up from the foreground floor into a rear wall with no visible join, the whole surface a matte bead-blasted neutral graphite. The lower quarter of the frame carries one broad shallow pool of warm amber #ffb347 light lying flat on the floor, spread very wide and very soft, its brightest point never lifting above a dim value and its edges dissolving long before they reach the left or right edge of the frame. From there the surface darkens with distance until the entire middle and upper region is an even, featureless deep neutral graphite #1c1b21 field carrying nothing at all. Across the very top edge, the faintest suggestion of an overhead structure catches a dim champagne gold #e8b84b rim along one horizontal edge, fading out within the first eighth of the frame height. No object stands on the floor. No horizon line, no wall corner, no skirting, no ceiling grid. Fine physical film grain over the whole plate, extremely restrained contrast, no bloom, no vignette, no hotspot. The darks hold at an even neutral graphite floor, never crushed to pure black and never tinted blue or violet. Deep, empty, expensive.
```

**MJ tail** `--ar 16:9 --style raw --v 7 --no object, product, phone, device, subject, pure black background, crushed shadows, blue-black, horizon line, wall corner, floor seam, ceiling grid, spotlight, hotspot, neon, glow bloom, lens flare, cyan, blue, purple, green, 3D render, CGI, gradient mesh, text, logo, people`

**Negative**

```
object, product, phone, device, any subject standing on the floor, pure black, #000000, crushed shadows, blue-black, violet cast, horizon line, visible wall corner, floor seam, skirting board, ceiling grid, studio lights in frame, softbox, spotlight, bright hotspot, neon, glow, bloom, lens flare, cyan, blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, CGI, gradient mesh, high contrast, text, letters, logo, watermark, UI, people, hands
```

**Check** Place all three phone mockups at their scroll-100 positions and confirm the amber pool sits entirely _below_ the lowest phone edge. If it rises behind them, the phones lose their own screen contrast against it and the whole moment cheapens. Sample the centre band at nine points; all nine must be within a few points of each other. Any tonal drift across the middle will read as a moving band while the section is pinned, which is the worst possible artefact on the one piece of motion on this site.

**Fallback** Flat `#1c1b21`, which is what the artboard shows now.

---

## 3. `home-interstitial-1` — the hinge

**Where** **Full-bleed band.** Sits directly after the pinned phone moment releases and directly before the white statement band at `#ffffff`. This is a dark-to-light seam and the band carries the transition physically.

**Size** 5:1. Generate 3200x640, ship 2560x512. On the artboard: 1440 wide, 288 tall.

**Safe area** No type. The whole plate is visible. The **bottom edge must arrive at a value within a few points of `#ffffff`** across the full width, because the white band begins immediately below with no rule between them.

**Prompt**

```
An extremely wide letterbox photograph of a single taut hairline filament of champagne gold #e8b84b light stretched horizontally from the left edge of the frame to the right edge, unbroken, sitting a little above the vertical centre. It is physical, a lit wire rather than a drawn line, carrying a thin specular highlight along its upper surface and a fine waveform modulation so slight it is almost imperceptible. Behind and above it the field is deep neutral graphite #1c1b21, flat and empty. Below it the same surface is progressively more lit: a very large soft raking source sits just outside the bottom edge of the frame, so the graphite lifts smoothly and physically through #232228 and a warm mid grey until, at the very bottom edge of the frame, the surface has arrived at a clean uncoated white paper value of #ffffff across the entire width, evenly, with no hotspot and no falloff toward either side. The lift is real light on a real matte surface, not a colour ramp: the surface texture, the brushed grain and the film grain all remain visible and continuous through it. Warm amber #ffb347 sits only in the filament at its warmest point. Fine physical film grain across the whole plate, restrained contrast, no bloom, no glow halo, no vignette.
```

**MJ tail** `--ar 5:1 --style raw --v 7 --no pure black, crushed shadows, blue-black, vignette, hotspot, uneven bottom edge, gradient mesh, banding, neon, glow bloom, lens flare, cyan, blue, purple, green, 3D render, CGI, text, letters, logo, watermark, people, object`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, violet cast, vignette, corner darkening, bright hotspot, uneven bottom edge, one side lighter than the other, colour banding, posterisation, gradient mesh, flat digital ramp, neon, glow, bloom, glow halo, lens flare, cyan, blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, CGI, sparkles, bokeh, second filament, broken line, text, letters, numbers, logo, watermark, UI, people, hands
```

**Check** This is the whole job: sample the bottom row of pixels at nine points across the width. All nine must be within about four points of `#ffffff` and of each other. More than that and a visible ragged seam appears where the band meets the white section, which is worse than having no band. Also confirm the filament reaches both edges — a filament that stops short reads as a scratch.

**Fallback** A 3px full-bleed rule: `background: linear-gradient(to right, transparent, rgba(232,184,75,0.5) 30%, rgba(232,184,75,0.5) 70%, transparent)`. Nothing else. The seam already works without a band.

---

## 4. `home-statement` — ivory

**Where** Inside section 2, the light band at `#ffffff`. A **contained plate** spanning the 1280 content column, sitting between the h2 ("Most phones quietly rewrite your music on the way out. This one leaves it alone.") and the three columns beneath it.

This is a **photograph on a light ground**, not a letterpress figure. `BLOCK-GRAPHICS.md` slot 8 remains a drawn two-ink diagram and is unchanged — the two coexist, one atmospheric and one informational, and if only one ships it should be this one.

**Size** 3:1. Generate 3072x1024, ship 2560x853.

**Safe area** No type overlays it. But the plate must hold the white band's contrast floor at its edges, so the outer 8% on every side stays near-paper value.

**Prompt**

```
A flat overhead photograph, shot from directly above with the camera square to the surface. One single long bar of milled aluminium, anodised deep graphite #1c1b21, lies horizontally across a sheet of clean uncoated white paper stock #ffffff, running unbroken from the left edge of the frame clean out through the right edge, so both ends are outside the picture. The bar is about one seventh of the frame height, its long edges crisp and true, its top face carrying a fine horizontal brush grain and one continuous thin specular line of deep gold #7d5a12 where a large soft overhead source catches the chamfer along its upper edge. Nothing else is in the frame. The paper above and below the bar is completely empty, its uncoated tooth clearly visible, fresh and clean stock, never aged, yellowed, stained or torn. Because the camera is directly overhead and the source is large and soft, there is no cast shadow and no drop shadow anywhere: only the narrowest warm grey contact penumbra hugging the bar's lower long edge where it meets the paper, no wider than a hairline. Even illumination across the whole sheet with no hotspot and no vignette. Fine paper grain, matte throughout, no gloss, no gradient. Still, exact, uninterrupted.
```

**MJ tail** `--ar 3:1 --style raw --v 7 --no drop shadow, cast shadow, soft shadow, aged paper, yellowed, stained, torn, crumpled, vignette, hotspot, dark background, graphite background, second object, broken bar, gap, angled camera, perspective, bright gold, neon, blue, purple, green, 3D render, text, letters, logo, watermark, people, hands`

**Negative**

```
drop shadow, cast shadow, soft shadow beneath the object, long shadow, aged paper, parchment, yellowed, sepia, stained, torn, crumpled, folded, vignette, hotspot, uneven lighting, dark background, graphite background, black background, second object, two bars, broken bar, gap in the bar, bar ending inside the frame, angled camera, three-quarter view, perspective, depth of field, bright gold #e8b84b, yellow, neon, blue, cyan, purple, magenta, teal, green, glossy 3D render, CGI, text, letters, numbers, logo, watermark, ruler, scale, measurement marks, people, hands
```

**Check** The bright gold trap from `BLOCK-GRAPHICS.md` applies in full: `#e8b84b` measures 1.60:1 on `#ffffff` and disappears. The specular must be `#7d5a12` or the plate looks unfinished. Then check the shadow — a soft drop shadow is the single most common thing every model adds to a light-ground image, and it is the one thing the white band forbids. Sample the paper 40px below the bar: it must still be within a few points of `#ffffff`. Finally confirm the bar exits both edges; a bar that stops inside the frame inverts the meaning of the section.

**Fallback** Omit the plate entirely and let the h2 run straight into the three columns, which is what the artboard does now. Do not ship a grey box on the white band — a placeholder is visible on paper in a way it is not on graphite.

---

## 5. `home-features-backdrop`

**Where** Full-bleed behind section 3, the features teaser at `#1c1b21`. Above: the white statement band. Below: the white privacy band. Six cards with Fig. marks sit on top of it.

**Honest note on this slot:** a backdrop behind a card grid is usually worse than no backdrop. Its only job is to stop 240px of vertical padding from reading as dead flat colour. It must be so quiet you cannot say for certain it is there at 100%. If a generation is _interesting_, it is wrong. This is the first slot to cut.

**Size** 16:9. Generate 3200x1800, ship 2560x1440.

**Safe area** Effectively the whole frame. The six cards cover the middle 70%.

**Prompt**

```
A near-empty dark background plate. A single vast sheet of matte bead-blasted graphite, lit by one very large and very soft source from far off to the upper left, so that a barely perceptible tonal drift runs diagonally across the surface from a marginally lighter #232228 in the upper left to a marginally deeper #1c1b21 in the lower right, a difference of only a few points end to end. Running the full height of the frame, offset well to the left of centre, one continuous hairline seam of dim champagne gold #e8b84b catches the light where two panels of the sheet meet, so faint it is barely separable from the surface around it and invisible from any distance. Nothing else exists in the frame: no object, no pattern, no arcs, no rings, no texture beyond the fine bead-blast tooth of the metal itself and a fine physical film grain over everything. No vignette, no hotspot, no bloom, extremely restrained contrast. The darks hold at an even neutral graphite floor throughout, never crushed to pure black and never tinted blue or violet.
```

**MJ tail** `--ar 16:9 --style raw --v 7 --no object, subject, pattern, rings, arcs, waves, texture, detail, contrast, vignette, hotspot, pure black, crushed shadows, blue-black, neon, glow, cyan, blue, purple, green, 3D render, gradient mesh, text, logo, people`

**Negative**

```
object, subject, product, pattern, repeating pattern, concentric rings, arcs, wavefronts, waves, heavy texture, visible detail, high contrast, dramatic lighting, vignette, corner darkening, hotspot, pure black, #000000, crushed shadows, blue-black, violet cast, neon, glow, bloom, lens flare, cyan, blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, CGI, gradient mesh, text, letters, logo, watermark, UI, people
```

**Check** Place the six real cards at `#24232b` over it. If you can tell where the plate is, it is too loud. Sample the region behind each card gap: the spread across the whole plate should be under about ten points.

**Fallback** Flat `#1c1b21`. Already finished.

---

## 6. `home-interstitial-2` — the hardware

**Where** **Full-bleed band.** Sits directly after the features teaser and directly before the white privacy band. Dark-to-light seam. This is the page's one honest photograph of real hardware and the highest-value plate in the whole set after `home-hero`.

Unlike band 1, this one **ends on a hard machined edge, not a tonal lift.** Two bands using the same fade trick would read as a device; a fade and a cut read as art direction. The cut is deliberate.

**Size** 4:1. Generate 3200x800, ship 2560x640. On the artboard: 1440 wide, 360 tall.

**Safe area** No type. The bottom 6% is the machined edge and the cut, and must stay clean of subject.

**Prompt**

```
An extremely wide letterbox editorial macro photograph of real hardware. A small machined aluminium USB-C DAC dongle lies horizontally across the frame, anodised dark graphite, its knurled barrel filling the upper portion of the picture and cropped so that it runs off both the left and the right edge and neither end is visible. Every ridge of the knurling is resolved. A short flat braided cable leaves the barrel and coils loosely away toward the lower left, its weave sharp where it leaves the housing and softening into shallow depth of field as it recedes. One warm gold rim light rakes in from the back right at a very low angle, tracing a single thin unbroken specular line of champagne gold #e8b84b along the top edge of the knurling, warming to amber #ffb347 at its hottest point. Fill light is almost nonexistent and everything falls away into deep neutral graphite #1c1b21 within centimetres, the shadows staying open and neutral. Fine dust and honest micro-scratches on the anodising, unretouched. Across the very bottom of the frame, a single perfectly straight machined edge runs the full width, horizontal and true, its near face catching one hairline specular, and below that edge the frame ends. Shot on a 100mm macro at f/2.0, warm low-key grade, fine physical film grain, matte surfaces, no gloss retouching. Photographed, not rendered.
```

**MJ tail** `--ar 4:1 --style raw --v 7 --no 3D render, CGI, plastic, glossy, white background, softbox, flat lighting, blue rim light, screen glow, interface, brand logo, lettering, engraved text, hands, fingers, people, desk, coffee, pure black, crushed shadows, blue-black, cyan, blue, purple, green, duplicated cables, floating objects`

**Negative**

```
3D render, CGI, octane, plastic look, glossy plastic, mirror reflections, white background, bright studio softbox, flat even lighting, blue rim light, cold blue cast, glowing screen, visible UI, app interface, brand logos, engraved lettering, model numbers, text, watermark, hands, fingers, people, desk scene, coffee cup, headphones, lifestyle props, pure black, #000000, crushed shadows, blue-black, violet cast, cyan, electric blue, purple, magenta, teal, green, neon, duplicated cables, two dongles, floating objects, object ending inside the frame
```

**Check** Hallucinated brand marks or garbled lettering on the barrel are the most common failure here and a legal problem, not just an aesthetic one — reject on sight. Confirm the cable _enters_ the housing rather than fusing into it. Confirm the barrel exits both edges. Then check the bottom edge is genuinely straight and level across the full 2560; if it slopes, the cut against the white band will look like a mistake.

**Fallback** The section seam as it stands, with the white band's own top edge doing the work. No box, no rule.

---

## 7. `home-privacy` — ivory

**Where** Inside section 4, the light band at `#ffffff`. A **contained plate** spanning the 1280 content column, between the h2 ("No account. No telemetry. No ads.") and the three columns.

**Sibling of `home-statement`.** Generate the two as a pair, `home-statement` first, then this one from its seed with the approved statement plate attached as a reference. Two ivories differing by a few points will not read as one press, and on the two loudest sections of the site that is visible in a way an off graphite plate is not.

**Size** 3:1. Generate 3072x1024, ship 2560x853.

**Safe area** No type overlays it.

**Prompt**

```
A flat overhead photograph, shot from directly above with the camera square to the surface, matching the lighting, paper and grain of its companion plate exactly. A single solid block of machined metal lies alone at the centre of a sheet of clean uncoated white paper stock #ffffff. The block is milled from one billet, anodised deep graphite #1c1b21, roughly two and a half times as wide as it is tall and occupying about a third of the frame width, with sharp chamfered edges and matte bead-blasted faces. It has no ports, no fasteners, no openings and no markings of any kind. One single hairline gap runs around its midline, and along that gap a thin unbroken line of warm amber #ffb347 light escapes from inside, the only warmth in the frame. A continuous thin specular of deep gold #7d5a12 catches the chamfer along the block's upper edge. Nothing else is in the frame: no lines, no traces, no paths, no wires, nothing leaving the block and nothing approaching it. The paper on all four sides is completely empty, its uncoated tooth clearly visible, fresh and clean stock, never aged, yellowed, stained or torn. Because the camera is directly overhead and the source is large and soft, there is no cast shadow and no drop shadow: only the narrowest warm grey contact penumbra hugging the block's lower edge, no wider than a hairline. Even illumination across the whole sheet, no hotspot, no vignette. Fine paper grain, matte throughout, no gloss, no gradient. Sealed, self-contained, still.
```

**MJ tail** `--ar 3:1 --style raw --v 7 --no drop shadow, cast shadow, soft shadow, traces, lines, wires, paths, circuit, padlock, lock, keyhole, key, shield, badge, safe, vault, chain, fingerprint, eye, aged paper, yellowed, stained, vignette, dark background, bright gold, neon, blue, purple, green, 3D render, text, logo, people`

**Negative**

```
drop shadow, cast shadow, soft shadow beneath the object, signal traces, drawn lines, wires, cables, paths, arrows, circuit board, PCB, padlock, lock, keyhole, key, shield, crest, badge, safe, vault, vault door, chain, handcuffs, fingerprint, eye, iris, camera, cctv, aged paper, parchment, yellowed, sepia, stained, torn, vignette, hotspot, dark background, black background, second object, angled camera, three-quarter view, perspective, bright gold #e8b84b, yellow, neon, blue, cyan, purple, magenta, teal, green, glossy 3D render, CGI, text, letters, numbers, logo, watermark, people, hands
```

**Check** **Content constraint, carried over from `BLOCK-GRAPHICS.md` and it matters here.** This plate must show **no traces at all** — not returning ones, not any. The drawn figure in slot 9 shows three paths turning back at a boundary and a fourth crossing an explicit gate, because it is a diagram and it has to be truthful about the app's three optional network calls. This plate is atmosphere: a sealed object makes no closure claim. The moment you add returning traces it becomes a diagram, and a diagram showing nothing leaving contradicts the honest note printed directly beneath it. Reject any generation with lines on the paper.

Then the two standing ivory traps: the specular must be `#7d5a12`, never `#e8b84b`, and there must be no drop shadow. Check the silhouette has not drifted toward a padlock or a shield.

**Fallback** Omit. Same reasoning as `home-statement` — do not put a grey box on paper.

---

## 8. `home-pricing-backdrop`

**Where** Full-bleed behind section 5, pricing, at `#1c1b21`. Three price cards, two feature rows and a fine-print block sit on top. Above: the white privacy band. Below: the closing CTA.

This one earns its place more than `home-features-backdrop` does, because it has an actual lighting idea: the three price cards should read as standing on a faint stage.

**Size** 2:1. Generate 3200x1600, ship 2560x1280.

**Safe area** Cards occupy the middle 62% of the width and the middle 45% of the height. That whole region flat.

**Prompt**

```
A dark background plate with one idea in it. A wide expanse of matte bead-blasted graphite recedes into deep neutral graphite #1c1b21 across the entire upper two thirds of the frame, completely empty, holding no object and no detail. Low in the frame, well below the centre, one very broad and very shallow pool of warm amber #ffb347 light lies flat across the surface, centred horizontally, spread so wide and so softly that it has no discernible edge on any side and dissolves entirely before it reaches the left or right edge of the frame. At its brightest it is still dim, no lighter than a warm graphite, and it is warmth rather than brightness. Nothing casts it and no source is visible. Above the pool the surface simply darkens with distance. Fine physical film grain over the whole plate, faint bead-blast tooth in the metal, extremely restrained contrast, no bloom, no glow halo, no vignette, no hotspot, no visible light shape. The darks hold at an even neutral graphite floor, never crushed to pure black and never tinted blue or violet.
```

**MJ tail** `--ar 2:1 --style raw --v 7 --no object, subject, product, spotlight, visible light source, hard edged pool, hotspot, vignette, pattern, rings, arcs, pure black, crushed shadows, blue-black, neon, glow bloom, lens flare, cyan, blue, purple, green, 3D render, gradient mesh, text, logo, people`

**Negative**

```
object, subject, product, pedestal, stage, spotlight, visible light source, lamp, hard edged pool of light, circular spotlight, hotspot, vignette, pattern, concentric rings, arcs, wavefronts, pure black, #000000, crushed shadows, blue-black, violet cast, neon, glow, bloom, glow halo, lens flare, cyan, blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, CGI, gradient mesh, text, letters, logo, watermark, UI, people
```

**Check** Lay the three price cards over it. The pool must sit below the lowest card edge or the cards lose separation from it. If the pool has any visible boundary it reads as a spotlight and the section starts looking like a product launch, which is exactly the wrong register for a $12/year page.

**Fallback** Flat `#1c1b21`.

---

## 9. `home-interstitial-3` — the last hinge

**Where** **Full-bleed band.** Sits directly after pricing and directly before the closing action, which is now an IVORY band. So this is a dark-to-light seam like band 1, not the dark-on-dark pause it was first specified as: the closing action moved to light because the page was ending on its third graphite block in a row.

It is still the quietest plate in the set, and it must not repeat band 1's exit. Band 1 lifts through the whole frame from a source below. This one stays flat and empty almost all the way down and then breaks to ivory across a single hard machined edge near the bottom. Three fades in one page would read as a device.

**Size** 6:1. Generate 3456x576, ship 2880x480. On the artboard: 1440 wide, 240 tall.

**Safe area** No type. Whole plate visible.

**Prompt**

```
An extremely wide letterbox photograph that is almost entirely empty. A flat expanse of matte bead-blasted graphite fills the upper five sixths of the frame in an even deep neutral #1c1b21, edge to edge, holding nothing. A little above the vertical centre, one single hairline of dim brushed champagne gold #e8b84b runs horizontally from the left edge of the frame to the right edge, unbroken, perfectly level and true, so fine it is barely more than a change in the surface. Around the middle third of its length the faintest warmth gathers, a trace of amber #ffb347 in the line itself, dying away completely long before either end. Near the bottom of the frame the graphite terminates along one absolutely straight machined edge running the full width, level and true, catching a single thin specular highlight on its near face; below that edge, filling the bottom sixth of the frame, lies a flat expanse of clean uncoated white paper at #ffffff, evenly lit across the entire width with no hotspot and no falloff toward either side. The transition is a physical edge, a cut between two materials, never a gradient or a blend. Nothing else exists in the frame: no second line, no object, no pattern, no texture beyond the fine metal tooth, the paper grain and a fine physical film grain over everything. No vignette, no bloom, no glow halo, extremely restrained contrast. The darks hold at an even neutral graphite floor throughout, never crushed to pure black and never tinted blue or violet.
```

**MJ tail** `--ar 6:1 --style raw --v 7 --no second line, multiple lines, object, subject, pattern, texture, detail, vignette, hotspot, glow, bloom, gradient transition, soft blend, sloping edge, pure black, crushed shadows, blue-black, neon, cyan, blue, purple, green, 3D render, gradient mesh, text, logo, people`

**Negative**

```
second line, multiple lines, grid, object, subject, product, pattern, repeating pattern, heavy texture, visible detail, high contrast, vignette, corner darkening, hotspot, glow, bloom, glow halo, lens flare, sparkles, gradient transition, soft blend, feathered edge, sloping edge, tilted horizon, pure black, #000000, crushed shadows, blue-black, violet cast, neon, cyan, blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, CGI, gradient mesh, text, letters, numbers, logo, watermark, UI, people
```

**Check** Three things. The gold line must be level to within a pixel across 2880 and reach both edges. The machined edge must be level to within a pixel, and it must be a CUT, not a fade: if the two materials blend into each other this becomes a second copy of band 1. And the white must read as the same paper as `#ffffff`, because the closing band begins immediately below it with no rule between them.

**Fallback** A 1px full-bleed rule: `border-top: 1px solid rgba(255,255,255,0.09)` with 120px of `#1c1b21` above it, meeting the white band directly. Genuinely fine.

---

## 10. `home-cta`

**Where** Full-bleed behind section 6, the closing CTA. Above: `home-interstitial-3`. Below: the footer at `#232228`. The section currently carries `linear-gradient(to top, rgba(255,179,71,0.13) 0%, rgba(232,184,75,0.05) 22%, transparent 46%), #1c1b21`.

**Verdict changed from `BLOCK-GRAPHICS.md`.** Slot 11 was ruled do-not-generate on the grounds that the CSS gradient already is the asset, and that is still true of the _shape_. What a plate adds is **material**: grain, surface tooth and the micro-variation of real light on real metal, which a CSS gradient cannot have and which is exactly what separates the closing screen from a template. The plate goes _under_ the gradient, which stays. If it never ships, nothing is lost.

**Size** 2:1. Generate 3200x1600, ship 2560x1280.

**Safe area** The headline, the sub-line, the store button and the package-name line all sit in the **middle 46% of the height, centred**. That band takes the least warmth and the least structure.

**Prompt**

```
A dark background plate lit entirely from below the bottom edge of the frame. A vast flat sheet of matte bead-blasted graphite fills the picture with no object on it and no horizon anywhere. A very large soft warm source lies just outside the bottom edge, so the surface is warmest along the bottom of the frame, a low even wash of amber #ffb347 that never becomes bright, and from there the light falls away smoothly upward through champagne gold #e8b84b warmth in the lower third, into raised chassis grey #232228 across the middle, and finally into an even deep neutral graphite #1c1b21 that fills the entire upper third with nothing in it at all. The falloff is real light on a real matte surface, not a colour ramp: the bead-blast tooth and the film grain remain visible and continuous all the way through it, and the warmth varies very slightly across the width as a real source would rather than being mathematically even. No edge, no line, no seam, no object, no horizon, no visible source. Fine physical film grain over the whole plate, restrained contrast, no bloom, no glow halo, no lens flare, no vignette, no hotspot. The darks hold at an even neutral graphite floor, never crushed to pure black and never tinted blue or violet. Warm, open, final.
```

**MJ tail** `--ar 2:1 --style raw --v 7 --no object, subject, horizon, horizon line, edge, seam, sun, sunrise, sunset, landscape, visible light source, hotspot, vignette, bloom, lens flare, banding, gradient mesh, pure black, crushed shadows, blue-black, red, orange, cyan, blue, purple, green, 3D render, text, logo, people`

**Negative**

```
object, subject, product, horizon, horizon line, skyline, landscape, mountains, sun, sunrise, sunset, clouds, sky, edge, seam, machined edge, visible light source, lamp, hotspot, vignette, bloom, glow halo, lens flare, colour banding, posterisation, gradient mesh, flat digital ramp, pure black, #000000, crushed shadows, blue-black, violet cast, red, saturated orange, cyan, blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, CGI, text, letters, logo, watermark, UI, people
```

**Check** The word "warm light rising from below" pulls every model straight to a sunrise. Any hint of sky, cloud or landscape and it goes. Then confirm the upper third is genuinely empty and within a few points of `#1c1b21`, because the section has a `1px rgba(255,255,255,0.09)` top border and any lift behind it makes that border disappear. Check for banding at 100%: this plate is mostly falloff and it is the most band-prone in the set.

**Fallback** The existing CSS gradient, unchanged. It is already complete.

---

## 10b. `home-interstitial-4` — optional, and probably not

**Where** Inside section 3, the features teaser, between the first row of three cards and the second row. A **thin full-bleed rule-band**, not a picture.

**Size** 12:1. Generate 3840x320, ship 2880x240.

Specified only so the option is on record. **The recommendation is not to ship it.** Three bands on a six-block page is already the ceiling (antipattern 3), and a band inside a card grid breaks the grid's own rhythm, which is the one thing holding the six routes together as a set. If it is built anyway, it is the same subject as `home-interstitial-3` at half the height and half the contrast, and it takes the same prompt with `--ar 12:1`.

**Fallback** Nothing. This slot's fallback is its default state.

---

# FEATURES INDEX — `design/FeaturesIndex.dc.html`

---

## 11. `features-index-hero`

**Where** Full-bleed behind the page header. Above: the 80px site header. Below: the six-item feature list. Currently the standard radial wash over `#1c1b21`.

Lowest-priority slot on this page — the header carries a heading, a paragraph and a "What is not here" note on the right, so type covers most of the frame and there is little room for a picture.

**Size** 3:1. Generate 3200x1067, ship 2560x853.

**Safe area** Type occupies the left 58% and a boxed note sits in the right 34%. Only the top strip and the bottom strip are free.

**Prompt**

```
A very quiet dark background plate. A wide sheet of matte bead-blasted graphite fills the frame in an even deep neutral #1c1b21, empty across the whole central region. Along the very top edge only, one broad soft wash of light enters from above and outside the frame, lifting the surface to raised chassis grey #232228 within the first eighth of the frame height and dying away completely below that, evenly across the full width with no hotspot and no falloff toward either side. Along the very bottom edge, a single perfectly level hairline of dim champagne gold #e8b84b runs the full width, unbroken. Nothing else is in the frame: no object, no pattern, no arcs, no rings, no texture beyond the fine bead-blast tooth of the metal and a fine physical film grain over everything. No vignette, no bloom, extremely restrained contrast. The darks hold at an even neutral graphite floor, never crushed to pure black and never tinted blue or violet.
```

**MJ tail** `--ar 3:1 --style raw --v 7 --no object, subject, pattern, rings, arcs, detail, contrast, vignette, hotspot, pure black, crushed shadows, blue-black, neon, glow, cyan, blue, purple, green, 3D render, gradient mesh, text, logo, people`

**Negative**

```
object, subject, product, pattern, concentric rings, arcs, wavefronts, heavy texture, visible detail across the centre, high contrast, vignette, hotspot, pure black, #000000, crushed shadows, blue-black, violet cast, neon, glow, bloom, lens flare, cyan, blue, purple, magenta, teal, green, cyberpunk, glossy 3D render, CGI, gradient mesh, text, letters, logo, watermark, UI, people
```

**Check** Lay the real heading and the note box over it. Nothing should be perceptible behind either.

**Fallback** The existing radial wash over `#1c1b21`.

---

## 12. `features-index-interstitial` — the six

**Where** **Full-bleed band.** Sits directly after the six-item feature list and directly before the white FAQ band at `#ffffff`. Dark-to-light seam.

This is the best plate on the features index and the whole reason the page header gets a quiet backdrop instead: put the picture where no type has to live on it.

**Size** 5:1. Generate 3200x640, ship 2560x512. On the artboard: 1440 wide, 288 tall.

**Safe area** No type.

**Prompt**

```
An extremely wide letterbox macro photograph. Six identical slugs of machined aluminium, each a short cylinder with sharp chamfered ends and a matte bead-blasted finish in anodised graphite #2b2934, lie in a single evenly spaced row across the frame, all six lying parallel to each other and perpendicular to the row, on a darker matte graphite surface at #1c1b21. All six are the same size and the same finish; the third from the left sits a few millimetres nearer the camera than the others, and that is the only difference between them. One long raking source from the far left at an extremely low angle draws a single thin unbroken specular line of champagne gold #e8b84b along the upper chamfer of every slug, each one identical, warming to amber #ffb347 only on the nearest one. Fill light is almost nonexistent and the surface between the slugs falls away into an even neutral graphite. The outermost slug at each end is cropped by the frame edge, so the row continues beyond the picture on both sides. Fine dust on the surface, honest micro-scratches on the anodising, unretouched. Shot on a long lens so the row compresses and the far ends soften slightly. Fine physical film grain, matte throughout, no gloss, restrained contrast, no bloom. Photographed, not rendered. No markings, no engraving, no numbering of any kind on any slug.
```

**MJ tail** `--ar 5:1 --style raw --v 7 --no markings, engraving, numbers, labels, text, logo, watermark, different sizes, uneven spacing, 3D render, CGI, glossy, plastic, chrome, white background, softbox, flat lighting, pure black, crushed shadows, blue-black, cyan, blue, purple, green, neon, people, hands`

**Negative**

```
markings, engraving, stamped numbers, labels, part numbers, text, letters, logo, watermark, slugs of different sizes, uneven spacing, five objects, seven objects, 3D render, CGI, octane, glossy plastic, chrome, mirror polish, white background, bright softbox, flat even lighting, pure black, #000000, crushed shadows, blue-black, violet cast, cyan, electric blue, purple, magenta, teal, green, neon, glow, lens flare, people, hands, desk props
```

**Check** Count them. Models routinely deliver five or seven and it is the fastest way to make a page about six features look careless. Then check the six speculars are the same weight — the whole point of the plate is that the six routes are equals, and one brighter slug says one feature matters more.

**Fallback** The section seam as it stands. No box, no rule.

---

# THE SIX FEATURE ROUTES

All six pages share one structure: site header → feature header on `#1c1b21` with the standard radial wash → a content region on `#1c1b21` (a signal-path ribbon and/or a sticky phone rail) → the white specification band at `#ffffff` → prev/next → CTA → footer.

So all six get the same two slots in the same two places:

- **`<route>-hero`** — full-bleed behind the feature header. Type sits **left**, four stat cells sit beneath it, so the left 60% is the safe area on every one of the six.
- **`<route>-interstitial`** — full-bleed band between the end of the content region and the top of the white specification band. Dark-to-light seam, no type, same 4:1 on every one of the six.

**The ivory specification bands get no image.** They are six-row tables of numbers, and a plate behind a table is noise. That is a decision, not an omission.

**`IMAGE-PROMPTS.md` slot 9**, the tall 1:2 vertical background, is unchanged and still belongs to the sticky phone rail. It sits between these two slots on the page and does not overlap either.

**Sizes, all twelve.** Heroes: 2.6:1, generate 3328x1280, ship 2560x985. Interstitials: 4:1, generate 3200x800, ship 2560x640 — on the artboard, 1440 wide by 360 tall.

**Shared MJ tail for all twelve** — append the per-slot additions where given.

```
--style raw --v 7 --no text, letters, numbers, engraving, markings, labels, logo, watermark, UI, screens, 3D render, CGI, glossy plastic, chrome, mirror polish, white background, softbox, flat lighting, pure black, crushed shadows, blue-black, cyan, blue, purple, magenta, teal, green, neon, glow bloom, lens flare, sparkles, gradient mesh, people, hands
```

**Shared Negative for all twelve** — append the per-slot additions where given.

```
text, letters, numbers, engraving, stamped markings, labels, part numbers, logo, watermark, signature, UI elements, screens, interface, 3D render, CGI, octane, glossy plastic, chrome, mirror polish, white background, bright softbox, flat even lighting, pure black, #000000, crushed shadows, blue-black, violet cast in the darks, cyan, electric blue, purple, magenta, teal, green, neon, glow, bloom, glow halo, lens flare, sparkles, bokeh balls, gradient mesh, iridescent, holographic, people, hands, desk props, coffee, lifestyle scene
```

---

## 13. `feature-usb-dac-hero`

**Where** `design/FeatureUsbDac.dc.html`, behind the feature header. Above: site header. Below: the signal-path ribbon.

**Safe area** Left 60%: eyebrow, h1 "Direct USB DAC output", a long paragraph, four stat cells.

**Prompt**

```
An extremely close macro photograph of a USB-C connector body machined from a single billet of aluminium, anodised deep graphite, entering the frame from the right edge and cropped so that only its forward third is visible and the cable end is outside the picture. The oval shell is sharp-edged and precise, its lip chamfered, and inside it the flat contact tongue is resolved in fine detail, each contact catching one small point of champagne gold #e8b84b. One raking source from the low right traces a single thin unbroken specular line of gold along the top of the shell, warming to amber #ffb347 where it is hottest at the connector's leading edge. The entire left two thirds of the frame is a completely empty field of deep neutral graphite #1c1b21, out of focus, holding no detail, no object and no structure whatsoever, into which the connector's own light falls away within centimetres. Fine dust and honest micro-scratches on the anodising, unretouched. Shot on a 100mm macro at f/2.0 so the contacts are tack sharp and everything behind them dissolves. Warm low-key grade, fine physical film grain, matte surfaces, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions** to the shared tail and negative: `busy left side, detail on the left, second connector, cable, port array, motherboard, PCB`

**Check** Sample nine points across the left 60%: all within a few points of `#1c1b21`. Confirm there is exactly one connector and that the contact tongue is a single flat blade, not a row of pins — a pin array reads as a different standard entirely and an audiophile audience will notice.

**Fallback** The existing radial wash over `#1c1b21`.

---

## 14. `feature-usb-dac-interstitial`

**Where** Between the sticky phone rail and the white specification band.

**Prompt**

```
An extremely wide letterbox macro photograph of a single flat braided cable running horizontally across the entire frame, entering at the left edge and leaving at the right edge, taut and perfectly straight, unbroken along its whole length with no join, no kink, no connector and no interruption of any kind. The braid is resolved: individual strands of dark graphite sheathing catch the light at slightly different angles along the whole run. One long raking source from behind and above draws a single thin unbroken specular line of champagne gold #e8b84b along the cable's upper surface, even from end to end, warming very slightly to amber #ffb347 toward the middle of the frame. The cable sits a little above the vertical centre. Above and below it the field is an even deep neutral graphite #1c1b21, empty, softening out of focus toward both the top and the bottom of the frame. Across the very bottom, one perfectly straight machined edge runs the full width, horizontal and true, catching a single hairline specular on its near face, and below that edge the frame ends. Shot on a long macro lens, warm low-key grade, fine physical film grain, matte throughout, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions**: `broken cable, cut cable, frayed, connector, plug, kink, coil, knot, second cable, cable ending inside the frame, sloping bottom edge`

**Check** The cable must exit both edges and carry no join anywhere along 2560px. A join in a plate whose entire meaning is "unbroken path" inverts the section. Confirm the bottom edge is level.

**Fallback** The section seam as it stands.

---

## 15. `feature-eq-hero`

**Where** `design/FeatureEq.dc.html`, behind the feature header. Below: the sticky phone rail with the live EQ curve.

**The honesty constraint bites hardest here.** The subject is shaped like a curve because the product is a curve editor, and a generated curve arrives with hallucinated axes, gridlines and kHz labels a large fraction of the time — which converts a plate into a fabricated measurement, the one thing this design system forbids outright. The fix is to specify it as **a machined solid whose top edge happens to be a curve**, photographed as an object, and to negate the axis, the baseline, the ticks and the numbers explicitly and repeatedly.

**Safe area** Left 60%.

**Prompt**

```
An extremely close macro photograph of a single solid block of machined aluminium, anodised deep graphite, whose upper surface has been milled into one long smooth continuous contour that rises to a single broad crest a little right of centre and falls away again, like a cam or a template profile cut from solid metal. The block enters from the right edge of the frame and its far end is cropped outside the picture. The milled surface carries the fine concentric tool marks of the cutter that made it, catching light at slightly different angles along the curve. One raking source from the low right draws a single thin unbroken specular line of champagne gold #e8b84b along the entire crest of the contour, warming to amber #ffb347 at the very top of the rise. It is a physical object resting on a matte graphite surface, seen slightly from above, with real thickness and a visible chamfered side face. The entire left two thirds of the frame is an empty field of deep neutral graphite #1c1b21, out of focus, holding nothing. There is no baseline, no horizontal axis, no vertical axis, no grid, no gridlines, no tick marks, no scale, no numbers, no labels and no annotation anywhere in the frame: it is a milled solid, not a plotted graph. Fine dust and honest micro-scratches, unretouched. Shot on a 100mm macro at f/2.0, warm low-key grade, fine physical film grain, matte surfaces, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions**: `graph, chart, plot, axis, x axis, y axis, baseline, grid, gridlines, tick marks, scale, frequency labels, kHz, dB, decibels, numbers, annotation, oscilloscope, waveform display, equalizer UI, sliders, busy left side`

**Check** Reject on any axis, gridline, tick, digit or unit, no matter how good the rest is. Reject anything that reads as a screen rather than as metal. Then confirm it is one crest only — two crests start to look like plotted data.

**Fallback** The existing radial wash over `#1c1b21`.

---

## 16. `feature-eq-interstitial`

**Where** Between the sticky phone rail and the white specification band.

Thirty-two pins, all **identical in height**. Identical is the point: a row of varying heights is a bar chart and therefore an invented measurement.

**Prompt**

```
An extremely wide letterbox macro photograph of a long row of identical machined pins standing upright in a line across the entire frame, entering at the left edge and leaving at the right edge so the row continues beyond the picture on both sides. Every pin is exactly the same height, the same diameter and the same finish: a slender cylinder of anodised graphite aluminium with a flat chamfered top, matte and bead-blasted, spaced at a perfectly even pitch. They stand on a darker matte graphite surface at #1c1b21. One long raking source from the far left at an extremely low angle catches the chamfered top of every pin with a single small identical point of champagne gold #e8b84b, so the row of highlights runs level and evenly pitched from edge to edge, warming very slightly to amber #ffb347 near the centre of the frame. Shot on a long lens at a shallow aperture so the pins nearest the middle are tack sharp and the row softens progressively toward both edges. Deep empty graphite above the pins, falling away to nothing. Fine dust, honest micro-scratches, unretouched. Fine physical film grain, matte throughout, restrained contrast, no bloom. Photographed, not rendered. No pin is taller or shorter than any other.
```

**Per-slot additions**: `pins of different heights, varying heights, bar chart, graph, histogram, equalizer sliders, axis, grid, scale, numbers, uneven spacing`

**Check** Any height variation at all makes it a bar chart. Scan the top of the row for a level line of highlights. If the model has introduced a contour, regenerate — do not crop around it, because the crop always leaves a hint of the shape.

**Fallback** The section seam as it stands.

---

## 17. `feature-library-hero`

**Where** `design/FeatureLibrary.dc.html`, behind the feature header. Below: the sticky phone rail showing Albums / Artists / Tracks.

**Safe area** Left 60%.

**Prompt**

```
An extremely close macro photograph of the face of an archive cabinet machined entirely from aluminium. A tight grid of identical small drawer fronts fills the right portion of the frame, each one a plain rectangle of anodised graphite with a chamfered edge and a single shallow milled finger recess along its lower lip, matte and bead-blasted, absolutely blank with no label, no card holder, no handle and no marking of any kind. The grid is cropped by the frame on the right and the bottom so it clearly continues beyond the picture. One drawer, low and toward the right, sits a few millimetres proud of the rest, and its edges catch a thin specular line of champagne gold #e8b84b, warming to amber #ffb347 in the shadow that opens behind it. Everything else is lit by one raking source from the low left that draws the faintest identical highlight along every chamfer. The entire left two fifths of the frame falls away into an empty field of deep neutral graphite #1c1b21 with nothing in it. Fine dust settled in the recesses, honest micro-scratches on the anodising, unretouched. Shot on a 100mm macro at f/2.8 so the proud drawer is tack sharp and the grid softens with distance. Warm low-key grade, fine physical film grain, matte surfaces, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions**: `labels, label holders, card holders, index cards, handles, knobs, keyholes, wood, brass, vintage, library card catalogue, filing cabinet in an office, busy left side`

**Check** The single most likely drift is a vintage wooden card catalogue with brass label holders, which is charming and completely off-brand. It must read as machined aluminium. Reject anything with a label holder, because a label holder is a place a hallucinated word will appear.

**Fallback** The existing radial wash over `#1c1b21`.

---

## 18. `feature-library-interstitial`

**Where** Between the sticky phone rail and the white specification band.

**Prompt**

```
An extremely wide letterbox macro photograph of a dense stack of hundreds of very thin anodised aluminium plates, seen exactly edge on, so that the picture is filled with a close horizontal banding of plate edges running across the full width of the frame. The stack enters at the left edge and leaves at the right edge and is cropped top and bottom, so it continues beyond the picture on every side. Every plate is the same thickness and they are stacked flush and true, their edges forming an even, precise, repeating rhythm; a few plates sit a fraction of a millimetre proud of their neighbours, which is the only irregularity. The plate edges are matte graphite and the narrow gaps between them fall away into deep neutral graphite #1c1b21. One long raking source from the far left catches the top edge of the stack in a single unbroken line of champagne gold #e8b84b, and picks out a faint identical highlight along a handful of the proud edges further down, warming to amber #ffb347 only at the top. Shot on a long macro lens so the middle of the frame is tack sharp and the stack softens toward both edges. Fine dust between the plates, honest and unretouched. Fine physical film grain, matte throughout, restrained contrast, no bloom, no moire. Photographed, not rendered.
```

**Per-slot additions**: `books, paper, pages, vinyl records, CDs, cassettes, shelf, spines, labels, moire, aliasing, interference pattern`

**Check** This plate will alias. Generate at 3200 wide, downscale to 2560 with a good resampler, then view at 100% and at 50% — a repeating fine banding produces moire at exactly one zoom level and it is always the one the user is at. If it moires at either, regenerate with fewer, thicker plates. Also confirm it has not become a stack of books or a shelf of record spines, which is where the model wants to go.

**Fallback** The section seam as it stands.

---

## 19. `feature-casting-hero`

**Where** `design/FeatureCasting.dc.html`, behind the feature header. Below: the sticky phone rail showing the cast picker.

**Safe area** Left 60%.

**Prompt**

```
An extremely close macro photograph of a solid manifold block machined from one billet of aluminium, anodised deep graphite, entering the frame from the right and cropped so its far side is outside the picture. Four precisely bored circular ports open through one visible face in a row, each identically machined with a clean chamfered lip, and a single larger bore opens through the adjacent face. Every bore is empty and dark inside, falling away to nothing. The block's faces are matte bead-blasted with sharp chamfered arrises. One raking source from the low right traces a thin unbroken specular line of champagne gold #e8b84b along the top arris and catches the chamfered lip of each of the four bores identically, warming to amber #ffb347 deep inside the single larger bore, which is the only warmth in the frame. Nothing is connected to it: no cable, no hose, no fitting, no wire. The entire left two thirds of the frame is an empty field of deep neutral graphite #1c1b21, out of focus, holding nothing. Fine dust and honest micro-scratches, unretouched. Shot on a 100mm macro at f/2.0. Warm low-key grade, fine physical film grain, matte surfaces, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions**: `cables, wires, hoses, fittings, connectors attached, network diagram, nodes and edges, arrows, signal lines, router, switch, PCB, busy left side`

**Check** Nothing may be plugged into it. The moment a cable appears it becomes a network diagram, and a network diagram is a claim about topology this plate has no business making. Confirm there are exactly four small bores.

**Fallback** The existing radial wash over `#1c1b21`.

---

## 20. `feature-casting-interstitial`

**Where** Between the sticky phone rail and the white specification band.

**Prompt**

```
An extremely wide letterbox photograph of four identical upright cylinders of anodised graphite aluminium standing widely spaced in a single row across the frame, on a matte graphite surface at #1c1b21, photographed in very low light. Each cylinder is the same height, the same diameter and the same matte bead-blasted finish, with a flat chamfered top, and the spacing between them is perfectly even and generous, so the largest part of the picture is the empty deep graphite space between and behind them. Nothing connects them: no line, no cable, no beam, no arc, nothing at all in the space between. One long raking source from the far left catches each cylinder identically, drawing the same thin unbroken specular line of champagne gold #e8b84b down the left side of every one, with a trace of amber #ffb347 only in the nearest. The two outermost cylinders are close to but not touching the left and right edges of the frame. The background falls away into an even deep neutral graphite with no wall, no horizon and no visible surface edge. Shot on a long lens so all four compress and the far pair softens very slightly. Fine dust, honest micro-scratches, unretouched. Fine physical film grain, matte throughout, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions**: `connecting lines, cables, beams, arcs, signal waves, wifi symbol, radio waves, network diagram, arrows, horizon, wall, three objects, five objects, different sizes`

**Check** Count them: four. Then confirm the space between them is genuinely empty — the model will want to add radio arcs or a wifi glyph, and either turns a photograph into an icon.

**Fallback** The section seam as it stands.

---

## 21. `feature-dsp-hero`

**Where** `design/FeatureDsp.dc.html`, behind the feature header. Below: the sticky phone rail showing the module rack.

**The text risk is highest on this one.** Rack faceplates are covered in legends in every photograph the models were trained on, so the negative has to fight for it.

**Safe area** Left 60%.

**Prompt**

```
An extremely close macro photograph of a rack faceplate machined from a single plate of aluminium, anodised deep graphite, filling the right portion of the frame and cropped by the frame edge on the right and the bottom. The panel is completely blank: brushed horizontally, with sharp chamfered edges, and carrying no legend, no engraving, no silkscreen, no lettering, no scale, no dot markings and no printing of any kind anywhere on its surface. Two shallow rectangular slots are milled through it in a vertical stack, their inner edges chamfered and their interiors falling away to nothing, and a single knurled control knob of the same anodised aluminium stands proud near the lower slot, its knurling fully resolved and its top face plain and unmarked. One raking source from the low left draws a single thin unbroken specular line of champagne gold #e8b84b along the panel's top chamfer and around the near lip of each slot, warming to amber #ffb347 on the knurled ridges of the knob. The entire left two fifths of the frame is an empty field of deep neutral graphite #1c1b21, out of focus, holding nothing. Fine dust in the milled slots, honest micro-scratches on the brushing, unretouched. Shot on a 100mm macro at f/2.0. Warm low-key grade, fine physical film grain, matte surfaces, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions**: `legend, silkscreen, engraving, panel markings, scale marks, dot scale, numbers, dB markings, VU meter, LED, indicator light, screen, display, patch cables, rack ears, screws, busy left side`

**Check** Zoom to 100% and read the panel. Any mark that could be a letter, a digit or a scale tick means reject — a half-formed legend on a faceplate is the most obviously generated thing that can appear on this site. Confirm no LED or indicator lamp appeared: an indicator is a status claim.

**Fallback** The existing radial wash over `#1c1b21`.

---

## 22. `feature-dsp-interstitial`

**Where** Between the sticky phone rail and the white specification band.

This is Fig. 05's meaning as a photograph: a hard ceiling, and a signal held under it. **The gap is the image.** If the two forms touch, the plate says the limiter is clipping, which is the opposite claim.

**Prompt**

```
An extremely wide letterbox macro photograph. High in the frame, one perfectly straight machined rail of anodised graphite aluminium runs horizontally across the entire width, entering at the left edge and leaving at the right, dead level and true, its lower arris crisp and catching one thin unbroken specular line of champagne gold #e8b84b along its whole length. Beneath it, a second solid form rises from the lower part of the frame: a long milled mass whose upper surface climbs gradually from the left, flattens into a broad level plateau across the middle of the frame, and falls away again toward the right. The plateau runs parallel to the rail above it and stops a clear, even, visible distance short of it along its entire length, so an unbroken channel of empty deep neutral graphite #1c1b21 separates the two forms from edge to edge and they never touch, never converge and never meet. The plateau's upper arris catches its own fainter gold specular, warming to amber #ffb347 at the crest. Both forms are matte and bead-blasted with fine tool marks. Deep empty graphite above the rail and below the lower mass. Shot on a long macro lens, warm low-key grade, fine physical film grain, matte throughout, restrained contrast, no bloom. Photographed, not rendered.
```

**Per-slot additions**: `touching, contact, converging, meeting, intersecting, closed gap, clipping, graph, chart, axis, grid, scale, numbers, waveform display, meter`

**Check** Trace the gap across the full 2560. It must never close and never narrow noticeably. This is a semantic check, not a cosmetic one: a closed gap makes the plate say the true-peak limiter is clipping, on the page that exists to say it does not.

**Fallback** The section seam as it stands.

---

## 23. `feature-ai-enhancer-hero`

**Where** `design/FeatureAiEnhancer.dc.html`, behind the feature header. Below: the sticky phone rail showing the Enhanced badge.

**Generate from the approved seed of `IMAGE-PROMPTS.md` image 4** and attach that image as a reference. Same visual world, different crop and composition: 4 is a 1:1 card plate, this is a wide header backdrop with the left 60% empty.

**Safe area** Left 60%.

**Prompt**

```
A dense three-dimensional field of thousands of tiny warm light points suspended in deep neutral graphite #1c1b21 optical space, photographed as a long exposure on a very wide frame. Each point is a minute physical glowing filament, warm amber #ffb347 at the core fading to champagne gold #e8b84b, some out of focus at the back of the field, a very small number cooling to a dim champagne ivory #fbe9c4. Hairline gold threads connect only immediate neighbours, forming an irregular organic lattice rather than a grid. The field is entirely confined to the right two fifths of the frame, where it is densest against the right edge and thins as it travels left, individual points growing further apart and dimmer until, well before the centre of the picture, they have stopped altogether. From there the entire left three fifths of the frame is an unbroken empty graphite field with no points, no threads and no detail whatsoever, only the faintest depth falloff and fine physical film grain. Restrained contrast, no bloom, no glow halo, no lens flare. The background settles into an even neutral graphite floor, never crushed to pure black and never tinted blue or violet. Sculptural, optical, engineered: the photograph of a filament sculpture in a dimly lit room.
```

**Per-slot additions**: `brain, human head, skull, silhouette, face, neural network diagram, node and edge diagram, circuit board, PCB traces, microchip, robot, android, matrix code, binary digits, points on the left, detail on the left`

**Check** It drifts into a brain silhouette or a textbook node-and-edge diagram; discard those. Then sample nine points across the left three fifths — a single stray filament there and the headline sits on a speck. Sample the empty background too: "suspended points in a void" pulls the model hard to near-black, and this plate butts against `#1c1b21` on all four sides.

**Fallback** The existing radial wash over `#1c1b21`.

---

## 24. `feature-ai-enhancer-interstitial`

**Where** Between the sticky phone rail and the white specification band.

This is the honesty statement as a photograph: **solid is what was in the file, unsettled is what the model produced.** Left to right, in reading order.

**Prompt**

```
An extremely wide letterbox photograph. The left two thirds of the frame is a single solid mass of machined aluminium, anodised deep graphite, matte and bead-blasted, its upper surface catching one thin unbroken specular line of champagne gold #e8b84b along a crisp arris that runs horizontally, entering at the left edge. The mass ends at a clean vertical boundary a little right of centre, cut square and true. To the right of that boundary the same form continues, but it is no longer solid: it is composed of thousands of individual suspended particles, each a minute warm point of amber #ffb347 fading to champagne gold, holding the same overall shape and the same arris line immediately beside the boundary and progressively dispersing as they travel right, until at the right edge of the frame they have scattered into unordered points with no shape at all. The transition across the boundary is abrupt in material but continuous in form: the silhouette matches exactly where the two meet. Above and below, deep neutral graphite #1c1b21, empty. Fine physical film grain across the whole plate, restrained contrast, no bloom, no glow halo. The darks hold at an even neutral graphite floor, never crushed to pure black and never tinted blue or violet. Photographed, not rendered.
```

**Per-slot additions**: `explosion, shattering, cracks, debris, smoke, dust cloud, disintegration effect, particle VFX, sparks, glitch, RGB split, brain, circuitry, arrow, direction indicator`

**Check** The silhouette must match across the boundary. If the particle side has drifted to a different height or profile, the plate stops saying "the same band, reconstructed" and starts saying "something else was added", which is a claim the page explicitly refuses to make. Also reject anything that reads as an explosion or a shatter — the section is about reconstruction, and destruction imagery inverts it.

**Fallback** The section seam as it stands.

---

# Part C. How the placeholder is drawn

Three variants. All three carry `data-img-slot="<slot-id>"` so the generated file can be dropped in later without touching the layout.

**The governing idea:** the placeholder is a **registration frame**, the thing a printer puts on a plate before the image goes on it. Corner ticks, a slot number set in mono, and a dimension line. That vocabulary is deliberate, it is already the site's vocabulary (`Fig. 01`, tabular figures, hairline rules), and it is the reason the placeholder reads as an intentional plate rather than a broken image.

**What is forbidden**, restated from `BLOCK-GRAPHICS.md` and still true: no dashed border, no diagonal cross, no mountain-and-sun image icon, no "image" label, no skeleton shimmer. Every one of those reads as broken. The only dashed frame on the whole canvas belongs to `ImageSlots.dc.html`, which is a catalogue of what is outstanding rather than a live page.

---

## C1. Contained plate, dark sections

Sits inside the 1280 content column. The frame is the site's own card chassis: `#24232b` ground, `rgba(255,255,255,0.09)` hairline, the standard `inset 0 1px 0 rgba(255,255,255,0.05)` top-rim specular, 16px radius.

```html
<div
  data-img-slot="feature-eq-hero"
  style="position: relative; aspect-ratio: 2.6 / 1; border-radius: 16px; background: linear-gradient(160deg, #26242e 0%, #24232b 46%, #221f29 100%); border: 1px solid rgba(255, 255, 255, 0.09); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05); overflow: hidden;"
>
  <!-- registration ticks, four corners -->
  <div
    style="position: absolute; top: 20px; left: 20px; width: 22px; height: 22px; border-top: 1px solid rgba(232, 184, 75, 0.34); border-left: 1px solid rgba(232, 184, 75, 0.34);"
  ></div>
  <div
    style="position: absolute; top: 20px; right: 20px; width: 22px; height: 22px; border-top: 1px solid rgba(232, 184, 75, 0.34); border-right: 1px solid rgba(232, 184, 75, 0.34);"
  ></div>
  <div
    style="position: absolute; bottom: 20px; left: 20px; width: 22px; height: 22px; border-bottom: 1px solid rgba(232, 184, 75, 0.34); border-left: 1px solid rgba(232, 184, 75, 0.34);"
  ></div>
  <div
    style="position: absolute; bottom: 20px; right: 20px; width: 22px; height: 22px; border-bottom: 1px solid rgba(232, 184, 75, 0.34); border-right: 1px solid rgba(232, 184, 75, 0.34);"
  ></div>
  <!-- centred label stack -->
  <div
    style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;"
  >
    <div
      style="width: 44px; height: 1px; background: rgba(232, 184, 75, 0.5);"
    ></div>
    <div
      style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; font-variant-numeric: tabular-nums; letter-spacing: 1.4px; text-transform: uppercase; color: #e8b84b;"
    >
      feature-eq-hero
    </div>
    <div
      style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-variant-numeric: tabular-nums; letter-spacing: 0.6px; color: rgba(255, 255, 255, 0.4);"
    >
      2.6 : 1 &nbsp;&middot;&nbsp; ships 2560 &times; 985
    </div>
  </div>
</div>
```

## C2. Full-bleed band, dark sections

No border, no radius, no card. The band is the section. Ground steps up to `#232228` so it separates from `#1c1b21` above and below, and hairlines close it top and bottom. Ticks pull in to 24px from the frame edge. The label sits **left-aligned at the 80px gutter**, not centred — a centred label on a 12:1 strip looks lost.

```html
<div
  data-img-slot="home-interstitial-2"
  style="position: relative; width: 100%; aspect-ratio: 4 / 1; background: linear-gradient(180deg, #232228 0%, #26242e 52%, #221f29 100%); border-top: 1px solid rgba(255, 255, 255, 0.09); border-bottom: 1px solid rgba(255, 255, 255, 0.09); overflow: hidden;"
>
  <div
    style="position: absolute; top: 24px; left: 24px; width: 26px; height: 26px; border-top: 1px solid rgba(232, 184, 75, 0.3); border-left: 1px solid rgba(232, 184, 75, 0.3);"
  ></div>
  <div
    style="position: absolute; top: 24px; right: 24px; width: 26px; height: 26px; border-top: 1px solid rgba(232, 184, 75, 0.3); border-right: 1px solid rgba(232, 184, 75, 0.3);"
  ></div>
  <div
    style="position: absolute; bottom: 24px; left: 24px; width: 26px; height: 26px; border-bottom: 1px solid rgba(232, 184, 75, 0.3); border-left: 1px solid rgba(232, 184, 75, 0.3);"
  ></div>
  <div
    style="position: absolute; bottom: 24px; right: 24px; width: 26px; height: 26px; border-bottom: 1px solid rgba(232, 184, 75, 0.3); border-right: 1px solid rgba(232, 184, 75, 0.3);"
  ></div>
  <div
    style="position: absolute; inset: 0; display: flex; align-items: center; padding: 0 80px;"
  >
    <div style="display: flex; align-items: center; gap: 18px;">
      <div
        style="width: 56px; height: 1px; background: rgba(232, 184, 75, 0.5);"
      ></div>
      <div
        style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; font-variant-numeric: tabular-nums; letter-spacing: 1.4px; text-transform: uppercase; color: #e8b84b;"
      >
        home-interstitial-2
      </div>
      <div
        style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-variant-numeric: tabular-nums; letter-spacing: 0.6px; color: rgba(255, 255, 255, 0.4);"
      >
        full-bleed band &nbsp;&middot;&nbsp; 4 : 1 &nbsp;&middot;&nbsp; ships
        2560 &times; 640
      </div>
    </div>
  </div>
</div>
```

## C3. Contained plate, white band

The dark chassis cannot be reused here. `#24232b` on `#ffffff` is a hole punched in the paper. The ivory placeholder is a **half-step down from the band**, `#f2f1ec`, with an ink hairline at 14% and the label in the deep gold ink `#7d5a12` — bright gold `#e8b84b` measures 1.60:1 on ivory and is invisible. No shadow of any kind, per the white band rule.

```html
<div
  data-img-slot="home-privacy"
  style="position: relative; aspect-ratio: 3 / 1; border-radius: 14px; background: linear-gradient(160deg, #f7f6f3 0%, #f2f1ec 55%, #eceae4 100%); border: 1px solid rgba(20, 19, 26, 0.12); overflow: hidden;"
>
  <div
    style="position: absolute; top: 20px; left: 20px; width: 22px; height: 22px; border-top: 1px solid rgba(125, 90, 18, 0.42); border-left: 1px solid rgba(125, 90, 18, 0.42);"
  ></div>
  <div
    style="position: absolute; top: 20px; right: 20px; width: 22px; height: 22px; border-top: 1px solid rgba(125, 90, 18, 0.42); border-right: 1px solid rgba(125, 90, 18, 0.42);"
  ></div>
  <div
    style="position: absolute; bottom: 20px; left: 20px; width: 22px; height: 22px; border-bottom: 1px solid rgba(125, 90, 18, 0.42); border-left: 1px solid rgba(125, 90, 18, 0.42);"
  ></div>
  <div
    style="position: absolute; bottom: 20px; right: 20px; width: 22px; height: 22px; border-bottom: 1px solid rgba(125, 90, 18, 0.42); border-right: 1px solid rgba(125, 90, 18, 0.42);"
  ></div>
  <div
    style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;"
  >
    <div
      style="width: 44px; height: 1px; background: rgba(125, 90, 18, 0.55);"
    ></div>
    <div
      style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; font-variant-numeric: tabular-nums; letter-spacing: 1.4px; text-transform: uppercase; color: #7d5a12;"
    >
      home-privacy
    </div>
    <div
      style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-variant-numeric: tabular-nums; letter-spacing: 0.6px; color: #4a4640;"
    >
      3 : 1 &nbsp;&middot;&nbsp; ships 2560 &times; 853
    </div>
  </div>
</div>
```

---

## The three backdrops get no placeholder at all

`home-hero`, `home-phonefan-stage`, `home-features-backdrop`, `home-pricing-backdrop`, `home-cta`, `features-index-hero` and the six `<route>-hero` slots are **backdrops behind live type**. A placeholder box behind a headline is not a placeholder, it is a wrecked section.

For all of those, the placeholder is the **section's existing ground plus its existing CSS wash**, exactly as the artboards show today, and the slot is recorded only as a comment above the section:

```html
<!-- img-slot: home-hero · 2:1 · ships 2560×1280 · safe area = left 52% and right 30% -->
```

That is the same position `BLOCK-GRAPHICS.md` took on slots 7 and 11, and it is still right. Those sections are already complete without an image, which is precisely why they are last in the priority order.

---

## Swapping a real image in

Keep the wrapper. Replace only the inner content, so the aspect ratio never shifts and the layout cannot move when an image lands:

```html
<div
  data-img-slot="home-interstitial-2"
  style="position: relative; width: 100%; aspect-ratio: 4 / 1; overflow: hidden;"
>
  <img
    src="/img/home-interstitial-2.webp"
    alt=""
    loading="lazy"
    decoding="async"
    width="2560"
    height="640"
    style="display: block; width: 100%; height: 100%; object-fit: cover; object-position: center;"
  />
</div>
```

`alt=""` on every one of these. All twenty-five are decorative: every claim on this site is carried in type, and none of these plates says anything a screen reader needs. A description of a machined block is noise in a screen reader and, on a page whose whole argument is that it does not embellish, it is also a small piece of embellishment.

For a backdrop, the same `<img>` goes in as an absolutely positioned first child of the section with `inset: 0; z-index: 0;` and the existing CSS wash stays on the section as its `background`, so the wash still lands on top of the plate and the type still sits above both.
