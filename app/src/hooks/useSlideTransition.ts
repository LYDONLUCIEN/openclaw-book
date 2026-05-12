import { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface UseSlideTransitionOptions {
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

export function useSlideTransition(options: UseSlideTransitionOptions = {}) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Animate a slide entering
   * @param element - The slide DOM element
   * @param direction - 'next' (enter from right) or 'prev' (enter from left)
   */
  const animateEnter = useCallback(
    (element: HTMLElement, direction: 'next' | 'prev') => {
      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onStart: options.onTransitionStart,
        onComplete: options.onTransitionEnd,
      });

      timelineRef.current = tl;

      const fromX = direction === 'next' ? 100 : -100;

      tl.fromTo(
        element,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );

      return tl;
    },
    [options]
  );

  /**
   * Animate a slide exiting
   * @param element - The slide DOM element
   * @param direction - 'next' (exit to left) or 'prev' (exit to right)
   */
  const animateExit = useCallback(
    (element: HTMLElement, direction: 'next' | 'prev') => {
      const toX = direction === 'next' ? -100 : 100;

      return gsap.to(element, {
        x: toX,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      });
    },
    []
  );

  /**
   * Kill any active transition
   */
  const killTransition = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  return { animateEnter, animateExit, killTransition };
}
