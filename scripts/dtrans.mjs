// Desktop alert->stats transition capture (Chromium). Real wheel scroll so
// Lenis+framer sync. Screenshots across the boundary.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
await page.mouse.move(720, 450);
async function wheelTo(targetY) {
  for (let k = 0; k < 200; k++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(y - targetY) < 8) break;
    await page.mouse.wheel(0, Math.max(-300, Math.min(300, targetY - y)));
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(500);
}
for (const y of (process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [2900, 3100, 3300, 3500, 3700, 3900])) {
  await wheelTo(y);
  const d = await page.evaluate(() => {
    const sky = document.querySelector('[data-desk-sky]');
    const stats = document.querySelector(".burst-reveal");
    const sticky = stats.firstElementChild;
    return {
      skyOp: sky ? +(+getComputedStyle(sky).opacity).toFixed(2) : "n/a",
      stickyTop: Math.round(sticky.getBoundingClientRect().top), wrapOp: +(+getComputedStyle(sticky.firstElementChild).opacity).toFixed(2),
    };
  });
  await page.screenshot({ path: `.shots/dt_${y}.png` });
  console.log(`y=${y}  skyOpacity=${d.skyOp}  statsStickyTop=${d.stickyTop}px wrapOpacity=${d.wrapOp}`);
}
await browser.close();
console.log("done");
