// The site's own React components, as the site renders them (src/components).
// Nothing here is a port: a change on the site reaches Claude Design on the next
// sync. Only Surface (the page ground, for previews) is design-only.
// Not exported: DevOnlyBadge (renders nothing outside the dev server) and
// MobileMenu (the panel Header renders and its burger opens).
export { default as Button, type ButtonProps } from '@site/components/common/Button';
export { default as ClosingBanner, type ClosingBannerProps } from '@site/components/common/ClosingBanner';
export { default as Container, type ContainerProps } from '@site/components/common/Container';
export { default as Footer, type FooterProps } from '@site/components/common/Footer';
export { default as Header, type HeaderProps } from '@site/components/common/Header';
export { default as ImageSlot, type ImageSlotProps } from '@site/components/common/ImageSlot';
export { default as Logo, type LogoProps } from '@site/components/common/Logo';
export { default as PageHeader, type PageHeaderProps } from '@site/components/common/PageHeader';
export { default as StoreBadges, type StoreBadgesProps } from '@site/components/common/StoreBadges';
export { default as FeatureArt, type FeatureArtProps } from '@site/components/feature/FeatureArt';
export { default as FeatureMark, type FeatureMarkProps } from '@site/components/feature/FeatureMark';
export { default as FeatureScreens, type FeatureScreensProps } from '@site/components/feature/FeatureScreens';
export { default as PhoneFrame, type PhoneFrameProps } from '@site/components/feature/PhoneFrame';
export { default as PhoneScreen, type PhoneScreenProps } from '@site/components/feature/PhoneScreen';
export { default as PhoneTrio, type PhoneTrioProps } from '@site/components/feature/PhoneTrio';
export { default as TechnicalCatalog, type TechnicalCatalogProps } from '@site/components/feature/TechnicalCatalog';
export { default as CTASection } from '@site/components/landing/CTASection';
export { default as FeaturesTeaser } from '@site/components/landing/FeaturesTeaser';
export { default as HeroSection } from '@site/components/landing/HeroSection';
export { default as PhoneShowcase } from '@site/components/landing/PhoneShowcase';
export { default as PricingSection } from '@site/components/landing/PricingSection';
export { default as PrivacyBand } from '@site/components/landing/PrivacyBand';
export { default as StatementBand } from '@site/components/landing/StatementBand';
export { default as LegalDocument, type LegalDocumentProps } from '@site/components/legal/LegalDocument';
export { default as HoldingPage, type HoldingPageProps } from '@site/components/HoldingPage';
export { default as Icon, type IconProps } from '@site/components/Icon';
export { default as PhoneNowPlaying, type PhoneNowPlayingProps } from '@site/components/PhoneNowPlaying';
export { Surface, type SurfaceProps } from './Surface';
