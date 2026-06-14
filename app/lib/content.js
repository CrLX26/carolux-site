export const COMPANY = {
  name: "Carolux Insulation LLC",
  phone: "(704) 228-2729",
  phoneHref: "tel:7042282729",
  email: "team@caroluxinsulation.com",
  emailHref: "mailto:team@caroluxinsulation.com",
  // SMS: the texting number IS the main line (correct). The "Text Us" button stays
  // HIDDEN until the business's SMS compliance registration (A2P/10DLC) is approved.
  // When approved, set smsEnabled: true — that's the only change needed to reveal it.
  smsPhone: "(704) 228-2729",
  smsHref: "sms:7042282729",
  smsEnabled: false,
  instagram: "https://instagram.com/caroluxinsulation",
  // Social profiles (all confirmed 2026-06-11). SEO note: app/lib/schema.js `sameAs`
  // should list these same four profiles (coordinate with the SEO lane).
  facebook: "https://www.facebook.com/caroluxinsulation",
  googleBusiness: "https://g.page/caroluxinsulation",
  nextdoor: "https://nextdoor.com/page/carolux-insulation-gastonia-nc/",
  serviceArea: "Charlotte & Gastonia, NC",
  owners: "Tony Kermis and Juan Gonzalez",
  year: "2026",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Carolux", href: "#why-us" },
  { label: "Packages", href: "#packages" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  eyebrow: "Hot Upstairs? High Bills? · Greater Charlotte",
  headline: ["The owners", "do the work.", "Every job."],
  subheading:
    "Two owners on every job. Tony's a former NC home inspector; Juan runs the schedule and the follow-through. The person who reads your attic is the one who fixes it.",
  primaryCta: "Book Your Free Estimate",
  secondaryCta: "Call (704) 228-2729",
  secondaryPre:  "Your attic could be",
  secondaryMain: "Quietly Costing You",
  secondaryPost: "money. Every single month.",
};

export const TRUST_BADGES = [
  "Both owners on every job",
  "Air sealing on every full install",
  "Fully insured",
  "2-Year workmanship guarantee",
];

// One dominant figure, two supporting facts. Index 0 is the hero stat (the
// homeowner's bill); 1 and 2 are demoted context. The four-up "stat strip" was
// retired — a single message per section, not four co-equal numbers.
export const STATS = [
  {
    // HERO — the number tied to the visitor's energy bill.
    prefix: "",
    qualifier: "up to",
    countTo: 15,
    suffix: "%",
    label: "lower heating & cooling costs",
    source: "EPA ENERGY STAR",
  },
  {
    // Supporting — the hidden-problem hook.
    prefix: "",
    countTo: 90,
    suffix: "%+",
    label: "of U.S. homes are under-insulated",
  },
  {
    // Supporting — the technical benchmark (Tony's inspector edge).
    prefix: "R-",
    countTo: 49,
    suffix: "",
    label: "recommended attic level for North Carolina",
  },
];

// Shown beneath the stat numbers. Keeps the brand promise that every figure is
// an average, never a guarantee (legal + honesty rule).
export const STATS_CAVEAT =
  "EPA/DOE averages, not a guarantee. Results vary by home.";

export const SERVICES = [
  {
    number: "01",
    title: "Blown-In Attic Insulation",
    description:
      "We install fiberglass or cellulose blown-in insulation in your attic, filling every gap and cavity to reach the R-49 level recommended by the Department of Energy for North Carolina. On every full install, before we blow a single bag, we seal the air leaks (around light fixtures, plumbing penetrations, and top plates) because insulation without air sealing is money left on the table. Proper air sealing and insulation can save up to ~15% on heating and cooling (EPA ENERGY STAR), though every home is different.",
    cta: "Get a Free Attic Assessment",
    learnMore: "/services/attic-insulation",
    learnMoreLabel: "Learn more about attic insulation",
  },
  {
    number: "02",
    title: "Crawl Space & Vapor Barrier",
    description:
      "A wet or open crawl space drives up your energy bills, causes wood rot, and pulls humid air into your living space. We lay a heavy-duty, professional-grade vapor barrier across the crawl space floor to block ground moisture from rising into the structure, and fit fiberglass batt between the floor joists to hold conditioned air where it belongs. Every job includes a full inspection, drainage assessment, and attention to building code. No shortcuts, no surprises.",
    cta: "Get a Free Crawl Space Quote",
    learnMore: "/services/crawl-space-insulation",
    learnMoreLabel: "Learn more about crawl space insulation",
  },
  {
    number: "03",
    title: "Fiberglass Batt Insulation",
    description:
      "Hand-fitted fiberglass batt set snug between your crawl space floor joists — no gaps, no slumping, no air slipping through. It steadies the floors above, softens sound between levels, and keeps conditioned air where it belongs. Tony and Juan cut and place every piece themselves.",
    cta: "Get a Batt Quote",
    learnMore: "/services/crawl-space-insulation",
    learnMoreLabel: "See crawl space insulation details",
  },
];

export const WHY_US = [
  {
    roman: "I",
    title: "Owner-Operated",
    description:
      "Tony and Juan are on the job site for every project — not a crew you've never met. You get the owners' cell numbers, and they pick up the phone.",
  },
  {
    roman: "II",
    title: "Air Sealing, Not Upsold",
    description:
      "We include air sealing on every full installation, at no extra charge. Most contractors skip it or charge extra. It's the highest-impact step in the job, and the one that separates a real upgrade from a temporary fix.",
  },
  {
    roman: "III",
    title: "2-Year Guarantee",
    description:
      "We stand behind our work. If anything we've installed isn't performing the way it should within two years, we come back and make it right. No questions, no hassle.",
  },
  {
    roman: "IV",
    title: "Inspector-Grade Diagnosis",
    description:
      "Before Carolux, co-owner Tony spent years as a North Carolina home inspector. He reads the whole house — moisture, airflow, and where your money is actually escaping — before we recommend a thing.",
  },
];

export const PACKAGES = [
  {
    name: "Attic Insulation",
    tagline: "The foundation of home comfort",
    features: [
      "Blown-in fiberglass or cellulose",
      "Pre-job air leak sealing included",
      "R-49 DOE target for NC",
      "Post-install performance check",
      "2-year workmanship guarantee",
    ],
    cta: "Get an Attic Quote",
    featured: false,
  },
  {
    name: "Whole Home Bundle",
    tagline: "Maximum savings, one visit",
    features: [
      "Complete attic insulation + air seal",
      "Crawl space vapor barrier + batt",
      "Priority scheduling",
      "Both owners on every job",
      "2-year workmanship guarantee",
    ],
    cta: "Get a Bundle Quote",
    featured: true,
  },
  {
    name: "Crawl Space",
    tagline: "Stop moisture before it starts",
    features: [
      "Heavy-duty vapor barrier",
      "Fiberglass batt between floor joists",
      "Full moisture & drainage inspection",
      "Code-compliant installation",
      "2-year workmanship guarantee",
    ],
    cta: "Get a Crawl Space Quote",
    featured: false,
  },
];

export const REVIEWS = [
  {
    name: "Marcus T.",
    location: "South End, Charlotte",
    text: "Tony and Juan came out within two days of calling. They sealed the attic and blew in the insulation — told me exactly what they were doing the whole time. My power bill dropped $80 the next month. Worth every penny.",
  },
  {
    name: "Sandra R.",
    location: "Ballantyne, Charlotte",
    text: "I got three quotes and Carolux was the only company that mentioned air sealing before I even asked. They know their craft. The crawl space looks completely different — clean, dry, and professional.",
  },
  {
    name: "Dave H.",
    location: "Gastonia, NC",
    text: "These guys are the real deal. Owner-operated means something — Juan walked me through every step and answered every question. No upsell, no pressure. My house is noticeably more comfortable upstairs now.",
  },
];

export const PROCESS = {
  eyebrow: "How We Work",
  title: "Four steps. No surprises.",
  steps: [
    {
      step: "01",
      title: "Assessment",
      description:
        "We measure your existing R-values and inspect the attic and crawl space ourselves. The plan starts with what's actually up there, not a guess from the driveway.",
    },
    {
      step: "02",
      title: "Recommendations",
      description:
        "You get a clear, written scope the same day — what we'll do, why it matters, and the exact price you'll pay. No pressure, no upsell.",
    },
    {
      step: "03",
      title: "Installation",
      description:
        "Tony and Juan do the work. We air seal first where it counts, then insulate to the R-49 level the Department of Energy recommends for North Carolina.",
    },
    {
      step: "04",
      title: "Clean-Up & Walkthrough",
      description:
        "We leave the space cleaner than we found it and walk the finished job with you, so you see exactly what changed and why it will hold up.",
    },
  ],
};

export const OWNERS = {
  eyebrow: "Owner-Operated",
  title: "The two people doing the work",
  intro:
    "Hire Carolux and you get the owners, not a rotating crew you have never met. The person who walked your home is the person standing in your attic, and the one who picks up when you call.",
  people: [
    {
      name: "Tony Kermis",
      role: "Co-Owner · Former NC Home Inspector",
      photo: "/images/tony-profile-1.webp",
      bio: "A former North Carolina home inspector, Tony reads a house the way few insulation crews can. He knows where the heat is escaping before the first bag goes in.",
    },
    {
      name: "Juan Gonzalez",
      role: "Co-Owner · Operations & Customer Care",
      photo: "/images/juan-profile-1.webp",
      bio: "Juan runs the schedule, the follow-through, and the part most contractors drop: keeping you in the loop from the first call to the final walkthrough.",
    },
  ],
};

// Savings estimator. NC Climate Zone 3 (Charlotte Piedmont): ENERGY STAR methodology
// puts air sealing + insulation savings at ~8% of total energy use / ~14% of heating
// and cooling. Rates below are applied to the TOTAL annual bill and match that range.
// Email capture POSTs to /api/lead (Resend). Status copy lives in `email*` below.
export const ESTIMATOR = {
  eyebrow: "The Real Cost of an Open Attic",
  title: "Your attic costs you three ways. Only one shows up on your bill.",
  intro:
    "Most Charlotte homes leak conditioned air through the attic all year. You feel it three ways — an AC that works harder, moisture where you don't want it, and a higher bill every month. Enter your average monthly bill and we'll put a number on the one we can measure.",
  billLabel: "Your average monthly energy bill",
  billHint: "Electric, gas, or combined — whatever you pay each month.",
  insulationLabel: "Your attic insulation right now",
  insulationHint: "Most homes here were last insulated 10–20 years ago — it's worth checking.",
  insulationOptions: [
    { key: "under", label: "Under-insulated" },
    { key: "unsure", label: "Not sure" },
    { key: "good", label: "Well-insulated" },
  ],
  resultLabel: "Estimated annual savings",
  tenYearLabel: "Roughly this much back over 10 years",
  cta: "Book Your Free Estimate",
  emailPrompt:
    "Want it in writing? Leave your email and we'll send a personalized breakdown — including what we'd look for in your attic and crawl space.",
  emailPlaceholder: "you@email.com",
  emailCta: "Send my estimate",
  emailSending: "Sending",
  emailDone: "Estimate on its way.",
  emailDoneSub: "We'll email your personalized breakdown shortly. Watch your inbox.",
  emailRetry: "Try again",
  // NC-honest rates [low, high] applied to the TOTAL annual bill (ENERGY STAR CZ3 methodology).
  rates: { under: [0.06, 0.08], unsure: [0.05, 0.07], good: [0.02, 0.04] },
  billMin: 50,
  billMax: 600,
  source:
    "Estimates use EPA ENERGY STAR and U.S. Department of Energy figures for North Carolina's climate, where air sealing and insulation save roughly 8% of a typical home's total energy use — about 14% of heating and cooling. Every home is different; actual savings vary with your HVAC, your usage, and the shape your house is in.",
};

// The "three ways" module — sourced, reusable across Estimator, Stats, Services,
// /cost-guide, and city pages. Keep the source attributions; they earn the claims.
export const THREE_WAYS = [
  {
    label: "Your AC works harder",
    body:
      "Every degree that escapes through the attic, your system has to make again — so it runs longer and wears out sooner. Ducts in a hot attic can lose over 20% of the cooled air before it ever reaches the room.",
    source: "U.S. Department of Energy · ENERGY STAR",
  },
  {
    label: "Moisture moves in",
    body:
      "In our humid summers, an unsealed attic or crawl space can develop moisture problems and biological growth within weeks — damaging wood and quietly ruining the insulation you already have.",
    source: "U.S. EPA",
  },
  {
    label: "You pay for it monthly",
    body:
      "The cooled air you're paying for leaks out the top of the house. That's the one below — the part we can estimate.",
    source: "",
  },
];

// Contact / final CTA. On submit the form POSTs to /api/lead (Resend) and the
// lead emails to team@. Status copy lives in `form.*` below. The direct call/email
// CTAs stay as an always-available fallback.
export const CONTACT = {
  eyebrow: "Free, No-Obligation",
  title: "Get your free estimate",
  intro:
    "Tell us what's going on up top and an owner gets back to you, usually within a few hours. No call centers, no runaround.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone",
    phonePlaceholder: "(704) 000-0000",
    addressLabel: "Property address",
    addressPlaceholder: "Street, city",
    messageLabel: "What's going on up there?",
    messagePlaceholder: "Hot upstairs, high bills, drafty rooms, crawl space moisture...",
    submit: "Send My Request",
    submitting: "Sending",
    fallbackNote:
      "We'll never share your details. Prefer to talk? Call or email us directly, any time.",
    requiredNote: "Please add your name and phone so an owner can reach you.",
    successTitle: "Request sent.",
    successBody:
      "Thanks. An owner will get back to you, usually within a few hours. No call centers, no runaround.",
    errorRetry: "Try again",
  },
  // Risk-reversal, repeated right at the ask. "Fully insured" never "licensed".
  reassurance: [
    "2-Year workmanship guarantee",
    "No-pressure, same-day written quote",
    "An owner replies, usually within hours",
    "Fully insured",
  ],
  serving: "Serving Charlotte, Gastonia & the surrounding Piedmont",
};

export const BEFORE_AFTER = {
  eyebrow: "See the Work",
  title: "Drag to see the difference",
  intro:
    "Before and after, on the kind of attic and crawl space work we do every week. Grab the handle and slide.",
  pairs: [
    {
      label: "Attic Insulation",
      caption: "Blown-in attic insulation + air sealing",
      location: "Ballantyne, Charlotte NC",
      before: "/images/attic-before-2.png",
      after: "/images/attic-after-2.png",
    },
    {
      label: "Crawl Space",
      caption: "Vapor barrier + crawl space insulation",
      location: "Matthews, NC",
      before: "/images/crawlspace-before.jpg",
      after: "/images/crawlspace-after.png",
    },
  ],
};

export const SERVICE_AREA = {
  eyebrow: "Service Area",
  title: "Serving Charlotte & beyond",
  note: "Don't see your town? Give us a call. If you're near the metro, chances are we cover you.",
  cities: [
    "Charlotte",
    "Huntersville",
    "Pineville",
    "Matthews",
    "Mint Hill",
    "Concord",
    "Harrisburg",
    "Belmont",
    "Cramerton",
    "Gastonia",
    "Lowell",
    "Mount Holly",
    "Stanley",
  ],
};

// Privacy Policy — VERBATIM from Carolux_Privacy_Policy.pdf (Last Updated June 3, 2026).
// Do not paraphrase legal text. Em dashes here are original to the document.
export const PRIVACY_POLICY = {
  org: "Carolux Insulation LLC",
  title: "Privacy Policy & Messaging Terms and Conditions",
  lastUpdated: "June 3, 2026",
  sections: [
    {
      heading: "1. Who We Are",
      body: [
        "Carolux Insulation LLC is a residential insulation contractor serving the Charlotte, NC metro area. We provide blown-in attic insulation, crawl space batt insulation, vapor barrier installation, and air sealing services to homeowners. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or contact us about our services.",
      ],
    },
    {
      heading: "2. Information We Collect",
      body: [
        "When you submit a contact or estimate request form on our website, we collect: your name, email address, phone number, property address, and information about your insulation needs. When we visit your property for an estimate, we may take photos of your attic, crawl space, or exterior for documentation and quality control purposes.",
      ],
    },
    {
      heading: "3. How We Use Your Information",
      body: ["We use the information you provide to:"],
      list: [
        "Respond to your estimate or service requests",
        "Schedule and confirm appointments",
        "Communicate with you about your job before, during, and after completion",
        "Send text messages if you have opted in to SMS communications",
        "Improve our services",
      ],
      after: [
        "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
      ],
    },
    {
      heading: "4. Text Message (SMS) Communications",
      body: [
        "If you provide your phone number and consent to receive text messages, we may send you appointment confirmations, job scheduling updates, estimate follow-ups, and service-related communications. Message and data rates may apply. You can opt out at any time by replying STOP to any text message. Reply HELP for assistance. Message frequency varies based on your service interaction.",
      ],
    },
    {
      heading: "5. Job-Site Photos",
      body: [
        "Job-site photos showing only insulation, attic, or crawl space conditions — with no identifying personal property or people — may be used in our portfolio or marketing materials unless you opt out. You may opt out by notifying us in writing at team@caroluxinsulation.com.",
      ],
    },
    {
      heading: "6. Cookies and Analytics",
      body: [
        "Our website uses cookies and analytics tools to understand how visitors use our site and to improve your experience. This may include analytics data collected by our website platform and Google Analytics. You can control cookie settings through your browser settings.",
      ],
    },
    {
      heading: "7. Data Security",
      body: [
        "We take reasonable steps to protect your information. We store customer information in password-protected systems and limit access to authorized personnel only.",
      ],
    },
    {
      heading: "8. Your Rights",
      body: [
        "You may contact us at any time to request access to, correction of, or deletion of your personal information by emailing team@caroluxinsulation.com or calling (704) 228-2729.",
      ],
    },
    {
      heading: "9. Changes to This Policy",
      body: [
        "We may update this policy as our practices change. The 'last updated' date at the top of this document reflects the most recent version.",
      ],
    },
    {
      heading: "Data Sharing",
      body: ["The following disclosures are required for SMS messaging compliance:"],
      list: [
        "Customer data is not shared with 3rd parties for promotional or marketing purposes.",
        "Mobile opt-in and consent are never shared with anyone for any purpose. Any information sharing that may be mentioned elsewhere in this policy excludes mobile opt-in data.",
      ],
    },
  ],
  messagingTerms: {
    heading: "Carolux Insulation Messaging Terms and Conditions",
    items: [
      "The messaging program consists of general conversational messaging to answer questions and provide support to customers.",
      "You can cancel the SMS service at any time. Just text 'STOP' to the phone number from which you received messages. After you send the SMS message 'STOP' to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.",
      "If you are experiencing issues with the messaging program you can reply with the keyword HELP for more assistance, or you can get help directly at team@caroluxinsulation.com.",
      "Carriers are not liable for delayed or undelivered messages.",
      "As always, message and data rates may apply for any messages sent to you from us and to us from you. Message frequency will vary based on communication needs. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.",
      "If you have any questions regarding privacy, please read our privacy policy contained in the rest of this document/page.",
    ],
  },
  disclaimer:
    "This policy does not constitute legal advice. Carolux Insulation LLC recommends periodic review by a qualified attorney.",
};
