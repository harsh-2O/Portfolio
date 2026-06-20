import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import type { Project } from '../../types';
import { CATEGORY_META } from '../../data/projects';
import { hideScrollbar } from '../../styles/hideScrollbar';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: 0;

  @media (min-width: 640px) {
    align-items: center;
    padding: 1.5rem;
  }
`;

const Detail = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 680px;
  background: var(--background);
  border-radius: 1.75rem 1.75rem 0 0;
  padding: clamp(1.25rem, 4vw, 2rem);
  padding-top: clamp(1.5rem, 4vw, 2rem);
  border: 1px solid var(--card-border);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 113, 227, 0.06);
  max-height: 92dvh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  ${hideScrollbar};

  @media (min-width: 640px) {
    border-radius: 1.75rem;
    max-height: 90vh;
  }

  scrollbar-color: var(--scrollbar-thumb) transparent;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
  }
`;

const Thumb = styled.div<{ $accent: string }>`
  height: clamp(120px, 25vw, 160px);
  border-radius: 1.25rem;
  background: ${({ $accent }) =>
    `linear-gradient(135deg, ${$accent}18 0%, ${$accent}08 100%)`};
  border: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
  }

  span {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: ${({ $accent }) => $accent};
    opacity: 0.85;
  }
`;

const RepoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1rem;
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--accent);
  transition: opacity var(--transition);

  &:hover { opacity: 0.75; }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Year = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
  background: rgba(0, 113, 227, 0.1);
`;

const CategoryBadge = styled.span<{ $accent: string }>`
  font-size: 0.75rem;
  font-weight: 550;
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
  background: ${({ $accent }) => `${$accent}14`};
  border: 1px solid ${({ $accent }) => `${$accent}30`};
  color: ${({ $accent }) => $accent};
`;

const Title = styled.h3`
  font-size: var(--text-h1);
  font-weight: 600;
  margin-top: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: var(--text-body);
  color: var(--text-muted);
  margin-top: 0.35rem;
`;

const Description = styled.p`
  margin-top: 1.25rem;
  line-height: 1.65;
  color: var(--text-primary);
  font-size: var(--text-body);
`;

const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const Metric = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: var(--surface);
  border: 1px solid var(--card-border);
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.5rem;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.35rem 0.75rem;
  border-radius: 100px;
  background: var(--tech-item-bg);
  border: 1px solid var(--card-border);
  color: var(--text-primary);
`;

const BulletList = styled.ul`
  list-style: none;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const Bullet = styled.li`
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--text-muted);
  padding-left: 1.1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-primary);
  border: 1px solid var(--card-border);
  z-index: 1;
`;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Detail
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>

            <Thumb $accent={project.accent}>
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                <span aria-hidden="true">{project.title.slice(0, 2).toUpperCase()}</span>
              )}
            </Thumb>

            <Meta>
              <Year>{project.year}</Year>
              <CategoryBadge $accent={CATEGORY_META[project.category].accent}>
                {CATEGORY_META[project.category].icon} {project.category}
              </CategoryBadge>
            </Meta>
            <Title>{project.title}</Title>
            <Subtitle>{project.subtitle}</Subtitle>
            <Description>{project.description}</Description>

            {project.repoUrl && (
              <RepoLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </RepoLink>
            )}

            <Metrics>
              {project.highlights.map((h) => (
                <Metric key={h.label}>
                  <MetricValue>{h.value}</MetricValue>
                  <MetricLabel>{h.label}</MetricLabel>
                </Metric>
              ))}
            </Metrics>

            <Tags>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>

            <BulletList>
              {project.bullets.map((b) => (
                <Bullet key={b.slice(0, 50)}>{b}</Bullet>
              ))}
            </BulletList>
          </Detail>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
