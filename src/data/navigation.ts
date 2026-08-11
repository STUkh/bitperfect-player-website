export const navLinks = [
  { label: 'Engine', href: '/#engine' },
  { label: 'AI', href: '/#ai' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Privacy', href: '/#privacy' },
  { label: 'FAQ', href: '/#faq' },
] as const;

export const footerLinks = {
  support: {
    title: 'Support',
    links: [
      { label: 'Contact Support', href: 'mailto:support@bit-perfect.com' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.bitperfect.player' },
    ],
  },
} as const;
