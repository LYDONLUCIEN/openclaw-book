import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Shield, Sparkles, ClipboardList, Crown, ArrowUpRight, AlertTriangle } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const PATHS = [
  {
    base: '执行者（代码开发）',
    evolved: 'Claude Code',
    icon: Shield,
    color: '#3B82F6',
    beforeStats: { C: 90, P: 15, U: 5 },
    afterStats: { C: 60, P: 5, U: 3 },
    desc: 'AI辅助编程，超级代码智能体',
    special: 'AI理解代码意图，自动生成和修改',
    highlight: '开发成本大幅降低，确定性依然极高',
  },
  {
    base: '规划者（大模型）',
    evolved: 'OpenClaw',
    icon: Sparkles,
    color: '#F59E0B',
    beforeStats: { C: 10, P: 40, U: 80 },
    afterStats: { C: 50, P: 8, U: 15 },
    desc: '8件装备全满，全能智能体',
    special: 'Skills渐进式加载 + Harness记忆工程',
    highlight: 'Token成本替代人力成本，参与度最低',
  },
  {
    base: '调度者（工作流）',
    evolved: 'Hermes Agent',
    icon: ClipboardList,
    color: '#10B981',
    beforeStats: { C: 80, P: 25, U: 10 },
    afterStats: { C: 45, P: 10, U: 20 },
    desc: '自动生成和优化工作流',
    special: 'AI自动识别模式，自动编写Skill',
    highlight: '工作流开发自动化，但引入了更多不确定度',
  },
];

const Slide13_Limitations: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.path-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.path-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.path-card', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.3)', delay: 0.4 });
      gsap.fromTo('.path-reveal-btn', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const handleReveal = () => {
    const ctx = gsap.context(() => {
      gsap.to('.path-before', { opacity: 0, height: 0, duration: 0.3, stagger: 0.05 });
      gsap.fromTo('.path-after', { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, delay: 0.3, ease: 'back.out(1.3)' });
      gsap.to('.path-reveal-btn', { opacity: 0, duration: 0.2 });
      gsap.fromTo('.path-conclusion', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.8 });
    }, containerRef);
    ctx.revert();
    setRevealed(true);
  };

  function StatChange({ before, after, label, color }: { before: number; after: number; label: string; color: string }) {
    const diff = after - before;
    const arrow = diff < 0 ? '↓' : diff > 0 ? '↑' : '→';
    const diffColor = diff < 0 ? 'var(--success)' : diff > 0 ? 'var(--accent)' : 'var(--text-light)';
    return (
      <div className="flex items-center gap-2 text-caption">
        <span className="font-bold" style={{ color }}>{label}</span>
        <span className="text-[var(--text-light)]">{before}</span>
        <span style={{ color: diffColor }}>{arrow}</span>
        <span className="font-bold" style={{ color: diffColor }}>{after}</span>
      </div>
    );
  }

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="path-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        三条氪金路线
      </h2>
      <p className="path-subtitle text-body text-[var(--text-secondary)] mb-5 opacity-0">
        不只是法师可以氪金升级——三个职业都可以注入AI智能。点击下方按钮查看进化后的形态。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full">
        {PATHS.map((path, i) => {
          const Icon = path.icon;
          return (
            <div key={i}
              className="path-card rounded-xl border-2 p-4 transition-all duration-500 opacity-0"
              style={{ borderColor: path.color, backgroundColor: `${path.color}06` }}>
              {/* Header with evolution arrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${path.color}15`, color: path.color }}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-caption">
                    <span className="text-[var(--text-light)] truncate">{path.base}</span>
                    <ArrowUpRight size={12} style={{ color: path.color }} />
                    <span className="font-bold truncate" style={{ color: path.color }}>{path.evolved}</span>
                  </div>
                </div>
              </div>

              {/* Before stats (hidden after reveal) */}
              <div className="path-before mb-2">
                <span className="text-caption text-[var(--text-light)]">进化前</span>
                <div className="flex gap-3 mt-1">
                  <span className="text-caption font-mono" style={{ color: 'var(--accent)' }}>C:{path.beforeStats.C}</span>
                  <span className="text-caption font-mono" style={{ color: 'var(--primary)' }}>P:{path.beforeStats.P}</span>
                  <span className="text-caption font-mono" style={{ color: 'var(--success)' }}>U:{path.beforeStats.U}</span>
                </div>
              </div>

              {/* After stats (shown after reveal) */}
              <div className="path-after" style={{ display: revealed ? 'block' : 'none' }}>
                <div className="space-y-0.5 mb-2">
                  <StatChange before={path.beforeStats.C} after={path.afterStats.C} label="C" color="var(--accent)" />
                  <StatChange before={path.beforeStats.P} after={path.afterStats.P} label="P" color="var(--primary)" />
                  <StatChange before={path.beforeStats.U} after={path.afterStats.U} label="U" color="var(--success)" />
                </div>
                <div className="rounded-lg px-3 py-2 mt-2" style={{ backgroundColor: `${path.color}10` }}>
                  <p className="text-caption font-bold" style={{ color: path.color }}>{path.special}</p>
                  <p className="text-caption text-[var(--text-secondary)] mt-0.5">{path.highlight}</p>
                </div>
              </div>

              <p className="text-caption text-[var(--text-secondary)] mt-2">{path.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Reveal button */}
      {!revealed && (
        <button className="path-reveal-btn mt-5 px-6 py-2.5 rounded-xl text-body font-bold text-white transition-all hover:scale-105 opacity-0"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
          onClick={(e) => { e.stopPropagation(); handleReveal(); }}>
          <Crown size={16} className="inline mr-1.5" />点击氪金进化
        </button>
      )}

      {/* Conclusion */}
      {revealed && (
        <div className="path-conclusion text-center max-w-2xl mt-5 opacity-0">
          <div className="rounded-xl border-2 p-4" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent)08' }}>
            <div className="flex items-start gap-2">
              <AlertTriangle size={18} style={{ color: 'var(--accent)' }} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-body font-bold text-[var(--text-primary)]">
                  它们依然没有打破不可能三角！
                </p>
                <p className="text-caption text-[var(--text-secondary)] mt-1">
                  大模型替代的人力成本，以另一种形式的算力成本和不确定度补了回来。<br />
                  <span className="font-bold" style={{ color: 'var(--accent)' }}>一切都是权衡。</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Slide13_Limitations);
