import { COMPANY, NAV_LINKS } from "../lib/content";

export default function Footer() {
  return (
    <footer>
      <span>{COMPANY.name}</span>
      <p>
        Owner-operated insulation for Charlotte-area homeowners.{" "}
        {COMPANY.owners} on every job.
      </p>
      <address>
        {COMPANY.address.street}
        <br />
        {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
      </address>
      <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
      <a href={COMPANY.emailHref}>{COMPANY.email}</a>
      <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      <p>&copy; {COMPANY.year} Carolux Insulation LLC. All rights reserved.</p>
    </footer>
  );
}
