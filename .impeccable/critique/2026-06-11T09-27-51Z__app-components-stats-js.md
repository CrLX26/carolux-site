---
target: Stats section (app/components/Stats.js)
total_score: 36
p0_count: 0
p1_count: 2
timestamp: 2026-06-11T09-27-51Z
slug: app-components-stats-js
---
# Stats section — impeccable critique (2026-06-10)

Two independent assessments: LLM design review + deterministic detector.
**Detector: CLEAN (0 of 27 AI-slop tells).** LLM: "a person made this."

## Design Health: 36/40 — Excellent (upper band)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | Mid-reveal (~15-30% scroll) shows 15% + full caveat but supports still at opacity 0 — looks unfinished/broken if you pause. |
| 2 | Match real world | 4 | "up to 15% lower heating & cooling costs", R-49, EPA/DOE sourced — homeowner's language. |
| 3 | User control | 3 | Passive scroll beat; 420vh desktop tunnel over-pins for the payload. |
| 4 | Consistency | 4 | Cream/navy/teal, Gloock numerals, shared grain with Hero. |
| 5 | Error prevention | 4 | No inputs. |
| 6 | Recognition vs recall | 4 | All on-screen once revealed. |
| 7 | Flexibility/efficiency | 3 | Reveal hinges on scroll choreography; fast scroller blows past facts 2-3. |
| 8 | Aesthetic/minimalist | 3 | Strong, but the 30-word caveat is the heaviest block in a "30% less text" section. |
| 9 | Error recovery | 4 | No error states. |
| 10 | Help/docs | 4 | Self-evident proof beat. |

## Anti-patterns verdict: NOT slop
Detector flagged nothing. Breaks the banned hero-metric template (no 4-card grid, no gradient text, no glassmorphism, no side-stripe borders). Asymmetric editorial lockup + real product (pink fiberglass) as backdrop = hand-composed.

## What's working
1. 15% genuinely dominates — ~4x scale jump over supports (well past 1.25 ratio).
2. Supports correctly demoted under a true 1px teal hairline (divider, not side-stripe).
3. Real pink-fiberglass burst as proof imagery; left cream wash protects the lockup while true pink reads center-right.

## Priority issues
- [P1] Caveat too heavy/long. 30-word italic legal line + double cream text-glow reads furry over the burst and pulls the eye into fine print. Fix: cut to one clause; drop one shadow layer.
- [P1] Mid-reveal looks broken. Caveat (refs "figures", plural) renders before supports 2-3 appear. Fix: gate caveat opacity to the last support's window, or tighten reveal windows.
- [P2] Desktop support row ragged (baseline align; "R-49" floats with more air than "90%"). Fix: equal min-width columns, or left-stack all three.
- [P2] Scroll tunnel longer than payload (420vh desktop). Fix: compress to ~280-300vh.
- [P3] ~6 text tiers in the lockup (up-to / 15% / label / source / supports / caveat) — borderline busy for "single hierarchy".

## Minor
- No em dashes (compliant). Legal clean (up to 15%, sourced, results vary).
- 90% "+" at 0.5em nearly vanishes over pink at small sizes.
- Hero source line + global caveat duplicate the "sourced/averaged" message.
- Mobile centered version reads slightly STRONGER than the desktop left-anchored lockup.

## Questions
1. Why render the caveat (plural "figures") before facts 2-3 exist?
2. Is the desktop left-anchor serving the composition, or inherited from the old grid? (mobile centered is stronger)
3. 420vh of scroll on a passive, CTA-less proof beat — best use of the most expensive real estate?
