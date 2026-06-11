import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900}}); const p=await ctx.newPage();
await p.goto("http://localhost:3000",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(2500);
let gotN=false,gotT=false;
for(let i=0;i<80 && !(gotN&&gotT);i++){
  const m=await p.evaluate(()=>{
    // find the element carrying the thermal mask (maskImage != none)
    const el=[...document.querySelectorAll('div')].find(d=>{const mi=getComputedStyle(d).maskImage;return mi&&mi!=='none';});
    return el?getComputedStyle(el).maskImage:"none";
  });
  if(!gotN && m!=="none" && /rgba\(0, 0, 0, 0\)/.test(m) && !/radial/.test(m)){ await p.screenshot({path:".shots/c_desk_normal.png"}); gotN=true; console.log("desk NORMAL ✓"); }
  if(!gotT && /radial/.test(m)){ await p.screenshot({path:".shots/c_desk_thermal.png"}); gotT=true; console.log("desk THERMAL ✓"); }
  await p.waitForTimeout(220);
}
console.log(gotN?"":"(normal not caught)", gotT?"":"(thermal not caught)");
await b.close();
