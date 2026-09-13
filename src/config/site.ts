/** Single source of truth for public site URL and contact details. */
export const SITE_URL = 'https://portfolio-delta-one-30.vercel.app';

export const CONTACT = {
  email: 'harsh.mehta@tamu.edu',
  phone: '+91 9725682374',
  linkedin: 'https://www.linkedin.com/in/harsh2o',
  github: 'https://github.com/harsh-2O',
  leetcode: 'https://leetcode.com/u/JamesHiding',
  portfolio: 'https://portfolio-delta-one-30.vercel.app',
} as const;

export const RESUME = {
  url: '/assets/resume/resume.pdf',
  fileName: 'Harsh-Mehta-Resume.pdf',
} as const;

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: CONTACT.github },
  { label: 'LinkedIn', href: CONTACT.linkedin },
  { label: 'LeetCode', href: CONTACT.leetcode },
] as const;

/** Hero copy — every fact here also appears in the experience, skills or certification data. */
export const HERO = {
  role: 'Quant Tools Developer',
  lede:
    'Building trading systems, market data infrastructure, and AI-powered tooling across 12 global exchanges at Graviton Research Capital.',
} as const;

/** Status chip — edit here, renders as "Currently: now → next". */
export const STATUS = {
  label: 'Currently',
  now: 'Graviton Research · Gurugram',
  next: 'Texas A&M · Fall 2026',
} as const;

export const HERO_FACTS = [
  { key: 'Exchanges', value: '12' },
  { key: 'Stack', value: 'C++ · Python · Go' },
  { key: 'Focus', value: 'Market data · PnL · Alpha frameworks' },
] as const;
