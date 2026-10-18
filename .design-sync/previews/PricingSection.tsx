import { PricingSection } from '@bitperfect/website-ds';

export function Default() {
  return <PricingSection />;
}

export function SingleFeaturedPlan() {
  return (
    <PricingSection
      heading="One plan, every feature."
      subheading="Lock in the Founder rate before May 31, 2027 and keep it on every renewal."
      plans={[
        {
          id: 'founder',
          featured: true,
          label: 'Founder offer',
          chip: '14 days free',
          title: 'Founder Annual',
          price: 19.95,
          perYear: 'year',
          perMonth: '$1.66 / mo',
          points: [
            'Renews at $19.95/year for as long as you stay subscribed',
            'Available for sign-ups through May 31, 2027',
            'Full access to every feature across up to 5 devices',
          ],
          cta: 'Claim Founder Offer',
          note: 'Cancel during the trial and nothing is charged.',
        },
      ]}
    />
  );
}

export function NoTrialChip() {
  return (
    <PricingSection
      plans={[
        {
          id: 'founder',
          featured: true,
          label: 'Founder offer',
          chip: null,
          title: 'Founder Annual',
          price: 19.95,
          perYear: 'year',
          perMonth: '$1.66 / mo',
          points: ['Renews at $19.95/year for as long as you stay subscribed', 'Full access to every feature across up to 5 devices'],
          cta: 'Claim Founder Offer',
          note: 'Renews at $19.95/year until cancelled in Google Play.',
        },
        {
          id: 'standard',
          featured: false,
          label: 'Standard plan',
          chip: 'From June 1, 2027',
          title: 'Standard Annual',
          price: 29.95,
          perYear: 'year',
          perMonth: '$2.50 / mo',
          points: ['Renews at $29.95/year', 'Full access to every feature across up to 5 devices'],
          cta: 'View on Google Play',
          note: 'Cancel anytime in Google Play Subscriptions.',
        },
      ]}
    />
  );
}
