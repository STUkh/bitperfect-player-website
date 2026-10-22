import { FAN } from '../feature/phone-fan';

/**
 * One scalar drives the whole opening: how far the track has scrolled past the
 * viewport top, as a fraction of the pin. It is smoothed rather than the scroll,
 * so the page still scrolls natively. The smoothing is a critically damped spring
 * (SmoothDamp) on real frame time, not a per-frame lerp: a mouse-wheel notch starts
 * and stops softly instead of jerking, a trackpad's own inertia passes through with
 * little lag, and 60Hz and 120Hz screens move alike. The loop runs only while a
 * scroll is pending and stops once the smoothed value has caught up.
 *
 * The choreography, as fractions of the track:
 *   0.00-0.26  the copy fades and lifts 48px
 *   0.04-0.58  the Now Playing phone travels from the right column to the centre
 *              and grows to fill the stage under the heading (it is the same
 *              object the whole way)
 *   0.30-0.80  Equaliser and Library slide out from behind it
 *   0.46-0.68  the heading fades in
 *   0.80-1.00  a hold, so a fast flick lands on the finished lineup before the
 *              stage unpins
 *
 * A fast gesture plays the whole opening, without losing speed. Scrolled at an
 * ordinary pace, with a wheel or a trackpad, the opening simply follows the
 * scroll and stays wherever the reader stops. Scrolled fast (`GLIDE_SPEED`, a
 * wheel spun hard or a flick), a glide takes over in that direction: the page scrolls itself on to the finished lineup (down) or
 * the page top (up), never slower than the cruise
 * (`GLIDE_TIME` for the whole track), faster while the reader keeps scrolling
 * faster, and it brakes only over the last `BRAKE` of the way. Scrolling the other
 * way turns it round. The glide scrolls the page itself, so the choreography above
 * stays scroll-linked and the spring carries it. A touch on the screen hands the
 * scroll back until the finger lifts; a click or a key press hands it back until
 * the page is still, so anchor links, the keyboard and the scrollbar scroll
 * natively. Outside the track nothing glides.
 *
 * `--p` is also written to the two backdrops, which cross-fade on it. Only to
 * them: on the section, an inherited custom property restyled the whole subtree
 * every frame.
 *
 * The group is laid out at its largest size (`--ho-k` times the hero phone) and
 * only ever scaled down, so the screens are never upscaled. `data-moving` carries
 * `will-change` only while the loop runs; dropping it at rest lets the browser
 * re-raster the phones crisply at whatever scale they settled on.
 *
 * `section` is the `[data-home-opening]` root. Every frame writes transform and
 * opacity (plus `--p`); the returned function unbinds everything and hands the
 * composition back to its CSS resting state.
 */
export function setupHomeOpening(section: HTMLElement) {
  const copy = section.querySelector<HTMLElement>('[data-copy]');
  const heading = section.querySelector<HTMLElement>('[data-heading]');
  const group = section.querySelector<HTMLElement>('[data-group]');
  const left = section.querySelector<HTMLElement>('[data-phone="left"]');
  const right = section.querySelector<HTMLElement>('[data-phone="right"]');
  const backdrops = Array.from(section.querySelectorAll<HTMLElement>('.ho-backdrop'));

  if (!copy || !heading || !group || !left || !right) return;

  /* The same condition as the pinned block in the stylesheet. */
  const pinnedQuery = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');

  /* Seconds the spring takes to roughly reach the scroll position. */
  const SMOOTH_TIME = 0.14;
  /* How far the side phones' centres sit from the centre phone's, in phone widths. */
  const SPREAD = FAN.spread;
  /* The lineup's visual width in phone widths: the centre phone plus each side
     phone's offset and its turned, set-back half, with a little air. */
  const LINEUP_WIDTH = 2.85;
  /* Seconds the glide takes over the whole track at its cruise. Unhurried: the
     glide is the page presenting the lineup, not a jump to it. */
  const GLIDE_TIME = 1.7;
  /* The fastest the glide starts, in cruises, however hard the flick was. */
  const GLIDE_MAX_START = 1.6;
  /* Seconds to come up to the cruise from a slow start, and to ease back to it
     after the reader has pushed faster. */
  const GLIDE_RISE = 0.2;
  const GLIDE_RELAX = 0.3;
  /* The share of the track the glide brakes over at its end: a long, soft landing. */
  const BRAKE = 0.4;
  /* Milliseconds of stillness after a click or key press before gliding resumes. */
  const HOLD_QUIET = 200;
  /* How fast the reader has to scroll for the glide to take over, in tracks per
     second (about 2000px/s on a 900px screen): a wheel spun hard or a trackpad
     flick. Ordinary wheel notches and trackpad scrolling stay well under it, and
     then the opening simply follows the scroll and stays wherever it stops. */
  const GLIDE_SPEED = 1.1;
  /* The window the speed is averaged over, and the shortest span it divides by,
     in ms: one notch on a wheel without smooth scrolling is a single 100px jump,
     which over one frame would read as a flick. */
  const SPEED_WINDOW = 150;
  const SPEED_MIN_SPAN = 100;

  let enabled = false;
  let running = false;
  let pending = false;
  let pos = 0;
  let vel = 0;
  let raw = 0;
  let last = 0;
  let vh = window.innerHeight;
  let vw = window.innerWidth;
  let top = 0;
  let track = 0;
  /* Resize only flags; the next frame measures, so a burst of events lays out once. */
  let stale = false;

  /* The glide: its frame while one plays, direction, speed (px/s), the position it
     last wrote and that frame's time. */
  let glide = 0;
  let glideDir = 1;
  let glideV = 0;
  let glideY = 0;
  let glideLast = 0;
  /* The last scroll event, for its direction and speed. */
  let lastY = 0;
  let lastT = 0;
  /* Recent hand-scrolled positions, for the reader's speed. */
  let trail: { t: number; y: number }[] = [];
  /* Native scrolling the glide must not take over: a finger on the screen, or a
     click or key press until the page is still. */
  let touching = false;
  let held = false;
  let holdTimer = 0;

  /* Layout, measured on enable, resize and font load rather than every frame. */
  let w = 0;
  let h = 0;
  let k = 1;
  let endScale = 1;
  let endY = 0;

  /*
    Lite mode: the safety net for a device that cannot hold the frame rate here.
    The loop already knows every frame's duration; if more than half of the last
    40 animating frames took longer than 22ms (60fps is 16.7ms, so each of those
    dropped at least one frame), `perf-lite` goes on the root, for the rest of the
    visit (sessionStorage, read back by BaseLayout before first paint). It flattens
    the fan here and drops the site-wide grain overlay; the photographs stay. A
    device that keeps up never sees it.
  */
  const LITE_KEY = 'perf-lite';
  let lite = document.documentElement.classList.contains(LITE_KEY);
  const slow: number[] = [];
  const watch = (ms: number) => {
    if (lite) return;
    slow.push(ms > 22 ? 1 : 0);
    if (slow.length > 40) slow.shift();
    if (slow.length < 40 || slow.reduce((a, b) => a + b, 0) <= 20) return;
    lite = true;
    document.documentElement.classList.add(LITE_KEY);
    try {
      sessionStorage.setItem(LITE_KEY, '1');
    } catch {
      /* Storage blocked: lite for this page only. */
    }
  };

  const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
  const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
  const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const measure = () => {
    vh = window.innerHeight;
    vw = window.innerWidth;
    top = section.getBoundingClientRect().top + window.scrollY;
    track = section.offsetHeight - vh;
    w = group.offsetWidth;
    h = group.offsetHeight;
    k = parseFloat(getComputedStyle(group).getPropertyValue('--ho-k')) || 1;

    /* The finished lineup fills the band between the heading and the floor, and
       the width of the content column, whichever runs out first. The stage is
       sticky at the top, so offsets inside it are viewport offsets. */
    const bandTop = heading.offsetTop + heading.offsetHeight + Math.max(20, vh * 0.03);
    const bandBottom = vh - Math.max(16, vh * 0.025);
    const gutter = Math.min(80, Math.max(20, vw * 0.06));
    const columnWidth = Math.min(1280, vw) - gutter * 2;
    endScale = Math.min(1, (bandBottom - bandTop) / h, columnWidth / (LINEUP_WIDTH * w));
    endY = (bandTop + bandBottom) / 2 - vh / 2;
  };

  const read = () => {
    raw = track > 0 ? clamp01((window.scrollY - top) / track) : 1;
  };

  const paint = (p: number) => {
    const pv = p.toFixed(4);
    for (const el of backdrops) el.style.setProperty('--p', pv);

    const fade = inOutCubic(span(p, 0, 0.26));
    copy.style.opacity = (1 - fade).toFixed(3);
    copy.style.transform = `translateY(calc(-50% - ${(fade * 48).toFixed(2)}px))`;
    /* Faded copy must not stay reachable by pointer or keyboard. */
    copy.style.pointerEvents = fade > 0.5 ? 'none' : '';
    copy.style.visibility = fade > 0.98 ? 'hidden' : '';

    const t = inOutCubic(span(p, 0.46, 0.68));
    heading.style.opacity = t.toFixed(3);
    heading.style.transform = `translateY(${((1 - t) * 24).toFixed(2)}px)`;

    const move = inOutCubic(span(p, 0.04, 0.58));
    const startX = Math.min(1280, vw) * 0.24;
    const scale = 1 / k + (endScale - 1 / k) * move;
    group.style.transform =
      `translate3d(calc(-50% + ${(startX * (1 - move)).toFixed(2)}px), calc(-50% + ${(endY * move).toFixed(2)}px), 0) ` +
      `scale(${scale.toFixed(4)})`;

    /* Depth is proportional to the phone, so the fan keeps its shape at any size.
       The projection rides at the head of each side phone's own transform (see
       HomeOpening.css, "No 3D scene"); lite mode drops it for a flat slide. */
    const s = outCubic(span(p, 0.3, 0.8));
    const o = span(p, 0.3, 0.46).toFixed(3);
    const z = (-(0.42 * s + 0.14) * w).toFixed(2);
    const sc = (0.9 + 0.04 * s).toFixed(4);
    const x = SPREAD * 100 * s;
    if (lite) {
      left.style.transform = `translateX(${(-x).toFixed(3)}%) scale(${sc})`;
      right.style.transform = `translateX(${x.toFixed(3)}%) scale(${sc})`;
    } else {
      const persp = `perspective(${(w * 6).toFixed(1)}px)`;
      left.style.transform = `${persp} translate3d(${(-x).toFixed(3)}%, 0, ${z}px) rotateY(${(FAN.turn * s).toFixed(3)}deg) scale(${sc})`;
      right.style.transform = `${persp} translate3d(${x.toFixed(3)}%, 0, ${z}px) rotateY(${(-FAN.turn * s).toFixed(3)}deg) scale(${sc})`;
    }
    left.style.opacity = o;
    right.style.opacity = o;
  };

  const settle = () => {
    running = false;
    delete section.dataset.moving;
  };

  const frame = (now: number) => {
    if (!enabled) {
      settle();
      return;
    }
    watch(now - last);
    /* Capped so a background tab or a long frame does not fling the spring. */
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    pending = false;
    if (stale) {
      stale = false;
      measure();
    }
    read();

    const omega = 2 / SMOOTH_TIME;
    const x = omega * dt;
    const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    const change = pos - raw;
    const temp = (vel + omega * change) * dt;
    vel = (vel - omega * temp) * decay;
    pos = raw + (change + temp) * decay;

    if (Math.abs(raw - pos) < 0.0004 && Math.abs(vel) < 0.002 && !pending) {
      pos = raw;
      vel = 0;
      paint(pos);
      settle();
      return;
    }
    paint(pos);
    requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || !enabled) return;
    running = true;
    section.dataset.moving = '';
    last = performance.now();
    requestAnimationFrame(frame);
  };

  /* Where the opening starts and finishes, as scroll positions. The track begins
     under the header, so when it sits in the first screen its start is the page top. */
  const openingStart = () => (top > vh ? top : 0);
  const openingEnd = () => top + track;

  const stopGlide = () => {
    if (!glide) return;
    cancelAnimationFrame(glide);
    glide = 0;
  };

  /* One glide frame. Whatever moved the page since the last write was the reader:
     the same way speeds the glide up, the other way turns it round. */
  const glideFrame = (now: number) => {
    const dt = Math.min(0.05, Math.max(0.001, (now - glideLast) / 1000));
    glideLast = now;
    if (stale) {
      stale = false;
      measure();
    }
    const cruise = track / GLIDE_TIME;
    const y = window.scrollY;
    const pushed = (y - glideY) * glideDir;
    if (pushed < -1) {
      glideDir = -glideDir;
      glideV = -pushed / dt;
    } else if (pushed > 0) {
      glideV = Math.max(glideV, Math.min(pushed / dt, GLIDE_MAX_START * cruise));
    }
    glideV =
      glideV < cruise
        ? Math.min(cruise, glideV + (cruise / GLIDE_RISE) * dt)
        : cruise + (glideV - cruise) * Math.exp(-dt / GLIDE_RELAX);

    const target = glideDir > 0 ? openingEnd() : openingStart();
    const remaining = (target - y) * glideDir;
    if (remaining <= 0.5) {
      if (remaining > -0.5) window.scrollTo({ top: target, behavior: 'instant' });
      glide = 0;
      return;
    }
    /* The fastest speed that can still stop at the target: braking from the
       cruise over the last `BRAKE` of the track. */
    const brake = (cruise * cruise) / (2 * BRAKE * track);
    const v = Math.min(glideV, Math.max(40, Math.sqrt(2 * brake * remaining)));
    glideY = y + glideDir * Math.min(remaining, v * dt);
    window.scrollTo({ top: glideY, behavior: 'instant' });
    glide = requestAnimationFrame(glideFrame);
  };

  const startGlide = (dir: number, speed: number) => {
    glideDir = dir;
    glideV = speed;
    glideY = window.scrollY;
    glideLast = performance.now();
    glide = requestAnimationFrame(glideFrame);
  };

  const onScroll = () => {
    pending = true;
    start();
    const y = window.scrollY;
    const now = performance.now();
    const moved = y - lastY;
    const dt = Math.max(8, now - lastT) / 1000;
    const from = lastY;
    const fromT = lastT;
    lastY = y;
    lastT = now;
    if (held) {
      clearTimeout(holdTimer);
      holdTimer = window.setTimeout(release, HOLD_QUIET);
      return;
    }
    /* A playing glide reads the reader's input itself. */
    if (glide || touching || Math.abs(moved) < 1) return;
    const dir = moved > 0 ? 1 : -1;
    /* The speed over the last SPEED_WINDOW, in this direction only: a turn or a
       pause starts the trail again from the previous position. */
    trail = trail.filter((s) => now - s.t <= SPEED_WINDOW);
    const head = trail[0];
    if (!head || Math.sign(y - head.y) !== dir) trail = [{ t: Math.max(fromT, now - SPEED_WINDOW), y: from }];
    trail.push({ t: now, y });
    if (y <= openingStart() || y >= openingEnd()) return;
    const first = trail[0];
    const speed = (Math.abs(y - first.y) / Math.max(SPEED_MIN_SPAN, now - first.t)) * 1000;
    if (speed < GLIDE_SPEED * track) return;
    trail = [];
    startGlide(dir, Math.min(Math.abs(moved) / dt, (GLIDE_MAX_START * track) / GLIDE_TIME));
  };

  const release = () => {
    held = false;
    holdTimer = 0;
  };
  const hold = () => {
    stopGlide();
    held = true;
    clearTimeout(holdTimer);
    holdTimer = window.setTimeout(release, HOLD_QUIET);
  };
  /* A wheel against a playing glide turns it round. Read from the event itself:
     WebKit applies the wheel's scroll off the main thread, and the glide's next
     write can land over it before the movement shows. */
  const onWheel = (event: WheelEvent) => {
    const dir = Math.sign(event.deltaY);
    if (!glide || !dir || dir === glideDir) return;
    glideDir = dir;
    glideV = 0;
    glideY = window.scrollY;
  };
  const onTouchStart = () => {
    stopGlide();
    touching = true;
  };
  const onTouchEnd = () => {
    touching = false;
  };
  const inputs = [
    ['pointerdown', hold],
    ['keydown', hold],
    ['wheel', onWheel],
    ['touchstart', onTouchStart],
    ['touchend', onTouchEnd],
    ['touchcancel', onTouchEnd],
  ] as const;
  const listen = (on: boolean) => {
    for (const [type, fn] of inputs) {
      if (on) window.addEventListener(type, fn, { passive: true });
      else window.removeEventListener(type, fn);
    }
  };
  const quiet = () => {
    listen(false);
    stopGlide();
    clearTimeout(holdTimer);
    release();
    touching = false;
  };

  const onResize = () => {
    stale = true;
    pending = true;
    start();
  };

  /* Snap straight to the scroll position, no spring: used on entry and exit. */
  const jump = () => {
    if (stale) {
      stale = false;
      measure();
    }
    read();
    pos = raw;
    vel = 0;
    paint(pos);
  };

  /* The scroll listener lives only while the section is on screen. */
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          lastY = window.scrollY;
          lastT = performance.now();
          window.addEventListener('scroll', onScroll, { passive: true });
          listen(true);
          pending = true;
          start();
        } else {
          window.removeEventListener('scroll', onScroll);
          quiet();
          jump();
        }
      }
    },
    { threshold: 0 },
  );

  const layers = [copy, heading, group, left, right];

  const enable = () => {
    if (enabled) return;
    enabled = true;
    measure();
    jump();
    window.addEventListener('resize', onResize);
    observer.observe(section);
    /* The heading's height, and so the band under it, changes once the font lands. */
    document.fonts?.ready.then(() => {
      if (!enabled) return;
      measure();
      jump();
    });
  };

  const disable = () => {
    if (!enabled) return;
    enabled = false;
    settle();
    observer.unobserve(section);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    quiet();
    /* Hand the composition back to the CSS resting state. */
    for (const el of layers) {
      el.style.transform = '';
      el.style.opacity = '';
    }
    copy.style.pointerEvents = '';
    copy.style.visibility = '';
    for (const el of backdrops) el.style.removeProperty('--p');
  };

  const sync = () => {
    if (pinnedQuery.matches) enable();
    else disable();
  };

  pinnedQuery.addEventListener('change', sync);
  sync();

  return () => {
    pinnedQuery.removeEventListener('change', sync);
    disable();
    observer.disconnect();
  };
}
