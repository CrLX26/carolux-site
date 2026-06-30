import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { COMPANY } from "../lib/content";
import { SLUGS, getCity } from "../lib/cities";

const BASE_URL = "https://caroluxinsulation.com";

// ISO date for schema freshness signals — keep in sync with the visible
// "Last updated" byline in the hero. Bump when city copy is revised.
const LAST_UPDATED = "2026-06-12";

// Charlotte metro centroid — every service-area city sits within ~40mi.
// Anchors the LocalBusiness entity geographically on each city page.
const GEO = { latitude: 35.2271, longitude: -80.8431 };

// Authoritative off-site profiles — mirrors layout.js `sameAs` so every
// city-page entity node ties back to the same identities.
const SAME_AS = [
  COMPANY.instagram,
  COMPANY.facebook,
  COMPANY.googleBusiness,
  COMPANY.nextdoor,
];

const C = {
  cream: "#faf8f5",
  surface: "#fefdfb",
  navy: "#1a2b3c",
  teal: "#4a90a4",
  ink: "#2c2c2c",
  inkSoft: "rgba(26,43,60,0.65)",
  border: "rgba(26,43,60,0.1)",
};

export function generateStaticParams() {
  return SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `${city.displayName} Insulation Contractor | Free Estimate | Carolux`,
    description: `Owner-operated attic insulation and crawl space work in ${city.displayName}, NC. Air sealing included on every full install, at no extra charge. Free estimate — call ${COMPANY.phone}.`,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${city.displayName} Insulation Contractor | Carolux`,
      description: `Owner-operated attic insulation and crawl space work in ${city.displayName}, NC. Free estimate from ${COMPANY.phone}.`,
      url: `${BASE_URL}/${slug}`,
      siteName: "Carolux Insulation",
      locale: "en_US",
      type: "website",
    },
  };
}

function buildSchema(slug, city) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // City-page LocalBusiness node — same @id as layout.js so Google
        // recognises this as the same entity, not a duplicate listing.
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#business`,
        name: "Carolux Insulation LLC",
        url: `${BASE_URL}/${slug}`,
        telephone: "+17042282729",
        email: "team@caroluxinsulation.com",
        image: `${BASE_URL}/images/house-thermal4.webp`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: city.displayName,
          addressRegion: "NC",
          addressCountry: "US",
        },
        areaServed: [{ "@type": "City", name: `${city.displayName}, NC` }],
        founder: [
          { "@type": "Person", name: "Tony Kermis" },
          { "@type": "Person", name: "Juan Gonzalez" },
        ],
        geo: { "@type": "GeoCoordinates", ...GEO },
        sameAs: SAME_AS,
      },
      {
        "@type": "Service",
        name: `Attic Insulation in ${city.displayName}, NC`,
        serviceType: "Attic Insulation",
        description: `Blown-in attic insulation installed to R-49 in ${city.displayName}, NC. Air sealing included on every full install at no extra charge. Owner-operated, fully insured, 2-year workmanship guarantee.`,
        provider: { "@id": `${BASE_URL}/#business` },
        areaServed: [{ "@type": "City", name: `${city.displayName}, NC` }],
      },
      {
        "@type": "Service",
        name: `Crawl Space Insulation & Vapor Barrier in ${city.displayName}, NC`,
        serviceType: "Crawl Space Insulation",
        description: `Crawl space fiberglass batt insulation and vapor barrier installation in ${city.displayName}, NC. Full moisture and drainage inspection included in every visit.`,
        provider: { "@id": `${BASE_URL}/#business` },
        areaServed: [{ "@type": "City", name: `${city.displayName}, NC` }],
      },
      {
        "@type": "FAQPage",
        dateModified: LAST_UPDATED,
        mainEntity: city.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        // Two-level breadcrumb (Home › City Insulation) — helps Google place
        // the page in the site hierarchy and can surface a breadcrumb in SERPs.
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: `${city.displayName} Insulation`,
            item: `${BASE_URL}/${slug}`,
          },
        ],
      },
    ],
  };
}

const SERVICES = [
  {
    num: "01",
    title: "Blown-In Attic Insulation",
    href: "/services/attic-insulation",
    linkLabel: "Learn more about attic insulation",
    getDesc: (city) =>
      `Fiberglass or cellulose blown to R-49 — the DOE standard for North Carolina. Air sealing is done before any material goes in, at no extra charge. Most ${city.displayName} attics finish in a single day.`,
  },
  {
    num: "02",
    title: "Crawl Space & Vapor Barrier",
    href: "/services/crawl-space-insulation",
    linkLabel: "Learn more about crawl space insulation",
    getDesc: (city) =>
      `Heavy-duty vapor barrier to stop ground moisture from migrating into the floor structure above. North Carolina's humid summers make crawl space moisture a real cost driver for homes in ${city.displayName} and throughout ${city.county}.`,
  },
  {
    num: "03",
    title: "Fiberglass Batt Insulation",
    getDesc: () =>
      `Hand-fitted batt between crawl space floor joists — no gaps, no shortcuts. Tony and Juan cut and place every piece themselves; that's what separates properly-fitted work from a hurried crew install.`,
  },
];

const WHY_US = [
  ["I", "Owner-Operated", (city) => `Tony and Juan are on the job at every ${city.displayName} project — not a crew you've never met. You get the owners' direct contact and they pick up the phone.`],
  ["II", "Air Sealing Included", () => "Air sealing on every full installation at no extra charge. Many contractors skip it or bill it separately. It's the highest-impact step and the one that separates a real upgrade from a temporary fix."],
  ["III", "2-Year Guarantee", () => "If anything Carolux installed isn't performing correctly within two years, the owners come back and make it right. No questions, no hassle, no fine print."],
  ["IV", "Inspector-Grade Diagnosis", () => "Tony spent years as a North Carolina home inspector before Carolux. He reads the whole house — moisture, airflow, where your money is escaping — before recommending anything."],
];

export default async function CityPage({ params }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const schema = buildSchema(slug, city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* FAQ details/summary reset — hides default browser marker, keeps answers in DOM */}
      <style>{`
        .carolux-city-faq details summary { list-style: none; }
        .carolux-city-faq details summary::-webkit-details-marker { display: none; }
        .carolux-city-faq details[open] .faq-indicator { transform: rotate(45deg); }
        .carolux-city-faq .faq-indicator { transition: transform 240ms ease; display: inline-block; }
        .carolux-cta-btn { transition: background-color 160ms ease, transform 120ms ease; }
        .carolux-cta-btn:hover { background-color: #3d7d90; transform: translateY(-1px); }
      `}</style>

      <Nav />

      <main id="main" style={{ backgroundColor: C.cream, color: C.navy }}>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
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
            {city.county} · Insulation Contractor
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
            {city.displayName} Insulation Contractor, Free Estimate
          </h1>

          {/* Quick-answer box — AEO snippet target */}
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
              <strong>Carolux Insulation serves {city.displayName}, NC</strong> —
              owner-operated attic blown-in insulation, crawl space fiberglass batt, and vapor
              barrier installation. Both owners on every job. Air sealing included on every full
              install at no extra charge. Free energy audit with same-day written quote.{" "}
              Call{" "}
              <a href={COMPANY.phoneHref} style={{ color: C.teal, textDecoration: "none" }}>
                {COMPANY.phone}
              </a>
              .
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
            {city.blurb}
          </p>
        </section>

        {/* ── Services ───────────────────────────────────────────────────── */}
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
                marginBottom: "0.75rem",
              }}
            >
              Insulation Services in {city.displayName}
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
              Three services, every one installed by the owners.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {SERVICES.map((s) => (
                <div
                  key={s.num}
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
                    {s.num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 600,
                        color: C.navy,
                        margin: "0 0 0.3rem",
                        fontSize: "1rem",
                      }}
                    >
                      {s.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.93rem",
                        color: C.inkSoft,
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {s.getDesc(city)}
                    </p>
                    {s.href && (
                      <a
                        href={s.href}
                        style={{
                          display: "inline-block",
                          marginTop: "0.7rem",
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: C.teal,
                          textDecoration: "none",
                          borderBottom: `1px solid ${C.teal}`,
                          lineHeight: 1,
                          paddingBottom: "2px",
                        }}
                      >
                        {s.linkLabel || "Learn more"} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Carolux ────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(4rem, 6vw, 6rem) 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "0.75rem",
            }}
          >
            Why {city.displayName} Homeowners Choose Carolux
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
            Four things most insulation companies don't offer.
          </p>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {WHY_US.map(([roman, title, getDesc]) => (
              <div
                key={roman}
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
                  {roman}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 600,
                      color: C.navy,
                      margin: "0 0 0.3rem",
                      fontSize: "1rem",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.93rem",
                      color: C.inkSoft,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {getDesc(city)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        {/* answers stay in the DOM whether open or closed — never JS-gated  */}
        <section
          style={{
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(3rem, 4.5vw, 4.5rem) 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "2rem",
              }}
            >
              Common Questions: {city.displayName} Insulation
            </h2>
            <div className="carolux-city-faq" style={{ borderTop: `1px solid ${C.border}` }}>
              {city.faq.map(({ q, a }, i) => (
                <details
                  key={i}
                  open={i === 0}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
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
                    {/* faq[0] is the cost question for every city — link it to
                        the Charlotte price guide (internal link to the highest-
                        authority pricing page). */}
                    {i === 0 && (
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

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: C.navy, textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "clamp(5rem, 9vw, 8rem) 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 400,
                marginBottom: "1rem",
                color: C.cream,
              }}
            >
              Get a Free Estimate in {city.displayName}
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
              Free energy audit for {city.displayName} homeowners. No commitment — just a clear
              picture of what your home needs and what it costs. An owner gets back to you within a
              few hours.
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
              Serving {city.displayName} and the surrounding {city.county} communities
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
