import { onArrive } from '../../scripts/in-view';

/**
 * Adds `data-open` once, when the stage has properly arrived (see in-view.ts). `data-armed`
 * is set here, before the stage enters the view, so without scripting the
 * phones simply stand in their final positions. It is dropped 1.5s after the
 * reveal so the long entrance transition does not also slow the hover.
 */
export function setupPhoneTrio(el: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    el.dataset.open = '';
    return;
  }
  el.dataset.armed = '';
  let timer: number | undefined;
  /* The fan opens once most of the stage is in view (half of it, above the bottom
     tenth of the screen), not when its top quarter first clears the fold. */
  const stop = onArrive(
    [el],
    () => {
      el.dataset.open = '';
      timer = window.setTimeout(() => {
        delete el.dataset.armed;
      }, 1500);
    },
    { share: 0.55, margin: 0.1 },
  );
  return () => {
    stop();
    window.clearTimeout(timer);
  };
}
