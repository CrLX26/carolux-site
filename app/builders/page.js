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
//  · FUTURE-PROOFED FOR HIRING (owner instruction 2026-09-08): never say "no crew", "no
//    subcontractors", or "the owners do the work themselves" HERE. Carolux intends to expand,
//    and a builder reading a capacity cap is a reason to pass on a multi-home job. The durable
//    claim is AGENTS.md's canonical one: an owner, or a directly supervised team member, on
//    every job. Sell SUPERVISION, not headcount. (Register WI-050 tracks the same advertised-
//    vs-actual exposure sitewide; the rest of the site was deliberately left unchanged.)
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

// Rhythm is deliberately UNEVEN. Uniform spacing is what made the first pass read flat.
const section = { marginTop: "clamp(40px, 6vh, 64px)" };
const sectionTight = { marginTop: "clamp(26px, 3.5vh, 38px)" };
const sectionWide = { marginTop: "clamp(64px, 9vh, 104px)" };

// Full-bleed dark band. The navy band is the site's signature move (Hero, Stats,
// Estimator result, Contact) and its absence is most of why this page read bland.
const band = {
  background: C.navy,
  padding: "clamp(56px, 9vh, 104px) clamp(24px, 6vw, 48px)",
};
const bandInner = { maxWidth: "900px", margin: "0 auto" };

// Big Gloock numeral. Scale contrast against 1rem body is ~4-6x, not 1.5x.
const numeral = {
  fontFamily: "var(--font-cormorant)",
  fontWeight: 400,
  fontSize: "clamp(3.4rem, 8.5vw, 5.6rem)",
  lineHeight: 0.92,
  letterSpacing: "-0.03em",
};
const bandLabel = {
  fontFamily: "var(--font-label)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

export default function BuildersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main id="main" style={{ backgroundColor: C.cream, color: C.navy }}>
        {/* ── Hero. Scale is the point: the H1 runs ~4x body, not 2x. ─────────── */}
        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(112px, 16vh, 168px) clamp(24px, 6vw, 48px) clamp(48px, 7vh, 76px)",
          }}
        >
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              margin: "0 0 clamp(16px, 2.4vh, 24px)",
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
              fontSize: "clamp(2.6rem, 6.6vw, 4.4rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: C.navy,
            }}
          >
            Insulation that passes the rater the first time
          </h1>
          <p
            style={{
              margin: "clamp(20px, 3vh, 30px) 0 0",
              maxWidth: "58ch",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(1.05rem, 1.45vw, 1.24rem)",
              lineHeight: 1.7,
              color: C.inkSoft,
            }}
          >
            New single-family construction across Gaston and Mecklenburg County. We install to the
            RESNET Grade I standard and photograph every bay before drywall, so your rater and your
            inspector both get what they need without a second trip.
          </p>
        </article>

        {/* ── FOCAL MOMENT. Full-bleed navy: the grade as an argument, not prose. ── */}
        <section style={band}>
          <div style={bandInner}>
            <p style={{ ...bandLabel, margin: "0 0 clamp(16px, 2.4vh, 22px)", color: C.teal }}>
              The grade is the job
            </p>
            <h2
              style={{
                margin: "0 0 clamp(36px, 5.5vh, 60px)",
                maxWidth: "20ch",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(1.9rem, 4.2vw, 3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: C.cream,
              }}
            >
              A rater decides what your insulation is worth
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "clamp(28px, 4.5vw, 56px)",
              }}
            >
              {/* Grade I: what we install to */}
              <div style={{ borderTop: `1.5px solid ${C.teal}`, paddingTop: "clamp(18px, 2.6vh, 24px)" }}>
                <p style={{ ...bandLabel, margin: "0 0 clamp(14px, 2vh, 20px)", color: C.teal }}>
                  Grade I · what we install to
                </p>
                <div style={{ ...numeral, color: C.teal }}>2%</div>
                <p
                  style={{
                    margin: "clamp(14px, 2vh, 18px) 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.98rem",
                    lineHeight: 1.65,
                    color: "rgba(250,248,245,0.82)",
                  }}
                >
                  The most gap, compression, or incomplete fill allowed across the insulated area.
                  Occasional very small gaps, and nothing more.
                </p>
              </div>

              {/* Grade III: the cost. Diminished on purpose, the fade IS the meaning. */}
              <div
                style={{
                  borderTop: "1.5px solid rgba(250,248,245,0.22)",
                  paddingTop: "clamp(18px, 2.6vh, 24px)",
                }}
              >
                <p style={{ ...bandLabel, margin: "0 0 clamp(14px, 2vh, 20px)", color: "rgba(250,248,245,0.5)" }}>
                  Grade III · what it costs you
                </p>
                <div style={{ ...numeral, color: "rgba(250,248,245,0.42)" }}>5%</div>
                <p
                  style={{
                    margin: "clamp(14px, 2vh, 18px) 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.98rem",
                    lineHeight: 1.65,
                    color: "rgba(250,248,245,0.62)",
                  }}
                >
                  The share of the insulated area RESNET then models as if it were bare. You bought
                  insulation that stops counting toward the score.
                </p>
              </div>
            </div>

            {/* Full-width line, deliberately breaking the two-column symmetry. */}
            <p
              style={{
                margin: "clamp(36px, 5.5vh, 60px) 0 0",
                paddingTop: "clamp(24px, 3.5vh, 34px)",
                borderTop: "1px solid rgba(250,248,245,0.14)",
                maxWidth: "34ch",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(1.25rem, 2.3vw, 1.7rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: C.cream,
              }}
            >
              In Department of Energy field surveys, only about half of homes reach Grade I.
            </p>

            <p
              style={{
                margin: "clamp(20px, 3vh, 28px) 0 0",
                maxWidth: "62ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.98rem",
                lineHeight: 1.7,
                color: "rgba(250,248,245,0.78)",
              }}
            >
              To be exact about who does what: we install to the Grade I standard and document it,
              and the rater grades it. No installer can promise you a HERS score, a blower-door
              result, or a code-compliance outcome.
            </p>

            <p
              style={{
                margin: "clamp(18px, 2.6vh, 24px) 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.8rem",
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "rgba(250,248,245,0.38)",
              }}
            >
              Grade definitions and the 5% modelling penalty per RESNET and the Insulation
              Institute. ENERGY STAR v3 and most utility new-construction programmes require Grade
              I. Duke Energy incentive availability and amounts are set by Duke and depend on the
              programme.
            </p>
          </div>
        </section>

        {/* ── Body. Back to cream, with uneven rhythm. ─────────────────────────── */}
        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(56px, 8vh, 90px) clamp(24px, 6vw, 48px) clamp(48px, 7vh, 80px)",
          }}
        >
          <section>
            <h2 style={h2}>Photographed before drywall</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              Every bay is photographed with a depth reference before it is covered. You get the
              set. If a rater questions a wall, or a buyer asks what is behind the drywall two years
              from now, the answer exists as a file instead of a memory. It costs nothing but
              discipline, which is exactly why it is worth asking any sub for.
            </p>
          </section>

          <section style={sectionWide}>
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
                          borderBottom: `1.5px solid ${C.navy}`,
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
                          padding: "16px 16px 16px 0",
                          borderBottom: `1px solid ${C.border}`,
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "1.18rem",
                          lineHeight: 1.25,
                          color: C.navy,
                          verticalAlign: "top",
                        }}
                      >
                        {m.material}
                      </td>
                      <td
                        style={{
                          padding: "16px 16px 16px 0",
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
                          padding: "16px 0",
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

          <section style={sectionWide}>
            <h2 style={h2}>Rim and band joists get board, not batt</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              Batt at a band joist is a building-science failure. Fiberglass is air-permeable, so
              conditioned interior air still reaches the cold rim, and moisture condenses behind the
              insulation where nobody sees it. We cut and seal rigid board at the rim instead. It is
              a small line item that quietly prevents a callback years later.
            </p>
          </section>

          <section style={sectionWide}>
            <h2 style={h2}>Who is actually on your site</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              An owner is on site for every job, start to finish, and signs off on the work before
              it is covered. Tony Kermis is a former North Carolina home inspector, which is where
              the documentation habit comes from. Grade I is a function of supervision and care
              rather than headcount, and keeping an owner on the work is how we hold that standard
              on a builder&apos;s schedule.
            </p>
          </section>

          <section style={section}>
            <h2 style={h2}>What we do not do</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              <strong style={{ color: C.navy }}>We do not install spray foam.</strong> If your
              assembly is specified for closed-cell or open-cell foam, we are not your sub for that
              scope, and we would rather tell you now than waste a bid cycle. Rigid board at the rim
              is a different product and we do install that. We also do not currently take on
              multifamily or commercial work.
            </p>
          </section>

          <section style={sectionTight}>
            <h2 style={h2}>Insurance and paperwork</h2>
            <p style={{ ...para, marginBottom: 0 }}>
              Carolux Insulation LLC is a North Carolina limited liability company and carries
              general liability insurance. A certificate of insurance and a W-9 are available on
              request, and we will send both with a bid if you want them up front. All work carries
              a 2-year workmanship guarantee.
            </p>
          </section>

          <section style={sectionWide}>
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
            <p style={{ margin: "1rem 0 0", fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: C.inkSoft }}>
              Building outside that list in Gaston or Mecklenburg County? Ask. If the schedule
              works, we travel.
            </p>
          </section>
        </article>

        {/* ── Close on the second navy band. Send plans, not a comfort survey. ──── */}
        <section style={band}>
          <div style={bandInner}>
            <p style={{ ...bandLabel, margin: "0 0 clamp(14px, 2vh, 20px)", color: C.teal }}>
              Next step
            </p>
            <h2
              style={{
                margin: "0 0 clamp(18px, 2.6vh, 26px)",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4.6vw, 3.2rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: C.cream,
              }}
            >
              Send us the plans
            </h2>
            <p
              style={{
                margin: "0 0 clamp(28px, 4vh, 38px)",
                maxWidth: "58ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                lineHeight: 1.72,
                color: "rgba(250,248,245,0.8)",
              }}
            >
              Email the drawings, the lot count, and your target programme if you are chasing one.
              You get a written scope and a number back. If the scope calls for something we do not
              install, we will say so in the reply instead of bidding around it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
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
                  padding: "18px 34px",
                  minHeight: "56px",
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
                  fontSize: "1.05rem",
                  color: "rgba(250,248,245,0.9)",
                  textDecoration: "none",
                }}
              >
                or call {COMPANY.phone}
              </a>
            </div>
          </div>
        </section>

        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(28px, 4vh, 40px) clamp(24px, 6vw, 48px) clamp(48px, 7vh, 72px)",
          }}
        >
          <p style={{ margin: 0, fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: C.inkSoft }}>
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
