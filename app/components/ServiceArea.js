"use client";

import { SERVICE_AREA } from "../lib/content";
import { C, Reveal, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

export default function ServiceArea() {
  const { eyebrow, title, note, cities } = SERVICE_AREA;

  return (
    <section id="service-area" style={sectionStyle(C.cream)}>
      <div style={containerStyle}>
        <SectionHeading eyebrow={eyebrow} title={title} maxWidth="20ch" />

        <Reveal
          delay={0.12}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "clamp(14px, 1.6vw, 22px)",
            rowGap: "clamp(10px, 1.4vh, 16px)",
            margin: "clamp(40px, 6vh, 64px) auto 0",
            maxWidth: "880px",
          }}
        >
          {cities.map((city, i) => (
            <span key={city} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(14px, 1.6vw, 22px)" }}>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.25rem, 2.4vw, 1.7rem)",
                  lineHeight: 1.2,
                  color: C.navy,
                  letterSpacing: "-0.01em",
                }}
              >
                {city}
              </span>
              {i < cities.length - 1 && (
                <span aria-hidden="true" style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.teal, opacity: 0.7 }} />
              )}
            </span>
          ))}
        </Reveal>

        {note && (
          <Reveal
            as="p"
            delay={0.2}
            style={{
              margin: "clamp(36px, 5vh, 52px) auto 0",
              maxWidth: "46ch",
              textAlign: "center",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.95rem, 1.1vw, 1.02rem)",
              lineHeight: 1.7,
              color: C.inkSoft,
            }}
          >
            {note}
          </Reveal>
        )}
      </div>
    </section>
  );
}
