import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { COMPANY } from "../lib/content";
import { CITY_LINKS } from "../lib/cities";

const BASE_URL = "https://caroluxinsulation.com";

// ISO date for schema freshness — keep in sync with app/sitemap.js MODIFIED.builders.
const LAST_UPDATED = "2026-09-08";

// BUILDER-FACING PAGE. Spec: BUILDER-PAGE-BRIEF.md (marketing lane, 2026-09-08);
// strategy source: carolux-marketing/NEW-CONSTRUCTION.md.
//
// This page is deliberately NOT under /services/ — those are homeowner-facing and
// conversion-shaped for a different reader. The builder pitch is Grade I installation
// and the documentation that proves it, NOT owner-operation/comfort/energy savings.
//
// ⚠️ HARD CLAIM LIMITS (from the brief — do not relax without the owner):
//  · NEVER "licensed" in any tense. Tony = FORMER NC home inspector; company = INSURED.
//  · NO cellulose anywhere on this page (we cannot dense-pack with the rented machine).
//  · NO spray foam as an offering (stated only as something we do not do).
//  · NEVER claim we achieve/grade/certify Grade I — we install TO the standard; the
//    HERS rater grades. No HERS score, ACH50, or code-compliance guarantee.
//  · NO completed new-construction jobs or production-builder experience implied.
//  · NO specific Duke incentive dollar amounts (unverified against programme terms).
//  · NO ENERGY STAR partnership/affiliation implied — referencing the standard is fine.
//  · NO per-sqft pricing. NO competitor negativity (incl. a builder's current sub).
//  · Deliberately NO energy-savings percentages here, which also keeps the FTC R-value
//    disclaimer (WI-059) out of scope for this page. Keep it that way.
// Server component + local brand tokens, matching the other server pages (sectionKit is
// "use client" and would cost the indexability).

export const metadata = {
  title: "New Construction Insulation for Builders | Carolux",
  description:
    "Insulation for new single-family construction in Gaston and Mecklenburg County, NC. We install to the RESNET Grade I standard and photograph every bay before drywall.",
  alternates: { canonical: "/builders" },
  openGraph: {
    title: "New Construction Insulation for Builders | Carolux",
    description:
      "Insulation for new construction in Gaston and Mecklenburg County, NC. Installed to the RESNET Grade I standard and documented before drywall.",
    url: `${BASE_URL}/builders`,
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

// Capability table. NOTE: cellulose is intentionally absent (no dense-pack machine).
const MATERIALS = [
  {
    material: "Fiberglass",
    forms: "Batt and blown-in",
    notes: "The default. Owens Corning AttiCat and Pink Next Gen.",
  },
  {
    material: "Mineral wool (Rockwool)",
    forms: "Batt",
    notes: "Premium tier, and the right answer for interior sound walls.",
  },
  {
    material: "Rigid foam board",
    forms: "Cut and cobble, sealed",
    notes: "Rim and band joists. A different product from spray foam.",
  },
  {
    material: "Americover vapor barrier",
    forms: "8-mil, 10-mil, anti-microbial",
    notes: "Crawl space ground cover. American-made with virgin resins.",
  },
];

const APPLICATIONS = [
  "Attic: new, replacement, or top-off",
  "Exterior walls",
  "Interior walls for sound control",
  "Crawl space, between the floor joists",
  "Rim and band joists",
  "Air sealing",
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // WI-072: the LocalBusiness entity is declared ONCE on the homepage
    // (app/lib/schema.js `#business`). Reference it here, never re-declare it.
    {
      "@type": "Service",
      name: "New Construction Insulation for Builders",
      serviceType: "New Construction Insulation",
      description:
        "Insulation for new single-family residential construction in Gaston and Mecklenburg County, NC. Fiberglass batt and blown-in, mineral wool, rigid board at rim and band joists, vapor barrier, and air sealing. Installed to the RESNET Grade I standard and photographed before drywall.",
      url: `${BASE_URL}/builders`,
      provider: { "@id": `${BASE_URL}/#business` },
      audience: { "@type": "Audience", audienceType: "Home builders and general contractors" },
      areaServed: CITY_LINKS.map((c) => ({ "@type": "City", name: `${c.name}, NC` })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Builders", item: `${BASE_URL}/builders` },
      ],
    },
  ],
};

const h2 = {
  margin: "0 0 1rem",
  fontFamily: "var(--font-cormorant)",
  fontWeight: 400,
  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
  lineHeight: 1.18,
  letterSpacing: "-0.01em",
  color: C.navy,
};

const para = {
  margin: "0 0 1rem",
  maxWidth: "68ch",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "clamp(0.98rem, 1.15vw, 1.06rem)",
  lineHeight: 1.78,
  color: C.ink,
};

const section = { marginTop: "clamp(40px, 6vh, 64px)" };

export default function BuildersPage() {
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
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(112px, 16vh, 168px) clamp(24px, 6vw, 48px) clamp(64px, 10vh, 120px)",
          }}
        >
          {/* ── Hero: lead on the rater and the inspection, not comfort ─────────── */}
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
              For Builders · Gaston &amp; Mecklenburg
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
              Insulation that passes the rater the first time
            </h1>
            <p
              style={{
                margin: "clamp(16px, 2.5vh, 24px) 0 0",
                maxWidth: "64ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.12rem)",
                lineHeight: 1.75,
                color: C.ink,
              }}
            >
              Carolux installs insulation for new single-family construction across Gaston and
              Mecklenburg County. We install to the RESNET Grade I standard and photograph every
              bay before drywall, so your rater and your inspector both get what they need without
              a second trip.
            </p>
          </header>

          {/* ── Grade I: the actual argument ─────────────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>Why the grade is the whole job</h2>
            <p style={para}>
              A HERS rater grades insulation before drywall, and then it is buried. That grade
              carries real weight: ENERGY STAR v3 and most utility new-construction programmes
              require Grade I to qualify, and Duke Energy pays builders an incentive for efficient
              new construction that depends on the programme you are enrolled in.
            </p>
            <p style={para}>
              Grade I allows only occasional very small gaps, with compression or incomplete fill
              under about 2% of the area. When an install is graded III, RESNET models roughly 5%
              of the insulated area as if it were not insulated at all. You paid for insulation
              that then stops counting toward the score. In U.S. Department of Energy field
              surveys, only about half of homes reach Grade I.
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              <strong style={{ color: C.navy }}>
                To be exact about who does what: we install to the Grade I standard and document
                it. The rater grades it.
              </strong>{" "}
              We do not grade, rate, or certify our own work, and no installer can promise you a
              HERS score, a blower-door result, or a code-compliance outcome.
            </p>
            <p
              style={{
                margin: "1rem 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.84rem",
                fontStyle: "italic",
                lineHeight: 1.6,
                color: C.inkSoft,
              }}
            >
              Grade definitions and the 5% modelling penalty per RESNET and the Insulation
              Institute. Incentive availability and amounts depend on the Duke Energy programme
              and are set by Duke, not by us.
            </p>
          </section>

          {/* ── Documentation ────────────────────────────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>Photographed before drywall</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              Every bay is photographed with a depth reference before it is covered. You get the
              set. If a rater questions a wall, or a buyer asks what is behind the drywall two
              years from now, the answer exists as a file instead of a memory. This costs nothing
              but discipline, which is exactly why it is worth asking your current sub for.
            </p>
          </section>

          {/* ── Capability table ─────────────────────────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>What we install</h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.95rem",
                  minWidth: "540px",
                }}
              >
                <thead>
                  <tr>
                    {["Material", "Forms", "Notes"].map((th) => (
                      <th
                        key={th}
                        style={{
                          textAlign: "left",
                          padding: "0 0 10px",
                          borderBottom: `1.5px solid ${C.border}`,
                          fontFamily: "var(--font-label)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: C.inkSoft,
                        }}
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATERIALS.map((m) => (
                    <tr key={m.material}>
                      <td
                        style={{
                          padding: "14px 16px 14px 0",
                          borderBottom: `1px solid ${C.border}`,
                          color: C.navy,
                          fontWeight: 600,
                          verticalAlign: "top",
                        }}
                      >
                        {m.material}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px 14px 0",
                          borderBottom: `1px solid ${C.border}`,
                          color: C.ink,
                          verticalAlign: "top",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.forms}
                      </td>
                      <td
                        style={{
                          padding: "14px 0",
                          borderBottom: `1px solid ${C.border}`,
                          color: C.inkSoft,
                          lineHeight: 1.6,
                          verticalAlign: "top",
                        }}
                      >
                        {m.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3
              style={{
                margin: "clamp(28px, 4vh, 36px) 0 0.9rem",
                fontFamily: "var(--font-label)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.inkSoft,
              }}
            >
              Where it goes
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: "8px 10px" }}>
              {APPLICATIONS.map((a) => (
                <li
                  key={a}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.9rem",
                    color: C.ink,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: "3px",
                    padding: "8px 14px",
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Rim joists: the credibility marker ───────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>Rim and band joists get board, not batt</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              Batt at a band joist is a building-science failure. Fiberglass is air-permeable, so
              conditioned interior air still reaches the cold rim, and moisture condenses behind
              the insulation where nobody sees it. We cut and seal rigid board at the rim instead.
              It is a small line item that quietly prevents a callback years later.
            </p>
          </section>

          {/* ── Who does the work ────────────────────────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>Who is actually on your site</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              Both owners, on every job. Tony Kermis and Juan Gonzalez do the work themselves, with
              no crew paid by the house and no subcontractors. Tony is a former North Carolina home
              inspector, which is where the documentation habit comes from.
              That labour model is the reason a Grade I standard is achievable on a schedule, not a
              slogan.
            </p>
          </section>

          {/* ── What we do not do ────────────────────────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>What we do not do</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              <strong style={{ color: C.navy }}>We do not install spray foam.</strong> If your
              assembly is specified for closed-cell or open-cell foam, we are not your sub for that
              scope and we would rather tell you now than waste a bid cycle. Rigid board at the rim
              is a different product and we do install that. We also do not currently take on
              multifamily or commercial work.
            </p>
          </section>

          {/* ── Paperwork ────────────────────────────────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>Insurance and paperwork</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              Carolux Insulation LLC is a North Carolina limited liability company and carries
              general liability insurance. A certificate of insurance and a W-9 are available on
              request, and we will send both with a bid if you want them up front. All work carries
              a 2-year workmanship guarantee.
            </p>
          </section>

          {/* ── Service area ─────────────────────────────────────────────────────── */}
          <section style={section}>
            <h2 style={h2}>Where we work</h2>
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
            <p style={{ margin: "1rem 0 0", fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: C.inkSoft }}>
              Building outside that list in Gaston or Mecklenburg County? Ask. If the schedule
              works, we travel.
            </p>
          </section>

          {/* ── CTA: send plans (mailto, no homeowner form, no estimator) ─────────── */}
          <section
            style={{
              marginTop: "clamp(48px, 7vh, 76px)",
              padding: "clamp(28px, 4vw, 40px)",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
            }}
          >
            <h2 style={{ ...h2, marginBottom: "0.75rem" }}>Send us the plans</h2>
            <p style={{ ...para, marginBottom: "1.25rem" }}>
              Email the drawings, the lot count, and your target programme if you are chasing one.
              You get a written scope and a number back. If the scope calls for something we do not
              install, we will say so in the reply instead of bidding around it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a
                href="mailto:team@caroluxinsulation.com?subject=New%20construction%20bid%20request&body=Lots%2Fhomes%3A%20%0AAddress%20or%20subdivision%3A%20%0ATarget%20start%3A%20%0AProgramme%20(ENERGY%20STAR%2C%20Duke%2C%20none)%3A%20%0APlans%20attached%3A%20"
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
                Email plans for a bid
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

          <p
            style={{
              margin: "clamp(32px, 5vh, 48px) 0 0",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: C.inkSoft,
            }}
          >
            Last updated {LAST_UPDATED} · Homeowner, not a builder?{" "}
            <a href="/services" style={{ color: C.teal, textDecoration: "none" }}>
              See our residential services
            </a>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
