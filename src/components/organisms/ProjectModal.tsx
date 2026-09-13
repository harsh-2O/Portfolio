import { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { overlayFade, softSpring, transitions } from '../../motion/variants';
import { hideScrollbar } from '../../styles/hideScrollbar';
import { media } from '../../styles/mixins';
import type { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vh, 3rem) clamp(1rem, 4vw, 2rem);
  background: var(--overlay);

  ${media.sm} {
    align-items: flex-end;
    padding: 0;
  }
`;

const Detail = styled(motion.article)`
  position: relative;
  width: min(880px, 100%);
  max-height: min(86vh, 900px);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--background);
  box-shadow: var(--shadow-lg);
  overflow: hidden;

  ${media.sm} {
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    max-height: 92dvh;
  }
`;

const Scroll = styled.div`
  overflow-y: auto;
  overscroll-behavior: contain;
  ${hideScrollbar};
`;

const Head = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: clamp(1.5rem, 3vw, 2.25rem) clamp(1.25rem, 3vw, 2.25rem) clamp(1rem, 2vw, 1.5rem);
  border-bottom: 1px solid var(--border);
`;

const Eyebrow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-right: 2.5rem;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--text-primary);
  padding-right: 2.5rem;
`;

const Subtitle = styled.p`
  font-size: var(--text-body);
  color: var(--text-muted);
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.35rem;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 40px;
  padding: 0 0.9rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-strong);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: border-color var(--transition-fast), background-color var(--transition-fast);

  svg {
    width: 13px;
    height: 13px;
    stroke: currentColor;
    stroke-width: 1.75;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (hover: hover) {
    &:hover {
      border-color: var(--text-primary);
      background: var(--surface);
    }
  }
`;

const Metrics = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 0;

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem 1rem;
  }
`;

const Metric = styled.div`
  min-width: 0;

  dt {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  dd {
    margin: 0.3rem 0 0;
    font-family: var(--font-mono);
    font-size: clamp(1rem, 1.2vw, 1.25rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2.5vw, 1.75rem);
  padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2.25rem) clamp(1.75rem, 3vw, 2.5rem);
`;

const Block = styled.section`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: clamp(0.75rem, 2vw, 1.75rem);

  ${media.md} {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.5rem;
  }
`;

const BlockLabel = styled.h3`
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-text);
  padding-top: 0.25em;
`;

const Prose = styled.p`
  font-size: var(--text-body);
  line-height: 1.65;
  color: var(--text-muted);
`;

const Bullets = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Bullet = styled.li`
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.85em;
    width: 8px;
    height: 1px;
    background: var(--accent);
  }
`;

const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const Tag = styled.li`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.25rem 0.55rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  color: var(--text-muted);
`;

const Close = styled.button`
  position: absolute;
  top: clamp(1rem, 2vw, 1.5rem);
  right: clamp(1rem, 2vw, 1.5rem);
  z-index: 2;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--text-primary);

  svg {
    width: 15px;
    height: 15px;
    stroke: currentColor;
    stroke-width: 1.6;
    fill: none;
    stroke-linecap: round;
  }

  @media (hover: hover) {
    &:hover {
      border-color: var(--text-primary);
    }
  }
`;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const ref = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !ref.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      restoreRef.current?.focus?.();
    };
  }, [project]);

  const titleId = project ? `project-${project.id}-title` : undefined;

  return (
    <AnimatePresence>
      {project && (
        <Overlay variants={overlayFade} initial="hidden" animate="visible" exit="exit" onClick={onClose}>
          <Detail
            ref={ref}
            layoutId={`project-${project.id}`}
            transition={softSpring}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <Close ref={closeRef} type="button" onClick={onClose} aria-label="Close case study" data-cursor="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Close>

            <Scroll data-lenis-prevent>
              <Head>
                <Eyebrow>
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </Eyebrow>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transitions.base, delay: 0.12 }}
                >
                  <Title id={titleId}>{project.title}</Title>
                  <Subtitle>{project.subtitle}</Subtitle>
                  {(project.repoUrl || project.liveUrl) && (
                    <Links>
                      {project.repoUrl && (
                        <LinkButton href={project.repoUrl} target="_blank" rel="noopener noreferrer" data-cursor="Open">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                          Repository
                        </LinkButton>
                      )}
                      {project.liveUrl && (
                        <LinkButton href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="Open">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                          Live
                        </LinkButton>
                      )}
                    </Links>
                  )}
                </motion.div>
              </Head>

              <Body>
                <Block>
                  <BlockLabel>{project.caseStudy ? 'Problem' : 'Context'}</BlockLabel>
                  <Prose>{project.caseStudy?.problem ?? project.description}</Prose>
                </Block>

                <Block>
                  <BlockLabel>Approach</BlockLabel>
                  {project.caseStudy ? (
                    <Prose>{project.caseStudy.approach}</Prose>
                  ) : (
                    <Bullets>
                      {project.bullets.map((b) => (
                        <Bullet key={b.slice(0, 48)}>{b}</Bullet>
                      ))}
                    </Bullets>
                  )}
                </Block>

                <Block>
                  <BlockLabel>Impact</BlockLabel>
                  <div>
                    <Metrics>
                      {project.highlights.map((h) => (
                        <Metric key={h.label}>
                          <dt>{h.label}</dt>
                          <dd>{h.value}</dd>
                        </Metric>
                      ))}
                    </Metrics>
                    {project.caseStudy && <Prose style={{ marginTop: '0.9rem' }}>{project.caseStudy.impact}</Prose>}
                  </div>
                </Block>

                <Block>
                  <BlockLabel>Stack</BlockLabel>
                  <Tags>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Tags>
                </Block>
              </Body>
            </Scroll>
          </Detail>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
