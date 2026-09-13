import { useMemo } from 'react';
import styled from '@emotion/styled';
import { projects } from '../../data/projects';

const DURATION_S = 64;

const Banner = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(1rem, 2vw, 1.5rem) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--surface-sunken);

  /* Edges fade into the page rather than stopping hard. */
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
`;

const TRACK_CLASS = 'marquee-track';

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: marquee-scroll ${DURATION_S}s linear infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 var(--section-padding-x);
  }
`;

const Group = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    flex-wrap: wrap;
    justify-content: center;

    /* One copy is enough when nothing moves. */
    & + & {
      display: none;
    }
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 3vw, 2.5rem);
  padding-right: clamp(1.25rem, 3vw, 2.5rem);
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 0.4vw + 0.62rem, 0.85rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;

  /* Separator dot between entries. */
  &::after {
    content: '';
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.6;
  }
`;

const Count = styled.span`
  color: var(--text-faint);
  font-variant-numeric: tabular-nums;
`;

const Wrapper = styled.div`
  /* Hovering anywhere over the strip pauses the scroll. Targeted by class
     because component selectors need @emotion/babel-plugin, which this
     project builds without. */
  @media (hover: hover) {
    &:hover .${TRACK_CLASS} {
      animation-play-state: paused;
    }
  }
`;

/** Technologies used across the project set, most-used first. */
function useTechnologies() {
  return useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tag of project.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, []);
}

export default function MarqueeBanner() {
  const tech = useTechnologies();

  return (
    <Banner aria-label="Technologies used across projects">
      <Wrapper>
        <Track className={TRACK_CLASS}>
          {[0, 1].map((copy) => (
            <Group key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {tech.map((t) => (
                <Item key={`${copy}-${t.name}`}>
                  {t.name}
                  {t.count > 1 && <Count>×{t.count}</Count>}
                </Item>
              ))}
            </Group>
          ))}
        </Track>
      </Wrapper>
    </Banner>
  );
}
