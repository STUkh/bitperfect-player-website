import { site } from "../../data/site";
import Button from "./Button";
import PlayStoreMark from "./PlayStoreMark";

export interface StoreBadgesProps {
  /**
   * `icon` is Play only, 44x44, no label: the narrow header, where a labelled
   * badge does not fit beside the wordmark and the burger. Every other size
   * renders whichever stores have a URL.
   */
  size?: "icon" | "sm" | "md" | "lg";
  /** Extra classes for the wrapper row (e.g. `flex-row flex-wrap`, or `sm:hidden` to hide it). */
  className?: string;
}

/** currentColor path, 24-unit grid. */
const APPLE_PATH =
  "M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.207-2.98.804-.94 2.142-1.64 3.157-1.68.03.13.14.29.14.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.335-1.36-3.348-2.7-1.293-1.72-2.353-4.42-2.353-6.98 0-4.28 2.845-6.54 5.685-6.54 1.517 0 2.784.94 3.685.94.875 0 2.303-1.03 3.994-1.03.673 0 3.079.06 4.61 2.36-.13.08-2.716 1.61-2.716 4.65 0 3.61 3.207 4.9 3.207 4.94z";

/* A store badge IS a secondary `Button`: the same chassis, radius, lacquer and hover.
   It is only taller and carries two lines of text, so the sizes below change padding,
   gap and type and nothing else. */
const SIZES = {
  sm: {
    pad: "gap-2 px-4 py-1.5",
    mark: 18,
    top: "text-[11px]",
    bottom: "text-xs",
  },
  md: {
    pad: "gap-2.5 px-5 py-2.5",
    mark: 24,
    top: "text-[11px]",
    bottom: "text-sm",
  },
  lg: {
    pad: "min-w-[220px] gap-3 px-6 py-3.5",
    mark: 32,
    top: "text-xs",
    bottom: "text-lg",
  },
} as const;

interface BadgeProps {
  href: string;
  size: keyof typeof SIZES;
  top: string;
  bottom: string;
  children: React.ReactNode;
}

function Badge({ href, size, top, bottom, children }: BadgeProps) {
  const s = SIZES[size];
  return (
    <Button
      href={href}
      rel="noopener noreferrer"
      variant="secondary"
      size="sm"
      className={`${s.pad} text-left`}
    >
      {children}
      <span className="flex flex-col text-left">
        <span
          className={`${s.top} leading-none font-medium text-text-secondary`}
        >
          {top}
        </span>
        <span
          className={`${s.bottom} mt-0.5 leading-tight font-semibold text-text-primary whitespace-nowrap`}
        >
          {bottom}
        </span>
      </span>
    </Button>
  );
}

/**
 * The store badges: the Google Play badge, plus the App Store and direct-APK
 * ones when the site data has a URL for them. Each badge is a secondary `Button`
 * (graphite lacquer, never gold) with the store mark and two lines of text. Use
 * it in the header and footer; for a prominent install button use `PlayCta`.
 * Sizes: `sm` (header), `md` (default), `lg` (220px minimum), `icon` (Play only, 44x44).
 */
export default function StoreBadges({
  size = "md",
  className,
}: StoreBadgesProps) {
  if (size === "icon") {
    return (
      <div className={className}>
        <Button
          href={site.playUrl}
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
          aria-label="Get it on Google Play"
          className="h-11 w-11 shrink-0 p-0"
        >
          <PlayStoreMark size={20} className="text-text-primary" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`flex w-fit flex-col gap-3 sm:flex-row sm:gap-4 ${className ?? ""}`}
    >
      <Badge
        href={site.playUrl}
        size={size}
        top="Get it on"
        bottom="Google Play"
      >
        <PlayStoreMark size={SIZES[size].mark} className="text-text-primary" />
      </Badge>
      {site.appStoreUrl && (
        <Badge
          href={site.appStoreUrl}
          size={size}
          top="Download on the"
          bottom="App Store"
        >
          <svg
            className="text-text-primary"
            width={SIZES[size].mark}
            height={SIZES[size].mark}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d={APPLE_PATH} />
          </svg>
        </Badge>
      )}
      {site.apkUrl && (
        <Button
          href={site.apkUrl}
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
          className={SIZES[size].pad}
        >
          <span className="text-sm font-medium">Direct APK</span>
        </Button>
      )}
    </div>
  );
}
