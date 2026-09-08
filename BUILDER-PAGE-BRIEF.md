# BRIEF — the builder / new-construction side of the site

*Written Sep 8 2026 by the marketing lane. Handoff to the site lane. **Nothing here is built yet.***

**Source of truth for strategy:** `H:\Claude Code Folders\carolux-marketing\NEW-CONSTRUCTION.md`
**Live builder lead this unblocks:** `carolux-marketing\BUILDER-OUTREACH.md` §1

---

## WHY THIS EXISTS

**New construction has been the objective since the start.** Retrofit is the on-ramp that builds the experience and reputation to win a builder subcontract, not the destination. That is recorded in every `CLAUDE.md` across the Carolux projects, and nothing on the website reflects it.

**The site currently reads as an attic-retrofit company.** `app/services/` has exactly three pages: `attic-insulation`, `crawl-space-insulation`, `air-sealing`. A builder who looks Carolux up finds nothing about exterior walls, sound batt, rim joists, mineral wool or new construction, which is most of what a new build needs.

There is a **live builder enquiry right now** for three new single-family homes in Gastonia with more to follow. When he checks the website, the above is what he sees. That is the gap this brief closes.

---

## THE PITCH — read this before writing a word of copy

**The homeowner pitch does not work on a builder.** "Owner-operated, the person who assessed your home does the work" sells to a homeowner. A builder does not care who shows up, as long as the house passes inspection and the rater does not downgrade it.

**The builder pitch is RESNET Grade I installation, and the documentation that proves it.**

The mechanism, which the copy should make legible without lecturing:

- Duke pays **builders** an incentive per home for efficient new construction. ENERGY STAR v3 and most utility programmes **require Grade I insulation** to qualify.
- A **HERS rater grades the insulation before drywall.** Grade I means only occasional very small gaps, with compression or incomplete fill under 2% of area.
- **Grade III makes RESNET model 5% of the insulated area as uninsulated.** The builder paid for insulation that then stops counting toward their score.
- In DOE field surveys, **only about half of homes achieve Grade I.**
- Surveyed builders' top complaints about insulation subs: **wrong materials (27%) and improper installation (22%).** The complaint is care and correctness, not price.

**The page's job is to say: we work to Grade I, we photograph every bay before drywall, and your rater and your inspector both get what they need.**

Two owners doing every job with no crew paid by the house is the labour model that produces that. Tony spent years as an NC home inspector, which is what produces the documentation. That is the whole argument.

---

## WHAT TO BUILD

A builder-facing route. `/builders` or `/new-construction`, site lane's call on slug and IA. It does **not** belong under `/services/`, which is homeowner-facing and conversion-shaped for a different reader.

Suggested sections, in priority order:

1. **Hero.** New-construction insulation for Gaston and Mecklenburg builders. Lead on passing inspection and the rater, not on comfort or energy bills.
2. **What we install** — the full capability table below. This section alone fixes the stale-capability problem.
3. **Grade I and documentation** — the differentiator. Photographed before drywall.
4. **Who does the work** — two owners, every job, no subcontractors. Tony's inspector background as the proof, not the headline.
5. **What we do not do** — spray foam, stated plainly. Saying no upfront is a trust signal to a builder and prevents wasted bids.
6. **Insurance and paperwork** — insured, certificate of insurance on request, W-9 on request.
7. **Service area.**
8. **CTA** — send plans for a bid. A builder wants to hand over drawings, not fill in a comfort survey. **Do not reuse the homeowner lead form or the estimator.**

---

## CAPABILITY — the correct list

⚠️ The three existing service pages understate this badly. Copy written off the short list has already produced a wrong bid scope on a builder RFQ once.

| Material | Forms | Notes |
|---|---|---|
| Fiberglass | Batt + blown-in | Default. Owens Corning AttiCat / Pink Next Gen |
| Mineral wool (Rockwool) | Batt | Premium tier. **The right answer for sound insulation** |
| Rigid foam board | Cut-and-cobble | **Rim and band joists.** Not spray foam, a different product, and we do install it |
| Americover vapor barrier | 8-mil / 10-mil / anti-microbial | Crawl space |
| ~~Spray foam~~ | — | **Never** |

**Applications:** attic (new / replacement / top-off) · exterior walls · interior walls for sound · crawl space between floor joists · **rim and band joists** · air sealing.

**Rim joists deserve their own paragraph.** Batt at a band joist is a building-science failure: it is air-permeable, so interior air reaches the cold rim and condenses behind it. Rigid board, sealed, is the answer. Knowing this and saying it out loud is a credibility marker with builders, and almost nobody else says it.

⚠️ **Cellulose is deliberately absent from that table.** See the next section.

---

## WHAT THIS PAGE MUST NOT CLAIM

A website makes a claim permanent, public and quotable. Every one of these is a live risk today.

| Do not claim | Why |
|---|---|
| **Dense-pack cellulose** | We list it internally as a capability and **we cannot currently do it.** It needs 2.9–3.5 psi at the machine takeoff with a 1 HP blower and rotary valve feed. The rented Home Depot machine has none of that. Keep cellulose off the site until a machine exists |
| **Production-builder experience** | We have never worked for Lennar, Pulte, D.R. Horton or similar. Do not imply volume or a roster we do not have |
| **Completed new-construction jobs** | There are none yet. Retrofit job photos exist; new-build photos do not |
| **That we achieve or certify Grade I** | We have never had an install graded. Say we **work to** the Grade I standard and document it. We install, the rater grades. Never imply we grade, rate or certify anything |
| **Specific Duke incentive dollar amounts** | The figures in our research are unverified against Duke's own programme terms. Say an incentive exists and depends on the programme, not a number |
| **ENERGY STAR partnership or affiliation** | We have none. Referring to the standard is fine; implying membership is not |
| **A HERS score, an ACH50 result, or code-compliance guarantee** | We influence these. We do not control or certify them |

---

## HARD BRAND CONSTRAINTS — non-negotiable, same as every Carolux surface

- **Never the word "licensed," in any tense,** about Tony or the company. Tony is a **former NC home inspector.** The company is **insured**, not licensed. This has been the single most repeated violation across Carolux files
- **Never the word "mold."** Use "biological growth" or "moisture." Manufacturer product names are exempt
- **No spray foam**, ever, as something we offer
- **Never speak negatively about a competitor**, including a builder's current insulation sub
- **No dollar savings promises.** "Up to about 15%" plus "every home is different, results vary"
- **2-year workmanship guarantee.** Never 1-year
- **Never publish internal per-sqft pricing.** Rates are internal
- Palette, typography and component conventions: follow this repo's `CLAUDE.md` and `AGENTS.md`. Reuse `app/components/sectionKit.js` rather than inventing new section primitives

---

## OPEN QUESTIONS FOR THE OWNER

These need Juan or Tony, not a guess from the site lane.

1. **Slug and nav placement.** Does the builder page go in the main nav, or stay unlinked and get sent directly to builders? Unlinked is defensible while there are zero completed new-construction jobs.
2. **Does the CTA collect plans?** A file upload changes the form and the backend. A `mailto:team@caroluxinsulation.com` "send us your plans" is the zero-build version and may be enough to start.
3. **Should the three existing service pages also be corrected** to list the fuller capability, or does the homeowner-scoped short list stay short on purpose?

---

## VERIFY BEFORE SHIPPING

- Zero instances of "licensed," "mold," spray foam as an offering, or any dollar savings figure
- No cellulose anywhere on the page
- Nothing claiming completed new-construction work, production-builder experience, or certification
- The guarantee reads **2-year**
- A builder can find, in under ten seconds: what we install, what we do not, that we are insured, and how to send plans
