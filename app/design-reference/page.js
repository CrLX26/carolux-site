"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

// ── Grain SVG (matches Hero.js) ───────────────────────────────────────────────
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

const EASE = [0.16, 1, 0.3, 1];

// ── Sidebar nav ───────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "colors",        label: "Color System" },
  { id: "typography",    label: "Typography" },
  { id: "spacing",       label: "Spacing & Grid" },
  { id: "components",    label: "In Use" },
  { id: "motion",        label: "Motion & Scroll" },
  { id: "textures",      label: "Textures & FX" },
  { id: "tresmares-lib", label: "Tresmares Library" },
  { id: "sweeping-lib",  label: "SweepingCorp Library" },
];

// ── Color data ────────────────────────────────────────────────────────────────
const CAROLUX_COLORS = [
  { name: "Teal",           hex: "#4a90a4",            use: "Primary CTA, accent line, badge numbers" },
  { name: "Cream",          hex: "#faf8f5",            use: "Page background, edge fades" },
  { name: "Navy",           hex: "#1a2b3c",            use: "Primary text, headlines, stat numbers" },
  { name: "Body Muted",     hex: "rgba(26,26,26,0.55)", use: "Subheading body copy" },
  { name: "Label Muted",    hex: "rgba(26,26,26,0.42)", use: "Eyebrow labels, badge text" },
  { name: "Thermal Orange", hex: "#ff4400",            use: "Thermal overlay, dark-bg CTA" },
  { name: "Thermal Amber",  hex: "#ff8800",            use: "Thermal gradient mid" },
  { name: "Thermal Gold",   hex: "#ffcc00",            use: "Thermal gradient highlight" },
];

const TRESMARES_COLORS = [
  { name: "Accent",       hex: "#f45800", use: "CTAs, links, focus rings" },
  { name: "Background",   hex: "#ffffff", use: "Page background" },
  { name: "Text Primary", hex: "#313131", use: "Headings, body" },
  { name: "Text Muted",   hex: "#aaaaaa", use: "Captions, placeholders" },
  { name: "Border",       hex: "#1e1f26", use: "Dividers, card borders" },
];

const SWEEPING_COLORS = [
  { name: "Lime Accent",  hex: "#aad902", use: "Primary brand accent" },
  { name: "Dark Surface", hex: "#1d1d1d", use: "Cards, dark panels" },
  { name: "Deep Navy",    hex: "#042940", use: "Muted text" },
  { name: "Background",   hex: "#edeff2", use: "Page background" },
  { name: "Border",       hex: "#4b5563", use: "Dividers" },
];

// ── Motion inventory ──────────────────────────────────────────────────────────
const MOTION_ITEMS = [
  {
    name: "Scroll Tunnel Hero",
    source: "tresmares",
    desc: "minHeight:145vh outer div + position:sticky inner panel. scrollYProgress 0→1 drives all transforms.",
    token: "useScroll({ target, offset })",
  },
  {
    name: "Primary Text Exit",
    source: "tresmares",
    desc: "Fades 1→0 (0.05→0.26) and translates Y 0→−1100px (0.05→0.30) on scroll down. Fully reverses.",
    token: "heroContentOpacity · heroContentY",
  },
  {
    name: "Bridge Text Slide-in",
    source: "tresmares",
    desc: "Secondary text slides up from Y:+320 to Y:0 between scrollYProgress 0.34→0.90. No opacity change.",
    token: "bridgeY",
  },
  {
    name: "Image Scale + Fade",
    source: "tresmares",
    desc: "Hero image scales 1→1.08 over full range. Fades 1→0 between scrollYProgress 0.45→0.90.",
    token: "imageScale · imageOpacity",
  },
  {
    name: "Mouse Parallax",
    source: "tresmares",
    desc: "Sketch + thermal images translate ±20px on mousemove relative to sticky panel center. 0.15s ease-out.",
    token: "parallax.x · parallax.y",
  },
  {
    name: "Thermal Reveal Mask",
    source: "tresmares",
    desc: "Radial gradient mask at mouse XY, radius 180px. Edge-fades to 0 within 150px of viewport boundary.",
    token: "overlayMask · thermalOpacity",
  },
  {
    name: "Video Scrub",
    source: "sweepingcorp",
    desc: "Stats video currentTime = v × 3. Paused on desktop (scroll-driven). Autoplay loop on touch.",
    token: "scrollYProgress → video.currentTime",
  },
  {
    name: "Asymmetric Stat Reveal",
    source: "sweepingcorp",
    desc: "Stats appear at [0.15, 0.35, 0.55, 0.75]. Hide at [0.45, 0.55, 0.65, 0.75] — reverse takes half the scroll.",
    token: "SHOW[] · HIDE[] · shownRef",
  },
  {
    name: "Enter Easing",
    source: "tresmares",
    desc: "cubic-bezier(0.16, 1, 0.3, 1) — spring-like ease-out. Used for all page-load enter animations.",
    token: "EASE constant",
  },
  {
    name: "Staggered Headline",
    source: "tresmares",
    desc: "Each headline line clips via clipPath:inset and y:'112%'→0. Stagger delay 0.12 + i×0.1s.",
    token: "initial={{ y:'112%' }} animate={{ y:0 }}",
  },
];

// ── Logo reel names ───────────────────────────────────────────────────────────
const LOGOS = [
  "HomeAdvisor", "Angi", "ENERGY STAR", "Owens Corning",
  "CertainTeed", "Atlas", "Johns Manville", "Knauf",
];

// ── Sub-components ────────────────────────────────────────────────────────────
function Tag({ source }) {
  const map = {
    tresmares:    { bg: "#f45800", color: "#fff",    label: "Tresmares" },
    sweepingcorp: { bg: "#aad902", color: "#1d1d1d", label: "SweepingCorp" },
    carolux:      { bg: "#4a90a4", color: "#fff",    label: "Carolux" },
  };
  const t = map[source] || map.carolux;
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 7px",
      borderRadius: "3px",
      background: t.bg,
      color: t.color,
      fontFamily: "var(--font-dm-sans)",
      fontSize: "9px",
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      flexShrink: 0,
    }}>
      {t.label}
    </span>
  );
}

function SectionHeading({ id, title }) {
  return (
    <div id={id} style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "36px", paddingTop: "4px" }}>
      <h2 style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 400,
        color: "#0a0a0a",
        margin: 0,
        letterSpacing: "-0.025em",
        lineHeight: 1,
      }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "rgba(26,43,60,0.08)", alignSelf: "center" }} />
    </div>
  );
}

function DemoCard({ label, source, dark = false, noPad = false, children }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      {(label || source) && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          {label && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>
              {label}
            </p>
          )}
          {source && <Tag source={source} />}
        </div>
      )}
      <div style={{
        background: dark ? "#1a2b3c" : "#ffffff",
        border: "1px solid rgba(26,43,60,0.07)",
        borderRadius: "8px",
        padding: noPad ? "0" : "36px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

function TokenBlock({ children }) {
  return (
    <code style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "#4a90a4", background: "rgba(74,144,164,0.07)", padding: "4px 7px", borderRadius: "3px", wordBreak: "break-all", marginTop: "8px" }}>
      {children}
    </code>
  );
}

function ColorSwatch({ name, hex, use }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const isLight = hex === "#faf8f5" || hex === "#ffffff" || hex === "#edeff2";
  return (
    <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{
        width: "80px",
        height: "60px",
        background: hex,
        borderRadius: "5px",
        border: isLight ? "1px solid rgba(26,43,60,0.1)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 100ms",
      }}>
        {copied && (
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", color: isLight ? "#1a2b3c" : "rgba(255,255,255,0.9)", fontWeight: 600 }}>✓</span>
        )}
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, color: "#1a2b3c", margin: 0 }}>{name}</p>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.72)", margin: "2px 0 0", letterSpacing: "0.04em" }}>{hex}</p>
        {use && <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.65)", margin: "3px 0 0", lineHeight: 1.4, maxWidth: "90px" }}>{use}</p>}
      </div>
    </button>
  );
}

// ── Interactive sub-components ────────────────────────────────────────────────

function InputDemo() {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "320px" }}>
      <input
        value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Click to see focus state…"
        style={{
          background: "#ffffff",
          border: `1px solid ${focused ? "#f45800" : "#1e1f26"}`,
          borderRadius: "4px",
          padding: "8px 12px",
          color: "#313131",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "14px",
          outline: "none",
          width: "100%",
          transition: "border-color 150ms",
          boxSizing: "border-box",
        }}
      />
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.65)", margin: 0 }}>
        Border switches from{" "}
        <code style={{ color: "#1e1f26" }}>#1e1f26</code> →{" "}
        <code style={{ color: "#f45800" }}>#f45800</code> on focus
      </p>
    </div>
  );
}

function OverlayMenuDemo() {
  const [open, setOpen] = useState(false);
  const items = ["About", "Services", "Portfolio", "Contact"];
  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "flex-start", minHeight: "220px" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          background: open ? "#313131" : "#ffffff",
          border: "1px solid #1e1f26",
          borderRadius: "4px",
          padding: "8px 16px",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "12px",
          fontWeight: 500,
          color: open ? "#ffffff" : "#313131",
          cursor: "pointer",
          transition: "all 200ms",
          letterSpacing: "0.05em",
        }}
      >
        {open ? "✕ Close" : "☰ Open Menu"}
      </button>
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div style={{
          marginTop: "8px",
          background: "#ffffff",
          border: "1px solid #1e1f26",
          borderRadius: "4px",
          padding: "8px",
          minWidth: "180px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {items.map((item, i) => (
            <motion.div
              key={item}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 6 }}
              transition={{ duration: 0.28, delay: open ? i * 0.07 : 0, ease: EASE }}
              style={{
                padding: "10px 12px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                color: "#313131",
                cursor: "pointer",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {item}
              <span style={{ color: "#aaaaaa", fontSize: "10px" }}>→</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CharRevealDemo() {
  const [key, setKey] = useState(0);
  const words = ["Charlotte's", "Insulation"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
      <div>
        {words.map((word, wi) => (
          <div key={wi} style={{ overflow: "clip", display: "block" }}>
            {word.split("").map((char, i) => (
              <motion.span
                key={`${key}-${wi}-${i}`}
                initial={{ y: "110%", opacity: 0.05 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.1 + wi * 0.18 + i * 0.035, ease: EASE }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: wi === 1 ? 400 : 700,
                  fontStyle: wi === 1 ? "italic" : "normal",
                  color: "#313131",
                  lineHeight: 1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={() => setKey(k => k + 1)}
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#aaaaaa",
          background: "none",
          border: "1px solid #1e1f26",
          borderRadius: "3px",
          padding: "4px 10px",
          cursor: "pointer",
        }}
      >
        Replay ↺
      </button>
    </div>
  );
}

function RippleButton({ children, style: extStyle }) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#4a90a4",
        color: "#ffffff",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "14px 36px",
        borderRadius: "3px",
        border: "none",
        cursor: "pointer",
        ...extStyle,
      }}
    >
      {children}
      {ripples.map(rip => (
        <span
          key={rip.id}
          style={{
            position: "absolute",
            left: rip.x,
            top: rip.y,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.45)",
            transform: "translate(-50%, -50%) scale(0)",
            animation: "ripple-anim 0.65s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
    </button>
  );
}

function ScrollMouseIndicator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <div style={{ position: "relative", width: "26px", height: "44px" }}>
        <svg width="26" height="44" viewBox="0 0 26 44" fill="none" style={{ position: "absolute", inset: 0 }}>
          <rect x="1.5" y="1.5" width="23" height="41" rx="11.5" stroke="rgba(26,43,60,0.4)" strokeWidth="1.5" />
        </svg>
        <motion.div
          style={{
            position: "absolute",
            top: "8px",
            left: "11px",
            width: "4px",
            height: "8px",
            borderRadius: "2px",
            background: "rgba(26,43,60,0.55)",
          }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(26,43,60,0.62)" }}>
        Scroll
      </span>
    </div>
  );
}

function VideoHoverCard() {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ position: "relative", width: "240px", height: "150px", borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
    >
      {/* Idle state */}
      <motion.div
        animate={{ opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1d1d1d 0%, #042940 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}
      >
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginLeft: "2px" }}>▶</span>
        </div>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Idle loop</span>
      </motion.div>
      {/* Hover state */}
      <motion.div
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #aad902 0%, #042940 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}
      >
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid rgba(4,41,64,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "12px", color: "#042940", marginLeft: "2px" }}>▶</span>
        </div>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(4,41,64,0.6)" }}>Content video</span>
      </motion.div>
      <div style={{ position: "absolute", bottom: "10px", right: "12px", fontFamily: "var(--font-dm-sans)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: hovering ? "rgba(4,41,64,0.4)" : "rgba(255,255,255,0.25)", transition: "color 0.3s" }}>
        hover to swap
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DesignReference() {
  const [active, setActive] = useState("colors");

  return (
    <div style={{ background: "#faf8f5", minHeight: "100vh" }}>

      {/* CSS keyframes */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-anim {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes ripple-anim {
          0%   { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(50); opacity: 0; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(3.2); opacity: 0; }
        }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(250,248,245,0.96)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(26,43,60,0.07)",
        padding: "18px clamp(1.5rem, 6vw, 5rem)",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)" }}>
          Carolux
        </span>
        <div style={{ width: "28px", height: "1px", background: "#4a90a4" }} />
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 400, color: "#1a2b3c", margin: 0, letterSpacing: "-0.02em" }}>
          Design Reference
        </h1>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.04em" }}>
          Patterns from Tresmares Capital &amp; SweepingCorp
        </span>
      </header>

      <div style={{ display: "flex" }}>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="hidden md:block" style={{
          width: "196px",
          flexShrink: 0,
          position: "sticky",
          top: "61px",
          height: "calc(100vh - 61px)",
          overflowY: "auto",
          padding: "36px 20px",
          borderRight: "1px solid rgba(26,43,60,0.06)",
        }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.58)", marginBottom: "12px", paddingLeft: "8px" }}>
            Sections
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  fontWeight: active === s.id ? 600 : 400,
                  color: active === s.id ? "#4a90a4" : "rgba(26,43,60,0.48)",
                  textDecoration: "none",
                  padding: "7px 8px",
                  borderRadius: "4px",
                  background: active === s.id ? "rgba(74,144,164,0.08)" : "transparent",
                  borderLeft: active === s.id ? "2px solid #4a90a4" : "2px solid transparent",
                  transition: "all 150ms ease",
                  display: "block",
                }}
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div style={{ margin: "24px 8px", height: "1px", background: "rgba(26,43,60,0.07)" }} />

          {/* Source legend */}
          <div style={{ paddingLeft: "8px" }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.58)", marginBottom: "10px" }}>
              Source
            </p>
            {["tresmares", "sweepingcorp", "carolux"].map(s => (
              <div key={s} style={{ marginBottom: "6px" }}>
                <Tag source={s} />
              </div>
            ))}
          </div>
        </aside>

        {/* ── Main ──────────────────────────────────────────────────────────── */}
        <main style={{ flex: 1, padding: "52px clamp(1.5rem, 4vw, 4rem)", maxWidth: "860px" }}>

          {/* ════════════════════ COLORS ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="colors" title="Color System" />

            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>Carolux Brand Palette</p>
                <Tag source="carolux" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {CAROLUX_COLORS.map(c => <ColorSwatch key={c.name} {...c} />)}
              </div>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>Source — Tresmares Capital</p>
                <Tag source="tresmares" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {TRESMARES_COLORS.map(c => <ColorSwatch key={c.name} {...c} />)}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>Source — SweepingCorp</p>
                <Tag source="sweepingcorp" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {SWEEPING_COLORS.map(c => <ColorSwatch key={c.name} {...c} />)}
              </div>
            </div>
          </section>

          {/* ════════════════════ TYPOGRAPHY ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="typography" title="Typography" />

            {/* Cormorant Garamond */}
            <div style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>
                  Cormorant Garamond — Display / Headlines
                </p>
                <Tag source="tresmares" />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.58)" }}>role of PP Fragment Serif</span>
              </div>
              <div style={{ borderLeft: "2px solid rgba(74,144,164,0.25)", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>clamp(4.5rem, 9vw, 10rem) · weight 400 · ls −0.035em</p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(4.5rem, 9vw, 10rem)", fontWeight: 400, color: "#1a2b3c", lineHeight: 0.86, letterSpacing: "-0.035em", margin: 0 }}>Charlotte's</p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(4.5rem, 9vw, 10rem)", fontWeight: 400, color: "#1a2b3c", lineHeight: 0.86, letterSpacing: "-0.035em", margin: 0 }}>Insulation</p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>clamp(22px, 3.2vw, 46px) · italic · weight 600 — Bridge text</p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(22px, 3.2vw, 46px)", color: "#1a2b3c", lineHeight: 1.2, margin: 0 }}>
                    Most Charlotte homes are losing money through their attic every single month.
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>13px · italic — Trust badge counter</p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", fontStyle: "italic", color: "#4a90a4", margin: 0 }}>01</p>
                </div>
              </div>
            </div>

            {/* DM Sans */}
            <div style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>
                  DM Sans — Body / UI
                </p>
                <Tag source="tresmares" />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.58)" }}>role of PP Neue Montreal</span>
              </div>
              <div style={{ borderLeft: "2px solid rgba(244,88,0,0.2)", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>10px · weight 500 · ls 0.28em — Eyebrow</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(26,26,26,0.42)", margin: 0 }}>
                    Attic &amp; Crawl Space Insulation Experts
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>clamp(14px, 1.2vw, 16px) · weight 400 · lh 1.72 — Subheading</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px, 1.2vw, 16px)", lineHeight: 1.72, color: "rgba(26,26,26,0.55)", margin: 0, maxWidth: "440px" }}>
                    Tony and Juan show up to every job. You get the owners on the phone, the owners doing the work, and a 1-year guarantee on everything we touch.
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>12px · weight 500 · ls 0.06em — CTA primary</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#4a90a4", margin: 0 }}>Get a Free Estimate</p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>11px · weight 400 · ls 0.08em — Badge label</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(26,26,26,0.42)", margin: 0 }}>Both Owners on Every Job</p>
                </div>
              </div>
            </div>

            {/* Plus Jakarta Sans */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>
                  Plus Jakarta Sans — Stat Numbers
                </p>
                <Tag source="sweepingcorp" />
              </div>
              <div style={{ borderLeft: "2px solid rgba(170,217,2,0.35)", paddingLeft: "24px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 8px" }}>clamp(72px, 12vw, 160px) · weight 700 · ls −0.03em</p>
                <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: "clamp(72px, 10vw, 120px)", lineHeight: 0.9, color: "#1a2b3c", letterSpacing: "-0.03em", display: "flex", alignItems: "baseline" }}>
                  <span>47</span>
                  <span style={{ fontSize: "0.44em", alignSelf: "flex-start", paddingTop: "0.12em", marginLeft: "2px" }}>%</span>
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(26,43,60,0.85)", margin: "12px 0 0", lineHeight: 1.5 }}>
                  Avg. Energy Savings
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontStyle: "italic", color: "rgba(26,43,60,0.65)", margin: "4px 0 0" }}>U.S. Dept. of Energy</p>
              </div>
            </div>
          </section>

          {/* ════════════════════ SPACING ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="spacing" title="Spacing & Grid" />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "rgba(26,43,60,0.72)", lineHeight: 1.7, marginBottom: "28px", maxWidth: "500px" }}>
              4px base grid from Tresmares. Every margin, padding, and gap is a multiple of 4px. Spacing encodes proximity — tighter = more related.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "480px" }}>
              {[
                [4,  "Tight — icon + label"],
                [8,  "Tight — related items"],
                [12, "Medium — between groups"],
                [16, "Medium — section inner"],
                [24, "Wide — distinct elements"],
                [32, "Wide — section gaps"],
                [48, "Vast — major breaks"],
                [64, "Vast — hero padding"],
                [96, "Vast — section padding"],
              ].map(([size, desc]) => (
                <div key={size} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.65)", width: "28px", textAlign: "right", flexShrink: 0 }}>{size}</span>
                  <div style={{ width: size * 2, height: "20px", background: "linear-gradient(to right, #4a90a4, rgba(74,144,164,0.3))", borderRadius: "3px", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.65)" }}>{desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════ COMPONENTS IN USE ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="components" title="Components — In Use" />

            <DemoCard label="Eyebrow Label" source="tresmares">
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "32px", height: "1px", background: "#4a90a4", flexShrink: 0 }} />
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(26,26,26,0.42)", margin: 0 }}>
                  Attic &amp; Crawl Space Insulation Experts
                </p>
              </div>
            </DemoCard>

            <DemoCard label="Bridge / Secondary Text" source="tresmares">
              <div style={{ textAlign: "center", maxWidth: "520px" }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(22px, 3vw, 38px)", color: "#1a2b3c", lineHeight: 1.25, margin: "0 0 20px" }}>
                  Most Charlotte homes are losing money through their attic every single month.
                </p>
                <div style={{ width: "1px", height: "40px", background: "#4a90a4", margin: "0 auto" }} />
              </div>
            </DemoCard>

            <DemoCard label="CTA Buttons" source="carolux">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", background: "#4a90a4", color: "#fff", fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", padding: "15px 36px", borderRadius: "3px", textDecoration: "none" }}>
                  Get a Free Estimate
                </a>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", color: "rgba(26,26,26,0.48)", fontFamily: "var(--font-dm-sans)", fontWeight: 400, fontSize: "13px", letterSpacing: "0.02em", padding: "15px 20px", textDecoration: "none" }}>
                  Call (704) 228-2729
                </a>
              </div>
            </DemoCard>

            <DemoCard label="Trust Badge List" source="tresmares">
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                {["Both owners on every job", "Licensed & Insured in NC", "1-Year workmanship guarantee", "Free same-week estimates"].map((badge, i) => (
                  <li key={badge} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", fontStyle: "italic", color: "#4a90a4", flexShrink: 0, minWidth: "20px", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 400, color: "rgba(26,26,26,0.42)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {badge}
                    </span>
                  </li>
                ))}
              </ul>
            </DemoCard>

            <DemoCard label="Stat Block — floating giant number" source="sweepingcorp">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px", width: "100%" }}>
                {[
                  { prefix: "", val: "47", suffix: "%", label: "Avg. Energy Savings", source: "U.S. Dept. of Energy" },
                  { prefix: "$", val: "2.8", suffix: "B", label: "Lost to poor insulation yearly", source: "U.S. EPA" },
                ].map(s => (
                  <div key={s.val} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 0.9, color: "#1a2b3c", letterSpacing: "-0.03em", display: "flex", alignItems: "baseline", justifyContent: "center" }}>
                      {s.prefix && <span style={{ fontSize: "0.52em", letterSpacing: "0.04em", marginRight: "2px" }}>{s.prefix}</span>}
                      <span>{s.val}</span>
                      {s.suffix && <span style={{ fontSize: "0.44em", alignSelf: "flex-start", paddingTop: "0.12em", marginLeft: "2px" }}>{s.suffix}</span>}
                    </div>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(26,43,60,0.8)", margin: "10px auto 0", lineHeight: 1.5, maxWidth: "16ch" }}>{s.label}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontStyle: "italic", color: "rgba(26,43,60,0.65)", margin: "4px 0 0" }}>{s.source}</p>
                  </div>
                ))}
              </div>
            </DemoCard>

            <DemoCard label="Scroll Indicator — pulsing line" source="tresmares">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(26,26,26,0.28)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Scroll</span>
                <motion.div
                  aria-hidden="true"
                  style={{ width: "1px", height: "36px", background: "rgba(26,26,26,0.15)", originY: 0 }}
                  animate={{ scaleY: [0.1, 1, 0.1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </DemoCard>

            <DemoCard label="Thermal Headline — gradient text reveal" source="tresmares" dark>
              <div style={{ lineHeight: 0.86 }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 400, letterSpacing: "-0.035em", margin: 0, background: "linear-gradient(135deg, #ff4400 0%, #ff8800 25%, #ffcc00 50%, #ff6600 75%, #ff2200 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Charlotte's
                </p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 400, letterSpacing: "-0.035em", margin: 0, background: "linear-gradient(135deg, #ff4400 0%, #ff8800 25%, #ffcc00 50%, #ff6600 75%, #ff2200 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Insulation
                </p>
              </div>
            </DemoCard>
          </section>

          {/* ════════════════════ MOTION ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="motion" title="Motion & Scroll Patterns" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
              {MOTION_ITEMS.map(item => (
                <div key={item.name} style={{ background: "#fff", border: "1px solid rgba(26,43,60,0.06)", borderRadius: "7px", padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 600, color: "#1a2b3c", margin: 0, lineHeight: 1.4 }}>{item.name}</p>
                    <Tag source={item.source} />
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "rgba(26,43,60,0.72)", lineHeight: 1.65, margin: "0 0 10px" }}>{item.desc}</p>
                  <code style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "#4a90a4", background: "rgba(74,144,164,0.07)", padding: "4px 7px", borderRadius: "3px", wordBreak: "break-all" }}>{item.token}</code>
                </div>
              ))}
            </div>

            {/* Easing visualizer */}
            <div style={{ marginTop: "32px", background: "#fff", border: "1px solid rgba(26,43,60,0.06)", borderRadius: "7px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)", margin: 0 }}>Enter Animation Easing</p>
                <Tag source="tresmares" />
              </div>
              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-end" }}>
                {[
                  { label: "EASE (spring)", curve: EASE },
                  { label: "easeOut", curve: [0, 0, 0.58, 1] },
                  { label: "linear", curve: [0, 0, 1, 1] },
                ].map(({ label, curve }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" style={{ overflow: "visible" }}>
                      <path
                        d={`M 0 80 C ${curve[0] * 80} ${80 - curve[1] * 80}, ${curve[2] * 80} ${80 - curve[3] * 80}, 80 0`}
                        stroke={label === "EASE (spring)" ? "#4a90a4" : "rgba(26,43,60,0.2)"}
                        strokeWidth={label === "EASE (spring)" ? 2 : 1.5}
                        fill="none"
                      />
                    </svg>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: label === "EASE (spring)" ? "#4a90a4" : "rgba(26,43,60,0.65)", margin: 0 }}>{label}</p>
                    <code style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(26,43,60,0.65)" }}>{`[${curve.join(", ")}]`}</code>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ TEXTURES ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="textures" title="Textures & Visual FX" />

            <DemoCard label="SVG Grain Overlay — fractalNoise, multiply blend, opacity 0.55" source="tresmares">
              <div style={{ position: "relative", width: "100%", height: "120px", background: "#faf8f5", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_BG, backgroundRepeat: "repeat", backgroundSize: "200px 200px", mixBlendMode: "multiply", opacity: 0.55 }} />
                <p style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-cormorant)", fontSize: "32px", color: "#1a2b3c", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  Grain on cream
                </p>
              </div>
            </DemoCard>

            <DemoCard label="4-Direction Edge Fades — video/image bleeds into page background" source="tresmares">
              <div style={{ position: "relative", width: "100%", height: "140px", background: "#4a90a4", borderRadius: "5px", overflow: "hidden" }}>
                {[
                  { top: 0, left: 0, right: 0, height: "32%", background: "linear-gradient(to bottom, #faf8f5, transparent)" },
                  { bottom: 0, left: 0, right: 0, height: "32%", background: "linear-gradient(to top, #faf8f5, transparent)" },
                  { top: 0, left: 0, bottom: 0, width: "18%", background: "linear-gradient(to right, #faf8f5, transparent)" },
                  { top: 0, right: 0, bottom: 0, width: "18%", background: "linear-gradient(to left, #faf8f5, transparent)" },
                ].map((style, i) => (
                  <div key={i} style={{ position: "absolute", pointerEvents: "none", ...style }} />
                ))}
                <p style={{ position: "relative", fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  Content bleeds to page color
                </p>
              </div>
            </DemoCard>

            <DemoCard label="Mobile Text-Contrast Scrim — left→right cream gradient over hero image" source="carolux">
              <div style={{ position: "relative", width: "100%", height: "120px", background: "linear-gradient(135deg, #4a90a4 0%, #1a2b3c 100%)", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(250,248,245,0.82) 0%, rgba(250,248,245,0.55) 55%, transparent 100%)" }} />
                <div style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", color: "#1a2b3c", margin: 0 }}>Text legible</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", color: "rgba(26,26,26,0.42)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "4px 0 0" }}>over image</p>
                </div>
              </div>
            </DemoCard>

            <DemoCard label="Thermal Radial Reveal — circular mask at cursor position" source="tresmares" dark>
              <div style={{ position: "relative", width: "100%", maxWidth: "400px", height: "160px" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, letterSpacing: "-0.035em", color: "#e8e4dd", margin: 0 }}>Charlotte's</p>
                </div>
                <div style={{
                  position: "absolute", inset: 0,
                  WebkitMaskImage: "radial-gradient(circle 130px at 50% 50%, black 0%, black 60%, transparent 100%)",
                  maskImage: "radial-gradient(circle 130px at 50% 50%, black 0%, black 60%, transparent 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0d0d0d 0%, #0d0d0d 36%, rgba(13,13,13,0.55) 52%, transparent 68%)" }} />
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, letterSpacing: "-0.035em", margin: 0, position: "relative", background: "linear-gradient(135deg, #ff4400, #ffcc00, #ff2200)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Charlotte's</p>
                </div>
                <p style={{ position: "absolute", bottom: "8px", right: "12px", fontFamily: "var(--font-dm-sans)", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>cursor reveals thermal</p>
              </div>
            </DemoCard>
          </section>

          {/* ════════════════════ TRESMARES LIBRARY ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="tresmares-lib" title="Tresmares — Available Library" />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "rgba(26,43,60,0.7)", lineHeight: 1.7, marginBottom: "40px", maxWidth: "540px" }}>
              Patterns from Tresmares Capital not yet used on the Carolux site. All adapted to Carolux brand colors — original source tokens shown in comments.
            </p>

            {/* ── Cards ──────────────────────────────────────────────────── */}
            <DemoCard label="Card — Portfolio variant  ·  white bg, border #1e1f26, radius 4px" source="tresmares">
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                {["Attic Insulation", "Crawl Space"].map((title, i) => (
                  <div key={title} style={{ background: "#ffffff", border: "1px solid #1e1f26", borderRadius: "4px", overflow: "hidden", width: "180px" }}>
                    <div style={{ height: "100px", background: i === 0 ? "linear-gradient(135deg, #4a90a4, #1a2b3c)" : "linear-gradient(135deg, #f45800, #313131)" }} />
                    <div style={{ padding: "14px" }}>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 600, color: "#313131", margin: "0 0 4px" }}>{title}</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#aaaaaa", margin: 0 }}>Residential · 2024</p>
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>

            <DemoCard label="Card — Team variant  ·  avatar + name + role" source="tresmares">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { name: "Tony Martinez", role: "Co-owner", color: "#4a90a4" },
                  { name: "Juan Lopez", role: "Co-owner", color: "#f45800" },
                ].map(person => (
                  <div key={person.name} style={{ background: "#ffffff", border: "1px solid #1e1f26", borderRadius: "4px", padding: "16px", display: "flex", alignItems: "center", gap: "12px", width: "200px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: person.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px", color: "#fff", fontWeight: 600 }}>
                        {person.name[0]}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 600, color: "#313131", margin: 0 }}>{person.name}</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#aaaaaa", margin: "3px 0 0" }}>{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>

            {/* ── Ghost button ──────────────────────────────────────────── */}
            <DemoCard label="Ghost Button  ·  transparent bg, border #1e1f26" source="tresmares">
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <button style={{ background: "#4a90a4", color: "#fff", fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "10px 24px", borderRadius: "4px", border: "none", cursor: "pointer" }}>
                  Primary
                </button>
                <button style={{ background: "transparent", border: "1px solid #1e1f26", borderRadius: "4px", padding: "10px 24px", fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#313131", cursor: "pointer" }}>
                  Ghost
                </button>
                <button style={{ background: "transparent", border: "1px solid #f45800", borderRadius: "4px", padding: "10px 24px", fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f45800", cursor: "pointer" }}>
                  Ghost Accent
                </button>
              </div>
            </DemoCard>

            {/* ── Input ────────────────────────────────────────────────── */}
            <DemoCard label="Input Field  ·  focus: border-color #f45800  ·  click to try" source="tresmares">
              <InputDemo />
            </DemoCard>

            {/* ── Badge / chip ─────────────────────────────────────────── */}
            <DemoCard label="Badge / Chip  ·  border-radius 9999px, color #aaaaaa" source="tresmares">
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                {["New", "Beta", "Residential", "Free Estimate", "Licensed & Insured"].map(label => (
                  <span key={label} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    border: "1px solid #1e1f26",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#aaaaaa",
                    background: "#ffffff",
                    letterSpacing: "0.04em",
                  }}>
                    {label}
                  </span>
                ))}
                <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: "9999px", background: "#f45800", fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, color: "#fff", letterSpacing: "0.04em" }}>
                  Active
                </span>
              </div>
            </DemoCard>

            {/* ── Table ────────────────────────────────────────────────── */}
            <DemoCard label="Table  ·  border-bottom separators, muted #aaaaaa headers, no zebra" source="tresmares">
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-dm-sans)" }}>
                  <thead>
                    <tr>
                      {["Service", "Area", "Duration", "Price"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: "10px", fontWeight: 500, color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e1f26" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Attic Insulation", "1,200 sq ft", "1 day", "$1,800"],
                      ["Crawl Space Encap.", "800 sq ft", "2 days", "$3,200"],
                      ["Air Sealing", "Whole house", "Half day", "$600"],
                    ].map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: "12px", fontSize: "12px", color: j === 0 ? "#313131" : "#aaaaaa", borderBottom: "1px solid rgba(30,31,38,0.15)", fontWeight: j === 0 ? 500 : 400 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DemoCard>

            {/* ── Char reveal ──────────────────────────────────────────── */}
            <DemoCard label="Character / Word Reveal  ·  overflow:clip wrapper, y:110%→0, stagger 35ms" source="tresmares">
              <CharRevealDemo />
            </DemoCard>

            {/* ── Underline link ────────────────────────────────────────── */}
            <DemoCard label="Underline Link  ·  span child with border-bottom, sits inside nav/body text" source="tresmares">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <a href="#" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#313131", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ borderBottom: "1px solid #313131", paddingBottom: "1px" }}>View all services</span>
                  <span style={{ fontSize: "12px" }}>→</span>
                </a>
                <a href="#" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#f45800", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ borderBottom: "1px solid #f45800", paddingBottom: "1px" }}>Get a free estimate</span>
                  <span style={{ fontSize: "12px" }}>→</span>
                </a>
                <a href="#" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#4a90a4", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ borderBottom: "1px solid #4a90a4", paddingBottom: "1px" }}>Learn about our process</span>
                  <span style={{ fontSize: "12px" }}>→</span>
                </a>
              </div>
            </DemoCard>

            {/* ── Pulse dot ────────────────────────────────────────────── */}
            <DemoCard label="Pulse Location Dot  ·  scale(0)→scale(3.2), opacity 1→0, 2s infinite" source="tresmares">
              <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
                {[
                  { color: "#4a90a4", label: "Charlotte, NC" },
                  { color: "#f45800", label: "Service area" },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <div style={{ position: "relative", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* Pulse rings */}
                      {[0, 0.5, 1].map(delay => (
                        <div
                          key={delay}
                          style={{
                            position: "absolute",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: color,
                            opacity: 0,
                            animation: `pulse-ring 2s ease-out ${delay}s infinite`,
                          }}
                        />
                      ))}
                      {/* Center dot */}
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, zIndex: 1 }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,43,60,0.4)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </DemoCard>

            {/* ── Gradient shift ────────────────────────────────────────── */}
            <DemoCard label="Animated Gradient Background  ·  @keyframes gradient-anim, background-size 400%" source="tresmares">
              <div style={{
                width: "100%",
                height: "100px",
                borderRadius: "6px",
                background: "linear-gradient(-45deg, #4a90a4, #1a2b3c, #f45800, #faf8f5)",
                backgroundSize: "400% 400%",
                animation: "gradient-anim 6s ease infinite",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", color: "#fff", fontWeight: 400, margin: 0, letterSpacing: "-0.02em" }}>Charlotte's Insulation</p>
              </div>
            </DemoCard>

            {/* ── Overlay menu ─────────────────────────────────────────── */}
            <DemoCard label="Overlay Menu  ·  opacity 0→1, translateY 8px→0, staggered children 70ms" source="tresmares">
              <OverlayMenuDemo />
            </DemoCard>

            {/* ── Submenu thumbnail card ───────────────────────────────── */}
            <DemoCard label="Submenu Thumbnail Card  ·  image fill + floating centered label overlay" source="tresmares">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { title: "Attic", bg: "linear-gradient(135deg, #4a90a4 0%, #1a2b3c 100%)" },
                  { title: "Crawl Space", bg: "linear-gradient(135deg, #1a2b3c 0%, #f45800 100%)" },
                  { title: "Air Sealing", bg: "linear-gradient(135deg, #f45800 0%, #ffcc00 100%)" },
                ].map(({ title, bg }) => (
                  <div key={title} style={{ position: "relative", width: "130px", height: "90px", borderRadius: "4px", overflow: "hidden", cursor: "pointer" }}>
                    <div style={{ position: "absolute", inset: 0, background: bg }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ background: "rgba(255,255,255,0.92)", padding: "5px 12px", borderRadius: "2px", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, color: "#313131", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>

            {/* ── Long 4s ease ─────────────────────────────────────────── */}
            <DemoCard label="Long-Duration Ease  ·  4s cubic-bezier(0.16,1,0.3,1) — cinematic transitions" source="tresmares">
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)" }}>4s — cinematic (Tresmares page transitions)</span>
                  <div style={{ position: "relative", height: "20px" }}>
                    <motion.div
                      style={{ position: "absolute", top: "2px", left: 0, width: "16px", height: "16px", borderRadius: "50%", background: "#f45800" }}
                      animate={{ x: [0, 260, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: EASE, repeatDelay: 0.8 }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)" }}>0.55s — standard interaction</span>
                  <div style={{ position: "relative", height: "20px" }}>
                    <motion.div
                      style={{ position: "absolute", top: "2px", left: 0, width: "16px", height: "16px", borderRadius: "50%", background: "#4a90a4" }}
                      animate={{ x: [0, 260, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, ease: EASE, repeatDelay: 4.25 }}
                    />
                  </div>
                </div>
              </div>
            </DemoCard>

            {/* ── Center text block ─────────────────────────────────────── */}
            <DemoCard label="Center Display Block  ·  eyebrow label above large serif title, centered" source="tresmares">
              <div style={{ textAlign: "center", maxWidth: "480px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ width: "24px", height: "1px", background: "#f45800" }} />
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#f45800", margin: 0 }}>
                    Why Choose Us
                  </p>
                  <div style={{ width: "24px", height: "1px", background: "#f45800" }} />
                </div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: "#313131", lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 16px" }}>
                  Charlotte's most trusted insulation company
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#aaaaaa", lineHeight: 1.7, margin: 0 }}>
                  Owner-operated since 2009. Every job done by Tony and Juan personally.
                </p>
              </div>
            </DemoCard>

          </section>

          {/* ════════════════════ SWEEPINGCORP LIBRARY ════════════════════ */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeading id="sweeping-lib" title="SweepingCorp — Available Library" />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "rgba(26,43,60,0.7)", lineHeight: 1.7, marginBottom: "40px", maxWidth: "540px" }}>
              Patterns from SweepingCorp not yet used on the Carolux site. Adapted to Carolux teal brand from SweepingCorp lime.
            </p>

            {/* ── SquareButton ─────────────────────────────────────────── */}
            <DemoCard label="SquareButton  ·  icon-only, 44×44px, translucent bg, diagonal arrow" source="sweepingcorp">
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                {[
                  { bg: "rgba(74,144,164,0.12)", border: "1px solid rgba(74,144,164,0.3)", color: "#4a90a4" },
                  { bg: "rgba(26,43,60,0.08)", border: "1px solid rgba(26,43,60,0.2)", color: "#1a2b3c" },
                  { bg: "#4a90a4", border: "none", color: "#fff" },
                ].map((s, i) => (
                  <button key={i} style={{ width: "44px", height: "44px", borderRadius: "4px", background: s.bg, border: s.border, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.65)", letterSpacing: "0.08em" }}>transparent · muted · filled</span>
              </div>
            </DemoCard>

            {/* ── Ripple CTA ───────────────────────────────────────────── */}
            <DemoCard label="Ripple CTA Button  ·  radial expand on click, rgba(255,255,255,0.45) burst" source="sweepingcorp">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <RippleButton>
                  Get a Free Estimate
                </RippleButton>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(26,43,60,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Click to see ripple
                </span>
              </div>
            </DemoCard>

            {/* ── Logo reel ────────────────────────────────────────────── */}
            <DemoCard label="Logo Reel  ·  CSS marquee, duplicated list, animation: marquee linear infinite" source="sweepingcorp" noPad>
              <div style={{ width: "100%", overflow: "hidden", padding: "28px 0", borderRadius: "8px", background: "#fff" }}>
                <div style={{ display: "flex", gap: "0", width: "max-content", animation: "marquee 18s linear infinite" }}>
                  {[...LOGOS, ...LOGOS].map((name, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "48px", paddingRight: "48px", flexShrink: 0 }}>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,43,60,0.25)", whiteSpace: "nowrap" }}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </DemoCard>

            {/* ── Scroll mouse ─────────────────────────────────────────── */}
            <DemoCard label="Scroll Mouse Indicator  ·  SVG outline, inner dot bounces y:0→12→0, 1.6s" source="sweepingcorp">
              <ScrollMouseIndicator />
            </DemoCard>

            {/* ── Clip-path reveal ─────────────────────────────────────── */}
            <DemoCard label="Clip-path Reveal  ·  inset(100% 0 0 0)→inset(0%) on viewport entry, 1s ease" source="sweepingcorp">
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
                {["Savings", "Comfort", "Quality"].map((word, i) => (
                  <motion.div
                    key={word}
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{ duration: 0.85, delay: i * 0.12, ease: EASE }}
                    viewport={{ once: false, margin: "-20px" }}
                    style={{ textAlign: "center" }}
                  >
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, color: "#1a2b3c", letterSpacing: "-0.03em", margin: "0 0 4px" }}>{word}</p>
                    <div style={{ width: "100%", height: "2px", background: "#4a90a4", borderRadius: "1px" }} />
                  </motion.div>
                ))}
              </div>
            </DemoCard>

            {/* ── Spring overshoot ─────────────────────────────────────── */}
            <DemoCard label="Spring Overshoot Easing  ·  cubic-bezier(.34, 6.56, .64, 1) — SweepingCorp CTA bounce" source="sweepingcorp">
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)" }}>Spring overshoot — cubic-bezier(.34, 6.56, .64, 1)</span>
                  <div style={{ position: "relative", height: "20px" }}>
                    <motion.div
                      style={{ position: "absolute", top: "2px", left: 0, width: "16px", height: "16px", borderRadius: "3px", background: "#aad902" }}
                      animate={{ x: [0, 200] }}
                      transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", ease: [0.34, 1.56, 0.64, 1], repeatDelay: 0.5 }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,60,0.65)" }}>Standard ease-out — cubic-bezier(0.16, 1, 0.3, 1)</span>
                  <div style={{ position: "relative", height: "20px" }}>
                    <motion.div
                      style={{ position: "absolute", top: "2px", left: 0, width: "16px", height: "16px", borderRadius: "3px", background: "#4a90a4" }}
                      animate={{ x: [0, 200] }}
                      transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", ease: EASE, repeatDelay: 0.5 }}
                    />
                  </div>
                </div>
                <TokenBlock>cubic-bezier(.34, 6.56, .64, 1) — extreme spring, overshoots ~6.5× then snaps back</TokenBlock>
              </div>
            </DemoCard>

            {/* ── Dark card ────────────────────────────────────────────── */}
            <DemoCard label="Dark Card Surface  ·  bg #1d1d1d, border #4b5563, light text hierarchy" source="sweepingcorp">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { title: "47%", sub: "Avg. Energy Savings", badge: "Verified", badgeColor: "#aad902" },
                  { title: "1-Year", sub: "Workmanship Guarantee", badge: "Carolux Promise", badgeColor: "#4a90a4" },
                ].map(({ title, sub, badge, badgeColor }) => (
                  <div key={title} style={{ background: "#1d1d1d", border: "1px solid #4b5563", borderRadius: "8px", padding: "24px 20px", width: "180px" }}>
                    <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "36px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 6px" }}>{title}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: "0 0 14px" }}>{sub}</p>
                    <span style={{ display: "inline-flex", padding: "3px 9px", borderRadius: "9999px", background: badgeColor, fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: badgeColor === "#aad902" ? "#1d1d1d" : "#fff" }}>
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </DemoCard>

            {/* ── Video hover card ─────────────────────────────────────── */}
            <DemoCard label="Video Hover Card  ·  autoplay idle video, cross-fade to content video on hover" source="sweepingcorp">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <VideoHoverCard />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,43,60,0.62)" }}>hover the card</span>
              </div>
            </DemoCard>

            {/* ── CoveredSection grid ───────────────────────────────────── */}
            <DemoCard label="CoveredSection Grid  ·  full-bleed two-column, each panel fills its cell" source="sweepingcorp" noPad>
              <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ background: "#1d1d1d", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0 }}>The problem</p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 400, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>Losing heat through your attic</p>
                  <div style={{ width: "28px", height: "2px", background: "#4a90a4" }} />
                </div>
                <div style={{ background: "#4a90a4", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>The fix</p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 400, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>Blown-in insulation same week</p>
                  <div style={{ width: "28px", height: "2px", background: "#fff" }} />
                </div>
              </div>
            </DemoCard>

            {/* ── Canvas glow background ────────────────────────────────── */}
            <DemoCard label="Canvas Glow Background  ·  particle scene + radial glow layer (needs Three.js or canvas 2D)" source="sweepingcorp" dark>
              <div style={{ position: "relative", width: "100%", height: "180px", background: "#0a0a0a", borderRadius: "6px", overflow: "hidden" }}>
                {/* CSS approximation of particle glow */}
                <div style={{ position: "absolute", top: "50%", left: "30%", transform: "translate(-50%,-50%)", width: "220px", height: "220px", background: "radial-gradient(circle, rgba(74,144,164,0.22) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "40%", left: "65%", transform: "translate(-50%,-50%)", width: "160px", height: "160px", background: "radial-gradient(circle, rgba(170,217,2,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                {/* Simulated particles */}
                {[
                  { top: "20%", left: "25%", size: 2, opacity: 0.6 },
                  { top: "60%", left: "40%", size: 1.5, opacity: 0.4 },
                  { top: "35%", left: "55%", size: 2.5, opacity: 0.7 },
                  { top: "70%", left: "70%", size: 1, opacity: 0.5 },
                  { top: "50%", left: "15%", size: 2, opacity: 0.45 },
                  { top: "25%", left: "80%", size: 1.5, opacity: 0.55 },
                  { top: "80%", left: "30%", size: 1, opacity: 0.35 },
                  { top: "15%", left: "60%", size: 2, opacity: 0.5 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    style={{ position: "absolute", top: p.top, left: p.left, width: p.size, height: p.size, borderRadius: "50%", background: i % 2 === 0 ? "#4a90a4" : "#aad902" }}
                    animate={{ opacity: [p.opacity, p.opacity * 0.3, p.opacity], y: [0, -4, 0] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                ))}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: 0 }}>
                    CSS approximation — implement with canvas 2D or Three.js
                  </p>
                </div>
              </div>
            </DemoCard>

          </section>

          {/* Footer note */}
          <div style={{ borderTop: "1px solid rgba(26,43,60,0.07)", paddingTop: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "24px", height: "1px", background: "#4a90a4" }} />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(26,43,60,0.62)", letterSpacing: "0.06em", margin: 0 }}>
              Internal design reference — not linked from main navigation
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}
