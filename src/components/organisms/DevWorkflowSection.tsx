import { useCallback, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { fadeUp, softSpring, transitions } from '../../motion/variants';
import SectionHeader from '../molecules/SectionHeader';
import FilterPills, { type FilterOption } from '../molecules/FilterPills';
import CodeBlock from '../molecules/CodeBlock';
import { workflowCards, WORKFLOW_GROUPS, type WorkflowCard, type WorkflowGroup } from '../../data/devWorkflow';
import { useDismissable } from '../../hooks/useDismissable';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

type Filter = 'All' | WorkflowGroup;

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Grid = styled(motion.ul)`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Cell = styled(motion.li)<{ $open: boolean }>`
  min-width: 0;
  ${({ $open }) => $open && 'grid-column: 1 / -1;'}
`;

const Panel = styled(motion.div)<{ $open: boolean }>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
  border: 1px solid ${({ $open }) => ($open ? 'var(--accent-line)' : 'var(--border)')};
  background: ${({ $open }) => ($open ? 'var(--surface)' : 'transparent')};
  overflow: hidden;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $open }) => ($open ? 'var(--accent-line)' : 'var(--border-strong)')};
    }
  }
`;

const Trigger = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 1.1rem;
  text-align: left;
`;

const Head = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  width: 100%;
`;

const Index = styled.span`
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent-text);
  font-variant-numeric: tabular-nums;
`;

const Title = styled.h3`
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--text-primary);
`;

const Chevron = styled(motion.span)`
  margin-left: auto;
  display: inline-grid;
  place-items: center;
  color: var(--text-faint);

  svg {
    width: 12px;
    height: 12px;
    stroke: currentColor;
    stroke-width: 1.75;
    fill: none;
    stroke-linecap: round;
  }
`;

const Path = styled.span`
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.02em;
  color: var(--text-faint);
  overflow-wrap: anywhere;
`;

const Summary = styled.p`
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-muted);
`;

const Body = styled(motion.div)`
  overflow: hidden;
`;

const BodyInner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(1rem, 2.5vw, 2rem);
  padding: 0 1.1rem 1.1rem;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  margin-top: 0.25rem;

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Items = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
  margin: 0;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: minmax(88px, 108px) minmax(0, 1fr);
  gap: 0.75rem;
  align-items: baseline;
  font-size: 0.82rem;
  line-height: 1.5;

  dt {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  dd {
    margin: 0;
    color: var(--text-primary);
    overflow-wrap: anywhere;
  }

  ${media.xs} {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.1rem;
  }
`;

const Empty = styled.p`
  padding: 2rem 0;
  color: var(--text-muted);
  font-size: 0.9rem;
`;

interface CardPanelProps {
  card: WorkflowCard;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

function CardPanel({ card, index, isOpen, onToggle }: CardPanelProps) {
  const bodyId = `workflow-${card.id}-body`;

  return (
    <Cell layout $open={isOpen} transition={softSpring}>
      <Panel layout $open={isOpen} transition={softSpring}>
        <Trigger
          type="button"
          aria-expanded={isOpen}
          aria-controls={bodyId}
          onClick={() => onToggle(card.id)}
          data-cursor={isOpen ? 'Close' : 'Open'}
        >
          <Head>
            <Index aria-hidden="true">{String(index + 1).padStart(2, '0')}</Index>
            <Title>{card.title}</Title>
            <Chevron animate={{ rotate: isOpen ? 180 : 0 }} transition={transitions.fast} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 9l7 7 7-7" />
              </svg>
            </Chevron>
          </Head>
          <Path>{card.subtitle}</Path>
          <Summary>{card.description}</Summary>
        </Trigger>

        <AnimatePresence initial={false}>
          {isOpen && (
            <Body
              id={bodyId}
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transitions.base}
            >
              <BodyInner>
                <Items>
                  {card.items.map((item) => (
                    <Item key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </Item>
                  ))}
                </Items>
                <CodeBlock
                  code={card.snippet.code}
                  language={card.snippet.language}
                  fileName={card.snippet.fileName}
                />
              </BodyInner>
            </Body>
          )}
        </AnimatePresence>
      </Panel>
    </Cell>
  );
}

export default function DevWorkflowSection() {
  const [filter, setFilter] = useState<Filter>('All');
  const [openId, setOpenId] = useState<string | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  const options = useMemo<FilterOption<Filter>[]>(
    () => [
      { value: 'All', label: 'All', count: workflowCards.length },
      ...WORKFLOW_GROUPS.map((group) => ({
        value: group as Filter,
        label: group,
        count: workflowCards.filter((c) => c.group === group).length,
      })),
    ],
    [],
  );

  const visible = useMemo(
    () => (filter === 'All' ? workflowCards : workflowCards.filter((c) => c.group === filter)),
    [filter],
  );

  const toggle = useCallback((id: string) => setOpenId((prev) => (prev === id ? null : id)), []);
  const close = useCallback(() => setOpenId(null), []);

  // Dismissal is owned here, not per card: a press on another card's header is
  // inside the grid, so that card's own click switches panels instead of the
  // open one closing on pointerdown and shifting the layout mid-click.
  useDismissable(gridRef, openId !== null, close);

  const onFilterChange = useCallback((value: Filter) => {
    setFilter(value);
    setOpenId(null);
  }, []);

  return (
    <Section
      aria-labelledby="workflow-title"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <SectionHeader
        label="Workflow"
        title="Dev Workflow"
        titleId="workflow-title"
        subtitle="How I actually work with AI agents: the rules, servers, skills and patterns. Open any card for the real config."
      >
        <FilterPills
          options={options}
          active={filter}
          onChange={onFilterChange}
          layoutId="workflow-filter"
          label="Filter workflow cards"
        />
      </SectionHeader>

      <Grid ref={gridRef} layout transition={softSpring}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((card) => (
            <CardPanel
              key={card.id}
              card={card}
              index={workflowCards.indexOf(card)}
              isOpen={openId === card.id}
              onToggle={toggle}
            />
          ))}
        </AnimatePresence>
      </Grid>

      {visible.length === 0 && <Empty>No cards in this group.</Empty>}
    </Section>
  );
}
