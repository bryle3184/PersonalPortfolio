import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

export default function Skills({ skills }: { skills: PortfolioData["techStack"] }) {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-border">
      <div className="section-container py-16 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="03">Tech Stack</SectionLabel>
            <p className="label">{skills.length} categories</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-charcoal md:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 80} className="h-full">
              <div className="group flex h-full flex-col bg-paper p-6 transition-colors hover:bg-electric/5">
                <p className="label">
                  <span className="text-electric">{String(gi + 1).padStart(2, "0")}</span> · {group.category}
                </p>
                <ul className="mt-6 flex grow flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 font-display text-lg text-ink sm:text-xl">
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 translate-y-[2px] text-electric opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-border pt-4 font-grotesk text-xs italic leading-relaxed text-ink-soft">
                  {group.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
