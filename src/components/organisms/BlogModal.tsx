import { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion, useScroll } from '../../lib/motion';
import { overlayFade, panelIn } from '../../motion/variants';
import { readTimeMinutes } from '../../lib/readTime';
import { hideScrollbar } from '../../styles/hideScrollbar';
import { media } from '../../styles/mixins';
import type { BlogPost } from '../../types';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vh, 3rem) clamp(1rem, 4vw, 2rem);
  background: var(--overlay);

  ${media.sm} {
    align-items: flex-end;
    padding: 0;
  }
`;

const Article = styled(motion.article)`
  position: relative;
  width: min(760px, 100%);
  max-height: min(88vh, 960px);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--background);
  box-shadow: var(--shadow-lg);
  overflow: hidden;

  ${media.sm} {
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    max-height: 93dvh;
  }
`;

/** Reading progress for the article body. */
const Progress = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform-origin: 0 50%;
  z-index: 3;
`;

const Scroll = styled.div`
  overflow-y: auto;
  overscroll-behavior: contain;
  ${hideScrollbar};
`;

const Inner = styled.div`
  padding: clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 4vw, 3rem) clamp(2rem, 4vw, 3.5rem);
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-right: 3rem;
`;

const Title = styled.h2`
  margin-top: 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3vw, 2.9rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.08;
  color: var(--text-primary);
  padding-right: 2.5rem;
`;

const Dek = styled.p`
  margin-top: 0.6rem;
  font-size: var(--text-body);
  color: var(--text-muted);
`;

const Rule = styled.hr`
  margin: clamp(1.25rem, 3vw, 2rem) 0;
  border: none;
  border-top: 1px solid var(--border);
`;

const Lede = styled.p`
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1vw + 0.9rem, 1.45rem);
  font-weight: 500;
  line-height: 1.45;
  color: var(--text-primary);
`;

const Takeaways = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: clamp(1.25rem, 3vw, 1.75rem) 0;
  padding: 1rem 1.1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
  background: var(--surface);
`;

const TakeawayLabel = styled.h3`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-text);
  margin-bottom: 0.25rem;
`;

const Takeaway = styled.li`
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--text-muted);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.8em;
    width: 8px;
    height: 1px;
    background: var(--accent);
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const Paragraph = styled.p`
  font-size: var(--text-body);
  line-height: 1.75;
  color: var(--text-muted);

  strong {
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: clamp(1.5rem, 3vw, 2rem);
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
`;

const Tag = styled.li`
  font-family: var(--font-mono);
  font-size: 0.66rem;
  padding: 0.22rem 0.5rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  color: var(--text-muted);
`;

const Close = styled.button`
  position: absolute;
  top: clamp(1rem, 2vw, 1.5rem);
  right: clamp(1rem, 2vw, 1.5rem);
  z-index: 4;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--text-primary);

  svg {
    width: 15px;
    height: 15px;
    stroke: currentColor;
    stroke-width: 1.6;
    fill: none;
    stroke-linecap: round;
  }

  @media (hover: hover) {
    &:hover {
      border-color: var(--text-primary);
    }
  }
`;

const isHeading = (text: string) => text.startsWith('**');

function renderInline(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !ref.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!post) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      restoreRef.current?.focus?.();
    };
  }, [post]);

  const titleId = post ? `post-${post.id}-title` : undefined;
  const [lede, ...rest] = post?.content ?? [];

  return (
    <AnimatePresence>
      {post && (
        <Overlay variants={overlayFade} initial="hidden" animate="visible" exit="exit" onClick={onClose}>
          <Article
            ref={ref}
            variants={panelIn}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <Progress style={{ scaleX: scrollYProgress }} aria-hidden="true" />
            <Close ref={closeRef} type="button" onClick={onClose} aria-label="Close article" data-cursor="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Close>

            <Scroll ref={scrollRef} data-lenis-prevent>
              <Inner>
                <Meta>
                  <span>{post.date}</span>
                  <span>{readTimeMinutes(post.content)} min read</span>
                </Meta>
                <Title id={titleId}>{post.title}</Title>
                <Dek>{post.subtitle}</Dek>
                <Rule />

                {lede && <Lede>{renderInline(lede)}</Lede>}

                {post.highlights.length > 0 && (
                  <Takeaways>
                    <TakeawayLabel>Key takeaways</TakeawayLabel>
                    {post.highlights.map((h) => (
                      <Takeaway key={h}>{h}</Takeaway>
                    ))}
                  </Takeaways>
                )}

                <Body>
                  {rest.map((para) => (
                    <Paragraph key={para.slice(0, 48)} data-heading={isHeading(para) || undefined}>
                      {renderInline(para)}
                    </Paragraph>
                  ))}
                </Body>

                <Tags>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              </Inner>
            </Scroll>
          </Article>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
