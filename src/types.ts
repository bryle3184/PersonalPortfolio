export type Cover = "electric" | "cyan" | "indigo" | "emerald" | "amber" | "charcoal";

export interface Person {
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  availability: string;
  resumeUrl: string;
  profileImage?: string;
  socials: { label: string; url: string }[];
  facts: { label: string; value: string }[];
}

export interface Hero {
  eyebrow: string;
  headline: string;
  subhead: string;
}

export interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  summary: string;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  period: string;
  honors?: string;
}

export interface Credential {
  type: string;
  title: string;
  org: string;
  year: string;
}

export interface TechStackCategory {
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
  /** Relative paths under /images/projects, e.g. ["meridian.png"]. */
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface PortfolioData {
  person: Person;
  hero: Hero;
  principles: string[];
  marquee: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  techStack: TechStackCategory[];
  credentials: Credential[];
  projects: Project[];
}