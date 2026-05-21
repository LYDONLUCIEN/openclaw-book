import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Shield, ClipboardList, BarChart3, Sparkles } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const CHARACTERS = [
  {
    name: '传统代码开发',
    icon: Shield,
    color: '#3B82F6',
    stats: { certainty: 95, completeness: 10, convenience: 85 },
    special: '确定性高，完备性低，开发成本显著',
    costLabel: '开发成本↑↑',
    pro: '逻辑完全可控，输出零偏差',
    con: '覆盖场景窄，灵活度最低',
  },
  {
    name: '工作流/低代码',
    icon: ClipboardList,
    color: '#F97316',
    stats: { certainty: 90, completeness: 20, convenience: 75 },
    special: '流程标准化，灵活性受限',
    costLabel: '开发成本↑',
    pro: '流程可控，工具善用，输出确定',
    con: '使用者也是开发者，灵活性有限',
  },
  {
    name: '传统机器学习',
    icon: BarChart3,
    color: '#10B981',
    stats: { certainty: 65, completeness: 35, convenience: 80 },
    special: '经验可封装，数据标注成本高',
    costLabel: '数据成本↑',
    pro: '可处理非结构化数据，方法论通用',
    con: '标注成本高，场景迁移难',
  },
  {
    name: '大模型',
    icon: Sparkles,
    color: '#8B5CF6',
    stats: { certainty: 20, completeness: 90, convenience: 60 },
    special: '覆盖面广，输出不确定性显著',
    costLabel: '确认成本↑↑',
    pro: '零门槛启动，覆盖场景最广',
    con: '输出不确定性高，需反复纠错',
  },
];

const statDefs = [
  { label: '确定性', color: 'var(--success)' },
  { label: '完备性', color: 'var(--accent)' },
  { label: '便利性', color: 'var(--primary)' },
];

const Slide03_Ecosystem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo('.g3-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
      tl.fromTo('.g3-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.2 }, 0.2);

      // Cards stagger in
      CHARACTERS.forEach((_, i) => {
        tl.fromTo(`.g3-card-${i}`, { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.3)' }, 0.4 + i * 0.1);
      });

      // Animate stat bars after cards appear
      CHARACTERS.forEach((char, i) => {
        const statValues = [char.stats.certainty, char.stats.completeness, char.stats.convenience];
        statValues.forEach((val, j) => {
          tl.to(`.g3-bar-fill-${i}-${j}`, { width: `${val}%`, duration: 0.5, ease: 'power3.out' }, 0.6 + i * 0.1 + j * 0.05);
        });
      });

      // Footer
      tl.fromTo('.g3-footer', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="g3-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0">
        四种技术路线特性对比
      </h2>
      <p className="g3-subtitle text-body text-[var(--text-secondary)] mb-6 opacity-0">
        不同技术路线在确定性、完备性、便利性上的侧重与代价差异
      </p>

      {/* Four character cards — all visible at once */}
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CHARACTERS.map((char, i) => {
            const Icon = char.icon;
            const statValues = [char.stats.certainty, char.stats.completeness, char.stats.convenience];
            return (
              <div key={i} className={`g3-card-${i} rounded-xl border-2 p-4 md:p-5`}
                style={{ borderColor: char.color, backgroundColor: `${char.color}06` }}>
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${char.color}15`, color: char.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-body font-bold text-[var(--text-primary)] block truncate">{char.name}</span>
                  </div>
                </div>

                {/* Stats with animated bars */}
                <div className="mb-3">
                  {statDefs.map((s, j) => (
                    <div key={s.label} className="mb-1.5">
                      <div className="flex justify-between text-caption">
                        <span className="font-bold" style={{ color: s.color }}>{s.label}</span>
                        <span className="font-mono font-bold" style={{ color: s.color }}>{statValues[j]}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${s.color}20` }}>
                        <div className={`g3-bar-fill-${i}-${j} h-full rounded-full`} style={{ width: '0%', backgroundColor: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tagline + cost */}
                <div className="rounded-lg px-3 py-2 mb-2" style={{ backgroundColor: `${char.color}10` }}>
                  <p className="text-body-sm font-semibold" style={{ color: char.color }}>{char.special}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-caption font-bold inline-block mb-2" style={{ backgroundColor: `${char.color}15`, color: char.color }}>
                  {char.costLabel}
                </span>

                {/* Pro / Con */}
                <div className="space-y-1">
                  <div className="flex gap-1 text-caption">
                    <span className="text-[var(--success)] shrink-0">+</span>
                    <span className="text-[var(--text-secondary)]">{char.pro}</span>
                  </div>
                  <div className="flex gap-1 text-caption">
                    <span className="text-[var(--text-light)] shrink-0">-</span>
                    <span className="text-[var(--text-secondary)]">{char.con}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer summary */}
      <div className="g3-footer mt-6 text-center opacity-0">
        <div className="flex items-center justify-center gap-6 mb-3 text-body-sm">
          <span className="font-bold" style={{ color: 'var(--success)' }}>确定性 — 输出可靠可预测</span>
          <span className="font-bold" style={{ color: 'var(--accent)' }}>完备性 — 场景覆盖广</span>
          <span className="font-bold" style={{ color: 'var(--primary)' }}>便利性 — 操作便捷高效</span>
        </div>
        <p className="text-body-sm text-[var(--text-light)]">
          四种路线各有侧重，核心差异在于成本分布：开发成本、数据成本、确认成本、操作成本的不同取舍
        </p>
      </div>
    </section>
  );
};

export default memo(Slide03_Ecosystem);
