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
  gap: 0.6rem;
  max-width: 640px;
  min-width: 0;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  width: fit-content;

  &::before {
    content: '';
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }
`;

const Title = styled.h2`
  ${headingSection};
  background: linear-gradient(135deg, var(--text-primary) 70%, var(--accent) 160%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-bottom: 0.04em;
`;

const Subtitle = styled.p`
  font-size: var(--text-body);
  color: var(--text-muted);
  line-height: 1.6;
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
