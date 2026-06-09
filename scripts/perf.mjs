// Mobile-hero smoothness probe. Emulates iPhone + throttles CPU to surface the
// jank a real phone feels, then A/B-disables each rendering suspect and reports
// dropped frames during a scripted smooth scroll through the whole sequence.
//
//   node scripts/perf.mjs            -> runs all conditions, prints a table
//   THROTTLE=6 node scripts/perf.mjs -> heavier CPU throttle (default 4x)
//
import { chromium, devices } from "playwright";

const url = process.env.URL || "http://localhost:3000";
const throttle = Number(process.env.THROTTLE || 4);

// Each condition is CSS/JS injected before the scroll run to neutralize one suspect.
const CONDS = {
  baseline:   ``,
  noBlendGrain: `[style*="mix-blend-mode"]{mix-blend-mode:normal!important}`,
  noThermalAnim: `.thermal-crossfade{animation:none!important;opacity:0!important}`,
  noReplicaText: `/*replica*/`, // handled in JS
  noVideo:      `/*video*/`,    // handled in JS
};

const browser = await chromium.launch();
const iPhone = devices["iPhone 13"];

async function measure(name, css) {
  const ctx = await browser.newContext({ ...iPhone });
  const page = await ctx.newPage();
  const client = await ctx.newCDPSession(page);
  await client.send("Emulation.setCPUThrottlingRate", { rate: throttle });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  if (css && css.trim() && !css.startsWith("/*")) {
    await page.addStyleTag({ content: css });
  }
  if (name === "noReplicaText") {
    await page.evaluate(() => {
      const el = document.querySelector(".thermal-crossfade");
      if (el) el.style.display = "none";
    });
  }
  if (name === "noVideo") {
    await page.evaluate(() => document.querySelectorAll("video").forEach((v) => { v.pause(); v.style.display = "none"; }));
  }
  await page.waitForTimeout(400);

  const stats = await page.evaluate(async () => {
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
    const vh = window.innerHeight;
    const target = 2.4 * vh;
    const dur = 2600;
    const deltas = [];
    let last = performance.now();
    const start = last;
    await new Promise((resolve) => {
      function frame(now) {
        deltas.push(now - last);
        last = now;
        const t = (now - start) / dur;
        if (t >= 1) return resolve();
        window.scrollTo(0, Math.round(target * t));
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
    deltas.shift(); // drop first (warm-up) frame
    const sorted = [...deltas].sort((a, b) => a - b);
    const p = (q) => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))];
    return {
      frames: deltas.length,
      dropped32: deltas.filter((d) => d > 32).length, // missed 30fps
      bad50: deltas.filter((d) => d > 50).length,      // visible hitch
      median: Math.round(p(0.5) * 10) / 10,
      p95: Math.round(p(0.95) * 10) / 10,
      max: Math.round(Math.max(...deltas) * 10) / 10,
    };
  });
  await ctx.close();
  return stats;
}

console.log(`CPU throttle ${throttle}x | iPhone 13 | scroll 0→2.4vh over 2.6s\n`);
const rows = [];
for (const [name, css] of Object.entries(CONDS)) {
  const s = await measure(name, css);
  rows.push({ cond: name, ...s });
  console.log(
    `${name.padEnd(15)} frames=${String(s.frames).padStart(3)}  dropped>32ms=${String(s.dropped32).padStart(3)}  hitch>50ms=${String(s.bad50).padStart(2)}  median=${String(s.median).padStart(5)}  p95=${String(s.p95).padStart(6)}  max=${String(s.max).padStart(6)}`
  );
}
await browser.close();
console.log("\n(lower dropped/hitch = smoother. Compare each suspect vs baseline.)");
