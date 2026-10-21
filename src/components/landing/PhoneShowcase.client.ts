/**
 * One scalar drives the whole composition: how far the section top has
 * scrolled past the viewport top, over the track length.
 *
 * The scalar is smoothed rather than the scroll (`pos += (raw - pos) * 0.15`,
 * a time constant near 110ms), so the page still scrolls natively. The loop
 * runs only while the section is on screen and stops as soon as the smoothed
 * value has caught up and no scroll is pending.
 *
 * `section` is the `[data-showcase]` root; the returned function unbinds
 * everything and hands the lineup back to its CSS resting state.
 */
export function setupPhoneShowcase(section: HTMLElement) {
  const strip = section.querySelector<HTMLElement>('[data-strip]');
  const riser = section.querySelector<HTMLElement>('[data-riser]');
  const centre = section.querySelector<HTMLElement>('[data-phone="centre"]');
  const left = section.querySelector<HTMLElement>('[data-phone="left"]');
  const right = section.querySelector<HTMLElement>('[data-phone="right"]');

  if (!riser || !centre || !left || !right) return;

  const GAP = 28;

  /* ── The choreography ──
   *
   * The centre phone arrives large and high, then DESCENDS and shrinks into the
   * row, so it reads as travelling on toward the next section rather than simply
   * getting smaller in place.
   *
   * Both siblings start stacked off to the RIGHT, behind the centre, and sweep
   * LEFT. The right one has a short journey and stops beside the centre. The left
   * one starts later, travels twice as far, and passes BEHIND the centre phone on
   * the way, disappearing under it and emerging on the far side. That pass is the
   * whole trick: they genuinely come out from behind it.
   *
   * Every range overlaps its neighbour. Sequential ranges read as a slideshow;
   * overlapping ones read as one gesture.
   */
  /* Read from CSS: the fitbox reserves this much height, so a second copy here
     would silently desynchronise the moment either one changed. */
  const PEAK = Number.parseFloat(getComputedStyle(section).getPropertyValue('--peak')) || 1.2;
  const DESCEND_VH = 0.06;
  const ENTER_X = 190;

  /** Where each part of the composition starts and stops, as a fraction of track.
   *
   * Retuned against a measurement of the shipped build rather than by eye. The
   * old ranges opened the sweeps at 0.26 and 0.34, so a quarter of the pin passed
   * before the second phone existed, and closed them under an easing that had spent
   * 99% of its travel by 0.75, so the last quarter was a still photograph. The
   * gesture ran from 0.26 to 0.72 — 46% of the track doing all of the work.
   *
   * Now the right phone leaves within the first tenth, the left one closes ON the
   * end of the track, and the two sweeps overlap the centre's settle rather than
   * queueing behind it. Every point of the track carries motion. */
  const R = {
    descend: [0.0, 0.62],
    grow: [0.0, 0.7],
    rightX: [0.08, 0.82],
    rightIn: [0.08, 0.32],
    leftX: [0.2, 1.0],
    leftIn: [0.2, 0.46],
  } as const;

  const desktop = window.matchMedia('(min-width: 1024px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let enabled = false;
  let running = false;
  let pending = false;
  let pos = 1;
  let raw = 1;
  let vh = window.innerHeight;

  const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
  /** Normalise p into one sub-range. */
  const span = (p: number, [a, b]: readonly [number, number]) => clamp01((p - a) / (b - a));

  /* Deceleration is what reads as expensive. Expo for the sweeps, because a phone
     crossing 300% of its own width has to shed speed hard or it looks thrown.
     That still holds; the EXPONENT was the problem. At -10 the curve is 87% done
     by a third of its range and 99% done by two thirds, so the phone arrived long
     before its range did and the rest of the pin was a still. At -5, normalised so
     it still lands exactly on 1, the hard stop survives — 82% by half — and the
     last tenth of the range is worth 33px of visible travel instead of 1px.
     DESIGN.md, "The Tail Has To Be Worth Scrolling".

     The centre is the only thing moving through the opening, and it starts from a
     standstill: an ease-OUT there is at its fastest on the first frame, which is
     why the old opening spent its whole scale change in the first quarter and then
     crept. In-out cubic accelerates first, so the descent fills the opening. */
  const outExpo = (t: number) => (t >= 1 ? 1 : (1 - Math.pow(2, -5 * t)) / (1 - Math.pow(2, -5)));
  const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const read = () => {
    const rect = section.getBoundingClientRect();
    const track = rect.height - vh;
    raw = track > 0 ? clamp01(-rect.top / track) : 1;
  };

  const paint = (p: number) => {
    /* The centre: down and smaller, together, on one curve. */
    const settle = inOutCubic(span(p, R.descend));
    const grow = inOutCubic(span(p, R.grow));
    const y = (settle - 1) * DESCEND_VH * vh;
    centre.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${(PEAK - (PEAK - 1) * grow).toFixed(4)})`;

    /* The siblings: both sweep leftward off one shared start. */
    const rx = outExpo(span(p, R.rightX));
    const lx = outExpo(span(p, R.leftX));

    const rightX = ENTER_X - (ENTER_X - 100) * rx;
    const leftX = ENTER_X - (ENTER_X + 100) * lx;
    const rightGap = GAP * rx;
    const leftGap = -GAP * lx;

    right.style.transform =
      `translate3d(calc(${rightX.toFixed(3)}% + ${rightGap.toFixed(2)}px), 0, 0) ` +
      `scale(${(1.1 - 0.1 * rx).toFixed(4)})`;
    left.style.transform =
      `translate3d(calc(${leftX.toFixed(3)}% + ${leftGap.toFixed(2)}px), 0, 0) ` +
      `scale(${(1.1 - 0.1 * lx).toFixed(4)})`;

    /* They fade up over the first third of their own travel, so they emerge
       rather than slide in already finished. */
    right.style.opacity = span(p, R.rightIn).toFixed(3);
    left.style.opacity = span(p, R.leftIn).toFixed(3);

    /* The riser no longer moves the group: the descent belongs to the centre
       phone alone now, and two vertical motions at once read as drift. */
    riser.style.transform = 'translate3d(0, 0, 0)';
  };

  const frame = () => {
    if (!enabled) {
      running = false;
      return;
    }
    pending = false;
    read();
    /* A ~180ms time constant. 0.15 tracked the scroll almost exactly, which is
       accurate and reads as cheap; this trails it just enough to feel weighted. */
    pos += (raw - pos) * 0.1;
    if (Math.abs(raw - pos) < 0.0005 && !pending) {
      pos = raw;
      paint(pos);
      running = false;
      return;
    }
    paint(pos);
    requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || !enabled) return;
    running = true;
    requestAnimationFrame(frame);
  };

  const onScroll = () => {
    pending = true;
    start();
  };

  const onResize = () => {
    vh = window.innerHeight;
    pending = true;
    start();
  };

  /* The listeners live only while the section is on screen. */
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScroll, { passive: true });
          pending = true;
          start();
        } else {
          window.removeEventListener('scroll', onScroll);
          read();
          pos = raw;
          paint(pos);
        }
      }
    },
    { threshold: 0 },
  );

  const enable = () => {
    if (enabled) return;
    enabled = true;
    vh = window.innerHeight;
    read();
    pos = raw;
    paint(pos);
    window.addEventListener('resize', onResize);
    observer.observe(section);
  };

  const disable = () => {
    if (!enabled) return;
    enabled = false;
    running = false;
    observer.unobserve(section);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    /* Hand the lineup back to the CSS resting state, opacity included. */
    for (const el of [riser, centre, left, right]) {
      el.style.transform = '';
      el.style.opacity = '';
    }
  };

  const sync = () => {
    if (desktop.matches && !reduced.matches) enable();
    else disable();
    /* SC 2.1.1: a scrollable region has to be reachable from the keyboard.
       It only scrolls below 1024px, so the tab stop only exists there. */
    if (strip) {
      if (desktop.matches) strip.removeAttribute('tabindex');
      else strip.setAttribute('tabindex', '0');
    }
  };

  desktop.addEventListener('change', sync);
  reduced.addEventListener('change', sync);
  sync();

  return () => {
    desktop.removeEventListener('change', sync);
    reduced.removeEventListener('change', sync);
    disable();
    observer.disconnect();
  };
}
