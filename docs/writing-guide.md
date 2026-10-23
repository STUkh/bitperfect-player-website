# Writing guide: Bitperfect Player website

How to write any text a visitor can read on this site: headings, body copy, buttons,
spec rows, FAQ answers, meta descriptions, alt text. It applies to people and to AI
agents alike. If a rule here and your own taste disagree, the rule wins.

Related files:

- `PRODUCT.md`: what the product is. It drifts; the app source wins (see "Facts").
- `CONTENT.md`: decisions already taken, changes waiting on a release, and where
  each piece of copy lives in the code.
- `DESIGN.md`: how things look. It says nothing about words.
- Legal texts (`src/PRIVACY_POLICY.md`, `src/TERMS_OF_USE.md`) follow their own
  rules. Do not "simplify" them without the owner.

---

## 1. Who we write for

Audiophiles on Android who plug a USB DAC into their phone and want to hear their
files exactly as they are. They know what 24-bit, DSD and a parametric EQ are. They
do not care how the app is built. They do care whether a claim is true.

**The one rule: write like a marketer who understands audio, not like the engineer
who built the app.** Lead with what the listener hears or gets. Then give the number
that backs it.

## 2. Plain and short

The owner's standard: simple, clear, meaningful words. No clever reasoning, no
tangled sentences.

- One idea per sentence. Aim for 12 words or fewer. Never more than 20.
- Short common words: "use" not "utilise", "get" not "receive", "about" not
  "approximately", "shows" not "surfaces" or "indicates".
- Cut parentheticals, asides, "vs." comparisons, filler (actually, simply, truly,
  just, really, quietly, deliberately, whole, entire), wordplay, metaphors that need
  decoding and rhetorical setups ("Here is the thing", "That is why").
- Say each fact once. Do not repeat what the heading already said.
- Headings: a plain statement of what the section gives the reader, 2 to 8 words,
  sentence case.
- Buttons and links: verb plus object, 1 to 4 words, naming the outcome ("Read the
  full FAQ"). Never "Submit", "Click here" or "Learn more".
- Shorter is better, as long as section 3 still holds.

## 3. Context: say the whole truth in place

**Short never beats true.** A sentence must still mean the right thing where it
sits on the page, next to what is around it. Before you cut a word, ask: does the
reader need it to understand the offer, the condition or the limit?

The owner caught this one, and it is the reference case:

> Bad: "New customers get 14 days free. Then $19.95 a year. Cancel anytime in Google
> Play."
> It reads as the normal price. $19.95 is a limited Founder offer.
>
> Good: "Eligible new customers get 14 days free. Then $19.95 a year, the Founder
> price, if you subscribe by May 31, 2027. That price stays yours while you stay
> subscribed."

Context that must survive wherever the fact appears:

| Fact | Always keep |
| --- | --- |
| $19.95 a year | It is the **Founder** price, for anyone who subscribes **by May 31, 2027**, and it **stays theirs on every renewal while they stay subscribed**. Cancel and come back after that date: standard price. |
| $29.95 a year | It is the **standard** price, for new subscribers **from June 1, 2027**. |
| 14-day trial | For **eligible new customers** (the store decides). Cancel during the trial and you pay nothing. Never promise it to the reader. |
| One plan | **One** annual subscription, **every feature**, no tiers. Never imply free, never "Pro". Five devices included; more devices are a **paid** in-app add-on. |
| 768 kHz, 32-bit, DSD512 | **If your DAC supports it.** The real limit is the DAC. |
| Bit-perfect | Only on the direct path, with no effects on. **The badge shows when the sound is not bit-perfect.** That honesty is a selling point. Say it. |
| EQ and effects | When they are on, the badge cannot show Bit-perfect. |
| AI Enhancer | **Off by default.** When on, the badge says **Enhanced**. Full model on a supported **neural chip**; other phones get **Lite mode** on the main processor. Works on 44.1 and 48 kHz files only. |
| Offline | The AI features need a **one-time model download** first. The app checks the subscription online **at least once every 14 days**. |
| Privacy | Music, library, history and favourites **stay on the phone**. No ads, no analytics, no account needed. The app **does** go online (crash reports and artist photos are on by default and can be turned off, plus artwork, lyrics, AutoEQ, radio, model downloads, the subscription check). Never write "nothing leaves your phone". |
| Account | **None today.** An **optional** account is **planned**, never required. Write "No account needed", not "No account". |

Never add a condition that is not true, and never drop one that is. If you are
unsure, weaken the claim or cut it. Never make it stronger.

## 4. Two registers

- **Marketing pages** (home, holding page, `/features`, the six feature pages,
  CTAs, page headers, meta descriptions, site chrome): plain words for anyone.
- **Technical pages** (`/features/catalog`, technical FAQ answers, the AI Enhancer
  guide): you may use precise audio terms an audiophile reads in a DAC manual:
  sample rates, bit depths, DSD levels, DoP, filter shapes, sinc, linear and minimum
  phase, delta-sigma, dither, dyadic volume, crossfeed, ReplayGain, true-peak,
  FIR convolution, UAC1/UAC2, asynchronous USB. Still in short, plain sentences.

## 5. Words

### Never, in any visible text

Implementation internals: programming languages and libraries (Rust, Symphonia,
Kotlin, C/C++, libsamplerate, SoX), OS layers and classes (AudioFlinger, AudioTrack,
AAudio, HAL, ALSA, NNAPI, QNN), storage and code talk (SQLite, FTS, index, buffers,
threads, ABIs, API levels, block or frame sizes, version numbers, class names,
config flags), spec pedantry (USB HID, Feature Unit, SlimProto, ITU-R numbers, DoP
carrier frequencies), "IEEE 754", "user-space driver", "isochronous", "silicon",
"neural accelerator", "runtime accelerator", "signal path telemetry".

Say "the system mixer" for the OS mixer and "neural chip" for the NPU
("neural chip (NPU)" is fine once on the AI Enhancer guide and in the catalog).

Keep the copy platform-neutral: an iOS version follows, and the site must carry
over without a rewrite. Don't write "Android" in titles, descriptions, headings or
prose; say "your phone", "the system mixer", "the main processor". A platform fact
that can't be avoided (the minimum OS version, the store link, legal text) comes
from data (`site.minAndroid`, `site.playUrl`) or sits in one isolated line, so an
iOS variant is a data change.

Hype and AI-tells: revolutionary, cutting-edge, seamless, unparalleled, ultimate,
stunning, immersive, game-changing, "Unlock", "Elevate", "Discover", "Dive into",
"Experience the difference", "It's not just X, it's Y", "Whether you're...",
"In today's world". No exclamation marks.

### Brands and trademarks

Never on any page: **Dolby, Dolby Digital, AC3, E-AC3, DTS** (their decoders are
licensed; advertising them implies a licence we may not hold), **WMA**, **SACD**
(say "DSD disc images"), **Chromecast** and **AirPlay** (say "cast-enabled speakers
and TVs"), **Squeezebox** and **Roon** (describe the capability: "a network player
for music servers").

Allowed designations: FLAC, ALAC, WAV, AIFF, DSD, DSF, DFF, DoP, Opus, Ogg Vorbis,
MP3, AAC, WavPack, Monkey's Audio, TAK, Musepack, True Audio, M3U, M3U8, PLS,
XSPF, CUE, DLNA, UPnP, ReplayGain, USB Audio Class, UAC1, UAC2, Bluetooth, Wi-Fi,
the crossfeed names Meier, Chu Moy and BS2B, Android, Google Play.

"Get it on Google Play" is Google's badge text. Use it exactly, never reworded.

### Settled vocabulary

| Use | Not |
| --- | --- |
| neural chip | NPU (in prose), neural accelerator, silicon |
| Lite mode | CPU tier, fallback model |
| Founder price, Founder offer | Welcome Offer, early-bird, discount |
| standard price | regular price, full price |
| eligible new customers | everyone, all users |
| Bit-perfect lock | Bitperfect Lock |
| AI Enhancer, Sonic Scan, AI Karaoke, Similar Tracks | AI Enhance, AI Sonic Scan |
| DSD disc images | SACD, ISO |
| cast-enabled speakers and TVs | Chromecast devices |
| sound processing / DSP rack | studio-grade DSP |

Settled facts: seven EQ filter shapes (Bell, Low Shelf, High Shelf, Low Pass, High
Pass, Notch, All Pass; there is no band pass); up to 32 EQ bands; Q from 0.10 to
10.0; EQ gain -12 to +12 dB; 8 library views; 15 advertised formats (FLAC, ALAC,
WAV, AIFF, DSD, DSD disc images, Monkey's Audio, WavPack, True Audio, TAK, Musepack,
Opus, Ogg Vorbis, MP3, AAC); 5 signal states (Bit-perfect, Enhanced, Resampled,
Lossy, Unknown; "Lossless" and "Hi-res" are not states); Android 8.0 and newer.

## 6. Facts

- **The app source is the truth**, at `../bitperfect-player` (read only, never
  edit it). `PRODUCT.md` is a summary and drifts.
- **Code that exists is not code that ships.** Check `DEV_TOGGLES.md`,
  `BuildConfig.DEV_*` flags and `*_ENABLED = false` constants. Off in release
  today: MPD and FCast (sending and receiving), user accounts, prompt-driven AI
  playlists and AI search, the Fidelity "AI Enhanced" tab, Tone Sculptor. Never
  market them.
- Code under `core/ios-framework/` is iOS. The site sells the Android app only.
- **Prices, trial length and store settings come from `src/data/site.ts`**
  (`pro`), which mirrors the Play Console. The app source cannot prove a price, and
  a debug build shows sandbox prices. Never type a price into a sentence by hand
  when the component can read it from `pro`.
- No invented numbers: no benchmarks, THD or SNR figures, user counts, ratings,
  testimonials, press quotes, "award-winning" or "#1".
- Market only what ships today.

## 7. Mechanics

- No em dash or en dash anywhere a visitor can read. Use a period, comma, colon,
  parentheses or a plain hyphen. Ranges use "to": "20 Hz to 20 kHz".
- British spelling where it is already used: colour, favourites, neighbours,
  equaliser.
- Sentence case for headings.
- Money: "$19.95 a year", not "$19.95/yr" or "$19.95/year", in sentences.
- Change text only. Never change markup, classes, prop names, keys, ids, types or
  data shapes while editing copy.
- Keep every template placeholder (`{days}`, `${price}`) and every escape exactly.
- Trial sentences must be built from `pro.trialDays`, so that setting it to `null`
  removes them all. Never write "14 days" into a string.
- When a fact changes, change it everywhere it appears (the format count lives in
  five places). Grep before you finish.
- Run `npx astro check` and `npm run build` before you hand over.

## 8. Before and after

| Before | After | Why |
| --- | --- | --- |
| "Free for 14 days for new customers, then $19.95/year (Founder rate, vs. $29.95/year standard) until cancelled in Google Play. Cancel during the trial and nothing is charged." | "Eligible new customers get 14 days free. Then $19.95 a year, the Founder price, if you subscribe by May 31, 2027. That price stays yours while you stay subscribed." | Shorter sentences, no aside, offer context kept. |
| "Offer ends May 31, 2027" after "the price stays yours" | "if you subscribe by May 31, 2027" | The date is a sign-up deadline, not the end of the price. |
| "There is no higher tier to buy." | "One annual subscription unlocks every feature. There are no other tiers." | The old line hinted at a free tier. |
| "Never converted to 48 kHz" | "None, if your DAC supports the file rate" | Absolute claim was false for fixed-rate DACs. |
| "A SQLite FTS4 index over title, performer and album" | "Search your whole collection instantly. It never leaves the phone." | Internals become a listener benefit. |
| "ITU-R BS.1770-4 style limiting with 4x polyphase oversampling" | "Catches the peaks that hide between samples, before your DAC clips on them." | Spec pedantry becomes what you hear. |
| "No account, no analytics, no ads." | "No account needed. No analytics, no ads." | An optional account is planned. |
| "Contact Audio Engineering Support" | "Not sure what your phone can do?" | Speaks to the reader's question, not our org chart. |

## 9. Checklist before you ship copy

1. Can a first-time visitor understand each sentence on its own, in its place?
2. Is every price, trial, limit and AI claim carrying its context (section 3)?
3. Is every claim backed by the app source, and does it ship in release?
4. No banned word, brand or internal (section 5)? No dash?
5. One idea per sentence, short words, nothing said twice?
6. Placeholders intact, nothing hard-coded that lives in `pro`?
7. `npx astro check` and `npm run build` pass?
