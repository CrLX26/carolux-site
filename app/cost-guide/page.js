import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { COMPANY, SERVICE_AREA } from "../lib/content";

export const metadata = {
  title: "Insulation Cost in Charlotte, NC — What to Expect | Carolux",
  description:
    "Honest price ranges for attic and crawl space insulation in Charlotte, NC. What affects your total, why no online quote is accurate, and how to get a firm price.",
  alternates: { canonical: "/cost-guide" },
  openGraph: {
    title: "Insulation Cost in Charlotte, NC — What to Expect | Carolux",
    description:
      "Honest price ranges for attic and crawl space insulation in Charlotte, NC. What affects your total and how to get a firm price.",
    url: "https://caroluxinsulation.com/cost-guide",
    siteName: "Carolux Insulation",
    locale: "en_US",
    type: "article",
  },
};

// Page-level FAQ schema — cost questions not covered by the homepage FAQPage.
// Intentionally separate from the global @graph in layout.js.
const costFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does attic insulation cost in Charlotte, NC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Attic blown-in insulation in Charlotte typically runs $1.00–$5.00+ per square foot installed, depending on the contractor, R-value target, and scope. Specialty insulation companies and owner-operators generally fall in the $1.25–$2.50/sqft range. Large home-services companies with higher overhead often quote $3.00–$5.00/sqft for the same work. Reaching the DOE-recommended R-49 for NC homes typically costs $1.50–$3.00/sqft installed depending on who you hire. Homes that need existing insulation removed first add $1.00–$3.00/sqft. A free energy audit gives you an accurate number for your specific home.",
      },
    },
    {
      "@type": "Question",
      name: "How much does crawl space insulation cost in Charlotte, NC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Crawl space fiberglass batt insulation in Charlotte typically costs $1.00–$3.50 per square foot installed. Adding a vapor barrier runs $1.50–$4.00/sqft for standard poly liner; full encapsulation with sealed vents and a dehumidifier can run $4.00–$10.00/sqft. The total varies based on crawl space accessibility, current conditions, contractor type, and whether removal is needed.",
      },
    },
    {
      "@type": "Question",
      name: "What factors affect insulation cost the most?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The five biggest variables are: your target R-value (higher R means more material), whether existing insulation needs removal first, attic or crawl space accessibility, whether air sealing is needed before insulation goes in, and the type of contractor you hire. Specialty insulation companies typically cost less than large multi-service HVAC companies for the same scope. Air sealing is the step most contractors skip — it's what actually stops air movement and makes the insulation work.",
      },
    },
    {
      "@type": "Question",
      name: "Why don't insulation contractors give online quotes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An accurate insulation quote requires measuring your current R-value, checking for moisture issues, assessing attic access, and locating air bypass points — none of which is possible without an in-person visit. Every insulation contractor in Charlotte, including national franchises, requires an in-home assessment before quoting. An online quote based on square footage alone is either too high or too low.",
      },
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

// Charlotte market ranges — wide end reflects large HVAC home-service companies;
// low end reflects budget/commodity operators. Mid-range specialty contractors
// (owner-operated, insulation-focused) typically fall in the lower half.
const PRICE_TABLE = [
  {
    service: "Attic Blown-In — R-38",
    range: "$1.00 – $4.00 / sqft",
    note: "Basic compliance level",
  },
  {
    service: "Attic Blown-In — R-49",
    range: "$1.25 – $5.00 / sqft",
    note: "DOE-recommended for NC — fits most homes",
    highlight: true,
  },
  {
    service: "Attic Blown-In — R-60",
    range: "$1.50 – $6.00 / sqft",
    note: "Maximum performance",
  },
  {
    service: "Attic Removal (existing insulation)",
    range: "$1.00 – $3.00 / sqft",
    note: "Required before new install in many cases",
  },
  {
    service: "Crawl Space Fiberglass Batt",
    range: "$1.00 – $3.50 / sqft",
    note: "Between floor joists",
  },
  {
    service: "Vapor Barrier — Basic Poly Liner",
    range: "$1.50 – $4.00 / sqft",
    note: "Standard contractor-grade installation",
  },
  {
    service: "Crawl Space Full Encapsulation",
    range: "$4.00 – $10.00 / sqft",
    note: "Sealed vents, thick liner, dehumidifier",
  },
];

const VARIABLES = [
  {
    factor: "Current R-value",
    detail:
      "Homes at R-11 need 3–4× more material than a home at R-30. We measure before quoting — you get the exact gap, not an estimate of an estimate.",
  },
  {
    factor: "Whether removal is needed",
    detail:
      "Damaged, settled, or contaminated insulation must come out before new material goes in. We identify this during the assessment so there are no surprises on job day.",
  },
  {
    factor: "Attic or crawl space access",
    detail:
      "Low-pitch roofs, narrow hatches, and complex framing affect labor hours. A straightforward walk-up attic and a tight 18-inch crawl space are not the same job.",
  },
  {
    factor: "Air sealing scope",
    detail:
      "Air sealing is included on all new installs and full replacements. The amount of work varies — a 1970s home with no prior sealing takes longer than a 2010 build. Either way, it's not an upsell: it goes in before the insulation.",
  },
  {
    factor: "Total square footage",
    detail:
      "Material is ordered by the bag or roll. Larger jobs land toward the lower end of the per-sqft range because setup and mobilization costs spread over more square footage.",
  },
];

const INCLUDED = [
  [
    "Air Sealing First",
    "On every new install and full replacement — before insulation. Sealing the bypasses is what makes the R-value work. Most contractors skip it.",
  ],
  [
    "Written Scope",
    "Exact materials, R-value target, and total price in writing before you decide.",
  ],
  [
    "Full Cleanup",
    "We bag and haul everything. The attic or crawl space is cleaner when we leave than when we arrived.",
  ],
  [
    "2-Year Guarantee",
    "Labor and materials covered for two years. No asterisks.",
  ],
  [
    "Both Owners on Every Job",
    "Tony and Juan do the work themselves — no subcontractors. Tony is a former NC home inspector; Juan runs the schedule and the follow-through.",
  ],
  [
    "No Upsells on Arrival",
    "The audit is a diagnostic. We tell you what we found and what it costs. You decide.",
  ],
];

export default function CostGuidePage() {
  const cityCount = SERVICE_AREA.cities.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(costFaqSchema) }}
      />
      <Nav />
      <main style={{ backgroundColor: C.cream, color: C.navy }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          style={{ maxWidth: 760, margin: "0 auto", padding: "7rem 1.5rem 3rem" }}
        >
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
            Charlotte, NC · Insulation Pricing Guide
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.78rem",
              color: C.inkSoft,
              marginBottom: "1rem",
            }}
          >
            By <strong>Tony Kermis</strong>, former NC Home Inspector &amp; co-owner, Carolux Insulation ·{" "}
            <span>Last updated June 2026</span>
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
            How Much Does Insulation Cost in Charlotte, NC?
          </h1>

          {/* Quick-answer box — optimised for AI overview / featured snippet */}
          <div
            style={{
              background: `${C.teal}0a`,
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
              <strong>Quick answer:</strong> Attic blown-in insulation in Charlotte runs{" "}
              <strong>$1.00–$5.00+ per square foot installed</strong> across the market,
              per Angi and HomeAdvisor 2025–2026 data. Specialty insulation companies
              typically fall in the <strong>$1.25–$2.50/sqft</strong> range; large
              multi-service home-comfort companies with higher overhead often quote{" "}
              <strong>$3.00–$5.00/sqft</strong> for the same work. Crawl space insulation
              runs <strong>$1.00–$3.50/sqft</strong> for batts, plus{" "}
              <strong>$1.50–$4.00/sqft</strong> for a vapor barrier. The U.S. Department
              of Energy recommends R-49 for North Carolina attics. A free energy audit
              gives you a firm, all-in number for your specific home.
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.82rem",
              color: C.inkSoft,
              lineHeight: 1.6,
            }}
          >
            Ranges reflect the full Charlotte MSA market — Mecklenburg, Gaston, Union, Cabarrus,
            and surrounding NC counties — across contractor types and overhead structures.
            All-in: labor, materials, and cleanup.
          </p>
        </section>

        {/* ── Pricing table ────────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.5rem 3.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "0.5rem",
            }}
          >
            Charlotte Market Ranges — What Homeowners Typically Pay
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              color: C.inkSoft,
              lineHeight: 1.65,
              marginBottom: "1.6rem",
            }}
          >
            Per-square-foot installed, across the full Charlotte contractor market. The low
            end reflects owner-operators and specialty insulation companies; the high end
            reflects large multi-service home-comfort companies with greater overhead. Where
            your project lands also depends on the variables in the next section.
          </p>
          <div
            style={{
              borderRadius: "4px",
              overflow: "hidden",
              border: `1px solid ${C.border}`,
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
              <thead>
                <tr style={{ backgroundColor: C.navy, color: C.cream }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.8rem 1.2rem",
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Service
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.8rem 1.2rem",
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Installed Range
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.8rem 1.2rem",
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                    }}
                    className="hidden-mobile"
                  >
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE.map((row, i) => (
                  <tr
                    key={row.service}
                    style={{
                      backgroundColor: row.highlight
                        ? `${C.teal}0d`
                        : i % 2 === 0
                        ? C.surface
                        : C.cream,
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    <td
                      style={{
                        padding: "0.85rem 1.2rem",
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: row.highlight ? 600 : 400,
                        color: C.navy,
                      }}
                    >
                      {row.service}
                      {row.highlight && (
                        <span
                          style={{
                            marginLeft: "0.6rem",
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-label)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: C.teal,
                            fontWeight: 700,
                          }}
                        >
                          Recommended
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "0.85rem 1.2rem",
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 600,
                        color: C.teal,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.range}
                    </td>
                    <td
                      style={{
                        padding: "0.85rem 1.2rem",
                        fontFamily: "var(--font-dm-sans)",
                        color: C.inkSoft,
                        fontSize: "0.88rem",
                      }}
                    >
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.78rem",
              color: C.inkSoft,
              marginTop: "0.75rem",
            }}
          >
            Minimum job: $800. Flat-fee add-ons (vapor barrier removal, rodent remediation,
            attic hatch) quoted separately during assessment. Encapsulation (sealed vents +
            dehumidifier) is a different scope from a vapor barrier liner — make sure you're
            comparing the same service when getting quotes. Range sources: Angi, HomeAdvisor,
            HomeGuide, and local Charlotte MSA contractor data (2025–2026).
          </p>

          {/* Why the range is so wide */}
          <div
            style={{
              marginTop: "1.8rem",
              background: `${C.teal}0a`,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "1.2rem 1.4rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 600,
                fontSize: "0.93rem",
                color: C.navy,
                marginBottom: "0.4rem",
              }}
            >
              Why is the range so wide?
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.88rem",
                color: C.inkSoft,
                lineHeight: 1.72,
                margin: 0,
              }}
            >
              Contractor overhead makes up a significant portion of an insulation quote. A
              large home-services company with a full licensed crew, drug-testing program,
              call center, and multi-service overhead structure carries very different costs
              than a two-person owner-operated insulation specialist. Both can do a quality
              job — but the same R-49 attic install can come in at $1.50/sqft from one and
              $4.50/sqft from the other. Understanding who you're hiring explains most of
              the variation.
            </p>
          </div>
        </section>

        {/* ── What moves the price ─────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "4rem 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "0.5rem",
              }}
            >
              What Puts You at the High or Low End
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
              Five factors move a project through the range. Every one of them is assessed
              during the free energy audit — that's why we do it before quoting.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {VARIABLES.map((v, i) => (
                <div
                  key={v.factor}
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
                      {v.factor}
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
                      {v.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why no online quote ──────────────────────────────────────── */}
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
              Why No Contractor Will Give You an Accurate Online Quote
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
              Every insulation contractor in Charlotte — including the national franchise
              brands — requires an in-person visit before quoting. There's a reason: the
              variables that matter most (current R-value, moisture, attic access, air bypass
              locations) are only visible on-site.
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
              An online quote based on square footage alone is either too high (you overpay and
              walk away) or too low (the contractor surprises you with add-ons on job day).
              Neither is useful.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.03rem)",
                lineHeight: 1.78,
                color: "rgba(250,248,245,0.82)",
              }}
            >
              Our free energy audit takes about 45 minutes. You get your current R-value reading,
              a thermal scan of air bypass locations, a written scope, and a firm all-in
              price — before any commitment.
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
            What Every Carolux Job Includes
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
            Not everything competitors charge extra for.
          </p>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {INCLUDED.map(([title, desc]) => (
              <div
                key={title}
                style={{
                  borderBottom: `1px solid ${C.border}`,
                  padding: "1.4rem 0",
                }}
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

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: C.navy,
            textAlign: "center",
          }}
        >
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
              Get Your Accurate Quote
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
              Free energy audit for Charlotte-area homeowners. No commitment, just a clear
              picture of what your home needs and what it costs.
            </p>
            <a
              href={COMPANY.phoneHref}
              style={{
                display: "inline-block",
                backgroundColor: C.teal,
                color: C.cream,
                fontFamily: "var(--font-label)",
                fontWeight: 700,
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "1rem 2.2rem",
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
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
