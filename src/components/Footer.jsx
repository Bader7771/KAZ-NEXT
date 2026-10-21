import { useEffect, useState } from "react";

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
        <div className="footer-links">
          <div>
            <small>EXPLORE</small>
            <a href="#hero">Home</a>
            <a href="#how-we-work">Our Approach</a>
            <a href="#work">Selected Work</a>
            <a href="#testimonials">Trust &amp; Proof</a>
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
