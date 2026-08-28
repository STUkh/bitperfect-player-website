export const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Showcase', href: '/#showcase' },
  { label: 'AI', href: '/#ai' },
  { label: 'Privacy', href: '/#privacy' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
] as const;

export const footerLinks = {
  features: {
    title: 'Features',
    links: [
      { label: '32-Band EQ', href: '/features/eq' },
      { label: 'Lossless Library', href: '/features/library' },
      { label: 'Network Casting', href: '/features/casting' },
      { label: 'Studio DSP', href: '/features/dsp' },
      { label: 'All Features', href: '/features' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Contact Support', href: 'mailto:support@bit-perfect.com' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.bitperfect.player' },
    ],
  },
} as const;
