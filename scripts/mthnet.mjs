import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
const imgReqs = [];
page.on("response", r => { const u=r.url(); if(/thermal/i.test(u)) imgReqs.push(`${r.status()} ${u.split("/").pop().split("?")[0]}`); });
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
const dom = await page.evaluate(() => {
  const layer = document.querySelector(".thermal-crossfade");
  const imgs = layer ? [...layer.querySelectorAll("img")] : [];
  const info = imgs.map(im => ({
    src: (im.currentSrc||im.src||"").split("/").pop().split("?")[0],
    complete: im.complete, naturalW: im.naturalWidth,
    rectW: Math.round(im.getBoundingClientRect().width), rectH: Math.round(im.getBoundingClientRect().height),
    loading: im.getAttribute("loading"),
  }));
  // layer geometry + computed opacity
  const r = layer ? layer.getBoundingClientRect() : null;
  return { layerFound: !!layer, layerOpacity: layer?getComputedStyle(layer).opacity:"-", layerRect: r?`${Math.round(r.width)}x${Math.round(r.height)} @${Math.round(r.top)}`:"-", imgs: info };
});
console.log("thermal image responses:", imgReqs.length ? imgReqs.join(" | ") : "NONE REQUESTED");
console.log("DOM:", JSON.stringify(dom, null, 2));
await browser.close();
