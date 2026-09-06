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
      className="reveal-on-scroll reveal-trust border-t border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-[#0A0A0A] dark:text-neutral-50"
    >
      <div className="mx-auto w-[min(1152px,calc(100%_-_3rem))] py-28 sm:py-36 lg:py-44">
        <header
          className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20"
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
            className="max-w-[17ch] [font-family:var(--serif,Georgia,serif)] text-[clamp(3rem,6.5vw,6.4rem)] font-medium leading-[0.91] tracking-[-0.055em] lg:justify-self-end"
          >
            Trust should be felt before the{" "}
            <em className="font-medium">first call.</em>
          </h2>
        </header>

        <div className="mt-20 grid border-l border-t border-neutral-200 dark:border-neutral-800 lg:grid-cols-[1.25fr_0.75fr]">
          <blockquote
            className="flex min-h-[410px] flex-col justify-between border-b border-r border-neutral-200 bg-[#F7F7F4] p-8 dark:border-neutral-800 dark:bg-neutral-950 sm:p-12 lg:p-16"
            data-trust-reveal
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Studio principle · Not a sales line
            </span>
            <p className="mt-20 max-w-[20ch] [font-family:var(--serif,Georgia,serif)] text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl">
              “Trust is not a finishing touch. It is how the work begins, how
              decisions are explained, and how the relationship keeps moving.”
            </p>
            <cite className="mt-12 font-mono text-[10px] not-italic uppercase tracking-[0.16em] text-neutral-500">
              KAZ NEXT / Studio ethos
            </cite>
          </blockquote>

          <aside
            className="flex min-h-[410px] flex-col justify-between border-b border-r border-neutral-200 bg-[#111] p-8 text-white dark:border-neutral-800 sm:p-12"
            data-trust-reveal
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Proof over performance
              </p>
              <h3 className="mt-8 max-w-[14ch] [font-family:var(--serif,Georgia,serif)] text-4xl font-medium leading-[0.98] tracking-[-0.04em]">
                Clear work. Specific thinking. No borrowed praise.
              </h3>
            </div>
            <p className="mt-14 max-w-sm text-sm leading-relaxed text-neutral-400">
              We do not inflate results or put words in a client&apos;s mouth. The
              work below shows the problem each experience was designed to make
              clearer.
            </p>
          </aside>
        </div>

        <div className="grid border-l border-neutral-200 dark:border-neutral-800 md:grid-cols-3">
          {projectProof.map((project, index) => (
            <article
              key={project.name}
              className="group min-h-[360px] border-b border-r border-neutral-200 p-8 transition-colors duration-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-950 sm:p-9"
              data-trust-reveal
              style={{ "--trust-delay": `${320 + index * 75}ms` }}
            >
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                <span>{project.index} · Project evidence</span>
                <span>{project.field}</span>
              </div>
              <h3 className="mt-16 max-w-[16ch] [font-family:var(--serif,Georgia,serif)] text-3xl font-medium leading-[1.03] tracking-[-0.03em]">
                {project.title}
              </h3>
              <p className="mt-7 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {project.detail}
              </p>
              <a
                href="#work"
                className="mt-8 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] !text-neutral-800 dark:!text-neutral-200"
              >
                {project.name}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
