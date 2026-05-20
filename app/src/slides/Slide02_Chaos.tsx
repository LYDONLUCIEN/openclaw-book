import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MousePointerClick } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const GEAR_DEFS = [
  {
    label: '确定性',
    icon: '🎯',
    color: 'var(--success)',
    shortDesc: '系统输出结果可靠、可预测',
    fullTitle: '确定性 (Certainty)',
    fullDesc: '系统输出结果的可靠性和可预测程度。确定性越高，结果越稳定可信。',
    detail: '确定性高的系统，输出结果无需人工反复审核，错误率低，边界情况可控。提升确定性需要投入开发验证——逻辑越严谨，系统越可靠。',
    costName: '确认成本',
    costDesc: '低确定性的系统需要人工验收和纠错，花费确认成本',
    examples: ['结果无需人工审核', '输出格式稳定可控', '边界情况可预测', '错误率低'],
  },
  {
    label: '完备性',
    icon: '🧩',
    color: 'var(--accent)',
    shortDesc: '系统能覆盖更多场景、解决更多问题',
    fullTitle: '完备性 (Completeness)',
    fullDesc: '系统能覆盖的场景范围和解决问题的广度。完备性越高，能处理的情况越多。',
    detail: '完备性高的系统，能自动处理各种情况，不需要人工逐个场景开发。提升完备性需要投入建设——设计、训练、知识整理，让系统能力持续扩展。',
    costName: '开发成本',
    costDesc: '低完备性的系统需要人工逐场景开发，花费开发成本',
    examples: ['多场景自动处理', '知识库持续扩展', '新业务快速适配', '异常情况自动应对'],
  },
  {
    label: '便利性',
    icon: '⚡',
    color: 'var(--primary)',
    shortDesc: '用户使用简单、上手快、自动化程度高',
    fullTitle: '便利性 (Convenience)',
    fullDesc: '用户使用系统的便捷程度和自动化水平。便利性越高，用户需要做的越少。',
    detail: '便利性高的系统，用户一键即可完成任务，不需要手动配置和反复操作。提升便利性需要投入技术——更智能的交互、更好的自动化、持续的优化。',
    costName: '操作成本',
    costDesc: '低便利性的系统需要大量手动操作，花费操作成本',
    examples: ['自然语言交互', '一键完成任务', '自动记忆偏好', '无需手动配置'],
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

      <h2 className="tri-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">三个好特性</h2>
      <p className="tri-intro text-body text-[var(--text-secondary)] max-w-xl text-center mb-5 opacity-0">
        构建自动化系统，我们希望它同时具备三个特性。每个特性越高，系统越好。
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
                  <p className="text-caption text-[var(--text-secondary)] leading-relaxed">{gear.fullDesc}</p>
                  <p className="text-caption text-[var(--text-light)] leading-relaxed mt-1">{gear.detail}</p>
                  <div className="mt-2 rounded px-2 py-1" style={{ backgroundColor: `${gear.color}10` }}>
                    <span className="text-caption font-semibold" style={{ color: gear.color }}>{gear.costDesc}</span>
                  </div>
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
        <span className="flex items-center gap-1"><MousePointerClick size={12} /> 点击卡片展开详细定义</span>
        <span>|</span>
        <span className="cursor-pointer hover:text-[var(--text-secondary)]" onClick={handlePhaseClick}>
          点击查看三角关系 →
        </span>
      </div>

      {/* Phase 1: Triangle showing the three properties */}
      {phase === 1 && (
        <div className="tri-triangle-section flex flex-col items-center opacity-0">
          <svg width="360" height="240" viewBox="0 0 360 240" className="mb-3">
            {/* Edges with animation */}
            <line className="tri-edge-anim" x1="180" y1="25" x2="40" y2="200"
              stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="300" />
            <line className="tri-edge-anim" x1="40" y1="200" x2="320" y2="200"
              stroke="var(--success)" strokeWidth="2.5" strokeDasharray="300" />
            <line className="tri-edge-anim" x1="320" y1="200" x2="180" y2="25"
              stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="300" />

            {/* Edge labels - what you invest */}
            <text x="95" y="108" textAnchor="middle" fill="var(--accent)" fontSize="10" transform="rotate(-50, 95, 108)">开发投入 ↕</text>
            <text x="180" y="218" textAnchor="middle" fill="var(--success)" fontSize="10">验证投入 ↕</text>
            <text x="265" y="108" textAnchor="middle" fill="var(--primary)" fontSize="10" transform="rotate(50, 265, 108)">技术投入 ↕</text>

            {/* Completeness Vertex (bottom-left) */}
            <g className="tri-vertex">
              <circle cx="40" cy="200" r="26" fill="var(--accent)12" stroke="var(--accent)" strokeWidth="2" />
              <text x="40" y="194" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="bold">完备性</text>
              <text x="40" y="210" textAnchor="middle" fill="var(--accent)" fontSize="8">Completeness</text>
            </g>

            {/* Certainty Vertex (top) */}
            <g className="tri-vertex">
              <circle cx="180" cy="25" r="26" fill="var(--success)12" stroke="var(--success)" strokeWidth="2" />
              <text x="180" y="19" textAnchor="middle" fill="var(--success)" fontSize="13" fontWeight="bold">确定性</text>
              <text x="180" y="35" textAnchor="middle" fill="var(--success)" fontSize="8">Certainty</text>
            </g>

            {/* Convenience Vertex (bottom-right) */}
            <g className="tri-vertex">
              <circle cx="320" cy="200" r="26" fill="var(--primary)12" stroke="var(--primary)" strokeWidth="2" />
              <text x="320" y="194" textAnchor="middle" fill="var(--primary)" fontSize="13" fontWeight="bold">便利性</text>
              <text x="320" y="210" textAnchor="middle" fill="var(--primary)" fontSize="8">Convenience</text>
            </g>

            {/* Center */}
            <text x="180" y="145" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" opacity="0.8">三个都想做好</text>
            <text x="180" y="163" textAnchor="middle" fill="var(--text-light)" fontSize="10">需要持续投入</text>
          </svg>

          <div className="tri-conclusion text-center max-w-lg">
            <p className="text-h3 font-bold text-[var(--text-primary)]">
              所有技术方案，都在追求这三个特性
            </p>
            <p className="text-body text-[var(--text-secondary)] mt-1">
              确定性、完备性、便利性——做得越好，系统越强
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-caption">
              <span style={{ color: 'var(--success)' }}>低确定性 → 确认成本</span>
              <span style={{ color: 'var(--accent)' }}>低完备性 → 开发成本</span>
              <span style={{ color: 'var(--primary)' }}>低便利性 → 操作成本</span>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-5 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击卡片查看定义 | 点击文字查看三角' : '点击返回'}
      </div>
    </section>
  );
};

export default memo(Slide02_Chaos);
