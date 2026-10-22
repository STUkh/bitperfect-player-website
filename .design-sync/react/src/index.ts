// The site's own React components, as the site renders them (src/components).
// Nothing here is a port: a change on the site reaches Claude Design on the next
// sync. Only Surface (the page ground, for previews) is design-only.
// Not exported:
// MobileMenu (the panel Header renders and its burger opens).
// PhoneFrame/PhoneChassis (Phone's internals). PhoneScreen and PhoneNowPlaying
// are gone: every device is <Phone screen=... /> (2026-10-22).
export { default as BackLink, type BackLinkProps } from '@site/components/common/BackLink';
export { default as Band, type BandProps } from '@site/components/common/Band';
export { type Tone } from '@site/components/common/bands';
export { default as Button, type ButtonProps } from '@site/components/primitives/Button';
export { default as Card, type CardProps } from '@site/components/primitives/Card';
export { default as CloseBand, type CloseBandProps } from '@site/components/common/CloseBand';
export { default as ClosingBanner, type ClosingBannerProps } from '@site/components/common/ClosingBanner';
export { default as Container, type ContainerProps } from '@site/components/primitives/Container';
export { default as CrossLinkRow, type CrossLinkRowProps } from '@site/components/common/CrossLinkRow';
export { default as Footer, type FooterProps } from '@site/components/common/Footer';
export { default as Header, type HeaderProps } from '@site/components/common/Header';
export { default as ImageSlot, type ImageSlotProps } from '@site/components/primitives/ImageSlot';
export { default as Logo, type LogoProps } from '@site/components/primitives/Logo';
export { default as MediaSplit, type MediaSplitProps } from '@site/components/common/MediaSplit';
export { default as PageHeader, type PageHeaderProps } from '@site/components/common/PageHeader';
export { default as PlayCta, type PlayCtaProps } from '@site/components/primitives/PlayCta';
export { default as PlayStoreMark, type PlayStoreMarkProps } from '@site/components/primitives/PlayStoreMark';
export { default as RuleList, type RuleListProps } from '@site/components/common/RuleList';
export { default as SectionHeading, type SectionHeadingProps } from '@site/components/common/SectionHeading';
export { default as SpecList, type SpecListProps } from '@site/components/common/SpecList';
export { default as TextureStrip, type TextureStripProps } from '@site/components/primitives/TextureStrip';
export { default as StoreBadges, type StoreBadgesProps } from '@site/components/primitives/StoreBadges';
export { default as FeatureArt, type FeatureArtProps } from '@site/components/primitives/FeatureArt';
export { default as FeatureLinkCard, type FeatureLinkCardProps } from '@site/components/feature/FeatureLinkCard';
export { default as FeatureMark, type FeatureMarkProps } from '@site/components/primitives/FeatureMark';
export { default as FeatureScreens, type FeatureScreensProps } from '@site/components/feature/FeatureScreens';
export { default as PagerLink, type PagerLinkProps } from '@site/components/feature/PagerLink';
export { default as PagerPair, type PagerPairProps } from '@site/components/feature/PagerPair';
export { default as Phone, type PhoneProps } from '@site/components/feature/Phone';
export { default as PhoneTrio, type PhoneTrioProps } from '@site/components/feature/PhoneTrio';
export { default as TechIndex, type TechIndexProps } from '@site/components/feature/TechIndex';
export { default as CapabilityBand, type CapabilityBandProps } from '@site/components/feature/CapabilityBand';
export { default as CTASection } from '@site/components/landing/CTASection';
export { default as FeaturesTeaser } from '@site/components/landing/FeaturesTeaser';
export { default as HomeOpening } from '@site/components/landing/HomeOpening';
export { default as PricingSection } from '@site/components/landing/PricingSection';
export { default as PrivacyBand } from '@site/components/landing/PrivacyBand';
export { default as StatementBand } from '@site/components/landing/StatementBand';
export { default as LegalDocument, type LegalDocumentProps } from '@site/components/legal/LegalDocument';
export { default as HoldingPage, type HoldingPageProps } from '@site/components/HoldingPage';
export { default as Icon, type IconProps } from '@site/components/primitives/Icon';
export { Surface, type SurfaceProps } from './Surface';
