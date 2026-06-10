import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2200);
async function wheelTo(t){for(let k=0;k<300;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<5)break;await page.mouse.wheel(0,Math.max(-180,Math.min(180,t-y)));await page.waitForTimeout(45);}}
await wheelTo(1000); await page.waitForTimeout(300);
// entranceOpacity is now identity (input [0,1,1]), so wrapOp == framer scrollYProgress
console.log("scrollY -> framer_v (identity)");
for (const y of [1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1700]) {
  await wheelTo(y); await page.waitForTimeout(280);
  const o = await page.evaluate(() => {
    const w = document.querySelector(".burst-reveal").firstElementChild.firstElementChild;
    return { sy: window.scrollY, fv:+(+getComputedStyle(w).opacity).toFixed(3) };
  });
  console.log(`${o.sy} -> ${o.fv}`);
}
await browser.close();
