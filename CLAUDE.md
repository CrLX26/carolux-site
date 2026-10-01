@AGENTS.md

---

# Carolux Pro Website — Session State

---

## 🟢 CURRENT HANDOFF — 2026-10-01 (latest). Read this first.

**You are the `site-dev` session.** `main` = **`5be5a97`**, live in production on Vercel.
`caroluxinsulation.com` serves this Next.js site; Wix is retired. Every push to `main` is a real
customer-facing change.

> **⬛ READ `AGENTS.md` FIRST.** Its `<!-- CAROLUX-SETTLED -->` block (generated, do not hand-edit)
> holds the 12 settled owner answers and the KILLED-claims list. **That is the agreement channel.**
> `RISK-REGISTER.md` is the work queue only. Check SETTLED before asking the owner anything.
> `CLAUDE.md:1` is `@AGENTS.md`, a literal import, so it loads either way.

### What this lane owns, and what it does NOT

**Owns:** the website. Page implementation, on-page content, `schema.js`, `sitemap.js`, `robots.js`,
metadata, deploys. All copy lives in `app/lib/content.js`, never hardcoded in components.

**Does NOT own: SEO *direction*.** Since 2026-09-30 that is the **`seo` lane** (`Carolux - GBP`),
which owns the Business Profile, the local pack, organic diagnosis, and citations. **site-dev
implements to that direction.** Owning the SEO *files* and owning the SEO *direction* are different
things; conflating them is what made this wrong for three months. Canonical lane map:
`Carolux General Operations and Unifier\LANE-MAP.md`.

**Read before trusting any status you did not personally verify:**
`Carolux - GBP\CORRECTION-NOTICE.md` — the six empty-state traps and the stale-middle pattern.

### Where things actually stand (measured, not assumed)

- **Indexation is healthy.** 17 indexed, 6 benign canonical/redirect exclusions. Do **not** act on
  `site:` result counts — they are a sampled, truncated view and produced a wrong "two-thirds
  unindexed" conclusion that nearly bought a 13-page rewrite.
- **The real problem is ranking, not discovery.** 435 impressions, 5 clicks, average position 22.3
  over ~3 months. Service pages sit at 22–35 with real volume; city pages rank 4–9 with almost none.
  **Never act on the 22.3 blended average** — it averages two opposite problems.
- **The 13 city pages are NOT worth rewriting.** They rank well (Cramerton 4.0, Pineville 5.0,
  Stanley 7.0, Gastonia 9.3) and earn 1–8 impressions each. Better content cannot create search
  volume. Depth and authority on the **three service pages** is where the demand is.
- **Gaston County is won on the Business Profile; Charlotte is won on the site, slowly.** Not a
  fork — different surfaces, do both.

### Shipped recently

`/builders` rebuilt on 4-agent research (schedule and insurance lead; Grade I gated to programme
builders) · assemblies + R-value table · one-page capability-statement PDF (`scripts/capability-pdf.mjs`,
regenerate when materials or service area change) · cellulose, insulation removal and attic decking
added to the bid scope · `www` → apex 308 · `/services` un-orphaned from the footer · real Maps CID
link replacing the dead `g.page` vanity URL · Retell voice-AI and Cal.com disclosed in the privacy
policy · `addressLocality` → Gastonia · Mooresville added to the service area · Google Preferred
Sources footer link.

### Open threads

| Thread | State |
|---|---|
| **WI-125 🔴** | No Meta Pixel on the site; CAPI fires into an unconnected dataset. Gates honest measurement of ad spend. Joint with marketing. |
| **WI-017 🟠** | Next/postcss CVE upgrade. Breaking change — schedule with the owner, do not do it unattended on a live revenue site. |
| Service-page depth | The evidenced next SEO move. Hold until the sitemap submission settles and the host consolidation completes. |
| Sitemap submission | The `seo` lane owns it and will ping when it lands. Expect indexed counts to **dip** as `www` consolidates onto apex — that is the 308 working, not a regression. Do not revert it. |
| Legal fast-follows | NC-attorney glance on ToS §11/§12 and the Service-Providers wording; Cal.com disclosure wording flagged to legal/risk. |
| Owner-side | Real reviews (WI-003), mailing address (WI-049). |

### Caroline (the Retell receptionist) — not this lane, but it quotes our copy

Ground truth: `AI-Front-Desk\CAROLINE-GROUND-TRUTH.md`. Live at **V6**. She offers residential
attic cellulose, **never** discusses dense-pack or any contractor-side option, routes every builder
and GC call straight to Tony or Juan, and states no savings percentage on calls. **Her greeting and
our privacy policy must say the same thing** — if either changes, change both.

### Hard rules

Claim limits live in `AGENTS.md` and in the header comment of `app/builders/page.js`. The ones that
bite most often: **never "licensed"** (insured; Tony is a FORMER NC home inspector) · **never
"mold"** · **no spray foam as an offering** · **2-year** workmanship guarantee · no exact-$ savings
· never knock a competitor · **do not touch `Nav.js`** · `carolux-tools` is read-only from here ·
never `git add -A public/` (it once staged a 245MB file and GitHub rejected the push).

**Dense-pack cellulose is builder-facing only.** It must stay off the homeowner pages and the
Business Profile, which face consumers. Attic loose-fill cellulose is fine everywhere.


## 🟡 PRIOR HANDOFF — Hero (mobile sequence + desktop thermal cycle) — LIVE on main
*Detail reference from 2026-06-10. Still accurate for the Hero; superseded as "latest" by the block above.*

**Worktree/lane:** design lane (`carolux-site`).
**Git:** ✅ **LIVE on `main` (2026-06-10)** at `08496cc`. `main` = `hero-polish` = `hero-large-monitor`
(all fast-forwarded to the same commit; linear history). Vercel production is deploying from `main`.
**Live Wix site still untouched** — the new site only reaches the public domain when DNS is repointed to
Vercel; pushing to `main` just updates the Vercel production deploy. Rollback = FF `main` to `c8ae941`.
**Both the mobile hero sequence AND the new desktop thermal hero are now on `main`.**

### Desktop hero (NEW this round, on main) — `app/components/Hero.js`, `!isMobile` branches
- **Responsive fit:** fluid type via `FS`/`MB` tokens bound by BOTH width and height — `clamp(MIN, min(Xvw,Yvh), MAX)` — used by base AND thermal copy so they stay overlaid. Panel = `calc(100svh - nav)` (no 720px min) so the hero fits 1280→4K without clipping/header overlap. Verified 1280/1920/2560/3840.
- **Ambient thermal cycle** (rAF on the thermal overlay's mask, `thermalRevealRef`): rest on normal house → a few house-biased holes GROW to full thermal (copy flips to its hot colour state) → hold → **cool-fade dissolve** back to normal → loop, new spots each time. `T_NORMAL/T_IN/T_HOLD/T_OUT` knobs in the effect.
- **Phase-aware cursor (XOR):** the cursor composites with the thermal coverage via `mask-composite: exclude` / `-webkit-mask-composite: xor` (cursor is the TOP mask layer or its operator no-ops). Where it overlaps thermal it cuts a COOL window (normal house+copy); where the area is normal it reveals a HOT thermal window. Self-flipping = no dead "hazy dot". Plus a soft screen-blend glow following the pointer. ⚠️ **Verified in Chromium only** (Playwright) — the user is on Firefox; the cool-window XOR cut should be sanity-checked on Firefox + Safari (standard `mask-composite` keyword for FF, `-webkit-` for Safari; both are set).
- **Headline descenders:** the per-line reveal `clip-path` carries `fontSize: FS.head` so the `-0.32em` bottom inset scales with the headline (em was resolving at the inherited 16px). Don't drop the fontSize or the y/j tails clip again.
- Desktop verify tooling: `scripts/dshot.mjs` (cursor screenshots, WIDTH/HEIGHT env), `scripts/dscroll.mjs` (scroll timeline; real wheel keeps Lenis+framer synced; reads alarm-card pos + sky opacity).

### Mobile sequence (unchanged, on main) — `isMobile` branch
A complete **mobile-only** hero intro, sequenced as ONE pinned scroll tunnel inside `Hero.js`
(the old separate `MobileAlert.js` was folded in and **deleted**). All mobile work stays
**gated behind `isMobile` (max-width:767px)**; the desktop thermal cycle above is `!isMobile`-only.

**The mobile sequence (all in `app/components/Hero.js`), driven by scroll units `u` (= scroll/viewport):**
1. Hero loads normally (thermal house **time-loop** still runs — `.thermal-crossfade`).
2. Hero **text rises** as you scroll (`mobileContentY`, ~1.0× scroll) and **fades** (`mobileContentOpacity`, u 0.42→0.66). House stays **pinned** (no parallax — user-locked).
3. The **house cross-fades into a full-bleed sun-sky VIDEO** (`mobileAtticOpacity` u 0.66→0.94) with a push-in (`mobileAtticScale` 1.08→1.0).
4. The loss-aversion line **writes word-by-word** over the video (`mWordRefs`, u 1.00→1.80) — `HERO.secondaryPre/Main/Post`, warm cream/amber.
5. The finished alert **holds** (u 1.80→2.20), then **cools to cream** (`mobileExitCream` u 2.20→2.40) and dissolves into Stats.
- Tunnel: outer `minHeight: 290→...→350svh` (mobile), sticky panel `calc(100svh - navHeight)` + `paddingBottom:80` so content is **top-safe** (auto/marginTop layout: text never clips under the nav, CTA clears the bottom bar). Scroll origin uses a cached **`pinStart`** so `s` starts at 0 at the top (do NOT reintroduce `scrollY - heroTop`, that pushed content down).
- **Both** the base text and the **thermal replica text** use the SAME layout/`mobileContentY`/`mobileContentOpacity` so they overlay exactly (don't let them drift apart).

**Alert sky video (`public/alert-sky.mp4`, committed):**
- It **loops on a timer** (NOT scroll-scrubbed). **Two stacked `<video>` copies** (`vidARef`/`vidBRef`) crossfade into each other at the seam (effect: "sky video loop with a crossfade into itself") so the end→start wrap is a dissolve. Only one plays at a time except the ~1s crossfade. Clip is short (4.8s).
- ✅ **CURRENT VIDEO (2026-06-09):** `alert-sky.mp4` — bright sky w/ clouds + sun. Source 24MB/3840×2160/25fps → **1.19MB/1920×1080** (h264 `-crf 27 -preset slow`, lanczos, `+faststart`, no audio). 4K original preserved at `_masters/12718744_3840_2160_25fps.mp4` (gitignored, NOT deployed).
- **Framing** (sun above the copy, glow touching text top, clouds in frame): videos use `object-position: 30% 50%` (horiz-centre the sun) wrapped in a framing div `transform: translateY(-3%) scale(1.2)`. Tune those two for sun position/zoom.
- The previous `public/sun-sky.mp4` (centered-sun clip) was **removed** from the repo/deploy. Its source is still local-only at `_masters/sun-sky-1440-master.mp4` (gitignored) if we ever need it back.

### Tunable knobs (all in `Hero.js` `mMeasure`, mobile branch)
The `u` thresholds above control timing (text fade window, cross-fade window, word pace, hold length, cool-to-cream). Tunnel height (`minHeight … svh`) must be ≥ the last threshold + buffer.

### Self-verification tooling (committed under `scripts/`, uses Playwright)
The Claude_Preview MCP **throttles rAF and runs Lenis**, so scroll animations DON'T play there.
Use **Playwright iPhone emulation** instead (touch → `pointer:coarse` → Lenis off, rAF runs like a real phone). Browsers are cached on this machine; `npm i -D playwright` if needed.
- `node scripts/mshot.mjs 0 0.5 1 1.5 …` → screenshots at scroll positions (vh multiples) → `.shots/`
- `node scripts/measure.mjs` → hero top-clearance vs nav across devices
- `node scripts/s25.mjs` → Galaxy S25+ first-load fit (eyebrow→CTA) check
- `node scripts/align.mjs` → confirms base vs thermal text overlay
- `node scripts/vidcheck.mjs` → confirms the video loop/crossfade (currentTime advances on a timer)
- Then `Read` the PNGs in `.shots/` to actually SEE the result. (`.shots/` is gitignored.)
- Dev server: `npm run dev` (port 3000) — NEVER `vercel dev`. View mobile via DevTools device mode (set 412×820 for S25+) and **reload**.

### Done this session (all on `main` now)
- ✅ Compressed alert video, swapped to `alert-sky.mp4` (bright cloudy sky, sun centered above the copy).
- ✅ Staged hero text fade + fixed the seam "catch" (attic layer pre-promotion).
- ✅ GPU layer-promotion smoothness pass — locked 60fps (verify with `scripts/perf.mjs`).
- ✅ Fixed house/thermal bleed-through at the video crossfade seam (opaque sky backdrop; verify with `scripts/bleedcheck.mjs`).
- ✅ Removed the now-unused `public/sun-sky.mp4` from the repo/deploy.

### Pending / next steps
- iPhone SE (568px, tiny) CTA sits ~14px under the bottom bar — minor; tighten mobile spacing if you care about it.
- Clean up the unused attic placeholder images in `public/images/` (no longer referenced).
- ✅ Stray 4K video `public/12398979_3840_2160_25fps.mp4` deleted.
- Older backlog (other lanes / future): FAQ+schema (SEO lane), package pricing, real reviews (replace placeholders), estimator lead-capture backend.

### Don't break
- `Nav.js` locked. The locked desktop SCROLL MotionValues (`heroContentY`, `imageScale/Opacity`, `bridgeY`, `tealLineOpacity`) are unchanged — the desktop thermal cycle is additive and the hero tunnel was lengthened (480vh) for the alert; don't re-touch those scroll values. Mobile work stays `isMobile`-gated; desktop work stays `!isMobile`-gated.
- Legal: Tony = FORMER inspector (never "licensed"); company **insured, not licensed**; no "mold"; no specific $ savings; 2-yr guarantee.

### Outstanding design polish (from the impeccable critique — NOT yet done)
📄 **Full findings + status saved at `design-refs/HERO-IMPECCABLE-CRITIQUE.md`** (the P0s are done;
the P1/P2 backlog lives there). Quick list still open: Stats "stat-strip" → one dominant stat;
hero→alert→stats palette/transition continuity; single primary-CTA colour + louder phone link;
pinned-scroll length / always-reachable estimate CTA.

---

**Project:** Carolux Insulation LLC marketing website
**Framework:** Next.js 16.2.6 (App Router, Turbopack)
**Repo:** https://github.com/CrLX26/carolux-site.git
**Local path:** `H:\Claude Code Folders\Carolux Pro Website\carolux-site`
**Dev server:** `npm run dev` → http://localhost:3000  (⚠️ NEVER `vercel dev` — it's ~13× slower and feels janky; if the site is sluggish locally, check that the process on :3000 is `next dev`, not `vercel dev`)
**Production:** `main` auto-deploys to Vercel. All work through the growth-levers batch + the Firefox scrub fallback is **merged and live**.
**Workflow:** branch off `main`, merge back via PR (a couple of direct merges to `main` have been used when explicitly requested). ⚠️ **CORRECTED 2026-09-30.** This previously said a parallel `carolux-seo` worktree (branch `seo-foundation`) owned `schema.js`, `sitemap.js`, `robots.js`, `layout.js` metadata and FAQ. **That worktree was retired in June and those files are OURS** — the old wording would stop a session doing work that belongs to it, and it contradicted `:121-122` in this same file. **site-dev owns and edits all of them.** What site-dev does NOT own is SEO *direction*: that belongs to the `seo` lane (`Carolux - GBP`), and we implement to it. Canonical: `Carolux General Operations and Unifier\LANE-MAP.md`.

---

## What Has Been Built

### Pages
| Route | File | Status |
|---|---|---|
| `/` | `app/page.js` | Complete, renders all sections |
| `/privacy-policy` | `app/privacy-policy/page.js` | Complete — **server-rendered** legal page (indexable, no client JS), brand-styled, own metadata/canonical. Content is **verbatim** in `content.js` → `PRIVACY_POLICY` (from the official PDF, Last Updated June 3, 2026). Footer links to it. |
| `/design-reference` | `app/design-reference/page.js` | Complete, internal tool only |

### Components (all in `app/components/`)
All sections are fully designed/built (the old "unstyled placeholder" notes are obsolete). Page order in `app/page.js`: Hero → Stats → Estimator → Services → BeforeAfter → Process → WhyUs → Packages → Owners → Reviews → ServiceArea → Contact → Footer.

| Component | Status | Notes |
|---|---|---|
| `Nav.js` | Complete | **DO NOT TOUCH** — user hard constraint |
| `Hero.js` | Complete | Scroll tunnel + thermal reveal (desktop) / static image (mobile) |
| `Stats.js` | Complete | Chromium scroll-scrub video; **Firefox / reduced-motion / ≤4GB RAM fall back to autoplay-loop** (no per-frame seeking — that stutters). Mobile autoplay + IntersectionObserver |
| `Estimator.js` | Complete | Savings calculator (bill-based, EPA/DOE formula). ✅ Email capture live — POSTs to `/api/lead` (Resend). |
| `Services.js` | Complete | 3 services incl. Fiberglass Batt |
| `BeforeAfter.js` | Complete | Drag-to-compare slider (ported from carolux-tools), navy band |
| `Process.js` | Complete | 4-step "How We Work" |
| `WhyUs.js` | Complete | 4 pillars incl. "Inspector-Grade Diagnosis" |
| `Packages.js` | Complete | 3-column pricing cards |
| `Owners.js` | Complete | Tony & Juan real photos. **Tony = "former" NC home inspector, never "licensed"** |
| `Reviews.js` | Complete | 3 reviews — **PLACEHOLDER copy, not real** |
| `ServiceArea.js` | Complete | 13-city flowing list |
| `Contact.js` | Complete | Contact form section |
| `Footer.js` | Complete | Footer with NAP + links |
| `SmoothScroll.js` | Complete | Lenis smooth-scroll wrapper |
| `sectionKit.js` | — | Shared design kit: brand tokens `C`, `Reveal`, `SectionHeading`, `LiftCard`, `Cta`, icons. Lower-page sections import from here |

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
CSS Variable          Font (actual)         Role
--font-cormorant      Gloock                Display headlines, serif numerals, stat numbers
--font-dm-sans        Manrope               Body, UI, CTAs
--font-label          Jost                  Uppercase tracked labels / eyebrows
```
Note: the CSS var names are legacy aliases (they don't match the actual font names). Actual fonts are **Gloock / Manrope / Jost** — these are the brand's committed identity; preserve them. No font files in `public/fonts/` — all via `next/font/google`.

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

### AI Skills / Plugins
```
plugins/cache/impeccable          — Impeccable UI/UX plugin (global; craft, shape, audit, polish, animate…)
plugins/cache/ui-ux-pro-max-skill — UI/UX Pro Max plugin (global)
```
**Moved out of global:** `tresmarescapital-design` and `sweepingcorp-design` now live in
`H:\Claude Code Folders\skillui-output\` (NOT `~/.claude/skills/`) — they were auto-activating
in every project. Reference copies are also in this repo's `design-refs/`. Generate new design
skills with `npx skillui --url <site> --out "H:\Claude Code Folders\skillui-output" --mode ultra`,
then move the output into the specific project that needs it (never global).

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
insulation-burst-bg2-scrub.mp4   — Stats video, desktop scroll-scrub (~6.6MB)
insulation-burst-bg2-mobile.mp4  — Stats video, mobile autoplay-loop (~2.7MB; also used by the Firefox/low-power fallback)
(older insulation-burst-bg*.mp4 files are legacy/unused; some untracked)
```

### Owner photos & before/after (`public/images/`)
```
tony-profile-1.png / juan-profile-1.png   — owner headshots (Owners.js) — ~1.9MB each, could be downscaled
attic-before-2.png / attic-after-2.png    — Before/After slider, attic pair
crawlspace-before.jpg / crawlspace-after.png — Before/After slider, crawl space pair
```

### Fonts
No files in `public/fonts/` — Google Fonts loaded via `next/font/google`.

---

## Git State (as of 2026-06-06)

`main` is current and live. It contains: mobile-fixes, design-polish (owners/process/
service-area/3rd service/stats-align), the growth-levers batch (estimator, before/after,
conversion copy, legal fixes), and the Firefox scrub fallback.

```
main                         — production, deployed. HEAD: cb5c1da (merge: Firefox scrub fallback)
design-polish                — merged (legacy)
growth-levers-experiment     — merged via PR #1 (can be deleted on GitHub)
perf-scrub-firefox-fallback  — merged directly (can be deleted on GitHub)
mobile-fixes                 — old, merged-equivalent (legacy)
seo-foundation               — the SEO session's branch (separate worktree)
```

`app/design-reference/` **is now committed** and lives on `main` (the old "untracked" note is obsolete).

**Loose ends:** `public/images/1000029061BEFORE.png` & `1000029074AFTER.png` show as deleted in the
working tree (unstaged, unexplained) — investigate before committing that deletion. Junk files
(`*OLD.webp`, `* - Copy.webp`, `house-normal6.af`, extra big videos) remain untracked on purpose.

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

## Open Tasks / Backlog

- **Before/after captions** — ✅ real Carolux jobs; city captions added (Ballantyne, Matthews).
- **Reviews** — replace placeholder reviews with real ones (the "$80 power bill" line is a
  placeholder dollar-savings claim that violates the no-specific-$ rule; it goes when reviews are real).
- **Growth-levers backlog** (see `GROWTH-LEVERS-PLAN.md`): guarantee seal by CTAs, honest urgency,
  **Insured** trust bar (insured, NOT licensed), click-to-text, referral.
- **SEO lane** (coordinate, don't build here): per-city pages, meta description. ✅ FAQ + FAQPage schema + cost-guide done.
- **Perf, if needed:** if Firefox is still janky after the fallback, re-encode the scrub video
  keyframe-dense + smaller. Owner photos ✅ downscaled (tony/juan PNG → WebP, 40KB/34KB).

## Hard content rules (see also memory: legal-tony-and-licensing)

- **Tony = "former" NC home inspector. NEVER "licensed."** Company is **insured, NOT licensed**
  (NC doesn't require a license at our job sizes). Trust signals say "Insured" only.
- Never the word **"mold"** (use "biological growth" / wood rot / moisture).
- Never promise **specific dollar savings** — percentages + source (DOE/ENERGY STAR), "results vary."
- **2-year** guarantee everywhere (not 1-year). No negative competitor mentions.
- ⚠️ **The site understates what Carolux installs — update planned.** The only material they do
  **not** install is **spray foam**. They also do **cellulose** (blown + dense-pack), **mineral wool /
  Rockwool** batt, **rigid foam board** (rim/band joists), **exterior wall batt** and **interior sound
  batt** — none of which the site currently mentions. Do not write copy implying attic-and-crawl only.
  Spray foam stays a hard never. *(Recorded Aug 26 2026.)*
- **Strategic objective is new construction**; retrofit is the on-ramp. Copy should not paint Carolux
  as retrofit-only.

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

# 2. Confirm branch (main is production; create a feature branch for new work)
git branch
git status

# 3. Start dev server
npm run dev      # → http://localhost:3000

# 4. For phone testing
npx localtunnel --port 3000   # run as background process
# loca.lt page shows an IP address — enter it as the password

# 5. Read Next.js docs if doing anything framework-level
# node_modules/next/dist/docs/
```
