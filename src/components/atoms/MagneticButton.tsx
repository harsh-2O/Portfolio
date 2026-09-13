import type { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { motion, useTransform } from '../../lib/motion';
import { useMagnetic } from '../../hooks/useMagnetic';

type Variant = 'solid' | 'ghost';

interface MagneticButtonProps {
  variant?: Variant;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-cursor'?: string;
}

const Button = styled(motion.button)<{ $variant: Variant }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 1.4rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  background: ${({ $variant }) => ($variant === 'solid' ? 'var(--ink)' : 'transparent')};
  color: ${({ $variant }) => ($variant === 'solid' ? 'var(--ink-text)' : 'var(--text-primary)')};
  border: 1px solid ${({ $variant }) => ($variant === 'solid' ? 'var(--ink)' : 'var(--border-strong)')};
  transition: border-color var(--transition-fast), background-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $variant }) => ($variant === 'solid' ? 'var(--ink)' : 'var(--text-primary)')};
    }
  }

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    stroke-width: 1.75;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Inner = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

/** Button that leans toward the pointer; the label moves a little less for depth. */
export default function MagneticButton({ variant = 'solid', children, ...rest }: MagneticButtonProps) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLButtonElement>({ strength: 0.28 });
  const labelX = useTransform(x, (v) => v * 0.4);
  const labelY = useTransform(y, (v) => v * 0.4);

  return (
    <Button
      ref={ref}
      type="button"
      $variant={variant}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...rest}
    >
      <Inner style={{ x: labelX, y: labelY }}>{children}</Inner>
    </Button>
  );
}
