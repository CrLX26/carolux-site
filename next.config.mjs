/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Lighter quality for the full-bleed hero photos (they sit behind text and
    // a scrim). Next 16 requires custom quality values to be allowlisted.
    qualities: [65, 75],
  },

  // Canonical host. www.caroluxinsulation.com was serving a full 200 copy of every
  // page rather than redirecting, so Google indexed a MIX of www and apex URLs
  // (2026-09-29: /gastonia-insulation, /stanley-insulation and /terms-of-service
  // were indexed on www while / and /services/crawl-space-insulation were on apex).
  //
  // The canonical tags were already correct and pointed at the apex, which is why
  // this is a dilution problem rather than a true duplicate-content one. But split
  // hosts split crawl signals on a site that is only ~32% indexed (7 of 22 sitemap
  // URLs), and one host should answer, not two.
  //
  // robots.txt already declares `Host: https://caroluxinsulation.com`, so this just
  // makes the server agree with what we were already telling crawlers.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.caroluxinsulation.com" }],
        destination: "https://caroluxinsulation.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
