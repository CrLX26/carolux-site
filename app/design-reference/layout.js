// Internal design-reference tool — must never be crawled or indexed. page.js is a
// client component ("use client") and so can't export metadata itself; this
// server-segment layout sets robots noindex/nofollow for the whole route.
// (WI-006: kills the SEO/advertising/cert-mark exposure of the internal page.
// Scrubbing or removing the page's demo claims is a separate, deliberate call.)
export const metadata = {
  robots: { index: false, follow: false },
};

export default function DesignReferenceLayout({ children }) {
  return children;
}
