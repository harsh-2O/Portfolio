import styled from '@emotion/styled';
import { useLocalTime } from '../../hooks/useLocalTime';
import { scrollToTarget } from '../../lib/scroll';
import { sectionContainer } from '../../styles/layout';
import { media } from '../../styles/mixins';

const TIME_ZONE = 'Asia/Kolkata';
const PLACE = 'Gurugram';

const Footer = styled.footer`
  ${sectionContainer};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding-top: 1.5rem;
  padding-bottom: max(var(--footer-padding-bottom), env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  color: var(--text-faint);

  ${media.sm} {
    justify-content: flex-start;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  min-width: 0;
`;

const Clock = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
`;

const Top = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color var(--transition-fast);

  svg {
    width: 11px;
    height: 11px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
    }
  }
`;

export default function FooterSection() {
  const time = useLocalTime(TIME_ZONE);

  return (
    <Footer>
      <Group>
        <span>&copy; {new Date().getFullYear()} Harsh Mehta</span>
        <span>Built with React · Vite · framer-motion</span>
      </Group>

      <Group>
        {time && (
          <Clock>
            <Dot aria-hidden="true" />
            {PLACE} {time}
          </Clock>
        )}
        <Top type="button" onClick={() => scrollToTarget(0)} data-cursor="Top">
          Back to top
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </Top>
      </Group>
    </Footer>
  );
}
