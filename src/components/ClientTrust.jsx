import "./ClientTrust.css";

const projectProof = [
  {
    index: "01",
    name: "Atlas Estates",
    field: "Property",
    title: "From browsing to a more confident enquiry.",
    detail:
      "A clearer property experience built to help buyers discover apartments and villas without losing the trust a high-value decision requires.",
  },
  {
    index: "02",
    name: "Lumina Dental",
    field: "Healthcare",
    title: "From uncertainty to an approachable next step.",
    detail:
      "Treatment information, care options, and booking paths organized so patients can understand the service before they make contact.",
  },
  {
    index: "03",
    name: "Harris & Co.",
    field: "Legal",
    title: "From complex counsel to a clear conversation.",
    detail:
      "A refined digital presence that makes business counsel easier to navigate while preserving the credibility of the practice behind it.",
  },
];

export default function ClientTrust() {
  return (
    <section
      id="testimonials"
      aria-labelledby="client-trust-title"
      className="reveal-on-scroll reveal-trust trust-section"
    >
      <div className="trust-container">
        <header
          className="trust-heading"
          data-trust-reveal
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            <span
              aria-hidden="true"
              className="mr-3 inline-block size-1.5 rounded-full bg-[#2853e8] shadow-[0_0_0_5px_rgba(40,83,232,0.09)]"
            />
            04 · Trust &amp; proof
          </p>
          <h2
            id="client-trust-title"
            className="trust-heading-title"
          >
            Trust should be felt before the{" "}
            <em className="font-medium">first call.</em>
          </h2>
        </header>

        <div className="trust-grid">
          <blockquote
            className="trust-panel trust-principle"
            data-trust-reveal
          >
            <span className="trust-label">
              Studio principle · Not a sales line
            </span>
            <p className="trust-statement">
              “Trust is not a finishing touch. It is how the work begins, how
              decisions are explained, and how the relationship keeps moving.”
            </p>
            <cite className="trust-label">
              KAZ NEXT / Studio ethos
            </cite>
          </blockquote>

          <aside
            className="trust-panel trust-proof"
            data-trust-reveal
          >
            <div>
              <p className="trust-label">
                Proof over performance
              </p>
              <h3 className="trust-proof-title">
                Clear work. Specific thinking. No borrowed praise.
              </h3>
            </div>
            <p className="trust-proof-body">
              We do not inflate results or put words in a client&apos;s mouth. The
              work below shows the problem each experience was designed to make
              clearer.
            </p>
          </aside>
          {projectProof.map((project, index) => (
            <article
              key={project.name}
              className="trust-evidence group flex min-w-0 flex-col gap-5 bg-white text-black transition-colors duration-300 hover:bg-black hover:text-white motion-reduce:transition-none"
              data-trust-reveal
              style={{ "--trust-delay": `${320 + index * 75}ms` }}
            >
              <div className="flex flex-col items-start gap-1 [font-family:var(--mono)] text-[9px] leading-relaxed uppercase tracking-[0.12em] text-black transition-colors duration-300 group-hover:text-white motion-reduce:transition-none">
                <span>{project.index} · Project evidence</span>
                <span>{project.field}</span>
              </div>
              <h3 className="m-0 max-w-[22ch] text-balance [font-family:var(--serif,Georgia,serif)] text-[clamp(1.625rem,2.5vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-black transition-colors duration-300 group-hover:text-white motion-reduce:transition-none">
                {project.title}
              </h3>
              <p className="m-0 max-w-[48ch] text-pretty text-sm leading-[1.7] text-black transition-colors duration-300 group-hover:text-white motion-reduce:transition-none">
                {project.detail}
              </p>
              <a
                href="#work"
                className="mt-auto flex min-h-11 items-center justify-between gap-4 [font-family:var(--mono)] text-[10px] leading-relaxed uppercase tracking-[0.12em] !text-black transition-colors duration-300 group-hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4 motion-reduce:transition-none"
              >
                {project.name}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-base leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  ↗
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
