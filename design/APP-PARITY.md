# App parity notes

Extracted from the Android source at `../../bitperfect-player`, from `core/ui-common/src/commonMain` (the app is Kotlin Multiplatform; the `feature/*` Android files are thin delegates, real composition lives in ui-common).

These are the gaps between what the website says and what the app actually ships. The first group are factual errors on the site; the second are mockup fidelity.

> **The mockup-fidelity half of this file is now history, not a to-do.**
> On 2026-09-01 the hand-drawn screens were deleted and replaced with real captures
> of the shipping app, taken on the `Standard_Phone` AVD against a library of
> eighteen CC0 classical recordings. Everything below about a radius, a title row, a
> chip's grammar or an axis being drawn wrong describes a drawing that no longer
> exists. It is kept because it is the ARGUMENT for the change: a list this long,
> found by one person reading the app's source against the site's markup, is what a
> hand-drawn UI costs, and the only reason it was ever found is that someone went
> looking. The factual claims — what the app does, what the numbers are — are still
> live and still have to be checked against the source.
> See `design/screens.mjs` for the pipeline and DESIGN.md, "The Mockup Reproduces".

## Fixed in the canvas

**Only five signal states render.** `core/model/.../SignalQuality.kt` maps `BIT_PERFECT ◉`, `ENHANCED ✦`, `RESAMPLED ◐`, `LOSSY ○`, `UNKNOWN ·`. `StatusLossless` and `StatusHiRes` are declared in `Color.kt` but have no mapping in `signalQualityColor()`. The USB DAC page was showing six chips including two states the app cannot produce. Now five.

**Two signal hexes had drifted.** `src/data/colors.ts` says it mirrors the app's `Status*` tokens; four of six match, two do not:

|          | site      | app                    |
| -------- | --------- | ---------------------- |
| Enhanced | `#00e5ff` | `#9582d9` fixed violet |
| Lossy    | `#ef4444` | `#94a3b8` cool slate   |

The canvas and `DESIGN.md` now use the app's values.

**The seventh filter type is All Pass, not Band Pass.** `EqFilterTypeOrder = BELL, LOW_SHELF, HIGH_SHELF, LOW_PASS, HIGH_PASS, NOTCH, ALL_PASS`. Corrected in the canvas.

## Still wrong in the site's source, not just the mockups

- `src/data/features.ts:58` and `src/pages/features/[slug].astro:44` both list `Band Pass`. Should be `All Pass`.
- `src/data/colors.ts` carries the two drifted signal hexes above, and exposes `lossless` and `hires` as if they were live states.
- `features.ts` says the EQ gain range is `-24.0 dB to +24.0 dB`. `EqRangesUi.GAIN_RANGE_DB` is `-12f..12f`; `-24..24` is `GAIN_RANGE_EXPANDED_DB`, not the default.
- `features.ts` says the library has six views. `core/model/.../LibraryTab.kt` declares eight: `Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks, Genres`. The songs tab is labelled **Tracks** and the folders tab is labelled **Sources**.

## Round two: DSP, AI, casting and the library

A second and third pass over the app source found nine more wrong claims. All are corrected in the canvas. Three were outright fabrications with no basis anywhere in the repo.

### Fabrications, now removed

**Per-channel balance in 0.1 dB steps.** No stereo-balance DSP exists. The only Balance control is a hardware USB-DAC passthrough driven by the DAC's own USB Feature Unit. The `0.05f` step is a slider unit-test fixture, not a shipping control.

**180 degree polarity inversion.** No polarity or phase-invert setting, stage or string exists. Every `polarity` hit in the repo is DSD bitstream decoding commentary or vendored codec code.

**Search resolves in under 2 ms.** No search benchmark, timing instrumentation or latency budget exists on the query path, across the whole repository including Rust and markdown. What is true: a local SQLite FTS4 index over title, performer and album, 120 ms input debounce, 200-row cap, zero network round-trip.

### Wrong values, now corrected

| Claim                  | Was                            | Is                                                       |
| ---------------------- | ------------------------------ | -------------------------------------------------------- |
| AI Enhancer block size | ~45 ms per chunk               | ~350 ms, 192 frames per inference                        |
| Crossfeed models       | Meier and Bauer                | Meier, Chu Moy and BS2B                                  |
| ReplayGain             | ReplayGain 2.0, EBU R128       | Track, album or auto, read from file tags                |
| Processing precision   | 64-bit float throughout        | 32 or 64-bit float, switchable, default 32               |
| Cast ceiling           | Up to 24-bit / 192 kHz         | Receiver advertises up to 384 kHz / 24-bit               |
| AI inference engine    | NPU, GPU or vector CPU         | Neural accelerator only                                  |
| AI supported inputs    | MP3, AAC, OGG, Opus            | 44.1 and 48 kHz PCM, including FLAC                      |
| Playlists              | M3U and M3U8 import and export | Imports M3U, M3U8, PLS, XSPF, ASX, CUE. No export exists |
| Bypass                 | Instant bypass                 | Bit-perfect lock. No timing is claimed anywhere          |

The AI latency figure was wrong by roughly seven times. From `enhancer/framing.rs`: `HOP = 80`, `CHUNK = 256`, `CTX = 32`, so `STEP = 192` frames per backend call, `192 x 80 = 15,360` samples, which is 348 ms at 44.1 kHz. The app's own two KDocs say ~290 ms and ~348 ms. Neither says 45.

### Reframed, because the truth was better

**Renderer volume.** The old copy said Bitperfect drives the renderer's hardware volume. The reality is the opposite and stronger: in bit-perfect mode there is no software gain stage at all, so an incoming volume command is declined rather than applied. Refusing to attenuate is the only way to stay bit-exact.

**Recompression.** "Nothing is re-encoded" is true on the DLNA path, which is pure byte-passthrough, and false elsewhere. The app itself prints either "Sent unchanged, receiver supports this format" or the exact conversion. The site should not be less honest than the app.

**AI Enhance and the DSP rack are mutually exclusive.** The engine coerces the whole DSP chain off while AI Enhance runs, and every affected row reads "Unavailable while AI Enhance is on." The site previously implied they stack. Both pages now say so.

**Zero bytes.** True of library indexing and search, and of the enhancer during processing. Not true of the app as a whole, which ships Sentry crash reporting, optional artwork lookup and model downloads, all disclosed in `PRIVACY_POLICY.md`. Scoped accordingly.

### Under-sold, worth expanding later

**Receiver mode is four protocols, not one.** DLNA MediaRenderer, FCast, MPD server and a Logitech Media Server player, each independently switchable. The MPD server implements full library browsing, queue management, binary artwork streaming and stored playlists. Three of the four were not on the site at all.

**The true-peak limiter is better than the old copy.** ITU-R BS.1770-4 style, 4x polyphase FIR oversampling, persistent per-channel history so peaks straddling a block boundary are caught, a -0.6 dBTP ceiling, and it force-enables itself whenever another stage runs that could create inter-sample overs.

**Metadata coverage is 15+ formats**, dispatched magic-byte first and never by extension. The site lists 12.

**Harmonic Tuning is a free, shipping DSP feature**, not an AI one. It sits between AI Karaoke and Crossfeed in the signal path purely because of engine stage order. Never describe any of its eight tube voicings as measured hardware; four have no documented provenance and the source says so.

### Do not market

Release-disabled behind `providers.gradleProperty(...).isPresent`, absent in any normal build: AI Playlist, AI Search, prompt-driven AI Mix, AI Tone Sculptor (hard-blocked at `TONE_SCULPTOR_OFFERED = false` pending a 41.4% recall ceiling), the AI Search and Mix model row, the enhancer's CPU tier, the enhancer's GPU tier **and the Auto mode that depends on it**, the CODEC_RESTORE model family, and the Fidelity Analysis "AI Enhanced" tab.

The GPU one is easy to miss: `hasHardwareGpu = false` is hardcoded, and because `offeredAiEnhancerModes` gates both AUTO and GPU on it, a shipping build's enhancer picker contains exactly two entries, "Off" and "Neural accelerator (NPU)".

**AI Karaoke ships** on Android, Pro-gated, three quality tiers. Marketable, but scope it to Android and to the 44.1 kHz rate family.

### Trademark

The app deliberately never shows the word "AirPlay" to a user. `CastModels.kt` maps AIRPLAY to the label "Wireless Speakers" with a KDoc pointing at a branding change. The site must follow the same convention.

## Mockup fidelity, your call

The brief said to reuse the existing `PhoneNowPlaying.astro` styling, so I left these alone. Each one is a place where that component and the real app differ.

**The play control is not gold.** `PlayerTransport.kt` draws a 72dp metal disc: a sweep-gradient silver ring `#2A2B30, #6A6D76, #454750, #2A2B30, #6A6D76, #2A2B30`, a 200 to 340 degree white rim arc at alpha 0.28, an inner-shadow groove, and a 52dp **white** recessed play glyph. Shadow comes from the ring only, at 6dp. The website component draws a gold-gradient circle with a dark glyph.

**There is no "NOW PLAYING" title in the top bar.** `PlayerTopBar` is a 48dp row: a caret-down on the left for Collapse, then Cast, Waveform (signal path), Faders (DSP), Sparkle (AI), the literal text **"DSD"**, and a kebab. The DSD indicator is bold condensed 15sp text, not a glyph.

**The format chip sits centred over the actions row**, as a `Box` sibling of the lyrics and favourite icons, not as a separate row. It is a transparent pill with a 1dp border, monospace `labelMedium`. Grammar is `FLAC · 24/96`, with a middle dot, and rates keep the `k` (`MP3 · 44.1k`). With an output segment: `FLAC · 16/44.1  →  32/44.1`, and the output half turns amber only on a genuine downgrade, so 16 to 32 padding stays neutral.

**Hero art radius is 24dp**, hardcoded in `NowPlayingShell.kt`, morphing to 12dp as the queue rises. `BpShapes.artHero` is 32dp but is declared and unused.

**The scrubber track is `Color.White` at alpha 0.18**, fill and knob in the accent, knob radius 7dp growing to 9dp pressed with a 1.8x glow at alpha 0.28.

**The EQ screen background is `Surface #17161E`**, not `Background #0A0A0F`. Library uses Background. The EQ curve plot is drawn on Surface inside a 16dp-radius 1dp `OutlineVariant` frame.

**The EQ gain axis draws 6 dB more than the chip says.** `displayRange = gainRange + HEADROOM_DB` where `HEADROOM_DB = 6f`, so at ±12 dB the canvas spans ±18 dB and the ±12 gridlines are not at the frame edges. My mockup puts them at the edges.

**EQ screen title is "EQ Studio"**, in `RobotoCondensed`, with four tabs: `Studio`, `10-Band`, `Parametric`, `AutoEQ`. The applied tab is prefixed with a check, for example `✓ Parametric`. The gain range chip cycles `±3 dB`, `±6 dB`, `±12 dB`, `±30 dB`.

**Ten-band labels are `31, 62, 125, 250, 500, 1k, 2k, 4k, 8k, 16k`** — 62, not 63, even though `EqIsoGrid.CENTERS_HZ` uses 31.5 and 63.

## Typography and surfaces

The app uses `FontFamily.SansSerif` (Roboto) with `sans-serif-condensed` for screen headers, and `FontFamily.Monospace` for technical readouts. The site uses Inter. That divergence is deliberate, it was your call.

Worth knowing: the app's surface ladder is `Background #0A0A0F`, `SurfaceLow #121118`, `Surface #17161E`, `SurfaceHigh #201F28`, `SurfaceHighest #2A2933`, `SurfaceVariant #1C1B24`. The graphite we picked for the site, `#1c1b21`, lands almost exactly on the app's `SurfaceVariant`, and the site's control tone `#2b2934` lands on `SurfaceHighest`. The two systems are closer now than they were before the change.

The app has no light colour scheme anywhere in the repo, so the site's ivory bands have no app counterpart. That is fine, they are a marketing device.

## Icons

No Material Symbols, no XML drawables. One Kotlin object, `theme/BpIcons.kt`, holding 122 **Phosphor Light** vectors at a 256 viewport. To match on the web, pull the same glyphs from phosphoricons.com at Light weight. The seven EQ filter glyphs are hand-drawn Canvas paths, not an icon set, and `EqGlyphs.kt` has the exact coordinates if you want to reproduce them as SVG.

## Screenshots

**Done, on 2026-09-01.** What it took, so the next person does not rediscover it:

- `:app:assembleDebug` off a warm build directory is **2m40s**, not the long cold native build this section feared. The APK is 97 MB. The one that was already sitting in `app/build/outputs` was stale by a week and crashed on launch (`NoDefinitionFoundException` on a `Function0`, from a `viewModelOf` that the source had already replaced with an explicit constructor) — **build before installing, always**.
- The paywall is the first screen and it is passable in a debug build: RevenueCat falls back to its **SimulatedStore** when Play Billing is absent, and "TEST VALID PURCHASE" grants the entitlement. No money, no account.
- **And that same fallback is a trap.** `RevenueCatManager` allows a _debuggable_ build to run with a hardcoded `test_`-prefixed key, and a `test_` key is not a stub of production — it is a **separate RevenueCat project with its own catalogue**. The gate on that emulator says `$11.99 / year`, offers `pro_annual`/`pro_six_month`/`pro_monthly`, and shows no free trial. Production is **$35/year, annual-only, with a 7-day trial**. The site was briefly changed to $11.99 on the strength of that screen and had to be changed back. **Running the app tells you what the app does. It does not tell you what the store charges** — for that, the Play Console is the only authority.
- The library is a **SAF folder grant**, not MediaStore, so the files have to be pushed to `/sdcard/Music/<folder>` and then chosen through the system picker. That picker's list rows **do not respond to `adb shell input tap` at all** — neither `tap`, nor a `swipe` of zero length, nor `motionevent`, nor Maestro. Toolbar icons and buttons in the same window respond normally. Drive the list with `KEYCODE_DPAD_DOWN` and `KEYCODE_DPAD_CENTER`, and note that **`uiautomator dump` resets D-pad focus**, so send every key press before dumping. "USE THIS FOLDER" only appears once you have navigated at least one level below the initial directory.
- `adb shell cmd overlay enable com.android.internal.systemui.navbar.gestural` plus SystemUI demo mode (`sysui_demo_allowed`, then `clock -e hhmm 0941`, `battery -e level 100`, `network -e wifi show -e mobile hide`, `notifications -e visible false`) gives the clean status bar every one of these was shot with.

**What an emulator cannot give you, and this is the important part.** There is no way to attach a USB DAC to an AVD, `DAC Info` reads "Not connected" throughout, and the emulator's audio HAL will not open an exclusive or low-latency stream. So:

- With Bit-perfect lock OFF, everything plays and everything resamples: the Signal Path badge reads **Resampled** and the output is `AAudio SHARED, f32 / 44.1 kHz`.
- With Bit-perfect lock ON, **nothing plays at all** — the seek stays at 0:00 and the format chip disappears. Same for On-board output mode set to Low Latency. Compatibility mode is the only setting that produces sound.
- Feeding it a file already at 44.1 kHz with the whole DSP rack switched off gets the chain down to four stages and the DSP row to "Bit-exact bypass" — **and the badge still says Resampled**, because SHARED output is not an exclusive path and the app will not claim what it has not got.

**So there is no bit-perfect screenshot in this set, and there cannot be one from any emulator.** The site does not fake it: the two beats that show a Signal Path are the two whose copy is about the badge telling the truth, and a capture that honestly says Resampled is the evidence for them rather than a problem with them. A real bit-perfect capture needs a phone with a DAC on the end of it.
