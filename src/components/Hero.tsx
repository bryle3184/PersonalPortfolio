import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

interface HeroProps {
  person: PortfolioData["person"];
  marquee: string[];
}

const CONTENTS = [
  { n: "01", label: "Selected works", note: "6 artefacts", id: "work" },
  { n: "02", label: "About & principles", note: "a colophon", id: "about" },
  { n: "03", label: "Experience", note: "2015 — present", id: "experience" },
  { n: "04", label: "Capabilities", note: "three shelves", id: "skills" },
  { n: "05", label: "Credentials", note: "ledger", id: "credentials" },
  { n: "06", label: "Contact", note: "open a thread", id: "contact" },
];

export default function Hero({ person, marquee }: HeroProps) {
  return (
    <header id="top" className="border-b border-ink/15">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-[6.5rem] sm:px-8 lg:pb-24 lg:pt-[8.5rem]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Masthead */}
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="Vol. 06 — 2026">Independent practice</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-8 font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] sm:text-6xl xl:text-[5.25rem]">
                Digital artefacts,
                <br />
                drawn like{" "}
                <em className="font-[400] italic text-vermilion">printed matter</em>.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-xl font-grotesk text-base leading-relaxed text-ink-soft sm:text-lg">
                {person.bio}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 flex items-center gap-3 font-grotesk text-sm text-ink">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermilion opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermilion" />
                </span>
                {person.availability}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#contact" className="btn-solid">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#work" className="btn-outline">
                  See selected works
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Contents — editorial index */}
          <div className="lg:col-span-4">
            <Reveal delay={200}>
              <nav className="border-t border-ink/15">
                <p className="label py-4">Contents</p>
                <ul>
                  {CONTENTS.map((c) => (
                    <li key={c.n} className="border-t border-ink/15">
                      <a href={`#${c.id}`} className="group flex items-baseline justify-between gap-4 py-3.5">
                        <span className="flex items-baseline gap-3">
                          <span className="font-grotesk text-xs text-vermilion tabular-nums">{c.n}</span>
                          <span className="font-display text-base text-ink transition-colors group-hover:text-vermilion">
                            {c.label}
                          </span>
                        </span>
                        <span className="hidden font-grotesk text-[10px] uppercase tracking-[0.16em] text-ink-soft sm:block">
                          {c.note}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          </div>
        </div>

        {/* Practice keywords */}
        <Reveal delay={360}>
          <div className="mt-16 hidden overflow-hidden border-y border-ink/15 py-2 lg:block">
            <p className="text-center font-grotesk text-[11px] uppercase tracking-[0.3em] text-ink-soft">
              {marquee.join("  ·  ")}
            </p>
          </div>
        </Reveal>
      </div>
    </header>
  );
}