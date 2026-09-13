import { useEffect, useRef, useState } from "react";
import { KAZ_NEXT_CONTACT } from "../config/contact";
import ContactButton from "./ContactButton";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const copyTimer = useRef(0);

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
      window.clearTimeout(copyTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(KAZ_NEXT_CONTACT.email);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = KAZ_NEXT_CONTACT.emailUrl;
    }
  };

  return (
    <footer className="kaz-footer">
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
      <div className="footer-main shell">
        <div>
          <p>LET'S BUILD A DIGITAL PRESENCE THAT ACTUALLY DRIVES GROWTH.</p>
          <h2>
            <span>Ready to take your business</span>
            <span>
              <em>to the next level?</em>
            </span>
          </h2>
          <ContactButton />
        </div>
        <div className="footer-links">
          <div>
            <small>EXPLORE</small>
            <a href="#hero">Home</a>
            <a href="#about">Studio</a>
            <a href="#how-we-work">Our Approach</a>
            <a href="#work">Selected Work</a>
            <a href="#testimonials">Trust &amp; Proof</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <small>START A CONVERSATION</small>
            <a href={KAZ_NEXT_CONTACT.emailUrl}>{KAZ_NEXT_CONTACT.email}</a>
            <span className="kaz-contact-channels">
              <a href={KAZ_NEXT_CONTACT.phoneUrl}>CALL US</a>
              <a href={KAZ_NEXT_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">WHATSAPP</a>
            </span>
            <button type="button" className="kaz-copy-email" onClick={copyEmail} aria-live="polite">
              {copied ? "Email copied" : "Copy email"}
              <svg className="kaz-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V4H4v12h4" />
              </svg>
            </button>
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© 2026 KAZ NEXT. ALL RIGHTS RESERVED.</span>
        <span>LOCAL TIME / {time}</span>
        <span>YOUR COMPLETE DIGITAL GROWTH PARTNER</span>
      </div>
    </footer>
  );
}
