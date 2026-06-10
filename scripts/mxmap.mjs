import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);
async function wheelTo(t){for(let k=0;k<260;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<5)break;await page.mouse.wheel(0,Math.max(-200,Math.min(200,t-y)));await page.waitForTimeout(50);}}
await wheelTo(1000); await page.waitForTimeout(300);
// current window is [0.20,0.42]; wrapOp = clamp((fv-0.20)/0.22,0,1) => fv = 0.20 + wrapOp*0.22
console.log("scrollY | wrapOp | inferred framer_v");
for (const y of [1150,1250,1350,1450,1550,1650,1750]) {
  await wheelTo(y); await page.waitForTimeout(300);
  const o = await page.evaluate(() => {
    const w = document.querySelector(".burst-reveal").firstElementChild.firstElementChild;
    return { sy: window.scrollY, op:+(+getComputedStyle(w).opacity).toFixed(3) };
  });
  const fv = (0.20 + o.op*0.22).toFixed(3);
  console.log(`${o.sy} | ${o.op} | ${o.op>0&&o.op<1 ? fv : (o.op<=0?"<0.20":">0.42")}`);
}
await browser.close();
