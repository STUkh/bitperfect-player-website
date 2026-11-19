import type { ScreenName } from "./screens";
import categoriesData from "../content/settings/technical-categories.json";

export type FeatureCategory =
  | "engine"
  | "dsp"
  | "hardware"
  | "ai"
  | "streaming"
  | "media";

export interface CategoryInfo {
  id: FeatureCategory;
  name: string;
  description: string;
}

export const technicalCategories: CategoryInfo[] = categoriesData as CategoryInfo[];

export interface TechnicalFeature {
  number: number;
  id: string;
  title: string;
  category: FeatureCategory;
  categoryLabel: string;
  summary: string;
  /** The meta description, when `summary` (the visible lede) is too short for one. */
  metaDescription?: string;
  /** The <title>, before " | Bitperfect Player", when `title` makes it too long. */
  metaTitle?: string;
  description: string;
  audiophileBenefit: string;
  specs: { label: string; value: string }[];
  badge?: string;
  sdkUrl?: string;
  /**
   * The app captures its page shows, keys of `src/data/screens.ts`, in band
   * order: the opening band, "How it works", "What you hear". The third falls
   * back to the first when absent.
   */
  screens?: [opening: ScreenName, howItWorks: ScreenName, whatYouHear?: ScreenName];
}

const catalogFiles = import.meta.glob<{ default: TechnicalFeature }>('../content/catalog/*.json', { eager: true });

export const technicalFeatures: TechnicalFeature[] = Object.values(catalogFiles)
  .map((mod) => mod.default)
  .sort((a, b) => a.number - b.number);
