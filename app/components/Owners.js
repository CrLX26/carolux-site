"use client";

import Image from "next/image";
import { OWNERS } from "../lib/content";
import { C, Reveal, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

export default function Owners() {
  return (
    <section id="owners" style={{ ...sectionStyle(C.navy), position: "relative", overflow: "hidden" }}>
      {/* Soft teal glow, bottom-right — mirrors WhyUs depth without repeating it */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "-10%",
          width: "48%",
          height: "65%",
          background: "radial-gradient(circle, rgba(74,144,164,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ ...containerStyle, position: "relative" }}>
        <SectionHeading eyebrow={OWNERS.eyebrow} title={OWNERS.title} dark maxWidth="18ch" />

        <Reveal
          as="p"
          delay={0.12}
          style={{
            margin: "clamp(20px, 3vh, 30px) auto 0",
            maxWidth: "58ch",
            textAlign: "center",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(1.02rem, 1.3vw, 1.18rem)",
            lineHeight: 1.78,
            color: "rgba(250,248,245,0.82)",
          }}
        >
          {OWNERS.intro}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(36px, 5vw, 64px)",
            marginTop: "clamp(48px, 8vh, 88px)",
          }}
        >
          {OWNERS.people.map((person, i) => (
            <Reveal key={person.name} delay={0.2 + i * 0.12}>
              <div style={{ display: "flex", gap: "clamp(20px, 2.5vw, 32px)", alignItems: "flex-start", flexWrap: "wrap" }}>
                {/* Portrait */}
                <div
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: "clamp(120px, 16vw, 168px)",
                    aspectRatio: "5 / 6",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: "1px solid rgba(74,144,164,0.45)",
                    boxShadow: "0 14px 32px rgba(0,0,0,0.28)",
                  }}
                >
                  <Image
                    src={person.photo}
                    alt={`${person.name}, co-owner of Carolux Insulation`}
                    fill
                    sizes="(max-width: 768px) 40vw, 168px"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>

                {/* Identity + bio */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 2.2vw, 1.95rem)",
                      lineHeight: 1.1,
                      color: C.cream,
                    }}
                  >
                    {person.name}
                  </h3>

                  <p
                    style={{
                      margin: "8px 0 0",
                      fontFamily: "var(--font-label)",
                      fontSize: "clamp(11px, 1vw, 12.5px)",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.teal,
                    }}
                  >
                    {person.role}
                  </p>

                  <span
                    aria-hidden="true"
                    style={{ display: "block", width: "40px", height: "1px", background: "rgba(250,248,245,0.18)", margin: "18px 0" }}
                  />

                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(0.96rem, 1.1vw, 1.03rem)",
                      lineHeight: 1.74,
                      color: "rgba(250,248,245,0.78)",
                    }}
                  >
                    {person.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
