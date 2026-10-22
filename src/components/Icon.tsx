import { createElement } from "react";
import { iconStroke } from "../utils/icon";
import type { ClassProps } from "./_lib/class-props";
import { GLYPH_SETS, PHOSPHOR, type Glyph } from "./glyphs";
import "./Icon.css";

export interface IconProps extends ClassProps {
  /** Glyph name: `sig-bitperfect|enhanced|resampled|lossy` signal-path status marks (app status only, never decoration), `node-file|decode|engine|usb|dac` chain nodes, feature marks (eq, cast, sparkle, shield, plug, cable, library, download, phone, waveform, android), utilities (bullet, chevron, arrow, play, external) and the social marks (telegram, tiktok, instagram, x). Not for use inside buttons (no arrow or chevron there); `play` is never an install icon. */
  name: string;
  /** Pixel size (or a CSS length); the stroke weight is derived from it. Default 20. Colour is `currentColor`. */
  size?: number | string;
  /** Escape hatch for the stroke width. Leave unset so the size-derived weight applies. */
  stroke?: number;
  /** Which authored set `name` is read from. `feature` is `FeatureMark`'s; use that component rather than this prop. */
  set?: "icon" | "feature";
}

/** Renders a glyph's shapes (from `glyphs.ts`) as SVG children. */
export function GlyphShapes({ glyph }: { glyph: Glyph }) {
  return <>{glyph.map(({ el, ...attrs }, i) => createElement(el, { key: i, ...attrs }))}</>;
}

/**
 * Authored icon set; the drawings themselves are in `glyphs.ts`.
 *
 * Stroke is never passed by hand: `iconStroke` derives it from the size so the
 * rendered weight stays optically level from a 15px chip glyph to a 36px
 * identity mark. See `src/utils/icon.ts`.
 */
export default function Icon({ name, size = 20, stroke, set = "icon", className = "" }: IconProps) {
  const box = typeof size === "number" ? size : Number.parseFloat(size);
  const strokeWidth = stroke ?? iconStroke(box);
  const isPhosphor = set === "icon" && PHOSPHOR.includes(name);
  const glyph = GLYPH_SETS[set][name];
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox={isPhosphor ? "0 0 256 256" : "0 0 24 24"}
      fill="none"
      stroke={isPhosphor ? "none" : "currentColor"}
      strokeWidth={isPhosphor ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyph && <GlyphShapes glyph={glyph} />}
    </svg>
  );
}
