<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Carolux — Deep Project Knowledge

> Things that will burn you if you don't know them. Read before touching any file.

---

## Package Versions & Critical Gotchas

| Package | Version | Gotcha |
|---|---|---|
| `next` | 16.2.6 | App Router only. No `pages/` directory. |
| `react` | 19.2.4 | `useEffect` runs twice in dev (StrictMode). Effects must be idempotent. |
| `framer-motion` | ^12 | `y` in `useTransform` **must be unitless numbers** — `[0, -1100]` ✓, `["0px", "-1100px"]` ✗. Strings silently fail with no error. |
| `tailwindcss` | ^4 | **No `tailwind.config.js`.** Config is zero — Tailwind v4 auto-detects content. `globals.css` is one line: `@import "tailwindcss"`. Add custom theme values via `@theme {}` in CSS if needed. |
| `three` | ❌ not installed | Canvas glow in design-reference is CSS-only. Don't import it. |

---

## Viewport Units — Always `svh`/`dvh`, Never `vh`

- Use `100svh` for sticky panels and fullscreen sections — avoids iOS Safari address bar jump
- `layout.js` body uses `min-h-dvh` (dynamic viewport height) — already set, don't change
- Never use `100vh` anywhere in this project

---

## Easing Constant

```js
const EASE = [0.16, 1, 0.3, 1];  // Tresmares Capital spring — used on ALL entry animations
```

Defined at the top of Hero.js. Copy this exact value if adding new enter animations anywhere on the site. Don't invent a new easing.

---

## Grain Texture

```js
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;
```

Already defined in Hero.js. Reuse this constant for grain on other sections. `opacity: 0.55` on the overlay div, `mixBlendMode: "multiply"`.

---

## Hero.js — Implementation Details

**Two-level image wrapper pattern** — both sketch image and thermal image use this same structure:
```
motion.div  → scroll scale (imageScale) + scroll opacity (imageOpacity) + transformOrigin "right center"
  div       → parallax translate (±20px max), transition "0.15s ease-out"
    Image   → fill, objectFit cover
```
Never flatten this to a single wrapper — the scale and parallax must be on separate elements.

**Thermal overlay** (`hidden md:block`):
- Intentionally hidden on mobile — requires mouse cursor. Not a bug.
- z-index 20, fades with `imageOpacity` (same as sketch image)
- Edge fade: `opacity = minDist > 150 ? 1 : minDist <= 0 ? 0 : minDist / 150` where `minDist` is distance from nearest edge of sticky panel
- Mask: `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, black 60%, transparent 100%)`
- `heroMousePos` is `null` until first mousemove — mask is `"none"` until then

**Mobile contrast scrim** (`md:hidden`):
- `linear-gradient(to right, rgba(250,248,245,0.82) 0%, rgba(250,248,245,0.55) 55%, transparent 100%)`
- Left-to-right, fades cream over the house image so text stays readable

**Z-index stack inside sticky panel:**
- 0 — sketch image (no explicit z-index)
- 10 — base content (`className="relative z-10"`)
- 15 — bridge text div
- 20 — thermal overlay

**Sticky panel dimensions:**
- `height: "100svh"`, `minHeight: "720px"` — the min means trust badges clip on iPhone SE 1st gen (568px tall). Accepted trade-off.

**Parallax range:** ±20px max (`Math.max(-20, Math.min(20, ...))`)

**Headline font-size clamp:** `clamp(3rem, 9vw, 10rem)` — floor is 3rem (48px) so "Charlotte's" fits at 390px viewport. The old value was 4.5rem and caused overflow — do not revert it.

**Bridge text container:** `className="w-[88%] md:w-[65%]"` — responsive. Do not put `width` back in inline style.

---

## Stats.js — Implementation Details

**Touch detection — module scope (critical):**
```js
// These three functions MUST stay at module scope, outside the component
function subscribePointer(cb) { ... }
const getPointerSnapshot = () => window.matchMedia("(pointer: coarse)").matches;
const getPointerServerSnapshot = () => false;
```
`useSyncExternalStore` requires stable function references. Moving them inside the component breaks SSR or causes infinite re-renders.

**Video scrub formula:** `video.currentTime = Math.max(0, Math.min(v * 3, duration))`
The video (`insulation-burst-bg-scrub.mp4`) is **3 seconds long**. The `× 3` maps 0–1 scroll progress to 0–3s. If the video is ever replaced, update this multiplier.

**Stat reveal transitions:** `opacity 600ms ease, transform 600ms ease`, starting state `translateY(20px) opacity:0`.

**Asymmetric thresholds (desktop scroll):**
- SHOW (scroll down): `[0.15, 0.35, 0.55, 0.75]` — stats appear spread over 60% of scroll range
- HIDE (scroll up): `[0.45, 0.55, 0.65, 0.75]` — disappear in half the range (feels faster going back)
- `shownRef = useRef([false, false, false, false])` tracks current visibility to enable asymmetry

**Mobile IntersectionObserver:** `threshold: 0.3` (30% of section visible), stagger `150ms × index`.

**iOS video autoplay:** requires all three — `muted` attribute, `playsInline` attribute, `play()` call. All present. Don't remove any of them.

---

## layout.js — Font Loading

```js
DM_Sans         → --font-dm-sans     weights: 400, 500, 700
Cormorant_Garamond → --font-cormorant  weight: 400, styles: normal + italic
Plus_Jakarta_Sans  → --font-jakarta    weight: 700 only
```

All loaded via `next/font/google` — no local font files. Do not add font files to `public/fonts/`.

`metadataBase` is `https://caroluxinsulation.com` — the production domain (not yet live, reserved for first main deploy).

---

## content.js — Data Shapes

All copy lives here. Never hardcode strings in components.

```js
STATS items shape:  { prefix: string, countTo: number, suffix: string, label: string, source: string }
PACKAGES items:     { name, tagline, features: string[], cta, featured: boolean }  ← middle card has featured: true
SERVICES items:     { number: "01"/"02", title, description, cta }
WHY_US items:       { roman: "I"/"II"/"III", title, description }
REVIEWS items:      { name, location, text }
```

`HERO.headline` is an array of strings — each renders as its own `display: block` line. Currently `["Charlotte's", "Insulation", "Experts."]`. The second item (`i === 1`) renders italic.

---

## globals.css — One Line Only

```css
@import "tailwindcss";
```

Do not add arbitrary CSS here. If you need custom theme values (colors, fonts, etc.), use a `@theme {}` block. If you need component-level keyframes, inject them as a `<style>` JSX tag in the component file (see design-reference/page.js for the pattern).

---

## Design Reference Page

At `/design-reference` — committed to `mobile-fixes` branch, not linked from Nav.

- 1421 lines, `"use client"`, 8 sidebar sections
- CSS keyframes injected via `<style>` JSX tag: `marquee`, `gradient-anim`, `ripple-anim`, `pulse-ring`
- Sub-components defined inline: `TokenBlock`, `DemoCard` (with `noPad` prop), `InputDemo`, `OverlayMenuDemo`, `CharRevealDemo`, `RippleButton`, `ScrollMouseIndicator`, `VideoHoverCard`
- If this file is ever lost again: it's recoverable from the session JSONL at `C:\Users\jcx20\.claude\projects\H--Claude-Code-Folders-Carolux-Pro-Website-carolux-site\faafd746-41ba-482d-bfd8-e5724a63209c.jsonl`

---

## Git & Deployment

```
GitHub:   github.com/CrLX26/carolux-site
Vercel:   project "carolux-site", team "carolux"
          preview URL pattern: carolux-site-[hash]-carolux.vercel.app
          Deployment Protection: disable in Settings → Deployment Protection for public previews

main:          1 commit — initial commit (37a3a8f)
mobile-fixes:  7 commits — all current work, pushed
```

Vercel auto-deploys every push. Get the preview URL via:
```bash
gh api repos/CrLX26/carolux-site/deployments --jq '.[0].id'
# then: gh api repos/CrLX26/carolux-site/deployments/[ID]/statuses --jq '.[0].target_url'
```

---

## Skills to Activate

| When | Skill |
|---|---|
| Any UI/visual work | `tresmarescapital-design` + `sweepingcorp-design` |
| New component or page design | `impeccable` |
| Accessibility, responsive, UX review | `ui-ux-pro-max` |
| Design taste / quality check | `design-taste-frontend` |

---

## Decisions Locked From Previous Sessions

- **`house-normal6.webp`** — current hero image. `house-normal5.webp` is kept but unused.
- **Bridge text copy** — "Most Charlotte homes are losing money through their attic every single month." Editorial decision, don't change without approval.
- **Stat values** — 15%, 90%+, R-49, 100%+ — sourced from EPA/DOE/Cost vs Value. Don't alter.
- **Thermal overlay** hidden on mobile — permanent. Requires mouse. Not a responsive feature gap.
- **Nav.js** — locked. Do not touch under any circumstances.
