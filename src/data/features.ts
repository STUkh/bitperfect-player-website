/**
 * Features Data Module
 * Sourced from src/content/features/ with full backwards compatibility.
 */
import type { AccentColorKey } from "./colors";
import eqJson from "../content/features/eq.json";
import libraryJson from "../content/features/library.json";
import castingJson from "../content/features/casting.json";
import dspJson from "../content/features/dsp.json";
import usbDacJson from "../content/features/usb-dac.json";
import aiEnhancerJson from "../content/features/ai-enhancer.json";

export interface FeatureSpec {
  label: string;
  value: string;
}

export interface FeatureBenefit {
  title: string;
  desc: string;
  icon?: string;
}

export interface Feature {
  id: "eq" | "library" | "casting" | "dsp" | "usb-dac" | "ai-enhancer";
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  /**
   * @deprecated The design no longer distinguishes feature routes by hue (DESIGN.md,
   * "One accent, full stop"): routes are told apart by their mark
   * and their content. Every feature therefore resolves to the one brand accent.
   */
  accent: AccentColorKey;
  icon: string;
  description: string;
  overview: string;
  facts: string[];
  specs: FeatureSpec[];
  benefits: FeatureBenefit[];
}

interface FeatureJsonData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  accent: string;
  icon: string;
  description: string;
  overview: string;
  facts: string[];
  specs: FeatureSpec[];
  benefits: FeatureBenefit[];
}

function extractFeature(data: FeatureJsonData): Feature {
  return {
    id: data.id as Feature["id"],
    slug: data.slug,
    title: data.title,
    tagline: data.tagline,
    badge: data.badge,
    accent: data.accent as AccentColorKey,
    icon: data.icon,
    description: data.description,
    overview: data.overview,
    facts: data.facts,
    specs: data.specs,
    benefits: data.benefits,
  };
}

export const features: Feature[] = [
  extractFeature(eqJson),
  extractFeature(libraryJson),
  extractFeature(castingJson),
  extractFeature(dspJson),
  extractFeature(usbDacJson),
  extractFeature(aiEnhancerJson),
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function getLocalizedFeatureBySlug(
  slug: string,
  _lang?: string
): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function getAllFeatures(): Feature[] {
  return features;
}

export function getAdjacentFeatures(slug: string): {
  prev: Feature;
  next: Feature;
} {
  const index = features.findIndex((f) => f.slug === slug);
  const prevIndex = (index - 1 + features.length) % features.length;
  const nextIndex = (index + 1) % features.length;
  return {
    prev: features[prevIndex],
    next: features[nextIndex],
  };
}
