import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { COMPANY } from "../../lib/content";
import { CITY_LINKS } from "../../lib/cities";

const BASE_URL = "https://caroluxinsulation.com";

// ISO date for schema freshness — keep in sync with the visible "Last updated"
// byline in the hero. Bump when the page copy is revised.
const LAST_UPDATED = "2026-06-13";

// Charlotte metro centroid — anchors the LocalBusiness entity geographically,
// same coordinates the city pages use.
const GEO = { latitude: 35.2271, longitude: -80.8431 };

// Authoritative off-site profiles — mirrors layout.js `sameAs` so this page's
// business node ties back to the same identities.
const SAME_AS = [
  COMPANY.instagram,
  COMPANY.facebook,
  COMPANY.googleBusiness,
  COMPANY.nextdoor,
];

export const metadata = {
  title: "Charlotte Attic Insulation, Blown-In to R-49 | Carolux",
  description:
    "Blown-in attic insulation in Charlotte, NC, installed to the DOE-recommended R-49. Air sealing included on every full install, at no extra charge. Free estimate.",
  alternates: { canonical: "/services/attic-insulation" },
  openGraph: {
    title: "Charlotte Attic Insulation, Blown-In to R-49 | Carolux",
    description:
      "Blown-in attic insulation in Charlotte, NC, to the DOE-recommended R-49. Air sealing included on every full install, at no extra charge.",
    url: `${BASE_URL}/services/attic-insulation`,
    siteName: "Carolux Insulation",
    locale: "en_US",
    type: "article",
  },
};

// Single source for this page's FAQ. Rendered VISIBLY in the JSX below AND
// emitted as FAQPage structured data, so the schema can never drift from the
// on-page Q&A. Answers are ~50-65 words, answer-first, inside the legal
// guardrails (insured-not-licensed, Tony = former inspector, air sealing
// "included with every full install at no extra charge", % + DOE/ENERGY STAR
// with "results vary", no spray foam, never knock competitors).
const ATTIC_FAQ = [
  {
    q: "How much does attic insulation cost in Charlotte, NC?",
    a: "Attic blown-in insulation in Charlotte typically runs $1.00–$5.00+ per square foot installed. Owner-operated specialty crews generally fall in the $1.25–$2.50/sqft range; large multi-service companies with more overhead often quote higher for the same R-49 install. The exact number depends on your current R-value, square footage, and whether old material needs removal. A free energy audit gives you a firm, all-in price.",
    learnMore: true,
  },
  {
    q: "What R-value should an attic have in Charlotte, NC?",
    a: "The U.S. Department of Energy recommends R-49 for attics in North Carolina's climate zone, which covers all of Charlotte and the surrounding counties. Most homes built before 2010 fall short, often sitting at R-19 to R-38. That gap is where conditioned air, and money, quietly escapes through the ceiling year-round.",
  },
  {
    q: "How long does attic insulation take to install?",
    a: "Most Charlotte attic insulation jobs finish in a single day. Air sealing the ceiling bypasses comes first, then the blown-in material goes in to the R-49 target. Larger or harder-to-access attics can run longer. Both owners, Tony and Juan, are on site start to finish and walk the finished work with you before leaving.",
  },
  {
    q: "Do I need to remove old attic insulation before adding new?",
    a: "Not always. If the existing insulation is dry and simply below R-49, new blown-in material can usually go right on top. If it's moisture-damaged, contaminated, or compacted to near-zero performance, removal first is the better path. Carolux checks the condition during the free assessment and tells you which applies, before any commitment.",
  },
  {
    q: "Why does Carolux air-seal the attic before insulating?",
    a: "Insulation slows heat transfer, but it does not stop air leaks. Gaps around recessed lights, plumbing penetrations, and top plates let conditioned air bypass the insulation entirely. Sealing those first is what makes the R-value actually perform. Carolux includes air sealing on every full install, at no extra charge. Most contractors skip it or bill it separately.",
  },
];

// Page schema, DERIVED from the same constants used to render the page, so the
// structured data and visible content stay locked together. Separate from the
// global @graph in layout.js.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Same @id as layout.js / the city pages so Google reads this as the same
      // entity, not a duplicate listing.
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "Carolux Insulation LLC",
      url: `${BASE_URL}/services/attic-insulation`,
      telephone: "+17042282729",
      email: "team@caroluxinsulation.com",
      image: `${BASE_URL}/images/house-thermal4.webp`,
      priceRange: "$$",
      areaServed: CITY_LINKS.map((c) => ({ "@type": "City", name: `${c.name}, NC` })),
      founder: [
        { "@type": "Person", name: "Tony Kermis" },
        { "@type": "Person", name: "Juan Gonzalez" },
      ],
      geo: { "@type": "GeoCoordinates", ...GEO },
      sameAs: SAME_AS,
    },
    {
      "@type": "Service",
      name: "Attic Insulation in Charlotte, NC",
      serviceType: "Attic Insulation",
      description:
        "Blown-in attic insulation (fiberglass or cellulose) installed to the DOE-recommended R-49 across Charlotte, NC and surrounding counties. Air sealing included on every full install at no extra charge. Owner-operated, fully insured, 2-year workmanship guarantee.",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: CITY_LINKS.map((c) => ({ "@type": "City", name: `${c.name}, NC` })),
    },
    {
      "@type": "FAQPage",
      dateModified: LAST_UPDATED,
      mainEntity: ATTIC_FAQ.map(({ q, a }) => ({
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
          name: "Attic Insulation",
          item: `${BASE_URL}/services/attic-insulation`,
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
    "Inspect and measure",
    "Tony reads the whole attic the way a home inspector would: current R-value, moisture, ventilation, and where air is bypassing the ceiling. You get the actual numbers, not a guess off the square footage.",
  ],
  [
    "Air-seal the bypasses",
    "Before any material goes in, we seal the gaps around recessed lights, plumbing penetrations, and top plates. On every full install this is included at no extra charge. It's the step that makes the insulation actually hold.",
  ],
  [
    "Blow in to R-49",
    "We install blown-in fiberglass or cellulose to an even depth across the whole attic floor, reaching the DOE-recommended R-49 for North Carolina. Where soffit vents are present, we set baffles first so the eaves keep breathing.",
  ],
  [
    "Verify and clean up",
    "We confirm depth at multiple points, walk the finished work with you, and bag and haul everything out. The attic is cleaner when we leave than when we arrived.",
  ],
];

const INCLUDED = [
  [
    "Air Sealing First",
    "On every new install and full replacement, before insulation, at no extra charge. Sealing the bypasses is what makes the R-value hold. Most contractors skip it.",
  ],
  [
    "DOE R-49 Target",
    "We install to the Department of Energy's recommended R-49 for North Carolina attics, not a code minimum that's already behind the standard.",
  ],
  [
    "Soffit Baffles Where Needed",
    "Where soffit vents are present, we set baffles to keep the eave airflow path open, so the attic still breathes properly after it's insulated.",
  ],
  [
    "Full Cleanup and Haul-Off",
    "We bag and remove old material and debris. Nothing left behind in the attic or on the driveway.",
  ],
  [
    "2-Year Workmanship Guarantee",
    "If anything we installed isn't performing within two years, the owners come back and make it right. No fine print.",
  ],
  [
    "Both Owners on Every Job",
    "Tony and Juan do the work themselves, no subcontractors. Tony is a former NC home inspector; Juan runs the schedule and the follow-through.",
  ],
];

export default function AtticInsulationPage() {
  const cityCount = CITY_LINKS.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* FAQ details/summary reset — keeps answers in the server HTML whether */}
      {/* open or closed, so crawlers and AI engines always read them.         */}
      <style>{`
        .carolux-attic-faq details summary { list-style: none; }
        .carolux-attic-faq details summary::-webkit-details-marker { display: none; }
        .carolux-attic-faq details[open] .faq-indicator { transform: rotate(45deg); }
        .carolux-attic-faq .faq-indicator { transition: transform 240ms ease; display: inline-block; }
        .carolux-cta-btn { transition: background-color 160ms ease, transform 120ms ease; }
        .carolux-cta-btn:hover { background-color: #3d7d90; transform: translateY(-1px); }
        .carolux-city-link { transition: color 140ms ease; }
        .carolux-city-link:hover { color: #3d7d90; }
      `}</style>

      <Nav />

      <main style={{ backgroundColor: C.cream, color: C.navy }}>

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
            Charlotte, NC · Attic Insulation
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
            Attic Insulation in Charlotte, NC
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
              <strong>Attic insulation is the highest-impact energy upgrade for most Charlotte
              homes.</strong>{" "}
              Carolux installs blown-in fiberglass or cellulose to the DOE-recommended R-49 and
              air-seals the ceiling bypasses first, at no extra charge, on every full install.
              Proper air sealing plus insulation can cut heating and cooling energy use by up to
              about 15% (EPA ENERGY STAR). Every home is different and results vary. Free energy
              audit with a same-day written quote.
            </p>
          </div>
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
              How a Carolux Attic Job Works
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
              Four steps, every one done by the owners. Most attics finish in a single day.
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

        {/* ── Why R-49 matters in NC ───────────────────────────────────── */}
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
              Why R-49 Matters in North Carolina
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
              The U.S. Department of Energy recommends R-49 in the attic for North Carolina's
              climate zone, roughly 16 to 18 inches of blown-in insulation. It's the level where
              the ceiling stops being the weak point in the home's thermal envelope.
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
              Most Charlotte-area homes built before 2010 were insulated to the code minimum of
              their era, often R-19 to R-38, and blown-in material settles over the years. The
              result shows up as a hot upstairs in summer, cold rooms in winter, and an HVAC
              system that runs longer than it should.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                lineHeight: 1.78,
                color: "rgba(250,248,245,0.82)",
              }}
            >
              Bringing the attic up to R-49 and sealing the air bypasses first can reduce heating
              and cooling energy use by up to about 15%, according to EPA ENERGY STAR. Every home
              is different and results vary, but the attic is almost always where the largest,
              fastest return is.
            </p>
          </div>
        </section>

        {/* ── What's included ──────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "0.5rem",
            }}
          >
            What Every Attic Install Includes
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
            Things most contractors charge extra for, or skip.
          </p>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {INCLUDED.map(([title, desc]) => (
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

        {/* ── Before / after proof ─────────────────────────────────────── */}
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
                marginBottom: "0.5rem",
              }}
            >
              Before and After: A Real Carolux Attic
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
              A real Charlotte-area job. Every home is different.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "1.2rem",
              }}
            >
              <figure style={{ margin: 0 }}>
                <img
                  src="/images/attic-before-2.png"
                  alt="Charlotte attic before Carolux insulation, showing thin, settled coverage between the joists"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "4px",
                    border: `1px solid ${C.border}`,
                  }}
                />
                <figcaption
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.84rem",
                    color: C.inkSoft,
                    lineHeight: 1.6,
                    marginTop: "0.6rem",
                  }}
                >
                  <strong style={{ color: C.navy }}>Before:</strong> original insulation settled
                  and uneven, well short of R-49.
                </figcaption>
              </figure>
              <figure style={{ margin: 0 }}>
                <img
                  src="/images/attic-after-2.png"
                  alt="Charlotte attic after Carolux blown-in insulation installed to the R-49 target"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "4px",
                    border: `1px solid ${C.border}`,
                  }}
                />
                <figcaption
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.84rem",
                    color: C.inkSoft,
                    lineHeight: 1.6,
                    marginTop: "0.6rem",
                  }}
                >
                  <strong style={{ color: C.navy }}>After:</strong> even blown-in coverage
                  installed to the R-49 target.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── What it costs (link to the price guide) ──────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            What an Attic Job Costs
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
            Attic insulation in Charlotte is priced per square foot installed. The total depends
            on your current R-value, the square footage, whether old material needs removal, and
            how accessible the attic is. Rather than guess from square footage alone, we measure
            on site and put a firm, all-in number in writing the same day.
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
        </section>

        {/* ── FAQ (visible Q&A — mirrors the FAQPage schema above) ──────── */}
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
                marginBottom: "2rem",
              }}
            >
              Attic Insulation in Charlotte: Common Questions
            </h2>
            <div className="carolux-attic-faq" style={{ borderTop: `1px solid ${C.border}` }}>
              {ATTIC_FAQ.map(({ q, a, learnMore }, i) => (
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
                    {learnMore && (
                      <a
                        href="/cost-guide"
                        style={{
                          display: "inline-block",
                          marginTop: "0.85rem",
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "0.88rem",
                          fontWeight: 500,
                          color: C.teal,
                          textDecoration: "none",
                          borderBottom: `1px solid ${C.teal}`,
                          lineHeight: 1,
                          paddingBottom: "2px",
                          letterSpacing: "0.01em",
                        }}
                      >
                        See full Charlotte price guide →
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Service area / city mesh ─────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            Attic Insulation Across the Charlotte Area
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
              color: C.ink,
              lineHeight: 1.78,
              marginBottom: "1.6rem",
            }}
          >
            Carolux installs attic insulation throughout Charlotte and the surrounding North
            Carolina communities. Both owners are on every job, wherever it is.
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
                {i < CITY_LINKS.length - 1 && (
                  <span style={{ color: C.inkSoft }}> · </span>
                )}
              </span>
            ))}
          </p>
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
              Free energy audit for Charlotte-area homeowners. No commitment, just a clear picture
              of what your attic needs and what it costs. An owner gets back to you within a few
              hours.
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
