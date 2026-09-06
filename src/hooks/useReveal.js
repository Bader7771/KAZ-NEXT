import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once when it scrolls into view, then stops observing.
 * Usage:
 *   const [ref, visible] = useReveal();
 *   <div ref={ref} className={`kz-reveal ${visible ? 'is-visible' : ''}`}>
 */
export function useReveal(options = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target);
        }
      });
    }, options);

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}
