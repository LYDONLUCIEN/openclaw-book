import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Crown, BookOpen, AlertTriangle, Zap, RotateCcw } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide12_Comparison: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hermes-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.hermes-desc', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.hermes-flow', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, delay: 0.5 });
      gsap.fromTo('.hermes-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const handleClick = () => {
    if (phase === 0) {
      const ctx = gsap.context(() => {
        gsap.to('.hermes-flow', { opacity: 0.15, duration: 0.4 });
        gsap.to('.hermes-hint', { opacity: 0, duration: 0.2 });
        gsap.fromTo('.reveal-section', { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.4 });
      }, containerRef);
      ctx.revert();
      setPhase(1);
    } else if (phase === 1) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.token-warning', { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
        gsap.fromTo('.quote-card', { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.6 });
      }, containerRef);
      ctx.revert();
      setPhase(2);
    } else {
      setPhase(0);
    }
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={handleClick}>

      <h2 className="hermes-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        Hermes Agent — AI 自己写 Skill
      </h2>
      <p className="hermes-desc text-body text-[var(--text-secondary)] mb-5 max-w-2xl text-center opacity-0">
        最后一件终极装备：让 AI 自动识别新模式，自动编写新 Skill。<br />
        系统可以自我演化——这正是 OpenClaw 的终极形态。
      </p>

      {/* Phase 0: Hermes flow */}
      <div className="max-w-3xl w-full">
        {[
          { icon: Sparkles, title: 'AI 执行任务', desc: 'Agent 在执行过程中遇到新模式或新流程', color: '#8B5CF6' },
          { icon: RotateCcw, title: 'Hermes 自动识别', desc: '自动判断：这是一个可复用的技能吗？', color: '#3B82F6' },
          { icon: BookOpen, title: '自动编写 Skill', desc: '生成 Prompt + SOP + Tool 配置', color: '#10B981' },
          { icon: Zap, title: '存入 Skill 库', desc: '下次直接调用，不再重复教学', color: '#F59E0B' },
        ].map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="hermes-flow flex items-start gap-3 mb-3 opacity-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                  <Icon size={18} />
                </div>
                {i < 3 && <div className="w-0.5 h-4 mt-1" style={{ backgroundColor: `${step.color}30` }} />}
              </div>
              <div className="flex-1 rounded-lg border p-3"
                style={{ borderColor: `${step.color}40`, backgroundColor: `${step.color}05` }}>
                <span className="text-body-sm font-bold" style={{ color: step.color }}>{step.title}</span>
                <p className="text-caption text-[var(--text-secondary)] mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="hermes-hint text-body text-[var(--text-light)] mt-4 opacity-0">
        Hermes 让开发成本进一步降低——AI 帮你写代码。点击查看 OpenClaw 完全体 →
      </p>

      {/* Phase 1: Final Stats Reveal */}
      {phase >= 1 && (
        <div className="reveal-section max-w-2xl w-full mt-2 opacity-0">
          <div className="rounded-xl border-2 p-5 text-center"
            style={{ borderColor: '#F59E0B', backgroundColor: '#F59E0B08', boxShadow: '0 0 30px #F59E0B20' }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown size={24} style={{ color: '#F59E0B' }} />
              <span className="text-h2 font-bold" style={{ color: '#F59E0B' }}>OpenClaw 完全体</span>
              <span className="text-caption px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: '#F59E0B' }}>
                氪金角色
              </span>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 mb-3">
              {[
                { label: 'C 复杂度', value: 50, color: 'var(--accent)', cost: '开发成本' },
                { label: 'P 参与度', value: 8, color: 'var(--primary)', cost: '操作成本' },
                { label: 'U 不确定度', value: 15, color: 'var(--success)', cost: '确认成本' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="h-20 w-20 rounded-full mx-auto mb-1 flex items-center justify-center border-3"
                    style={{ borderColor: s.color, backgroundColor: `${s.color}10` }}>
                    <span className="text-h1 font-extrabold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                  <span className="text-caption font-bold block" style={{ color: s.color }}>{s.label}</span>
                  <span className="text-caption text-[var(--text-light)]">{s.cost}</span>
                </div>
              ))}
            </div>

            <p className="text-caption text-[var(--text-secondary)]">
              8件装备全部穿满：Prompt → RAG → FC → Workflow → ReAct → Skills → Harness → Hermes
            </p>
          </div>
        </div>
      )}

      {/* Phase 2: Token warning + Quote */}
      {phase >= 2 && (
        <>
          <div className="token-warning max-w-2xl w-full mt-4 opacity-0">
            <div className="rounded-xl border-2 p-4" style={{ borderColor: '#EF4444', backgroundColor: '#EF444408' }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={18} style={{ color: '#EF4444' }} className="shrink-0 mt-0.5" />
                <div>
                  <span className="text-body-sm font-bold" style={{ color: '#EF4444' }}>隐性成本：Token + 模型智能上限</span>
                  <p className="text-caption text-[var(--text-secondary)] mt-1">
                    OpenClaw 的人力成本确实降低了，但 Token（算力）是新的隐性维度。
                    且模型的智能引入有上限——如果没有更聪明的大模型，已达上限的不确定度就只能转移到确认成本（人工校验）上。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="quote-card max-w-xl w-full mt-4 opacity-0">
            <div className="rounded-xl border-2 p-4 text-center"
              style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)08' }}>
              <p className="text-h3 font-bold text-[var(--primary)]">
                "不可能三角不会消失，但它会升维。"
              </p>
              <p className="text-caption text-[var(--text-secondary)] mt-2">
                OpenClaw 不是打破三角，而是通过改变成本结构，把整个三角变大。
              </p>
            </div>
          </div>
        </>
      )}

      <div className="absolute bottom-6 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击查看 OpenClaw 完全体' : phase === 1 ? '点击查看隐性成本' : '点击重置'}
      </div>
    </section>
  );
};

export default memo(Slide12_Comparison);
