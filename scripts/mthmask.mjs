import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);
const d = await page.evaluate(() => {
  const cf = document.querySelector(".thermal-crossfade");
  const parent = cf?.parentElement;
  const cs = cf?getComputedStyle(cf):null;
  const ps = parent?getComputedStyle(parent):null;
  return {
    cf_mask: cs?.maskImage, cf_webkitMask: cs?.webkitMaskImage, cf_clip: cs?.clipPath,
    cf_contain: cs?.contain, cf_visibility: cs?.visibility, cf_display: cs?.display,
    parent_mask: ps?.maskImage, parent_webkitMask: ps?.webkitMaskImage, parent_opacity: ps?.opacity,
  };
});
console.log(JSON.stringify(d,null,2));
await browser.close();
