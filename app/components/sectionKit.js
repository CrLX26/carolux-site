"use client";

// ── Shared kit for the lower-page marketing sections ─────────────────────────
// Services / WhyUs / Packages / Reviews / Contact / Footer all build on this.
// Hero, Stats and Nav are LOCKED and do not import from here.
//
// House conventions mirrored from Hero.js / Stats.js:
//   • inline styles + clamp() for fluid sizing
//   • fonts via CSS vars (--font-cormorant display, --font-dm-sans body,
//     --font-label uppercase tracked labels)
//   • EASE = [0.16, 1, 0.3, 1]
//   • brand tokens below

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const C = {
  cream:    "#faf8f5", // page background
  creamDeep:"#f4f1ea", // testimonials band — a half-step warmer than cream
  surface:  "#fefdfb", // card surface — warm white, never pure #fff
  navy:     "#1a2b3c", // headings, body, dark bands
  navyDeep: "#0d1d2b", // footer / deepest navy
  teal:     "#4a90a4", // primary accent + CTA
  tealDeep: "#3d7d90", // CTA hover (matches Nav.js)
  ink:      "#2C2C2C", // body text on light (never pure black)
  inkSoft:  "rgba(26,43,60,0.72)",
  border:   "#d0cec8", // soft hairline border
};

// Fluid section shell — generous premium rhythm, anchor-safe under the fixed nav.
export const sectionStyle = (bg) => ({
  background: bg,
  padding: "clamp(80px, 12vh, 160px) clamp(24px, 6vw, 80px)",
  scrollMarginTop: "84px", // so #anchor jumps clear the fixed header
});

export const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
};

// ── Reveal — scroll-into-view fade/rise. Respects prefers-reduced-motion. ─────
export function Reveal({ children, as = "div", delay = 0, y = 28, amount = 0.3, style, ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      style={style}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// ── Section heading — eyebrow rule + tracked label + serif display title ──────
export function SectionHeading({ eyebrow, title, dark = false, align = "center", maxWidth }) {
  const fg = dark ? C.cream : C.navy;
  return (
    <div style={{ textAlign: align, maxWidth, margin: align === "center" ? "0 auto" : undefined }}>
      {eyebrow && (
        <Reveal
          as="p"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            margin: 0,
            fontFamily: "var(--font-label)",
            fontSize: "clamp(11px, 1vw, 13px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.teal,
          }}
        >
          <span aria-hidden="true" style={{ width: "26px", height: "1.5px", background: C.teal, opacity: 0.8 }} />
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={eyebrow ? 0.08 : 0}
        style={{
          margin: eyebrow ? "clamp(14px, 2vh, 22px) 0 0" : 0,
          fontFamily: "var(--font-cormorant)",
          fontWeight: 400,
          fontSize: "clamp(2.25rem, 5vw, 4rem)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          color: fg,
        }}
      >
        {title}
      </Reveal>
    </div>
  );
}

// ── LiftCard — hover/focus elevation. Used by Services + Packages. ────────────
export function LiftCard({ children, style, hoverBorder = C.teal, rest = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
        transform: hovered ? "translateY(-5px)" : `translateY(${rest}px)`,
        boxShadow: hovered
          ? "0 22px 48px rgba(26,43,60,0.12)"
          : "0 1px 3px rgba(26,43,60,0.05)",
        ...style,
        borderColor: hovered ? hoverBorder : style?.borderColor,
      }}
    >
      {children}
    </div>
  );
}

// ── Cta — accessible link button. Separate hover + focus so keyboard users
//    get a visible focus ring, not just the hover colour shift. ──────────────
export function Cta({
  href,
  children,
  variant = "solid", // "solid" | "outline"
  onDark = false, // outline-on-dark: cream label + cream-tinted border at rest
  arrow = true,
  leadingIcon = null,
  ringColor = C.navy,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;
  const solid = variant === "solid";

  // Colours resolved so contrast holds in BOTH rest and active states.
  // (Layout overrides from `style` are spread first; visual props win after.)
  const restColor = onDark ? C.cream : C.teal;
  const restBorder = onDark ? "rgba(250,248,245,0.45)" : C.teal;

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontFamily: "var(--font-label)",
        fontWeight: 600,
        fontSize: "14px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "16px 30px",
        minHeight: "52px",
        borderRadius: "3px",
        cursor: "pointer",
        textDecoration: "none",
        // Cap at the container and let long labels wrap instead of forcing a
        // nowrap line wider than a phone (that overflow scrolled the whole page).
        // Short labels still sit on one line, so existing CTAs are unchanged.
        maxWidth: "100%",
        whiteSpace: "normal",
        textAlign: "center",
        transition:
          "background 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        ...style,
        // Visual state — declared after ...style so contrast can't be broken by callers.
        border: `1.5px solid ${solid ? "transparent" : active ? C.teal : restBorder}`,
        background: solid ? (active ? C.tealDeep : C.teal) : active ? C.teal : "transparent",
        color: solid ? "#ffffff" : active ? "#ffffff" : restColor,
        transform: active ? "translateY(-1px)" : "none",
        boxShadow: active && solid ? "0 12px 26px rgba(74,144,164,0.30)" : "none",
        outline: focused ? `2px solid ${ringColor}` : "none",
        outlineOffset: "3px",
      }}
      {...rest}
    >
      {leadingIcon}
      {children}
      {arrow && <ArrowIcon />}
    </a>
  );
}

// ── Inline SVG icons — vector, currentColor, no emoji ─────────────────────────
export function ArrowIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.05 1.1-6.47L2.6 9.9l6.5-.95L12 2.5z" />
    </svg>
  );
}

export function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M6.5 4h3l1.5 4-2 1.5a12 12 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 014.5 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChatIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M21 11.5a8.38 8.38 0 01-8.5 8.5 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 01-.9-3.8A8.38 8.38 0 0112.5 3 8.38 8.38 0 0121 11.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
