"use client";

import { useState } from "react";
import { COMPANY, NAV_LINKS } from "../lib/content";
import { C } from "./sectionKit";

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
    <footer style={{ background: C.navyDeep, color: C.cream }}>
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
          <FootLink href={COMPANY.instagram} external>
            Instagram
          </FootLink>
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
