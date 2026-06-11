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
      q: "How much does attic insulation cost in Charlotte?",
      a: "It depends on the size of your attic, what insulation is up there now, and how much air sealing the job needs. We price by the square foot and put the full number in writing the same day we visit, so nothing changes on you later. The estimate is free, and our online calculator gives you a rough idea first.",
    },
    {
      q: "What R-value should attic insulation be in North Carolina?",
      a: "The U.S. Department of Energy recommends R-49 for attics in our climate, and that is the level we install to on a full attic job. If yours is under-insulated, bringing it up to R-49 is usually where you feel the difference in comfort and in your monthly bill.",
    },
    {
      q: "What is the difference between blown-in and batt insulation?",
      a: "Blown-in is loose fiberglass or cellulose blown across the attic floor, so it fills the gaps and odd corners that pre-cut pieces miss. Batt is fiberglass cut to fit between framing, which we hand-fit between crawl space floor joists. We use whichever suits the space, and sometimes both in one home.",
    },
    {
      q: "Do you include air sealing?",
      a: "Yes, on every full insulation install, at no extra charge. Before we add insulation, we seal the leaks around light fixtures, plumbing, and the top plates of your walls. Skipping that step is the most common reason insulation underperforms. We don't auto-include it on small top-off jobs, and we'll tell you when that applies.",
    },
    {
      q: "Are you licensed and insured?",
      a: "We carry full liability insurance. North Carolina does not require a contractor license for residential insulation at the sizes we handle, so it isn't a license any insulation crew would hold for this work. What sets us apart: co-owner Tony is a former NC home inspector, so the person reading your attic knows what he is looking at.",
    },
    {
      q: "Will new insulation actually lower my energy bills?",
      a: "It can. The EPA's ENERGY STAR program estimates that air sealing plus proper insulation saves up to about 15% on heating and cooling costs. Every home is different, so your result depends on your HVAC, your habits, and the shape your attic is in now. We give you an honest read during the estimate.",
    },
    {
      q: "Do I need a vapor barrier in my crawl space?",
      a: "If your crawl space is bare dirt or it tends to feel damp, then yes. An open crawl space pulls humid air up into your home, which drives up bills and can lead to wood rot over time. We lay a heavy-duty vapor barrier and check the drainage, so moisture stays down where it belongs.",
    },
    {
      q: "What towns around Charlotte do you serve?",
      a: "We cover Charlotte and most of the surrounding Piedmont, including Huntersville, Pineville, Matthews, Mint Hill, Concord, Harrisburg, Gastonia, Belmont, Cramerton, Lowell, Mount Holly, and Stanley. If your town isn't on the list but you are near the metro, give us a call. There's a good chance we still come to you.",
    },
    {
      // NOTE (verify): "most attic jobs in a day" is a reasonable default for
      // residential blown-in — confirm it matches your real scheduling before launch.
      q: "How long does the work take?",
      a: "Most attic jobs wrap up in a single day. Crawl space work can run a little longer, depending on the size and how much moisture we find. Either way, both owners are on site from start to finish, and we walk the finished job with you before we pack up.",
    },
  ],
};
