export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "ai"
  | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  years: number;
  projects: number;
  icon: string;
}

export interface OrbitTech {
  name: string;
  icon: string;
  color: string;
  description: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tech: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  timeline: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  coverImage: string;
}

export type ChatMessageKind = "text" | "projects" | "skills" | "about" | "contact";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  kind?: ChatMessageKind;
}

export interface GithubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  createdAt: string;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
}
