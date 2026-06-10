// Measure Stats geometry on desktop AND mobile so timing/gap fixes use real
// numbers. Desktop: wheel through the Stats tunnel, report container progress v,
// video.currentTime, sticky panel rect.top, hero image opacity. Mobile: report
// hero outer bottom vs stats top (the "white gap").
import { chromium, devices } from "playwright";

const url = process.env.URL || "http://localhost:3000";

// ---- DESKTOP ----
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const vh = await page.evaluate(() => window.innerHeight);
  const geo = await page.evaluate(() => {
    const el = document.querySelector(".burst-reveal");
    return { top: el.getBoundingClientRect().top + window.scrollY, h: el.offsetHeight };
  });
  console.log("DESKTOP burst-reveal docTop=", Math.round(geo.top), "height=", geo.h, "vh=", vh);
  async function wheelTo(targetY) {
    for (let k = 0; k < 160; k++) {
      const y = await page.evaluate(() => window.scrollY);
      if (Math.abs(y - targetY) < 6) break;
      await page.mouse.wheel(0, Math.max(-360, Math.min(360, targetY - y)));
      await page.waitForTimeout(60);
    }
    let last = -1, stable = 0;
    for (let k = 0; k < 24; k++) { await page.waitForTimeout(120); const y = await page.evaluate(() => window.scrollY); if (y === last) { if (++stable >= 4) break; } else { stable = 0; last = y; } }
    await page.waitForTimeout(300);
  }
  // sample scrollY from just before the section through it
  const start = geo.top - vh;          // section bottom edge entering
  const span = geo.h;                   // through the whole tunnel
  for (const f of [0, 0.1, 0.2, 0.3, 0.45, 0.6, 0.8, 1.0]) {
    const targetY = Math.round(start + f * span);
    await wheelTo(targetY);
    const d = await page.evaluate(() => {
      const el = document.querySelector(".burst-reveal");
      const sticky = el.firstElementChild;
      const v = document.querySelector(".burst-reveal video");
      const heroImg = document.querySelector('[data-hero-img]');
      const top = el.getBoundingClientRect().top + window.scrollY;
      const h = el.offsetHeight;
      const prog = Math.max(0, Math.min(1, (window.scrollY - top) / (h - window.innerHeight)));
      return {
        scrollY: window.scrollY,
        prog: +prog.toFixed(3),
        ct: v ? +v.currentTime.toFixed(2) : "n/a",
        stickyTop: Math.round(sticky.getBoundingClientRect().top),
      };
    });
    console.log(`  f=${f}  scrollY=${d.scrollY}  v=${d.prog}  video.t=${d.ct}s  stickyTop=${d.stickyTop}px`);
  }
  await browser.close();
}

// ---- MOBILE ----
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const d = await page.evaluate(() => {
    const vh = window.innerHeight;
    const stats = document.querySelector(".burst-reveal");
    const statsTop = stats.getBoundingClientRect().top + window.scrollY;
    // hero outer is the first <section>/<div> in <main> before stats — find prev sibling
    const heroOuter = stats.previousElementSibling;
    const heroTop = heroOuter ? heroOuter.getBoundingClientRect().top + window.scrollY : null;
    const heroBottom = heroOuter ? heroTop + heroOuter.offsetHeight : null;
    return {
      vh,
      heroTag: heroOuter ? heroOuter.tagName + "." + heroOuter.className : null,
      heroTop: heroTop != null ? Math.round(heroTop) : null,
      heroBottom: heroBottom != null ? Math.round(heroBottom) : null,
      heroHeight: heroOuter ? heroOuter.offsetHeight : null,
      statsTop: Math.round(statsTop),
      statsHeight: stats.offsetHeight,
      gap: heroBottom != null ? Math.round(statsTop - heroBottom) : null,
      scrollHeight: document.documentElement.scrollHeight,
    };
  });
  console.log("MOBILE", JSON.stringify(d, null, 2));
  await browser.close();
}
console.log("done");
