"use client";

import { useState, useEffect } from "react";
import { ESTIMATOR, THREE_WAYS } from "../lib/content";
import { C, Reveal, SectionHeading, Cta, sectionStyle, containerStyle } from "./sectionKit";
import { useLead, Spinner, ErrorNote, SuccessReveal, CheckBadge, Honeypot, focusRing, ERR_ON_LIGHT } from "./leadForm";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const money = (n) => `$${Math.round(n).toLocaleString()}`;
const ATTIC_AMBER = "#e8a060"; // heat indicator — not a general brand color

export default function Estimator() {
  const {
    eyebrow, title, intro, billLabel, billHint, insulationLabel, insulationHint, insulationOptions,
    resultLabel, tenYearLabel, cta, emailPrompt, emailPlaceholder, emailCta,
    emailSending, emailDone, emailDoneSub, rates, billMin, billMax, source,
  } = ESTIMATOR;

  const [bill, setBill] = useState("");
  const [insul, setInsul] = useState("unsure");
  const [billFocused, setBillFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [dailyHigh, setDailyHigh] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const lead = useLead();

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&daily=temperature_2m_max&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1")
      .then((r) => r.json())
      .then((d) => setDailyHigh(Math.round(d.daily.temperature_2m_max[0])))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const raw = parseFloat(bill) || 0;
  const clamped = raw > 0 ? Math.min(billMax, Math.max(billMin, raw)) : 0;
  const [loRate, hiRate] = rates[insul] || rates.unsure;
  const annual = clamped * 12;
  const low = annual * loRate;
  const high = annual * hiRate;
  const hasResult = clamped > 0;
  // +40°F delta is a solar-load phenomenon — only valid on warm days (≥78° high).
  const showAttic = dailyHigh !== null && dailyHigh >= 78;
  const atticTemp = showAttic ? dailyHigh + 40 : null;

  // Email capture POSTs to /api/lead (Resend). Client validates the address, then
  // the status machine (useLead) drives the submitting / success / error states.
  const onEmailSubmit = async (e) => {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) {
      setEmailErr("Please enter a valid email address.");
      return;
    }
    setEmailErr("");
    await lead.submit({
      type: "estimate",
      email: v,
      bill: hasResult ? String(clamped) : "",
      insulation: (insulationOptions.find((o) => o.key === insul) || {}).label || insul,
      estimateRange: hasResult ? `${money(low)}-${money(high)}/yr` : "",
      company: hp,
    });
  };

  return (
    <section id="estimator" style={sectionStyle(C.creamDeep)}>
      <div style={containerStyle}>
        {/* ── Header: text left + live temp panel right ──────── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 4vw, 56px)", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <SectionHeading eyebrow={eyebrow} title={title} align="left" maxWidth="none" />
            <Reveal
              as="p"
              delay={0.1}
              style={{
                margin: "clamp(16px, 2.5vh, 24px) 0 0",
                maxWidth: "52ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                lineHeight: 1.75,
                color: C.ink,
              }}
            >
              {intro}
            </Reveal>
          </div>

          {/* Charlotte temp panel — desktop */}
          {!isMobile && dailyHigh !== null && (
            <Reveal delay={0.08} style={{ flex: "0 0 clamp(240px, 24vw, 290px)" }}>
              <div style={{
                background: C.navy,
                borderRadius: "4px",
                padding: "clamp(28px, 3.2vw, 40px)",
                display: "flex",
                flexDirection: "column",
              }}>
                <span style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.teal,
                  marginBottom: "14px",
                }}>
                  Charlotte, NC · Today
                </span>

                <div style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(3.2rem, 5vw, 4.4rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: C.cream,
                }}>
                  {dailyHigh}°
                </div>
                <span style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.82rem",
                  color: "rgba(250,248,245,0.55)",
                  marginBottom: "20px",
                }}>
                  forecast high
                </span>

                {showAttic && (
                  <>
                    <div style={{
                      height: "1px",
                      background: "rgba(250,248,245,0.12)",
                      marginBottom: "20px",
                    }} />
                    <div style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: ATTIC_AMBER,
                    }}>
                      ~{atticTemp}°
                    </div>
                    <span style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.82rem",
                      color: "rgba(250,248,245,0.55)",
                      marginBottom: "20px",
                    }}>
                      in your attic · afternoon sun
                    </span>
                    <p style={{
                      margin: "0 0 16px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.88rem",
                      lineHeight: 1.55,
                      color: "rgba(250,248,245,0.78)",
                      fontStyle: "italic",
                    }}>
                      Your AC is fighting both.
                    </p>
                  </>
                )}

                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "10px",
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                  color: "rgba(250,248,245,0.38)",
                }}>
                  {showAttic
                    ? "Attics run 40–60°F hotter than outside in direct summer sun · U.S. DOE"
                    : "Attic temperatures vary with season and sun exposure · U.S. DOE"}
                </p>
              </div>
            </Reveal>
          )}
        </div>

        {/* Charlotte temp strip — mobile */}
        {isMobile && dailyHigh !== null && (
          <Reveal delay={0.12} style={{ marginTop: "clamp(20px, 3vh, 28px)" }}>
            <div style={{
              background: C.navy,
              borderRadius: "4px",
              padding: "16px 20px",
            }}>
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.teal,
              }}>
                Charlotte Today
              </span>
              <div style={{
                display: "flex",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "6px 10px",
                marginTop: "8px",
              }}>
                <span style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.9rem",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: C.cream,
                }}>
                  {dailyHigh}°
                </span>
                <span style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.8rem",
                  color: "rgba(250,248,245,0.5)",
                }}>
                  forecast high
                </span>
                {showAttic && (
                  <>
                    <span style={{ color: "rgba(250,248,245,0.3)", fontSize: "0.9rem" }}>→</span>
                    <span style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.9rem",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: ATTIC_AMBER,
                    }}>
                      ~{atticTemp}°
                    </span>
                    <span style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.8rem",
                      color: "rgba(250,248,245,0.5)",
                    }}>
                      in your attic · afternoon sun
                    </span>
                  </>
                )}
              </div>
              <p style={{
                margin: "8px 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10px",
                color: "rgba(250,248,245,0.35)",
                letterSpacing: "0.02em",
              }}>
                Attics run 40–60°F hotter in summer sun · U.S. DOE
              </p>
            </div>
          </Reveal>
        )}

        {/* ── Three-ways ledger ──────────────────────────────── */}
        <Reveal
          delay={0.16}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "clamp(24px, 3vw, 40px)",
            marginTop: "clamp(36px, 5vh, 56px)",
          }}
        >
          {THREE_WAYS.map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: `1.5px solid ${C.border}`,
                paddingTop: "clamp(18px, 2.4vh, 24px)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-label)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.teal,
                  marginBottom: "10px",
                }}
              >
                0{i + 1}
              </span>
              <p
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
                  fontWeight: 400,
                  lineHeight: 1.25,
                  color: C.navy,
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.88rem, 1vw, 0.95rem)",
                  lineHeight: 1.65,
                  color: C.ink,
                }}
              >
                {item.body}
              </p>
              {item.source && (
                <p
                  style={{
                    margin: "10px 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "11px",
                    letterSpacing: "0.03em",
                    color: C.inkSoft,
                    opacity: 0.8,
                  }}
                >
                  {item.source}
                </p>
              )}
            </div>
          ))}
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
              {raw > 0 && raw !== clamped ? (
                <p style={{ margin: "8px 0 0", fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: C.inkSoft }}>
                  Showing the estimate for {money(clamped)}/mo — the typical NC range.
                </p>
              ) : (
                <p style={{ margin: "8px 0 0", fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: C.inkSoft }}>
                  {billHint}
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
              <p style={{ margin: "10px 0 0", fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: C.inkSoft }}>
                {insulationHint}
              </p>
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

        {/* ── Email capture → /api/lead (Resend) + source ───── */}
        <Reveal delay={0.26} style={{ marginTop: "clamp(32px, 5vh, 48px)", maxWidth: "640px" }}>
          {lead.status === "success" ? (
            <SuccessReveal
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                maxWidth: "520px",
                padding: "clamp(18px, 2.4vw, 24px)",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: "4px",
              }}
            >
              <CheckBadge size={42} />
              <div>
                <p style={{ margin: 0, fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", lineHeight: 1.1, color: C.navy }}>
                  {emailDone}
                </p>
                <p style={{ margin: "6px 0 0", fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", lineHeight: 1.55, color: C.inkSoft }}>
                  {emailDoneSub}
                </p>
              </div>
            </SuccessReveal>
          ) : (
            <form onSubmit={onEmailSubmit} noValidate>
              <Honeypot value={hp} onChange={(e) => setHp(e.target.value)} />
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
                  aria-invalid={!!emailErr}
                  disabled={lead.busy}
                  onChange={(e) => { setEmail(e.target.value); if (emailErr) setEmailErr(""); }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={{
                    flex: "1 1 220px",
                    border: `1.5px solid ${emailErr ? ERR_ON_LIGHT : emailFocused ? C.teal : C.border}`,
                    borderRadius: "3px",
                    padding: "14px 16px",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "1rem",
                    color: C.navy,
                    background: C.surface,
                    outline: "none",
                    boxShadow: emailFocused ? focusRing(emailErr ? "rgba(168,57,42,0.22)" : undefined) : "none",
                    transition: "border-color 150ms ease, box-shadow 150ms ease",
                  }}
                />
                <button
                  type="submit"
                  disabled={lead.busy}
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
                    padding: "14px 26px",
                    minHeight: "52px",
                    border: `1.5px solid ${C.navy}`,
                    borderRadius: "3px",
                    background: "transparent",
                    color: C.navy,
                    cursor: lead.busy ? "wait" : "pointer",
                    opacity: lead.busy ? 0.7 : 1,
                    transition: "background 160ms ease, transform 160ms ease, opacity 160ms ease",
                  }}
                  onMouseEnter={(e) => { if (lead.busy) return; e.currentTarget.style.background = C.navy; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.navy; e.currentTarget.style.transform = "none"; }}
                >
                  {lead.busy ? (<><Spinner size={15} />{emailSending}</>) : emailCta}
                </button>
              </div>
              <ErrorNote>{emailErr || (lead.status === "error" ? lead.error : "")}</ErrorNote>
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
