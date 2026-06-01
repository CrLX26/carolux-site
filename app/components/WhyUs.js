"use client";

import { WHY_US } from "../lib/content";
import { C, Reveal, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

export default function WhyUs() {
  return (
    <section id="why-us" style={{ ...sectionStyle(C.navy), position: "relative", overflow: "hidden" }}>
      {/* Soft teal glow, top-left — premium depth without clutter */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "45%",
          height: "60%",
          background: "radial-gradient(circle, rgba(74,144,164,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ ...containerStyle, position: "relative" }}>
        <SectionHeading
          eyebrow="The Carolux Difference"
          title="Why homeowners choose us"
          dark
          maxWidth="20ch"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(36px, 5vw, 72px)",
            marginTop: "clamp(48px, 8vh, 96px)",
          }}
        >
          {WHY_US.map((item, i) => (
            <Reveal key={item.roman} delay={i * 0.1}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Roman numeral */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(28px, 3vw, 38px)",
                    lineHeight: 1,
                    color: C.teal,
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.roman}
                </span>

                <span
                  aria-hidden="true"
                  style={{ display: "block", width: "100%", height: "1px", background: "rgba(250,248,245,0.14)", margin: "22px 0" }}
                />

                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 2.3vw, 2rem)",
                    lineHeight: 1.15,
                    color: C.cream,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: "16px 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(0.98rem, 1.15vw, 1.05rem)",
                    lineHeight: 1.72,
                    color: "rgba(250,248,245,0.78)",
                    maxWidth: "38ch",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
