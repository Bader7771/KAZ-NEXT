import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import ContactButton from "./ContactButton";

const navigationLinks = [
  { label: "Approach", href: "#how-we-work" },
  { label: "Work", href: "#work" },
  { label: "Trust", href: "#testimonials" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const controls = [menuButtonRef.current, ...mobileMenuRef.current.querySelectorAll("a")];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => mobileMenuRef.current?.querySelector("a")?.focus());
    const handleResize = () => { if (window.innerWidth > 980) setIsMenuOpen(false); };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="kaz-navbar-shell">
      <nav
        className={`kaz-navbar${isScrolled ? " is-scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a
          className="kaz-navbar__brand"
          href="#hero"
          aria-label="KAZ NEXT home"
        >
          <img
            className="kaz-navbar__avatar"
            src="/assets/optimized/kaz-logo-96.webp"
            alt=""
            width="96"
            height="96"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="kaz-navbar__brand-copy">
            <span className="kaz-navbar__name-row">
              <span className="kaz-navbar__name">KAZ NEXT</span>
              <span className="kaz-navbar__badge">OPEN</span>
            </span>
            <span className="kaz-navbar__subtitle">
              <span aria-hidden="true">●</span> Accepting new growth projects
            </span>
          </span>
        </a>

        <div className="kaz-navbar__links">
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="kaz-navbar__actions">
          <ContactButton className="kaz-navbar__primary" />
        </div>

        <button
          ref={menuButtonRef}
          className={`kaz-navbar__menu-button${isMenuOpen ? " is-open" : ""}`}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`kaz-navbar__mobile-menu${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="kaz-navbar__mobile-links">
          {navigationLinks.map((link, index) => (
            <a href={link.href} onClick={closeMenu} key={link.label}>
              <span>0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <ContactButton className="kaz-navbar__mobile-cta" onClick={closeMenu} />
        </div>
      </div>
    </header>
  );
}
