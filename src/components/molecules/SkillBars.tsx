import { useId, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion, useInView } from '../../lib/motion';
import { durations, easings } from '../../theme/tokens';
import { transitions } from '../../motion/variants';
import { media } from '../../styles/mixins';
import type { Skill } from '../../data/skills';

interface SkillBarsProps {
  skills: Skill[];
  /** Staggers the fill so a group draws left to right, top to bottom. */
  startDelay?: number;
}

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.1rem 2.5rem;

  ${media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Row = styled.li`
  position: relative;
`;

const Trigger = styled.button<{ $open: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2.5rem;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 44px;
  padding: 0.35rem 0;
  text-align: left;
  color: ${({ $open }) => ($open ? 'var(--text-primary)' : 'var(--text-muted)')};
  transition: color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
    }
  }
`;

const Label = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

const Name = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text-primary);
`;

const Track = styled.span`
  position: relative;
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--border);
  overflow: hidden;
`;

const Fill = styled(motion.span)`
  position: absolute;
  inset: 0 auto 0 0;
  display: block;
  border-radius: 2px;
  background: var(--accent);
  transform-origin: 0 50%;
`;

/** Faint tick showing where industry demand sits, for contrast with level. */
const DemandTick = styled.span<{ $at: number }>`
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: ${({ $at }) => $at}%;
  width: 1px;
  background: var(--text-faint);
  opacity: 0.6;
`;

const Value = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-align: right;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
`;

const Tip = styled(motion.div)`
  position: relative;
  z-index: 2;
  margin: 0.2rem 0 0.6rem;
  padding: 0.7rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
  background: var(--surface);
  box-shadow: var(--shadow-md);
`;

const TipText = styled.p`
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--text-muted);
`;

const TipMeta = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.25rem;
  margin: 0.5rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.66rem;

  div {
    display: flex;
    gap: 0.4rem;
    min-width: 0;
  }

  dt {
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-faint);
    white-space: nowrap;
  }

  dd {
    margin: 0;
    color: var(--text-primary);
    overflow-wrap: anywhere;
  }
`;

/** Grouped proficiency bars with a demand tick and an on-demand context panel. */
export default function SkillBars({ skills, startDelay = 0 }: SkillBarsProps) {
  const [openName, setOpenName] = useState<string | null>(null);
  // One observer for the whole group. Per-element `whileInView` proved unreliable
  // here: inside the grid, only one column's bars ever received the in-view state.
  const listRef = useRef<HTMLUListElement>(null);
  const inView = useInView(listRef, { once: true, margin: '-40px' });

  return (
    <List ref={listRef}>
      {skills.map((skill, i) => (
        <SkillRow
          key={skill.name}
          skill={skill}
          index={i}
          startDelay={startDelay}
          inView={inView}
          open={openName === skill.name}
          onToggle={() => setOpenName((prev) => (prev === skill.name ? null : skill.name))}
        />
      ))}
    </List>
  );
}

interface SkillRowProps {
  skill: Skill;
  index: number;
  startDelay: number;
  inView: boolean;
  open: boolean;
  onToggle: () => void;
}

function SkillRow({ skill, index, startDelay, inView, open, onToggle }: SkillRowProps) {
  const panelId = useId();

  return (
    <Row>
      <Trigger
        type="button"
        $open={open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        data-cursor={open ? 'Less' : 'Info'}
      >
        <Label>
          <Name>{skill.name}</Name>
          <Track>
            <Fill
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? skill.level / 100 : 0 }}
              transition={{
                duration: durations.slower,
                ease: easings.out,
                delay: startDelay + index * 0.035,
              }}
              style={{ width: '100%' }}
            />
            <DemandTick $at={skill.demand} aria-hidden="true" />
          </Track>
        </Label>
        <Value>{skill.level}</Value>
      </Trigger>

      <AnimatePresence initial={false}>
        {open && (
          <Tip
            id={panelId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={transitions.fast}
          >
            <TipText>{skill.description}</TipText>
            {skill.detail && <TipText style={{ marginTop: '0.5rem' }}>{skill.detail}</TipText>}
            <TipMeta>
              <div>
                <dt>Level</dt>
                <dd>{skill.level}</dd>
              </div>
              <div>
                <dt>2026 demand</dt>
                <dd>{skill.demand}</dd>
              </div>
              {skill.meta?.map((m) => (
                <div key={m.key}>
                  <dt>{m.key.replace(/_/g, ' ')}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </TipMeta>
          </Tip>
        )}
      </AnimatePresence>
    </Row>
  );
}
