import { isDevOnlyRoute } from '../../config/dev-pages';

export interface DevOnlyBadgeProps {
  /** The current page's path; a page registered as dev-only shows the badge. */
  pathname?: string;
  force?: boolean;
}

/**
 * Discrete, elegant floating top badge for dev-only pages.
 * Displays only when running in development mode (`import.meta.env.DEV`)
 * and the page is registered as devOnly or forces the badge.
 */
export default function DevOnlyBadge({ pathname = '/', force = false }: DevOnlyBadgeProps) {
  const isDev = import.meta.env.DEV;
  const isVisible = isDev && (force || isDevOnlyRoute(pathname));

  if (!isVisible) return null;

  return (
    <aside
      id="dev-only-badge"
      role="status"
      aria-label="Development page notice"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto flex items-center gap-2 rounded-full border border-amber-500/40 bg-[#161616]/92 px-3.5 py-1 text-xs font-medium text-amber-300 shadow-[0_4px_20px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors hover:border-amber-400 hover:text-amber-200"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />{' '}
      <span className="font-semibold tracking-wider uppercase text-device-label text-amber-300">DEV ONLY</span>{' '}
      <span className="text-white/30 text-device-label" aria-hidden="true">
        ·
      </span>{' '}
      <span className="text-white/70 text-device-label font-normal">Will not be published in production build</span>
    </aside>
  );
}
