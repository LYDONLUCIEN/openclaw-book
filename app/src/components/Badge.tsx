import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'accent' | 'success';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20',
  accent:
    'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
  success:
    'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-caption font-semibold border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
