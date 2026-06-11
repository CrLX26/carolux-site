import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".shots", { recursive: true });
const url="http://localhost:3000";
// DESKTOP: poll the thermal overlay mask — empty gradient = NORMAL, has radial = THERMAL
{
  const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900}}); const p=await ctx.newPage();
  await p.goto(url,{waitUntil:"domcontentloaded"}); await p.waitForTimeout(2500);
  let gotN=false,gotT=false;
  for(let i=0;i<60 && !(gotN&&gotT);i++){
    const m=await p.evaluate(()=>{const e=[...document.querySelectorAll('div')].find(d=>getComputedStyle(d).zIndex==='20');return e?getComputedStyle(e).maskImage:"";});
    if(!gotN && /rgba\(0, 0, 0, 0\)/.test(m) && !/radial/.test(m)){ await p.screenshot({path:".shots/c_desk_normal.png"}); gotN=true; console.log("desk normal ✓"); }
    if(!gotT && /radial/.test(m)){ await p.screenshot({path:".shots/c_desk_thermal.png"}); gotT=true; console.log("desk thermal ✓"); }
    await p.waitForTimeout(250);
  }
  await b.close();
}
// MOBILE: poll .thermal-crossfade opacity — ~0 NORMAL, ~1 THERMAL
{
  const b=await chromium.launch(); const ctx=await b.newContext({...devices["iPhone 13"]}); const p=await ctx.newPage();
  await p.goto(url,{waitUntil:"domcontentloaded"}); await p.waitForTimeout(2500);
  let gotN=false,gotT=false;
  for(let i=0;i<60 && !(gotN&&gotT);i++){
    const o=await p.evaluate(()=>{const e=document.querySelector(".thermal-crossfade");return e?+(+getComputedStyle(e).opacity).toFixed(2):-1;});
    if(!gotN && o>=0 && o<=0.06){ await p.screenshot({path:".shots/c_mob_normal.png"}); gotN=true; console.log("mob normal ✓"); }
    if(!gotT && o>=0.95){ await p.screenshot({path:".shots/c_mob_thermal.png"}); gotT=true; console.log("mob thermal ✓"); }
    await p.waitForTimeout(250);
  }
  await b.close();
}
console.log("done");
