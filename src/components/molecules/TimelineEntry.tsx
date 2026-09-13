import { useId, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion, useInView } from '../../lib/motion';
import { expandHeight } from '../../motion/variants';
import type { TimelineItem } from '../../types';

const VISIBLE_BULLETS = 2;

const Entry = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.35rem 2rem;
  padding: 0 0 clamp(1.75rem, 3vw, 2.5rem) clamp(1.75rem, 3vw, 2.5rem);

  @media (min-width: 640px) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }
`;

const Node = styled.span<{ $lit: boolean }>`
  position: absolute;
  left: -4px;
  top: 0.55em;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $lit }) => ($lit ? 'var(--accent)' : 'var(--background)')};
  border: 1px solid ${({ $lit }) => ($lit ? 'var(--accent)' : 'var(--border-strong)')};
  box-shadow: 0 0 0 ${({ $lit }) => ($lit ? '4px' : '0')} var(--accent-subtle);
  transition:
    background-color var(--transition),
    border-color var(--transition),
    box-shadow var(--dur-slow) var(--ease-out);
`;

const Head = styled.div`
  min-width: 0;
`;

const Role = styled.h4`
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 0.6vw + 1rem, 1.5rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
`;

const Company = styled.p`
  margin-top: 0.3rem;
  font-size: 0.95rem;
  color: var(--text-muted);
  overflow-wrap: anywhere;
`;

const Meta = styled.p`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (min-width: 640px) {
    text-align: right;
    padding-top: 0.45em;
  }
`;

const Gpa = styled.span`
  display: block;
  margin-top: 0.25rem;
  color: var(--text-faint);
`;

const Bullets = styled.ul`
  grid-column: 1 / -1;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
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

const More = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;

  ${Bullet} + & {
    margin-top: 0;
  }

  > li:first-of-type {
    margin-top: 0.5rem;
  }
`;

const Toggle = styled.button<{ $open: boolean }>`
  grid-column: 1 / -1;
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 32px;
  margin-top: 0.35rem;
  padding: 0 0.1rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-text);

  svg {
    width: 10px;
    height: 10px;
    stroke: currentColor;
    stroke-width: 1.75;
    fill: none;
    stroke-linecap: round;
    transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);
    transition: transform var(--transition-fast);
  }

  @media (hover: hover) {
    &:hover {
      color: var(--accent);
    }
  }
`;

/** One timeline entry: role, company, mono dates, two bullets with an animated "+N more". */
export default function TimelineEntry({ title, subtitle, date, gpa, bullets = [] }: TimelineItem) {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { once: true, margin: '0px 0px -25% 0px' });
  const [open, setOpen] = useState(false);
  const listId = useId();

  const head = bullets.slice(0, VISIBLE_BULLETS);
  const rest = bullets.slice(VISIBLE_BULLETS);

  return (
    <Entry ref={ref}>
      <Node aria-hidden="true" $lit={lit} data-lit={lit || undefined} />
      <Head>
        <Role>{title}</Role>
        {subtitle && <Company>{subtitle}</Company>}
      </Head>
      <Meta>
        {date}
        {gpa && <Gpa>{gpa}</Gpa>}
      </Meta>

      {head.length > 0 && (
        <Bullets>
          {head.map((b) => (
            <Bullet key={b.slice(0, 48)}>{b}</Bullet>
          ))}
          <AnimatePresence initial={false}>
            {open && (
              <More
                key="more"
                id={listId}
                variants={expandHeight}
                initial="collapsed"
                animate="open"
                exit="collapsed"
              >
                {rest.map((b) => (
                  <Bullet key={b.slice(0, 48)}>{b}</Bullet>
                ))}
              </More>
            )}
          </AnimatePresence>
        </Bullets>
      )}

      {rest.length > 0 && (
        <Toggle
          type="button"
          $open={open}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          data-cursor={open ? 'Less' : 'More'}
        >
          {open ? 'Show less' : `+${rest.length} more`}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 9l7 7 7-7" />
          </svg>
        </Toggle>
      )}
    </Entry>
  );
}
