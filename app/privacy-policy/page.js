import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { PRIVACY_POLICY } from "../lib/content";

// Server component — legal content is static and must be indexable. No client JS.
export const metadata = {
  title: "Privacy Policy | Carolux Insulation",
  description:
    "How Carolux Insulation collects, uses, and protects your information, plus our SMS messaging terms and conditions. Charlotte, NC residential insulation.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Carolux Insulation",
    description:
      "How Carolux Insulation collects, uses, and protects your information, plus our SMS messaging terms.",
    url: "https://caroluxinsulation.com/privacy-policy",
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

function Section({ heading, body = [], list, after = [] }) {
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
      {list && (
        <ul style={{ margin: "0 0 1rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {list.map((item, i) => (
            <li
              key={i}
              style={{
                position: "relative",
                paddingLeft: "1.4rem",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.98rem, 1.15vw, 1.06rem)",
                lineHeight: 1.7,
                color: C.ink,
              }}
            >
              <span aria-hidden="true" style={{ position: "absolute", left: 0, top: "0.62em", width: "6px", height: "6px", borderRadius: "50%", background: C.teal }} />
              {item}
            </li>
          ))}
        </ul>
      )}
      {after.map((p, i) => (
        <p key={i} style={{ ...para, fontWeight: 500, color: C.navy }}>
          {p}
        </p>
      ))}
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const { org, title, lastUpdated, sections, messagingTerms, disclaimer } = PRIVACY_POLICY;

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

          {/* Policy sections */}
          {sections.map((s) => (
            <Section key={s.heading} {...s} />
          ))}

          {/* Messaging terms (ordered) */}
          <section style={{ marginTop: "clamp(44px, 7vh, 72px)" }}>
            <h2
              style={{
                margin: "0 0 1.25rem",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(1.45rem, 2.4vw, 1.9rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.01em",
                color: C.navy,
              }}
            >
              {messagingTerms.heading}
            </h2>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", counterReset: "mt", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {messagingTerms.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    position: "relative",
                    paddingLeft: "2.2rem",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(0.98rem, 1.15vw, 1.06rem)",
                    lineHeight: 1.74,
                    color: C.ink,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.15rem",
                      lineHeight: 1.5,
                      color: C.teal,
                    }}
                  >
                    {i + 1}.
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>

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
