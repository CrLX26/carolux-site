import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { COMPANY, SERVICE_LINKS } from "../lib/content";
import { CITY_LINKS } from "../lib/cities";

const BASE_URL = "https://caroluxinsulation.com";

// ISO date for schema freshness — keep in sync with app/sitemap.js MODIFIED.services.
const LAST_UPDATED = "2026-08-13";

export const metadata = {
  title: "Insulation Services in Charlotte, NC | Carolux",
  description:
    "Attic insulation, crawl space insulation and vapor barriers, and attic air sealing across Charlotte and Gastonia, NC. Owner-operated, fully insured, free in-home estimate.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Insulation Services in Charlotte, NC | Carolux",
    description:
      "Attic insulation, crawl space insulation and vapor barriers, and attic air sealing across the Charlotte metro. Owner-operated and fully insured.",
    url: `${BASE_URL}/services`,
    siteName: "Carolux Insulation",
    locale: "en_US",
    type: "website",
  },
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

// The three services, mapped to their dedicated pages. `slug`/`name` come from the
// single-source SERVICE_LINKS in content.js so this hub can never drift from the footer.
const SERVICE_COPY = {
  "/services/attic-insulation": {
    num: "01",
    blurb:
      "Blown-in fiberglass or cellulose installed to R-49, the level the U.S. Department of Energy recommends for North Carolina. Air sealing goes in first on every full install, at no extra charge.",
    forYou: "Hot upstairs, high summer bills, or insulation you can see the joists through.",
  },
  "/services/crawl-space-insulation": {
    num: "02",
    blurb:
      "A heavy-duty ground vapor barrier across the crawl space floor to block soil moisture, plus fiberglass batt fitted between the floor joists. Every visit includes a moisture and drainage inspection.",
    forYou: "Cold floors, musty air, or a bare-dirt crawl space under the house.",
  },
  "/services/air-sealing": {
    num: "03",
    blurb:
      "Sealing the air bypasses insulation can't stop: around recessed lights, the attic hatch, top plates, and penetrations. Included with every full insulation install, at no extra charge.",
    forYou: "Drafts, uneven room temperatures, and insulation that never seemed to work.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // WI-072: the LocalBusiness entity is declared ONCE on the homepage
    // (app/lib/schema.js `#business`). This hub only references it as provider.
    {
      "@type": "ItemList",
      name: "Carolux Insulation services",
      itemListElement: SERVICE_LINKS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `${BASE_URL}${s.slug}`,
      })),
    },
    ...SERVICE_LINKS.map((s) => ({
      "@type": "Service",
      name: `${s.name} in Charlotte, NC`,
      serviceType: s.name,
      description: SERVICE_COPY[s.slug].blurb,
      url: `${BASE_URL}${s.slug}`,
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: CITY_LINKS.map((c) => ({ "@type": "City", name: `${c.name}, NC` })),
    })),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      ],
    },
  ],
};

export default function ServicesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main id="main" style={{ backgroundColor: C.cream, color: C.navy }}>
        <article
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            padding: "clamp(112px, 16vh, 168px) clamp(24px, 6vw, 48px) clamp(64px, 10vh, 120px)",
          }}
        >
          {/* Header */}
          <header style={{ paddingBottom: "clamp(28px, 4vh, 40px)", borderBottom: `1px solid ${C.border}` }}>
            <p
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                margin: "0 0 clamp(14px, 2vh, 20px)",
                fontFamily: "var(--font-label)",
                fontSize: "clamp(11px, 1vw, 13px)",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.teal,
              }}
            >
              <span aria-hidden="true" style={{ width: "26px", height: "1.5px", background: C.teal, opacity: 0.8 }} />
              Services
            </p>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(2.1rem, 5vw, 3.25rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                color: C.navy,
              }}
            >
              What we do, and who it&apos;s for
            </h1>
            <p
              style={{
                margin: "clamp(16px, 2.5vh, 24px) 0 0",
                maxWidth: "62ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                lineHeight: 1.75,
                color: C.ink,
              }}
            >
              Three services, all of them done by the owners. Tony is a former North Carolina home
              inspector, so every job starts with reading the house instead of guessing from the
              driveway. Fully insured, with a 2-year workmanship guarantee on the work we do.
            </p>
          </header>

          {/* Service list */}
          {SERVICE_LINKS.map((s) => {
            const copy = SERVICE_COPY[s.slug];
            return (
              <section key={s.slug} style={{ marginTop: "clamp(36px, 5vh, 56px)" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-label)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: C.teal,
                    marginBottom: "10px",
                  }}
                >
                  {copy.num}
                </span>
                <h2
                  style={{
                    margin: "0 0 0.75rem",
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.01em",
                    color: C.navy,
                  }}
                >
                  {s.name}
                </h2>
                <p
                  style={{
                    margin: "0 0 0.85rem",
                    maxWidth: "68ch",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(0.98rem, 1.15vw, 1.06rem)",
                    lineHeight: 1.78,
                    color: C.ink,
                  }}
                >
                  {copy.blurb}
                </p>
                <p
                  style={{
                    margin: "0 0 1rem",
                    maxWidth: "68ch",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: C.inkSoft,
                  }}
                >
                  <strong style={{ color: C.navy, fontWeight: 600 }}>Worth a look if:</strong>{" "}
                  {copy.forYou}
                </p>
                <a
                  href={s.slug}
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: C.teal,
                    textDecoration: "none",
                  }}
                >
                  {s.name} details →
                </a>
              </section>
            );
          })}

          {/* CTA */}
          <section
            style={{
              marginTop: "clamp(48px, 7vh, 76px)",
              padding: "clamp(28px, 4vw, 40px)",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
            }}
          >
            <h2
              style={{
                margin: "0 0 0.75rem",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                lineHeight: 1.18,
                color: C.navy,
              }}
            >
              Not sure which one you need?
            </h2>
            <p
              style={{
                margin: "0 0 1.25rem",
                maxWidth: "62ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.98rem, 1.15vw, 1.06rem)",
                lineHeight: 1.75,
                color: C.ink,
              }}
            >
              That&apos;s what the free in-home estimate is for. An owner reads the attic and crawl
              space, tells you what actually needs doing, and puts a written price in your hand the
              same day. No pressure, no upsell.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-label)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "16px 30px",
                  minHeight: "52px",
                  borderRadius: "3px",
                  background: C.teal,
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                Book my free in-home estimate
              </a>
              <a
                href={COMPANY.phoneHref}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1rem",
                  color: C.navy,
                  textDecoration: "none",
                }}
              >
                or call {COMPANY.phone}
              </a>
            </div>
          </section>

          {/* Service area mesh */}
          <section style={{ marginTop: "clamp(40px, 6vh, 64px)" }}>
            <h2
              style={{
                margin: "0 0 1rem",
                fontFamily: "var(--font-label)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.inkSoft,
              }}
            >
              Where we work
            </h2>
            <p style={{ margin: 0, lineHeight: 2, fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem" }}>
              {CITY_LINKS.map((c, i) => (
                <span key={c.slug}>
                  <a href={`/${c.slug}`} style={{ color: C.teal, textDecoration: "none" }}>
                    {c.name}
                  </a>
                  {i < CITY_LINKS.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
            <p
              style={{
                margin: "1.25rem 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.9rem",
                color: C.inkSoft,
              }}
            >
              Planning a budget first? See the{" "}
              <a href="/cost-guide" style={{ color: C.teal, textDecoration: "none" }}>
                Charlotte insulation cost guide
              </a>
              .
            </p>
          </section>

          <p
            style={{
              margin: "clamp(32px, 5vh, 48px) 0 0",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: C.inkSoft,
            }}
          >
            Last updated {LAST_UPDATED}
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
