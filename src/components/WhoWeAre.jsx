import { useEffect, useRef, useState } from "react";
import { KAZ_NEXT_SOCIALS } from "../config/socialLinks";
import "./WhoWeAre.css";

const moments = [
  {
    src: "/assets/optimized/kaz-badr-01.webp",
    alt: "Badr Eddine in conversation with people at an outdoor event",
    note: "In conversation · 01",
  },
  {
    src: "/assets/optimized/kaz-badr-02.webp",
    alt: "A KAZ NEXT working session with sketches and a laptop",
    note: "Behind the work · 02",
  },
  {
    src: "/assets/optimized/kaz-badr-03.webp",
    alt: "Badr Eddine walking through a contemporary gallery",
    note: "Looking closer · 03",
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function WhoWeAre() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [isReordering, setIsReordering] = useState(false);
  const isReorderingRef = useRef(false);
  const frontPhotoRef = useRef(null);
  const gestureRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
  });
  const frameRef = useRef(0);
  const reorderTimerRef = useRef(0);

  useEffect(
    () => () => {
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(reorderTimerRef.current);
    },
    [],
  );

  const paintDrag = () => {
    const photo = frontPhotoRef.current;
    if (!photo) return;

    const { x, y } = gestureRef.current;
    photo.style.setProperty("--drag-x", `${x}px`);
    photo.style.setProperty("--drag-y", `${y}px`);
    photo.style.setProperty("--drag-rotate", `${-1 + x / 70}deg`);
    frameRef.current = 0;
  };

  const requestPaint = () => {
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(paintDrag);
    }
  };

  const reorderStack = () => {
    const photo = frontPhotoRef.current;
    if (!photo || isReorderingRef.current) return;

    const { x, y } = gestureRef.current;
    const direction = Math.abs(x) > 8 ? Math.sign(x) : order[0] % 2 ? -1 : 1;
    const throwX = clamp(x * 1.15 + direction * 92, -180, 180);
    const throwY = clamp(y * 0.65 - 18, -105, 86);

    photo.classList.remove("is-dragging");
    photo.style.setProperty("--throw-x", `${throwX}px`);
    photo.style.setProperty("--throw-y", `${throwY}px`);
    photo.style.setProperty("--throw-rotate", `${direction * 7}deg`);
    isReorderingRef.current = true;
    setIsReordering(true);

    reorderTimerRef.current = window.setTimeout(() => {
      setOrder((currentOrder) => [
        currentOrder[1],
        currentOrder[2],
        currentOrder[0],
      ]);
      isReorderingRef.current = false;
      setIsReordering(false);
      photo.style.removeProperty("--drag-x");
      photo.style.removeProperty("--drag-y");
      photo.style.removeProperty("--drag-rotate");
      photo.style.removeProperty("--throw-x");
      photo.style.removeProperty("--throw-y");
      photo.style.removeProperty("--throw-rotate");
      gestureRef.current.x = 0;
      gestureRef.current.y = 0;
    }, 390);
  };

  const handlePointerDown = (event) => {
    if (
      isReorderingRef.current ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    gestureRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: 0,
      y: 0,
    };
    event.currentTarget.classList.add("is-dragging");
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const gesture = gestureRef.current;
    if (!gesture.active || gesture.pointerId !== event.pointerId) return;

    const stage = event.currentTarget.parentElement;
    const horizontalLimit = Math.min(128, (stage?.clientWidth || 420) * 0.28);
    const verticalLimit = Math.min(104, (stage?.clientHeight || 520) * 0.2);
    gesture.x = clamp(event.clientX - gesture.startX, -horizontalLimit, horizontalLimit);
    gesture.y = clamp(event.clientY - gesture.startY, -verticalLimit, verticalLimit);
    requestPaint();
  };

  const finishPointer = (event, shouldReorder = true) => {
    const gesture = gestureRef.current;
    if (!gesture.active || gesture.pointerId !== event.pointerId) return;

    gesture.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (shouldReorder) {
      reorderStack();
    } else {
      event.currentTarget.classList.remove("is-dragging");
      gesture.x = 0;
      gesture.y = 0;
      requestPaint();
    }
  };

  const handleKeyDown = (event) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      !event.repeat &&
      !isReorderingRef.current
    ) {
      event.preventDefault();
      gestureRef.current.x = 0;
      gestureRef.current.y = 0;
      reorderStack();
    }
  };

  const activeMoment = moments[order[0]];

  return (
    <section
      id="about"
      className="who-section shell reveal-on-scroll reveal-about"
      aria-labelledby="who-title"
    >
      <p className="who-label">01 · Behind KAZ NEXT</p>

      <h2 id="who-title" className="who-title">
        The people behind <em>what&apos;s next.</em>
      </h2>

      <div className="who-story">
        <p>
          KAZ NEXT began with a simple belief: digital work should make sense
          to the business it serves.
        </p>
        <p>
          We listen before we prescribe. Then we bring websites, digital
          experiences, AI, automation, and creative thinking together around
          one useful outcome—helping a business move forward with clarity.
        </p>
      </div>

      <figure className="who-portrait">
        <div
          className={`who-stack${isReordering ? " is-reordering" : ""}`}
          aria-label="Three photographs from the KAZ NEXT journey"
        >
          <span className="who-stack__marker who-stack__marker--left" aria-hidden="true">
            REAL PEOPLE
          </span>
          <span className="who-stack__marker who-stack__marker--right" aria-hidden="true">
            DRAG TO DISCOVER
          </span>

          {order.map((momentIndex, position) => {
            const moment = moments[momentIndex];
            const positionClass = ["is-front", "is-middle", "is-back"][position];

            return (
              <button
                ref={position === 0 ? frontPhotoRef : undefined}
                className={`who-photo ${positionClass}`}
                type="button"
                tabIndex={position === 0 ? 0 : -1}
                aria-hidden={position === 0 ? undefined : true}
                aria-label={
                  position === 0
                    ? `Current photograph: ${moment.alt}. Drag or press Enter to see the next moment.`
                    : undefined
                }
                onPointerDown={position === 0 ? handlePointerDown : undefined}
                onPointerMove={position === 0 ? handlePointerMove : undefined}
                onPointerUp={
                  position === 0 ? (event) => finishPointer(event, true) : undefined
                }
                onPointerCancel={
                  position === 0 ? (event) => finishPointer(event, false) : undefined
                }
                onKeyDown={position === 0 ? handleKeyDown : undefined}
                key={moment.src}
              >
                <img
                  src={moment.src}
                  alt={position === 0 ? moment.alt : ""}
                  width="1122"
                  height="1402"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </button>
            );
          })}
        </div>

        <figcaption className="who-caption" aria-live="polite">
          <span>
            <strong>MR. BADR EDDINE</strong>
            <small>The human behind the ideas.</small>
          </span>
          <span className="who-caption__moment">{activeMoment.note}</span>
        </figcaption>
      </figure>

      <aside className="who-trust">
        <span>Trust note</span>
        <h3>Trust is part of the work.</h3>
        <p>
          No fog of technical language. No promises made for effect. Just clear
          communication, thoughtful decisions, and work built to stay useful.
        </p>
      </aside>

      <div className="who-approach">
        <div className="who-approach__intro">
          <span>How we think</span>
          <h3>Understanding comes first.</h3>
        </div>

        <ol className="who-process" aria-label="The KAZ NEXT process">
          {["Listen", "Make sense", "Build", "Evolve"].map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
              {index < 3 && <i aria-hidden="true">→</i>}
            </li>
          ))}
        </ol>

        <p className="who-approach__note">
          Technology moves quickly. Trust is slower, earned one clear decision
          at a time. That is why we understand the business before we build for
          it.
        </p>

        <div className="who-team-note">
          <span>Real people · Real work</span>
          <p>
            We are a small, hands-on team—building, learning, and staying close
            to every project we take on.
          </p>
        </div>

        <div className="who-socials" id="instagram">
          <span>Follow the journey</span>
          <div>
            <a href={KAZ_NEXT_SOCIALS.instagramUrl} aria-label="KAZ NEXT on Instagram">
              Instagram <i aria-hidden="true">↗</i>
            </a>
            <a
              id="facebook"
              href={KAZ_NEXT_SOCIALS.facebookUrl}
              aria-label="KAZ NEXT on Facebook"
            >
              Facebook <i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
