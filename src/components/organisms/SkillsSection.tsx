import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import SectionHeader from '../molecules/SectionHeader';
import { skillCategories } from '../../data/skills';
import type { Skill } from '../../data/skills';
import { fadeUp, staggerContainer, staggerItem } from '../../styles/animations';
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
  gap: var(--block-gap);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--section-inner-gap);
  }
`;

const Category = styled(motion.div)<{ $accent: string }>`
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: var(--card-radius, 1.5rem);
  background: var(--surface-elevated);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow), var(--card-highlight);
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ $accent }) => $accent} 0%, ${({ $accent }) => `${$accent}66`} 55%, transparent 100%);
    border-radius: inherit;
    pointer-events: none;
    transition: height 0.4s ease;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);
      box-shadow: var(--card-shadow-hover);
      border-color: ${({ $accent }) => `${$accent}40`};

      &::before { height: 4px; }
    }
  }
`;

const CategoryTitle = styled.h4<{ $accent: string }>`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Pill = styled.button<{ $active?: boolean; $accent: string }>`
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.375rem 0.8rem;
  min-height: 34px;
  border-radius: 100px;
  background: ${({ $active, $accent }) => ($active ? $accent : `${$accent}14`)};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text-primary)')};
  border: 1px solid ${({ $active, $accent }) => ($active ? $accent : 'var(--card-border)')};
  transition: all var(--transition);
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: ${({ $accent }) => $accent};
    color: ${({ $active }) => ($active ? '#fff' : 'var(--text-primary)')};
    background: ${({ $active, $accent }) => ($active ? $accent : `${$accent}22`)};
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

const SkillDetail = styled(motion.div)<{ $accent: string }>`
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
  background: ${({ $accent }) => `${$accent}12`};
  border: 1px solid ${({ $accent }) => `${$accent}40`};
`;

const DetailTitle = styled.p<{ $accent: string }>`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
  margin-bottom: 0.35rem;
  letter-spacing: -0.01em;
`;

const DetailText = styled.p`
  font-size: var(--text-small);
  line-height: 1.55;
  color: var(--text-primary);
`;

const itemVariant = staggerItem;

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
          <Category key={cat.title} $accent={cat.accent} variants={itemVariant}>
            <CategoryTitle $accent={cat.accent}>{cat.title}</CategoryTitle>
              <Pills>
                {cat.skills.map((skill) => (
                  <Pill
                    key={skill.name}
                    type="button"
                    $accent={cat.accent}
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
                    $accent={cat.accent}
                    variants={detailVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    role="region"
                    aria-live="polite"
                    aria-label={`About ${selected.skill.name}`}
                  >
                    <DetailTitle $accent={cat.accent}>{selected.skill.name}</DetailTitle>
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
