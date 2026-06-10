import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);
async function wheelTo(t){for(let k=0;k<240;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<6)break;await page.mouse.wheel(0,Math.max(-220,Math.min(220,t-y)));await page.waitForTimeout(55);}}
await wheelTo(1000); await page.waitForTimeout(300);
for (const y of [1300, 1434, 1560, 1700, 1850]) {
  await wheelTo(y); await page.waitForTimeout(350);
  const d = await page.evaluate(() => {
    const cont = document.querySelector(".burst-reveal");
    const wrap = cont.firstElementChild.firstElementChild; // sticky > entrance wrapper
    const sky = document.querySelector('[data-desk-sky]'); // desktop only; mobile sky is the hero video
    const reg = document.querySelector('[aria-label="Why insulation pays off"]');
    return {
      v: +(Math.max(0,Math.min(1,(window.scrollY - (cont.getBoundingClientRect().top+window.scrollY))/(cont.offsetHeight-window.innerHeight)))).toFixed(3),
      wrapOpacity: +(+getComputedStyle(wrap).opacity).toFixed(2),
    };
  });
  console.log(`scrollY≈${y}  v=${d.v}  wrapOpacity(cross-fade)=${d.wrapOpacity}`);
}
await browser.close();
