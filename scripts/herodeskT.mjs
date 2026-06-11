import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900}}); const p=await ctx.newPage();
await p.goto("http://localhost:3000",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(2500);
for(let i=0;i<80;i++){
  const m=await p.evaluate(()=>{const el=[...document.querySelectorAll('div')].find(d=>{const mi=getComputedStyle(d).maskImage;return mi&&mi!=='none';});return el?getComputedStyle(el).maskImage:"none";});
  // SOLID full-thermal hold = linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)) with NO alpha-0 and NO radial
  if(/linear-gradient\(rgb\(0, 0, 0\), rgb\(0, 0, 0\)\)/.test(m)){ await p.screenshot({path:".shots/c_desk_thermal_full.png"}); console.log("desk FULL thermal ✓"); break; }
  await p.waitForTimeout(180);
}
await b.close();
