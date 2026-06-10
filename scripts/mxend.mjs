import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);
async function wheelTo(t){for(let k=0;k<320;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<6)break;await page.mouse.wheel(0,Math.max(-200,Math.min(200,t-y)));await page.waitForTimeout(45);}}
await wheelTo(1000); await page.waitForTimeout(300);
for (const y of [1750, 2000, 2300]) {
  await wheelTo(y); await page.waitForTimeout(350);
  const d = await page.evaluate(() => {
    const v=document.querySelector(".burst-reveal video");
    const reg=document.querySelector('[aria-label="Why insulation pays off"]');
    const hero=reg?.children[0], sup=reg?.children[1];
    const op=e=>e?+(+getComputedStyle(e).opacity).toFixed(2):"-";
    return { sy:window.scrollY, vt:v?+v.currentTime.toFixed(1):"-", paused:v?.paused,
             s15:op(hero), s90:op(sup?.children[0]), sR49:op(sup?.children[1]) };
  });
  await page.screenshot({ path: `.shots/mxe_${y}.png` });
  console.log(`scrollY=${d.sy} video.t=${d.vt} paused=${d.paused}  15%=${d.s15} 90%=${d.s90} R49=${d.sR49}`);
}
await browser.close();
