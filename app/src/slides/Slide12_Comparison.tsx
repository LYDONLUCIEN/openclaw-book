import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageSquare, Bot, Clock, Brain } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const LEVELS = [
  {
    level: 1,
    title: '人设对话',
    color: '#10B981',
    icon: MessageSquare,
    points: [
      '拥有持久记忆的对话伙伴，风格与上下文跨会话保持一致',
      '相比普通大模型：记忆连续、人格稳定、可积累用户偏好',
    ],
    tag: '确定性 · 完备性 ↑',
    when: '客服、培训、知识问答',
  },
  {
    level: 2,
    title: '任务助手',
    color: '#3B82F6',
    icon: Bot,
    points: [
      '执行明确任务，自动沉淀操作经验为 Skill',
      '遇到能力边界时，自动编撰新 Skill 扩展能力',
    ],
    tag: '完备性 ↑ 便利性 ↑',
    when: '数据处理、文档生成、流程执行',
  },
  {
    level: 3,
    title: '定时调度',
    color: '#8B5CF6',
    icon: Clock,
    points: [
      '按计划自动执行：日报、周报、监控巡检、数据同步',
      '需要充分调教后才能稳定运行，Heartbeat 驱动周期触发',
    ],
    tag: '便利性 ↑↑ 确定性 ·',
    when: '定期报告、自动化运维、持续监控',
  },
  {
    level: 4,
    title: '自主决策',
    color: '#F97316',
    icon: Brain,
    points: [
      '非流程化复杂任务，需人工先走通一遍再交给 Agent',
      '必须持续监管，防止目标偏移和意外操作',
    ],
    tag: '三个特性 ↑ 但需监管',
    when: '调研分析、方案设计、复杂决策',
  },
];

const Slide12_Comparison: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cmp-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.cmp-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.cmp-card', { opacity: 0, y: 30, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: 'back.out(1.4)', delay: 0.5 });
      gsap.fromTo('.cmp-footer', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="cmp-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        如何使用 OpenClaw？
      </h2>
      <p className="cmp-subtitle text-body text-[var(--text-secondary)] mb-6 max-w-xl text-center opacity-0">
        四个使用层级，从对话到自主——层级越高，能力越强，调教成本也越高
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full">
        {LEVELS.map((lv) => {
          const Icon = lv.icon;
          return (
            <div key={lv.level}
              className="cmp-card rounded-xl border-2 p-5 transition-all duration-300 opacity-0"
              style={{
                borderColor: lv.color,
                backgroundColor: `${lv.color}06`,
              }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white shrink-0"
                  style={{ backgroundColor: lv.color }}>
                  {lv.level}
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${lv.color}15`, color: lv.color }}>
                  <Icon size={18} />
                </div>
                <span className="text-h3 font-bold" style={{ color: lv.color }}>{lv.title}</span>
              </div>

              <ul className="space-y-1.5 mb-3 pl-1">
                {lv.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-caption text-[var(--text-secondary)]">
                    <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: lv.color }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full px-3 py-1 text-caption font-semibold"
                  style={{ backgroundColor: `${lv.color}15`, color: lv.color }}>
                  {lv.tag}
                </span>
                <span className="text-caption text-[var(--text-light)]">适用：{lv.when}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cmp-footer rounded-xl border-2 p-4 max-w-3xl w-full mt-5 text-center opacity-0"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
        <p className="text-body-sm text-[var(--text-primary)]">
          不要一开始就追求 Level 4——从 Level 1 积累经验，逐级验证后再升级
        </p>
      </div>
    </section>
  );
};

export default memo(Slide12_Comparison);
