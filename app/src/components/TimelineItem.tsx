import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  step: number;
  year?: string;
  title: string;
  description: string;
  status?: 'past' | 'current' | 'emerging';
  className?: string;
}

const statusStyles = {
  past: 'bg-[var(--text-light)]',
  current: 'bg-[var(--primary)]',
  emerging: 'bg-[var(--secondary)]',
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  step,
  year,
  title,
  description,
  status = 'past',
  className,
}) => {
  return (
    <div className={cn('flex gap-4 relative', className)}>
      {/* Timeline line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[var(--border)] -z-0" />

      {/* Dot */}
      <div
        className={cn(
          'relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm',
          status === 'current' && 'ring-4 ring-[var(--primary)]/30',
          statusStyles[status]
        )}
      >
        {step}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        {year && (
          <span className="text-caption text-[var(--text-light)] mb-1 block">
            {year}
          </span>
        )}
        <h3 className="text-h3 text-[var(--text-primary)]">{title}</h3>
        <p className="mt-1 text-body-sm text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;
