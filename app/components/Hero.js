"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANY, HERO, TRUST_BADGES } from "../lib/content";

const EASE = [0.16, 1, 0.3, 1];

// Pre-computed once — HERO.bridgeText is a constant import
const BRIDGE_CHARS = Array.from(HERO.bridgeText);

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

export default function Hero() {
  const heroRef   = useRef(null); // outer 200vh scroll tunnel (useScroll target)
  const stickyRef = useRef(null); // inner sticky viewport (mouse-coordinate anchor)

  const [heroMousePos,  setHeroMousePos]  = useState(null);
  const [thermalOpacity, setThermalOpacity] = useState(0);
  const [parallax,       setParallax]       = useState({ x: 0, y: 0 });

  // Per-character DOM refs for both bridge text instances (base + thermal)
  const charBaseRefs    = useRef([]);
  const charThermalRefs = useRef([]);

  // ── Scroll progress through the full 200vh tunnel ────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Scroll-driven values — all derived from same progress
  // y must be unitless numbers (px) — string values silently fail in Framer Motion
  const imageScale         = useTransform(scrollYProgress, [0, 1],                [1, 1.08]);
  const imageOpacity       = useTransform(scrollYProgress, [0, 0.85, 0.99, 1],  [1, 1, 0, 0]);
  const heroContentOpacity = useTransform(scrollYProgress, [0.05, 0.26],         [1, 0]);
  const heroContentY       = useTransform(scrollYProgress, [0.05, 0.30],         [0, -1100]);
  const bridgeY            = useTransform(scrollYProgress, [0.34, 0.90, 1.0],       [320, 0, 0]);
  const tealLineOpacity    = useTransform(scrollYProgress, [0.44, 0.58],             [0, 1]);

  // ── Window-level mouse tracking — one coordinate system: stickyRef ───────
  useEffect(() => {
    const onWindowMouseMove = (e) => {
      const rect = stickyRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setHeroMousePos({ x: mx, y: my });

      // Edge fade from sticky-div edges
      const minDist = Math.min(mx, my, rect.width - mx, rect.height - my);
      setThermalOpacity(minDist > 150 ? 1 : minDist <= 0 ? 0 : minDist / 150);

      // Parallax offset from center of sticky div
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      setParallax({
        x: Math.max(-20, Math.min(20, ((mx - cx) / rect.width)  * 20)),
        y: Math.max(-20, Math.min(20, ((my - cy) / rect.height) * 20)),
      });
    };
    window.addEventListener("mousemove", onWindowMouseMove);
    return () => window.removeEventListener("mousemove", onWindowMouseMove);
  }, []);

  // ── Bridge text character reveal — Tresmares materialization effect ──────
  // Characters start at opacity 0.05 and materialize scroll-driven as the
  // bridge text slides up. First char reveals at ~0.54, last locks at 0.90.
  // Bidirectional — fades back out scrolling up. Direct DOM mutation, no state.
  useEffect(() => {
    const N         = BRIDGE_CHARS.length;
    const START     = 0.54;  // first char starts revealing (~when text enters view)
    const STAG_END  = 0.82;  // last char starts its fade window here
    const FADE      = 0.08;  // each character transitions over this scroll range

    return scrollYProgress.on("change", (v) => {
      for (let i = 0; i < N; i++) {
        const charStart = N > 1
          ? START + (i / (N - 1)) * (STAG_END - START)
          : START;
        const charEnd = charStart + FADE;
        const opacity =
          v <= charStart ? 0.05
          : v >= charEnd  ? 1
          : 0.05 + 0.95 * ((v - charStart) / FADE);

        const base    = charBaseRefs.current[i];
        const thermal = charThermalRefs.current[i];
        if (base)    base.style.opacity    = String(opacity);
        if (thermal) thermal.style.opacity = String(opacity);
      }
    });
  }, [scrollYProgress]);

  // Single mask string — hero-relative, used on ONE parent overlay div
  const overlayMask = heroMousePos
    ? `radial-gradient(circle 180px at ${heroMousePos.x}px ${heroMousePos.y}px, black 0%, black 60%, transparent 100%)`
    : "none";

  return (
    // Outer 200vh scroll tunnel — sticky trick gives Tresmares scroll feel
    <div
      id="home"
      ref={heroRef}
      style={{ minHeight: "145vh", position: "relative" }}
    >
      {/* Inner sticky viewport — pins while outer scrolls */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          minHeight: "720px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          background: "#faf8f5",
        }}
      >
        {/* Grain */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: GRAIN_BG,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            mixBlendMode: "multiply",
            opacity: 0.55,
          }}
        />

        {/* Sketch image — scroll scale (outer motion.div) + parallax (inner div) */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "100%",
            scale: imageScale,
            opacity: imageOpacity,
            transformOrigin: "right center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${parallax.x}px, ${parallax.y}px)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <Image
              src="/images/house-normal6.webp"
              alt=""
              fill
              priority={true}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
            {/* Bottom fade — desktop and mobile */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "18%",
                background: "linear-gradient(to top, #faf8f5, transparent)",
              }}
            />
            {/* Mobile text-contrast scrim — fades left side so text stays readable */}
            <div
              className="md:hidden"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(250,248,245,0.82) 0%, rgba(250,248,245,0.55) 55%, transparent 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────────────
            Thermal overlay — ONE parent mask reveals ALL children.
            No individual mask on any child element.
            Outer motion.div fades with images via imageOpacity.
            Inner div drives the mouse-cursor mask + thermalOpacity.
            ───────────────────────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          className="hidden md:block"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            opacity: imageOpacity,
            pointerEvents: "none",
          }}
        >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: thermalOpacity,
            WebkitMaskImage: overlayMask,
            maskImage: overlayMask,
            transition: "opacity 150ms ease-out",
            pointerEvents: "none",
          }}
        >
          {/* Dark fill — solid on left text area, fades toward house image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #0d0d0d 0%, #0d0d0d 36%, rgba(13,13,13,0.55) 52%, transparent 68%)",
            }}
          />

          {/* Thermal house image — identical two-level wrapper as sketch image */}
          <motion.div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "100%",
              scale: imageScale,
              transformOrigin: "right center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${parallax.x}px, ${parallax.y}px)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              <Image
                src="/images/house-thermal4.webp"
                alt=""
                fill
                priority={true}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            </div>
          </motion.div>

          {/* Thermal content — full replica of base content with thermal colors */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              opacity: heroContentOpacity,
              y: heroContentY,
            }}
          >
            <div
              className="w-full md:w-[min(58%,760px)]"
              style={{
                paddingLeft: "clamp(1.5rem, 8vw, 7rem)",
                paddingRight: "clamp(1.5rem, 3vw, 3rem)",
              }}
            >
              {/* Eyebrow — teal dash + label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "2.5rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    background: "#ff4400",
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#ff6644",
                    margin: 0,
                  }}
                >
                  {HERO.eyebrow}
                </p>
              </div>

              {/* Headline — thermal gradient fill */}
              <div style={{ margin: "0 0 2.25rem", padding: 0 }}>
                {HERO.headline.map((line, i) => (
                  <div key={line} style={{ lineHeight: 0.86 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "clamp(4.5rem, 9vw, 10rem)",
                        fontWeight: 400,
                        fontStyle: i === 1 ? "italic" : "normal",
                        lineHeight: 0.86,
                        letterSpacing: "-0.035em",
                        background:
                          "linear-gradient(135deg, #ff4400 0%, #ff8800 25%, #ffcc00 50%, #ff6600 75%, #ff2200 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtext */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                  lineHeight: 1.72,
                  color: "#ffaa44",
                  maxWidth: "400px",
                  marginBottom: "2.75rem",
                }}
              >
                {HERO.subheading}
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "3rem",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#ff5500",
                    color: "#ffffff",
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "15px 36px",
                    borderRadius: "3px",
                    border: "1.5px solid transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  {HERO.primaryCta}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: "#ffcc44",
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 400,
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                    padding: "15px 20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {HERO.secondaryCta}
                </span>
              </div>

              {/* Trust badges */}
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {TRUST_BADGES.map((badge, i) => (
                  <li
                    key={badge}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "13px",
                        fontStyle: "italic",
                        color: "#ff8833",
                        flexShrink: 0,
                        lineHeight: 1,
                        minWidth: "20px",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "#ff8833",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {badge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Thermal bridge text — same position as original, thermal colors */}
          <div
            style={{
              position: "absolute",
              bottom: "12%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "65%",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <motion.div style={{ y: bridgeY }}>
              <p
                aria-label={HERO.bridgeText}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 3.2vw, 46px)",
                  lineHeight: 1.2,
                  margin: 0,
                  background: "linear-gradient(135deg, #ff4400 0%, #ff8800 25%, #ffcc00 50%, #ff6600 75%, #ff2200 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {BRIDGE_CHARS.map((char, i) => (
                  <span
                    key={i}
                    ref={el => { charThermalRefs.current[i] = el; }}
                    aria-hidden="true"
                    style={{ opacity: 0.05 }}
                  >
                    {char}
                  </span>
                ))}
              </p>
              <div
                aria-hidden="true"
                style={{
                  width: "1px",
                  height: "40px",
                  background: "#ff6644",
                  margin: "16px auto 0",
                }}
              />
            </motion.div>
          </div>
        </div>
        </motion.div>
        {/* ── End thermal overlay ─────────────────────────────────────────── */}

        {/* Base content — exits up on scroll (Tresmares pattern) */}
        <motion.div
          className="relative z-10 w-full md:w-[min(58%,760px)]"
          style={{
            paddingLeft: "clamp(1.5rem, 8vw, 7rem)",
            paddingRight: "clamp(1.5rem, 3vw, 3rem)",
            opacity: heroContentOpacity,
            y: heroContentY,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "2.5rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "#4a90a4",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(26,26,26,0.42)",
                margin: 0,
              }}
            >
              {HERO.eyebrow}
            </p>
          </motion.div>

          {/* Headline */}
          <h1 style={{ margin: "0 0 2.25rem", padding: 0 }}>
            {HERO.headline.map((line, i) => (
              <div key={line} style={{ clipPath: "inset(0 -9999px)", lineHeight: 0.86 }}>
                <motion.span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(3rem, 9vw, 10rem)",
                    fontWeight: 400,
                    fontStyle: i === 1 ? "italic" : "normal",
                    lineHeight: 0.86,
                    letterSpacing: "-0.035em",
                    color: "#1a2b3c",
                  }}
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.12 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.52 }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              lineHeight: 1.72,
              color: "rgba(26,26,26,0.55)",
              maxWidth: "400px",
              marginBottom: "2.75rem",
            }}
          >
            {HERO.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "3rem",
            }}
          >
            <a
              href="#contact"
              className="transition-all hover:opacity-80 hover:scale-[1.015]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#4a90a4",
                color: "#ffffff",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "15px 36px",
                borderRadius: "3px",
                textDecoration: "none",
                border: "1.5px solid transparent",
                whiteSpace: "nowrap",
              }}
            >
              {HERO.primaryCta}
            </a>
            <a
              href={COMPANY.phoneHref}
              className="transition-colors hover:text-[#1a1a1a]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "transparent",
                color: "rgba(26,26,26,0.48)",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 400,
                fontSize: "13px",
                letterSpacing: "0.02em",
                padding: "15px 20px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {HERO.secondaryCta}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.82 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {TRUST_BADGES.map((badge, i) => (
              <li
                key={badge}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "13px",
                    fontStyle: "italic",
                    color: "#4a90a4",
                    flexShrink: 0,
                    lineHeight: 1,
                    minWidth: "20px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "rgba(26,26,26,0.42)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {badge}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "clamp(1.5rem, 8vw, 7rem)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "9px",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(26,26,26,0.28)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Scroll
          </span>
          <motion.div
            aria-hidden="true"
            style={{
              width: "1px",
              height: "36px",
              background: "rgba(26,26,26,0.15)",
              originY: 0,
            }}
            animate={{ scaleY: [0.1, 1, 0.1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Bottom cream fade — fills the dead zone below bridge text (bottom 12% of panel)
            Transparent at bridge-text level, solid cream at panel edge.
            Softens where Hero cream meets Stats burst frame 1. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "12%",
            background: "linear-gradient(to bottom, rgba(250,248,245,0) 0%, #faf8f5 100%)",
            zIndex: 25,
            pointerEvents: "none",
          }}
        />

        {/* Transition text — scroll-driven, lives inside sticky panel */}
        <div
          className="w-[88%] md:w-[65%]"
          style={{
            position: "absolute",
            bottom: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 15,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <motion.div style={{ y: bridgeY }}>
            <p
              aria-label={HERO.bridgeText}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(22px, 3.2vw, 46px)",
                color: "#1a2b3c",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {BRIDGE_CHARS.map((char, i) => (
                <span
                  key={i}
                  ref={el => { charBaseRefs.current[i] = el; }}
                  aria-hidden="true"
                  style={{ opacity: 0.05 }}
                >
                  {char}
                </span>
              ))}
            </p>
            <motion.div
              aria-hidden="true"
              style={{
                width: "1px",
                height: "40px",
                background: "#4a90a4",
                margin: "16px auto 0",
                opacity: tealLineOpacity,
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
