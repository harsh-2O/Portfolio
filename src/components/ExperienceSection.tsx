/**
 * Animated timeline for education and work experience.
 * Each item animates in once when it enters the viewport (triggerOnce).
 */
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from '../lib/motion';
import { useInView } from 'react-intersection-observer';
import type { ExperienceSectionData, TimelineItem } from '../types';

const Section = styled.section`
  width: 100%;
  padding: 1rem 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const SectionNumber = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0.05em;
`;

const SectionTitle = styled.h2`
  font-size: var(--text-h1);
  font-weight: 600;
  letter-spacing: -0.03em;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-left: 1.25rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 2px;
    background: linear-gradient(180deg, var(--accent), var(--accent-line), transparent);
    border-radius: 2px;
  }
`;

const TimelineItemEl = styled(motion.div)`
  position: relative;
  padding: clamp(1.25rem, 3vw, 2rem) 0;
  border-bottom: 1px solid var(--card-border);

  &::before {
    content: '';
    position: absolute;
    left: -1.35rem;
    top: 1.75rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-subtle);
  }

  &:last-child { border-bottom: none; }
`;

const TimelineContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.35rem;
  align-items: start;
  margin-bottom: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
  }
`;

const TimelineTitle = styled.h3`
  font-size: clamp(1.05rem, 2.5vw, 1.2rem);
  font-weight: 600;
  margin-bottom: 0.2rem;
  line-height: 1.35;
`;

const TimelineSubtitle = styled.p`
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: var(--text-muted);
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

const TimelineGPA = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
`;

const TimelineDate = styled.span`
  font-size: var(--text-small);
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;

  @media (min-width: 640px) {
    text-align: right;
    white-space: nowrap;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 0;
`;

const Bullet = styled.li`
  font-size: var(--text-body);
  line-height: 1.55;
  color: var(--text-muted);
  padding-left: 1rem;
  position: relative;
  word-break: break-word;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
  }
`;

function TimelineItemComponent({ title, subtitle, date, gpa, bullets }: TimelineItem) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } });
    }
  }, [controls, inView]);

  return (
    <TimelineItemEl ref={ref} initial={{ opacity: 0, y: 24 }} animate={controls}>
      <TimelineContent>
        <div>
          <TimelineTitle>{title}</TimelineTitle>
          {subtitle && <TimelineSubtitle>{subtitle}</TimelineSubtitle>}
          {gpa && <TimelineGPA>{gpa}</TimelineGPA>}
        </div>
        <TimelineDate>{date}</TimelineDate>
      </TimelineContent>
      {bullets && bullets.length > 0 && (
        <BulletList>
          {bullets.map((b) => (
            <Bullet key={b.slice(0, 40)}>{b}</Bullet>
          ))}
        </BulletList>
      )}
    </TimelineItemEl>
  );
}

export default function ExperienceSection({ sections }: { sections: ExperienceSectionData[] }) {
  return (
    <>
      {sections.map((section) => (
        <Section key={section.number}>
          <SectionHeader>
            <SectionNumber>{section.number}</SectionNumber>
            <SectionTitle>{section.title}</SectionTitle>
          </SectionHeader>
          <TimelineContainer>
            {section.items.map((item) => (
              <TimelineItemComponent key={`${section.number}-${item.title}`} {...item} />
            ))}
          </TimelineContainer>
        </Section>
      ))}
    </>
  );
}
