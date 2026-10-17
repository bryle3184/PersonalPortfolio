export type Cover = "vermilion" | "ink" | "olive" | "pine" | "brass" | "cream";

export interface Person {
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  availability: string;
  resumeUrl: string;
  socials: { label: string; url: string }[];
  facts: { label: string; value: string }[];
}

export interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  summary: string;
  tags: string[];
}

export interface Credential {
  type: string;
  title: string;
  org: string;
  year: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
  note: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  duration: string;
  cover: Cover;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  features: string[];
  technologies: string[];
  stats: { value: string; label: string }[];
  related: string[];
  /** Relative paths under /src/images/projects, e.g. ["meridian.png"]. */
  images?: string[];
}

export interface PortfolioData {
  person: Person;
  principles: string[];
  marquee: string[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  credentials: Credential[];
  projects: Project[];
}