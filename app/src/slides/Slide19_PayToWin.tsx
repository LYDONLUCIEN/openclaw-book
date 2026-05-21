import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Gem, Layers, Rocket } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const STRATEGIES = [
  {
    title: '更强基座模型',
    icon: Gem,
    color: '#EAB308',
    desc: '更优模型 → 更高Token投入 → 更好的推理与生成质量',
  },
  {
    title: '多工具协同',
    icon: Layers,
    color: '#EAB308',
    desc: 'Vibe Coding + Workflow + Agent 框架组合部署，构建完整技术栈',
  },
  {
    title: '规模化应用',
    icon: Rocket,
    color: '#EAB308',
    desc: '从个人工具升级为团队基础设施，应对更复杂业务场景',
  },
];

const Slide19_PayToWin: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pw-title', { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' });
      gsap.fromTo('.pw-card', { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.4)', delay: 0.4 });
      gsap.fromTo('.pw-quote', { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.3)', delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="pw-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-8 opacity-0">
        进阶策略：资源投入与组合升级
      </h2>

      <div className="max-w-4xl w-full space-y-6 flex-1">
        {STRATEGIES.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i}
              className="pw-card rounded-xl border-2 p-6 md:p-7 opacity-0"
              style={{
                borderColor: s.color,
                backgroundColor: `${s.color}08`,
              }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${s.color}15` }}>
                  <Icon size={28} style={{ color: s.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-body font-bold text-[var(--text-primary)] mb-1">
                    {s.title}
                  </p>
                  <p className="text-caption text-[var(--text-secondary)]">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom quote */}
      <div className="pw-quote rounded-2xl border-2 px-8 py-5 max-w-4xl w-full text-center opacity-0"
        style={{ borderColor: '#EAB308', backgroundColor: '#EAB3080A' }}>
        <p className="text-body font-bold" style={{ color: '#EAB308' }}>
          成本叠加时间的可能性，即从消耗转化为投资
        </p>
      </div>
    </section>
  );
};

export default memo(Slide19_PayToWin);
