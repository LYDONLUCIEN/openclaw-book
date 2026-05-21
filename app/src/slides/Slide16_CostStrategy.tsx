import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PenLine, Wrench, CheckCheck, Triangle } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const STRATEGIES = [
  {
    title: '操作成本弥补',
    emoji: '✍️',
    icon: PenLine,
    color: '#3B82F6',
    desc: '通过更精确的需求描述与多轮迭代，弥补模型理解偏差',
    scenario: '适用场景：内容生成、方案撰写',
    property: '完备性',
  },
  {
    title: '开发成本弥补',
    emoji: '🔧',
    icon: Wrench,
    color: '#10B981',
    desc: '通过确定性工具开发与流程编排，约束模型行为边界',
    scenario: '适用场景：数据处理、流程自动化',
    property: '确定性',
  },
  {
    title: '确认成本弥补',
    emoji: '✅',
    icon: CheckCheck,
    color: '#F97316',
    desc: '通过多维度结果校验与反馈闭环，保障输出质量',
    scenario: '适用场景：决策支持、信息检索',
    property: '便利性',
  },
];

const Slide16_CostStrategy: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cs-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.cs-quote', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.3 });
      gsap.fromTo('.cs-card', { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out', delay: 0.7 });
      gsap.fromTo('.cs-triangle', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 1.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="cs-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-4 opacity-0">
        成本转移策略
      </h2>

      {/* Centered quote */}
      <div className="cs-quote rounded-2xl border-2 px-8 py-5 mb-8 max-w-4xl w-full text-center opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
        <p className="text-h3 font-bold" style={{ color: '#F97316' }}>
          &ldquo;成本不会消失，只会转移&rdquo;
        </p>
      </div>

      {/* Three strategy cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 max-w-5xl w-full flex-1">
        {STRATEGIES.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i}
              className="cs-card rounded-xl border-2 p-5 md:p-6 text-center opacity-0"
              style={{
                borderColor: s.color,
                backgroundColor: `${s.color}06`,
              }}>
              <div className="text-2xl mb-2">{s.emoji}</div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                <Icon size={24} />
              </div>
              <h3 className="text-body font-bold mb-2" style={{ color: s.color }}>
                {s.title}
              </h3>
              <p className="text-caption text-[var(--text-secondary)] leading-relaxed mb-2">
                {s.desc}
              </p>
              <p className="text-caption text-[var(--text-light)]" style={{ fontSize: '10px' }}>
                {s.scenario}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom triangle diagram */}
      <div className="cs-triangle mt-6 flex items-center justify-center gap-6 opacity-0">
        {/* Mini triangle */}
        <div className="relative" style={{ width: '80px', height: '70px' }}>
          <Triangle size={70} style={{ color: 'var(--text-light)', opacity: 0.3 }} />
        </div>
        {/* Arrows to strategies */}
        <div className="flex flex-col gap-2">
          {STRATEGIES.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-caption font-mono" style={{ color: s.color }}>{'→'}</span>
              <span className="text-caption font-bold" style={{ color: s.color }}>{s.property}</span>
              <span className="text-caption text-[var(--text-secondary)]">{s.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Slide16_CostStrategy);
