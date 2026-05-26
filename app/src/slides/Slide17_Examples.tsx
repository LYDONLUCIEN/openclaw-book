import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const MODEL_TAGS = [
  { name: 'Claude 4.7 Opus', accent: '#A855F7' },
  { name: 'Claude Code', accent: '#F97316' },
  { name: 'GPT 5.5', accent: '#10B981' },
  { name: 'Codex', accent: '#3B82F6' },
  { name: 'GLM 5 Turbo', accent: '#EF4444' },
  { name: 'Kimi 2.6', accent: '#06B6D4' },
];

const FLOW_STEPS = [
  { label: '人提出问题', human: true },
  { label: '模型询问澄清', human: true },
  { label: '标准 ReAct 执行', human: false },
  { label: '自动化测试', human: false },
  { label: '人工校验', human: true },
];

const HUMAN_COLOR = '#3B82F6';
const AUTO_COLOR = '#10B981';

const Slide17_Examples: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.sol-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo('.sol-subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.sol-card', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.2)' }, 0.5);
      tl.fromTo('.sol-bottom', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 1.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="sol-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={2} />
        那怎么办呢？成本继续转移！
      </h2>

      <p className="sol-subtitle text-body-sm text-[var(--text-secondary)] mb-4 opacity-0">
        面对每个层级带来的挑战，有三条应对路径
      </p>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 flex-1">

        {/* ═══ Card 1: 各司其职 ═══ */}
        <div className="sol-card rounded-xl border-2 p-5 opacity-0 flex flex-col"
          style={{ borderColor: '#8B5CF640', backgroundColor: '#8B5CF605' }}>

          {/* Top: Header + Points */}
          <div className="shrink-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#8B5CF615', color: '#8B5CF6' }}>
                <span className="text-body font-bold">1</span>
              </div>
              <div>
                <h3 className="text-body-lg font-bold" style={{ color: '#8B5CF6' }}>各司其职</h3>
                <span className="text-caption font-semibold" style={{ color: '#8B5CF6CC' }}>
                  找到对某类成本不敏感的场景
                </span>
              </div>
            </div>
            <div className="space-y-1.5 mb-1">
              <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
                · 算力不敏感：报表慢慢算，反正明天才看
              </p>
              <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
                · 不确定性不敏感：文字比数据更容易检查，让模型输出后人工审阅
              </p>
            </div>
          </div>

          {/* Middle: Data Comparison — vertically centered */}
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="w-full rounded-lg border overflow-hidden"
              style={{ borderColor: '#8B5CF625' }}>
              <div className="grid grid-cols-3"
                style={{ backgroundColor: '#8B5CF610' }}>
                <span className="text-[12px] font-bold py-2 px-3" style={{ color: '#8B5CF6' }}>方式</span>
                <span className="text-[12px] font-bold py-2 px-3 text-center" style={{ color: '#8B5CF6' }}>首次耗时</span>
                <span className="text-[12px] font-bold py-2 px-3 text-center" style={{ color: '#8B5CF6' }}>重复使用</span>
              </div>
              <div className="grid grid-cols-3 border-t"
                style={{ borderColor: '#8B5CF612' }}>
                <span className="text-[12px] py-2 px-3 font-semibold" style={{ color: 'var(--text-primary)' }}>Excel 表</span>
                <span className="text-[12px] py-2 px-3 text-center font-bold" style={{ color: '#F59E0B' }}>2 小时</span>
                <span className="text-[12px] py-2 px-3 text-center font-bold" style={{ color: '#10B981' }}>5 秒</span>
              </div>
              <div className="grid grid-cols-3 border-t"
                style={{ borderColor: '#8B5CF612', backgroundColor: '#8B5CF605' }}>
                <span className="text-[12px] py-2 px-3 font-semibold" style={{ color: 'var(--text-primary)' }}>大模型</span>
                <span className="text-[12px] py-2 px-3 text-center font-bold" style={{ color: '#F59E0B' }}>25 分钟</span>
                <span className="text-[12px] py-2 px-3 text-center font-bold" style={{ color: '#EF4444' }}>25 分钟</span>
              </div>
            </div>
          </div>

          {/* Bottom: Examples */}
          <div className="shrink-0 rounded-lg border px-3 py-2.5"
            style={{ borderColor: '#8B5CF620', backgroundColor: '#8B5CF608' }}>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              💡 自动处理文章计算报表——不用开发报表程序，慢就慢点
            </p>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              💡 文字输出场景——检查文字比检查数据容易，确定性要求天然低
            </p>
          </div>
        </div>

        {/* ═══ Card 2: 继续氪金 ═══ */}
        <div className="sol-card rounded-xl border-2 p-5 opacity-0 flex flex-col"
          style={{ borderColor: '#3B82F640', backgroundColor: '#3B82F605' }}>

          {/* Top: Header + Points */}
          <div className="shrink-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#3B82F615', color: '#3B82F6' }}>
                <span className="text-body font-bold">2</span>
              </div>
              <div>
                <h3 className="text-body-lg font-bold" style={{ color: '#3B82F6' }}>继续氪金</h3>
                <span className="text-caption font-semibold" style={{ color: '#3B82F6CC' }}>
                  学习成本 → 算力成本
                </span>
              </div>
            </div>
            <div className="space-y-1.5 mb-1">
              <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
                · 使用更强的模型来解决更复杂的问题
              </p>
              <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
                · 用代码智能体开发框架与程序，大幅增加确定性
              </p>
            </div>
          </div>

          {/* Middle: Model Tags — vertically centered */}
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="grid grid-cols-2 gap-2 w-full">
              {MODEL_TAGS.map((tag) => (
                <div key={tag.name}
                  className="flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: `${tag.accent}0A`,
                    border: `1px solid ${tag.accent}25`,
                  }}>
                  <div className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: tag.accent }} />
                  <span className="text-[12px] font-semibold whitespace-nowrap"
                    style={{ color: `${tag.accent}DD` }}>
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Examples */}
          <div className="shrink-0 rounded-lg border px-3 py-2.5"
            style={{ borderColor: '#3B82F620', backgroundColor: '#3B82F608' }}>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              💡 Hermes 自己装自己，装得越多经验越顺
            </p>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              💡 Claude Code 辅助开发，复杂框架也能高质量交付
            </p>
          </div>
        </div>

        {/* ═══ Card 3: 人在回路 ═══ */}
        <div className="sol-card rounded-xl border-2 p-5 opacity-0 flex flex-col"
          style={{ borderColor: '#10B98140', backgroundColor: '#10B98105' }}>

          {/* Top: Header + Points */}
          <div className="shrink-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#10B98115', color: '#10B981' }}>
                <span className="text-body font-bold">3</span>
              </div>
              <div>
                <h3 className="text-body-lg font-bold" style={{ color: '#10B981' }}>人在回路</h3>
                <span className="text-caption font-semibold" style={{ color: '#10B981CC' }}>
                  操作成本 → 确认成本
                </span>
              </div>
            </div>
            <div className="space-y-1.5 mb-1">
              <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
                · 让自己成为理解和决策者，人来操作简单部分
              </p>
              <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
                · 先验证 Skills 中间步骤，确认过程正确再让模型继续
              </p>
            </div>
          </div>

          {/* Middle: Flow Diagram — vertically centered */}
          <div className="flex-1 flex flex-col items-center justify-center py-2">
            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: HUMAN_COLOR }} />
                <span className="text-[11px] font-medium" style={{ color: HUMAN_COLOR }}>人工参与</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: AUTO_COLOR }} />
                <span className="text-[11px] font-medium" style={{ color: AUTO_COLOR }}>自动执行</span>
              </div>
            </div>
            {/* Steps */}
            <div className="w-full flex flex-col items-center gap-0.5">
              {FLOW_STEPS.map((step, i) => {
                const color = step.human ? HUMAN_COLOR : AUTO_COLOR;
                return (
                  <React.Fragment key={i}>
                    <div className="w-full flex items-center gap-2 rounded-lg px-3 py-1.5"
                      style={{
                        backgroundColor: `${color}08`,
                        borderLeft: `3px solid ${color}60`,
                      }}>
                      <span className="text-[12px] font-semibold" style={{ color }}>
                        {step.label}
                      </span>
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <svg width="16" height="10" viewBox="0 0 16 10">
                        <path d="M8 0 L8 6 M5 4 L8 8 L11 4"
                          stroke="var(--text-tertiary)" strokeWidth="1.3"
                          fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Bottom: Examples */}
          <div className="shrink-0 rounded-lg border px-3 py-2.5"
            style={{ borderColor: '#10B98120', backgroundColor: '#10B98108' }}>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              💡 传文件给AI：自己开云盘上传 vs 让AI建服务器搭OSS——我来操作
            </p>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              💡 先手动跑一遍 Skill，保证中间过程对
            </p>
          </div>
        </div>
      </div>

      {/* Bottom summary */}
      <div className="sol-bottom mt-4 max-w-5xl w-full text-center opacity-0">
        <div className="rounded-xl border-2 px-6 py-3"
          style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
          <p className="text-body font-bold" style={{ color: '#F97316' }}>
            成本只是在互相转移——找到对某类成本不敏感的场景，就是最优解
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide17_Examples);
