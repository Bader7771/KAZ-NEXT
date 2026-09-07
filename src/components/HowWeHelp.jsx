import { useReveal } from '../hooks/useReveal';
import './HowWeHelp.css';

const GROWTH_AREAS = [
  {
    title: 'Get found and chosen',
    body: 'A sharper digital presence turns searches and scrolls into real inquiries.',
  },
  {
    title: 'Get hours back',
    body: "Automation handles what shouldn't need a person, so your team doesn't have to.",
  },
  {
    title: 'Feel easier to work with',
    body: "Customers notice when things are fast, clear, and don't require extra effort.",
  },
  {
    title: 'Run without friction',
    body: 'Fewer workarounds, fewer handoffs, less that depends on memory or luck.',
  },
  {
    title: 'Open the next door',
    body: 'Once the foundation works, new offers, markets, and services get easier to try.',
  },
];

export default function HowWeHelp() {
  const [headRef, headVisible] = useReveal();
  const [pathRef, pathVisible] = useReveal();
  const [closeRef, closeVisible] = useReveal();

  return (
    <section id="how-we-help" className="hwh-section">
      <div className="kz-wrap">
        <div
          ref={headRef}
          className={`hwh-head kz-reveal ${headVisible ? 'is-visible' : ''}`}
        >
          <div className="kz-eyebrow">
            <span className="kz-num">02</span>
            <span className="kz-dash">—</span>
            <span>How We Help You Grow</span>
          </div>
          <h2 className="kz-headline hwh-headline">
            Technology should move a business forward,<br />not just fill a gap.
          </h2>
          <p className="hwh-lede">
            A finished website or a shipped feature isn&apos;t the goal —
            it&apos;s what changes afterward. This is where our work
            actually shows up in your business.
          </p>
        </div>

        <div
          ref={pathRef}
          className={`hwh-path kz-reveal ${pathVisible ? 'is-visible' : ''}`}
        >
          <div className="hwh-line" aria-hidden="true" />
          <div className="hwh-row">
            {GROWTH_AREAS.map((area, i) => (
              <div className="hwh-item" key={area.title}>
                <div className="hwh-index">{i + 1}</div>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={closeRef}
          className={`hwh-close kz-reveal ${closeVisible ? 'is-visible' : ''}`}
        >
          <span className="hwh-big">
            The question we build around is always{' '}
            <em>what changes for you</em> after this.
          </span>
        </div>
      </div>
    </section>
  );
}
