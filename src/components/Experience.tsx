import { ArrowDownRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

export default function Experience({ experience }: { experience: PortfolioData["experience"] }) {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-ink/15">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="03">Experience</SectionLabel>
            <p className="label">{experience.length} engagements</p>
          </div>
        </Reveal>

        <div className="mt-10">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 60}>
              <article className="group grid gap-4 border-t border-ink/15 py-8 transition-colors last:border-b sm:grid-cols-12 sm:gap-6">
                <p className="font-grotesk text-xs uppercase tracking-[0.18em] text-ink-soft sm:col-span-3">
                  {e.period}
                </p>
                <div className="sm:col-span-6">
                  <h3 className="font-display text-2xl text-ink transition-colors group-hover:text-vermilion sm:text-3xl">
                    {e.role}
                  </h3>
                  <p className="mt-1 font-grotesk text-sm font-semibold uppercase tracking-[0.14em] text-ink">
                    {e.org}
                  </p>
                  <p className="mt-3 max-w-xl font-grotesk text-sm leading-relaxed text-ink-soft">{e.summary}</p>
                </div>
                <div className="flex flex-wrap content-start gap-2 sm:col-span-3 sm:justify-end">
                  {e.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10">
            <a href="#contact" className="btn-outline group">
              Request the full CV
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}