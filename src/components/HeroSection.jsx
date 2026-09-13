import { useEffect, useRef, useState } from "react";
import "./HeroSection.css";
import ContactButton from "./ContactButton";

const NEXT_WORDS = ["NEXT.", "WEB.", "AI.", "SMART.", "NEXT."];

export default function HeroSection() {
  const [nextWord, setNextWord] = useState("NEXT.");
  const timersRef = useRef([]);

  const clearWordTimers = () => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
  };

  const playWordSequence = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearWordTimers();
    NEXT_WORDS.slice(1).forEach((word, index) => {
      const timer = window.setTimeout(() => setNextWord(word), 150 * (index + 1));
      timersRef.current.push(timer);
    });
  };

  const resetWord = () => {
    clearWordTimers();
    setNextWord("NEXT.");
  };

  useEffect(() => clearWordTimers, []);

  return (
    <section id="hero" className="kaz-hero" aria-labelledby="kaz-hero-title">
      <div className="kaz-hero__inner shell">
        <p className="kaz-hero__eyebrow">KAZ NEXT — DIGITAL SOLUTIONS</p>

        <h1 id="kaz-hero-title" className="kaz-hero__title">
          <span className="kaz-hero__title-line">
            <span className="kaz-hero__word-mask">
              <span className="kaz-hero__word kaz-hero__word--build">BUILD</span>
            </span>{" "}
            <span className="kaz-hero__word-mask">
              <span className="kaz-hero__word kaz-hero__word--whats">WHAT&apos;S</span>
            </span>
          </span>
          <span className="kaz-hero__title-line">
            <span className="kaz-hero__word-mask">
              <button
                className="kaz-hero__next kaz-hero__word kaz-hero__word--next"
                type="button"
                aria-label="NEXT."
                onPointerEnter={playWordSequence}
                onPointerLeave={resetWord}
                onFocus={playWordSequence}
                onBlur={resetWord}
              >
                <span key={nextWord} className="kaz-hero__next-current" aria-hidden="true">
                  {nextWord}
                </span>
              </button>
            </span>
          </span>
        </h1>

        <div className="kaz-hero__lower">
          <p className="kaz-hero__subtitle">
            We create digital experiences, websites and smart solutions designed
            to help your business grow.
          </p>

          <div className="kaz-hero__actions" aria-label="Hero actions">
            <ContactButton className="kaz-hero__primary" />
            <a className="kaz-hero__secondary kaz-button kaz-button--secondary" href="#problem-solution">
              <span className="kaz-hero__secondary-label">DISCOVER KAZ NEXT</span>
              <span className="kaz-hero__secondary-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="kaz-hero__footer" aria-hidden="true">
          <span>KAZ NEXT / 01</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
}
