import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const CHAPTERS = [
  { num: 1, title: 'OpenClaw 的核心拆解', subtitle: '技术原理 · 成本框架 · 能力演进', color: '#3B82F6' },
  { num: 2, title: '龙虾的应用场景', subtitle: '部署模式 · 典型案例 · 实战示范', color: '#10B981' },
  { num: 3, title: '未来展望与计划', subtitle: '边界认知 · 趋势判断 · 行动建议', color: '#F97316' },
];

const Slide02_TOC: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo('.toc-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
      tl.fromTo('.toc-item', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.12, ease: 'back.out(1.4)' }, 0.25);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center pt-16 pb-20 px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="toc-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-10 opacity-0">
        目录
      </h2>

      <div className="w-full max-w-3xl space-y-5">
        {CHAPTERS.map((ch) => (
          <div key={ch.num}
            className="toc-item rounded-xl border-2 px-6 py-5 md:py-6 flex items-center gap-5 opacity-0"
            style={{ borderColor: `${ch.color}60`, backgroundColor: `${ch.color}06` }}>
            <span className="text-h2 md:text-display font-extrabold shrink-0"
              style={{ color: ch.color }}>
              {String(ch.num).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="text-body-lg md:text-h3 font-bold text-[var(--text-primary)]">
                第{ch.num}章 · {ch.title}
              </h3>
              <p className="text-caption md:text-body-sm text-[var(--text-secondary)] mt-0.5">
                {ch.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Slide02_TOC);
