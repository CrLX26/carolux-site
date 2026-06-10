import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
async function wheelTo(t){for(let k=0;k<240;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<8)break;await page.mouse.wheel(0,Math.max(-220,Math.min(220,t-y)));await page.waitForTimeout(55);}}
// scroll into the pinned section so the burst starts playing, then HOLD and watch it play
await wheelTo(1560);
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(1300);
  const d = await page.evaluate(() => {
    const v = document.querySelector(".burst-reveal video");
    const reg = document.querySelector('[aria-label="Why insulation pays off"]');
    const kids = reg ? [...reg.children] : [];
    // hero is child 0; supports container is child 1 (its children are the 2 supports)
    const hero = kids[0];
    const supWrap = kids[1];
    const sups = supWrap ? [...supWrap.children] : [];
    const op = el => el ? +(+getComputedStyle(el).opacity).toFixed(2) : "n/a";
    return { t: v ? +v.currentTime.toFixed(2) : "n/a", paused: v?.paused, dur: v? +v.duration.toFixed(2):"?",
             stat15: op(hero), stat90: op(sups[0]), statR49: op(sups[1]) };
  });
  await page.screenshot({ path: `.shots/mt_${i}.png` });
  console.log(`tick ${i}: video.t=${d.t}/${d.dur} paused=${d.paused}  15%=${d.stat15} 90%=${d.stat90} R49=${d.statR49}`);
}
await browser.close();
