import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import SectionHeader from '../molecules/SectionHeader';
import { certifications } from '../../data/certifications';
import { fadeUp, staggerContainer } from '../../styles/animations';
import { sectionCentered } from '../../styles/layout';

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
`;

const ACCENT_CYCLE = ['#0071e3', '#5856d6', '#32ade6', '#af52de', '#34c759'];

const Card = styled(motion.a)<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem 1.35rem;
  border-radius: 1rem;
  border: 1px solid var(--card-border);
  border-left: 3px solid ${({ $accent }) => $accent};
  background: linear-gradient(135deg, ${({ $accent }) => `${$accent}08`} 0%, var(--surface-elevated) 55%);
  box-shadow: var(--card-shadow);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition);

  &:hover {
    background: var(--surface);
    border-color: ${({ $accent }) => `${$accent}55`};
    box-shadow: var(--card-shadow-hover);
    transform: translateY(-3px);
  }
`;

const CertName = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.01em;
`;

const Meta = styled.span`
  font-size: 0.8rem;
  color: var(--text-muted);
`;

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
        subtitle="Google Cloud · LinkedIn Learning (Anthropic) · Coursera. Tap to verify."
      />

      <Grid variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {certifications.map((cert, index) => (
          <Card
            key={cert.id}
            $accent={ACCENT_CYCLE[index % ACCENT_CYCLE.length]}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariant}
            aria-label={`${cert.name} from ${cert.issuer}`}
          >
            <CertName>{cert.name}</CertName>
            <Meta>{cert.issuer} · {cert.date}</Meta>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
