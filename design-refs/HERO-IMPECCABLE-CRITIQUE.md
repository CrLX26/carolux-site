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
| Stats is the "AI stat-strip" / breaks one-message rule | P1 | ✅ DONE — distilled to one dominant 15% + 2 demoted supports (90%+/R-49); dropped ROI; broke the 4-up grid into a left-anchored editorial lockup (branch `stats-distill-palette`) |
| Hero→Alert→Stats palette + transition continuity | P1 | ⚠️ REVISED — burst stays **PINK** (it's the real pink fiberglass material; owner override, not a palette bug). Amber regrade reverted. The continuity item is reframed: keep pink, fixed the burst *timing* instead. |
| Stats burst timing (desktop) + mobile entry gap | new | ✅ DONE — see "Stats timing fixes" below |
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

### ✅ [P1 — DONE] Stats is the "AI stat-strip"
- **Was:** Four identical units (giant numeral + teal rule + tracked uppercase label) in a
  `repeat(4,1fr)` grid — the textbook hero-metric template (an *absolute ban* in impeccable).
- **Done (`stats-distill-palette`):** Distilled to **one dominant 15%** (display scale, lower-left,
  with an "up to" kicker + EPA source) and **two demoted supporting facts** (90%+ under-insulated,
  R-49 for NC) set small beneath a teal hairline. Dropped the 4th (100%+ ROI). Folded per-stat
  sources into the single caveat. Broke the four-up symmetry → left-anchored editorial lockup;
  the amber burst plays to the right/above. Mobile mirrors the hierarchy (big 15% + stacked
  supports). Verified 1440 / 2560 / iPhone via `scripts/statshot.mjs` + `scripts/mstatshot.mjs`.
  Content now 3 stats in `content.js` (`qualifier` field on the hero).

### ⚠️ [P1 — REVISED] Palette: keep the pink (it's the material)
- **Critique said:** pink is the only non-brand colour; tint it warm amber.
- **Owner override (2026-06-10):** the burst is **pink fiberglass insulation** — the pink IS the
  product. Recolouring it misrepresents the material. The amber regrade was **reverted**; the
  burst videos are back to the original pink (restored from git: `insulation-burst-bg2-scrub.mp4`
  6.6MB / `-mobile.mp4` 2.7MB). Do **not** re-tint the burst.
- **The real continuity problem was timing, not colour** — fixed below.

### ✅ [DONE] Stats ⇄ alert transition — true cross-dissolve (desktop + mobile)
*Reworked 2026-06-10 after owner feedback: no upward movement, video starts only when fully
visible, true pink, and the burst must sit BEHIND the stats.*

- **Desktop — opacity cross-fade, no movement.** The old entrance slid up (sticky slide + scale
  punch + per-stat `translateY`). Replaced with a pure opacity cross-fade: the container is
  `transparent` and the section is pulled up ~`-200svh` so it pins WHILE the alert is on screen,
  then `entranceOpacity` (`[0.04,0.12,1]→[0,1,1]`, 4-pt so it holds at 1 and never fades back out)
  dissolves the cream+burst+lockup in over the alert. Per-stat reveal is opacity-only now.
  Verified `scripts/dtrans.mjs`: at wrapOpacity 0.7 the sky and pink burst are superimposed.
- **Video starts only when fully visible (both browsers).** Both the Chromium scrub and the
  Firefox/low-power loop are gated on scroll progress (`v ≥ VID_START 0.12`, i.e. once the
  cross-fade completes); the fallback resets to frame 0 and plays there, scrub holds frame 0 until
  then and finishes by `VID_END 0.82`. Verified on real Firefox (`scripts/dffx.mjs`): paused at
  page top, playing at full view.
- **True pink restored.** Both burst files are the original pink fiberglass (identical avg colour
  desktop vs mobile). The desktop *looked* washed because of a heavy full-bleed cream scrim — that
  was reduced to a light wash under the lockup column only, so the pink reads true and the navy
  15% stays legible.
- **Mobile — now unified with desktop.** Mobile was rebuilt to use the SAME mechanism as desktop:
  a sticky tunnel (`200svh`) pulled up `~-170svh` so it pins over the alert's hold, a scroll-linked
  `entranceOpacity` cross-fade (wider window on mobile since its tunnel is shorter), and the looping
  burst gated on scroll progress (`VID_START 0.42`, after the fade). The old relative-section +
  IntersectionObserver path was deleted. This fixed BOTH the "whole screen of white before it" gap
  (the section now pins on the alert, no dead scroll) and the missing cross-fade.
  - **Critical gotcha (z-index leak):** the mobile hero's inner layers carry z-indices up to 35 and
    the hero outer creates NO stacking context, so they leak into the root and painted OVER the
    stats during the overlap (stats was `z:auto`). Fixed with `zIndex: 50` on the Stats container
    (mobile only; above hero's 35, below nav's 100). Without this the whole section is invisible
    behind the hero. Verified the stats paints on top via `elementFromPoint` (`scripts/mdbg2.mjs`).
  - Burst is zoomed (`scale(2.0)`, origin `50% 78%`) so the pink fills BEHIND all the stats incl.
    the 15%. Verified `scripts/mnat.mjs` (real wheel scroll: alert → pink-backed stats, no white).
  - **Reveal retimed to the VIDEO clock (2026-06-10).** Mobile plays the burst ONCE from frame 0
    when fully visible (not looping, not scroll-scrubbed); stats reveal off `video.currentTime` via
    a `timeupdate` listener — 15% early (~0.5s), 90%+ mid (~0.48·dur), R-49 a half-second before the
    clip ends (`dur − 0.5`). Tunnel lengthened to `280svh` and the fade tightened to `[0.05,0.22]`
    so the section holds pinned through the ~7s playthrough; zoom dialed back to `scale(1.3)` (the
    playing explosion fills the frame, so heavy zoom is no longer needed). Desktop fallback stays
    scroll-driven. Verified `scripts/mtime.mjs` (hold in view, watch the clock-driven reveal).

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

*Both P1s done (2026-06-10, branch `stats-distill-palette` off `hero-polish`): Stats distilled to
one dominant figure, and the burst recolored pink→amber. That clears the bulk of the "looks
AI-made" risk. What's left: the two P2s (single CTA colour + louder phone link; pinned-scroll
escape hatch) and the motion half of the palette item (carry an element through each Hero→Alert→
Stats cut — `/impeccable animate`). Not yet committed/merged — review on the branch first.*
