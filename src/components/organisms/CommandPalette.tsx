import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { overlayFade, panelIn } from '../../motion/variants';
import { fuzzyMatch } from '../../lib/fuzzy';
import { lockScroll, unlockScroll } from '../../lib/scroll';
import { buildCommands, type Command, type CommandKind } from '../../data/commands';
import { useTheme } from '../../context/ThemeContext';

const KIND_LABEL: Record<CommandKind, string> = {
  section: 'Sections',
  action: 'Actions',
  project: 'Work',
  post: 'Writing',
};
const KIND_ORDER: CommandKind[] = ['section', 'action', 'project', 'post'];

interface Scored {
  cmd: Command;
  score: number;
  indices: number[];
}

type Row = { type: 'header'; kind: CommandKind } | { type: 'item'; item: Scored; index: number };

/* ── Styles ──────────────────────────────────────────────────────── */

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: var(--overlay);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12vh 1rem 1rem;

  @media (max-width: 640px) {
    padding-top: 8vh;
  }
`;

const Panel = styled(motion.div)`
  width: min(640px, 100%);
  max-height: 76vh;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    stroke: var(--text-muted);
    stroke-width: 1.5;
    fill: none;
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-faint);
  }
`;

const Kbd = styled.kbd`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  line-height: 1;
  padding: 0.28rem 0.4rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  background: var(--surface-sunken);
  color: var(--text-muted);
  text-transform: lowercase;
  letter-spacing: 0.02em;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.4rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) transparent;
`;

const GroupLabel = styled.li`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding: 0.7rem 0.75rem 0.35rem;
`;

const Option = styled.li<{ $active: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  min-height: 44px;
  padding: 0.55rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-primary);
  background: ${({ $active }) => ($active ? 'var(--accent-subtle)' : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? 'inset 2px 0 0 var(--accent)' : 'none')};
  font-size: 0.92rem;
  letter-spacing: -0.01em;

  mark {
    background: none;
    color: var(--accent-text);
    font-weight: 600;
  }
`;

const Hint = styled.span`
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: min(240px, 40vw);
  text-align: right;
`;

const Empty = styled.li`
  padding: 1.5rem 0.75rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const FooterRow = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 0.6rem 1rem;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

/* ── Helpers ─────────────────────────────────────────────────────── */

function highlight(text: string, indices: number[]) {
  if (indices.length === 0) return text;
  const set = new Set(indices);
  const out: React.ReactNode[] = [];
  let run = '';
  let marking = false;
  for (let i = 0; i < text.length; i++) {
    const m = set.has(i);
    if (m !== marking && run) {
      out.push(marking ? <mark key={i}>{run}</mark> : run);
      run = '';
    }
    marking = m;
    run += text[i];
  }
  if (run) out.push(marking ? <mark key="tail">{run}</mark> : run);
  return out;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Component ───────────────────────────────────────────────────── */

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const lockedRef = useRef(false);

  /** Releases the scroll lock exactly once per open, whichever path closes first. */
  const release = useCallback(() => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    unlockScroll();
  }, []);

  const commands = useMemo(() => buildCommands({ isDarkMode }), [isDarkMode]);

  const results = useMemo<Scored[]>(() => {
    const q = query.trim();
    if (!q) return commands.map((cmd) => ({ cmd, score: 0, indices: [] }));
    const scored: Scored[] = [];
    for (const cmd of commands) {
      const byLabel = fuzzyMatch(q, cmd.label);
      const byKeywords = cmd.keywords ? fuzzyMatch(q, cmd.keywords.join(' ')) : null;
      if (byLabel && (!byKeywords || byLabel.score >= byKeywords.score * 0.8)) {
        scored.push({ cmd, score: byLabel.score, indices: byLabel.indices });
      } else if (byKeywords) {
        scored.push({ cmd, score: byKeywords.score * 0.8, indices: [] });
      }
    }
    return scored.sort((a, b) => b.score - a.score);
  }, [query, commands]);

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    let index = 0;
    if (query.trim()) {
      for (const item of results) out.push({ type: 'item', item, index: index++ });
      return out;
    }
    for (const kind of KIND_ORDER) {
      const items = results.filter((r) => r.cmd.kind === kind);
      if (!items.length) continue;
      out.push({ type: 'header', kind });
      for (const item of items) out.push({ type: 'item', item, index: index++ });
    }
    return out;
  }, [results, query]);

  const flat = useMemo(() => rows.filter((r) => r.type === 'item') as Extract<Row, { type: 'item' }>[], [rows]);

  useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    lockScroll();
    lockedRef.current = true;
    setQuery('');
    setActive(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      release();
      restoreRef.current?.focus?.();
    };
  }, [isOpen, release]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const current = flat[active];
    if (!current) return;
    document
      .getElementById(`cmd-${current.item.cmd.id}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, flat]);

  const run = useCallback(
    (cmd: Command) => {
      // Unlock before running so a scroll command is not swallowed by a stopped Lenis.
      release();
      onClose();
      cmd.run({ toggleTheme: toggleDarkMode });
    },
    [onClose, release, toggleDarkMode],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
        break;
      case 'Home':
        e.preventDefault();
        setActive(0);
        break;
      case 'End':
        e.preventDefault();
        setActive(Math.max(0, flat.length - 1));
        break;
      case 'Enter': {
        e.preventDefault();
        const current = flat[active];
        if (current) run(current.item.cmd);
        break;
      }
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Single focusable control — keep focus inside the dialog.
        e.preventDefault();
        inputRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const activeId = flat[active] ? `cmd-${flat[active].item.cmd.id}` : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          variants={overlayFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <Panel
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            variants={panelIn}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <InputRow>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <Input
                ref={inputRef}
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Search sections, work, writing, actions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Kbd>esc</Kbd>
            </InputRow>

            <List id="command-palette-list" role="listbox" data-lenis-prevent>
              {flat.length === 0 && <Empty role="presentation">No matches for “{query}”</Empty>}
              {rows.map((row) =>
                row.type === 'header' ? (
                  <GroupLabel key={`h-${row.kind}`} role="presentation">
                    {KIND_LABEL[row.kind]}
                  </GroupLabel>
                ) : (
                  <Option
                    key={row.item.cmd.id}
                    id={`cmd-${row.item.cmd.id}`}
                    role="option"
                    aria-selected={row.index === active}
                    $active={row.index === active}
                    onMouseMove={() => setActive(row.index)}
                    onClick={() => run(row.item.cmd)}
                  >
                    <span>{highlight(row.item.cmd.label, row.item.indices)}</span>
                    {row.item.cmd.hint && <Hint>{row.item.cmd.hint}</Hint>}
                  </Option>
                ),
              )}
            </List>

            <FooterRow aria-hidden="true">
              <span>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> navigate
              </span>
              <span>
                <Kbd>↵</Kbd> select
              </span>
              <span>
                <Kbd>esc</Kbd> close
              </span>
            </FooterRow>
          </Panel>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
