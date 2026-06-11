# Stats section — impeccable critique + pending fixes (RESUME HERE)

*Saved 2026-06-10 before a context clear. Read this first to resume.*

## Git / branch state (IMPORTANT — read before any git op)
- **Active working branch: `hero-text-contrast`** (off the stable state). Holds: hero subheading
  contrast fix (normal `#202d38`, thermal desktop `#ffd9a8` / mobile `#fff4ea`) AND the Stats
  small-text legibility fix (labels/source/caveat darkened + cream text-glow).
- **Frozen backup: `stats-distill-palette`** + immutable tag **`stable-stats-2026-06-10`** — the
  known-good state. Do NOT commit to `stats-distill-palette`; return to it / the tag to restore.
- **`firefox-mobile-perf`** — clean branch reserved for the (not-yet-started) Firefox perf work.
- **Production `main` — untouched.** Nothing has been merged. Each branch has its own Vercel
  preview (`carolux-site-git-<branch>-carolux.vercel.app`).
- All design work this stretch lives in `app/components/Stats.js` and `app/components/Hero.js`.

## Critique result (full snapshot: `.impeccable/critique/2026-06-11T09-27-51Z__app-components-stats-js.md`)
- **36/40 — Excellent.** Deterministic detector CLEAN (0/27 AI-slop tells). LLM: "a person made this."
- The distill (one dominant 15% + demoted 90%/R-49 over the real pink-fiberglass burst) is what
  cleared the AI-slop bar. Core design is strong; the deductions are choreography + the caveat.

## PENDING FIXES — ✅ ALL 4 APPLIED & VERIFIED 2026-06-11 (on `hero-text-contrast`, NOT yet committed)
Verified via `scripts/statshot.mjs` (desktop, 1440×900) + `scripts/mxend.mjs` (iPhone 13).
Screenshots: `.shots/stat_0{0..3}.png`, `.shots/mxe_2300.png`.

1. ✅ **[P1] Caveat: trim + lighten glow.** `STATS_CAVEAT` (content.js) shortened to
   "EPA/DOE averages, not a guarantee. Results vary by home." Both caveats (desktop + mobile in
   Stats.js) dropped to a single text-shadow `0 1px 6px rgba(250,248,245,0.85)`.
2. ✅ **[P1] Mid-reveal looks broken.** Added `caveatRef`; caveat opacity now driven by
   `getStatStyle(v, WINDOWS[2])` inside `revealStats` (starts at `opacity:0`). Verified hidden at
   frac 0.30/0.55, fades in only with R-49 by ~0.78. Same gate covers the mobile branch (one ref,
   one branch mounts at a time).
3. ✅ **[P2] Desktop support row ragged.** The two support items now get `flex:1 1 0; minWidth:0`
   (desktop/wide only — unchanged when `isNarrow`), so 90%+ and R-49 sit on equal-width columns.
4. ✅ **[P2] Scroll tunnel longer than payload.** Desktop container `420vh → 300vh` (mobile `280svh`
   unchanged). Reveal windows are progress fractions so they auto-rescaled; all 3 stats land by
   ~0.78 and hold to 1.0. Burst scrub still smooth.

Minor (NOT done): 90% "+" at 0.5em nearly vanishes over pink; hero source line + caveat duplicate
the "sourced/averaged" message. Left for a later pass.

Minor: 90% "+" at 0.5em nearly vanishes over pink; hero source line + caveat duplicate the
"sourced/averaged" message (could drop one).

## Other open threads (separate from Stats)
- **Firefox-mobile sluggishness** — investigation report delivered, NO code changed. Top suspects:
  concurrent video decode (3 `<video>`), Firefox loading the 6.3MB scrub clip for a plain loop
  (should use the 2.6MB mobile encode), Lenis. Would go on `firefox-mobile-perf`.
- Desktop thermal mask rAF caps Firefox desktop at ~49fps (user says desktop is fine; mobile is the
  concern).

## Verify tooling (scripts/, Playwright — Claude_Preview throttles rAF, don't use it)
`statshot.mjs` (desktop Stats reveal), `mnat.mjs`/`mxend.mjs`/`mxcheck.mjs` (mobile Stats scroll),
`herocolors.mjs`/`herodesk.mjs` (hero 4 states), `dffx.mjs` (Firefox fallback), `perfcmp/iso/mob.mjs`
(perf). Dev server: `npm run dev` on :3000 (NEVER vercel dev). Read the `.shots/*.png` to SEE results.
