import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BottomNavProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  className,
}) => {
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 h-14 z-50',
        'bg-[var(--card-bg)]/80 backdrop-blur-xl',
        'border-t border-[var(--border)] shadow-nav',
        'flex items-center justify-center gap-4',
        className
      )}
    >
      {/* Prev Button */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={cn(
          'flex items-center justify-center gap-1',
          'w-[100px] h-10 rounded-full',
          'bg-[var(--primary)] text-white font-semibold text-sm',
          'transition-all duration-200',
          'hover:scale-105 hover:bg-[var(--primary-dark)]',
          'disabled:opacity-[0.35] disabled:cursor-not-allowed disabled:hover:scale-100'
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
        <span>Prev</span>
      </button>

      {/* Slide Counter */}
      <div className="flex items-center gap-1 min-w-[80px] justify-center">
        <span className="text-body-sm font-bold text-[var(--primary)]">
          {currentSlide + 1}
        </span>
        <span className="text-body-sm font-medium text-[var(--text-secondary)]">
          /
        </span>
        <span className="text-body-sm font-medium text-[var(--text-secondary)]">
          {totalSlides}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isLast}
        className={cn(
          'flex items-center justify-center gap-1',
          'w-[100px] h-10 rounded-full',
          'bg-[var(--primary)] text-white font-semibold text-sm',
          'transition-all duration-200',
          'hover:scale-105 hover:bg-[var(--primary-dark)]',
          'disabled:opacity-[0.35] disabled:cursor-not-allowed disabled:hover:scale-100'
        )}
        aria-label="Next slide"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </nav>
  );
};

export default BottomNav;
