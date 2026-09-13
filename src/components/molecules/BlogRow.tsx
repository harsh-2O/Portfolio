import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { transitions } from '../../motion/variants';
import { readTimeMinutes } from '../../lib/readTime';
import { media } from '../../styles/mixins';
import type { BlogPost } from '../../types';

interface BlogRowProps {
  post: BlogPost;
  index: number;
  onOpen: (post: BlogPost) => void;
}

const Row = styled(motion.li)`
  border-bottom: 1px solid var(--border);

  &:first-of-type {
    border-top: 1px solid var(--border);
  }
`;

const Trigger = styled(motion.button)`
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr) auto;
  align-items: baseline;
  gap: clamp(0.75rem, 2vw, 2rem);
  width: 100%;
  padding: clamp(1.25rem, 2.5vw, 1.9rem) 0;
  text-align: left;

  ${media.md} {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.4rem 1rem;
    padding: 1.1rem 0;
  }
`;

const Meta = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
  font-variant-numeric: tabular-nums;

  ${media.md} {
    grid-column: 1 / -1;
    flex-direction: row;
    gap: 1rem;
  }
`;

const Main = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

const Title = styled.span`
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.4vw + 1rem, 2.1rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text-primary);
`;

const Dek = styled.span`
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--text-muted);
  max-width: 58ch;
`;

const Tags = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.35rem;
`;

const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  color: var(--text-muted);
`;

const Arrow = styled(motion.span)`
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  color: var(--accent-text);
  flex-shrink: 0;
  align-self: center;

  svg {
    width: 13px;
    height: 13px;
    stroke: currentColor;
    stroke-width: 1.75;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

/** One editorial blog row: mono meta, serif title, dek, and an arrow on hover. */
export default function BlogRow({ post, index, onOpen }: BlogRowProps) {
  const minutes = readTimeMinutes(post.content);

  return (
    <Row
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...transitions.out, delay: index * 0.05 }}
    >
      <Trigger
        type="button"
        onClick={() => onOpen(post)}
        aria-label={`Read: ${post.title}`}
        data-cursor="Read"
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        animate="rest"
        variants={{ rest: { x: 0 }, hover: { x: 8 } }}
        transition={transitions.base}
      >
        <Meta>
          <span>{post.date}</span>
          <span>{minutes} min read</span>
        </Meta>

        <Main>
          <Title>{post.title}</Title>
          <Dek>{post.subtitle}</Dek>
          <Tags>
            {post.tags.slice(0, 4).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        </Main>

        <Arrow
          variants={{ rest: { opacity: 0, x: -6 }, hover: { opacity: 1, x: 0 } }}
          transition={transitions.base}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Arrow>
      </Trigger>
    </Row>
  );
}
