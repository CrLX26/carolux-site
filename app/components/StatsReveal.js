"use client";

import { useRef, useEffect } from "react";

export default function StatsReveal({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Mobile: always visible — touch Stats handles its own reveals internally
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.opacity = "1";
      return;
    }

    const check = () => {
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;

      // Panel locked at viewport top — fully visible
      if (top <= 0) {
        el.style.opacity = "1";
        return;
      }

      const fadeStart = vh * 0.5;
      if (top <= fadeStart) {
        // Fade zone: scroll-synchronised in both directions
        // Scrolling down: top 0.5vh → 0  →  opacity 0 → 1
        // Scrolling up:   top 0 → 0.5vh  →  opacity 1 → 0
        el.style.opacity = String(1 - top / fadeStart);
      } else {
        // Above fade zone — fully hidden
        el.style.opacity = "0";
      }
    };

    check(); // handle page loads where Stats is already in view
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
