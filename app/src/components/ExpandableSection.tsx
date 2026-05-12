import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ExpandableSectionProps {
  toggleLabel: string;
  hintText?: string;
  children: React.ReactNode;
  className?: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  toggleLabel,
  hintText = 'Click to expand',
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  return (
    <div className={cn('w-full', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-5 py-3.5 rounded-xl border transition-colors duration-200',
          'bg-[var(--bg-accent)] border-[var(--border)] hover:bg-[var(--bg-accent)]/80'
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={cn(
              'w-4 h-4 text-[var(--primary)] transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
          <span className="text-body-sm font-semibold text-[var(--primary)]">
            {toggleLabel}
          </span>
        </div>
        <span className="text-caption text-[var(--text-light)]">{hintText}</span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-5 py-5 rounded-b-xl bg-[var(--bg-primary)] border border-t-0 border-[var(--border)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandableSection;
