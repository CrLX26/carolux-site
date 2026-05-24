import { WHY_US } from "../lib/content";

export default function WhyUs() {
  return (
    <section id="why-us">
      <p>The Carolux Difference</p>
      <h2>Why Carolux</h2>
      {WHY_US.map((item) => (
        <div key={item.roman}>
          <span>{item.roman}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
}
