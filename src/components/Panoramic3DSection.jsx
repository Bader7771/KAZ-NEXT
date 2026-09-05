import { useEffect, useRef, useState } from "react";
import "../Panoramic3D.css";
import "../PanoramaRefine.css";

const galleryItems = [
  {
    type: "image",
    asset: "greek-statue",
    width: 1024,
    height: 1536,
    alt: "Greek marble bust with floating interface panels",
    className: "gallery-cutout gallery-statue",
  },
  {
    type: "image",
    asset: "monalisa-gold-frame",
    width: 1024,
    height: 1536,
    alt: "Mona Lisa in an ornate gold frame",
    className: "gallery-cutout gallery-portrait",
  },
  {
    type: "image",
    asset: "venus-statue",
    width: 1024,
    height: 1536,
    alt: "Draped Hellenistic marble muse",
    className: "gallery-cutout gallery-venus",
  },
  {
    type: "image",
    asset: "vintage-oil-painting",
    width: 1536,
    height: 1024,
    alt: "Framed Renaissance landscape",
    className: "gallery-cutout gallery-landscape",
  },
  {
    type: "image",
    asset: "calligraphy-swash",
    width: 1024,
    height: 1536,
    alt: "Flourished calligraphic monogram",
    className: "gallery-cutout gallery-swash",
  },
  {
    type: "image",
    asset: "baroque-frame",
    width: 1024,
    height: 1536,
    alt: "Dutch Master portrait in a baroque frame",
    className: "gallery-cutout gallery-baroque",
  },
  {
    type: "image",
    asset: "statue-modern",
    width: 1024,
    height: 1536,
    alt: "Surreal marble bust with modern interface fragments",
    className: "gallery-cutout gallery-modern",
  },
  {
    type: "image",
    asset: "emerald-card",
    width: 1024,
    height: 1536,
    alt: "Emerald acrylic specimen card",
    className: "gallery-cutout gallery-emerald",
  },
  {
    type: "poster",
    content: "GET NOTICED · BUILD TRUST · ATTRACT CUSTOMERS",
    className: "gallery-poster",
  },
  {
    type: "poster",
    content: "TURNING ATTENTION INTO REVENUE",
    className: "gallery-poster light",
  },
  {
    type: "image",
    asset: "winged-statue",
    width: 1024,
    height: 1536,
    alt: "Winged Victory marble statue",
    className: "gallery-cutout gallery-winged",
  },
  {
    type: "image",
    asset: "botanical-glass",
    width: 1024,
    height: 1536,
    alt: "Pressed gold botanical specimen on glass",
    className: "gallery-cutout gallery-botanical",
  },
];

function GalleryImage({ item, onPointerEnter, onPointerLeave }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const base = `/assets/optimized/${item.asset}`;

  return (
    <article
      className={`gallery-art gallery-image-shell ${item.className}${isLoaded ? " is-loaded" : ""}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <picture>
        <source
          type="image/webp"
          srcSet={`${base}-320.webp 320w, ${base}-640.webp 640w`}
          sizes="(max-width: 768px) 240px, 330px"
        />
        <img
          src={`${base}-640.webp`}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
          draggable="false"
          onLoad={() => setIsLoaded(true)}
        />
      </picture>
    </article>
  );
}

export default function Panoramic3DSection() {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(0);
  const cameraZ = useRef(-950);
  const rotation = useRef(0);
  const dragging = useRef(false);
  const hoveredCard = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  const updateTransform = () => {
    if (ringRef.current) {
      ringRef.current.style.transform = `translateZ(${cameraZ.current}px) rotateY(${rotation.current}deg)`;
    }
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const onWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      cameraZ.current = Math.min(
        200,
        Math.max(-2200, cameraZ.current - event.deltaY * 1.2),
      );
      updateTransform();
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let isVisible = false;
    let previousTime = 0;

    const stop = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      previousTime = 0;
      element.classList.remove("is-active");
    };

    const tick = (time) => {
      if (!isVisible || document.hidden) {
        stop();
        return;
      }

      const frameScale = previousTime
        ? Math.min((time - previousTime) / 16.67, 2)
        : 1;
      previousTime = time;

      if (!dragging.current) {
        velocity.current *= 0.92;
        const autoSpeed = hoveredCard.current ? -0.08 : -0.2;
        rotation.current += (velocity.current + autoSpeed) * frameScale;
        updateTransform();
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion || frameRef.current || document.hidden || !isVisible) {
        return;
      }
      element.classList.add("is-active");
      frameRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { rootMargin: "160px 0px" },
    );

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    observer.observe(element);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const pointerDown = (event) => {
    dragging.current = true;
    lastX.current = event.clientX;
    velocity.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!dragging.current) return;
    const delta = event.clientX - lastX.current;
    lastX.current = event.clientX;
    velocity.current = delta * 0.34;
    rotation.current += velocity.current;
    updateTransform();
  };

  const pointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="panorama-section">
      <h2>
        GET NOTICED · BUILD TRUST · ATTRACT CUSTOMERS · SCALE YOUR BUSINESS
      </h2>
      <div
        ref={containerRef}
        className="panorama-frame"
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        onPointerLeave={pointerUp}
      >
        <span className="hint top-left">Drag to explore</span>
        <span className="hint top-right">Scroll to look closer</span>
        <span className="hint bottom-left">Explore the full 360° view</span>
        <span className="hint bottom-right">
          Keep scrolling to discover more
        </span>
        <div
          ref={ringRef}
          className="gallery-ring"
          style={{ transform: "translateZ(-950px) rotateY(0deg)" }}
        >
          {galleryItems.map((item, index) => (
            <div
              className="gallery-position"
              style={{
                transform: `rotateY(${index * (360 / galleryItems.length)}deg) translateZ(1300px)`,
              }}
              key={`${item.type}-${item.asset || index}`}
            >
              {item.type === "image" ? (
                <GalleryImage
                  item={item}
                  onPointerEnter={() => {
                    hoveredCard.current = true;
                  }}
                  onPointerLeave={() => {
                    hoveredCard.current = false;
                  }}
                />
              ) : (
                <article className={`gallery-art ${item.className}`}>
                  <p>{item.content}</p>
                  <small>YOUR COMPLETE DIGITAL GROWTH PARTNER</small>
                </article>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="panorama-subtitle">
        MODERN WEBSITES · IMPACTFUL VIDEO · TARGETED ADS · AI AUTOMATION
      </p>
    </section>
  );
}
