// Desktop screenshot tool — drives a real cursor over the hero so mouse-driven
// effects (thermal spotlight, NEW sky reveal) actually render. Playwright runs
// rAF un-throttled, unlike the preview MCP.
//
//   node scripts/dshot.mjs            -> default cursor positions
//   node scripts/dshot.mjs 0.3,0.45 0.6,0.4   -> custom "fx,fy" viewport fractions
//
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.URL || "http://localhost:3000";
const args = process.argv.slice(2);
const spots = (args.length ? args : ["0.3,0.42", "0.55,0.5", "0.7,0.35"]).map((s) => s.split(",").map(Number));

mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => ({ vw: innerWidth, vh: innerHeight }));
console.log(`desktop ${info.vw}x${info.vh}`);

for (let i = 0; i < spots.length; i++) {
  const [fx, fy] = spots[i];
  const x = Math.round(fx * info.vw), y = Math.round(fy * info.vh);
  // a couple of small moves so mousemove handlers fire + transitions settle
  await page.mouse.move(x - 12, y - 12);
  await page.mouse.move(x, y);
  await page.waitForTimeout(450);
  const path = `.shots/d_${String(i).padStart(2, "0")}_${fx}-${fy}.png`;
  await page.screenshot({ path });
  console.log(`  shot ${i}: cursor (${x},${y}) -> ${path}`);
}
await browser.close();
console.log("done");
