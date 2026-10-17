import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight, Check, Mail, MapPin } from "lucide-react";
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
    ?.replace(/^https?:\/\/formspree\.io\/f\//i, ""); // accept either the ID or the full endpoint

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

  return (
    <section id="contact" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <p className="label flex items-center gap-3">
            <span className="text-vermilion">06</span>
            <span className="h-px w-8 bg-paper/25" aria-hidden="true" />
            <span>Contact</span>
          </p>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* Invitation */}
          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.01em] sm:text-5xl">
                Let's make something{" "}
                <em className="italic text-vermilion">worth keeping</em>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md font-grotesk text-base leading-relaxed text-paper/70">
                Tell me what you're building and where it hurts. I reply within two working days — usually with
                questions, occasionally with sketches.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-4 text-paper/80">
                <a
                  href={`mailto:${person.email}`}
                  className="group inline-flex w-fit items-center gap-3 border-b border-paper/25 pb-2 font-display text-xl italic text-paper transition-colors hover:border-vermilion hover:text-vermilion"
                >
                  <Mail className="h-5 w-5" />
                  {person.email}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <p className="inline-flex items-center gap-2 font-grotesk text-sm text-paper/60">
                  <MapPin className="h-4 w-4" />
                  {person.location} — working worldwide.
                </p>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <ul className="mt-10 flex flex-wrap gap-3">
                {person.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="chip !border-paper/20 !text-paper/70 hover:!border-vermilion hover:!text-vermilion"
                    >
                      {s.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="border border-paper/20 p-6 sm:p-8" aria-label="Contact form">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label !text-paper/60">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Ada Lovelace"
                      className="input !text-paper placeholder:!text-paper/30"
                      style={{ borderColor: "color-mix(in srgb, #faf6ea 25%, transparent)" }}
                      {...register("name", { required: "Your name, please." })}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="mt-2 font-grotesk text-xs text-vermilion">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="label !text-paper/60">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@studio.com"
                      className="input !text-paper placeholder:!text-paper/30"
                      style={{ borderColor: "color-mix(in srgb, #faf6ea 25%, transparent)" }}
                      {...register("email", {
                        required: "An email so I can reply.",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "That email doesn't look right." },
                      })}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="mt-2 font-grotesk text-xs text-vermilion">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="mt-8">
                  <label htmlFor="budget" className="label !text-paper/60">
                    Scope of work
                  </label>
                  <select
                    id="budget"
                    className="input !text-paper"
                    defaultValue=""
                    style={{ borderColor: "color-mix(in srgb, #faf6ea 25%, transparent)" }}
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
                  <label htmlFor="message" className="label !text-paper/60">
                    The problem *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="We're building a platform for… and the part that keeps breaking is…"
                    className="input resize-none !text-paper placeholder:!text-paper/30"
                    style={{ borderColor: "color-mix(in srgb, #faf6ea 25%, transparent)" }}
                    {...register("message", {
                      required: "Tell me a little about it.",
                      minLength: { value: 20, message: "A sentence or two helps me reply well." },
                    })}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && (
                    <p className="mt-2 font-grotesk text-xs text-vermilion">{errors.message.message}</p>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-vermilion px-7 py-3.5 font-grotesk text-[11px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-60"
                  >
                    {isSubmitting ? "Setting type…" : sent ? "Sent — noted!" : "Send inquiry"}
                    {sent ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </button>
                  <p className="font-grotesk text-[11px] uppercase tracking-[0.14em] text-paper/40">
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