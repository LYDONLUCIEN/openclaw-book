import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Code, GitBranch, BarChart3, Sparkles } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const EVOLUTION_CARDS = [
  {
    title: '执行者进化',
    from: '传统代码开发',
    to: 'Claude Code / Codex',
    color: '#3B82F6',
    icon: Code,
    fromStats: { certainty: 95, completeness: 10, convenience: 85 },
    toStats: { certainty: 95, completeness: 45, convenience: 92 },
    points: [
      'AI 辅助编程，代码生成与审查自动化',
      '确定性的根基不变，完备性大幅提升',
      '从手写到 AI 辅助，开发效率翻倍',
    ],
    delta: '完备性 +35 | 便利性 +7',
  },
  {
    title: '调度者进化',
    from: '工作流/低代码',
    to: 'DeerFlow / Dify',
    color: '#10B981',
    icon: GitBranch,
    fromStats: { certainty: 90, completeness: 20, convenience: 75 },
    toStats: { certainty: 85, completeness: 55, convenience: 88 },
    points: [
      '从手动编排到 AI 自动生成工作流',
      'Agent 自主规划节点，人工审核确认',
      '流程灵活度质的飞跃',
    ],
    delta: '完备性 +35 | 便利性 +13',
  },
  {
    title: '判断者进化',
    from: '传统机器学习',
    to: 'Evolver / EvoMap',
    color: '#8B5CF6',
    icon: BarChart3,
    fromStats: { certainty: 65, completeness: 35, convenience: 80 },
    toStats: { certainty: 70, completeness: 60, convenience: 85 },
    points: [
      '进化算法替代人工标注，群体经验自动沉淀',
      '从单模型到多 Agent 竞争筛选',
      '最佳实践自动浮现',
    ],
    delta: '完备性 +25 | 确定性 +5',
  },
  {
    title: '通才进化',
    from: '普通大模型',
    to: 'OpenClaw / Hermes',
    color: '#F97316',
    icon: Sparkles,
    fromStats: { certainty: 20, completeness: 90, convenience: 60 },
    toStats: { certainty: 55, completeness: 95, convenience: 82 },
    points: [
      'Skills + Harness 全链路工程化驾驭',
      '确定性从 20 飙升至 55，输出可控',
      '自我迭代的 Skill，越用越强',
    ],
    delta: '确定性 +35 | 便利性 +22',
  },
];

const STAT_DEFS = [
  { label: '确定性', color: 'var(--success)' },
  { label: '完备性', color: 'var(--accent)' },
  { label: '便利性', color: 'var(--primary)' },
];

const Slide15_Scene2: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s2-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.s2-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.s2-card', { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)', delay: 0.5 });
      gsap.fromTo('.s2-quote', { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || expandedCard === null || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s2-expanded', { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      EVOLUTION_CARDS[expandedCard].toStats &&
        STAT_DEFS.forEach((_, j) => {
          const bar = containerRef.current!.querySelector(`.s2-to-bar-${expandedCard}-${j}`);
          if (bar) {
            const target = [EVOLUTION_CARDS[expandedCard].toStats.certainty, EVOLUTION_CARDS[expandedCard].toStats.completeness, EVOLUTION_CARDS[expandedCard].toStats.convenience][j];
            gsap.to(bar, { width: `${target}%`, duration: 0.6, ease: 'power3.out', delay: 0.1 });
          }
        });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, expandedCard] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="s2-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        面对复杂问题 —— 给伙伴们也氪金
      </h2>
      <p className="s2-subtitle text-body text-[var(--text-secondary)] max-w-xl text-center mb-5 opacity-0">
        四条进化路线，能力值全面升级
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl w-full mb-5">
        {EVOLUTION_CARDS.map((card, i) => {
          const IconComp = card.icon;
          const isExpanded = expandedCard === i;
          const fromValues = [card.fromStats.certainty, card.fromStats.completeness, card.fromStats.convenience];
          const toValues = [card.toStats.certainty, card.toStats.completeness, card.toStats.convenience];
          return (
            <div key={i}
              className={`s2-card cursor-pointer transition-all duration-300 opacity-0 ${isExpanded ? 'col-span-1 md:col-span-2' : ''}`}
              onClick={() => setExpandedCard(isExpanded ? null : i)}>
              <div className="rounded-xl border-2 p-4 transition-all duration-300"
                style={{
                  borderColor: isExpanded ? card.color : `${card.color}60`,
                  backgroundColor: isExpanded ? `${card.color}12` : `${card.color}06`,
                  boxShadow: isExpanded ? `0 0 20px ${card.color}20` : 'none',
                }}>
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}18` }}>
                    <IconComp size={18} style={{ color: card.color }} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <span className="text-body font-bold" style={{ color: card.color }}>{card.title}</span>
                    <div className="flex items-center gap-1.5 text-caption text-[var(--text-light)]">
                      <span>{card.from}</span>
                      <span style={{ color: card.color }}>→</span>
                      <span className="font-bold" style={{ color: card.color }}>{card.to}</span>
                    </div>
                  </div>
                </div>

                {/* Compact stats - before/after bars */}
                <div className="space-y-1.5">
                  {STAT_DEFS.map((s, j) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="text-caption font-bold w-12 shrink-0" style={{ color: s.color }}>{s.label}</span>
                      <div className="flex-1 relative h-4">
                        {/* Before bar */}
                        <div className="absolute inset-y-0 left-0 rounded-sm opacity-40"
                          style={{ width: `${fromValues[j]}%`, backgroundColor: s.color }} />
                        {/* After bar (animated when expanded) */}
                        <div className={`s2-to-bar-${i}-${j} absolute inset-y-0 left-0 rounded-sm transition-shadow`}
                          style={{
                            width: isExpanded ? `${toValues[j]}%` : `${fromValues[j]}%`,
                            backgroundColor: s.color,
                            opacity: 0.8,
                          }} />
                      </div>
                      <span className="text-caption font-mono shrink-0 w-16 text-right" style={{ color: s.color }}>
                        {fromValues[j]} → <span className="font-bold">{toValues[j]}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delta badge */}
                <div className="mt-2">
                  <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                    {card.delta}
                  </span>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="s2-expanded mt-3 pt-3 border-t" style={{ borderColor: `${card.color}30` }}>
                    <ul className="space-y-1.5">
                      {card.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-caption text-[var(--text-secondary)]">
                          <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.color }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Quote */}
      <div className="s2-quote rounded-xl border-2 p-4 max-w-3xl w-full text-center opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F9731608' }}>
        <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
          不是每个职业都需要升到满级。找准自己的场景，氪对的金，比全氪更高效。
        </p>
      </div>
    </section>
  );
};

export default memo(Slide15_Scene2);
