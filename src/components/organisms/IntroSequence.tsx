import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion } from '../../lib/motion';
import { transitions } from '../../motion/variants';

const NAME = 'Harsh Mehta';
const LETTER_STAGGER_MS = 32;
const HOLD_MS = 880;
const HARD_CAP_MS = 1200;

const reveal = keyframes`
  from { clip-path: inset(0 0 100% 0); transform: translateY(0.18em); }
  to   { clip-path: inset(0 0 -0.1em 0); transform: translateY(0); }
`;

const draw = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9500;
  display: grid;
  place-items: center;
  background: var(--background);
`;

const Name = styled.div`
  display: flex;
  gap: 0.02em;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-hero);
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--text-primary);
`;

const Letter = styled.span<{ $i: number }>`
  display: inline-block;
  clip-path: inset(0 0 100% 0);
  animation: ${reveal} var(--dur-slow) var(--ease-out) forwards;
  animation-delay: ${({ $i }) => $i * LETTER_STAGGER_MS}ms;
  min-width: ${({ children }) => (children === ' ' ? '0.28em' : 'auto')};
`;

const Rule = styled.span`
  position: absolute;
  bottom: -0.35em;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  transform-origin: left center;
  transform: scaleX(0);
  animation: ${draw} var(--dur-slow) var(--ease-out) forwards;
  animation-delay: 380ms;
`;

const Frame = styled.div`
  position: relative;
`;

interface IntroSequenceProps {
  onDone: () => void;
}

/**
 * Page-load intro: the name is revealed letter by letter behind a clip mask,
 * then the overlay lifts. Any click, wheel, touch or key skips it, and a hard
 * cap guarantees the page is interactive within 1.2 s.
 */
export default function IntroSequence({ onDone }: IntroSequenceProps) {
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  const leave = useCallback(() => setLeaving(true), []);

  useEffect(() => {
    const hold = window.setTimeout(leave, HOLD_MS);
    const cap = window.setTimeout(finish, HARD_CAP_MS);
    const opts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener('pointerdown', leave, opts);
    window.addEventListener('wheel', leave, opts);
    window.addEventListener('touchstart', leave, opts);
    window.addEventListener('keydown', leave, opts);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(cap);
      window.removeEventListener('pointerdown', leave);
      window.removeEventListener('wheel', leave);
      window.removeEventListener('touchstart', leave);
      window.removeEventListener('keydown', leave);
    };
  }, [leave, finish]);

  return (
    <Overlay
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={transitions.base}
      onAnimationComplete={() => leaving && finish()}
      style={{ pointerEvents: leaving ? 'none' : 'auto' }}
    >
      <Frame>
        <Name>
          {NAME.split('').map((ch, i) => (
            <Letter key={`${ch}-${i}`} $i={i}>
              {ch}
            </Letter>
          ))}
        </Name>
        <Rule />
      </Frame>
    </Overlay>
  );
}
