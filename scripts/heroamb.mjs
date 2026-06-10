import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
// capture the ambient thermal cycle over ~9s at the hero top (no mouse)
for (let i = 0; i < 7; i++) {
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `.shots/amb_${i}.png` });
  const d = await page.evaluate(() => {
    const ov = document.querySelector('[data-thermal-overlay], .thermal-crossfade, [data-desk-sky]');
    return { scrollY: window.scrollY };
  });
  console.log(`amb ${i}`);
}
await browser.close();
