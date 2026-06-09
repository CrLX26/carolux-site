// First-load fit check for Galaxy S25+ -ish viewports.
import { chromium } from "playwright";
const url = process.env.URL || "http://localhost:3000";
const SIZES = [
  ["S25+ tall", 412, 915],
  ["S25+ usable", 412, 820],
  ["S25+ small chrome", 412, 770],
  ["iPhone SE", 375, 568],
];
const browser = await chromium.launch();
for (const [name, width, height] of SIZES) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const m = await page.evaluate(() => {
    const vh = window.innerHeight;
    const header = document.querySelector("header");
    const navBottom = header ? Math.round(header.getBoundingClientRect().bottom) : null;
    const base = document.querySelector("#home .relative.z-10");
    const eyebrow = base ? base.querySelector("p") : null;
    const eyebrowTop = eyebrow ? Math.round(eyebrow.getBoundingClientRect().top) : null;
    const btn = base ? [...base.querySelectorAll("a")].find((a) => /BOOK YOUR FREE/i.test(a.textContent)) : null;
    const btnBottom = btn ? Math.round(btn.getBoundingClientRect().bottom) : null;
    const bar = [...document.querySelectorAll("a,button")].find((e) => /Get Estimate/i.test(e.textContent) && e.getBoundingClientRect().top > vh * 0.6);
    const barTop = bar ? Math.round(bar.getBoundingClientRect().top) : vh;
    return { vh, navBottom, eyebrowTop, btnBottom, barTop };
  });
  await page.screenshot({ path: `.shots/s25_${name.replace(/\W+/g, "_")}.png` });
  const gap = m.eyebrowTop - m.navBottom;
  const clears = m.btnBottom != null && m.btnBottom <= m.barTop;
  console.log(`${name.padEnd(18)} ${m.vh}h  navBottom=${m.navBottom}  eyebrowGap=${gap}  btnBottom=${m.btnBottom}  barTop=${m.barTop}  ${clears ? "BUTTON FITS ✓" : "BUTTON CHOPPED ✗ (over by " + (m.btnBottom - m.barTop) + ")"}`);
  await ctx.close();
}
await browser.close();
