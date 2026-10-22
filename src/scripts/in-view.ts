/**
 * "The reader has actually scrolled to it", as one rule for every entrance.
 *
 * A bare IntersectionObserver threshold fires on a sliver: at 15% a tall card was
 * already playing its entrance with its top edge just over the fold, and a phone
 * fan at 25% opened while the reader was still in the band above. Here an element
 * counts as arrived when its visible part, measured inside the viewport less its
 * bottom `margin`, reaches `share` of its own height, or `share` of that viewport
 * if it is taller than the screen (so a tall block can still arrive).
 *
 * One escape, so nothing is ever left hidden: reaching the end of the page (or a
 * page too short to scroll) plays everything still waiting, because a block in
 * the last strip of the page cannot climb any higher.
 *
 * Calls `onArrive` once per element and stops watching it. Returns a disposer.
 */
export function onArrive(
  elements: Element[],
  onArrive: (el: Element) => void,
  { share = 0.35, margin = 0.1 }: { share?: number; margin?: number } = {},
): () => void {
  const waiting = new Set(elements);
  const arrive = (el: Element) => {
    if (!waiting.delete(el)) return;
    io.unobserve(el);
    onArrive(el);
    if (!waiting.size) dispose();
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting || !e.rootBounds) continue;
        const need = Math.min(e.boundingClientRect.height, e.rootBounds.height) * share;
        if (e.intersectionRect.height >= need) arrive(e.target);
      }
    },
    {
      rootMargin: `0px 0px -${Math.round(margin * 100)}% 0px`,
      threshold: Array.from({ length: 21 }, (_, i) => i / 20),
    },
  );

  /* The observer's first report applies the same rule at load: a block that is
     only peeking over the fold waits for the reader like any other. */
  for (const el of elements) io.observe(el);

  function atEnd() {
    if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 2) return;
    for (const el of [...waiting]) arrive(el);
  }
  function dispose() {
    io.disconnect();
    window.removeEventListener('scroll', atEnd);
  }
  window.addEventListener('scroll', atEnd, { passive: true });
  /* A page too short to scroll is already at its end. */
  atEnd();
  if (!waiting.size) dispose();
  return dispose;
}
