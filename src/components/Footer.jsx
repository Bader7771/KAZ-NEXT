import { useEffect, useState } from "react";
import { KAZ_NEXT_SOCIALS } from "../config/socialLinks";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    let timer;
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
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

  const copyEmail = async () => {
    await navigator.clipboard?.writeText("hello@kaznext.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <footer>
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
        </div>
        <div className="footer-links">
          <div>
            <small>EXPLORE</small>
            <a href="#hero">Home</a>
            <a href="#about">Studio</a>
            <a href="#approach">Our Approach</a>
            <a href="#work">Selected Work</a>
            <a href="#testimonials">Trust &amp; Proof</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <small>START A CONVERSATION</small>
            <button onClick={copyEmail}>
              {copied ? "Email copied!" : "Partner With KAZ NEXT"} <span>□</span>
            </button>
            <a href="#contact">Websites &amp; Content ↗</a>
            <a href="#contact">Advertising &amp; Growth ↗</a>
            <a href="#contact">AI &amp; Automation ↗</a>
            <a href={KAZ_NEXT_SOCIALS.instagramUrl}>Instagram ↗</a>
            <a href={KAZ_NEXT_SOCIALS.facebookUrl}>Facebook ↗</a>
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
