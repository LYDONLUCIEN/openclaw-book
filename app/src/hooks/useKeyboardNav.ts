import { useEffect, useRef, useCallback } from 'react';

interface UseKeyboardNavOptions {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  isTransitioning: boolean;
  disabled?: boolean;
}

const THROTTLE_MS = 600;

export function useKeyboardNav({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onGoTo,
  isTransitioning,
  disabled,
}: UseKeyboardNavOptions) {
  const lastActionTime = useRef<number>(0);
  const isTransitioningRef = useRef(isTransitioning);

  // Keep ref in sync
  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      // Prevent default for presentation keys to avoid page scroll
      const presentationKeys = [
        'ArrowRight',
        'ArrowLeft',
        'ArrowDown',
        'ArrowUp',
        'Space',
        'PageDown',
        'PageUp',
        'Home',
        'End',
      ];
      if (presentationKeys.includes(event.key)) {
        event.preventDefault();
      }

      const now = Date.now();
      if (now - lastActionTime.current < THROTTLE_MS) return;
      if (isTransitioningRef.current) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          if (currentSlide < totalSlides - 1) {
            lastActionTime.current = now;
            onNext();
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          if (currentSlide > 0) {
            lastActionTime.current = now;
            onPrev();
          }
          break;
        case 'Home':
          if (currentSlide !== 0) {
            lastActionTime.current = now;
            onGoTo(0);
          }
          break;
        case 'End':
          if (currentSlide !== totalSlides - 1) {
            lastActionTime.current = now;
            onGoTo(totalSlides - 1);
          }
          break;
        default:
          break;
      }
    },
    [currentSlide, totalSlides, onPrev, onNext, onGoTo]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
