import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** A project card with thumbnail, title, summary, and technology badges. */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");

  // Get the first screenshot or fallback to cover color
  const coverImage = project.images && project.images.length > 0
    ? `/images/projects/${project.images[0]}`
    : null;

  const getCategoryBadge = () => {
    const cat = project.category.toLowerCase();
    if (cat.includes("machine learning")) return "bg-indigo/20 text-indigo";
    if (cat.includes("computer vision")) return "bg-emerald/20 text-emerald";
    if (cat.includes("web")) return "bg-electric/20 text-electric";
    if (cat.includes("finance")) return "bg-cyan/20 text-cyan";
    if (cat.includes("system")) return "bg-amber/20 text-amber";
    return "bg-electric/20 text-electric";
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block"
      aria-label={`${project.title} — ${project.category}`}
    >
      <div className="card">
        {/* Cover image or color block */}
        {coverImage ? (
          <div className="relative aspect-[16/9] overflow-hidden bg-charcoal">
            <img
              src={coverImage}
              alt={project.title}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add("loaded")}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        ) : (
          <div className="flex aspect-[16/9] items-end justify-between p-5 bg-charcoal">
            <span className="font-grotesk text-xs text-electric/60 tabular-nums">{num}</span>
            <span className={`rounded-full px-3 py-1 ${getCategoryBadge()}`}>
              {project.category}
            </span>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-light text-ink transition-colors group-hover:text-electric sm:text-2xl">
              {project.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-electric/60 transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          <p className="mt-3 font-grotesk text-sm leading-relaxed text-ink-soft">
            {project.summary}
          </p>

          {/* Technology badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-electric/20 bg-electric/5 px-3 py-1 font-grotesk text-[10px] font-medium uppercase tracking-[0.14em] text-electric/80"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="inline-flex items-center rounded-full border border-electric/20 bg-electric/5 px-3 py-1 font-grotesk text-[10px] font-medium uppercase tracking-[0.14em] text-electric/80">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
            <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-ink-soft">
              {project.year} · {project.category}
            </span>
            <span className="font-display text-sm italic text-electric">
              View Case Study →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
