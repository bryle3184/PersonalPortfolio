import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { coverStyles } from "../lib/covers";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

/** A project cover drawn entirely in type and colour — no images needed. */
export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const c = coverStyles[project.cover];
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block"
      aria-label={`${project.title} — ${project.category}`}
    >
      {/* Cover block */}
      <div className={`relative overflow-hidden ${c.bg} ${c.text} ${featured ? "aspect-[2/1] sm:aspect-[10/5]" : "aspect-[4/3]"}`}>
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
          <div className={`flex items-start justify-between gap-4 ${c.text}`}>
            <span className={`${c.chip} rounded-full px-3 py-1 font-grotesk text-[10px] uppercase tracking-[0.16em]`}>
              {num} — {project.category}
            </span>
            <span className="font-grotesk text-xs uppercase tracking-[0.16em] opacity-80">{project.year}</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <h3
              className={`font-display leading-[0.95] tracking-[-0.01em] ${featured ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}
            >
              {project.title}
            </h3>
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${c.chip} transition-transform duration-300 group-hover:rotate-45`}
            >
              <ArrowUpRight className={`h-5 w-5 ${c.text}`} />
            </span>
          </div>
        </div>
        {/* hover wash */}
        <div className="pointer-events-none absolute inset-0 bg-ink opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]" />
      </div>

      {/* Meta row */}
      <div className={`flex items-baseline justify-between border-b border-ink/15 pt-3 ${c.rule}`}>
        <span className="font-display text-base italic text-ink">{project.summary}</span>
        <span className="shrink-0 font-grotesk text-[11px] uppercase tracking-[0.16em] text-ink-soft">
          {project.role.split(",")[0]}
        </span>
      </div>
    </Link>
  );
}