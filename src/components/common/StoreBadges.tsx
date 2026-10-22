import { site } from "../../data/site";
import Button from "./Button";
import PlayStoreMark from "./PlayStoreMark";
import { APPLE_PATH } from "../glyphs";

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
          <span className="text-sm font-medium">Download APK</span>
        </Button>
      )}
    </div>
  );
}
