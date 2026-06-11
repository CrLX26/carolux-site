"use client";

import { useSyncExternalStore } from "react";
import { WHY_US } from "../lib/content";
import { C, Reveal, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

// ── Quadrant ledger ───────────────────────────────────────────────────────────
// The four reasons sit in a single 2×2 grid divided by ONE structural cross of
// hairlines (a vertical centre rule + a horizontal mid rule) instead of a repeated
// rule under each pillar. One intentional grid reads as editorial structure; four
// identical accents read as template scaffolding. Below 640px it stacks to a single
// column with hairlines between the items, like mobile.
const LINE = "rgba(250,248,245,0.13)";

function subscribeNarrow(cb) {
  const mq = window.matchMedia("(max-width: 640px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getNarrowSnapshot       = () => window.matchMedia("(max-width: 640px)").matches;
const getNarrowServerSnapshot = () => false;

// Per-cell padding + borders that compose the single cross (wide) or a stack of
// horizontal rules (narrow). Outer edges stay flush so the content aligns to the
// section margins; the breathing room lives inside, around the centre lines.
function cellStyle(index, isNarrow, isLast) {
  if (isNarrow) {
    return {
      paddingTop:    index === 0 ? 0 : "clamp(28px, 6vw, 40px)",
      paddingBottom: "clamp(28px, 6vw, 40px)",
      borderBottom:  isLast ? "none" : `1px solid ${LINE}`,
    };
  }
  const col = index % 2;          // 0 = left, 1 = right
  const topRow = index < 2;
  return {
    paddingLeft:   col === 0 ? 0 : "clamp(34px, 4vw, 68px)",
    paddingRight:  col === 0 ? "clamp(34px, 4vw, 68px)" : 0,
    paddingTop:    topRow ? 0 : "clamp(40px, 5.5vh, 72px)",
    paddingBottom: topRow ? "clamp(40px, 5.5vh, 72px)" : 0,
    borderRight:   col === 0 ? `1px solid ${LINE}` : "none",
    borderBottom:  topRow ? `1px solid ${LINE}` : "none",
  };
}

function Pillar({ item, index, isNarrow, isLast }) {
  return (
    <Reveal delay={index * 0.08} style={cellStyle(index, isNarrow, isLast)}>
      {/* Roman numeral — the editorial index, promoted to carry real weight */}
      <span
        aria-hidden="true"
        style={{
          display: "block",
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(34px, 3.6vw, 50px)",
          lineHeight: 1,
          color: C.teal,
          letterSpacing: "0.03em",
          opacity: 0.9,
        }}
      >
        {item.roman}
      </span>

      <h3
        style={{
          margin: "clamp(20px, 2.6vh, 32px) 0 0",
          fontFamily: "var(--font-cormorant)",
          fontWeight: 400,
          fontSize: "clamp(1.5rem, 2.3vw, 2rem)",
          lineHeight: 1.15,
          color: C.cream,
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          margin: "16px 0 0",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.98rem, 1.15vw, 1.05rem)",
          lineHeight: 1.72,
          color: "rgba(250,248,245,0.78)",
          maxWidth: "40ch",
        }}
      >
        {item.description}
      </p>
    </Reveal>
  );
}

export default function WhyUs() {
  const isNarrow = useSyncExternalStore(subscribeNarrow, getNarrowSnapshot, getNarrowServerSnapshot);

  return (
    <section id="why-us" style={{ ...sectionStyle(C.navy), position: "relative", overflow: "hidden" }}>
      {/* Soft teal glow, top-left — premium depth without clutter */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "45%",
          height: "60%",
          background: "radial-gradient(circle, rgba(74,144,164,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ ...containerStyle, position: "relative" }}>
        <SectionHeading
          eyebrow="The Carolux Difference"
          title="Why homeowners choose us"
          dark
          maxWidth="20ch"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isNarrow ? "1fr" : "repeat(2, minmax(0, 1fr))",
            marginTop: "clamp(48px, 8vh, 96px)",
          }}
        >
          {WHY_US.map((item, i) => (
            <Pillar
              key={item.roman}
              item={item}
              index={i}
              isNarrow={isNarrow}
              isLast={i === WHY_US.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
