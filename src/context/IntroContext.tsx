import { createContext, useCallback, useContext, useState } from 'react';
import IntroSequence from '../components/organisms/IntroSequence';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroContextValue {
  /** True once the intro has finished (or was skipped / never shown). */
  introDone: boolean;
}

const IntroContext = createContext<IntroContextValue>({ introDone: true });
const SESSION_KEY = 'intro-seen';

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return true;
  }
}

/** Plays the page-load intro once per session; skipped under reduced motion. */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(() => reduced || alreadySeen());

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntroDone(true);
  }, []);

  return (
    <IntroContext.Provider value={{ introDone }}>
      {children}
      {!introDone && <IntroSequence onDone={finish} />}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
