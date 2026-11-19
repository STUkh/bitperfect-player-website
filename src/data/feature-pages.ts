/**
 * Page composition for the six feature routes.
 * Sourced from src/content/features/ with full backwards compatibility.
 */
import { featureRoutes } from "./navigation";
import eqJson from "../content/features/eq.json";
import libraryJson from "../content/features/library.json";
import castingJson from "../content/features/casting.json";
import dspJson from "../content/features/dsp.json";
import usbDacJson from "../content/features/usb-dac.json";
import aiEnhancerJson from "../content/features/ai-enhancer.json";

export interface SummaryRow {
  label: string;
  value: string;
}

export interface BeatStat {
  label: string;
  value: string;
}

export interface BeatChip {
  label: string;
  /** The one chip the beat is about. Rendered in gold; the rest stay neutral. */
  active?: boolean;
}

export interface Beat {
  /** Monospace, neutral, never gold. */
  eyebrow: string;
  title: string;
  body: string;
  /** At most one supporting element per beat. */
  chips?: BeatChip[];
  stats?: BeatStat[];
  note?: string;
  /** usb-dac only: the five real runtime states, each in its own colour. */
  signalStates?: boolean;
}

export interface FeaturePage {
  lede: string;
  /** Four rows, hairline separated, in the header's right hand column. */
  summary: SummaryRow[];
  /** The rail's screen swaps once per beat. */
  beats: Beat[];
  /** The label in the device screen's title row. */
  screenTitle: string;
  cta: { title: string; body: string };
  screens?: string[];
  blocks?: any[];
}

interface FeaturePageJsonData {
  lede: string;
  summary: SummaryRow[];
  beats: any[];
  screenTitle: string;
  cta: { title: string; body: string };
  screens?: string[];
  blocks?: any[];
}

function extractFeaturePage(data: FeaturePageJsonData): FeaturePage {
  return {
    lede: data.lede,
    summary: data.summary,
    beats: data.beats as Beat[],
    screenTitle: data.screenTitle,
    cta: data.cta,
    screens: data.screens,
    blocks: data.blocks,
  };
}

export const featurePages: Record<string, FeaturePage> = {
  eq: extractFeaturePage(eqJson),
  library: extractFeaturePage(libraryJson),
  casting: extractFeaturePage(castingJson),
  dsp: extractFeaturePage(dspJson),
  "usb-dac": extractFeaturePage(usbDacJson),
  "ai-enhancer": extractFeaturePage(aiEnhancerJson),
};

/** The running order, read off the canonical route table so it cannot fork. */
export const indexOrder = featureRoutes.map((r) => r.slug);

export function getLocalizedFeaturePage(slug: string, _lang?: string) {
  return featurePages[slug];
}
