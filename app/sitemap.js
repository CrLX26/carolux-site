const BASE_URL = "https://caroluxinsulation.com";

const CITY_SLUGS = [
  "charlotte-insulation",
  "huntersville-insulation",
  "pineville-insulation",
  "matthews-insulation",
  "mint-hill-insulation",
  "concord-insulation",
  "harrisburg-insulation",
  "belmont-insulation",
  "cramerton-insulation",
  "gastonia-insulation",
  "lowell-insulation",
  "mount-holly-insulation",
  "stanley-insulation",
];

export default function sitemap() {
  const cityPages = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/cost-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...cityPages,
  ];
}
