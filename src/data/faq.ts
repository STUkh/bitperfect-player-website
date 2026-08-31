export interface FAQItem {
  q: string;
  a: string;
  link?: { href: string; text: string };
}

export const faqItems: FAQItem[] = [
  {
    q: 'What does "bit-perfect" actually mean here?',
    a: "That the samples reaching your DAC are numerically identical to the ones in the file. Bitperfect opens the USB audio device directly and drives it at the file's own sample rate and bit depth, so nothing resamples, remixes, or dithers on the way out. When that is not achievable — a device that will not surrender exclusive access, say — the app says so rather than claiming otherwise.",
  },
  {
    q: 'Do I need an external DAC?',
    a: "No. Bitperfect plays through your phone's own output too. But the default system path routes through the system mixer, which sets its own rate — so the bit-perfect state specifically describes USB Audio Class 2 output to an external DAC. The app labels whichever path you are actually on.",
  },
  {
    q: 'Is the AI processing optional?',
    a: 'Yes. Every AI feature stays off until you enable it. The annual subscription includes the whole app, including AI. The enhancer alters the signal by design, so switching it on re-labels the signal state as enhanced rather than bit-perfect.',
  },
  {
    q: 'What does the app send over the internet?',
    a: 'Crash reports when enabled, artwork searches, store-backed subscription verification, and model downloads for AI features. Audio and listening history never leave the phone, and there are no ads or behavioral analytics.',
  },
  {
    q: 'Which platforms and devices are supported?',
    a: 'API 26 through current, on every ABI. Everything except the AI Enhancer runs on any device that clears that bar. The Enhancer needs hardware NPU acceleration — flagship-class platforms from 2022 onward, premium mid-range from 2024 — and the app probes the accelerator before enabling the feature rather than assuming it will work.',
    link: { href: '#compatibility', text: 'See the compatibility check' },
  },
  {
    q: 'Can I add streaming sources?',
    a: "Through plugins, which are separate signed apps. A plugin resolves a stream URL and hands it back — it never receives decoded audio, and none of its code runs inside the player's process.",
  },
  {
    q: 'What does the subscription cost?',
    a: "There is one annual subscription at USD 35 per year. Eligible new customers get a 7-day free trial. Google Play shows and charges the regional price before purchase, renews the subscription automatically, and handles cancellation.",
  },
  {
    q: 'Do AI features work offline?',
    a: 'After the initial model download, AI processing runs on the phone. The first download and periodic subscription verification require a network connection.',
  },
];
