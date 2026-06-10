// Capture the mobile hero->stats boundary to see the reported "white gap".
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);
// statsTop ~2393, vh ~664. Walk through 2000..3100.
for (const y of [1350, 1500, 1650, 1800, 1950, 2150]) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(900);
  const info = await page.evaluate(() => {
    const v = document.querySelector(".burst-reveal video");
    return { ready: v ? v.readyState : "n/a", ct: v ? +v.currentTime.toFixed(2) : "n/a", paused: v ? v.paused : "n/a" };
  });
  await page.screenshot({ path: `.shots/mb_${y}.png` });
  console.log(`y=${y}  video.readyState=${info.ready} t=${info.ct} paused=${info.paused}`);
}
await browser.close();
console.log("done");
