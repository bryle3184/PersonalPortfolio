import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

const TYPE_STYLES: Record<string, string> = {
  Award: "bg-vermilion text-paper",
  Honoree: "bg-ink text-paper",
  Finalist: "bg-brass text-ink",
  Degree: "bg-pine text-paper",
  Cert: "bg-olive text-paper",
  Talk: "bg-cream text-ink border border-ink/20",
};

export default function Credentials({ credentials }: { credentials: PortfolioData["credentials"] }) {
  return (
    <section id="credentials" className="scroll-mt-20 border-b border-ink/15">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="05">Credentials</SectionLabel>
            <p className="label">ledger — awards, degrees, talks</p>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden border-t border-ink/15">
          {credentials.map((c, i) => (
            <Reveal key={`${c.type}-${c.title}`} delay={i * 40}>
              <div className="grid gap-3 border-b border-ink/15 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
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
                  <span className="font-grotesk text-xs tabular-nums text-ink">{c.year}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}