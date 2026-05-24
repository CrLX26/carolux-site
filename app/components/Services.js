import { SERVICES } from "../lib/content";

export default function Services() {
  return (
    <section id="services">
      <p>What We Do</p>
      <h2>Our Services</h2>
      {SERVICES.map((service) => (
        <div key={service.number}>
          <span>{service.number}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <a href="#contact">{service.cta}</a>
        </div>
      ))}
    </section>
  );
}
