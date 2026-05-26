import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const CHALLENGES = [
  {
    level: 1,
    title: '第一课:环境部署',
    desc: '本地虾安全隐患高，得折腾；云虾需要服务器，门槛高',
    cost: '学习成本 · 操作成本',
    color: '#10B981',
  },
  {
    level: 2,
    title: '第二课:Token质量',
    desc: 'Token成本高，模型智能不足，再多的工具也解决不了',
    cost: '智能成本 · 算力成本',
    color: '#3B82F6',
  },
  {
    level: 3,
    title: '第三课:模型幻觉',
    desc: '输出总是可能出错，必须用确定性方式约束——代码执行、Skills介入',
    cost: '开发成本 · 学习成本',
    color: '#8B5CF6',
  },
  {
    level: 4,
    title: '第四课:自主决策',
    desc: '理想完美但结果偏差大，需要不断反馈决策，自己能闭环，才懂指导AI',
    cost: '时间成本 · 确认成本',
    color: '#F97316',
  },
];

const Slide15b_WhyCantUse: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo('.wu-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });

      tl.fromTo('.wu-subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3);

      tl.fromTo('.wu-card', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: 'power3.out' }, 0.6);

      tl.fromTo('.wu-bottom', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 1.4);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="wu-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-3 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={2} />
        为什么我感觉用不起来？
      </h2>

      <p className="wu-subtitle text-body text-[var(--text-secondary)] text-center max-w-3xl mb-6 opacity-0">
        龙虾本质上没有脱离大模型的幻觉问题，逃过的课终究是要补回来
      </p>

      {/* 4 challenge cards */}
      <div className="max-w-5xl w-full space-y-4">
        {CHALLENGES.map((c) => (
          <div key={c.level}
            className="wu-card flex items-start gap-4 rounded-xl border-2 p-4 opacity-0"
            style={{ borderColor: `${c.color}40`, backgroundColor: `${c.color}06` }}>

            {/* Level badge */}
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center"
              style={{ backgroundColor: `${c.color}15` }}>
              <span className="text-caption font-bold" style={{ color: c.color }}>L{c.level}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-body font-bold" style={{ color: c.color }}>{c.title}</h3>
                <span className="text-caption px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${c.color}12`, color: c.color }}>
                  {c.cost}
                </span>
              </div>
              <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom quote */}
      <div className="wu-bottom mt-auto pt-6 rounded-xl border-2 px-8 py-4 text-center max-w-3xl w-full opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
        <p className="text-h3 font-bold" style={{ color: '#F97316' }}>
          &ldquo;成本不会消失，只会转移&rdquo;
        </p>
      </div>
    </section>
  );
};

export default memo(Slide15b_WhyCantUse);
