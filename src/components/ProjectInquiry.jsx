import { useState, useCallback } from "react";
import "./ProjectInquiry.css";

const WHATSAPP_NUMBER = "15167793514";

const STEPS = [
  { label: "Contact", title: "Contact Information" },
  { label: "Services", title: "Select Your Services" },
  { label: "Details", title: "Project Details" },
  { label: "Budget", title: "Budget & Timeline" },
  { label: "Review", title: "Review & Submit" },
];

const SERVICES = [
  {
    id: "website",
    name: "Website Development",
    desc: "Custom websites tailored to your brand",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: "ai",
    name: "AI Solutions",
    desc: "Intelligent automation and AI integration",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4Z" />
        <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "automation",
    name: "Business Automation",
    desc: "Streamline workflows and operations",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    desc: "Beautiful, user-centered interfaces",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    name: "E-commerce Development",
    desc: "Online stores that drive sales",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: "custom-software",
    name: "Custom Software",
    desc: "Bespoke solutions for unique needs",
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    id: "other",
    name: "Other",
    desc: "Something else in mind",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const TIMELINES = [
  "Immediately",
  "Within 2 weeks",
  "Within a month",
  "In 1–3 months",
  "Flexible",
];

const initialForm = {
  fullName: "",
  email: "",
  whatsapp: "",
  company: "",
  country: "",
  services: [],
  projectName: "",
  description: "",
  objective: "",
  hasWebsite: "",
  websiteUrl: "",
  references: "",
  budget: "",
  timeline: "",
  comments: "",
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ErrorMsg({ msg }) {
  if (!msg) return null;
  return (
    <div className="piq-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {msg}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ProjectInquiry() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = useCallback(
    (key, value) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [],
  );

  const toggleService = useCallback((id) => {
    setForm((prev) => {
      const has = prev.services.includes(id);
      return {
        ...prev,
        services: has
          ? prev.services.filter((s) => s !== id)
          : [...prev.services, id],
      };
    });
    setErrors((prev) => {
      if (!prev.services) return prev;
      const next = { ...prev };
      delete next.services;
      return next;
    });
  }, []);

  const validate = useCallback(() => {
    const e = {};

    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Full name is required";
      if (!form.email.trim()) e.email = "Email address is required";
      else if (!validateEmail(form.email)) e.email = "Enter a valid email address";
      if (!form.whatsapp.trim()) e.whatsapp = "WhatsApp number is required";
    }

    if (step === 1) {
      if (form.services.length === 0)
        e.services = "Please select at least one service";
    }

    if (step === 2) {
      if (!form.description.trim())
        e.description = "Please describe your project";
    }

    if (step === 3) {
      if (!form.budget) e.budget = "Please select your estimated budget";
      if (!form.timeline) e.timeline = "Please select your expected timeline";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }, [step, form]);

  const next = useCallback(() => {
    if (validate()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }, [validate]);

  const back = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const goToStep = useCallback((s) => {
    setStep(s);
  }, []);

  const generateMessage = useCallback(() => {
    const serviceNames = form.services
      .map((id) => SERVICES.find((s) => s.id === id)?.name || id)
      .join("\n• ");

    const msg = `*NEW PROJECT INQUIRY — KAZ NEXT*

━━━━━━━━━━━━━━━━━━━━━━

*CONTACT INFORMATION*
Name: ${form.fullName}
Company: ${form.company || "—"}
Email: ${form.email}
WhatsApp: ${form.whatsapp}
Country: ${form.country || "—"}

*SELECTED SERVICES*
• ${serviceNames}

*PROJECT DETAILS*
Project Name: ${form.projectName || "—"}
Project Description: ${form.description}
Main Objective: ${form.objective || "—"}
Existing Website: ${form.hasWebsite || "—"}
Website URL: ${form.websiteUrl || "—"}
References: ${form.references || "—"}

*BUDGET & TIMELINE*
Estimated Budget: ${form.budget}
Expected Start Date: ${form.timeline}

*ADDITIONAL INFORMATION*
${form.comments || "—"}

━━━━━━━━━━━━━━━━━━━━━━
Please review my project inquiry and let me know the next steps.`;

    return msg;
  }, [form]);

  const sendWhatsApp = useCallback(() => {
    const message = generateMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }, [generateMessage]);

  const progressFill =
    step === 0
      ? 0
      : `${(step / (STEPS.length - 1)) * 100}%`;

  if (submitted) {
    return (
      <section className="piq-section" id="inquiry">
        <div className="piq-inner">
          <div className="piq-card">
            <div className="piq-success">
              <div className="piq-success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Inquiry Sent Successfully!</h3>
              <p>
                Your project inquiry has been prepared and opened in WhatsApp.
                Please confirm sending the message to complete your submission.
                We'll review your requirements and get back to you shortly.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="piq-section" id="inquiry">
      <div className="piq-inner">
        {/* Header */}
        <div className="piq-header">
          <div className="piq-eyebrow">
            <span className="piq-dot" />
            <span>Project Inquiry</span>
          </div>
          <h2 className="piq-title">
            Let's Build Something
            <br />
            Together.
          </h2>
          <p className="piq-subtitle">
            Tell us about your project, and let's turn your ideas into something
            extraordinary.
          </p>
          <p className="piq-intro">
            Completing this short questionnaire helps us understand your
            requirements and prepare a tailored solution for your business.
          </p>
        </div>

        {/* Progress */}
        <div className="piq-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin="1" aria-valuemax={STEPS.length} aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].title}`}>
          <div className="piq-progress-line">
            <div className="piq-progress-fill" style={{ width: progressFill }} />
          </div>
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              className={`piq-progress-step${i === step ? " is-active" : ""}${i < step ? " is-complete" : ""}`}
            >
              <div className="piq-progress-dot">
                {i < step ? <CheckIcon /> : i + 1}
              </div>
              <span className="piq-progress-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="piq-card">
          <div className="piq-step-content" key={step}>
            <div className="piq-step-header">
              <div className="piq-step-label">Step {step + 1} of {STEPS.length}</div>
              <h3 className="piq-step-title">{STEPS[step].title}</h3>
            </div>

            {/* Step 0: Contact */}
            {step === 0 && (
              <div className="piq-fields">
                <div className="piq-field">
                  <label className="piq-label" htmlFor="piq-name">
                    Full Name <span className="piq-required">*</span>
                  </label>
                  <input
                    id="piq-name"
                    className={`piq-input${errors.fullName ? " has-error" : ""}`}
                    type="text"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    autoComplete="name"
                  />
                  <ErrorMsg msg={errors.fullName} />
                </div>

                <div className="piq-row">
                  <div className="piq-field">
                    <label className="piq-label" htmlFor="piq-email">
                      Email Address <span className="piq-required">*</span>
                    </label>
                    <input
                      id="piq-email"
                      className={`piq-input${errors.email ? " has-error" : ""}`}
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      autoComplete="email"
                    />
                    <ErrorMsg msg={errors.email} />
                  </div>
                  <div className="piq-field">
                    <label className="piq-label" htmlFor="piq-whatsapp">
                      WhatsApp Number <span className="piq-required">*</span>
                    </label>
                    <input
                      id="piq-whatsapp"
                      className={`piq-input${errors.whatsapp ? " has-error" : ""}`}
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                      autoComplete="tel"
                    />
                    <ErrorMsg msg={errors.whatsapp} />
                  </div>
                </div>

                <div className="piq-row">
                  <div className="piq-field">
                    <label className="piq-label" htmlFor="piq-company">
                      Company / Business <span className="piq-optional">(optional)</span>
                    </label>
                    <input
                      id="piq-company"
                      className="piq-input"
                      type="text"
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      autoComplete="organization"
                    />
                  </div>
                  <div className="piq-field">
                    <label className="piq-label" htmlFor="piq-country">
                      Country <span className="piq-optional">(optional)</span>
                    </label>
                    <input
                      id="piq-country"
                      className="piq-input"
                      type="text"
                      placeholder="United States"
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      autoComplete="country-name"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Services */}
            {step === 1 && (
              <div className="piq-fields">
                <p style={{ margin: "0 0 8px", font: "400 14px/1.5 'DM Sans', sans-serif", color: "#727272" }}>
                  Select all services that apply to your project.
                </p>
                <div className="piq-services" role="group" aria-label="Services">
                  {SERVICES.map((service) => {
                    const selected = form.services.includes(service.id);
                    return (
                      <label
                        key={service.id}
                        className={`piq-service-card${selected ? " is-selected" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleService(service.id)}
                          aria-label={service.name}
                        />
                        <span className="piq-service-check">
                          <CheckIcon />
                        </span>
                        <span className="piq-service-icon">{service.icon}</span>
                        <span className="piq-service-name">{service.name}</span>
                        <span className="piq-service-desc">{service.desc}</span>
                      </label>
                    );
                  })}
                </div>
                <ErrorMsg msg={errors.services} />
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="piq-fields">
                <div className="piq-field">
                  <label className="piq-label" htmlFor="piq-project-name">
                    Project Name <span className="piq-optional">(optional)</span>
                  </label>
                  <input
                    id="piq-project-name"
                    className="piq-input"
                    type="text"
                    placeholder="e.g. Company Website Redesign"
                    value={form.projectName}
                    onChange={(e) => set("projectName", e.target.value)}
                  />
                </div>

                <div className="piq-field">
                  <label className="piq-label" htmlFor="piq-description">
                    Describe Your Project <span className="piq-required">*</span>
                  </label>
                  <textarea
                    id="piq-description"
                    className={`piq-textarea${errors.description ? " has-error" : ""}`}
                    placeholder="Tell us about your project, goals, and any specific requirements you have in mind..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={5}
                  />
                  <ErrorMsg msg={errors.description} />
                </div>

                <div className="piq-field">
                  <label className="piq-label" htmlFor="piq-objective">
                    Main Objective <span className="piq-optional">(optional)</span>
                  </label>
                  <input
                    id="piq-objective"
                    className="piq-input"
                    type="text"
                    placeholder="e.g. Increase online sales by 30%"
                    value={form.objective}
                    onChange={(e) => set("objective", e.target.value)}
                  />
                </div>

                <div className="piq-field">
                  <label className="piq-label">
                    Do you currently have a website?
                  </label>
                  <div className="piq-toggle-group">
                    {["Yes", "No"].map((opt) => (
                      <label
                        key={opt}
                        className={`piq-toggle${form.hasWebsite === opt ? " is-selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="hasWebsite"
                          value={opt}
                          checked={form.hasWebsite === opt}
                          onChange={() => set("hasWebsite", opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {form.hasWebsite === "Yes" && (
                  <div className="piq-field">
                    <label className="piq-label" htmlFor="piq-website-url">
                      Existing Website URL <span className="piq-optional">(optional)</span>
                    </label>
                    <input
                      id="piq-website-url"
                      className="piq-input"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={form.websiteUrl}
                      onChange={(e) => set("websiteUrl", e.target.value)}
                    />
                  </div>
                )}

                <div className="piq-field">
                  <label className="piq-label" htmlFor="piq-references">
                    Reference Websites / Inspiration <span className="piq-optional">(optional)</span>
                  </label>
                  <textarea
                    id="piq-references"
                    className="piq-textarea"
                    placeholder="Share any websites or designs you admire..."
                    value={form.references}
                    onChange={(e) => set("references", e.target.value)}
                    rows={3}
                    style={{ minHeight: "80px" }}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {step === 3 && (
              <div className="piq-fields">
                <div className="piq-field">
                  <label className="piq-label">
                    Estimated Budget <span className="piq-required">*</span>
                  </label>
                  <div className="piq-options" role="radiogroup" aria-label="Budget range">
                    {BUDGETS.map((b) => (
                      <label
                        key={b}
                        className={`piq-option${form.budget === b ? " is-selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={b}
                          checked={form.budget === b}
                          onChange={() => set("budget", b)}
                        />
                        <span className="piq-option-label">{b}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg msg={errors.budget} />
                </div>

                <div className="piq-field">
                  <label className="piq-label">
                    Expected Starting Date <span className="piq-required">*</span>
                  </label>
                  <div className="piq-options" role="radiogroup" aria-label="Timeline">
                    {TIMELINES.map((t) => (
                      <label
                        key={t}
                        className={`piq-option${form.timeline === t ? " is-selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={t}
                          checked={form.timeline === t}
                          onChange={() => set("timeline", t)}
                        />
                        <span className="piq-option-label">{t}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg msg={errors.timeline} />
                </div>

                <div className="piq-field">
                  <label className="piq-label" htmlFor="piq-comments">
                    Additional Comments <span className="piq-optional">(optional)</span>
                  </label>
                  <textarea
                    id="piq-comments"
                    className="piq-textarea"
                    placeholder="Any additional requirements, questions, or comments..."
                    value={form.comments}
                    onChange={(e) => set("comments", e.target.value)}
                    rows={3}
                    style={{ minHeight: "80px" }}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="piq-review">
                {/* Contact */}
                <div className="piq-review-section">
                  <div className="piq-review-heading">
                    Contact Information
                    <button
                      type="button"
                      className="piq-review-edit"
                      onClick={() => goToStep(0)}
                      aria-label="Edit contact information"
                    >
                      <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      Edit
                    </button>
                  </div>
                  <div className="piq-review-grid">
                    <span className="piq-review-key">Name</span>
                    <span className="piq-review-value">{form.fullName}</span>
                    <span className="piq-review-key">Email</span>
                    <span className="piq-review-value">{form.email}</span>
                    <span className="piq-review-key">WhatsApp</span>
                    <span className="piq-review-value">{form.whatsapp}</span>
                    <span className="piq-review-key">Company</span>
                    <span className={`piq-review-value${!form.company ? " piq-empty" : ""}`}>
                      {form.company || "Not provided"}
                    </span>
                    <span className="piq-review-key">Country</span>
                    <span className={`piq-review-value${!form.country ? " piq-empty" : ""}`}>
                      {form.country || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="piq-review-section">
                  <div className="piq-review-heading">
                    Selected Services
                    <button
                      type="button"
                      className="piq-review-edit"
                      onClick={() => goToStep(1)}
                      aria-label="Edit selected services"
                    >
                      <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      Edit
                    </button>
                  </div>
                  <div className="piq-review-services">
                    {form.services.map((id) => {
                      const s = SERVICES.find((sv) => sv.id === id);
                      return (
                        <span key={id} className="piq-review-tag">
                          {s?.name || id}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details */}
                <div className="piq-review-section">
                  <div className="piq-review-heading">
                    Project Details
                    <button
                      type="button"
                      className="piq-review-edit"
                      onClick={() => goToStep(2)}
                      aria-label="Edit project details"
                    >
                      <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      Edit
                    </button>
                  </div>
                  <div className="piq-review-grid">
                    <span className="piq-review-key">Project Name</span>
                    <span className={`piq-review-value${!form.projectName ? " piq-empty" : ""}`}>
                      {form.projectName || "Not provided"}
                    </span>
                    <span className="piq-review-key">Description</span>
                    <span className="piq-review-value" style={{ whiteSpace: "pre-wrap" }}>
                      {form.description}
                    </span>
                    <span className="piq-review-key">Objective</span>
                    <span className={`piq-review-value${!form.objective ? " piq-empty" : ""}`}>
                      {form.objective || "Not provided"}
                    </span>
                    <span className="piq-review-key">Has Website</span>
                    <span className={`piq-review-value${!form.hasWebsite ? " piq-empty" : ""}`}>
                      {form.hasWebsite || "Not specified"}
                    </span>
                    {form.hasWebsite === "Yes" && (
                      <>
                        <span className="piq-review-key">Website URL</span>
                        <span className={`piq-review-value${!form.websiteUrl ? " piq-empty" : ""}`}>
                          {form.websiteUrl || "Not provided"}
                        </span>
                      </>
                    )}
                    <span className="piq-review-key">References</span>
                    <span className={`piq-review-value${!form.references ? " piq-empty" : ""}`} style={{ whiteSpace: "pre-wrap" }}>
                      {form.references || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="piq-review-section">
                  <div className="piq-review-heading">
                    Budget & Timeline
                    <button
                      type="button"
                      className="piq-review-edit"
                      onClick={() => goToStep(3)}
                      aria-label="Edit budget and timeline"
                    >
                      <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      Edit
                    </button>
                  </div>
                  <div className="piq-review-grid">
                    <span className="piq-review-key">Budget</span>
                    <span className="piq-review-value">{form.budget}</span>
                    <span className="piq-review-key">Timeline</span>
                    <span className="piq-review-value">{form.timeline}</span>
                  </div>
                </div>

                {/* Additional */}
                {form.comments && (
                  <div className="piq-review-section">
                    <div className="piq-review-heading">Additional Information</div>
                    <p className="piq-review-value" style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                      {form.comments}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="piq-nav">
              {step > 0 ? (
                <button type="button" className="piq-btn piq-btn--back" onClick={back}>
                  <svg viewBox="0 0 24 24">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <button type="button" className="piq-btn piq-btn--next" onClick={next}>
                  Continue
                  <svg viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              ) : (
                <button type="button" className="piq-btn piq-btn--whatsapp" onClick={sendWhatsApp}>
                  <svg viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.44 0 .07 5.37.07 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.96 11.96 0 0 0 5.83 1.49h.01C18.63 23.86 24 18.49 24 11.89c0-3.2-1.24-6.2-3.48-8.41ZM12.04 21.84a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.59-.24-.37a9.88 9.88 0 0 1-1.52-5.29c0-5.48 4.46-9.94 9.95-9.94a9.87 9.87 0 0 1 7.03 2.91 9.87 9.87 0 0 1 2.91 7.04c0 5.48-4.46 9.86-10.02 9.86Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                  Send Project Inquiry via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

