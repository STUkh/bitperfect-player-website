import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // ── Shared defaults for smoother animations ──
  gsap.defaults({
    ease: 'power3.out',
  });

  // Helper: disable CSS transitions before GSAP animates, restore after.
  // Many cards use `transition-all` for hover effects — this fights GSAP's
  // per-frame opacity updates and creates a visible two-step fade.
  function killCssTransitions(els: HTMLElement[]) {
    els.forEach((el) => {
      el.style.transition = 'none';
    });
  }
  function restoreCssTransitions(els: HTMLElement[]) {
    els.forEach((el) => {
      el.style.transition = '';
      el.style.willChange = 'auto';
    });
  }

  // ── Batch reveal: Fade Up ──
  // Exclude #hero children — they are handled by heroTimeline below
  ScrollTrigger.batch('[data-animate="fade-up"]:not(#hero *)', {
    onEnter: (elements) => {
      const els = elements as HTMLElement[];
      killCssTransitions(els);
      gsap.fromTo(
        els,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
          force3D: true,
          onComplete: () => restoreCssTransitions(els),
        },
      );
    },
    start: 'top 88%',
    once: true,
  });

  // ── Fade In ──
  ScrollTrigger.batch('[data-animate="fade-in"]:not(#hero *)', {
    onEnter: (elements) => {
      const els = elements as HTMLElement[];
      killCssTransitions(els);
      gsap.fromTo(
        els,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'none',
          onComplete: () => restoreCssTransitions(els),
        },
      );
    },
    start: 'top 88%',
    once: true,
  });

  // ── Scale In ──
  gsap.utils.toArray<HTMLElement>('[data-animate="scale-in"]:not(#hero *)').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => killCssTransitions([el]),
        },
        onComplete: () => restoreCssTransitions([el]),
      },
    );
  });

  // ── Slide Left / Slide Right ──
  // The horizontal pair animates the two halves of a side-by-side layout toward
  // each other. Below `lg` those layouts stack, so a sideways slide expresses
  // nothing — and the 30px start offset pushes past a phone viewport, adding a
  // horizontal scroll to the whole document (the section it lives in has
  // `overflow: visible`, so it propagates all the way to <html>). Below the
  // breakpoint the reveal degrades to the same vertical fade used elsewhere.
  const slideMm = gsap.matchMedia();

  const revealAxis = (selector: string, from: gsap.TweenVars) => {
    gsap.utils.toArray<HTMLElement>(`${selector}:not(#hero *)`).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, ...from },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => killCssTransitions([el]),
          },
          onComplete: () => restoreCssTransitions([el]),
        },
      );
    });
  };

  slideMm.add('(min-width: 1024px)', () => {
    revealAxis('[data-animate="slide-left"]', { x: -30 });
    revealAxis('[data-animate="slide-right"]', { x: 30 });
  });

  slideMm.add('(max-width: 1023.98px)', () => {
    revealAxis('[data-animate="slide-left"]', { y: 24 });
    revealAxis('[data-animate="slide-right"]', { y: 24 });
  });

  // ── Counter Animations ──
  gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count-to') || '0');
    const decimals = parseInt(el.getAttribute('data-count-decimals') || '0');

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
        });
      },
    });
  });

  // ── Science frequency bar animations ──
  const scienceBars = gsap.utils.toArray<HTMLElement>('.science-bar');
  if (scienceBars.length > 0) {
    scienceBars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-bar-width') + '%';
      gsap.set(bar, { width: '0%' });

      ScrollTrigger.create({
        trigger: bar,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(bar, {
            width: targetWidth,
            duration: 1.2,
            ease: 'power2.out',
          });
        },
      });
    });
  }

  // ── Hero Load Animation ──
  const heroTimeline = gsap.timeline({ delay: 0.2 });
  const heroElements = document.querySelectorAll('#hero [data-animate]');

  heroElements.forEach((el) => {
    const animType = el.getAttribute('data-animate');
    if (animType === 'scale-in') {
      gsap.set(el, { opacity: 0, scale: 0.92 });
    } else {
      gsap.set(el, { opacity: 0, y: 25 });
    }
  });

  heroElements.forEach((el, i) => {
    const animType = el.getAttribute('data-animate');
    if (animType === 'scale-in') {
      heroTimeline.to(
        el,
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
        0.1 + i * 0.12,
      );
    } else {
      heroTimeline.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1 + i * 0.12);
    }
  });

  // Clean up will-change after hero animation completes, then free the
  // timeline from GSAP's internal registry so it can be garbage-collected.
  heroTimeline.call(() => {
    heroElements.forEach((el) => {
      (el as HTMLElement).style.willChange = 'auto';
    });
    heroTimeline.kill();
  });

  // ── Parallax: only on pointer:fine devices (mouse/trackpad) ──
  // Touch devices skip this — scrub timelines cause jank on inertia-scroll
  // and the effect adds no value without a cursor to follow.
  if (window.matchMedia('(pointer: fine)').matches) {
    // ── Parallax on Phone Mockup Group (smoother scrub) ──
    const phoneGroup = document.querySelector('#hero [data-animate="scale-in"]');
    if (phoneGroup) {
      gsap.to(phoneGroup, {
        y: -25,
        force3D: true,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    // ── Parallax on hero blur orbs (different speeds for depth) ──
    const heroOrbs = gsap.utils.toArray<HTMLElement>('.hero-orb');
    heroOrbs.forEach((orb, i) => {
      const speed = [30, -20, 15][i] || 20;
      gsap.to(orb, {
        y: speed,
        force3D: true,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });
  }
  // ── Grid Background Scroll-Driven Color Shifts ──
  // Uses CSS custom property tweens (--glow-r/g/b) for smooth interpolation
  // without expensive gradient recomputation per frame
  const glows = gsap.utils.toArray<HTMLElement>('.grid-cell-glow');
  if (glows.length > 0) {
    const sectionColors: Record<string, [number, number, number]> = {
      '#hero': [123, 104, 238], // purple
      '#features': [0, 212, 255], // cyan
      '#how-it-works': [78, 205, 196], // green
      '#engine': [123, 104, 238], // purple
      '#showcase': [0, 212, 255], // cyan
      '#pricing': [123, 104, 238], // purple
      '#cta': [255, 179, 71], // amber
    };

    Object.entries(sectionColors).forEach(([selector, [r, g, b]]) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const updateGlows = () => {
        glows.forEach((glow) => {
          gsap.to(glow, {
            '--glow-r': r,
            '--glow-g': g,
            '--glow-b': b,
            duration: 1.2,
            ease: 'power2.inOut',
            overwrite: 'auto',
          });
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: updateGlows,
        onEnterBack: updateGlows,
      });
    });
  }
  // ── Hash scroll: handle /#section links from other pages ──────────────
  // When navigating from /faq to /#pricing, the browser tries to scroll
  // before GSAP has positioned elements. We wait for ScrollTrigger to
  // refresh, then scroll to the target section.
  if (window.location.hash) {
    const hash = window.location.hash;
    requestAnimationFrame(() => {
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          ScrollTrigger.refresh();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    });
  }

  // ── bfcache: kill all ScrollTriggers when the page is frozen ────────────
  // Without this, GSAP's scroll listeners remain active on a bfcache-frozen
  // page and can fire spuriously when the page is restored.
  window.addEventListener(
    'pagehide',
    () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { once: true },
  );
} else {
  // [data-animate] visibility is handled by CSS via `!important` overrides in
  // animations.css (@media prefers-reduced-motion). The CSS fix is instantaneous
  // and has no JS dependency, so no gsap.set() call is needed here.
  // Only counters and bars need JS fallbacks since CSS can't compute data-driven values.

  gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((el) => {
    const target = el.getAttribute('data-count-to') || '0';
    const decimals = parseInt(el.getAttribute('data-count-decimals') || '0');
    el.textContent = parseFloat(target).toFixed(decimals);
  });

  // Show science bars at full width
  gsap.utils.toArray<HTMLElement>('.science-bar').forEach((bar) => {
    bar.style.width = bar.getAttribute('data-bar-width') + '%';
  });
}
