import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const BOUNDARIES = [
  {
    title: '我的能力边界',
    icon: '🧑',
    color: '#3B82F6',
    desc: '缺乏沉淀、总结与系统思考',
    action: '更多实践、更多复盘、积累方法论',
  },
  {
    title: '框架的能力边界',
    icon: '🛠',
    color: '#10B981',
    desc: '工具链不完善，定制空间受限制',
    action: '开发工具，甚至自己去迭代 AI 框架',
  },
  {
    title: 'AI 的能力边界',
    icon: '🤖',
    color: '#8B5CF6',
    desc: '模型智能有上限，场景覆盖有限',
    action: '氪金用更好模型，Coding Plan 省很多，等待技术演进',
  },
];

const Slide22_FinalWords: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo('.bd-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.bd-subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.3);
      tl.fromTo('.bd-card', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.2)' }, 0.5);
      tl.fromTo('.bd-bottom', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 1.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="bd-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={3} />
        在使用中体验边界
      </h2>

      <p className="bd-subtitle text-body text-[var(--text-secondary)] text-center max-w-3xl mb-6 opacity-0">
        边界是模糊的——可能是你的能力限制了效果，也可能是模型或框架的局限
      </p>

      {/* Three boundary cards */}
      <div className="max-w-5xl w-full space-y-4">
        {BOUNDARIES.map((b) => (
          <div key={b.title}
            className="bd-card rounded-xl border-2 p-4 md:p-5 opacity-0"
            style={{ borderColor: `${b.color}40`, backgroundColor: `${b.color}05` }}>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${b.color}12` }}>
                {b.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-body-lg font-bold mb-1" style={{ color: b.color }}>{b.title}</h3>
                <p className="text-body-sm text-[var(--text-secondary)] mb-2">{b.desc}</p>
                <div className="rounded-lg border px-3 py-2"
                  style={{ borderColor: `${b.color}20`, backgroundColor: `${b.color}08` }}>
                  <p className="text-caption text-[var(--text-primary)]">→ {b.action}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Core insight */}
      <div className="bd-bottom mt-auto pt-5 max-w-3xl w-full text-center opacity-0">
        <div className="rounded-xl border-2 px-6 py-4"
          style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
          <p className="text-body font-bold mb-1" style={{ color: '#F97316' }}>
            我的认知边界决定了 AI 最终的使用上限
          </p>
          <p className="text-body-sm text-[var(--text-secondary)]">
            去尝试、去学习、去玩——只有实际使用和投入精力调教，才有真正的手感与经验
          </p>
        </div>
      </div>

    </section>
  );
};

export default memo(Slide22_FinalWords);
