import { ui, defaultLang } from "./ui";

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];

/**
 * Extracts the language from a URL pathname.
 * Handles both root deployments and base-path deployments.
 */
export function getLangFromUrl(url: URL): keyof typeof ui {
  const basePath = (import.meta.env?.BASE_URL ?? "").replace(/^\/|\/$/g, "");
  const segments = url.pathname.split("/").filter(Boolean);
  const langCandidate =
    basePath && segments[0] === basePath ? segments[1] : segments[0];

  if (langCandidate && langCandidate in ui) {
    return langCandidate as keyof typeof ui;
  }
  return defaultLang;
}

/**
 * Helper to get a translation function for a specific language.
 * Supports string parameter replacement via `{paramKey}` placeholders.
 * Falls back to defaultLang if a key is missing in the chosen language.
 *
 * @example
 * const t = useTranslations(Astro.currentLocale);
 * const text = t('hero.trial', { days: 14, price: 19.95 });
 */
export function useTranslations(lang?: string) {
  const currentLang = (
    lang && lang in ui ? lang : defaultLang
  ) as keyof typeof ui;

  return function t(
    key: UIKey,
    params?: Record<string, string | number>,
  ): string {
    const dict = ui[currentLang] as Record<string, string>;
    const fallbackDict = ui[defaultLang] as Record<string, string>;
    let text: string = dict[key] ?? fallbackDict[key] ?? key;

    if (params) {
      for (const [paramKey, value] of Object.entries(params)) {
        text = text.replaceAll(`{${paramKey}}`, String(value));
      }
    }

    return text;
  };
}

/**
 * Helper to build localized URLs respecting the default locale routing rule.
 * Useful for future multi-language navigation.
 */
export function useTranslatedPath(lang?: string) {
  const currentLang = (
    lang && lang in ui ? lang : defaultLang
  ) as keyof typeof ui;

  return function translatePath(
    path: string,
    targetLang: string = currentLang,
  ): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return targetLang === defaultLang
      ? normalizedPath
      : `/${targetLang}${normalizedPath}`;
  };
}
