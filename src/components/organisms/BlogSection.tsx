import { lazy, Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { blogPosts } from '../../data/blog';
import SectionHeader from '../molecules/SectionHeader';

const BlogModal = lazy(() => import('./BlogModal'));
import { fadeUp } from '../../styles/animations';
import { sectionBand, sectionCentered } from '../../styles/layout';
import { hideScrollbar } from '../../styles/hideScrollbar';
import { media } from '../../styles/mixins';
import type { BlogPost } from '../../types';

function stripMarkdown(text: string) {
  return text.replace(/\*\*/g, '');
}

function isHeading(text: string) {
  return text.startsWith('**') && text.includes('**');
}

function parseHeading(text: string) {
  return stripMarkdown(text).replace(/\.$/, '');
}

const Section = styled(motion.section)`
  ${sectionCentered};
  ${sectionBand};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(motion.article)<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  background: var(--surface-elevated);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow), var(--card-highlight);
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
  min-height: 420px;

  ${media.md} {
    min-height: auto;
    border-radius: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ $accent }) => $accent}, transparent);
    z-index: 2;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: var(--card-shadow-hover);
      border-color: ${({ $accent }) => `${$accent}40`};
    }
  }
`;

const CardHeader = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem) 0.75rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: inherit;
  font: inherit;
  width: 100%;

  &:hover .read-hint { opacity: 1; }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-small);
  color: var(--text-muted);
`;

const CardDate = styled.span`
  color: var(--accent);
  font-weight: 600;
`;

const CardTitle = styled.h3`
  font-size: var(--text-h2);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  font-size: var(--text-small);
  color: var(--text-muted);
`;

const ReadHint = styled.span`
  font-size: 0.7rem;
  color: var(--accent);
  opacity: 0.7;
  transition: opacity var(--transition);
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0 clamp(1rem, 3vw, 1.5rem);
  padding: 0.75rem 0 1rem;
  max-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  ${hideScrollbar};
  border-top: 1px solid var(--card-border);
  border-bottom: 1px solid var(--card-border);

  ${media.sm} {
    max-height: 200px;
  }

  @media (min-width: 640px) {
    max-height: 300px;
  }

  @media (min-width: 1024px) {
    max-height: 340px;
  }
`;

const Excerpt = styled.p`
  font-size: var(--text-body);
  line-height: 1.65;
  color: var(--text-primary);
  font-weight: 500;
`;

const SectionLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const HighlightList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const Highlight = styled.li`
  font-size: var(--text-small);
  line-height: 1.55;
  color: var(--text-muted);
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
  }
`;

const PreviewHeading = styled.h4`
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -0.01em;
  margin-top: 0.35rem;
  line-height: 1.4;
`;

const Preview = styled.p`
  font-size: var(--text-small);
  line-height: 1.65;
  color: var(--text-muted);
`;

const CardFooter = styled.div`
  padding: 1rem clamp(1rem, 3vw, 1.5rem) 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.25rem 0.6rem;
  border-radius: 100px;
  background: var(--accent-subtle);
  border: 1px solid var(--card-border);
  color: var(--text-muted);
`;

const ReadMore = styled.button`
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-family: inherit;
  transition: opacity var(--transition);

  &:hover { opacity: 0.75; }
`;

export default function BlogSection() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const open = (post: BlogPost) => {
    setSelected(post);
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setSelected(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Section
        id="blog-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <SectionHeader
          label="Writing"
          title="Blog"
          subtitle="Scroll cards for previews — tap title or Read full article to expand."
        />

        <Grid>
          {blogPosts.map((post, i) => (
            <Card
              key={post.id}
              $accent={post.accent}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <CardHeader
                type="button"
                onClick={() => open(post)}
                aria-label={`Open full article: ${post.title}`}
              >
                <CardMeta>
                  <CardDate>{post.date}</CardDate>
                  <span>{post.readTime}</span>
                </CardMeta>
                <CardTitle>{post.title}</CardTitle>
                <CardSubtitle>{post.subtitle}</CardSubtitle>
                <ReadHint className="read-hint">Tap title to open full article</ReadHint>
              </CardHeader>

              <CardBody
                aria-label={`Article preview: ${post.title}`}
                onWheel={(e) => e.stopPropagation()}
              >
                <Excerpt>{post.excerpt}</Excerpt>

                <SectionLabel>Key takeaways</SectionLabel>
                <HighlightList>
                  {post.highlights.map((h) => (
                    <Highlight key={h}>{h}</Highlight>
                  ))}
                </HighlightList>

                <SectionLabel>Full article</SectionLabel>
                {post.content.map((para) =>
                  isHeading(para) ? (
                    <PreviewHeading key={para.slice(0, 40)}>
                      {parseHeading(para)}
                    </PreviewHeading>
                  ) : (
                    <Preview key={para.slice(0, 40)}>{stripMarkdown(para)}</Preview>
                  )
                )}
              </CardBody>

              <CardFooter>
                <TagRow>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagRow>
                <ReadMore type="button" onClick={() => open(post)}>
                  Read full article →
                </ReadMore>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </Section>

      {selected && (
        <Suspense fallback={null}>
          <BlogModal post={selected} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
