import { Gloock, Manrope, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { schemaGraph } from "./lib/schema";

// Manrope — geometric sans, strong readability at small sizes.
const manrope = Manrope({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Gloock — display serif for headlines and large stat numbers.
const gloock = Gloock({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Jost — Futura-influenced geometric sans. Used for uppercase tracked labels
// (alarm card lines 1 & 3). Reads as a specification or regulatory notation —
// precise and authoritative without the softness of Manrope. Not on reject list.
const jost = Jost({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://caroluxinsulation.com"),
  title: "Carolux Insulation | Charlotte's Insulation Experts",
  description:
    "Owner-operated insulation for Charlotte-area homeowners. Blown-in attic insulation & crawl space vapor barriers. Call (704) 228-2729.",
  alternates: {
    canonical: "/",
  },
  // Google Search Console verification. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the
  // Vercel project env (the string from GSC's "HTML tag" method — just the content value,
  // not the whole tag) and redeploy; no code change needed. Left undefined until then so
  // we never emit a bogus verification tag. DNS TXT verification via Namecheap also works
  // and needs nothing here.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: "Carolux Insulation | Charlotte's Insulation Experts",
    description:
      "Owner-operated insulation for Charlotte-area homeowners. Blown-in attic insulation & crawl space vapor barriers.",
    url: "https://caroluxinsulation.com",
    siteName: "Carolux Insulation",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${gloock.variable} ${jost.variable}`}>
      <body className="min-h-dvh flex flex-col">
        {/* WI-048: skip link — first focusable element; targets each page's <main id="main">. */}
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
        {/* WI-045: Vercel Web Analytics — cookieless, first-party, no consent banner needed
            (spine ruling, carolux-legal/SITE-LEGAL-RULINGS.md). Disclosed in privacy policy §6. */}
        <Analytics />
      </body>
    </html>
  );
}
