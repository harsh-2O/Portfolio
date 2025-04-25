import { useEffect} from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date: string;
  gpa?: string;
}

interface SectionProps {
  number: string;
  title: string;
  items: TimelineItemProps[];
}

const Section = styled.section`
  width: 100%;
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
  
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-direction: column;
  }
`;

const SectionNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const TimelineContainer = styled.div`
  margin-left: 2rem;
  // background: cyan;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    margin-left: 2rem;
  }
  
  @media (max-width: 480px) {
    margin-left: 0;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 0.8rem;

  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 4rem;
    width: 100%;
    height: 1px;
    background-color: rgba(133, 133, 133, 0.2);
  }
  
  @media (max-width: 480px) {
    padding-bottom: 1.5rem;
    
    &:not(:last-child)::before {
      top: 2.5rem;
    }
  }
`;

const TimelineContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: start;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const TimelineInfo = styled.div``;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  // background: pink;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const TimelineSubtitle = styled.p`
  font-size: 1rem;
  color: var(--text-primary);
  opacity: 0.7;
  margin-bottom: 0.25rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const TimelineGPA = styled.p`
  font-size: 0.875rem;
  color: var(--text-primary);
  opacity: 0.6;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const TimelineDate = styled.span`
  font-size: 1rem;
  color: var(--text-primary);
  opacity: 0.5;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    display: block;
    margin-top: 0.25rem;
  }
`;

const TimelineItemComponent: React.FC<TimelineItemProps> = ({ title, subtitle, date, gpa }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
      });
    }
  }, [controls, inView]);

  return (
    <TimelineItem
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <TimelineContent>
        <TimelineInfo>
          <TimelineTitle>{title}</TimelineTitle>
          {subtitle && <TimelineSubtitle>{subtitle}</TimelineSubtitle>}
          {gpa && <TimelineGPA>{gpa}</TimelineGPA>}
        </TimelineInfo>
        <TimelineDate>{date}</TimelineDate>
      </TimelineContent>
    </TimelineItem>
  );
};

const ExperienceSection: React.FC<{ sections: SectionProps[] }> = ({ sections }) => {
  return (
    <>
      {sections.map((section, index) => (
        <Section key={index}>
          <SectionHeader>
            <SectionNumber>({section.number})</SectionNumber>
            <SectionTitle>{section.title}</SectionTitle>
          </SectionHeader>
          <TimelineContainer>
            {section.items.map((item, itemIndex) => (
              <TimelineItemComponent
                key={itemIndex}
                title={item.title}
                subtitle={item.subtitle}
                date={item.date}
                gpa={item.gpa}
              />
            ))}
          </TimelineContainer>
        </Section>
      ))}
    </>
  );
};

export default ExperienceSection; 