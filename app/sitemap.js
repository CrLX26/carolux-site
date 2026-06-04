const BASE_URL = "https://caroluxinsulation.com";

// Single-page site for now. As we add service + city landing pages
// (Phase 3 programmatic SEO), append them here — Next will regenerate
// /sitemap.xml on each build.
export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
