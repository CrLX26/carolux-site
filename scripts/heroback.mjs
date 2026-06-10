import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
async function wheelTo(t){for(let k=0;k<400;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<20)break;await page.mouse.wheel(0,Math.max(-400,Math.min(400,t-y)));await page.waitForTimeout(40);}}
// scroll DOWN through alert+stats, then BACK to top
await wheelTo(3000); await page.waitForTimeout(800);
await wheelTo(0); await page.waitForTimeout(800);
// now watch ambient thermal at top after the round trip
for (let i=0;i<5;i++){ await page.waitForTimeout(1400); await page.screenshot({ path: `.shots/back_${i}.png` }); }
await browser.close();
