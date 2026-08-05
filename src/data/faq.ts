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
    a: "No. Bitperfect plays through your phone's own output too. But Android's internal path routes through the system mixer, which sets its own rate — so the bit-perfect state specifically describes USB Audio Class 2 output to an external DAC. The app labels whichever path you are actually on.",
  },
  {
    q: 'Is the AI processing optional?',
    a: 'Yes. Every AI feature ships off and stays off until you enable it — they are part of Pro. The enhancer alters the signal by design, so switching it on re-labels the signal state as enhanced rather than bit-perfect. That is deliberate: the badge never claims a purity the DSP just spent.',
  },
  {
    q: 'What does the app send over the internet?',
    a: 'Three things. Crash reports — on by default, and one switch turns them off. Artwork lookups — on by default, also switchable — which send artist and album names to public image sources and nothing more. And a one-time download of model files when you enable an AI feature. That is the whole list: no analytics, no ads, no account, no listening history. Audio never leaves the phone.',
  },
  {
    q: 'Which Android versions and phones are supported?',
    a: 'Android 8.0 (API 26) through current, on every ABI. Everything except the AI Enhancer runs on any phone that clears that bar. The Enhancer needs hardware NPU acceleration — flagship-class platforms from 2022 onward, premium mid-range from 2024 — and the app probes the accelerator before enabling the feature rather than assuming it will work.',
    link: { href: '#compatibility', text: 'See the compatibility check' },
  },
  {
    q: 'Can I add streaming sources?',
    a: "Through plugins, which are separate signed apps. A plugin resolves a stream URL and hands it back — it never receives decoded audio, and none of its code runs inside the player's process.",
  },
  {
    q: 'What does Pro cost?',
    a: "$2 a month, $9 for six months, or $12 a year — which works out to $1 a month. You buy it in-app; Google Play handles the billing. It renews automatically until cancelled, and you can cancel anytime in Play's subscriptions screen. The player, the EQ, casting, and plugins never need Pro.",
  },
  {
    q: 'Do AI features work offline?',
    a: 'Yes. The models download once, when you first enable a feature. After that everything — enhancement, mixes, similar tracks, search — runs on the phone with no connection at all. There is no server side to be offline from.',
  },
];
