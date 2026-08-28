import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="navbar-brand">
              <div className="brand-avatar"></div>
              <div className="brand-text">
                <span className="brand-name">KAZ NEXT</span>
                <span className="brand-subtitle text-green">AVAILABLE FOR PROJECTS</span>
              </div>
            </div>
          </div>
          
          <div className="navbar-center desktop-only">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="navbar-right desktop-only">
            <a href="#contact" className="btn-primary nav-cta">Start a Project</a>
          </div>

          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#home" onClick={toggleMenu}>Home</a>
          <a href="#about" onClick={toggleMenu}>About</a>
          <a href="#services" onClick={toggleMenu}>Services</a>
          <a href="#work" onClick={toggleMenu}>Work</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
          <a href="#contact" className="btn-primary mobile-cta" onClick={toggleMenu}>Start a Project</a>
        </div>
      </div>
    </>
  );
}
