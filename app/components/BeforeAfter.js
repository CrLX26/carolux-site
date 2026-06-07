"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BEFORE_AFTER } from "../lib/content";
import { C, Reveal, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

// Drag-to-compare slider. Logic ported from carolux-tools ProposalPage,
// restyled to the Carolux marketing system (teal handle, cream divider on navy).
function Slider({ before, after, label }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const touchStart = useRef({ x: 0, y: 0, decided: false });

  useEffect(() => {
    const getPos = (clientX) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    };
    const onMouseMove = (e) => { if (dragging.current) getPos(e.clientX); };
    const onTouchMove = (e) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      // Decide drag intent: ignore vertical scrolls so the page still scrolls.
      if (!touchStart.current.decided) {
        const dx = Math.abs(t.clientX - touchStart.current.x);
        const dy = Math.abs(t.clientY - touchStart.current.y);
        if (dx < 4 && dy < 4) return;
        touchStart.current.decided = true;
        if (dy >= dx) { dragging.current = false; return; }
      }
      if (e.cancelable) e.preventDefault();
      getPos(t.clientX);
    };
    const onEnd = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  const onMouseDown = (e) => {
    dragging.current = true;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setPos(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
  };
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY, decided: false };
    dragging.current = true;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      role="slider"
      aria-label={`${label}: drag to compare before and after`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
      style={{
        position: "relative",
        aspectRatio: "4 / 3",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
        cursor: "ew-resize",
        borderRadius: "4px",
        border: "1px solid rgba(74,144,164,0.45)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.32)",
      }}
    >
      {/* AFTER — full background */}
      <Image
        src={after}
        alt={`${label}, after Carolux completed the work`}
        fill
        draggable={false}
        sizes="(max-width: 768px) 92vw, 560px"
        style={{ objectFit: "cover", pointerEvents: "none" }}
      />

      {/* BEFORE — clipped to the left of the handle */}
      <Image
        src={before}
        alt={`${label}, before Carolux started`}
        fill
        draggable={false}
        sizes="(max-width: 768px) 92vw, 560px"
        style={{ objectFit: "cover", clipPath: `inset(0 ${100 - pos}% 0 0)`, pointerEvents: "none" }}
      />

      {/* Bottom gradient for label legibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(13,29,43,0.72) 0%, transparent 38%)",
          pointerEvents: "none",
        }}
      />

      {/* Labels */}
      <span style={{ position: "absolute", bottom: "1rem", left: "1.1rem", fontFamily: "var(--font-label)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,248,245,0.78)", pointerEvents: "none" }}>
        Before
      </span>
      <span style={{ position: "absolute", bottom: "1rem", right: "1.1rem", fontFamily: "var(--font-label)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.teal, pointerEvents: "none" }}>
        After
      </span>

      {/* Divider */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "2px", background: "rgba(250,248,245,0.9)", transform: "translateX(-50%)", pointerEvents: "none" }}
      />

      {/* Handle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: C.cream,
          boxShadow: "0 2px 14px rgba(0,0,0,0.45)",
          border: `2px solid ${C.teal}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <path d="M6 1L1 7L6 13" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 1L19 7L14 13" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const { eyebrow, title, intro, pairs } = BEFORE_AFTER;

  return (
    <section id="before-after" style={{ ...sectionStyle(C.navy), position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-8%",
          width: "44%",
          height: "60%",
          background: "radial-gradient(circle, rgba(74,144,164,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ ...containerStyle, position: "relative" }}>
        <SectionHeading eyebrow={eyebrow} title={title} dark maxWidth="22ch" />

        <Reveal
          as="p"
          delay={0.12}
          style={{
            margin: "clamp(20px, 3vh, 30px) auto 0",
            maxWidth: "54ch",
            textAlign: "center",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(1.02rem, 1.3vw, 1.18rem)",
            lineHeight: 1.78,
            color: "rgba(250,248,245,0.82)",
          }}
        >
          {intro}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(28px, 4vw, 48px)",
            marginTop: "clamp(48px, 8vh, 88px)",
          }}
        >
          {pairs.map((p, i) => (
            <Reveal key={p.label} delay={0.2 + i * 0.12}>
              <Slider before={p.before} after={p.after} label={p.label} />
              <div style={{ marginTop: "18px" }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 400,
                    fontSize: "clamp(1.25rem, 1.8vw, 1.55rem)",
                    color: C.cream,
                  }}
                >
                  {p.label}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(0.9rem, 1vw, 0.98rem)",
                    color: "rgba(250,248,245,0.7)",
                  }}
                >
                  {p.caption}
                </p>
                {p.location && (
                  <p
                    style={{
                      margin: "8px 0 0",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      fontFamily: "var(--font-label)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.teal,
                    }}
                  >
                    <span aria-hidden="true" style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.teal }} />
                    {p.location}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
