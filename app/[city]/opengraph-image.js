import { ImageResponse } from "next/og";
import { loadGloockFont } from "../lib/og-font";
import { SLUGS, getCity } from "../lib/cities";

export const alt =
  "Carolux Insulation — Charlotte-area attic and crawl space insulation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerender one OG card per city at build time (font baked in, no runtime fetch).
export function generateStaticParams() {
  return SLUGS.map((city) => ({ city }));
}

const NAVY = "#1a2b3c";
const TEAL = "#4a90a4";
const CREAM = "#faf8f5";

function cityDisplayName(slug) {
  return slug
    .replace(/-insulation$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function headingFontSize(name) {
  const len = name.length;
  if (len <= 7) return 110;
  if (len <= 9) return 96;
  if (len <= 11) return 82;
  return 70;
}

export default async function Image({ params }) {
  const { city: slug } = await params;
  const cityName = getCity(slug)?.displayName ?? cityDisplayName(slug);
  const fontSize = headingFontSize(cityName);
  const subFontSize = Math.round(fontSize * 0.51);

  const fontData = await loadGloockFont();
  const opts = { width: 1200, height: 630 };
  if (fontData) opts.fonts = [{ name: "Gloock", data: fontData }];
  const serif = fontData ? { fontFamily: "Gloock" } : {};

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY }}>
        {/* Left teal accent bar */}
        <div style={{ width: 10, background: TEAL, flexShrink: 0 }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "60px 80px 52px 72px",
            justifyContent: "space-between",
          }}
        >
          {/* Eyebrow + headlines */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 16,
                color: TEAL,
                letterSpacing: "0.24em",
                fontWeight: 600,
                marginBottom: 38,
              }}
            >
              CAROLUX INSULATION
            </div>
            <div
              style={{
                fontSize,
                color: CREAM,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                ...serif,
              }}
            >
              {cityName}
            </div>
            <div
              style={{
                fontSize: subFontSize,
                color: TEAL,
                fontWeight: 600,
                lineHeight: 1.2,
                marginTop: 14,
                letterSpacing: "-0.01em",
                ...serif,
              }}
            >
              NC Insulation Experts
            </div>
          </div>

          {/* Bottom footer row */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                height: 1,
                background: "rgba(74,144,164,0.32)",
                marginBottom: 18,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 18, color: "rgba(250,248,245,0.52)" }}>
                Owner-operated · Insured · 2-Year Guarantee
              </div>
              <div style={{ fontSize: 18, color: "rgba(250,248,245,0.42)" }}>
                caroluxinsulation.com
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    opts
  );
}
