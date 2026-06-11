// FAQ section shots: desktop (default + an opened item) and mobile.
//   node scripts/faqshot.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();

async function run(label, w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1400);
  await page.evaluate(() => document.querySelector("#faq")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `.shots/faq_${label}.png` });
  console.log(`faq_${label} (default) shot`);

  // Open the 3rd question to show an expanded answer + the active teal state.
  const btns = page.locator('#faq button[aria-expanded]');
  if (await btns.count() >= 3) {
    await btns.nth(2).click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `.shots/faq_${label}_open.png` });
    console.log(`faq_${label}_open shot`);
  }
  await ctx.close();
}

await run("desktop", 1280, 900);
await run("mobile", 412, 880);
await browser.close();
console.log("done");
