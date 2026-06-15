// Verify WI-047 (ToS page) + WI-045 (analytics script) + footer Terms link.
import { chromium, devices } from "playwright";
import { mkdirSync } from "fs";
mkdirSync(".shots", { recursive: true });

const browser = await chromium.launch();

// Desktop ToS — header + first sections
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1600 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/terms-of-service", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: ".shots/tos-desktop.png" });
  // Footer (scroll to bottom) — confirm both legal links
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.locator("footer").screenshot({ path: ".shots/tos-footer.png" });
  // WI-045: did the Vercel Analytics script inject?
  const hasAnalytics = await page.evaluate(() =>
    !!document.querySelector('script[src*="insights"], script[src*="/_vercel/insights"]') ||
    !!window.va || performance.getEntriesByType("resource").some((r) => /insights|_vercel\/insights/.test(r.name))
  );
  const tosText = await page.locator("main").innerText();
  console.log("analytics injected:", hasAnalytics);
  console.log("has §12 LoL:", tosText.includes("Limitation of Liability"));
  console.log("has Gaston venue:", tosText.includes("Gaston County"));
  await ctx.close();
}

// Mobile ToS
{
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/terms-of-service", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: ".shots/tos-mobile.png" });
  await ctx.close();
}

await browser.close();
console.log("done");
