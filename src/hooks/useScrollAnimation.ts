"use client";

import type { RefObject } from 'react';
import { useEffect, useState, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement>(options?: ScrollAnimationOptions): { ref: RefObject<T>; isVisible: boolean } {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options?.triggerOnce && currentElement) {
            observer.unobserve(currentElement);
          }
        } else {
          if (!options?.triggerOnce) {
            // Optionally reset animation if it scrolls out of view and triggerOnce is false
            // setIsVisible(false); 
          }
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px',
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return { ref: elementRef, isVisible };
}
