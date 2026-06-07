import { useEffect, useState } from 'react';
import type { Testimonial } from '../types';

/** Validates that fetched JSON matches the expected Testimonial[] contract. */
function isValidTestimonials(data: unknown): data is Testimonial[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Testimonial).id === 'number' &&
        typeof (item as Testimonial).quote === 'string' &&
        typeof (item as Testimonial).author === 'string' &&
        typeof (item as Testimonial).position === 'string'
    )
  );
}

const TESTIMONIAL_INTERVAL_MS = 15_000;

/**
 * Fetches testimonials with response validation and auto-rotates the carousel.
 * Defers fetch via requestIdleCallback to keep initial paint fast.
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/data/testimonials.json', {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data: unknown = await response.json();
        if (isValidTestimonials(data)) {
          setTestimonials(data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    };

    const deferred = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => fetchTestimonials());
      } else {
        setTimeout(fetchTestimonials, 1000);
      }
    };

    deferred();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, TESTIMONIAL_INTERVAL_MS);

    return () => clearInterval(id);
  }, [testimonials]);

  return { testimonials, currentIndex, setCurrentIndex };
}
