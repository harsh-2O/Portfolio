/**
 * Tiny typed event bus for cross-section actions (command palette → modals,
 * nav → lazy content). "Sticky" events are replayed to the next subscriber so
 * a request to open a modal survives the section mounting later.
 */
interface EventMap {
  'reveal-below-fold': undefined;
  /** Mount every lazy section now (programmatic jumps need stable heights). */
  'mount-all': undefined;
  'open-project': { id: number };
  'open-blog': { id: number };
  'open-palette': undefined;
}

type EventName = keyof EventMap;

const STICKY: ReadonlySet<EventName> = new Set(['open-project', 'open-blog']);
const pending = new Map<EventName, unknown>();
const prefix = 'portfolio:';

export function emit<K extends EventName>(name: K, detail?: EventMap[K]): void {
  if (STICKY.has(name)) pending.set(name, detail);
  window.dispatchEvent(new CustomEvent(prefix + name, { detail }));
}

export function on<K extends EventName>(
  name: K,
  handler: (detail: EventMap[K]) => void,
): () => void {
  const listener = (e: Event) => {
    if (STICKY.has(name)) pending.delete(name);
    handler((e as CustomEvent<EventMap[K]>).detail);
  };
  window.addEventListener(prefix + name, listener);

  if (pending.has(name)) {
    const detail = pending.get(name) as EventMap[K];
    pending.delete(name);
    handler(detail);
  }

  return () => window.removeEventListener(prefix + name, listener);
}
