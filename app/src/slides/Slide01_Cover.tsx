import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrendingUp, Star, ShoppingBag, AlertTriangle, ChevronRight, Image } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const COL1_NEWS = [
  { label: '278K+ Stars', source: 'GitHub 历史级增速' },
  { label: '全球开源排名第1', source: 'OSRank 2026' },
  { label: '发布数周登顶热榜', source: 'GitHub Trending' },
  { label: '社区贡献者遍布全球', source: 'Contributors' },
];

const COL2_VENDORS = [
  { name: 'OpenClaw', color: '#F97316' },
  { name: 'Claude Code', color: '#8B5CF6' },
  { name: 'Hermes Agent', color: '#3B82F6' },
  { name: 'Cursor', color: '#10B981' },
  { name: 'Windsurf', color: '#EC4899' },
  { name: 'Coze', color: '#F59E0B' },
  { name: 'Dify', color: '#06B6D4' },
  { name: 'Manus', color: '#EF4444' },
];

const MOBILE_STRATEGY = { label: '移动 Token 战略', desc: '20+ 平台已接入，关键技术抓手' };

const COL3_TERMS = ['Prompt', 'RAG', 'ReAct', 'MCP', 'Function Call', 'Workflow', 'Skills', 'Harness', 'Fine-tuning', 'Embedding', 'Vector DB', 'Vibe Coding'];

const COL3_RISKS = ['模型幻觉', 'Token消耗巨大', '自主决策失控', '数据安全风险'];

const QUESTIONS = [
  { q: '龙虾爆火，其中技术原理是什么？', color: 'var(--primary)' },
  { q: '框架选择混乱，如何判断适用场景？', color: 'var(--accent)' },
  { q: '面对实际业务场景，如何有效落地？', color: 'var(--secondary)' },
];

const Slide01_Cover: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || phase !== 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s1-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo('.s1-col', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.3)', delay: 0.3 });
      gsap.fromTo('.s1-hint', { opacity: 0 }, { opacity: 0.6, duration: 0.4, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  useGSAP(() => {
    if (!isActive || phase !== 1 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.s1-cols', { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' });
      gsap.fromTo('.s1-summary', { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.3 });
      gsap.fromTo('.s1-q-card', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.3)', delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={() => setPhase(phase === 0 ? 1 : 0)}>

      {/* Title */}
      <h2 className="s1-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-6 opacity-0">
        OpenClaw 现象全景
      </h2>

      {/* Phase 0: Three columns */}
      {phase === 0 && (
        <div className="s1-cols w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Column 1: Hype + Data */}
            <div className="s1-col rounded-xl border-2 p-4 md:p-5 opacity-0"
              style={{ borderColor: 'var(--primary)60', backgroundColor: 'var(--primary)04' }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} style={{ color: 'var(--primary)' }} />
                <h3 className="text-body font-bold" style={{ color: 'var(--primary)' }}>龙虾爆火</h3>
              </div>
              <div className="space-y-2 mb-3">
                {COL1_NEWS.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--primary)08' }}>
                    <Star size={12} style={{ color: 'var(--primary)' }} />
                    <span className="text-body-sm font-semibold" style={{ color: 'var(--primary)' }}>{item.label}</span>
                    <span className="text-caption text-[var(--text-light)] ml-auto">{item.source}</span>
                  </div>
                ))}
              </div>
              {/* GitHub trend chart placeholder */}
              <div className="w-full h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1"
                style={{ borderColor: 'var(--primary)30' }}>
                <Image size={20} style={{ color: 'var(--text-light)' }} />
                <span className="text-caption text-[var(--text-light)]">[GitHub 趋势图]</span>
              </div>
            </div>

            {/* Column 2: Vendors + Strategy */}
            <div className="s1-col rounded-xl border-2 p-4 md:p-5 opacity-0"
              style={{ borderColor: 'var(--accent)60', backgroundColor: 'var(--accent)04' }}>
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag size={16} style={{ color: 'var(--accent)' }} />
                <h3 className="text-body font-bold" style={{ color: 'var(--accent)' }}>各家龙虾争奇斗艳</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {COL2_VENDORS.map((v, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border text-caption font-semibold"
                    style={{ borderColor: v.color, color: v.color, backgroundColor: `${v.color}08` }}>
                    {v.name}
                  </span>
                ))}
              </div>
              {/* Vendor icons placeholder */}
              <div className="w-full h-16 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 mb-3"
                style={{ borderColor: 'var(--accent)30' }}>
                <span className="text-caption text-[var(--text-light)]">[各厂商 Claw 产品图标]</span>
              </div>
              {/* Mobile strategy */}
              <div className="rounded-lg px-3 py-2.5 border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent)08' }}>
                <span className="text-body-sm font-bold block" style={{ color: 'var(--accent)' }}>{MOBILE_STRATEGY.label}</span>
                <span className="text-caption text-[var(--text-secondary)]">{MOBILE_STRATEGY.desc}</span>
              </div>
            </div>

            {/* Column 3: Terms + Risks */}
            <div className="s1-col rounded-xl border-2 p-4 md:p-5 opacity-0"
              style={{ borderColor: 'var(--secondary)60', backgroundColor: 'var(--secondary)04' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} style={{ color: 'var(--secondary)' }} />
                <h3 className="text-body font-bold" style={{ color: 'var(--secondary)' }}>技术名词与使用风险</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {COL3_TERMS.map((term, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full text-[11px] font-medium border"
                    style={{ borderColor: 'var(--text-light)40', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)' }}>
                    {term}
                  </span>
                ))}
              </div>
              <div className="space-y-1.5 mb-3">
                {COL3_RISKS.map((risk, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ backgroundColor: '#EF444408' }}>
                    <span className="text-caption">⚠️</span>
                    <span className="text-body-sm font-semibold" style={{ color: '#EF4444' }}>{risk}</span>
                  </div>
                ))}
              </div>
              {/* Complaint screenshots placeholder */}
              <div className="w-full h-20 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1"
                style={{ borderColor: 'var(--secondary)30' }}>
                <span className="text-caption text-[var(--text-light)]">[用户吐槽截图]</span>
              </div>
            </div>
          </div>

          <div className="s1-hint text-center mt-6 opacity-0">
            <p className="text-body text-[var(--text-light)] flex items-center justify-center gap-2">
              点击收拢 <ChevronRight size={14} />
            </p>
          </div>
        </div>
      )}

      {/* Phase 1: Collapsed - three questions */}
      {phase === 1 && (
        <div className="s1-summary w-full max-w-4xl opacity-0">
          <div className="text-center mb-8">
            <h2 className="text-h1 md:text-display font-bold text-[var(--text-primary)]">
              以成本视角解构 AI Agent 技术体系
            </h2>
          </div>

          <div className="space-y-5">
            {QUESTIONS.map((item, i) => (
              <div key={i} className="s1-q-card rounded-xl border-2 p-5 md:p-6 opacity-0"
                style={{ borderColor: `${item.color}80`, backgroundColor: `${item.color}08` }}>
                <div className="flex items-center gap-4">
                  <span className="text-h2 font-extrabold shrink-0" style={{ color: item.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-body-lg font-bold text-[var(--text-primary)] leading-relaxed">
                    {item.q}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-6 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击收拢为问题框架' : '点击展开详细内容'}
      </div>
    </section>
  );
};

export default memo(Slide01_Cover);
