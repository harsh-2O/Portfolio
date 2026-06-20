import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme';

function getInitialTheme(): boolean {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light') return false;
  return true;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDarkMode ? '#111111' : '#F7F7F7');
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => setIsDarkMode((p) => !p), []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
