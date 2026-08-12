import { Resend } from "resend";

// Server-only route handler. The RESEND_API_KEY never reaches the browser; this
// is the entire security premise of the form (see memory: lead-capture-infra-decision).
// Reuses the same Resend account + verified sender as carolux-tools.
export const runtime = "nodejs";

const TO   = "team@caroluxinsulation.com";
const FROM = "Carolux Insulation <team@caroluxinsulation.com>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-IP throttle. Serverless instances each hold their own Map, so
// this is a soft cap (the honeypot does the heavy lifting against bots); good
// enough for launch, swap to Upstash/KV if abuse shows up.
const HITS = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
function rateLimited(ip) {
  const now = Date.now();
  const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// Escape every user-supplied value before it lands in the email HTML — prevents
// HTML/header injection, the one real contact-form risk.
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
  );
const clip = (s = "", n = 2000) => String(s ?? "").slice(0, n);

function row(label, value) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#6b7a86;font:500 12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;vertical-align:top;white-space:nowrap;">${esc(label)}</td>
    <td style="padding:6px 0;color:#1a2b3c;font:400 15px/1.5 Arial,sans-serif;">${esc(value).replace(/\n/g, "<br>")}</td>
  </tr>`;
}

function shell(kicker, rows) {
  return `<div style="background:#faf8f5;padding:28px;">
    <div style="max-width:560px;margin:0 auto;background:#fefdfb;border:1px solid #e7e3da;border-radius:6px;overflow:hidden;">
      <div style="background:#1a2b3c;padding:18px 24px;">
        <span style="color:#4a90a4;font:600 11px/1 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;">${esc(kicker)}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:8px;margin:8px 0;">
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

// Homeowner auto-reply — an instant, honest confirmation to the LEAD's own inbox so a
// visitor (especially from paid ads) knows the form worked. Brand-safe copy: owner-operated,
// "insured" (never "licensed"), 2-year workmanship guarantee, no exact-$ savings promises.
function autoReplyHtml(name) {
  const hi = name ? `Hi ${esc(name)},` : "Hi there,";
  return `<div style="background:#faf8f5;padding:28px;">
    <div style="max-width:520px;margin:0 auto;background:#fefdfb;border:1px solid #e7e3da;border-radius:6px;overflow:hidden;">
      <div style="background:#1a2b3c;padding:20px 28px;">
        <span style="color:#faf8f5;font:600 18px/1.2 Georgia,serif;letter-spacing:.04em;">Carolux Insulation</span>
      </div>
      <div style="padding:28px;color:#1a2b3c;font:400 15px/1.7 Arial,sans-serif;">
        <p style="margin:0 0 16px;">${hi}</p>
        <p style="margin:0 0 16px;">Thanks for reaching out. We've got your request, and an owner (Tony or Juan) will get back to you personally, usually within a few hours and no later than the next business day, to set up your free in-home assessment.</p>
        <p style="margin:0 0 16px;">Want to talk sooner? Call or text us anytime at <a href="tel:+17042282729" style="color:#4a90a4;text-decoration:none;">(704) 228-2729</a>.</p>
        <p style="margin:0 0 20px;color:#6b7a86;font-size:13px;line-height:1.6;">Owner-operated and fully insured, with a 2-year workmanship guarantee on every job. Serving the greater Charlotte and Gastonia area.</p>
        <p style="margin:0;color:#6b7a86;font-size:13px;">— The Carolux Insulation team</p>
      </div>
    </div>
    <p style="max-width:520px;margin:12px auto 0;color:#a8a29a;font:400 11px/1.5 Arial,sans-serif;text-align:center;">Automated confirmation that we received your request. Just reply to this email to reach us.</p>
  </div>`;
}

export async function POST(req) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "Email service is not configured yet." }, { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "That's a few too many tries. Give it a minute, or just call us." },
      { status: 429 },
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real person never fills the hidden "company" field. Drop silently
  // and report success so the bot learns nothing.
  if (clip(body?.company, 100).trim()) {
    return Response.json({ ok: true });
  }

  const type = body?.type === "estimate" ? "estimate" : "contact";
  let subject, html, replyTo, leadName = "";

  if (type === "estimate") {
    const email = clip(body?.email, 200).trim();
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    replyTo = email;
    subject = `Estimate request: ${email}`;
    html = shell(
      "New estimate request",
      row("Email", email) +
        row("Monthly bill", body?.bill ? `$${clip(body.bill, 20)}/mo` : "") +
        row("Attic now", clip(body?.insulation, 60)) +
        row("Est. savings", clip(body?.estimateRange, 80)),
    );
  } else {
    const name = clip(body?.name, 120).trim();
    const phone = clip(body?.phone, 40).trim();
    if (!name || !phone) {
      return Response.json({ error: "Name and phone are required." }, { status: 400 });
    }
    const maybeEmail = clip(body?.email, 200).trim();
    replyTo = EMAIL_RE.test(maybeEmail) ? maybeEmail : undefined;
    leadName = name;
    subject = `Free estimate request: ${name}`;

    // WI-041: TCPA consent record. Capture the boolean (incl. false), the exact versioned text shown,
    // and server-side proof (timestamp, IP, user-agent, source URL). This email IS the record until a
    // durable private store lands (gated on the WI-014 storage decision). COMPANY.smsEnabled stays
    // false, so nothing is actually texted — this only captures consent ahead of an SMS launch.
    const smsConsent = body?.smsConsent === true;
    const ua = clip(req.headers.get("user-agent") || "", 400);
    const sourceUrl = clip(req.headers.get("referer") || req.headers.get("origin") || "", 300);
    const consentLine = smsConsent
      ? `YES — opted in (${clip(body?.consentVersion, 40) || "unversioned"} · ${clip(body?.consentScope, 60) || "n/a"})`
      : "No — not opted in (do not text)";
    const consentProof = `${new Date().toISOString()} · IP ${ip} · ${sourceUrl || "no-referer"} · ${ua || "no-ua"}`;

    html = shell(
      "New estimate request",
      row("Name", name) +
        row("Phone", phone) +
        row("Address", clip(body?.address, 200)) +
        row("Details", clip(body?.message, 4000)) +
        row("SMS consent", consentLine) +
        (smsConsent ? row("Consent text", clip(body?.consentText, 1000)) : "") +
        row("Consent proof", consentProof),
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      replyTo: replyTo || undefined,
    });
    if (error) {
      return Response.json({ error: "We couldn't send that right now." }, { status: 502 });
    }
    // Homeowner auto-reply — instant confirmation to the lead's own inbox. Best-effort:
    // an auto-reply failure must NOT fail the lead (which already reached team@). Fires
    // whenever we have the lead's email (always for estimate; contact only if provided).
    if (replyTo) {
      try {
        await resend.emails.send({
          from: FROM,
          to: replyTo,
          subject: "We got your request — Carolux Insulation",
          html: autoReplyHtml(leadName),
          replyTo: TO,
        });
      } catch { /* team@ notification already succeeded; ignore */ }
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We couldn't send that right now." }, { status: 500 });
  }
}
