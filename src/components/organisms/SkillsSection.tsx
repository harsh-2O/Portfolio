import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { fadeUp, panelIn, softSpring } from '../../motion/variants';
import SectionHeader from '../molecules/SectionHeader';
import FilterPills, { type FilterOption } from '../molecules/FilterPills';
import SkillBars from '../molecules/SkillBars';
import RadarChart from '../molecules/RadarChart';
import { buildSkillGroups, type SkillGroup } from '../../data/skillGroups';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Stats = styled.dl`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin: 0 0 var(--section-inner-gap);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--border);
  overflow: hidden;

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Stat = styled.div`
  padding: 0.9rem 1.1rem;
  background: var(--background);

  dt {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  dd {
    margin: 0.25rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
`;

const Panel = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: start;
  padding-top: var(--section-inner-gap);
  border-top: 1px solid var(--border);

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const RadarPane = styled.div`
  min-width: 0;

  ${media.lg} {
    max-width: 420px;
    margin: 0 auto;
  }
`;

const Caption = styled.p`
  margin-top: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
  color: var(--text-faint);
`;

export default function SkillsSection() {
  const groups = useMemo(() => buildSkillGroups(), []);
  const [active, setActive] = useState<SkillGroup>(groups[0].group);
  const current = groups.find((g) => g.group === active) ?? groups[0];

  const stats = useMemo(() => {
    const all = groups.flatMap((g) => g.skills);
    const expert = all.filter((s) => s.level >= 85).length;
    const meetsDemand = all.filter((s) => s.level >= s.demand).length;
    return [
      { label: 'Technologies', value: `${all.length}` },
      { label: 'Groups', value: `${groups.length}` },
      { label: 'At or above demand', value: `${meetsDemand}` },
      { label: 'Expert level', value: `${expert}` },
    ];
  }, [groups]);

  const options = useMemo<FilterOption<SkillGroup>[]>(
    () => groups.map((g) => ({ value: g.group, label: g.group, count: g.skills.length })),
    [groups],
  );

  return (
    <Section
      aria-labelledby="tech-title"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <SectionHeader
        label="Stack"
        title="Tech Stack"
        titleId="tech-title"
        subtitle="Proficiency against 2026 industry demand. Select any skill for what it means in my work."
      >
        <FilterPills
          options={options}
          active={active}
          onChange={setActive}
          layoutId="skills-filter"
          label="Skill groups"
        />
      </SectionHeader>

      <Stats>
        {stats.map((s) => (
          <Stat key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </Stat>
        ))}
      </Stats>

      <AnimatePresence mode="wait">
        <Panel key={current.group} variants={panelIn} initial="hidden" animate="visible" exit="exit" layout transition={softSpring}>
          <RadarPane>
            <RadarChart skills={current.skills} />
            <Caption>
              {current.group} · avg {current.average}
            </Caption>
          </RadarPane>
          <SkillBars skills={current.skills} startDelay={0.1} />
        </Panel>
      </AnimatePresence>
    </Section>
  );
}
