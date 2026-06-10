// Mobile Stats screenshot — iPhone emulation, scrolls the .burst-reveal section
// into view so its IntersectionObserver fires the staggered reveal.
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.URL || "http://localhost:3000";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);

const top = await page.evaluate(() => {
  const el = document.querySelector(".burst-reveal");
  return el.getBoundingClientRect().top + window.scrollY;
});
await page.evaluate((y) => window.scrollTo(0, y), Math.round(top));
await page.waitForTimeout(1600); // stagger (3 × 150ms) + transitions settle
await page.screenshot({ path: ".shots/mstat.png" });
console.log("mobile stats top =", Math.round(top), "-> .shots/mstat.png");
await browser.close();
