import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { CONTACT } from '../../config/site';
import { fadeUp } from '../../styles/animations';
import { sectionContainer } from '../../styles/layout';
import { media } from '../../styles/mixins';

const Footer = styled(motion.footer)`
  ${sectionContainer};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--footer-padding-top);
  padding-bottom: max(var(--footer-padding-bottom), env(safe-area-inset-bottom, 0px));
  gap: clamp(2rem, 4vw, 3rem);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(320px, 60vw);
    height: 1px;
    background: var(--divider);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: min(600px, 90vw);
    height: min(400px, 60vw);
    border-radius: 50%;
    background: radial-gradient(ellipse, var(--glow-color) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    opacity: 0.8;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.25rem, 4vw, 2rem);
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 10vw, 6.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.08;
  padding-bottom: 0.04em;
`;

const EmailButton = styled.a`
  background: var(--accent-gradient);
  color: #fff;
  border-radius: 9rem;
  padding: clamp(0.85rem, 2vw, 1.1rem) clamp(1.25rem, 4vw, 2rem);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: clamp(0.8rem, 2.5vw, 1.05rem);
  font-weight: 500;
  max-width: min(100%, 420px);
  text-align: center;
  word-break: break-word;
  transition: transform var(--transition), opacity var(--transition);

  &:hover { transform: scale(1.04); opacity: 0.92; }
  svg { width: 16px; height: 16px; flex-shrink: 0; }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 1.5rem;
  border-top: 1px solid var(--card-border);
  gap: 1rem;
  position: relative;
  z-index: 1;

  ${media.sm} {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: var(--text-small);
  color: var(--text-muted);
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 1.75rem;
`;

const SocialLink = styled.a`
  font-size: var(--text-small);
  color: var(--text-muted);
  transition: color var(--transition);
  &:hover { color: var(--accent); }
`;

export default function FooterSection() {
  return (
    <Footer
      id="footer-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <Top>
        <Title>Let's talk.</Title>
        <EmailButton href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17L17 7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </EmailButton>
      </Top>

      <Bottom>
        <Copyright>© 2026 Harsh Mehta</Copyright>
        <SocialLinks>
          <SocialLink href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</SocialLink>
          <SocialLink href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
          <SocialLink href="https://leetcode.com/u/JamesHiding" target="_blank" rel="noopener noreferrer">LeetCode</SocialLink>
        </SocialLinks>
      </Bottom>
    </Footer>
  );
}
