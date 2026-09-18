// Generates public/carolux-capability-statement.pdf — the one-page line card a builder
// forwards to their estimator. Research 2026-09-18: a capability statement is the
// expected construction-industry artifact; a web table gets read once, a PDF gets filed.
//
// Run: node scripts/capability-pdf.mjs
//
// ⚠️ Same claim limits as app/builders/page.js. NEVER "licensed" (insured only; Tony is a
// FORMER NC home inspector). No cellulose. Spray foam only as NOT offered. No Grade I
// self-certification (we install to the standard, the rater grades). No dollar figures,
// no per-sqft pricing, no savings percentages, no headcount/crew claims.
import { chromium } from "playwright";
import { CITY_LINKS } from "../app/lib/cities.js";
import { writeFileSync } from "node:fs";

const C = { navy: "#1a2b3c", teal: "#4a90a4", ink: "#2c2c2c", soft: "#5a6b7c", rule: "#d8dde2" };

const MATERIALS = [
  ["Fiberglass", "Batt and blown-in", "Owens Corning AttiCat, Pink Next Gen"],
  ["Mineral wool", "Batt", "Rockwool. Premium tier and interior sound walls"],
  ["Rigid foam board", "Cut and sealed", "Rim and band joists"],
  ["Vapor barrier", "8 to 10 mil", "Americover. Crawl space ground cover"],
];

const ASSEMBLIES = [
  ["Attic and ceiling", "Blown fiberglass, or batt where access is tight", "R-30 to R-60"],
  ["2x4 exterior wall", "Fiberglass or mineral wool batt", "R-13 to R-15"],
  ["2x6 exterior wall", "Fiberglass or mineral wool batt", "R-19 to R-21"],
  ["Floor over crawl space", "Fiberglass batt between the joists", "R-19 to R-30"],
  ["Rim and band joist", "Rigid board, cut and sealed", "By thickness"],
  ["Interior wall", "Mineral wool batt", "For sound"],
  ["Crawl space ground", "Americover vapor barrier", "Vapor, not R"],
  ["Air sealing", "Before insulation, every assembly we insulate", "Included"],
];

const BLOCKS = [
  ["Response and schedule",
   "Written scope and price within two business days of receiving plans. If we cannot hold the window you need, you get that in the same reply rather than a slipped date later."],
  ["Documentation",
   "Every bay photographed with a depth reference before it is covered. The photo set is delivered to the builder, so what is behind the drywall stays on record."],
  ["Quality standard",
   "Installed to the RESNET Grade I standard as defined in ANSI/RESNET/ICC 301. A HERS rater assigns the grade; we install to the standard and document it. No installer can promise a HERS score, a blower-door result, or a code-compliance outcome."],
  ["Personnel",
   "An owner is on site for every job, start to finish, and signs off before the work is covered. Tony Kermis is a former North Carolina home inspector."],
  ["Insurance and paperwork",
   "General liability insurance; certificate of insurance on request or with the bid. W-9 on request. Carolux Insulation LLC, a North Carolina limited liability company. All work carries a 2-year workmanship guarantee."],
  ["Not offered",
   "Spray foam, closed-cell or open-cell. Multifamily and commercial work."],
];

const cities = CITY_LINKS.map((c) => c.name).join(", ");
const today = new Date().toISOString().slice(0, 10);

// `spec` = true only for the assemblies table, where the third column is a real spec
// VALUE and earns the display serif. On the materials table it is prose, so it stays sans.
const tbl = (rows, spec) => `<table>${rows.map(
  ([a, b, c]) => `<tr><td class="k">${a}</td><td class="d">${b}</td>` +
    `<td class="${spec ? "v" : "n"}">${c}</td></tr>`).join("")}</table>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Gloock&family=Manrope:wght@400;500;600&family=Jost:wght@500;600&display=swap" rel="stylesheet">
<style>
  @page { size: letter; margin: 0.5in 0.55in; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Manrope, "Segoe UI", system-ui, sans-serif;
         color: ${C.ink}; font-size: 8.4pt; line-height: 1.45; }
  .name { font-family: Gloock, Georgia, serif; font-size: 20pt; color: ${C.navy};
          letter-spacing: 0.06em; margin: 0; }
  .kicker { font-family: Jost, sans-serif; font-weight: 600; font-size: 7.4pt;
            letter-spacing: 0.2em; text-transform: uppercase; color: ${C.teal};
            margin: 0 0 5pt; }
  header { border-bottom: 1.6pt solid ${C.navy}; padding-bottom: 8pt; margin-bottom: 11pt;
           display: flex; align-items: flex-end; justify-content: space-between; gap: 18pt; }
  .contact { font-size: 8pt; color: ${C.soft}; text-align: right; line-height: 1.7;
             white-space: nowrap; }
  .contact b { color: ${C.navy}; font-weight: 600; }
  .cols { display: flex; gap: 22pt; align-items: flex-start; }
  .col { flex: 1; min-width: 0; }
  h2 { font-family: Jost, sans-serif; font-weight: 600; font-size: 7.4pt;
       letter-spacing: 0.16em; text-transform: uppercase; color: ${C.teal};
       margin: 0 0 4pt; padding-bottom: 3pt; border-bottom: 0.6pt solid ${C.rule}; }
  section { margin-bottom: 11pt; }
  p { margin: 0; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 3.4pt 0; border-bottom: 0.4pt solid ${C.rule}; vertical-align: top; }
  td.k { color: ${C.navy}; font-weight: 600; padding-right: 7pt; white-space: nowrap; }
  td.d { color: ${C.soft}; padding-right: 7pt; }
  td.v { font-family: Gloock, Georgia, serif; font-size: 9.4pt; color: ${C.navy};
         white-space: nowrap; text-align: right; }
  td.n { color: ${C.ink}; }
  footer { margin-top: 13pt; padding-top: 6pt; border-top: 0.6pt solid ${C.rule};
           font-size: 7pt; color: ${C.soft}; display: flex; justify-content: space-between; }
</style></head><body>
<header>
  <div>
    <p class="kicker">Capability Statement &middot; New Construction</p>
    <p class="name">CAROLUX INSULATION</p>
  </div>
  <div class="contact">
    <b>(704) 228-2729</b><br>team@caroluxinsulation.com<br>caroluxinsulation.com/builders
  </div>
</header>

<section>
  <h2>Scope</h2>
  <p>Insulation for new single-family residential construction. Attic and ceiling, exterior
  and interior walls, floors over crawl space, rim and band joists, crawl space ground vapor
  barrier, and air sealing.</p>
</section>

<div class="cols">
  <div class="col">
    <section><h2>Materials</h2>${tbl(MATERIALS, false)}</section>
    <section><h2>Assemblies and R-value</h2>${tbl(ASSEMBLIES, true)}
      <p style="margin-top:5pt;font-size:7.4pt;color:${C.soft}">Ranges are what we commonly
      install, not a code table. Your drawings and compliance path set the target, and we
      install to the value specified on them.</p>
    </section>
  </div>
  <div class="col">
    ${BLOCKS.map(([h, b]) => `<section><h2>${h}</h2><p>${b}</p></section>`).join("")}
  </div>
</div>

<section>
  <h2>Service area</h2>
  <p>Gaston and Mecklenburg County, NC: ${cities}. Building elsewhere in those counties?
  Ask, and if the schedule works we travel.</p>
</section>

<footer><span>Carolux Insulation LLC &middot; Gaston &amp; Mecklenburg County, NC</span>
<span>Issued ${today}</span></footer>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
const pdf = await page.pdf({ format: "Letter", printBackground: true });
writeFileSync("public/carolux-capability-statement.pdf", pdf);

// Optional visual preview: `node scripts/capability-pdf.mjs <dir>` also drops a PNG there,
// because there is no poppler on this box to rasterise the PDF for eyeballing.
const previewDir = process.argv[2];
if (previewDir) {
  await page.setViewportSize({ width: 1020, height: 1320 });
  await page.screenshot({ path: `${previewDir}/capability-preview.png`, fullPage: true });
  console.log(`preview -> ${previewDir}/capability-preview.png`);
}
await browser.close();
console.log(`wrote public/carolux-capability-statement.pdf (${(pdf.length / 1024).toFixed(1)} KB)`);
