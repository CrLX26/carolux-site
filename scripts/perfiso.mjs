import { firefox } from "playwright";
const browser = await firefox.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);
const vids = await page.evaluate(() => {
  const vs=[...document.querySelectorAll("video")];
  return { count: vs.length, playing: vs.filter(v=>!v.paused).length, srcs: vs.map(v=>(v.currentSrc||v.src||"").split("/").pop()) };
});
console.log("concurrent <video> elements:", JSON.stringify(vids));
async function fps(label){
  return await page.evaluate(() => new Promise(res=>{
    const t=[];let last=performance.now(),n=0;
    function f(now){t.push(now-last);last=now;if(++n<120)requestAnimationFrame(f);else{const avg=t.reduce((s,x)=>s+x,0)/t.length;res(+(1000/avg).toFixed(0));}}
    requestAnimationFrame(f);
  }));
}
const normalFps = await fps();
// hide the thermal rAF layer (desktop) to see its cost
await page.evaluate(() => { const el=document.querySelector('[ref],[style*="z-index: 20"],div'); });
await page.evaluate(() => {
  // find the z20 thermal overlay and hide it
  document.querySelectorAll("div").forEach(d=>{ if(getComputedStyle(d).zIndex==="20"){ d.style.display="none"; }});
});
await page.waitForTimeout(500);
const noThermalFps = await fps();
console.log(`FIREFOX hero FPS:  with thermal mask rAF = ${normalFps}fps   |   thermal layer hidden = ${noThermalFps}fps`);
await browser.close();
