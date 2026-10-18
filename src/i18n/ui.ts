import { common } from "./locales/en/common";
import { landing } from "./locales/en/landing";
import { legal } from "./locales/en/legal";
import { features } from "./locales/en/features";

export const languages = {
  en: "English",
} as const;

export const defaultLang = "en" as const;

export const ui = {
  en: {
    ...common,
    ...landing,
    ...legal,
    ...features,
  },
} as const;
