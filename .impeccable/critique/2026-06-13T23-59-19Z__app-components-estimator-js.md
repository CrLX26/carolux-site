---
target: app/components/Estimator.js
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-06-13T23-59-19Z
slug: app-components-estimator-js
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live temp panel has no loading state — silently absent if API fails |
| 2 | Match System / Real World | 4 | Plain language, inline $, /mo suffix, "Not sure" as a valid pick — exemplary |
| 3 | User Control and Freedom | 3 | Segmented control freely re-selectable; no bill field reset; email form has no escape |
| 4 | Consistency and Standards | 3 | Internally consistent; result card CTA and email button compete with no clear hierarchy signal |
| 5 | Error Prevention | 2 | Bill clamping fires after out-of-range entry (no preemptive max hint); email only validated on submit |
| 6 | Recognition Rather Than Recall | 4 | Placeholder "220" as anchor, segmented control shows all options, result updates live |
| 7 | Flexibility and Efficiency | 3 | Live result on any bill input; no shortcut from this section to phone contact |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and restrained; teal glow blob in result card adds decorative noise without informational value |
| 9 | Error Recovery | 2 | Email error has retry only — no fallback phone/email link in the failure state |
| 10 | Help and Documentation | 4 | billHint, insulationHint, source footnote, DOE attribution — proportionate and accurate throughout |
| **Total** | | **31/40** | **Strong — above median for real production interfaces** |

## Anti-Patterns Verdict

**LLM assessment: PASS (one yellow flag)**

The section does not read as generic AI output. The live temperature panel is a genuine differentiator — reactive, time-aware, contextually gated (showAttic ≥78°F). The THREE_WAYS ledger uses a hairline-top-border numbered treatment rather than an identical card grid, which is the right call. The Cormorant-Manrope-Jost typographic mix across navy and cream surfaces is coherent and premium.

Yellow flag: THREE_WAYS items 01/02/03 are structurally identical (same border, same teal counter, same label-then-body pattern). The numbered ledger device saves it from the banned identical-card-grid category — but just barely. The third item has no source attribution and thinner body copy, creating a slight visual unevenness that reads human rather than machine.

**Deterministic scan: 0 findings.** `npx impeccable detect --json app/components/Estimator.js` exited 0 — no patterns flagged.

## Overall Impression

The section has earned a genuine personality through the live temperature panel and the numbered ledger. The estimator flow is well-structured and unusually honest for contractor marketing. The two issues holding it back are mechanical, not conceptual: the primary CTA fires before the user has a result (jumps the conversion sequence), and the temp panel has no fallback when the API is absent (the section's strongest element can silently disappear). Both are one-session fixes.

## What's Working

**The live temp panel is the section's best element.** It converts a static estimator intro into a reactive, time-aware instrument. The attic delta (+40°F amber, "Your AC is fighting both.") is loss-aversion copy embedded in a data widget — correct premium contractor marketing. The `showAttic` gate (≥78°F daily high) is disciplined: the big claim only fires when it's physically true.

**billHint + insulationHint are well-executed.** Helper text at 12px inkSoft below each control provides just-in-time guidance without cluttering the label. The transition from hint to clamping message on out-of-bounds entry is the right UX — informs without blocking.

**THREE_WAYS ledger earns its numbered treatment.** The `01/02/03` teal counters, Cormorant labels, and hairline top-borders avoid the identical-card-grid ban. Source attributions (DOE, EPA) at 11px inkSoft are correct visual weight — proof-of-claim without interrupting reading rhythm.

## Priority Issues

**[P1] Solid CTA fires before the user has a result**
What: The "Book Your Free Estimate" Cta renders inside the navy result card at all times — including the zero state (`$ —`). A user who hasn't typed anything sees a primary CTA immediately.
Why: Undercuts the conversion logic. Intended sequence is enter bill → see number → feel motivated → book. Surfacing a solid CTA before engagement edges the result card toward the banned "hero metric" pattern.
Fix: Conditionally render the CTA. `!hasResult`: show instructional copy only, no button. `hasResult`: reveal CTA with a brief fade-in. The parent already has `aria-live="polite"` so the conditional render is accessible.
Suggested command: /impeccable clarify

**[P1] Temp panel fails silently; no loading state or fallback**
What: Panel is gated behind `dailyHigh !== null`. If the Open Meteo API times out, the panel simply doesn't render — no skeleton, no fallback copy, no error state. The `.catch(() => {})` swallows everything.
Why: On bad API days the header becomes single-column with a gap where the panel was. The section's most distinctive element can silently disappear.
Fix: Add `tempError` boolean state, set in `.catch()`. Render a static fallback card — same navy, same dimensions, copy like "Charlotte summer highs regularly push attics past 120°F." Section never loses its two-column composition.
Suggested command: /impeccable harden

**[P2] Mobile strip missing "Your AC is fighting both."**
What: Desktop card (when showAttic) renders the amber temp + sublabel + the italic line + DOE footnote. Mobile strip shows only the flex-row temperatures. The italic line is absent.
Why: "Your AC is fighting both." is the highest-impact copy in the widget — the emotional payoff that converts a data point into a loss-aversion trigger. Mobile is the primary traffic source for this section.
Fix: After the flex row on mobile, add conditionally: `{showAttic && <p style={{ marginTop: "6px", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(250,248,245,0.78)" }}>Your AC is fighting both.</p>}` The 16px 20px padding has room.
Suggested command: /impeccable adapt

**[P2] Email submit button label undersells the value exchange**
What: The emailPrompt promises "a personalized breakdown — including what we'd look for in your attic and crawl space." The button says "Send to my inbox" — describing the mechanism, not the value.
Why: Email capture conversion hinges on specificity. The outlined treatment correctly demotes the button below the solid CTA, but the label does not echo the promise in the copy above it.
Fix: Change `emailCta` in content.js to "Send my estimate" or "Get my breakdown" — something that mirrors the emailPrompt's promise. One-line copy change with measurable conversion impact.
Suggested command: /impeccable clarify

**[P3] Email error state has no fallback contact path**
What: When `lead.status === "error"`, only `lead.error` is shown. No fallback phone or direct email link.
Why: For Morgan (skeptic), a broken form with no next step converts a technical failure into a trust failure. Home services users who tried to engage and hit a wall go elsewhere.
Fix: When `lead.status === "error"`, append below ErrorNote: 12px inkSoft line — "Or reach us directly: (704) 228-2729 · team@caroluxinsulation.com" with `tel:` and `mailto:` links.
Suggested command: /impeccable harden

## Persona Red Flags

**Sam (Mobile — primary traffic)**
On a 390px screen, the result card is below the THREE_WAYS ledger and below the fold. Sam types a bill and must scroll to see the result — no in-viewport feedback. The `type="number"` with `inputMode="numeric"` is correct for iOS keyboard, but no `min="0"` or `step="1"` is set. The email form flexWrap stacks input + button vertically on mobile — confirm the outlined button at 52px height has sufficient border contrast on creamDeep background. The `isMobile` state initializes to `false` on SSR, causing a one-frame flash of the desktop panel before the mobile strip appears on real devices.

**Morgan (Skeptic)**
Source attributions in THREE_WAYS are present and correctly weighted — Morgan notices these. The source footnote is the strongest trust element. But: the result card shows a solid CTA before any number is calculated, which reads as pushy. The `insulationHint` text "Most Charlotte homes built before 2010 are often under-insulated" reads as a sales nudge disguised as a neutral helper — Morgan will clock this. More neutral: "Most homes here were last insulated 10–20 years ago — it's worth checking." The emailPrompt's "personalized breakdown" phrase is AI-saturated; more credible: "We'll email your estimate details and what we'd specifically look for in a Charlotte home your age."

## Minor Observations

- `isMobile` initializes to `false` (SSR safe), causing a brief flash of desktop panel on mobile. A `useLayoutEffect` + `null` initial state would guard this.
- The Cormorant `$` prefix in the bill input is `fontSize: 1.4rem` vs. the input text at `1.15rem` — intentionally decorative, but at long bill values (e.g., $1,000) the two fonts at mismatched sizes can feel jarring.
- THREE_WAYS item 3 has no source — component correctly suppresses the `<p>` — but this makes the third column visually lighter than the first two. Consider pulling the source pattern entirely for a cleaner look when empty.
- The hover reversal on the email submit button (outlined → solid navy on hover) is JavaScript-driven style mutation, not CSS. On touch devices it never fires. The hover reversal also makes the button briefly identical in weight to a primary CTA, which undermines the demoted treatment it's supposed to maintain.
