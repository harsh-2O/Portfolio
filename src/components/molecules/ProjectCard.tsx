import { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useMotionValue, useSpring, useTransform } from '../../lib/motion';
import { softSpring, transitions } from '../../motion/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { media } from '../../styles/mixins';
import type { Project } from '../../types';

const PARALLAX_PX = 14;

interface ProjectCardProps {
  project: Project;
  /** Bento column span out of 12. */
  span: number;
  onOpen: (project: Project) => void;
}

const Cell = styled(motion.li)<{ $span: number }>`
  grid-column: span ${({ $span }) => $span};
  min-width: 0;

  ${media.lg} {
    grid-column: span 6;
  }

  ${media.sm} {
    grid-column: span 12;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transition: border-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: var(--border-strong);
    }
  }

  &:focus-within {
    border-color: var(--accent-line);
  }
`;

const Preview = styled.div<{ $wide: boolean }>`
  position: relative;
  height: ${({ $wide }) => ($wide ? 'clamp(160px, 18vw, 220px)' : 'clamp(140px, 14vw, 176px)')};
  overflow: hidden;
  background: var(--surface-sunken);
  border-bottom: 1px solid var(--border);
`;

/* Scaled up so the parallax offset never exposes an edge. */
const PreviewInner = styled(motion.div)`
  position: absolute;
  inset: -${PARALLAX_PX + 4}px;
  display: grid;
  place-items: center;
`;

const Shot = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: clamp(1.5rem, 3vw, 2.5rem);
`;

const Initials = styled.span`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  color: var(--text-faint);
  opacity: 0.55;
`;

/* Faint plotted grid so image-less cards still read as instrument panels. */
const PreviewGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
  mask-image: radial-gradient(120% 100% at 50% 0%, #000 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(120% 100% at 50% 0%, #000 20%, transparent 80%);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1.1rem 1.1rem;
  flex: 1;
`;

const TopRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
`;

const Title = styled(motion.h3)`
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 0.6vw + 1rem, 1.45rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--text-primary);
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
`;

const Metrics = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.5rem;
  margin: 0.15rem 0 0;
  font-family: var(--font-mono);

  div {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
  }

  dt {
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  dd {
    margin: 0;
    font-size: 0.78rem;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
`;

const Tags = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: auto;
  padding-top: 0.65rem;
`;

const Tag = styled.li`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  padding: 0.18rem 0.45rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  color: var(--text-muted);
  white-space: nowrap;
`;

/** Covers the card so the whole tile is one control, without nesting buttons. */
const Hit = styled.button`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  border-radius: var(--radius-lg);
`;

const Label = styled(motion.span)`
  position: absolute;
  right: 1.1rem;
  bottom: 1.1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-text);
  pointer-events: none;
`;

export default function ProjectCard({ project, span, onOpen }: ProjectCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 20, mass: 0.3 });
  const sy = useSpring(py, { stiffness: 150, damping: 20, mass: 0.3 });
  const x = useTransform(sx, (v) => v * PARALLAX_PX);
  const y = useTransform(sy, (v) => v * PARALLAX_PX);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      // -1..1 from the centre; the preview drifts against the pointer.
      px.set(-((e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      py.set(-((e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    },
    [reduced, px, py],
  );

  const reset = useCallback(() => {
    px.set(0);
    py.set(0);
    setHovered(false);
  }, [px, py]);

  const wide = span >= 8;
  const initials = project.title.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <Cell $span={span} layout transition={softSpring} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <Card
        ref={ref}
        layoutId={`project-${project.id}`}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={reset}
      >
        <Hit
          type="button"
          onClick={() => onOpen(project)}
          onFocus={() => setHovered(true)}
          onBlur={reset}
          aria-label={`Open case study: ${project.title}`}
          data-cursor="View"
        />

        <Preview $wide={wide} aria-hidden="true">
          <PreviewGrid />
          <PreviewInner style={{ x, y }}>
            {project.image ? (
              <Shot src={project.image} alt="" loading="lazy" decoding="async" width={320} height={220} />
            ) : (
              <Initials>{initials}</Initials>
            )}
          </PreviewInner>
        </Preview>

        <Body>
          <TopRow>
            <span>{project.year}</span>
            <span>{project.category}</span>
          </TopRow>

          <Title animate={hovered && !reduced ? { y: -2 } : { y: 0 }} transition={transitions.fast}>
            {project.title}
          </Title>
          <Subtitle>{project.subtitle}</Subtitle>

          <Metrics>
            {project.highlights.slice(0, wide ? 3 : 2).map((h) => (
              <div key={h.label}>
                <dt>{h.label}</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </Metrics>

          <Tags animate={{ opacity: hovered || reduced ? 1 : 0.62 }} transition={transitions.base}>
            {project.tags.slice(0, wide ? 6 : 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {project.tags.length > (wide ? 6 : 3) && <Tag>+{project.tags.length - (wide ? 6 : 3)}</Tag>}
          </Tags>
        </Body>

        <Label animate={{ opacity: hovered && !reduced ? 1 : 0 }} transition={transitions.fast} aria-hidden="true">
          Case study →
        </Label>
      </Card>
    </Cell>
  );
}
