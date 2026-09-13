import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { fadeUp } from '../../motion/variants';
import SectionHeader from '../molecules/SectionHeader';
import BlogRow from '../molecules/BlogRow';
import { blogPosts } from '../../data/blog';
import { on } from '../../lib/events';
import { lockScroll, unlockScroll } from '../../lib/scroll';
import { sectionBand, sectionCentered } from '../../styles/layout';
import type { BlogPost } from '../../types';

const BlogModal = lazy(() => import('./BlogModal'));

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const List = styled.ul`
  list-style: none;
`;

export default function BlogSection() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const open = useCallback((post: BlogPost) => {
    setSelected(post);
    lockScroll();
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    unlockScroll();
  }, []);

  // Command palette → open a post, even if this section mounted after the request.
  useEffect(
    () =>
      on('open-blog', ({ id }) => {
        const post = blogPosts.find((p) => p.id === id);
        if (post) open(post);
      }),
    [open],
  );

  return (
    <>
      <Section
        aria-labelledby="blog-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <SectionHeader
          label="Writing"
          title="Blog"
          titleId="blog-title"
          subtitle="Field notes on quant infrastructure, retrieval systems and agentic tooling."
        />

        <List>
          {blogPosts.map((post, i) => (
            <BlogRow key={post.id} post={post} index={i} onOpen={open} />
          ))}
        </List>
      </Section>

      <Suspense fallback={null}>
        <BlogModal post={selected} onClose={close} />
      </Suspense>
    </>
  );
}
