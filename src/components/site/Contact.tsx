"use client";

import { useState } from "react";
import type { FormEvent, JSX } from "react";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://twitter.com" },
];

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL = "taha.mahmoud.abdellah@gmail.com";

/**
 * Contact v2 — editorial, no terminal chrome:
 * statement + email row on the left, clean flat form card on the right,
 * socials integrated under the form. One primary action style.
 */
export function Contact(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Your name is required.";
    if (!email.trim()) {
      next.email = "An email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "That email address doesn't look right.";
    }
    if (!message.trim()) next.message = "A message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-bg/70 px-4 py-3.5 text-sm text-fg placeholder:text-fg-dim transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent ${
      hasError ? "border-danger" : "border-border-strong"
    }`;

  return (
    <section id="contact" className="relative">
      {/* calm radial glow behind the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full opacity-[0.08] blur-[140px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 lg:py-36">
        {/* ── Statement row ── */}
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">
            <span className="text-accent">{"//"}</span> Contact
          </p>
          <h2 className="display-sans text-[clamp(2.6rem,6vw,4.6rem)] text-fg">
            Let&apos;s build something{" "}
            <span>together.</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell me about your project — I reply{" "}
            <span className="font-medium text-fg">within 24 hours</span>. Prefer
            email? Reach me directly at{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-fg underline decoration-accent/60 decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              {EMAIL}
            </a>
            .
          </p>
        </div>

        {/* ── Form + socials grid ── */}
        <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* form — flat clean card */}
          <form onSubmit={onSubmit} noValidate className="w-full">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={fieldClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-2 font-mono text-xs text-danger">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={fieldClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-2 font-mono text-xs text-danger">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="contact-message"
                className="mb-2 block font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project — scope, timeline, anything that helps."
                rows={6}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${fieldClass(Boolean(errors.message))} resize-y`}
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="mt-2 font-mono text-xs text-danger">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-on-accent transition-all duration-300 hover:bg-accent-strong hover:shadow-[0_12px_40px_-10px_var(--glow)] active:translate-y-px sm:w-auto sm:min-w-[220px]"
            >
              Send message
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
            <p className="mt-4 font-mono text-micro uppercase leading-relaxed tracking-[0.15em] text-fg-dim">
              Opens your email client with everything pre-filled.
            </p>
            {/* success/handoff state — content swap so aria-live actually announces;
                also doubles as the no-mail-client recovery path */}
            <p role="status" className="mt-3 text-sm leading-relaxed text-fg">
              {sent ? (
                <>
                  Your email app should have opened with the message ready to
                  send — nothing was submitted to a server. If it didn&apos;t
                  open, email me directly at{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-medium text-accent underline decoration-accent/50 underline-offset-4"
                  >
                    {EMAIL}
                  </a>
                  .
                </>
              ) : null}
            </p>
          </form>

          {/* right column — availability + socials */}
          <aside className="flex flex-col justify-between gap-12 lg:border-l lg:border-border lg:pl-14">
            <div>
              <p className="font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim">
                Availability
              </p>
              <div className="mt-4 space-y-4">
                {[
                  { k: "Status", v: "Open for new projects" },
                  { k: "Next opening", v: "October 2026" },
                  { k: "Timezone", v: "GMT+2 · Cairo" },
                ].map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between border-b border-border pb-3">
                    <span className="text-sm text-fg-muted">{row.k}</span>
                    <span className="text-sm font-medium text-fg">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-tiny uppercase tracking-[0.22em] text-fg-dim">
                Elsewhere
              </p>
              <ul className="mt-4 flex flex-col gap-1">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-bg-card"
                    >
                      <span className="text-sm font-medium text-fg-muted transition-colors group-hover:text-accent">
                        {social.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-fg-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
