// Desktop scroll-timeline screenshots. Drives native scroll (Lenis follows) and
// reports scrollYProgress of the hero tunnel at each stop so thresholds can be
// chosen against real numbers. Optional fixed cursor via MX,MY env (fractions).
//
//   node scripts/dscroll.mjs 0 0.6 1.0 1.4 1.8 2.2   (vh multiples)
//
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.URL || "http://localhost:3000";
const mults = (process.argv.slice(2).length ? process.argv.slice(2) : ["0", "0.6", "1.0", "1.4", "1.8", "2.2"]).map(Number);
const mx = process.env.MX ? Number(process.env.MX) : null;
const my = process.env.MY ? Number(process.env.MY) : null;

mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const vh = await page.evaluate(() => window.innerHeight);
// Park the cursor over the panel so mousemove handlers fire (real wheel scroll
// keeps Lenis + framer in sync, unlike programmatic scrollTo).
if (mx !== null && my !== null) { await page.mouse.move(mx * 1440, my * vh); }

async function wheelTo(targetY) {
  for (let k = 0; k < 60; k++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(y - targetY) < 8) break;
    await page.mouse.wheel(0, Math.max(-240, Math.min(240, targetY - y)));
    await page.waitForTimeout(90);
  }
  // let Lenis lerp + framer settle: require several consecutive stable reads
  let last = -1, stable = 0;
  for (let k = 0; k < 30; k++) {
    await page.waitForTimeout(150);
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) { if (++stable >= 4) break; } else { stable = 0; last = y; }
  }
  await page.waitForTimeout(400);
}

for (let i = 0; i < mults.length; i++) {
  const y = Math.round(mults[i] * vh);
  await wheelTo(y);
  if (mx !== null && my !== null) { await page.mouse.move(mx * 1440 + (i % 2), my * vh); }
  await page.waitForTimeout(200);
  // report scroll position + the ACTUAL rendered opacity of the sky layer
  const data = await page.evaluate(() => {
    const el = document.getElementById("home");
    const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
    const h = el ? el.offsetHeight : 1;
    const prog = Math.max(0, Math.min(1, (window.scrollY - top) / (h - window.innerHeight)));
    const sky = document.querySelector('[data-desk-sky]');
    const skyOp = sky ? getComputedStyle(sky).opacity : "n/a";
    return { prog, skyOp, scrollY: window.scrollY, fprog: window.__heroProg };
  });
  const path = `.shots/ds_${String(i).padStart(2, "0")}_vh${mults[i]}.png`;
  await page.screenshot({ path });
  console.log(`  vh*${mults[i]}  scrollY=${data.scrollY}  winProg=${data.prog.toFixed(3)}  framerProg=${(data.fprog ?? 0).toFixed(3)}  skyOp=${data.skyOp}`);
}
await browser.close();
console.log("done");
