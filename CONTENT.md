# Content standard: Bitperfect Player website

Companion to `DESIGN.md` (which owns look and layout) and `PRODUCT.md` (which owns
facts). This file owns VOICE: how the site is allowed to talk about the product.
Written 2026-08-31 during the content pass that de-jargoned the whole site.

You are writing PRODUCTION marketing copy for an audiophile Android music player.
Read `PRODUCT.md` (repo root) first. It is the factual source of truth.

## The one rule that drives this whole pass

**Write like a marketer who understands audio, not like the engineer who built it.**

The site currently reads like an internal engineering doc. Visitors are audiophiles
who care about SOUND, not about the software plumbing that produces it.

### BANNED: software / implementation internals

Never mention, in any user-visible string:

- Storage & code internals: SQLite, FTS4, full-text index, magic bytes, content
  sniffing, ring buffer, asynchronous buffer, ABIs, API level, HAL, AudioFlinger,
  AudioTrack, "the engine coerces", "probe-gated at runtime", "runtime accelerator",
  block sizes ("192 frames per inference", "350 ms blocks"), thread/process talk,
  "compiled in", "signal path telemetry", byte-passthrough, "0 KB", "0 bytes".
- Protocol / spec pedantry: USB HID, USB Audio Class Feature Unit, SlimProto,
  MPD server, polyphase FIR, ITU-R BS.1770-4, DoP carrier frequencies,
  "32 or 64-bit float arithmetic, switchable", "per-channel persistent history".
- Anything that reads as a version number, a class name, or a config flag.

### ALLOWED: audio facts an audiophile shops on

Keep and lead with these. They are the product:

- Sample rates and depths: up to 32-bit / 768 kHz, DSD64 to DSD512, 44.1/48 kHz.
- EQ: up to 32 bands, 7 filter shapes, Q from 0.10 to 10.0, +/-24 dB, 20 Hz to 20 kHz.
- Formats: FLAC, ALAC, WAV, AIFF, DSD, APE, WavPack, Opus, Vorbis, MP3, AAC.
- Named audio concepts a listener knows: bit-perfect, lossless, hi-res, crossfeed,
  ReplayGain, true-peak / inter-sample clipping, parametric EQ, headphone
  compensation curves, exclusive USB output, UPnP / DLNA / Chromecast casting.
- Devices: USB-C and Micro-USB OTG DAC dongles, desktop DACs, Android 8.0 and up.
- Privacy in plain words: no account, no analytics, no ads, nothing uploaded.

Simple test for any sentence: _would this appear on a high-end DAC manufacturer's
product page?_ If it belongs in a commit message instead, cut it or translate it
into what the listener hears or gets.

### Translation examples (the standard to hit)

- "A SQLite FTS4 index over title, performer and album, queried on device"
  -> "Search your whole collection instantly. It never leaves the phone."
- "dispatched by magic bytes rather than by file extension"
  -> "Reads tags and artwork straight from the file, even when the extension lies."
- "ITU-R BS.1770-4 style limiting with 4x polyphase oversampling"
  -> "Catches the peaks that hide between samples, before your DAC clips on them."
- "Roughly 350 ms (192 frames per inference)" -> cut entirely.
- "All three ABIs in one release: 64-bit, 32-bit, and emulator builds"
  -> "One download covers every supported phone."

## Promise discipline (non-negotiable, from PRODUCT.md)

- Market ONLY what ships today. NEVER mention prompt-driven / natural-language
  playlists or semantic search. They are release-disabled.
- No statement about what happens when a subscription lapses (see Decision 3).
  The trial length IS published now, always phrased for new customers: see
  Decision 2 below, which supersedes the "no trial length" rule this bullet used
  to carry.
- No invented benchmarks, no THD/SNR figures, no testimonials, no user counts,
  no star ratings, no press quotes, no "award winning", no "#1".
- Do not say or imply the app is free, or that a lower/higher tier exists.
  ONE subscription, ONE term: $29.95 per year standard, with a $19.95 per year
  Welcome Offer / Limited Founder Access,
  with a trial for new customers (`src/TERMS_OF_USE.md` §4). The $15 / 3 months and $25 / 6 months
  terms this bullet used to list are no longer sold and must not reappear in copy.
- Keep the honesty that makes this brand credible: the app states when it is NOT
  bit-perfect. Say that as a selling point, not as a disclaimer.
- Do not invent capabilities. If you are unsure a claim is true, weaken it or cut
  it; never upgrade it.

## House voice

- Confident, concrete, unhurried. Short declarative sentences. Second person.
- Lead with the listener's experience, then the number that backs it.
- No hype adjectives stacked ("revolutionary", "cutting-edge", "seamless",
  "unparalleled", "game-changing", "immersive journey"). No exclamation marks.
- No AI-tell constructions: no "It's not just X, it's Y", no "Unlock", no
  "Elevate", no "Experience the difference", no "In today's world".
- Ranges use "to" (`20 Hz to 20 kHz`). Never an em-dash or en-dash anywhere a
  visitor can read it: use a period, comma, colon, parentheses or plain hyphen.
- British-leaning spelling already in use (Favourites, neighbours, colour) stays.
- Sentence case for headings. Never write "Pro" or "Pro tier".

## Mechanical rules

- Only edit copy. Do NOT change component structure, classes, layout, animation,
  data shapes, exported names, or TypeScript types.
- Keep string lengths in the same ballpark as what you replace: these strings sit
  in a tuned layout. A summary row `value` is 1 to 4 words. A spec value is short.
  A beat `body` is 2 to 4 sentences. Never double the length of a string.
- Preserve the code comments that explain design decisions. Where a comment
  documents a fact you changed, update the comment too.
- `npm run build` must pass when you are done. Run it.

## Settled vocabulary

The site had two words for the same hardware. Use ONE:

- **"neural chip"** in prose and in every site-chrome label.
- **"Neural chip (NPU)"** only inside a drawn app-screen picker, where the mock is
  depicting the app's own control.
- Never "neural accelerator", never "runtime accelerator", never "silicon".

Other settled choices: the seventh EQ shape is **All Pass** (there is no band pass);
the library has **8** browse views; the app plays **about 18** formats; there are
**5** signal states, and `Lossless` / `Hi-res` are not among them.

## Decisions taken 2026-08-31 (do not silently reverse)

1. **One plan, annual: $29.95 standard / $19.95 Welcome Offer.** The app's subscription gate
   sells the annual package and nothing else, so the three-term selector (3 / 6 / 12 months)
   was removed from the pricing card and `pro.periods` was cut to one entry. Advertising a term
   the buyer cannot reach at the till is both a conversion trap and a store-policy risk.
   `pro.periods` stays an ARRAY so a second term is a data change, not a rebuild.

   **$11.99 is a sandbox number. Do not put it on the site.** On 2026-09-01 the
   price was briefly changed to $11.99 after a debug build's subscription gate was
   read as if it were the store. It is not: `RevenueCatManager` lets a debuggable
   build fall back to a hardcoded `test_` key, and a `test_` key runs RevenueCat's
   **Simulated Test Store** against a separate project with its own catalogue — the
   same sandbox that served three products and no trial, neither of which
   Updated 2026-10-06: Founder updated pricing to $29.95 USD / year standard and
   $19.95 USD / year Welcome Offer / Limited Founder Access.
   **Running the app proves what the app does; it does not prove what the store
   charges.** For a price, the Play Console is the only authority.

2. **The 7-day free trial is published**, in the hero, on the pricing card and in the
   FAQ. It is always phrased for "new customers": eligibility is the store's decision,
   roughly one trial per store account, so no copy may promise it to the reader.
   Every trial string is conditional on `pro.trialDays`; setting it to null must
   silence all of them, not leave a dangling sentence.
3. **Lapse behaviour stays in the Terms of Use only.** The app is fully gated and
   playback stops when a subscription ends. That is stated in `src/TERMS_OF_USE.md`
   §1 and §8 and is deliberately absent from the marketing pages.
4. **Two legal documents, and the marketing copy is checked against them.** The
   privacy policy used to carry the terms inside it; they are now
   `src/PRIVACY_POLICY.md` (/privacy) and `src/TERMS_OF_USE.md` (/terms), both
   linked from the footer and from the pricing card. Two consequences for copy:
   - **No absolute privacy claim about the user.** The policy discloses FOUR
     outbound flows: crash diagnostics (§2.1, **on by default**, and it names
     stack traces, device model and IP as personal data), artwork lookups (§2.6,
     on by default), the one-time AI model download, and the entitlement check a
     subscription app cannot switch off (§2.9, a US processor). "Nothing about
     you leaves the phone" was therefore false and is gone. What IS absolute, and
     what the copy may say: the library, the play history, the favourites and the
     audio itself never leave the device (§2.2, §2.4), and there is no account, no
     analytics and no advertising SDK (§2.8).
   - **Refunds, renewal and cancellation are the Terms' to state.** Marketing may
     say the term, the price, the trial for new customers and that cancelling
     happens in the store. It may not promise a refund: §6 is that a subscription
     is not refundable part-way through a period and refunds are the store's
     decision, not ours.
   - **Account & Settings Sync.** When you create an account, we securely store your email address solely for authentication and settings backup.

5. **Product imagery is captured, not drawn.** Every screen inside a phone frame is
   a screenshot of the shipping Android build, taken against a library of eighteen
   CC0 classical recordings. The hand-drawn reproductions they replaced had invented
   a record — _Nocturne in Amber_ by _Hale & the Quiet Room_ — and put it above a
   headline about honesty, and `design/APP-PARITY.md` lists fifteen further claims
   they had drifted into. **Never re-draw a screen the app can be asked to show.**
   The pipeline is `design/screens.mjs`; the demo library's tags are deliberately
   short so the app's tiles do not marquee, because a screenshot of a marquee is a
   screenshot of half a word.

## Pending: advertising (do not act on this yet)

`public/app-ads.txt` is live and authorises Google AdMob to sell inventory for
`com.bitperfect.player`. **Ads are planned; none ship today**, so every "no ads"
claim below is still true and STAYS as written until an ad SDK is actually in a
release. Do not weaken them pre-emptively: an accurate claim removed early costs
the brand its best privacy argument for nothing.

When ads do ship, these move TOGETHER, in one pass, and the policy moves first:

1. `PRODUCT.md`'s Monetization section asserts the subscription "carries no
   advertising and no tracking", and it is the factual source the copy is written
   from, so it changes first of all.
2. `src/PRIVACY_POLICY.md` needs an advertising section and loses three
   statements it makes today: §1 "We do not run ads and do not use any
   third-party analytics or advertising SDK", §2.8 "We do not run any
   advertising SDK" and its "or any advertising identifier", and §2.1's "We do
   not currently collect any other analytics ... of any kind", which §8 promises
   to update BEFORE such a change takes effect and, where law or platform policy
   requires, to seek consent for. Google Play's Data safety declaration changes
   with it.
3. Then the copy, all of it, in the same release:
   - `src/components/landing/StatementBand.astro`, the third fact: "No account,
     no analytics, no ads."
   - `src/components/landing/PrivacyBand.astro`, commitment two: "there is no
     advertising ID", and the "four network calls and no more" well note, which
     would no longer be four.
   - `src/data/faq.ts`, "What does the app send over the internet?": "No
     analytics, no ads, no account."
   - `src/pages/index.astro`, the meta description: "no account, no ads".
   - `src/pages/privacy.astro`, the page description: "no advertising IDs".

Until then the site and the policy agree, and `app-ads.txt` is the only file in
the repo that anticipates the change.

## Pending: account sync (do not act on this yet)

The app has an optional email account for settings backup, but it is gated behind
`BuildConfig.DEV_ACCOUNT_SYNC_ENABLED` (`-PdevAccountSync=true`), which no release
build sets: checked 2026-10-19 in `../bitperfect-player` (`DEV_TOGGLES.md`,
`app/build.gradle.kts`, `RootTabShell.kt`). The shipping app shows no sign-in and
makes no account calls, so every "no account" claim below is still true and STAYS.
`src/PRIVACY_POLICY.md` already discloses the account (§1, §2.11) and the email
it would attach to the RevenueCat record (§2.10, §6), all written conditionally
("when you create an account"), so the policy is ready ahead of the release.

When the flag ships on, these move in the same release. The account is optional,
so "no account required" stays true and only the absolute claims go:

- `PRODUCT.md`, "zero user accounts".
- `src/i18n/locales/en/landing.ts`: `privacy.title` "Zero accounts. Zero
  telemetry.", `privacy.fact1_desc` "There is no sign-up screen, no password and no
  profile.", `statement.fact3_desc` "No sign-up", and `landing.meta_description`
  "no account".
- This file: the house-voice line "no account" and §4's "there is no account".

These stay true with an optional account: `src/data/features.ts` "No account is
required", the AI download's "No account, no upload, no wait"
(`features.ts`, `feature/content.ts`), casting's "no account", and policy §1 "We do
not require account creation". `src/data/changelog.ts` is history and is not
rewritten.

## Where the copy actually lives

Check the BUILT html before assuming a string ships. Several fields look live and
are not:

- Home page: `src/components/landing/*.astro`.
- `/features` index: its own `ROWS` map, plus `compatibility` and `faqItems`.
- The six feature routes: `src/components/feature/content.ts` owns nearly all of it.
- `src/data/features.ts` is mostly DEAD: only `specs` reaches a visitor. Its
  `title`, `tagline`, `badge`, `description`, `overview`, `facts` and `benefits`
  are read by nothing today.
- The drawn phone screens in `src/components/feature/screens/` carry user-visible
  strings too, and are easy to miss in a copy pass. They were the last place
  jargon survived.
- **`src/components/feature/FeatureArt.astro` draws SIX numerals as SVG text**, one
  per card on the `/features` index: 768 kHz, 32 bands, 15 formats, 4 protocols,
  8 voicings, 22 kHz rebuilt. These are real product claims set at 76px, and they
  are invisible to any check that strips `<svg>` before reading a page, which is
  what most text extraction does. Two of them had gone stale unnoticed (a "12
  formats" that predated two format-count corrections, and a "64 bit float" that
  advertised the engine's non-default precision). **When you change a number in
  `content.ts` or `features.ts`, grep this file too**, and audit it with
  `grep -oE "[0-9]+<tspan[^>]*>[^<]+</tspan>" dist/features/index.html`.

## Third-party names and trademarks

Policy set 2026-08-31. The site carries as few third-party brand names as it can.

### Never on the marketing pages

**Dolby, Dolby Digital, AC3, E-AC3 and DTS.** These are not ordinary trademarks:
Dolby and DTS LICENSE their decoders, so advertising playback of them implies a
licence this product may not hold. That is a commercial exposure, not an
attribution question. The app can still open those files; the site does not sell
them. Understating what the app plays is safe, overstating is not.

Also off the marketing pages: **WMA** (Microsoft, and no audiophile buys for it),
**SACD** (Sony and Philips, say "DSD disc images"), **Chromecast** (Google, and the
Cast branding implies a certification we do not claim, say "cast-enabled speakers
and TVs") and **Squeezebox** (Logitech, describe the capability instead).

The advertised format list is therefore FIFTEEN: FLAC, ALAC, WAV, AIFF, DSD, DSD
disc images, Monkey's Audio, WavPack, True Audio, TAK, Musepack, Opus, Ogg Vorbis,
MP3 and AAC. If you change that list, change the COUNT everywhere it appears: the
library beat title and body, the library summary row, the library spec row and the
FAQ answer all state it.

### Allowed, because the site cannot describe compatibility without them

Format and protocol designations: FLAC, ALAC, WAV, AIFF, DSD, DSF, DoP, Opus, Ogg
Vorbis, MP3, AAC, WavPack, Monkey's Audio, TAK, Musepack, True Audio, M3U, M3U8,
PLS, XSPF, ASX, CUE, DLNA, UPnP, MPD, FCast, ReplayGain, USB Audio Class, UAC1,
UAC2, Bluetooth, Wi-Fi. Plus the crossfeed names Meier, Chu Moy and BS2B, which are
engineers' surnames and an open-source project rather than commercial brands.

### Unavoidable, keep them

**Android** and **Google Play** are the platform and the store. Google's badge
guidelines require the exact phrase "Get it on Google Play", so that string is not
ours to reword.

**Apple, Apple App Store, iOS, macOS, Apple Keychain** stay in `TERMS_OF_USE.md` and
`PRIVACY_POLICY.md`. Those clauses exist BECAUSE of Apple distribution, and a legal
document that describes a platform has to name it. An inaccurate legal document is a
far worse outcome than a brand mention. They are written conditionally ("where the
App is distributed through the Apple App Store") so none of them implies an iOS
release ships today.

A trademark attribution line sits in the footer.
