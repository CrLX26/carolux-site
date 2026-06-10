import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);
const st = await page.evaluate(()=>{const c=document.querySelector(".burst-reveal");return Math.round(c.getBoundingClientRect().top+window.scrollY);});
console.log("statsTop(doc) =", st);
async function wheelTo(t){for(let k=0;k<300;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<5)break;await page.mouse.wheel(0,Math.max(-180,Math.min(180,t-y)));await page.waitForTimeout(45);}}
await wheelTo(1000); await page.waitForTimeout(300);
for (const y of [1250, 1350, 1430, 1520, 1650]) {
  await wheelTo(y); await page.waitForTimeout(320);
  const d = await page.evaluate(() => {
    const w = document.querySelector(".burst-reveal").firstElementChild.firstElementChild;
    return { sy: window.scrollY, wrapOp:+(+getComputedStyle(w).opacity).toFixed(2) };
  });
  await page.screenshot({ path: `.shots/mx_${y}.png` });
  console.log(`scrollY=${d.sy}  crossfadeOpacity=${d.wrapOp}`);
}
await browser.close();
