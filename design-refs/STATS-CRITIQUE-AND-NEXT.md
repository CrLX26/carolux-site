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

## PENDING FIXES (none applied yet — user paused here to clear context)
Apply on `hero-text-contrast`, one commit each (each independently reversible). In priority order:

1. **[P1] Caveat: trim + lighten glow.** The 30-word italic legal caveat is the heaviest block in a
   "30% less text" section, and the cream text-glow I just added reads slightly *furry* over the
   burst. → Shorten `STATS_CAVEAT` (content.js) to one clause, e.g. "EPA/DOE averages, not a
   guarantee. Results vary by home." AND drop one of the two text-shadow layers on the caveat (keep
   a single `0 1px 6px rgba(250,248,245,0.85)`).
2. **[P1] Mid-reveal looks broken.** The caveat (says "figures", plural) renders BEFORE the 90%/R-49
   reveal, so a slow scroller sees fine print for data not yet on screen. → Gate the caveat opacity
   to the LAST stat's reveal window (`WINDOWS[2]`), or tighten the reveal windows so the gap closes.
   (Desktop reveal is scroll-driven via `revealStats`/`WINDOWS`; the caveat currently has no ref/gate.)
3. **[P2] Desktop support row ragged.** "R-49" floats with more air than "90%" (baseline align +
   uneven label wraps). → Equal min-width columns on the two support figures, or left-stack all three
   like the hero. (Mobile centered version reads STRONGER than desktop — consider why.)
4. **[P2] Scroll tunnel longer than payload.** Desktop container `420vh` (mobile `280svh`) for 3
   facts + a 7s burst on a CTA-less proof beat. → Compress desktop to ~280-300vh. ⚠️ Touches scroll
   timing (the VID_START/window/marginTop math is sensitive — framer progress for this container is
   compressed by the big negative margin; see commit history). Verify with `scripts/statshot.mjs`.

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
