import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SlideProvider, useSlideContext } from '@/context/SlideContext';
import { useTheme } from '@/hooks/useTheme';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import ProgressBar from './ProgressBar';
import TOC from './TOC';
import { useZoomOnAlt } from '@/hooks/useZoomOnAlt';
import { ImageZoomProvider } from '@/components/ImageOverlay';
interface LayoutProps {
  totalSlides: number;
  slides: React.ComponentType<{ isActive: boolean }>[];
  className?: string;
}

/**
 * Inner layout that consumes the slide context.
 * Handles slide rendering with GSAP transitions.
 */
const LayoutInner: React.FC<{ slides: React.ComponentType<{ isActive: boolean }>[]; className?: string }> = ({
  slides,
  className,
}) => {
  const {
    currentSlide,
    totalSlides,
    direction,
    theme,
    setTheme,
    goNext,
    goPrev,
    goToSlide,
    isTransitioning,
  } = useSlideContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevSlideRef = useRef(currentSlide);
  const { registerContainer } = useZoomOnAlt();

  useKeyboardNav({
    currentSlide,
    totalSlides,
    onPrev: goPrev,
    onNext: goNext,
    onGoTo: goToSlide,
    isTransitioning,
  });

  // GSAP slide transitions
  useGSAP(
    () => {
      if (prevSlideRef.current === currentSlide) return;

      const prevIndex = prevSlideRef.current;
      const outgoingEl = slideRefs.current[prevIndex];
      const incomingEl = slideRefs.current[currentSlide];

      if (!incomingEl) return;

      const isForward = currentSlide > prevIndex;

      // Set initial state for incoming slide
      gsap.set(incomingEl, {
        x: isForward ? 100 : -100,
        opacity: 0,
        pointerEvents: 'auto',
      });
      incomingEl.scrollTop = 0;

      const tl = gsap.timeline({
        onComplete: () => {
          prevSlideRef.current = currentSlide;
        },
      });

      // Animate outgoing slide
      if (outgoingEl) {
        tl.to(
          outgoingEl,
          {
            x: isForward ? -100 : 100,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
              gsap.set(outgoingEl, { pointerEvents: 'none' });
            },
          },
          0
        );
      }

      // Animate incoming slide
      tl.to(
        incomingEl,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.1
      );

      prevSlideRef.current = currentSlide;
    },
    { scope: containerRef, dependencies: [currentSlide, direction] }
  );

  // Initial slide setup
  useEffect(() => {
    slideRefs.current.forEach((el, index) => {
      if (el) {
        gsap.set(el, {
          opacity: index === 0 ? 1 : 0,
          x: index === 0 ? 0 : 100,
          pointerEvents: index === 0 ? 'auto' : 'none',
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className={cn('relative min-h-[100dvh]', className)}>
      {/* Progress Bar */}
      <ProgressBar current={currentSlide} total={totalSlides} />

      {/* Top Bar */}
      <TopBar currentSlide={currentSlide} totalSlides={totalSlides} theme={theme} onThemeChange={setTheme} />

      {/* Slide Container */}
      <div
        ref={registerContainer}
        className="relative w-full min-h-[100dvh] overflow-hidden"
        data-slide-container
      >
        {slides.map((SlideComponent, index) => (
          <div
            key={index}
            data-slide-index={index}
            ref={(el) => { slideRefs.current[index] = el; }}
            className="absolute inset-0 w-full min-h-[100dvh] overflow-y-auto"
            role="region"
            aria-label={`Slide ${index + 1} of ${totalSlides}`}
            aria-hidden={index !== currentSlide}
          >
            <SlideComponent isActive={index === currentSlide} />
          </div>
        ))}
      </div>

      {/* Table of Contents */}
      <TOC
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onGoToSlide={goToSlide}
      />

      {/* Bottom Navigation */}
      <BottomNav
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
};

/**
 * Layout wraps the presentation with SlideProvider and renders the inner layout.
 */
const Layout: React.FC<LayoutProps> = ({ totalSlides, slides, className }) => {
  const { theme, setTheme } = useTheme();

  return (
    <ImageZoomProvider>
      <SlideProvider totalSlides={totalSlides} theme={theme} setTheme={setTheme}>
        <LayoutInner slides={slides} className={className} />
      </SlideProvider>
    </ImageZoomProvider>
  );
};

export default Layout;
