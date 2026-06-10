// Firefox desktop check: the burst must NOT auto-play on page load (the old bug),
// and must start playing once the Stats panel is in full view. Verifies the
// non-scrub fallback path the user actually sees on Firefox.
import { firefox } from "playwright";
const url = process.env.URL || "http://localhost:3000";
const browser = await firefox.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

const atTop = await page.evaluate(() => {
  const v = document.querySelector(".burst-reveal video");
  return { paused: v ? v.paused : "n/a", ct: v ? +v.currentTime.toFixed(2) : "n/a" };
});
console.log("AT PAGE TOP (should be paused, t~0):", JSON.stringify(atTop));

const geo = await page.evaluate(() => {
  const el = document.querySelector(".burst-reveal");
  return { top: el.getBoundingClientRect().top + window.scrollY, h: el.offsetHeight };
});
async function wheelTo(targetY) {
  for (let k = 0; k < 160; k++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(y - targetY) < 8) break;
    await page.mouse.wheel(0, Math.max(-360, Math.min(360, targetY - y)));
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(600);
}
// scroll to ~40% into the stats tunnel (panel fully pinned)
await wheelTo(Math.round(geo.top + 0.4 * (geo.h - 900)));
const inView = await page.evaluate(() => {
  const v = document.querySelector(".burst-reveal video");
  return { paused: v ? v.paused : "n/a", ct: v ? +v.currentTime.toFixed(2) : "n/a" };
});
console.log("STATS IN FULL VIEW (should be playing):", JSON.stringify(inView));
await browser.close();
console.log("done");
