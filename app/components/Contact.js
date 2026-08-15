"use client";

import { useState } from "react";
import { COMPANY, CONTACT, SMS_CONSENT } from "../lib/content";
import {
  C,
  Reveal,
  Cta,
  CheckIcon,
  PhoneIcon,
  MailIcon,
  ChatIcon,
  sectionStyle,
  containerStyle,
} from "./sectionKit";
import {
  useLead,
  Spinner,
  ErrorNote,
  SuccessReveal,
  CheckBadge,
  Honeypot,
  focusRing,
  ERR_ON_LIGHT,
} from "./leadForm";

// Shared field styling — warm-white surface so inputs read cleanly on the navy band.
const fieldStyle = {
  width: "100%",
  border: `1.5px solid ${C.border}`,
  borderRadius: "3px",
  padding: "14px 16px",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "1rem",
  color: C.navy,
  background: C.surface,
  outline: "none",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-label)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(250,248,245,0.7)",
  marginBottom: "8px",
};

function Field({ id, label, type = "text", value, onChange, placeholder, required, autoComplete, invalid, disabled }) {
  const [focused, setFocused] = useState(false);
  const borderColor = invalid ? ERR_ON_LIGHT : focused ? C.teal : C.border;
  return (
    <div style={{ textAlign: "left" }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!invalid}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...fieldStyle,
          borderColor,
          boxShadow: focused ? focusRing(invalid ? "rgba(168,57,42,0.25)" : undefined) : "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
        }}
      />
    </div>
  );
}

export default function Contact() {
  const { eyebrow, title, intro, bookLead, bookCta, formOr, form, reassurance, serving } = CONTACT;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [msgFocused, setMsgFocused] = useState(false);
  const [tried, setTried] = useState(false);
  const [hp, setHp] = useState(""); // honeypot
  const [smsConsent, setSmsConsent] = useState(false); // WI-041: unchecked by default
  const lead = useLead();

  const nameErr = tried && !name.trim();
  const phoneErr = tried && !phone.trim();

  // POST to /api/lead (Resend). Name + phone are the only hard requirements so an
  // owner can call back. The direct phone/email CTAs below are the always-on fallback.
  const onSubmit = async (e) => {
    e.preventDefault();
    setTried(true);
    if (!name.trim() || !phone.trim()) return;
    await lead.submit({
      type: "contact",
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      message: message.trim(),
      company: hp,
      // WI-041: SMS/TCPA consent record. Submission is allowed either way; we send the
      // boolean (incl. false) plus the exact versioned text shown, so team@ has the record.
      smsConsent,
      consentVersion: SMS_CONSENT.version,
      consentScope: SMS_CONSENT.scope,
      consentText: `${SMS_CONSENT.lead} ${SMS_CONSENT.body}`,
    });
  };

  return (
    <section
      id="contact"
      style={{ ...sectionStyle(C.navyDeep), position: "relative", overflow: "hidden" }}
    >
      {/* Teal glow anchored bottom-centre */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "70%",
          background: "radial-gradient(circle, rgba(74,144,164,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ ...containerStyle, position: "relative", maxWidth: "760px", textAlign: "center" }}>
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
            fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: C.cream,
          }}
        >
          {title}
        </Reveal>

        <Reveal
          as="p"
          delay={0.14}
          style={{
            margin: "clamp(18px, 3vh, 28px) auto 0",
            maxWidth: "52ch",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
            lineHeight: 1.7,
            color: "rgba(250,248,245,0.8)",
          }}
        >
          {intro}
        </Reveal>

        {/* ── Online self-book (cal.com → Juan's Google Calendar) — the fast, no-phone-tag path ───── */}
        <Reveal delay={0.18} style={{ margin: "clamp(28px, 4vh, 40px) auto 0", maxWidth: "560px" }}>
          <p
            style={{
              margin: "0 0 clamp(14px, 2vh, 18px)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
              lineHeight: 1.6,
              color: "rgba(250,248,245,0.82)",
            }}
          >
            {bookLead}
          </p>
          <Cta href={COMPANY.bookingUrl} target="_blank" rel="noopener noreferrer" variant="solid" ringColor={C.cream}>
            {bookCta}
          </Cta>
          <p
            style={{
              margin: "clamp(22px, 3.5vh, 32px) 0 0",
              fontFamily: "var(--font-label)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(250,248,245,0.4)",
            }}
          >
            {formOr}
          </p>
        </Reveal>

        {/* ── Lead form (secondary action) → /api/lead (Resend) ───── */}
        <Reveal delay={0.2} style={{ maxWidth: "560px", margin: "clamp(32px, 5vh, 48px) auto 0" }}>
          {lead.status === "success" ? (
            <SuccessReveal
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                padding: "clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px)",
                background: "rgba(250,248,245,0.04)",
                border: "1px solid rgba(74,144,164,0.28)",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              <CheckBadge size={52} bg="rgba(74,144,164,0.18)" />
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "clamp(1.7rem, 3.5vw, 2.3rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: C.cream,
                }}
              >
                {form.successTitle}
              </h3>
              <p
                style={{
                  margin: 0,
                  maxWidth: "44ch",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)",
                  lineHeight: 1.65,
                  color: "rgba(250,248,245,0.82)",
                }}
              >
                {form.successBody}
              </p>
            </SuccessReveal>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <Honeypot value={hp} onChange={(e) => setHp(e.target.value)} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                  gap: "clamp(14px, 2vw, 18px)",
                }}
              >
                <Field
                  id="lead-name"
                  label={form.nameLabel}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={form.namePlaceholder}
                  required
                  autoComplete="name"
                  invalid={nameErr}
                  disabled={lead.busy}
                />
                <Field
                  id="lead-phone"
                  label={form.phoneLabel}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={form.phonePlaceholder}
                  required
                  autoComplete="tel"
                  invalid={phoneErr}
                  disabled={lead.busy}
                />
              </div>

              <div style={{ marginTop: "clamp(14px, 2vw, 18px)" }}>
                <Field
                  id="lead-address"
                  label={form.addressLabel}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={form.addressPlaceholder}
                  autoComplete="street-address"
                  disabled={lead.busy}
                />
              </div>

              <div style={{ marginTop: "clamp(14px, 2vw, 18px)", textAlign: "left" }}>
                <label htmlFor="lead-message" style={labelStyle}>
                  {form.messageLabel}
                </label>
                <textarea
                  id="lead-message"
                  name="lead-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={form.messagePlaceholder}
                  disabled={lead.busy}
                  onFocus={() => setMsgFocused(true)}
                  onBlur={() => setMsgFocused(false)}
                  style={{
                    ...fieldStyle,
                    resize: "vertical",
                    lineHeight: 1.6,
                    borderColor: msgFocused ? C.teal : C.border,
                    boxShadow: msgFocused ? focusRing() : "none",
                    transition: "border-color 150ms ease, box-shadow 150ms ease",
                  }}
                />
              </div>

              {/* WI-041: SMS/TCPA consent — unchecked by default, never blocks submission. The
                  visible text must stay identical to SMS_CONSENT.body (that string is the record). */}
              <label
                htmlFor="lead-sms-consent"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginTop: "clamp(16px, 2.5vw, 22px)",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  lineHeight: 1.55,
                  color: "rgba(250,248,245,0.6)",
                }}
              >
                <input
                  id="lead-sms-consent"
                  name="lead-sms-consent"
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  disabled={lead.busy}
                  style={{ width: "18px", height: "18px", marginTop: "1px", flex: "0 0 auto", accentColor: C.teal, cursor: "pointer" }}
                />
                <span>
                  <strong style={{ color: "rgba(250,248,245,0.82)", fontWeight: 600 }}>{SMS_CONSENT.lead}</strong>{" "}
                  I agree to receive text messages from Carolux Insulation LLC at the number I provided
                  about my estimate, scheduling, and appointment updates. Consent is not a condition of any
                  purchase. Message frequency varies; message &amp; data rates may apply. Reply STOP to opt
                  out or HELP for help. See our{" "}
                  <a href="/privacy-policy" style={{ color: C.teal, textDecoration: "underline" }}>Privacy Policy</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={lead.busy}
                style={{
                  marginTop: "clamp(18px, 3vh, 24px)",
                  width: "100%",
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
                  minHeight: "54px",
                  border: "1.5px solid transparent",
                  borderRadius: "3px",
                  background: C.teal,
                  color: "#ffffff",
                  cursor: lead.busy ? "wait" : "pointer",
                  opacity: lead.busy ? 0.9 : 1,
                  transition: "background 160ms ease, transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
                }}
                onMouseEnter={(e) => {
                  if (lead.busy) return;
                  e.currentTarget.style.background = C.tealDeep;
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 12px 26px rgba(74,144,164,0.30)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.teal;
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {lead.busy ? (<><Spinner size={16} />{form.submitting}</>) : form.submit}
              </button>

              {(nameErr || phoneErr) && (
                <ErrorNote onDark style={{ justifyContent: "center" }}>{form.requiredNote}</ErrorNote>
              )}
              {lead.status === "error" && (
                <ErrorNote onDark style={{ justifyContent: "center" }}>
                  {lead.error} {form.errorRetry}.
                </ErrorNote>
              )}

              <p
                style={{
                  margin: "14px 0 0",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "rgba(250,248,245,0.55)",
                }}
              >
                {form.fallbackNote}
              </p>
            </form>
          )}
        </Reveal>

        {/* ── Secondary: reach an owner directly ─────────────────────────────── */}
        <Reveal
          delay={0.26}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            marginTop: "clamp(28px, 4vh, 40px)",
          }}
        >
          <Cta
            href={COMPANY.phoneHref}
            variant="outline"
            onDark
            arrow={false}
            leadingIcon={<PhoneIcon />}
            ringColor={C.cream}
          >
            {COMPANY.phone}
          </Cta>
          {COMPANY.smsEnabled && (
            <Cta
              href={COMPANY.smsHref}
              variant="outline"
              onDark
              arrow={false}
              leadingIcon={<ChatIcon />}
              ringColor={C.cream}
            >
              Text Us
            </Cta>
          )}
          <Cta
            href={COMPANY.emailHref}
            variant="outline"
            onDark
            arrow={false}
            leadingIcon={<MailIcon />}
            ringColor={C.cream}
          >
            Email Us
          </Cta>
        </Reveal>

        {/* ── Risk-reversal, right at the ask ────────────────────────────────── */}
        <Reveal
          as="ul"
          delay={0.3}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(12px, 2vw, 28px)",
            listStyle: "none",
            padding: 0,
            margin: "clamp(28px, 4vh, 40px) auto 0",
            maxWidth: "640px",
          }}
        >
          {reassurance.map((item) => (
            <li
              key={item}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(12px, 1.05vw, 14px)",
                color: "rgba(250,248,245,0.82)",
              }}
            >
              <span style={{ color: C.teal, display: "inline-flex" }} aria-hidden="true">
                <CheckIcon size={15} />
              </span>
              {item}
            </li>
          ))}
        </Reveal>

        <Reveal
          as="p"
          delay={0.34}
          style={{
            margin: "clamp(28px, 4vh, 40px) 0 0",
            fontFamily: "var(--font-label)",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(250,248,245,0.5)",
          }}
        >
          {serving}
        </Reveal>
      </div>
    </section>
  );
}
