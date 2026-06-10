import { chromium, devices } from "playwright";
const url = "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", e => errs.push("PAGEERR: " + e.message));
page.on("console", m => { if (m.type()==="error") errs.push("CONSOLE: " + m.text()); });
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
async function wheelTo(t){for(let k=0;k<200;k++){const y=await page.evaluate(()=>scrollY);if(Math.abs(y-t)<10)break;await page.mouse.wheel(0,Math.max(-250,Math.min(250,t-y)));await page.waitForTimeout(60);}}
await wheelTo(1750);
await page.waitForTimeout(600);
const d = await page.evaluate(() => {
  const cont = document.querySelector(".burst-reveal");
  const sticky = cont.firstElementChild;
  const wrap = sticky.firstElementChild;
  const region = sticky.querySelector('[aria-label="Why insulation pays off"]');
  const hero = region ? region.firstElementChild : null;
  const v = cont.querySelector("video");
  return {
    contTop: Math.round(cont.getBoundingClientRect().top),
    stickyPos: getComputedStyle(sticky).position,
    stickyTop: Math.round(sticky.getBoundingClientRect().top),
    wrapOpacity: getComputedStyle(wrap).opacity,
    regionFound: !!region,
    heroOpacity: hero ? getComputedStyle(hero).opacity : "n/a",
    heroText: hero ? hero.innerText.slice(0,30) : "n/a",
    heroRectTop: hero ? Math.round(hero.getBoundingClientRect().top) : "n/a",
    videoReady: v ? v.readyState : "n/a",
    videoT: v ? +v.currentTime.toFixed(2) : "n/a",
    videoOpacity: v ? getComputedStyle(v).opacity : "n/a",
  };
});
console.log(JSON.stringify(d, null, 2));
console.log("ERRORS:", errs.length ? errs.join("\n") : "none");
await browser.close();
