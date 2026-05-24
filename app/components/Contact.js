"use client";

import { COMPANY } from "../lib/content";

export default function Contact() {
  return (
    <section id="contact">
      <p>Free, No-Obligation</p>
      <h2>Get Your Free Estimate Today</h2>
      <p>
        Call or email us and one of the owners will get back to you within a few
        hours. No call centers, no runaround.
      </p>
      <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
      <a href={COMPANY.emailHref}>{COMPANY.email}</a>
      <p>Serving Charlotte, Gastonia, and surrounding Piedmont communities</p>
    </section>
  );
}
