import { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import SectionHeader from '../molecules/SectionHeader';
import { useTestimonials } from '../../hooks/useTestimonials';
import { fadeUp } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
  gap: clamp(1.5rem, 4vw, 2.5rem);
  position: relative;
`;

const QuoteWrap = styled.div`
  perspective: 1000px;
  position: relative;
`;

const AmbientGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(700px, 100%);
  height: min(400px, 80%);
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    var(--glow-color) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
`;

const QuoteCard = styled.div`
  padding: clamp(1.75rem, 4vw, 3rem);
  border-radius: 1.5rem;
  background: var(--surface-elevated);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow), var(--card-highlight);
  border-left: 3px solid var(--accent);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: box-shadow 0.4s ease;

  &::before {
    content: '\u201C';
    position: absolute;
    top: 0.5rem;
    left: 1.5rem;
    font-size: clamp(3rem, 8vw, 5rem);
    line-height: 1;
    color: var(--accent-subtle);
    font-family: Georgia, serif;
    pointer-events: none;
  }

  &:hover {
    box-shadow: var(--card-shadow-hover);
  }

  ${media.md} {
    padding: 1.5rem;
    border-radius: 1.25rem;
  }
`;

const GlowOrb = styled.div<{ $x: number; $y: number; $visible: boolean }>`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 113, 227, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Quote = styled(motion.blockquote)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  font-weight: 400;
  max-width: 100%;
  color: var(--text-primary);
  border: none;
  padding: 0;
  margin: 0;
  padding-top: 1.5rem;
  position: relative;
  z-index: 1;
`;

const Author = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  padding-top: 1.25rem;
  margin-top: 1.25rem;
  border-top: 1px solid var(--card-border);
  position: relative;
  z-index: 1;

  ${media.sm} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const AuthorInfo = styled.div`
  h3 {
    font-size: var(--text-h2);
    font-weight: 600;
  }
  p {
    font-size: var(--text-small);
    color: var(--text-muted);
    margin-top: 0.15rem;
    line-height: 1.45;
  }
`;

const LinkedInLink = styled.a`
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--accent);
  transition: opacity var(--transition);
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  ${media.sm} {
    white-space: normal;
  }

  &:hover {
    opacity: 0.75;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 0.5rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '28px' : '8px')};
  height: 8px;
  border-radius: 100px;
  border: none;
  padding: 0;
  background: ${({ $active }) =>
    $active ? 'var(--accent)' : 'var(--text-muted)'};
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
  cursor: pointer;
  transition: all var(--transition);
`;

export default function TestimonialsSection() {
  const { testimonials, currentIndex, setCurrentIndex } = useTestimonials();
  const current = testimonials[currentIndex];
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: ((y - rect.height / 2) / (rect.height / 2)) * -4,
      y: ((x - rect.width / 2) / (rect.width / 2)) * 4,
    });
    setGlow({ x, y });
  }, []);

  return (
    <Section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <SectionHeader
        label="Colleagues"
        title="Recommendations"
        subtitle="Real LinkedIn recommendations from colleagues I've worked with."
      />

      {current ? (
        <QuoteWrap>
          <AmbientGlow />
          <QuoteCard
            ref={cardRef}
            style={{
              transform: hovering
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : 'rotateX(0) rotateY(0)',
              transition: hovering
                ? 'box-shadow 0.4s ease'
                : 'all 0.5s ease',
            }}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setTilt({ x: 0, y: 0 });
            }}
          >
            <GlowOrb $x={glow.x} $y={glow.y} $visible={hovering} />
            <AnimatePresence mode="wait">
              <div key={current.id}>
                <Quote
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}
                >
                  {current.quote}
                </Quote>
                <Author
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <AuthorInfo>
                    <h3>{current.author}</h3>
                    <p>{current.position}</p>
                    {current.context && <p>{current.context}</p>}
                  </AuthorInfo>
                  {current.linkedin && (
                    <LinkedInLink
                      href={current.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on LinkedIn →
                    </LinkedInLink>
                  )}
                </Author>
              </div>
            </AnimatePresence>
          </QuoteCard>
        </QuoteWrap>
      ) : null}

      {testimonials.length > 1 && (
        <Dots role="tablist" aria-label="Recommendation navigation">
          {testimonials.map((t, i) => (
            <Dot
              key={t.id}
              $active={i === currentIndex}
              onClick={() => setCurrentIndex(i)}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Show recommendation from ${t.author}`}
            />
          ))}
        </Dots>
      )}
    </Section>
  );
}
