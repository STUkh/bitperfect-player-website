// The site's own React components, as the site renders them (src/components).
// Nothing here is a port: a change on the site reaches Claude Design on the next
// sync. Only Surface (the page ground, for previews) is design-only.
// Not exported:
// MobileMenu (the panel Header renders and its burger opens).
export { default as Button, type ButtonProps } from '@site/components/common/Button';
export { default as Card, type CardProps } from '@site/components/common/Card';
export { default as ClosingBanner, type ClosingBannerProps } from '@site/components/common/ClosingBanner';
export { default as Container, type ContainerProps } from '@site/components/common/Container';
export { default as Footer, type FooterProps } from '@site/components/common/Footer';
export { default as Header, type HeaderProps } from '@site/components/common/Header';
export { default as ImageSlot, type ImageSlotProps } from '@site/components/common/ImageSlot';
export { default as Logo, type LogoProps } from '@site/components/common/Logo';
export { default as PageHeader, type PageHeaderProps } from '@site/components/common/PageHeader';
export { default as PlayCta, type PlayCtaProps } from '@site/components/common/PlayCta';
export { default as PlayStoreMark, type PlayStoreMarkProps } from '@site/components/common/PlayStoreMark';
export { default as TextureStrip, type TextureStripProps } from '@site/components/common/TextureStrip';
export { default as StoreBadges, type StoreBadgesProps } from '@site/components/common/StoreBadges';
export { default as FeatureArt, type FeatureArtProps } from '@site/components/feature/FeatureArt';
export { default as FeatureMark, type FeatureMarkProps } from '@site/components/feature/FeatureMark';
export { default as FeatureScreens, type FeatureScreensProps } from '@site/components/feature/FeatureScreens';
export { default as PagerLink, type PagerLinkProps } from '@site/components/feature/PagerLink';
export { default as PhoneFrame, type PhoneFrameProps } from '@site/components/feature/PhoneFrame';
export { default as PhoneScreen, type PhoneScreenProps } from '@site/components/feature/PhoneScreen';
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
export { default as Icon, type IconProps } from '@site/components/Icon';
export { default as PhoneNowPlaying, type PhoneNowPlayingProps } from '@site/components/PhoneNowPlaying';
export { Surface, type SurfaceProps } from './Surface';
