"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { COMPANY, HERO, TRUST_BADGES } from "../lib/content";

const EASE = [0.16, 1, 0.3, 1];
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

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

  // Width-based "is this a phone?" — the desktop thermal reveal is mouse-driven
  // and can't run on touch, so on mobile the SAME overlay is revealed by the CSS
  // keyframe spotlight instead. SSR-safe (server snapshot = false = desktop).
  const isMobile = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
  const [navHeight,      setNavHeight]      = useState(0);
  // MotionValue holding the alarm card's starting offset (computed after mount).
  // Using useMotionValue + .set() instead of state so that the multi-input
  // useTransform below re-evaluates reactively when the measurement changes.
  // 1250 is the fallback (midpoint between desktop ~1200 and mobile ~1337).
  const alarmStartMV = useMotionValue(1250);

  // ── Mobile scroll tunnel ──────────────────────────────────────────────────
  // Mobile gets a short scroll tunnel: the house pins (loop still running) and
  // stays put while only the hero text rises and scrolls away. Separate value so
  // the (locked) desktop heroContentY choreography is untouched.
  const mobileContentY = useMotionValue(0); // hero text rises up and off
  const mobileContentOpacity = useMotionValue(1); // hero text fades as it reaches the top
  const mobileAtticOpacity = useMotionValue(0); // attic cross-fades in over the house (step 5)
  const mobileAtticScale = useMotionValue(1.08); // attic push-in (scale 1.08 → 1.0)
  const vidARef = useRef(null);                  // sun-sky loop — crossfade copy A
  const vidBRef = useRef(null);                  // sun-sky loop — crossfade copy B
  const vidADeskRef = useRef(null);              // DESKTOP sky-reveal loop — copy A
  const vidBDeskRef = useRef(null);              // DESKTOP sky-reveal loop — copy B
  const mobileExitCream = useMotionValue(0);    // cools to cream into Stats (step 6 tail)
  const mWordRefs = useRef([]);                 // attic alert words (step 6)

  // Attic alert word sequence (mobile) — the loss-aversion line, written word-by-word.
  let mGi = 0;
  const mPre  = HERO.secondaryPre.split(" ").map((w)  => ({ w, i: mGi++ }));
  const mMain = HERO.secondaryMain.split(" ").map((w) => ({ w, i: mGi++ }));
  const mPost = HERO.secondaryPost.split(" ").map((w) => ({ w, i: mGi++ }));
  const mTotal = mGi;
  const M_HALO = "0 0 2px rgba(0,0,0,0.85), 0 1px 14px rgba(0,0,0,0.8), 0 0 36px rgba(0,0,0,0.6)";
  const mWordBase = { display: "inline-block", marginRight: "0.26em", opacity: 0, transform: "translateY(14px)", willChange: "opacity, transform" };
  const renderMWords = (arr, style) =>
    arr.map(({ w, i }) => (
      <span key={i} ref={(el) => { mWordRefs.current[i] = el; }} style={{ ...mWordBase, ...style }}>{w}</span>
    ));

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
  // Triggered by the ALERT text's real on-screen position (alarmCardRef), NOT a
  // viewport fraction and NOT scrollYProgress (which reverses across the
  // sticky-unpin boundary and made Stats pop in/out). The panel holds full
  // opacity until the alert ("Most homes are losing money…") rides up into the
  // top of the screen, THEN dissolves — so Stats never shows while the alert is
  // mid-screen. alarmCardRef.top decreases monotonically with scroll, so once
  // dissolved it stays dissolved (and fades back in on reverse scroll).
  //
  //   "start sooner / more gradual" → raise ALERT_TOP_START (begins higher up)
  //   "finish later"                → lower ALERT_TOP_END (toward / below 0)
  //
  const ALERT_TOP_START = 190; // alert top this far down (px) → begin dissolve
  const ALERT_TOP_END   = 20;  // alert reaches the top → fully dissolved (≈ unpin)
  const heroPanelOpacity = useMotionValue(1);
  useEffect(() => {
    // ── Mobile scroll tunnel ─────────────────────────────────────────────────
    // The hero is a short tunnel (outer 150svh, sticky panel 100svh → ~0.5 screen
    // of pin). The HOUSE stays put (pinned, no parallax) with its thermal loop
    // running. Only the TEXT moves: it rises gently as you scroll (≈1.2× scroll
    // speed) and scrolls away. transform-only = GPU-cheap; no per-frame layout.
    if (isMobile) {
      let mraf = null;
      // Cache the hero's absolute document offset + viewport height so the scroll
      // handler never calls getBoundingClientRect() (that forces a layout/reflow
      // every frame — the main cause of mobile scroll jank). Re-cache on resize.
      let pinStart = 0;
      let vh = window.innerHeight || 1;
      const cache = () => {
        const el = heroRef.current;
        if (!el) return;
        const header = document.querySelector("header");
        const nh = header ? header.getBoundingClientRect().height : 0;
        // Scroll position at which the panel begins pinning, so `s` is 0 at the
        // top (was subtracting the hero's doc offset, which made s negative at
        // rest and pushed the text down ~nav-height).
        pinStart = el.getBoundingClientRect().top + window.scrollY - nh;
        vh = window.innerHeight || 1;
      };
      const mMeasure = () => {
        mraf = null;
        // Cheap: scrollY only against the cached pin-start (no per-frame layout read).
        const s = Math.max(0, window.scrollY - pinStart); // px scrolled into the pin
        const u = s / vh;                                 // ...in viewport units
        // Phase 1-4: hero text rises and fades. Vertical placement is handled by
        // the panel layout (auto margins center it but never clip the top under
        // the nav; paddingBottom keeps the CTA above the bottom bar) — no lift.
        mobileContentY.set(-Math.min(1.25 * s, vh * 1.0));
        // Fade only once the text has physically risen most of the way off the top
        // (it rises 1.25× scroll, so by u≈0.55 the block is high on screen). Holding
        // the fade until here keeps the copy fully legible while it's still in view.
        mobileContentOpacity.set(clamp01(1 - (u - 0.55) / 0.25)); // fade u 0.55 → 0.80
        // Phase 5: house cross-fades into the sun-sky video AFTER the text has
        // cleared (not over it), with a gentle push-in (scale 1.08 → 1.0). u 0.80 → 1.00.
        const atticP = clamp01((u - 0.80) / 0.20);
        mobileAtticOpacity.set(atticP);
        mobileAtticScale.set(1.08 - 0.08 * atticP);
        // Phase 6: alert line writes word-by-word over the attic. u 1.00 → 1.80.
        const wStart = 1.0, step = (1.8 - 1.0) / Math.max(1, mTotal);
        mWordRefs.current.forEach((el, i) => {
          if (!el) return;
          const a = wStart + i * step, b = a + step * 1.7;
          let o, y;
          if (u <= a) { o = 0; y = 14; }
          else if (u >= b) { o = 1; y = 0; }
          else { const t = (u - a) / (b - a); o = t; y = 14 * (1 - t); }
          el.style.opacity = String(o);
          el.style.transform = `translateY(${y}px)`;
        });
        // Hold the finished attic + text on screen (u 1.80 → 2.20), THEN cool to
        // cream and dissolve into the Stats burst (u 2.20 → 2.40).
        mobileExitCream.set(clamp01((u - 2.20) / 0.20));
      };
      const mOnScroll = () => { if (mraf === null) mraf = requestAnimationFrame(mMeasure); };
      const onResize = () => { cache(); mMeasure(); };
      cache();
      mMeasure();
      window.addEventListener("scroll", mOnScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      return () => {
        window.removeEventListener("scroll", mOnScroll);
        window.removeEventListener("resize", onResize);
        if (mraf !== null) cancelAnimationFrame(mraf);
      };
    }
    let raf = null;
    const measure = () => {
      raf = null;
      const card = alarmCardRef.current;
      const top = card ? card.getBoundingClientRect().top : ALERT_TOP_START;
      const t =
        top >= ALERT_TOP_START ? 1 :
        top <= ALERT_TOP_END ? 0 :
        (top - ALERT_TOP_END) / (ALERT_TOP_START - ALERT_TOP_END);
      const o = t * t * (3 - 2 * t); // smoothstep — gentle in/out, no hard edges
      heroPanelOpacity.set(o);
    };
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
    // MotionValues (heroPanelOpacity, mobileContentY) are stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
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
    if (isMobile) return; // alarm cards are desktop-only (scroll-tunnel bridge)
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
  }, [isMobile]);

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

  // ── Mobile: sun-sky video loop with a crossfade into itself ───────────────
  // The video plays on a loop (not scroll-driven). To hide the end→start seam,
  // two copies are stacked: as the playing copy nears its end, the other starts
  // from 0 and they crossfade (CSS opacity transition), so the wrap is a dissolve.
  // Only one copy plays at a time except during the brief crossfade.
  useEffect(() => {
    if (!isMobile) return;
    const a = vidARef.current, b = vidBRef.current;
    if (!a || !b) return;
    const FADE = 1.0; // seconds of crossfade at the loop seam
    let active = a, idle = b, crossing = false;
    [a, b].forEach((v) => { v.muted = true; v.playsInline = true; });
    a.style.opacity = "1";
    b.style.opacity = "0";
    a.currentTime = 0;
    a.play().catch(() => {});

    const onTime = () => {
      if (crossing || !active.duration) return;
      if (active.duration - active.currentTime <= FADE) {
        crossing = true;
        idle.currentTime = 0;
        idle.play().catch(() => {});
        active.style.opacity = "0"; // CSS transition dissolves end → start
        idle.style.opacity = "1";
      }
    };
    const onEnded = () => {
      active.pause();
      active.style.opacity = "0";
      idle.style.opacity = "1";
      const tmp = active; active = idle; idle = tmp;
      crossing = false;
    };
    [a, b].forEach((v) => {
      v.addEventListener("timeupdate", onTime);
      v.addEventListener("ended", onEnded);
    });
    return () => {
      [a, b].forEach((v) => {
        v.removeEventListener("timeupdate", onTime);
        v.removeEventListener("ended", onEnded);
        v.pause();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // ── Desktop: same crossfade-loop for the cursor-revealed sky layer ────────
  // Desktop isn't GPU-constrained, so it gets its own always-playing sky loop
  // (the mouse mask decides where it's visible). Separate refs so mobile is
  // untouched. Identical seam-crossfade logic to the mobile loop above.
  useEffect(() => {
    if (isMobile) return;
    const a = vidADeskRef.current, b = vidBDeskRef.current;
    if (!a || !b) return;
    const FADE = 1.0;
    let active = a, idle = b, crossing = false;
    [a, b].forEach((v) => { v.muted = true; v.playsInline = true; });
    a.style.opacity = "1";
    b.style.opacity = "0";
    a.currentTime = 0;
    a.play().catch(() => {});
    const onTime = () => {
      if (crossing || !active.duration) return;
      if (active.duration - active.currentTime <= FADE) {
        crossing = true;
        idle.currentTime = 0;
        idle.play().catch(() => {});
        active.style.opacity = "0";
        idle.style.opacity = "1";
      }
    };
    const onEnded = () => {
      active.pause();
      active.style.opacity = "0";
      idle.style.opacity = "1";
      const tmp = active; active = idle; idle = tmp;
      crossing = false;
    };
    [a, b].forEach((v) => {
      v.addEventListener("timeupdate", onTime);
      v.addEventListener("ended", onEnded);
    });
    return () => {
      [a, b].forEach((v) => {
        v.removeEventListener("timeupdate", onTime);
        v.removeEventListener("ended", onEnded);
        v.pause();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Cursor-centred mask for the thermal overlay
  const overlayMask = heroMousePos
    ? `radial-gradient(circle ${heroMousePos.radius}px at ${heroMousePos.x}px ${heroMousePos.y}px, black 0%, black 60%, transparent 100%)`
    : "none";

  // Cursor-centred mask for the DESKTOP sky reveal — a wider, softer window than
  // the thermal spotlight so the sky "opens up" around the pointer.
  const skyMask = heroMousePos
    ? `radial-gradient(circle ${Math.round(heroMousePos.radius * 1.7)}px at ${heroMousePos.x}px ${heroMousePos.y}px, black 0%, black 42%, transparent 100%)`
    : "none";

  // ── Thermal copy colours — split by surface ────────────────────────────────
  // DESKTOP: the mouse-revealed thermal text lands over the dark left fill
  //   (#0d0d0d gradient), where warm orange reads cleanly. UNCHANGED — these
  //   values are byte-identical to the originals.
  // MOBILE: the .thermal-sweep re-centres the house, so the letters land on the
  //   glowing-hot part of the thermal image. Orange-on-orange (same hue + same
  //   lightness) washes out. The copy goes white-hot instead: max lightness
  //   contrast against any hot zone, reads as the hottest point in frame, stays
  //   inside the cream brand palette. A warm-dark halo detaches it from lighter
  //   hot patches the way the alarm card's existing dark glow already does.
  // Mobile thermal casing, shared by every hero + alert element:
  //  - MGLOW: an 8-layer near-black glow. The first two layers are ultra-tight
  //    and fully opaque, acting as an outline that hugs each glyph; the rest are
  //    a soft falloff that separates the copy from the hot image.
  //  - MSTROKE: a 0.6px stroke painted BEHIND the fill (paint-order: stroke fill)
  //    so it borders glyphs without thinning even thin body strokes.
  const MGLOW = "0 0 1px rgba(8,6,4,1), 0 0 2px rgba(8,6,4,1), 0 0 4px rgba(8,6,4,0.95), 0 0 8px rgba(8,6,4,0.88), 0 1px 10px rgba(8,6,4,0.8), 0 0 22px rgba(8,6,4,0.65), 0 0 44px rgba(8,6,4,0.48), 0 0 70px rgba(8,6,4,0.34)";
  const MSTROKE = "0.6px rgba(8,6,4,0.92)";
  const T = isMobile
    ? {
        eyebrow:          "#ffd9a0",
        line:             "#ffd9a0",
        head1:            "#faf8f5",
        head2:            "#faf8f5",
        subtext:          "#ffe9d2",
        secondary:        "#ffe9d2",
        badge:            "#ffd9a0",
        alarmLabel:       "#ffd9a0",
        alarmMain:        "#faf8f5",
        headShadow:       MGLOW,
        copyShadow:       MGLOW,
        subShadow:        MGLOW,
        subStroke:        MSTROKE,
        alarmLabelShadow: MGLOW,
        alarmMainShadow:  MGLOW,
        alarmStroke:      MSTROKE,
      }
    : {
        eyebrow:          "#ff6644",
        line:             "#ff4400",
        head1:            "#ff4400",
        head2:            "#ff8800",
        subtext:          "#ffaa44",
        secondary:        "#ffcc44",
        badge:            "#ff8833",
        alarmLabel:       "#cc7733",
        alarmMain:        "#ff4400",
        headShadow:       undefined,
        copyShadow:       undefined,
        subShadow:        undefined,
        subStroke:        undefined,
        // Desktop alert keeps its original dark glow, byte-identical, no stroke.
        alarmLabelShadow: "0 0 20px rgba(13,13,13,0.7), 0 0 50px rgba(13,13,13,0.4)",
        alarmMainShadow:  "0 0 32px rgba(13,13,13,0.8), 0 0 80px rgba(13,13,13,0.5)",
        alarmStroke:      undefined,
      };

  return (
    // Outer scroll tunnel — 167vh gives 67vh of actual scroll travel
    <div
      id="home"
      ref={heroRef}
      style={{
        // Desktop: tall scroll tunnel the sticky panel pins inside.
        // Mobile: a tunnel (350svh ≈ 2.5 screens of pin) that sequences the whole
        // intro — text rises+fades (lingering), attic cross-fades in over the
        // house, the alert line writes word-by-word, the finished alert HOLDS on
        // screen, then cools to cream into Stats.
        minHeight: isMobile ? "350svh" : "calc(274vh - 300px)",
        position: "relative",
      }}
    >
      {/* Inner sticky viewport — pins while outer scrolls.
          zIndex: 2 keeps Hero above the Stats panel during their brief
          viewport overlap. Hero's cream bottom blur covers the seam;
          Stats reveals from underneath as Hero lifts away. */}
      <motion.div
        ref={stickyRef}
        style={{
          // Sticky panel pins inside the outer tunnel.
          position:       "sticky",
          top:            navHeight,
          // Mobile: fit exactly the visible area below the nav, and lay the text
          // out top-safe (auto margins center it when there's room but never push
          // it under the nav). paddingBottom reserves the sticky bottom-bar space.
          height:         isMobile ? `calc(100svh - ${navHeight}px)` : "100svh",
          minHeight:      isMobile ? undefined : "720px",
          overflow:       "clip",
          display:        "flex",
          flexDirection:  isMobile ? "column" : "row",
          justifyContent: isMobile ? "flex-start" : undefined,
          alignItems:     isMobile ? "stretch" : "center",
          paddingBottom:  isMobile ? "80px" : undefined,
          background:     "#faf8f5",
          zIndex:         2,
          opacity:        isMobile ? 1 : heroPanelOpacity,
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
            // Cache as its own layer so the blend composites against cached
            // neighbours instead of re-rastering the full backdrop each frame.
            transform:       "translateZ(0)",
            willChange:      "transform",
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
              quality={65}
              sizes="100vw"
              // Mobile centers the house (it sits on the right of the photo) on the
              // roof apex; md+ keeps the original desktop framing untouched.
              className="object-[72%_50%] md:object-[center_center]"
              style={{ objectFit: "cover" }}
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

        {/* ── Thermal overlay — reveals thermal image + orange text ─────────
            Desktop: mouse cursor drives the radial-gradient mask.
            Mobile (isMobile): the SAME overlay is revealed by the .thermal-sweep
            CSS keyframe spotlight instead (touch has no cursor).
            ──────────────────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            zIndex:        20,
            pointerEvents: "none",
          }}
        >
          <div
            className={isMobile ? "thermal-crossfade" : undefined}
            style={{
              position:         "absolute",
              inset:            0,
              opacity:          isMobile ? undefined : thermalOpacity,
              WebkitMaskImage:  isMobile ? undefined : overlayMask,
              maskImage:        isMobile ? undefined : overlayMask,
              transition:       "opacity 150ms ease-out",
              pointerEvents:    "none",
            }}
          >
            {/* Static full-bleed wrapper for the thermal scene. (Previously
                carried a counter-translate for the masked sweep; the mobile
                reveal is now a simple opacity cross-fade, so no transform here.
                inset:0 keeps the absolutely-positioned children resolving the
                same as before.) */}
            <div style={{ position: "absolute", inset: 0 }}>
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
                  loading="lazy"
                  quality={65}
                  sizes="100vw"
                  className="object-[72%_50%] md:object-[center_center]"
                  style={{ objectFit: "cover" }}
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
                // Mirror the base content's layout exactly so normal + thermal
                // text overlay perfectly (top-safe centering, reserved bottom bar).
                flexDirection:  isMobile ? "column" : "row",
                justifyContent: isMobile ? "flex-start" : undefined,
                alignItems:     isMobile ? "stretch" : "center",
                paddingBottom:  isMobile ? "80px" : undefined,
                y:         isMobile ? mobileContentY : heroContentY,
                opacity:   isMobile ? mobileContentOpacity : undefined,
                // Promote to its own GPU layer so the heavy thermal text-shadows
                // rasterize once and scroll = transform+opacity on the compositor
                // (no per-frame re-raster). transform is owned by framer (y), so
                // backfaceVisibility forces the layer without fighting it.
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div
                className="w-full md:w-[min(58%,760px)]"
                style={{
                  position:     "relative",
                  paddingLeft:  "clamp(1.5rem, 8vw, 7rem)",
                  paddingRight: "clamp(1.5rem, 3vw, 3rem)",
                  marginTop:    isMobile ? "clamp(10px, 2.2vh, 22px)" : undefined,
                  marginBottom: isMobile ? "auto" : undefined,
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
                  <div style={{ width: "32px", height: "1px", background: T.line, flexShrink: 0 }} />
                  <p
                    style={{
                      fontFamily:    "var(--font-dm-sans)",
                      fontSize:      "12px",
                      fontWeight:    500,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color:         T.eyebrow,
                      textShadow:    T.copyShadow,
                      WebkitTextStroke: T.subStroke,
                      paintOrder:    T.subStroke ? "stroke fill" : undefined,
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
                          fontSize:      "clamp(3rem, 7vw, 7.5rem)",
                          fontWeight:    400,
                          fontStyle:     "normal",
                          lineHeight:    0.86,
                          letterSpacing: "-0.03em",
                          color:         i === 1 ? T.head2 : T.head1,
                          textShadow:    T.headShadow,
                          WebkitTextStroke: T.subStroke,
                          paintOrder:    T.subStroke ? "stroke fill" : undefined,
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
                    color:        T.subtext,
                    textShadow:   T.subShadow,
                    WebkitTextStroke: T.subStroke,
                    paintOrder:   T.subStroke ? "stroke fill" : undefined,
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
                      color:         T.secondary,
                      fontFamily:    "var(--font-dm-sans)",
                      fontWeight:    400,
                      fontSize:      "14px",
                      letterSpacing: "0.02em",
                      padding:       "15px 20px",
                      whiteSpace:    "nowrap",
                      textShadow:    T.copyShadow,
                      WebkitTextStroke: T.subStroke,
                      paintOrder:    T.subStroke ? "stroke fill" : undefined,
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
                          color:      T.badge,
                          textShadow: T.copyShadow,
                          WebkitTextStroke: T.subStroke,
                          paintOrder: T.subStroke ? "stroke fill" : undefined,
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
                          color:         T.badge,
                          textShadow:    T.copyShadow,
                          WebkitTextStroke: T.subStroke,
                          paintOrder:    T.subStroke ? "stroke fill" : undefined,
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
                display:       isMobile ? "none" : undefined, // desktop scroll bridge only
              }}
            >
              <p
                style={{
                  fontFamily:    "var(--font-label)",
                  fontSize:      "clamp(1.4rem, 2.6vw, 2.25rem)",
                  fontWeight:    700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:         T.alarmLabel,
                  margin:        "0 0 clamp(0.75rem, 1.8vh, 1.5rem)",
                  lineHeight:    1,
                  textShadow:    T.alarmLabelShadow,
                  WebkitTextStroke: T.alarmStroke,
                  paintOrder:    T.alarmStroke ? "stroke fill" : undefined,
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
                  color:         T.alarmMain,
                  margin:        "0 0 clamp(2rem, 4vh, 3rem)",
                  textShadow:    T.alarmMainShadow,
                  WebkitTextStroke: T.alarmStroke,
                  paintOrder:    T.alarmStroke ? "stroke fill" : undefined,
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
                  color:         T.alarmLabel,
                  margin:        0,
                  lineHeight:    1,
                  textShadow:    T.alarmLabelShadow,
                  WebkitTextStroke: T.alarmStroke,
                  paintOrder:    T.alarmStroke ? "stroke fill" : undefined,
                }}
              >
                {HERO.secondaryPost}
              </p>
            </motion.div>
            </div>
          </div>
        </motion.div>
        {/* ── End thermal overlay ──────────────────────────────────────────── */}

        {/* ── DESKTOP sky reveal (mouse-driven) ────────────────────────────────
            Desktop only. The cursor "opens" a soft window of bright sky over the
            house (radial mask follows the pointer), a warm sun-bloom tracks the
            pointer, and the sky parallaxes for depth. The video loops with a
            crossfade-into-itself (desktop refs). Additive — sits above the thermal
            overlay; does not touch any locked scroll value or any mobile code. */}
        {!isMobile && (
          <>
            <motion.div
              aria-hidden="true"
              style={{
                position:        "absolute",
                inset:           0,
                zIndex:          21,
                pointerEvents:   "none",
                opacity:         thermalOpacity,
                transition:      "opacity 200ms ease-out",
                WebkitMaskImage: skyMask,
                maskImage:       skyMask,
              }}
            >
              {/* Parallax wrapper — sky drifts opposite the cursor for depth */}
              <div
                style={{
                  position:   "absolute",
                  inset:      "-4%",
                  transform:  `translate(${parallax.x * -0.6}px, ${parallax.y * -0.6}px) scale(1.08)`,
                  transition: "transform 0.18s ease-out",
                  willChange: "transform",
                }}
              >
                <video
                  ref={vidADeskRef}
                  src="/alert-sky.mp4"
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 45%", opacity: 1, transition: "opacity 1s linear" }}
                />
                <video
                  ref={vidBDeskRef}
                  src="/alert-sky.mp4"
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 45%", opacity: 0, transition: "opacity 1s linear" }}
                />
              </div>
            </motion.div>

            {/* Warm sun bloom — tracks the pointer, screen-blended light */}
            {heroMousePos && (
              <div
                aria-hidden="true"
                style={{
                  position:      "absolute",
                  left:          heroMousePos.x,
                  top:           heroMousePos.y,
                  width:         "640px",
                  height:        "640px",
                  transform:     "translate(-50%, -50%)",
                  zIndex:        22,
                  pointerEvents: "none",
                  opacity:       thermalOpacity * 0.9,
                  transition:    "opacity 200ms ease-out",
                  mixBlendMode:  "screen",
                  background:    "radial-gradient(circle, rgba(255,247,230,0.95) 0%, rgba(255,234,196,0.55) 18%, rgba(255,210,150,0.22) 38%, transparent 68%)",
                }}
              />
            )}
          </>
        )}

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
            display:       isMobile ? "none" : undefined, // desktop scroll bridge only
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
            // Mobile: top-align with a small gap below the nav (fixed marginTop so
            // the top never clips), marginBottom auto eats leftover space. This
            // keeps the block snug under the header so the CTA fits on first load.
            marginTop:    isMobile ? "clamp(10px, 2.2vh, 22px)" : undefined,
            marginBottom: isMobile ? "auto" : undefined,
            y:       isMobile ? mobileContentY : heroContentY,
            opacity: isMobile ? mobileContentOpacity : undefined,
            // Promote: headline + shadows rasterize once, scroll is composite-only.
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Eyebrow */}
          <div
            className="hero-rise"
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2.5rem", animationDelay: "0.05s" }}
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
          </div>

          {/* Headline — clip-path line reveal on page load (CSS, no JS gate) */}
          <h1 style={{ margin: "0 0 2.25rem", padding: 0 }}>
            {HERO.headline.map((line, i) => (
              <div key={line} style={{ clipPath: "inset(0 -9999px)", lineHeight: 0.86 }}>
                <span
                  className="hero-line"
                  style={{
                    display:       "block",
                    fontFamily:    "var(--font-cormorant)",
                    fontSize:      "clamp(3rem, 7vw, 7.5rem)",
                    fontWeight:    400,
                    fontStyle:     "normal",
                    lineHeight:    0.86,
                    letterSpacing: "-0.03em",
                    color:         "#1a2b3c",
                    animationDelay: `${0.12 + i * 0.1}s`,
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </h1>

          {/* Subheading */}
          <p
            className="hero-rise"
            style={{
              fontFamily:   "var(--font-dm-sans)",
              fontSize:     "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight:   1.72,
              color:        "#3d5060",
              maxWidth:     "400px",
              marginBottom: "2.75rem",
              animationDelay: "0.52s",
            }}
          >
            {HERO.subheading}
          </p>

          {/* CTAs */}
          <div
            className="hero-rise"
            style={{
              display:      "flex",
              flexWrap:     "wrap",
              alignItems:   "center",
              gap:          "0.75rem",
              marginBottom: "3rem",
              animationDelay: "0.62s",
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
          </div>

          {/* Trust badges */}
          <ul
            className="hero-fade"
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "10px",
              listStyle:     "none",
              padding:       0,
              margin:        0,
              animationDelay: "0.82s",
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
          </ul>

        </motion.div>

        {/* Scroll indicator */}
        <div
          className="hero-fade"
          style={{
            position:      "absolute",
            bottom:        "2.5rem",
            left:          "clamp(1.5rem, 8vw, 7rem)",
            zIndex:        10,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           "8px",
            animationDelay: "1.4s",
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
          <div
            aria-hidden="true"
            className="hero-pulse"
            style={{
              width:      "1px",
              height:     "36px",
              background: "rgba(26,26,26,0.15)",
            }}
          />
        </div>

        {/* ── Mobile sequence: attic cross-fade + alert word-write (steps 5-6) ──
            All inside the pinned panel so the house→attic cross-fade happens in
            place (single scroll progress). Mobile only; desktop renders none. */}
        {isMobile && (
          <>
            {/* Attic — cross-fades in over the (still-looping) house */}
            <motion.div
              aria-hidden="true"
              // Keep this layer composited even at opacity 0. Otherwise the browser
              // builds the layer (two 1080p videos + scrim + blend-mode grain) the
              // first frame opacity leaves 0 — a one-frame paint spike that read as a
              // "catch/stick" at the seam. willChange + translateZ promotes it up front.
              // Opaque sky backdrop (avg colour of the clip). The two stacked video
              // copies dip to ~75% combined opacity during their crossfade seam, so
              // without this the house/thermal beneath bleeds ~25% through for ~1s
              // each loop. The backdrop fades in WITH the video (shares this layer's
              // opacity), so the house→video cross-fade is unchanged.
              style={{ position: "absolute", inset: 0, zIndex: 25, background: "#7d8ca0", opacity: mobileAtticOpacity, pointerEvents: "none", willChange: "opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            >
              {/* Push-in: video starts slightly scaled and settles as it fades in.
                  Two stacked copies loop with a crossfade into themselves at the
                  seam (driven by the effect above). */}
              <motion.div style={{ position: "absolute", inset: 0, scale: mobileAtticScale, willChange: "transform" }}>
                {/* Framing: sun sits ~37% across / ~34% down in the source.
                    object-position:37% centres it horizontally; the modest zoom +
                    slight up-shift lifts the sun above the alert copy (its glow
                    bottom meets the text top) while keeping clouds in frame.
                    Tunables: SCALE / Y% here, and object-position X on the videos. */}
                <div style={{ position: "absolute", inset: 0, transform: "translateY(-3%) scale(1.2)", transformOrigin: "center center", willChange: "transform" }}>
                  <video
                    ref={vidARef}
                    src="/alert-sky.mp4"
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%", opacity: 1, transition: "opacity 1s linear", pointerEvents: "none" }}
                  />
                  <video
                    ref={vidBRef}
                    src="/alert-sky.mp4"
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%", opacity: 0, transition: "opacity 1s linear", pointerEvents: "none" }}
                  />
                </div>
              </motion.div>
              {/* Scrim removed — the sky reads bright. The alert copy keeps its own
                  dark halo (M_HALO) for legibility, so no full-frame darkening. */}
              {/* Grain — matches the rest of the surface */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: GRAIN_BG,
                  backgroundRepeat: "repeat",
                  backgroundSize: "200px 200px",
                  mixBlendMode: "overlay",
                  opacity: 0.5,
                }}
              />
            </motion.div>

            {/* Alert line — writes word-by-word over the attic */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0 clamp(1.5rem, 8vw, 3rem)",
                pointerEvents: "none",
              }}
            >
              <div style={{ maxWidth: "20ch" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-label)", fontSize: "clamp(0.8rem, 3.4vw, 1rem)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffc98f", textShadow: M_HALO }}>
                  {renderMWords(mPre)}
                </p>
                <p style={{ margin: "clamp(0.7rem, 2vh, 1.25rem) 0", fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "clamp(3rem, 14vw, 5rem)", lineHeight: 0.92, letterSpacing: "-0.02em", color: "#fdf4e9", textShadow: M_HALO }}>
                  {renderMWords(mMain)}
                </p>
                <p style={{ margin: 0, fontFamily: "var(--font-label)", fontSize: "clamp(0.8rem, 3.4vw, 1rem)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffc98f", textShadow: M_HALO }}>
                  {renderMWords(mPost)}
                </p>
              </div>
            </div>

            {/* Cool to cream — dissolves the whole panel into the Stats burst */}
            <motion.div
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, zIndex: 35, background: "#faf8f5", opacity: mobileExitCream, pointerEvents: "none", willChange: "opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            />
          </>
        )}

      </motion.div>
    </div>
  );
}
