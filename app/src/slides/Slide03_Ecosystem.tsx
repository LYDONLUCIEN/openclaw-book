import React, { useRef, memo, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Shield, ClipboardList, BarChart3, Sparkles, Bot, ChevronRight, Wrench, Package } from 'lucide-react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const BUDGET = 200;
const LLM_IDX = 3;

const CHARACTERS = [
  {
    name: '传统IT应用', icon: Shield, color: '#3B82F6',
    stats: { certainty: 100, completeness: 10, convenience: 90 },
    special: '高确定，低完备，开发成本显著', costLabel: '开发成本↑↑',
    pro: '逻辑完全可控，输出零偏差', con: '覆盖场景窄，灵活度最低',
  },
  {
    name: '低零代码应用', icon: ClipboardList, color: '#F97316',
    stats: { certainty: 95, completeness: 20, convenience: 85 },
    special: '流程标准化，灵活性受限', costLabel: '开发成本↑',
    pro: '流程可控，工具善用，输出确定', con: '灵活性有限，使用者也是开发者',
  },
  {
    name: '机器学习驱动应用', icon: BarChart3, color: '#10B981',
    stats: { certainty: 75, completeness: 45, convenience: 80 },
    special: '经验可封装，数据标注成本高', costLabel: '数据成本↑',
    pro: '可处理非结构化数据，方法论通用', con: '标注成本高，场景迁移难',
  },
  {
    name: '大模型应用', icon: Sparkles, color: '#8B5CF6',
    stats: { certainty: 40, completeness: 95, convenience: 65 },
    special: '覆盖面广，输出不确定性显著', costLabel: '确认成本↑↑',
    pro: '零门槛启动，覆盖场景最广', con: '输出不确定性高，需反复纠错',
  },
];

const OPENCLAW = {
  name: 'OpenClaw', icon: Bot, color: '#EF4444',
  stats: { certainty: 80, completeness: 100, convenience: 90 },
  special: '工程弥补短板，突破预算上限', costLabel: '工程预算 ↑↑',
  pro: '汇聚众人力量，沉淀知识经验',
  con: '更主动，更智能，更便捷',
};

const statDefs = [
  { label: '确定性', color: 'var(--success)' },
  { label: '完备性', color: 'var(--accent)' },
  { label: '便利性', color: 'var(--primary)' },
];

const OC_BUDGET = 270;

const StatBar = ({ index, s, j }: {
  index: string; s: typeof statDefs[number]; j: number;
}) => {
  const key = j === 0 ? 'cert' : j === 1 ? 'comp' : 'conv';
  const barClass = `g3-bar-${key}-${index}`;
  const numClass = `g3-num-${key}-${index}`;
  return (
    <div className="mb-2">
      <div className="flex justify-between text-caption md:text-body-sm mb-0.5">
        <span className="font-bold" style={{ color: s.color }}>{s.label}</span>
        <span className={`font-mono font-bold ${numClass}`} style={{ color: s.color }}>0</span>
      </div>
      <div className="h-2.5 md:h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${s.color}20` }}>
        <div className={`h-full rounded-full shrink-0 ${barClass}`} style={{ width: '0%', backgroundColor: s.color, transition: 'none' }} />
      </div>
    </div>
  );
};

const GoldCoin = ({ index, budget, initialLabel }: { index: string; budget: number; initialLabel?: string }) => (
  <div className={`g3-gold-${index} mt-2 rounded-xl px-3 py-2 text-center`} style={{ opacity: 0 }}>
    <div className="flex items-center justify-center gap-2">
      <span className="text-body md:text-h3">🪙</span>
      <span className={`g3-coin-${index} text-body-md md:text-h2 font-bold font-mono`} style={{ color: '#EAB308' }}>{budget}</span>
    </div>
    <span className={`g3-coin-label-${index} text-[10px] md:text-caption font-medium`} style={{ color: 'var(--text-light)' }}>
      {initialLabel ?? '点击上方卡片分配'}
    </span>
  </div>
);

const DetailBlock = ({ index, char }: { index: string; char: typeof CHARACTERS[number] | typeof OPENCLAW }) => (
  <div className={`g3-detail-${index} mt-auto`} style={{ opacity: 0 }}>
    <div className="rounded-lg px-3 py-2 mb-2" style={{ backgroundColor: `${char.color}10` }}>
      <p className="text-caption md:text-body-sm font-semibold leading-snug" style={{ color: char.color }}>{char.special}</p>
    </div>
    <span className="px-2.5 py-0.5 rounded text-caption font-bold inline-block mb-2"
      style={{ backgroundColor: `${char.color}15`, color: char.color }}>{char.costLabel}</span>
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
);

const Slide03_Ecosystem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const triggeredRef = useRef<Set<string>>(new Set());
  const tlRef = useRef<Record<string, gsap.core.Timeline | null>>({});
  const transTlRef = useRef<gsap.core.Timeline | null>(null);

  const buildClickHandler = useCallback((id: string, stats: { certainty: number; completeness: number; convenience: number }, isOC: boolean) => {
    return () => {
      if (!isActive || triggeredRef.current.has(id)) return;
      triggeredRef.current.add(id);
      if (tlRef.current[id]) tlRef.current[id]!.kill();

      const budget = isOC ? OC_BUDGET : BUDGET;
      const totalStat = stats.certainty + stats.completeness + stats.convenience;
      const tCert = 0.7, tComp = 0.5, tConv = 0.5, tPause = 0.2;

      const allIds = [...CHARACTERS.map((_, i) => String(i)), 'oc'];
      const tl = gsap.timeline({
        onComplete: () => {
          if (triggeredRef.current.size === allIds.length && containerRef.current) {
            gsap.to('.g3-footer', { opacity: 1, duration: 0.4 });
          }
        },
      });
      tlRef.current[id] = tl;

      const certNum = { v: 0 }, compNum = { v: 0 }, convNum = { v: 0 }, budgetObj = { v: budget };
      const p = id;

      // Certainty
      tl.to(`.g3-bar-cert-${p}`, { width: `${stats.certainty}%`, duration: tCert, ease: 'power2.out' }, 0);
      tl.to(certNum, { v: stats.certainty, duration: tCert, ease: 'power2.out',
        onUpdate() { gsap.set(`.g3-num-cert-${p}`, { innerText: String(Math.round(certNum.v)) }); },
      }, 0);
      const certBudgetEnd = budget - Math.round(budget * (stats.certainty / totalStat));
      tl.to(budgetObj, { v: certBudgetEnd, duration: tCert, ease: 'power2.out',
        onUpdate() { gsap.set(`.g3-coin-${p}`, { innerText: String(Math.round(budgetObj.v)) }); },
      }, 0);

      // Completeness
      tl.to(`.g3-bar-comp-${p}`, { width: `${stats.completeness}%`, duration: tComp, ease: 'power2.out' }, tCert + tPause);
      tl.to(compNum, { v: stats.completeness, duration: tComp, ease: 'power2.out',
        onUpdate() { gsap.set(`.g3-num-comp-${p}`, { innerText: String(Math.round(compNum.v)) }); },
      }, tCert + tPause);
      const compBudgetEnd = budget - Math.round(budget * ((stats.certainty + stats.completeness) / totalStat));
      tl.to(budgetObj, { v: compBudgetEnd, duration: tComp, ease: 'power2.out',
        onUpdate() { gsap.set(`.g3-coin-${p}`, { innerText: String(Math.round(budgetObj.v)) }); },
      }, tCert + tPause);

      // Convenience
      const convStart = tCert + tPause + tComp + tPause;
      tl.to(`.g3-bar-conv-${p}`, { width: `${stats.convenience}%`, duration: tConv, ease: 'power2.out' }, convStart);
      tl.to(convNum, { v: stats.convenience, duration: tConv, ease: 'power2.out',
        onUpdate() { gsap.set(`.g3-num-conv-${p}`, { innerText: String(Math.round(convNum.v)) }); },
      }, convStart);

      // Budget drains to 0
      tl.to(budgetObj, { v: 0, duration: tConv, ease: 'power2.out',
        onUpdate() { gsap.set(`.g3-coin-${p}`, { innerText: String(Math.round(budgetObj.v)) }); },
      }, convStart);

      // Done: coin green, label → 智能预算, detail + header appear
      const doneT = convStart + tConv;
      tl.set(`.g3-coin-${p}`, { color: '#10B981' }, doneT);
      tl.to(`.g3-coin-label-${p}`, { opacity: 0, duration: 0.2 }, doneT);
      tl.set(`.g3-coin-label-${p}`, { innerText: '智能预算', color: '#10B981', opacity: 1 }, doneT + 0.2);
      tl.to(`.g3-detail-${p}`, { opacity: 1, duration: 0.4, ease: 'power2.out' }, doneT + 0.3);
      tl.to(`.g3-header-${p}`, { opacity: 1, duration: 0.3, ease: 'power2.out' }, doneT + 0.3);
    };
  }, [isActive]);

  // Reset on slide leave
  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      triggeredRef.current.clear();
      Object.values(tlRef.current).forEach(tl => { if (tl) tl.kill(); });
      tlRef.current = {};
      if (transTlRef.current) { transTlRef.current.kill(); transTlRef.current = null; }
      if (containerRef.current) {
        const ctx = gsap.context(() => {
          [...CHARACTERS.map((_, i) => String(i)), 'oc'].forEach(id => {
            const b = id === 'oc' ? OC_BUDGET : BUDGET;
            ['cert', 'comp', 'conv'].forEach(k => {
              gsap.set(`.g3-bar-${k}-${id}`, { width: '0%' });
              gsap.set(`.g3-num-${k}-${id}`, { innerText: '0' });
            });
            gsap.set(`.g3-coin-${id}`, { innerText: String(b), color: '#EAB308' });
            gsap.set(`.g3-coin-label-${id}`, {
              innerText: id === 'oc' ? '智能预算' : '点击上方卡片分配',
              opacity: 1, color: id === 'oc' ? '#10B981' : 'var(--text-light)',
            });
            gsap.set(`.g3-detail-${id}`, { opacity: 0 });
            gsap.set(`.g3-header-${id}`, { opacity: 0 });
          });
          gsap.set('.g3-fade-out', { opacity: 1, clearProps: 'all' });
          gsap.set('.g3-llm-col', { clearProps: 'all' });
          gsap.set('.g3-grid', { clearProps: 'all' });
          gsap.set('.g3-phase1-only', { opacity: 0, clearProps: 'all' });
          gsap.set('.g3-oc-trigger', { opacity: 1, scale: 1, clearProps: 'all' });
          gsap.set('.g3-footer', { opacity: 0 });
        }, containerRef);
        ctx.revert();
      }
    }
  }, [isActive]);

  // Entrance animation
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.g3-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
      gsap.fromTo('.g3-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.15 });
      gsap.fromTo('.g3-col', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.3)', delay: 0.3 });
      gsap.fromTo('[class*="g3-gold-"]', { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)', delay: 0.6 });
      gsap.fromTo('.g3-oc-trigger', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.0, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  // Transition to phase 1 — only GSAP, no re-render
  const goToPhase1 = useCallback(() => {
    if (!isActive || phase !== 0 || !containerRef.current) return;
    setPhase(1);

    if (transTlRef.current) transTlRef.current.kill();
    const tl = gsap.timeline();
    transTlRef.current = tl;

    const llmCol = containerRef.current.querySelector('.g3-llm-col') as HTMLElement;
    const grid = containerRef.current.querySelector('.g3-grid') as HTMLElement;

    // 1. Fade out cards 0, 1, 2
    tl.to('.g3-fade-out', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0);

    // 2. Fade out OC trigger
    tl.to('.g3-oc-trigger', { opacity: 0, duration: 0.3 }, 0);

    // 3. Animate LLM card to left using absolute positioning
    // Capture current position in the grid
    if (llmCol && grid) {
      const gridRect = grid.getBoundingClientRect();
      const llmRect = llmCol.getBoundingClientRect();
      const relativeLeft = llmRect.left - gridRect.left;
      const relativeTop = llmRect.top - gridRect.top;
      const currentWidth = llmRect.width;
      const currentHeight = llmRect.height;

      // Set grid to position:relative so absolute works
      gsap.set(grid, { position: 'relative' });

      // Switch LLM col to absolute so it's no longer affected by grid layout
      tl.set(llmCol, {
        position: 'absolute',
        left: relativeLeft,
        top: relativeTop,
        width: currentWidth,
        height: currentHeight,
      }, 0.15);

      // Animate to left side (target: ~25% of grid width, same vertical position)
      const targetLeft = (gridRect.width * 0.25 - currentWidth) / 2;
      tl.to(llmCol, {
        left: Math.max(0, targetLeft),
        duration: 0.6,
        ease: 'power3.inOut',
      }, 0.15);

      // Set OC container to match LLM card height so they align perfectly
      const ocContainer = containerRef.current.querySelector('.g3-oc-container') as HTMLElement;
      if (ocContainer) {
        gsap.set(ocContainer, { height: currentHeight });
      }
    }

    // 4. Show phase-1-only elements (center arrows + OC card)
    tl.fromTo('.g3-phase1-only', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 0.4);

    // 5. Animate OC gold coin in
    tl.fromTo('.g3-gold-oc', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 0.7);
  }, [isActive, phase]);

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-4 md:px-8 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="g3-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-1 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        四类角色：属性分配
      </h2>
      <p className="g3-subtitle text-body text-[var(--text-secondary)] mb-4 opacity-0">
        同样的智能预算，不同的加点策略
      </p>

      {/* ═══ Shared content area — always rendered, GSAP moves things ═══ */}
      <div className="w-full flex-1 max-w-6xl mx-auto relative">

        {/* ── 4-col grid — always rendered ── */}
        <div className="g3-grid grid grid-cols-4 gap-3 md:gap-5 h-full">
          {CHARACTERS.map((char, i) => {
            const Icon = char.icon;
            const isLLM = i === LLM_IDX;
            return (
              <div key={i} className={`g3-col flex flex-col opacity-0 ${isLLM ? 'g3-llm-col' : 'g3-fade-out'}`}>
                <div className="flex-1 rounded-xl border-2 p-3 md:p-5 flex flex-col cursor-pointer transition-shadow duration-200 hover:shadow-lg"
                  style={{ borderColor: char.color, backgroundColor: `${char.color}06` }}
                  onClick={buildClickHandler(String(i), char.stats, false)}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${char.color}15`, color: char.color }}>
                      <Icon size={20} />
                    </div>
                    <span className={`g3-header-${i} text-body font-bold text-[var(--text-primary)] leading-tight`} style={{ opacity: 0 }}>{char.name}</span>
                  </div>
                  <div className="mb-2">
                    {statDefs.map(function(s, j) {
                      return <StatBar key={s.label} index={String(i)} s={s} j={j} />;
                    })}
                  </div>
                  <DetailBlock index={String(i)} char={char} />
                </div>
                <GoldCoin index={String(i)} budget={BUDGET} />
              </div>
            );
          })}
        </div>

        {/* ── Phase 1 only: center arrows + right OC card (overlaid) ── */}
        <div className={`absolute inset-0 flex gap-3 md:gap-5 pointer-events-none ${phase === 1 ? '' : 'invisible'}`}>
          {/* Spacer for LLM card width */}
          <div className="w-1/4 shrink-0" />

          {/* Center: Harness + Skills */}
          <div className="g3-phase1-only flex-1 flex flex-col items-center justify-center gap-2 pointer-events-none" style={{ opacity: 0 }}>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#3B82F610', border: '2px solid #3B82F630' }}>
                <Wrench size={18} style={{ color: '#3B82F6' }} />
              </div>
              <span className="text-[10px] md:text-caption font-bold mt-1" style={{ color: '#3B82F6' }}>工程加持</span>
              <span className="text-[8px] text-[var(--text-light)]">Harness</span>
            </div>
            <ChevronRight size={14} style={{ color: 'var(--text-light)' }} />
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#F9731610', border: '2px solid #F9731630' }}>
                <Package size={18} style={{ color: '#F97316' }} />
              </div>
              <span className="text-[10px] md:text-caption font-bold mt-1" style={{ color: '#F97316' }}>知识载入</span>
              <span className="text-[8px] text-[var(--text-light)]">Skills</span>
            </div>
          </div>

          {/* Right: OpenClaw card */}
          <div className="g3-phase1-only g3-oc-container w-1/4 flex flex-col shrink-0 pointer-events-auto" style={{ opacity: 0 }}>
            <div className="w-full flex-1 rounded-xl border-2 p-3 md:p-5 flex flex-col cursor-pointer transition-shadow duration-200 hover:shadow-lg"
              style={{ borderColor: OPENCLAW.color, backgroundColor: `${OPENCLAW.color}06` }}
              onClick={buildClickHandler('oc', OPENCLAW.stats, true)}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${OPENCLAW.color}15`, color: OPENCLAW.color }}>
                  <Bot size={20} />
                </div>
                <span className={`g3-header-oc text-body font-bold text-[var(--text-primary)] leading-tight`}
                  style={{ opacity: 0 }}>{OPENCLAW.name}</span>
              </div>
              <div className="mb-2">
                {statDefs.map(function(s, j) {
                  return <StatBar key={s.label} index="oc" s={s} j={j} />;
                })}
              </div>
              <DetailBlock index="oc" char={OPENCLAW} />
            </div>
            <GoldCoin index="oc" budget={OC_BUDGET} initialLabel="智能预算" />
          </div>
        </div>

      </div>

      {/* ═══ OC trigger button ═══ */}
      <div className={`g3-oc-trigger mt-4 ${phase === 0 ? '' : 'invisible'}`}>
        <button
          className="flex items-center gap-3 px-6 py-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
          style={{ borderColor: `${OPENCLAW.color}60`, backgroundColor: `${OPENCLAW.color}08` }}
          onClick={goToPhase1}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${OPENCLAW.color}15`, color: OPENCLAW.color }}>
            <Bot size={22} />
          </div>
          <div className="text-left">
            <span className="text-body font-bold block" style={{ color: OPENCLAW.color }}>{OPENCLAW.name}</span>
            <span className="text-caption text-[var(--text-light)]">点击查看工程加持对比 →</span>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="g3-footer mt-4 text-center" style={{ opacity: 0 }}>
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
