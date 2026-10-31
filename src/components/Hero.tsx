import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import type { PortfolioData } from "../types";

interface HeroProps {
  person: PortfolioData["person"];
  hero: PortfolioData["hero"];
  marquee: string[];
}

export default function Hero({ person, hero, marquee }: HeroProps) {
  return (
    <header id="top" className="relative border-b border-border">
      <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-15 sm:px-8 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Hero text */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="SOFTWARE DEVELOPER ·">
                {hero.eyebrow}
              </SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 font-display text-4xl font-bold leading-[1.02] tracking-[-0.01em] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                {hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl font-grotesk text-lg leading-relaxed text-ink-soft sm:text-xl">
                {hero.subhead}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#work" className="btn-solid group">
                  Explore My Work
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="#contact" className="btn-outline group">
                  Contact Me
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <button
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = person.resumeUrl || "/files/Reilee-Bryle-Ebuenga-Resume.pdf";
                    a.download = "Reilee-Bryle-Ebuenga-Resume.pdf";
                    a.target = "_blank";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-electric/30 px-5 py-3 font-grotesk text-[11px] font-medium uppercase tracking-[0.18em] text-electric transition-all duration-300 hover:border-electric hover:bg-electric/10"
                >
                  Download Résumé
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href={person.socials[0]?.url || "https://github.com/bryle3184"}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-electric"
                >
                  <ArrowUpRight className="h-4 w-4 text-electric" />
                  GitHub Profile
                </a>
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-electric/10 blur-[60px]"></div>
                  <div className="absolute -inset-1 rounded-full border-2 border-electric/20"></div>
                  <div className="absolute -inset-0.5 rounded-full border border-electric/10"></div>

                  <img
                    src={person.profileImage || "/images/profile.png"}
                    alt="Reilee Bryle Ebuenga - Software Developer"
                    className="relative h-72 w-72 rounded-full object-cover object-center ring-2 ring-electric/30 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                    loading="eager"
                    onLoad={(e) => {
                      e.currentTarget.classList.add("loaded");
                    }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Marquee / Practice keywords */}
        <Reveal delay={360}>
          <div className="mt-20 overflow-hidden border-y border-border py-3">
            <p className="animate-marquee whitespace-nowrap font-grotesk text-[11px] uppercase tracking-[0.3em] text-ink-soft">
              {marquee.join("  ·  ")}
            </p>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
