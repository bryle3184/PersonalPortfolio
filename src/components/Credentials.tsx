import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

const TYPE_STYLES: Record<string, string> = {
  Degree: "bg-indigo/20 text-indigo",
  Cert: "bg-electric/20 text-electric",
  Award: "bg-cyan/20 text-cyan",
  Honoree: "bg-emerald/20 text-emerald",
  Finalist: "bg-amber/20 text-amber",
  Talk: "bg-paper/15 border border-border text-ink",
};

export default function Credentials({ credentials }: { credentials: PortfolioData["credentials"] }) {
  return (
    <section id="credentials" className="scroll-mt-20 border-b border-border">
      <div className="section-container py-16 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="05">Credentials</SectionLabel>
            <p className="label">Degrees & Certificates</p>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden border-t border-border">
          {credentials.map((c, i) => (
            <Reveal key={`${c.type}-${c.title}-${c.org}`} delay={i * 40}>
              <div className="grid gap-3 border-b border-border py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                <div className="sm:col-span-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 font-grotesk text-[10px] font-medium uppercase tracking-[0.14em] ${TYPE_STYLES[c.type] ?? "bg-ink/10 text-ink"}`}
                  >
                    {c.type}
                  </span>
                </div>
                <div className="sm:col-span-7">
                  <p className="font-display text-lg leading-snug text-ink sm:text-xl">{c.title}</p>
                </div>
                <div className="flex items-baseline justify-between gap-4 sm:col-span-3 sm:justify-end">
                  <span className="font-grotesk text-xs uppercase tracking-[0.14em] text-ink-soft">{c.org}</span>
                  <span className="font-grotesk text-xs tabular-nums text-electric">{c.year}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
