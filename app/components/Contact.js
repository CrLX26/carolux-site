"use client";

import { useState } from "react";
import { COMPANY, CONTACT } from "../lib/content";
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

function Field({ id, label, type = "text", value, onChange, placeholder, required, autoComplete }) {
  const [focused, setFocused] = useState(false);
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...fieldStyle, borderColor: focused ? C.teal : C.border, transition: "border-color 150ms ease" }}
      />
    </div>
  );
}

export default function Contact() {
  const { eyebrow, title, intro, form, reassurance, serving } = CONTACT;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [msgFocused, setMsgFocused] = useState(false);

  // No backend yet: compose a prefilled email via mailto. See content.js TODO(lead-capture).
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `Free estimate request${name ? ` — ${name}` : ""}`;
    const body =
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Property address: ${address}\n\n` +
      `What's going on up there:\n${message}\n`;
    window.location.href = `${COMPANY.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

        {/* ── Lead form (primary action) — mailto fallback, no backend yet ───── */}
        <Reveal delay={0.2} style={{ maxWidth: "560px", margin: "clamp(32px, 5vh, 48px) auto 0" }}>
          <form onSubmit={onSubmit}>
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
                onFocus={() => setMsgFocused(true)}
                onBlur={() => setMsgFocused(false)}
                style={{
                  ...fieldStyle,
                  resize: "vertical",
                  lineHeight: 1.6,
                  borderColor: msgFocused ? C.teal : C.border,
                  transition: "border-color 150ms ease",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "clamp(18px, 3vh, 24px)",
                width: "100%",
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
                cursor: "pointer",
                transition: "background 160ms ease, transform 160ms ease, box-shadow 160ms ease",
              }}
              onMouseEnter={(e) => {
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
              {form.submit}
            </button>

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
