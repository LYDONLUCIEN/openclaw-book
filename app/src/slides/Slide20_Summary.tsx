import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrendingUp, Triangle, Rocket } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide20_Summary: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const takeaways = [
    {
      className: 'review-takeaway-1',
      icon: TrendingUp,
      color: 'var(--success)',
      title: '确定性来自工程，不来自模型',
      desc: '从 Prompt 到 Skill 到 Harness，每一层工程手段都在把模型的"可能对"变成"一定对"',
    },
    {
      className: 'review-takeaway-2',
      icon: Triangle,
      color: 'var(--accent)',
      title: '三个特性是方向，不是终点',
      desc: '确定性、完备性、便利性都在持续提升——不是一次到位，而是每用一个 Agent 就积累一份经验',
    },
    {
      className: 'review-takeaway-3',
      icon: Rocket,
      color: 'var(--primary)',
      title: '用好 Agent 的前提是理解 Agent',
      desc: '知道它能做什么、不能做什么、什么时候该介入——理解边界，才能释放价值',
    },
  ];

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.review-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.review-takeaway-1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.4)
        .fromTo('.review-takeaway-2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.6)
        .fromTo('.review-takeaway-3', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.8)
        .fromTo('.review-quote', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, 1.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="review-title text-center mb-10">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">总结</h2>
      </div>

      <div className="space-y-5 max-w-3xl w-full mb-10">
        {takeaways.map((item) => (
          <div
            key={item.className}
            className={item.className + ' flex items-start gap-5 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]'}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
              <item.icon className="w-6 h-6" style={{ color: item.color }} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-h3 font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
              {item.desc && <p className="text-body text-[var(--text-secondary)]">{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="review-quote max-w-3xl w-full rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-secondary))', border: '1px solid var(--border)' }}>
        <p className="text-h3 md:text-h2 font-bold text-[var(--primary)] leading-relaxed">
          "最好的 Agent 不是最强的 Agent，而是你理解得最深的那个。"
        </p>
      </div>
    </section>
  );
};

export default memo(Slide20_Summary);
