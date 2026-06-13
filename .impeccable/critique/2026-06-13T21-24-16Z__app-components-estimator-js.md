---
target: Estimator.js THREE_WAYS ledger
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-06-13T21-24-16Z
slug: app-components-estimator-js
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3.5 | Result updates live but no explicit live affordance |
| 2 | Match System / Real World | 3.5 | Good EPA/DOE framing; well-insulated undefined for users |
| 3 | User Control and Freedom | 3 | No reset/undo; email submit cannot be cancelled |
| 4 | Consistency and Standards | 3.5 | Segmented control, focus states, label style consistent |
| 5 | Error Prevention | 3 | Honeypot and client validation good; bill input accepts negatives |
| 6 | Recognition Rather Than Recall | 3.5 | 01/02/03 numbering, scannable result box; no tooltip on insulation options |
| 7 | Flexibility and Efficiency | 2.5 | No example pre-fill, no copy-to-clipboard, no shareable link |
| 8 | Aesthetic and Minimalist Design | 3.5 | Clean; no divider between THREE_WAYS and calculator |
| 9 | Error Recovery | 2 | API failure has no retry path |
| 10 | Help and Documentation | 2 | Source footnote strong; insulation options unexplained |
| Total | | 30/40 | Good |

## Anti-Patterns Verdict

LLM: PASS. THREE_WAYS ledger avoids identical-card-grid trap. Numbered labels, border-top treatment, varying body text lengths. Copy has a real thesis.
Deterministic scan: CLEAN. Both Estimator.js and content.js exit 0, zero findings.

## Priority Issues

P1: Error Recovery -- email submit fails silently. No retry affordance after API error (line 439 Estimator.js).
P2: Insulation state buttons have no guidance -- well-insulated undefined for users (lines 235-264).
P3: Two CTAs (Book + Email) appear simultaneously with unclear relationship.
P4: No visual break between THREE_WAYS and calculator on same creamDeep background.
P5: Bill input needs a quick-start hint explaining what type of bill to enter.
