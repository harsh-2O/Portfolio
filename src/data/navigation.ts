import type { NavSection } from '../types';

export interface NavItem {
  section: NavSection;
  label: string;
  targetId: string;
  index: string;
}

/** Pill-nav entries, in display order. */
export const NAV_ITEMS: NavItem[] = [
  { section: 'home', label: 'Home', targetId: 'main-section', index: '01' },
  { section: 'resume', label: 'Resume', targetId: 'resume-section', index: '02' },
  { section: 'projects', label: 'Work', targetId: 'projects-section', index: '03' },
  { section: 'blog', label: 'Blog', targetId: 'blog-section', index: '04' },
  { section: 'contact', label: 'Contact', targetId: 'footer-section', index: '05' },
];

export interface SectionSpec {
  /** DOM id of the section wrapper. */
  id: string;
  /** Nav item highlighted while this section is in view. */
  nav: NavSection;
  /** Shown in the command palette; omit for decorative strips. */
  label?: string;
}

/** Every section on the page, top to bottom. Drives scroll-spy and the palette. */
export const SECTION_SPECS: SectionSpec[] = [
  { id: 'main-section', nav: 'home', label: 'Home' },
  { id: 'resume-section', nav: 'resume', label: 'Resume' },
  { id: 'certifications-section', nav: 'resume', label: 'Certifications' },
  { id: 'tech-section', nav: 'resume', label: 'Tech Stack' },
  { id: 'workflow-section', nav: 'resume', label: 'Dev Workflow' },
  { id: 'projects-section', nav: 'projects', label: 'Work' },
  { id: 'marquee-section', nav: 'projects' },
  { id: 'blog-section', nav: 'blog', label: 'Blog' },
  { id: 'testimonials-section', nav: 'blog', label: 'Recommendations' },
  { id: 'footer-section', nav: 'contact', label: 'Contact' },
];
