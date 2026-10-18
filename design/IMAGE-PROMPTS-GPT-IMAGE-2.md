# Bitperfect Player — gpt-image-2 Local Generation Recipes

> High-fidelity prompt engineering recipes for local generation using `gpt-image-2`.
> Tailored for Bitperfect Player's high-end audiophile design system: dark neutral graphite grounds (`#1c1b21`), warm champagne gold accents (`#e8b84b`), deep amber vacuum tube warmth (`#ffb347`), solid American walnut, and bead-blasted dark titanium.

---

## 1. System Parameters & Generation Guide

| Parameter                | Recommended Value                          | Notes                                                                       |
| :----------------------- | :----------------------------------------- | :-------------------------------------------------------------------------- |
| **Model**                | `gpt-image-2` / local diffusion checkpoint | Optimized for photographic realism & tactile materiality                    |
| **Color Space**          | sRGB / Display P3                          | Deep lifted graphite floor (`#18171d` to `#1c1b21`), zero crushed black     |
| **Guidance Scale (CFG)** | `6.0` – `7.5`                              | Avoid values > 8.0 to prevent oversaturation and edge fringing              |
| **Steps**                | `35` – `50` steps                          | Ensures fine litz wire braids and microscopic vinyl grooves resolve cleanly |
| **Sampler**              | `DPM++ 2M Karras` or `Euler A`             | Clean falloff without digital ring artifacts                                |

---

## 2. Universal Master Negative Prompt

Paste this exact negative prompt into all local generation calls:

```text
(worst quality:1.4), (low quality:1.4), (normal quality:1.2), lowres, artifacts, jpeg compression, watermark, signature, username, text, logo, words, letters, font, typography, numerals, UI chrome, buttons, sci-fi neon, electric cyan, magenta, purple glow, ultraviolet, cyberpunk, synthwave, plastic look, glossy plastic, 3D render, CGI plasticity, octane render, uncompressed reflections, bright white studio softbox, harsh direct flash, flat lighting, lens flare, sparkles, glitter, starbursts, floating particles, bokeh spheres, oversaturated, people, hands, fingers, human faces
```

---

## 3. Hero Art Recipes (`16:9` — 1920×1080)

### Hero 1: Warm 300B Vacuum Tube Filament & Anodized Titanium Enclosure

- **Aspect Ratio**: `16:9` (1920×1080, native canvas 2560×1440 downscaled)
- **Safe Area**: Center-left 40% reserved for headline typography; visual mass weighted on the right.
- **Theme**: Warm vacuum tube filament glow (300B triode) meeting dark titanium hardware.

**Prompt**:

```text
Cinematic low-key macro photograph of a single vintage 300B directly-heated vacuum tube mounted into a solid CNC-machined dark anodized titanium chassis. The filament inside the clear hand-blown glass envelope emits a soft, smoldering 2200K warm amber-gold glow (#ffb347 and #e8b84b), illuminating internal nickel plate structures, delicate mica spacers, and pure tungsten support springs with intimate clarity. The titanium amplifier top plate has a subtle bead-blasted satin texture in dark neutral graphite (#232228), catching a whisper of warm raking specular reflection along its precision 45-degree chamfered bezel. Dark neutral graphite background (#1c1b21), zero crushed blacks, singular organic light falloff, Hasselblad medium format look, 90mm macro lens, f/4.0, ultra-fine film grain.
```

**Negative Prompt**:

```text
sci-fi neon, blue LED, violet glow, electric purple, text, watermark, logo, plastic, glossy 3D render, cartoon, bright center, blown-out highlights, lens flare, magic sparkles, hands, people
```

---

### Hero 2: Lathe-Cut Vinyl Grooves & Walnut Acoustic Field

- **Aspect Ratio**: `16:9` (1920×1080)
- **Safe Area**: Left 45% empty graphite for typography; grazing light rakes across the right side.
- **Theme**: Lathe-cut master lacquer vinyl micro-grooves alongside solid oiled walnut diffusers.

**Prompt**:

```text
Extreme macro editorial still life photograph of the spiral run-out grooves of a freshly lathe-cut virgin vinyl master lacquer disc. Shallow depth of field focusing on the razor-sharp micro-relief of the audio grooves, catching an exquisite single raking beam of warm champagne gold light (#e8b84b) that arcs gracefully across the dark charcoal surface (#1a1920). In the soft blurred background sits the geometric silhouette of an acoustic skyline diffuser milled from solid dark American walnut with a natural matte oil finish. Low contrast, rich graphite tones (#1c1b21), tactile physical materiality, medium format 120mm macro, zero digital noise, authentic photographic grain.
```

**Negative Prompt**:

```text
text, album label, words, letters, copyright, brand mark, neon, cyan, electric blue, CGI, 3D octane, glossy toy plastic, high-key white background, harsh direct flash, scratches, dust
```

---

### Hero 3: Anodized Dark Titanium DAC Enclosure & Stepped Attenuator

- **Aspect Ratio**: `16:9` (1920×1080)
- **Safe Area**: Upper center clear for title text; hardware positioned low and right.
- **Theme**: Precision machined audio hardware, knurled controls, tactile luxury.

**Prompt**:

```text
Audiophile industrial design product photograph. Corner perspective of a high-end reference digital-to-analog converter enclosure milled from a single block of grade 5 dark anodized titanium. An oversized, heavy knurled rotary attenuator knob stands slightly proud of the faceplate, its diamond-knurl pattern catching a whisper of warm gold rim illumination (#e8b84b) along its perimeter. A discrete USB-C chassis port sits flush with microscopic zero-tolerance machining. The unit rests on a dark slate graphite platform (#232228) against an unlit neutral studio backdrop (#1c1b21). Quiet, austere, museum-grade minimalism, architectural lighting, f/5.6, medium format, hyper-fine grain.
```

**Negative Prompt**:

```text
text, numbers, decibel readout, LED display, volume numbers, brand logo, blue light, neon rings, glossy reflection, plastic render, CGI, watermark, cables tangling, hands
```

---

## 4. Interstitial Band Recipes (`5:1` — 2560×512)

Used as horizontal transition dividers and visual resting moments between dark and ivory content blocks.

### Band 1: Quadratic Walnut Acoustic Diffuser Lattice

- **Aspect Ratio**: `5:1` (2560×512)
- **Theme**: Architectural American walnut quadratic residue acoustic diffuser columns.

**Prompt**:

```text
Ultra-wide panoramic architectural macro photograph of a custom quadratic residue acoustic diffuser (QRD) crafted from solid dark American walnut. Columns of varying staggered depths run across the frame, their natural open-pore wood grain rendered in warm espresso and rich chocolate tones. A soft warm grazing light sweeps horizontally across the top edges, casting gentle geometric shadows into the wells. The floor of the shadows remains open in neutral dark graphite (#1f1e24). Ultra-wide 5:1 horizontal ratio, panoramic framing, Leica S-system, architectural studio photography, tactile wood craftsmanship, subtle natural grain.
```

**Negative Prompt**:

```text
text, watermark, bright colored lights, neon, yellow varnish, glossy polyurethane, CGI render, tiling artifacts, repetition glitches, seams, plastic, floating elements
```

---

### Band 2: Lathe-Cut Vinyl Spiral Micro-Groove Horizon

- **Aspect Ratio**: `5:1` (2560×512)
- **Theme**: Continuous lathe-cut lacquer vinyl spiral bands across an ultra-wide panoramic band.

**Prompt**:

```text
Panoramic ultra-wide macro photograph across the surface of a professional lathe-cut audio recording lacquer disc. Hundreds of microscopic parallel circular spiral grooves stretch horizontally from edge to edge. A single warm directional key light rakes across the grooves from the far right, creating a soft continuous specular ribbon of champagne gold and amber bronze (#e8b84b) that ripples across the dark graphite vinyl substrate (#18171d). Calm, hypnotic, acoustic physical purity. Ultra-wide 5:1 panoramic format, 100mm macro lens, f/8 sharpness across the plane, ultra-fine analog grain.
```

**Negative Prompt**:

```text
text, label, record center spindle, needle, stylus, dust, scratches, neon glow, chromatic aberration, 3D render, glossy plastic, watermark, logo
```

---

### Band 3: Braided High-Purity OCC Copper Audio Cable Weave

- **Aspect Ratio**: `5:1` (2560×512)
- **Theme**: Continuous 8-core custom braided monocrystalline copper litz cable.

**Prompt**:

```text
Panoramic macro photograph of an 8-core continuous round litz braid of ultra-pure Ohno Continuous Cast (OCC) copper audio conductors. The tightly interwoven copper strands gleam with authentic rose-gold and natural warm copper luster beneath a transparent medical-grade dielectric sheath. The cable runs horizontally across the frame over a dark brushed titanium floor (#201f26). Subtle warm gold edge reflection highlights the precision of the hand-woven geometry. 5:1 panoramic aspect ratio, razor-sharp macro focus, depth of field gently dissolving at left and right extremities, fine grain.
```

**Negative Prompt**:

```text
text, watermark, logo, connectors, plugs, messy tangle, frayed wires, solder, neon blue, green oxidation, plastic render, CGI, glossy, fake reflections
```

---

### Band 4: Dark Brushed Bronze Horizontal Faceplate with Chamfered Edge

- **Aspect Ratio**: `5:1` (2560×512)
- **Theme**: Machined dark bronze audio chassis faceplate, horizontal hairline grain.

**Prompt**:

```text
Panoramic macro photograph of a solid dark architectural bronze faceplate for high-end audio equipment. The bronze surface features an ultra-fine horizontal linear brush grain running seamlessly across the wide frame, treated with a dark smoky patina that blends into neutral graphite (#1d1c22). A single mirror-polished 45-degree chamfered edge along the bottom catches a crisp, unbroken hairline of warm champagne gold specular light (#e8b84b). Restrained, timeless, Swiss precision audio engineering aesthetic. 5:1 panoramic ratio, f/8 aperture, medium format sharpness, zero digital smoothing.
```

**Negative Prompt**:

```text
text, engravings, brand name, screws, dials, switches, fingerprints, scratches, corrosion, bright yellow gold, neon, CGI, Octane render, watermark
```

---

### Band 5: KT88 Beam Tetrode Filament Glow Horizon

- **Aspect Ratio**: `5:1` (2560×512)
- **Theme**: Low-angle horizontal array of KT88 / 6550 tube heaters glowing in low key.

**Prompt**:

```text
Ultra-wide panoramic low-key photograph focused on the bottom cathode heaters of an array of four audiophile KT88 vacuum tubes. Inside the tinted glass bases, the coiled tungsten filaments burn with an intense, steady 2100K deep amber-orange incandescence (#ff9e3b and #e8b84b), casting warm soft halos onto the polished dark chrome tube sockets and dark graphite chassis below. The rest of the scene remains submerged in calm, noise-free graphite darkness (#1c1b21). Ultra-wide 5:1 ratio, cinematic low-key lighting, authentic vacuum tube physics, Hasselblad 80mm, organic warmth.
```

**Negative Prompt**:

```text
sci-fi glow, blue plasma, sparks, electrical arcs, neon, text, watermark, blown-out white hotspot, plastic CGI, distortion, oversaturated red
```

---

## 5. Feature Marks & Badges (`1:1` — 1024×1024)

Used for technical marks, badge illustrations, and square social/store assets.

### Mark 1: Monocrystalline Copper Cable Cross-Section

- **Aspect Ratio**: `1:1` (1024×1024)
- **Theme**: Geometric, circular cross-section of high-purity audio cable geometry.

**Prompt**:

```text
Centered square macro studio photograph of the cross-section of an ultra-high-end audio cable. Concentric rings of microscopic, hexagonal-packed pure copper conductors encased within dark graphite dielectric layers. Soft overhead raking light catching the raw sheared copper grain with subtle warm rose-gold reflections (#c99248). Dark neutral background (#1c1b21), perfectly centered composition, graphic clarity, Hasselblad macro lens, f/5.6, crisp physical textures, fine grain.
```

**Negative Prompt**:

```text
text, lettering, numbers, wire cutters, frayed fibers, neon, bright lights, 3D CGI render, plastic, cartoon, watermark, logo
```

---

### Mark 2: 300B Filament Ribbon Macro

- **Aspect Ratio**: `1:1` (1024×1024)
- **Theme**: Microscopic view of directly-heated cathode suspension spring and ribbon.

**Prompt**:

```text
Centered square macro photograph looking straight into the internal suspension hook of a 300B triode tube. A tiny tungsten-thorium filament ribbon glows with warm golden incandescence (#e8b84b), suspended by a minuscule tension spring. Pure vacuum enclosure, dark graphite background with soft optical falloff. Intimate, tactile, museum-quality micro-engineering photograph, f/2.8, shallow depth of field, authentic film grain.
```

**Negative Prompt**:

```text
text, bulb exterior, neon, electric blue arc, plasma, sparkles, lens flare, 3D model, watermark, logo, blurred smear
```

---

### Mark 3: Knurled Titanium Stepped Attenuator Dial

- **Aspect Ratio**: `1:1` (1024×1024)
- **Theme**: Precision top-down or slight angle view of a dark titanium knurled rotary dial.

**Prompt**:

```text
Centered square product photograph of an oversized rotary control dial machined from dark bead-blasted grade 5 titanium. The cylindrical circumference features a fine diamond knurl pattern that catches a crisp specular accent of warm champagne gold light along one arc. The flat circular top of the dial has a subtle concentric lathe turn pattern in matte graphite (#24232b). Pure neutral dark graphite background (#1c1b21). Graphic symmetry, audiophile luxury, f/8, ultra-sharp detail.
```

**Negative Prompt**:

```text
text, volume markers, numbers, dB scale, pointer needle, center screw, plastic, blue light, neon ring, CGI render, watermark, hand turning dial
```

---

## 6. Local Generation Script Helper (`gpt-image-2`)

For running batches locally via CLI or Python script:

```python
import os
import requests

API_ENDPOINT = os.getenv("LOCAL_IMAGE_API_URL", "http://127.0.0.1:7860/sdapi/v1/txt2img")

UNIVERSAL_NEGATIVE = (
    "(worst quality:1.4), (low quality:1.4), lowres, artifacts, watermark, "
    "signature, text, logo, font, typography, UI chrome, sci-fi neon, electric cyan, "
    "magenta, purple glow, cyberpunk, plastic look, 3D render, CGI, glossy, "
    "lens flare, sparkles, floating particles, people, hands"
)

ASPECT_CONFIGS = {
    "hero_16_9": {"width": 1920, "height": 1080, "cfg_scale": 6.5, "steps": 40},
    "band_5_1":  {"width": 2560, "height": 512,  "cfg_scale": 6.0, "steps": 45},
    "mark_1_1":  {"width": 1024, "height": 1024, "cfg_scale": 7.0, "steps": 35},
}
```

---

_Authored by Lead Visual Designer & Design System Architect for Bitperfect Player._

---

## Hero backdrop — `public/img/hero-backdrop.webp` (shipped 2026-10-13)

Generated by Codex `image_gen` (gpt-image-2) at 1672x941, lifted `linear(0.95, 4)` so its
graphite meets `#191919`, encoded at 1672w and 960w. Rendered by `HeroSection.astro`, masked
to transparent on the left (copy side) and the bottom (the showcase seam).

**Prompt**

```text
Landscape 16:9 background plate for a dark website hero. LEFT 50% very dark and calm, deep neutral
graphite close to #191919, no objects. An extremely shallow-depth-of-field (f/1.2) view into a dark
high-end listening room at night. Right half: the warm amber glow of vacuum tubes in a hi-fi amplifier
on a low walnut credenza, soft round golden bokeh, the dark silhouette of a floorstanding speaker, a thin
gold rim light on the edge of a turntable platter. Everything defocused into atmosphere, not legible
objects. All edges fall off to #191919. Graphite, warm amber #ffb347, champagne gold #e8b84b, walnut.
No text, logos, UI, people, neon, particles, lens flares, 3D-render look.
```

Rejected alternates from the same brief: a machined-metal platter macro with gold rim light (strong
second choice), and a long-exposure gold light waveform (read as stock).
