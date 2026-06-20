import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import SectionHeader from '../molecules/SectionHeader';
import { workflowCards } from '../../data/devWorkflow';
import type { WorkflowItem } from '../../data/devWorkflow';
import { fadeUp, staggerContainer } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

const MONO = "'IBM Plex Mono', 'SF Mono', monospace";

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (min-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

/* ── Card ────────────────────────────────────────────────────────── */

const Card = styled(motion.div)<{ $accent: string; $active: boolean }>`
  border-radius: 0.75rem;
  border: 1px solid
    ${({ $active, $accent }) => ($active ? `${$accent}50` : 'var(--card-border)')};
  background: var(--surface-elevated);
  overflow: hidden;
  cursor: pointer;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $accent }) => $accent};
    opacity: ${({ $active }) => ($active ? 1 : 0.4)};
    transition: opacity var(--transition-fast);
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $accent }) => `${$accent}40`};
      box-shadow: var(--card-shadow-hover);

      &::before { opacity: 1; }
    }
  }
`;

const CardHeader = styled.div`
  padding: 0.85rem 1rem 0.65rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const CardIcon = styled.div<{ $accent: string }>`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: ${({ $accent }) => `${$accent}12`};
  border: 1px solid ${({ $accent }) => `${$accent}22`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const CardTitles = styled.div`
  min-width: 0;
`;

const CardTitle = styled.h4`
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  line-height: 1.2;
`;

const CardSubtitle = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--text-muted);
  font-family: ${MONO};
`;

const CardDesc = styled.p`
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--text-muted);
  padding: 0 1rem 0.65rem;

  ${media.sm} {
    padding: 0 0.75rem 0.5rem;
    font-size: 0.72rem;
  }
`;

/* ── Expanded items ──────────────────────────────────────────────── */

const ItemList = styled(motion.div)`
  border-top: 1px solid var(--card-border);
  padding: 0.5rem 0;
`;

const ItemRow = styled.div<{ $accent: string }>`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.3rem 0.75rem;
  font-family: ${MONO};
  font-size: 0.7rem;
  line-height: 1.5;

  @media (hover: hover) {
    &:hover {
      background: ${({ $accent }) => `${$accent}06`};
    }
  }

  ${media.xs} {
    flex-wrap: wrap;
    gap: 0.15rem 0.35rem;
    padding: 0.3rem 0.6rem;
  }
`;

const ItemKey = styled.span<{ $accent: string }>`
  font-weight: 700;
  color: ${({ $accent }) => $accent};
  text-transform: uppercase;
  letter-spacing: 0.03em;
  min-width: 72px;
  flex-shrink: 0;
  opacity: 0.85;

  &::after { content: ' :'; }

  ${media.sm} {
    min-width: 60px;
  }

  ${media.xs} {
    min-width: auto;
    font-size: 0.6rem;
  }
`;

const ItemValue = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const CopyBtn = styled.button<{ $accent: string }>`
  font-size: 0.6rem;
  font-weight: 600;
  font-family: ${MONO};
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  border: 1px solid ${({ $accent }) => `${$accent}30`};
  background: ${({ $accent }) => `${$accent}0a`};
  color: ${({ $accent }) => $accent};
  cursor: pointer;
  flex-shrink: 0;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  transition: all var(--transition-fast);
  margin-left: auto;

  &:hover {
    background: ${({ $accent }) => `${$accent}18`};
    border-color: ${({ $accent }) => `${$accent}50`};
  }
`;

const CopiedToast = styled(motion.span)<{ $accent: string }>`
  font-size: 0.6rem;
  font-weight: 600;
  font-family: ${MONO};
  color: ${({ $accent }) => $accent};
  margin-left: auto;
  letter-spacing: 0.03em;
`;

const ExpandHint = styled.div<{ $accent: string }>`
  padding: 0.35rem 1rem 0.5rem;
  font-family: ${MONO};
  font-size: 0.6rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.7;
`;

/* ── Animation ───────────────────────────────────────────────────── */

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const expandVariant = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' as const, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

/* ── Copyable item sub-component ─────────────────────────────────── */

function CopyableRow({
  item,
  accent,
}: {
  item: WorkflowItem;
  accent: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!item.copyable) return;
      navigator.clipboard.writeText(item.copyable).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    },
    [item.copyable],
  );

  return (
    <ItemRow $accent={accent}>
      <ItemKey $accent={accent}>{item.label}</ItemKey>
      <ItemValue>{item.value}</ItemValue>
      {item.copyable && (
        <AnimatePresence mode="wait">
          {copied ? (
            <CopiedToast
              key="toast"
              $accent={accent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              COPIED
            </CopiedToast>
          ) : (
            <CopyBtn key="btn" $accent={accent} onClick={copy} title="Copy to clipboard">
              COPY
            </CopyBtn>
          )}
        </AnimatePresence>
      )}
    </ItemRow>
  );
}

/* ── Component ───────────────────────────────────────────────────── */

export default function DevWorkflowSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <Section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <SectionHeader
        label="Workflow"
        title="Dev Workflow"
        subtitle="Tools I build with — copy & use. Real configs and patterns from my workflow: Cursor rules, MCP servers, agent skills, and token-saving patterns you can drop into your own projects."
      />

      <Grid
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {workflowCards.map((card) => {
          const isOpen = expanded === card.id;
          return (
            <Card
              key={card.id}
              $accent={card.accent}
              $active={isOpen}
              variants={itemVariant}
              onClick={() => toggle(card.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(card.id);
                }
              }}
            >
              <CardHeader>
                <CardIcon $accent={card.accent}>{card.icon}</CardIcon>
                <CardTitles>
                  <CardTitle>{card.title}</CardTitle>
                  <CardSubtitle>{card.subtitle}</CardSubtitle>
                </CardTitles>
              </CardHeader>

              <CardDesc>{card.description}</CardDesc>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <ItemList
                    variants={expandVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {card.items.map((item) => (
                      <CopyableRow
                        key={item.label}
                        item={item}
                        accent={card.accent}
                      />
                    ))}
                  </ItemList>
                )}
              </AnimatePresence>

              {!isOpen && (
                <ExpandHint $accent={card.accent}>
                  [{card.items.length} items] Click to expand
                </ExpandHint>
              )}
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}
