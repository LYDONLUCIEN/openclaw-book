import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Star, Users, Target, TrendingUp } from 'lucide-react';

interface SlideProps { isActive: boolean }

const HIGHLIGHTS = [
  {
    icon: Star,
    title: 'GitHub Stars 数据',
    stat: '374K+',
    statLabel: 'Stars（历史级增速）',
    desc: 'OpenClaw 在发布数周内迅速登顶 GitHub 全球热门榜单，成为开源社区现象级项目。',
    detail: '开源模型与工具链的完整度是其爆发式增长的核心驱动力，社区贡献者遍布全球。',
    color: '#F97316',
  },
  {
    icon: Users,
    title: '厂商竞相布局',
    stat: 'Top 1',
    statLabel: '全球开源 AI Agent 排名',
    desc: '从科技巨头到创业公司，国内外各厂商纷纷推出基于 OpenClaw 架构的智能体方案。',
    detail: '模型层、框架层、应用层均有厂商切入，生态协同效应显著。',
    color: '#F97316',
  },
  {
    icon: Target,
    title: '中国移动 Token 战略意义',
    stat: '20+',
    statLabel: '已接入平台',
    desc: 'OpenClaw 为中国移动 Token 运营战略提供关键技术抓手，支撑智能化平台建设。',
    detail: '通过 Agent 能力标准化封装，实现跨平台能力复用与统一调度，降低集成成本。',
    color: '#F97316',
  },
];

const Slide04_LobsterBoom: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.lb-title', { opacity: 0, y: -25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.lb-subtitle', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.lb-card', { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.3)', delay: 0.4 });
      gsap.fromTo('.lb-bottom', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.9 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="lb-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0">
        🦞 OpenClaw 爆发现象
      </h2>
      <p className="lb-subtitle text-body-lg text-[var(--text-secondary)] mb-8 opacity-0">
        GitHub 历史级增速，全球厂商竞相布局，成为 AI Agent 生态核心基础设施
      </p>

      {/* Three highlight cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full">
        {HIGHLIGHTS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="lb-card rounded-xl border-2 p-5 md:p-6 opacity-0"
              style={{ borderColor: item.color, backgroundColor: `${item.color}06` }}>
              {/* Icon + title row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}15` }}>
                  <Icon size={24} style={{ color: item.color }} />
                </div>
                <h3 className="text-body-lg font-bold" style={{ color: item.color }}>{item.title}</h3>
              </div>

              {/* Stat block */}
              <div className="rounded-lg px-4 py-2.5 inline-block mb-4"
                style={{ backgroundColor: `${item.color}10` }}>
                <span className="text-h2 font-bold font-mono" style={{ color: item.color }}>{item.stat}</span>
                <span className="text-body-sm text-[var(--text-secondary)] block mt-1">{item.statLabel}</span>
              </div>

              {/* Description */}
              <p className="text-body-sm text-[var(--text-secondary)] mb-3 leading-relaxed">{item.desc}</p>

              {/* Professional detail */}
              <p className="text-caption text-[var(--text-light)] leading-relaxed">{item.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom conclusion */}
      <div className="lb-bottom mt-8 text-center opacity-0">
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <TrendingUp size={18} style={{ color: '#F97316' }} />
          <span className="text-body font-bold text-[var(--text-primary)]">
            热度驱动生态，生态加速落地 —— 关键在于理解其核心技术
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide04_LobsterBoom);
