const BASE_URL = "https://caroluxinsulation.com";

// Service-area business: we intentionally omit a street address (no public
// storefront) and lean on `areaServed` + locality. This is the schema.org-
// recommended shape for a business that travels to the customer.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Carolux Insulation LLC",
  description:
    "Owner-operated insulation company serving Charlotte & Gastonia, NC. Blown-in attic insulation, air sealing, and crawl space encapsulation with a 2-year workmanship guarantee.",
  url: BASE_URL,
  telephone: "+17042282729",
  email: "team@caroluxinsulation.com",
  image: `${BASE_URL}/images/house-thermal4.webp`,
  priceRange: "$$",
  founder: [
    { "@type": "Person", name: "Tony Kermis" },
    { "@type": "Person", name: "Juan Gonzalez" },
  ],
  // Locality only — no street address for this service-area business.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Charlotte",
    addressRegion: "NC",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.2271,
    longitude: -80.8431,
  },
  areaServed: [
    "Charlotte, NC",
    "Gastonia, NC",
    "Huntersville, NC",
    "Pineville, NC",
    "Concord, NC",
    "Harrisburg, NC",
    "Belmont, NC",
    "Cramerton, NC",
    "Lowell, NC",
    "Mount Holly, NC",
    "Stanley, NC",
    "Matthews, NC",
    "Mint Hill, NC",
  ].map((name) => ({ "@type": "City", name })),
  knowsAbout: [
    "Blown-in attic insulation",
    "Fiberglass batt insulation",
    "Crawl space encapsulation",
    "Vapor barriers",
    "Air sealing",
    "Home energy efficiency",
    "R-49 insulation for North Carolina",
  ],
  // Explicit catalog of what we sell — strong signal for AI answer engines
  // ("what does Carolux do?") and Google's local understanding.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Insulation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Blown-In Attic Insulation",
          description:
            "Fiberglass or cellulose blown-in attic insulation to the DOE-recommended R-49 for North Carolina. Air sealing included with every full insulation install, at no extra charge.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Crawl Space & Vapor Barrier",
          description:
            "Crawl space encapsulation with a heavy-duty vapor barrier and perimeter insulation to block moisture and lower energy bills.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fiberglass Batt Insulation",
          description:
            "Hand-fitted fiberglass batt set snug between crawl space floor joists — steadies the floors above, softens sound between levels, and keeps conditioned air where it belongs.",
        },
      },
    ],
  },
  sameAs: ["https://instagram.com/caroluxinsulation"],
  // TODO (legitimate signals to add later — do NOT fabricate):
  //  - openingHoursSpecification: add your real business hours
  //  - aggregateRating / review: wire up only with genuine Google reviews
  //    (self-applied star ratings violate Google's policy and risk penalties)
};
