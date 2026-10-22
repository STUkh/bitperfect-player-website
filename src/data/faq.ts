export interface FAQItem {
  id: string;
  category: string;
  q: string;
  a: string;
  guideUrl?: string;
  highlights?: string[];
}

export const allFaqItems: FAQItem[] = [
  {
    "id": "what-is-bit-perfect",
    "category": "engine",
    "q": "What does bit-perfect mean?",
    "a": "Your DAC gets the file's exact data. Android's system mixer often resamples sound to 48 kHz and 16-bit. Bitperfect Player skips that mixer. It sends files unchanged to a USB DAC. The badge shows when the sound is not bit-perfect."
  },
  {
    "id": "direct-hardware-bypass",
    "category": "engine",
    "q": "How does Bitperfect Player reach a USB DAC without root?",
    "a": "Bitperfect Player uses Android's USB host permission to talk to the DAC directly. It supports UAC1 and UAC2 standards. Android's system audio stack is never involved. While the app uses the DAC, other apps cannot play through it."
  },
  {
    "id": "bitperfect-lock",
    "category": "engine",
    "q": "What does Bit-perfect lock do?",
    "a": "Bit-perfect lock is one switch. It turns off all EQ, sound processing and software volume. If your DAC cannot play the file rate, the app converts it. The badge then shows Resampled. Volume moves to the DAC control. If the DAC has no hardware volume control, output stays fixed at 0 dBFS line level. That means full volume. Use an external amplifier with analog volume. Turn off the lock or use alternative volume if connecting sensitive headphones directly."
  },
  {
    "id": "dyadic-lossless-volume",
    "category": "engine",
    "q": "How does dyadic (bit-exact) volume work?",
    "a": "Normal digital volume rounds off the lowest bits. Optional dyadic volume uses exact n/256 steps instead. In the app, it is called Alternative volume control. It works when DAC output depth exceeds file bit depth. You get 85 steps for 16-bit files at 32-bit output. You get 20 steps for 24-bit files at 32-bit output. The same applies to 16-bit files at 24-bit output."
  },
  {
    "id": "native-dsd-and-dop",
    "category": "engine",
    "q": "Does Bitperfect Player support native DSD and DoP?",
    "a": "Yes. The app plays DSF, DFF and DSD disc images. Native DSD plays up to DSD1024, and DoP plays up to DSD256. Rates depend on your DAC. If your DAC supports neither, the app converts to PCM. The badge then shows Resampled. It can also convert PCM to DSD in real time. Real-time conversion to high rates requires a flagship processor."
  },
  {
    "id": "need-external-dac",
    "category": "hardware",
    "q": "Do I need an external DAC?",
    "a": "Not to play music. The headphone jack and built-in speaker work too. On most phones, Android's system mixer resamples that audio. The badge then shows Resampled. An external USB DAC is recommended for guaranteed bit-perfect output across all devices. On select phones, the app can drive the internal DAC directly. This depends on your phone's DAC chip and OS firmware. It requires a quick hardware test and your permission."
  },
  {
    "id": "usb-dac-setup-guide",
    "category": "hardware",
    "q": "How do I set up a USB DAC?",
    "a": "Connect the USB DAC using a USB-C cable or an OTG adapter. Allow access when Android asks. The Bit-perfect badge appears when sound processing and software volume are off. The DAC must also match the file rate and bit depth."
  },
  {
    "id": "usb-permission-dialog",
    "category": "hardware",
    "q": "Why does Android ask for USB permission every time?",
    "a": "Android asks permission before any app can control a USB device. Tick the box to always open Bitperfect Player for this DAC. The app will then connect automatically in the future."
  },
  {
    "id": "dap-support",
    "category": "hardware",
    "q": "Does Bitperfect Player work on digital audio players (DAPs)?",
    "a": "Yes. The app supports HiBy, iBasso, Astell&Kern and other Android DAPs. It sends sound straight to the player's internal audio path. The player's hardware sets the volume. To activate your subscription, the DAP needs Google Play Services. On DAPs with the Google Play Store, activation works normally."
  },
  {
    "id": "why-npu-ai-enhancer-not-working",
    "category": "ai",
    "q": "Why is AI Enhancer off or not working?",
    "a": "The full model runs on a supported neural chip. Supported chips include Snapdragon 8 Gen 1 and newer, and Dimensity 8300 or newer. Other phones use Lite mode on the main processor. AI Enhancer turns off if your phone cannot keep up in real time. It requires a one-time model download first. It stays off while Bit-perfect lock is on. It works on 44.1 and 48 kHz tracks only. It skips DSD, cast-enabled speakers and TVs, and AI Karaoke.",
    "guideUrl": "/faq/why-npu-ai-enhancer-not-working"
  },
  {
    "id": "can-i-disable-ai",
    "category": "ai",
    "q": "Can I turn off the AI processing?",
    "a": "Yes. AI Enhancer is off by default. It changes nothing until you switch it on. When on, the badge says Enhanced instead of Bit-perfect. This indicates restored high frequencies."
  },
  {
    "id": "ai-offline-operation",
    "category": "ai",
    "q": "Do the AI features work offline?",
    "a": "Yes. AI features require a one-time model download first. For AI Enhancer, the model is about 10 to 60 MB. After that, processing runs entirely offline. The app checks your subscription online at least once every 14 days. Your music, library, history and favourites stay on your phone."
  },
  {
    "id": "ai-features-breakdown",
    "category": "ai",
    "q": "What do AI Enhancer, AI Karaoke and Sonic Scan do?",
    "a": "AI Enhancer restores high frequencies on 44.1 and 48 kHz tracks. AI Karaoke isolates vocals or instruments on supported tracks before playback. Sonic Scan analyses your library locally. It powers Similar Tracks for smooth musical transitions."
  },
  {
    "id": "supported-audio-formats",
    "category": "dsp",
    "q": "What audio formats can I play?",
    "a": "The app plays 15 audio formats. Lossless: FLAC, ALAC, WAV, AIFF, DSD (DSF and DFF) and DSD disc images. Archival: Monkey's Audio, WavPack, True Audio, TAK and Musepack. Compressed: Opus, Ogg Vorbis, MP3 and AAC."
  },
  {
    "id": "equalizer-modes",
    "category": "dsp",
    "q": "What EQ modes are there?",
    "a": "Four modes. Studio has 14 simple tone sliders. Graphic EQ has 10 bands. Parametric EQ has up to 32 bands and seven filter shapes. Q ranges from 0.10 to 10.0. AutoEQ adds headphone corrections."
  },
  {
    "id": "harmonic-tuning-explained",
    "category": "dsp",
    "q": "What is Harmonic Tuning?",
    "a": "Harmonic Tuning adds harmonics, H2 to H8, across eight tube-style voicings. Examples include 300B and KT88. They run from warm even-order to biting odd-order. Drive at 0 leaves the sound unchanged. The Expert tab provides a fader for each harmonic."
  },
  {
    "id": "crossfeed-acoustics",
    "category": "dsp",
    "q": "What is Crossfeed?",
    "a": "On headphones, hard-panned stereo can sound split between your ears. Crossfeed blends some channel content to sound more like speakers. Choose between Subtle, Natural and Strong. Presets are modelled on Meier, Chu Moy and BS2B."
  },
  {
    "id": "battery-drain-dac",
    "category": "battery",
    "q": "How much battery does a USB DAC use?",
    "a": "A USB DAC draws power from your phone, which shortens battery life. Sensitive IEMs need less power. A powered OTG splitter lets planar headphones run without draining the phone."
  },
  {
    "id": "full-ram-playback",
    "category": "battery",
    "q": "What is Full RAM Playback?",
    "a": "Full RAM Playback loads tracks into memory before playing, based on available system RAM. Storage stays idle while you listen. This dynamic allocation stops Android from closing the app under memory pressure. Larger files like DSD disc images use continuous streaming prefetch without gaps."
  },
  {
    "id": "background-killing-prevention",
    "category": "battery",
    "q": "Why does playback stop in the background?",
    "a": "Battery savers on some phones can stop playback. This affects Samsung, Xiaomi and OnePlus devices. In Android Settings > Apps > Battery, set Bitperfect Player to Unrestricted. Then lock the app in recent tasks."
  },
  {
    "id": "cost-and-plans",
    "category": "license",
    "q": "What does Bitperfect Player cost?",
    "a": "Bitperfect Player has one annual subscription with every feature and no ads. Limited Founder offer: $19.95 a year if you subscribe by May 31, 2027. That price stays yours on every renewal while you stay subscribed. From June 1, 2027, new subscribers pay the standard price of $29.95 a year. Cancel and come back after that date, and you pay the standard price. Eligible new customers get 14 days free. Cancel during the trial and you pay nothing. The plan covers five devices with the Google Play Store. More devices are a paid in-app add-on. You pay and cancel in Google Play."
  },
  {
    "id": "device-allowance",
    "category": "license",
    "q": "How many devices does a subscription cover?",
    "a": "One subscription covers five devices linked to your Google Play account. These include phones, tablets and supported DAPs. DAPs need the Google Play Store to activate and verify the subscription. You can buy packs of five more in the app. The limit is twenty devices. You can also remove old devices at any time."
  },
  {
    "id": "privacy-and-network-transfers",
    "category": "license",
    "q": "What does the app send over the internet?",
    "a": "Your audio files, library, history and favourites stay on your phone. There are no ads and no tracking. The app goes online for album art, lyrics, AutoEQ profiles, internet radio and subscription checks. Crash reports can be turned off in settings."
  },
  {
    "id": "do-i-need-an-account",
    "category": "license",
    "q": "Do I need an account?",
    "a": "No account needed. There is no sign-in today. Your subscription lives in your Google Play account. An optional account is planned for backing up settings and EQ presets. It will never be required. If you create one, your music, library, history and favourites still stay on your phone."
  }
];

export const faqItems = allFaqItems;

export function getFaqByCategory(category: string): FAQItem[] {
  if (category === 'all') return allFaqItems;
  return allFaqItems.filter(item => item.category === category);
}

export function getFaqById(id: string): FAQItem | undefined {
  return allFaqItems.find(item => item.id === id);
}
