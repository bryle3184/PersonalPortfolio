import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import ProjectCard from "./ProjectCard";
import type { PortfolioData } from "../types";

export default function Projects({ projects }: { projects: PortfolioData["projects"] }) {
  return (
    <section id="work" className="scroll-mt-20 border-b border-ink/15">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="01">Selected works</SectionLabel>
            <p className="label">{projects.length} Projects — 2026</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 70} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} index={i} featured={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 border-t border-ink/15 pt-8">
            <Link to="#contact" className="btn-outline group">
              Have a project in mind?
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}