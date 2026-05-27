"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STATS } from "../lib/content";

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

// ── Cumulative reveal — entry windows only ────────────────────────────────────
// Each tuple: [enterStart, enterEnd] in scroll progress 0→1.
// Stats fade in one by one as the burst plays — and STAY visible.
// All four are present when the burst ends.
const WINDOWS = [
  [0.12, 0.22],   // stat 1 — 15%  savings
  [0.36, 0.46],   // stat 2 — 90%+ under-insulated
  [0.60, 0.70],   // stat 3 — R-49
  [0.84, 0.94],   // stat 4 — 100%+ ROI
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

  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const stat4Ref = useRef(null);
  const statRefs = [stat1Ref, stat2Ref, stat3Ref, stat4Ref];

  const isTouch = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot,
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

  // ── Option A: scale-punch entrance (desktop only) ────────────────────────
  // Inner wrapper starts zoomed-in + low, snaps to rest over first 6% of the
  // scroll tunnel (≈ 25vh). Four-keyframe exponential decay: fast exit, hard land.
  //
  // To switch to Option B (Hero-driven pre-staging):
  //   1. Delete these two useTransform calls.
  //   2. Delete the motion.div wrapper in the JSX (search "ENTRANCE-WRAPPER").
  //   3. In page.js: pass heroScrollYProgress (from Hero's useScroll) into <Stats>.
  //   4. In Stats: accept heroScrollYProgress prop; add
  //      const stageY = useTransform(heroScrollYProgress, [0.87, 0.95, 1.0], [100, 30, 0]);
  //      and apply style={{ y: stageY }} to the sectionRef div.
  const entranceScale = useTransform(
    scrollYProgress,
    [0,    0.02, 0.07, 0.12],
    [1.30, 1.20, 1.06, 1.0],
  );
  const entranceY = useTransform(
    scrollYProgress,
    [0,    0.02, 0.07, 0.12],
    [120,  75,   18,   0],
  );

  // ── Desktop: rAF video scrub + cumulative scroll-driven stat reveals ──────
  useEffect(() => {
    if (isTouch) return;
    const video = videoRef.current;
    if (video) video.pause();

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

    // Scroll listener: scrub video + drive each stat's transform/opacity.
    // Stats reveal cumulatively — each enters once and remains visible.
    const unsubscribe = scrollYProgress.on("change", (v) => {
      targetTime = v * 2.5;
      statRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const { opacity, y } = getStatStyle(v, WINDOWS[i]);
        ref.current.style.opacity   = String(opacity);
        ref.current.style.transform = `translateY(${y}px)`;
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, [scrollYProgress, isTouch]);

  // ── Mobile: autoplay video + IntersectionObserver stat reveals ───────────
  useEffect(() => {
    if (!isTouch) return;
    const video = videoRef.current;
    if (video) {
      video.loop = true;
      video.play().catch(() => {});
    }
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          statRefs.forEach((ref, i) => {
            setTimeout(() => {
              if (!ref.current) return;
              ref.current.style.opacity   = "1";
              ref.current.style.transform = "translateY(0px)";
            }, i * 150);
          });
        } else {
          statRefs.forEach((ref) => {
            if (!ref.current) return;
            ref.current.style.opacity   = "0";
            ref.current.style.transform = "translateY(20px)";
          });
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isTouch]);

  return (
    <div
      ref={containerRef}
      className="burst-reveal"
      style={{
        height:     isTouch ? "100svh" : "420vh",
        position:   "relative",
        background: "#faf8f5",
        marginTop:  isTouch ? 0 : `calc(-100svh - ${navH}px)`,
      }}
    >
      <div
        ref={sectionRef}
        style={{
          position: isTouch ? "relative" : "sticky",
          top:      0,
          height:   "100svh",
          width:    "100%",
          overflow: "clip",
        }}
      >
        {/* ENTRANCE-WRAPPER — Option A scale-punch. Remove this motion.div (and its
            closing tag below) when switching to Option B. */}
        <motion.div
          style={{
            position:        "absolute",
            inset:           0,
            transformOrigin: "50% 65%",
            scale:           isTouch ? 1 : entranceScale,
            y:               isTouch ? 0 : entranceY,
          }}
        >

        {/* ── Video background ───────────────────────────────────────────── */}
        <video
          ref={videoRef}
          preload="auto"
          playsInline
          muted
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            objectFit:     "cover",
            zIndex:        0,
            pointerEvents: "none",
          }}
        >
          <source src="/videos/insulation-burst-bg-scrub.mp4" type="video/mp4" />
        </video>

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

        {/* ── Desktop: Four-column bottom band ─────────────────────────────
            Bottom 28% of the panel. Stats reveal cumulatively — each fades in
            once and stays. Upper 72% remains clear for burst video.
            JS drives opacity + translateY via refs — no CSS transitions needed. */}
        {!isTouch && (
          <div
            role="region"
            aria-label="Key statistics"
            style={{
              position:            "absolute",
              bottom:              0,
              left:                0,
              right:               0,
              height:              "28%",
              zIndex:              10,
              display:             "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              alignItems:          "center",
              pointerEvents:       "none",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                ref={statRefs[i]}
                style={{
                  opacity:       0,
                  transform:     "translateY(60px)",
                  textAlign:     "center",
                  padding:       "0 clamp(8px, 1.5vw, 28px)",
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                }}
              >
                {/* Teal accent rule — sits above number */}
                <div
                  aria-hidden="true"
                  style={{
                    width:        "24px",
                    height:       "1.5px",
                    background:   "#4a90a4",
                    marginBottom: "clamp(10px, 1.2vh, 18px)",
                    opacity:      0.8,
                  }}
                />

                {/* Number */}
                <div
                  aria-label={`${stat.prefix}${stat.countTo}${stat.suffix}`}
                  style={{
                    fontFamily:     "var(--font-cormorant)",
                    fontWeight:     400,
                    fontSize:       "clamp(56px, 9vw, 120px)",
                    lineHeight:     0.88,
                    color:          "#0d1d2b",
                    textShadow:     "0 2px 20px rgba(250,248,245,0.65)",
                    display:        "flex",
                    alignItems:     "baseline",
                    justifyContent: "center",
                    letterSpacing:  "-0.04em",
                  }}
                >
                  {stat.prefix && (
                    <span style={{ fontSize: "0.46em", letterSpacing: "0.03em", marginRight: "3px" }}>
                      {stat.prefix}
                    </span>
                  )}
                  <span>{stat.countTo}</span>
                  {stat.suffix && (
                    <span style={{ fontSize: "0.38em", alignSelf: "flex-start", paddingTop: "0.14em", marginLeft: "3px" }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily:    "var(--font-label)",
                    fontSize:      "clamp(12px, 1.25vw, 16px)",
                    fontWeight:    500,
                    letterSpacing: "0.11em",
                    textTransform: "uppercase",
                    color:         "#4a90a4",
                    margin:        "clamp(8px, 1vh, 14px) auto 0",
                    lineHeight:    1.4,
                    maxWidth:      "18ch",
                  }}
                >
                  {stat.label}
                </p>

                {/* Source */}
                {stat.source && (
                  <p
                    style={{
                      fontFamily:    "var(--font-dm-sans)",
                      fontSize:      "clamp(10px, 0.95vw, 12px)",
                      fontStyle:     "italic",
                      color:         "rgba(13,29,43,0.72)",
                      margin:        "6px 0 0",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {stat.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Mobile: 2×2 grid — all stats visible, stagger on intersect ───── */}
        {isTouch && (
          <div
            role="region"
            aria-label="Key statistics"
            style={{
              position:            "absolute",
              inset:               0,
              zIndex:              10,
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              placeItems:          "center",
              paddingBottom:       "clamp(48px, 8vh, 72px)",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                ref={statRefs[i]}
                style={{
                  opacity:    0,
                  transform:  "translateY(20px)",
                  transition: "opacity 600ms ease, transform 600ms ease",
                  textAlign:  "center",
                  padding:    "clamp(12px, 3vw, 32px)",
                  width:      "100%",
                }}
              >
                {/* Number */}
                <div
                  aria-label={`${stat.prefix}${stat.countTo}${stat.suffix}`}
                  style={{
                    fontFamily:     "var(--font-cormorant)",
                    fontWeight:     400,
                    fontSize:       "clamp(44px, 11vw, 80px)",
                    lineHeight:     0.9,
                    color:          "#1a2b3c",
                    textShadow:     "0 1px 4px rgba(255,255,255,0.5)",
                    display:        "flex",
                    alignItems:     "baseline",
                    justifyContent: "center",
                    letterSpacing:  "-0.03em",
                  }}
                >
                  {stat.prefix && (
                    <span style={{ fontSize: "0.52em", letterSpacing: "0.04em", marginRight: "2px" }}>
                      {stat.prefix}
                    </span>
                  )}
                  <span>{stat.countTo}</span>
                  {stat.suffix && (
                    <span style={{ fontSize: "0.44em", alignSelf: "flex-start", paddingTop: "0.12em", marginLeft: "2px" }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily:    "var(--font-dm-sans)",
                    fontSize:      "clamp(10px, 2.8vw, 13px)",
                    fontWeight:    500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color:         "rgba(26,43,60,0.85)",
                    margin:        "clamp(6px, 1vw, 12px) auto 0",
                    lineHeight:    1.5,
                    maxWidth:      "16ch",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        </motion.div>{/* /ENTRANCE-WRAPPER */}
      </div>
    </div>
  );
}
