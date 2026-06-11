"use client";

// ── Lead-form kit ────────────────────────────────────────────────────────────
// Shared status machine + UI atoms for the two lead surfaces (Estimator email
// capture, Contact form). Both POST to /api/lead. Extends the committed brand
// identity in sectionKit — no new fonts, same tokens, ease-out motion only.

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { C, EASE } from "./sectionKit";

// Error tints, chosen INTO the warm cream/navy palette (thermal orange stays
// reserved for the hero). Rust reads on cream; coral reads on navy.
export const ERR_ON_LIGHT = "#a8392a";
export const ERR_ON_DARK  = "#f0a890";

// Accessible keyboard ring layered over the existing border-color change.
export const focusRing = (rgba = "rgba(74,144,164,0.28)") => `0 0 0 3px ${rgba}`;

// Honeypot: off-screen (not display:none, which more bots skip), unreachable by
// keyboard, never autofilled. A filled value = bot → server drops it silently.
export const HONEYPOT_NAME = "company";
export const honeypotWrapStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" style={honeypotWrapStyle}>
      <label htmlFor="lead-company">Company (leave blank)</label>
      <input
        id="lead-company"
        name={HONEYPOT_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

// Small rotating ring for the submitting state. Linear spin is a functional
// indicator; reduced-motion users get the static ring + the "Sending" label.
export function Spinner({ size = 16, color = "currentColor" }) {
  const reduce = useReducedMotion();
  const ring = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: `2px solid ${color}`,
    borderTopColor: "transparent",
    display: "inline-block",
  };
  if (reduce) return <span aria-hidden="true" style={{ ...ring, opacity: 0.7 }} />;
  return (
    <motion.span
      aria-hidden="true"
      style={ring}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: 0.7 }}
    />
  );
}

// Inline field/form error line. role="alert" so it's announced; warm tint, never
// a harsh red bar.
export function ErrorNote({ children, onDark = false, style }) {
  if (!children) return null;
  return (
    <p
      role="alert"
      style={{
        margin: "8px 0 0",
        display: "flex",
        alignItems: "flex-start",
        gap: "6px",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "13px",
        lineHeight: 1.45,
        color: onDark ? ERR_ON_DARK : ERR_ON_LIGHT,
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ fontWeight: 700, lineHeight: 1.3 }}>!</span>
      <span>{children}</span>
    </p>
  );
}

// Success reveal — opacity/scale only (never layout props), ease-out.
export function SuccessReveal({ children, style }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── useLead — the status machine shared by both forms ────────────────────────
// status: idle | submitting | success | error
export function useLead() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(payload) {
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong on our end.");
      setStatus("success");
      return true;
    } catch (e) {
      setError(e?.message || "We couldn't send that. Please try again, or call us.");
      setStatus("error");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setError("");
  }

  return { status, error, submit, reset, busy: status === "submitting" };
}

// Brand check glyph for success states (matches sectionKit CheckIcon weight).
export function CheckBadge({ size = 44, ring = C.teal, bg = "rgba(74,144,164,0.12)" }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        border: `1.5px solid ${ring}`,
        color: ring,
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}
