// Verify WI-011 Edit 1 (Service Providers section) + WI-048 (skip link + #main).
import { chromium } from "playwright";
import { mkdirSync } from "fs";
mkdirSync(".shots", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

// --- Privacy policy: Service Providers section ---
await page.goto("http://localhost:3000/privacy-policy", { waitUntil: "networkidle" });
const pol = await page.locator("main").innerText();
const priv = {
  hasServiceProviders: pol.includes("Service Providers"),
  hasCarveOut: pol.includes('not "external organizations"'),
  hasAnthropic: pol.includes("Anthropic"),
  hasVercelSignwell: pol.includes("Vercel") && pol.includes("SignWell") && pol.includes("Pipedrive") && pol.includes("Wave"),
  lastUpdatedJun30: pol.includes("June 30, 2026"),
  // carrier block still intact + verbatim
  carrierBlockIntact: pol.includes("We do not transfer consumer data to external organizations under any circumstances"),
};
// screenshot the Service Providers section
const sp = page.getByRole("heading", { name: "Service Providers" });
await sp.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: ".shots/privacy-serviceproviders.png" });

// --- Homepage: skip link + #main ---
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const hasMain = await page.locator("#main").count();
const hasSkip = await page.locator("a.skip-link").count();
// focus the skip link (first Tab) and screenshot it visible
await page.keyboard.press("Tab");
await page.waitForTimeout(200);
const skipBox = await page.locator("a.skip-link").boundingBox();
const skipVisibleOnFocus = skipBox ? skipBox.x >= 0 && skipBox.x < 300 : false;
await page.screenshot({ path: ".shots/skiplink-focused.png", clip: { x: 0, y: 0, width: 420, height: 120 } });

console.log("PRIVACY:", JSON.stringify(priv, null, 2));
console.log("A11Y:", JSON.stringify({ hasMain, hasSkip, skipVisibleOnFocus }, null, 2));
await browser.close();
console.log("done");
