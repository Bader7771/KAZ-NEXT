import { useEffect, useState } from "react";
import "./Footer.css";

/*
 * ── Contact Configuration ────────────────────────────────────────────────
 *
 *  WHATSAPP_NUMBER  — Verified from the existing WhatsAppContact component.
 *  BUSINESS_EMAIL   — TODO: Replace with actual KAZ NEXT business email.
 *  BUSINESS_PHONE   — TODO: Replace with actual KAZ NEXT phone number (with country code).
 *  SOCIAL_URLS      — TODO: Replace placeholder "#" values with verified profile URLs.
 *                     Remove any platform that KAZ NEXT does not use.
 */

const WHATSAPP_NUMBER = "15167793514";
const BUSINESS_EMAIL = "contact@kaznext.com"; // TODO: Confirm actual email
const BUSINESS_PHONE = "+1 (516) 779-3514"; // TODO: Confirm actual phone
const BUSINESS_PHONE_TEL = "tel:+15167793514"; // TODO: Confirm actual phone

const SOCIAL_URLS = {
  instagram: "#", // TODO: Replace with real Instagram URL
  facebook: "#", // TODO: Replace with real Facebook URL
  linkedin: "#", // TODO: Replace with real LinkedIn URL
};

/* ── SVG Icons ──────────────────────────────────────────────────────────── */

function IconMail() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.44 0 .07 5.37.07 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.96 11.96 0 0 0 5.83 1.49h.01C18.63 23.86 24 18.49 24 11.89c0-3.2-1.24-6.2-3.48-8.41ZM12.04 21.84a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.59-.24-.37a9.88 9.88 0 0 1-1.52-5.29c0-5.48 4.46-9.94 9.95-9.94a9.87 9.87 0 0 1 7.03 2.91 9.87 9.87 0 0 1 2.91 7.04c0 5.48-4.46 9.86-10.02 9.86Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconArrowUp() {
  return (
    <svg className="ft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    let timer;
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Casablanca",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(formatter.format(new Date()));
    const start = () => {
      tick();
      timer = window.setInterval(tick, 1000);
    };
    const stop = () => window.clearInterval(timer);
    const onVisibilityChange = () => {
      stop();
      if (!document.hidden) start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="kaz-footer">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="footer-top shell">
        <div className="status dark">
          <i /> AVAILABLE FOR NEW BUSINESS PARTNERSHIPS
        </div>
        <div className="coordinates">
          YOUR BUSINESS
          <br />
          <span>OUR DIGITAL EXPERTISE</span>
        </div>
      </div>

      {/* ── Main columns ─────────────────────────────────────────────────── */}
      <div className="ft-columns shell">
        {/* Col 1 — Brand */}
        <div className="ft-col ft-col--brand">
          <div className="ft-brand-row">
            <img
              className="ft-logo"
              src="/assets/optimized/kaz-logo-96.webp"
              alt=""
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
            />
            <span className="ft-brand-name">KAZ NEXT</span>
          </div>
          <p className="ft-desc">
            KAZ NEXT is a digital solutions company helping businesses grow
            through modern web development, intelligent AI solutions, and
            business automation.
          </p>
          <a
            className="ft-website"
            href="https://kaznext.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGlobe />
            kaznext.com
          </a>

          {/* Social icons */}
          <div className="ft-socials">
            <a href={SOCIAL_URLS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href={SOCIAL_URLS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href={SOCIAL_URLS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <IconLinkedIn />
            </a>
          </div>
        </div>

        {/* Col 2 — Quick Navigation */}
        <div className="ft-col">
          <h4 className="ft-heading">Navigate</h4>
          <nav className="ft-links" aria-label="Footer navigation">
            <a href="#hero">Home</a>
            <a href="#how-we-help">About Us</a>
            <a href="#how-we-help">Our Services</a>
            <a href="#work">Our Projects</a>
            <a href="#inquiry">Contact Us</a>
          </nav>
        </div>

        {/* Col 3 — Services */}
        <div className="ft-col">
          <h4 className="ft-heading">Services</h4>
          <nav className="ft-links" aria-label="Services">
            <a href="#how-we-help">Web Development</a>
            <a href="#how-we-help">AI Solutions</a>
            <a href="#how-we-help">Business Automation</a>
            <a href="#how-we-help">UI/UX Design</a>
            <a href="#how-we-help">E-commerce Development</a>
            <a href="#how-we-help">Custom Software</a>
          </nav>
        </div>

        {/* Col 4 — Contact */}
        <div className="ft-col">
          <h4 className="ft-heading">Contact</h4>
          <div className="ft-contact-list">
            <a className="ft-contact-item" href={`mailto:${BUSINESS_EMAIL}`}>
              <IconMail />
              <span>{BUSINESS_EMAIL}</span>
            </a>
            <a className="ft-contact-item" href={BUSINESS_PHONE_TEL}>
              <IconPhone />
              <span>{BUSINESS_PHONE}</span>
            </a>
            <a
              className="ft-contact-item"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="ft-bottom shell">
        <div className="ft-bottom-left">
          <span>© {currentYear} KAZ NEXT. All rights reserved.</span>
          <span className="ft-time">LOCAL TIME / {time}</span>
        </div>
        <button
          type="button"
          className="ft-back-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <IconArrowUp />
          Back to top
        </button>
      </div>
    </footer>
  );
}
