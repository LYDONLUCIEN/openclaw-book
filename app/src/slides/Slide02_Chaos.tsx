import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MousePointerClick } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const GEAR_DEFS = [
  {
    label: '输入',
    icon: '📥',
    color: 'var(--primary)',
    shortDesc: '用户对系统的操作和指令',
    fullTitle: 'P — 参与度 (Participation)',
    fullDesc: '用户使用系统时需要投入的智能总量。',
    detail: '对系统操作越多、需要做的决策越多、需要规划的事情越多——参与度就越高。如果系统覆盖的场景少，用户就要自己补充，参与度也高。',
    costName: '确认成本',
    examples: ['命令行操作', '写长Prompt', '手动配置工作流', '一步步教AI'],
  },
  {
    label: '处理',
    icon: '⚙️',
    color: 'var(--accent)',
    shortDesc: '系统内部的加工与运算',
    fullTitle: 'C — 复杂度 (Complexity)',
    fullDesc: '系统构建本身需要的智能投入总量。复杂度越高，开发成本越大。',
    detail: '系统越复杂，能解决的场景越多，但需要设计、编码、测试的人力也越多。确定性要求越高，开发成本越大。更高的复杂度往往意味着系统完备度空间更大，但达到它需要更多开发成本。',
    costName: '开发成本',
    examples: ['编写代码', '训练模型', '设计工作流', '编写Skills'],
  },
  {
    label: '输出',
    icon: '📤',
    color: 'var(--success)',
    shortDesc: '系统返回的结果与反馈',
    fullTitle: 'U — 不确定度 (Uncertainty)',
    fullDesc: '系统输出的结果偏离预期的程度。不确定度越高，需要人力确认和修正的成本越大。',
    detail: '结果不准确需要人工校验，出现意外需要调整，这些都是确认成本。大模型的输出是概率性的，天然具有高不确定度。系统越"智能"，输出越灵活，不确定度也越高。',
    costName: '操作成本',
    examples: ['人工审核AI输出', '纠正错误结果', '处理异常情况', '补充AI遗漏'],
  },
];

const Slide02_Chaos: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [expandedGear, setExpandedGear] = useState<number | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.tri-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.tri-intro', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.tri-gear', { opacity: 0, scale: 0.5, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)', delay: 0.5 });
      gsap.fromTo('.tri-arrow', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.4, stagger: 0.15, delay: 1.0 });
      gsap.fromTo('.tri-hint', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.5 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !containerRef.current || expandedGear === null) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.tri-expanded', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, expandedGear] });

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    if (phase === 1) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.tri-triangle-section', { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' });
        gsap.fromTo('.tri-edge-anim', { strokeDashoffset: 300 },
          { strokeDashoffset: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.3 });
        gsap.fromTo('.tri-vertex', { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)', delay: 0.7 });
        gsap.fromTo('.tri-conclusion', { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, delay: 1.2 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, { scope: containerRef, dependencies: [isActive, phase] });

  const handleGearClick = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedGear(expandedGear === i ? null : i);
  };

  const handlePhaseClick = () => {
    if (phase === 0) {
      setExpandedGear(null);
      setPhase(1);
    } else {
      setPhase(0);
    }
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="tri-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">不可能三角</h2>
      <p className="tri-intro text-body text-[var(--text-secondary)] max-w-xl text-center mb-5 opacity-0">
        构建自动化系统，核心三个模块。每个模块对应一种成本维度。
      </p>

      {/* Three Gears */}
      <div className="flex items-start justify-center gap-3 md:gap-5 mb-2">
        {GEAR_DEFS.map((gear, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div className="tri-gear flex flex-col items-center px-5 py-4 md:px-7 md:py-5 rounded-xl border-2 cursor-pointer transition-all duration-300 opacity-0"
                style={{
                  borderColor: expandedGear === i ? gear.color : `${gear.color}80`,
                  backgroundColor: expandedGear === i ? `${gear.color}15` : `${gear.color}06`,
                  boxShadow: expandedGear === i ? `0 0 15px ${gear.color}25` : 'none',
                }}
                onClick={(e) => handleGearClick(i, e)}>
                <span className="text-3xl md:text-4xl mb-2">{gear.icon}</span>
                <span className="text-h3 font-bold" style={{ color: gear.color }}>{gear.label}</span>
                <span className="text-caption text-[var(--text-secondary)] mt-1">{gear.shortDesc}</span>
              </div>
              {/* Expanded detail below gear */}
              {expandedGear === i && (
                <div className="tri-expanded mt-3 max-w-xs rounded-xl border p-3 text-left" style={{ borderColor: gear.color, backgroundColor: `${gear.color}06` }}>
                  <span className="text-body-sm font-bold block mb-1" style={{ color: gear.color }}>{gear.fullTitle}</span>
                  <span className="text-body-sm font-bold text-[var(--text-secondary)] block mb-1">= {gear.costName}</span>
                  <p className="text-caption text-[var(--text-secondary)] leading-relaxed">{gear.fullDesc}</p>
                  <p className="text-caption text-[var(--text-light)] leading-relaxed mt-1">{gear.detail}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {gear.examples.map((ex, j) => (
                      <span key={j} className="text-caption px-1.5 py-0.5 rounded" style={{ backgroundColor: `${gear.color}10`, color: gear.color }}>{ex}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {i < 2 && (
              <span className="tri-arrow text-2xl text-[var(--text-light)] mt-8 opacity-0">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="tri-hint flex items-center gap-4 text-caption text-[var(--text-light)] mt-3 mb-4 opacity-0">
        <span className="flex items-center gap-1"><MousePointerClick size={12} /> 点击齿轮展开详细定义</span>
        <span>|</span>
        <span className="cursor-pointer hover:text-[var(--text-secondary)]" onClick={handlePhaseClick}>
          点击查看不可能三角 →
        </span>
      </div>

      {/* Phase 1: Proper Impossible Triangle SVG */}
      {phase === 1 && (
        <div className="tri-triangle-section flex flex-col items-center opacity-0">
          <svg width="360" height="240" viewBox="0 0 360 240" className="mb-3">
            {/* Edges with animation */}
            <line className="tri-edge-anim" x1="180" y1="25" x2="40" y2="200"
              stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="300" />
            <line className="tri-edge-anim" x1="40" y1="200" x2="320" y2="200"
              stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="300" />
            <line className="tri-edge-anim" x1="320" y1="200" x2="180" y2="25"
              stroke="var(--success)" strokeWidth="2.5" strokeDasharray="300" />

            {/* Edge labels */}
            <text x="95" y="108" textAnchor="middle" fill="var(--accent)" fontSize="10" transform="rotate(-50, 95, 108)">开发成本 ↕</text>
            <text x="180" y="218" textAnchor="middle" fill="var(--primary)" fontSize="10">确认成本 ↕</text>
            <text x="265" y="108" textAnchor="middle" fill="var(--success)" fontSize="10" transform="rotate(50, 265, 108)">操作成本 ↕</text>

            {/* C Vertex (bottom-left) */}
            <g className="tri-vertex">
              <circle cx="40" cy="200" r="26" fill="var(--accent)12" stroke="var(--accent)" strokeWidth="2" />
              <text x="40" y="196" textAnchor="middle" fill="var(--accent)" fontSize="16" fontWeight="bold">C</text>
              <text x="40" y="210" textAnchor="middle" fill="var(--accent)" fontSize="8">复杂度</text>
            </g>

            {/* P Vertex (top) */}
            <g className="tri-vertex">
              <circle cx="180" cy="25" r="26" fill="var(--primary)12" stroke="var(--primary)" strokeWidth="2" />
              <text x="180" y="21" textAnchor="middle" fill="var(--primary)" fontSize="16" fontWeight="bold">P</text>
              <text x="180" y="35" textAnchor="middle" fill="var(--primary)" fontSize="8">参与度</text>
            </g>

            {/* U Vertex (bottom-right) */}
            <g className="tri-vertex">
              <circle cx="320" cy="200" r="26" fill="var(--success)12" stroke="var(--success)" strokeWidth="2" />
              <text x="320" y="196" textAnchor="middle" fill="var(--success)" fontSize="16" fontWeight="bold">U</text>
              <text x="320" y="210" textAnchor="middle" fill="var(--success)" fontSize="8">不确定度</text>
            </g>

            {/* Center */}
            <text x="180" y="150" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" opacity="0.8">不可能三角</text>
            <text x="180" y="166" textAnchor="middle" fill="var(--text-light)" fontSize="10">三者不可同时最优</text>
          </svg>

          <div className="tri-conclusion text-center max-w-lg">
            <p className="text-h3 font-bold text-[var(--text-primary)]">
              所有技术选择，都是在这三个维度上的取舍
            </p>
            <p className="text-body text-[var(--text-secondary)] mt-1">
              你无法同时拥有「低开发成本」「低操作成本」「低确认成本」
            </p>
            <p className="text-caption text-[var(--text-light)] mt-2">
              C + P + U = 常数K（问题的内在复杂度）
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-5 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击齿轮查看定义 | 点击文字查看三角' : '点击返回'}
      </div>
    </section>
  );
};

export default memo(Slide02_Chaos);
