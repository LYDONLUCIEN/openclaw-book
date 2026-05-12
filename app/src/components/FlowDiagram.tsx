import React from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface FlowNode {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  active?: boolean;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  edges?: FlowEdge[];
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  edges: _edges,
  layout = 'horizontal',
  className,
}) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex gap-6 items-center',
          isHorizontal ? 'flex-row' : 'flex-col'
        )}
      >
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <FlowNodeComponent node={node} />
            {index < nodes.length - 1 && (
              <div
                className={cn(
                  'flex items-center justify-center text-[var(--secondary)]',
                  isHorizontal ? 'w-8 flex-shrink-0' : 'h-8'
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={cn(isHorizontal ? '' : 'rotate-90')}
                >
                  <path
                    d="M5 12h14M14 7l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const FlowNodeComponent: React.FC<{ node: FlowNode }> = ({ node }) => {
  const { title, description, icon: Icon, active } = node;

  return (
    <div
      className={cn(
        'relative flex flex-col items-center rounded-xl px-6 py-4 bg-[var(--card-bg)] border-2 transition-all duration-300',
        active
          ? 'border-[var(--secondary)] bg-[var(--bg-accent)] scale-[1.02]'
          : 'border-[var(--primary)]'
      )}
    >
      {Icon && (
        <Icon
          className="w-6 h-6 text-[var(--primary)] mb-2"
          strokeWidth={2}
        />
      )}
      <span className="text-h3 text-[var(--primary)] whitespace-nowrap">
        {title}
      </span>
      {description && (
        <span className="text-caption text-[var(--text-secondary)] mt-1 text-center">
          {description}
        </span>
      )}
    </div>
  );
};

export default FlowDiagram;
