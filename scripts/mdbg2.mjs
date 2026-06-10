import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
async function wheelTo(t){for(let k=0;k<200;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<8)break;await page.mouse.wheel(0,Math.max(-250,Math.min(250,t-y)));await page.waitForTimeout(60);}}
for (const target of [1560, 1750]) {
  await wheelTo(target);
  await page.waitForTimeout(500);
  const d = await page.evaluate(() => {
    const cont = document.querySelector(".burst-reveal");
    const sticky = cont.firstElementChild;
    const wrap = sticky.firstElementChild;
    // topmost element at center + at the 15% location
    const cx = window.innerWidth/2;
    const topCenter = document.elementFromPoint(cx, window.innerHeight*0.4);
    const heroOuter = cont.previousElementSibling;
    const heroSticky = heroOuter ? heroOuter.querySelector('[style*="sticky"], [style*="position: sticky"]') : null;
    function zinfo(el){ if(!el) return "n/a"; const s=getComputedStyle(el); return `pos=${s.position} z=${s.zIndex}`; }
    return {
      scrollY: window.scrollY,
      wrapOpacity: getComputedStyle(wrap).opacity,
      statsContainerZ: zinfo(cont),
      statsStickyZ: zinfo(sticky),
      heroOuterZ: zinfo(heroOuter),
      topAtCenter: topCenter ? (topCenter.tagName + " cls=" + (topCenter.className||"").toString().slice(0,40) + " " + zinfo(topCenter)) : "none",
      topAtCenterClosestSection: topCenter ? (topCenter.closest(".burst-reveal") ? "STATS" : (heroOuter && heroOuter.contains(topCenter) ? "HERO" : "other")) : "?",
    };
  });
  console.log(`y=${target}:`, JSON.stringify(d, null, 2));
}
await browser.close();
