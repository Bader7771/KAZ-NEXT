import { useEffect, useState } from "react";

export default function useScrollReveal() {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const readyFrame = window.requestAnimationFrame(() => {
      setIsPageReady(true);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return () => window.cancelAnimationFrame(readyFrame);
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach((element) => observer.observe(element));

    const page = document.querySelector(".page-shell");
    let scrollFrame = 0;
    const updateDepth = () => {
      const range = Math.max(window.innerHeight * 0.9, 1);
      const progress = Math.min(Math.max(window.scrollY / range, 0), 1);
      const distance = window.innerWidth <= 768 ? 6 : 14;
      page?.style.setProperty("--hero-lift", `${progress * -distance}px`);
      scrollFrame = 0;
    };
    const handleScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateDepth);
    };

    updateDepth();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(readyFrame);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isPageReady;
}
