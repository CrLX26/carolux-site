import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
// poll until the thermal overlay is at its NORMAL phase (opacity ~0), then shoot
for (let i=0;i<40;i++){
  const op = await page.evaluate(()=>{const e=document.querySelector('[data-thermal-overlay]')||[...document.querySelectorAll('div')].find(d=>getComputedStyle(d).zIndex==='20');return e?+(+getComputedStyle(e).opacity).toFixed(2):-1;});
  if (op>=0 && op<=0.05){ await page.screenshot({ path:".shots/hero_normal.png" }); console.log("normal-phase shot, thermalOverlayOpacity=",op); break; }
  await page.waitForTimeout(300);
}
await browser.close();
