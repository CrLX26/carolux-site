// Worst-case bleed test: scroll into the alert phase, force BOTH sky-video
// copies fully transparent (worse than any real crossfade dip), and capture.
// If the opaque backdrop works, we see sky — not the house/thermal beneath.
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const vh = await page.evaluate(() => window.innerHeight);
await page.evaluate((y) => window.scrollTo(0, y), Math.round(1.4 * vh));
await page.waitForTimeout(500);
// Force both videos transparent — simulates a 100% crossfade gap. Pause them
// so the loop's timeupdate handler can't re-set opacity, and kill the 1s
// transition so it's instant.
await page.evaluate(() => document.querySelectorAll("video").forEach((v) => {
  v.pause();
  v.style.transition = "none";
  v.style.opacity = "0";
}));
await page.waitForTimeout(300);
await page.screenshot({ path: ".shots/bleed_worstcase.png" });
console.log("captured .shots/bleed_worstcase.png (both videos forced opacity 0)");
await browser.close();
