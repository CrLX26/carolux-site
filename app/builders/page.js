import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { COMPANY } from "../lib/content";
import { CITY_LINKS } from "../lib/cities";

const BASE_URL = "https://caroluxinsulation.com";

// ISO date for schema freshness — keep in sync with app/sitemap.js MODIFIED.builders.
const LAST_UPDATED = "2026-10-01";

// BUILDER-FACING PAGE. Spec: BUILDER-PAGE-BRIEF.md (marketing lane, 2026-09-08);
// strategy source: carolux-marketing/NEW-CONSTRUCTION.md.
//
// This page is deliberately NOT under /services/ — those are homeowner-facing and
// conversion-shaped for a different reader.
//
// 🔬 ORDERING IS RESEARCH-DRIVEN (4-agent study, 2026-09-08). Do not "improve" it back:
//  · Builders do NOT find subs via websites (referral / job-site sighting / permit records).
//    This page's job is CREDIBILITY CONFIRMATION after a referral, not lead generation.
//  · Schedule reliability + capacity is the #1 builder screening criterion (sub delays rank
//    as the top builder challenge in industry surveys). It leads, and it was missing entirely
//    from the first draft.
//  · Insurance/COI/W-9 is a PREQUALIFICATION GATE, screened before quality is even read.
//    It sits high on purpose; it used to be buried at position 8.
//  · NC energy code does NOT require or inspect RESNET grading — a Grade III install passes
//    code inspection every time. Only ~10-25% (est.) of Charlotte-metro starts touch a
//    HERS/ENERGY STAR/Duke pathway. So the Grade I argument is GATED to that audience and
//    placed after trust/capacity, instead of opening the page as it did in the first draft.
//  · Photo documentation before drywall was claimed by ZERO of 9 competitor insulation
//    builder-pages reviewed. It is the genuine white space, and it is the answer to the real
//    objection ("can I trust a small shop with what I can't see after drywall").
//
// ⚠️ HARD CLAIM LIMITS (from the brief — do not relax without the owner):
//  · NEVER "licensed" in any tense. Tony = FORMER NC home inspector; company = INSURED.
//  · CELLULOSE: allowed on this page, BOTH forms, no caveat (owner ruling 2026-10-01,
//    which REVERSED the 2026-09-29 wording). The page previously said "dense-pack
//    equipment mobilised per contract". Owner, verbatim: "i dont need builder toknow our
//    handicaps or limitations. they should just know if we bid on it we can get it done."
//    That is a defensible B2B position: builders are sophisticated commercial counterparties,
//    not consumers, and declining to volunteer internal constraints in a bid document is
//    ordinary practice, not misrepresentation. Equipment is acquired on award and the owner
//    is committing to deliver. Do NOT reinstate the caveat without the owner.
//    ⚠️ THE BOUNDARY STILL HOLDS AND IS NOT OPTIONAL: this applies to BUILDER-FACING
//    surfaces only. DENSE-PACK MUST STAY OFF the homeowner pages and the Google Business
//    Profile, which face consumers where the FTC rules this project runs under genuinely
//    apply. Verified 2026-09-30: dense-pack appears ZERO times across eight live consumer
//    pages. Keep it that way. Attic LOOSE-FILL cellulose is fine everywhere — it is current
//    capability (owner, 2026-09-30) and WI-010's apparent contradiction was only ever
//    attic loose-fill vs wall dense-pack being conflated.
//  · RADIANT BARRIER STAYS OUT. The owner's block is knowledge, not equipment (physics,
//    zone 3A moisture behaviour, the FTC claims boundary). Equipment gaps close with a
//    purchase order; knowledge gaps do not. Do not add it because cellulose was added.
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
  title: "Insulation for Builders | New Construction | Carolux",
  description:
    "New-construction insulation in Gaston and Mecklenburg County, NC. Written scope within two business days, insured with COI and W-9 on request, and every bay photographed before drywall.",
  alternates: { canonical: "/builders" },
  openGraph: {
    title: "Insulation for Builders | New Construction | Carolux",
    description:
      "New-construction insulation in Gaston and Mecklenburg County, NC. Scope in two business days, insured, and every bay photographed before drywall.",
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

// Capability table. Cellulose added 2026-09-29 on the owner's instruction. The Aug 26
// correction in carolux-tools/CLAUDE.md records that an understated list of exactly this
// kind already "produced a wrong bid scope on a builder RFQ", so understating here is not
// the safe default it looks like.
const MATERIALS = [
  {
    material: "Fiberglass",
    forms: "Batt and blown-in",
    notes: "The default. Owens Corning AttiCat and Pink Next Gen.",
  },
  {
    material: "Cellulose",
    forms: "Blown loose-fill and dense-pack",
    notes: "Attics, and closed wall cavities on new construction.",
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

// Assembly capability WITH the R-value ranges we commonly install. Research pass
// 2026-09-18: a builder's real question is "can you hit the number on my plans?", not
// "what brands do you carry" (on new construction the spec is usually his call, not
// ours). This replaced a plain location chip-list, which carried strictly less info.
// NOT a code table: deliberately no NCECC values and no compliance guarantee, per the
// claim limits above. Ranges describe product we install, not a required minimum.
const ASSEMBLIES = [
  ["Attic and ceiling", "Blown fiberglass, or batt where access is tight", "R-30 to R-60"],
  ["2x4 exterior wall", "Fiberglass or mineral wool batt", "R-13 to R-15"],
  ["2x6 exterior wall", "Fiberglass or mineral wool batt", "R-19 to R-21"],
  ["Floor over crawl space", "Fiberglass batt between the joists", "R-19 to R-30"],
  ["Rim and band joist", "Rigid board, cut and sealed", "By board thickness"],
  ["Interior wall", "Mineral wool batt", "Specified for sound"],
  ["Crawl space ground", "Americover vapor barrier, 8 to 10 mil", "Vapor, not R"],
  ["Air sealing", "Before insulation, on every assembly we insulate", "Included"],
  ["Existing insulation removal", "Bagged and hauled before new material goes in", "Quoted per job"],
  ["Attic decking", "Interlocking platform set above the insulation, not crushing it", "Quoted per job"],
];

// Prequalification facts, kept scannable because builders screen these as a checklist.
const PAPERWORK = [
  ["Insurance", "General liability. Certificate of insurance sent on request, or with the bid."],
  ["W-9", "On request, or with the bid."],
  ["Entity", "Carolux Insulation LLC, a North Carolina limited liability company."],
  ["Guarantee", "2-year workmanship guarantee on the work we perform."],
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
        "Insulation for new single-family residential construction in Gaston and Mecklenburg County, NC. Fiberglass batt and blown-in, mineral wool, rigid board at rim and band joists, vapor barrier, and air sealing. Written scope within two business days, insured, and every bay photographed before drywall.",
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
        {/* ── Hero. Leads on schedule + proof, the two things a builder screens on. ── */}
        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(112px, 16vh, 168px) clamp(24px, 6vw, 48px) clamp(40px, 6vh, 64px)",
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
            On your schedule, and documented before drywall
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
            Insulation for new single-family construction across Gaston and Mecklenburg County.
            Plans in, written scope back within two business days, and a photo set of every bay
            before it disappears behind drywall.
          </p>
        </article>

        {/* ── 1. Schedule and capacity. The first thing a builder screens for. ────── */}
        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 clamp(24px, 6vw, 48px)",
          }}
        >
          <section style={{ borderTop: `1.5px solid ${C.navy}`, paddingTop: "clamp(22px, 3vh, 30px)" }}>
            <h2 style={h2}>Schedule, and what we can hold</h2>
            <p style={para}>
              Send plans and you get a written scope and a number back within two business days. If
              we cannot hit the window you need, we will say so in that reply rather than take the
              job and slip it. A missed insulation date stalls drywall and everything behind it, and
              we would rather lose a bid than be that trade.
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              Tell us the start date you are working toward when you send the plans. We book new
              construction alongside our residential schedule, so the earlier you ask, the more
              likely we can hold the slot you actually want.
            </p>
          </section>

          {/* ── 2. Prequalification facts. Screened before quality is ever read. ──── */}
          <section style={sectionWide}>
            <h2 style={h2}>Insurance and paperwork</h2>
            <dl style={{ margin: 0, display: "grid", gap: "0" }}>
              {PAPERWORK.map(([term, detail]) => (
                <div
                  key={term}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                    gap: "4px clamp(16px, 3vw, 40px)",
                    padding: "14px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: C.inkSoft,
                      paddingTop: "3px",
                    }}
                  >
                    {term}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.98rem",
                      lineHeight: 1.65,
                      color: C.ink,
                      gridColumn: "span 2",
                    }}
                  >
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── 3. The differentiator: proof. Zero of 9 competitor pages claim this. ── */}
          <section style={sectionWide}>
            <h2 style={h2}>Photographed before drywall</h2>
            <p style={para}>
              Every bay is photographed with a depth reference before it is covered, and the set is
              yours. If a rater questions a wall, or a buyer asks two years later what is behind the
              drywall, the answer exists as a file instead of a memory.
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              If you are weighing a smaller outfit, this is the part that should decide it. You are
              not taking anyone&apos;s word for the work you cannot see once the board goes up.
            </p>
          </section>
        </article>

        {/* ── 4. Grade I. GATED to programme builders: NC code does not grade insulation. ── */}
        <section style={{ ...band, marginTop: "clamp(64px, 9vh, 104px)" }}>
          <div style={bandInner}>
            <p style={{ ...bandLabel, margin: "0 0 clamp(16px, 2.4vh, 22px)", color: C.teal }}>
              If you build to a programme
            </p>
            <h2
              style={{
                margin: "0 0 clamp(22px, 3vh, 32px)",
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
            <p
              style={{
                margin: "0 0 clamp(36px, 5.5vh, 56px)",
                maxWidth: "62ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.08rem)",
                lineHeight: 1.72,
                color: "rgba(250,248,245,0.82)",
              }}
            >
              Building to ENERGY STAR, DOE Zero Energy Ready, or a Duke Energy incentive? Then a
              HERS rater grades your insulation before drywall, and that grade carries money.
              Building to code instead? Then nobody grades it at all, which is precisely why the
              photographs matter more, not less.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "clamp(28px, 4.5vw, 56px)",
              }}
            >
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

            <p
              style={{
                margin: "clamp(36px, 5.5vh, 60px) 0 0",
                paddingTop: "clamp(24px, 3.5vh, 34px)",
                borderTop: "1px solid rgba(250,248,245,0.14)",
                maxWidth: "36ch",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(1.25rem, 2.3vw, 1.7rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: C.cream,
              }}
            >
              In a Department of Energy field study of North Carolina homes, fewer than half of
              above-grade walls met Grade I.
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
              Wall figure from the Pacific Northwest National Laboratory North Carolina Residential
              Energy Code Field Study for the U.S. Department of Energy, 249 homes, data collected
              2015. Grade definitions and the 5% modelling penalty per ANSI/RESNET/ICC 301. Duke
              Energy incentive availability and amounts are set by Duke and depend on the programme.
            </p>
          </div>
        </section>

        {/* ── Capability and technical detail. ─────────────────────────────────────── */}
        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(56px, 8vh, 90px) clamp(24px, 6vw, 48px) clamp(48px, 7vh, 80px)",
          }}
        >
          <section>
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
              Where it goes, and what we can hit
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.95rem",
                  minWidth: "520px",
                }}
              >
                <tbody>
                  {ASSEMBLIES.map(([where, what, value]) => (
                    <tr key={where}>
                      <td
                        style={{
                          padding: "13px 16px 13px 0",
                          borderBottom: `1px solid ${C.border}`,
                          color: C.navy,
                          fontWeight: 500,
                          verticalAlign: "top",
                        }}
                      >
                        {where}
                      </td>
                      <td
                        style={{
                          padding: "13px 16px 13px 0",
                          borderBottom: `1px solid ${C.border}`,
                          color: C.inkSoft,
                          lineHeight: 1.6,
                          verticalAlign: "top",
                        }}
                      >
                        {what}
                      </td>
                      <td
                        style={{
                          padding: "13px 0",
                          borderBottom: `1px solid ${C.border}`,
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "1.12rem",
                          color: C.navy,
                          verticalAlign: "top",
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              style={{
                margin: "clamp(18px, 2.6vh, 24px) 0 0",
                maxWidth: "68ch",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: C.inkSoft,
              }}
            >
              Those ranges are what we commonly install, not a code table. Your drawings and your
              compliance path set the target, and we install to the value specified on them. If a
              plan calls for something these materials cannot reach, you will hear it in the bid
              rather than from your rater.
            </p>
            <p
              style={{
                margin: "clamp(14px, 2vh, 18px) 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              <a
                href="/carolux-capability-statement.pdf"
                style={{ color: C.teal, textDecoration: "none", fontWeight: 500 }}
              >
                Download the capability statement (PDF, one page)
              </a>
              <span style={{ color: C.inkSoft }}>
                {" "}
                for the version you can forward to an estimator.
              </span>
            </p>
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
              Drawings, lot count, the start date you are working toward, and your target programme
              if you are chasing one. Written scope and a number back within two business days. If
              the scope calls for something we do not install, we will say so in the reply instead
              of bidding around it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
              <a
                href="mailto:team@caroluxinsulation.com?subject=New%20construction%20bid%20request&body=Lots%2Fhomes%3A%20%0AAddress%20or%20subdivision%3A%20%0ATarget%20start%20date%3A%20%0AProgramme%20(ENERGY%20STAR%2C%20Duke%2C%20code%20only)%3A%20%0APlans%20attached%3A%20"
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
              <a
                href="/carolux-capability-statement.pdf"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.98rem",
                  color: "rgba(250,248,245,0.62)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(250,248,245,0.3)",
                  textUnderlineOffset: "3px",
                }}
              >
                Capability statement (PDF)
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
