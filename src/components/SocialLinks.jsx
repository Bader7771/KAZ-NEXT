import { KAZ_NEXT_SOCIALS } from "../config/socialLinks";

function SocialIcon({ platform }) {
  return (
    <svg className="kaz-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {platform === "Instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      ) : (
        <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-1.5 1.5-1.5H18V2h-3c-3 0-5 2-5 5v2H7v4h3v8" />
      )}
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <div className="kaz-social-links">
      {[
        { name: "Instagram", url: KAZ_NEXT_SOCIALS.instagramUrl },
        { name: "Facebook", url: KAZ_NEXT_SOCIALS.facebookUrl },
      ].map(({ name, url }) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`KAZ NEXT on ${name} (opens in a new tab)`}>
          <SocialIcon platform={name} />
          <span>{name}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
