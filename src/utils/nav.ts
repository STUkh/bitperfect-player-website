/**
 * The single choke point for every internal URL in the site chrome.
 *
 * astro.config.mjs sets `base: '/bitperfect-player-website'` (GitHub Pages
 * project site). Do NOT assume `import.meta.env.BASE_URL` ends in a slash:
 * with `trailingSlash: 'ignore'` and a base written without one, Astro yields
 * `/bitperfect-player-website` bare, so naive `${BASE}${path}` concatenation
 * produced `/bitperfect-player-websitebrand/logo.svg` and 404'd the logo,
 * fonts and favicons. Both ends are normalised here instead, so every caller
 * gets exactly one separating slash regardless of how base is configured.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

/** Prefix an internal path ("privacy", "/privacy", "fonts/x.woff2") with the
 *  configured base. Safe with or without a leading slash on `path`.
 *
 *  A page path also gets its trailing slash ("privacy" → "/privacy/",
 *  "features#x" → "/features/#x"): pages build to `privacy/index.html`, and
 *  GitHub Pages answers `/privacy` with a 301 to `/privacy/`, so a bare link
 *  costs every visitor and crawler a redirect hop and disagrees with the
 *  canonical. Files (anything with an extension) and URL patterns ("*") are
 *  left as written. `npm run seo` flags any link that still lacks the slash. */
export function withBase(path: string): string {
  const clean = path.replace(/^\/+/, "");
  const [, page, rest] = clean.match(/^([^?#]*)(.*)$/)!;
  const slashed =
    page &&
    !page.endsWith("/") &&
    !page.includes("*") &&
    !/\.[a-z0-9]+$/i.test(page)
      ? `${page}/`
      : page;
  return `${BASE}/${slashed}${rest}`;
}

/** True when `pathname` (Astro.url.pathname: already includes the base path
 *  once deployed) is the site's index route. */
function isIndexPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const baseNormalized = BASE.replace(/\/+$/, "") || "/";
  return normalized === baseNormalized;
}

/**
 * Resolve a nav/footer href against the base path and the current route:
 *  - external (http(s)/mailto/tel) → unchanged
 *  - in-page anchor ("#engine" or "/#engine") → a same-page hash on the
 *    index route, or a base-prefixed hash link back to the index from
 *    anywhere else (those sections only exist on "/" : a bare "#engine" is
 *    dead on "/privacy")
 *  - internal page path ("/privacy") → base-prefixed page path
 */
export function resolveHref(href: string, pathname: string): string {
  if (
    /^([a-z]+:)?\/\//i.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const hashMatch = href.match(/^\/?#(.+)$/);
  if (hashMatch) {
    const hash = `#${hashMatch[1]}`;
    return isIndexPath(pathname) ? hash : withBase(hash);
  }

  return withBase(href);
}

/** Active state for a page-level nav link (aria-current). Hash links are
 *  never "active" : they're in-page anchors on the index, not distinct
 *  routes. */
export function isActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;

  const base = BASE.replace(/\/+$/, "");
  const currentPath =
    (pathname.startsWith(base)
      ? pathname.slice(base.length)
      : pathname
    ).replace(/\/+$/, "") || "/";
  const linkPath = `/${href.replace(/^\/+|\/+$/g, "")}`;

  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
}
