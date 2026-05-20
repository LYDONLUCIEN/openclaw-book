import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Maximize, Minimize } from 'lucide-react';
import CmLogo from './assets/CmLogo';
import ThemeToggle from './ThemeToggle';
import type { Theme } from '@/hooks/useTheme';

interface TopBarProps {
  currentSlide: number;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

/**
 * Fixed top bar, hidden on slide 0 and 20 (cover and thank-you)
 */
const TopBar: React.FC<TopBarProps> = ({
  currentSlide,
  theme,
  onThemeChange,
  className,
}) => {
  const isHidden = currentSlide === 0 || currentSlide === 20;

  // Fullscreen state tracking
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 h-12 z-50',
        'bg-[var(--bg-primary)]/90 backdrop-blur-xl',
        'border-b border-[var(--border)]',
        'flex items-center justify-between px-4 lg:px-6',
        'transition-all duration-300',
        isHidden
          ? 'opacity-0 -translate-y-full pointer-events-none'
          : 'opacity-100 translate-y-0',
        className
      )}
    >
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2 min-w-0">
        <CmLogo className="text-[var(--primary)] flex-shrink-0" width={24} height={24} />
        <span className="text-caption font-medium text-[var(--text-secondary)] truncate">
          AI Agent技术讲座
        </span>
      </div>

      {/* Right: Fullscreen + Theme Toggle */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={toggleFullscreen}
          className={cn(
            'w-11 h-11 rounded-full flex items-center justify-center',
            'bg-[var(--card-bg)] border border-[var(--border)] shadow-toggle',
            'transition-all duration-200 hover:scale-110'
          )}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 text-[var(--primary)]" strokeWidth={2} />
          ) : (
            <Maximize className="w-5 h-5 text-[var(--primary)]" strokeWidth={2} />
          )}
        </button>
        <ThemeToggle currentTheme={theme} onThemeChange={onThemeChange} />
      </div>
    </header>
  );
};

export default TopBar;
