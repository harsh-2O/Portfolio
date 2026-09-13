import { CONTACT, RESUME } from '../config/site';
import { blogPosts } from './blog';
import { projects } from './projects';
import { SECTION_SPECS } from './navigation';
import { copyText } from '../lib/clipboard';
import { emit } from '../lib/events';
import { scrollToSection } from '../lib/scroll';

export type CommandKind = 'section' | 'action' | 'project' | 'post';

export interface CommandContext {
  toggleTheme: () => void;
}

export interface Command {
  id: string;
  kind: CommandKind;
  label: string;
  /** Secondary text shown right-aligned in mono. */
  hint?: string;
  keywords?: string[];
  run: (ctx: CommandContext) => void;
}

const openExternal = (href: string) => () =>
  window.open(href, '_blank', 'noopener,noreferrer');

export function buildCommands({ isDarkMode }: { isDarkMode: boolean }): Command[] {
  const sections: Command[] = SECTION_SPECS.filter((s) => s.label).map((s) => ({
    id: `section-${s.id}`,
    kind: 'section',
    label: s.label as string,
    hint: 'Section',
    run: () => scrollToSection(s.id),
  }));

  const actions: Command[] = [
    {
      id: 'copy-email',
      kind: 'action',
      label: 'Copy email',
      hint: CONTACT.email,
      keywords: ['mail', 'contact', 'address'],
      run: () => void copyText(CONTACT.email),
    },
    {
      id: 'copy-phone',
      kind: 'action',
      label: 'Copy phone',
      hint: CONTACT.phone,
      keywords: ['number', 'call', 'contact'],
      run: () => void copyText(CONTACT.phone),
    },
    {
      id: 'download-resume',
      kind: 'action',
      label: 'Download resume',
      hint: 'PDF',
      keywords: ['cv', 'pdf', 'curriculum'],
      run: openExternal(RESUME.url),
    },
    {
      id: 'toggle-theme',
      kind: 'action',
      label: isDarkMode ? 'Switch to light theme' : 'Switch to dark theme',
      hint: 'Theme',
      keywords: ['dark', 'light', 'mode', 'appearance'],
      run: (ctx) => ctx.toggleTheme(),
    },
    {
      id: 'github',
      kind: 'action',
      label: 'Open GitHub',
      hint: 'github.com/harsh-2O',
      keywords: ['code', 'repos', 'source'],
      run: openExternal(CONTACT.github),
    },
    {
      id: 'linkedin',
      kind: 'action',
      label: 'Open LinkedIn',
      hint: 'linkedin.com/in/harsh2o',
      keywords: ['profile', 'network'],
      run: openExternal(CONTACT.linkedin),
    },
    {
      id: 'leetcode',
      kind: 'action',
      label: 'Open LeetCode',
      hint: 'leetcode.com/u/JamesHiding',
      keywords: ['problems', 'algorithms'],
      run: openExternal(CONTACT.leetcode),
    },
  ];

  const work: Command[] = projects.map((p) => ({
    id: `project-${p.id}`,
    kind: 'project',
    label: p.title,
    hint: p.year,
    keywords: [...p.tags, p.category],
    run: () => {
      scrollToSection('projects-section');
      emit('open-project', { id: p.id });
    },
  }));

  const posts: Command[] = blogPosts.map((p) => ({
    id: `post-${p.id}`,
    kind: 'post',
    label: p.title,
    hint: p.date,
    keywords: p.tags,
    run: () => {
      scrollToSection('blog-section');
      emit('open-blog', { id: p.id });
    },
  }));

  return [...sections, ...actions, ...work, ...posts];
}
