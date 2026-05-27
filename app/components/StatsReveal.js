"use client";

import { useRef, useEffect } from "react";

export default function StatsReveal({ children }) {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    // Mobile: remove overlay immediately — touch Stats handles its own reveals
    if (window.matchMedia("(pointer: coarse)").matches) {
      overlay.style.opacity = "0";
      return;
    }

    const check = () => {
      const top       = wrapper.getBoundingClientRect().top;
      const vh        = window.innerHeight;
      const fadeStart = vh * 0.5;

      if (top <= 0) {
        // Stats locked — overlay fully gone
        overlay.style.opacity = "0";
      } else if (top <= fadeStart) {
        // Fade zone: overlay retreats as Stats enters (top 0.5vh → 0)
        // Stats video shows through cream haze — bidirectional every pass
        overlay.style.opacity = String(top / fadeStart);
      } else {
        // Stats not yet in fade zone — full cream cover, no line
        overlay.style.opacity = "1";
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      {/* Cream overlay — exact Hero background colour (#faf8f5), position:absolute
          so it is always visually cream regardless of what body/page shows through.
          Fades from opaque → transparent as Stats locks, giving the milky
          cream-to-burst reveal the user wants. Bidirectional every scroll pass. */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          background:    "#faf8f5",
          pointerEvents: "none",
          zIndex:        100,
        }}
      />

      {/* Permanent top-seam feather — always cream at the very top of this
          wrapper, above the scroll-driven overlay (z 101 > 100).
          When Stats enters the viewport from below, the first pixels visible
          are this cream gradient, not a hard edge. Bidirectional — works the
          same whether scrolling down into Stats or back up through the seam. */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          right:      0,
          height:     "140px",
          background: "linear-gradient(to bottom, #faf8f5 0%, rgba(250,248,245,0) 100%)",
          pointerEvents: "none",
          zIndex:     101,
        }}
      />

      {children}
    </div>
  );
}
