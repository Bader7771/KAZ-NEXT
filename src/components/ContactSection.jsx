import ContactButton from "./ContactButton";
import { KAZ_NEXT_CONTACT } from "../config/contact";

export default function ContactSection() {
  return (
    <section id="contact" className="kaz-contact shell" aria-labelledby="contact-title">
      <div>
        <p className="kaz-eyebrow">LET'S TALK</p>
        <h2 id="contact-title" className="kaz-section-title">What&apos;s next for your business?</h2>
        <p className="kaz-contact__body">Tell us what you have in mind. We&apos;ll help you find a clear next step.</p>
      </div>
      <div className="kaz-contact__actions">
        <ContactButton href={KAZ_NEXT_CONTACT.emailUrl} />
        <a className="kaz-contact__email" href={KAZ_NEXT_CONTACT.emailUrl}>{KAZ_NEXT_CONTACT.email}</a>
        <div className="kaz-contact-channels">
          <a className="kaz-phone-link" href={KAZ_NEXT_CONTACT.phoneUrl}>
          <svg className="kaz-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m7 3 3 4-2 3c2 3 3 4 6 6l3-2 4 3c0 3-2 4-4 4C10 20 4 14 3 7c0-2 1-4 4-4Z" />
          </svg>
            CALL US
          </a>
          <a className="kaz-phone-link" href={KAZ_NEXT_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
            WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
