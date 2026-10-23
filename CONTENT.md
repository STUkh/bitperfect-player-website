# Content decisions: Bitperfect Player website

**The rules for writing site copy live in [`docs/writing-guide.md`](docs/writing-guide.md):
voice, plain language, context that must survive, banned words and brands, settled
vocabulary, facts, mechanics and a checklist.** Read it before you change any text.

This file keeps what the guide does not: decisions already taken (do not silently
reverse them), changes waiting on a release, and where each piece of copy lives in
the code. `PRODUCT.md` describes the product; `DESIGN.md` owns look and layout.

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

2. **The 14-day free trial is published** (`pro.periods[].trialDays` in `src/data/site.ts`; it was 7 days until the 2026-10 pricing update), in the hero, on the pricing card and in the
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
   - `src/components/bands/StatementBand.tsx`, the third fact: "No account,
     no analytics, no ads."
   - `src/components/bands/PrivacyBand.tsx`, commitment two: "there is no
     advertising ID", and the "four network calls and no more" well note, which
     would no longer be four.
   - `src/data/faq.ts`, "What does the app send over the internet?": "No
     analytics, no ads, no account."
   - `src/pages/index.astro`, the meta description: "no account, no ads".
   - `src/pages/privacy.astro`, the page description: "no advertising IDs".

Until then the site and the policy agree, and `app-ads.txt` is the only file in
the repo that anticipates the change.

## Pending: account sync (do not act on this yet)

The app has an optional account for backing up settings and EQ presets (sign-in with
Google, Apple or a one-time email code; backend in `../bitperfect-player/cloud-workers/account`),
but it is gated behind `BuildConfig.DEV_ACCOUNT_SYNC_ENABLED` (`-PdevAccountSync=true`),
which no release build sets: checked 2026-10-22. The shipping app shows no sign-in and
makes no account calls, so every "no account" claim stays true.

How the site talks about it now (2026-10-22, owner's decision): accounts are PLANNED,
OPTIONAL and NOT AVAILABLE YET, and every account sentence is conditional ("once it is
offered", "if you create one"). Never write it as if it ships.

- `src/PRIVACY_POLICY.md` §1 (summary bullet) and §2.11 "Optional account (planned, not yet
  available)": what an account would store (sign-in identity, subscription link, backups
  of settings and EQ presets with the device name; never music, library, history,
  favourites), deletion on request. §2.9, §2.10 and §6 refer to it conditionally.
- `src/TERMS_OF_USE.md` §10 "Your account, once offered".
- `src/data/faq.ts` "Do I need an account?".

When the flag ships on, in the same release: the policy §1 and §2.11 drop "planned, not
yet available" (and §8's notice goes out first), the FAQ answer drops "There is no
sign-in today" and "A future version will add", and the absolute "no account" lines
become "no account required": `src/i18n/locales/en/landing.ts` (`privacy.title`,
`privacy.fact1_desc`, `statement.fact3_desc`, the meta description) and the landing
components that hard-code "No account" (`StatementBand`, `PrivacyBand`). "No account is
required" claims stay true as they are. The account deletion page a store listing needs,
`/delete-account/` (`AccountDeletionView`: in-app steps on a dark card, email request on
a white one, what is deleted and what stays), is live ahead of the feature, on purpose
(owner, 2026-10-23): the site is ready the day accounts ship. Check its in-app path
(Settings → Account → Delete Account) against the app when the flag goes on.

## Where the copy actually lives

Check the BUILT html before assuming a string ships. Several fields look live and
are not:

- Home page: `src/components/landing/*.tsx`. Their copy is hard-coded in the
  components; the `landing.*` keys in `src/i18n/locales/en/landing.ts` were never
  read and were deleted on 2026-10-22.
- `/features` index: its own `ROWS` map, plus `compatibility` and `faqItems`.
- The six feature routes: `src/data/feature-pages.ts` owns nearly all of it
  (the `feature.<slug>.beat.*` i18n keys duplicated it and were never read; deleted
  2026-10-22).
- `src/data/features.ts` is mostly DEAD: only `specs` reaches a visitor. Its
  `title`, `tagline`, `badge`, `description`, `overview`, `facts` and `benefits`
  are read by nothing today.
- The drawn phone screens in `src/components/feature/screens/` carry user-visible
  strings too, and are easy to miss in a copy pass. They were the last place
  jargon survived.
- `src/components/primitives/FeatureArt.tsx` is now a raster image per feature
  (`public/img/features/<slug>.webp`) with no text in it. The six SVG numerals it
  used to draw (768 kHz, 32 bands...) are gone, so a number change no longer has a
  hidden second copy there.

## Third-party names and trademarks

The policy (which brands never appear, which designations are allowed, why
"Get it on Google Play" is never reworded) is in `docs/writing-guide.md`, section 5.
Set 2026-08-31; Chromecast, AirPlay and Roon were added to the never list on
2026-10-22. The footer carries a trademark attribution line, and the legal documents
keep their conditional Apple clauses.
