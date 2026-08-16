@AGENTS.md

---

# Carolux Pro Website — Session State

---

## 🟢 CURRENT HANDOFF — 2026-06-14 (latest). Read this first.
**You are the `site-dev` session.** `main` = **`0008cea`** (HEAD `477fa2e`) — **LIVE in production.**

> **✅ SITE IS LIVE — DNS cutover COMPLETE. Verified 2026-08-12 (do not trust older "go-live pending / apex
> still Wix" wording anywhere in this file — that was the pre-cutover snapshot).** `caroluxinsulation.com`
> now serves THIS Next.js/Vercel site; Wix is retired. Live checks 2026-08-12: apex `200`, no Vercel
> Deployment Protection, footer Privacy + ToS present, `/api/lead` alive + `RESEND_API_KEY` present in prod
> (missing-fields → `400` not `503`). **The repo has been idle since 2026-06-30** (last commit `477fa2e`);
> the launch shipped at the 06-30 cutover and nothing has deployed since.
>
> **⚠️ LIVE-BUSINESS REALITY 2026-08-12 (owner):** live ~2 months, **1 estimate call, ZERO revenue.** Owner
> is spinning up **Meta ads** (separate session) → the site's lead/comms path MUST be bulletproof before ad
> spend. **Comms audit 2026-08-12 (site-dev):** plumbing is CONFIGURED — form/estimator → `/api/lead` →
> Resend → team@; route alive, key present, site publicly reachable. **✅ COMMS VERIFIED 2026-08-12:** the
> labeled test lead LANDED in team@ **inbox** (owner-confirmed). Live DNS is healthy — Resend **DKIM present
> & aligned** (`resend._domainkey.caroluxinsulation.com`), a `send.` subdomain with SES SPF, DMARC `p=none`,
> MX=Google Workspace. **Leads DO reach the owners; the form is not the problem.** **✅ Homeowner auto-reply
> SHIPPED (`f5f3d19`):** `/api/lead` now sends an instant branded confirmation to the LEAD's own inbox
> (estimator always has email; contact only if an email field is added) — best-effort/try-catch, never fails
> the lead; brand-safe copy. **→ THE REAL PROBLEM IS DEMAND, NOT COMMS:** 1 estimate in 2 months = a traffic/
> conversion problem. Growth levers = Meta ads (owner, separate session) + **Google Business Profile + real
> reviews** (WI-003 still placeholder) + the SEO content engine. Optional polish: root SPF TXT
> (`v=spf1 include:_spf.google.com include:amazonses.com ~all`). SMS stays off (`smsEnabled=false`); contact
> form is phone-first by design (no email field — deliberate, low friction).
>
> **✅ ONLINE BOOKING LANE ADDED 2026-08-13 (`ca2f3cc` + copy `ca1fc45`):** the site now has a self-serve
> booking lane → `COMPANY.bookingUrl` = `https://cal.com/carolux-xzktck/free-in-home-estimate` (single source
> in `content.js`). It opens the cal.com "Free In-Home Estimate" (60min, in-person) which lands in Juan's
> Google Calendar — **the SAME calendar the AI receptionist "Caroline" (Retell, in the separate `AI-Front-Desk`
> project) books into**, so web + phone bookings converge and can't double-book. Wired into: the Contact
> "Book my free in-home estimate" button (above the form) + the Estimator result CTA (both `target="_blank"`,
> no third-party script/cookies — privacy-clean). Copy reframed to **"free in-home estimate"** (you book a
> VISIT; the estimate is delivered in-home) and the contact form is now crawl-space-inclusive (no "up top").
> ⚠️ If the receptionist session ever changes the cal.com event/slug, update `COMPANY.bookingUrl` to match.
>
> **✅ SEO/HYGIENE SWEEP 2026-08-13 (`38696d8` + `ffa1aad`) — deferred "B-group" cleared:**
> **WI-072** duplicate-`@id` schema fix (was on 13 city pages **AND** all 3 service pages = 16 pages, wider
> than the row said): the LocalBusiness entity is now declared **ONCE** in `app/lib/schema.js` (root layout
> injects it site-wide); other pages reference it via `provider: {"@id": …/#business"}` only. **Never
> re-declare that node on a page** — that was the bug. · **WI-073** `sitemap.js` uses a `MODIFIED` map of real
> dates, not `new Date()` (bump the entry when a page actually changes). · **WI-074(b)** new indexable
> **`/services`** hub. · **WI-004** `llms.txt` refreshed (3 service pages + hub + ToS + booking URL). ·
> **WI-008** tracked `public/` **76MB → 12MB** (15 verified-dead assets; `house-thermal4.webp` IS in use —
> kept). `.gitignore` hardened against `*.af`/`*OLD.*`/`* - Copy.*`/`*-master.mp4`.
> **⚠️ NEVER `git add -A public/`** — it once staged a 245MB master and GitHub's 100MB hook rejected the push.
> **WI-074(a) hours ✅ DONE 2026-08-13 (`1909757`)** — owner-confirmed `openingHoursSpecification` =
> **Mon–Sat 07:00–18:00**, Sun closed. 🧭 **Two-layer model — do not collapse it:** schema hours = when the
> BUSINESS is reachable/operating; **cal.com** holds the narrower in-home ASSESSMENT window (Mon–Thu
> 6am–12pm, Fri–Sat 6am–6pm). Google renders "Open now / Closed" from the schema field, so putting the
> assessment window there would show "Closed" every weekday afternoon = a live conversion leak.
> Competitor baseline (verified Aug 2026): Charlotte insulation specialists are Mon–Fri 8–5, **closed
> weekends** → Saturday + 6am starts are a real differentiator, now stated in the Contact booking copy.
> **cal.com was also fixed that day** (was 9am-start = ~12 lost bookable hrs/week).
> **Still open:** **WI-017** Next.js/postcss CVE upgrade (breaking; deliberately NOT done unattended on a
> live revenue site — schedule it with the owner).

> **Shipped 2026-06-15→30 (after the 06-14 handoff below):** `fc6fce7` truthfulness · `6751e25` privacy
> cluster · `b812811` legal scaffolding (WI-056/047/045) · `3c2ad26` FTC disclaimer + SMS consent
> (WI-059/041/035/001) · **`0008cea` launch prep (WI-011 Edit 1 + WI-048).** Authoritative open list =
> `RISK-REGISTER.md`.

> **Shipped 2026-06-15 (after the 06-14 handoff below):** `fc6fce7` truthfulness cluster (WI-002/003/
> 006/009/027 site side) → `6751e25` privacy cluster (WI-007/044/057/011 edits 2-4) → `b812811`
> legal scaffolding (WI-056 savings copy → ENERGY STAR 11% Claim A · WI-047 `/terms-of-service` page ·
> WI-045 Vercel Web Analytics cookieless + privacy §6) → **`3c2ad26` FTC disclaimer + SMS consent
> (WI-059 FTC 16 CFR 460.19 savings disclaimer on all site savings claims · WI-041 SMS consent checkbox
> on Contact + record in team@ email · WI-035 site "Workmanship Guarantee" · WI-001 stray EXIF photo
> removed · WI-060/WI-055 site halves verified clean).** All on the Vercel URL, NOT the public apex.
> **🛎️ Open flags for spine/owner:** (1) privacy §6 Vercel-Analytics wording → spine to bless (WI-045);
> (2) guarantee number 2yr-site vs 1yr-contract → owner/tools reconcile (WI-035); (3) durable SMS-consent
> store gated on WI-014; (4) NC-attorney glance on ToS §11/§12 + the SMS label before DNS cutover.
> Cross rows (WI-059/060/041/035/001/055) stay `in-progress` — design halves done, tools/owner halves open.
> Authoritative open list = `RISK-REGISTER.md`.

### 🧭 THE 3-SESSION MODEL (set 2026-06-14 — this replaced the old 5-worktree setup)
Carolux runs THREE Claude Code sessions. Full detail in memory [[worktree-split]].
1. **site-dev (THIS session)** — builds the website. **Design, SEO, AND copy all happen here** (one
   repo). The old separate `carolux-seo` + `carolux-copy` worktrees were RETIRED 2026-06-14 — the
   website is now a SINGLE worktree at `…\Carolux Pro Website\carolux-site` on `main`.
2. **tools-dev** — builds the estimator (`H:\Claude Code Folders\carolux-tools`, SEPARATE repo).
   Runs in parallel. **READ-ONLY to this session — never edit carolux-tools from here.**
3. **Legal / Risk / Integration ("the spine")** — `carolux-legal` session. Doesn't build. Owns the
   risk register, runs cross-cutting legal/risk/security audits as sub-agents, routes work.

⚠️ **LAUNCH RULE:** start website work from the **wrapper folder** `H:\Claude Code Folders\Carolux
Pro Website` — that cwd holds the real memory store. Launching from `…\carolux-site` hits an EMPTY
memory store (this was the cause of past continuity loss). Git commands `cd` into `carolux-site`.

### 📌 COORDINATION FILES OUTSIDE THIS REPO (read these — the state isn't all in here)
- **`H:\Claude Code Folders\RISK-REGISTER.md`** — cross-project risk / security / legal register; it
  is THE bus. site-dev owns + fixes the rows tagged `design`, and **flips its own rows' Status**.
  Curated by the spine. The authoritative list of open launch work lives here, not in CLAUDE.md.
- **`H:\Claude Code Folders\CAROLUX_MASTER_TODO.md`** — whole-business roadmap (site + estimator +
  marketing + legal + finances). Has a pointer to the register.
- **`H:\Claude Code Folders\carolux-legal\RISK-LANE-CHARTER.md`** — the spine's charter (how the
  lanes coordinate). **`…\carolux-legal\LEGAL-AUDIT-site-and-tools.md`** — the full both-projects audit.
- **`H:\Claude Code Folders\carolux-marketing\CAROLUX_MARKETING.md`** — marketing brain + GBP plan
  (§2). **`D:\Documents\-- Carolux\CAROLUX_DOCS_INDEX.md`** — master doc map. See [[reference-master-docs]].
- Estimator specifics: `carolux-tools\CLAUDE.md`, `LAUNCH_READINESS.md`, `CAROLUX_TOOLS_TODO.md`, `PRODUCTS.md`.

### ▶️ THE DESIGN BOARD — site-dev's open rows (authoritative = RISK-REGISTER.md)
Launch blockers + important items owned by THIS session, all waiting (most need an owner decision):
- **WI-002 🔴** Estimator email over-promises (UI says "watch your inbox"; system emails only team@).
  `api/lead/route.js:119-127` + `content.js` `emailPrompt`/`emailDone`/`emailDoneSub`. Fix A (reword,
  no-regret) or B (send the homeowner an email). Owner parked the A/B call.
- **WI-003 🔴** Placeholder reviews: `content.js:188` ("$80" exact-$ claim) + `Reviews.js:62-67`
  (hardcoded 5-star). FTC issue. Plan: hide the Reviews section behind a flag until REAL reviews.
- **WI-004 🟠** `llms.txt` missing the 3 service pages (`public/llms.txt`). SEO is site-dev's now.
- **WI-006 🟠** `/design-reference`: noindex ✅ shipped (`4dc394f`); STILL OPEN = scrub the fabricated
  "47% Verified" stat + ENERGY STAR/Owens Corning logo reel, or delete the route (decision).
- **WI-007 🟠** RapidScan site-seal script in `Footer.js:104-107` — spine decides disclose/keep/drop,
  THEN site-dev implements.
- **WI-008 🟠** ~50MB dead tracked assets in `public/`. ⚠️ The register row erroneously lists
  `house-thermal4.webp` as dead — it is IN USE (Hero + all-page schema/OG image). Delete the verified
  set only; KEEP house-thermal4.webp.
- **WI-009 🟡** em dash in `cost-guide/page.js` `<title>`. **WI-010 🟡** cellulose copy vs tools gap
  (owner keeps copy). **WI-026/WI-027** air-sealing top-off disclosure / soften "most contractors".
- **WI-011 🟠** Privacy-policy additions — staged on branch (see In-Flight below), pending NC attorney.

### ✅ SHIPPED to main this session (2026-06-14)
- **Reorg → 3-session model** (docs/process only): retired seo/copy worktrees; created the risk
  register + spine charter; SEO knowledge captured to memory [[seo-aeo-conventions]].
- **WI-005 + WI-006 noindex** (`4dc394f`): footer Services column via new single-source `SERVICE_LINKS`
  in `content.js`; `app/design-reference/layout.js` noindex/nofollow. Built-HTML verified.

### 🔶 IN FLIGHT — branch `privacy-policy-service-providers` (`40f928a`, NOT merged)
Privacy-policy "Service Providers / AI processing" additions applied to `content.js` PRIVACY_POLICY
(new §7, DNT sentence, §2 assessment-details, renumbered 7/8/9→8/9/10). Per
`carolux-legal/privacy-policy-additions-FINAL.md`. **Do NOT merge until an NC attorney glances**;
then bump `lastUpdated` (held at "June 3, 2026" with a `// PENDING` comment). Tracked = WI-011.

### ✅ MERGED to main this session (2026-06-13) — dedicated service pages (PR #6)
Three SEO/AEO service pages, cloned from the cost-guide + city templates; SEO-reviewed (PASS) +
design-taste pass done before merge. `main` ff'd to `dc3b792`.
- `/services/attic-insulation`, `/services/crawl-space-insulation`, `/services/air-sealing`
  (+ each has a static `opengraph-image.js`).
- Each: answer-first quick-answer, process / why-NC / cost / FAQ; native `<details>` FAQ (answers in
  server HTML); `@graph` schema (LocalBusiness + Service + FAQPage-from-on-page-array + Breadcrumb);
  unique metadata/canonical.
- Crawl page: batt + ground vapor barrier ONLY, states plainly Carolux does NOT encapsulate.
  Air-sealing: "included with every full install at no extra charge" + top-off caveat disclosed.
- Internal mesh (bidirectional): homepage `Services.js` (data-driven `learnMoreLabel`) + 13 city
  pages → service pages; service pages cross-link each other + 13 cities + `/cost-guide`. Added to
  `sitemap.js`.
- Accuracy fix: removed false "we encapsulate" + perimeter-wall claims from `content.js` (homepage
  card + 2 Packages features). SEO lane separately fixed `schema.js` + `llms.txt` encapsulation claims.
- **Cellulose** stays in copy (owner's call) but is a REVISIT: real support needs carolux-tools
  estimator changes (PRODUCTS.md lists cellulose as future). See master TODO.

### ✅ MERGED to main this session (2026-06-13) — estimator-reframe (fast-forward, 4 commits)
- `63310d2` feat(estimator): reframe with three-ways ledger and NC-honest rates
- `9bc1083` Estimator reframe: THREE_WAYS ledger, live Charlotte temp panel, UX clarity
- `9388290` Temp panel honesty fix: daily high, showAttic gate, mobile strip, DOE source
- `d4bbb9d` impeccable: estimator polish — all P1/P2/P3 fixes + copy

**What this shipped:**
- `app/components/Estimator.js` — complete reframe: THREE_WAYS savings ledger replacing single-metric; live Charlotte daily high temperature panel via Open-Meteo (lat=35.2271, lon=-80.8431); `showAttic` gate (only shows heat-loss panel when daily high ≥78°F + +40°F attic delta); `tempError` fallback card; mobile strip line "Your AC is fighting both." gated on `showAttic`; result card CTA now conditional on `hasResult`; email error fallback shows phone + email contact; all impeccable P1/P2/P3 findings addressed.
- `app/lib/content.js` — `insulationHint` updated to "Most homes here were last insulated 10–20 years ago — it's worth checking."; email CTA relabeled to "Send my estimate".
- Impeccable critique snapshot: `.impeccable/critique/2026-06-13T23-59-19Z__app-components-estimator-js.md`

### ⚠️ OPEN WORK = the DESIGN BOARD above + `RISK-REGISTER.md`
The register is the single source of open work — read it for the authoritative, current list (and
flip your own rows as you ship). The two big launch blockers for site-dev: WI-002 (email
over-promise) and WI-003 (placeholder reviews). One minor item NOT in the register: the Estimator CTA
"Book Your Free Estimate" vs the Contact submit label (`CONTACT.form.submit`) — align the wording
when next editing `content.js`.

### Shipped to `main` (previous session, 2026-06-12 — still live)
- **Owner photos downscaled** (`05ac1f3`): tony/juan PNG → WebP (40KB/34KB). References updated in `content.js`.
- **SEO batch** (SEO lane, `4676747…80d2cae`): `/cost-guide` page (Charlotte pricing guide, FAQPage
  schema), AEO authority pass, all 9 FAQ answers rewritten for AI extractability. `seo-foundation`
  merged and closed — SEO worktree now on `seo-next`.
- **Impeccable — FAQ + cost-guide** (`916c6db`, `86a66c8`): `Faq.js` now renders `learnMoreHref`
  as a small teal link after the answer text (first FAQ item → `/cost-guide`). `cost-guide/page.js`
  brand violations fixed: side-stripe border removed, identical card grids → hairline ledgers,
  all `#fff` → `C.surface`/`C.cream`, `borderRadius` normalised to 4px/3px, CTA section teal→navy.

### Prior shipped (still live, earlier sessions)
- **Stats polish** (`ebc6a0a`), **WhyUs 2×2 ledger** (`7b1cf35`), **SEO foundation**
  (`ca3e6b0…7a88342`), **FAQ component** (`9e59ab5`, `e2f091c`), **lead capture** (`2e1fe4c`),
  **social footer buttons + sameAs** (`6430346`, `4cfbc55`).

### Lead capture — ✅ LIVE on `main` (`2e1fe4c`) — ⚠️ see WI-002 (Design Board / RISK-REGISTER.md)
Estimator email + Contact form POST to a hardened **`app/api/lead/route.js`** (Resend; reuses
carolux-tools' account + verified sender; honeypot, per-IP rate limit, HTML-escape, validation).
Shared kit **`app/components/leadForm.js`** (`useLead` state machine, Spinner, ErrorNote,
SuccessReveal, CheckBadge, Honeypot). `RESEND_API_KEY` is set in the carolux-site **Vercel
production** env (preview env not set — non-blocking). Production verified: honeypot→200,
missing-fields→400 (key read), and a labeled prod test delivered to team@. PR #5 closed. `resend` in
package.json; `.env.local` has the key (UTF-8 BOM — extract with `grep -ao`). Verify: `scripts/leadshot.mjs`.
**Gap:** only team@ receives the Resend email. Homeowner sees "Watch your inbox" but receives nothing
automatically. See **WI-002** in the Design Board / `RISK-REGISTER.md` for fix options (A reword / B outbound email).

### Social buttons — ✅ LIVE on `main` (`6430346`)
Footer brand-column icon row (Google, Instagram, Facebook, Nextdoor; monochrome cream→teal; Nextdoor
= house glyph). All four URLs in `content.js` COMPANY confirmed (instagram/facebook/googleBusiness/
nextdoor). SEO added the same four to `schema.js` `sameAs` (`4cfbc55`, derives from `COMPANY.*` so it
stays in sync). Verify: `scripts/footshot.mjs`.

### Path-to-live backlog (from the launch audit) — now tracked in `RISK-REGISTER.md`
*These items are superseded by the register (WI rows); kept here for context. Reviews = WI-003,
DNS/Vercel = WI-012.*
Reviews are PLACEHOLDER incl. a "$80" $-claim (replace or pull); desktop thermal XOR verified
Chromium-only (check Firefox/Safari); Vercel Deployment Protection off + DNS repoint.
Owner photos ✅ downscaled (tony/juan PNG → WebP, 40KB/34KB). Before/after photos ✅ confirmed
real Carolux jobs — city captions are safe to add. Lead capture ✅ DONE and live (⚠️ outbound gap — see above).
Site stays on Wix until explicitly ready to cut over — do NOT touch DNS.

### Highest-leverage NEXT (off-site, user-owned — ON HOLD per user 2026-06-11)
Claim + fully fill the **Google Business Profile** and gather **real reviews** (NAP-consistent). The
`sameAs` links only pay off once those profiles are live + complete. Code-side follow-through when
reviews exist: replace placeholder reviews + drop the "$80" line in `Reviews.js`/`content.js`, then
add Review/AggregateRating schema — **only from genuine reviews** (self-applied ratings violate
Google policy; `schema.js` already warns against this).

---

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
**Workflow:** branch off `main`, merge back via PR (a couple of direct merges to `main` have been used when explicitly requested). Two parallel worktrees exist — this one (`carolux-site`, design/front-end) and `carolux-seo` (SEO session, branch `seo-foundation`). Stay in your lane; SEO owns `schema.js`, `sitemap.js`, `robots.js`, `layout.js` metadata, FAQ.

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
