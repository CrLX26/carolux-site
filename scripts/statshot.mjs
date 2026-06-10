// Desktop Stats-section screenshots. Real wheel scroll (Lenis + framer sync,
// video scrubs). Wheels to the .burst-reveal container and shoots at internal
// progress fractions so the editorial lockup reveal can be eyeballed.
//
//   node scripts/statshot.mjs 0.0 0.2 0.5 0.8 1.0
//
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.URL || "http://localhost:3000";
const fracs = (process.argv.slice(2).length ? process.argv.slice(2) : ["0.05", "0.3", "0.6", "0.9"]).map(Number);

mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const VW = Number(process.env.WIDTH || 1440), VH = Number(process.env.HEIGHT || 900);
const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

const geo = await page.evaluate(() => {
  const el = document.querySelector(".burst-reveal");
  const top = el.getBoundingClientRect().top + window.scrollY;
  return { top, height: el.offsetHeight, vh: window.innerHeight };
});

async function wheelTo(targetY) {
  for (let k = 0; k < 120; k++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(y - targetY) < 8) break;
    await page.mouse.wheel(0, Math.max(-300, Math.min(300, targetY - y)));
    await page.waitForTimeout(70);
  }
  let last = -1, stable = 0;
  for (let k = 0; k < 30; k++) {
    await page.waitForTimeout(140);
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) { if (++stable >= 4) break; } else { stable = 0; last = y; }
  }
  await page.waitForTimeout(500);
}

for (let i = 0; i < fracs.length; i++) {
  const targetY = Math.round(geo.top + fracs[i] * (geo.height - geo.vh));
  await wheelTo(targetY);
  const info = await page.evaluate(() => {
    const v = document.querySelector(".burst-reveal video");
    return { ct: v ? v.currentTime.toFixed(2) : "n/a" };
  });
  const path = `.shots/stat_${String(i).padStart(2, "0")}_f${fracs[i]}.png`;
  await page.screenshot({ path });
  console.log(`  frac=${fracs[i]}  scrollY=${targetY}  video.t=${info.ct}s  ->  ${path}`);
}
await browser.close();
console.log("done");
