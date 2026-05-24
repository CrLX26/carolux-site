import { PACKAGES } from "../lib/content";

export default function Packages() {
  return (
    <section id="packages">
      <p>What We Offer</p>
      <h2>Service Packages</h2>
      {PACKAGES.map((pkg) => (
        <div key={pkg.name}>
          {pkg.featured && <span>Most Popular</span>}
          <h3>{pkg.name}</h3>
          <p>{pkg.tagline}</p>
          <ul>
            {pkg.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a href="#contact">{pkg.cta}</a>
        </div>
      ))}
    </section>
  );
}
