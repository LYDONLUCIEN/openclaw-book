import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, Coins, ShieldAlert, Shield } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const PROBLEMS = [
  {
    title: '模型幻觉',
    icon: AlertTriangle,
    desc: '概率性生成模型非事实数据库，输出缺乏事实保证',
    tag: '模型本质 · 不可根除',
    color: '#EF4444',
  },
  {
    title: 'Token 消耗',
    icon: Coins,
    desc: '单次交互Token开销显著（一句问候≈13,500 tokens）',
    tag: '模型本质 · 成本线性增长',
    color: '#F59E0B',
  },
  {
    title: '自主决策风险',
    icon: ShieldAlert,
    desc: '缺乏常识推理与风险感知，关键决策需人工兜底',
    tag: '模型本质 · 不可根除',
    color: '#EF4444',
  },
  {
    title: '安全边界',
    icon: Shield,
    desc: '运行环境污染、权限过大、数据泄露等风险',
    tag: '架构层面 · 可通过工程改善',
    color: '#8B5CF6',
  },
];

const Slide15_FourProblems: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.fp-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.fp-card', { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.3 });
      gsap.fromTo('.fp-bottom', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="fp-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-6 opacity-0">
        核心局限性
      </h2>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl w-full flex-1">
        {PROBLEMS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i}
              className="fp-card rounded-xl border-2 p-5 md:p-6 opacity-0"
              style={{
                borderColor: p.color,
                backgroundColor: `${p.color}06`,
              }}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                  <Icon size={18} />
                </div>
                <span className="text-body font-bold" style={{ color: p.color }}>{p.title}</span>
              </div>

              {/* Description */}
              <p className="text-body-sm text-[var(--text-primary)] mb-3 pl-1 leading-relaxed">
                {p.desc}
              </p>

              {/* Tag */}
              <div>
                <span className="inline-block rounded-full px-3 py-1 text-caption font-semibold"
                  style={{
                    backgroundColor: p.color === '#8B5CF6' ? '#8B5CF615' : `${p.color}15`,
                    color: p.color,
                  }}>
                  {p.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom conclusion */}
      <div className="fp-bottom rounded-xl border-2 p-4 max-w-4xl w-full text-center opacity-0"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
        <p className="text-body-sm font-bold text-[var(--text-primary)]">
          前三项为模型本质限制，安全风险可通过架构设计缓解
        </p>
      </div>
    </section>
  );
};

export default memo(Slide15_FourProblems);
