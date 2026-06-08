export interface TimelineItem {
  title: string;
  subtitle?: string;
  date: string;
  gpa?: string;
  bullets?: string[];
}

export interface ExperienceSectionData {
  number: string;
  title: string;
  items: TimelineItem[];
}

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  year: string;
  tags: string[];
  highlights: ProjectHighlight[];
  bullets: string[];
  /** Accent used for card thumbnail backdrop */
  accent: string;
  /** Public GitHub repository URL, when available */
  repoUrl?: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  /** LinkedIn relationship context, e.g. "Managed Harsh directly · Jul 2025" */
  context?: string;
  linkedin?: string;
}

export interface TechStackItem {
  name: string;
  icon: string;
  colorIcon: string;
}

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  accent: string;
  /** Key points shown in the card preview */
  highlights: string[];
  content: string[];
}

export type NavSection = 'home' | 'resume' | 'projects' | 'blog' | 'contact';
