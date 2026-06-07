import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazyWhenVisibleProps {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
}

/**
 * Mounts children only when the placeholder nears the viewport.
 * Prevents below-fold chunks from loading during initial paint.
 */
export default function LazyWhenVisible({
  children,
  minHeight = 280,
  rootMargin = '300px 0px',
}: LazyWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  );
}
