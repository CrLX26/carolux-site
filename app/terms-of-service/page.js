import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { TERMS_OF_SERVICE } from "../lib/content";

// Server component — legal content is static and must be indexable. No client JS.
export const metadata = {
  title: "Terms of Use | Carolux Insulation",
  description:
    "The terms governing your use of the Carolux Insulation website and online estimator. Estimates are for planning only and are not a binding quote. Charlotte, NC.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: "Terms of Use | Carolux Insulation",
    description:
      "The terms governing your use of the Carolux Insulation website and online estimator.",
    url: "https://caroluxinsulation.com/terms-of-service",
    siteName: "Carolux Insulation",
    locale: "en_US",
    type: "website",
  },
};

// Brand tokens (mirror app/components/sectionKit.js — kept local so this stays a
// server component and doesn't pull in the client "use client" kit).
const C = {
  cream: "#faf8f5",
  navy: "#1a2b3c",
  teal: "#4a90a4",
  ink: "#2c2c2c",
  inkSoft: "rgba(26,43,60,0.72)",
  border: "#d0cec8",
};

const para = {
  margin: "0 0 1rem",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "clamp(0.98rem, 1.15vw, 1.06rem)",
  lineHeight: 1.78,
  color: C.ink,
};

function Section({ heading, body = [] }) {
  return (
    <section style={{ marginTop: "clamp(36px, 5vh, 56px)" }}>
      <h2
        style={{
          margin: "0 0 1rem",
          fontFamily: "var(--font-cormorant)",
          fontWeight: 400,
          fontSize: "clamp(1.45rem, 2.4vw, 1.9rem)",
          lineHeight: 1.18,
          letterSpacing: "-0.01em",
          color: C.navy,
        }}
      >
        {heading}
      </h2>
      {body.map((p, i) => (
        <p key={i} style={para}>
          {p}
        </p>
      ))}
    </section>
  );
}

export default function TermsOfServicePage() {
  const { org, title, lastUpdated, sections, disclaimer } = TERMS_OF_SERVICE;

  return (
    <>
      <Nav />
      <main id="main" style={{ background: C.cream, minHeight: "100svh" }}>
        <article
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "clamp(112px, 16vh, 168px) clamp(24px, 6vw, 48px) clamp(64px, 10vh, 120px)",
          }}
        >
          {/* Header */}
          <header style={{ paddingBottom: "clamp(24px, 4vh, 36px)", borderBottom: `1px solid ${C.border}` }}>
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
              Legal
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
              {title}
            </h1>
            <p
              style={{
                margin: "clamp(14px, 2vh, 20px) 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.95rem",
                color: C.inkSoft,
              }}
            >
              {org} · Last updated {lastUpdated}
            </p>
          </header>

          {/* Terms sections */}
          {sections.map((s) => (
            <Section key={s.heading} {...s} />
          ))}

          {/* Disclaimer */}
          <p
            style={{
              margin: "clamp(40px, 6vh, 64px) 0 0",
              paddingTop: "clamp(20px, 3vh, 28px)",
              borderTop: `1px solid ${C.border}`,
              fontFamily: "var(--font-dm-sans)",
              fontStyle: "italic",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: C.inkSoft,
            }}
          >
            {disclaimer}
          </p>

          {/* Back home */}
          <p style={{ margin: "clamp(28px, 4vh, 40px) 0 0" }}>
            <a
              href="/"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.teal,
                textDecoration: "none",
              }}
            >
              ← Back to home
            </a>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
