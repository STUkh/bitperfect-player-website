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
    "q": "What does bit-perfect actually mean here?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Audio samples reaching your DAC match the source file bit-for-bit. Standard Android resamples audio to 48 kHz via AudioFlinger; our user-space USB driver bypasses the OS mixer completely."
  },
  {
    "id": "direct-hardware-bypass",
    "category": "engine",
    "q": "How does direct hardware bypass work without root?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>An in-house user-space USB Audio Class (UAC1/UAC2) driver communicates directly via the Android USB Host API. It needs no root access and isolates music from system notification sounds."
  },
  {
    "id": "bitperfect-lock",
    "category": "engine",
    "q": "What is Bitperfect Lock and why is it essential?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Bitperfect Lock is a one-touch switch that disables all software EQ, DSP plugins, and volume sliders. Volume control delegates strictly to your external DAC hardware attenuator."
  },
  {
    "id": "dyadic-lossless-volume",
    "category": "engine",
    "q": "How does 64-bit Dyadic Lossless Volume Control work?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Standard digital volume multiplies samples by fractions, truncating low bits. Dyadic volume scales by exact powers of two, giving 85 lossless steps at 16-bit and 25 steps at 24-bit."
  },
  {
    "id": "native-dsd-and-dop",
    "category": "engine",
    "q": "Does Bitperfect Player support Native DSD and DoP?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Yes. It streams 1-bit DSD audio (DSF, DFF, and SACD ISO) via Native DSD and DoP from DSD64 to DSD512, plus real-time PCM-to-DSD conversion."
  },
  {
    "id": "need-external-dac",
    "category": "hardware",
    "q": "Do I need an external DAC?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>No. The phone's built-in 3.5mm jack or internal speaker works too. However, Android routes internal audio through the system mixer, so the Bit-perfect status badge is reserved for direct USB output to an external DAC or dedicated DAP hardware output."
  },
  {
    "id": "usb-dac-setup-guide",
    "category": "hardware",
    "q": "How do I set up and configure an external USB DAC?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Connect your USB DAC with an OTG cable. When Android prompts to allow Bitperfect Player to access the USB device, tap \"Always allow\" to activate the Bit-perfect status indicator."
  },
  {
    "id": "usb-permission-dialog",
    "category": "hardware",
    "q": "Why does Android ask for USB permission every time?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Android requires user permission before an app can claim direct USB hardware access. Check \"Always use for this device\" in the prompt so future connections start automatically."
  },
  {
    "id": "dap-support",
    "category": "hardware",
    "q": "Can I run Bitperfect Player on dedicated Digital Audio Players (DAPs)?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Yes. Dedicated hardware drivers support Android DAPs from FiiO, iBasso, HiBy, Astell&Kern, Shanling, and Cayin, including dual-DAC chips, balanced 4.4mm outputs, and hardware gain switches."
  },
  {
    "id": "why-npu-ai-enhancer-not-working",
    "category": "ai",
    "q": "Why is AI Enhancer not working or disabled on my device?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>AI Enhancer requires a dedicated hardware NPU for real-time overtone restoration. It disables if your phone lacks an NPU, uses a brand-new chipset awaiting optimization, or has OEM firmware blocks (such as Motorola).",
    "guideUrl": "/faq/why-npu-ai-enhancer-not-working"
  },
  {
    "id": "can-i-disable-ai",
    "category": "ai",
    "q": "Can I turn off the AI processing?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Yes, and it is off by default. Bitperfect Player outputs bit-perfect audio by default. When AI Enhancer is turned on, the signal status indicator updates from Bit-perfect to Enhanced because the audio samples have been reconstructed."
  },
  {
    "id": "ai-offline-operation",
    "category": "ai",
    "q": "Do the AI features work offline without internet?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Yes. After a one-time 25 to 45 MB model download, all neural inference runs 100% locally on your NPU. Your audio files and listening data never leave your device."
  },
  {
    "id": "ai-features-breakdown",
    "category": "ai",
    "q": "What is the difference between AI Enhancer, AI Karaoke, and AI Sonic Scan?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>AI Enhancer restores high-frequency harmonics on the NPU. AI Karaoke separates vocals and instruments in real time. AI Sonic Scan runs on the CPU to cluster tracks by acoustic similarity."
  },
  {
    "id": "supported-audio-formats",
    "category": "dsp",
    "q": "What audio formats does Bitperfect Player play?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>It decodes FLAC, ALAC, WAV, AIFF, DSD (DSF, DFF, SACD ISO), DCA (lossless multichannel audio), Dolby AC-3 / E-AC-3, APE, WavPack, TTA, TAK, Musepack, Opus, Ogg Vorbis, MP3, and AAC."
  },
  {
    "id": "equalizer-modes",
    "category": "dsp",
    "q": "What equalizer modes and tone tools are available?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Four modes: 1) Studio Target Curve; 2) 10-band Graphic EQ; 3) 32-band Parametric EQ with 7 biquad shapes and Q from 0.10 to 10.0; 4) AutoEQ with 4,000+ headphone profiles."
  },
  {
    "id": "harmonic-tuning-explained",
    "category": "dsp",
    "q": "What is Harmonic Tuning and how does it affect sound?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Harmonic Tuning models analog vacuum tubes (300B, KT88, EL34, 12AX7), adding subtle 2nd and 4th order harmonics with soft-knee saturation for natural warmth on solid-state DACs."
  },
  {
    "id": "crossfeed-acoustics",
    "category": "dsp",
    "q": "What is Crossfeed and when should I turn it on?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Headphones isolate hard-panned stereo channels into separate ears, causing fatigue. Crossfeed blends delayed, frequency-shaped signals across channels using Meier, Chu Moy, or BS2B models for a natural speaker stage."
  },
  {
    "id": "battery-drain-dac",
    "category": "battery",
    "q": "How much battery does an external USB DAC consume?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>USB DAC dongles draw 100 to 500 mA from your phone USB-C port. To save battery, use sensitive IEMs on the go, a powered OTG splitter for planar headphones, and Full RAM Playback."
  },
  {
    "id": "full-ram-playback",
    "category": "battery",
    "q": "What is Full RAM Playback and how does it help?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Full RAM Playback loads the entire audio track into system RAM before play begins. This stops flash and microSD storage reads, eliminating bus latency and RF read noise."
  },
  {
    "id": "background-killing-prevention",
    "category": "battery",
    "q": "Why did playback stop in the background, and how do I fix it?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>OEM battery savers (Samsung, Xiaomi, OnePlus) can stop background audio. Set Bitperfect Player to \"Unrestricted\" in Android Settings &gt; Apps &gt; Battery, and lock the app in recent tasks."
  },
  {
    "id": "cost-and-plans",
    "category": "license",
    "q": "What does Bitperfect Player cost?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>$19.95 per year under the Limited Founder Offer active until May 31, 2027, locked in forever upon renewal until cancelled, with the first 14 days free for new customers. After May 31, 2027, or if a subscription is cancelled, the standard rate is $29.95 per year. One subscription covers the complete application; there are no hidden tiers, no ads, and nothing is switched off to sell you an upgrade. Billed securely through Google Play and cancellable at any time in your Google account settings."
  },
  {
    "id": "device-allowance",
    "category": "license",
    "q": "How many devices does a subscription cover?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>One subscription covers five concurrently active devices (phones, tablets, or DAPs) linked to your Google Play account. If you manage extensive listening setups, device capacity packs can be purchased in the app in increments of five, up to twenty devices."
  },
  {
    "id": "privacy-and-network-transfers",
    "category": "license",
    "q": "What does the app send over the internet?",
    "a": "</polyline> </svg> </div> </summary> <div class=\"mt-4 text-body-sm text-pretty text-text-secondary leading-relaxed\" data-astro-cid-d7buufdx> <p data-astro-cid-d7buufdx>Only essential service requests: crash logs, artwork/lyrics lookups, AutoEQ profile fetches, Google Play license checks, and one-time NPU model weights. Audio files and history never leave your phone; zero ad or analytics SDKs."
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
