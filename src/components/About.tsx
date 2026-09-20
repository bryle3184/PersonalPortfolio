import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

interface AboutProps {
  person: PortfolioData["person"];
  principles: string[];
}

export default function About({ person, principles }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-20 border-b border-ink/15">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <SectionLabel index="02">About &amp; principles</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* Statement */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <p className="font-display text-3xl font-light leading-[1.15] tracking-[-0.01em] sm:text-4xl">
                I care about the <em className="italic text-vermilion">objects people live with</em> — the screens,
                systems, and printed things that shape the texture of a working day.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl font-grotesk text-base leading-relaxed text-ink-soft">
                {person.bio} The overlap of editorial craft and product thinking is where I do my best work: interfaces
                with a point of view, identities with a spine, systems that hold a thousand screens together without
                crushing the first one.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-4">
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
              <div className="border border-ink/15 bg-cream p-6 sm:p-8">
                <p className="label">The working method</p>
                <ol className="mt-6 space-y-5">
                  {principles.map((p, i) => (
                    <li key={p} className="flex gap-4 border-t border-ink/15 pt-4">
                      <span className="font-grotesk text-xs text-vermilion tabular-nums">{String(i + 1).padStart(2, "0")}</span>
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