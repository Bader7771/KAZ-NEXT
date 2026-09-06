import { useReveal } from '../hooks/useReveal';
import './HowWeWork.css';

const STEPS = [
  {
    num: '01',
    title: 'Understand',
    lead: "We start with the business, not the build.",
    body: 'Its goals, its customers, its current digital reality — before a single solution is on the table.',
  },
  {
    num: '02',
    title: 'Discover',
    lead: null,
    body: 'We look for where growth is limited, where time is lost, and where customers slip away — so the direction is right before anything is built.',
  },
  {
    num: '03',
    title: 'Build',
    lead: null,
    body: 'A website, automation, an AI solution, or a custom system — whatever the discovery points to, built around what the business actually needs.',
  },
  {
    num: '04',
    title: 'Grow',
    lead: "The work doesn't end at delivery.",
    body: 'Every build is judged by the time it saves, the customers it wins, and the room it creates for what\u2019s next.',
  },
];

export default function HowWeWork() {
  const [topRef, topVisible] = useReveal();
  const [stepsRef, stepsVisible] = useReveal();
  const [closeRef, closeVisible] = useReveal();

  return (
    <section id="how-we-work" className="hww-section">
      <div className="kz-wrap">
        <div
          ref={topRef}
          className={`hww-top kz-reveal ${topVisible ? 'is-visible' : ''}`}
        >
          <div>
            <div className="kz-eyebrow">
              <span className="kz-num">03</span>
              <span className="kz-dash">—</span>
              <span>How We Work</span>
            </div>
            <h2 className="kz-headline hww-headline">
              A clear process, built around your business.
            </h2>
          </div>
          <div className="hww-sub">
            No two projects start from the same template. What stays
            constant is the order we work in — understand first, build
            last.
          </div>
        </div>

        <div
          ref={stepsRef}
          className={`hww-steps kz-reveal ${stepsVisible ? 'is-visible' : ''}`}
        >
          {STEPS.map((step, i) => (
            <div className="hww-step" key={step.num}>
              <div
                className="hww-step-num"
                style={
                  i === STEPS.length - 1
                    ? { background: 'var(--kz-blue)' }
                    : undefined
                }
              >
                {step.num}
              </div>
              <div className="hww-step-body">
                <div className="hww-step-title">{step.title}</div>
                <div className="hww-step-desc">
                  {step.lead && <span className="hww-lead">{step.lead}</span>}
                  {step.lead ? ' ' : ''}
                  {step.body}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={closeRef}
          className={`hww-close kz-reveal ${closeVisible ? 'is-visible' : ''}`}
        >
          <p>
            We build with the future of your business in mind — not just
            the brief in front of us.
          </p>
          <a href="#" className="kz-pill-btn">
            Start a Project →
          </a>
        </div>
      </div>
    </section>
  );
}
