export const features = {
  // Features base & placeholder keys

  // ---------------------------------------------------------------------------
  // features_index.* (Features Index page)
  // ---------------------------------------------------------------------------

  // Features Index: Header
  "features_index.meta_title": "Features",
  "features_index.meta_description":
    "Six features you can use today: bit-perfect USB DAC output, an EQ with up to 32 bands, a lossless library on your phone, casting, the DSP rack and AI Enhancer.",
  "features_index.header_eyebrow": "Core capabilities",
  "features_index.header_title": "Six features, built on bit-perfect playback",
  "features_index.header_subtitle":
    "Plays straight to your USB DAC. Adds an EQ with up to 32 bands, a searchable library on your phone, casting to and from other devices, a DSP rack and AI Enhancer.",
  "features_index.catalog_eyebrow": "Technical details",
  "features_index.catalog_badge": "27 capabilities",
  "features_index.catalog_title": "Want the full specifications?",
  "features_index.catalog_body":
    "All 27 capabilities in detail, including USB Audio Class 1 and 2 and an optional bit-exact volume mode.",
  "features_index.catalog_cta": "See all 27 capabilities",

  // Features Index: Cards
  "features_index.cards_sr_heading": "All features",

  // Features Index: Compatibility
  "features_index.compat_title": "Will it run on your phone?",
  "features_index.compat_subtitle":
    "Playback, USB DAC, EQ, casting and Sonic Scan work on any phone with Android 8.0 or newer. AI Enhancer's full model needs a supported neural chip. Other phones run a lighter version, if the processor is fast enough.",
  "features_index.compat_player_what": "Playback and processing",
  "features_index.compat_player_scope":
    "Playback, bit-perfect USB, EQ, casting and the DSP rack",
  "features_index.compat_player_devices": "Every phone on Android 8.0 or newer",
  "features_index.compat_player_note":
    "The same app works on every supported phone.",
  "features_index.compat_ai_library_what": "Sonic Scan and Similar Tracks",
  "features_index.compat_ai_library_scope":
    "Scans your library on your phone to find similar tracks",
  "features_index.compat_ai_library_devices":
    "Every phone on Android 8.0 or newer",
  "features_index.compat_ai_library_note":
    "No special chip needed. Works offline after a one-time model download.",
  "features_index.compat_ai_enhancer_what": "AI Enhancer",
  "features_index.compat_ai_enhancer_scope":
    "Rebuilds the 14 to 22 kHz band live, on 44.1 and 48 kHz audio only. Off by default.",
  "features_index.compat_ai_enhancer_devices":
    "Android 8.0 or newer, best on a supported neural chip",
  "features_index.compat_ai_enhancer_note":
    "Phones with a supported neural chip run the full model. Others run a lighter model on the processor, if it is fast enough.",
  "features_index.compat_min_android": "Android {minAndroid} or newer.",

  // Features Index: Technical FAQ

  // Features Index: Closing Action
  "features_index.cta_eyebrow": "All features included",
  "features_index.cta_title_prefix": "Six features. ",
  "features_index.cta_title_highlight": "All in one plan.",
  "features_index.cta_subtitle":
    "One annual subscription unlocks every feature. There are no other tiers.",
  "features_index.cta_button": "Get it on Google Play",

  // ---------------------------------------------------------------------------
  // feature_detail.* (Common Feature Detail labels)
  // ---------------------------------------------------------------------------
  "feature_detail.breadcrumb": "Features",
  "feature_detail.specifications_eyebrow": "Specification",
  "feature_detail.specifications_title": "The numbers, in full",
  "feature_detail.specifications_subtitle":
    "Everything here works in the app today.",
  "feature_detail.prev": "Previous",
  "feature_detail.next": "Next",
  "feature_detail.more_features": "More features",
  "feature_detail.cta_button": "Get it on Google Play",

  // Feature Detail: Signal Path (usb-dac)
  "feature_detail.signal_path_eyebrow": "The path to your DAC",
  "feature_detail.signal_path_title": "Seven stages, or four.",
  "feature_detail.signal_path_subtitle":
    "Take a 192 kHz / 24-bit file. Many Android phones send it through 7 stages and cut it to 48 kHz / 16-bit. Bitperfect uses 4 stages and sends it to your DAC unchanged. It handles up to 32-bit / 768 kHz and DSD512, if your DAC supports them.",
  "feature_detail.signal_path_stages": "stages",
  "feature_detail.signal_path_reaches_dac": "Reaches the DAC at",
  "feature_detail.signal_path_resamples": "Rate conversions",
  "feature_detail.signal_path_mixers": "Mixer changes",
  "feature_detail.signal_path_conversions": "Bit-depth cuts",
  "feature_detail.signal_path_note":
    "The Bit-perfect badge shows only when nothing changes. That means exclusive USB, no effects, and the file's own rate and depth. Effects or the phone's mixer show Resampled. The AI Enhancer shows Enhanced.",
  "feature_detail.signal_path_android": "Typical Android path",
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
  "feature.usb-dac.tagline": "Your DAC gets the file unchanged, or the badge says so",

  "feature.usb-dac.signal_path.android.stage.0": "Source File",
  "feature.usb-dac.signal_path.android.stage.1": "App Handoff",
  "feature.usb-dac.signal_path.android.stage.2": "Rate Converter",
  "feature.usb-dac.signal_path.android.stage.3": "System Mixer",
  "feature.usb-dac.signal_path.android.stage.4": "Software Volume",
  "feature.usb-dac.signal_path.android.stage.5": "Bit-Depth Cut",
  "feature.usb-dac.signal_path.android.stage.6": "USB Output",
  "feature.usb-dac.signal_path.ours.stage.0": "Source File",
  "feature.usb-dac.signal_path.ours.stage.1": "Exclusive USB Access",
  "feature.usb-dac.signal_path.ours.stage.2": "Bit-Exact Delivery",
  "feature.usb-dac.signal_path.ours.stage.3": "Hardware DAC",

  // EQ
  "feature.eq.title": "32-band parametric EQ",
  "feature.eq.tagline": "Tone control you can turn off in one tap",

  // LIBRARY
  "feature.library.title": "Local lossless library",
  "feature.library.tagline":
    "Find any album instantly, on your phone",

  // CASTING
  "feature.casting.title": "Two-way streaming",
  "feature.casting.tagline":
    "Send to a network streamer or TV, or receive from another device",

  // DSP
  "feature.dsp.title": "DSP rack",
  "feature.dsp.tagline":
    "Headphone crossfeed, album loudness and clip protection, each adjustable",

  // AI ENHANCER
  "feature.ai-enhancer.title": "AI Enhancer",
  "feature.ai-enhancer.tagline":
    "Rebuilds highs lost in lossy files. Off by default. When on, the badge says Enhanced.",
} as const;

export default features;
