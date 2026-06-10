import { chromium, firefox } from "playwright";
async function measure(engine, name) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  // measure frame intervals AT REST on hero (thermal rAF running, no scroll)
  const rest = await page.evaluate(() => new Promise(res => {
    const t = []; let last = performance.now(), n = 0;
    function f(now){ t.push(now-last); last=now; if(++n<120){requestAnimationFrame(f);} else {
      t.sort((a,b)=>a-b); const avg=t.reduce((s,x)=>s+x,0)/t.length;
      res({avg:+avg.toFixed(1), p95:+t[Math.floor(t.length*0.95)].toFixed(1), worst:+t[t.length-1].toFixed(1), fps:+(1000/avg).toFixed(0)});
    }}
    requestAnimationFrame(f);
  }));
  // measure during a wheel scroll through hero->stats
  const scroll = await page.evaluate(() => new Promise(res => {
    const t=[]; let last=performance.now(), n=0;
    let sy=0; const iv=setInterval(()=>{ sy+=60; window.scrollTo(0,sy); },16);
    function f(now){ t.push(now-last); last=now; if(++n<180){requestAnimationFrame(f);} else {
      clearInterval(iv); t.sort((a,b)=>a-b); const avg=t.reduce((s,x)=>s+x,0)/t.length;
      res({avg:+avg.toFixed(1), p95:+t[Math.floor(t.length*0.95)].toFixed(1), worst:+t[t.length-1].toFixed(1), fps:+(1000/avg).toFixed(0)});
    }}
    requestAnimationFrame(f);
  }));
  console.log(`${name}: AT REST avg=${rest.avg}ms (~${rest.fps}fps) p95=${rest.p95} worst=${rest.worst}  |  SCROLL avg=${scroll.avg}ms (~${scroll.fps}fps) p95=${scroll.p95} worst=${scroll.worst}`);
  await browser.close();
}
await measure(chromium, "CHROMIUM");
await measure(firefox,  "FIREFOX ");
