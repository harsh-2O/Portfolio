import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion, useMotionValue, useSpring } from '../../lib/motion';
import { cursorSpringOptions, softSpring, transitions } from '../../motion/variants';

const INTERACTIVE = '[data-cursor], a, button, [role="button"], label, summary';
const FIELDS = 'input, textarea, select, [contenteditable="true"]';

const Dot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-primary);
  translate: -50% -50%;
  pointer-events: none;
  z-index: 10001;
`;

const Ring = styled(motion.div)<{ $hover: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${({ $hover }) => ($hover ? 'var(--accent-line)' : 'var(--cursor-ring)')};
  background: ${({ $hover }) => ($hover ? 'var(--accent-subtle)' : 'transparent')};
  translate: -50% -50%;
  pointer-events: none;
  z-index: 10000;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
`;

const Label = styled(motion.span)`
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-text);
  white-space: nowrap;
`;

/** Dot + lagging ring. Mounted only for fine pointers without reduced motion. */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, cursorSpringOptions);
  const ringY = useSpring(y, cursorSpringOptions);

  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;
      if (target.closest(FIELDS)) {
        setHidden(true);
        return;
      }
      setHidden(false);
      const el = target.closest(INTERACTIVE);
      setHover(Boolean(el));
      setLabel(el?.getAttribute('data-cursor') ?? null);
    };
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, true);
    root.addEventListener('mouseenter', show);
    root.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);

    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      root.removeEventListener('mouseenter', show);
      root.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [x, y]);

  const shown = visible && !hidden;
  const size = hover ? (label ? 64 : 44) : 30;

  return (
    <>
      <Dot
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: shown ? 1 : 0, scale: pressed ? 0.6 : hover ? 0.5 : 1 }}
        transition={transitions.fast}
      />
      <Ring
        aria-hidden="true"
        $hover={hover}
        style={{ x: ringX, y: ringY }}
        animate={{ width: size, height: size, opacity: shown ? 1 : 0, scale: pressed ? 0.9 : 1 }}
        transition={softSpring}
      >
        <AnimatePresence>
          {label && (
            <Label
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions.fast}
            >
              {label}
            </Label>
          )}
        </AnimatePresence>
      </Ring>
    </>
  );
}
