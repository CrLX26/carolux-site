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

## VISUAL EFFECTS

Complete inventory of every visual effect, animation, and interaction built into the site. Each entry covers: what it is, which component, how it works technically, what triggers it, and platform scope.

---

### NAV.JS

**1. Scroll-triggered border + shadow**
Nav header transitions from invisible border/no shadow to a teal-tinted border (`rgba(74,144,164,0.14)`) and soft shadow (`0 1px 16px rgba(0,0,0,0.05)`) once the user scrolls past 40px. Driven by `scrolled` state set in a passive `scroll` event listener. Transition: `border-color 250ms ease, box-shadow 250ms ease`. Both desktop and mobile.

**2. Desktop nav link underline on hover**
Each nav link in the `NavLink` sub-component has a `motion.span` absolutely positioned at the bottom, initially `scaleX: 0`, `transformOrigin: "left"`. On hover it animates to `scaleX: 1` over 200ms easeOut. Reverses on mouse leave. Triggered by `onMouseEnter/Leave` setting `hovered` state. Desktop only (`hidden md:flex` on the nav list).

**3. Desktop nav link color on hover**
Companion to #2 — link text color shifts from `#374151` to `#4a90a4` over 150ms ease via inline style driven by the same `hovered` state. Desktop only.

**4. Desktop phone number color on hover**
Inline `onMouseEnter/Leave` handlers directly mutate `e.currentTarget.style.color` between `#374151` and `#4a90a4`. 150ms ease CSS transition on the element. Desktop only.

**5. Desktop CTA button lift on hover**
"Free Estimate" button: `onMouseEnter` applies `background: #3d7d90` (darken) + `transform: translateY(-1px)`. `onMouseLeave` resets both. Transition: `background 150ms ease, transform 150ms ease`. Desktop only.

**6. Hamburger → X morphing animation**
Three `motion.span` bars animate on `open` state toggle. Top bar: `rotate: 45, y: 7` (222ms easeOut). Middle bar: `opacity: 0` (180ms). Bottom bar: `rotate: -45, y: -7` (220ms easeOut). Each uses Framer Motion `animate` prop driven by the `open` boolean. Reverses on close. Mobile only (`flex md:hidden`).

**7. Mobile drawer slide-in**
Full-screen white overlay below the header, managed by `AnimatePresence`. Enter: `opacity: 0, y: -8` → `opacity: 1, y: 0`. Exit: same in reverse. Duration 220ms easeOut. Triggered by hamburger tap. Mobile only (`md:hidden`).

**8. Mobile drawer link stagger**
Each link inside the drawer enters with `initial={{ opacity: 0, x: -10 }}` → `animate={{ opacity: 1, x: 0 }}`, with a `delay` of `i * 0.06s` (60ms per item). Duration 220ms easeOut. Fires each time the drawer opens. Mobile only.

**9. Body scroll lock**
Not visual, but interaction-critical: `document.body.style.overflow = "hidden"` is set whenever the drawer is open, preventing the page from scrolling behind it. Cleaned up on close and on unmount. Mobile only.

**10. Sticky mobile bottom bar**
Fixed bar at the bottom of the viewport with "Call Us" and "Get Estimate" split buttons. Static — no animation. Always visible on mobile. Mobile only (`flex md:hidden`).

---

### HERO.JS

**11. Grain texture overlay**
SVG `fractalNoise` data URI (`baseFrequency: 0.75`, 4 octaves) tiled at 200×200px, `opacity: 0.55`, `mixBlendMode: "multiply"` over the entire sticky panel. Static — no animation. Creates film-grain paper texture. Both desktop and mobile.

**12. Headline clip-path reveal on page load**
Each of the three headline words (`"Charlotte's"`, `"Insulation"`, `"Experts."`) is wrapped in a `div` with `clipPath: "inset(0 -9999px)"`. Inside, a `motion.span` starts at `y: "112%"` (below the clip boundary) and animates to `y: 0`. Duration 1.1s, EASE `[0.16, 1, 0.3, 1]`. Stagger: `delay: 0.12 + i * 0.1` (100ms per line). Fires once on mount. Both desktop and mobile.

**13. Eyebrow label fade-in**
`motion.div` wrapping the eyebrow row. `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`. Duration 0.8s, EASE, delay 0.05s. Fires once on mount. Both desktop and mobile.

**14. Subheading fade-in**
`motion.p`. `initial={{ opacity: 0, y: 14 }}` → `animate={{ opacity: 1, y: 0 }}`. Duration 0.9s, EASE, delay 0.52s. Both desktop and mobile.

**15. CTAs fade-in**
`motion.div` wrapping the CTA row. `initial={{ opacity: 0, y: 12 }}` → `animate={{ opacity: 1, y: 0 }}`. Duration 0.9s, EASE, delay 0.62s. Both desktop and mobile.

**16. Trust badges fade-in**
`motion.ul`. `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`. Duration 0.8s, EASE, delay 0.82s. Both desktop and mobile.

**17. Scroll indicator + pulsing line**
Appears at bottom-left after 1.4s delay (0.6s fade-in). A `motion.div` line beneath the "Scroll" label loops `scaleY: [0.1, 1, 0.1]` over 2.8s easeInOut, infinitely. Gives a breathing / breathing-indicator feel. Both desktop and mobile (sits above mobile bottom bar, may be partially obscured).

**18. Hero scroll tunnel — content fade + slide up** *(LOCKED)*
`heroContentOpacity = useTransform(scrollYProgress, [0.05, 0.26], [1, 0])` and `heroContentY = useTransform(scrollYProgress, [0.05, 0.30], [0, -1100])`. The entire content block (eyebrow, headline, subheading, CTAs, trust badges) fades and slides up as the user scrolls into the tunnel. Scroll-driven via Framer Motion `MotionValue`. Both desktop and mobile.

**19. Hero image scroll scale (Ken Burns)** *(LOCKED)*
`imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])`. Applied to the outer `motion.div` wrapping the sketch image. Subtly zooms the image 8% over the full scroll range. `transformOrigin: "right center"`. Both desktop and mobile.

**20. Hero image scroll fade** *(LOCKED)*
`imageOpacity = useTransform(scrollYProgress, [0, 0.45, 0.90, 1], [1, 1, 0, 0])`. Image holds full opacity until 45% scroll progress, then fades to transparent by 90%. Both desktop and mobile.

**21. Mouse parallax on hero image**
`window.addEventListener("mousemove")` tracks cursor relative to the sticky panel via `getBoundingClientRect()`. Offset is mapped to ±20px max (`Math.max(-20, Math.min(20, ...))`). Applied as `transform: translate(${x}px, ${y}px)` with `transition: "0.15s ease-out"` on the inner image wrapper. Same offset applied to the thermal image simultaneously. Desktop only (mousemove never fires on mobile).

**22. Bridge text scroll-in** *(LOCKED)*
`bridgeY = useTransform(scrollYProgress, [0.34, 0.90, 1.0], [320, 0, 0])`. Bridge text starts 320px below its final position and scrolls upward into the center of the viewport. Holds at 0 for the last 10% of the tunnel. Scroll-driven. Both desktop and mobile.

**23. Teal vertical line below bridge text** *(LOCKED)*
`tealLineOpacity = useTransform(scrollYProgress, [0.44, 0.58], [0, 1])`. A 1px × 40px teal line fades in beneath the bridge text as it settles into position. Scroll-driven. Both desktop and mobile.

**24. Thermal image reveal on mouse**
A full-viewport `motion.div` (z-index 20) is hidden unless cursor is over the sticky panel. A `WebkitMaskImage` / `maskImage` with `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, black 60%, transparent 100%)` is applied to reveal the thermal house image and all thermal-colored content at the cursor. Triggered by `mousemove`. Desktop only — entire overlay has `className="hidden md:block"`.

**25. Thermal edge fade**
The thermal overlay's opacity is controlled by `thermalOpacity`, calculated as `minDist / 150` where `minDist` is the distance from the cursor to the nearest edge of the sticky panel. Fades to 0 within 150px of any edge. Applied with `transition: "opacity 150ms ease-out"`. Desktop only.

**26. Hero primary CTA hover**
Tailwind `hover:opacity-80 hover:scale-[1.015]` with `transition-all` CSS class. Desktop only (hover states).

**27. Mobile cream contrast scrim**
Static `md:hidden` element: `linear-gradient(to right, rgba(250,248,245,0.82) 0%, rgba(250,248,245,0.55) 55%, transparent 100%)` layered over the hero image. Ensures text is readable over the house photo on mobile. No animation. Mobile only.

---

### STATS.JS

**28. Video scroll scrub**
`scrollYProgress.on("change")` fires on every scroll tick. Maps progress `v` to `video.currentTime = Math.max(0, Math.min(v * 3, duration))`. The video is 3 seconds long; the multiplier maps the full scroll tunnel (250vh) to the full video duration. Pauses video on mount before scrubbing starts. Desktop only (`if (isTouch) return`).

**29. Stat reveal on scroll (desktop)**
Each of the four stat wrappers starts at `opacity: 0, transform: translateY(20px)`. When scroll progress crosses a SHOW threshold (`[0.15, 0.35, 0.55, 0.75]`), the element's inline style is set to `opacity: 1, transform: translateY(0px)`. CSS `transition: opacity 600ms ease, transform 600ms ease`. Direct DOM mutation via `ref.current.style` for performance. Desktop only.

**30. Asymmetric stat hide on scroll up (desktop)**
Same DOM refs, different thresholds. When scrolling back up and progress drops below a HIDE threshold (`[0.45, 0.55, 0.65, 0.75]`), stats revert to hidden state. HIDE thresholds are compressed vs SHOW — stats disappear faster going backward than they appeared going forward. Tracked via `shownRef` (not state — avoids re-renders). Desktop only.

**31. Video autoplay on mobile**
On touch devices, `video.loop = true` and `video.play().catch(() => {})` are called in `useEffect` once `isTouch` is confirmed. Video plays and loops continuously. Mobile only.

**32. Stat reveal via IntersectionObserver (mobile)**
`IntersectionObserver` on the sticky section element at `threshold: 0.3`. When 30% of the section enters the viewport, all four stats reveal with a staggered `setTimeout` (150ms × index). On exit, all revert to hidden. Mobile only.

**33. Stats section edge fades**
Four static absolutely-positioned divs with cream-to-transparent gradients bleed the video into the page background on all four sides (18% from each edge). No animation. `zIndex: 5`. Both desktop and mobile.

**34. Cream scrim over video**
`rgba(250,248,245,0.38)` overlay at `zIndex: 1` takes the edge off the raw video and ensures stat text is readable. Static. Both desktop and mobile.

---

### SECTIONS WITH NO VISUAL EFFECTS

**Services, WhyUs, Packages, Reviews, Contact, Footer** are currently bare semantic HTML with no Tailwind classes, no Framer Motion, no CSS transitions, and no interaction states. They render unstyled. These sections are placeholders — all visual design and animation work for them is still to be done.

---

## Decisions Locked From Previous Sessions

- **`house-normal6.webp`** — current hero image. `house-normal5.webp` is kept but unused.
- **Bridge text copy** — "Most Charlotte homes are losing money through their attic every single month." Editorial decision, don't change without approval.
- **Stat values** — 15%, 90%+, R-49, 100%+ — sourced from EPA/DOE/Cost vs Value. Don't alter.
- **Thermal overlay** hidden on mobile — permanent. Requires mouse. Not a responsive feature gap.
- **Nav.js** — locked. Do not touch under any circumstances.
