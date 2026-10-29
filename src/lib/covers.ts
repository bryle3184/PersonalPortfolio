import type { Cover, Project } from "../types";

interface CoverStyle {
  bg: string;
  text: string;
  chip: string;
  rule: string;
}

export const coverStyles: Record<Cover, CoverStyle> = {
  electric: {
    bg: "bg-electric",
    text: "text-paper",
    chip: "bg-paper/10",
    rule: "border-paper/15",
  },
  cyan: {
    bg: "bg-cyan",
    text: "text-paper",
    chip: "bg-paper/10",
    rule: "border-paper/15",
  },
  indigo: {
    bg: "bg-indigo",
    text: "text-paper",
    chip: "bg-paper/10",
    rule: "border-paper/15",
  },
  emerald: {
    bg: "bg-emerald",
    text: "text-paper",
    chip: "bg-paper/10",
    rule: "border-paper/15",
  },
  amber: {
    bg: "bg-amber",
    text: "text-ink",
    chip: "bg-ink/10",
    rule: "border-ink/15",
  },
  charcoal: {
    bg: "bg-charcoal",
    text: "text-paper",
    chip: "bg-paper/10",
    rule: "border-paper/15",
  },
};

/** Build the reading list for a project page: next project + related ones. */
export function resolveNextProjects(project: Project, all: Project[]): Project[] {
  const index = all.findIndex((p) => p.slug === project.slug);
  const related = project.related
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
  const rest = all.filter((p) => p.slug !== project.slug && !related.includes(p));
  const next = rest[index % rest.length];
  return [next, ...related].filter((p): p is Project => Boolean(p)).slice(0, 3);
}