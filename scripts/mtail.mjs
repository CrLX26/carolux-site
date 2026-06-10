// Diagnose the mobile blank-cream stretch: find where the hero sticky panel
// releases vs where the alert cool-to-cream finishes, so the dead scroll between
// the alert and the Stats burst can be measured.
import { chromium, devices } from "playwright";
const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);

const base = await page.evaluate(() => {
  const stats = document.querySelector(".burst-reveal");
  const hero = stats.previousElementSibling;
  const heroSticky = hero.querySelector('[style*="sticky"]') || hero.firstElementChild;
  return {
    vh: window.innerHeight,
    heroTop: Math.round(hero.getBoundingClientRect().top + window.scrollY),
    heroH: hero.offsetHeight,
    statsTop: Math.round(stats.getBoundingClientRect().top + window.scrollY),
  };
});
console.log("base", JSON.stringify(base));

for (let y = base.heroTop + base.heroH - base.vh * 2; y <= base.statsTop + 100; y += 130) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(220);
  const d = await page.evaluate(() => {
    const stats = document.querySelector(".burst-reveal");
    const hero = stats.previousElementSibling;
    const sticky = hero.firstElementChild;
    const sr = sticky.getBoundingClientRect();
    // sample the pixel color at viewport center-top (180px down) to see if it's blank cream
    return {
      stickyTop: Math.round(sr.top),
      stickyBottom: Math.round(sr.bottom),
      statsTopRel: Math.round(stats.getBoundingClientRect().top),
    };
  });
  console.log(`y=${y}  heroStickyTop=${d.stickyTop} heroStickyBottom=${d.stickyBottom}  statsTopInViewport=${d.statsTopRel}`);
}
await browser.close();
console.log("done");
