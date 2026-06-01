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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(20px, 2.5vw, 32px)",
            marginTop: "clamp(48px, 7vh, 88px)",
          }}
        >
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.1}>
              <figure
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  margin: 0,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "3px",
                  padding: "clamp(28px, 3vw, 40px)",
                }}
              >
                {/* 5-star rating */}
                <div
                  role="img"
                  aria-label="Rated 5 out of 5 stars"
                  style={{ display: "flex", gap: "3px", color: C.teal }}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} size={17} />
                  ))}
                </div>

                <blockquote
                  style={{
                    margin: "20px 0 0",
                    flex: 1,
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                    color: C.navy,
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                <figcaption style={{ marginTop: "clamp(22px, 3vh, 30px)" }}>
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
