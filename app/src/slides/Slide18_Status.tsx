import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Eye, Bot, RefreshCw, Palette, Code, Lightbulb } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const ITERATION_ROUNDS = [
  {
    round: '第 1 轮',
    human: '描述需求：这是一个面向移动内部的 AI Agent 课件，需要覆盖技术原理到实战场景',
    agent: 'Agent 生成初版大纲：21页结构，从基础概念到进阶用法',
    color: '#3B82F6',
  },
  {
    round: '第 2 轮',
    human: '反馈：不要"不可能三角"，换成三个正面特性（确定性、完备性、便利性）',
    agent: '重构叙事框架：把所有数值反转，从"代价"改为"追求"',
    color: '#8B5CF6',
  },
  {
    round: '第 3 轮',
    human: '反馈：SKILL.md 的格式要真实，不要编造；MCP 要用真实的代码示例',
    agent: '搜索真实 OpenClaw 文档，替换为实际的 YAML frontmatter + 高德地图 MCP 代码',
    color: '#10B981',
  },
  {
    round: '第 N 轮',
    human: '审核每一页的文案、动画、配色：调整措辞，优化信息密度，控制节奏',
    agent: '逐页调整：精简冗余、补充细节、统一风格',
    color: '#F97316',
  },
];

const Slide18_Status: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      if (phase === 0) {
        gsap.fromTo('.st-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
        gsap.fromTo('.st-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
        gsap.fromTo('.st-round', { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.1, delay: 0.4 });
        gsap.fromTo('.st-quote', { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 1.2 });
      } else {
        gsap.fromTo('.st-detail', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="st-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        实战演示：这个课件本身
      </h2>
      <p className="st-subtitle text-body text-[var(--text-secondary)] max-w-2xl text-center mb-4 opacity-0">
        人机协作的真实产物——不是全自动，而是持续迭代的共同创作
      </p>

      {phase === 0 && (
        <div className="max-w-3xl w-full">
          {/* Iteration rounds */}
          <div className="space-y-2 mb-4">
            {ITERATION_ROUNDS.map((round, i) => (
              <div key={i}
                className="st-round rounded-xl border-2 p-3.5 opacity-0"
                style={{ borderColor: `${round.color}40`, backgroundColor: `${round.color}04` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${round.color}15`, color: round.color }}>
                    {round.round}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-start gap-2">
                    <Eye size={12} className="shrink-0 mt-1" style={{ color: '#3B82F6' }} />
                    <div>
                      <span className="text-[10px] font-bold block" style={{ color: '#3B82F6' }}>人的决策</span>
                      <p className="text-caption text-[var(--text-secondary)]">{round.human}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Bot size={12} className="shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
                    <div>
                      <span className="text-[10px] font-bold block" style={{ color: '#8B5CF6' }}>AI 的执行</span>
                      <p className="text-caption text-[var(--text-secondary)]">{round.agent}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom indicator */}
          <div className="flex items-center justify-center gap-2 text-caption text-[var(--text-light)]">
            <RefreshCw size={12} />
            <span>如此反复数十轮，直至质量和节奏达到预期</span>
          </div>

          <button
            className="w-full mt-4 py-2.5 rounded-xl border-2 text-body-sm font-bold transition-all"
            style={{ borderColor: '#F97316', backgroundColor: '#F9731608', color: '#F97316' }}
            onClick={(e) => { e.stopPropagation(); setPhase(1); }}>
            点击查看协作分工 →
          </button>
        </div>
      )}

      {phase === 1 && (
        <div className="st-detail max-w-3xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              { icon: Palette, label: '人负责', items: ['审美判断', '叙事节奏', '信息取舍', '最终决策'], color: '#3B82F6' },
              { icon: Code, label: 'AI 负责', items: ['代码实现', '动画效果', '文案初稿', '批量修改'], color: '#8B5CF6' },
              { icon: Lightbulb, label: '人+AI 共同', items: ['结构设计', '内容迭代', '方案对比', '质量优化'], color: '#10B981' },
            ].map((col, i) => {
              const Icon = col.icon;
              return (
                <div key={i} className="rounded-xl border-2 p-4" style={{ borderColor: col.color, backgroundColor: `${col.color}06` }}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Icon size={16} style={{ color: col.color }} />
                    <span className="text-body-sm font-bold" style={{ color: col.color }}>{col.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    {col.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
                        <span className="text-caption text-[var(--text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="w-full py-2 rounded-lg border text-caption text-[var(--text-light)]"
            onClick={(e) => { e.stopPropagation(); setPhase(0); }}>
            ← 返回迭代过程
          </button>
        </div>
      )}

      {/* Golden quote */}
      <div className="st-quote rounded-xl border-2 p-5 max-w-2xl w-full text-center mt-4 opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F9731608' }}>
        <p className="text-h3 font-bold" style={{ color: '#F97316' }}>
          "你可以外包你的思考，但不能外包你的理解。"
        </p>
        <p className="text-caption text-[var(--text-secondary)] mt-2">
          AI 生成内容的上限，取决于人对业务理解的深度
        </p>
      </div>
    </section>
  );
};

export default memo(Slide18_Status);
