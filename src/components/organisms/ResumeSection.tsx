import { useMemo } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { fadeUp } from '../../motion/variants';
import SectionHeader from '../molecules/SectionHeader';
import ResumeRail from '../molecules/ResumeRail';
import DownloadResumeButton from '../atoms/DownloadResumeButton';
import Timeline from './Timeline';
import { experienceSections } from '../../data/experience';
import { useActiveId } from '../../hooks/useActiveId';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;

  @media (min-width: 1440px) {
    grid-template-columns: 260px minmax(0, 1fr);
  }

  ${media.lg} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Content = styled.div`
  min-width: 0;
`;

export default function ResumeSection() {
  const ids = useMemo(() => experienceSections.map((s) => s.id), []);
  const activeId = useActiveId(ids);
  const railItems = useMemo(
    () => experienceSections.map((s) => ({ id: s.id, number: s.number, label: s.shortTitle })),
    [],
  );

  return (
    <Section
      aria-labelledby="resume-title"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <SectionHeader
        label="Background"
        title="Resume"
        titleId="resume-title"
        subtitle="Education, experience, and impact — synced with my latest CV."
      >
        <DownloadResumeButton />
      </SectionHeader>

      <Layout>
        <ResumeRail items={railItems} activeId={activeId} />
        <Content>
          {experienceSections.map((section) => (
            <Timeline key={section.id} data={section} />
          ))}
        </Content>
      </Layout>
    </Section>
  );
}
