import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import './styles/fonts.css';
import { ThemeProvider } from './context/ThemeContext';
import { IntroProvider } from './context/IntroContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import { LazyMotion, MotionConfig, domMax } from './lib/motion';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import GrainOverlay from './components/atoms/GrainOverlay';
import Home from './pages/Home';

const CustomCursor = lazy(() => import('./components/atoms/CustomCursor'));

function SmoothScroll() {
  useLenis();
  return null;
}

/** Mounts the custom cursor only for hover-capable fine pointers without reduced motion. */
function CursorGate() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!fine || reduced) return null;
  return (
    <Suspense fallback={null}>
      <CustomCursor />
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <EmotionThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <LazyMotion features={domMax} strict>
          <MotionConfig reducedMotion="user">
            <SmoothScroll />
            <IntroProvider>
              <CommandPaletteProvider>
                <Home />
              </CommandPaletteProvider>
            </IntroProvider>
            <GrainOverlay />
            <CursorGate />
          </MotionConfig>
        </LazyMotion>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

export default App;
