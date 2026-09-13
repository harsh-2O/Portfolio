import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { dark, light } from '../theme/tokens';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'theme';
const TRANSITION_CLASS = 'theme-transition';
const TRANSITION_MS = 350;

function readStored(): ThemeMode | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

const systemMode = (): ThemeMode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/**
 * Light/dark theme. First visit follows the OS preference and keeps following it
 * until the visitor toggles; an explicit choice persists in localStorage.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => readStored() ?? systemMode());
  const [explicit, setExplicit] = useState(() => readStored() !== null);

  useEffect(() => {
    if (explicit) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setMode(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [explicit]);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = mode === 'dark';
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = mode;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((el) => el.setAttribute('content', isDark ? dark.bg : light.bg));
  }, [mode]);

  const toggleDarkMode = useCallback(() => {
    const root = document.documentElement;
    root.classList.add(TRANSITION_CLASS);
    window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);

    setExplicit(true);
    setMode((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — theme still applies for this session */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, isDarkMode: mode === 'dark', toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
