import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { COMPANY } from "../lib/content";

const BASE_URL = "https://caroluxinsulation.com";

const C = {
  cream: "#faf8f5",
  surface: "#fefdfb",
  navy: "#1a2b3c",
  teal: "#4a90a4",
  ink: "#2c2c2c",
  inkSoft: "rgba(26,43,60,0.65)",
  border: "rgba(26,43,60,0.1)",
};

// ─── Per-city content ─────────────────────────────────────────────────────────
// Slugs are keyword-rich ([city]-insulation) so URLs carry the service keyword.
// Each entry: displayName, county, blurb (local context, shown under hero),
// and 4 answer-first FAQs (~40-60 words each, AI-extractable, legal-compliant).
// Legal guardrails: insured-not-licensed, Tony = FORMER inspector, air sealing
// wording ("included with every full install, at no extra charge"), no exact-$
// savings (use % + DOE/ENERGY STAR), no spray foam, never knock competitors.

const CITIES = {
  "charlotte-insulation": {
    displayName: "Charlotte",
    county: "Mecklenburg County",
    blurb:
      "Charlotte's insulation market has no shortage of crews. What most don't offer: the owners actually doing the work, air sealing included on every full install, and a specialty contractor's price instead of a franchise overhead markup.",
    faq: [
      {
        q: "How much does attic insulation cost in Charlotte, NC?",
        a: "Charlotte attic blown-in insulation typically runs $1.00–$5.00+ per square foot installed across the market. Specialty owner-operated crews generally fall in the $1.25–$2.50/sqft range; large multi-service home-comfort companies with more overhead often quote $3.00–$5.00/sqft for the same R-49 install. A free energy audit gives you a firm, all-in number for your specific home.",
      },
      {
        q: "What R-value does a Charlotte attic need?",
        a: "The U.S. Department of Energy recommends R-49 for attics in North Carolina's climate zone, which covers all of Charlotte and Mecklenburg County. Most Charlotte homes built before 2010 fall well short of R-49. The gap is where your conditioned air — and your money — quietly escapes year-round through the ceiling above.",
      },
      {
        q: "Does Carolux serve all of Charlotte?",
        a: "Yes — Carolux works throughout Charlotte, from South End and Ballantyne to NoDa, Plaza Midwood, Steele Creek, University City, and every neighborhood in between. Both owners are present on every job, regardless of which part of the city. Call (704) 228-2729 to confirm availability for your specific address.",
      },
      {
        q: "Does air sealing make a real difference, or is it just an upsell?",
        a: "Air sealing is not an upsell at Carolux — it's included on every full installation at no extra charge. Sealing gaps around light fixtures, plumbing penetrations, and top plates before insulation goes in is the step that makes the R-value actually perform. Skipping it is the most common reason Charlotte homeowners don't feel the difference after a re-insulation job.",
      },
    ],
  },

  "huntersville-insulation": {
    displayName: "Huntersville",
    county: "Mecklenburg County",
    blurb:
      "Huntersville's growth era — the 2000s and 2010s — produced a lot of homes that met code minimums at the time but fall short of today's R-49 standard. An attic that was 'fine' at build is often quietly under-performing now.",
    faq: [
      {
        q: "How much does insulation cost in Huntersville, NC?",
        a: "Huntersville attic insulation runs the Charlotte-metro range: $1.25–$2.50/sqft for specialty owner-operated crews targeting R-49, up to $3.00–$5.00/sqft for larger home-services companies. Project cost depends on your current R-value, square footage, and whether removal is needed. The free energy audit returns a firm all-in quote the same day.",
      },
      {
        q: "Do Huntersville homes from the 2000s and 2010s need new insulation?",
        a: "Many do. Homes built in Huntersville to North Carolina code in the 2000s were often installed at R-30 to R-38 — below today's DOE-recommended R-49. Over 15–20 years, blown-in insulation settles and effective R-values drop further. The symptom is often a hot second floor in summer or higher-than-expected energy bills year-round.",
      },
      {
        q: "Does Carolux serve Huntersville and the Lake Norman area?",
        a: "Yes — Carolux serves Huntersville, Cornelius, Davidson, and the Lake Norman corridor as part of its regular Mecklenburg County service area. Both owners are present on every job in the area. Call (704) 228-2729 for scheduling or to confirm coverage for your specific address near the lake.",
      },
      {
        q: "Is crawl space encapsulation worth it in Huntersville?",
        a: "For Huntersville homes with a vented crawl space and bare earth or an open dirt floor, a vapor barrier is almost always a worthwhile investment. North Carolina's humid summers push moisture up through the ground and into the subfloor, accelerating wood degradation and raising HVAC load. A properly installed liner keeps that humidity below the house where it belongs.",
      },
    ],
  },

  "pineville-insulation": {
    displayName: "Pineville",
    county: "Mecklenburg County",
    blurb:
      "Pineville and the South Charlotte corridor sit at the edge of the Charlotte core — a mix of older ranches and newer builds where attic conditions can vary widely from block to block.",
    faq: [
      {
        q: "How much does attic insulation cost in Pineville, NC?",
        a: "Pineville insulation costs fall within Charlotte-market rates: $1.25–$2.50/sqft for specialty owner-operated crews installing to R-49, up to $3.00–$5.00/sqft for large home-services companies. The free energy audit Carolux provides for Pineville homeowners returns an exact, all-in written quote — not an estimate based on square footage alone.",
      },
      {
        q: "What are common insulation problems in Pineville homes?",
        a: "Older Pineville homes — ranches and splits from the 1970s through early 2000s — frequently have settled fiberglass batts, missing insulation over additions, and no air sealing. Conditioned air leaks above ceilings year-round. Newer builds near Ballantyne usually have adequate depth but still benefit from air sealing verification before ruling out the attic as the source of high bills.",
      },
      {
        q: "Does Carolux serve Pineville and South Charlotte?",
        a: "Yes — Pineville is part of Carolux's regular Mecklenburg County service area. Both owners work the South Charlotte and Pineville corridor regularly. Call (704) 228-2729 or fill out the estimate form and an owner will get back to you, usually within a few hours of your request.",
      },
      {
        q: "Do I need a vapor barrier in a Pineville crawl space?",
        a: "Most Pineville homes with a vented crawl space and an exposed dirt floor benefit significantly from a vapor barrier. North Carolina's humid summers create conditions where moisture wicks up from the ground into the wood structure above. A heavy-duty liner keeps the subfloor and floor joists significantly drier and reduces the HVAC load on the home throughout the year.",
      },
    ],
  },

  "matthews-insulation": {
    displayName: "Matthews",
    county: "Mecklenburg/Union County",
    blurb:
      "Matthews is a family-heavy southeast Charlotte suburb with a wide mix of home ages — from 1980s ranches to 2010s new-construction. Attic conditions in Matthews vary more than most homeowners expect.",
    faq: [
      {
        q: "How much does insulation cost in Matthews, NC?",
        a: "Matthews insulation jobs price in line with the Charlotte market: $1.25–$2.50/sqft for specialty owner-operated crews targeting R-49, up to $3.00–$5.00/sqft for large home-services companies. Carolux provides a free on-site energy audit and same-day written quote — no guessing based on square footage without seeing your actual attic.",
      },
      {
        q: "My Matthews home feels hot upstairs in summer — is that an insulation problem?",
        a: "Usually, yes. Heat rising into the upper floor is the most common sign of an under-insulated attic. In Matthews homes, the typical culprit is insulation installed to code minimums — often R-30 to R-38 — that has settled over the years. Adding air sealing and bringing depth up to R-49 is the fix in the majority of cases.",
      },
      {
        q: "Does Carolux serve Matthews and the southeast Charlotte suburbs?",
        a: "Yes — Matthews is part of Carolux's regular service area. Both owners work the Matthews, Stallings, and southeast Charlotte corridor regularly. Call (704) 228-2729 for scheduling or to confirm availability for your specific address in the area.",
      },
      {
        q: "What R-value does a Matthews, NC attic need?",
        a: "The U.S. Department of Energy recommends R-49 for all North Carolina attics, including Matthews. Homes built in the 1990s and 2000s were frequently installed at R-30 — well below the current target. R-49 is where most Matthews homeowners start to notice the difference in both comfort and monthly energy costs.",
      },
    ],
  },

  "mint-hill-insulation": {
    displayName: "Mint Hill",
    county: "Mecklenburg County",
    blurb:
      "Mint Hill's mix of established older homes and larger newer lots means attic conditions vary significantly — some houses are properly insulated, many others sit on decades-old materials that have settled well below R-49.",
    faq: [
      {
        q: "How much does insulation cost in Mint Hill, NC?",
        a: "Mint Hill insulation costs fall within the Charlotte market range: $1.25–$2.50/sqft for specialty owner-operated crews installing to R-49. Large multi-service companies often quote $3.00–$5.00/sqft for the same work. The free energy audit Carolux provides for Mint Hill homeowners takes about 45 minutes and returns a written all-in quote the same day.",
      },
      {
        q: "Do older Mint Hill homes need insulation removed before installing new?",
        a: "Sometimes. If existing insulation is damaged, contaminated, or compacted below R-10, removal is the better path before adding new material. Blowing new insulation over severely degraded batts recovers little performance. Carolux checks this during the free assessment and tells you upfront whether removal is part of the scope and what it adds to the total cost.",
      },
      {
        q: "Does Carolux serve Mint Hill, NC?",
        a: "Yes — Mint Hill is part of Carolux's eastern Mecklenburg service area. Both owners are on every job in Mint Hill. Call (704) 228-2729 or submit an estimate request online and an owner will follow up, usually within a few hours of your request.",
      },
      {
        q: "What causes high energy bills in Mint Hill homes?",
        a: "In most Mint Hill homes, high energy bills trace back to the attic: insufficient insulation depth, missing air sealing around ceiling penetrations, or both. Conditioned air leaks through bypasses before insulation has a chance to slow it down. Sealing the air barrier first — then adding insulation to R-49 — is what actually moves the energy bill month to month.",
      },
    ],
  },

  "concord-insulation": {
    displayName: "Concord",
    county: "Cabarrus County",
    blurb:
      "Concord is one of the faster-growing cities in the Charlotte metro — meaning its housing stock ranges from decades-old mill-era homes to brand-new construction, and insulation conditions cover the full spectrum.",
    faq: [
      {
        q: "How much does attic insulation cost in Concord, NC?",
        a: "Concord attic insulation runs in line with the Charlotte-metro market: $1.25–$2.50/sqft for owner-operated specialty crews targeting R-49, up to $3.00–$5.00/sqft for larger home-services companies. The free energy audit Carolux provides for Concord homeowners returns a written all-in quote the same day — no estimates based on square footage alone.",
      },
      {
        q: "Does Carolux serve Concord and Cabarrus County?",
        a: "Yes — Concord and Harrisburg are part of Carolux's regular Cabarrus County service area. Both owners travel to Concord for jobs regularly. Call (704) 228-2729 to confirm scheduling or submit an estimate request online and an owner will follow up within a few hours.",
      },
      {
        q: "What R-value should a Concord, NC attic have?",
        a: "The U.S. Department of Energy recommends R-49 for all of North Carolina, including Cabarrus County. Most Concord homes built before 2012 fall short of R-49 — often landing at R-19 to R-30. That was legal at the time of construction but well below where energy efficiency starts to show up in monthly bills and daily comfort.",
      },
      {
        q: "Do Concord homes need crawl space vapor barriers?",
        a: "Most Concord homes with vented crawl spaces and bare-earth floors benefit from a vapor barrier. Cabarrus County sits in a humid region where ground moisture migrates up into the wood structure through summer. A heavy-duty poly liner keeps the subfloor drier, reduces HVAC load, and slows wood degradation. Carolux checks drainage conditions during the same visit as the attic assessment.",
      },
    ],
  },

  "harrisburg-insulation": {
    displayName: "Harrisburg",
    county: "Cabarrus County",
    blurb:
      "Harrisburg sits between Charlotte and Concord — much of its housing stock is newer suburban construction from the 2000s and 2010s that often installed to code minimums now below DOE recommendations.",
    faq: [
      {
        q: "How much does insulation cost in Harrisburg, NC?",
        a: "Harrisburg insulation prices track the Charlotte-metro market: $1.25–$2.50/sqft for specialty owner-operated crews, up to $3.00–$5.00/sqft for larger home-services companies. Project cost depends on your attic's current R-value, square footage, air sealing scope, and whether removal is needed. The free energy audit returns a firm all-in quote the same day.",
      },
      {
        q: "Does Carolux serve Harrisburg, NC?",
        a: "Yes — Harrisburg is part of Carolux's Cabarrus County service area alongside Concord. Both owners service the Harrisburg area regularly. Call (704) 228-2729 or submit an estimate request online and an owner will respond within a few hours.",
      },
      {
        q: "Do newer Harrisburg homes have adequate insulation?",
        a: "Not always. Homes built in Harrisburg in the 2000s and 2010s were typically installed to the code minimum of R-30 at the time — below today's DOE-recommended R-49. Over 15–20 years, blown-in insulation settles further. If your Harrisburg home has a hot second floor in summer or unexpectedly high bills, the attic is the first place to check.",
      },
      {
        q: "What is the difference between attic insulation and crawl space work?",
        a: "Attic insulation controls heat transfer through the ceiling — the largest energy loss point in most Harrisburg homes. Crawl space work addresses moisture and heat transfer through the floor, critical for homes with vented crawl spaces where ground humidity migrates upward. Many homes benefit from both; Carolux assesses each area during the same free visit.",
      },
    ],
  },

  "belmont-insulation": {
    displayName: "Belmont",
    county: "Gaston County",
    blurb:
      "Belmont's older established neighborhoods — many homes dating to the mid-20th century — often have insulation that's original, minimal, or compacted over decades to near-zero performance.",
    faq: [
      {
        q: "How much does insulation cost in Belmont, NC?",
        a: "Belmont insulation prices are in line with the Charlotte-metro market: $1.25–$2.50/sqft for specialty owner-operated crews. Older Belmont homes sometimes need removal of damaged or compacted material first, adding $1.00–$3.00/sqft — Carolux identifies this during the free assessment so the total cost is clear before any commitment.",
      },
      {
        q: "Do older Belmont homes need insulation removed before adding new?",
        a: "Sometimes — particularly homes built before 1980 where original batts have compressed significantly or show moisture damage. Installing new blown-in material over severely degraded insulation doesn't recover much performance. Carolux checks the current state during the free energy audit and recommends removal only when it genuinely improves the outcome for your specific home.",
      },
      {
        q: "Does Carolux serve Belmont and western Gaston County?",
        a: "Yes — Belmont is part of Carolux's regular Gaston County service area. Both owners work the Belmont and Mount Holly corridor. Cramerton and Lowell are also in the regular service area. Call (704) 228-2729 to confirm scheduling for your specific Belmont address.",
      },
      {
        q: "Why is my Belmont home cold in winter even with the heat on?",
        a: "In older Belmont homes, drafts and high heating costs usually trace back to the attic and crawl space together. Air leaks around ceiling penetrations let conditioned air escape upward; a poorly-lined crawl space lets cold air enter from below. Addressing both ends — air sealing and insulation above, vapor barrier below — is what actually stabilizes indoor temperature.",
      },
    ],
  },

  "cramerton-insulation": {
    displayName: "Cramerton",
    county: "Gaston County",
    blurb:
      "Cramerton is a small Gaston County town with a mix of older and newer housing — homes that often reflect the insulation practices (and shortfalls) of the decade they were built.",
    faq: [
      {
        q: "How much does insulation cost in Cramerton, NC?",
        a: "Cramerton insulation jobs price in line with the Charlotte-metro market: $1.25–$2.50/sqft for owner-operated specialty crews targeting R-49, up to $3.00–$5.00/sqft for larger home-services companies. The free energy audit Carolux provides returns a written all-in quote the same day — no estimates that ignore your attic's actual current condition.",
      },
      {
        q: "Does Carolux serve Cramerton and the greater Gastonia area?",
        a: "Yes — Cramerton is part of Carolux's Gaston County service area. Both owners serve Cramerton, Lowell, Belmont, Gastonia, and the surrounding Gaston County communities. Call (704) 228-2729 for scheduling or submit an estimate request and an owner will get back to you within a few hours.",
      },
      {
        q: "Do older Cramerton homes need full insulation replacement?",
        a: "Not always. Whether existing insulation needs removal depends on its condition — if it's compacted, moisture-damaged, or contaminated, removal improves the outcome. If it's intact and simply below R-49, adding blown-in material on top is often the right call. Carolux makes this determination during the free assessment and gives you the straight recommendation.",
      },
      {
        q: "How does air sealing help in a Cramerton home?",
        a: "Air sealing closes gaps that let conditioned air bypass insulation entirely — around ceiling lights, plumbing penetrations, and framing joints. Even a well-insulated attic will underperform if those bypasses are open. Carolux includes air sealing on every full insulation install at no extra charge, because it's the step that makes the rest of the work actually hold.",
      },
    ],
  },

  "gastonia-insulation": {
    displayName: "Gastonia",
    county: "Gaston County",
    blurb:
      "Gastonia has a large stock of older homes — many from the mid-20th century — where original insulation has long since compacted below any useful performance level. High energy bills and uneven temperatures are the predictable result.",
    faq: [
      {
        q: "How much does attic insulation cost in Gastonia, NC?",
        a: "Gastonia attic insulation runs the Charlotte-metro market range: $1.25–$2.50/sqft for owner-operated specialty crews targeting R-49. Older Gastonia homes that need removal of compacted or damaged material add $1.00–$3.00/sqft — Carolux identifies this during the free assessment so there are no surprises on job day.",
      },
      {
        q: "Do older Gastonia homes need insulation removal before installing new?",
        a: "Often, yes. Homes built in Gastonia before 1980 frequently have original insulation — sometimes as little as R-7 to R-11 — that has compacted flat over decades. Adding new material over severely degraded old insulation recovers some performance, but full removal and replacement is frequently the better path. Carolux will tell you which applies to your home and what it costs, at no charge.",
      },
      {
        q: "Does Carolux serve all of Gastonia and Gaston County?",
        a: "Yes — Gastonia is one of Carolux's core service cities in Gaston County, alongside Belmont, Cramerton, Lowell, and Mount Holly. Both owners service Gastonia regularly. Call (704) 228-2729 or submit an estimate request online and an owner will follow up within a few hours.",
      },
      {
        q: "What causes high energy bills in Gastonia homes?",
        a: "In most older Gastonia homes, the attic is the primary culprit. Original insulation installed decades ago may have compacted to an effective R-value well below R-10, offering almost no resistance to heat transfer. Air leaks around ceiling penetrations compound the problem further. Addressing both — air sealing first, then insulation to R-49 — is what moves the energy bill month to month.",
      },
    ],
  },

  "lowell-insulation": {
    displayName: "Lowell",
    county: "Gaston County",
    blurb:
      "Lowell is a small Gaston County mill town with older housing stock — homes where insulation was often installed once, decades ago, and hasn't been revisited since.",
    faq: [
      {
        q: "How much does insulation cost in Lowell, NC?",
        a: "Lowell insulation projects price in line with the Charlotte-metro market: $1.25–$2.50/sqft for specialty owner-operated crews targeting R-49. Exact cost depends on your attic's current R-value, whether older material needs removal, and square footage. Carolux provides a free energy audit and same-day written quote for Lowell homeowners.",
      },
      {
        q: "Does Carolux serve Lowell and surrounding Gaston County?",
        a: "Yes — Lowell is part of Carolux's regular Gaston County service area alongside Gastonia, Cramerton, Belmont, and Mount Holly. Both owners work the western Gaston County area regularly. Call (704) 228-2729 to confirm scheduling or submit an estimate request online.",
      },
      {
        q: "Do Lowell's older homes have insulation problems?",
        a: "Most do. Older Lowell homes built in the early-to-mid 20th century were constructed before modern insulation standards existed. What's in the attic — if anything — has typically settled over decades. The result: high summer heat upstairs, drafts in winter, and energy bills that don't make sense relative to the size of the home.",
      },
      {
        q: "Is a crawl space vapor barrier worth it in Lowell, NC?",
        a: "For most Lowell homes with vented crawl spaces, yes. Ground moisture in Gaston County summers moves upward into the subfloor and framing, raising indoor humidity and putting load on the HVAC system. A heavy-duty vapor barrier liner keeps that moisture below the floor. Carolux checks drainage and access during the same free visit as the attic assessment.",
      },
    ],
  },

  "mount-holly-insulation": {
    displayName: "Mount Holly",
    county: "Gaston County",
    blurb:
      "Mount Holly sits at the eastern edge of Gaston County — close enough to Charlotte to draw buyers, old enough in its housing stock to have real insulation gaps that show up in energy bills every month.",
    faq: [
      {
        q: "How much does insulation cost in Mount Holly, NC?",
        a: "Mount Holly insulation costs track the Charlotte-metro range: $1.25–$2.50/sqft for specialty owner-operated crews. Older homes sometimes require removal of damaged or compacted material first — Carolux flags this during the free assessment so the full cost is clear before any commitment is made.",
      },
      {
        q: "Does Carolux serve Mount Holly and Gaston County?",
        a: "Yes — Mount Holly is part of Carolux's Gaston County service area, alongside Belmont, Cramerton, Lowell, and Gastonia. Both owners work the Mount Holly and eastern Gaston area regularly. Call (704) 228-2729 for scheduling or submit an estimate request and an owner will respond within a few hours.",
      },
      {
        q: "What are typical insulation problems in Mount Holly homes?",
        a: "Older Mount Holly homes — particularly those from the 1960s through 1990s — frequently have settled fiberglass batts and little or no air sealing. Air bypasses around ceiling fixtures and plumbing let conditioned air escape before insulation can slow it. The fix is air sealing first, then bringing insulation depth up to R-49 across the full attic floor.",
      },
      {
        q: "Does air sealing really make a difference in older homes?",
        a: "Significantly. In an older Mount Holly home, unsealed bypasses around ceiling lights, top plates, and plumbing penetrations can account for as much heat loss as having almost no insulation at all. Sealing those points before new insulation goes in is what changes the feel of the house day-to-day. Carolux includes air sealing on every full install at no extra charge.",
      },
    ],
  },

  "stanley-insulation": {
    displayName: "Stanley",
    county: "Lincoln County",
    blurb:
      "Stanley sits at the western edge of the Charlotte metro in Lincoln County — a more rural character, a wide range of home ages, and energy bills that consistently trace back to under-insulated attics.",
    faq: [
      {
        q: "How much does insulation cost in Stanley, NC?",
        a: "Stanley insulation projects price in line with the Charlotte-metro market: $1.25–$2.50/sqft for owner-operated specialty crews targeting R-49. Total cost depends on current R-value, square footage, and whether removal is needed. Carolux provides a free on-site energy audit and same-day written quote for Stanley homeowners — no commitment required.",
      },
      {
        q: "Does Carolux serve Stanley and Lincoln County?",
        a: "Yes — Stanley is at the edge of Carolux's regular service area in Lincoln County. Both owners travel to Stanley for jobs. Call (704) 228-2729 to confirm availability for your specific address, or submit an estimate request online and an owner will follow up within a few hours.",
      },
      {
        q: "Do rural Stanley homes have different insulation needs?",
        a: "Not fundamentally — R-49 is the DOE recommendation for all of North Carolina's climate zone, including Lincoln County. What varies with older rural homes in Stanley is the starting point: many were built with minimal insulation or none in the crawl space, and what's in the attic may have settled significantly over the decades since construction.",
      },
      {
        q: "How long does attic insulation installation take in Stanley?",
        a: "Most attic insulation jobs wrap up in a single day. Crawl space work can run longer depending on size and moisture conditions found on-site. Both Carolux owners — Tony and Juan — are present from start to finish on every Stanley job, and a walkthrough of the finished work happens before the crew leaves the property.",
      },
    ],
  },
};

const SLUGS = Object.keys(CITIES);

function getCity(slug) {
  return CITIES[slug] ?? null;
}

export function generateStaticParams() {
  return SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `${city.displayName} Insulation Contractor | Free Estimate | Carolux`,
    description: `Owner-operated attic insulation and crawl space work in ${city.displayName}, NC. Air sealing included on every full install, at no extra charge. Free estimate — call ${COMPANY.phone}.`,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${city.displayName} Insulation Contractor | Carolux`,
      description: `Owner-operated attic insulation and crawl space work in ${city.displayName}, NC. Free estimate from ${COMPANY.phone}.`,
      url: `${BASE_URL}/${slug}`,
      siteName: "Carolux Insulation",
      locale: "en_US",
      type: "website",
    },
  };
}

function buildSchema(slug, city) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // City-page LocalBusiness node — same @id as layout.js so Google
        // recognises this as the same entity, not a duplicate listing.
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#business`,
        name: "Carolux Insulation LLC",
        url: `${BASE_URL}/${slug}`,
        telephone: "+17042282729",
        email: "team@caroluxinsulation.com",
        image: `${BASE_URL}/images/house-thermal4.webp`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: city.displayName,
          addressRegion: "NC",
          addressCountry: "US",
        },
        areaServed: [{ "@type": "City", name: `${city.displayName}, NC` }],
        founder: [
          { "@type": "Person", name: "Tony Kermis" },
          { "@type": "Person", name: "Juan Gonzalez" },
        ],
      },
      {
        "@type": "Service",
        name: `Attic Insulation in ${city.displayName}, NC`,
        serviceType: "Attic Insulation",
        description: `Blown-in attic insulation installed to R-49 in ${city.displayName}, NC. Air sealing included on every full install at no extra charge. Owner-operated, fully insured, 2-year workmanship guarantee.`,
        provider: { "@id": `${BASE_URL}/#business` },
        areaServed: [{ "@type": "City", name: `${city.displayName}, NC` }],
      },
      {
        "@type": "Service",
        name: `Crawl Space Insulation & Vapor Barrier in ${city.displayName}, NC`,
        serviceType: "Crawl Space Insulation",
        description: `Crawl space fiberglass batt insulation and vapor barrier installation in ${city.displayName}, NC. Full moisture and drainage inspection included in every visit.`,
        provider: { "@id": `${BASE_URL}/#business` },
        areaServed: [{ "@type": "City", name: `${city.displayName}, NC` }],
      },
      {
        "@type": "FAQPage",
        mainEntity: city.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

const SERVICES = [
  {
    num: "01",
    title: "Blown-In Attic Insulation",
    getDesc: (city) =>
      `Fiberglass or cellulose blown to R-49 — the DOE standard for North Carolina. Air sealing is done before any material goes in, at no extra charge. Most ${city.displayName} attics finish in a single day.`,
  },
  {
    num: "02",
    title: "Crawl Space & Vapor Barrier",
    getDesc: (city) =>
      `Heavy-duty vapor barrier to stop ground moisture from migrating into the floor structure above. North Carolina's humid summers make crawl space moisture a real cost driver for homes in ${city.displayName} and throughout ${city.county}.`,
  },
  {
    num: "03",
    title: "Fiberglass Batt Insulation",
    getDesc: () =>
      `Hand-fitted batt between crawl space floor joists — no gaps, no shortcuts. Tony and Juan cut and place every piece themselves; that's what separates properly-fitted work from a hurried crew install.`,
  },
];

const WHY_US = [
  ["I", "Owner-Operated", (city) => `Tony and Juan are on the job at every ${city.displayName} project — not a crew you've never met. You get the owners' direct contact and they pick up the phone.`],
  ["II", "Air Sealing Included", () => "Air sealing on every full installation at no extra charge. Most contractors skip it or bill it separately. It's the highest-impact step and the one that separates a real upgrade from a temporary fix."],
  ["III", "2-Year Guarantee", () => "If anything Carolux installed isn't performing correctly within two years, the owners come back and make it right. No questions, no hassle, no fine print."],
  ["IV", "Inspector-Grade Diagnosis", () => "Tony spent years as a North Carolina home inspector before Carolux. He reads the whole house — moisture, airflow, where your money is escaping — before recommending anything."],
];

export default async function CityPage({ params }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const schema = buildSchema(slug, city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* FAQ details/summary reset — hides default browser marker, keeps answers in DOM */}
      <style>{`
        .carolux-city-faq details summary { list-style: none; }
        .carolux-city-faq details summary::-webkit-details-marker { display: none; }
        .carolux-city-faq details[open] .faq-indicator { transform: rotate(45deg); }
        .carolux-city-faq .faq-indicator { transition: transform 240ms ease; display: inline-block; }
      `}</style>

      <Nav />

      <main style={{ backgroundColor: C.cream, color: C.navy }}>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.teal,
              marginBottom: "1.2rem",
            }}
          >
            {city.county} · Insulation Contractor
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.78rem",
              color: C.inkSoft,
              marginBottom: "1rem",
            }}
          >
            By <strong>Tony Kermis</strong>, former NC Home Inspector &amp; co-owner, Carolux
            Insulation · <span>Last updated June 2026</span>
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "1.8rem",
            }}
          >
            {city.displayName} Insulation Contractor, Free Estimate
          </h1>

          {/* Quick-answer box — AEO snippet target */}
          <div
            style={{
              background: `${C.teal}14`,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "1.4rem 1.6rem",
              marginBottom: "1.2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(1rem, 1.2vw, 1.08rem)",
                lineHeight: 1.75,
                color: C.ink,
                margin: 0,
              }}
            >
              <strong>Carolux Insulation serves {city.displayName}, NC</strong> —
              owner-operated attic blown-in insulation, crawl space fiberglass batt, and vapor
              barrier installation. Both owners on every job. Air sealing included on every full
              install at no extra charge. Free energy audit with same-day written quote.{" "}
              Call{" "}
              <a href={COMPANY.phoneHref} style={{ color: C.teal, textDecoration: "none" }}>
                {COMPANY.phone}
              </a>
              .
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.82rem",
              color: C.inkSoft,
              lineHeight: 1.6,
            }}
          >
            {city.blurb}
          </p>
        </section>

        {/* ── Services ───────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(3.5rem, 5vw, 5rem) 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "0.75rem",
              }}
            >
              Insulation Services in {city.displayName}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.95rem",
                color: C.inkSoft,
                lineHeight: 1.65,
                marginBottom: "2rem",
              }}
            >
              Three services, every one installed by the owners.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {SERVICES.map((s) => (
                <div
                  key={s.num}
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                    padding: "1.5rem 0",
                    display: "grid",
                    gridTemplateColumns: "2.5rem 1fr",
                    gap: "1rem",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: C.teal,
                      paddingTop: "3px",
                    }}
                  >
                    {s.num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 600,
                        color: C.navy,
                        margin: "0 0 0.3rem",
                        fontSize: "0.97rem",
                      }}
                    >
                      {s.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.9rem",
                        color: C.inkSoft,
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {s.getDesc(city)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Carolux ────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(4rem, 6vw, 6rem) 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              marginBottom: "0.75rem",
            }}
          >
            Why {city.displayName} Homeowners Choose Carolux
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              color: C.inkSoft,
              lineHeight: 1.65,
              marginBottom: "2rem",
            }}
          >
            Four things most insulation companies don't offer.
          </p>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {WHY_US.map(([roman, title, getDesc]) => (
              <div
                key={roman}
                style={{
                  borderBottom: `1px solid ${C.border}`,
                  padding: "1.5rem 0",
                  display: "grid",
                  gridTemplateColumns: "2.5rem 1fr",
                  gap: "1rem",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: C.teal,
                    paddingTop: "3px",
                  }}
                >
                  {roman}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 600,
                      color: C.navy,
                      margin: "0 0 0.3rem",
                      fontSize: "0.97rem",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9rem",
                      color: C.inkSoft,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {getDesc(city)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        {/* answers stay in the DOM whether open or closed — never JS-gated  */}
        <section
          style={{
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(3rem, 4.5vw, 4.5rem) 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                marginBottom: "2rem",
              }}
            >
              Common Questions: {city.displayName} Insulation
            </h2>
            <div className="carolux-city-faq" style={{ borderTop: `1px solid ${C.border}` }}>
              {city.faq.map(({ q, a }, i) => (
                <details
                  key={i}
                  open={i === 0}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  <summary
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: C.navy,
                      padding: "clamp(20px, 2.7vh, 28px) 0",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    {q}
                    <span
                      className="faq-indicator"
                      style={{
                        color: C.teal,
                        flexShrink: 0,
                        fontSize: "1.4rem",
                        lineHeight: 1,
                        fontWeight: 300,
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <div style={{ paddingBottom: "clamp(22px, 3vh, 32px)" }}>
                    <p
                      style={{
                        margin: 0,
                        maxWidth: "64ch",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "clamp(0.98rem, 1.1vw, 1.05rem)",
                        lineHeight: 1.72,
                        color: C.inkSoft,
                      }}
                    >
                      {a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: C.navy, textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "clamp(5rem, 9vw, 8rem) 1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 400,
                marginBottom: "1rem",
                color: C.cream,
              }}
            >
              Get a Free Estimate in {city.displayName}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "1rem",
                color: "rgba(250,248,245,0.72)",
                lineHeight: 1.7,
                maxWidth: 460,
                margin: "0 auto 2.2rem",
              }}
            >
              Free energy audit for {city.displayName} homeowners. No commitment — just a clear
              picture of what your home needs and what it costs. An owner gets back to you within a
              few hours.
            </p>
            <a
              href={COMPANY.phoneHref}
              style={{
                display: "inline-block",
                backgroundColor: C.teal,
                color: C.cream,
                fontFamily: "var(--font-label)",
                fontWeight: 700,
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "1.1rem 2.8rem",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Call {COMPANY.phone}
            </a>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.82rem",
                color: "rgba(250,248,245,0.45)",
                marginTop: "1.2rem",
              }}
            >
              Serving {city.displayName} and the surrounding {city.county} communities
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.78rem",
                color: "rgba(250,248,245,0.3)",
                marginTop: "0.75rem",
              }}
            >
              <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
                Carolux Insulation
              </a>
              {" · "}
              <a href="/cost-guide" style={{ color: "inherit", textDecoration: "none" }}>
                Charlotte Price Guide
              </a>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
