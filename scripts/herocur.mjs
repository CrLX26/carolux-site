import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2800);
// move the cursor over the normal-house side (right) to trigger the hot thermal window
for (const [fx,fy,name] of [[0.72,0.5,"a"],[0.6,0.45,"b"]]) {
  const x = Math.round(fx*1440), y = Math.round(fy*900);
  await page.mouse.move(x-20,y-20); await page.mouse.move(x,y); await page.waitForTimeout(500);
  await page.screenshot({ path: `.shots/cur_${name}.png` });
}
await browser.close();
