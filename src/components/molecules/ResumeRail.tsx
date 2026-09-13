import { useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { navIndicator } from '../../motion/variants';
import { headerOffset, scrollToTarget } from '../../lib/scroll';
import { media } from '../../styles/mixins';

export interface RailItem {
  id: string;
  number: string;
  label: string;
}

interface ResumeRailProps {
  items: RailItem[];
  activeId: string | null;
}

const Rail = styled.nav`
  position: sticky;
  top: calc(var(--header-height) + 2rem);
  align-self: start;

  ${media.lg} {
    position: sticky;
    top: var(--header-height);
    z-index: 5;
    margin: 0 calc(-1 * var(--section-padding-x));
    padding: 0.5rem var(--section-padding-x);
    background: var(--background);
    border-bottom: 1px solid var(--border);
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  ${media.lg} {
    flex-direction: row;
    gap: 0.25rem;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Item = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 44px;
  padding: 0.55rem 0.9rem;
  border-radius: var(--radius-sm);
  text-align: left;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  transition: color var(--transition-fast);
  white-space: nowrap;

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
    }
  }

  ${media.lg} {
    width: auto;
    padding: 0.5rem 0.85rem;
    font-size: 0.85rem;
  }
`;

const Marker = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: var(--radius-sm);
  background: var(--accent-subtle);
  box-shadow: inset 2px 0 0 var(--accent);

  ${media.lg} {
    box-shadow: inset 0 -2px 0 var(--accent);
  }
`;

const Index = styled.span<{ $active: boolean }>`
  position: relative;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ $active }) => ($active ? 'var(--accent-text)' : 'var(--text-faint)')};
  transition: color var(--transition-fast);
`;

const Label = styled.span`
  position: relative;
`;

/** Sticky sub-section rail; collapses to sticky horizontal tabs below 1024px. */
export default function ResumeRail({ items, activeId }: ResumeRailProps) {
  const railRef = useRef<HTMLElement>(null);

  const jump = (id: string) => {
    // Below 1024px the rail is a sticky tab strip under the header; leave room for it.
    const tabs = window.matchMedia('(max-width: 1024px)').matches ? (railRef.current?.offsetHeight ?? 0) : 0;
    scrollToTarget(id, { offset: -(headerOffset() + tabs + 24) });
  };

  return (
    <Rail ref={railRef} aria-label="Resume sections">
      <List>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <Item
                type="button"
                $active={active}
                aria-current={active ? 'true' : undefined}
                onClick={() => jump(item.id)}
              >
                {active && <Marker layoutId="resume-rail-marker" transition={navIndicator} />}
                <Index $active={active}>{item.number}</Index>
                <Label>{item.label}</Label>
              </Item>
            </li>
          );
        })}
      </List>
    </Rail>
  );
}
