// Measures hero top-clearance vs the sticky nav across device sizes.
import { chromium, devices } from "playwright";

const url = process.env.URL || "http://localhost:3000";
const TARGETS = [
  ["iPhone SE", devices["iPhone SE"]],
  ["iPhone 13", devices["iPhone 13"]],
  ["iPhone 14 Pro Max", devices["iPhone 14 Pro Max"]],
  ["Pixel 5", devices["Pixel 5"]],
  ["Galaxy S9+", devices["Galaxy S9+"]],
];

const browser = await chromium.launch();
for (const [name, dev] of TARGETS) {
  const ctx = await browser.newContext({ ...dev });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const m = await page.evaluate(() => {
    const r = (el) => (el ? Math.round(el.getBoundingClientRect().top) : null);
    const header = document.querySelector("header");
    const navBottom = header ? Math.round(header.getBoundingClientRect().bottom) : null;
    // first hero text line = the eyebrow paragraph inside the base content block
    const content = document.querySelector("#home .relative.z-10");
    const eyebrow = content ? content.querySelector("p") : null;
    const h1 = document.querySelector("#home h1");
    return {
      vh: window.innerHeight,
      navBottom,
      eyebrowTop: r(eyebrow),
      headlineTop: r(h1),
    };
  });
  const gap = m.eyebrowTop != null && m.navBottom != null ? m.eyebrowTop - m.navBottom : null;
  console.log(
    `${name.padEnd(20)} vh=${m.vh}  navBottom=${m.navBottom}  eyebrowTop=${m.eyebrowTop}  headlineTop=${m.headlineTop}  GAP=${gap}` +
    (gap != null && gap < 0 ? "  <-- CLIPPED under nav" : "")
  );
  await ctx.close();
}
await browser.close();
