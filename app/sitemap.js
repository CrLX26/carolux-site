import { SLUGS } from "./lib/cities";

const BASE_URL = "https://caroluxinsulation.com";

// WI-073: real per-page modified dates, NOT `new Date()`.
// Stamping every URL "modified now" on each deploy teaches Google to distrust
// our `lastmod` entirely. These mirror the `LAST_UPDATED` constants in the page
// files (and the visible "Last updated" bylines) — bump the matching entry here
// when a page's content actually changes.
const MODIFIED = {
  home: "2026-09-30",        // addressLocality -> Gastonia; Mooresville added to service area
  costGuide: "2026-10-01",   // vapor barrier row renamed; Americover named
  services: "2026-08-13",    // new /services hub
  builders: "2026-10-01",    // cellulose both forms, no caveat (owner ruling)
  servicePages: "2026-06-13", // app/services/*/page.js LAST_UPDATED
  cities: "2026-06-12",      // app/[city]/page.js LAST_UPDATED
  privacy: "2026-09-30",     // Cal.com disclosed; CRM line corrected (no CRM in use)
  terms: "2026-06-15",       // TERMS_OF_SERVICE.lastUpdated
};

export default function sitemap() {
  const cityPages = SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: MODIFIED.cities,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const servicePages = [
    "attic-insulation",
    "crawl-space-insulation",
    "air-sealing",
  ].map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: MODIFIED.servicePages,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: MODIFIED.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: MODIFIED.services,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...servicePages,
    {
      // Builder-facing. Indexable and in the sitemap, but deliberately NOT linked from
      // the main nav (homeowner-facing, and Nav.js is locked) — see BUILDER-PAGE-BRIEF.md.
      url: `${BASE_URL}/builders`,
      lastModified: MODIFIED.builders,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cost-guide`,
      lastModified: MODIFIED.costGuide,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...cityPages,
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: MODIFIED.privacy,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: MODIFIED.terms,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
