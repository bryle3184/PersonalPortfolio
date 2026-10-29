import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

interface AboutProps {
  person: PortfolioData["person"];
  principles: string[];
}

export default function About({ person, principles }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-20 border-b border-border">
      <div className="section-container py-16 lg:py-24">
        <Reveal>
          <SectionLabel index="02">About</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* Statement */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <p className="font-display text-3xl font-light leading-[1.15] tracking-[-0.01em] text-ink sm:text-4xl">
                I'm <em className="italic text-electric">Reilee Bryle Ebuenga</em>, a computer programming graduate focused on building useful software applications, intuitive web experiences, and database-driven systems.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl font-grotesk text-base leading-relaxed text-ink-soft">
                {person.bio}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-charcoal sm:grid-cols-3">
                {person.facts.map((f) => (
                  <div key={f.label} className="bg-paper p-4">
                    <dt className="label text-[10px]">{f.label}</dt>
                    <dd className="mt-2 font-display text-sm text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Principles */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="border border-border bg-charcoal p-6 sm:p-8">
                <p className="label">Principles</p>
                <ol className="mt-6 space-y-5">
                  {principles.map((p, i) => (
                    <li key={p} className="flex gap-4 border-t border-border pt-4">
                      <span className="font-grotesk text-xs text-electric tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl italic text-ink">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
