import { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import SectionHeader from '../molecules/SectionHeader';
import { certifications } from '../../data/certifications';
import { fadeUp, staggerContainer } from '../../styles/animations';
import { sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

const Section = styled(motion.section)`
  ${sectionCentered};
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--block-gap);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ACCENT_CYCLE = ['#0071e3', '#5856d6', '#32ade6', '#af52de', '#34c759'];

const TiltWrap = styled.div`
  perspective: 800px;
`;

const Card = styled(motion.a)<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.35rem 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--card-border);
  border-left: 3px solid ${({ $accent }) => $accent};
  background: linear-gradient(
    135deg,
    ${({ $accent }) => `${$accent}08`} 0%,
    var(--surface-elevated) 55%
  );
  box-shadow: var(--card-shadow), var(--card-highlight);
  text-decoration: none;
  color: inherit;
  transition: box-shadow var(--transition), border-color var(--transition);
  transform-style: preserve-3d;
  will-change: transform;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: var(--card-shadow-hover);
    border-color: ${({ $accent }) => `${$accent}55`};
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

const CardGlow = styled.div<{ $x: number; $y: number; $accent: string; $show: boolean }>`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ $accent }) => `${$accent}15`} 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const CertIcon = styled.div<{ $accent: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ $accent }) => `${$accent}14`};
  border: 1px solid ${({ $accent }) => `${$accent}25`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  ${media.sm} {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
`;

const CertName = styled.span`
  font-size: 0.95rem;
  font-weight: 550;
  line-height: 1.35;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;
`;

const Meta = styled.span`
  font-size: 0.8rem;
  color: var(--text-muted);
  position: relative;
  z-index: 1;
`;

const VerifyLabel = styled.span<{ $accent: string }>`
  font-size: 0.7rem;
  font-weight: 500;
  color: ${({ $accent }) => $accent};
  opacity: 0;
  transition: opacity var(--transition);
  position: relative;
  z-index: 1;

  @media (hover: none) {
    opacity: 0.7;
  }
`;

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TiltCertCard({
  cert,
  accent,
  index,
}: {
  cert: (typeof certifications)[number];
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: ((y - cy) / cy) * -5,
      y: ((x - cx) / cx) * 5,
    });
    setGlow({ x, y });
  }, []);

  const CERT_ICONS = ['\u{1F3C6}', '\u{2601}\u{FE0F}', '\u{1F9E0}', '\u{1F4DC}', '\u{2B50}'];

  return (
    <TiltWrap>
      <Card
        ref={ref}
        $accent={accent}
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariant}
        aria-label={`${cert.name} from ${cert.issuer}`}
        style={{
          transform: hovering
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
            : 'rotateX(0) rotateY(0)',
          transition: hovering ? 'box-shadow 0.4s ease' : 'all 0.4s ease',
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setTilt({ x: 0, y: 0 });
        }}
      >
        <CardGlow $x={glow.x} $y={glow.y} $accent={accent} $show={hovering} />
        <CertIcon $accent={accent}>
          {CERT_ICONS[index % CERT_ICONS.length]}
        </CertIcon>
        <CertName>{cert.name}</CertName>
        <Meta>
          {cert.issuer} · {cert.date}
        </Meta>
        <VerifyLabel $accent={accent} style={hovering ? { opacity: 1 } : {}}>
          Verify credential →
        </VerifyLabel>
      </Card>
    </TiltWrap>
  );
}

export default function CertificationsSection() {
  return (
    <Section
      id="certifications-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <SectionHeader
        label="Credentials"
        title="Certifications"
        subtitle="Google Cloud · LinkedIn Learning (Anthropic) · Coursera. Hover and tap to verify."
      />

      <Grid
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {certifications.map((cert, index) => (
          <TiltCertCard
            key={cert.id}
            cert={cert}
            accent={ACCENT_CYCLE[index % ACCENT_CYCLE.length]}
            index={index}
          />
        ))}
      </Grid>
    </Section>
  );
}
