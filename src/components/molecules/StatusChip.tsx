import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface StatusChipProps {
  label: string;
  now: string;
  next: string;
}

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.6); opacity: 0; }
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
`;

const Dot = styled.span`
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--accent);
    animation: ${pulse} 2.2s var(--ease-out) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`;

const Label = styled.span`
  text-transform: uppercase;
  color: var(--text-faint);
`;

const Text = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.1rem;
  color: var(--text-primary);

  > span {
    white-space: nowrap;
  }
`;

const Arrow = styled.span`
  color: var(--accent-text);
  padding: 0 0.35rem;
`;

/** "Currently: now → next" — data-driven from one constant. */
export default function StatusChip({ label, now, next }: StatusChipProps) {
  return (
    <Chip>
      <Dot aria-hidden="true" />
      <Label>{label}</Label>
      <Text>
        <span>{now}</span>
        <Arrow aria-hidden="true">→</Arrow>
        <span className="sr-only">then</span>
        <span>{next}</span>
      </Text>
    </Chip>
  );
}
