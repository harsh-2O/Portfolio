import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { iconSwap, transitions } from '../../motion/variants';
import { copyText } from '../../lib/clipboard';

const RESET_MS = 1600;

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
  /** Caps the visible height; the block scrolls past it. */
  maxHeight?: number;
}

const Frame = styled.div`
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--code-bg);
  overflow: hidden;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0.6rem 0.5rem 0.85rem;
  border-bottom: 1px solid rgba(242, 237, 230, 0.1);
`;

const Name = styled.span`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  color: rgba(242, 237, 230, 0.62);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(242, 237, 230, 0.16);
  color: rgba(242, 237, 230, 0.62);
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 28px;
  padding: 0 0.55rem;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(242, 237, 230, 0.16);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(242, 237, 230, 0.8);
  transition: background-color var(--transition-fast), border-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      background: rgba(242, 237, 230, 0.08);
      border-color: rgba(242, 237, 230, 0.28);
    }
  }

  &:focus-visible {
    outline-color: rgba(242, 237, 230, 0.8);
  }
`;

const IconSlot = styled.span`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 13px;
  height: 13px;

  svg {
    position: absolute;
    width: 12px;
    height: 12px;
    stroke: currentColor;
    stroke-width: 1.8;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Scroll = styled.div<{ $maxHeight: number }>`
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
`;

const Pre = styled.pre`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  margin: 0;
  padding: 0.75rem 0;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  line-height: 1.65;
  tab-size: 2;
`;

const Gutter = styled.span`
  position: sticky;
  left: 0;
  padding: 0 0.75rem 0 0.85rem;
  text-align: right;
  color: rgba(242, 237, 230, 0.28);
  background: var(--code-bg);
  user-select: none;
  font-variant-numeric: tabular-nums;
`;

const Line = styled.code<{ $comment: boolean }>`
  padding-right: 1rem;
  white-space: pre;
  color: ${({ $comment }) => ($comment ? 'rgba(242, 237, 230, 0.42)' : 'var(--code-text)')};
`;

const isComment = (line: string) => /^\s*(#|\/\/|---)/.test(line);

/** Dark code block with line numbers, a language tag and a copy button. */
export default function CodeBlock({ code, language, fileName, maxHeight = 320 }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const lines = useMemo(() => code.split('\n'), [code]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = useCallback(async () => {
    if (!(await copyText(code))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), RESET_MS);
  }, [code]);

  return (
    <Frame>
      <Bar>
        {fileName && <Name>{fileName}</Name>}
        <Right>
          <Tag>{language}</Tag>
          <CopyButton type="button" onClick={onCopy} aria-label={`Copy ${fileName ?? 'snippet'}`} data-cursor="Copy">
            <IconSlot aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.svg key="check" viewBox="0 0 24 24" variants={iconSwap} initial="hidden" animate="visible" exit="exit">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </motion.svg>
                ) : (
                  <motion.svg key="copy" viewBox="0 0 24 24" variants={iconSwap} initial="hidden" animate="visible" exit="exit">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </IconSlot>
            <motion.span layout transition={transitions.fast}>
              {copied ? 'Copied' : 'Copy'}
            </motion.span>
          </CopyButton>
        </Right>
      </Bar>
      <Scroll $maxHeight={maxHeight} data-lenis-prevent>
        <Pre>
          {lines.map((line, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <Gutter aria-hidden="true">{i + 1}</Gutter>
              <Line $comment={isComment(line)}>{line || ' '}</Line>
            </span>
          ))}
        </Pre>
      </Scroll>
    </Frame>
  );
}
