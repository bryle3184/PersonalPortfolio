import { useState, useMemo } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import ProjectCard from "./ProjectCard";
import type { PortfolioData } from "../types";

const CATEGORIES = ["All Projects", "Full-Stack Development", "Web App", "Business Application", "Library System", "Inventory Management", "Personal Finance", "Communication", "Computer Vision", "Machine Learning", "Educational Technology"] as const;

export default function Projects({ projects }: { projects: PortfolioData["projects"] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section id="work" className="scroll-mt-20 border-b border-border">
      <div className="section-container py-16 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="05">Selected Works</SectionLabel>
            <p className="label">{projects.length} Projects</p>
          </div>
        </Reveal>

        {/* Category filters */}
        <Reveal delay={60}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 font-grotesk text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-electric text-paper shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                    : "border border-border text-ink-soft hover:border-electric/30 hover:text-electric"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project grid */}
        <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length === 0 ? (
            <Reveal delay={80} className="md:col-span-2 lg:col-span-3 text-center py-20">
              <p className="font-display text-xl text-ink-soft">No projects in this category yet.</p>
            </Reveal>
          ) : (
            filteredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))
          )}
        </div>

        <Reveal>
          <div className="mt-14 border-t border-border pt-8">
            <a href="#contact" className="btn-outline group">
              Have a project in mind?
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
