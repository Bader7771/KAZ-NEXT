import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useScrollReveal from "./hooks/useScrollReveal";
import Navbar from "./components/Navbar";
import WhoWeAre from "./components/WhoWeAre";
import "./App.css";
import "./FlankRail.css";
import "./Gameboy.css";
import "./motion.css";
import StoryThread from "./components/StoryThread";
import ProblemSolution from "./components/ProblemSolution";
import HowWeHelp from "./components/HowWeHelp";
import HowWeWork from "./components/HowWeWork";

const Panoramic3DSection = lazy(
  () => import("./components/Panoramic3DSection"),
);
const Footer = lazy(() => import("./components/Footer"));

const projects = [
  {
    id: 0,
    title: "ATLAS ESTATES",
    index: "#0",
    badge: "ATLAS ESTATES",
    badgeClass: "chota",
    previewAsset: "projects/atlas-estates",
    imageWidth: 1536,
    imageHeight: 1024,
    tagline:
      "Helping buyers discover modern apartments, luxury villas, and high-value properties through a clear, trusted digital experience.",
    caseStudyUrl: "#work",
    liveUrl: "#work",
  },
  {
    id: 1,
    title: "LUMINA DENTAL",
    index: "#1",
    badge: "LUMINA DENTAL",
    badgeClass: "respos",
    previewAsset: "projects/lumina-dental",
    imageWidth: 1536,
    imageHeight: 1024,
    tagline:
      "A welcoming digital presence that helps patients explore dental care, understand treatment options, and book with confidence.",
    caseStudyUrl: "#work",
    liveUrl: "#work",
  },
  {
    id: 2,
    title: "HARRIS & CO.",
    index: "#2",
    badge: "HARRIS & CO.",
    badgeClass: "insta",
    previewAsset: "projects/harris-and-co",
    imageWidth: 1536,
    imageHeight: 1024,
    tagline:
      "A refined online presence for a modern legal practice, making business counsel and consultations clear and approachable.",
    caseStudyUrl: "#work",
    liveUrl: "#work",
  },
  {
    id: 3,
    title: "SORA TABLE",
    index: "#3",
    badge: "SORA TABLE",
    badgeClass: "delight",
    previewAsset: "projects/sora-table",
    imageWidth: 1536,
    imageHeight: 1024,
    tagline:
      "A warm digital experience that showcases contemporary dining and turns interest into reservations and memorable visits.",
    caseStudyUrl: "#work",
    liveUrl: "#work",
  },
  {
    id: 4,
    title: "PULSE STUDIO",
    index: "#4",
    badge: "PULSE STUDIO",
    badgeClass: "aai",
    previewAsset: "projects/pulse-studio",
    imageWidth: 1536,
    imageHeight: 1024,
    tagline:
      "A bold digital presence connecting members with personal training, strength programs, and a healthier daily routine.",
    caseStudyUrl: "#work",
    liveUrl: "#work",
  },
];

function DeferredContent({ children, className, id }) {
  const [shouldRender, setShouldRender] = useState(
    () => !("IntersectionObserver" in window),
  );
  const placeholderRef = useRef(null);

  useEffect(() => {
    const element = placeholderRef.current;
    if (!element || shouldRender) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={placeholderRef} className={className} id={id}>
      {shouldRender ? children : null}
    </div>
  );
}


export default function App() {
  const isMotionReady = useScrollReveal();
  const [current, setCurrent] = useState(0),
    [direction, setDirection] = useState(1),
    [ingesting, setIngesting] = useState(null),
    [muted, setMuted] = useState(false),
    [pressed, setPressed] = useState(""),
    [imageLoaded, setImageLoaded] = useState(false);
  const showcaseRef = useRef(null);
  const isShowcaseActive = useRef(false);
  const soundPoolsRef = useRef(null);
  const soundCursorRef = useRef({ dpad: 0, action: 0 });
  const project = projects[current];
  const move = (step) => {
    const next = (current + step + projects.length) % projects.length;
    setDirection(step);
    setIngesting({ item: projects[next], step, token: Date.now() });
    setImageLoaded(false);
    setCurrent(next);
  };
  const open = (key) =>
    window.open(project[key], "_blank", "noopener,noreferrer");

  const playControlSound = useCallback(
    (type) => {
      if (muted) return;

      const pool = soundPoolsRef.current?.[type];
      if (!pool?.length) return;

      const cursor = soundCursorRef.current[type] % pool.length;
      soundCursorRef.current[type] += 1;
      const audio = pool[cursor];

      try {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch {
        // Sound is optional and must never interrupt the existing controls.
      }
    },
    [muted],
  );

  useEffect(() => {
    const createPool = (source) =>
      Array.from({ length: 3 }, () => {
        const audio = new Audio(source);
        audio.preload = "auto";
        audio.volume = 0.28;
        return audio;
      });

    soundPoolsRef.current = {
      dpad: createPool("/sounds/5.wav"),
      action: createPool("/sounds/2.wav"),
    };

    return () => {
      Object.values(soundPoolsRef.current || {})
        .flat()
        .forEach((audio) => audio.pause());
      soundPoolsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      isShowcaseActive.current = entry.isIntersecting;
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const down = (e) => {
      const relevantKeys = [
        "ArrowLeft",
        "ArrowRight",
        "KeyC",
        "KeyV",
        "KeyM",
      ];
      if (!isShowcaseActive.current || !relevantKeys.includes(e.code)) return;
      if (["ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
      setPressed(e.code);
      if (e.repeat) return;
      const navigate = (step) => {
        const next = (current + step + projects.length) % projects.length;
        setDirection(step);
        setIngesting({ item: projects[next], step, token: Date.now() });
        setImageLoaded(false);
        setCurrent(next);
      };
      if (e.code === "ArrowLeft") {
        playControlSound("dpad");
        navigate(-1);
      }
      if (e.code === "ArrowRight") {
        playControlSound("dpad");
        navigate(1);
      }
      if (e.code === "KeyC") {
        playControlSound("action");
        window.open(project.caseStudyUrl, "_blank", "noopener,noreferrer");
      }
      if (e.code === "KeyV") {
        playControlSound("action");
        window.open(project.liveUrl, "_blank", "noopener,noreferrer");
      }
      if (e.code === "KeyM") setMuted((x) => !x);
    };
    const up = (e) => {
      if (
        isShowcaseActive.current &&
        ["ArrowLeft", "ArrowRight", "KeyC", "KeyV", "KeyM"].includes(e.code)
      ) {
        setPressed("");
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [project, current, playControlSound]);
  useEffect(() => {
    if (!ingesting) return;
    const timer = setTimeout(() => setIngesting(null), 440);
    return () => clearTimeout(timer);
  }, [ingesting]);
  return (
    <div
      className={`page-shell ${isMotionReady ? "is-motion-ready" : "is-motion-pending"}`}
    >
      <Navbar />
      <main>
        <section id="hero" className="hero shell">
          <p className="hero-intro">● Accepting New Growth Projects</p>
          <h1>
            <span>We build digital experiences</span>
            
          </h1>
          <p className="hero-subtitle">
            Get noticed. Build trust. Turn visitors into customers.
          </p>
          <p className="hero-bio">
            From high-converting websites and visual content to targeted
            advertising and AI automation—we turn online attention into real
            customers and measurable business growth.
          </p>
          <div className="hero-actions">
            <a className="hero-primary" href="#contact">
              Start Your Project
            </a>
            <a className="hero-secondary" href="#work">
              ↓ Explore Our Work
            </a>
          </div>
        </section>
        <StoryThread>
          <ProblemSolution />
          <hr className="kz-divider" />
          <HowWeHelp />
          <hr className="kz-divider" />
          <HowWeWork />
        </StoryThread>
        <WhoWeAre />
        
        <section
          ref={showcaseRef}
          id="work"
          className="showcase shell reveal-on-scroll reveal-showcase"
        >
          <p className="fun-title">
            Selected Work · Discover how we help brands stand out and drive real
            results.
          </p>
          <div
            className={`flank-rail-layer direction-${direction > 0 ? "next" : "prev"}`}
            aria-hidden="true"
          >
            <div className="side-rail left-rail" key={`left-${current}`}>
              {[2, 1].map((offset) => {
                const item =
                  projects[
                    (current - offset + projects.length) % projects.length
                  ];
                return (
                  <div className={`rail-card ${item.badgeClass}`} key={item.id}>
                    {item.badge}
                  </div>
                );
              })}
            </div>
            <div className="rail-safety-gap" />
            <div className="side-rail right-rail" key={`right-${current}`}>
              {[1, 2].map((offset) => {
                const item = projects[(current + offset) % projects.length];
                return (
                  <div className={`rail-card ${item.badgeClass}`} key={item.id}>
                    {item.badge}
                  </div>
                );
              })}
            </div>
            {ingesting && (
              <div
                key={ingesting.token}
                className={`ingesting-card from-${ingesting.step > 0 ? "right" : "left"} rail-card ${ingesting.item.badgeClass}`}
              >
                {ingesting.item.badge}
              </div>
            )}
          </div>
          <div className="game-layout">
            <aside className="game-flank left-flank">
              <div className="instructions">
                <p>
                  use arrow keys to move, <kbd>m</kbd> to Mute
                </p>
                <div className="instruction-card">
                  <span>MOVE LEFT</span>
                  <div className="outline-dpad">
                    <i />
                    <i />
                  </div>
                  <span>MOVE RIGHT</span>
                </div>
              </div>
            </aside>
            <div className="game-center">
              <div className="gameboy">
                <div className="screen-enclosure">
                  <div
                    className={`project-reel project-image-shell slide-${direction > 0 ? "next" : "prev"}${imageLoaded ? " is-loaded" : ""}`}
                  >
                    <picture key={project.title}>
                      <source
                        type="image/webp"
                        srcSet={`/assets/optimized/${project.previewAsset}-480.webp 480w, /assets/optimized/${project.previewAsset}-960.webp 960w`}
                        sizes="(max-width: 430px) 308px, 340px"
                      />
                      <img
                        src={`/assets/optimized/${project.previewAsset}-960.webp`}
                        alt={`${project.title} project photograph`}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                      />
                    </picture>
                  </div>
                  <div className="device-meta">
                    <b>GAMEBOY</b>
                    <span>
                      <i />
                      ▥▥▥ v.05.13.03
                    </span>
                  </div>
                  <div className="terminal" key={`${project.title}-terminal`}>
                    <div>
                      <strong>{project.title}</strong>
                      <span>{project.index}</span>
                    </div>
                    <p>{project.tagline}</p>
                  </div>
                </div>
                <div className="console-controls">
                  <div
                    className={`dpad-control ${pressed === "ArrowLeft" ? "press-left" : ""} ${pressed === "ArrowRight" ? "press-right" : ""} ${pressed === "ArrowUp" ? "press-up" : ""} ${pressed === "ArrowDown" ? "press-down" : ""}`}
                  >
                    <span className="dpad-cross" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                    <button
                      className={`dpad-hit left ${pressed === "ArrowLeft" ? "is-pressed" : ""}`}
                      onClick={() => {
                        playControlSound("dpad");
                        move(-1);
                      }}
                    >
                      ◀
                    </button>
                    <button
                      className={`dpad-hit right ${pressed === "ArrowRight" ? "is-pressed" : ""}`}
                      onClick={() => {
                        playControlSound("dpad");
                        move(1);
                      }}
                    >
                      ▶
                    </button>
                    <button
                      className="dpad-hit up"
                      onClick={() => playControlSound("dpad")}
                    >
                      ▲
                    </button>
                    <button
                      className="dpad-hit down"
                      onClick={() => playControlSound("dpad")}
                    >
                      ▼
                    </button>
                  </div>
                  <div className="action-controls">
                    <button
                      className={`action-key ${pressed === "KeyC" ? "is-pressed" : ""}`}
                      onClick={() => {
                        playControlSound("action");
                        open("caseStudyUrl");
                      }}
                    >
                      C
                    </button>
                    <button
                      className={`action-key ${pressed === "KeyV" ? "is-pressed" : ""}`}
                      onClick={() => {
                        playControlSound("action");
                        open("liveUrl");
                      }}
                    >
                      V
                    </button>
                  </div>
                </div>
                <div className="console-bottom">
                  <span>C-CASE STUDY • V-VIEW LIVE</span>
                  <div className="sound-control">
                    <svg
                      className="sound-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    <button
                      className={`${muted ? "is-muted" : ""} ${pressed === "KeyM" ? "is-pressed" : ""}`}
                      onClick={() => setMuted((x) => !x)}
                      aria-label="Toggle sound"
                    />
                  </div>
                </div>
              </div>
            </div>
            <aside className="game-flank right-flank">
              <div className="instructions">
                <p>
                  use <kbd>c</kbd> &amp; <kbd>v</kbd> to open external links
                </p>
                <div className="instruction-card action-instruction">
                  <span>
                    OPEN CASE
                    <br />
                    STUDY
                  </span>
                  <div className="outline-actions">
                    <i />
                    <i />
                  </div>
                  <span>
                    VIEW LIVE
                    <br />
                    PRODUCT
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>
        <DeferredContent className="panorama-deferred reveal-on-scroll reveal-panorama">
          <Suspense
            fallback={
              <div className="panorama-placeholder" aria-hidden="true" />
            }
          >
            <Panoramic3DSection />
          </Suspense>
        </DeferredContent>
      </main>
      <DeferredContent
        className="footer-deferred reveal-on-scroll reveal-footer"
        id="contact"
      >
        <Suspense
          fallback={<div className="footer-placeholder" aria-hidden="true" />}
        >
          <Footer />
        </Suspense>
      </DeferredContent>
    </div>
  );
}
