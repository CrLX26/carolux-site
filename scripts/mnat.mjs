// Natural (wheel) mobile scroll through the alert->stats transition so the burst
// video plays in real time and the IntersectionObserver fires as it would for a
// real user. Screenshots + reports video.currentTime at each stop.
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);

// wheel down to ~y=1000 first (above the transition)
async function wheelTo(targetY) {
  for (let k = 0; k < 200; k++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(y - targetY) < 10) break;
    await page.mouse.wheel(0, Math.max(-250, Math.min(250, targetY - y)));
    await page.waitForTimeout(80); // real-time-ish pacing so video plays
  }
}
await wheelTo(1000);
await page.waitForTimeout(400);

const stops = [1100, 1300, 1500, 1750];
for (const y of stops) {
  await wheelTo(y);
  await page.waitForTimeout(500);
  const info = await page.evaluate(() => {
    const v = document.querySelector(".burst-reveal video");
    const stats = document.querySelector(".burst-reveal");
    return {
      ct: v ? +v.currentTime.toFixed(2) : "n/a",
      paused: v ? v.paused : "n/a",
      statsTopVp: Math.round(stats.getBoundingClientRect().top),
    };
  });
  await page.screenshot({ path: `.shots/mn_${y}.png` });
  console.log(`y=${y}  video.t=${info.ct}s paused=${info.paused}  statsTopViewport=${info.statsTopVp}px`);
}
await browser.close();
console.log("done");
