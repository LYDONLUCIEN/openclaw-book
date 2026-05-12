import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className }) => {
  const progress = total > 1 ? ((current) / (total - 1)) * 100 : 0;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent',
        className
      )}
    >
      <div
        className="h-full transition-[width] duration-500 ease-out"
        style={{
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
        }}
      />
    </div>
  );
};

export default ProgressBar;
