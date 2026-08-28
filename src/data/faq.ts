export interface FAQItem {
  q: string;
  a: string;
  link?: { href: string; text: string };
}

export const faqItems: FAQItem[] = [
  {
    q: 'What does "bit-perfect" actually mean here?',
    a: "That the samples reaching your DAC are numerically identical to the ones in the audio file. Bitperfect opens the USB audio device directly and drives it at the file's own native sample rate and bit depth, so nothing resamples, remixes, or dithers on the way out. When direct hardware access is not achievable on a particular connection, the app clearly displays the real state rather than claiming otherwise.",
  },
  {
    q: 'Do I need an external DAC?',
    a: "No. Bitperfect plays through your phone's internal output as well. Because the standard Android path routes through the system mixer, the bit-perfect indicator specifically marks direct USB Audio Class 2 output to an external DAC. The app always labels whichever path is actively in use.",
  },
  {
    q: 'Is the AI processing optional?',
    a: 'Yes. Every AI feature is optional and disabled by default as part of Pro. When enabled on lossy material, the AI Enhancer reconstructs in-band amplitude and phase, which intentionally updates the signal state indicator to Enhanced rather than Bit-perfect. The badge never claims a bit-exact purity that DSP has modified.',
  },
  {
    q: 'What does the app send over the internet?',
    a: 'Only three optional items: crash reports (switchable), album artwork lookups from public sources (switchable), and the one-time neural model download when you choose to enable an AI feature. There are no analytics, no ads, no user accounts, and no telemetry. Your audio files and listening activity never leave your phone.',
  },
  {
    q: 'Which platforms and devices are supported?',
    a: 'Android 8.0 (API 26) and newer across all major device architectures (arm64-v8a, armeabi-v7a, and x86_64). Core playback, bit-perfect USB output, EQ, casting, and Sonic Scan library intelligence run on any supported phone. The AI Enhancer requires dedicated hardware neural acceleration, and the app probes your device at runtime before offering the feature.',
    link: { href: '#compatibility', text: 'See compatibility tiers' },
  },
  {
    q: 'What audio effects and DSP processing are available?',
    a: 'The engine includes a 32-band parametric EQ with seven filter types, binaural headphone crossfeed (Meier & Bauer algorithms), per-channel balance and 180° polarity inversion, ReplayGain 2.0 (EBU R128) loudness normalization, and a transparent true-peak limiter. All DSP processes in 64-bit float with zero latency, and can be instantly bypassed for bit-perfect output.',
  },
  {
    q: 'What does Pro cost?',
    a: '$2 per month, $9 for six months, or $12 per year (equal to $1 per month). All purchases are handled securely through Google Play billing and can be cancelled anytime in your Google Play subscriptions. The core player, bit-perfect USB output, parametric EQ, casting, and DSP effects are free forever.',
  },
  {
    q: 'Do AI features work offline?',
    a: 'Yes. Neural models download once when you first enable a feature. After that, all processing (AI Enhancer, Sonic Scan, and Similar Tracks) executes entirely on-device with zero internet connection required.',
  },
];
