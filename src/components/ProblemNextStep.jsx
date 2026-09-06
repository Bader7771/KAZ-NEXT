import "./ProblemNextStep.css";

const diagnosticEntries = [
  {
    number: "01",
    problemTitle: "People find you, but don't become customers.",
    problem:
      "Your business may be getting visitors, views, or attention—but attention doesn't always become action. If customers don't clearly understand what you offer, why they should trust you, or what to do next, they leave.",
    solutionTitle: "Turn attention into a clear next move.",
    solution:
      "We create a digital experience that carries people from interest to action without making them work for the answer.",
    actions: ["Sharper messaging", "Clearer customer journeys", "Stronger calls to action"],
  },
  {
    number: "02",
    problemTitle: "Your online presence doesn't represent the quality of your business.",
    problem:
      "You may offer an excellent service, but your website or online presence doesn't communicate it. An outdated design, confusing information, a poor mobile experience, or no clear identity can shape how people see the business before they ever contact you.",
    solutionTitle: "Let the digital presence match the real standard.",
    solution:
      "We build a presence that represents the business properly: modern enough to feel current, clear enough to feel effortless, and credible enough to earn the next conversation.",
    actions: ["A considered visual identity", "Useful information architecture", "Responsive by design"],
  },
  {
    number: "03",
    problemTitle: "Too much time is spent on work that could be simpler.",
    problem:
      "Following up. Organizing information. Answering the same questions. Managing processes manually. Time spent repeating routine work is time taken away from the decisions and relationships that move a business forward.",
    solutionTitle: "Give repetitive work back to the system.",
    solution:
      "We explore where automation and AI can genuinely help—not because the tools are fashionable, but because the right system can save time and make everyday work easier.",
    actions: ["Practical automation", "Useful AI integration", "Less operational friction"],
  },
  {
    number: "04",
    problemTitle: "You have the business. But no clear digital direction.",
    problem:
      "Technology moves quickly. Platforms appear, strategies shift, and AI changes the landscape again. You don't need to use everything new. You need to know which opportunities deserve your time and which ones are only noise.",
    solutionTitle: "Choose the opportunity, not the noise.",
    solution:
      "We look at where the business is, where it wants to go, and which digital decisions can close that distance. No unnecessary complexity. Just a clearer next step.",
    actions: ["Business-first direction", "Focused digital priorities", "A path built to evolve"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    description: "We learn about the business, its goals, its customers, and the challenges standing in the way.",
  },
  {
    number: "02",
    title: "Identify",
    description: "We find the gaps, friction, and overlooked opportunities that could be affecting growth.",
  },
  {
    number: "03",
    title: "Build",
    description: "We create the right solution—website, automation, AI integration, or a thoughtful combination.",
  },
  {
    number: "04",
    title: "Improve",
    description: "We learn from the work, refine what matters, and keep looking for the next useful opportunity.",
  },
];

export default function ProblemNextStep() {
  return (
    <section
      id="approach"
      className="problem-solution-section reveal-on-scroll reveal-approach"
      aria-labelledby="diagnostic-ledger-title"
    >
      <div className="problem-solution-section__inner">
        <header className="diagnostic-header">
          <p className="diagnostic-tag" data-approach-reveal>
            <span aria-hidden="true">●</span>
            [ 03 — Diagnosis &amp; Direction ]
          </p>

          <h2 id="diagnostic-ledger-title" data-approach-reveal>
            <span>Your business doesn&apos;t</span>
            <span>always need more.</span>
            <em>It needs the right thing.</em>
          </h2>

          <div className="diagnostic-manifesto" data-approach-reveal>
            <p>
              <span>01 · First, we ask</span>
              Where is the business today? What is slowing its growth? Where do
              potential customers leave, hesitate, or lose trust? What takes too
              much time?
            </p>
            <p>
              <span>02 · Then, we choose</span>
              A beautiful website is not always the answer. More technology is
              not always the answer either. The right direction begins by
              understanding the problem clearly.
            </p>
          </div>
        </header>

        <div className="ledger-heading" data-approach-reveal>
          <p>The diagnostic ledger</p>
          <span>Friction ⇄ Calibration</span>
        </div>

        <div className="ledger-grid">
          {diagnosticEntries.map((entry, index) => (
            <article
              className="diagnostic-pair"
              tabIndex="0"
              key={entry.number}
              data-approach-reveal
              style={{ "--entry-delay": `${230 + index * 80}ms` }}
            >
              <div className="problem-pane">
                <div className="problem-pane__meta">
                  <span>PRB_{entry.number}</span>
                  <span>The friction</span>
                </div>
                <h3>{entry.problemTitle}</h3>
                <p>{entry.problem}</p>
                <span className="problem-pane__strike" aria-hidden="true" />
              </div>

              <div className="diagnostic-pair__exchange" aria-hidden="true">
                <span>⇄</span>
              </div>

              <div className="solution-pane">
                <div className="solution-pane__meta">
                  <span>Approach: Resolved</span>
                  <i aria-hidden="true">✦</i>
                </div>
                <h3>{entry.solutionTitle}</h3>
                <p>{entry.solution}</p>
                <ul>
                  {entry.actions.map((action) => <li key={action}>{action}</li>)}
                </ul>
                <span className="solution-pane__indicator" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <section className="diagnostic-process" aria-labelledby="diagnostic-process-title">
          <header className="diagnostic-process__header" data-approach-reveal>
            <p>Method / 01—04</p>
            <h3 id="diagnostic-process-title">
              We don&apos;t start with a solution. We start with a <em>question.</em>
            </h3>
            <div>
              <span>What is actually stopping the business from moving forward?</span>
              <p>
                From there, we understand the business, identify the real
                opportunity, and build around what matters.
              </p>
            </div>
          </header>

          <ol className="process-index-bar" data-approach-reveal>
            {processSteps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <strong>{step.title}</strong>
              </li>
            ))}
          </ol>

          <div className="process-stage-grid">
            {processSteps.map((step, index) => (
              <article
                className="process-stage"
                key={step.number}
                data-approach-reveal
                style={{ "--entry-delay": `${280 + index * 70}ms` }}
              >
                <span className="process-stage__number" aria-hidden="true">{step.number}</span>
                <div>
                  <span>Step {step.number}</span>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="diagnostic-closing"
          aria-labelledby="diagnostic-closing-title"
          data-approach-reveal
        >
          <h3 id="diagnostic-closing-title">
            The goal isn&apos;t more technology. The goal is to make the business{" "}
            <em>move forward.</em>
          </h3>
          <p>
            Sometimes the difference is a clearer website. Sometimes it is a
            better customer journey or hours returned through automation.
            Sometimes the first useful step is simply seeing the problem clearly.
            That is where we start.
          </p>
        </section>

        <aside className="diagnostic-cta" data-approach-reveal>
          <div className="diagnostic-cta__index" aria-hidden="true">
            <span>KAZ NEXT</span>
            <span>DIR / 03</span>
          </div>
          <div className="diagnostic-cta__copy">
            <p>Start with what is true today</p>
            <h3>Let&apos;s find what&apos;s holding your business back.</h3>
            <span>
              Tell us where you are today. We&apos;ll help you explore what could come next.
            </span>
          </div>
          <a href="#contact" className="diagnostic-cta__button">
            [ Let&apos;s Talk <span aria-hidden="true">↗</span> ]
          </a>
        </aside>
      </div>
    </section>
  );
}
