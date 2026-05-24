import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const CONCLUSIONS = [
  {
    num: '01',
    title: '三个特性，拆解一切',
    desc: '便利性、完备性、确定性——可以拆解所有 Agent 技术的进步与取舍',
    color: '#3B82F6',
    icon: '🔺',
  },
  {
    num: '02',
    title: '成本转移，永恒法则',
    desc: '操作成本、开发成本、确认成本不会消失只会转移，所有人都在做同一件事',
    color: '#10B981',
    icon: '🔄',
  },
  {
    num: '03',
    title: '准确理解，准确使用',
    desc: '大模型发展的主线：尽可能保证对知识的准确理解和对工具的准确使用',
    color: '#8B5CF6',
    icon: '🎯',
  },
];

const COSTS = [
  { icon: '✍️', label: '操作成本', prop: '完备性', color: '#3B82F6' },
  { icon: '🔧', label: '开发成本', prop: '便利性', color: '#10B981' },
  { icon: '✅', label: '确认成本', prop: '确定性', color: '#F97316' },
];

const Slide23_Summary: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo('.sm-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' });

      tl.fromTo('.sm-conc', { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.3)' }, 0.4);

      tl.fromTo('.sm-left', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 }, 1.0);

      tl.fromTo('.sm-right', { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5 }, 1.0);

      tl.fromTo('.sm-quote', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, 1.4);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="sm-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-4 opacity-0">
        全篇总结
      </h2>

      {/* Three conclusions */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
        {CONCLUSIONS.map((c) => (
          <div key={c.num}
            className="sm-conc rounded-xl border-2 p-4 md:p-5 opacity-0"
            style={{ borderColor: `${c.color}45`, backgroundColor: `${c.color}06` }}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xl">{c.icon}</span>
              <span className="text-caption font-bold px-2 py-0.5 rounded"
                style={{ backgroundColor: `${c.color}15`, color: c.color }}>{c.num}</span>
              <h3 className="text-body-lg font-bold" style={{ color: c.color }}>{c.title}</h3>
            </div>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Two-column middle section */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-6 mb-5">
        {/* Left: Cost impossible triangle + transfer */}
        <div className="sm-left rounded-xl border-2 p-4 md:p-5 opacity-0"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>

          <h3 className="text-body font-bold text-[var(--text-primary)] mb-3">成本不可能三角</h3>

          {/* Triangle visual */}
          <div className="flex items-center justify-center mb-3">
            <svg viewBox="0 0 280 160" className="w-full max-w-[320px]">
              {/* Triangle edges */}
              <line x1="140" y1="15" x2="30" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" />
              <line x1="140" y1="15" x2="250" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" />
              <line x1="30" y1="140" x2="250" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" />

              {/* Transfer arrows along edges */}
              {/* 操作↔开发 (left edge) */}
              <path d="M 70,95 L 100,65" stroke="#3B82F6" strokeWidth="2" fill="none" markerEnd="url(#smArr1)" />
              <path d="M 100,70 L 70,100" stroke="#10B981" strokeWidth="2" fill="none" markerEnd="url(#smArr2)" />

              {/* 开发↔确认 (right edge) */}
              <path d="M 180,65 L 210,95" stroke="#10B981" strokeWidth="2" fill="none" markerEnd="url(#smArr2)" />
              <path d="M 210,70 L 180,100" stroke="#F97316" strokeWidth="2" fill="none" markerEnd="url(#smArr3)" />

              {/* 确认↔操作 (bottom edge) */}
              <path d="M 115,142 L 165,142" stroke="#F97316" strokeWidth="2" fill="none" markerEnd="url(#smArr3)" />
              <path d="M 165,137 L 115,137" stroke="#3B82F6" strokeWidth="2" fill="none" markerEnd="url(#smArr1)" />

              <defs>
                <marker id="smArr1" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,6 2.5,0 5" fill="#3B82F6" /></marker>
                <marker id="smArr2" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,6 2.5,0 5" fill="#10B981" /></marker>
                <marker id="smArr3" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,6 2.5,0 5" fill="#F97316" /></marker>
              </defs>

              {/* Vertex nodes */}
              <circle cx="140" cy="15" r="14" fill="#3B82F620" stroke="#3B82F6" strokeWidth="1.5" />
              <text x="140" y="19" textAnchor="middle" fill="#3B82F6" fontSize="8" fontWeight="bold">✍️</text>
              <text x="140" y="38" textAnchor="middle" fill="#3B82F6" fontSize="9" fontWeight="bold">操作成本</text>

              <circle cx="30" cy="140" r="14" fill="#10B98120" stroke="#10B981" strokeWidth="1.5" />
              <text x="30" y="144" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">🔧</text>
              <text x="30" y="130" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold">开发成本</text>

              <circle cx="250" cy="140" r="14" fill="#F9731620" stroke="#F97316" strokeWidth="1.5" />
              <text x="250" y="144" textAnchor="middle" fill="#F97316" fontSize="8" fontWeight="bold">✅</text>
              <text x="250" y="130" textAnchor="middle" fill="#F97316" fontSize="9" fontWeight="bold">确认成本</text>
            </svg>
          </div>

          <p className="text-body-sm text-[var(--text-secondary)] text-center leading-relaxed">
            三项成本构成不可能三角——降低任一角意味着转移至其余两角
          </p>
        </div>

        {/* Right: Equipment metaphor + AI evolution */}
        <div className="sm-right space-y-4 opacity-0">
          {/* Equipment */}
          <div className="rounded-xl border-2 p-4 md:p-5"
            style={{ borderColor: '#EAB30840', backgroundColor: '#EAB30808' }}>
            <h3 className="text-body font-bold mb-2" style={{ color: '#EAB308' }}>装备与货币</h3>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mb-2">
              Skills、Harness 不是重点，它们只是升级好的<span className="font-bold" style={{ color: '#EAB308' }}>装备</span>
            </p>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
              升级装备的<span className="font-bold" style={{ color: '#EAB308' }}>货币</span>叫做模型智能——更好的模型、更多的 Token 消耗
            </p>
          </div>

          {/* Cost transfer + effort */}
          <div className="rounded-xl border-2 p-4 md:p-5"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="text-body font-bold text-[var(--text-primary)] mb-2">转移后的成本，需要消化</h3>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mb-2">
              我们依然要付出时间、精力、金钱去摸索和学习，让转移后的成本变得可以接受
            </p>
            <p className="text-body-sm text-[var(--text-primary)] leading-relaxed font-semibold">
              真正花费时间和精力所学习到的东西，会是未来更重要的机会
            </p>
          </div>
        </div>
      </div>

      {/* Final quote — full width, prominent */}
      <div className="sm-quote max-w-6xl w-full rounded-2xl border-2 px-8 py-5 md:py-6 text-center opacity-0 mt-auto"
        style={{
          borderColor: '#EAB308',
          background: 'linear-gradient(135deg, #EAB30808, #F9731608)',
        }}>
        <p className="text-h2 md:text-h1 font-bold leading-relaxed" style={{
          background: 'linear-gradient(135deg, #EAB308, #F97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          成本加上时间的可能性，就是投资
        </p>
        <p className="text-body text-[var(--text-secondary)] mt-2 leading-relaxed">
          它们的确叫成本——但当你投入了真实的时间与精力，这些成本就变成了通往更大场景的入场券
        </p>
      </div>
    </section>
  );
};

export default memo(Slide23_Summary);
