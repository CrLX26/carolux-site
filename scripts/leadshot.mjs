// Lead-form UI state shots. Mocks /api/lead (NO real emails) so we can capture
// loading / success / error / validation states for the Estimator + Contact forms.
//   node scripts/leadshot.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync(".shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

// Default mock: succeed after a short delay so the busy state is observable.
let mode = "ok";
await page.route("**/api/lead", async (route) => {
  await new Promise((r) => setTimeout(r, 700));
  if (mode === "fail") return route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "We couldn't send that right now." }) });
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
});

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);

async function show(sel) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "center" }), sel);
  await page.waitForTimeout(500);
}
const shot = (n) => page.screenshot({ path: `.shots/lead_${n}.png` });

// ── Estimator: validation (bad email, client-side, no network) ──
await show("#estimator");
await page.fill("#est-bill", "240");
await page.fill("#est-email", "not-an-email");
await page.click('#estimator form button[type=submit]');
await page.waitForTimeout(300);
await shot("est_invalid");
console.log("est_invalid shot");

// ── Estimator: busy then success ──
await page.fill("#est-email", "homeowner@example.com");
await page.click('#estimator form button[type=submit]');
await page.waitForTimeout(300); await shot("est_busy"); console.log("est_busy shot");
await page.waitForTimeout(900); await shot("est_success"); console.log("est_success shot");

// ── Contact: required validation ──
await show("#contact");
await page.click('#contact form button[type=submit]');
await page.waitForTimeout(300);
await shot("contact_invalid");
console.log("contact_invalid shot");

// ── Contact: error state (mock 500) ──
mode = "fail";
await page.fill("#lead-name", "Jane Homeowner");
await page.fill("#lead-phone", "704-555-0142");
await page.click('#contact form button[type=submit]');
await page.waitForTimeout(1100); await shot("contact_error"); console.log("contact_error shot");

// ── Contact: success (mock 200) ──
mode = "ok";
await page.click('#contact form button[type=submit]');
await page.waitForTimeout(300); await shot("contact_busy"); console.log("contact_busy shot");
await page.waitForTimeout(900); await shot("contact_success"); console.log("contact_success shot");

await browser.close();
console.log("done");
