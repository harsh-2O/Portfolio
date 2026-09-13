import { useEffect, useState } from 'react';

const TICK_MS = 1000;

/**
 * Live clock for an IANA time zone, formatted as HH:MM:SS.
 * Returns null if the zone is unsupported by the runtime.
 */
export function useLocalTime(timeZone: string): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let formatter: Intl.DateTimeFormat;
    try {
      formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    } catch {
      return;
    }

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
