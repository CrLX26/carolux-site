// Mobile scroll screenshot tool — lets the dev see scroll-driven animations.
// Emulates a real iPhone (isMobile + hasTouch => pointer:coarse), so Lenis stays
// disabled and native scroll + rAF behave like a real phone.
//
// Usage:  node scripts/mshot.mjs 0 0.5 1 1.5 2 2.5    (scroll positions in *vh multiples*)
//         URL=http://localhost:3000 node scripts/mshot.mjs ...
// Output: .shots/m_<i>_<vh>.png  +  prints vh / scrollHeight so positions are known.

import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.URL || "http://localhost:3000";
const mults = (process.argv.slice(2).length ? process.argv.slice(2) : ["0", "0.5", "1", "1.5", "2", "2.5"]).map(Number);

mkdirSync(".shots", { recursive: true });

const iPhone = devices["iPhone 13"];
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...iPhone });
const page = await ctx.newPage();

await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => ({
  vh: window.innerHeight,
  vw: window.innerWidth,
  scrollHeight: document.documentElement.scrollHeight,
  coarse: window.matchMedia("(pointer: coarse)").matches,
}));
console.log("viewport", info.vw + "x" + info.vh, "| scrollHeight", info.scrollHeight, "| pointer coarse:", info.coarse);

for (let i = 0; i < mults.length; i++) {
  const y = Math.round(mults[i] * info.vh);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(400); // let rAF transforms + transitions settle
  const path = `.shots/m_${String(i).padStart(2, "0")}_vh${mults[i]}.png`;
  await page.screenshot({ path });
  console.log(`  shot ${i}: vh*${mults[i]} = ${y}px -> ${path}`);
}

await browser.close();
console.log("done");
