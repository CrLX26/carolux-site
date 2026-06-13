"use client";

import { SERVICE_AREA } from "../lib/content";
import { CITY_LINKS } from "../lib/cities";
import { C, Reveal, SectionHeading, sectionStyle, containerStyle } from "./sectionKit";

const cityLinkStyles = `
  .carolux-city-link {
    font-family: var(--font-cormorant);
    font-size: clamp(1.25rem, 2.4vw, 1.7rem);
    line-height: 1.2;
    color: ${C.navy};
    letter-spacing: -0.01em;
    text-decoration: none;
    transition: color 160ms ease;
  }
  .carolux-city-link:hover,
  .carolux-city-link:focus-visible {
    color: ${C.teal};
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
  .carolux-city-link:focus-visible {
    outline: 2px solid ${C.teal};
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

function CityLink({ slug, name }) {
  return (
    <a href={`/${slug}`} className="carolux-city-link">
      {name}
    </a>
  );
}

export default function ServiceArea() {
  const { eyebrow, title, note } = SERVICE_AREA;

  return (
    <>
    <style>{cityLinkStyles}</style>
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
          {CITY_LINKS.map((c, i) => (
            <span key={c.slug} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(14px, 1.6vw, 22px)" }}>
              <CityLink slug={c.slug} name={c.name} />
              {i < CITY_LINKS.length - 1 && (
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
    </>
  );
}
