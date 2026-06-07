import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { techStack } from '../../data/techStack';
import { fadeUp, staggerContainer } from '../../styles/animations';

const Section = styled(motion.section)`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem var(--section-padding-x);

  @media (max-width: 768px) {
    padding: 3rem var(--section-padding-x-md);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h3`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 500;
  max-width: 400px;
  line-height: 1.3;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 500px;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
    max-width: 100%;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const Item = styled(motion.div)`
  aspect-ratio: 1;
  background: var(--tech-item-bg);
  border: 1px solid var(--card-border);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  position: relative;

  &:hover {
    transform: translateY(-4px);
    background: var(--tech-item-hover-bg);
    box-shadow: var(--card-shadow);
  }

  .icon-normal, .icon-colored {
    position: absolute;
    width: 50%;
    height: 50%;
    object-fit: contain;
    transition: opacity var(--transition);
  }

  .icon-normal { opacity: 0.6; }
  .icon-colored { opacity: 0; }

  &:hover .icon-normal { opacity: 0; }
  &:hover .icon-colored { opacity: 1; }
`;

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TechSection() {
  return (
    <Section
      id="tech-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <Header>
        <Title>Technologies I work with</Title>
        <Description>
          Modern tools and frameworks for building intuitive, scalable digital experiences.
        </Description>
      </Header>

      <Grid variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {techStack.map((tech) => (
          <Item key={tech.name} variants={itemVariant}>
            <img className="icon-normal" src={tech.icon} alt={tech.name} loading="lazy" width="60" height="60" />
            <img className="icon-colored" src={tech.colorIcon} alt="" loading="lazy" width="60" height="60" aria-hidden="true" />
          </Item>
        ))}
      </Grid>
    </Section>
  );
}
