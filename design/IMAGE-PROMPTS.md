# Bitperfect Player - image generation prompts (graphite ground)

> **Read `SECTION-IMAGES.md` first.** It is the current authority on what imagery the
> site carries: 25 big-plate slots, one per section, with safe areas, ship sizes and
> the registration-frame placeholders that are drawn into the artboards today. It
> supersedes this file wherever the two disagree, because it was written after the
> brief changed to big artistic plates and interstitial bands.
>
> This file is still current for what it uniquely holds, and nothing here duplicates
> `SECTION-IMAGES.md`.

What this file uniquely holds: the nine original photographic plates, and the usage notes for each image model (Midjourney tails, Flux and Ideogram negative fields, Nano Banana phrasing). Those notes apply to every prompt in either file.

Paste one **Prompt** block at a time into your image model.

- **Midjourney**: paste the prose, then append the MJ tail. Do not paste the Negative block, `--no` covers it.
- **Flux / Ideogram**: paste the prose, put the Negative block in the negative field. Ideogram: turn Magic Prompt OFF, it adds neon and glow.
- **Nano Banana / Gemini**: paste the prose, then `Do not include: ` followed by the Negative block.

Generate at the size given (usually 2x display size) and downscale. Never upscale a small generation.

**Palette this set targets** (matches DESIGN.md after the graphite change):
page ground `#1c1b21` · raised chassis `#232228` · card `#24232b` · elevated `#26242e` · controls `#2b2934` · phone screen `#100f14` (the only near-black) · gold `#e8b84b` / `#f2c65e` · amber `#ffb347` · champagne ivory `#fbe9c4` · white band `#ffffff` with ink `#14131a` and deep gold ink `#7d5a12`.

**Gold is now the only accent.** The signal colours emerald, azure and indigo were dropped when the site went monochrome, so no prompt may name them. And gold on ivory is `#7d5a12`, never `#e8b84b`: the bright gold measures 1.60:1 on `#ffffff` and vanishes.

The critical rewrite: "true blacks with no lifted shadows" is gone from every prompt. Graphite IS a lifted black, so the prompts now ask for an even neutral graphite floor and explicitly forbid crushing to `#000000`. Leave the old phrasing in and the plate shows a visible seam where it meets the page.

---

## 1. Hero background field

**Where** Full-bleed behind the homepage hero. White headline sits over the centre, so the centre must stay empty.
**Size** 16:9, generate 2560x1440, ship 1920x1080.

**Prompt**

```
Abstract dark audiophile background plate on a deep neutral graphite ground #1c1b21. Concentric acoustic wavefronts radiate outward from a single origin point placed slightly below and left of centre, drawn as extremely fine hairlines in brushed champagne gold #e8b84b and #f2c65e. The centre of the frame is almost entirely empty - a calm, featureless graphite field where the wavefronts have thinned to nothing and the eye finds no detail. Ring density, line weight and warm amber #ffb347 warmth build gradually only toward the outer edges and the four corners, where the wavefronts overlap into fine moire. The rings are physical, not luminous: they read as raking light catching the turned concentric grooves of a machined aluminium faceplate, each ring carrying a thin specular top-rim highlight and settling into a slightly deeper graphite beneath. A few wavefronts break or interrupt mid-arc. Faint champagne ivory #fbe9c4 dust suspended in the field. Fine physical film grain across the entire plate, a very gentle vignette, restrained global contrast, no bloom. The darks are an even neutral graphite floor, never crushed to pure black and never tinted blue or violet - the deepest value in the frame stays around #1c1b21. Cinematic macro photograph of an object that does not exist. Empty, quiet, engineered.
```

**MJ tail** `--ar 16:9 --style raw --v 7 --no pure black background, crushed shadows, blue-black, neon, glow bloom, cyan, blue, purple, cyberpunk, 3D render, gradient mesh, lens flare, sparkles, bokeh, text, letters, logo, watermark, UI, people, bright center`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, violet cast in the darks, neon, glow, bloom, cyan, electric blue, purple, magenta, cyberpunk, synthwave, glossy 3D render, gradient mesh, iridescent, holographic, lens flare, sparkles, stars, bokeh, busy centre, bright hotspot, high contrast, text, letters, numbers, logo, watermark, UI elements, people
```

**Check** Eyedropper the centre: within a few points of `#1c1b21`, never brighter than `#2b2934`. Eyedropper the darkest corner: below roughly `#141318` means the model crushed the floor and the hero will show a seam against the page. Regenerate rather than lifting it in an editor, lifting reveals the grain as noise. Confirm the ring origin is off-centre, a dead-centre origin makes a bullseye that fights the headline.

---

## 2. DAC dongle and phone, product photography

**Where** The "real hardware" proof section, beside the USB output copy. Also usable as a store image.
**Size** 3:2, generate 2400x1600.

**Prompt**

```
Low-key editorial product photograph, real hardware. A small machined aluminium USB-C DAC dongle - roughly six centimetres long, anodised dark graphite, knurled barrel, a single 3.5mm output at one end, a short flat braided cable coiling loosely away - lies at a slight angle on a dark brushed slate surface in the graphite family, around #232228. Behind it and slightly out of frame sits a modern black slab phone, its screen off and showing no interface, that dark screen panel reading as a distinctly deeper near-black #100f14 against the lighter graphite of everything around it. A single warm gold rim light rakes in from the back right at a very low angle, tracing one thin unbroken specular line of champagne gold #e8b84b along the top edge of the dongle's knurling and along the phone's machined edge, with warm amber #ffb347 in the hottest part of that specular. Fill light is almost nonexistent; everything falls away into deep neutral graphite #1c1b21 within centimetres, the shadows staying open and neutral rather than collapsing into pure black, with no blue or violet cast anywhere in the darks. Fine dust and micro-scratches on the slate, honest and unretouched. Shot on a 100mm macro lens at f/2.0: the knurled barrel is tack sharp, the cable and the phone soften into shallow depth of field. Warm low-key colour grade, fine film grain, matte surfaces, no gloss retouching. Photographed, not rendered.
```

**MJ tail** `--ar 3:2 --style raw --v 7 --no pure black background, crushed shadows, blue-black, 3D render, CGI, plastic, glossy, white background, softbox, blue light, screen glow, interface, hands, people, logo, text, brand name`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, cold blue cast, 3D render, CGI, octane, plastic look, glossy plastic, mirror reflections, white background, bright studio softbox, flat even lighting, blue rim light, glowing screen, visible UI, app interface, hands, fingers, people, brand logos, lettering, text, watermark, floating objects, duplicated cables
```

**Check** Hallucinated brand marks or garbled lettering on the dongle or phone back are the most common failure and a legal problem, not just an aesthetic one. Confirm the cable enters the housing rather than fusing into it, and that the dongle has one plug and one output. Then sample the phone screen against the surface beside it: the screen must read clearly darker, or the phone stops reading as a device.

---

## 3. Brushed gold macro texture (divider / card edge)

**Where** Section divider strip and card top-edge treatment, used at 4-24px tall, tiled horizontally.
**Size** 4:1, generate 2400x600.

**Prompt**

```
Extreme macro photograph of brushed champagne gold metal, filling the entire frame. The brush grain runs strictly horizontally, perfectly parallel, edge to edge with no curvature and no visible start or end to any stroke. Thousands of fine directional scratches catch the light at slightly different angles, producing a continuous shimmer of champagne gold #e8b84b lifting to #f2c65e on the brightest ridges and dropping into a warm graphite shadow #2b2934 in the valleys, with occasional champagne ivory #fbe9c4 flecks where a scratch catches directly. Warm amber #ffb347 bleeds faintly into the lower third. The valleys stay open and readable at a graphite value, never blocking up into pure black. The lighting is one long soft raking source from the left, even across the full width, no hotspot and no falloff toward either side edge. Anodised satin finish, not mirror polish: the surface diffuses light rather than reflecting an environment. Fine physical grain, shallow but flat focus so the entire strip is uniformly sharp. Machined audio faceplate material. Seamlessly tileable left to right, with the left and right edges continuing each other exactly.
```

**MJ tail** `--ar 4:1 --style raw --v 7 --no crushed shadows, pure black, mirror polish, chrome, reflections, gradient, vignette, hotspot, glitter, sparkles, diagonal grain, text, logo, object, jewellery`

**Negative**

```
pure black, #000000, crushed shadows, blocked-up darks, mirror polish, chrome, environment reflections, gradient, vignette, hotspot, uneven lighting, glitter, sparkles, diamond, jewellery, diagonal or vertical grain, curved surface, rounded object, depth of field, text, logo, watermark
```

**Check** Seamlessness will probably fail. Offset the image 50% horizontally and heal the join by hand once, it makes the asset reusable forever. Confirm brightness is flat across the full width, a centre hotspot makes tiled dividers pulse. Check valley shadows against `#24232b`: valleys darker than the card punch a hard line into it at small sizes.

---

## 4. On-device AI, warm neural field resolving a waveform

**Where** The on-device processing feature block. Pairs with image 5.
**Size** 1:1, generate 1440x1440.

**Prompt**

```
A dense three-dimensional field of thousands of tiny warm light points suspended in a deep neutral graphite #1c1b21 optical field, photographed as a long exposure. The points are physical: each is a minute glowing filament, warm amber #ffb347 at the core fading to champagne gold #e8b84b, some out of focus into soft round bokeh at the back of the field, a very small number cooling to a dim champagne ivory #fbe9c4. Hairline gold threads connect only immediate neighbours, forming an irregular organic lattice rather than a grid. Running horizontally through this field, a single continuous audio waveform is in the act of resolving: on the left it is fully formed, dense, unmistakably a sharp waveform envelope in bright champagne ivory #fbe9c4; toward the centre it loosens; at the right edge it has dispersed back into unordered individual points with no shape at all. The transition between order and dispersion is gradual and physical, like particles finding their positions. The background behind the field settles into an even graphite floor around #1c1b21 with a soft depth falloff - it is never pure black and carries no blue or violet cast. Fine film grain, restrained contrast, no bloom, no glow halo. Sculptural, optical, engineered - the photograph of a filament sculpture in a dimly lit room.
```

**MJ tail** `--ar 1:1 --style raw --v 7 --no pure black background, crushed shadows, blue-black, brain, head, skull, face, circuitry, PCB, blue glow, cyan, neon, cyberpunk, robot, chip, network diagram, nodes and edges diagram, 3D render, text, icon`

**Negative**

```
pure black, #000000, crushed shadows, blue-black background, brain, human head, skull, silhouette, face, neural network diagram, node-and-edge diagram, circuit board, PCB traces, microchip, robot, android, indigo, violet, blue glow, cyan, electric blue, neon, cyberpunk, matrix code, binary digits, glossy 3D render, clip art, icon, infographic, text, labels, arrows
```

**Check** It drifts into a brain silhouette or a textbook node-and-edge diagram; discard those. The waveform must be legible as a waveform on the ordered side. Sample the empty background between points: "suspended points in a void" pulls the model to near-black, and this image sits on a `#24232b` card, so a black background cuts a hard rectangle out of it.

---

## 5. Privacy, closed and local

**Where** The privacy section. Pairs with image 4, same square footprint.
**Size** 1:1, generate 1440x1440.

**Prompt**

```
A single solid block of machined metal sits alone at the centre of a deep neutral graphite #1c1b21 field, photographed in low light. The block is milled from one billet - anodised graphite #2b2934, reading a clear half-step lighter than the field around it, with sharp chamfered edges, matte bead-blasted faces, and no ports, no seams, no fasteners, no openings of any kind. A single hairline gap runs around its midline, and warm amber #ffb347 light escapes from inside it as one thin unbroken line, the only light source in the frame, so the object is lit by its own contained interior. That light falls off within centimetres and reveals nothing around it. Across the darker surface beneath and behind the block, faint champagne gold #e8b84b signal traces curve outward, arc around, and return into the block - every single line closes back on itself and none of them reaches or crosses the edge of the frame. One tiny champagne ivory #fbe9c4 pinpoint glows on the block's face, used exactly once. Thin specular top-rim highlight along the block's upper chamfer. Fine film grain, restrained contrast, no bloom, no glow halo. The shadows and the surrounding field stay an even neutral graphite, never crushing to pure black and never tinted blue. Still, sealed, self-contained.
```

**MJ tail** `--ar 1:1 --style raw --v 7 --no pure black background, crushed shadows, blue-black, padlock, lock, keyhole, key, shield, badge, safe, vault door, chain, fingerprint, eye, blue, cyan, neon, 3D render, text, icon`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, padlock, lock, keyhole, key, shield, crest, badge, safe, vault, vault door, chain, handcuffs, fingerprint, eye, iris, camera, cctv, blue, cyan, neon glow, cyberpunk, glossy 3D render, floating UI, icon, symbol, text, watermark
```

**Check** Trace every gold line to its end. If one exits the frame the "nothing leaves this device" reading collapses. Check the silhouette has not drifted into a padlock or shield, and the white pinpoint appears once. The block and field are only a half-step apart now: roughly `#2b2934` object against `#1c1b21` field, carried by the rim highlight rather than raw contrast.

---

## 6. Open-graph social card background

**Where** OG / Twitter card plate. Wordmark and headline composited on top in code, so this ships wordless.
**Size** 1.91:1, generate 2400x1260, downscale to 1200x630.

**Prompt**

```
Wide dark background plate for a social preview card. The entire left two-thirds of the frame is deliberately empty: an unbroken deep neutral graphite #1c1b21 field with nothing but the faintest tonal drift toward raised chassis grey #232228 and fine physical grain, holding no detail an eye could catch. All visual interest is pushed into the right edge, where a large partial arc of concentric acoustic wavefronts enters from off-frame right - very fine hairlines in brushed champagne gold #e8b84b and #f2c65e, their origin outside the picture, so only a slice of the ring structure is visible and it thins to nothing before reaching the centre. A single thin horizontal champagne gold rule runs across the lower fifth of the frame, dimming as it travels left until it disappears. Warm amber #ffb347 sits only in the densest ring overlaps at the far right. Overall exposure is very low and very even across the empty region, with the darks holding at an even graphite floor rather than crushing to black and carrying no blue or violet cast. Gentle corner vignette, restrained contrast, no bloom, no bright hotspot anywhere. Machined, quiet, engineered. No text, no lettering, no logo, no symbols.
```

**MJ tail** `--ar 1.91:1 --style raw --v 7 --no pure black background, crushed shadows, blue-black, text, letters, logo, watermark, UI, frame, border, centred composition, bright areas, neon, blue, gradient mesh, 3D render`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, text, letters, words, numbers, logo, watermark, signature, UI mockup, browser frame, border, drop shadow card, centred subject, symmetrical composition, bright background, light grey, gradient mesh, neon, blue, cyan, glossy 3D render, people
```

**Check** Composite the real wordmark and headline over the left two-thirds and view at 400px wide, the size it appears in a feed. If type does not hold there, the plate is too busy. Check the ring arc does not crop awkwardly, some platforms trim card edges.

---

## 7. 404, interrupted signal path

**Where** The 404 page, above the copy and a link home.
**Size** 16:9, generate 1920x1080.

**Prompt**

```
A single horizontal signal path travels across a deep neutral graphite #1c1b21 field, photographed in low light. It is a taut hairline of champagne gold #e8b84b light - physical, like a lit filament wire stretched between two unseen points - and it enters cleanly from the left edge, carrying a fine waveform modulation along its length. Slightly right of centre the path breaks. On the near side of the break the filament frays: the wire unravels into a short spray of individual warm amber #ffb347 particles that drift apart and cool into the graphite within a few centimetres. Beyond a gap of empty graphite, the far segment continues toward the right edge, still lit but dimmer, its modulation flat and featureless, waiting. Around the break, one faint champagne ivory #fbe9c4 residual glow lingers in the air where the signal was. The whole scene is warm, quiet and unalarmed - nothing red, nothing broken violently, no sparks, no shattering. The field stays an even neutral graphite floor throughout, never crushed to pure black and never tinted blue. Fine film grain, thin specular highlight along the top of the filament, shallow depth of field softening both edges of the frame, restrained contrast, no bloom.
```

**MJ tail** `--ar 16:9 --style raw --v 7 --no pure black background, crushed shadows, blue-black, red, orange alarm, sparks, explosion, shattered glass, cracks, error icon, warning triangle, glitch, RGB split, static noise, blue, neon, text, numbers, 404`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, red, alarm colour, sparks, explosion, fire, shattered glass, cracks, broken screen, error icon, warning triangle, exclamation mark, glitch art, RGB channel split, scan lines, TV static, blue, cyan, neon, cyberpunk, text, letters, numbers, "404", watermark
```

**Check** The break must read as an interruption in one continuous line, not two unrelated streaks; if the segments are off-axis, regenerate. Confirm no digits appeared, models love to render "404" and it is always malformed. The gap must read as graphite the signal has vacated, not a black hole punched through the plate.

---

## 8. Album artwork placeholders, four variations

**Where** Stand-in cover art in library grids, now-playing screens and phone mockups. Four so a grid does not visibly repeat.
**Size** 1:1, generate each at 1024x1024. Ship at 512 and 128.

**8A, concentric**

```
Abstract square album cover artwork. Concentric rings of fine brushed champagne gold #e8b84b hairlines expanding from an origin low and right of centre across a deep neutral graphite #1c1b21 ground, the rings tightening and gaining warm amber #ffb347 warmth toward the bottom right corner and dissolving entirely toward the upper left. Physical raking light on machined grooves, thin specular top-rim highlight on each ring, fine film grain, restrained contrast, no bloom. The ground stays an even graphite value, never crushing to pure black and never tinted blue. Bold clear composition that stays readable when reduced to a small thumbnail. No text, no lettering, no logo.
```

**8B, spectrum bars**

```
Abstract square album cover artwork. A row of vertical bars of varying height spanning the full width of a deep neutral graphite #1c1b21 field, each bar a narrow strip of brushed champagne gold #e8b84b metal with a bright #f2c65e specular highlight along its top edge and a warm graphite shadow #2b2934 down its side, so the row reads as machined metal fins standing in raking light rather than as a graph. The height contour is irregular and organic. Heavy negative space above the bars, occupying the top half of the frame. Fine film grain, restrained contrast, no bloom, darks holding at an even graphite floor rather than pure black. Bold at thumbnail size. No text, no lettering, no logo, no numbers.
```

**8C, filament**

```
Abstract square album cover artwork. A single warm vacuum-tube filament arcs through a deep neutral graphite #1c1b21 field, glowing warm amber #ffb347 at its hottest bend and cooling to champagne gold #e8b84b at both ends, with a soft champagne ivory #fbe9c4 core at the very brightest point. Faint suspended dust catches the light around it. Everything else is empty graphite, evenly toned, never crushed to pure black and never tinted blue. Photographed close, shallow depth of field, fine film grain, restrained contrast, no lens flare and no glow halo. Bold and legible at thumbnail size. No text, no lettering, no logo.
```

**8D, ivory inverse** (uses the white band ink `#14131a`, not the page ground)

```
Abstract square album cover artwork on a warm light ground. A flat field of champagne ivory #ffffff fills the frame, faintly textured like uncoated paper stock. Across it, a single near-black #14131a geometric form: a thick horizontal band low in the frame with one narrow vertical stem rising from it, edges crisp and slightly imperfect as though letterpress printed. One thin line of brushed champagne gold #e8b84b runs along the top edge of the dark band. Generous empty ivory space above. Fine paper grain, matte, no gloss, no gradient, no shadow. Bold and legible at thumbnail size. No text, no lettering, no logo.
```

**MJ tail (all four)** `--ar 1:1 --style raw --v 7 --no pure black background, crushed shadows, blue-black, text, letters, words, typography, logo, watermark, photograph of a record, vinyl, CD, headphones, face, portrait, neon, blue, cyan, 3D render, gradient mesh`

**Negative (all four)**

```
pure black, #000000, crushed shadows, blue-black, text, letters, words, typography, band name, album title, logo, watermark, signature, vinyl record, turntable, CD, cassette, headphones, speaker, musical notes, treble clef, face, portrait, person, neon, blue, cyan, purple, cyberpunk, glossy 3D render, gradient mesh, busy detail
```

**Check** View all four together at 128px in a grid, which is how they are actually seen. Anything that turns to mud at that size is unusable. Kill anything with lettering, album covers are the strongest text-hallucination trigger and 8D's letterpress framing is especially prone. **Graphite caveat:** 8A to 8C sit at `#1c1b21` on a `#24232b` card, about eight points apart, so they will barely separate from the card. Test on a real `#24232b` swatch at 128px. If they float, fix it with a border or inner shadow in CSS, never by pushing the image back toward black.

---

## 9. Tall vertical background, feature pages

**Where** Full-height background on feature detail pages, under the phone mockup and body copy.
**Size** 1:2, generate 1600x3200.

**Prompt**

```
A tall vertical background plate, dark and extremely quiet. The ground shifts almost imperceptibly from deep neutral graphite #1c1b21 at the top through raised chassis grey #232228 in the middle and back to #1c1b21 at the bottom, with fine physical grain across the whole surface. The entire central region - roughly the middle sixty percent of the height - carries no detail whatsoever, only that slow graphite tonal drift. Detail exists only at the extremes: at the very top edge, the outermost few arcs of a concentric wavefront pattern in fine champagne gold #e8b84b hairlines enter from above and fade out within the first eighth of the frame; at the very bottom edge, a soft warm amber #ffb347 pool of light rises from below and dies away just as quickly. Running the full height, offset well to the left of centre, one continuous hairline seam of dim champagne gold catches light like the edge of a machined panel, so faint it is barely separable from the background. An even neutral graphite floor throughout - no pure black, no blue or violet cast, no bright areas, no hotspots, no bloom, restrained contrast.
```

**MJ tail** `--ar 1:2 --style raw --v 7 --no pure black background, crushed shadows, blue-black, bright areas, hotspot, busy detail, pattern across centre, neon, blue, cyan, gradient mesh, 3D render, text, logo, UI, people`

**Negative**

```
pure black, #000000, crushed shadows, blue-black, bright areas, hotspot, high contrast, busy detail, repeating pattern across the centre, texture over full frame, neon, glow, blue, cyan, purple, cyberpunk, gradient mesh, glossy 3D render, text, letters, logo, watermark, UI elements, device mockup, people
```

**Check** Lay body copy and a phone mockup over the middle at real size; nothing behind them should be noticeable. If the seam reads as a stripe rather than a suggestion, dim it in an editor. Confirm the top and bottom bands fade fully before the centre so the plate crops to any page height. This plate butts against the page ground on both sides at full height, so sample its top and bottom edges against `#1c1b21`: more than a few points off reads as a visible vertical band down the whole page.

---

## Style suffix, append to any future prompt

```
Rendered in the Bitperfect Player visual world: a deep neutral graphite ground #1c1b21, with raised chassis surfaces #232228, card surfaces #24232b and #26242e, and darker inline detail #2b2934; brushed champagne gold #e8b84b and #f2c65e accents, warm amber #ffb347 in the hottest light, and champagne ivory #fbe9c4 highlights. Gold is the only accent: no emerald, azure, indigo or any second hue anywhere. Machined audio hardware and vacuum-tube filament warmth, deep optical space, generous negative space, fine physical film grain, brushed metal micro-texture, thin specular top-rim highlights on every edge, raking low-angle light with almost no fill. Low-key and low-contrast, but the shadows resolve into an even neutral graphite floor rather than crushing to pure black - no #000000 anywhere in the frame, and no blue or violet cast in the darks. Photographic and physical rather than rendered. No text, no lettering, no logo, no UI.
```

Pair it with `--style raw --v 7`, your aspect ratio, and `--no pure black background, crushed shadows, blue-black`. `--style raw` is the important part; the default aesthetic model adds glow and saturation that breaks this palette and deepens the black point.

**Keeping a set consistent** Generate one image you are happy with, then reuse its seed across the rest of the set. For Nano Banana, attach the approved image and say "match the ground value, lighting, palette and grain of this reference." Images 4 and 5 and the four album covers especially need to look like siblings.

**Working around the models' pull toward black** Every one of these models associates "dark, moody, low-key" with a black floor, so expect to reject more generations than on a true-black palette. The reliable fix is to describe the ground as a lit surface rather than an absence: "a graphite surface under very low even light" beats "a dark void" every time.

**The one light exception** Only 8D uses the white ground. If a generation of anything else comes back light or washed, it has drifted and should go.

---

## Always exclude

**Black point and colour cast** (the change most likely to be missed)
pure black, `#000000`, crushed shadows, blocked-up darks, blue-black, violet or purple cast in the darks, cold shadows, true-black OLED look. And the opposite failure: milky washed-out grey, hazy fog, lifted contrast that greys out the golds.

**Colour and lighting**
any second accent hue, emerald, azure, indigo, violet, neon, glow, bloom, glow halo, lens flare, cyan, electric blue, cold blue tech, purple, magenta, teal-and-orange grade, iridescent, holographic, chrome, mirror polish, rainbow, high-key lighting, white background, softbox flat lighting.

**Style and genre**
cyberpunk, synthwave, blade runner, matrix code, binary digits, scan lines, glitch art, RGB channel split, TV static, glossy 3D render, octane render, gradient mesh, glass morphism, liquid chrome blobs, vaporwave, sci-fi HUD, clip art, infographic, flat vector illustration, Apple-style white minimalism, over-sharpened HDR.

**Objects and cliches**
brain, human head or skull silhouette, neural network node-and-edge diagram, glowing circuitry, PCB traces, microchip, robot or android, padlock, keyhole, key, shield, crest, badge, vault door, chain, fingerprint, eye or iris, CCTV camera, musical notes, treble clef, vinyl record, turntable, cassette, headphones on a model, sound-wave clip art with rounded caps, rocket, lightbulb idea icon.

**People and stock-photo tropes**
smiling people, someone enjoying music with eyes closed, hands holding a phone, lifestyle cafe scenes, diverse team at a table, anyone at all, in any of these nine images.

**Honesty constraints, specific to this brand**
fake measurement graphs, frequency response curves, THD or SNR readouts, oscilloscope traces presented as real data, invented spec numbers, lab equipment implying tests that were not run, award badges, five-star ratings, "certified" or "audiophile grade" seals, any number the marketing copy cannot back up.

**Always**
no text, no lettering, no words, no numbers, no logo, no watermark, no signature, no UI chrome, no browser frames. All nine images ship wordless, with type composited on top in code.
