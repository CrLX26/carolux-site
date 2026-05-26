"use client";

import { useRef, useEffect } from "react";

export default function StatsReveal({ children }) {
  const ref    = useRef(null); // stats wrapper
  const blurRef = useRef(null); // seam blur overlay

  useEffect(() => {
    const el     = ref.current;
    const blurEl = blurRef.current;
    if (!el) return;

    // Mobile: always visible, no seam blur needed
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.opacity = "1";
      if (blurEl) blurEl.style.opacity = "0";
      return;
    }

    const check = () => {
      const top      = el.getBoundingClientRect().top;
      const vh       = window.innerHeight;
      const fadeStart = vh * 0.5;

      if (top <= 0) {
        // Stats locked — fully visible, seam blur gone
        el.style.opacity     = "1";
        if (blurEl) blurEl.style.opacity = "0";
      } else if (top <= fadeStart) {
        // Fade zone — stats fades in, blur fades out inversely
        const t = 1 - top / fadeStart;
        el.style.opacity     = String(t);
        if (blurEl) blurEl.style.opacity = String(1 - t);
      } else if (top <= vh) {
        // Stats entering from below — hidden, full seam blur
        el.style.opacity     = "0";
        if (blurEl) blurEl.style.opacity = "1";
      } else {
        // Stats far below — transition not active
        el.style.opacity     = "0";
        if (blurEl) blurEl.style.opacity = "0";
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <>
      {/* Seam blur — fixed at viewport bottom, only active during Hero→Stats transition.
          Blurs and creams the boundary between Hero panel and Stats burst frame 1.
          Fades out inversely as Stats fades in; gone completely when Stats is locked. */}
      <div
        ref={blurRef}
        aria-hidden="true"
        style={{
          position:            "fixed",
          bottom:              0,
          left:                0,
          right:               0,
          height:              "14vh",
          background:          "linear-gradient(to bottom, rgba(250,248,245,0) 0%, #faf8f5 65%)",
          backdropFilter:      "blur(14px)",
          WebkitBackdropFilter:"blur(14px)",
          opacity:             0,
          pointerEvents:       "none",
          zIndex:              30,
        }}
      />

      {/* Stats wrapper — opacity controlled by scroll position */}
      <div ref={ref} style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  );
}
