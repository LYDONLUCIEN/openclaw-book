import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Palette } from 'lucide-react';

type Theme = 'blue' | 'dark' | 'warm';

interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

const themeOptions: { theme: Theme; label: string; dotColor: string }[] = [
  { theme: 'blue', label: 'Blue', dotColor: '#0066CC' },
  { theme: 'dark', label: 'Dark', dotColor: '#3B82F6' },
  { theme: 'warm', label: 'Warm', dotColor: '#FF6B35' },
];

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={popoverRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-11 h-11 rounded-full flex items-center justify-center',
          'bg-[var(--card-bg)] border border-[var(--border)] shadow-toggle',
          'transition-all duration-200 hover:scale-110 group'
        )}
        aria-label="Change theme"
        aria-expanded={isOpen}
      >
        <Palette
          className={cn(
            'w-5 h-5 text-[var(--primary)] transition-transform duration-200',
            isOpen && 'rotate-[30deg]'
          )}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full right-0 mt-2 p-2 rounded-xl',
            'bg-[var(--card-bg)] border border-[var(--border)] shadow-popover',
            'flex flex-col gap-1 min-w-[140px]'
          )}
        >
          {themeOptions.map((option) => (
            <button
              key={option.theme}
              onClick={() => {
                onThemeChange(option.theme);
                setIsOpen(false);
              }}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-body-sm font-medium',
                'transition-colors duration-150 hover:bg-[var(--bg-accent)]',
                currentTheme === option.theme && 'bg-[var(--bg-accent)]'
              )}
            >
              <span
                className="w-4 h-4 rounded-full border border-[var(--border)] flex-shrink-0"
                style={{ backgroundColor: option.dotColor }}
              />
              <span className="text-[var(--text-primary)]">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
