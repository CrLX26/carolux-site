export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Carolux Insulation LLC",
  description:
    "Owner-operated insulation company serving Charlotte & Gastonia, NC. Blown-in attic insulation and crawl space vapor barriers.",
  url: "https://caroluxinsulation.com",
  telephone: "+17042282729",
  email: "caroluxinsulation@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "125 Rowe St",
    addressLocality: "Gastonia",
    addressRegion: "NC",
    postalCode: "28056",
    addressCountry: "US",
  },
  areaServed: ["Charlotte, NC", "Gastonia, NC"],
  priceRange: "$$",
  sameAs: ["https://instagram.com/caroluxinsulation"],
};
