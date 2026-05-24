import { REVIEWS } from "../lib/content";

export default function Reviews() {
  return (
    <section id="reviews">
      <p>Customer Reviews</p>
      <h2>What Neighbors Say</h2>
      {REVIEWS.map((review) => (
        <div key={review.name}>
          <p>"{review.text}"</p>
          <span>{review.name}</span>
          <span>{review.location}</span>
        </div>
      ))}
    </section>
  );
}
