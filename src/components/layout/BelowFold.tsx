import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation } from '../../lib/motion';
import SectionFallback from '../ui/SectionFallback';
import LazyWhenVisible from '../ui/LazyWhenVisible';

const ResumeSection = lazy(() => import('../sections/ResumeSection'));
const CertificationsSection = lazy(() => import('../sections/CertificationsSection'));
const SkillsSection = lazy(() => import('../sections/SkillsSection'));
const DevTerminal = lazy(() => import('../ui/DevTerminal'));
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const MarqueeBanner = lazy(() => import('../sections/MarqueeBanner'));
const BlogSection = lazy(() => import('../sections/BlogSection'));
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'));
const FooterSection = lazy(() => import('../sections/FooterSection'));

/** Below-fold content — defers framer-motion and section chunks until needed. */
export default function BelowFold() {
  return (
    <LazyMotion features={domAnimation} strict>
      <LazyWhenVisible minHeight={320}>
        <Suspense fallback={<SectionFallback />}>
          <ResumeSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={280}>
        <Suspense fallback={<SectionFallback />}>
          <CertificationsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={280}>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={200}>
        <Suspense fallback={<SectionFallback />}>
          <DevTerminal />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={360}>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={80}>
        <Suspense fallback={<SectionFallback />}>
          <MarqueeBanner />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={480}>
        <Suspense fallback={<SectionFallback />}>
          <BlogSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={320}>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={200}>
        <Suspense fallback={<SectionFallback />}>
          <FooterSection />
        </Suspense>
      </LazyWhenVisible>
    </LazyMotion>
  );
}
