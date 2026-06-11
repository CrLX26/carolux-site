// Footer screenshots (desktop + mobile) to check the social icon row.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
for (const [label, w, h] of [["desktop", 1280, 900], ["mobile", 412, 880]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.evaluate(() => document.querySelector("footer")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `.shots/foot_${label}.png` });
  console.log(`foot_${label} shot`);
  await ctx.close();
}
await browser.close();
console.log("done");
