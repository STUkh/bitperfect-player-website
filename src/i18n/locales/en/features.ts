export const features = {
  // Features base & placeholder keys
  "features.title": "Everything the engine does",
  "features.subtitle":
    "Six things shipping today: bit-perfect USB DAC output, a 32-band EQ, hi-res and DSD support, UPnP casting, DSP tools and on-device AI restoration.",
  "features.see_all": "See all features",

  // ---------------------------------------------------------------------------
  // features_index.* (Features Index page)
  // ---------------------------------------------------------------------------

  // Features Index: Header
  "features_index.meta_title": "Features",
  "features_index.meta_description":
    "Six things shipping today: bit-perfect USB DAC output, a 32-band EQ, hi-res and DSD support, UPnP casting, DSP tools and on-device AI restoration.",
  "features_index.header_eyebrow": "Core capabilities",
  "features_index.header_title": "Six core systems built for bit-exact audio",
  "features_index.header_subtitle":
    "Direct USB DAC output, 32-band parametric EQ, local library indexing, bi-directional streaming, studio DSP, and on-device AI restoration.",
  "features_index.aside_badge": "Shipping in production",
  "features_index.aside_text":
    "Every capability and specification listed here ships in the current Google Play release. Nothing on this site is a beta, roadmap item, or synthetic benchmark.",
  "features_index.aside_footer": "Available now on Google Play",
  "features_index.catalog_eyebrow": "Engineering Architecture",
  "features_index.catalog_badge": "27 Capabilities",
  "features_index.catalog_title": "Looking for full technical specifications?",
  "features_index.catalog_body":
    "Technical documentation for all 27 capabilities: custom UAC1 and UAC2 drivers, dyadic lossless volume, tube voicings, and hardware mixer bypass.",
  "features_index.catalog_cta": "Explore 27 Technical Features",

  // Features Index: Cards
  "features_index.cards_sr_heading": "All features",

  // Features Index: Compatibility
  "features_index.compat_title": "Will it run on your phone?",
  "features_index.compat_subtitle":
    "Playback, USB DAC output, EQ, casting, and Sonic Scan run on any Android 8.0+ device. Real-time AI Enhancer restoration requires a phone with a supported neural chip.",
  "features_index.compat_player_what": "Playback and processing",
  "features_index.compat_player_scope":
    "Playback, bit-perfect USB, EQ, casting and the DSP rack",
  "features_index.compat_player_devices": "Every phone on Android 8.0 or newer",
  "features_index.compat_player_note":
    "One download covers every supported phone.",
  "features_index.compat_ai_library_what": "Sonic Scan and Similar Tracks",
  "features_index.compat_ai_library_scope":
    "Local library analysis and acoustic similarity",
  "features_index.compat_ai_library_devices":
    "Every phone on Android 8.0 or newer",
  "features_index.compat_ai_library_note":
    "Runs on any phone’s processor. No special chip and no network connection needed.",
  "features_index.compat_ai_enhancer_what": "AI Enhancer",
  "features_index.compat_ai_enhancer_scope":
    "Real-time 14 to 22 kHz restoration on 44.1 and 48 kHz audio",
  "features_index.compat_ai_enhancer_devices":
    "Phones with a supported neural chip (Android 8.0+)",
  "features_index.compat_ai_enhancer_note":
    "Requires hardware neural acceleration for real-time inference. The app checks your chipset at startup and enables the toggle in Settings only when supported.",
  "features_index.compat_min_android": "Android {minAndroid} or newer.",

  // Features Index: Technical FAQ
  "features_index.faq_eyebrow": "Questions",
  "features_index.faq_title": "Frequently Asked Questions",
  "features_index.faq_q1": "What does bit-perfect actually mean here?",
  "features_index.faq_a1":
    "The samples reaching your DAC are numerically identical to the ones in the file. Where direct hardware access is not achievable, the app shows the real state instead of claiming otherwise.",
  "features_index.faq_q2": "Do I need an external DAC?",
  "features_index.faq_a2":
    "No. Built-in speakers, 3.5mm headphone jacks, and Bluetooth work with the full library, 32-band EQ, and DSP rack. Because Android routes internal outputs through the system mixer, the signal badge displays Resampled, reserving Bit-perfect for exclusive USB DAC connections.",
  "features_index.faq_q3": "What audio formats does it play?",
  "features_index.faq_a3":
    "Fifteen formats: FLAC, ALAC, WAV, AIFF, DSD (DSF/DFF, DoP or native), DSD disc images, Monkey’s Audio, WavPack, True Audio, TAK, Musepack, Opus, Ogg Vorbis, MP3, and AAC.",
  "features_index.faq_q4": "Can I turn off the AI processing?",
  "features_index.faq_a4":
    "Yes, and it is off by default. Turning it on moves the badge to Enhanced rather than Bit-perfect, because the samples have changed.",
  "features_index.faq_q5": "Will it work on my phone?",
  "features_index.faq_a5":
    "The player, USB DAC driver, 32-band EQ, DSP rack, casting, and Sonic Scan run on any device with Android {minAndroid} or newer. The AI Enhancer requires a supported on-device neural chip and only appears as available when your hardware can run it in real time.",
  "features_index.faq_q6": "What does the app send over the internet?",
  "features_index.faq_a6":
    "Your music files, library index, and play history never leave your phone, and there are no ad or analytics SDKs. Network calls are limited to Google Play subscription checks, a one-time AI model download, crash reports and automatic album art lookups (both switchable in Settings), plus any lyrics, AutoEQ headphone profiles, or network streams you explicitly request.",
  "features_index.faq_q7": "What is in the DSP rack?",
  "features_index.faq_a7":
    "A 32-band parametric EQ with seven filter types, headphone crossfeed in three strengths, ReplayGain read from your file tags, Harmonic Tuning with eight tube voicings, and a true-peak limiter at a -0.6 dBTP ceiling. The whole rack switches off for bit-perfect output.",
  "features_index.faq_q8": "What does it cost?",
  "features_index.faq_a8":
    "{terms}{trialSentence} One subscription includes every feature with no extra tiers or paid add-on modules. Billed through Google Play, where you can cancel at any time.",
  "features_index.faq_q9": "How many devices does the subscription cover?",
  "features_index.faq_a9":
    "Five concurrently registered devices. If you need more, device capacity packs in the app add five at a time, up to twenty. The store shows what a pack costs before you confirm.",
  "features_index.faq_q10": "Do the AI features work offline?",
  "features_index.faq_a10":
    "After the initial model download, AI processing runs on the phone. The first download and periodic subscription verification require a network connection.",

  // Features Index: Closing Action
  "features_index.cta_eyebrow": "All features included",
  "features_index.cta_title_prefix": "Six features, and ",
  "features_index.cta_title_highlight": "every one is included.",
  "features_index.cta_subtitle":
    "There is no higher tier to buy and nothing on this page is withheld for one.",
  "features_index.cta_button": "Get it on Google Play",

  // ---------------------------------------------------------------------------
  // feature_detail.* (Common Feature Detail labels)
  // ---------------------------------------------------------------------------
  "feature_detail.breadcrumb": "Features",
  "feature_detail.summary_title": "Summary",
  "feature_detail.specifications_eyebrow": "Specification",
  "feature_detail.specifications_title": "The numbers, in full",
  "feature_detail.specifications_subtitle":
    "Everything here is what the shipping build does today.",
  "feature_detail.prev": "Previous",
  "feature_detail.next": "Next",
  "feature_detail.prev_feature": "Previous feature",
  "feature_detail.next_feature": "Next feature",
  "feature_detail.more_features": "More features",
  "feature_detail.cta_button": "Get it on Google Play",

  // Feature Detail: Signal Path (usb-dac)
  "feature_detail.signal_path_eyebrow": "The path a sample takes",
  "feature_detail.signal_path_title": "Seven stages, or four.",
  "feature_detail.signal_path_subtitle":
    "Standard Android routes high-resolution audio through a 7-stage system mixer that resamples to 48 kHz / 16-bit. Bitperfect Player opens a direct 4-stage USB path that delivers every sample unaltered to your DAC at up to 32-bit / 768 kHz and DSD512.",
  "feature_detail.signal_path_stages": "stages",
  "feature_detail.signal_path_reaches_dac": "Reaches the DAC at",
  "feature_detail.signal_path_resamples": "Resampling Passes",
  "feature_detail.signal_path_mixers": "Mixer Alterations",
  "feature_detail.signal_path_conversions": "Bit-Depth Truncations",
  "feature_detail.signal_path_note":
    "The Bit-perfect badge illuminates only when the app holds an exclusive USB hardware lock with all DSP bypassed. If DSP is active or audio routes through the phone’s internal mixer, the badge updates immediately to Enhanced or Resampled.",
  "feature_detail.signal_path_android": "Android Standard Audio Stack",
  "feature_detail.signal_path_ours": "Bitperfect Player Direct Path",
  "feature_detail.signal_state.bitperfect": "Bit-perfect",
  "feature_detail.signal_state.enhanced": "Enhanced",
  "feature_detail.signal_state.resampled": "Resampled",
  "feature_detail.signal_state.lossy": "Lossy",
  "feature_detail.signal_state.unknown": "Unknown",

  // ---------------------------------------------------------------------------
  // feature.<slug>.* (Per-slug features)
  // ---------------------------------------------------------------------------

  // USB DAC
  "feature.usb-dac.title": "Direct USB DAC output",
  "feature.usb-dac.tagline": "The file reaches your DAC exactly as recorded",
  "feature.usb-dac.lede":
    "Left to itself, Android will re-route your music through a system mixer that resamples it on the way out. Bitperfect Player opens the USB audio device itself, in exclusive mode, and locks your DAC to the file's own clock.",
  "feature.usb-dac.screen_title": "Now Playing",
  "feature.usb-dac.cta_title": "Direct bit-perfect output to any USB DAC.",
  "feature.usb-dac.cta_body":
    "Bit-perfect USB output, in the same subscription as everything else on this site.",

  "feature.usb-dac.summary.0.label": "Max PCM",
  "feature.usb-dac.summary.0.value": "32-bit / 768 kHz",
  "feature.usb-dac.summary.1.label": "DSD",
  "feature.usb-dac.summary.1.value": "DSD64 to DSD512",
  "feature.usb-dac.summary.2.label": "Protocol",
  "feature.usb-dac.summary.2.value": "UAC1 and UAC2",
  "feature.usb-dac.summary.3.label": "Resampling",
  "feature.usb-dac.summary.3.value": "None",

  "feature.usb-dac.beat.0.eyebrow": "Exclusive mode",
  "feature.usb-dac.beat.0.title": "Your DAC answers to one app at a time",
  "feature.usb-dac.beat.0.body":
    "Bitperfect Player takes the USB audio device in exclusive mode, so a notification chime cannot duck your track, and the OS cannot quietly re-open the stream at its own preferred rate halfway through an album.",

  "feature.usb-dac.beat.1.eyebrow": "Rate switching",
  "feature.usb-dac.beat.1.title": "The clock follows the file, not the phone",
  "feature.usb-dac.beat.1.body":
    "A 44.1 kHz track followed by a 192 kHz one switches the hardware rate between them rather than resampling either to meet in the middle. Native DSD and DoP are both handled, up to DSD512.",
  "feature.usb-dac.beat.1.stat.0.label": "PCM",
  "feature.usb-dac.beat.1.stat.0.value": "up to 768 kHz",
  "feature.usb-dac.beat.1.stat.1.label": "Bit depth",
  "feature.usb-dac.beat.1.stat.1.value": "16, 24 and 32",
  "feature.usb-dac.beat.1.stat.2.label": "DSD",
  "feature.usb-dac.beat.1.stat.2.value": "DoP and native",

  "feature.usb-dac.beat.2.eyebrow": "Hardware",
  "feature.usb-dac.beat.2.title": "Dongles and desktop DACs, same path",
  "feature.usb-dac.beat.2.body":
    "Any USB-C or Micro-USB OTG DAC that speaks UAC1 or UAC2 works, from a pocket dongle to a desk unit. Where the DAC has its own hardware volume control, the app drives that control directly rather than attenuating in software and throwing bits away.",

  "feature.usb-dac.beat.3.eyebrow": "Honesty",
  "feature.usb-dac.beat.3.title": "The badge tells the truth, always",
  "feature.usb-dac.beat.3.body":
    "Bit-perfect is reserved for an unaltered stream to an external DAC. Turn on the EQ or the AI Enhancer and it changes to Enhanced. Fall back to the internal output and it says so. Each state means exactly one thing.",

  "feature.usb-dac.beat.4.eyebrow": "DSD",
  "feature.usb-dac.beat.4.title":
    "Two ways to carry a DSD stream, and it picks the right one",
  "feature.usb-dac.beat.4.body":
    "Streams DSD64 through DSD512 natively when your DAC supports native 1-bit input, or packs it into DoP (DSD over PCM) frames when required. The driver reads your DAC’s capabilities automatically on connection and never decodes DSD down to PCM.",
  "feature.usb-dac.beat.4.stat.0.label": "Range",
  "feature.usb-dac.beat.4.stat.0.value": "DSD64 to DSD512",
  "feature.usb-dac.beat.4.stat.1.label": "Transport",
  "feature.usb-dac.beat.4.stat.1.value": "Native or DoP",

  "feature.usb-dac.spec.0.label": "USB Standard",
  "feature.usb-dac.spec.0.value": "USB Audio Class 1 and 2, direct connection",
  "feature.usb-dac.spec.1.label": "Max PCM",
  "feature.usb-dac.spec.1.value": "Up to 32-bit / 768 kHz",
  "feature.usb-dac.spec.2.label": "DSD Support",
  "feature.usb-dac.spec.2.value": "DSD64 to DSD512, DoP and native",
  "feature.usb-dac.spec.3.label": "Resampling",
  "feature.usb-dac.spec.3.value": "None: your file's native rate, unchanged",
  "feature.usb-dac.spec.4.label": "Access Mode",
  "feature.usb-dac.spec.4.value": "Exclusive, so nothing else can interrupt it",
  "feature.usb-dac.spec.5.label": "Volume and Balance",
  "feature.usb-dac.spec.5.value": "Your DAC's own hardware, when it has it",

  "feature.usb-dac.fact.0":
    "Works with any USB-C or Micro-USB OTG DAC dongle or desktop DAC",
  "feature.usb-dac.fact.1":
    "Automatic sample rate switching between tracks of different rates",
  "feature.usb-dac.fact.2":
    "Volume and balance are handled by your DAC's own hardware, when it has them",
  "feature.usb-dac.fact.3":
    "Where a DAC has no hardware volume control, the app says so instead of faking one",
  "feature.usb-dac.fact.4":
    "Works with both generations of USB Audio Class DACs",
  "feature.usb-dac.fact.5":
    "Bit-exact passthrough for FLAC, ALAC, WAV, and DSD streams",

  "feature.usb-dac.signal_path.android.stage.0": "Source File",
  "feature.usb-dac.signal_path.android.stage.1": "App Handoff",
  "feature.usb-dac.signal_path.android.stage.2": "Rate Converter",
  "feature.usb-dac.signal_path.android.stage.3": "System Mixer",
  "feature.usb-dac.signal_path.android.stage.4": "Software Volume",
  "feature.usb-dac.signal_path.android.stage.5": "Depth Truncation",
  "feature.usb-dac.signal_path.android.stage.6": "USB Output",
  "feature.usb-dac.signal_path.ours.stage.0": "Source File",
  "feature.usb-dac.signal_path.ours.stage.1": "Exclusive USB Driver",
  "feature.usb-dac.signal_path.ours.stage.2": "Bit-Exact Transport",
  "feature.usb-dac.signal_path.ours.stage.3": "Hardware DAC",

  // EQ
  "feature.eq.title": "32-band parametric EQ",
  "feature.eq.tagline": "Precise tone control, off again in one tap",
  "feature.eq.lede":
    "Shape an exact compensation curve with up to 32 bands, seven filter shapes, and Q that runs from broad warmth to a pinpoint notch. Then bypass it in one tap to hear the file untouched.",
  "feature.eq.screen_title": "Equalizer",
  "feature.eq.cta_title": "Precise frequency compensation with one-tap bypass.",
  "feature.eq.cta_body":
    "All seven filter shapes and the hard bypass, on any output the app can reach.",

  "feature.eq.summary.0.label": "Bands",
  "feature.eq.summary.0.value": "1 to 32",
  "feature.eq.summary.1.label": "Filter types",
  "feature.eq.summary.1.value": "7",
  "feature.eq.summary.2.label": "Q range",
  "feature.eq.summary.2.value": "0.10 to 10.0",
  "feature.eq.summary.3.label": "Bypass",
  "feature.eq.summary.3.value": "One tap",

  "feature.eq.beat.0.eyebrow": "Bands",
  "feature.eq.beat.0.title": "Thirty-two bands, each one fully independent",
  "feature.eq.beat.0.body":
    "Place up to 32 filters at any exact frequency between 20 Hz and 20 kHz. Adjust gain by ±12 dB by default, or switch on the expanded ±24 dB range for deeper room or headphone target corrections.",
  "feature.eq.beat.0.stat.0.label": "Span",
  "feature.eq.beat.0.stat.0.value": "20 Hz to 20 kHz",
  "feature.eq.beat.0.stat.1.label": "Gain",
  "feature.eq.beat.0.stat.1.value": "-24.0 dB to +24.0 dB",

  "feature.eq.beat.1.eyebrow": "Filter shapes",
  "feature.eq.beat.1.title": "Seven topologies, not just a bell",
  "feature.eq.beat.1.body":
    "A bell handles most corrections. The other six are there for the cases it cannot: shelving the whole top end, rolling off subsonic rumble before it reaches the driver, or notching out one resonance without touching its neighbours.",
  "feature.eq.beat.1.chip.0.label": "Bell",
  "feature.eq.beat.1.chip.1.label": "Low shelf",
  "feature.eq.beat.1.chip.2.label": "High shelf",
  "feature.eq.beat.1.chip.3.label": "Low pass",
  "feature.eq.beat.1.chip.4.label": "High pass",
  "feature.eq.beat.1.chip.5.label": "All pass",
  "feature.eq.beat.1.chip.6.label": "Notch",

  "feature.eq.beat.2.eyebrow": "Q factor",
  "feature.eq.beat.2.title": "From broad warmth to a surgical notch",
  "feature.eq.beat.2.body":
    "Q is continuous from 0.10 to 10.0, not stepped. At the wide end a single band tilts a whole region gently. At the narrow end it removes one peak and leaves the octave either side of it alone.",
  "feature.eq.beat.2.note":
    "Same gain, different Q. Q 0.7 spreads across two octaves. Q 8.0 sits on one frequency.",

  "feature.eq.beat.3.eyebrow": "Bypass",
  "feature.eq.beat.3.title": "One tap back to the untouched file",
  "feature.eq.beat.3.body":
    "Toggling EQ off removes the entire filter stage from the audio pipeline rather than zeroing the sliders. Compare your compensation curve against the untouched source in one tap.",
  "feature.eq.beat.3.note":
    "When EQ is bypassed over USB DAC output, the signal badge returns immediately from Enhanced to Bit-perfect.",

  "feature.eq.spec.0.label": "EQ Bands",
  "feature.eq.spec.0.value": "Up to 32, fully independent",
  "feature.eq.spec.1.label": "Filter Shapes",
  "feature.eq.spec.1.value": "7 shapes",
  "feature.eq.spec.2.label": "Q Factor Range",
  "feature.eq.spec.2.value": "0.10 to 10.0",
  "feature.eq.spec.3.label": "Gain Range",
  "feature.eq.spec.3.value":
    "-12.0 dB to +12.0 dB (expanded: -24.0 dB to +24.0 dB)",
  "feature.eq.spec.4.label": "Bypass",
  "feature.eq.spec.4.value": "One tap back to bit-perfect",
  "feature.eq.spec.5.label": "Frequency Span",
  "feature.eq.spec.5.value": "20 Hz to 20 kHz",

  "feature.eq.fact.0": "Up to 32 parametric bands per profile",
  "feature.eq.fact.1":
    "Seven filter shapes (bell, shelves, passes, notch, all pass)",
  "feature.eq.fact.2": "Q factor scales continuously from 0.10 to 10.0",
  "feature.eq.fact.3":
    "Gain range -12.0 dB to +12.0 dB, expandable to -24.0 dB to +24.0 dB",
  "feature.eq.fact.4": "Every band placed anywhere across 20 Hz to 20 kHz",
  "feature.eq.fact.5": "One-tap bit-perfect bypass",

  // LIBRARY
  "feature.library.title": "Local lossless library",
  "feature.library.tagline":
    "Every album found instantly, without leaving the phone",
  "feature.library.lede":
    "Internal storage, MicroSD and USB OTG drives, indexed on the device. Tags and artwork are read straight from the file itself, not guessed from its name.",
  "feature.library.screen_title": "Library",
  "feature.library.cta_title": "Point it at a folder and it does the rest.",
  "feature.library.cta_body":
    "No account, no upload, no wait. Included with everything else.",

  "feature.library.summary.0.label": "Views",
  "feature.library.summary.0.value": "8",
  "feature.library.summary.1.label": "Sources",
  "feature.library.summary.1.value": "Internal, SD, OTG",
  "feature.library.summary.2.label": "Formats decoded",
  "feature.library.summary.2.value": "15",
  "feature.library.summary.3.label": "Search",
  "feature.library.summary.3.value": "Instant, offline",

  "feature.library.beat.0.eyebrow": "Views",
  "feature.library.beat.0.title": "Eight ways into the same collection",
  "feature.library.beat.0.body":
    "Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks and Genres. The Sources view walks your real directory tree rather than flattening it, which matters if you have spent years organising it yourself.",
  "feature.library.beat.0.chip.0.label": "Sources",
  "feature.library.beat.0.chip.1.label": "Recent",
  "feature.library.beat.0.chip.2.label": "Favourites",
  "feature.library.beat.0.chip.3.label": "Playlists",
  "feature.library.beat.0.chip.4.label": "Albums",
  "feature.library.beat.0.chip.5.label": "Artists",
  "feature.library.beat.0.chip.6.label": "Tracks",
  "feature.library.beat.0.chip.7.label": "Genres",

  "feature.library.beat.1.eyebrow": "On device",
  "feature.library.beat.1.title": "Indexed locally for instant offline search",
  "feature.library.beat.1.body":
    "Your collection is indexed directly on the phone from your file tags. Search by track title, artist, or album with instant offline results. Automatic online artwork lookup can be toggled off at any time in Settings.",

  "feature.library.beat.2.eyebrow": "Formats",
  "feature.library.beat.2.title":
    "Fifteen formats, including archival lossless and DSD",
  "feature.library.beat.2.body":
    "Plays FLAC, ALAC, WAV, AIFF, DSD (DSF and DFF), DSD disc images, Monkey's Audio, WavPack, True Audio, TAK, Musepack, Opus, Ogg Vorbis, MP3, and AAC. The decoder inspects the file header directly, so tracks play and display embedded tags even if a file extension is wrong.",
  "feature.library.beat.2.chip.0.label": "FLAC",
  "feature.library.beat.2.chip.1.label": "ALAC",
  "feature.library.beat.2.chip.2.label": "WAV",
  "feature.library.beat.2.chip.3.label": "AIFF",
  "feature.library.beat.2.chip.4.label": "DSD",
  "feature.library.beat.2.chip.5.label": "DSD disc images",
  "feature.library.beat.2.chip.6.label": "Monkey's Audio",
  "feature.library.beat.2.chip.7.label": "WavPack",
  "feature.library.beat.2.chip.8.label": "True Audio",
  "feature.library.beat.2.chip.9.label": "TAK",
  "feature.library.beat.2.chip.10.label": "Musepack",
  "feature.library.beat.2.chip.11.label": "Opus",
  "feature.library.beat.2.chip.12.label": "Vorbis",
  "feature.library.beat.2.chip.13.label": "MP3",
  "feature.library.beat.2.chip.14.label": "AAC",

  "feature.library.beat.3.eyebrow": "Playlists",
  "feature.library.beat.3.title": "It reads the playlists you already have",
  "feature.library.beat.3.body":
    "Import existing M3U, M3U8, PLS, XSPF, ASX, and CUE playlists (including multi-track CUE sheets paired with single-file album rips) or build new playlists and queues directly in the app.",
  "feature.library.beat.3.note":
    "Supports playlist import across all six formats. Playlist file export is not yet available in the current release.",

  "feature.library.spec.0.label": "Library Views",
  "feature.library.spec.0.value": "8, including albums, artists and genres",
  "feature.library.spec.1.label": "Search",
  "feature.library.spec.1.value": "Instant, entirely on device",
  "feature.library.spec.2.label": "Storage Sources",
  "feature.library.spec.2.value": "Internal storage, MicroSD, USB OTG drives",
  "feature.library.spec.3.label": "Formats Played",
  "feature.library.spec.3.value":
    "15, from FLAC and DSD to DSD disc images and TAK",
  "feature.library.spec.4.label": "Playlist Import",
  "feature.library.spec.4.value": "M3U, M3U8, PLS, XSPF, ASX, CUE",
  "feature.library.spec.5.label": "Index and search",
  "feature.library.spec.5.value": "Entirely on device",

  "feature.library.fact.0":
    "Sources, Recent, Favourites, Playlists, Albums, Artists, Tracks, Genres",
  "feature.library.fact.1": "Browse nested folders exactly as they’re stored",
  "feature.library.fact.2":
    "Album art downloads and displays automatically, at full resolution",
  "feature.library.fact.3":
    "Playlist import: M3U, M3U8, PLS, XSPF, ASX and CUE",
  "feature.library.fact.4":
    "The library updates itself when files change on storage",
  "feature.library.fact.5":
    "No analytics and no remote lookups while you browse your library",

  // CASTING
  "feature.casting.title": "Bi-directional streaming",
  "feature.casting.tagline":
    "Send to a network streamer or TV, or receive from another device",
  "feature.casting.lede":
    "Send audio to a renderer on your network, or turn the phone into a receiver that four different systems can play into.",
  "feature.casting.screen_title": "Cast",
  "feature.casting.cta_title": "Your whole house, at the original rate.",
  "feature.casting.cta_body":
    "Send it to the big speakers, or let the phone become the endpoint.",

  "feature.casting.summary.0.label": "Receiver protocols",
  "feature.casting.summary.0.value": "4",
  "feature.casting.summary.1.label": "Modes",
  "feature.casting.summary.1.value": "Sender and receiver",
  "feature.casting.summary.2.label": "Receiver ceiling",
  "feature.casting.summary.2.value": "384 kHz / 24-bit",
  "feature.casting.summary.3.label": "DLNA path",
  "feature.casting.summary.3.value": "Byte-exact",

  "feature.casting.beat.0.eyebrow": "Sending",
  "feature.casting.beat.0.title": "Cast to anything that speaks UPnP",
  "feature.casting.beat.0.body":
    "Any DLNA renderer on your network shows up in the picker: a network streamer, a smart TV, a wireless speaker. Where the renderer accepts the file as it is, nothing gets re-encoded on the way out. Where it does not, the app negotiates a format it can play, and tells you which of the two happened.",

  "feature.casting.beat.1.eyebrow": "Receiving",
  "feature.casting.beat.1.title":
    "Four receiver protocols, each with its own toggle",
  "feature.casting.beat.1.body":
    "Enable any combination of four network receiver protocols in Settings: DLNA MediaRenderer, FCast receiver, MPD server (with remote library and queue browsing), and classic network player mode. Stream from your desktop or NAS controller straight into your phone and attached USB DAC at up to 24-bit / 384 kHz.",
  "feature.casting.beat.1.chip.0.label": "DLNA MediaRenderer",
  "feature.casting.beat.1.chip.1.label": "FCast",
  "feature.casting.beat.1.chip.2.label": "MPD server",
  "feature.casting.beat.1.chip.3.label": "Classic network player",

  "feature.casting.beat.2.eyebrow": "Volume",
  "feature.casting.beat.2.title":
    "In bit-perfect mode, nothing touches the level",
  "feature.casting.beat.2.body":
    "There is no software gain stage in the bit-perfect path, so an incoming volume command is declined rather than applied. Refusing to attenuate is the only way to stay bit-exact, and the app would rather report full volume than quietly throw bits away.",

  "feature.casting.beat.3.eyebrow": "Honesty",
  "feature.casting.beat.3.title": "It tells you when it had to convert",
  "feature.casting.beat.3.body":
    "When casting over the network, the signal path view reports either that the file was sent unchanged in its native format, or shows the exact sample rate and format conversion negotiated with the target device.",
  "feature.casting.beat.3.note":
    "DLNA passthrough streams compatible lossless files byte-for-byte without re-encoding.",

  "feature.casting.spec.0.label": "Send To",
  "feature.casting.spec.0.value":
    "DLNA and UPnP, cast-enabled speakers and TVs, FCast",
  "feature.casting.spec.1.label": "Receive As",
  "feature.casting.spec.1.value":
    "A DLNA renderer, an FCast target, an MPD or classic network player",
  "feature.casting.spec.2.label": "Receiver Ceiling",
  "feature.casting.spec.2.value": "Up to 384 kHz / 24-bit",
  "feature.casting.spec.3.label": "Network Discovery",
  "feature.casting.spec.3.value": "Automatic on your local network, no account",
  "feature.casting.spec.4.label": "Volume Control",
  "feature.casting.spec.4.value": "Declined in bit-perfect mode, to stay exact",
  "feature.casting.spec.5.label": "Stream Format",
  "feature.casting.spec.5.value":
    "Unchanged on DLNA; told exactly when it's not",

  "feature.casting.fact.0":
    "Send to DLNA, UPnP, cast-enabled speakers and TVs, and FCast",
  "feature.casting.fact.1":
    "Receive over DLNA, FCast and more, each switched on independently",
  "feature.casting.fact.2":
    "The DLNA path sends the file unchanged: nothing is re-encoded",
  "feature.casting.fact.3":
    "Every other path tells you exactly what conversion it made",
  "feature.casting.fact.4":
    "Background streaming continues with the screen locked",
  "feature.casting.fact.5":
    "One receiver mode adds full library browsing, queues, artwork and stored playlists",

  // DSP
  "feature.dsp.title": "Studio-grade DSP rack",
  "feature.dsp.tagline":
    "Crossfeed, loudness matching and clip protection, all switchable",
  "feature.dsp.lede":
    "Fine-tune headphone staging, album loudness, harmonic warmth, and peak headroom with four independent DSP modules. Engage Bit-perfect lock at any time to bypass the entire rack in one tap.",
  "feature.dsp.screen_title": "DSP",
  "feature.dsp.cta_title": "Studio DSP modules with one-tap hardware bypass.",
  "feature.dsp.cta_body":
    "Crossfeed, ReplayGain and the true-peak guard, each one switchable on its own.",

  "feature.dsp.summary.0.label": "Tube voicings",
  "feature.dsp.summary.0.value": "8",
  "feature.dsp.summary.1.label": "Crossfeed models",
  "feature.dsp.summary.1.value": "Meier, Chu Moy, BS2B",
  "feature.dsp.summary.2.label": "ReplayGain",
  "feature.dsp.summary.2.value": "From file tags",
  "feature.dsp.summary.3.label": "Bypass",
  "feature.dsp.summary.3.value": "Bit-perfect lock",

  "feature.dsp.beat.0.eyebrow": "Crossfeed",
  "feature.dsp.beat.0.title": "Take the edge off a long headphone session",
  "feature.dsp.beat.0.body":
    "Headphones put each channel into one ear with no crossover, which is not how a room works and is a large part of why long sessions tire you. Crossfeed bleeds a little of each channel into the other. Three models: Meier at 650 Hz for the gentlest bleed, Chu Moy at 700 Hz for most recordings, and the BS2B circuit for the most speaker-like result.",
  "feature.dsp.beat.0.chip.0.label": "Meier, 650 Hz",
  "feature.dsp.beat.0.chip.1.label": "Chu Moy, 700 Hz",
  "feature.dsp.beat.0.chip.2.label": "BS2B",

  "feature.dsp.beat.1.eyebrow": "Loudness",
  "feature.dsp.beat.1.title": "A mixed queue at one level",
  "feature.dsp.beat.1.body":
    "ReplayGain reads the gain your files were already tagged with, per track or per album, and evens out a queue built from different masters by adjusting level rather than compressing dynamics. A quiet record stays a quiet record; it just starts in the right place.",
  "feature.dsp.beat.1.chip.0.label": "Track",
  "feature.dsp.beat.1.chip.1.label": "Album",
  "feature.dsp.beat.1.chip.2.label": "Auto",

  "feature.dsp.beat.2.eyebrow": "Character",
  "feature.dsp.beat.2.title": "Eight selectable tube saturation voicings",
  "feature.dsp.beat.2.body":
    "Harmonic Tuning adds subtle even-order harmonic warmth using eight selectable valve voicings. Four profiles are derived from published vacuum tube transfer curves, and four are engineering voicings inspired by classic triode and pentode stages.",
  "feature.dsp.beat.2.note":
    "The picker clearly labels which four profiles come from measured tube data and which four are voiced by ear.",

  "feature.dsp.beat.3.eyebrow": "Protection",
  "feature.dsp.beat.3.title": "True-peak inter-sample clip protection",
  "feature.dsp.beat.3.body":
    "Lossy decoders produce peaks that hide between samples, peaks that clip in the converter even though no single sample looks too loud. The limiter oversamples four times to find them, holds a ceiling of -0.6 dBTP, and switches itself on automatically whenever another stage runs that could create them.",
  "feature.dsp.beat.3.stat.0.label": "Ceiling",
  "feature.dsp.beat.3.stat.0.value": "-0.6 dBTP",
  "feature.dsp.beat.3.stat.1.label": "Oversampling",
  "feature.dsp.beat.3.stat.1.value": "4x",

  "feature.dsp.spec.0.label": "Crossfeed Circuit",
  "feature.dsp.spec.0.value": "Jan Meier, Chu Moy, BS2B cross-mix",
  "feature.dsp.spec.1.label": "ReplayGain Modes",
  "feature.dsp.spec.1.value": "Track, album, auto, plus preamp gain",
  "feature.dsp.spec.2.label": "Harmonic Tuning",
  "feature.dsp.spec.2.value": "8 tube voicings, switchable",
  "feature.dsp.spec.3.label": "Bypass",
  "feature.dsp.spec.3.value": "Bit-perfect lock switches all off",
  "feature.dsp.spec.4.label": "True-Peak Limiter",
  "feature.dsp.spec.4.value": "Catches inter-sample peaks at -0.6 dBTP",
  "feature.dsp.spec.5.label": "With AI Enhancer",
  "feature.dsp.spec.5.value": "Switches off automatically",

  "feature.dsp.fact.0":
    "Crossfeed in three strengths: Jan Meier style, Chu Moy style, BS2B full cross-mix",
  "feature.dsp.fact.1":
    "ReplayGain read from file tags, not re-analyzed at playback",
  "feature.dsp.fact.2": "Harmonic Tuning with eight tube voicings",
  "feature.dsp.fact.3":
    "True-peak protection oversamples 4x to catch inter-sample peaks",
  "feature.dsp.fact.4":
    "Limiter holds the ceiling at -0.6 dBTP to prevent DAC clipping",
  "feature.dsp.fact.5": "Rack bypass switches all modules off in one tap",

  // AI ENHANCER
  "feature.ai-enhancer.title": "AI Enhancer",
  "feature.ai-enhancer.tagline":
    "Recovers detail compression removed, right on the phone",
  "feature.ai-enhancer.lede":
    "The enhancer reconstructs the upper band, roughly 14 to 22 kHz, on 44.1 and 48 kHz material, entirely on your phone's own neural chip.",
  "feature.ai-enhancer.screen_title": "AI Enhancer",
  "feature.ai-enhancer.cta_title": "The AI is not an add-on.",
  "feature.ai-enhancer.cta_body":
    "It is in the same subscription as everything else on this site.",

  "feature.ai-enhancer.summary.0.label": "Reconstructs",
  "feature.ai-enhancer.summary.0.value": "14 to 22 kHz",
  "feature.ai-enhancer.summary.1.label": "Works on",
  "feature.ai-enhancer.summary.1.value": "44.1 and 48 kHz",
  "feature.ai-enhancer.summary.2.label": "Runs on",
  "feature.ai-enhancer.summary.2.value": "Neural chip",
  "feature.ai-enhancer.summary.3.label": "Works offline",
  "feature.ai-enhancer.summary.3.value": "Yes",

  "feature.ai-enhancer.beat.0.eyebrow": "What it does",
  "feature.ai-enhancer.beat.0.title": "In-band reconstruction, not invention",
  "feature.ai-enhancer.beat.0.body":
    "It rebuilds amplitude and phase inside the band the file already occupies, around 14 to 22 kHz, at the same sample rate. It does not synthesise ultrasonic content that was never recorded, and it will not turn a 128 kbps MP3 into a master.",
  "feature.ai-enhancer.beat.0.stat.0.label": "Band",
  "feature.ai-enhancer.beat.0.stat.0.value": "14 to 22 kHz",
  "feature.ai-enhancer.beat.0.stat.1.label": "Rates",
  "feature.ai-enhancer.beat.0.stat.1.value": "44.1 and 48 kHz",

  "feature.ai-enhancer.beat.1.eyebrow": "Where it runs",
  "feature.ai-enhancer.beat.1.title":
    "100% on-device inference after a one-time download",
  "feature.ai-enhancer.beat.1.body":
    "Enabling AI Enhancer in Settings downloads the neural weights once to local storage. From then on, all restoration runs offline on your phone with zero network activity and no audio ever uploaded.",

  "feature.ai-enhancer.beat.2.eyebrow": "Hardware",
  "feature.ai-enhancer.beat.2.title": "Hardware neural acceleration required",
  "feature.ai-enhancer.beat.2.body":
    "Real-time upper-band reconstruction runs exclusively on your phone’s neural chip. The app checks hardware support at launch and only offers the toggle in Settings on devices capable of sustained real-time inference.",
  "feature.ai-enhancer.beat.2.chip.0.label": "Off",
  "feature.ai-enhancer.beat.2.chip.1.label": "On",

  "feature.ai-enhancer.beat.3.eyebrow": "Honesty",
  "feature.ai-enhancer.beat.3.title": "The badge stops saying bit-perfect",
  "feature.ai-enhancer.beat.3.body":
    "As soon as AI Enhancer is active, the signal badge switches from Bit-perfect to Enhanced so you always know samples are being modified. To prevent stacked processing artifacts, enabling AI Enhancer automatically disengages the DSP rack.",
  "feature.ai-enhancer.beat.3.note":
    'AI Enhancer and the DSP rack never stack: each DSP row displays "Unavailable while AI Enhancer is on" while restoration is active.',

  "feature.ai-enhancer.spec.0.label": "Processing",
  "feature.ai-enhancer.spec.0.value": "On your phone's neural chip only",
  "feature.ai-enhancer.spec.1.label": "Enable It",
  "feature.ai-enhancer.spec.1.value": "One switch in Settings, off by default",
  "feature.ai-enhancer.spec.2.label": "Your Data",
  "feature.ai-enhancer.spec.2.value": "Never leaves your phone while it plays",
  "feature.ai-enhancer.spec.3.label": "Supported Inputs",
  "feature.ai-enhancer.spec.3.value": "44.1 and 48 kHz files, FLAC included",
  "feature.ai-enhancer.spec.4.label": "Signal Badge",
  "feature.ai-enhancer.spec.4.value": "Shows Enhanced whenever it’s active",
  "feature.ai-enhancer.spec.5.label": "With the DSP Rack",
  "feature.ai-enhancer.spec.5.value": "Switches off automatically",

  "feature.ai-enhancer.fact.0":
    "One-time model download on first enable; works fully offline",
  "feature.ai-enhancer.fact.1":
    "Can be enabled or disabled with a single toggle in Settings",
  "feature.ai-enhancer.fact.2":
    "Eligible on 44.1 and 48 kHz PCM, FLAC included; everything else plays untouched",
  "feature.ai-enhancer.fact.3":
    "Restores detail already in the file; invents nothing above it",
  "feature.ai-enhancer.fact.4":
    "Switches the DSP rack off automatically while it runs",
  "feature.ai-enhancer.fact.5":
    "Nothing about your audio or your listening leaves the phone while it runs",
} as const;

export default features;
