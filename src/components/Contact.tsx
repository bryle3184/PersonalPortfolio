import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight, Check, Download, Mail, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import type { PortfolioData } from "../types";

interface FormValues {
  name: string;
  email: string;
  budget: string;
  message: string;
}

const BUDGET_OPTIONS = ["A small, focused engagement", "A design system or rebuild", "A full product or brand", "Still figuring it out"];

export default function Contact({ person }: { person: PortfolioData["person"] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });
  const [sent, setSent] = useState(false);

  const FORMSPREE_URL = (import.meta.env.VITE_FORMSPREE_ID as string | undefined)
    ?.replace(/^https?:\/\/formspree\.io\/f\//i, "");

  const confirm = () => {
    setSent(true);
    reset();
    window.setTimeout(() => setSent(false), 8000);
  };

  const onSubmit = async (values: FormValues) => {
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("email", values.email);
    payload.append("budget", values.budget || "—");
    payload.append("message", values.message);

    // Real backend: Formspree posts the form straight to the owner's inbox.
    if (FORMSPREE_URL) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_URL}`, {
          method: "POST",
          body: payload,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
        confirm();
        return;
      } catch {
        // Backend unreachable — fall back to the user's own mail client.
      }
    }
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(`Inquiry from ${values.name}`)}&body=${encodeURIComponent(
      [`Name: ${values.name}`, `Email: ${values.email}`, `Scope: ${values.budget || "—"}`, "", values.message].join("\n")
    )}`;
    confirm();
  };

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = person.resumeUrl || "/files/Reilee-Bryle-Ebuenga-Resume.pdf";
    a.download = "Reilee-Bryle-Ebuenga-Resume.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-charcoal text-ink">
      <div className="section-container py-16 lg:py-24">
        <Reveal>
          <p className="label flex items-center gap-3">
            <span className="text-electric">06</span>
            <span className="h-px w-8 bg-border" aria-hidden="true" />
            <span>Contact</span>
          </p>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* Invitation */}
          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.01em] text-ink sm:text-5xl">
                Let's{" "}
                <em className="italic text-electric">make</em> something worth keeping.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-md font-grotesk text-base leading-relaxed text-ink-soft">
                Tell me what you're building and where it hurts. I reply within two working days — usually with
                questions, occasionally with sketches.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={`mailto:${person.email}`}
                  className="group inline-flex items-center gap-3 text-xl text-ink transition-colors hover:text-electric"
                >
                  <Mail className="h-5 w-5 text-electric" />
                  {person.email}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <p className="inline-flex items-center gap-2 font-grotesk text-sm text-ink-soft">
                  <MapPin className="h-4 w-4 text-electric" />
                  {person.location} — working worldwide.
                </p>

                <button
                  onClick={downloadResume}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/5 px-5 py-3 font-grotesk text-[11px] font-medium uppercase tracking-[0.18em] text-electric transition-all duration-300 hover:border-electric hover:bg-electric/10"
                >
                  <Download className="h-4 w-4" />
                  Download Résumé
                </button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-10 flex gap-4">
                {person.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="chip group"
                    >
                      {s.label}
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="border border-border bg-paper p-6 sm:p-8" aria-label="Contact form">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label !text-ink-soft">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Ada Lovelace"
                      className="input"
                      {...register("name", { required: "Your name, please." })}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="mt-2 font-grotesk text-xs text-electric">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="label !text-ink-soft">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@studio.com"
                      className="input"
                      {...register("email", {
                        required: "An email so I can reply.",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "That email doesn't look right." },
                      })}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="mt-2 font-grotesk text-xs text-electric">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="mt-8">
                  <label htmlFor="budget" className="label !text-ink-soft">
                    Scope of work
                  </label>
                  <select
                    id="budget"
                    className="input"
                    defaultValue=""
                    {...register("budget")}
                  >
                    <option value="" disabled className="text-ink">
                      Choose one — or leave it to me
                    </option>
                    {BUDGET_OPTIONS.map((o) => (
                      <option key={o} value={o} className="text-ink">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-8">
                  <label htmlFor="message" className="label !text-ink-soft">
                    The problem *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="We're building a platform for... and the part that keeps breaking is..."
                    className="input resize-none"
                    {...register("message", {
                      required: "Tell me a little about it.",
                      minLength: { value: 20, message: "A sentence or two helps me reply well." },
                    })}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && (
                    <p className="mt-2 font-grotesk text-xs text-electric">{errors.message.message}</p>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-full bg-electric px-7 py-3.5 font-grotesk text-[11px] font-medium uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:bg-cyan hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] disabled:opacity-60"
                  >
                    {isSubmitting ? "Setting type..." : sent ? "Sent — noted!" : "Send inquiry"}
                    {sent ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </button>
                  <p className="font-grotesk text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    No newsletters, ever
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
