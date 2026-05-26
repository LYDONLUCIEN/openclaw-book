import React, { useRef, memo, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Shield, ClipboardList, BarChart3, Sparkles } from 'lucide-react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const BUDGET = 190;

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
    stats: { certainty: 90, completeness: 20, convenience: 80 },
    special: '流程标准化，灵活性受限',
    costLabel: '开发成本↑',
    pro: '流程可控，工具善用，输出确定',
    con: '灵活性有限，使用者也是开发者',
  },
  {
    name: '传统机器学习',
    icon: BarChart3,
    color: '#10B981',
    stats: { certainty: 65, completeness: 35, convenience: 90 },
    special: '经验可封装，数据标注成本高',
    costLabel: '数据成本↑',
    pro: '可处理非结构化数据，方法论通用',
    con: '标注成本高，场景迁移难',
  },
  {
    name: '大模型',
    icon: Sparkles,
    color: '#8B5CF6',
    stats: { certainty: 20, completeness: 90, convenience: 80 },
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
  const [animPhase, setAnimPhase] = useState(0);
  const [goldCoins, setGoldCoins] = useState([BUDGET, BUDGET, BUDGET, BUDGET]);
  const [statValues, setStatValues] = useState(
    CHARACTERS.map(() => ({ certainty: 0, completeness: 0, convenience: 0 }))
  );

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.g3-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
      gsap.fromTo('.g3-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.15 });
      gsap.fromTo('.g3-col', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.3)', delay: 0.3 });
      gsap.fromTo('.g3-gold', { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)', delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useEffect(() => {
    if (!isActive) {
      setAnimPhase(0);
      setGoldCoins([BUDGET, BUDGET, BUDGET, BUDGET]);
      setStatValues(CHARACTERS.map(() => ({ certainty: 0, completeness: 0, convenience: 0 })));
      return;
    }
    const timer = setTimeout(() => setAnimPhase(1), 1600);
    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || animPhase !== 1) return;
    const duration = 2200;
    const startTime = Date.now();

    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const e = 1 - Math.pow(1 - progress, 3);

      setGoldCoins(CHARACTERS.map(() => Math.round(BUDGET * (1 - e))));
      setStatValues(CHARACTERS.map(c => ({
        certainty: Math.round(c.stats.certainty * e),
        completeness: Math.round(c.stats.completeness * e),
        convenience: Math.round(c.stats.convenience * e),
      })));

      if (progress < 1) requestAnimationFrame(tick);
      else setTimeout(() => setAnimPhase(2), 400);
    };
    requestAnimationFrame(tick);
  }, [isActive, animPhase]);

  useGSAP(() => {
    if (!isActive || animPhase !== 2 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      CHARACTERS.forEach((_, i) => {
        gsap.fromTo(`.g3-detail-${i}`, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: i * 0.08 });
      });
      gsap.fromTo('.g3-footer', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, animPhase] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-4 md:px-8 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="g3-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-1 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        四类角色：属性分配
      </h2>
      <p className="g3-subtitle text-body text-[var(--text-secondary)] mb-4 opacity-0">
        同样的预算，不同的加点策略
      </p>

      {/* 4 columns, full width, equal height */}
      <div className="w-full flex-1 max-w-7xl">
        <div className="grid grid-cols-4 gap-3 md:gap-5 h-full">
          {CHARACTERS.map((char, i) => {
            const Icon = char.icon;
            const remaining = goldCoins[i];

            return (
              <div key={i} className="g3-col flex flex-col opacity-0">

                {/* Card — flex-1 to fill equal height */}
                <div className="flex-1 rounded-xl border-2 p-3 md:p-5 flex flex-col"
                  style={{ borderColor: char.color, backgroundColor: `${char.color}06` }}>

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${char.color}15`, color: char.color }}>
                      <Icon size={20} />
                    </div>
                    <span className="text-body font-bold text-[var(--text-primary)] leading-tight">{char.name}</span>
                  </div>

                  {/* Stat bars */}
                  <div className="mb-2">
                    {statDefs.map((s, j) => {
                      const key = ['certainty', 'completeness', 'convenience'][j] as keyof typeof char.stats;
                      const current = statValues[i][key];
                      return (
                        <div key={s.label} className="mb-2">
                          <div className="flex justify-between text-caption md:text-body-sm mb-0.5">
                            <span className="font-bold" style={{ color: s.color }}>{s.label}</span>
                            <span className="font-mono font-bold" style={{ color: s.color }}>{current}</span>
                          </div>
                          <div className="h-2.5 md:h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${s.color}20` }}>
                            <div className="h-full rounded-full" style={{ width: `${current}%`, backgroundColor: s.color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detail — phase 2 */}
                  <div className={`g3-detail-${i} mt-auto`} style={{ opacity: animPhase >= 2 ? undefined : 0 }}>
                    <div className="rounded-lg px-3 py-2 mb-2" style={{ backgroundColor: `${char.color}10` }}>
                      <p className="text-caption md:text-body-sm font-semibold leading-snug" style={{ color: char.color }}>{char.special}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-caption font-bold inline-block mb-2"
                      style={{ backgroundColor: `${char.color}15`, color: char.color }}>
                      {char.costLabel}
                    </span>
                    <div className="space-y-1">
                      <div className="flex gap-1.5 text-caption">
                        <span className="text-[var(--success)] shrink-0">+</span>
                        <span className="text-[var(--text-secondary)]">{char.pro}</span>
                      </div>
                      <div className="flex gap-1.5 text-caption">
                        <span className="text-[var(--text-light)] shrink-0">-</span>
                        <span className="text-[var(--text-secondary)]">{char.con}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gold — outside card, below it */}
                <div className="g3-gold mt-2 rounded-xl px-3 py-2 text-center opacity-0"
                  style={{
                    backgroundColor: remaining > 0 ? '#EAB30812' : '#10B98112',
                    border: `2px solid ${remaining > 0 ? '#EAB30840' : '#10B98140'}`,
                  }}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-body md:text-h3">🪙</span>
                    <span className="text-body-md md:text-h2 font-bold font-mono" style={{
                      color: remaining > 0 ? '#EAB308' : '#10B981',
                    }}>
                      {remaining}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-caption font-medium" style={{
                    color: remaining > BUDGET * 0.9 ? 'var(--text-light)' : remaining > 0 ? '#EAB308' : '#10B981',
                  }}>
                    {remaining === BUDGET ? '待分配' : remaining > 0 ? '分配中...' : '刚好用完'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="g3-footer mt-4 text-center" style={{ opacity: animPhase >= 2 ? undefined : 0 }}>
        <div className="flex items-center justify-center gap-4 md:gap-6 text-body-sm flex-wrap">
          <span className="font-bold" style={{ color: 'var(--success)' }}>确定性 — 输出可靠可预测</span>
          <span className="font-bold" style={{ color: 'var(--accent)' }}>完备性 — 场景覆盖广</span>
          <span className="font-bold" style={{ color: 'var(--primary)' }}>便利性 — 操作便捷高效</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide03_Ecosystem);
