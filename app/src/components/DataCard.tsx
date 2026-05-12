import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface DataCardProps {
  value: string | number;
  label: string;
  description?: string;
  className?: string;
  showArrow?: boolean;
  suffix?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  value,
  label,
  description,
  className,
  showArrow = false,
  suffix,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        className
      )}
    >
      {showArrow && (
        <ArrowRight
          className="w-5 h-5 text-[var(--success)] mb-2"
          strokeWidth={2.5}
        />
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-data font-mono font-extrabold text-[var(--accent)] leading-none">
          {value}
        </span>
        {suffix && (
          <span className="text-h3 font-mono font-bold text-[var(--accent)]">
            {suffix}
          </span>
        )}
      </div>
      <span className="mt-2 text-caption font-medium uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </span>
      {description && (
        <p className="mt-2 text-body-sm text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
};

export default DataCard;
