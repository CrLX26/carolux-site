"use client";

import { SERVICES } from "../lib/content";
import {
  C,
  Reveal,
  Cta,
  LiftCard,
  SectionHeading,
  sectionStyle,
  containerStyle,
} from "./sectionKit";

export default function Services() {
  return (
    <section id="services" style={sectionStyle(C.cream)}>
      <div style={containerStyle}>
        <SectionHeading title="Two services. Done right." maxWidth="22ch" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
            marginTop: "clamp(48px, 7vh, 88px)",
          }}
        >
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.1}>
              <LiftCard
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "3px",
                  padding: "clamp(32px, 4vw, 52px)",
                }}
              >
                {/* Oversized serif index */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(40px, 5vw, 60px)",
                    lineHeight: 1,
                    color: C.teal,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {service.number}
                </span>

                <h3
                  style={{
                    margin: "clamp(16px, 2vh, 24px) 0 0",
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 400,
                    fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.01em",
                    color: C.navy,
                  }}
                >
                  {service.title}
                </h3>

                {/* Teal hairline divider */}
                <span
                  aria-hidden="true"
                  style={{ display: "block", width: "40px", height: "2px", background: C.teal, margin: "20px 0 0" }}
                />

                <p
                  style={{
                    margin: "20px 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(0.98rem, 1.2vw, 1.06rem)",
                    lineHeight: 1.7,
                    color: C.ink,
                    maxWidth: "60ch",
                  }}
                >
                  {service.description}
                </p>

                <div style={{ marginTop: "auto", paddingTop: "clamp(28px, 4vh, 40px)" }}>
                  <Cta href="#contact" variant="outline">
                    {service.cta}
                  </Cta>
                </div>
              </LiftCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
