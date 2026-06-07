import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import SectionHeader from '../ui/SectionHeader';
import { skillCategories } from '../../data/skills';
import type { Skill } from '../../data/skills';
import { fadeUp, staggerContainer } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';

type SelectedSkill = {
  category: string;
  skill: Skill;
};

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
`;

const Category = styled(motion.div)`
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 1.5rem;
  background: var(--surface-elevated);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    opacity: 0.6;
    border-radius: 1.5rem 1.5rem 0 0;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-shadow-hover);
      border-color: var(--accent-line);
    }
  }
`;

const CategoryTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1.25rem;
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Pill = styled.button<{ $active?: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.45rem 0.9rem;
  min-height: 36px;
  border-radius: 100px;
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--accent-subtle)')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text-primary)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--card-border)')};
  transition: all var(--transition);
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: var(--accent);
    color: ${({ $active }) => ($active ? '#fff' : 'var(--accent)')};
    background: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--accent-subtle)')};
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

const SkillDetail = styled(motion.div)`
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-line);
`;

const DetailTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.35rem;
  letter-spacing: -0.01em;
`;

const DetailText = styled.p`
  font-size: var(--text-small);
  line-height: 1.55;
  color: var(--text-primary);
`;

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const detailVariant = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    marginTop: '1rem',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function SkillsSection() {
  const [selected, setSelected] = useState<SelectedSkill | null>(null);

  const toggleSkill = (category: string, skill: Skill) => {
    setSelected((prev) =>
      prev?.skill.name === skill.name && prev.category === category
        ? null
        : { category, skill },
    );
  };

  return (
    <Section
      id="tech-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <SectionHeader
        label="Stack"
        title="Technical skills"
        subtitle="Tap any skill to see what it means in my work — from low-latency C++ to 2026 AI-dev workflows."
      />

      <Grid variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {skillCategories.map((cat) => {
          const isActiveCategory = selected?.category === cat.title;

          return (
            <Category key={cat.title} variants={itemVariant}>
              <CategoryTitle>{cat.title}</CategoryTitle>
              <Pills>
                {cat.skills.map((skill) => (
                  <Pill
                    key={skill.name}
                    type="button"
                    $active={isActiveCategory && selected.skill.name === skill.name}
                    aria-pressed={isActiveCategory && selected.skill.name === skill.name}
                    aria-label={`${skill.name}: ${skill.description}`}
                    onClick={() => toggleSkill(cat.title, skill)}
                  >
                    {skill.name}
                  </Pill>
                ))}
              </Pills>

              <AnimatePresence initial={false}>
                {isActiveCategory && selected && (
                  <SkillDetail
                    key={selected.skill.name}
                    variants={detailVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    role="region"
                    aria-live="polite"
                    aria-label={`About ${selected.skill.name}`}
                  >
                    <DetailTitle>{selected.skill.name}</DetailTitle>
                    <DetailText>{selected.skill.description}</DetailText>
                  </SkillDetail>
                )}
              </AnimatePresence>
            </Category>
          );
        })}
      </Grid>
    </Section>
  );
}
