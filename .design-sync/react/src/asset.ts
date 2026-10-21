/**
 * Resolves a site image path ("screens/now-playing.webp") to a loadable URL.
 *
 * Images ship as files under assets/ beside the design system's stylesheet,
 * and the stylesheet carries one probe rule per image
 * (`.bpa-screens-now-playing-webp { background-image: url("./assets/...") }`).
 * Reading the probe's computed background-image hands back the URL the browser
 * already resolved against wherever the stylesheet was really served from, so
 * this works in a preview card, a bound design copy or a local file alike.
 * Falls back to the site-relative path when the stylesheet isn't loaded.
 */
const cache = new Map<string, string>();
let probe: HTMLElement | null = null;

export function asset(path: string): string {
  const clean = path.replace(/^\/+/, '');
  const hit = cache.get(clean);
  if (hit) return hit;
  let url = `/${clean}`;
  if (typeof document !== 'undefined' && document.body) {
    if (!probe) {
      probe = document.createElement('i');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
      document.body.appendChild(probe);
    }
    probe.className = `bpa-${clean.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const m = getComputedStyle(probe).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    if (m) {
      url = m[1];
      cache.set(clean, url);
    }
  }
  return url;
}
