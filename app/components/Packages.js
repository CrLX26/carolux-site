"use client";

import { PACKAGES } from "../lib/content";
import {
  C,
  Reveal,
  Cta,
  LiftCard,
  CheckIcon,
  SectionHeading,
  sectionStyle,
  containerStyle,
} from "./sectionKit";

export default function Packages() {
  return (
    <section id="packages" style={sectionStyle(C.cream)}>
      <div style={containerStyle}>
        <SectionHeading title="Choose your package" maxWidth="20ch" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(20px, 2.5vw, 32px)",
            marginTop: "clamp(48px, 7vh, 88px)",
            alignItems: "stretch",
          }}
        >
          {PACKAGES.map((pkg, i) => {
            const featured = pkg.featured;
            return (
              <Reveal key={pkg.name} delay={i * 0.08}>
                <LiftCard
                  hoverBorder={C.teal}
                  rest={featured ? -8 : 0}
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: featured ? C.surface : "#fbf9f6",
                    border: `1.5px solid ${featured ? C.teal : C.border}`,
                    borderRadius: "3px",
                    padding: "clamp(28px, 3vw, 44px)",
                    boxShadow: featured ? "0 18px 44px rgba(74,144,164,0.16)" : undefined,
                  }}
                >
                  {featured && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-13px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: C.teal,
                        color: "#ffffff",
                        fontFamily: "var(--font-label)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "6px 16px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Most Popular
                    </span>
                  )}

                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 2.2vw, 1.95rem)",
                      lineHeight: 1.12,
                      color: C.navy,
                    }}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    style={{
                      margin: "8px 0 0",
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                      lineHeight: 1.4,
                      color: C.teal,
                    }}
                  >
                    {pkg.tagline}
                  </p>

                  <span
                    aria-hidden="true"
                    style={{ display: "block", width: "100%", height: "1px", background: C.border, margin: "24px 0" }}
                  />

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      flex: 1,
                    }}
                  >
                    {pkg.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <span style={{ color: C.teal, marginTop: "1px" }}>
                          <CheckIcon />
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: "clamp(0.92rem, 1.05vw, 1rem)",
                            lineHeight: 1.5,
                            color: C.ink,
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "clamp(28px, 4vh, 40px)" }}>
                    <Cta
                      href="#contact"
                      variant={featured ? "solid" : "outline"}
                      style={{ width: "100%" }}
                    >
                      {pkg.cta}
                    </Cta>
                  </div>
                </LiftCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
