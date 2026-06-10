import { firefox } from "playwright";
const browser = await firefox.launch();
// mobile-ish viewport (Firefox can't fully emulate touch, but width triggers isMobile media query)
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);
const env = await page.evaluate(() => ({
  vids: document.querySelectorAll("video").length,
  lenis: document.documentElement.classList.contains("lenis"),
  anims: document.getAnimations ? document.getAnimations().length : "n/a",
}));
console.log("mobile env:", JSON.stringify(env));
const scroll = await page.evaluate(() => new Promise(res=>{
  const t=[];let last=performance.now(),n=0,sy=0;
  const iv=setInterval(()=>{sy+=40;window.scrollTo(0,sy);},16);
  function f(now){t.push(now-last);last=now;if(++n<180)requestAnimationFrame(f);else{clearInterval(iv);t.sort((a,b)=>a-b);const avg=t.reduce((s,x)=>s+x,0)/t.length;res({fps:+(1000/avg).toFixed(0),p95:+t[Math.floor(t.length*0.95)].toFixed(1),worst:+t[t.length-1].toFixed(1)});}}
  requestAnimationFrame(f);
}));
console.log(`FIREFOX mobile(390px) SCROLL through hero: ~${scroll.fps}fps  p95=${scroll.p95}ms  worst=${scroll.worst}ms`);
await browser.close();
