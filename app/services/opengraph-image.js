import { ImageResponse } from "next/og";
import { loadGloockFont } from "../lib/og-font";

export const alt =
  "Carolux Insulation services: attic insulation, crawl space and vapor barrier, air sealing in Charlotte, NC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#1a2b3c";
const TEAL = "#4a90a4";
const CREAM = "#faf8f5";

export default async function Image() {
  const fontData = await loadGloockFont();
  const opts = { width: 1200, height: 630 };
  if (fontData) opts.fonts = [{ name: "Gloock", data: fontData }];
  const serif = fontData ? { fontFamily: "Gloock" } : {};

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY }}>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 16,
                color: TEAL,
                letterSpacing: "0.24em",
                fontWeight: 600,
                marginBottom: 34,
              }}
            >
              CAROLUX INSULATION · CHARLOTTE, NC
            </div>
            <div
              style={{
                fontSize: 92,
                color: CREAM,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                ...serif,
              }}
            >
              What We Do
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 22,
              }}
            >
              {["Attic Insulation", "Crawl Space & Vapor Barrier", "Air Sealing"].map((s) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 34,
                    color: TEAL,
                    fontWeight: 600,
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                    ...serif,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: TEAL,
                      marginRight: 16,
                      flexShrink: 0,
                    }}
                  />
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ height: 1, background: "rgba(74,144,164,0.32)", marginBottom: 18 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 18, color: "rgba(250,248,245,0.52)" }}>
                Owner-operated · Insured · 2-Year Workmanship Guarantee
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
