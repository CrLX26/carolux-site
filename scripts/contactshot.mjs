// Verify WI-041 (consent checkbox) + WI-059 (FTC disclaimer live).
import { chromium, devices } from "playwright";
import { mkdirSync } from "fs";
mkdirSync(".shots", { recursive: true });

async function sweepTo(page, id) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const top = await page.evaluate((i) => {
    const el = document.getElementById(i);
    return el.getBoundingClientRect().top + window.scrollY;
  }, id);
  const h = (await page.locator(`#${id}`).boundingBox())?.height || 1200;
  for (let y = top - 200; y <= top + h + 200; y += 350) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate((t) => window.scrollTo(0, t - 40), top);
  await page.waitForTimeout(600);
}

const browser = await chromium.launch();

// Desktop
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await sweepTo(page, "contact");
  await page.locator("#contact").screenshot({ path: ".shots/contact-desktop.png" });

  const checks = await page.evaluate(() => {
    const FTC = "fact sheet on R-values. Higher R-values mean greater insulating power";
    const est = document.getElementById("estimator")?.innerText || "";
    const contact = document.getElementById("contact")?.innerText || "";
    const cb = document.getElementById("lead-sms-consent");
    return {
      estimatorHasFTC: est.includes(FTC),
      contactHasCheckbox: !!cb,
      checkboxUncheckedByDefault: cb ? cb.checked === false : null,
      consentMentionsNotACondition: contact.includes("Consent is not a condition of any purchase"),
      consentMentionsSTOP: contact.includes("Reply STOP to opt out"),
    };
  });
  console.log(JSON.stringify(checks, null, 2));
  await ctx.close();
}

// Mobile
{
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await sweepTo(page, "contact");
  await page.locator("#contact").screenshot({ path: ".shots/contact-mobile.png" });
  await ctx.close();
}

await browser.close();
console.log("done");
