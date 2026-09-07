import { useEffect, useRef } from 'react';
import './tokens.css';
import './StoryThread.css';

/**
 * Wrap the three story sections in this so a single hairline thread runs
 * behind all of them — the visual device that ties Problem&Solution,
 * How We Help You Grow, and How We Work into one continuous story
 * instead of three independent blocks.
 *
 * Usage:
 *   <StoryThread>
 *     <ProblemSolution />
 *     <hr className="kz-divider" />
 *     <HowWeHelp />
 *     <hr className="kz-divider" />
 *     <HowWeWork />
 *   </StoryThread>
 */
export default function StoryThread({ children }) {
  const spotlightSectionRef = useRef(null);
  const frameRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = spotlightSectionRef.current;
    if (!section) return undefined;

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (coarsePointer) return undefined;

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const setPosition = (x, y) => {
      section.style.setProperty('--spotlight-x', `${x}px`);
      section.style.setProperty('--spotlight-y', `${y}px`);
      section.style.setProperty(
        '--spotlight-transform',
        `translate3d(calc(${x}px - var(--spotlight-radius)), calc(${y}px - var(--spotlight-radius)), 0)`,
      );
    };

    const stopAnimation = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const reducedMotion = reducedMotionQuery.matches;

      current.x = reducedMotion ? target.x : current.x + (target.x - current.x) * 0.18;
      current.y = reducedMotion ? target.y : current.y + (target.y - current.y) * 0.18;

      setPosition(current.x, current.y);

      if (
        reducedMotion ||
        (Math.abs(target.x - current.x) < 0.1 &&
          Math.abs(target.y - current.y) < 0.1)
      ) {
        current.x = target.x;
        current.y = target.y;
        setPosition(current.x, current.y);
        frameRef.current = null;
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const updateTarget = (event) => {
      const rect = section.getBoundingClientRect();
      targetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (reducedMotionQuery.matches) {
        currentRef.current = targetRef.current;
        setPosition(targetRef.current.x, targetRef.current.y);
        return;
      }

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const handleEnter = (event) => {
      section.classList.add('is-spotlight-active');
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetRef.current = { x, y };
      currentRef.current = { x, y };
      setPosition(x, y);
    };

    const handleLeave = () => {
      section.classList.remove('is-spotlight-active');
      stopAnimation();
    };

    section.addEventListener('pointerenter', handleEnter);
    section.addEventListener('pointermove', updateTarget);
    section.addEventListener('pointerleave', handleLeave);

    return () => {
      section.removeEventListener('pointerenter', handleEnter);
      section.removeEventListener('pointermove', updateTarget);
      section.removeEventListener('pointerleave', handleLeave);
      stopAnimation();
    };
  }, []);

  return (
    <div ref={spotlightSectionRef} className="kz-thread-host spotlight-section shell">
      <div className="spotlight-section__base">
        <div className="kz-thread" aria-hidden="true" />
        {children}
      </div>
      <div className="spotlight-section__reveal" aria-hidden="true" inert="">
        <div className="kz-thread" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
