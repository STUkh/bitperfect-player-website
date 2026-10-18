/**
 * Configuration registry for development-only routes.
 *
 * Pages registered here with `devOnly: true` (or listed in DEV_ONLY_ROUTES):
 * - In development (`import.meta.env.DEV`): Accessible, displaying a discrete,
 *   floating top badge ("DEV ONLY — Will not be published in production build").
 * - In production builds (`npm run build`): Middleware intercepts with 404 status,
 *   preventing accidental public release.
 */

export const DEV_ONLY_ROUTES: string[] = [
  // Add routes here (e.g. '/styleguide', '/prototype')
];

/**
 * Checks whether a given pathname matches any registered dev-only route.
 */
export function isDevOnlyRoute(pathname: string): boolean {
  if (!DEV_ONLY_ROUTES.length) return false;
  const normalized = pathname.replace(/\/$/, "") || "/";
  return DEV_ONLY_ROUTES.some((route) => {
    const normRoute = route.replace(/\/$/, "") || "/";
    return normalized === normRoute || normalized.startsWith(normRoute + "/");
  });
}
