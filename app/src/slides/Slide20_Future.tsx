import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const sections = [
  {
    className: 'future-done',
    emoji: '✅',
    color: '#10B981',
    label: '已落地',
    items: [
      { name: '聚智平台', desc: '[待补充具体描述]' },
      { name: '磐匠 Agent', desc: '[待补充具体描述]' },
    ],
  },
  {
    className: 'future-building',
    emoji: '🔧',
    color: '#3B82F6',
    label: '建设中',
    items: [
      { name: '云虾沙箱', desc: '安全隔离运行环境，支撑Agent本地调试与验证' },
      { name: '安全管控体系', desc: '合规边界定义与数据安全策略' },
    ],
  },
  {
    className: 'future-next',
    emoji: '🔮',
    color: '#8B5CF6',
    label: '规划中',
    items: [
      { name: 'MobileClaw', desc: '[待补充具体描述]' },
      { name: 'JoinAI', desc: '[待补充具体描述]' },
      { name: '开放生态', desc: '内部Skill共建共享机制' },
    ],
  },
];

const Slide20_Future: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.future-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.future-gradient-bar', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, 0.3)
        .fromTo('.future-done', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.4)
        .fromTo('.future-building', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.6)
        .fromTo('.future-next', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.8)
        .fromTo('.future-quote', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, 1.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="future-title text-center mb-6">
        <h2 className="text-h1 md:text-display font-bold text-[var(--text-primary)]">内部推进路径</h2>
      </div>

      {/* Three-color gradient bar */}
      <div className="future-gradient-bar w-full max-w-5xl h-1.5 rounded-full mb-8 origin-left"
        style={{ background: 'linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6)', transform: 'scaleX(0)' }} />

      <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full flex-1">
        {sections.map((section) => (
          <div key={section.className}
            className={section.className + ' flex-1 rounded-xl p-5 md:p-6 border-t-4'}
            style={{ borderColor: section.color, backgroundColor: `${section.color}08` }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{section.emoji}</span>
              <h3 className="text-body font-bold" style={{ color: section.color }}>{section.label}</h3>
            </div>
            <div className="space-y-2.5">
              {section.items.map((item, i) => (
                <div key={i} className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <span className="text-body-sm font-bold text-[var(--text-primary)]">{item.name}</span>
                  <span className="text-caption text-[var(--text-secondary)] ml-1">— {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="future-quote max-w-5xl w-full rounded-xl border-2 p-5 text-center opacity-0"
        style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)06' }}>
        <p className="text-body-sm font-semibold text-[var(--text-primary)] leading-relaxed">
          技术栈持续演进，工具链协同发力
        </p>
      </div>
    </section>
  );
};

export default memo(Slide20_Future);
