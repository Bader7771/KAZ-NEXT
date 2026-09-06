import { useReveal } from '../hooks/useReveal';
import './ProblemSolution.css';

const PROBLEMS = [
  "An outdated website that doesn't reflect the business",
  'Customers found online, then lost before they convert',
  'Manual work that eats hours every week',
  'Processes that only work because someone remembers them',
  "No system tying customer, sales, and operations data together",
  'Technology that was added, not designed',
];

const SOLUTIONS = [
  'A digital experience that earns trust on first visit',
  'Clear paths from attention to action, end to end',
  'Automation that removes the repetitive, not the important',
  'Systems documented well enough to outlast any one person',
  'One connected view of the customer and the business',
  'Technology chosen for the goal, not the trend',
];

export default function ProblemSolution() {
  const [headRef, headVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [noteRef, noteVisible] = useReveal();

  return (
    <section id="problem-solution" className="ps-section">
      <div className="kz-wrap">
        <div
          ref={headRef}
          className={`ps-head kz-reveal ${headVisible ? 'is-visible' : ''}`}
        >
          <div className="kz-eyebrow">
            <span className="kz-num">01</span>
            <span className="kz-dash">—</span>
            <span>Problem &amp; Solution</span>
          </div>
          <h2 className="kz-headline ps-headline">
            Every business has something quietly holding it back.
          </h2>
          <p className="ps-lede">
            Most of the time it isn&apos;t the product or the people — it&apos;s
            outdated processes, a weak digital presence, or systems that
            were never built to grow. None of that is a failure. It&apos;s
            where the opportunity is.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`ps-grid kz-reveal ${gridVisible ? 'is-visible' : ''}`}
        >
          <div>
            <div className="ps-col-label">What&apos;s slowing things down</div>
            <ul className="ps-problem-list">
              {PROBLEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ps-bridge" aria-hidden="true">
            <svg viewBox="0 0 24 140" fill="none">
              <path d="M12 4 V132" stroke="#E7E5E0" strokeWidth="1" />
              <path
                d="M12 128 L6 120 M12 128 L18 120"
                stroke="#345FF6"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <div className="ps-col-label">What we build instead</div>
            <ul className="ps-solution-list">
              {SOLUTIONS.map((item, i) => (
                <li key={item} data-i={i + 1}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          ref={noteRef}
          className={`ps-note kz-reveal ${noteVisible ? 'is-visible' : ''}`}
        >
          <strong>There&apos;s no single fix we reach for by default.</strong>{' '}
          The right combination — website, automation, AI, or a custom
          system — depends entirely on what&apos;s actually limiting your
          business, not a package we sell.
        </div>
      </div>
    </section>
  );
}
