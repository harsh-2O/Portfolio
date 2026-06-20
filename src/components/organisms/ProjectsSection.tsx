import { lazy, Suspense, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import { projects, PROJECT_CATEGORIES, CATEGORY_META } from '../../data/projects';

const ProjectModal = lazy(() => import('./ProjectModal'));
import SectionHeader from '../molecules/SectionHeader';
import { fadeUp } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';
import type { Project, ProjectCategory } from '../../types';

type Filter = 'All' | ProjectCategory;

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

/* ── Filter tabs ─────────────────────────────────────────────────── */

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  ${media.sm} {
    gap: 0.4rem;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    padding-bottom: 4px;
  }
`;

const FilterTab = styled.button<{ $active: boolean; $accent?: string }>`
  font-size: 0.8rem;
  font-weight: 550;
  padding: 0.45rem 1rem;
  border-radius: 100px;
  white-space: nowrap;
  letter-spacing: -0.01em;
  border: 1px solid
    ${({ $active, $accent }) =>
      $active ? ($accent || 'var(--accent)') + '50' : 'var(--card-border)'};
  background: ${({ $active, $accent }) =>
    $active ? ($accent || 'var(--accent)') + '14' : 'var(--surface)'};
  color: ${({ $active, $accent }) =>
    $active ? $accent || 'var(--accent)' : 'var(--text-muted)'};
  cursor: pointer;
  transition: all var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $accent }) => ($accent || 'var(--accent)') + '40'};
      color: ${({ $accent }) => $accent || 'var(--accent)'};
      background: ${({ $accent }) => ($accent || 'var(--accent)') + '0a'};
    }
  }
`;

const ProjectCount = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 0.6;
  margin-left: 0.3rem;
`;

/* ── Category group ──────────────────────────────────────────────── */

const CategoryGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--section-inner-gap);

  & + & {
    margin-top: clamp(2rem, 4vw, 3rem);
    padding-top: clamp(1.5rem, 3vw, 2.25rem);
    border-top: 1px solid var(--card-border);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CategoryIcon = styled.span<{ $accent: string }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background: ${({ $accent }) => `${$accent}12`};
  border: 1px solid ${({ $accent }) => `${$accent}25`};
  flex-shrink: 0;
`;

const CategoryText = styled.div`
  min-width: 0;
`;

const CategoryTitle = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.15rem, calc(1vw + 0.9rem), 1.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--text-primary);
`;

const CategoryDesc = styled.p`
  font-size: var(--text-small);
  color: var(--text-muted);
  line-height: 1.4;
  margin-top: 0.15rem;
`;

/* ── Project card grid ───────────────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--block-gap);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--section-inner-gap);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled(motion.div)<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  border: 1px solid var(--card-border);
  background: var(--surface-elevated);
  box-shadow: var(--card-shadow), var(--card-highlight);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow var(--transition), transform var(--transition),
    border-color var(--transition);
  position: relative;

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
      transparent
    );
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: var(--card-shadow-hover);
      transform: translateY(-6px);
      border-color: ${({ $accent }) => `${$accent}40`};
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

const Thumb = styled.div<{ $accent: string; $hovered?: boolean }>`
  height: clamp(140px, 22vw, 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: ${({ $accent }) =>
    `linear-gradient(160deg, ${$accent}20 0%, ${$accent}06 60%, transparent 100%)`};
  border-bottom: 1px solid var(--card-border);

  span {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: ${({ $accent }) => $accent};
    opacity: 0.85;
  }

  img {
    max-width: 80%;
    max-height: 100px;
    object-fit: contain;
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.06));
    transform: ${({ $hovered }) => ($hovered ? 'scale(1.06)' : 'scale(1)')};
  }
`;

const CardBody = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem) clamp(1rem, 3vw, 1.35rem)
    clamp(1.15rem, 3vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Year = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.03em;
`;

const ViewLabel = styled.span<{ $visible?: boolean }>`
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 500;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity var(--transition);

  @media (hover: none) {
    opacity: 0.7;
  }
`;

const CardTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
  padding-top: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.25rem 0.6rem;
  border-radius: 100px;
  background: var(--tech-item-bg);
  border: 1px solid var(--card-border);
  color: var(--text-muted);
`;

const Metrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  padding-top: 0.25rem;
`;

const Metric = styled.div`
  font-size: 0.75rem;
  color: var(--text-muted);

  strong {
    display: block;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }
`;

/* ── Component ───────────────────────────────────────────────────── */

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>('All');

  const grouped = useMemo(() => {
    const filtered =
      filter === 'All'
        ? projects
        : projects.filter((p) => p.category === filter);

    const map = new Map<ProjectCategory, Project[]>();
    for (const cat of PROJECT_CATEGORIES) {
      const items = filtered.filter((p) => p.category === cat);
      if (items.length > 0) map.set(cat, items);
    }
    return map;
  }, [filter]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<Filter, number>();
    counts.set('All', projects.length);
    for (const cat of PROJECT_CATEGORIES) {
      counts.set(cat, projects.filter((p) => p.category === cat).length);
    }
    return counts;
  }, []);

  const open = (project: Project) => {
    setSelected(project);
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setSelected(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <SectionHeader
          label="Selected work"
          title="Projects"
          subtitle="13 projects from production AI and quant work to open-source repos on GitHub — click any card for full details and repo links."
        />

        <FilterBar>
          <FilterTab
            $active={filter === 'All'}
            onClick={() => setFilter('All')}
          >
            All<ProjectCount>{categoryCounts.get('All')}</ProjectCount>
          </FilterTab>
          {PROJECT_CATEGORIES.map((cat) => (
            <FilterTab
              key={cat}
              $active={filter === cat}
              $accent={CATEGORY_META[cat].accent}
              onClick={() => setFilter(cat)}
            >
              {CATEGORY_META[cat].icon} {cat}
              <ProjectCount>{categoryCounts.get(cat)}</ProjectCount>
            </FilterTab>
          ))}
        </FilterBar>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from(grouped.entries()).map(([category, items]) => {
              const meta = CATEGORY_META[category];
              return (
                <CategoryGroup key={category}>
                  <CategoryHeader>
                    <CategoryIcon $accent={meta.accent}>
                      {meta.icon}
                    </CategoryIcon>
                    <CategoryText>
                      <CategoryTitle>{category}</CategoryTitle>
                      <CategoryDesc>{meta.description}</CategoryDesc>
                    </CategoryText>
                  </CategoryHeader>

                  <Grid>
                    {items.map((project, i) => (
                      <Card
                        key={project.id}
                        $accent={project.accent}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        onClick={() => open(project)}
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details: ${project.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            open(project);
                          }
                        }}
                      >
                        <Thumb
                          $accent={project.accent}
                          $hovered={hoveredId === project.id}
                        >
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              width={320}
                              height={220}
                            />
                          ) : (
                            <span aria-hidden="true">
                              {project.title.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </Thumb>

                        <CardBody>
                          <CardTop>
                            <Year>{project.year}</Year>
                            <ViewLabel $visible={hoveredId === project.id}>
                              View details →
                            </ViewLabel>
                          </CardTop>

                          <div>
                            <CardTitle>{project.title}</CardTitle>
                            <CardSubtitle>{project.subtitle}</CardSubtitle>
                          </div>

                          <Metrics>
                            {project.highlights.slice(0, 2).map((h) => (
                              <Metric key={h.label}>
                                <strong>{h.value}</strong>
                                {h.label}
                              </Metric>
                            ))}
                          </Metrics>

                          <TagRow>
                            {project.tags.slice(0, 3).map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                            {project.tags.length > 3 && (
                              <Tag>+{project.tags.length - 3}</Tag>
                            )}
                          </TagRow>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </CategoryGroup>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Section>

      {selected && (
        <Suspense fallback={null}>
          <ProjectModal project={selected} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
