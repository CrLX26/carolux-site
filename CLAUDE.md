@AGENTS.md

---

# Carolux Pro Website — Session State

**Project:** Carolux Insulation LLC marketing website
**Framework:** Next.js 16.2.6 (App Router, Turbopack)
**Repo:** https://github.com/CrLX26/carolux-site.git
**Local path:** `H:\Claude Code Folders\Carolux Pro Website\carolux-site`
**Dev server:** `npm run dev` → http://localhost:3000
**Current branch:** `mobile-fixes` (pushed to GitHub, NOT merged to main)

---

## What Has Been Built

### Pages
| Route | File | Status |
|---|---|---|
| `/` | `app/page.js` | Complete, renders all sections |
| `/design-reference` | `app/design-reference/page.js` | Complete, internal tool only |

### Components (all in `app/components/`)
| Component | Status | Notes |
|---|---|---|
| `Nav.js` | Complete | **DO NOT TOUCH** — user hard constraint |
| `Hero.js` | Complete | Desktop + mobile fixed. See Known Issues for remaining verification |
| `Stats.js` | Complete | Desktop scroll-scrub + mobile autoplay/IntersectionObserver |
| `Services.js` | Complete | Static section |
| `WhyUs.js` | Complete | Static section |
| `Packages.js` | Complete | 3-column pricing cards |
| `Reviews.js` | Complete | 3 customer reviews |
| `Contact.js` | Complete | Contact form section |
| `Footer.js` | Complete | Footer with links |

### Supporting Files
| File | Purpose |
|---|---|
| `app/lib/content.js` | **All copy lives here.** NEVER hardcode copy in components — always import from here |
| `app/lib/schema.js` | LocalBusiness JSON-LD schema for SEO |
| `app/layout.js` | Root layout, font loading, metadata, schema injection |
| `app/globals.css` | Single line: `@import "tailwindcss";` |
| `.claude/launch.json` | Preview tool config — runs `npm run dev` on port 3000 |

---

## How the Hero Scroll Tunnel Works

Hero uses the "scroll tunnel" pattern from Tresmares Capital:

```
<div ref={heroRef} style={{ minHeight: "145vh" }}>   ← outer, creates scroll space
  <div ref={stickyRef} style={{ position: "sticky", top: 0, height: "100svh" }}>
    ...all visual content...
  </div>
</div>
```

`useScroll({ target: heroRef, offset: ["start start", "end end"] })` gives `scrollYProgress` 0→1.

### Scroll-driven MotionValues (LOCKED — do not change these):
```js
imageScale         = useTransform(scrollYProgress, [0, 1],              [1, 1.08]);
imageOpacity       = useTransform(scrollYProgress, [0, 0.45, 0.90, 1], [1, 1, 0, 0]);
heroContentOpacity = useTransform(scrollYProgress, [0.05, 0.26],        [1, 0]);
heroContentY       = useTransform(scrollYProgress, [0.05, 0.30],        [0, -1100]);
bridgeY            = useTransform(scrollYProgress, [0.34, 0.90, 1.0],   [320, 0, 0]);
tealLineOpacity    = useTransform(scrollYProgress, [0.44, 0.58],        [0, 1]);
```

**Critical Framer Motion rule:** `y` values in `useTransform` MUST be unitless numbers (e.g. `[0, -1100]`), NOT strings (e.g. `["0px", "-1100px"]`). Strings silently fail — no error, no animation.

### What happens on scroll down:
1. Primary content (headline, subhead, CTAs, trust badges) fades out and slides up (0.05→0.30)
2. Bridge text ("Most Charlotte homes…") slides up from below viewport (0.34→0.90)
3. Hero image fades out (0.45→0.90)
4. When bridge text reaches center, Stats section starts appearing immediately below

### Thermal Reveal (desktop only — `hidden md:block`):
- Mouse position tracked via `window.addEventListener("mousemove")`
- Radial gradient mask (180px radius) reveals thermal image and orange-gradient text at cursor
- Edge fade: opacity drops to 0 within 150px of sticky panel boundary
- Full thermal overlay wraps in `className="hidden md:block"` — intentionally hidden on mobile

---

## Stats Section Architecture

```
<div ref={containerRef} style={{ height: isTouch ? "100svh" : "250vh" }}>
  <div ref={sectionRef} style={{ position: "sticky", top: 0, height: "100svh" }}>
    <video ref={videoRef} src="/videos/insulation-burst-bg-scrub.mp4" />
    ...4 stat elements with refs stat1Ref→stat4Ref...
  </div>
</div>
```

**Desktop:** `scrollYProgress.on("change")` scrubs video (`currentTime = v * 3`) and reveals stats.
- SHOW thresholds: `[0.15, 0.35, 0.55, 0.75]` — takes 0.60 of scroll range going down
- HIDE thresholds: `[0.45, 0.55, 0.65, 0.75]` — takes 0.30 of scroll range going up (half as fast to dismiss)
- `shownRef` tracks which stats are visible for asymmetric behavior

**Mobile (touch):** Video autoplays + loops. Stats revealed via `IntersectionObserver`. Container collapses to `100svh` (no scroll tunnel needed).

**Touch detection:** `useSyncExternalStore` with `window.matchMedia("(pointer: coarse)")` — SSR-safe, no hydration mismatch.

---

## Design System

### Brand Colors
```
Teal:           #4a90a4  — primary CTA, accent lines, teal line, badge numbers
Cream:          #faf8f5  — page background, edge fades
Navy:           #1a2b3c  — headings, body text, stat numbers
Thermal Orange: #ff4400  — thermal overlay accent
Thermal Amber:  #ff8800  — thermal gradient
Thermal Gold:   #ffcc00  — thermal highlight
```

### Typography (Google Fonts, loaded in layout.js via `next/font/google`)
```
CSS Variable          Font                  Role
--font-dm-sans        DM Sans               Body, UI, labels, CTAs
--font-cormorant      Cormorant Garamond    Display headlines, italic bridge text, badge counters
--font-jakarta        Plus Jakarta Sans     Stat numbers only
```
No font files in `public/fonts/` — all loaded from Google Fonts at build time via Next.js font optimization.

### Key Design Patterns Borrowed
- **Tresmares Capital** (`C:\Users\jcx20\.claude\skills\tresmarescapital-design`): Scroll tunnel, Framer Motion page-enter animations, staggered clip-path headline reveal, eyebrow label style, grain overlay, edge fades, 4px spacing grid, EASE constant `[0.16, 1, 0.3, 1]`
- **SweepingCorp** (`C:\Users\jcx20\.claude\skills\sweepingcorp-design`): Scroll-scrubbed video, floating giant stat numbers, asymmetric reveal/hide pattern, canvas particle concept

---

## Dependencies

### Runtime
```json
"next": "16.2.6"
"react": "19.2.4"
"react-dom": "19.2.4"
"framer-motion": "^12.39.0"
```

### Dev
```json
"tailwindcss": "^4"
"@tailwindcss/postcss": "^4"
"eslint": "^9"
"eslint-config-next": "16.2.6"
```

### NOT installed
- `three` / Three.js — not installed. Canvas glow in design-reference is CSS-only approximation.

### AI Skills / Plugins (global — `C:\Users\jcx20\.claude\`)
```
skills/tresmarescapital-design   — Tresmares Capital design system (colors, typography, motion, components)
skills/sweepingcorp-design       — SweepingCorp design system
plugins/cache/impeccable         — Impeccable UI/UX plugin (craft, shape, audit, polish, animate etc.)
plugins/cache/ui-ux-pro-max-skill — UI/UX Pro Max plugin (50+ styles, 161 color palettes, accessibility rules)
```

### Project-level skills (`H:\Claude Code Folders\Carolux Pro Website\carolux-site\.claude\skills\`)
```
design-taste-frontend            — Design taste/quality skill
```

---

## Public Assets

### Images (`public/images/`)
```
house-normal6.webp    — CURRENT hero image (used in Hero.js)
house-normal5.webp    — Previous hero image (kept, not used)
house-thermal2.png    — Older thermal image
house-thermal3.png    — Older thermal image
house-thermal4.webp   — CURRENT thermal overlay image (used in Hero.js)
```
Also in `public/` (loose, legacy): various `.png` screenshots, `D2 UP.png`, `D8 UP.png` — not used in site.

### Videos (`public/videos/`)
```
insulation-burst-bg-scrub.mp4   — Main stats video (desktop scroll-scrubbed)
insulation-burst-bg.mp4         — Alt video (not currently used)
```

### Fonts
No files in `public/fonts/` — Google Fonts loaded via `next/font/google`.

---

## Git State

```
main branch:         3 commits
mobile-fixes branch: 5 commits — current working branch, pushed to GitHub
```

### Commit history (mobile-fixes, newest first):
```
22573e9  docs: update CLAUDE.md with complete project state
3fab8e6  fix: mobile hero layout — headline overflow and bridge text wrapping
42b2ed1  fix: show hero image on mobile — remove hidden md:block, add text-contrast scrim
0ab8fdf  Clean up .gitignore line endings
37a3a8f  Initial commit — Carolux Pro website
```

**Important:** `app/design-reference/` is **untracked** (listed as `??` in git status). It exists on disk and works at `/design-reference` in dev but has NOT been committed to any branch.

---

## Mobile Fixes Applied (mobile-fixes branch)

All code changes are done. Needs real-phone testing before merging to main.

### What was fixed:
| Issue | Fix | Commit |
|---|---|---|
| Hero image hidden on mobile | Removed `hidden md:block` from sketch image div | `42b2ed1` |
| Added cream contrast scrim | `className="md:hidden"` gradient over image | `42b2ed1` |
| Headline overflows on narrow screens | Font clamp min: `4.5rem → 3rem` (48px at 390px) | `3fab8e6` |
| Bridge text wraps too aggressively | Container width: `65% → 88% on mobile, 65% on md+` | `3fab8e6` |

### What still needs real-phone verification:
- **Hero image** renders on iOS Safari at 390px (was hidden before `42b2ed1`)
- **Bridge text** reads comfortably at 3 lines instead of 4+
- **Stats autoplay** — video plays on iOS (muted + playsInline present, should work)
- **IntersectionObserver** stat reveals fire correctly on mobile scroll
- **Nav** renders without overlap (do not touch Nav.js — observation only)

### How to test on a real phone:
```bash
npm run dev           # start dev server on port 3000
npx localtunnel --port 3000   # run as background process
# opens a loca.lt URL — the IP address shown at that page IS the password
```
Alternatively: Vercel auto-deploys every push. Check Vercel Dashboard for preview URL.
Note: Vercel preview deployments may require login — disable in Vercel → Settings → Deployment Protection.

---

## Known Issues

### 1. Mobile display — FIXED in code, needs phone verification
See "Mobile Fixes Applied" table above.

### 2. Thermal reveal — intentionally desktop-only
`hidden md:block` on the thermal overlay `motion.div` is correct and intentional. Thermal requires a mouse cursor. Not a bug.

### 3. Mouse parallax on mobile
`window.addEventListener("mousemove")` never fires on mobile. Image stays flat at `translate(0px, 0px)`. Acceptable — no touch parallax equivalent has been implemented.

### 4. Design Reference Page — Not Committed
`app/design-reference/` is untracked. Works in dev at `/design-reference`. Should be committed separately as a dev-only tool.

### 5. Very small phones (iPhone SE 1st gen, 568px tall)
`minHeight: "720px"` on the sticky hero panel means the panel is taller than the viewport on 568px screens. Trust badges may be clipped. Intentional trade-off — not worth fixing for such old hardware.

---

## Rules — NEVER Violate These

1. **DO NOT touch `Nav.js`** — user has explicitly locked it
2. **DO NOT hardcode copy** — all text content goes in `app/lib/content.js`, import from there
3. **Read `node_modules/next/dist/docs/`** before writing new Next.js code (AGENTS.md rule) — this is Next.js 16 with breaking changes from what training data knows
4. **`y` values in Framer Motion `useTransform` must be unitless numbers** — NOT strings. `[0, -1100]` ✓, `["0px", "-1100px"]` ✗ (silent failure)
5. **Locked hero scroll values** — do not change `heroContentOpacity`, `heroContentY`, `imageScale`, `imageOpacity`, `bridgeY`, `tealLineOpacity` MotionValues

---

## Next Task

**Test on a real phone, then merge to main.**

1. Start dev server: `npm run dev`
2. Expose with localtunnel: `npx localtunnel --port 3000`
3. Open on phone, enter the IP shown on the loca.lt page as the password
4. Verify all items in the "needs real-phone verification" list above
5. If everything looks good:
   ```bash
   # On GitHub: open a PR from mobile-fixes → main and merge
   # Or locally:
   git checkout main
   git merge mobile-fixes
   git push origin main
   ```
6. **Do NOT merge to main without user review.**

---

## Design Reference Page

Internal tool at `/design-reference` (not linked from navigation). Shows:

- **Color System** — Carolux, Tresmares, SweepingCorp palettes (click-to-copy hex)
- **Typography** — Cormorant Garamond, DM Sans, Plus Jakarta Sans specimens
- **Spacing & Grid** — 4px base grid visual scale
- **Components — In Use** — Live demos of all elements currently used on the site
- **Motion & Scroll Patterns** — Animation cards with token references + easing visualizer
- **Textures & FX** — Grain, edge fades, mobile scrim, thermal radial reveal
- **Tresmares Library** — All Tresmares patterns not yet used on Carolux (cards, ghost button, input, badge, table, char reveal, underline link, pulse dot, gradient shift, overlay menu, submenu card, long-ease demo, center display block)
- **SweepingCorp Library** — All SweepingCorp patterns not yet used on Carolux (square button, ripple CTA, logo reel, scroll mouse indicator, clip-path reveal, spring overshoot easing, dark card, video hover card, covered section grid, canvas glow background)

Source tags: Orange = Tresmares, Green = SweepingCorp, Teal = Carolux.
Sidebar with 8 sections. All interactive demos (click-to-copy, ripple, char replay, video hover, overlay menu, input focus).

**File NOT committed** — must be staged manually if you want it in git.

---

## Vercel Deployment

- Connected to GitHub repo `CrLX26/carolux-site`
- Auto-deploys: every push to any branch gets a preview URL
- **Preview deployments require Vercel login by default** — disable in Vercel Dashboard → Settings → Deployment Protection for unauthenticated phone testing
- Production URL (main branch): to be confirmed after first main deploy

---

## Quick Start for a New Session

```bash
# 1. Navigate to project
cd "H:\Claude Code Folders\Carolux Pro Website\carolux-site"

# 2. Confirm branch
git branch       # should show * mobile-fixes
git status

# 3. Start dev server
npm run dev      # → http://localhost:3000

# 4. For phone testing
npx localtunnel --port 3000   # run as background process
# loca.lt page shows an IP address — enter it as the password

# 5. Read Next.js docs if doing anything framework-level
# node_modules/next/dist/docs/
```
