import { COMPANY, SERVICES, PROCESS, SERVICE_AREA } from "./content";
import { FAQ } from "./faq";

const BASE_URL = "https://caroluxinsulation.com";

// Flip to true ONLY once the visible FAQ section is rendered on the page.
// FAQPage schema without matching on-page content violates Google's structured
// data guidelines, so the FAQ node stays out of the graph until then.
const FAQ_SECTION_LIVE = true;

// Schema is a DERIVED VIEW of content.js — service/process text comes straight
// from the approved on-page copy, so structured data always mirrors what's
// visible (Google's requirement) and stays inside the legal guardrails without
// a second place to maintain.

const areaServed = SERVICE_AREA.cities.map((city) => ({
  "@type": "City",
  name: `${city}, NC`,
}));

// Service-area business: we intentionally omit a street address (no public
// storefront) and lean on `areaServed` + locality — the schema.org-recommended
// shape for a business that travels to the customer.
const business = {
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: COMPANY.name,
  description:
    "Owner-operated insulation company serving Charlotte, Gastonia, and the surrounding North Carolina Piedmont. Blown-in attic insulation, fiberglass batt, crawl space insulation and vapor barriers, plus air sealing on every full install. Fully insured; 2-year workmanship guarantee.",
  url: BASE_URL,
  telephone: "+17042282729",
  email: COMPANY.email,
  image: `${BASE_URL}/images/house-thermal4.webp`,
  priceRange: "$$",
  founder: [
    { "@type": "Person", name: "Tony Kermis" },
    { "@type": "Person", name: "Juan Gonzalez" },
  ],
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
  areaServed,
  knowsAbout: [
    "Blown-in attic insulation",
    "Fiberglass batt insulation",
    "Crawl space insulation & vapor barrier",
    "Vapor barriers",
    "Air sealing",
    "Home energy efficiency",
    "R-49 insulation for North Carolina",
  ],
  sameAs: [
    COMPANY.instagram,
    COMPANY.facebook,
    COMPANY.googleBusiness,
    COMPANY.nextdoor,
  ],
  // TODO (legitimate signals to add later — do NOT fabricate):
  //  - openingHoursSpecification: add real business hours
  //  - aggregateRating / review: only with genuine Google reviews
  //    (self-applied star ratings violate Google's policy and risk penalties)
};

// One Service node per offering, mirroring the visible Services section. Each
// back-references the business as provider so AI engines and Google tie the
// service to the entity and its service area.
const serviceSchemas = SERVICES.map((service) => ({
  "@type": "Service",
  name: service.title,
  serviceType: service.title,
  description: service.description,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed,
}));

// The visible 4-step Process section as a HowTo — strong extractable structure
// for "how does an insulation job work?" style AI queries.
const howToSchema = {
  "@type": "HowTo",
  name: "How a Carolux insulation project works",
  description:
    "Carolux's four-step process for every attic and crawl space job, from on-site assessment to the final walkthrough.",
  step: PROCESS.steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description,
  })),
};

// FAQPage built from the visible FAQ content (app/lib/faq.js). Included in the
// graph only when the on-page FAQ section is live (see FAQ_SECTION_LIVE).
const faqPage = {
  "@type": "FAQPage",
  mainEntity: FAQ.items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// Single JSON-LD graph injected once in layout.js.
export const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    business,
    ...serviceSchemas,
    howToSchema,
    ...(FAQ_SECTION_LIVE ? [faqPage] : []),
  ],
};

// Kept for back-compat / standalone use.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  ...business,
};
