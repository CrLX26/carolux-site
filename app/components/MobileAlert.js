"use client";

// ── MobileAlert ──────────────────────────────────────────────────────────────
// The desktop scroll-tunnel delivers the "your attic is losing money" beat as a
// scroll-driven cross-dissolve between Hero and Stats. Mobile has no tunnel, so
// this rebuilds it as a self-contained scroll moment:
//   1. As the hero fades out above, a full-bleed ATTIC photo fades in here.
//   2. The loss-aversion line writes itself word-by-word as you scroll.
//   3. It cools to cream and dissolves into the Stats burst.
//
// SAFE BY DESIGN:
//   • Rendered in page.js between <Hero/> and <Stats/>, but display:none on
//     desktop (>767px) — zero height there, so the desktop Hero→Stats overlap is
//     untouched.
//   • Progress from a live getBoundingClientRect scroll listener (Hero/Stats
//     pattern), robust across the display:none→block flip on real devices.
//   • PLACEHOLDER IMAGE: attic-20260516_132823.jpg — swap for the final graded
//     WebP when ready (just change the src).

import { useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { HERO } from "../lib/content";

const ATTIC_SRC = "/images/attic-20260516_132823.jpg"; // placeholder — swap for final WebP

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

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

  const outerRef = useRef(null); // scroll tunnel — drives progress
  const imgRef   = useRef(null); // attic image wrapper — Ken Burns
  const enterRef = useRef(null); // cream overlay fading OUT as the attic fades in
  const exitRef  = useRef(null); // cream overlay fading IN as it dissolves to Stats
  const wordRefs = useRef([]);

  // Word sequence with a global index for staggered scroll reveal.
  let gi = 0;
  const pre  = HERO.secondaryPre.split(" ").map((w)  => ({ w, i: gi++ }));
  const main = HERO.secondaryMain.split(" ").map((w) => ({ w, i: gi++ }));
  const post = HERO.secondaryPost.split(" ").map((w) => ({ w, i: gi++ }));
  const total = gi;

  useEffect(() => {
    if (!isMobile) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = wordRefs.current;

    if (reduce) {
      els.forEach((el) => { if (el) { el.style.opacity = "1"; el.style.transform = "none"; } });
      if (imgRef.current)  imgRef.current.style.transform = "scale(1.05)";
      if (enterRef.current) enterRef.current.style.opacity = "0";
      if (exitRef.current)  exitRef.current.style.opacity  = "0";
      return;
    }

    // Words write across progress 0.22 → 0.78 (after the attic has faded in).
    const WORD_START = 0.22;
    const WORD_END = 0.78;
    const step = (WORD_END - WORD_START) / Math.max(1, total);

    let raf = null;
    const render = () => {
      raf = null;
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = rect.height - vh;
      const p = travel > 0 ? clamp01(-rect.top / travel) : 0;

      // Attic fades IN (cream → photo) over the first 16% of the section.
      if (enterRef.current) enterRef.current.style.opacity = String(1 - clamp01(p / 0.16));
      // Cream fades IN over the last stretch → dissolves into the Stats burst.
      if (exitRef.current) exitRef.current.style.opacity = String(clamp01((p - 0.82) / 0.16));
      // Slow Ken Burns on the attic.
      if (imgRef.current) imgRef.current.style.transform = `scale(${1.04 + 0.1 * p})`;

      // Word-by-word reveal.
      els.forEach((wEl, i) => {
        if (!wEl) return;
        const s = WORD_START + i * step;
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
    render();
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

  // Strong dark halo so warm copy stays legible over the busy attic photo.
  const HALO = "0 0 2px rgba(0,0,0,0.85), 0 1px 14px rgba(0,0,0,0.8), 0 0 36px rgba(0,0,0,0.6)";

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
          background:     "#0a0807",
        }}
      >
        {/* Attic photo — full bleed, slow Ken Burns */}
        <div ref={imgRef} style={{ position: "absolute", inset: 0, transform: "scale(1.04)", willChange: "transform" }}>
          <Image
            src={ATTIC_SRC}
            alt=""
            fill
            quality={65}
            sizes="100vw"
            loading="lazy"
            className="object-[50%_45%]"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Dark contrast scrim — strong center so the copy reads over the photo */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 92% 66% at 50% 50%, rgba(6,5,4,0.82) 0%, rgba(6,5,4,0.55) 52%, rgba(6,5,4,0.4) 100%)",
          }}
        />

        {/* Warm light glow from above — implies heat/money escaping the attic */}
        <div
          aria-hidden="true"
          className="ma-heat"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 50% at 50% 16%, rgba(255,150,60,0.22) 0%, transparent 60%)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />

        {/* Grain — matches Hero/Stats texture */}
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

        {/* Top + bottom cream edge fades — soften the seams into hero / Stats */}
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "14%", background: "linear-gradient(to bottom, #faf8f5 0%, transparent 100%)", zIndex: 6, pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "16%", background: "linear-gradient(to top, #faf8f5 0%, transparent 100%)", zIndex: 6, pointerEvents: "none" }} />

        {/* ── Copy — writes word-by-word on scroll ──────────────────────────── */}
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
              color: "#ffc98f",
              textShadow: HALO,
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
              color: "#fdf4e9",
              textShadow: HALO,
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
              color: "#ffc98f",
              textShadow: HALO,
            }}
          >
            {renderWords(post)}
          </p>
        </div>

        {/* Cream cross-fades — attic fades IN at entry, cream fades IN at exit */}
        <div ref={enterRef} aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#faf8f5", opacity: 1, zIndex: 8, pointerEvents: "none" }} />
        <div ref={exitRef}  aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#faf8f5", opacity: 0, zIndex: 9, pointerEvents: "none" }} />
      </div>
    </section>
  );
}
