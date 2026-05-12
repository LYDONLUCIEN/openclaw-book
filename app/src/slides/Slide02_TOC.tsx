import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Rocket, Cpu, Sparkles, Building2 } from 'lucide-react';
import Badge from '@/components/Badge';

interface SlideProps {
  isActive: boolean;
}

const sections = [
  { num: '01', icon: Rocket, title: 'AI Agent进化之路', desc: '从ChatGPT到Agent的认知飞跃', color: 'var(--primary)' },
  { num: '02', icon: Cpu, title: '核心概念解析', desc: 'ReAct范式 + MCP协议 + Skills系统', color: 'var(--secondary)' },
  { num: '03', icon: Sparkles, title: 'Agent能力全景', desc: '能做什么 / 不能做什么 / 场景实战', color: 'var(--accent)' },
  { num: '04', icon: Building2, title: '中国移动落地', desc: '模型底座 + 场景穿透 + 碳硅协同', color: 'var(--success)' },
];

const Slide02_TOC: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.toc-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      tl.fromTo('.toc-intro', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      tl.fromTo(
        '.toc-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)' },
        0.3
      );
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="toc-subtitle opacity-0 mb-3">
            <Badge variant="primary">5个章节 · 18页幻灯片</Badge>
          </div>
          <h2 className="text-display text-[var(--primary)] font-extrabold tracking-tight toc-subtitle opacity-0">
            课程导航
          </h2>
          <p className="toc-intro text-body text-[var(--text-secondary)] mt-4 max-w-lg mx-auto opacity-0">
            今天我们将一起探索AI Agent技术的全貌
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="toc-card group relative flex items-start gap-5 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-[var(--primary)] opacity-0"
              >
                {/* Section number */}
                <span
                  className="text-data font-mono font-extrabold leading-none opacity-15 select-none"
                  style={{ color: s.color }}
                >
                  {s.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `color-mix(in srgb, ${s.color} 12%, transparent)` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.color }} strokeWidth={2} />
                  </div>
                  <h3 className="text-h3 font-semibold text-[var(--text-primary)] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-body-sm text-[var(--text-secondary)]">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Slide02_TOC);
