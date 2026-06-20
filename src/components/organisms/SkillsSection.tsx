import { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import SectionHeader from '../molecules/SectionHeader';
import RadarChart from '../molecules/RadarChart';
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

/* ── Category sidebar (Orage-inspired terminal tabs) ─────────────── */

const CategoryNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
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
  gap: 0.6rem;
  padding: 0.65rem 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${({ $active, $accent }) => ($active ? `${$accent}50` : 'var(--card-border)')};
  background: ${({ $active, $accent }) =>
    $active ? `${$accent}0e` : 'transparent'};
  color: ${({ $active }) =>
    $active ? 'var(--text-primary)' : 'var(--text-muted)'};
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  transition: all var(--transition-fast);
  font-family: 'IBM Plex Mono', 'SF Mono', monospace;

  ${({ $active, $accent }) =>
    $active &&
    `box-shadow: inset 3px 0 0 ${$accent};`}

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $accent }) => `${$accent}35`};
      background: ${({ $accent }) => `${$accent}08`};
      color: var(--text-primary);
    }
  }

  ${media.lg} {
    flex-shrink: 0;
    padding: 0.55rem 0.8rem;
    border-radius: 0.4rem;
    box-shadow: none !important;
  }
`;

const TabIndex = styled.span<{ $accent: string }>`
  font-size: 0.6rem;
  font-weight: 700;
  color: ${({ $accent }) => $accent};
  opacity: 0.7;
  font-variant-numeric: tabular-nums;
`;

const TabLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 550;
  letter-spacing: -0.01em;
`;

const TabCount = styled.span<{ $accent: string }>`
  font-size: 0.6rem;
  font-weight: 600;
  margin-left: auto;
  padding: 0.12rem 0.4rem;
  border-radius: 3px;
  background: ${({ $accent }) => `${$accent}14`};
  color: ${({ $accent }) => $accent};
  font-variant-numeric: tabular-nums;

  ${media.lg} {
    margin-left: 0.2rem;
  }
`;

/* ── Main card (Orage system-panel aesthetic) ────────────────────── */

const TiltContainer = styled.div`
  perspective: 1200px;
`;

const SystemPanel = styled(motion.div)<{ $accent: string }>`
  border-radius: 1rem;
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
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ $accent }) => $accent},
      ${({ $accent }) => `${$accent}44`} 60%,
      transparent
    );
  }

  &:hover {
    box-shadow: var(--card-shadow-hover);
  }
`;

const PanelHeader = styled.div<{ $accent: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--card-border);
  font-family: 'IBM Plex Mono', 'SF Mono', monospace;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;

  ${media.sm} {
    padding: 0.6rem 0.85rem;
  }
`;

const PanelTitle = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const PanelMeta = styled.span<{ $accent: string }>`
  font-size: 0.65rem;
  font-weight: 500;
  color: ${({ $accent }) => $accent};
  font-variant-numeric: tabular-nums;
`;

const GlowOrb = styled.div<{ $x: number; $y: number; $accent: string; $visible: boolean }>`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ $accent }) => `${$accent}14`} 0%,
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

/* ── Dual-pane content: radar + skill list ───────────────────────── */

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  ${media.md} {
    grid-template-columns: 1fr;
  }
`;

const RadarPane = styled.div`
  padding: clamp(0.75rem, 2vw, 1.25rem);
  border-right: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  ${media.md} {
    border-right: none;
    border-bottom: 1px solid var(--card-border);
    padding: clamp(0.5rem, 2vw, 1rem);
  }
`;

const ListPane = styled.div`
  padding: clamp(0.5rem, 2vw, 1.25rem);
  position: relative;
  z-index: 1;
  max-height: 520px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) transparent;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 4px;
  }

  ${media.md} {
    max-height: none;
  }
`;

/* ── Skill rows (data-terminal style) ────────────────────────────── */

const SkillList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const SkillRow = styled(motion.button)<{
  $active: boolean;
  $accent: string;
}>`
  display: grid;
  grid-template-columns: minmax(80px, 130px) 1fr auto;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid
    ${({ $active, $accent }) =>
      $active ? `${$accent}40` : 'transparent'};
  background: ${({ $active, $accent }) =>
    $active ? `${$accent}0a` : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
  font-family: 'IBM Plex Mono', 'SF Mono', monospace;
  width: 100%;

  @media (hover: hover) {
    &:hover {
      background: ${({ $accent }) => `${$accent}06`};
      border-color: ${({ $accent }) => `${$accent}18`};
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  ${media.sm} {
    grid-template-columns: 1fr auto;
    gap: 0.4rem;
    padding: 0.45rem 0.4rem;
  }
`;

const SkillName = styled.span<{ $active: boolean }>`
  font-size: 0.8rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: var(--text-primary);
  letter-spacing: -0.01em;
  transition: font-weight 0.15s ease;
`;

const BarTrack = styled.div`
  height: 4px;
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
    ${({ $accent }) => `${$accent}66`}
  );
`;

const LevelLabel = styled.span<{ $accent: string }>`
  font-size: 0.65rem;
  font-weight: 700;
  color: ${({ $accent }) => $accent};
  min-width: 28px;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

/* ── Skill detail panel (expandable) ─────────────────────────────── */

const DetailPanel = styled(motion.div)<{ $accent: string }>`
  margin-top: 0.35rem;
  margin-bottom: 0.25rem;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  background: ${({ $accent }) => `${$accent}08`};
  border: 1px solid ${({ $accent }) => `${$accent}22`};
  border-left: 2px solid ${({ $accent }) => $accent};
  font-family: 'IBM Plex Mono', 'SF Mono', monospace;
`;

const DetailTitle = styled.p<{ $accent: string }>`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
  margin-bottom: 0.25rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const DetailText = styled.p`
  font-size: 0.78rem;
  line-height: 1.55;
  color: var(--text-primary);
`;

const DetailExpand = styled(motion.div)`
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--card-border);
`;

const DetailExpandLabel = styled.button<{ $accent: string }>`
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 0.35rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-family: 'IBM Plex Mono', 'SF Mono', monospace;

  &:hover { opacity: 0.8; }
`;

const DetailExpandText = styled.p`
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--text-muted);
`;

const MetaGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.5rem;
`;

const MetaRow = styled.div<{ $accent: string }>`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.7rem;
  line-height: 1.5;
  font-family: 'IBM Plex Mono', 'SF Mono', monospace;

  ${media.xs} {
    flex-wrap: wrap;
    gap: 0.15rem 0.4rem;
  }
`;

const MetaKey = styled.span<{ $accent: string }>`
  font-weight: 700;
  color: ${({ $accent }) => $accent};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  min-width: 80px;
  flex-shrink: 0;
  opacity: 0.8;

  &::after {
    content: ' :';
  }

  ${media.xs} {
    min-width: 60px;
    font-size: 0.6rem;
  }
`;

const MetaValue = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

/* ── System stats bar (Orage terminal readout) ───────────────────── */

const StatBar = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(motion.div)<{ $accent: string }>`
  padding: 0.65rem 0.85rem;
  border-radius: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--card-border);
  font-family: 'IBM Plex Mono', 'SF Mono', monospace;
  transition: border-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $accent }) => `${$accent}30`};
    }
  }
`;

const StatValue = styled.div<{ $accent: string }>`
  font-size: clamp(1.25rem, 2.5vw, 1.6rem);
  font-weight: 700;
  color: ${({ $accent }) => $accent};
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
`;

const StatLabel = styled.div`
  font-size: 0.6rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-top: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

/* ── Animation variants ──────────────────────────────────────────── */

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const detailVariant = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: 'auto' as const,
    marginTop: '0.35rem',
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
  const [expandedDetail, setExpandedDetail] = useState(false);
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
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    setTilt({ x: rotateX, y: rotateY });
    setGlowPos({ x, y });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  const currentCat = skillCategories[activeCategory];
  const allSkills = skillCategories.flatMap((c) => c.skills);
  const totalSkills = allSkills.length;
  const coverage = Math.round(
    allSkills.reduce((s, sk) => s + Math.min(sk.level / sk.demand, 1) * 100, 0) / totalSkills,
  );
  const topSkillCount = allSkills.filter((s) => s.level >= 85).length;

  const toggleSkill = (skill: Skill) => {
    setExpandedDetail(false);
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
          { value: `${totalSkills}`, label: 'Technologies', accent: '#0071e3' },
          { value: `${skillCategories.length}`, label: 'Domains', accent: '#5856d6' },
          { value: `${coverage}%`, label: 'Demand Coverage', accent: '#af52de' },
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
                setExpandedDetail(false);
              }}
              aria-pressed={activeCategory === i}
            >
              <TabIndex $accent={cat.accent}>{String(i + 1).padStart(2, '0')}</TabIndex>
              <TabLabel>{cat.title}</TabLabel>
              <TabCount $accent={cat.accent}>{cat.skills.length}</TabCount>
            </CategoryTab>
          ))}
        </CategoryNav>

        <TiltContainer>
          <AnimatePresence mode="wait">
            <SystemPanel
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

              <PanelHeader $accent={currentCat.accent}>
                <PanelTitle>
                  {currentCat.icon} {currentCat.title}
                </PanelTitle>
                <PanelMeta $accent={currentCat.accent}>
                  {currentCat.skills.length} skills // avg {Math.round(
                    currentCat.skills.reduce((s, sk) => s + sk.level, 0) / currentCat.skills.length,
                  )}%
                </PanelMeta>
              </PanelHeader>

              <ContentGrid>
                <RadarPane>
                  <RadarChart
                    skills={currentCat.skills}
                    accent={currentCat.accent}
                  />
                </RadarPane>

                <ListPane>
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
                              {skill.level}
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
                                  {skill.name} // {skill.level} vs {skill.demand} demand
                                </DetailTitle>
                                <DetailText>{skill.description}</DetailText>

                                {(skill.detail || skill.meta) && (
                                  <DetailExpand>
                                    {!expandedDetail ? (
                                      <DetailExpandLabel
                                        $accent={currentCat.accent}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedDetail(true);
                                        }}
                                      >
                                        [+] Show workflow detail
                                      </DetailExpandLabel>
                                    ) : (
                                      <>
                                        <DetailExpandLabel
                                          $accent={currentCat.accent}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedDetail(false);
                                          }}
                                        >
                                          [-] Hide detail
                                        </DetailExpandLabel>
                                        {skill.meta && skill.meta.length > 0 && (
                                          <MetaGrid>
                                            {skill.meta.map((m) => (
                                              <MetaRow key={m.key} $accent={currentCat.accent}>
                                                <MetaKey $accent={currentCat.accent}>{m.key}</MetaKey>
                                                <MetaValue>{m.value}</MetaValue>
                                              </MetaRow>
                                            ))}
                                          </MetaGrid>
                                        )}
                                        {skill.detail && (
                                          <DetailExpandText>
                                            {skill.detail}
                                          </DetailExpandText>
                                        )}
                                      </>
                                    )}
                                  </DetailExpand>
                                )}
                              </DetailPanel>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </SkillList>
                </ListPane>
              </ContentGrid>
            </SystemPanel>
          </AnimatePresence>
        </TiltContainer>
      </Layout>
    </Section>
  );
}
