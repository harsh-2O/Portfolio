import { lazy, Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { projects } from '../../data/projects';

const ProjectModal = lazy(() => import('./ProjectModal'));
import SectionHeader from '../molecules/SectionHeader';
import { fadeUp } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';
import type { Project } from '../../types';

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.35rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
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
  transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ $accent }) => $accent}, transparent);
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
  padding: clamp(1rem, 3vw, 1.25rem) clamp(1rem, 3vw, 1.35rem) clamp(1.15rem, 3vw, 1.5rem);
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

const CardTitle = styled.h3`
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

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
        id="projects-section"
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

        <Grid>
          {projects.map((project, i) => (
            <Card
              key={project.id}
              $accent={project.accent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
              <Thumb $accent={project.accent} $hovered={hoveredId === project.id}>
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
                  <span aria-hidden="true">{project.title.slice(0, 2).toUpperCase()}</span>
                )}
              </Thumb>

              <CardBody>
                <CardTop>
                  <Year>{project.year}</Year>
                  <ViewLabel $visible={hoveredId === project.id}>View details →</ViewLabel>
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
      </Section>

      {selected && (
        <Suspense fallback={null}>
          <ProjectModal project={selected} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
