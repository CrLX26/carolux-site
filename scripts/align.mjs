// Checks that the base (normal) and thermal hero text overlay exactly.
import { chromium, devices } from "playwright";
const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
for (const name of ["iPhone SE", "iPhone 13", "iPhone 14 Pro Max"]) {
  const ctx = await browser.newContext({ ...devices[name] });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const m = await page.evaluate(() => {
    const tops = [...document.querySelectorAll("#home p")]
      .filter((p) => /GREATER CHARLOTTE/i.test(p.textContent))
      .map((p) => Math.round(p.getBoundingClientRect().top));
    return tops;
  });
  const aligned = m.length === 2 && m[0] === m[1];
  console.log(`${name.padEnd(20)} eyebrow tops: ${JSON.stringify(m)}  ${aligned ? "ALIGNED ✓" : "MISALIGNED ✗ (Δ=" + (m[1] - m[0]) + ")"}`);
  await ctx.close();
}
await browser.close();
