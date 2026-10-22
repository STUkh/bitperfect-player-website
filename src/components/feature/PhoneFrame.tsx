import { useId, type ReactNode } from "react";
import { clsx as cx } from "clsx";
import PhoneScreen from "./PhoneScreen";
import type { ClassProps } from "../class-props";
import "./PhoneFrame.css";

export interface PhoneFrameProps extends ClassProps {
  /** Take the parent's width instead of the frame's own two steps (296px, 344px from lg). */
  fill?: boolean;
  /** Prefix for the SVG gradient/mask ids. Defaults to a unique one per frame, so frames on one page never share ids. */
  idPrefix?: string;
  /** Titanium chassis and button colour. Default the site's warm grey `#C8BEB5`; leave it unless a band needs another titanium. */
  phoneColor?: string;
  /** A screen key from `src/data/screens.ts` to show in the cutout, used when no children are passed. */
  screen?: string;
  /** What sits in the screen cutout, usually a PhoneScreen. */
  children?: ReactNode;
}

/**
 * The site's one device: an SVG Galaxy S25 Ultra chassis (titanium rails, black
 * bezel, punch-hole camera, side buttons, cast shadow) over a screen cutout. Use
 * it for every phone on the site, beside feature copy or in a lineup. Put a
 * `PhoneScreen` inside (or pass `screen`); with neither it renders an empty
 * dark screen. Width is 296px, 344px from `lg`, unless `fill` is set.
 */
export default function PhoneFrame({
  fill = false,
  className,
  idPrefix,
  phoneColor = "#C8BEB5",
  screen,
  children,
}: PhoneFrameProps) {
  const uid = useId().replace(/:/g, "");
  const prefix = idPrefix ?? `s25u-${uid}`;
  return (
    <div
      className={cx(
        "phone-frame-s25u relative shrink-0",
        fill ? "w-full" : "w-[296px] lg:w-[344px]",
        className,
      )}
      style={{ aspectRatio: "395.5 / 776" }}
    >
      {/* Screen Cutout Container (coordinates exactly matching S24/S25 Ultra: x=12, y=12, w=368, h=752 on 395.5x776) */}
      <div
        className="phone-screen-cutout absolute overflow-hidden rounded-[2px] bg-phone-screen"
        style={{
          left: "3.0341%",
          top: "1.5464%",
          width: "93.0468%",
          height: "96.9072%",
        }}
      >
        {children ?? (screen ? <PhoneScreen name={screen} /> : null)}
      </div>

      {/* S24/S25 Ultra Hardware Chassis SVG Overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 395.5 776"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Programmatic screen clip path for screenshots */}
          <clipPath id={`${prefix}-screen-clip`} clipPathUnits="userSpaceOnUse">
            <rect x="12" y="12" width="368" height="752" rx="1.5" />
          </clipPath>

          {/* Programmatic screen mask with Infinity-O camera hole cutout */}
          <mask id={`${prefix}-screen-mask`} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="395.5" height="776" fill="#000000" />
            <rect
              x="12"
              y="12"
              width="368"
              height="752"
              rx="1.5"
              fill="#ffffff"
            />
            <circle cx="196.5" cy="29.5" r="8.6" fill="#000000" />
          </mask>

          {/* Top Rail: Keylight highlight -> Satin core -> Inner chamfer -> Crease */}
          <linearGradient
            id={`${prefix}-rail-top`}
            x1="0"
            y1="0"
            x2="0"
            y2="6"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00" stopColor="#ffffff" stopOpacity="0.26" />
            <stop offset="0.22" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="0.60" stopColor="#000000" stopOpacity="0.10" />
            <stop offset="0.88" stopColor="#000000" stopOpacity="0.16" />
            <stop offset="1.00" stopColor="#000000" stopOpacity="0.30" />
          </linearGradient>

          {/* Left Rail: Directional keylight -> Satin core -> Inner chamfer -> Crease */}
          <linearGradient
            id={`${prefix}-rail-left`}
            x1="0"
            y1="0"
            x2="6"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00" stopColor="#ffffff" stopOpacity="0.26" />
            <stop offset="0.22" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="0.60" stopColor="#000000" stopOpacity="0.10" />
            <stop offset="0.88" stopColor="#000000" stopOpacity="0.16" />
            <stop offset="1.00" stopColor="#000000" stopOpacity="0.30" />
          </linearGradient>

          {/* Bottom Rail: Inner crease -> Satin core -> Ambient ground rim */}
          <linearGradient
            id={`${prefix}-rail-bottom`}
            x1="0"
            y1="770"
            x2="0"
            y2="776"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00" stopColor="#000000" stopOpacity="0.30" />
            <stop offset="0.12" stopColor="#000000" stopOpacity="0.16" />
            <stop offset="0.40" stopColor="#000000" stopOpacity="0.10" />
            <stop offset="0.78" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="1.00" stopColor="#ffffff" stopOpacity="0.20" />
          </linearGradient>

          {/* Right Rail: Inner crease -> Satin core -> Ambient side rim */}
          <linearGradient
            id={`${prefix}-rail-right`}
            x1="386"
            y1="0"
            x2="392"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00" stopColor="#000000" stopOpacity="0.30" />
            <stop offset="0.12" stopColor="#000000" stopOpacity="0.16" />
            <stop offset="0.40" stopColor="#000000" stopOpacity="0.10" />
            <stop offset="0.78" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="1.00" stopColor="#ffffff" stopOpacity="0.20" />
          </linearGradient>

          {/* Continuous Outer CNC Chamfer Specular Rim (Authentic subtle glint) */}
          <linearGradient
            id={`${prefix}-outer-specular`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.28" />
          </linearGradient>

          {/* Continuous Inner CNC Chamfer Specular Rim */}
          <linearGradient
            id={`${prefix}-inner-specular`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.24" />
          </linearGradient>

          {/* Buttons Shading & Lighting Gradient */}
          <linearGradient
            id={`${prefix}-btn-lighting`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="15%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="75%" stopColor="#000000" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>

          {/* Front Camera Multi-Coated AR Reflection (Bottom-Right Flare) */}
          <radialGradient id={`${prefix}-lens-ar-br`} cx="64%" cy="64%" r="48%">
            <stop offset="0%" stopColor="#36417d" stopOpacity="0.88" />
            <stop offset="38%" stopColor="#242d58" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#121832" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#05070e" stopOpacity="0.0" />
          </radialGradient>

          {/* Front Camera Secondary AR Sheen (Top-Left Ambient) */}
          <radialGradient id={`${prefix}-lens-ar-tl`} cx="34%" cy="34%" r="42%">
            <stop offset="0%" stopColor="#2b3152" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#161b30" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#05070e" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* 1. PHYSICAL BUTTONS (RIGHT RAIL) */}
        <g id="buttons">
          {/* Volume Rocker: y=135 to 247, width=3.2, rx=1.6 */}
          <rect
            x="392"
            y="135"
            width="3.2"
            height="112"
            rx="1.6"
            fill={phoneColor}
          />
          <rect
            x="392"
            y="135"
            width="3.2"
            height="112"
            rx="1.6"
            fill={`url(#${prefix}-btn-lighting)`}
          />
          <line
            x1="395.0"
            y1="137"
            x2="395.0"
            y2="245"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="0.5"
          />
          <line
            x1="392"
            y1="135"
            x2="392"
            y2="247"
            stroke="rgba(0, 0, 0, 0.40)"
            strokeWidth="0.6"
          />

          {/* Power / Side Button: y=285 to 339, width=3.2, rx=1.6 */}
          <rect
            x="392"
            y="285"
            width="3.2"
            height="54"
            rx="1.6"
            fill={phoneColor}
          />
          <rect
            x="392"
            y="285"
            width="3.2"
            height="54"
            rx="1.6"
            fill={`url(#${prefix}-btn-lighting)`}
          />
          <line
            x1="395.0"
            y1="287"
            x2="395.0"
            y2="337"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="0.5"
          />
          <line
            x1="392"
            y1="285"
            x2="392"
            y2="339"
            stroke="rgba(0, 0, 0, 0.40)"
            strokeWidth="0.6"
          />
        </g>

        {/* 2. TITANIUM CHASSIS FRAME (BODY) */}
        <g id="chassis">
          {/* Base Color Layer (Hollow Rectangular Loop) */}
          <path
            d="M 3.5,0 L 388.5,0 A 3.5,3.5 0 0 1 392,3.5 L 392,772.5 A 3.5,3.5 0 0 1 388.5,776 L 3.5,776 A 3.5,3.5 0 0 1 0,772.5 L 0,3.5 A 3.5,3.5 0 0 1 3.5,0 Z
               M 8,6 L 384,6 A 2,2 0 0 1 386,8 L 386,768 A 2,2 0 0 1 384,770 L 8,770 A 2,2 0 0 1 6,768 L 6,8 A 2,2 0 0 1 8,6 Z"
            fill={phoneColor}
            fillRule="evenodd"
          />

          {/* Seamless 4-Sided Mitered Rail Lighting */}
          <path
            fill={`url(#${prefix}-rail-top)`}
            d="M 1.025,1.025 A 3.5,3.5 0 0 1 3.5,0 L 388.5,0 A 3.5,3.5 0 0 1 390.975,1.025 L 385,7 A 2,2 0 0 0 384,6 L 8,6 A 2,2 0 0 0 7,7 Z"
          />
          <path
            fill={`url(#${prefix}-rail-bottom)`}
            d="M 1.025,774.975 A 3.5,3.5 0 0 0 3.5,776 L 388.5,776 A 3.5,3.5 0 0 0 390.975,774.975 L 385,769 A 2,2 0 0 1 384,770 L 8,770 A 2,2 0 0 1 7,769 Z"
          />
          <path
            fill={`url(#${prefix}-rail-left)`}
            d="M 1.025,1.025 A 3.5,3.5 0 0 0 0,3.5 L 0,772.5 A 3.5,3.5 0 0 0 1.025,774.975 L 7,769 A 2,2 0 0 1 6,768 L 6,8 A 2,2 0 0 1 7,7 Z"
          />
          <path
            fill={`url(#${prefix}-rail-right)`}
            d="M 390.975,1.025 A 3.5,3.5 0 0 1 392,3.5 L 392,772.5 A 3.5,3.5 0 0 1 390.975,774.975 L 385,769 A 2,2 0 0 0 386,768 L 386,8 A 2,2 0 0 0 385,7 Z"
          />

          {/* Authentic Flush Antenna Band Breaks */}
          <rect
            x="0"
            y="62.8"
            width="6"
            height="0.9"
            fill="#000000"
            opacity="0.24"
          />
          <line
            x1="0"
            y1="63.7"
            x2="6"
            y2="63.7"
            stroke="rgba(255, 255, 255, 0.10)"
            strokeWidth="0.3"
          />
          <rect
            x="0"
            y="708.3"
            width="6"
            height="0.9"
            fill="#000000"
            opacity="0.24"
          />
          <line
            x1="0"
            y1="709.2"
            x2="6"
            y2="709.2"
            stroke="rgba(255, 255, 255, 0.10)"
            strokeWidth="0.3"
          />
          <rect
            x="386"
            y="59.8"
            width="6"
            height="0.9"
            fill="#000000"
            opacity="0.24"
          />
          <line
            x1="386"
            y1="60.7"
            x2="392"
            y2="60.7"
            stroke="rgba(255, 255, 255, 0.10)"
            strokeWidth="0.3"
          />
          <rect
            x="386"
            y="709.3"
            width="6"
            height="0.9"
            fill="#000000"
            opacity="0.24"
          />
          <line
            x1="386"
            y1="710.2"
            x2="392"
            y2="710.2"
            stroke="rgba(255, 255, 255, 0.10)"
            strokeWidth="0.3"
          />
          <rect
            x="154.5"
            y="0"
            width="0.9"
            height="6"
            fill="#000000"
            opacity="0.22"
          />
          <line
            x1="155.4"
            y1="0"
            x2="155.4"
            y2="6"
            stroke="rgba(255, 255, 255, 0.10)"
            strokeWidth="0.3"
          />
          <rect
            x="54.5"
            y="770"
            width="0.9"
            height="6"
            fill="#000000"
            opacity="0.22"
          />
          <line
            x1="55.4"
            y1="770"
            x2="55.4"
            y2="776"
            stroke="rgba(255, 255, 255, 0.10)"
            strokeWidth="0.3"
          />
          <rect
            x="337.5"
            y="770"
            width="0.9"
            height="6"
            fill="#000000"
            opacity="0.22"
          />
          <line
            x1="338.4"
            y1="770"
            x2="338.4"
            y2="776"
            stroke="rgba(255, 255, 255, 0.10)"
            strokeWidth="0.3"
          />

          {/* Continuous Outer Specular Rim Highlight */}
          <rect
            x="0.4"
            y="0.4"
            width="391.2"
            height="775.2"
            rx="3.1"
            fill="none"
            stroke={`url(#${prefix}-outer-specular)`}
            strokeWidth="0.6"
          />

          {/* Continuous Inner CNC Chamfer Rim Highlight */}
          <rect
            x="5.6"
            y="5.6"
            width="380.8"
            height="764.8"
            rx="2.2"
            fill="none"
            stroke={`url(#${prefix}-inner-specular)`}
            strokeWidth="0.5"
          />

          {/* Precision Step-Down Shadow Crease at Glass Bezel Junction */}
          <rect
            x="6.0"
            y="6.0"
            width="380.0"
            height="764.0"
            rx="2.0"
            fill="none"
            stroke="rgba(0, 0, 0, 0.55)"
            strokeWidth="0.5"
          />
        </g>

        {/* 3. AMOLED DISPLAY BEZEL (DEEP BLACK GLASS BORDER) */}
        <g id="bezel">
          <path
            d="M 8,6 L 384,6 A 2,2 0 0 1 386,8 L 386,768 A 2,2 0 0 1 384,770 L 8,770 A 2,2 0 0 1 6,768 L 6,8 A 2,2 0 0 1 8,6 Z
               M 13.5,12 L 378.5,12 A 1.5,1.5 0 0 1 380,13.5 L 380,762.5 A 1.5,1.5 0 0 1 378.5,764 L 13.5,764 A 1.5,1.5 0 0 1 12,762.5 L 12,13.5 A 1.5,1.5 0 0 1 13.5,12 Z"
            fill="#050507"
            fillRule="evenodd"
          />
          <rect
            x="12.0"
            y="12.0"
            width="368.0"
            height="752.0"
            rx="1.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="0.5"
          />
        </g>

        {/* 4. TOP SPEAKER EARPIECE MICRO-SLIT */}
        <g id="speaker">
          <rect
            x="168"
            y="5.7"
            width="56"
            height="0.75"
            rx="0.37"
            fill="#010103"
          />
          <line
            x1="170"
            y1="6.1"
            x2="222"
            y2="6.1"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.25"
          />
        </g>

        {/* 5. FRONT CAMERA PUNCH HOLE (AUTHENTIC S24/S25 ULTRA OPTICS) */}
        <g id="camera">
          {/* Camera Laser-Cut Opening in AMOLED Display */}
          <circle cx="196.5" cy="29.5" r="8.6" fill="#000000" />

          {/* Lens Barrel / Substrate Step */}
          <circle cx="196.5" cy="29.5" r="7.8" fill="#040508" />

          {/* Lens Glass Element Base */}
          <circle cx="196.5" cy="29.5" r="6.6" fill="#020306" />

          {/* Multi-Coated AR Coating Reflections */}
          <circle
            cx="196.5"
            cy="29.5"
            r="6.6"
            fill={`url(#${prefix}-lens-ar-br)`}
          />
          <circle
            cx="196.5"
            cy="29.5"
            r="6.6"
            fill={`url(#${prefix}-lens-ar-tl)`}
          />

          {/* Deep Pupil / Aperture Core */}
          <circle cx="196.2" cy="29.2" r="2.6" fill="#010103" />

          {/* Antireflective glass rim boundary */}
          <circle
            cx="196.5"
            cy="29.5"
            r="6.5"
            fill="none"
            stroke="rgba(100, 130, 200, 0.14)"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </div>
  );
}
