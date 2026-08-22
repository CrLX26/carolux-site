import Image from "next/image";
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
  title: "Charlotte Crawl Space Insulation & Vapor Barrier | Carolux",
  description:
    "Crawl space fiberglass batt insulation and professional-grade vapor barrier in Charlotte, NC. Block ground moisture, protect your floors. Free estimate.",
  alternates: { canonical: "/services/crawl-space-insulation" },
  openGraph: {
    title: "Charlotte Crawl Space Insulation & Vapor Barrier | Carolux",
    description:
      "Crawl space fiberglass batt insulation and professional-grade vapor barrier in Charlotte, NC. Block ground moisture and protect your floors.",
    url: `${BASE_URL}/services/crawl-space-insulation`,
    siteName: "Carolux Insulation",
    locale: "en_US",
    type: "article",
  },
};

// Single source for this page's FAQ. Rendered VISIBLY below AND emitted as
// FAQPage structured data, so the schema can't drift from the on-page Q&A.
// Legal guardrails: insured-not-licensed, Tony = former inspector, no exact-$
// savings (% + DOE/ENERGY STAR + "results vary"), never "mold" (use "wood rot"
// / "moisture" / "musty"), Carolux does NOT do encapsulation, no spray foam,
// never knock competitors.
const CRAWL_FAQ = [
  {
    q: "How much does crawl space insulation cost in Charlotte, NC?",
    a: "Crawl space fiberglass batt insulation in Charlotte typically runs $1.00–$3.50 per square foot installed, and a vapor barrier adds roughly $1.50–$4.00/sqft. The total depends on the size of the space, how accessible it is, current moisture conditions, and whether old material needs removal. A free assessment gives you a firm, all-in number for your specific crawl space.",
    learnMore: true,
  },
  {
    q: "What's the difference between a vapor barrier and crawl space encapsulation?",
    a: "A vapor barrier is a heavy-duty liner laid across the crawl space ground and up the foundation to block rising moisture. Full encapsulation is a larger, costlier scope that also seals the vents, conditions the air, and usually adds a dehumidifier. Carolux installs professional-grade vapor barriers and floor-joist batt; we do not do full encapsulation. For most Charlotte homes, a properly installed vapor barrier handles the moisture problem at a fraction of the cost.",
  },
  {
    q: "Do I need a vapor barrier in my crawl space in North Carolina?",
    a: "For most North Carolina homes with a vented crawl space and a bare dirt floor, yes. The state's humid climate drives ground moisture up into the wood structure year-round. A heavy-duty vapor barrier is the most cost-effective way to keep the subfloor and joists dry and reduce the humidity load on your HVAC system.",
  },
  {
    q: "What kind of insulation goes in a crawl space?",
    a: "Carolux installs fiberglass batt between the floor joists, hand-cut to fit so it won't sag or leave gaps. It slows heat transfer through the floor and helps steady the temperature in the rooms above. The batt is paired with a ground vapor barrier, which handles the moisture control that insulation alone cannot.",
  },
  {
    q: "Can a damp crawl space affect the rest of my home?",
    a: "Yes. A large share of the air on your main floor can rise from the crawl space below, so ground moisture there raises humidity throughout the home, strains the HVAC, and over time leads to wood rot and soft floors. Controlling moisture at the source, with a vapor barrier, protects the whole structure above it.",
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
      name: "Crawl Space Insulation & Vapor Barrier in Charlotte, NC",
      serviceType: "Crawl Space Insulation",
      description:
        "Crawl space fiberglass batt insulation and professional-grade vapor barrier installation across Charlotte, NC and surrounding counties. Full moisture and drainage inspection included. Owner-operated, fully insured, 2-year workmanship guarantee.",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: CITY_LINKS.map((c) => ({ "@type": "City", name: `${c.name}, NC` })),
    },
    {
      "@type": "FAQPage",
      dateModified: LAST_UPDATED,
      mainEntity: CRAWL_FAQ.map(({ q, a }) => ({
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
          name: "Crawl Space Insulation",
          item: `${BASE_URL}/services/crawl-space-insulation`,
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
    "Inspect and assess",
    "Tony checks the crawl space the way an inspector would: standing water, grading and drainage, existing insulation, the condition of the joists and subfloor, and how the space ventilates. You get the real condition, not a guess.",
  ],
  [
    "Lay the vapor barrier",
    "We roll a heavy-duty, professional-grade Americover vapor barrier across the crawl space floor and up to the foundation, overlapping and sealing the seams. It blocks ground moisture from rising into the wood structure above. This is not the thin poly sold at big-box stores.",
  ],
  [
    "Fit the floor-joist batt",
    "Where it's called for, we hand-cut and fit fiberglass batt snugly between the floor joists so it won't sag or leave gaps. It slows heat transfer through the floor and steadies the rooms above.",
  ],
  [
    "Verify and clean up",
    "We confirm full coverage, check the seams, walk the finished work with you, and haul out any old material. Nothing left behind under the house.",
  ],
];

const INCLUDED = [
  [
    "Professional-Grade Vapor Barrier",
    "Heavy-duty Americover barrier, available in multiple thicknesses, American-made with virgin resins. Not the commodity 6-mil poly from a hardware store.",
  ],
  [
    "Full Moisture & Drainage Inspection",
    "We assess standing water, grading, and airflow before lining anything, so the barrier solves the actual problem instead of covering it.",
  ],
  [
    "Floor-Joist Batt Where Needed",
    "Hand-fitted fiberglass batt between the joists, cut to fit, with no sagging or gaps. Carolux does not do perimeter-wall insulation or full encapsulation.",
  ],
  [
    "Seams Sealed Properly",
    "Overlapped and taped at the seams and the foundation wall, so moisture can't find a way around the liner.",
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

export default function CrawlSpaceInsulationPage() {
  const cityCount = CITY_LINKS.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <style>{`
        .carolux-crawl-faq details summary { list-style: none; }
        .carolux-crawl-faq details summary::-webkit-details-marker { display: none; }
        .carolux-crawl-faq details[open] .faq-indicator { transform: rotate(45deg); }
        .carolux-crawl-faq .faq-indicator { transition: transform 240ms ease; display: inline-block; }
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
            Charlotte, NC · Crawl Space Insulation
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
            Crawl Space Insulation &amp; Vapor Barrier in Charlotte, NC
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
              <strong>A vapor barrier is the highest-value first step for most Charlotte crawl
              spaces.</strong>{" "}
              Carolux lays a heavy-duty, professional-grade Americover vapor barrier across the
              ground to block rising moisture, and fits fiberglass batt between the floor joists.
              North Carolina's humid summers push ground moisture up into the wood above, driving
              up energy bills and causing wood rot. Every home is different and results vary. Free
              assessment with a same-day written quote.
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
              How a Carolux Crawl Space Job Works
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
              Four steps, every one done by the owners.
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

        {/* ── Why crawl space moisture matters in NC ───────────────────── */}
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
              Why Crawl Space Moisture Matters in North Carolina
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
              North Carolina summers are humid, and a vented crawl space with a bare dirt floor
              pulls that moisture straight up from the ground. Without a barrier, it migrates into
              the subfloor, the joists, and eventually the air your family breathes.
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
              Over time, persistent ground moisture leads to wood rot, soft floors, musty air, and
              a heavier load on your HVAC as it works against the extra humidity. The damage builds
              slowly, which is why most homeowners don't notice until it's well along.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                lineHeight: 1.78,
                color: "rgba(250,248,245,0.82)",
              }}
            >
              A heavy-duty vapor barrier across the ground keeps that moisture below the house where
              it belongs. Paired with floor-joist batt, it makes the floors more comfortable and
              helps the whole home hold conditioned air. Every home is different and results vary,
              but moisture control is almost always the first thing a damp crawl space needs.
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
            What Every Crawl Space Job Includes
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
            Professional-grade materials and an honest assessment, not a one-size quote.
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
              Before and After: A Real Carolux Crawl Space
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
                <Image
                  src="/images/crawlspace-before.jpg"
                  width={1600}
                  height={1200}
                  sizes="(max-width: 900px) 92vw, 460px"
                  alt="Charlotte crawl space before Carolux, bare dirt floor exposed to ground moisture"
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
                  <strong style={{ color: C.navy }}>Before:</strong> bare dirt floor, exposed to
                  ground moisture.
                </figcaption>
              </figure>
              <figure style={{ margin: 0 }}>
                <Image
                  src="/images/crawlspace-after.png"
                  width={1448}
                  height={1086}
                  sizes="(max-width: 900px) 92vw, 460px"
                  alt="Charlotte crawl space after Carolux heavy-duty vapor barrier installation"
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
                  <strong style={{ color: C.navy }}>After:</strong> heavy-duty vapor barrier sealed
                  across the crawl space.
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
            What a Crawl Space Job Costs
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
            Crawl space work in Charlotte is priced per square foot installed. The total depends on
            the size of the space, how accessible it is, the current moisture conditions, and
            whether old material needs removal. We measure on site and put a firm, all-in number in
            writing the same day.
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
              Charlotte Crawl Space Insulation: Common Questions
            </h2>
            <div className="carolux-crawl-faq" style={{ borderTop: `1px solid ${C.border}` }}>
              {CRAWL_FAQ.map(({ q, a, learnMore }, i) => (
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

        {/* ── Related + service-area / city mesh ───────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            Crawl Space Work Across the Charlotte Area
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
            Carolux installs crawl space vapor barriers and floor-joist batt throughout Charlotte
            and the surrounding North Carolina communities. Many homes also benefit from{" "}
            <a href="/services/attic-insulation" style={{ color: C.teal, textDecoration: "none", fontWeight: 500, borderBottom: `1px solid ${C.teal}` }}>
              attic insulation
            </a>{" "}
            and{" "}
            <a href="/services/air-sealing" style={{ color: C.teal, textDecoration: "none", fontWeight: 500, borderBottom: `1px solid ${C.teal}` }}>
              air sealing
            </a>
            , assessed in the same free visit.
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
              Get Your Free Crawl Space Assessment
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
              Free assessment for Charlotte-area homeowners. We check moisture, drainage, and
              access, then put a firm price in writing the same day. An owner gets back to you
              within a few hours.
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
