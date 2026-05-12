import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

export interface ComparisonColumn {
  key: string;
  header: string;
  featured?: boolean;
}

export interface ComparisonRow {
  feature: string;
  values: Record<string, React.ReactNode>;
  highlight?: string;
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  className?: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  columns,
  rows,
  className,
}) => {
  return (
    <div className={cn('rounded-xl overflow-hidden border border-[var(--border)]', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--primary)] text-white">
            <th className="text-left px-5 py-3.5 text-body-sm font-semibold whitespace-nowrap">
              Feature
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'text-left px-5 py-3.5 text-body-sm font-semibold whitespace-nowrap',
                  col.featured && 'bg-[var(--primary-dark)]'
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.feature}
              className={cn(
                'transition-colors duration-200 hover:bg-[var(--bg-accent)]',
                rowIndex % 2 === 0 ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-secondary)]'
              )}
            >
              <td className="px-5 py-3 text-body-sm font-semibold text-[var(--text-primary)] border-r border-[var(--border)]">
                {row.feature}
              </td>
              {columns.map((col) => {
                const value = row.values[col.key];
                const isHighlighted = row.highlight === col.key;
                return (
                  <td
                    key={col.key}
                    className={cn(
                      'px-5 py-3 text-body-sm text-[var(--text-primary)] border-r border-[var(--border)] last:border-r-0',
                      col.featured && 'border-l-[3px] border-l-[var(--primary)]',
                      isHighlighted && 'font-bold text-[var(--accent)]'
                    )}
                  >
                    {value === true ? (
                      <CheckCircle
                        className="w-5 h-5 text-[var(--success)]"
                        strokeWidth={2}
                      />
                    ) : value === false ? (
                      <XCircle
                        className="w-5 h-5 text-[var(--text-light)]"
                        strokeWidth={2}
                      />
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
