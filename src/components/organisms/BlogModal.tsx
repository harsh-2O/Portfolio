import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from '../../lib/motion';
import type { BlogPost } from '../../types';
import { hideScrollbar } from '../../styles/hideScrollbar';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: 0;

  @media (min-width: 640px) {
    align-items: center;
    padding: 1.5rem;
  }
`;

const Detail = styled(motion.article)`
  position: relative;
  width: 100%;
  max-width: 720px;
  background: var(--background);
  border-radius: 1.75rem 1.75rem 0 0;
  padding: clamp(1.25rem, 4vw, 2rem);
  padding-top: clamp(1.5rem, 4vw, 2rem);
  border: 1px solid var(--card-border);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 113, 227, 0.06);
  max-height: 92dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: max(clamp(1.25rem, 4vw, 2rem), env(safe-area-inset-bottom, 0px));
  ${hideScrollbar};

  @media (min-width: 640px) {
    border-radius: 1.75rem;
    max-height: 88vh;
  }
`;

const AccentBar = styled.div<{ $accent: string }>`
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, ${({ $accent }) => $accent}, transparent);
  margin-bottom: 1.25rem;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 0.75rem;
  font-size: var(--text-small);
  color: var(--text-muted);
`;

const Date = styled.span`
  color: var(--accent);
  font-weight: 600;
`;

const Title = styled.h2`
  font-size: var(--text-h1);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 0.35rem;
`;

const Subtitle = styled.p`
  font-size: var(--text-body);
  color: var(--text-muted);
  margin-bottom: 1.25rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  border-radius: 100px;
  background: var(--accent-subtle);
  border: 1px solid var(--card-border);
  color: var(--text-primary);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Paragraph = styled.p`
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--text-primary);

  strong {
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-primary);
  border: 1px solid var(--card-border);
  z-index: 1;
`;

function renderParagraph(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Detail
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            role="dialog"
            aria-modal="true"
            aria-label={post.title}
          >
            <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>
            <AccentBar $accent={post.accent} />
            <Meta>
              <Date>{post.date}</Date>
              <span>{post.readTime} read</span>
            </Meta>
            <Title>{post.title}</Title>
            <Subtitle>{post.subtitle}</Subtitle>
            <Tags>
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
            <Body>
              {post.content.map((para) => (
                <Paragraph key={para.slice(0, 40)}>{renderParagraph(para)}</Paragraph>
              ))}
            </Body>
          </Detail>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
