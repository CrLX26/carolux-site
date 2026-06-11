// WhyUs grid shots at several widths. Confirms 2x2 on desktop/tablet, 1-col < 640px.
//   node scripts/whyshot.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const widths = [1280, 900, 700, 500];

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 1000 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.evaluate(() => document.querySelector("#why-us")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `.shots/why_${w}.png` });
  console.log(`why_${w} shot`);
  await ctx.close();
}
await browser.close();
console.log("done");
