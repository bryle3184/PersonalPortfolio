import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

export default function Skills({ skills }: { skills: PortfolioData["skills"] }) {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-ink/15">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="04">Capabilities</SectionLabel>
            <p className="label">three shelves, one practice</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 80} className="h-full">
              <div className="group flex h-full flex-col bg-paper p-6 transition-colors hover:bg-cream sm:p-8">
                <p className="label">
                  <span className="text-vermilion">{String(gi + 1).padStart(2, "0")}</span> · {group.category}
                </p>
                <ul className="mt-6 flex grow flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 font-display text-lg text-ink sm:text-xl">
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 translate-y-[2px] text-vermilion opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-ink/15 pt-4 font-grotesk text-xs italic leading-relaxed text-ink-soft">
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