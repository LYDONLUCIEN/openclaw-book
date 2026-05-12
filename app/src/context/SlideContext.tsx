import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Theme } from '@/hooks/useTheme';

interface SlideContextValue {
  currentSlide: number;
  totalSlides: number;
  direction: 'next' | 'prev';
  isTransitioning: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  goToSlide: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  startTransition: () => void;
  endTransition: () => void;
}

const SlideContext = createContext<SlideContextValue | null>(null);

export function useSlideContext() {
  const ctx = useContext(SlideContext);
  if (!ctx) {
    throw new Error('useSlideContext must be used within a SlideProvider');
  }
  return ctx;
}

interface SlideProviderProps {
  totalSlides: number;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  children: React.ReactNode;
}

export const SlideProvider: React.FC<SlideProviderProps> = ({
  totalSlides,
  theme,
  setTheme,
  children,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback(() => setIsTransitioning(true), []);
  const endTransition = useCallback(() => setIsTransitioning(false), []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      if (index < 0 || index >= totalSlides) return;
      if (index === currentSlide) return;

      setDirection(index > currentSlide ? 'next' : 'prev');
      setCurrentSlide(index);
    },
    [currentSlide, totalSlides, isTransitioning]
  );

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  return (
    <SlideContext.Provider
      value={{
        currentSlide,
        totalSlides,
        direction,
        isTransitioning,
        theme,
        setTheme,
        goToSlide,
        goNext,
        goPrev,
        startTransition,
        endTransition,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
};
