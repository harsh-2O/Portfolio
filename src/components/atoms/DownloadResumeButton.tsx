import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useTransform } from '../../lib/motion';
import { transitions } from '../../motion/variants';
import { useMagnetic } from '../../hooks/useMagnetic';
import { RESUME } from '../../config/site';

const Anchor = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 1.25rem 0 1.1rem;
  border-radius: var(--radius-pill);
  background: var(--ink);
  color: var(--ink-text);
  border: 1px solid var(--ink);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
`;

const Inner = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
`;

const Icon = styled.span`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  overflow: hidden;

  svg {
    position: absolute;
    width: 16px;
    height: 16px;
    stroke: currentColor;
    stroke-width: 1.75;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Size = styled.span`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  opacity: 0.7;
  font-variant-numeric: tabular-nums;
`;

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** Magnetic download link; the arrow drops into its tray on hover; shows the real file size. */
export default function DownloadResumeButton() {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLAnchorElement>({ strength: 0.24 });
  const labelX = useTransform(x, (v) => v * 0.4);
  const labelY = useTransform(y, (v) => v * 0.4);
  const [size, setSize] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(RESUME.url, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const len = Number(res.headers.get('content-length'));
        if (res.ok && Number.isFinite(len) && len > 0) setSize(formatSize(len));
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <Anchor
      ref={ref}
      href={RESUME.url}
      download={RESUME.fileName}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        onPointerLeave();
        setHover(false);
      }}
      onPointerEnter={() => setHover(true)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`Download PDF resume${size ? `, ${size}` : ''}`}
      data-cursor="PDF"
    >
      <Inner style={{ x: labelX, y: labelY }}>
        <Icon aria-hidden="true">
          <motion.svg
            viewBox="0 0 24 24"
            animate={hover ? { y: [0, 3, 0] } : { y: 0 }}
            transition={hover ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } : transitions.fast}
          >
            <path d="M12 3v11M7.5 9.5L12 14l4.5-4.5" />
          </motion.svg>
          <svg viewBox="0 0 24 24">
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
        </Icon>
        <span>Download PDF</span>
        {size && <Size>{size}</Size>}
      </Inner>
    </Anchor>
  );
}
