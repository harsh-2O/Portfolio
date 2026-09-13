import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { fadeUp, transitions } from '../../motion/variants';
import ContactForm from '../molecules/ContactForm';
import CopyChip from '../atoms/CopyChip';
import { CONTACT, SOCIAL_LINKS } from '../../config/site';
import { sectionContainer } from '../../styles/layout';
import { media } from '../../styles/mixins';

const HEADLINE = "Let's build something precise.";

const Section = styled(motion.section)`
  ${sectionContainer};
  padding-top: var(--footer-padding-top);
  padding-bottom: clamp(2rem, 4vw, 3rem);
`;

const Headline = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 6vw, 5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--text-primary);
  max-width: 18ch;
`;

const Word = styled(motion.span)`
  display: inline-block;
  white-space: pre;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
  margin-top: clamp(2rem, 4vw, 3.5rem);

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

const Lede = styled.p`
  font-size: var(--text-body);
  line-height: 1.65;
  color: var(--text-muted);
  max-width: 36ch;
`;

const Direct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const DirectLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Socials = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 44px;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color var(--transition-fast);

  svg {
    width: 11px;
    height: 11px;
    stroke: currentColor;
    stroke-width: 1.9;
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

export default function ContactSection() {
  return (
    <Section
      aria-labelledby="contact-title"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <Headline id="contact-title">
        {HEADLINE.split(' ').map((word, i) => (
          <Word
            key={`${word}-${i}`}
            whileHover={{ y: -6 }}
            transition={transitions.base}
          >
            {word}
            {i < HEADLINE.split(' ').length - 1 ? ' ' : ''}
          </Word>
        ))}
      </Headline>

      <Layout>
        <Side>
          <Lede>
            Open to quant infrastructure, low-latency systems and applied AI work. Tell me what you
            are building and I will reply from Gurugram.
          </Lede>

          <Direct>
            <DirectLabel>Direct</DirectLabel>
            <Chips>
              <CopyChip value={CONTACT.email} label="Email address" />
              <CopyChip value={CONTACT.phone} label="Phone number" />
            </Chips>
          </Direct>

          <Socials>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <SocialLink href={link.href} target="_blank" rel="noopener noreferrer" data-cursor="Open">
                  {link.label}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </SocialLink>
              </li>
            ))}
          </Socials>
        </Side>

        <ContactForm />
      </Layout>
    </Section>
  );
}
