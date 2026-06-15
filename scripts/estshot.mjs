// Estimator ("Real Cost of an Open Attic") section shots — desktop + mobile.
// Element-level screenshots so Lenis scroll offset doesn't matter.
// Usage: node scripts/estshot.mjs   → writes .shots/est-desktop.png, .shots/est-mobile.png
import { chromium, devices } from "playwright";
import { mkdirSync } from "fs";

const URL = "http://localhost:3000/#estimator";
mkdirSync(".shots", { recursive: true });

async function shot(name, contextOpts, post) {
  const browser = await chromium.launch();
  const context = await browser.newContext(contextOpts);
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  // Reveal-on-view + temp fetch need a beat; bring the section into view.
  const sec = page.locator("#estimator");
  await sec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500); // let Open-Meteo fetch resolve
  // Sweep-scroll through the section so every whileInView Reveal fires (once:true → stays visible).
  const top = await page.evaluate(() => {
    const el = document.getElementById("estimator");
    return el.getBoundingClientRect().top + window.scrollY;
  });
  const h = (await sec.boundingBox())?.height || 1500;
  for (let y = top - 200; y <= top + h + 200; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(180);
  }
  await page.evaluate((t) => window.scrollTo(0, t - 60), top);
  await page.waitForTimeout(800);
  if (post) await post(page);
  await sec.screenshot({ path: `.shots/${name}.png` });
  const box = await sec.boundingBox();
  console.log(name, "->", box && `${Math.round(box.width)}x${Math.round(box.height)}`);
  await browser.close();
}

await shot("est-desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await shot("est-mobile", { ...devices["iPhone 13"] });
console.log("done");
