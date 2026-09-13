import { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll } from '../../lib/motion';
import TimelineEntry from '../molecules/TimelineEntry';
import type { ExperienceSectionData } from '../../types';

const Block = styled.section`
  & + & {
    margin-top: clamp(2.5rem, 5vw, 4rem);
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  padding-bottom: 1rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
  border-bottom: 1px solid var(--border);
`;

const Number = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent-text);
  font-variant-numeric: tabular-nums;
`;

const Title = styled.h3`
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.1;
`;

const Track = styled.div`
  position: relative;
`;

const Rail = styled.div`
  position: absolute;
  top: 0.6em;
  bottom: 0;
  left: 0;
  width: 1px;
  background: var(--border);
`;

const Progress = styled(motion.div)`
  position: absolute;
  top: 0.6em;
  bottom: 0;
  left: 0;
  width: 1px;
  background: var(--accent);
  transform-origin: 0 0;
`;

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface TimelineProps {
  data: ExperienceSectionData;
}

/** A sub-section timeline whose progress line draws itself as you scroll past it. */
export default function Timeline({ data }: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.72', 'end 0.72'],
  });
  const headingId = `${data.id}-title`;

  return (
    <Block id={data.id} aria-labelledby={headingId}>
      <Heading>
        <Number aria-hidden="true">{data.number}</Number>
        <Title id={headingId}>{data.title}</Title>
      </Heading>
      <Track ref={trackRef}>
        <Rail aria-hidden="true" />
        <Progress aria-hidden="true" style={{ scaleY: scrollYProgress }} />
        <List>
          {data.items.map((item) => (
            <TimelineEntry key={`${data.id}-${item.title}`} {...item} />
          ))}
        </List>
      </Track>
    </Block>
  );
}
