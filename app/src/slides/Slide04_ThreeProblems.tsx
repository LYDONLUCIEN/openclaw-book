import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Crown } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide04_ThreeProblems: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.rv-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.rv-compare', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.rv-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || phase !== 1) return;
    const ctx = gsap.context(() => {
      gsap.to('.rv-compare', { opacity: 0.15, duration: 0.4 });
      gsap.fromTo('.rv-equip', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.rv-equip-title', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, delay: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  useGSAP(() => {
    if (!isActive || phase !== 2) return;
    const ctx = gsap.context(() => {
      gsap.to('.rv-equip', { opacity: 0.1, duration: 0.3 });
      gsap.fromTo('.rv-arch', { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.rv-arch-card', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  const handleClick = () => {
    if (phase < 2) setPhase(phase + 1);
    else setPhase(0);
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={handleClick}>

      <h2 className="rv-title text-h1 font-bold text-[var(--text-primary)] mb-3 opacity-0">
        OpenClaw — 全面升级的大模型
      </h2>

      {/* Phase 0: LLM vs OpenClaw Comparison */}
      <div className="rv-compare flex items-start justify-center gap-6 md:gap-10 max-w-3xl w-full mb-4">
        {/* LLM */}
        <div className="flex-1 rounded-xl border-2 p-5 text-center" style={{ borderColor: '#8B5CF6', backgroundColor: '#8B5CF608' }}>
          <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#8B5CF615' }}>
            <Sparkles size={28} style={{ color: '#8B5CF6' }} />
          </div>
          <span className="text-body font-bold" style={{ color: '#8B5CF6' }}>普通大模型</span>
          <span className="text-caption text-[var(--text-secondary)] block mt-0.5">法师·通才</span>
          <div className="mt-3 space-y-2">
            {[
              { label: '确定性', val: 20, color: 'var(--success)' },
              { label: '完备性', val: 90, color: 'var(--accent)' },
              { label: '便利性', val: 60, color: 'var(--primary)' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-caption mb-0.5">
                  <span style={{ color: s.color }}>{s.label}</span>
                  <span className="font-mono font-bold" style={{ color: s.color }}>{s.val}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${s.color}20` }}>
                  <div className="h-full rounded-full" style={{ width: `${s.val}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-caption text-[var(--text-light)] mt-2">覆盖广但不可靠</p>
        </div>

        {/* Arrow */}
        <div className="flex items-center pt-12">
          <div className="text-center">
            <Crown size={24} style={{ color: '#F59E0B' }} />
            <span className="text-caption font-bold block" style={{ color: '#F59E0B' }}>升级</span>
          </div>
        </div>

        {/* OpenClaw */}
        <div className="flex-1 rounded-xl border-2 p-5 text-center" style={{ borderColor: '#F59E0B', backgroundColor: '#F59E0B08', boxShadow: '0 0 20px #F59E0B15' }}>
          <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#F59E0B20' }}>
            <Crown size={28} style={{ color: '#F59E0B' }} />
          </div>
          <span className="text-body font-bold" style={{ color: '#F59E0B' }}>OpenClaw</span>
          <span className="text-caption text-[var(--text-secondary)] block mt-0.5">升级角色</span>
          <div className="mt-3 space-y-2">
            {[
              { label: '确定性', val: 85, color: 'var(--success)' },
              { label: '完备性', val: 50, color: 'var(--accent)' },
              { label: '便利性', val: 92, color: 'var(--primary)' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-caption mb-0.5">
                  <span style={{ color: s.color }}>{s.label}</span>
                  <span className="font-mono font-bold" style={{ color: s.color }}>{s.val}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${s.color}20` }}>
                  <div className="h-full rounded-full" style={{ width: `${s.val}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <span className="text-caption px-2 py-0.5 rounded-full font-bold text-white inline-block mt-2" style={{ backgroundColor: '#F59E0B' }}>三个特性全面升级</span>
        </div>
      </div>

      <p className="rv-hint text-body text-[var(--text-secondary)] opacity-0">
        三个特性都显著更好——怎么做到的？因为穿上了 <span className="font-bold">8件装备</span>。点击看看 →
      </p>

      {/* Phase 1: Equipment mapping */}
      {phase >= 1 && (
        <div className="max-w-3xl w-full mt-2">
          <p className="rv-equip-title text-body font-bold text-[var(--text-primary)] mb-2 opacity-0">
            每件装备都在提升某个特性：
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { name: 'Prompt', equip: '知识输入', color: '#10B981', tier: '绿装' },
              { name: 'Function-call', equip: '系统工具调用', color: '#10B981', tier: '绿装' },
              { name: 'RAG / 知识图谱', equip: '按需查知识', color: '#3B82F6', tier: '蓝装' },
              { name: 'Workflow', equip: '流程标准化', color: '#3B82F6', tier: '蓝装' },
              { name: 'ReAct', equip: '自主规划执行', color: '#8B5CF6', tier: '紫装' },
              { name: 'MCP', equip: '模型上下文协议', color: '#8B5CF6', tier: '紫装' },
              { name: 'Skills', equip: '技能渐进加载', color: '#F97316', tier: '橙装' },
              { name: 'Harness Eng.', equip: '经验自动沉淀', color: '#F97316', tier: '橙装' },
            ].map((eq, i) => (
              <div key={i} className="rv-equip rounded-lg border p-2.5 text-center opacity-0"
                style={{ borderColor: eq.color, backgroundColor: `${eq.color}06` }}>
                <span className="text-caption font-bold block" style={{ color: eq.color }}>{eq.name}</span>
                <span className="text-caption text-[var(--text-light)] block">{eq.equip}</span>
                <span className="text-caption px-1 rounded" style={{ backgroundColor: `${eq.color}15`, color: eq.color }}>{eq.tier}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase 2: Summary */}
      {phase >= 2 && (
        <div className="rv-arch max-w-xl w-full mt-4 text-center opacity-0">
          <p className="text-body text-[var(--text-secondary)]">
            从绿装到橙装，每升一级都在提升系统的三个特性。<br />
            接下来我们逐步拆解这个升级过程 →
          </p>
        </div>
      )}

      <div className="absolute bottom-5 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击查看装备' : phase === 1 ? '点击查看总结' : '点击重置'}
      </div>
    </section>
  );
};

export default memo(Slide04_ThreeProblems);
