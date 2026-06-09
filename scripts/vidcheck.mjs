import { chromium, devices } from "playwright";
const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
const vh = await page.evaluate(() => window.innerHeight);
await page.evaluate((y) => window.scrollTo(0, y), vh * 1.5); // alert visible, fixed scroll
await page.waitForTimeout(800);
const sample = () =>
  page.evaluate(() => {
    const [a, b] = document.querySelectorAll("#home video");
    const f = (v) => (v ? { t: +v.currentTime.toFixed(1), o: getComputedStyle(v).opacity.slice(0, 4), paused: v.paused } : null);
    return { dur: +(a?.duration || 0).toFixed(1), A: f(a), B: f(b) };
  });
console.log("scroll is FIXED — currentTime should still advance (time-based, not scroll):");
for (let i = 0; i < 14; i++) {
  console.log(`  t+${(i * 1.6).toFixed(1)}s `, JSON.stringify(await sample()));
  await page.waitForTimeout(1600);
}
await browser.close();
