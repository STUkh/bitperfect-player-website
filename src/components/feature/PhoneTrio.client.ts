/**
 * Adds `data-open` once, the first time the stage is 25% in view. `data-armed`
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
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      el.dataset.open = '';
      timer = window.setTimeout(() => {
        delete el.dataset.armed;
      }, 1500);
      io.disconnect();
    },
    { threshold: 0.25 },
  );
  io.observe(el);
  return () => {
    io.disconnect();
    window.clearTimeout(timer);
  };
}
