"use client";

import { useState } from "react";
import { ESTIMATOR } from "../lib/content";
import { C, Reveal, SectionHeading, Cta, sectionStyle, containerStyle } from "./sectionKit";

const money = (n) => `$${Math.round(n).toLocaleString()}`;

export default function Estimator() {
  const {
    eyebrow, title, intro, billLabel, insulationLabel, insulationOptions,
    resultLabel, tenYearLabel, cta, emailPrompt, emailPlaceholder, emailCta,
    emailDone, rates, billMin, billMax, source,
  } = ESTIMATOR;

  const [bill, setBill] = useState("");
  const [insul, setInsul] = useState("unsure");
  const [billFocused, setBillFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const raw = parseFloat(bill) || 0;
  const clamped = raw > 0 ? Math.min(billMax, Math.max(billMin, raw)) : 0;
  const [loRate, hiRate] = rates[insul] || rates.unsure;
  const annual = clamped * 12;
  const low = annual * loRate;
  const high = annual * hiRate;
  const hasResult = clamped > 0;

  // NOTE: email capture is intentionally NOT wired to a backend yet — see content.js TODO.
  // This only flips local UI state so the field feels responsive; nothing is sent or stored.
  const onEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setEmailSent(true);
  };

  return (
    <section id="estimator" style={sectionStyle(C.creamDeep)}>
      <div style={containerStyle}>
        <SectionHeading eyebrow={eyebrow} title={title} align="left" maxWidth="20ch" />

        <Reveal
          as="p"
          delay={0.1}
          style={{
            margin: "clamp(16px, 2.5vh, 24px) 0 0",
            maxWidth: "58ch",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
            lineHeight: 1.75,
            color: C.ink,
          }}
        >
          {intro}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(28px, 4vw, 56px)",
            alignItems: "stretch",
            marginTop: "clamp(40px, 6vh, 72px)",
          }}
        >
          {/* ── Inputs ───────────────────────────────────────────── */}
          <Reveal delay={0.12} style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 4vh, 40px)" }}>
            {/* Monthly bill */}
            <div>
              <label
                htmlFor="est-bill"
                style={{
                  display: "block",
                  fontFamily: "var(--font-label)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.inkSoft,
                  marginBottom: "12px",
                }}
              >
                {billLabel}
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  maxWidth: "320px",
                  background: C.surface,
                  border: `1.5px solid ${billFocused ? C.teal : C.border}`,
                  borderRadius: "3px",
                  padding: "2px 16px",
                  transition: "border-color 150ms ease",
                }}
              >
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: C.inkSoft }}>$</span>
                <input
                  id="est-bill"
                  type="number"
                  inputMode="numeric"
                  placeholder="220"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  onFocus={() => setBillFocused(true)}
                  onBlur={() => setBillFocused(false)}
                  style={{
                    flex: 1,
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "1.15rem",
                    color: C.navy,
                    padding: "14px 0",
                  }}
                />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: C.inkSoft }}>/mo</span>
              </div>
              {raw > 0 && raw !== clamped && (
                <p style={{ margin: "8px 0 0", fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: C.inkSoft }}>
                  Showing the estimate for {money(clamped)}/mo — the typical NC range.
                </p>
              )}
            </div>

            {/* Insulation state — segmented control */}
            <div>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-label)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.inkSoft,
                  marginBottom: "12px",
                }}
              >
                {insulationLabel}
              </span>
              <div role="radiogroup" aria-label={insulationLabel} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {insulationOptions.map((opt) => {
                  const active = insul === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setInsul(opt.key)}
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.95rem",
                        padding: "11px 18px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        border: `1.5px solid ${active ? C.teal : C.border}`,
                        background: active ? C.teal : C.surface,
                        color: active ? "#ffffff" : C.ink,
                        transition: "background 150ms ease, border-color 150ms ease, color 150ms ease",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* ── Result ───────────────────────────────────────────── */}
          <Reveal
            delay={0.2}
            style={{
              background: C.navy,
              borderRadius: "4px",
              padding: "clamp(28px, 4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "260px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-30%",
                right: "-15%",
                width: "55%",
                height: "70%",
                background: "radial-gradient(circle, rgba(74,144,164,0.20) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }} aria-live="polite">
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.teal,
                }}
              >
                {resultLabel}
              </span>

              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "clamp(2.6rem, 6vw, 4rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: C.cream,
                  margin: "12px 0 0",
                }}
              >
                {hasResult ? `${money(low)}–${money(high)}` : "$ —"}
              </div>

              <p
                style={{
                  margin: "16px 0 0",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.98rem",
                  color: "rgba(250,248,245,0.78)",
                }}
              >
                {hasResult
                  ? `${tenYearLabel}: ${money(low * 10)}–${money(high * 10)}.`
                  : "Enter your monthly bill to see your estimate."}
              </p>

              <div style={{ marginTop: "clamp(22px, 3vh, 30px)" }}>
                <Cta href="#contact" variant="solid" ringColor={C.cream}>
                  {cta}
                </Cta>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Email capture (stub — goes nowhere yet) + source ───── */}
        <Reveal delay={0.26} style={{ marginTop: "clamp(32px, 5vh, 48px)", maxWidth: "640px" }}>
          {emailSent ? (
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "1rem",
                color: C.teal,
                fontWeight: 500,
                margin: 0,
              }}
            >
              {emailDone}
            </p>
          ) : (
            <form onSubmit={onEmailSubmit}>
              <label
                htmlFor="est-email"
                style={{
                  display: "block",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.98rem",
                  color: C.ink,
                  marginBottom: "12px",
                }}
              >
                {emailPrompt}
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", maxWidth: "520px" }}>
                <input
                  id="est-email"
                  type="email"
                  required
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: "1 1 220px",
                    border: `1.5px solid ${C.border}`,
                    borderRadius: "3px",
                    padding: "14px 16px",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "1rem",
                    color: C.navy,
                    background: C.surface,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "var(--font-label)",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "14px 26px",
                    minHeight: "52px",
                    border: `1.5px solid ${C.navy}`,
                    borderRadius: "3px",
                    background: C.navy,
                    color: "#ffffff",
                    cursor: "pointer",
                    transition: "background 160ms ease, transform 160ms ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = C.navyDeep; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = C.navy; e.currentTarget.style.transform = "none"; }}
                >
                  {emailCta}
                </button>
              </div>
            </form>
          )}

          <p
            style={{
              margin: "clamp(20px, 3vh, 28px) 0 0",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: C.inkSoft,
              maxWidth: "60ch",
            }}
          >
            {source}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
