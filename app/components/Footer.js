"use client";

import { useState } from "react";
import { COMPANY, NAV_LINKS } from "../lib/content";
import { C } from "./sectionKit";

// ── Social glyphs ─────────────────────────────────────────────────────────────
// Monochrome (currentColor) so they sit calmly in the navy footer and tint teal
// on hover — brand logos in full colour would read like a coupon flyer. Google /
// Instagram / Facebook are the official marks (Simple Icons); Nextdoor ships only
// a wordmark, so it gets a clean house glyph (Nextdoor's identity) + an aria-label.
const ICON = {
  google:
    "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.265.07 1.645.07 4.849.0 3.205-.015 3.585-.074 4.85-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  nextdoor: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
};

const SOCIALS = [
  { key: "google",    label: "Google Business Profile", href: COMPANY.googleBusiness },
  { key: "instagram", label: "Instagram",               href: COMPANY.instagram },
  { key: "facebook",  label: "Facebook",                href: COMPANY.facebook },
  { key: "nextdoor",  label: "Nextdoor",                href: COMPANY.nextdoor },
].filter((s) => s.href);

// Square icon button — cream glyph, tints teal + lifts the border on hover/focus.
function SocialButton({ icon, label, href }) {
  const [active, setActive] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "42px",
        height: "42px",
        borderRadius: "8px",
        border: `1px solid ${active ? C.teal : "rgba(250,248,245,0.18)"}`,
        background: active ? "rgba(74,144,164,0.12)" : "transparent",
        color: active ? C.teal : "rgba(250,248,245,0.72)",
        transition: "color 160ms ease, border-color 160ms ease, background 160ms ease, transform 160ms ease",
        transform: active ? "translateY(-1px)" : "none",
      }}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={icon} />
      </svg>
    </a>
  );
}

// Hoverable footer link — teal on hover/focus, visible focus ring.
function FootLink({ href, children, external = false }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "fit-content",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        color: hovered || focused ? C.teal : "rgba(250,248,245,0.72)",
        textDecoration: "none",
        transition: "color 160ms ease",
        // Keyboard-visible focus ring (not color alone).
        outline: focused ? `2px solid ${C.teal}` : "none",
        outlineOffset: "3px",
        borderRadius: "2px",
        cursor: "pointer",
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    // pb on mobile clears the fixed Call/Estimate bar (Nav, ~60px); md+ has no bar.
    <footer className="pb-20 md:pb-0" style={{ background: C.navyDeep, color: C.cream }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(56px, 8vh, 88px) clamp(24px, 6vw, 80px) clamp(28px, 4vh, 40px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "clamp(32px, 5vw, 64px)",
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: "34ch" }}>
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)",
              lineHeight: 1.1,
              color: C.cream,
            }}
          >
            {COMPANY.name}
          </span>
          <p
            style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.65,
              color: "rgba(250,248,245,0.7)",
            }}
          >
            Owner-operated insulation for Charlotte-area homeowners. {COMPANY.owners} on every job.
          </p>

          {/* Social profiles */}
          <div style={{ display: "flex", gap: "10px", marginTop: "clamp(20px, 3vh, 28px)" }}>
            {SOCIALS.map((s) => (
              <SocialButton key={s.key} icon={ICON[s.key]} label={s.label} href={s.href} />
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <FooterColTitle>Explore</FooterColTitle>
          {NAV_LINKS.map((link) => (
            <FootLink key={link.href} href={link.href}>
              {link.label}
            </FootLink>
          ))}
        </nav>

        {/* Get in touch */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <FooterColTitle>Get in touch</FooterColTitle>
          <FootLink href={COMPANY.phoneHref}>{COMPANY.phone}</FootLink>
          <FootLink href={COMPANY.emailHref}>{COMPANY.email}</FootLink>
          <p
            style={{
              margin: "6px 0 0",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "rgba(250,248,245,0.55)",
            }}
          >
            {COMPANY.serviceArea}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(250,248,245,0.12)",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px clamp(24px, 6vw, 80px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 24px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.82rem",
            letterSpacing: "0.02em",
            color: "rgba(250,248,245,0.5)",
          }}
        >
          &copy; {COMPANY.year} {COMPANY.name}. All rights reserved.
        </p>
        <FootLink href="/privacy-policy">Privacy Policy</FootLink>
      </div>
    </footer>
  );
}

function FooterColTitle({ children }) {
  return (
    <span
      style={{
        marginBottom: "6px",
        fontFamily: "var(--font-label)",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.teal,
      }}
    >
      {children}
    </span>
  );
}
