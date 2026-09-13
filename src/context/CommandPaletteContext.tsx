import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { on } from '../lib/events';

const CommandPalette = lazy(() => import('../components/organisms/CommandPalette'));

interface PaletteContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteContextValue | undefined>(undefined);

/** Owns ⌘K / Ctrl+K and lazy-mounts the palette on first open. */
export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const open = useCallback(() => {
    setMounted(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => {
    setMounted(true);
    setIsOpen((v) => !v);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  useEffect(() => on('open-palette', open), [open]);

  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <CommandPalette isOpen={isOpen} onClose={close} />
        </Suspense>
      )}
    </PaletteContext.Provider>
  );
}

export const useCommandPalette = (): PaletteContextValue => {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  return ctx;
};
