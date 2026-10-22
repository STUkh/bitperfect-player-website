import { pro, site } from "./site";
import { useTranslations, type UIKey } from "../i18n/utils";

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
    "a": "Your DAC gets the file's exact data. Many Android phones send sound through a system mixer, which often changes it to 48 kHz and 16-bit. Bitperfect can skip the mixer and send the file to a USB DAC unchanged. The badge shows when it is not."
  },
  {
    "id": "direct-hardware-bypass",
    "category": "engine",
    "q": "How does Bitperfect reach a USB DAC without root?",
    "a": "Bitperfect drives the USB DAC itself, using the USB Audio Class standard (UAC1 and UAC2). No root is needed. While Bitperfect uses the DAC, other apps cannot play through it."
  },
  {
    "id": "bitperfect-lock",
    "category": "engine",
    "q": "What does Bit-perfect lock do?",
    "a": "Bit-perfect lock is one switch. It turns off all EQ, effects and software volume, so none of them changes the sound. If your DAC cannot play the file's rate, the app still converts it and the badge shows Resampled. Volume moves to the DAC's own control. If the DAC has none, volume stays at 0 dB."
  },
  {
    "id": "dyadic-lossless-volume",
    "category": "engine",
    "q": "How does dyadic (bit-exact) volume work?",
    "a": "Normal digital volume rounds off the lowest bits. Optional dyadic volume uses exact n/256 steps instead. In the app it is called Alternative volume control. It works when the output is wider than the file: 85 steps for 16-bit files at 32-bit output, 20 steps for 24-bit files at 32-bit output or 16-bit files at 24-bit output."
  },
  {
    "id": "native-dsd-and-dop",
    "category": "engine",
    "q": "Does Bitperfect support native DSD and DoP?",
    "a": "Yes. It plays DSF and DFF files and DSD disc images as native DSD or DoP, from DSD64 to DSD512. The rates you get depend on your DAC. If your DAC takes neither, the app converts to PCM and the badge shows it. It can also turn PCM into DSD as it plays, at the same rates."
  },
  {
    "id": "need-external-dac",
    "category": "hardware",
    "q": "Do I need an external DAC?",
    "a": "Not to play music. The phone's own 3.5mm jack and speaker work too. On most phones, the system mixer stays in that path, and the badge shows Resampled. A USB DAC or a supported DAP skips the mixer. On some phones, the app can also use the built-in DAC directly, after a test and with your permission."
  },
  {
    "id": "usb-dac-setup-guide",
    "category": "hardware",
    "q": "How do I set up a USB DAC?",
    "a": "Connect the USB DAC with an OTG cable. Allow access when Android asks. The Bit-perfect badge shows when no effects or software volume are on, and the DAC runs at the file's rate and depth."
  },
  {
    "id": "usb-permission-dialog",
    "category": "hardware",
    "q": "Why does Android ask for USB permission every time?",
    "a": "Android asks before any app can control a USB device. If the prompt offers to always open Bitperfect Player for this DAC, tick that box. After that, it connects without asking."
  },
  {
    "id": "dap-support",
    "category": "hardware",
    "q": "Does Bitperfect work on digital audio players (DAPs)?",
    "a": "Yes. On supported DAPs from brands such as FiiO, iBasso, HiBy, Cayin and Shanling, Bitperfect sends sound straight to the player's bit-perfect output. The player's firmware sets the volume."
  },
  {
    "id": "why-npu-ai-enhancer-not-working",
    "category": "ai",
    "q": "Why is AI Enhancer off or not working?",
    "a": "The full model runs on the neural chip of Snapdragon 8 Gen 1 and newer, and Dimensity 8300, 8400, 9300 and 9400 chips. Other phones get Lite mode, a lighter model on the main processor. AI Enhancer turns off if your phone is too slow for real time, or the model is not downloaded. It does not run while Bit-perfect lock is on, or with DSD, PCM-to-DSD, casting, AI Karaoke, or files other than 44.1 and 48 kHz.",
    "guideUrl": "/faq/why-npu-ai-enhancer-not-working"
  },
  {
    "id": "can-i-disable-ai",
    "category": "ai",
    "q": "Can I turn off the AI processing?",
    "a": "Yes. AI Enhancer is off by default, so it changes nothing until you turn it on. When it is on, the badge shows Enhanced instead of Bit-perfect, because the enhancer rebuilds part of the signal."
  },
  {
    "id": "ai-offline-operation",
    "category": "ai",
    "q": "Do the AI features work offline?",
    "a": "Yes. Each AI feature downloads its model once. For AI Enhancer, that is about 10 to 60 MB, based on your chip. Then it works with no connection. The app still checks your subscription online at least once every 14 days. Your audio files and listening history never leave the phone."
  },
  {
    "id": "ai-features-breakdown",
    "category": "ai",
    "q": "What do AI Enhancer, AI Karaoke and Sonic Scan do?",
    "a": "AI Enhancer rebuilds the top octave of 44.1 and 48 kHz tracks as they play. AI Karaoke makes a vocal or instrumental version of 44.1, 88.2 and 176.4 kHz tracks just before playback. Sonic Scan checks your library in the background for tracks that sound alike."
  },
  {
    "id": "supported-audio-formats",
    "category": "dsp",
    "q": "What audio formats can I play?",
    "a": "It plays FLAC, ALAC, WAV, AIFF, DSD (DSF and DFF) and DSD disc images, Monkey's Audio, WavPack, True Audio, TAK, Musepack, Opus, Ogg Vorbis, MP3 and AAC."
  },
  {
    "id": "equalizer-modes",
    "category": "dsp",
    "q": "What EQ modes are there?",
    "a": "Four modes. Studio has 14 simple tone sliders. Graphic EQ has 10 bands. Parametric EQ has up to 32 bands, seven filter shapes and Q from 0.10 to 10.0. AutoEQ adds headphone corrections."
  },
  {
    "id": "harmonic-tuning-explained",
    "category": "dsp",
    "q": "What is Harmonic Tuning?",
    "a": "Harmonic Tuning adds harmonics, H2 to H8, in eight tube-style voicings such as 300B and KT88. They run from warm even-order to biting odd-order. Drive at 0 leaves the sound unchanged. The Expert tab has a fader for each harmonic."
  },
  {
    "id": "crossfeed-acoustics",
    "category": "dsp",
    "q": "What is Crossfeed?",
    "a": "On headphones, hard-panned stereo can sound split between your ears. Crossfeed blends some of each channel into the other, so it sounds more like speakers. Three strengths: Subtle, Natural and Strong, modelled on Meier, Chu Moy and BS2B."
  },
  {
    "id": "battery-drain-dac",
    "category": "battery",
    "q": "How much battery does a USB DAC use?",
    "a": "A USB DAC takes power from your phone's USB-C port, so battery life is shorter. Sensitive IEMs need less power. A powered OTG splitter lets planar headphones run without draining the phone."
  },
  {
    "id": "full-ram-playback",
    "category": "battery",
    "q": "What is Full RAM Playback?",
    "a": "Full RAM Playback loads the whole encoded file into memory before it plays. The storage stays idle while you listen. Files too large for the memory limit use read-ahead instead."
  },
  {
    "id": "background-killing-prevention",
    "category": "battery",
    "q": "Why does playback stop in the background?",
    "a": "Battery savers on some phones, such as Samsung, Xiaomi and OnePlus, can stop playback. In Android Settings > Apps > Battery, set Bitperfect Player to Unrestricted. Then lock the app in recent tasks."
  },
  {
    "id": "cost-and-plans",
    "category": "license",
    "q": "What does Bitperfect Player cost?",
    "a": "Bitperfect Player has one plan with every feature and no ads. Limited Founder offer: $19.95 a year if you subscribe by May 31, 2027. You keep that price on every renewal while you stay subscribed. From June 1, 2027, new subscribers pay the standard price of $29.95 a year. If you cancel and come back after May 31, 2027, you pay the standard price too. Eligible new customers get 14 days free. Cancel during the trial and you pay nothing. The plan covers five devices, and you can buy more in the app. You pay and cancel in Google Play."
  },
  {
    "id": "device-allowance",
    "category": "license",
    "q": "How many devices does a subscription cover?",
    "a": "One subscription covers five phones, tablets or DAPs linked to your Google Play account. You can buy packs of five more in the app, up to twenty devices. You can also remove an old device from the list in the app."
  },
  {
    "id": "privacy-and-network-transfers",
    "category": "license",
    "q": "What does the app send over the internet?",
    "a": "Your audio files, library and listening history never leave your phone. There are no ads and no analytics. The app goes online for artwork, artist photos and lyrics. It also goes online for AutoEQ downloads, internet radio when you tune in, the one-time AI model download, update checks through Google Play and the subscription check. Crash reports and artist photos are on by default. You can turn both off in Settings."
  },
  {
    "id": "do-i-need-an-account",
    "category": "license",
    "q": "Do I need an account?",
    "a": "No. There is no sign-in today. Your subscription lives in your Google Play account. An optional account is planned, for backing up your settings and EQ presets. It will never be required. If you create one, it stores only your sign-in, your subscription link and your backups. Your music, library and listening history stay on your phone either way."
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
