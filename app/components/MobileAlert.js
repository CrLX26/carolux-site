"use client";

// ── MobileAlert ──────────────────────────────────────────────────────────────
// The desktop scroll-tunnel delivers the "your attic is losing money" beat as a
// scroll-driven thermal cross-dissolve between Hero and Stats. Mobile has no
// tunnel, so that beat was missing. This rebuilds it as a self-contained
// THERMAL MOMENT — the site's signature heat-vision look, full bleed, with the
// loss-aversion line revealing word-by-word as you scroll, then dissolving into
// the Stats burst.
//
// SAFE BY DESIGN:
//   • Rendered in page.js BETWEEN <Hero/> and <Stats/>, but display:none on
//     desktop (>767px). A display:none box has zero height, so Stats still sits
//     directly after Hero and the desktop Hero→Stats negative-margin overlap is
//     completely untouched.
//   • Progress is computed from a live getBoundingClientRect scroll listener
//     (the same pattern Hero/Stats use) — NOT framer useScroll, which mis-caches
//     measurements across the display:none→block flip. Robust on real devices.
//   • Local sticky tunnel works with native mobile scroll; Lenis is off on touch.

import { useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { HERO } from "../lib/content";

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

// Width-based "is this a phone?" — matches Hero's isMobile (max-width: 767px).
function subscribe(cb) {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function MobileAlert() {
  const isMobile = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );

  const outerRef     = useRef(null); // scroll tunnel — drives progress
  const imgRef       = useRef(null); // thermal image wrapper — Ken Burns
  const enterRef     = useRef(null); // cream overlay fading OUT on entry
  const exitRef      = useRef(null); // cream overlay fading IN on exit
  const wordRefs     = useRef([]);

  // Build the word sequence with a global index for staggered scroll reveal.
  let gi = 0;
  const pre  = HERO.secondaryPre.split(" ").map((w)  => ({ w, i: gi++ }));
  const main = HERO.secondaryMain.split(" ").map((w) => ({ w, i: gi++ }));
  const post = HERO.secondaryPost.split(" ").map((w) => ({ w, i: gi++ }));
  const total = gi;

  useEffect(() => {
    if (!isMobile) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = wordRefs.current;

    // Reduced motion: show everything statically, skip the scroll choreography.
    if (reduce) {
      els.forEach((el) => { if (el) { el.style.opacity = "1"; el.style.transform = "none"; } });
      if (imgRef.current)   imgRef.current.style.transform = "scale(1.1)";
      if (enterRef.current) enterRef.current.style.opacity = "0";
      if (exitRef.current)  exitRef.current.style.opacity  = "0";
      return;
    }

    const step = 0.6 / Math.max(1, total); // word reveal spans progress 0.16 → 0.76

    let raf = null;
    const render = () => {
      raf = null;
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = rect.height - vh;
      const p = travel > 0 ? clamp01(-rect.top / travel) : 0;

      // Ken Burns on the thermal image
      if (imgRef.current) imgRef.current.style.transform = `scale(${1.08 + 0.16 * p})`;

      // Cream cross-fades: in from cream(hero), out into cream(Stats)
      if (enterRef.current) enterRef.current.style.opacity = String(1 - clamp01(p / 0.16));
      if (exitRef.current)  exitRef.current.style.opacity  = String(clamp01((p - 0.82) / 0.16));

      // Word-by-word reveal
      els.forEach((wEl, i) => {
        if (!wEl) return;
        const s = 0.16 + i * step;
        const e = s + step * 1.7; // overlap neighbours so it flows
        let o, y;
        if (p <= s) { o = 0; y = 18; }
        else if (p >= e) { o = 1; y = 0; }
        else { const t = (p - s) / (e - s); o = t; y = 18 * (1 - t); }
        wEl.style.opacity = String(o);
        wEl.style.transform = `translateY(${y}px)`;
      });
    };

    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(render); };
    render(); // initial paint
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [isMobile, total]);

  const wordBase = {
    display: "inline-block",
    marginRight: "0.26em",
    opacity: 0,
    transform: "translateY(18px)",
    willChange: "opacity, transform",
  };

  const renderWords = (arr, style) =>
    arr.map(({ w, i }) => (
      <span
        key={i}
        ref={(el) => { wordRefs.current[i] = el; }}
        style={{ ...wordBase, ...style }}
      >
        {w}
      </span>
    ));

  return (
    <section
      ref={outerRef}
      aria-label="Your attic could be quietly costing you money every month"
      style={{
        display:    isMobile ? "block" : "none",
        position:   "relative",
        height:     "210svh",
        background: "#faf8f5",
      }}
    >
      <div
        style={{
          position:       "sticky",
          top:            0,
          height:         "100svh",
          overflow:       "clip",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          background:     "#0a0a0a",
        }}
      >
        {/* Thermal house — the brand's signature heat-vision look, full bleed */}
        <div ref={imgRef} style={{ position: "absolute", inset: 0, transform: "scale(1.08)", willChange: "transform" }}>
          <Image
            src="/images/house-thermal4.webp"
            alt=""
            fill
            quality={65}
            sizes="100vw"
            loading="lazy"
            className="object-center"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Dark contrast scrim — keeps the copy legible over the hot image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 85% 62% at 50% 50%, rgba(8,6,4,0.80) 0%, rgba(8,6,4,0.5) 55%, rgba(8,6,4,0.28) 100%)",
          }}
        />

        {/* Living heat glow — gentle CSS pulse, screen-blended over the image */}
        <div
          aria-hidden="true"
          className="ma-heat"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle 46% at 50% 48%, rgba(255,90,20,0.34) 0%, transparent 62%)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />

        {/* Grain — matches Hero/Stats texture for a seamless surface */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: GRAIN_BG,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            mixBlendMode: "overlay",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Top + bottom cream edge fades — dissolve the panel edges into the
            cream hero above and cream Stats below (no hard section seams) */}
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "16%", background: "linear-gradient(to bottom, #faf8f5 0%, transparent 100%)", zIndex: 6, pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(to top, #faf8f5 0%, transparent 100%)", zIndex: 6, pointerEvents: "none" }} />

        {/* ── Copy — reveals word-by-word on scroll ─────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            textAlign: "center",
            padding: "0 clamp(1.5rem, 8vw, 3rem)",
            maxWidth: "20ch",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-label)",
              fontSize: "clamp(0.8rem, 3.4vw, 1rem)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ffb877",
              textShadow: "0 0 1px rgba(0,0,0,0.7), 0 1px 16px rgba(0,0,0,0.6)",
            }}
          >
            {renderWords(pre)}
          </p>

          <p
            style={{
              margin: "clamp(0.7rem, 2vh, 1.25rem) 0",
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 14vw, 5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "#fff6ec",
              textShadow: "0 0 1px rgba(0,0,0,0.55), 0 2px 30px rgba(0,0,0,0.55), 0 0 44px rgba(255,110,40,0.45)",
            }}
          >
            {renderWords(main)}
          </p>

          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-label)",
              fontSize: "clamp(0.8rem, 3.4vw, 1rem)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ffb877",
              textShadow: "0 0 1px rgba(0,0,0,0.7), 0 1px 16px rgba(0,0,0,0.6)",
            }}
          >
            {renderWords(post)}
          </p>
        </div>

        {/* Cream cross-fades — enter from the cream hero, exit into cream Stats */}
        <div ref={enterRef} aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#faf8f5", opacity: 1, zIndex: 8, pointerEvents: "none" }} />
        <div ref={exitRef}  aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#faf8f5", opacity: 0, zIndex: 9, pointerEvents: "none" }} />
      </div>
    </section>
  );
}
