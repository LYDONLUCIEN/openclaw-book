import React from 'react';

const COLORS: Record<number, string> = {
  1: '#3B82F6',
  2: '#10B981',
  3: '#F97316',
};

const ChapterBadge: React.FC<{ chapter: number }> = ({ chapter }) => (
  <span
    className="inline-flex items-center justify-center rounded shrink-0"
    style={{
      backgroundColor: COLORS[chapter],
      width: '1.15em',
      height: '1.15em',
    }}
  >
    <span className="text-white font-bold leading-none" style={{ fontSize: '0.6em' }}>
      {chapter}
    </span>
  </span>
);

export default ChapterBadge;
