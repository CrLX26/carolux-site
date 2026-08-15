import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { COMPANY } from "../../lib/content";
import { CITY_LINKS } from "../../lib/cities";

const BASE_URL = "https://caroluxinsulation.com";

// ISO date for schema freshness — keep in sync with the visible "Last updated"
// byline in the hero. Bump when the page copy is revised.
const LAST_UPDATED = "2026-06-13";

// NOTE (WI-072): geo/sameAs for the business entity live ONLY in
// app/lib/schema.js (the single `#business` node). Don't re-declare them here.

export const metadata = {
  title: "Charlotte Attic Air Sealing: Done Before Insulation | Carolux",
  description:
    "Attic air sealing in Charlotte, NC: we seal the leaks insulation can't, around lights, hatches, and top plates. Included with every full install. Free estimate.",
  alternates: { canonical: "/services/air-sealing" },
  openGraph: {
    title: "Attic Air Sealing in Charlotte, NC | Carolux",
    description:
      "Attic air sealing in Charlotte, NC. We seal the air leaks insulation can't stop, included with every full install at no extra charge.",
    url: `${BASE_URL}/services/air-sealing`,
    siteName: "Carolux Insulation",
    locale: "en_US",
    type: "article",
  },
};

// Single source for this page's FAQ. Rendered VISIBLY below AND emitted as
// FAQPage structured data. Legal guardrails: insured-not-licensed, Tony =
// former inspector, air sealing "included with every full install at no extra
// charge" (NEVER "always included"; disclose it may not be possible on
// top-off/blow-over jobs), % + DOE/ENERGY STAR + "results vary", no spray
// foam, never knock competitors.
const SEAL_FAQ = [
  {
    q: "What is attic air sealing?",
    a: "Attic air sealing is closing the gaps where conditioned air escapes from your living space into the attic: around recessed lights, the attic hatch, top plates, and plumbing or wiring penetrations. Insulation slows heat transfer, but it does not stop moving air. Sealing these bypasses first is what makes the insulation above them actually perform.",
  },
  {
    q: "Does air sealing really make a difference, or is it just an upsell?",
    a: "It makes a real difference, and at Carolux it isn't an upsell. Combined with insulation, air sealing can reduce heating and cooling energy use by up to about 15%, according to EPA ENERGY STAR, though every home is different and results vary. Unsealed bypasses in an older home can leak as much conditioned air as having almost no insulation at all.",
  },
  {
    q: "Is air sealing included or an extra charge?",
    a: "Air sealing is included with every full insulation install, at no extra charge: new installs and full replacements. It goes in before the insulation. On a top-off or blow-over job, where new material is added over existing insulation, thorough air sealing may not be possible, so we tell you upfront what we can and can't reach for your specific attic.",
  },
  {
    q: "What does attic air sealing involve?",
    a: "We seal the air bypasses across the attic floor: gaps around recessed light fixtures (keeping the required clearance on non-IC-rated fixtures), the attic access hatch, top plates where walls meet the ceiling, and the openings around plumbing, wiring, and ductwork. The goal is one continuous air barrier before insulation goes on top.",
  },
  {
    q: "Air sealing or more insulation: which matters more?",
    a: "They work together, but air sealing comes first. Adding insulation over open bypasses is like putting a blanket over a screen door: the air still moves. Sealing the leaks, then insulating to the DOE-recommended R-49, is the sequence that actually changes how a home feels and performs.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // WI-072: the LocalBusiness entity is declared ONCE on the homepage
    // (app/lib/schema.js `#business`). Re-asserting it here with a different
    // `url` made several pages claim the same @id with conflicting properties.
    // This page now only REFERENCES it via `provider` below.
    {
      "@type": "Service",
      name: "Attic Air Sealing in Charlotte, NC",
      serviceType: "Air Sealing",
      description:
        "Attic air sealing across Charlotte, NC and surrounding counties: sealing the air bypasses around recessed lights, the attic hatch, top plates, and penetrations before insulation. Included with every full insulation install at no extra charge. Owner-operated, fully insured, 2-year workmanship guarantee.",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: CITY_LINKS.map((c) => ({ "@type": "City", name: `${c.name}, NC` })),
    },
    {
      "@type": "FAQPage",
      dateModified: LAST_UPDATED,
      mainEntity: SEAL_FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Air Sealing",
          item: `${BASE_URL}/services/air-sealing`,
        },
      ],
    },
  ],
};

const C = {
  cream: "#faf8f5",
  surface: "#fefdfb",
  navy: "#1a2b3c",
  teal: "#4a90a4",
  ink: "#2c2c2c",
  inkSoft: "rgba(26,43,60,0.65)",
  border: "rgba(26,43,60,0.1)",
};

const PROCESS = [
  [
    "Find the leaks",
    "Tony locates the bypasses where conditioned air escapes into the attic: around recessed lights, the hatch, top plates, and plumbing, wiring, and duct penetrations. His home-inspector background means he reads airflow, not just insulation depth.",
  ],
  [
    "Seal the bypasses",
    "We seal each opening with the right material for the spot, from caulk to fire-rated sealant where heat sources require it, keeping the required clearances around non-IC light fixtures and flues.",
  ],
  [
    "Then insulate",
    "With the air barrier sealed, insulation goes on top and finally performs to its rated R-value. On a full install this all happens in one visit, with the sealing included at no extra charge.",
  ],
  [
    "Verify",
    "We confirm the work and walk it with you. You see exactly what was sealed before the insulation covers it for good.",
  ],
];

const LEAKS = [
  [
    "Recessed Light Fixtures",
    "Gaps around can lights are a major bypass. We seal them while keeping the required clearance around non-IC-rated fixtures, so it's done safely.",
  ],
  [
    "The Attic Hatch",
    "An unsealed, uninsulated hatch is a direct hole in your ceiling. We weatherstrip and insulate it so the access point stops leaking.",
  ],
  [
    "Top Plates",
    "The seams where interior walls meet the ceiling run throughout the house and leak constantly. We seal them along the attic floor.",
  ],
  [
    "Plumbing & Wiring Penetrations",
    "Every pipe, wire, and vent that passes into the attic leaves a gap. We seal around each one before insulating over it.",
  ],
  [
    "Ductwork & Register Boots",
    "Leaky duct connections in the attic waste conditioned air before it ever reaches the room. We seal accessible boots and joints.",
  ],
  [
    "Chimney & Flue Chases",
    "Framed openings around chimneys and flues are sealed with fire-rated material, maintaining the code-required clearances.",
  ],
];

export default function AirSealingPage() {
  const cityCount = CITY_LINKS.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <style>{`
        .carolux-seal-faq details summary { list-style: none; }
        .carolux-seal-faq details summary::-webkit-details-marker { display: none; }
        .carolux-seal-faq details[open] .faq-indicator { transform: rotate(45deg); }
        .carolux-seal-faq .faq-indicator { transition: transform 240ms ease; display: inline-block; }
        .carolux-cta-btn { transition: background-color 160ms ease, transform 120ms ease; }
        .carolux-cta-btn:hover { background-color: #3d7d90; transform: translateY(-1px); }
        .carolux-city-link { transition: color 140ms ease; }
        .carolux-city-link:hover { color: #3d7d90; }
      `}</style>

      <Nav />

      <main id="main" style={{ backgroundColor: C.cream, color: C.navy }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "7rem 1.5rem 3rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.teal,
              marginBottom: "1.2rem",
            }}
          >
            Charlotte, NC · Attic Air Sealing
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.78rem",
              color: C.inkSoft,
              marginBottom: "1rem",
            }}
          >
            By <strong>Tony Kermis</strong>, former NC Home Inspector &amp; co-owner, Carolux
            Insulation · <span>Last updated June 2026</span>
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "1.8rem",
            }}
          >
            Attic Air Sealing in Charlotte, NC
          </h1>

          {/* Quick-answer box — AI overview / featured snippet target */}
          <div
            style={{
              background: `${C.teal}14`,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "1.4rem 1.6rem",
              marginBottom: "1.2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.08rem)",
                lineHeight: 1.75,
                color: C.ink,
                margin: 0,
              }}
            >
              <strong>Air sealing is the step that makes insulation actually work, and it's the one
              many contractors skip.</strong>{" "}
              Carolux seals the air leaks across your attic floor, around recessed lights, the
              attic hatch, top plates, and penetrations, before any insulation goes in. It's
              included with every full install, at no extra charge. Combined with insulation it can
              cut heating and cooling energy use by up to about 15% (EPA ENERGY STAR). Results vary
              by home.
            </p>
          </div>
          {/* WI-059: FTC R-Value Rule (16 CFR 460.19) — required verbatim disclaimer for savings claims. */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.82rem",
              fontStyle: "italic",
              color: C.inkSoft,
              lineHeight: 1.6,
              margin: "0 0 1rem",
            }}
          >
            Savings vary. Find out why in the seller&apos;s fact sheet on R-values. Higher R-values
            mean greater insulating power.
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.88rem",
              color: C.inkSoft,
              lineHeight: 1.6,
            }}
          >
            Owner-operated, fully insured, 2-year workmanship guarantee. Serving Charlotte and{" "}
            {cityCount - 1} surrounding NC communities.
          </p>
        </section>

        {/* ── How it works / process ───────────────────────────────────── */}
        <section
          style={{
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(3.5rem, 5vw, 5rem) 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "0.5rem",
              }}
            >
              How Carolux Air-Seals an Attic
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.95rem",
                color: C.inkSoft,
                lineHeight: 1.65,
                marginBottom: "2rem",
              }}
            >
              Sealing first, insulating second. The order is the whole point.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {PROCESS.map(([title, desc], i) => (
                <div
                  key={title}
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                    padding: "1.5rem 0",
                    display: "grid",
                    gridTemplateColumns: "2.5rem 1fr",
                    gap: "1rem",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: C.teal,
                      paddingTop: "3px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 600,
                        color: C.navy,
                        margin: "0 0 0.3rem",
                        fontSize: "0.97rem",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.9rem",
                        color: C.inkSoft,
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why most contractors skip it (the differentiator) ────────── */}
        <section style={{ backgroundColor: C.navy, color: C.cream }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "1.2rem",
              }}
            >
              Why Many Contractors Skip Air Sealing
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                lineHeight: 1.78,
                color: "rgba(250,248,245,0.82)",
                marginBottom: "1rem",
              }}
            >
              Air sealing is slow, detailed work, and it's invisible once the insulation covers it.
              That's why a lot of crews skip it or quietly leave it off the quote, then blow
              insulation straight over the open bypasses.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                lineHeight: 1.78,
                color: "rgba(250,248,245,0.82)",
                marginBottom: "1rem",
              }}
            >
              The problem is that insulation slows heat transfer but does nothing to stop moving
              air. Conditioned air keeps escaping through the gaps, the insulation never reaches its
              rated performance, and the homeowner doesn't feel the difference they paid for.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                lineHeight: 1.78,
                color: "rgba(250,248,245,0.82)",
              }}
            >
              Carolux includes air sealing with every full install, at no extra charge, because it's
              the highest-impact step in the job. Combined with insulation to the DOE-recommended
              R-49, it can reduce heating and cooling energy use by up to about 15%, according to
              EPA ENERGY STAR. Every home is different and results vary.
            </p>
          </div>
        </section>

        {/* ── The air leaks we seal ────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "0.5rem",
            }}
          >
            The Air Leaks We Seal
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              color: C.inkSoft,
              lineHeight: 1.65,
              marginBottom: "2rem",
            }}
          >
            The bypass points that quietly drain conditioned air from most Charlotte homes.
          </p>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {LEAKS.map(([title, desc]) => (
              <div
                key={title}
                style={{ borderBottom: `1px solid ${C.border}`, padding: "1.4rem 0" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 600,
                    color: C.navy,
                    margin: "0 0 0.35rem",
                    fontSize: "0.97rem",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.9rem",
                    color: C.inkSoft,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What it costs (link to the price guide) ──────────────────── */}
        <section
          style={{
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "1rem",
              }}
            >
              What Air Sealing Costs
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                color: C.ink,
                lineHeight: 1.78,
                marginBottom: "1.2rem",
              }}
            >
              On a full insulation install or full replacement, air sealing is included at no extra
              charge: it's part of the job, not a separate line item. As standalone work, or on a
              top-off where access is limited, it's priced by the scope we find on site. Either way,
              we tell you exactly what's involved before any work begins.
            </p>
            <a
              href="/cost-guide"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.92rem",
                fontWeight: 500,
                color: C.teal,
                textDecoration: "none",
                borderBottom: `1px solid ${C.teal}`,
                lineHeight: 1,
                paddingBottom: "2px",
              }}
            >
              See the full Charlotte insulation price guide →
            </a>
          </div>
        </section>

        {/* ── FAQ (visible Q&A — mirrors the FAQPage schema above) ──────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "2rem",
            }}
          >
            Attic Air Sealing in Charlotte: Common Questions
          </h2>
          <div className="carolux-seal-faq" style={{ borderTop: `1px solid ${C.border}` }}>
            {SEAL_FAQ.map(({ q, a }, i) => (
              <details key={i} open={i === 0} style={{ borderBottom: `1px solid ${C.border}` }}>
                <summary
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: C.navy,
                    padding: "clamp(20px, 2.7vh, 28px) 0",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  {q}
                  <span
                    className="faq-indicator"
                    style={{
                      color: C.teal,
                      flexShrink: 0,
                      fontSize: "1.4rem",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    +
                  </span>
                </summary>
                <div style={{ paddingBottom: "clamp(22px, 3vh, 32px)" }}>
                  <p
                    style={{
                      margin: 0,
                      maxWidth: "64ch",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(0.98rem, 1.1vw, 1.05rem)",
                      lineHeight: 1.72,
                      color: C.inkSoft,
                    }}
                  >
                    {a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related + service-area / city mesh ───────────────────────── */}
        <section
          style={{
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "1rem",
              }}
            >
              Air Sealing Across the Charlotte Area
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                color: C.ink,
                lineHeight: 1.78,
                marginBottom: "1.2rem",
              }}
            >
              Air sealing goes in with every full install Carolux does throughout Charlotte and the
              surrounding North Carolina communities. It pairs directly with{" "}
              <a href="/services/attic-insulation" style={{ color: C.teal, textDecoration: "none", fontWeight: 500, borderBottom: `1px solid ${C.teal}` }}>
                attic insulation
              </a>{" "}
              and complements{" "}
              <a href="/services/crawl-space-insulation" style={{ color: C.teal, textDecoration: "none", fontWeight: 500, borderBottom: `1px solid ${C.teal}` }}>
                crawl space work
              </a>{" "}
              on the same visit.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "1rem",
                lineHeight: 2,
                color: C.navy,
                margin: 0,
              }}
            >
              {CITY_LINKS.map((c, i) => (
                <span key={c.slug}>
                  <a
                    href={`/${c.slug}`}
                    className="carolux-city-link"
                    style={{ color: C.teal, textDecoration: "none", fontWeight: 500 }}
                  >
                    {c.name}
                  </a>
                  {i < CITY_LINKS.length - 1 && <span style={{ color: C.inkSoft }}> · </span>}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: C.navy, textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "5rem 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 400,
                marginBottom: "1rem",
                color: C.cream,
              }}
            >
              Get Your Free Attic Assessment
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "1rem",
                color: "rgba(250,248,245,0.72)",
                lineHeight: 1.7,
                maxWidth: 460,
                margin: "0 auto 2.2rem",
              }}
            >
              Free energy audit for Charlotte-area homeowners. We find where your home is leaking
              air and what it takes to fix it, then put a firm price in writing the same day.
            </p>
            <a
              href={COMPANY.phoneHref}
              className="carolux-cta-btn"
              style={{
                display: "inline-block",
                backgroundColor: C.teal,
                color: C.cream,
                fontFamily: "var(--font-label)",
                fontWeight: 700,
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "1.1rem 2.8rem",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Call {COMPANY.phone}
            </a>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.82rem",
                color: "rgba(250,248,245,0.45)",
                marginTop: "1.2rem",
              }}
            >
              Serving Charlotte and {cityCount - 1} surrounding NC communities
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.78rem",
                color: "rgba(250,248,245,0.3)",
                marginTop: "0.75rem",
              }}
            >
              <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
                Carolux Insulation
              </a>
              {" · "}
              <a href="/cost-guide" style={{ color: "inherit", textDecoration: "none" }}>
                Charlotte Price Guide
              </a>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
