import { useEffect, useState } from "react";
import "./Navbar.css";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function ArrowRight() {
  return (
    <svg className="kaz-navbar__arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
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
          href="#home"
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
          <a className="kaz-navbar__secondary" href="#contact">
            Partner
          </a>
          <a className="kaz-navbar__primary" href="mailto:hello@kaznext.com">
            <span>Request Availability</span>
            <ArrowRight />
          </a>
        </div>

        <button
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
        id="mobile-navigation"
        className={`kaz-navbar__mobile-menu${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="kaz-navbar__mobile-links">
          {navigationLinks.map((link, index) => (
            <a href={link.href} onClick={closeMenu} key={link.label}>
              <span>0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <a
            className="kaz-navbar__mobile-cta"
            href="mailto:hello@kaznext.com"
            onClick={closeMenu}
          >
            Request Availability
            <ArrowRight />
          </a>
        </div>
      </div>
    </header>
  );
}
