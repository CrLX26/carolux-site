import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
// sample avg color of a house region (right side) at several thermal opacities
async function sample(){
  const buf = await page.screenshot();
  // use canvas in-page instead: draw a small region
  return await page.evaluate(async () => {
    // sample by reading from a temporary canvas of the visible house area via html2canvas-free approach:
    // just report the thermal opacity + the thermal image visibility flags
    const e = document.querySelector(".thermal-crossfade");
    const img = e?.querySelector("img");
    const r = img?.getBoundingClientRect();
    return { op: e?+(+getComputedStyle(e).opacity).toFixed(2):-1,
             imgVisible: r? (r.width>0 && r.height>0):false,
             imgOpacity: img?getComputedStyle(img).opacity:"-",
             parentOpacity: e?.parentElement?getComputedStyle(e.parentElement).opacity:"-",
             thermalLayerZ: e?.parentElement?getComputedStyle(e.parentElement).zIndex:"-",
             mixBlend: img?getComputedStyle(img).mixBlendMode:"-" };
  });
}
let shots=[];
for(let i=0;i<24;i++){
  const s = await sample();
  shots.push(s.op);
  if (s.op>=0.95){ console.log("AT PEAK:", JSON.stringify(s)); break; }
  await page.waitForTimeout(350);
}
await browser.close();
