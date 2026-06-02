/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Lighter quality for the full-bleed hero photos (they sit behind text and
    // a scrim). Next 16 requires custom quality values to be allowlisted.
    qualities: [65, 75],
  },
};

export default nextConfig;
