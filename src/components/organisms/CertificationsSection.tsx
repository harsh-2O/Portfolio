import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { fadeUp, staggerContainer, staggerItem } from '../../motion/variants';
import SectionHeader from '../molecules/SectionHeader';
import { certifications, type Certification } from '../../data/certifications';
import { useTilt } from '../../hooks/useTilt';
import { sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

const Section = styled(motion.section)`
  ${sectionCentered};
`;

const Grid = styled(motion.ul)`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.65rem, 1.2vw, 1rem);

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Cell = styled(motion.li)`
  perspective: 900px;
  min-width: 0;
`;

const Card = styled(motion.a)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.1rem 1.2rem 1.2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: var(--border-strong);
    }
  }
`;

/** Soft specular sweep that follows the pointer across the card face. */
const Specular = styled.span<{ $x: number; $y: number; $on: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ $on }) => ($on ? 1 : 0)};
  transition: opacity var(--transition);
  background: radial-gradient(
    420px circle at ${({ $x }) => $x}% ${({ $y }) => $y}%,
    rgba(var(--text-rgb), 0.07),
    transparent 45%
  );
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Issuer = styled.span`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Verified = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-text);

  svg {
    width: 11px;
    height: 11px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Name = styled.span`
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text-primary);
`;

const Foot = styled.span`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
`;

const Action = styled.span`
  color: var(--accent-text);
`;

function CertCard({ cert }: { cert: Certification }) {
  const { ref, rotateX, rotateY, glow, active, onPointerMove, onPointerLeave } =
    useTilt<HTMLAnchorElement>({ max: 6 });

  return (
    <Cell variants={staggerItem}>
      <Card
        ref={ref}
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        data-cursor="Verify"
      >
        <Specular $x={glow.x} $y={glow.y} $on={active} aria-hidden="true" />
        <Head>
          <Issuer>{cert.issuer}</Issuer>
          <Verified>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            Verified
          </Verified>
        </Head>
        <Name>{cert.name}</Name>
        <Foot>
          <span>{cert.date}</span>
          <Action aria-hidden="true">Credential →</Action>
        </Foot>
      </Card>
    </Cell>
  );
}

export default function CertificationsSection() {
  return (
    <Section
      aria-labelledby="certifications-title"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <SectionHeader
        label="Credentials"
        title="Certifications"
        titleId="certifications-title"
        subtitle="Google Cloud, Anthropic via LinkedIn Learning, and Coursera coursework. Each card links to its credential."
      />

      <Grid variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {certifications.map((cert) => (
          <CertCard key={cert.id} cert={cert} />
        ))}
      </Grid>
    </Section>
  );
}
