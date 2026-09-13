import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import MarketScene from './MarketScene';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { dark, light } from '../../theme/tokens';
import { motifMask } from '../../styles/layout';

const Frame = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  ${motifMask};

  canvas {
    display: block;
  }
`;

/**
 * WebGL market-data motif: sparse grid, ticks that light up, a drifting sparkline
 * and an order-book ladder. 30 fps cap; the loop stops when the hero leaves the
 * viewport or the tab is hidden, and renders one static frame under reduced motion.
 */
export default function MarketCanvas() {
  const { isDarkMode } = useTheme();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState === 'visible');

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const active = inView && tabVisible && !reduced;

  return (
    <Frame ref={ref} aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        frameloop="never"
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <MarketScene palette={isDarkMode ? dark : light} active={active} />
      </Canvas>
    </Frame>
  );
}
