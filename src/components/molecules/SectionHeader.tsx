import styled from '@emotion/styled';
import { headingSection } from '../../styles/layout';
import { media } from '../../styles/mixins';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  /** Id placed on the heading so the parent section can use `aria-labelledby`. */
  titleId?: string;
  children?: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--section-inner-gap);
  margin-bottom: var(--section-header-space);

  ${media.md} {
    flex-direction: column;
    align-items: stretch;
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
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--accent-text);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  width: fit-content;

  &::before {
    content: '';
    width: 20px;
    height: 1px;
    background: var(--accent);
    flex-shrink: 0;
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
  line-height: 1.6;
`;

const ActionSlot = styled.div`
  flex-shrink: 0;

  ${media.md} {
    width: 100%;

    /* Direct children only — composite controls (e.g. filter pills) keep their own layout. */
    > button,
    > a {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default function SectionHeader({ label, title, subtitle, titleId, children }: SectionHeaderProps) {
  return (
    <Wrapper>
      <TextGroup>
        {label && <Label>{label}</Label>}
        <Title id={titleId}>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TextGroup>
      {children && <ActionSlot>{children}</ActionSlot>}
    </Wrapper>
  );
}
