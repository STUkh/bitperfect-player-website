import { clsx as cx } from 'clsx';
import { screens } from '../../data/screens';
import Picture from '../common/Picture';
import type { ClassProps } from '../class-props';

/**
 * One app screen inside a device frame. Fills its parent (`h-full w-full`,
 * cropped from the top); reserve a 556 / 1236 box, or put it inside `PhoneFrame`,
 * which does.
 *
 * A capture of the shipping Android app, named by the manifest that
 * `design/screens.mjs` generates. Naming a screen that has not been captured
 * renders nothing rather than a broken image — the frame is still a frame, and
 * the page still stands up. Same contract as `ImageSlot`, for the same reason:
 * an asset arriving or leaving is a script run, not a page edit.
 *
 * `alt` defaults to EMPTY and that is deliberate. These sit beside copy that
 * already states what the screen shows — a beat headline and a paragraph on a
 * feature route, a group label in the home lineup — so a description here is the
 * same sentence read twice. Pass a real `alt` only where the image is the only
 * place the information exists.
 *
 * `priority` is for the one screen above the fold. Everything else is lazy: the
 * home page alone carries three of these inside a scroll-driven section, and
 * they must not compete with the hero for the first megabyte.
 */

export interface PhoneScreenProps extends ClassProps {
  /**
   * Which capture. One of: now-playing, now-playing-hero, eq, eq-filters, eq-presets,
   * eq-sculptor, library, sources, tracks, album, output, track-info, playback,
   * fidelity, signal-path, signal-clean, cast, cast-sheet, receiver, dsp, dsp-sheet,
   * ai, ai-enhancer, ai-karaoke, ai-neural (keys of `src/data/screens.ts`).
   * An unknown key renders nothing.
   */
  name: string;
  /** Default empty (decorative): the copy beside the phone already says what it shows. */
  alt?: string;
  /** Load eagerly with high fetch priority. Only for the one screen above the fold. Default lazy. */
  priority?: boolean;
  /** Rendered width; default `278px`, the frame at its widest (the 556px master is its 2x). */
  sizes?: string;
}

export default function PhoneScreen({ name, alt = '', priority = false, sizes = '278px', className }: PhoneScreenProps) {
  const known = screens.has(name);
  if (!known) return null;

  return (
    <Picture
      src={`screens/${name}.webp`}
      alt={alt}
      sizes={sizes}
      priority={priority}
      position="50% 0%"
      className={cx(['h-full w-full object-cover object-top', className])}
    />
  );
}
