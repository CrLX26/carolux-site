import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
// poll until thermal opacity peaks, then screenshot + inspect what's painted there
for (let i = 0; i < 30; i++) {
  const d = await page.evaluate(() => {
    const el = document.querySelector(".thermal-crossfade");
    const op = el ? +(+getComputedStyle(el).opacity).toFixed(2) : -1;
    // what's the topmost element at the house center?
    const top = document.elementFromPoint(window.innerWidth*0.6, window.innerHeight*0.55);
    return { op, topTag: top?.tagName, topCls: (top?.className||"").toString().slice(0,50), z: top?getComputedStyle(top).zIndex:"" };
  });
  if (d.op >= 0.92) {
    await page.screenshot({ path: ".shots/mth_peak.png" });
    console.log(`PEAK op=${d.op}  topAtHouse=${d.topTag}.${d.topCls} z=${d.z}`);
    break;
  }
  await page.waitForTimeout(400);
}
await browser.close();
