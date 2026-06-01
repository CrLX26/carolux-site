"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { COMPANY, HERO, TRUST_BADGES } from "../lib/content";

const EASE = [0.16, 1, 0.3, 1];

// ── Thermal spotlight tuning ───────────────────────────────────────────────
// Tell Claude which direction to adjust using plain English:
//
//   "make the circle bigger / smaller"        → change SPOTLIGHT_RADIUS
//   "start shrinking sooner"                  → raise  SPOTLIGHT_RAMP  (e.g. 400)
//   "only shrink right at the edge"           → lower  SPOTLIGHT_RAMP  (e.g. 100)
//   "stop closer to / farther from the edge"  → those two are now the same control
//
const SPOTLIGHT_RADIUS = 180; // px — full circle size when cursor is in open centre
const SPOTLIGHT_RAMP   = 300; // px — distance from any edge where shrinking begins

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

export default function Hero() {
  const heroRef        = useRef(null); // outer scroll tunnel
  const stickyRef      = useRef(null); // inner sticky panel (mouse-coord anchor)
  const heroContentRef = useRef(null); // hero content block — measured for alarmY
  const alarmCardRef   = useRef(null); // alarm card block  — measured for alarmY

  const [heroMousePos,   setHeroMousePos]   = useState(null);
  const [thermalOpacity, setThermalOpacity] = useState(0);
  const [parallax,       setParallax]       = useState({ x: 0, y: 0 });
  const [navHeight,      setNavHeight]      = useState(0);
  // MotionValue holding the alarm card's starting offset (computed after mount).
  // Using useMotionValue + .set() instead of state so that the multi-input
  // useTransform below re-evaluates reactively when the measurement changes.
  // 1250 is the fallback (midpoint between desktop ~1200 and mobile ~1337).
  const alarmStartMV = useMotionValue(1250);

  // ── Scroll progress ───────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // ── Scroll-driven MotionValues ────────────────────────────────────────────
  // Hero content: slides fully off the top of the viewport — no fade.
  // -1100px clears the content block on all screen sizes.
  // Window [0.05, 0.60] keeps movement at ~1.7× scroll speed — natural, not frantic.
  const heroContentY      = useTransform(scrollYProgress, [0.05, 0.60],  [0, -1100]);

  // ── Hero → Stats cross-dissolve ───────────────────────────────────────────
  // The whole sticky panel fades to 0 — not a cream overlay on top, but the
  // panel itself dissolving. Stats (underneath, zoomed-in at scale 1.3) emerges.
  // FADE_END must stay below ~0.956 so the panel goes invisible before it
  // physically unsticks — it then exits the viewport silently.
  //
  //   "start sooner / later"  → adjust FADE_START
  //   "fade faster / slower"  → narrow / widen the gap between the two
  //
  const FADE_START       = 0.85; // alarm card is near the top 10% of the panel
  const FADE_END         = 0.95; // panel fully transparent — must be < ~0.956
  const heroPanelOpacity = useTransform(scrollYProgress, [FADE_START, FADE_END], [1, 0]);
  // imageY removed — hero image fills sticky panel at all times (no lift at end of tunnel).
  // Alarm card — same scroll rate as heroContentY (2000px per progress unit).
  // Multi-input form: re-evaluates whenever scrollYProgress OR alarmStartMV changes,
  // so the post-mount measurement immediately takes effect without needing a re-render.
  const alarmY = useTransform(
    [scrollYProgress, alarmStartMV],
    ([progress, start]) => {
      // No upper clamp — alarm card keeps scrolling past P=0.60 at the same
      // 2000px/unit rate so it moves in sync with the image after centre.
      const t = Math.max(0, (progress - 0.05) / 0.55);
      return start - t * 1100;
    },
  );

  // ── Measure Nav height so sticky panel pins at its natural position ──────
  // Without this, the hero panel starts 69px below viewport top and physically
  // scrolls that distance before pinning — making the image appear to move.
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setNavHeight(header.getBoundingClientRect().height);
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Compute alarm card starting offset from live DOM measurements ────────
  // Runs after mount and on every resize so the value is accurate across all
  // viewport sizes. alarmStart is the translateY the alarm card needs at
  // scrollYProgress=0 so that its bottom edge sits exactly at the sticky
  // panel's bottom edge the instant the hero content block fully exits
  // through the panel's top edge.
  useEffect(() => {
    const compute = () => {
      const sticky = stickyRef.current;
      const hcEl   = heroContentRef.current;
      const acEl   = alarmCardRef.current;
      if (!sticky || !hcEl || !acEl) return;
      const stickyH  = sticky.getBoundingClientRect().height;
      const contentH = hcEl.getBoundingClientRect().height;
      const alarmH   = acEl.getBoundingClientRect().height;
      // heroExit:    heroContentY value when content bottom crosses panel top
      // alarmEntry:  alarmY value when alarm card bottom sits at panel bottom
      // Y_start = alarmEntry - heroExit  (constant offset; both move at same rate)
      const heroExit   = -(stickyH + contentH) / 2;
      const alarmEntry = 0.62 * stickyH - alarmH;
      alarmStartMV.set(Math.round(alarmEntry - heroExit));
    };
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  // ── Mouse tracking — drives parallax + thermal reveal ────────────────────
  useEffect(() => {
    const onWindowMouseMove = (e) => {
      const rect = stickyRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Distance to the nearest edge.
      // Left / right / top use panel coordinates (rect-relative).
      // Alarm card bottom — 50px below the last line of alarm text.
      // getBoundingClientRect() reads live rendered position post-transform,
      // so the threshold tracks the card as it scrolls through the viewport.
      const alarmRect       = alarmCardRef.current?.getBoundingClientRect();
      const fromAlarmBottom = alarmRect ? (alarmRect.bottom + 500) - e.clientY : Infinity;
      // Left / top / right shrink at viewport edges. Bottom shrinks at alarm card only.
      const minDist = Math.min(mx, my, rect.width - mx, fromAlarmBottom);

      // Radius shrinks linearly from SPOTLIGHT_RADIUS → 0 as cursor approaches
      // any edge. Reaches zero exactly at the edge. SPOTLIGHT_RAMP controls how
      // early shrinking begins.
      const radius = SPOTLIGHT_RADIUS * Math.min(1, Math.max(0, minDist / SPOTLIGHT_RAMP));

      setHeroMousePos({ x: mx, y: my, radius });

      // Opacity is now just a clean on/off — radius handles the edge behaviour
      setThermalOpacity(minDist > 0 ? 1 : 0);

      // Parallax: ±20px offset from cursor position relative to panel centre
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

  // Cursor-centred mask for the thermal overlay
  const overlayMask = heroMousePos
    ? `radial-gradient(circle ${heroMousePos.radius}px at ${heroMousePos.x}px ${heroMousePos.y}px, black 0%, black 60%, transparent 100%)`
    : "none";

  return (
    // Outer scroll tunnel — 167vh gives 67vh of actual scroll travel
    <div
      id="home"
      ref={heroRef}
      style={{ minHeight: "calc(274vh - 300px)", position: "relative" }}
    >
      {/* Inner sticky viewport — pins while outer scrolls.
          zIndex: 2 keeps Hero above the Stats panel during their brief
          viewport overlap. Hero's cream bottom blur covers the seam;
          Stats reveals from underneath as Hero lifts away. */}
      <motion.div
        ref={stickyRef}
        style={{
          position:   "sticky",
          top:        navHeight,
          height:     "100svh",
          minHeight:  "720px",
          overflow:   "clip",
          display:    "flex",
          alignItems: "center",
          background: "#faf8f5",
          zIndex:     2,
          opacity:    heroPanelOpacity,
        }}
      >
        {/* Grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position:        "absolute",
            inset:           0,
            pointerEvents:   "none",
            backgroundImage: GRAIN_BG,
            backgroundRepeat: "repeat",
            backgroundSize:  "200px 200px",
            mixBlendMode:    "multiply",
            opacity:         0.55,
          }}
        />

        {/* ── House photo ──────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset:    0,
          }}
        >
          <div
            style={{
              position:   "absolute",
              inset:      0,
              transform:  `translate(${parallax.x}px, ${parallax.y}px)`,
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
            {/* Mobile text-contrast scrim */}
            <div
              className="md:hidden"
              style={{
                position:   "absolute",
                inset:      0,
                background: "linear-gradient(to right, rgba(250,248,245,0.82) 0%, rgba(250,248,245,0.55) 55%, transparent 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* ── Thermal overlay — desktop only ───────────────────────────────
            ONE parent mask div reveals all thermal children.
            Mouse cursor position drives the radial-gradient mask.
            Thermal image + orange-coloured text appear at the cursor.
            ──────────────────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          className="hidden md:block"
          style={{
            position:      "absolute",
            inset:         0,
            zIndex:        20,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position:         "absolute",
              inset:            0,
              opacity:          thermalOpacity,
              WebkitMaskImage:  overlayMask,
              maskImage:        overlayMask,
              transition:       "opacity 150ms ease-out",
              pointerEvents:    "none",
            }}
          >
            {/* Dark fill — solid left, fades toward house photo */}
            <div
              style={{
                position:   "absolute",
                inset:      0,
                background: "linear-gradient(to right, #0d0d0d 0%, #0d0d0d 36%, rgba(13,13,13,0.55) 52%, transparent 68%)",
              }}
            />

            {/* Thermal house image — mouse parallax, fills sticky panel */}
            <motion.div
              style={{
                position: "absolute",
                inset:    0,
              }}
            >
              <div
                style={{
                  position:   "absolute",
                  inset:      0,
                  transform:  `translate(${parallax.x}px, ${parallax.y}px)`,
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

            {/* Thermal content — replica of hero text in thermal colours.
                Exits in exact sync with base hero content. */}
            <motion.div
              style={{
                position:  "absolute",
                inset:     0,
                display:   "flex",
                alignItems: "center",
                y:         heroContentY,
              }}
            >
              <div
                className="w-full md:w-[min(58%,760px)]"
                style={{
                  position:     "relative",
                  paddingLeft:  "clamp(1.5rem, 8vw, 7rem)",
                  paddingRight: "clamp(1.5rem, 3vw, 3rem)",
                }}
              >
                {/* Eyebrow */}
                <div
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          "16px",
                    marginBottom: "2.5rem",
                  }}
                >
                  <div style={{ width: "32px", height: "1px", background: "#ff4400", flexShrink: 0 }} />
                  <p
                    style={{
                      fontFamily:    "var(--font-dm-sans)",
                      fontSize:      "12px",
                      fontWeight:    500,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color:         "#ff6644",
                      margin:        0,
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
                          display:       "block",
                          fontFamily:    "var(--font-cormorant)",
                          fontSize:      "clamp(4.5rem, 9vw, 10rem)",
                          fontWeight:    400,
                          fontStyle:     "normal",
                          lineHeight:    0.86,
                          letterSpacing: "-0.03em",
                          color:         i === 1 ? "#ff8800" : "#ff4400",
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
                    fontFamily:   "var(--font-dm-sans)",
                    fontSize:     "clamp(1rem, 1.3vw, 1.125rem)",
                    lineHeight:   1.72,
                    color:        "#ffaa44",
                    maxWidth:     "400px",
                    marginBottom: "2.75rem",
                  }}
                >
                  {HERO.subheading}
                </p>

                {/* CTAs */}
                <div
                  style={{
                    display:      "flex",
                    flexWrap:     "wrap",
                    alignItems:   "center",
                    gap:          "0.75rem",
                    marginBottom: "3rem",
                  }}
                >
                  <span
                    style={{
                      display:       "inline-flex",
                      alignItems:    "center",
                      background:    "#ff5500",
                      color:         "#ffffff",
                      fontFamily:    "var(--font-dm-sans)",
                      fontWeight:    500,
                      fontSize:      "13px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding:       "15px 36px",
                      borderRadius:  "3px",
                      border:        "1.5px solid transparent",
                      whiteSpace:    "nowrap",
                    }}
                  >
                    {HERO.primaryCta}
                  </span>
                  <span
                    style={{
                      display:       "inline-flex",
                      alignItems:    "center",
                      color:         "#ffcc44",
                      fontFamily:    "var(--font-dm-sans)",
                      fontWeight:    400,
                      fontSize:      "14px",
                      letterSpacing: "0.02em",
                      padding:       "15px 20px",
                      whiteSpace:    "nowrap",
                    }}
                  >
                    {HERO.secondaryCta}
                  </span>
                </div>

                {/* Trust badges */}
                <ul
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "10px",
                    listStyle:     "none",
                    padding:       0,
                    margin:        0,
                  }}
                >
                  {TRUST_BADGES.map((badge, i) => (
                    <li key={badge} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontSize:   "14px",
                          fontStyle:  "normal",
                          color:      "#ff8833",
                          flexShrink: 0,
                          lineHeight: 1,
                          minWidth:   "20px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontFamily:    "var(--font-dm-sans)",
                          fontSize:      "13px",
                          fontWeight:    500,
                          color:         "#ff8833",
                          letterSpacing: "0.07em",
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

            {/* ── Thermal alarm card — own alarmY, synced with base ─────────
                Sibling of the heroContentY div so it scrolls independently.
                Still inside the mask so the radial reveal applies.          */}
            <motion.div
              style={{
                position:      "absolute",
                top:           "38%",
                left:          0,
                right:         0,
                textAlign:     "center",
                pointerEvents: "none",
                y:             alarmY,
              }}
            >
              <p
                style={{
                  fontFamily:    "var(--font-label)",
                  fontSize:      "clamp(1.4rem, 2.6vw, 2.25rem)",
                  fontWeight:    700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:         "#cc7733",
                  margin:        "0 0 clamp(0.75rem, 1.8vh, 1.5rem)",
                  lineHeight:    1,
                  textShadow:    "0 0 20px rgba(13,13,13,0.7), 0 0 50px rgba(13,13,13,0.4)",
                }}
              >
                {HERO.secondaryPre}
              </p>
              <p
                style={{
                  fontFamily:    "var(--font-cormorant)",
                  fontSize:      "clamp(2.75rem, 5.5vw, 6rem)",
                  fontWeight:    400,
                  fontStyle:     "normal",
                  lineHeight:    0.9,
                  letterSpacing: "-0.02em",
                  color:         "#ff4400",
                  margin:        "0 0 clamp(2rem, 4vh, 3rem)",
                  textShadow:    "0 0 32px rgba(13,13,13,0.8), 0 0 80px rgba(13,13,13,0.5)",
                }}
              >
                {HERO.secondaryMain}
              </p>
              <p
                style={{
                  fontFamily:    "var(--font-label)",
                  fontSize:      "clamp(1.4rem, 2.6vw, 2.25rem)",
                  fontWeight:    700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:         "#cc7733",
                  margin:        0,
                  lineHeight:    1,
                  textShadow:    "0 0 20px rgba(13,13,13,0.7), 0 0 50px rgba(13,13,13,0.4)",
                }}
              >
                {HERO.secondaryPost}
              </p>
            </motion.div>
          </div>
        </motion.div>
        {/* ── End thermal overlay ──────────────────────────────────────────── */}

        {/* ── Alarm card — independent scroll, own alarmY MotionValue ─────────
            alarmStart is computed from live DOM heights so the card enters
            the panel bottom exactly as the hero content exits the panel top.  */}
        <motion.div
          ref={alarmCardRef}
          style={{
            position:      "absolute",
            top:           "38%",
            left:          0,
            right:         0,
            zIndex:        15,
            textAlign:     "center",
            pointerEvents: "none",
            y:             alarmY,
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-label)",
              fontSize:      "clamp(1.4rem, 2.6vw, 2.25rem)",
              fontWeight:    700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         "#1a2b3c",
              margin:        "0 0 clamp(0.75rem, 1.8vh, 1.5rem)",
              lineHeight:    1,
              textShadow:    "0 0 28px rgba(250,248,245,1), 0 0 64px rgba(250,248,245,0.85)",
            }}
          >
            {HERO.secondaryPre}
          </p>
          <p
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(2.75rem, 5.5vw, 6rem)",
              fontWeight:    400,
              fontStyle:     "normal",
              lineHeight:    0.9,
              letterSpacing: "-0.02em",
              color:         "#0a1520",
              margin:        "0 0 clamp(2rem, 4vh, 3rem)",
              textShadow:    "0 0 40px rgba(250,248,245,1), 0 0 90px rgba(250,248,245,0.9), 0 0 160px rgba(250,248,245,0.6)",
            }}
          >
            {HERO.secondaryMain}
          </p>
          <p
            style={{
              fontFamily:    "var(--font-label)",
              fontSize:      "clamp(1.4rem, 2.6vw, 2.25rem)",
              fontWeight:    700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         "#1a2b3c",
              margin:        0,
              lineHeight:    1,
              textShadow:    "0 0 28px rgba(250,248,245,1), 0 0 64px rgba(250,248,245,0.85)",
            }}
          >
            {HERO.secondaryPost}
          </p>
        </motion.div>

        {/* ── Base hero content — exits upward on scroll ───────────────────── */}
        <motion.div
          ref={heroContentRef}
          className="relative z-10 w-full md:w-[min(58%,760px)]"
          style={{
            paddingLeft:  "clamp(1.5rem, 8vw, 7rem)",
            paddingRight: "clamp(1.5rem, 3vw, 3rem)",
            y:       heroContentY,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2.5rem" }}
          >
            <div style={{ width: "32px", height: "1px", background: "#4a90a4", flexShrink: 0 }} />
            <p
              style={{
                fontFamily:    "var(--font-dm-sans)",
                fontSize:      "12px",
                fontWeight:    500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color:         "#6e8a96",
                margin:        0,
              }}
            >
              {HERO.eyebrow}
            </p>
          </motion.div>

          {/* Headline — clip-path line reveal on page load */}
          <h1 style={{ margin: "0 0 2.25rem", padding: 0 }}>
            {HERO.headline.map((line, i) => (
              <div key={line} style={{ clipPath: "inset(0 -9999px)", lineHeight: 0.86 }}>
                <motion.span
                  style={{
                    display:       "block",
                    fontFamily:    "var(--font-cormorant)",
                    fontSize:      "clamp(3rem, 9vw, 10rem)",
                    fontWeight:    400,
                    fontStyle:     "normal",
                    lineHeight:    0.86,
                    letterSpacing: "-0.03em",
                    color:         "#1a2b3c",
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
              fontFamily:   "var(--font-dm-sans)",
              fontSize:     "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight:   1.72,
              color:        "#3d5060",
              maxWidth:     "400px",
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
              display:      "flex",
              flexWrap:     "wrap",
              alignItems:   "center",
              gap:          "0.75rem",
              marginBottom: "3rem",
            }}
          >
            <a
              href="#contact"
              className="transition-all hover:opacity-80 hover:scale-[1.015]"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                background:     "#4a90a4",
                color:          "#ffffff",
                fontFamily:     "var(--font-dm-sans)",
                fontWeight:     500,
                fontSize:       "13px",
                letterSpacing:  "0.06em",
                textTransform:  "uppercase",
                padding:        "15px 36px",
                borderRadius:   "3px",
                textDecoration: "none",
                border:         "1.5px solid transparent",
                whiteSpace:     "nowrap",
              }}
            >
              {HERO.primaryCta}
            </a>
            <a
              href={COMPANY.phoneHref}
              className="transition-colors hover:text-[#1a1a1a]"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                background:     "transparent",
                color:          "#5a7280",
                fontFamily:     "var(--font-dm-sans)",
                fontWeight:     400,
                fontSize:       "14px",
                letterSpacing:  "0.02em",
                padding:        "15px 20px",
                textDecoration: "none",
                whiteSpace:     "nowrap",
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
              display:       "flex",
              flexDirection: "column",
              gap:           "10px",
              listStyle:     "none",
              padding:       0,
              margin:        0,
            }}
          >
            {TRUST_BADGES.map((badge, i) => (
              <li key={badge} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize:   "14px",
                    fontStyle:  "normal",
                    color:      "#4a90a4",
                    flexShrink: 0,
                    lineHeight: 1,
                    minWidth:   "20px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily:    "var(--font-dm-sans)",
                    fontSize:      "13px",
                    fontWeight:    500,
                    color:         "#3d5060",
                    letterSpacing: "0.07em",
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
            position:      "absolute",
            bottom:        "2.5rem",
            left:          "clamp(1.5rem, 8vw, 7rem)",
            zIndex:        10,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           "8px",
          }}
        >
          <span
            style={{
              fontFamily:    "var(--font-dm-sans)",
              fontSize:      "9px",
              fontWeight:    400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:         "rgba(26,26,26,0.28)",
              writingMode:   "vertical-rl",
              transform:     "rotate(180deg)",
            }}
          >
            Scroll
          </span>
          <motion.div
            aria-hidden="true"
            style={{
              width:      "1px",
              height:     "36px",
              background: "rgba(26,26,26,0.15)",
              originY:    0,
            }}
            animate={{ scaleY: [0.1, 1, 0.1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </motion.div>
    </div>
  );
}
