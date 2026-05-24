import { DM_Sans, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { localBusinessSchema } from "./lib/schema";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700"],
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
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
