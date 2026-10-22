import { useEffect, useRef } from 'react';

/**
 * A component's client behaviour is a plain function, `setup(root) => cleanup`,
 * in `<Name>.client.ts`. It is written once and runs in two places:
 *
 * - On the site nothing hydrates. The component's thin `.astro` wrapper carries
 *   a `<script>` that imports the `.client.ts` and calls it on its element, so
 *   the page ships the behaviour and no React. That script must never import
 *   this module: React is not tree-shakeable, and a `mount` helper that lived
 *   here once pulled react.production.min.js onto every page.
 * - In Claude Design the component renders client-side, and `useBehaviour`
 *   runs the same function from an effect. During the site's static render
 *   effects never run, so the hook costs the site nothing.
 *
 * Both find the same element. In React it is the one the ref sits on; on the
 * site it is found by a `data-*` hook named after the component, which that
 * element also carries (`data-home-opening`, `data-phone-trio`,
 * `data-legal-document`, `data-mobile-menu-toggle`), and the wrapper's script
 * is always the one line
 *
 *   document.querySelectorAll<HTMLElement>('[data-x]').forEach((el) => setupX(el));
 *
 * never an id or a styling class, so a restyle cannot unmount a behaviour.
 */
export type Setup<T extends HTMLElement = HTMLElement> = (root: T) => (() => void) | void;

/** Runs `setup` on the element the returned ref is attached to. */
export function useBehaviour<T extends HTMLElement>(setup: Setup<T>) {
  const ref = useRef<T>(null);
  useEffect(() => (ref.current ? (setup(ref.current) ?? undefined) : undefined), [setup]);
  return ref;
}

