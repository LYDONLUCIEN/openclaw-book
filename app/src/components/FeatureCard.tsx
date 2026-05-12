import React from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        'group flex flex-col p-7 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary)] hover:shadow-card-hover',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--bg-accent)] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[var(--primary)]">
        <Icon
          className="w-6 h-6 text-[var(--primary)] transition-colors duration-300 group-hover:text-white"
          strokeWidth={2}
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-h3 font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
        {badge}
      </div>
      <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
