import type { Cover, Project } from "../types";

interface CoverStyle {
  bg: string;
  text: string;
  chip: string;
  rule: string;
}

export const coverStyles: Record<Cover, CoverStyle> = {
  vermilion: {
    bg: "bg-vermilion",
    text: "text-paper",
    chip: "bg-paper/15",
    rule: "border-paper/20",
  },
  cream: {
    bg: "bg-cream",
    text: "text-ink",
    chip: "bg-ink/10",
    rule: "border-ink/15",
  },
  ink: {
    bg: "bg-ink",
    text: "text-paper",
    chip: "bg-paper/15",
    rule: "border-paper/20",
  },
  olive: {
    bg: "bg-olive",
    text: "text-cream",
    chip: "bg-cream/15",
    rule: "border-cream/20",
  },
  pine: {
    bg: "bg-pine",
    text: "text-paper",
    chip: "bg-paper/15",
    rule: "border-paper/20",
  },
  brass: {
    bg: "bg-brass",
    text: "text-ink",
    chip: "bg-ink/10",
    rule: "border-ink/15",
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