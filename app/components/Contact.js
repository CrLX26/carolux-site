"use client";

import { COMPANY } from "../lib/content";
import {
  C,
  Reveal,
  Cta,
  PhoneIcon,
  MailIcon,
  ChatIcon,
  sectionStyle,
  containerStyle,
} from "./sectionKit";

export default function Contact() {
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

      <div style={{ ...containerStyle, position: "relative", maxWidth: "780px", textAlign: "center" }}>
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
          Free, No-Obligation
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
          Get your free estimate today
        </Reveal>

        <Reveal
          as="p"
          delay={0.14}
          style={{
            margin: "clamp(18px, 3vh, 28px) auto 0",
            maxWidth: "48ch",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
            lineHeight: 1.7,
            color: "rgba(250,248,245,0.8)",
          }}
        >
          Call or email and one of the owners gets back to you within a few hours.
          No call centers, no runaround.
        </Reveal>

        <Reveal
          delay={0.2}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            marginTop: "clamp(32px, 5vh, 48px)",
          }}
        >
          <Cta
            href={COMPANY.phoneHref}
            variant="solid"
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

        <Reveal
          as="p"
          delay={0.26}
          style={{
            margin: "clamp(32px, 5vh, 48px) 0 0",
            fontFamily: "var(--font-label)",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(250,248,245,0.55)",
          }}
        >
          Serving Charlotte, Gastonia &amp; the surrounding Piedmont
        </Reveal>
      </div>
    </section>
  );
}
