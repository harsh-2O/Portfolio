import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { iconSwap, transitions } from '../../motion/variants';
import { copyText } from '../../lib/clipboard';

const RESET_MS = 1600;

interface CopyChipProps {
  /** Text written to the clipboard. */
  value: string;
  /** Human label for assistive tech, e.g. "Email address". */
  label: string;
  /** Optional display text if it differs from `value`. */
  display?: string;
}

const Chip = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  height: 40px;
  padding: 0 0.85rem 0 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid ${({ $copied }) => ($copied ? 'var(--accent-line)' : 'var(--border)')};
  background: ${({ $copied }) => ($copied ? 'var(--accent-subtle)' : 'transparent')};
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: -0.01em;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: var(--border-strong);
      background: var(--surface);
    }
  }

  @media (max-width: 768px) {
    min-height: 44px;
  }
`;

const IconSlot = styled.span`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  color: var(--text-muted);

  svg {
    position: absolute;
    width: 14px;
    height: 14px;
    stroke: currentColor;
    stroke-width: 1.6;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Micro = styled(motion.span)`
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-text);
`;

/** Copy-to-clipboard chip with an inline icon morph and "Copied" micro-label (no toast). */
export default function CopyChip({ value, label, display }: CopyChipProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = useCallback(async () => {
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), RESET_MS);
  }, [value]);

  return (
    <Chip type="button" onClick={onCopy} aria-label={`Copy ${label} ${display ?? value}`} data-cursor="Copy" $copied={copied}>
      <span>{display ?? value}</span>
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
      <AnimatePresence initial={false}>
        {copied && (
          <Micro
            aria-hidden="true"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={transitions.base}
          >
            Copied
          </Micro>
        )}
      </AnimatePresence>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </Chip>
  );
}
