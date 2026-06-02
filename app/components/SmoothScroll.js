"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Slows page scrolling so the same distance takes ~25% more wheel input
// (wheelMultiplier 0.8), with momentum smoothing. Desktop wheel/trackpad only:
// touch devices keep native scrolling, and reduced-motion users are left on
// native scroll entirely. The Hero/Stats scroll-driven animations read the real
// scroll position, so they continue to work unchanged.
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isTouch) return; // native scroll on mobile + reduced-motion

    const lenis = new Lenis({
      wheelMultiplier: 0.8, // 25% more wheel to travel the same distance (1 / 0.8 = 1.25)
      smoothWheel: true,
      syncTouch: false, // never intercept touch — mobile stays native
      lerp: 0.1, // momentum smoothing
    });

    let rafId = null;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
