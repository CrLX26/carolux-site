"use client";

import { REVIEWS, REVIEWS_LIVE, COMPANY, FTC_SAVINGS_DISCLAIMER } from "../lib/content";
import { C, Reveal, StarIcon, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

export default function Reviews() {
  // WI-003: until genuine reviews exist, render an HONEST placeholder (no fabricated
  // testimonials/ratings). The section stays because Nav.js (locked) hardcodes the
  // #reviews anchor — hiding it would dead-end that link. Flip REVIEWS_LIVE in content.js
  // (+ replace REVIEWS with real ones) to show real testimonials.
  // Real reviews went live 2026-10-11; the placeholder branch is KEPT as the honest
  // fallback if the array is ever emptied.
  // 🔴 Do NOT add Review/AggregateRating schema. Self-hosted reviews about yourself are
  // ineligible for Google's star feature, embedded widgets included. See content.js.
  if (!REVIEWS_LIVE) {
    return (
      <section id="reviews" style={sectionStyle(C.creamDeep)}>
        <div style={containerStyle}>
          <SectionHeading eyebrow="Customer Reviews" title="Real reviews, coming soon" maxWidth="22ch" />
          <Reveal delay={0.1}>
            <p
              style={{
                maxWidth: "56ch",
                margin: "clamp(28px, 4vh, 44px) auto 0",
                textAlign: "center",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                lineHeight: 1.7,
                color: C.inkSoft,
              }}
            >
              Carolux is owner-operated and just getting started, so we're still earning our first
              reviews. As we complete jobs, genuine customer reviews will appear here. We'll only ever
              post real ones, from real Charlotte-area homes. Until then, the owners are one call away.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

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
                    {/* the review's OWN rating, never hardcoded */}
                    {Array.from({ length: review.rating }).map((_, s) => (
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
                    {review.source}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
          {/* The link is what makes first-name-plus-initial safe: full names, the live
              rating, and any review not transcribed here all sit on Google, verifiable by
              anyone. We borrow that verification instead of republishing identities.
              Deliberately NO count or average in this copy - a number goes stale the
              moment a review lands. */}
          <Reveal delay={0.3}>
            <p style={{ maxWidth: "62ch", margin: "clamp(28px, 4vh, 44px) auto 0", textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", lineHeight: 1.75, color: C.inkSoft }}>
              Every review above is real, quoted word for word.{" "}
              <a href={COMPANY.googleBusiness} target="_blank" rel="noopener noreferrer"
                 style={{ color: C.teal, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Read them on our Google profile
              </a>, where you can see who wrote them.
            </p>
          </Reveal>

          {/* Two reviews describe comfort and bill outcomes in the customer's own words.
              FTC 16 CFR 255.2 reads a testimonial about a central attribute as a claim about
              TYPICAL results, so the 460.19 disclaimer belongs here exactly as on any page
              carrying a savings figure. */}
          <Reveal delay={0.35}>
            <p style={{ maxWidth: "70ch", margin: "clamp(14px, 2vh, 20px) auto 0", textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", lineHeight: 1.6, color: C.inkSoft, opacity: 0.85 }}>
              Individual results depend on the home. {FTC_SAVINGS_DISCLAIMER}
            </p>
          </Reveal>

    </section>
  );
}
