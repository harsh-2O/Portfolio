import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import ExperienceSection from './ExperienceSection';
import SectionHeader from '../molecules/SectionHeader';
import { experienceSections } from '../../data/experience';
import { fadeUp } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const DownloadButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  min-height: 44px;
  background: var(--surface-elevated);
  color: var(--accent);
  border: 1.5px solid var(--accent-line);
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
    box-shadow: 0 4px 16px rgba(0, 113, 227, 0.3);
    transform: translateY(-2px);
  }

  svg { width: 16px; height: 16px; }
`;

export default function ResumeSection() {
  return (
    <Section
      id="resume-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <SectionHeader
        label="Background"
        title="Resume"
        subtitle="Education, experience, and impact — synced with my latest CV."
      >
        <DownloadButton
          onClick={() => window.open('/assets/resume/resume.pdf', '_blank', 'noopener,noreferrer')}
          aria-label="Download resume PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </DownloadButton>
      </SectionHeader>
      <ExperienceSection sections={experienceSections} />
    </Section>
  );
}
