import styled from '@emotion/styled';
import { headingSection } from '../../styles/layout';
import { media } from '../../styles/mixins';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: clamp(1.5rem, 4vw, 3.5rem);

  ${media.md} {
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 640px;
  min-width: 0;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--font-primary);
  font-size: var(--text-label);
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  width: fit-content;

  &::before {
    content: '';
    width: 24px;
    height: 1px;
    background: var(--accent);
  }
`;

const Title = styled.h2`
  ${headingSection};
  color: var(--text-primary);
  padding-bottom: 0.04em;
`;

const Subtitle = styled.p`
  font-size: var(--text-body);
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 52ch;
`;

const ActionSlot = styled.div`
  flex-shrink: 0;

  ${media.md} {
    width: 100%;

    button,
    a {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default function SectionHeader({ label, title, subtitle, children }: SectionHeaderProps) {
  return (
    <Wrapper>
      <TextGroup>
        {label && <Label>{label}</Label>}
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TextGroup>
      {children && <ActionSlot>{children}</ActionSlot>}
    </Wrapper>
  );
}
