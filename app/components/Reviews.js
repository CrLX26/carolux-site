"use client";

import { REVIEWS } from "../lib/content";
import { C, Reveal, StarIcon, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

export default function Reviews() {
  return (
    <section id="reviews" style={sectionStyle(C.creamDeep)}>
      <div style={containerStyle}>
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What neighbors say"
          maxWidth="20ch"
        />

        {/* Borderless testimonials — anchored by a quote glyph + stars, not a card box,
            so this section reads distinctly from the Services / Packages card grids. */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(40px, 5vw, 64px)",
            marginTop: "clamp(48px, 7vh, 88px)",
          }}
        >
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.1}>
              <figure style={{ height: "100%", display: "flex", flexDirection: "column", margin: 0 }}>
                {/* Oversized opening quote */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(56px, 7vw, 84px)",
                    lineHeight: 0.7,
                    color: C.teal,
                    height: "0.5em",
                    overflow: "visible",
                  }}
                >
                  &ldquo;
                </span>

                <blockquote
                  style={{
                    flex: 1,
                    margin: "clamp(16px, 2vh, 24px) 0 0",
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                    color: C.navy,
                  }}
                >
                  {review.text}
                </blockquote>

                <figcaption style={{ marginTop: "clamp(22px, 3vh, 30px)" }}>
                  <div
                    role="img"
                    aria-label="Rated 5 out of 5 stars"
                    style={{ display: "flex", gap: "3px", color: C.teal, marginBottom: "12px" }}
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <StarIcon key={s} size={16} />
                    ))}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: C.navy,
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      marginTop: "4px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9rem",
                      color: C.inkSoft,
                    }}
                  >
                    {review.location}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
