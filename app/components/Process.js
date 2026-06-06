"use client";

import { PROCESS } from "../lib/content";
import { C, Reveal, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

export default function Process() {
  return (
    <section id="process" style={sectionStyle(C.creamDeep)}>
      <div style={containerStyle}>
        <SectionHeading
          eyebrow={PROCESS.eyebrow}
          title={PROCESS.title}
          maxWidth="20ch"
        />

        <ol
          style={{
            listStyle: "none",
            margin: "clamp(48px, 8vh, 96px) 0 0",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "clamp(36px, 4vw, 56px)",
          }}
        >
          {PROCESS.steps.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 0.1} style={{ display: "flex", flexDirection: "column" }}>
              {/* Serif step index */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(40px, 4.5vw, 58px)",
                  lineHeight: 1,
                  color: C.teal,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.step}
              </span>

              {/* Teal hairline */}
              <span
                aria-hidden="true"
                style={{ display: "block", width: "40px", height: "2px", background: C.teal, margin: "20px 0 0" }}
              />

              <h3
                style={{
                  margin: "20px 0 0",
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "clamp(1.4rem, 2.1vw, 1.85rem)",
                  lineHeight: 1.14,
                  letterSpacing: "-0.01em",
                  color: C.navy,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: "14px 0 0",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(0.96rem, 1.1vw, 1.02rem)",
                  lineHeight: 1.72,
                  color: C.ink,
                  maxWidth: "34ch",
                }}
              >
                {item.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
