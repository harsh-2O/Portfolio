/**
 * Hero — typewriter name, crossfading roles, ambient glow, status badges.
 */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { CONTACT } from '../../config/site';
import type { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { sectionContainer, headingHero, headingRole } from '../../styles/layout';
import { media } from '../../styles/mixins';

type HeroRefs = ReturnType<typeof useHeroAnimation>;

const HERO_BADGES = ['Graviton Research', 'MS AI · Texas A&M', '2× GCP Certified'];

const heroFadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MainContent = styled.section`
  ${sectionContainer};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: var(--header-height);
  padding-top: clamp(1.5rem, 5vw, 5rem);
  padding-bottom: clamp(2rem, 6vw, 5rem);
  gap: var(--section-gap);
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: clamp(3rem, 8vw, 6rem);
    background: linear-gradient(180deg, transparent, var(--background));
    pointer-events: none;
    z-index: 0;
  }

  ${media.lgUp} {
    min-height: calc(100dvh - var(--header-height));
    padding-top: clamp(2rem, 6vw, 5rem);
    padding-bottom: clamp(3rem, 7vw, 5rem);
  }
`;

const Ambient = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Orb = styled.div<{ $x: string; $y: string; $size: string; $delay: string; $color: string }>`
  position: absolute;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: radial-gradient(circle, ${({ $color }) => $color} 0%, transparent 70%);
  filter: blur(28px);
  animation: float 12s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay};

  @media (max-width: 768px) {
    filter: blur(16px);
    opacity: 0.7;
  }

  &.hero-orb-third {
    @media (max-width: 480px) {
      display: none;
    }
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(12px, -18px) scale(1.05); }
    66% { transform: translate(-8px, 10px) scale(0.95); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--card-border) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.35;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%);
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.25rem);
  min-width: 0;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  width: fit-content;
  animation: ${heroFadeUp} 0.6s ease 0.1s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const LiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--text-primary);
`;

const NameLine = styled.span`
  ${headingHero};
  display: block;
  overflow-wrap: anywhere;
  /* Prevent descender clip on large display type */
  padding-bottom: 0.04em;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.2rem 0.5rem;
  max-width: 100%;
  padding-bottom: 0.12em;

  ${media.sm} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }
`;

const RolePrefix = styled.span`
  ${headingRole};
  font-weight: 400;
  color: var(--text-muted);
  flex-shrink: 0;
  line-height: 1.25;
`;

const ChangingText = styled.span`
  ${headingRole};
  display: inline-block;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.25;
  padding-bottom: 0.1em;
  background: linear-gradient(135deg, var(--text-primary) 30%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* background-clip:text often clips descenders — pad the paint box */
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const BADGE_ACCENTS = ['#0071e3', '#5856d6', '#32ade6'];

const Badge = styled.span<{ $accent: string }>`
  font-size: var(--text-small);
  font-weight: 500;
  padding: 0.4rem 0.75rem;
  max-width: 100%;
  border-radius: 100px;
  border: 1px solid ${({ $accent }) => `${$accent}35`};
  background: ${({ $accent }) => `${$accent}10`};
  color: var(--text-muted);
  backdrop-filter: blur(8px);
  box-shadow: var(--card-highlight);
  transition: border-color var(--transition), color var(--transition), box-shadow var(--transition);

  &:hover {
    border-color: ${({ $accent }) => $accent};
    color: ${({ $accent }) => $accent};
    box-shadow: 0 2px 12px ${({ $accent }) => `${$accent}25`}, var(--card-highlight);
  }
`;

const ContactSection = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  gap: clamp(1.25rem, 4vw, 3rem);
  padding-top: 1.25rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--divider);
  }

  ${media.md} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ContactInfo = styled.div`
  flex-shrink: 0;
  min-width: 0;

  h3 {
    font-size: var(--text-h2);
    font-weight: 600;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

const ContactLink = styled.a`
  font-size: var(--text-body);
  color: var(--text-muted);
  transition: color var(--transition);
  overflow-wrap: anywhere;
  word-break: break-word;

  &:hover { color: var(--accent); }
`;

const Description = styled.p`
  flex: 1;
  min-width: 0;
  max-width: 420px;
  font-size: var(--text-body);
  line-height: 1.65;
  text-align: right;
  color: var(--text-muted);
  letter-spacing: -0.01em;

  ${media.md} {
    text-align: left;
    max-width: 100%;
  }

  ${media.xlUp} {
    max-width: 480px;
  }
`;

export default function HeroSection(refs: HeroRefs) {
  return (
    <MainContent id="main-section">
      <Ambient aria-hidden="true">
        <Grid />
        <Orb $x="75%" $y="5%" $size="min(420px, 55vw)" $delay="0s" $color="rgba(0, 113, 227, 0.14)" />
        <Orb $x="-5%" $y="60%" $size="min(300px, 40vw)" $delay="-4s" $color="rgba(88, 86, 214, 0.1)" />
        <Orb $x="40%" $y="80%" $size="min(200px, 30vw)" $delay="-8s" $color="rgba(0, 113, 227, 0.08)" className="hero-orb-third" />
      </Ambient>

      <Content>
        <Eyebrow>
          <LiveDot />
          Portfolio · 2026
        </Eyebrow>

        <Title>
          <NameLine ref={refs.titleSpanRef}>Harsh Mehta</NameLine>
          <TitleContainer>
            <RolePrefix ref={refs.plusSignRef}>—</RolePrefix>
            <ChangingText ref={refs.changingTextRef}>Quant Tools Developer</ChangingText>
          </TitleContainer>
        </Title>

        <BadgeRow ref={refs.badgesRef}>
          {HERO_BADGES.map((badge, index) => (
            <Badge key={badge} $accent={BADGE_ACCENTS[index % BADGE_ACCENTS.length]}>
              {badge}
            </Badge>
          ))}
        </BadgeRow>
      </Content>

      <ContactSection>
        <ContactInfo ref={refs.contactInfoRef}>
          <h3>Let's talk</h3>
          <ContactLinks>
            <ContactLink href={`mailto:${CONTACT.email}`}>{CONTACT.email}</ContactLink>
            <ContactLink href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</ContactLink>
          </ContactLinks>
        </ContactInfo>
        <Description ref={refs.descriptionRef}>
          Quant Tools Developer at Graviton Research Capital — building trading systems,
          market data infrastructure, and AI-powered tooling across 12 global exchanges.
        </Description>
      </ContactSection>
    </MainContent>
  );
}
