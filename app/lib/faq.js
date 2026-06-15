// FAQ content for the homepage FAQ section and its FAQPage schema.
// Answer-first, ~40-60 words each (snippet-extractable for AI answer engines),
// inside the legal guardrails (former inspector, insured-not-licensed, air
// sealing wording, no "mold", no exact-$ savings, no spray foam, no competitor
// knocks). Kept in its own file so the SEO lane can author it without editing
// the design lane's content.js; move it into content.js later if preferred.

export const FAQ = {
  eyebrow: "Common Questions",
  title: "Straight answers before you call",
  items: [
    {
      // Answer-first with price range — "It depends" opener failed AI extractability.
      // learnMoreHref: design lane, please render as a small link after answer text
      // in FaqItem. Keep answer string clean — used verbatim in FAQPage schema.
      q: "How much does attic insulation cost in Charlotte?",
      a: "Attic blown-in insulation in Charlotte typically runs $1.00–$5.00 per square foot installed, depending on contractor type and scope. Specialty insulation companies generally fall in the $1.25–$2.50/sqft range. The exact cost depends on your attic's current R-value, whether removal is needed, and square footage. The estimate is free and in writing the same day.",
      learnMoreHref: "/cost-guide",
      learnMoreLabel: "See full Charlotte price guide →",
    },
    {
      // "our climate" replaced — not self-contained for AI extraction outside page context.
      q: "What R-value should attic insulation be in North Carolina?",
      a: "The U.S. Department of Energy recommends R-49 for attics in North Carolina's climate zone. Homes below R-49 lose conditioned air year-round through the ceiling. Carolux installs to R-49 on every full attic job. Bringing an under-insulated attic up to R-49 is typically where homeowners feel the difference in comfort and in monthly energy bills.",
    },
    {
      q: "What is the difference between blown-in and batt insulation?",
      a: "Blown-in is loose fiberglass or cellulose blown across the attic floor, so it fills the gaps and odd corners that pre-cut pieces miss. Batt is fiberglass cut to fit between framing, hand-fitted between crawl space floor joists. Carolux uses whichever suits the space — and sometimes both in one home.",
    },
    {
      // Rephrased from "Do you" to a general query pattern — better AI extraction.
      q: "Is air sealing included with insulation installation?",
      a: "Yes — Carolux includes air sealing on every full insulation install at no extra charge. Before insulation goes in, leaks around light fixtures, plumbing penetrations, and wall top plates are sealed. Skipping that step is the most common reason insulation underperforms. Air sealing is not included on small top-off jobs; Carolux will say so upfront.",
    },
    {
      // Rephrased from "Are you" — self-contained for AI citation.
      q: "Does Carolux carry insurance, and is an insulation contractor license required in NC?",
      a: "Carolux carries full general liability insurance. North Carolina does not require a contractor license for residential insulation work, so no insulation crew holds one for this scope. Carolux co-owner Tony Kermis is a former NC home inspector — the person who reads your attic knows what he is looking at.",
    },
    {
      // Strengthened opener — "It can" is not extractable by AI systems.
      q: "Will new insulation actually lower my energy bills?",
      a: "Yes. The EPA's ENERGY STAR program estimates that air sealing plus proper insulation reduces heating and cooling costs by up to 15%. Results vary by home; they depend on your HVAC efficiency, habits, and how under-insulated your attic is now. Carolux provides an honest projection during the free energy audit. Savings vary. Find out why in the seller's fact sheet on R-values. Higher R-values mean greater insulating power.",
    },
    {
      // Answer-first — "if...then yes" buried the answer.
      q: "Do I need a vapor barrier in my crawl space?",
      a: "Yes, for most Charlotte-area homes. North Carolina's humid summers push moisture up through bare-dirt crawl spaces and into the subfloor above, raising energy bills and accelerating wood rot. A heavy-duty vapor barrier keeps humidity down where it belongs. Carolux installs the liner and checks drainage in the same visit.",
    },
    {
      // Rephrased from "do you serve" — self-contained with Carolux named.
      q: "What areas around Charlotte does Carolux serve?",
      a: "Carolux serves Charlotte, Huntersville, Pineville, Matthews, Mint Hill, Concord, Harrisburg, Gastonia, Belmont, Cramerton, Lowell, Mount Holly, and Stanley, NC — plus the surrounding Piedmont. If your town isn't on the list but you're near the metro, call (704) 228-2729. There's a good chance the area is covered.",
    },
    {
      // NOTE (verify): "most attic jobs in a day" — confirm matches real scheduling before launch.
      // Minor self-containment fix — replaced "we/both owners" with named context.
      q: "How long does insulation installation take?",
      a: "Most attic insulation jobs wrap up in a single day. Crawl space work can run longer depending on size and moisture conditions found on-site. Both Carolux owners — Tony and Juan — are present from start to finish, and a walkthrough of the finished work happens before the crew leaves.",
    },
  ],
};
