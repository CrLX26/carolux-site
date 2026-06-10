"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STATS, STATS_CAVEAT } from "../lib/content";

// Identical grain to Hero — ensures seamless texture across the Hero→Stats boundary
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

// ── External store: pointer coarse (touch) detection ─────────────────────────
function subscribePointer(cb) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getPointerSnapshot      = () => window.matchMedia("(pointer: coarse)").matches;
const getPointerServerSnapshot = () => false;

// ── External store: narrow desktop (≤ 860px) → 2×2 instead of 4-across ────────
// Replaces auto-fit, which over-creates columns on wide screens and clumps the
// four stats to the left. Deterministic: 4-across when wide, 2×2 when narrow.
function subscribeNarrow(cb) {
  const mq = window.matchMedia("(max-width: 860px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getNarrowSnapshot       = () => window.matchMedia("(max-width: 860px)").matches;
const getNarrowServerSnapshot = () => false;

// ── Cumulative reveal — entry windows only ────────────────────────────────────
// Each tuple: [enterStart, enterEnd] in scroll progress 0→1.
// The hero figure lands first and holds; the two supporting facts follow.
// All three are present when the burst ends. (Cumulative — no exit phase.)
const WINDOWS = [
  [0.10, 0.24],   // HERO   — 15% lower costs (lands first, biggest weight)
  [0.40, 0.54],   // support — 90%+ under-insulated
  [0.62, 0.76],   // support — R-49
];

// Maps scroll progress to opacity + Y for one stat.
// Cumulative: once fully revealed, stays at opacity 1, Y 0 — no exit phase.
function getStatStyle(v, [enterStart, enterEnd]) {
  if (v <= enterStart) return { opacity: 0, y: 60 };
  if (v >= enterEnd)   return { opacity: 1, y: 0 };
  const p = (v - enterStart) / (enterEnd - enterStart);
  return { opacity: p, y: 60 * (1 - p) };
}

export default function Stats() {
  const containerRef = useRef(null); // outer scroll tunnel
  const sectionRef   = useRef(null); // inner sticky viewport
  const videoRef     = useRef(null);
  const wrapperRef   = useRef(null); // entrance/cross-fade layer (mobile opacity)

  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const statRefs = [stat1Ref, stat2Ref, stat3Ref];

  const isTouch = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot,
  );

  const isNarrow = useSyncExternalStore(
    subscribeNarrow,
    getNarrowSnapshot,
    getNarrowServerSnapshot,
  );

  // ── Nav height — used to close the gap between Hero releasing and Stats pinning ──
  // Gap = navHeight + 100svh. A negative marginTop of that amount on the outer
  // container makes Stats pin at exactly the scroll position Hero releases.
  const [navH, setNavH] = useState(64);
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setNavH(header.getBoundingClientRect().height);
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Scroll progress across the full scroll tunnel ────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Desktop entrance: pure opacity CROSS-FADE (no movement) ───────────────
  // The panel slides up into its pin at opacity 0 (invisible), then cross-fades
  // in over the alert while pinned — no scale punch, no rise. Fully opaque (and
  // the burst starts) by VID_START. The hero alert behind it stays put; the
  // fade-in over it IS the cross-dissolve.
  // Opacity cross-fade with the alert — same mechanism on both platforms. The
  // 3rd keyframe pins it at 1 so the section never fades back out deeper in the
  // tunnel. Mobile's tunnel is shorter, so its fade spans a wider fraction.
  const entranceOpacity = useTransform(
    scrollYProgress,
    isTouch ? [0.05, 0.22, 1] : [0.04, 0.12, 1],
    [0, 1, 1],
  );

  // ── Desktop: capability-gated. ───────────────────────────────────────────
  // Per-frame video seeking (the scrub) is smooth on Chromium but stutters on
  // Firefox and weak hardware. So: Chromium → rAF scrub; Firefox / reduced-motion
  // / low-memory → plain autoplay-loop (no seeking). Stat reveals stay
  // scroll-driven in BOTH paths, so the section reads the same either way.
  useEffect(() => {
    const video = videoRef.current;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFirefox      = /firefox/i.test(navigator.userAgent);
    const lowMemory      = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
    // Mobile/touch never scrubs (per-frame seeking is far too heavy there); it
    // takes the looping fallback path like Firefox/low-power.
    const canScrub       = !isTouch && !prefersReduced && !isFirefox && !lowMemory;

    // Opacity-only reveal — the stats fade in place as the burst plays, no rise.
    const revealStats = (v) => {
      statRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const { opacity } = getStatStyle(v, WINDOWS[i]);
        ref.current.style.opacity = String(opacity);
      });
    };

    // Burst timing window (scroll progress). The burst is held at frame 0 until
    // the section has cross-faded in (≈ end of entranceOpacity) so it only begins
    // once the panel is fully visible. VID_END only matters for the scrub.
    const VID_START = isTouch ? 0.22 : 0.12, VID_END = 0.82, DUR = 7;

    // Mobile reveal is driven by the VIDEO clock, not scroll: once the burst is
    // playing, each stat appears at a fixed point in the clip and the LAST one
    // lands ~0.5s before the burst ends. (Desktop fallback stays scroll-driven.)
    const hideStats = () => statRefs.forEach((r) => { if (r.current) r.current.style.opacity = "0"; });
    const revealByTime = () => {
      if (!video) return;
      const dur   = video.duration && !isNaN(video.duration) ? video.duration : DUR;
      const t     = video.currentTime;
      // 15% early, 90%+ mid, R-49 a half-second before the burst finishes.
      const times = [Math.min(0.4, dur * 0.08), dur * 0.48, Math.max(0, dur - 0.5)];
      statRefs.forEach((ref, i) => { if (ref.current && t >= times[i]) ref.current.style.opacity = "1"; });
    };

    // ── Fallback (mobile / Firefox / reduced-motion / low-memory): no per-frame
    //    seeking. Gate on scroll progress: lazy-load as it approaches, then start
    //    fresh from frame 0 once the section is fully visible (v ≥ VID_START).
    //    Mobile plays the clip ONCE (no loop) and reveals stats off the video
    //    clock; Firefox/low-power loops and reveals on scroll.
    if (!canScrub) {
      if (video) video.loop = !isTouch;
      if (isTouch && video) video.addEventListener("timeupdate", revealByTime);
      let playing = false, loaded = false;
      const onChange = (v) => {
        if (!isTouch) revealStats(v);
        if (!video) return;
        if (!loaded && v >= VID_START - 0.25) {
          video.preload = "auto";
          video.load();
          loaded = true;
        }
        if (v >= VID_START && v < 0.999) {
          if (!playing) {
            try { video.currentTime = 0; } catch { /* not seekable yet */ }
            if (isTouch) hideStats();      // start hidden; revealByTime fills them
            video.play().catch(() => {});
            playing = true;
          }
        } else if (playing) {
          video.pause();
          if (isTouch) { try { video.currentTime = 0; } catch {} hideStats(); }
          playing = false;
        }
      };
      const unsub = scrollYProgress.on("change", onChange);
      return () => {
        unsub();
        if (isTouch && video) video.removeEventListener("timeupdate", revealByTime);
      };
    }

    // ── Scrub path (Chromium) ──
    // preload="none" in markup keeps it from competing with the hero on first
    // load; desktop eagerly loads here because the scrub depends on the frames.
    if (video) {
      video.preload = "auto";
      video.load();
      video.pause();
    }

    // rAF loop lerps video.currentTime toward target — smooth follow.
    let targetTime = 0;
    let rafId      = null;

    const tick = () => {
      const dur = video?.duration;
      if (video && dur && !isNaN(dur)) {
        const clamped = Math.max(0, Math.min(targetTime, dur));
        const delta   = clamped - video.currentTime;
        if (Math.abs(delta) > 0.001) {
          const next = video.currentTime + delta * 0.20;
          if (typeof video.fastSeek === "function") {
            video.fastSeek(next);
          } else {
            video.currentTime = next;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Scroll listener: scrub video + drive each stat's opacity. Held at frame 0
    // until the section is fully visible (VID_START), then scrubbed to its end by
    // VID_END so the settled pile holds while the visitor reads.
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const p = Math.max(0, Math.min(1, (v - VID_START) / (VID_END - VID_START)));
      targetTime = p * DUR;
      revealStats(v);
    });

    return () => {
      cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, [scrollYProgress, isTouch]);

  return (
    <div
      ref={containerRef}
      className="burst-reveal"
      style={{
        // Both platforms are a sticky tunnel. Mobile's holds the section pinned
        // long enough for the burst to play through (~7s) while the stats reveal
        // off the video clock.
        height:     isTouch ? "280svh" : "420vh",
        position:   "relative",
        // Mobile only: the hero's inner layers carry z-indices up to 35 and the
        // hero outer creates no stacking context, so they leak into the root and
        // would paint OVER this (z:auto) section during the overlap. A z-index
        // above 35 (and below the nav's 100) keeps the cross-fade on top.
        zIndex:     isTouch ? 50 : undefined,
        // Transparent so the hero alert shows through while the section
        // cross-fades in over it. The cream lives INSIDE the fading layer (and
        // the page body is cream too, so any gap reads cream regardless).
        background: "transparent",
        // Overlap the hero so the section pins WHILE the alert is still on screen,
        // then cross-fades in over it (entranceOpacity) — a true cross-dissolve,
        // no slide, no dead-cream gap. Desktop pulls ~2 screens; mobile pulls
        // ~170svh so the pin lands on the alert's hold (u≈1.9) and the cross-fade
        // completes before the hero's own cool-to-cream.
        marginTop:  isTouch ? `calc(-170svh - ${navH}px)` : `calc(-200svh - ${navH}px)`,
      }}
    >
      <div
        ref={sectionRef}
        style={{
          position: "sticky",
          top:      0,
          height:   "100svh",
          width:    "100%",
          overflow: "clip",
        }}
      >
        {/* ENTRANCE-WRAPPER — opacity cross-fade with the alert (desktop). All of
            the section's pixels (cream + video + lockup) fade in together, so the
            alert behind shows through until the fade completes. No movement. */}
        <motion.div
          ref={wrapperRef}
          style={{
            position: "absolute",
            inset:    0,
            // Scroll-linked cross-fade with the alert (both platforms).
            opacity:  entranceOpacity,
          }}
        >

        {/* Cream backdrop — lives inside the fading layer so the brand cream
            cross-fades in with everything else (container is transparent). */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#faf8f5", zIndex: 0 }} />

        {/* ── Video background ───────────────────────────────────────────────
            Desktop scrubs frame-by-frame, so it gets the keyframe-dense scrub
            file. Mobile just loops, so it gets the smaller mobile encode. `key`
            forces a reload when isTouch resolves after mount (the src changes). */}
        <video
          ref={videoRef}
          key={isTouch ? "mobile" : "desktop"}
          src={isTouch ? "/videos/insulation-burst-bg2-mobile.mp4" : "/videos/insulation-burst-bg2-scrub.mp4"}
          preload="none"
          playsInline
          muted
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            objectFit:     "cover",
            // Mobile: a gentle zoom lifts the petal column behind the numbers.
            // The clip plays through from frame 0 here, so the explosion fills the
            // frame on its own and heavy zoom is no longer needed. Desktop = full.
            transform:     isTouch ? "scale(1.3)" : "none",
            transformOrigin: "50% 60%",
            zIndex:        0,
            pointerEvents: "none",
          }}
        />

        {/* Grain overlay — matches Hero grain exactly, eliminates Hero→Stats texture seam */}
        <div
          aria-hidden="true"
          style={{
            position:         "absolute",
            inset:            0,
            pointerEvents:    "none",
            backgroundImage:  GRAIN_BG,
            backgroundRepeat: "repeat",
            backgroundSize:   "200px 200px",
            mixBlendMode:     "multiply",
            opacity:          0.55,
            zIndex:           6,
          }}
        />

        {/* Light cream scrim */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            background: "rgba(250,248,245,0.38)",
            zIndex:     1,
          }}
        />

        {/* Edge fades — video bleeds into page on all four sides */}
        {[
          { bottom: 0, left: 0, right:  0,     height: "18%", background: "linear-gradient(to top,    #faf8f5 0%, transparent 100%)" },
          { top: 0,    left: 0, bottom: 0,     width:  "18%", background: "linear-gradient(to right,  #faf8f5 0%, transparent 100%)" },
          { top: 0,    right: 0, bottom: 0,    width:  "18%", background: "linear-gradient(to left,   #faf8f5 0%, transparent 100%)" },
        ].map((edgeStyle, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{ position: "absolute", ...edgeStyle, zIndex: 5, pointerEvents: "none" }}
          />
        ))}

        {/* A soft cream wash only under the lockup column (left third) keeps the
            navy text legible without paling the burst — far lighter than the old
            full-bleed scrim, and it fades out before the dense centre of the
            burst so the true pink reads. */}
        {!isTouch && (
          <div
            aria-hidden="true"
            style={{
              position:   "absolute",
              inset:      0,
              zIndex:     8,
              background:
                "linear-gradient(100deg, rgba(250,248,245,0.62) 0%, rgba(250,248,245,0.30) 22%, transparent 40%)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Desktop: editorial lockup ───────────────────────────────────
            One dominant figure (15%) anchored lower-left at display scale, two
            demoted supporting facts beneath it. Breaks the old four-up grid —
            single message per section. Burst plays to the right / above.
            JS drives opacity + translateY via refs — no CSS transitions needed. */}
        {!isTouch && (() => {
          const hero = STATS[0];
          const supports = STATS.slice(1);
          return (
          <div
            role="region"
            aria-label="Why insulation pays off"
            style={{
              position:       "absolute",
              left:           0,
              bottom:         0,
              top:            0,
              width:          "100%",
              maxWidth:       "min(640px, 52vw)",
              zIndex:         10,
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "flex-end",
              alignItems:     "flex-start",
              padding:        "0 clamp(28px, 6vw, 110px) clamp(48px, 9vh, 104px)",
              pointerEvents:  "none",
            }}
          >
            {/* ── HERO figure ── */}
            <div
              ref={statRefs[0]}
              style={{ opacity: 0, textAlign: "left" }}
            >
              {hero.qualifier && (
                <span
                  style={{
                    display:       "block",
                    fontFamily:    "var(--font-label)",
                    fontSize:      "clamp(12px, 1.05vw, 15px)",
                    fontWeight:    500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color:         "#4a90a4",
                    marginBottom:  "clamp(4px, 0.8vh, 10px)",
                  }}
                >
                  {hero.qualifier}
                </span>
              )}
              <div
                aria-label={`${hero.prefix}${hero.countTo}${hero.suffix}`}
                style={{
                  fontFamily:    "var(--font-cormorant)",
                  fontWeight:    400,
                  fontSize:      "clamp(108px, 17vw, 280px)",
                  lineHeight:    0.82,
                  color:         "#0d1d2b",
                  textShadow:    "0 2px 28px rgba(250,248,245,0.7)",
                  display:       "flex",
                  alignItems:    "baseline",
                  letterSpacing: "-0.045em",
                }}
              >
                {hero.prefix && (
                  <span style={{ fontSize: "0.42em", letterSpacing: "0.02em", marginRight: "4px" }}>
                    {hero.prefix}
                  </span>
                )}
                <span>{hero.countTo}</span>
                {hero.suffix && (
                  <span style={{ fontSize: "0.40em", alignSelf: "flex-start", paddingTop: "0.18em", marginLeft: "4px" }}>
                    {hero.suffix}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontFamily:    "var(--font-cormorant)",
                  fontWeight:    400,
                  fontSize:      "clamp(20px, 2.1vw, 32px)",
                  lineHeight:    1.18,
                  color:         "#1a2b3c",
                  margin:        "clamp(10px, 1.6vh, 22px) 0 0",
                  maxWidth:      "20ch",
                }}
              >
                {hero.label}
              </p>
              {hero.source && (
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans)",
                    fontSize:      "clamp(10px, 0.85vw, 12px)",
                    fontStyle:     "italic",
                    color:         "rgba(13,29,43,0.66)",
                    margin:        "clamp(8px, 1vh, 14px) 0 0",
                    letterSpacing: "0.04em",
                  }}
                >
                  {hero.source}
                </p>
              )}
            </div>

            {/* ── Supporting facts ── demoted scale + muted, set below the hero
                 with a teal hairline divider. Row on wide screens, stacked when
                 the panel is narrow. */}
            <div
              aria-hidden="false"
              style={{
                display:        "flex",
                flexDirection:  isNarrow ? "column" : "row",
                gap:            isNarrow ? "clamp(14px, 2vh, 22px)" : "clamp(32px, 4vw, 56px)",
                marginTop:      "clamp(26px, 4.5vh, 52px)",
                paddingTop:     "clamp(20px, 3vh, 30px)",
                borderTop:      "1px solid rgba(74,144,164,0.32)",
                alignItems:     isNarrow ? "flex-start" : "baseline",
              }}
            >
              {supports.map((stat, i) => (
                <div
                  key={i}
                  ref={statRefs[i + 1]}
                  style={{
                    opacity:    0,
                    display:    "flex",
                    alignItems: "baseline",
                    gap:        "clamp(8px, 0.9vw, 14px)",
                  }}
                >
                  <span
                    aria-label={`${stat.prefix}${stat.countTo}${stat.suffix}`}
                    style={{
                      fontFamily:    "var(--font-cormorant)",
                      fontWeight:    400,
                      fontSize:      "clamp(34px, 4.2vw, 60px)",
                      lineHeight:    0.9,
                      color:         "rgba(13,29,43,0.9)",
                      letterSpacing: "-0.03em",
                      whiteSpace:    "nowrap",
                    }}
                  >
                    {stat.prefix}{stat.countTo}
                    {stat.suffix && (
                      <span style={{ fontSize: "0.5em" }}>{stat.suffix}</span>
                    )}
                  </span>
                  <span
                    style={{
                      fontFamily:    "var(--font-dm-sans)",
                      fontSize:      "clamp(12px, 1vw, 15px)",
                      fontWeight:    500,
                      lineHeight:    1.35,
                      color:         "rgba(26,43,60,0.78)",
                      maxWidth:      "17ch",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Caveat — every figure is an average, not a guarantee. Folds the
                per-stat sources into one line. */}
            <p
              style={{
                margin:     "clamp(18px, 2.6vh, 28px) 0 0",
                maxWidth:   "56ch",
                textAlign:  "left",
                fontFamily: "var(--font-dm-sans)",
                fontSize:   "clamp(10px, 0.85vw, 12px)",
                fontStyle:  "italic",
                lineHeight: 1.6,
                color:      "rgba(13,29,43,0.6)",
              }}
            >
              {STATS_CAVEAT}
            </p>
          </div>
          );
        })()}

        {/* ── Mobile: hero figure + two supporting facts ─────────────────── */}
        {isTouch && (() => {
          const hero = STATS[0];
          const supports = STATS.slice(1);
          return (
          <div
            role="region"
            aria-label="Why insulation pays off"
            style={{
              position:       "absolute",
              inset:          0,
              zIndex:         10,
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "center",
              alignItems:     "center",
              padding:        "0 clamp(24px, 7vw, 40px) clamp(40px, 7vh, 64px)",
            }}
          >
            {/* ── HERO figure ── */}
            <div
              ref={statRefs[0]}
              style={{
                opacity:    0,
                transition: "opacity 550ms ease",
                textAlign:  "center",
              }}
            >
              {hero.qualifier && (
                <span
                  style={{
                    display:       "block",
                    fontFamily:    "var(--font-label)",
                    fontSize:      "clamp(11px, 3vw, 13px)",
                    fontWeight:    500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color:         "#4a90a4",
                    marginBottom:  "6px",
                  }}
                >
                  {hero.qualifier}
                </span>
              )}
              <div
                aria-label={`${hero.prefix}${hero.countTo}${hero.suffix}`}
                style={{
                  fontFamily:     "var(--font-cormorant)",
                  fontWeight:     400,
                  fontSize:       "clamp(96px, 30vw, 150px)",
                  lineHeight:     0.86,
                  color:          "#0d1d2b",
                  textShadow:     "0 1px 6px rgba(250,248,245,0.6)",
                  display:        "flex",
                  alignItems:     "baseline",
                  justifyContent: "center",
                  letterSpacing:  "-0.04em",
                }}
              >
                {hero.prefix && (
                  <span style={{ fontSize: "0.46em", letterSpacing: "0.03em", marginRight: "2px" }}>
                    {hero.prefix}
                  </span>
                )}
                <span>{hero.countTo}</span>
                {hero.suffix && (
                  <span style={{ fontSize: "0.42em", alignSelf: "flex-start", paddingTop: "0.14em", marginLeft: "3px" }}>
                    {hero.suffix}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize:   "clamp(18px, 5vw, 24px)",
                  lineHeight: 1.2,
                  color:      "#1a2b3c",
                  margin:     "clamp(10px, 2vw, 16px) auto 0",
                  maxWidth:   "18ch",
                }}
              >
                {hero.label}
              </p>
            </div>

            {/* ── Supporting facts ── stacked, demoted, teal hairline above ── */}
            <div
              style={{
                display:       "flex",
                flexDirection: "column",
                gap:           "clamp(12px, 3vw, 18px)",
                alignItems:    "center",
                marginTop:     "clamp(26px, 6vw, 38px)",
                paddingTop:    "clamp(20px, 4vw, 26px)",
                borderTop:     "1px solid rgba(74,144,164,0.3)",
                width:         "min(100%, 360px)",
              }}
            >
              {supports.map((stat, i) => (
                <div
                  key={i}
                  ref={statRefs[i + 1]}
                  style={{
                    opacity:    0,
                    transition: "opacity 550ms ease",
                    display:    "flex",
                    alignItems: "baseline",
                    gap:        "10px",
                    textAlign:  "left",
                  }}
                >
                  <span
                    aria-label={`${stat.prefix}${stat.countTo}${stat.suffix}`}
                    style={{
                      fontFamily:    "var(--font-cormorant)",
                      fontWeight:    400,
                      fontSize:      "clamp(34px, 9vw, 44px)",
                      lineHeight:    0.9,
                      color:         "rgba(13,29,43,0.9)",
                      letterSpacing: "-0.03em",
                      whiteSpace:    "nowrap",
                    }}
                  >
                    {stat.prefix}{stat.countTo}
                    {stat.suffix && <span style={{ fontSize: "0.5em" }}>{stat.suffix}</span>}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize:   "clamp(11px, 3vw, 13px)",
                      fontWeight: 500,
                      lineHeight: 1.35,
                      color:      "rgba(26,43,60,0.78)",
                      maxWidth:   "18ch",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Caveat — folds the per-stat sources into one line */}
            <p
              style={{
                marginTop:  "clamp(18px, 3vh, 28px)",
                maxWidth:   "34ch",
                textAlign:  "center",
                fontFamily: "var(--font-dm-sans)",
                fontSize:   "clamp(9px, 2.4vw, 11px)",
                fontStyle:  "italic",
                lineHeight: 1.55,
                color:      "rgba(26,43,60,0.7)",
                padding:    "0 clamp(16px, 6vw, 32px)",
              }}
            >
              {STATS_CAVEAT}
            </p>
          </div>
          );
        })()}

        </motion.div>{/* /ENTRANCE-WRAPPER */}
      </div>
    </div>
  );
}
