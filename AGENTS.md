# CAROLUX PRO WEBSITE — AGENTS.md
## Read this file at the start of every session. Every decision made here is permanent until explicitly changed.
*Last updated: June 2026*

> **🔗 Cross-project source of truth & doc map:** `D:\Documents\-- Carolux\CAROLUX_DOCS_INDEX.md`. **Shared invariants — keep site copy consistent:** **2-year** warranty; **Tony = FORMER NC home inspector — never "licensed"**; company is **"insured," not "licensed"** (trust bar = "Insured" only); never the word **"mold"**; **no spray foam**; no exact-$ savings (% + "results vary" only); never knock competitors. Pricing truth = estimator code → `PRODUCTS.md` → pricing guide v5 ($1.50/$1.75/$1.95 all-in). Other projects' docs → the index.

---

## WHAT THIS PROJECT IS

The new Carolux Insulation marketing website — a Next.js App Router single-page
site built to replace the current Wix site at caroluxinsulation.com. Currently
hosted at a Vercel preview URL (not yet connected to the real domain).

The current live site at caroluxinsulation.com is on Wix and must NOT be touched.
The new site goes live when it is ready by pointing the domain DNS to Vercel.

**Design reference page (internal only — not linked in nav):**
https://carolux-site-g0kscstwv-carolux.vercel.app/design-reference
This page contains all design elements, components, and references used across
Carolux, Tresmares Capital, and Sweeping Corp. Reference it for visual consistency.

**Companion project:** carolux-tools (the AI estimator app) is a separate project
at a separate Vercel URL. Do not mix these two projects.

---

## TECH STACK

- Framework: Next.js App Router (CRITICAL — check node_modules/next/dist/docs/
  before writing any Next.js code — API may have breaking changes from training data)
- Styling: Tailwind CSS
- Language: JavaScript (not TypeScript)
- Hosting: Vercel, auto-deploy from GitHub on push to main branch
- Current repo: github.com/CrLX26/carolux-site

**File structure:**
- app/ — all page sections as individual components
- app/lib/content.js — all site content data
- app/lib/schema.js — Schema.org structured data
- public/images/ — before/after job photos and brand assets
- .agents/skills/ — project-level skills (design-taste-frontend installed here)

---

## SKILLS — USE THESE ON EVERY SESSION

Read and apply skills in this order before any UI or design work:

1. **impeccable** (global) — primary design system, use for all component styling
2. **ui-ux-pro-max** (global) — UX decisions and layout structure
3. **design-taste-frontend** (.agents/skills/) — aesthetic judgment and taste calibration
4. **brand** (global via impeccable) — brand consistency checks

Reference design systems (inspiration and cross-reference only):
- **tresmarescapital-design** (global) — premium financial brand reference
- **sweepingcorp-design** (global) — service business brand reference

**Never produce UI output without consulting impeccable and design-taste-frontend
first. These are not optional. Always invoke them explicitly before writing CSS
or component code.**

---

## COMPANY INFORMATION

| Field | Detail |
|-------|--------|
| Business Name | Carolux Insulation LLC |
| Owners | Tony Kermis & Juan Gonzalez — Equal Co-Owners (50/50) |
| Phone | (704) 228-2729 |
| Email | team@caroluxinsulation.com |
| Website | caroluxinsulation.com |
| LLC State | North Carolina |
| Business Type | Residential Insulation Contractor |
| Stage | Startup — building first client base |

**Tony Kermis:** FORMER NC home inspector — NEVER describe him as "licensed" (he is
not currently licensed; claiming so is a legal problem). Technical insulation
expertise. Not technical with software. His former-inspector background gives Carolux
a technical edge most insulation companies lack — use this in copy (always "former").

**Juan Gonzalez:** Strong customer service and operations experience. Driving
the technology and AI vision for the company.

**Key differentiators to communicate on the website:**
- Owner-operated — an owner or directly supervised team member on every job
- Tony's home inspector background — technical credibility
- Air sealing included at no extra charge on full installs (new installs & full removals); NOT auto-included on top-off/blow-over jobs — disclose. Never say "always included." Approved claim: "Air sealing included with every full insulation install, at no extra charge." (most competitors skip it or charge extra)
- Americover vapor barriers — American-made with virgin resins, not hardware store poly
- Insured — NOT licensed (NC doesn't require a license at our job sizes; never say "licensed")
- 2-year workmanship guarantee on all work
- Free estimates, written same day
- Transparent pricing — price quoted is price paid, no surprise charges

---

## SERVICE AREA

Charlotte, Huntersville, Pineville, Concord, Harrisburg, Belmont, Cramerton,
Gastonia, Lowell, Mount Holly, Stanley, Matthews, Mint Hill.

SC expansion (Fort Mill, Rock Hill, Tega Cay, Indian Land) planned after
12 months of NC operations — do not mention on the website yet.

---

## SERVICES OFFERED

| Service | Description |
|---------|-------------|
| Blown-In Attic Insulation (New Install) | Always includes air sealing |
| Blown-In Attic Insulation (Replacement) | Remove old + replace, always includes air sealing |
| Blown-In Attic Insulation (Top-Off) | Blow over existing — air sealing may not be possible, always disclose |
| Crawl Space Batt Insulation | Fiberglass batt between floor joists |
| Vapor Barrier Installation | Americover vapor barrier on crawl space ground |
| Attic Air Sealing | Seal all accessible penetrations before insulating |

**We do NOT offer spray foam. Never mention it.**

---

## BRAND VOICE

Warm, professional, confident. Never salesy. Never pushy. Customers feel they
are dealing with experts who genuinely live and work in their community.

- Use the customer's perspective — "your home," "your attic," "your energy bill"
- Reference Charlotte specifically — local language, local references
- Never over-promise energy savings — say "up to 15%" not "you will save X dollars"
- Always caveat energy savings: "Every home is different. Results vary."
- Never use the word "mold" — always "biological growth" or "moisture-related issues"
- Owner-operated is a core message — repeat it naturally, not mechanically

---

## DESIGN DNA — READ AND FOLLOW ON EVERY DESIGN DECISION

### The One-Line Brief
"Premium Charlotte contractor with luxury-home aesthetics, documentary realism,
clean typography, and conversion-focused trust."

Think: High-end home performance company meets luxury architectural photography
meets direct-response marketing.
NOT: HVAC postcard with stars and coupons.

### What Carolux Design IS
- Premium and expensive-looking
- Modern luxury contractor feel
- Clean confidence — understated, not flashy
- Trust-first — real people, real work, real attics, real results
- Documentary realism — believable, slightly imperfect, not staged
- Strong single hierarchy — one dominant message per section
- Cinematic — dark navy, clean white, warm orange accent used sparingly
- Conversion-focused — every design decision must answer "will this get jobs booked?"
- Exact and precise — no "close enough," no distorted logos, no wrong proportions

### What Carolux Design IS NOT
- Generic contractor or coupon mailer
- Cheesy, overdesigned, or cluttered
- Fake stock images or CGI houses
- Oversaturated gradients or loud colors
- Too flashy, too busy, too dramatic
- Information overload — always aim for 30% less text than first instinct

### Color System
- Primary accent: Teal #4a90a4 — CTAs, nav hover, accent lines, badge numbers, stat rules
- Background: Cream #faf8f5 — page background, edge fades, nav
- Headings / body: Navy #1a2b3c — headings, body text, stat numbers
- Thermal orange: #ff4400 / amber #ff8800 / gold #ffcc00 — thermal reveal only, never general UI
- Text: Near-black #2C2C2C (never pure black)
- Borders: Soft #d0cec8
- Apply: Soft gradients, premium spacing, subtle depth
- Never: Oversaturated gradients, random accent colors

### Typography
- Strong hierarchy — one dominant message per section
- Large headline, small supporting text
- Restrained — never competing type sizes
- Clean sans-serif throughout
- 30% less text than your first draft — always trim

### Photography & Imagery
- Real before/after attic photos beat stock every time
- Documentary lighting — slightly imperfect, believable
- The customer's own attic photo in proposals = personalization no competitor matches
- Never: fake CGI houses, generic stock contractor imagery

### Layout Principles
- One dominant message per section
- Generous whitespace — premium feels spacious
- Subtle depth — light shadows, layered cards
- Deterministic layout — locked positions, not AI reinterpretation
- Never: cluttered, competing elements, walls of text

### Conversion Design Principles
- Before/after framing — show the problem, show the solution
- Hidden problem psychology — "your home is losing heat right now"
- Energy bill messaging — make the cost of inaction visible
- Trust signals — guarantee badge, owner photos, review stars
- Single clear CTA per section — not multiple competing actions

---

## SEO & AEO ARCHITECTURE — NON-NEGOTIABLE

Every architectural decision must support long-term SEO and AEO (Answer Engine
Optimization) dominance in the Charlotte NC residential insulation market.

### Semantic HTML
- Proper heading hierarchy on every page — one H1, logical H2/H3 structure
- Landmark elements throughout (header, main, nav, footer, section, article)
- Descriptive alt text on every image — specific, not generic
- Never use divs where semantic elements apply

### Schema.org Structured Data
- LocalBusiness schema — always current, matches Google Business Profile exactly
- Service schema — one per service offered
- FAQPage schema — on any page with Q&A content
- Review schema — when reviews are displayed
- All schemas maintained in app/lib/schema.js
- NAP (Name, Phone, Email, Website) must match exactly everywhere:
  Carolux Insulation LLC | (704) 228-2729 | team@caroluxinsulation.com | caroluxinsulation.com
- No physical address published — use areaServed in LocalBusiness schema instead

### Page Speed — Core Web Vitals Must Stay Green
- No unnecessary JavaScript — server components for all indexable content
- Images: WebP format, optimized, lazy loading on all below-fold images
- Client components only for interactive UI elements
- No heavy animations that block rendering
- Test Core Web Vitals before every deploy

### AEO Readiness (Answer Engine Optimization)
- Content written in question-and-answer format where possible
- FAQ sections on relevant pages answering what Charlotte homeowners actually search:
  - "What is R-49 insulation?"
  - "How much does attic insulation cost in Charlotte NC?"
  - "Do I need a vapor barrier in my crawl space in North Carolina?"
  - "How long does attic insulation last?"
  - "What R-value do I need in Charlotte NC?"
  - "Is attic insulation worth it?"
- Direct, specific answers — not vague marketing language
- Cite authoritative sources (DOE, EPA, ENERGY STAR) where relevant

### Local SEO
- Every page references Charlotte NC and service area cities naturally
- Never keyword-stuff — integrate city names in context
- NAP consistent everywhere and matching Google Business Profile exactly
- Service area cities listed naturally in content and footer

### Meta Tags — Every Page
- Unique title tag (50-60 characters)
- Unique meta description (150-160 characters)
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter card tags
- Canonical URL

### URL Structure
- Current: single page site
- Future pages follow: /services/attic-insulation, /locations/charlotte-nc, /blog/
- Clean descriptive URLs — no parameters, no underscores

### Content Architecture
- Server components for all indexable content (Next.js App Router default)
- Client components only where interactivity is required
- Blog/resource section planned — architecture must support adding it without restructuring
- Internal linking planned from day one — service pages will link to each other
  and to location pages when added

---

## MOBILE — SEPARATE DESIGN SURFACE

Mobile is not a scaled-down desktop. It is a completely separate design surface
that requires its own decisions.

**Mobile status (mobile-fixes work is merged & live):**
- Hero: mobile shows static image + headline; thermal/mouse effects are desktop-only (by design)
- Hero image loads on mobile; Stats video autoplays/loops on mobile (muted + playsInline)
- Stats: Chromium desktop scroll-scrubs the video; Firefox / reduced-motion / low-memory
  fall back to a plain autoplay-loop (the per-frame seeking stutters there)

**Mobile design principles:**
- Strong static hero image with powerful headline does the work the desktop
  animation was doing
- Scroll-triggered animations instead of mouse-tracking effects
- Every tap target minimum 44x44px
- Test on real phone before merging any branch to main
- Use branch preview URL from Vercel for real-device testing

**Git workflow for mobile:**
- All mobile changes in mobile-fixes branch
- Stash uncommitted changes before switching branches
- Preview URL auto-generated by Vercel for each branch
- Merge to main only after real-phone verification

---

## GIT & DEPLOYMENT WORKFLOW

- Main branch: production — auto-deploys to Vercel on push
- Feature branches: all new work — merge to main after review
- Always branch before making changes: git checkout -b feature-name
- Never commit directly to main
- Stash uncommitted changes before switching branches
- Deploy command if needed manually: vercel --prod --yes

**Current state (2026-06-09):**
- ✅ MERGED: the mobile hero scroll-sequence rebuild (pinned tunnel: text rise/fade →
  house cross-fades into a looping bright sky video w/ centered sun → word-by-word
  alert → cool to cream) is **merged to `main` via PR #4** and deploying to Vercel
  production. **See CLAUDE.md "CURRENT HANDOFF" block — it is authoritative.**
- 🔴 ACTIVE: branch `hero-polish` (design lane) — kept open for continued hero work,
  fast-forwarded to the PR #4 merge so it's level with `main`. Self-verify with the
  Playwright scripts in `scripts/` (`mshot`, `perf`, `vidcheck`, `bleedcheck`, …).
- `main` — production, live. Contains all work to date: design polish, growth-levers
  batch (estimator, before/after, conversion copy, legal fixes), privacy-policy page,
  Firefox scrub fallback, the copy-polish hero changes, and the mobile hero sequence.
- THREE active worktrees: `carolux-site` (design), `carolux-seo`/`seo-foundation` (SEO),
  `carolux-copy`/`copy-polish` (wording). The design lane's active branch changes over
  time (currently `hero-polish`). See memory: worktree-split for the full lane rules.
- Legacy merged branches: mobile-fixes, design-polish, growth-levers-experiment,
  conversion-text-buttons, perf-scrub-firefox-fallback, privacy-policy-page.

---

## CURRENT SITE STRUCTURE

ALL sections are fully designed/built (the "unstyled placeholder" notes below are obsolete).
See CLAUDE.md for the authoritative, current component list. Page order in app/page.js:
Hero → Stats → Estimator → Services → BeforeAfter → Process → WhyUs → Packages → Owners →
Reviews → ServiceArea → Contact → Footer. Plus Nav, SmoothScroll, sectionKit (shared kit).
Routes: `/` and `/privacy-policy` (server-rendered legal page) and `/design-reference` (internal).

Components in app/components/:
- Nav, Hero, Stats (Chromium scroll-scrub video; Firefox/low-power fallback to autoplay-loop)
- Estimator (savings calc; email capture is a STUB — no backend yet)
- Services (3 services), BeforeAfter (drag slider), Process, WhyUs (4 pillars), Packages
- Owners (real Tony & Juan photos — Tony = FORMER inspector), Reviews (PLACEHOLDER copy),
  ServiceArea (13 cities), Contact (Text Us button gated behind smsEnabled), Footer, SmoothScroll

Content data: app/lib/content.js
Schema data: app/lib/schema.js
Job photos: public/images/
Videos: public/videos/

---

## WHAT NOT TO BUILD

- Spray foam anything — not a service Carolux offers
- SC service area pages — not yet, planned after 12 months NC operations
- Exact dollar savings promises — always use percentages and "results vary"
- Anything that breaks Core Web Vitals green status
- Client-side rendering for content Google needs to index
- Physical address anywhere on the site or in schema

---

## DESIGN REFERENCE URLS

- Design reference page: https://carolux-site-g0kscstwv-carolux.vercel.app/design-reference
- Current preview site: https://carolux-site-g0kscstwv-carolux.vercel.app
- Carolux tools app (companion project): https://carolux-tools.vercel.app

---

## CLOSEST AESTHETIC REFERENCES

- Luxury architectural brand
- Premium real estate photography company
- Upscale home performance company
- High-end home inspector report design
- Premium contractor proposal — not a home service flyer

---

## CAROLUX PROPOSAL PAGE — CURRENT STATE HANDOFF

The customer-facing proposal page is a React component (`src/components/ProposalPage/index.jsx`) deployed at carolux-tools.vercel.app/proposal/demo. It lives in the carolux-tools repo, separate from the marketing website.

**What it is:** A shareable URL sent to homeowners after an in-home assessment. It replaces the generic contractor PDF with a personalized digital proposal. The page renders entirely from a data object produced by Agent 2 — it invents nothing.

**Current design state:** Two branches exist — `proposal-redesign-2` (full navy) and `proposal-cream-variant` (navy hero/CTA, cream body sections). The cream variant is the leading candidate for merge to main. Neither is merged yet.

**Page sections in order:**
1. Hero — house exterior photo, client name, address, Juan and Tony headshots
2. Trust strip — 4 badges
3. R-value gap display — R-current → R-49, with counter animation pending
4. Video/findings section — Loom placeholder + Quick Findings Snapshot widget
5. Photo evidence grid — real job photos with deterministic captions
6. Scope section — line items with reason text, no prices, air sealing callout card
7. Before/After — "See The Work", example photos from Ballantyne/SouthPark, slider pending
8. Investment — "What It Costs", headline total, line items, "Included In Your Plan" checklist, payment badges pending
9. Payback calculator — monthly electric bill input, DOE-sourced savings estimate
10. Why Carolux — four-point differentiator section
11. Image transition strip — job-site photo of Juan and Tony (photo not yet taken)
12. CTA section — dark navy, reserve install date
13. Footer

**Brand:** Deep navy `#0a1626`, warm gold `#c8a24c`, cream body `#f6f3ec`. Cormorant Garamond display, DM Sans body. Inline styles only on this component — no Tailwind.

**Key decisions locked:**
- All pricing and line items are deterministic JavaScript — Claude never generates numbers
- Air sealing callout card and checklist item are conditional on `pd.airSealingIncluded`
- Before/after shows based on `jobType` using example photos until job completion flow is built
- Warranty is 2 years throughout
- Never speak negatively about competitors in any copy
- Never use the word "mold" — always "biological growth"

**Approved Why Carolux copy — use exactly as written:**

> 01 — You're dealing with the owners, every time.
> Tony and Juan personally oversee every job from assessment to completion. The person who walked your home is the person accountable for the work. That accountability is the whole model.
>
> 02 — Our price reflects how we're built.
> No franchise fees, no subcontractors, no overhead. We built Carolux around technology and efficiency at every stage — from the moment you call us to the day your job is complete. That's why our price is competitive and our standard is high.
>
> 03 — Air sealing is included, not upsold.
> Most contractors skip it or charge extra. We include it on every full installation because without it, insulation underperforms. It's the highest-impact step in the job and the one that separates a real upgrade from a temporary fix.
>
> 04 — Everything is guaranteed.
> All work carries a 2-year workmanship guarantee. If anything isn't right, we come back and fix it. No runaround, no service ticket. You call us directly.

**Immediate items still pending before merge:**
- Before/after slider (react-compare-slider)
- Example photos named correctly in /public
- R-value counter animation
- Payment badges
- Playwright scenarios 3, 4, 5
- Why Carolux copy updated to approved version above
- Deposit display bug fixed

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
Link text color shifts from `#374151` to `#4a90a4` over 150ms ease via inline style driven by the same `hovered` state. Desktop only.

**4. Desktop phone number color on hover**
Inline `onMouseEnter/Leave` handlers directly mutate `e.currentTarget.style.color` between `#374151` and `#4a90a4`. 150ms ease CSS transition. Desktop only.

**5. Desktop CTA button lift on hover**
"Free Estimate" button: `onMouseEnter` applies `background: #3d7d90` (darken) + `transform: translateY(-1px)`. `onMouseLeave` resets both. Transition: `background 150ms ease, transform 150ms ease`. Desktop only.

**6. Hamburger → X morphing animation**
Three `motion.span` bars animate on `open` state toggle. Top bar: `rotate: 45, y: 7` (220ms easeOut). Middle bar: `opacity: 0` (180ms). Bottom bar: `rotate: -45, y: -7` (220ms easeOut). Framer Motion `animate` prop driven by the `open` boolean. Reverses on close. Mobile only.

**7. Mobile drawer slide-in**
Full-screen white overlay below the header, managed by `AnimatePresence`. Enter: `opacity: 0, y: -8` → `opacity: 1, y: 0`. Exit: same in reverse. Duration 220ms easeOut. Triggered by hamburger tap. Mobile only.

**8. Mobile drawer link stagger**
Each link enters with `initial={{ opacity: 0, x: -10 }}` → `animate={{ opacity: 1, x: 0 }}`, delay `i * 0.06s` (60ms per item). Duration 220ms easeOut. Fires each time the drawer opens. Mobile only.

**9. Body scroll lock**
`document.body.style.overflow = "hidden"` set when drawer is open — prevents page scrolling behind it. Cleaned up on close and on unmount. Mobile only.

**10. Sticky mobile bottom bar**
Fixed bar at the bottom of the viewport with "Call Us" and "Get Estimate" split buttons. Static — no animation. Always visible on mobile. Mobile only (`flex md:hidden`).

---

### HERO.JS

**11. Grain texture overlay**
SVG `fractalNoise` data URI (`baseFrequency: 0.75`, 4 octaves) tiled at 200×200px, `opacity: 0.55`, `mixBlendMode: "multiply"` over the entire sticky panel. Static. Creates film-grain paper texture. Both desktop and mobile.

**12. Headline clip-path reveal on page load**
Each of the three headline words is wrapped in a `div` with `clipPath: "inset(0 -9999px)"`. Inside, a `motion.span` starts at `y: "112%"` and animates to `y: 0`. Duration 1.1s, EASE `[0.16, 1, 0.3, 1]`. Stagger: `delay: 0.12 + i * 0.1` (100ms per line). Fires once on mount. Both desktop and mobile.

**13. Eyebrow label fade-in**
`motion.div`. `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`. Duration 0.8s, EASE, delay 0.05s. Both desktop and mobile.

**14. Subheading fade-in**
`motion.p`. `initial={{ opacity: 0, y: 14 }}` → `animate={{ opacity: 1, y: 0 }}`. Duration 0.9s, EASE, delay 0.52s. Both desktop and mobile.

**15. CTAs fade-in**
`motion.div`. `initial={{ opacity: 0, y: 12 }}` → `animate={{ opacity: 1, y: 0 }}`. Duration 0.9s, EASE, delay 0.62s. Both desktop and mobile.

**16. Trust badges fade-in**
`motion.ul`. `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`. Duration 0.8s, EASE, delay 0.82s. Both desktop and mobile.

**17. Scroll indicator pulsing line**
Appears at bottom-left after 1.4s delay. A `motion.div` line loops `scaleY: [0.1, 1, 0.1]` over 2.8s easeInOut, infinitely. Both desktop and mobile.

**18. Hero scroll tunnel — content fade + slide up** *(LOCKED — do not change)*
`heroContentOpacity = useTransform(scrollYProgress, [0.05, 0.26], [1, 0])` and `heroContentY = useTransform(scrollYProgress, [0.05, 0.30], [0, -1100])`. Content block fades and slides up as user scrolls. Scroll-driven via Framer Motion MotionValue. Both desktop and mobile.

**19. Hero image scroll scale (Ken Burns)** *(LOCKED)*
`imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])`. Subtly zooms the image 8% over the full scroll range. `transformOrigin: "right center"`. Both desktop and mobile.

**20. Hero image scroll fade** *(LOCKED)*
`imageOpacity = useTransform(scrollYProgress, [0, 0.45, 0.90, 1], [1, 1, 0, 0])`. Image holds full opacity until 45% progress, fades out by 90%. Both desktop and mobile.

**21. Mouse parallax on hero image**
`window.addEventListener("mousemove")` tracks cursor relative to sticky panel. Offset mapped to ±20px max. Applied as `transform: translate(${x}px, ${y}px)`, `transition: "0.15s ease-out"` on inner image wrapper. Same offset on thermal image simultaneously. Desktop only (mousemove never fires on mobile).

**22. Bridge text scroll-in** *(LOCKED)*
`bridgeY = useTransform(scrollYProgress, [0.34, 0.90, 1.0], [320, 0, 0])`. Bridge text starts 320px below final position, scrolls into viewport center. Scroll-driven. Both desktop and mobile.

**23. Teal vertical line below bridge text** *(LOCKED)*
`tealLineOpacity = useTransform(scrollYProgress, [0.44, 0.58], [0, 1])`. 1px × 40px teal line fades in as bridge text settles. Scroll-driven. Both desktop and mobile.

**24. Thermal image reveal on mouse**
Full-viewport `motion.div` (z-index 20). A `radial-gradient(circle 180px at ${x}px ${y}px, ...)` mask on the container reveals the thermal house image and orange-gradient copy at the cursor position. Triggered by mousemove. Desktop only (`hidden md:block` — intentional, not a bug).

**25. Thermal edge fade**
Thermal overlay opacity = `minDist / 150` where `minDist` is cursor distance from nearest sticky panel edge. Fades to 0 within 150px of any edge. `transition: "opacity 150ms ease-out"`. Desktop only.

**26. Hero primary CTA hover**
Tailwind `hover:opacity-80 hover:scale-[1.015]` with `transition-all`. Desktop only.

**27. Mobile cream contrast scrim**
Static `md:hidden` element: cream left-to-right gradient (`rgba(250,248,245,0.82)` → transparent) over the hero image for text readability. No animation. Mobile only.

---

### STATS.JS

**28. Video scroll scrub**
`scrollYProgress.on("change")` maps progress `v` to `video.currentTime = v * 7` (video is `insulation-burst-bg2-scrub.mp4`, 7 seconds). rAF loop lerps currentTime toward target at 20% factor per frame for smooth seeking. `fastSeek()` used where available. Desktop only.

**29. Stat reveal on scroll (desktop)**
Each stat starts `opacity: 0, translateY(20px)`. At SHOW thresholds `[0.15, 0.35, 0.55, 0.75]` inline style is set to `opacity: 1, translateY(0)`. CSS `transition: opacity 600ms ease, transform 600ms ease`. Direct DOM mutation via `ref.current.style`. Desktop only.

**30. Asymmetric stat hide on scroll up (desktop)**
At HIDE thresholds `[0.45, 0.55, 0.65, 0.75]` stats revert to hidden. HIDE range is compressed vs SHOW — stats disappear faster scrolling back up. Tracked via `shownRef` (not state — avoids re-renders). Desktop only.

**31. Video autoplay on mobile**
`video.loop = true` and `video.play().catch(() => {})` called in useEffect when `isTouch` is confirmed. Mobile only.

**32. Stat reveal via IntersectionObserver (mobile)**
`IntersectionObserver` on the section at `threshold: 0.3`. On enter: all four stats reveal with stagger `150ms × index`. On exit: all revert to hidden. Mobile only.

**33. Stats section edge fades**
Four absolutely-positioned divs with cream-to-transparent gradients on all four sides (18% bleed). No animation. `zIndex: 5`. Both desktop and mobile.

**34. Cream scrim over video**
`rgba(250,248,245,0.38)` overlay at `zIndex: 1`. Softens the raw video for stat readability. Static. Both desktop and mobile.

---

### (OBSOLETE NOTE) SECTIONS WITH NO VISUAL EFFECTS

This note is out of date. Services, WhyUs, Packages, Reviews, Contact, and Footer are
now FULLY designed and built on the shared sectionKit (Reveal animations, brand tokens,
LiftCard, Cta, etc.), along with the newer sections (Estimator, BeforeAfter, Process,
Owners, ServiceArea). Nothing on the page is an unstyled placeholder anymore.

---

## SESSION HYGIENE

At the end of every session:
1. Update the "Current known issues" section above with anything discovered
2. Update the "Current branches" section with any new branches created
3. Note any new components added to the site structure
4. Commit all work and push to GitHub before closing

*This file is the single source of truth for this project. If it conflicts
with anything in the conversation, this file wins. Update it when decisions change.*
