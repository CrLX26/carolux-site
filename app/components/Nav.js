"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "../lib/content";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Carolux", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Main header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#ffffff",
          borderBottom: scrolled
            ? "1px solid rgba(74,144,164,0.14)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.05)" : "none",
          transition: "border-color 250ms ease, box-shadow 250ms ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            height: "68px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
            paddingRight: "clamp(1.25rem, 5vw, 4rem)",
          }}
        >
          {/* Wordmark */}
          <a
            href="/"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 700,
              fontSize: "25px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#1a1a1a",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Carolux
          </a>

          {/* Nav links — desktop, centered */}
          <ul
            className="hidden md:flex"
            style={{
              flex: 1,
              justifyContent: "center",
              gap: "2.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>

          {/* Phone + CTA — desktop right */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "1.5rem", flexShrink: 0 }}
          >
            <a
              href={COMPANY.phoneHref}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "0.03em",
                color: "#374151",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4a90a4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
            >
              {COMPANY.phone}
            </a>

            <a
              href="/free-estimate/"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                padding: "10px 22px",
                borderRadius: "5px",
                background: "#4a90a4",
                color: "#ffffff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "inline-block",
                transition: "background 150ms ease, transform 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3d7d90";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#4a90a4";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Free Estimate
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#1a1a1a",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "block",
                width: "15px",
                height: "2px",
                background: "#1a1a1a",
                borderRadius: "2px",
              }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#1a1a1a",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden"
            style={{
              position: "fixed",
              top: "68px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: "#ffffff",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "8px 24px 100px",
              }}
            >
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22, ease: "easeOut" }}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                    textDecoration: "none",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(74,144,164,0.1)",
                    letterSpacing: "-0.01em",
                    display: "block",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div
                style={{
                  paddingTop: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <a
                  href={COMPANY.phoneHref}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#374151",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  {COMPANY.phone}
                </a>

                <a
                  href="/free-estimate/"
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "17px",
                    fontWeight: 600,
                    padding: "14px",
                    borderRadius: "6px",
                    background: "#4a90a4",
                    color: "#ffffff",
                    textDecoration: "none",
                    textAlign: "center",
                    letterSpacing: "0.02em",
                    display: "block",
                  }}
                >
                  Free Estimate
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky mobile bottom bar ── */}
      <div
        className="flex md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "60px",
          background: "#ffffff",
          borderTop: "1px solid rgba(74,144,164,0.15)",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <a
          href={COMPANY.phoneHref}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "16px",
            fontWeight: 600,
            color: "#4a90a4",
            textDecoration: "none",
            borderRight: "1px solid rgba(74,144,164,0.15)",
            letterSpacing: "0.02em",
          }}
        >
          <PhoneIcon />
          Call Us
        </a>
        <a
          href="/free-estimate/"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "16px",
            fontWeight: 600,
            color: "#ffffff",
            textDecoration: "none",
            background: "#4a90a4",
            letterSpacing: "0.02em",
          }}
        >
          Get Estimate
        </a>
      </div>
    </>
  );
}

/* ── Underline-hover nav link ── */
function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "15px",
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: hovered ? "#4a90a4" : "#374151",
        textDecoration: "none",
        paddingBottom: "4px",
        display: "inline-block",
        position: "relative",
        transition: "color 150ms ease",
      }}
    >
      {children}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "#4a90a4",
          transformOrigin: "left",
          display: "block",
        }}
      />
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.06 6.06l1.15-1.15a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
