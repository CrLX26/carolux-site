import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
for (let i=0;i<30;i++){
  const op = await page.evaluate(()=>{const e=document.querySelector(".thermal-crossfade");return e?+(+getComputedStyle(e).opacity).toFixed(2):-1;});
  if (op>=0.92){
    const stack = await page.evaluate(()=>{
      const x=window.innerWidth*0.82, y=window.innerHeight*0.72; // clear house, lower-right
      const els = document.elementsFromPoint(x,y).slice(0,8);
      return els.map(el=>{
        const cs=getComputedStyle(el);
        const img = el.tagName==="IMG" ? (el.currentSrc||el.src||"").split("/").pop().slice(0,30) : "";
        return `${el.tagName}.${(el.className||"").toString().slice(0,24)} z=${cs.zIndex} op=${cs.opacity} ${img}`;
      });
    });
    console.log(`peak op=${op}, paint stack at house (top→bottom):`);
    stack.forEach((s,i)=>console.log(`  ${i}: ${s}`));
    break;
  }
  await page.waitForTimeout(350);
}
await browser.close();
