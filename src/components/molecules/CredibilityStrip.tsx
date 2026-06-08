import styled from '@emotion/styled';

const STATS = [
  { value: '12', label: 'Global exchanges' },
  { value: '100K+', label: 'Market data points' },
  { value: 'MS AI', label: "Texas A&M '28" },
  { value: 'Graviton', label: 'Research Capital' },
] as const;

const Strip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: clamp(1rem, 3vw, 1.5rem);
  border: 1px solid var(--card-border);
  background: var(--surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled.div`
  padding: clamp(0.85rem, 2.5vw, 1.15rem) clamp(0.75rem, 2vw, 1.25rem);
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 20%;
    right: 0;
    bottom: 20%;
    width: 1px;
    background: var(--card-border);
  }

  @media (max-width: 768px) {
    &:nth-child(2)::after {
      display: none;
    }

    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: 1px solid var(--card-border);
    }
  }
`;

const Value = styled.p`
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.1;
`;

const Label = styled.p`
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 0.25rem;
`;

/** Finance-style credibility metrics — Succession editorial stat strip */
export default function CredibilityStrip() {
  return (
    <Strip aria-label="Key metrics">
      {STATS.map(({ value, label }) => (
        <Stat key={label}>
          <Value>{value}</Value>
          <Label>{label}</Label>
        </Stat>
      ))}
    </Strip>
  );
}
