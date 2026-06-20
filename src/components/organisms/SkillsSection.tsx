import { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import SectionHeader from '../molecules/SectionHeader';
import { skillCategories } from '../../data/skills';
import type { Skill } from '../../data/skills';
import { fadeUp, staggerContainer } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

/* ── Types ───────────────────────────────────────────────────────── */

type SelectedSkill = { category: string; skill: Skill };

/* ── Section layout ──────────────────────────────────────────────── */

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: clamp(1.5rem, 3vw, 2rem);
  align-items: start;

  ${media.lg} {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1400px) {
    grid-template-columns: 300px 1fr;
  }
`;

/* ── Category sidebar ────────────────────────────────────────────── */

const CategoryNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: sticky;
  top: calc(var(--header-height) + 1.5rem);

  ${media.lg} {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    padding-bottom: 4px;
  }
`;

const CategoryTab = styled.button<{ $active: boolean; $accent: string }>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: 1px solid
    ${({ $active, $accent }) => ($active ? `${$accent}45` : 'var(--card-border)')};
  background: ${({ $active, $accent }) =>
    $active ? `${$accent}12` : 'var(--surface)'};
  color: ${({ $active }) =>
    $active ? 'var(--text-primary)' : 'var(--text-muted)'};
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  transition: all var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $accent }) => `${$accent}35`};
      background: ${({ $accent }) => `${$accent}0a`};
      color: var(--text-primary);
    }
  }

  ${media.lg} {
    flex-shrink: 0;
    padding: 0.6rem 0.9rem;
    border-radius: 100px;
  }
`;

const TabIcon = styled.span`
  font-size: 1.15rem;
  line-height: 1;
`;

const TabLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 550;
  letter-spacing: -0.01em;
`;

const TabCount = styled.span<{ $accent: string }>`
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: auto;
  padding: 0.15rem 0.45rem;
  border-radius: 100px;
  background: ${({ $accent }) => `${$accent}18`};
  color: ${({ $accent }) => $accent};

  ${media.lg} {
    margin-left: 0.25rem;
  }
`;

/* ── 3D tilt container ───────────────────────────────────────────── */

const TiltContainer = styled.div`
  perspective: 1200px;
`;

const TiltCard = styled(motion.div)<{ $accent: string }>`
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 1.5rem;
  background: var(--surface-elevated);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow), var(--card-highlight);
  position: relative;
  overflow: hidden;
  isolation: isolate;
  transform-style: preserve-3d;
  will-change: transform;
  transition: box-shadow 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ $accent }) => $accent},
      ${({ $accent }) => `${$accent}66`} 55%,
      transparent
    );
  }

  &:hover {
    box-shadow: var(--card-shadow-hover);
  }
`;

const GlowOrb = styled.div<{ $x: number; $y: number; $accent: string; $visible: boolean }>`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ $accent }) => `${$accent}18`} 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

/* ── Skill bars ──────────────────────────────────────────────────── */

const CategoryLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 1;
`;

const CategoryTitle = styled.h4<{ $accent: string }>`
  font-family: var(--font-display);
  font-size: clamp(1.1rem, calc(1vw + 0.85rem), 1.35rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
`;

const SkillCount = styled.span<{ $accent: string }>`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 100px;
  background: ${({ $accent }) => `${$accent}14`};
  color: ${({ $accent }) => $accent};
`;

const SkillList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: relative;
  z-index: 1;
`;

const SkillRow = styled(motion.button)<{
  $active: boolean;
  $accent: string;
}>`
  display: grid;
  grid-template-columns: minmax(100px, 140px) 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid
    ${({ $active, $accent }) =>
      $active ? `${$accent}40` : 'transparent'};
  background: ${({ $active, $accent }) =>
    $active ? `${$accent}0c` : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      background: ${({ $accent }) => `${$accent}08`};
      border-color: ${({ $accent }) => `${$accent}20`};
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  ${media.sm} {
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
  }
`;

const SkillName = styled.span<{ $active: boolean }>`
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: var(--text-primary);
  letter-spacing: -0.01em;
  transition: font-weight 0.15s ease;
`;

const BarTrack = styled.div`
  height: 6px;
  border-radius: 100px;
  background: var(--tech-item-bg);
  overflow: hidden;
  position: relative;

  ${media.sm} {
    display: none;
  }
`;

const BarFill = styled(motion.div)<{ $accent: string }>`
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(
    90deg,
    ${({ $accent }) => $accent},
    ${({ $accent }) => `${$accent}88`}
  );
`;

const LevelLabel = styled.span<{ $accent: string }>`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ $accent }) => $accent};
  min-width: 30px;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

/* ── Skill detail panel ──────────────────────────────────────────── */

const DetailPanel = styled(motion.div)<{ $accent: string }>`
  margin-top: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
  background: ${({ $accent }) => `${$accent}0c`};
  border: 1px solid ${({ $accent }) => `${$accent}30`};
  position: relative;
  z-index: 1;
`;

const DetailTitle = styled.p<{ $accent: string }>`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
  margin-bottom: 0.3rem;
  letter-spacing: -0.01em;
`;

const DetailText = styled.p`
  font-size: var(--text-small);
  line-height: 1.55;
  color: var(--text-primary);
`;

/* ── Summary stats ───────────────────────────────────────────────── */

const StatBar = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--block-gap);
  margin-bottom: 0.5rem;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(motion.div)<{ $accent: string }>`
  padding: clamp(0.75rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1.15rem);
  border-radius: 1rem;
  background: var(--surface);
  border: 1px solid var(--card-border);
  text-align: center;
  transition: border-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $accent }) => `${$accent}35`};
    }
  }
`;

const StatValue = styled.div<{ $accent: string }>`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  font-family: var(--font-display);
  color: ${({ $accent }) => $accent};
  letter-spacing: -0.03em;
  line-height: 1.1;
`;

const StatLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

/* ── Animation variants ──────────────────────────────────────────── */

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const detailVariant = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: 'auto' as const,
    marginTop: '0.75rem',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

/* ── Component ───────────────────────────────────────────────────── */

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selected, setSelected] = useState<SelectedSkill | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
    setGlowPos({ x, y });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  const currentCat = skillCategories[activeCategory];
  const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);
  const avgLevel = Math.round(
    skillCategories.flatMap((c) => c.skills).reduce((s, sk) => s + sk.level, 0) / totalSkills,
  );
  const topSkillCount = skillCategories.flatMap((c) => c.skills).filter((s) => s.level >= 85).length;

  const toggleSkill = (skill: Skill) => {
    setSelected((prev) =>
      prev?.skill.name === skill.name && prev.category === currentCat.title
        ? null
        : { category: currentCat.title, skill },
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
        title="Technical Skills"
        subtitle="Tap any skill to see what it means in my work — from low-latency C++ to 2026 AI-dev workflows."
      />

      <StatBar
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          { value: `${totalSkills}+`, label: 'Technologies', accent: '#0071e3' },
          { value: `${skillCategories.length}`, label: 'Domains', accent: '#5856d6' },
          { value: `${avgLevel}%`, label: 'Avg Proficiency', accent: '#af52de' },
          { value: `${topSkillCount}`, label: 'Expert-level', accent: '#32ade6' },
        ].map((stat) => (
          <StatCard key={stat.label} $accent={stat.accent} variants={itemVariant}>
            <StatValue $accent={stat.accent}>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatBar>

      <Layout>
        <CategoryNav aria-label="Skill categories">
          {skillCategories.map((cat, i) => (
            <CategoryTab
              key={cat.title}
              $active={activeCategory === i}
              $accent={cat.accent}
              onClick={() => {
                setActiveCategory(i);
                setSelected(null);
              }}
              aria-pressed={activeCategory === i}
            >
              <TabIcon>{cat.icon}</TabIcon>
              <TabLabel>{cat.title}</TabLabel>
              <TabCount $accent={cat.accent}>{cat.skills.length}</TabCount>
            </CategoryTab>
          ))}
        </CategoryNav>

        <TiltContainer>
          <AnimatePresence mode="wait">
            <TiltCard
              key={currentCat.title}
              ref={cardRef}
              $accent={currentCat.accent}
              initial={{ opacity: 0, y: 16, rotateX: 2 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: tilt.x,
                rotateY: tilt.y,
              }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                opacity: { duration: 0.3 },
                y: { duration: 0.3 },
                rotateX: { type: 'spring', stiffness: 300, damping: 30 },
                rotateY: { type: 'spring', stiffness: 300, damping: 30 },
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={resetTilt}
            >
              <GlowOrb
                $x={glowPos.x}
                $y={glowPos.y}
                $accent={currentCat.accent}
                $visible={isHovering}
              />

              <CategoryLabel>
                <CategoryTitle $accent={currentCat.accent}>
                  {currentCat.icon} {currentCat.title}
                </CategoryTitle>
                <SkillCount $accent={currentCat.accent}>
                  {currentCat.skills.length} skills
                </SkillCount>
              </CategoryLabel>

              <SkillList
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {currentCat.skills.map((skill) => {
                  const isActive =
                    selected?.skill.name === skill.name &&
                    selected.category === currentCat.title;
                  return (
                    <div key={skill.name}>
                      <SkillRow
                        $active={isActive}
                        $accent={currentCat.accent}
                        variants={itemVariant}
                        onClick={() => toggleSkill(skill)}
                        aria-pressed={isActive}
                        aria-label={`${skill.name}: ${skill.level}% — ${skill.description}`}
                      >
                        <SkillName $active={isActive}>{skill.name}</SkillName>
                        <BarTrack>
                          <BarFill
                            $accent={currentCat.accent}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 0.8,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                          />
                        </BarTrack>
                        <LevelLabel $accent={currentCat.accent}>
                          {skill.level}%
                        </LevelLabel>
                      </SkillRow>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <DetailPanel
                            $accent={currentCat.accent}
                            variants={detailVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            role="region"
                            aria-live="polite"
                          >
                            <DetailTitle $accent={currentCat.accent}>
                              {skill.name}
                            </DetailTitle>
                            <DetailText>{skill.description}</DetailText>
                          </DetailPanel>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </SkillList>
            </TiltCard>
          </AnimatePresence>
        </TiltContainer>
      </Layout>
    </Section>
  );
}
