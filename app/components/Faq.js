"use client";

import { useState, useId, useSyncExternalStore } from "react";
import { FAQ } from "../lib/faq";
import { C, Reveal, EASE, sectionStyle, containerStyle } from "./sectionKit";

// ── FAQ — editorial two-column accordion ──────────────────────────────────────
// Sticky heading on the left, a hairline-divided Q&A list on the right (the same
// hairline language as the WhyUs ledger, for a cohesive system). Answers expand
// via grid-template-rows (animatable, unlike height) and stay in the DOM whether
// open or closed, so the FAQPage schema and AI crawlers always see the full text.
// First item opens by default so the section never reads as an empty stack.

function subscribeWide(cb) {
  const mq = window.matchMedia("(min-width: 880px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getWideSnapshot       = () => window.matchMedia("(min-width: 880px)").matches;
const getWideServerSnapshot = () => true; // server renders the desktop two-column

function Chevron({ open }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={C.teal}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        flexShrink: 0,
        marginTop: "4px",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 360ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function FaqItem({ q, a, learnMoreHref, learnMoreLabel, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  const panelId = `${base}-panel`;
  const btnId = `${base}-q`;

  return (
    <div style={{ borderTop: `1px solid ${C.border}` }}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "clamp(16px, 2.5vw, 32px)",
            padding: "clamp(20px, 2.7vh, 28px) 0",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            color: open ? C.teal : C.navy,
            transition: "color 220ms ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)",
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: "-0.005em",
            }}
          >
            {q}
          </span>
          <Chevron open={open} />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 380ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ paddingBottom: "clamp(22px, 3vh, 32px)" }}>
            <p
              style={{
                margin: 0,
                maxWidth: "64ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.98rem, 1.1vw, 1.05rem)",
                lineHeight: 1.72,
                color: C.inkSoft,
              }}
            >
              {a}
            </p>
            {learnMoreHref && (
              <a
                href={learnMoreHref}
                style={{
                  display: "inline-block",
                  marginTop: "0.75rem",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  color: C.teal,
                  textDecoration: "none",
                  borderBottom: `1px solid ${C.teal}`,
                  lineHeight: 1,
                  paddingBottom: "2px",
                  letterSpacing: "0.01em",
                }}
              >
                {learnMoreLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const { eyebrow, title, items } = FAQ;
  const isWide = useSyncExternalStore(subscribeWide, getWideSnapshot, getWideServerSnapshot);

  return (
    <section id="faq" style={sectionStyle(C.cream)}>
      <div
        style={{
          ...containerStyle,
          display: "grid",
          gridTemplateColumns: isWide ? "minmax(0, 0.82fr) minmax(0, 1.18fr)" : "1fr",
          gap: "clamp(36px, 5vw, 88px)",
          alignItems: "start",
        }}
      >
        {/* Heading — sticky on wide so it holds while the answers scroll past */}
        <div style={{ position: isWide ? "sticky" : "static", top: "104px" }}>
          <Reveal
            as="p"
            style={{
              margin: 0,
              fontFamily: "var(--font-label)",
              fontSize: "clamp(11px, 1vw, 13px)",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.teal,
            }}
          >
            {eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            style={{
              margin: "clamp(14px, 2vh, 22px) 0 0",
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(2.1rem, 3.4vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: C.navy,
              maxWidth: "14ch",
            }}
          >
            {title}
          </Reveal>
        </div>

        {/* Q&A list — bottom border closes the ledger of hairlines */}
        <Reveal style={{ borderBottom: `1px solid ${C.border}` }}>
          {items.map((item, i) => (
            <FaqItem
              key={i}
              q={item.q}
              a={item.a}
              learnMoreHref={item.learnMoreHref}
              learnMoreLabel={item.learnMoreLabel}
              defaultOpen={i === 0}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
