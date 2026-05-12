import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TimelineItem from '@/components/TimelineItem';
import DataCard from '@/components/DataCard';
import Badge from '@/components/Badge';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps {
  isActive: boolean;
}

const Slide03_Evolution1: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.evo-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      tl.fromTo('.evo-highlight', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, '-=0.25');
      tl.fromTo('.evo-timeline', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, 0.4);
      tl.fromTo('.evo-data', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 0.9);
      tl.fromTo('.evo-expand', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6 evo-title opacity-0">
          <h2 className="text-display text-[var(--primary)] font-extrabold tracking-tight">
            AI的三个时代
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-2">
            从副驾驶到指挥官的进化之路
          </p>
        </div>

        {/* Highlight Insight Panel */}
        <div className="evo-highlight opacity-0 mb-8 p-5 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/5">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Badge variant="accent">关键洞察</Badge>
            <span className="text-h3 font-bold text-[var(--text-primary)]">2026年 = Agent元年</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {[
              '模型推理质量飞跃 (Claude Opus 4.6 / GPT-5.2)',
              '256K+ 长上下文窗口',
              'MCP协议标准化工具调用',
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-2 text-body-sm text-[var(--text-secondary)]">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline + Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-1">
            <div className="evo-timeline opacity-0">
              <TimelineItem
                step={1}
                year="2022-2024"
                title="Copilot时代"
                description="ChatGPT引爆AI革命，AI作为副驾驶辅助人类工作"
                status="past"
              />
            </div>
            <div className="evo-timeline opacity-0">
              <TimelineItem
                step={2}
                year="2024-2025"
                title="Vibe Coding时代"
                description="92%开发者使用AI工具，从写代码到描述需求"
                status="current"
              />
            </div>
            <div className="evo-timeline opacity-0">
              <TimelineItem
                step={3}
                year="2025-至今"
                title="Agentic时代"
                description="AI作为执行者，人类成为指挥官，自主完成复杂任务"
                status="emerging"
              />
            </div>
          </div>

          {/* Data Cards */}
          <div className="space-y-4">
            <div className="evo-data opacity-0">
              <DataCard value="278,932" label="OpenClaw Stars" description="仅4个月增长" showArrow />
            </div>
            <div className="evo-data opacity-0">
              <DataCard value="$25亿" label="Claude Code ARR" description="年度经常性收入" showArrow />
            </div>
            <div className="evo-data opacity-0">
              <DataCard value="$51亿" label="全球AI Agent市场" description="2026年预测规模" showArrow />
            </div>
          </div>
        </div>

        {/* Expandable Section */}
        <div className="mt-8 evo-expand opacity-0">
          <ExpandableSection toggleLabel="什么是Vibe Coding？" hintText="点击展开">
            <div className="text-body-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                Vibe Coding（氛围编程）代表了一种范式转变：开发者不再逐行编写代码，
                而是通过自然语言描述意图，让AI生成实现。核心是从"告诉计算机怎么做"
                变为"告诉计算机我想要什么"。
              </p>
              <p>
                根据2025年Stack Overflow开发者调查，<strong className="text-[var(--text-primary)]">92%的开发者</strong>
                已在日常工作中使用AI辅助工具。这不只是效率提升，而是整个软件开发方式的根本性变革。
              </p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide03_Evolution1);
