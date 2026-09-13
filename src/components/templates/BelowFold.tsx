import { lazy, Suspense } from 'react';
import SectionFallback from '../atoms/SectionFallback';
import LazyWhenVisible from '../molecules/LazyWhenVisible';

const ResumeSection = lazy(() => import('../organisms/ResumeSection'));
const CertificationsSection = lazy(() => import('../organisms/CertificationsSection'));
const SkillsSection = lazy(() => import('../organisms/SkillsSection'));
const DevWorkflowSection = lazy(() => import('../organisms/DevWorkflowSection'));
const ProjectsSection = lazy(() => import('../organisms/ProjectsSection'));
const MarqueeBanner = lazy(() => import('../organisms/MarqueeBanner'));
const BlogSection = lazy(() => import('../organisms/BlogSection'));
const TestimonialsSection = lazy(() => import('../organisms/TestimonialsSection'));
const FooterSection = lazy(() => import('../organisms/FooterSection'));

/**
 * Below-fold content. Every wrapper carries the section id used by scroll-spy,
 * the nav and the command palette, so targets exist before the chunk loads.
 */
export default function BelowFold() {
  return (
    <>
      <LazyWhenVisible minHeight={320} id="resume-section">
        <Suspense fallback={<SectionFallback />}>
          <ResumeSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={280} id="certifications-section">
        <Suspense fallback={<SectionFallback />}>
          <CertificationsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={280} id="tech-section">
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={300} id="workflow-section">
        <Suspense fallback={<SectionFallback />}>
          <DevWorkflowSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={360} id="projects-section">
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={80} id="marquee-section">
        <Suspense fallback={<SectionFallback />}>
          <MarqueeBanner />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={480} id="blog-section">
        <Suspense fallback={<SectionFallback />}>
          <BlogSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={320} id="testimonials-section">
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={200} id="footer-section">
        <Suspense fallback={<SectionFallback />}>
          <FooterSection />
        </Suspense>
      </LazyWhenVisible>
    </>
  );
}
