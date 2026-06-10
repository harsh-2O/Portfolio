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
`;

const QuoteCard = styled.div`
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: var(--card-radius, 1.5rem);
  background: var(--surface-elevated);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow), var(--card-highlight);
  border-left: 3px solid var(--accent);
  position: relative;
  transition: box-shadow 0.5s ease;

  &::before {
    content: '\u201C';
    position: absolute;
    top: 0.5rem;
    left: 1.25rem;
    font-size: clamp(2.5rem, 8vw, 4rem);
    line-height: 1;
    color: var(--accent-subtle);
    font-family: Georgia, serif;
    pointer-events: none;
  }

  ${media.md} {
    padding: 1.25rem;
    border-radius: var(--card-radius, 1.25rem);
  }
`;

const Quote = styled(motion.blockquote)`
  font-size: clamp(0.875rem, 1.5vw, 1.0625rem);
  line-height: 1.7;
  font-weight: 400;
  max-width: 920px;
  color: var(--text-primary);
  border: none;
  padding: 0;
  margin: 0;
  padding-top: 1.5rem;
`;

const Author = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  padding-top: 1.25rem;
  margin-top: 1.25rem;
  border-top: 1px solid var(--card-border);

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

  ${media.sm} {
    white-space: normal;
  }

  &:hover { opacity: 0.75; }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 0.5rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '24px' : '8px')};
  height: 8px;
  border-radius: 100px;
  border: none;
  padding: 0;
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--text-muted)')};
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  cursor: pointer;
  transition: all var(--transition);
`;

export default function TestimonialsSection() {
  const { testimonials, currentIndex, setCurrentIndex } = useTestimonials();
  const current = testimonials[currentIndex];

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
        <QuoteCard>
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
