import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const PROPERTIES = [
  {
    label: '便利性',
    en: 'Convenience',
    icon: '⚡',
    color: 'var(--primary)',
    shortDesc: '操作便捷高效',
    costLabel: '操作成本',
    costDetail: '输入环节 — 人力调度与执行消耗',
    detail: '用户使用系统的便捷程度与自动化水平。便利性越低，人需要越多手动操作与反复配置。',
  },
  {
    label: '完备性',
    en: 'Completeness',
    icon: '🧩',
    color: 'var(--accent)',
    shortDesc: '处理事务边界',
    costLabel: '开发成本',
    costDetail: '处理环节 — 系统开发与能力建设消耗',
    detail: '系统能覆盖的场景范围与解决问题的广度。完备性越低，人需要逐个场景开发与设计流程。',
  },
  {
    label: '确定性',
    en: 'Certainty',
    icon: '🎯',
    color: 'var(--success)',
    shortDesc: '输出可靠可预测',
    costLabel: '确认成本',
    costDetail: '输出环节 — 结果校验与纠错兜底消耗',
    detail: '系统输出结果的可靠性与可预测程度。确定性越低，人需要越多反复检查、纠错与兜底。',
  },
];

const EDGE_LABELS = [
  { from: 0, to: 1, text: '开发投入', color: 'var(--accent)' },
  { from: 1, to: 2, text: '验证投入', color: 'var(--success)' },
  { from: 2, to: 0, text: '操作投入', color: 'var(--primary)' },
];

const Slide02_Chaos: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo('.tri-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
      tl.fromTo('.tri-intro', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.2 }, 0.3);

      // Cards stagger in
      tl.fromTo('.tri-card', { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)' }, 0.5);

      // Arrows between cards
      tl.fromTo('.tri-arrow', { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.3, stagger: 0.1 }, 0.9);

      // Triangle section
      tl.fromTo('.tri-triangle-section', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, 1.1);

      // Triangle edges draw in
      tl.fromTo('.tri-edge-anim', { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, 1.3);

      // Triangle vertices pop in
      tl.fromTo('.tri-vertex', { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' }, 1.6);

      // Conclusion
      tl.fromTo('.tri-conclusion', { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 }, 1.9);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="tri-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        系统三特性的不可能三角
      </h2>
      <p className="tri-intro text-body text-[var(--text-secondary)] max-w-2xl text-center mb-6 opacity-0">
        输入 → 处理 → 输出：每项特性对应一类环节成本，三者不可兼得
      </p>

      {/* Three property cards in a row */}
      <div className="flex items-stretch justify-center gap-4 md:gap-6 mb-6">
        {PROPERTIES.map((prop, i) => (
          <React.Fragment key={i}>
            <div className="tri-card flex flex-col items-center px-5 py-4 md:px-6 md:py-5 rounded-xl border-2 opacity-0"
              style={{
                borderColor: prop.color,
                backgroundColor: `${prop.color}08`,
                minWidth: '180px',
                maxWidth: '240px',
              }}>
              <span className="text-3xl md:text-4xl mb-2">{prop.icon}</span>
              <span className="text-h3 md:text-h2 font-bold" style={{ color: prop.color }}>{prop.label}</span>
              <span className="text-body-sm text-[var(--text-light)]">{prop.en}</span>
              <span className="text-body font-semibold text-[var(--text-primary)] mt-3">{prop.shortDesc}</span>
              <div className="mt-3 rounded-lg px-3 py-1.5 text-center w-full" style={{ backgroundColor: `${prop.color}10` }}>
                <span className="text-body-sm font-bold block" style={{ color: prop.color }}>{prop.costLabel}</span>
                <span className="text-caption text-[var(--text-secondary)] leading-tight">{prop.costDetail}</span>
              </div>
              <p className="text-body-sm text-[var(--text-light)] mt-3 leading-relaxed text-center">{prop.detail}</p>
            </div>
            {i < 2 && (
              <span className="tri-arrow text-2xl text-[var(--text-light)] self-center opacity-0">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Triangle SVG */}
      <div className="tri-triangle-section flex flex-col items-center opacity-0">
        <svg width="340" height="200" viewBox="0 0 340 200" className="mb-2">
          {/* Edges */}
          {/* 便利性(0) → 完备性(1): top-left to bottom */}
          <line className="tri-edge-anim" x1="170" y1="22" x2="40" y2="170"
            stroke={EDGE_LABELS[0].color} strokeWidth="2.5" strokeDasharray="300" />
          {/* 完备性(1) → 确定性(2): bottom to top-right */}
          <line className="tri-edge-anim" x1="40" y1="170" x2="300" y2="170"
            stroke={EDGE_LABELS[1].color} strokeWidth="2.5" strokeDasharray="300" />
          {/* 确定性(2) → 便利性(0): top-right to top-left */}
          <line className="tri-edge-anim" x1="300" y1="170" x2="170" y2="22"
            stroke={EDGE_LABELS[2].color} strokeWidth="2.5" strokeDasharray="300" />

          {/* Edge labels */}
          <text x="90" y="88" textAnchor="middle" fill={EDGE_LABELS[0].color} fontSize="11" fontWeight="600" transform="rotate(-55, 90, 88)">开发投入</text>
          <text x="170" y="192" textAnchor="middle" fill={EDGE_LABELS[1].color} fontSize="11" fontWeight="600">验证投入</text>
          <text x="252" y="88" textAnchor="middle" fill={EDGE_LABELS[2].color} fontSize="11" fontWeight="600" transform="rotate(55, 252, 88)">操作投入</text>

          {/* 便利性 Vertex (top) */}
          <g className="tri-vertex">
            <circle cx="170" cy="22" r="24" fill={`${PROPERTIES[0].color}15`} stroke={PROPERTIES[0].color} strokeWidth="2" />
            <text x="170" y="18" textAnchor="middle" fill={PROPERTIES[0].color} fontSize="12" fontWeight="bold">便利性</text>
            <text x="170" y="32" textAnchor="middle" fill={PROPERTIES[0].color} fontSize="7">Convenience</text>
          </g>

          {/* 完备性 Vertex (bottom-left) */}
          <g className="tri-vertex">
            <circle cx="40" cy="170" r="24" fill={`${PROPERTIES[1].color}15`} stroke={PROPERTIES[1].color} strokeWidth="2" />
            <text x="40" y="166" textAnchor="middle" fill={PROPERTIES[1].color} fontSize="12" fontWeight="bold">完备性</text>
            <text x="40" y="180" textAnchor="middle" fill={PROPERTIES[1].color} fontSize="7">Completeness</text>
          </g>

          {/* 确定性 Vertex (bottom-right) */}
          <g className="tri-vertex">
            <circle cx="300" cy="170" r="24" fill={`${PROPERTIES[2].color}15`} stroke={PROPERTIES[2].color} strokeWidth="2" />
            <text x="300" y="166" textAnchor="middle" fill={PROPERTIES[2].color} fontSize="12" fontWeight="bold">确定性</text>
            <text x="300" y="180" textAnchor="middle" fill={PROPERTIES[2].color} fontSize="7">Certainty</text>
          </g>

          {/* Center text */}
          <text x="170" y="118" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" opacity="0.7">三项不可兼得</text>
          <text x="170" y="135" textAnchor="middle" fill="var(--text-light)" fontSize="9">成本不会消失，只会转移</text>
        </svg>
      </div>

      {/* Bottom conclusion */}
      <div className="tri-conclusion text-center opacity-0">
        <p className="text-body font-bold text-[var(--text-primary)]">
          三项特性不可兼得，成本不会消失只会转移
        </p>
        <div className="flex items-center justify-center gap-6 mt-3 text-body-sm">
          <span style={{ color: PROPERTIES[0].color }}>低便利性 → 操作成本</span>
          <span style={{ color: PROPERTIES[1].color }}>低完备性 → 开发成本</span>
          <span style={{ color: PROPERTIES[2].color }}>低确定性 → 确认成本</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide02_Chaos);
