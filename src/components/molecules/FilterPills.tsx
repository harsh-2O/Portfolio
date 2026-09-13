import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { navIndicator } from '../../motion/variants';
import { media } from '../../styles/mixins';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface FilterPillsProps<T extends string> {
  options: FilterOption<T>[];
  active: T;
  onChange: (value: T) => void;
  /** Unique per instance — two pill rows on one page must not share a layoutId. */
  layoutId: string;
  label: string;
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;

  ${media.sm} {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    padding-bottom: 0.25rem;
  }
`;

const Pill = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 36px;
  padding: 0 0.85rem;
  border-radius: var(--radius-pill);
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'var(--border)')};
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  flex-shrink: 0;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  transition: color var(--transition-fast), border-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
    }
  }

  ${media.md} {
    min-height: 44px;
  }
`;

const Indicator = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: var(--radius-pill);
  background: var(--accent-subtle);
  border: 1px solid var(--accent-line);
`;

const Label = styled.span`
  position: relative;
`;

const Count = styled.span<{ $active: boolean }>`
  position: relative;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-variant-numeric: tabular-nums;
  color: ${({ $active }) => ($active ? 'var(--accent-text)' : 'var(--text-faint)')};
`;

/** Segmented filter row with a single indicator that morphs between options. */
export default function FilterPills<T extends string>({
  options,
  active,
  onChange,
  layoutId,
  label,
}: FilterPillsProps<T>) {
  return (
    <Row role="group" aria-label={label}>
      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <Pill
            key={option.value}
            type="button"
            $active={isActive}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {isActive && <Indicator layoutId={layoutId} transition={navIndicator} />}
            <Label>{option.label}</Label>
            {option.count !== undefined && <Count $active={isActive}>{option.count}</Count>}
          </Pill>
        );
      })}
    </Row>
  );
}
