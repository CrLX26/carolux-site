# Growth-Levers Plan — Carolux Site

Branch: `growth-levers-experiment` (off `design-polish`)
Goal: apply Alex Hormozi growth levers for higher conversion + engagement.
Styling: all visual/style decisions go through the **impeccable** skill, on the existing
sectionKit design system (Gloock/Manrope/Jost, cream/navy/teal). Nav.js is LOCKED.

Lane note (two-worktree split): copy (`content.js`) and components are MINE. FAQ schema,
sitemap, robots, `layout.js` metadata, LocalBusiness/Service schema, and new SEO landing
pages belong to the **SEO session** (`carolux-seo` / `seo-foundation`) — flag, don't build.

---

## Entry 005 — Block-by-block copy audit (rewrites)

### 1. Hero headline — 🔴 biggest copy opportunity
Current: "Charlotte's / Insulation / Experts."
Problem: category label any competitor could paste; "Experts" is unprovable; the real
differentiator is buried in the subheading.
Rewrite options (lead with the edge):
- "The owners do the work. / Every single job." (strongest — un-copyable, concrete)
- "Charlotte's only / owner-on-every-job / insulation team."
- "Tony & Juan / insulate your home. / Personally."
Keep "Charlotte's Insulation Experts" energy in the **eyebrow**, not the H1.

### 2. Hero subheading — ✅ keep (best sentence on the site)
Add one clause — the inspector credential:
"…the owners doing the work — one a former NC home inspector — and a 2-year guarantee on
everything we touch."

### 3. Hero alarm bridge — ✅ keep, do not touch
"Most homes are / Losing Money / through their attic. Every single month." Emotional spike.

### 4. Primary CTA — 🟡 add specificity
Current: "Get a Free Estimate"
Rewrite: "Get Your Free Same-Day Estimate" (real differentiator: written price, same day).
Pair with warm-button contrast (not quiet teal).

### 5. Trust badges — ✅ keep; consider 4th
Optional 4th: "Former NC home inspector on every job."

### 6. Stats block — ✅ keep (the model for proof discipline)
15% (EPA) · 90%+ (ENERGY STAR) · R-49 (DOE) · 100%+ ROI (Cost vs. Value).

### 7. Services heading — ✅ keep

### 8. Service 01 (Attic) — 🔴 truth-drift to fix
Current overpromises: "…15% or more… within the first year."
Rewrite (match brand honesty): "…proper air sealing and insulation can save up to ~15% on
heating and cooling (EPA ENERGY STAR) — though every home is different."

### 9. Service 02 (Crawl Space) — ✅ keep (avoids banned word "mold"; uses wood rot / humid air)

### 10. Why Us — 🔴 inspector pillar missing
Add "IV. Inspector-Grade Diagnosis" — "Before Carolux, co-owner Tony spent years as a
North Carolina home inspector. He reads the whole house — moisture, airflow, and where your
money is actually escaping — before we recommend a thing." (FORMER inspector — never "licensed")

### 11. Packages — ✅ structure right
Add featured-tier nudge: "Most homeowners start here."

### 12. Reviews — placeholder (CONFIRMED). Until real reviews land, use a
"Be one of our first Charlotte customers" honest framing. No fabricated reviews.

**Top 3 highest-leverage copy changes:** (1) Hero H1 → "owners do the work";
(2) inspector credential as Why-Us pillar + subheading clause; (3) fix Service-01 savings line.

---

## Entry 006 — What the site is fully missing (new sections/mechanics)

### ⚠️ OPEN TODO — lead-magnet email capture is NOT wired
The Estimator (`app/components/Estimator.js`) has an email field, but submissions
**go nowhere** — no backend/storage yet. On submit it only flips local UI state.
To activate: connect to a form service (Resend / Formspree / Web3Forms) or an API route.
See `TODO(lead-capture)` in `app/lib/content.js`.

### Tier 1 — build first
1. **Meet the Owners (real faces)** — Lever 4. [STATUS: ✅ shipped this session — Owners.js with Tony/Juan photos]
2. **FAQ / objection-handler** — Levers 9+10+1. Do I need this? What is air sealing? Cost?
   How long? Are you insured? Spray foam (state "no, here's why"). [LANE: SEO owns FAQ schema — coordinate]
3. **Lead magnet + email capture** — Levers 1+12. Capture the ~95% not ready to buy.
   "Attic Savings Estimator" / "5-question attic health check." NOTE: companion app
   `carolux-tools` is an AI estimator — link to it instead of rebuilding.

### Tier 2
4. **How-it-works / pricing-transparency 3-step** — Lever 10. [STATUS: ~partly shipped — Process.js]
5. **Inspector-credential proof block** — Levers 2+4. "We read the whole house."
6. **Risk-reversal / guarantee seal** — Lever 9. Badge next to every CTA.
7. **City / service-area pages** — Levers 1+2+11. Per-town pages. [LANE: SEO programmatic — coordinate.
   Visible ServiceArea SECTION already shipped this session — ServiceArea.js]

### Tier 3
8. Referral mechanism ("Refer a neighbor") — Lever 7.
9. **Insured** trust bar — Lever 4. (We are INSURED, NOT licensed — NC doesn't require a
   license at our job sizes. Never say "licensed." See memory: legal-tony-and-licensing.)
10. Before/after gallery slot — Lever 4. NOTE: before/after photos already in /public/images.
11. Click-to-text / text-to-book — Lever 12.
12. Seasonal urgency / current offer — Lever 9 (honest startup framing).
13. Meta description + LocalBusiness schema — Lever 1. [LANE: SEO owns layout.js metadata + schema.js]
