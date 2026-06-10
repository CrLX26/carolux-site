# Hero / Alert / Stats — impeccable critique + design backlog

*Critique run 2026-06-09 (impeccable `critique`, brand register). Status updated 2026-06-10.*
*Scope: desktop Hero, the Alert phase (sky video + word-by-word loss-aversion line),
and the Stats section. Findings only — this file is the saved record so the work
survives a context clear.*

Two independent assessments were used: an LLM design-director review and the
deterministic detector. **Detector = clean (0 markup tells).** So everything below
is art-direction / composition judgment, not code-pattern slop.

**Design health: 29/40** (Nielsen 10). Drags clustered in user-control, efficiency,
and minimalism — the cinematic ambition costs the visitor agency, and Stats costs
the design its restraint.

---

## STATUS SUMMARY (what's done vs open)

| Item | Sev | Status |
|---|---|---|
| Large-monitor focal void / headline measure shatters to 6 lines | P0 | ✅ DONE — fluid `FS`/`MB` tokens (width+height bound), wider measure; 3 lines @2560 |
| No warm pixel at rest / hero payoff gated behind mouse-move | P0 | ✅ DONE — ambient desktop thermal cycle + phase-aware XOR cursor (live on main) |
| Stats is the "AI stat-strip" / breaks one-message rule | P1 | ⬜ OPEN |
| Hero→Alert→Stats palette + transition continuity | P1 | ⬜ OPEN |
| Two competing primary-CTA colours + faint phone link | P2 | ⬜ OPEN |
| Pinned-scroll length / always-reachable estimate CTA | P2 | ⬜ OPEN |
| Headline descenders (y/j) clipped | minor | ✅ DONE — clip-path bottom inset w/ `fontSize: FS.head` |

---

## WHAT'S WORKING (keep)
1. The thermal-spotlight hero is a genuinely ownable idea (grayscale sketch + cursor
   heat-map reveal that recolors the copy). Now also ambient at rest (the cycle).
2. Fluid type bound by BOTH axes — `clamp(MIN, min(Xvw, Yvh), MAX)` — fits 1280→4K.
3. The Alert beat (sky + word-by-word "Quietly Costing You") is the emotional high point.

---

## OPEN PRIORITY ISSUES (not yet built)

### [P1] Stats is the "AI stat-strip"
- **What:** Four identical units (giant numeral + teal rule + tracked uppercase label) in
  a `repeat(4,1fr)` grid — the textbook hero-metric template. Code renders FOUR stats
  (incl. "100%+ ROI"); brand wants "one dominant message" + "30% less text."
- **Why:** Most "AI-generated"-looking section; four co-equal numbers = no focal point.
- **Direction:** Promote ONE hero stat (the **15%**, tied to the homeowner's bill) to true
  display scale; demote 90% / R-49 to smaller supporting context; drop the 4th; fold per-stat
  `source` italics into one caveat; break the four-up symmetry. → `/impeccable distill`.

### [P1] Palette / transition continuity across the sequence
- **What:** Journey runs thermal-orange → sky-blue → cream → **pink** (Stats burst). Pink is
  the only non-brand colour on the site; brushes the "fake stock" anti-reference. Transitions
  are crossfades/cuts, not transformations.
- **Why:** Breaks the "one cinematic world"; seams don't carry meaning.
- **Direction:** Tint the Stats burst toward warm cream/amber so it belongs to the palette;
  carry one element/colour through each cut. → `/impeccable colorize` + `/impeccable animate`.

### [P2] Two "primary" CTAs + near-invisible phone link
- **What:** Primary button teal in base copy, orange `#ff5500` in the thermal replica; phone
  link `#5a7280` on cream nearly disappears at smaller sizes.
- **Why:** Brand rule = single clear CTA per section; phone is the highest-intent action for a
  contractor and it recedes.
- **Direction:** One primary colour through both states; strengthen phone into a clear
  secondary (darker / underline / icon). → `/impeccable clarify` or `layout`.

### [P2] Pinned-scroll length / escape hatch
- **What:** Hero (~480vh) + Stats (~420vh) ≈ a long scroll-jacked stretch before the estimator.
- **Why:** High-intent visitors are held through the whole film; control/efficiency suffer.
- **Direction:** Ensure the sticky-nav "Free Estimate" is always reachable during the tunnels;
  consider trimming the hero tunnel now that timing is tuned.

---

## MINOR OBSERVATIONS
- 4th stat ("100%+ ROI") contradicts the "three numbers" intent — decide three vs four.
- Stats scrub assumes a 7s clip (`currentTime = v*7`); if the encode length drifts the burst
  won't reach its end frame — add an asset-length note / guard.
- `alarmCardRef` is a hidden (opacity:0) element kept mounted only to drive timing — clever but
  one resize-measurement bug from desyncing the alert/dissolve; worth a guard/comment.

## PROVOCATIVE QUESTIONS
1. The story is Diagnosis → Stakes → Proof — so why does the palette go through four unrelated
   worlds (orange / blue / cream / pink)? If you carried ONE colour through all three beats,
   which is it?
2. ~~Why is the best idea (thermal) invisible until a mouse-move?~~ → resolved by the ambient cycle.
3. Are ~9 pinned screen-heights earning the visitor's patience — or protecting the estimate CTA
   *from* them?

---

*Next highest-impact = the two P1s (Stats redesign + palette continuity); they're what's left of
the "looks AI-made" risk. Branch off `hero-polish` when tackling.*
