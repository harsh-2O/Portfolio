import { skillCategories, type Skill } from './skills';

/** The four groups the stack is presented in, in display order. */
export const SKILL_GROUPS = [
  'Languages',
  'Systems · Cloud · Data',
  'Quant & Trading',
  'AI & Tooling',
] as const;

export type SkillGroup = (typeof SKILL_GROUPS)[number];

/**
 * Skills that move out of their authored category. Everything unlisted falls
 * back to the mapping of its source category below. Levels and demand numbers
 * are never changed here — only where a skill is shown.
 */
const OVERRIDES: Record<string, SkillGroup> = {
  'Statistical Modeling': 'Quant & Trading',
  'Time Series Analysis': 'Quant & Trading',
  'Risk Modeling': 'Quant & Trading',
  'Low-latency Systems': 'Quant & Trading',
};

const CATEGORY_TO_GROUP: Record<string, SkillGroup> = {
  'Languages & Frameworks': 'Languages',
  'AI / ML & Quant': 'AI & Tooling',
  'AI Dev Tools · 2026': 'AI & Tooling',
  'Systems, Cloud & Data': 'Systems · Cloud · Data',
};

export interface GroupedSkills {
  group: SkillGroup;
  skills: Skill[];
  /** Mean proficiency across the group, rounded. */
  average: number;
}

/** Regroups the authored categories into the four presentation groups. */
export function buildSkillGroups(): GroupedSkills[] {
  const buckets = new Map<SkillGroup, Skill[]>(SKILL_GROUPS.map((g) => [g, []]));

  for (const category of skillCategories) {
    const fallback = CATEGORY_TO_GROUP[category.title] ?? 'AI & Tooling';
    for (const skill of category.skills) {
      const group = OVERRIDES[skill.name] ?? fallback;
      buckets.get(group)?.push(skill);
    }
  }

  return SKILL_GROUPS.map((group) => {
    const skills = (buckets.get(group) ?? []).slice().sort((a, b) => b.level - a.level);
    const average = skills.length
      ? Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length)
      : 0;
    return { group, skills, average };
  }).filter((g) => g.skills.length > 0);
}
