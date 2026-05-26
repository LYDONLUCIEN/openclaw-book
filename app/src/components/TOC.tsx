import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { List, X } from 'lucide-react';

const SLIDE_TITLES = [
  'OpenClaw 入门指南',
  'OpenClaw 横空出世',
  '目录',
  '系统三特性的不可能三角',
  '四类角色：属性分配',
  'OpenClaw 核心架构',
  '原生大模型三大核心问题',
  '装备演进三条线',
  'Skills 生态全景',
  'Skills 生态与 Harness 工程体系',
  '其它类龙虾产品定位',
  '翻过三座山（1）:部署龙虾',
  '翻越三座山（2）：四类使用模式',
  '为什么我感觉用不起来？',
  '养虾三境界（3）:成本转移大法',
  '实战示例：L2 任务助理 & L3 定时调度',
  '实战案例：L4 本课件的诞生——用"龙虾"讲"龙虾"',
  '汇聚众人力量，突破AI能力天花板',
  '移动公司发展计划',
  '方案自评',
  '在使用中体验边界',
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
