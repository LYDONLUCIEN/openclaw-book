import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { List, X } from 'lucide-react';

const SLIDE_TITLES = [
  '封面',
  '三个问题',
  '三个好特性',
  '职业图鉴',
  'OpenClaw vs 大模型',
  '应届生入职',
  'v1.0 人工教学',
  'v2.0 流程标准化',
  'v3.0 自主调度',
  'v4.0 龙虾！',
  'OpenClaw 架构详解',
  '如何使用 OpenClaw',
  '龙虾的局限性',
  '怎么做好龙虾',
  '组队打 Boss',
  '例子：助理类',
  '例子：定时任务',
  '例子：复杂决策',
  '未来展望',
  '总结',
  '谢谢聆听',
];

interface TOCProps {
  currentSlide: number;
  totalSlides: number;
  onGoToSlide: (index: number) => void;
}

const TOC: React.FC<TOCProps> = ({ currentSlide, totalSlides, onGoToSlide }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (index: number) => {
    onGoToSlide(index);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating TOC button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-20 left-4 z-50',
          'w-11 h-11 rounded-full flex items-center justify-center',
          'bg-[var(--card-bg)] border border-[var(--border)] shadow-toggle',
          'transition-all duration-200 hover:scale-110'
        )}
        aria-label="Table of contents"
      >
        <List className="w-5 h-5 text-[var(--primary)]" strokeWidth={2} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-label="Table of contents"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div
            className={cn(
              'relative z-10 w-full max-w-md max-h-[80vh] mx-4',
              'bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-popover',
              'flex flex-col overflow-hidden'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <span className="text-body font-semibold text-[var(--text-primary)]">
                目录
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  'transition-colors duration-150 hover:bg-[var(--bg-accent)]'
                )}
                aria-label="Close"
              >
                <X className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={2} />
              </button>
            </div>

            {/* Slide list */}
            <div className="overflow-y-auto flex-1 px-2 py-2">
              {SLIDE_TITLES.slice(0, totalSlides).map((title, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={cn(
                    'w-full text-left px-4 py-2.5 rounded-lg text-body-sm font-medium',
                    'transition-colors duration-150 hover:bg-[var(--bg-accent)]',
                    index === currentSlide
                      ? 'bg-[var(--bg-accent)] text-[var(--primary)]'
                      : 'text-[var(--text-primary)]'
                  )}
                >
                  <span className="inline-flex items-center gap-3">
                    <span
                      className={cn(
                        'w-6 text-right text-caption font-semibold flex-shrink-0',
                        index === currentSlide
                          ? 'text-[var(--primary)]'
                          : 'text-[var(--text-secondary)]'
                      )}
                    >
                      {index + 1}
                    </span>
                    <span>{title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TOC;
