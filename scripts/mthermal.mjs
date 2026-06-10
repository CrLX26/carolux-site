import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const url = "http://localhost:3000";
async function run(reduce, tag) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices["iPhone 13"], reducedMotion: reduce ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  // sample .thermal-crossfade computed opacity over ~10s (9s loop) at the hero top
  let max = 0, vals = [];
  for (let i = 0; i < 11; i++) {
    const op = await page.evaluate(() => {
      const el = document.querySelector(".thermal-crossfade");
      if (!el) return "NO-ELEMENT";
      return +(+getComputedStyle(el).opacity).toFixed(2);
    });
    if (typeof op === "number") { max = Math.max(max, op); vals.push(op); }
    if (i === 5) await page.screenshot({ path: `.shots/mth_${tag}.png` });
    await page.waitForTimeout(1000);
  }
  console.log(`[${tag}] reduced-motion=${reduce}  thermal-crossfade max opacity over 10s = ${max}  samples=[${vals.join(",")}]`);
  await browser.close();
}
await run(false, "normal");
await run(true, "reduced");
