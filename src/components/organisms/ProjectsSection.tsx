import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { fadeUp, softSpring } from '../../motion/variants';
import SectionHeader from '../molecules/SectionHeader';
import FilterPills, { type FilterOption } from '../molecules/FilterPills';
import ProjectCard from '../molecules/ProjectCard';
import { projects, PROJECT_CATEGORIES } from '../../data/projects';
import { bentoSpans, BENTO_COLUMNS } from '../../lib/bento';
import { on } from '../../lib/events';
import { lockScroll, unlockScroll } from '../../lib/scroll';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { media } from '../../styles/mixins';
import type { Project, ProjectCategory } from '../../types';

const ProjectModal = lazy(() => import('./ProjectModal'));

type Filter = 'All' | ProjectCategory;

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Grid = styled(motion.ul)`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(${BENTO_COLUMNS}, minmax(0, 1fr));
  gap: clamp(0.65rem, 1.2vw, 1rem);
  align-items: stretch;

  ${media.lg} {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
`;

/** Shorter category labels for the filter row; the full names stay in the data. */
const FILTER_LABELS: Record<ProjectCategory, string> = {
  'AI & Machine Learning': 'AI / ML',
  'Data Science & Analytics': 'Data',
  'Full-Stack & Web': 'Full-Stack',
  'Developer Tools': 'Dev Tools',
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const spans = useMemo(() => bentoSpans(visible.length), [visible.length]);

  const options = useMemo<FilterOption<Filter>[]>(
    () => [
      { value: 'All', label: 'All', count: projects.length },
      ...PROJECT_CATEGORIES.map((category) => ({
        value: category as Filter,
        label: FILTER_LABELS[category],
        count: projects.filter((p) => p.category === category).length,
      })),
    ],
    [],
  );

  const open = useCallback((project: Project) => {
    setSelected(project);
    lockScroll();
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    unlockScroll();
  }, []);

  // Command palette → open a project, even if this section mounted after the request.
  useEffect(
    () =>
      on('open-project', ({ id }) => {
        const project = projects.find((p) => p.id === id);
        if (project) open(project);
      }),
    [open],
  );

  return (
    <>
      <Section
        aria-labelledby="projects-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <SectionHeader
          label="Selected work"
          title="Projects"
          titleId="projects-title"
          subtitle="Production AI and quant systems alongside open-source work. Open any tile for the case study."
        >
          <FilterPills
            options={options}
            active={filter}
            onChange={setFilter}
            layoutId="projects-filter"
            label="Filter projects by category"
          />
        </SectionHeader>

        <Grid layout transition={softSpring}>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} span={spans[i]} onOpen={open} />
            ))}
          </AnimatePresence>
        </Grid>
      </Section>

      <Suspense fallback={null}>
        <ProjectModal project={selected} onClose={close} />
      </Suspense>
    </>
  );
}
