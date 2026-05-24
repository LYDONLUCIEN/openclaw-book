import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const STRATEGIES = [
  {
    title: '操作成本弥补',
    emoji: '✍️',
    color: '#3B82F6',
    property: '完备性',
    approaches: [
      {
        label: '方法论沉淀为 Skill',
        desc: '波兰尼默会智慧、苏格拉底式提问、费曼学习法等，以结构化方法论引导模型输出',
      },
      {
        label: '先验知识增强',
        desc: '通过训练、微调、知识库注入，提升模型对领域知识的掌握',
      },
    ],
  },
  {
    title: '开发成本弥补',
    emoji: '🔧',
    color: '#10B981',
    property: '便利性',
    approaches: [
      {
        label: '现成工具调用',
        desc: 'Skills 仓库脚本、MCP 插件，直接复用社区沉淀的工具链',
      },
      {
        label: '开发转移至使用',
        desc: '高灵活度开发框架，将开发过程转化为使用过程，由模型辅助生成',
      },
    ],
  },
  {
    title: '确认成本弥补',
    emoji: '✅',
    color: '#F97316',
    property: '确定性',
    approaches: [
      {
        label: '确定性程序约束',
        desc: '用确定性代码约束执行路径，降低过程的不确定性',
      },
      {
        label: '人工审核机制',
        desc: '完善反馈闭环，关键节点需人工确认，而非默认执行',
      },
    ],
  },
];

const Slide16_CostStrategy: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo('.cs-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo('.cs-quote', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.3);
      tl.fromTo('.cs-card', { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, 0.7);
      tl.fromTo('.cs-approach', { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.08 }, 1.0);
      tl.fromTo('.cs-bottom', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }, 1.6);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="cs-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-4 opacity-0">
        成本转移策略
      </h2>

      {/* Quote */}
      <div className="cs-quote rounded-2xl border-2 px-8 py-4 mb-6 max-w-4xl w-full text-center opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
        <p className="text-h3 font-bold" style={{ color: '#F97316' }}>
          &ldquo;成本不会消失，只会转移&rdquo;
        </p>
      </div>

      {/* Three strategy cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 max-w-6xl w-full">
        {STRATEGIES.map((s, i) => (
          <div key={i}
            className="cs-card rounded-xl border-2 p-4 md:p-5 opacity-0"
            style={{ borderColor: s.color, backgroundColor: `${s.color}06` }}>

            {/* Card header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{s.emoji}</span>
              <h3 className="text-body font-bold" style={{ color: s.color }}>{s.title}</h3>
              <span className="ml-auto text-caption font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                {s.property}
              </span>
            </div>

            {/* Two approaches */}
            <div className="space-y-3">
              {s.approaches.map((a, j) => (
                <div key={j}
                  className="cs-approach rounded-lg border px-3 py-2.5 opacity-0"
                  style={{ borderColor: `${s.color}25`, backgroundColor: `${s.color}05` }}>
                  <p className="text-body-sm font-bold mb-1" style={{ color: s.color }}>
                    {j === 0 ? '❶' : '❷'} {a.label}
                  </p>
                  <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: cost triangle transfer diagram */}
      <div className="cs-bottom mt-auto pt-5 max-w-5xl w-full opacity-0">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Node: 操作成本 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: '#3B82F615', color: '#3B82F6' }}>✍️</div>
            <span className="text-caption font-bold mt-1" style={{ color: '#3B82F6' }}>操作成本</span>
            <span className="text-caption text-[var(--text-secondary)]">完备性</span>
          </div>

          {/* Double arrow */}
          <div className="flex flex-col items-center">
            <span className="text-body-sm" style={{ color: '#3B82F6' }}>↔</span>
            <span className="text-caption text-[var(--text-light)]">转移</span>
          </div>

          {/* Node: 开发成本 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: '#10B98115', color: '#10B981' }}>🔧</div>
            <span className="text-caption font-bold mt-1" style={{ color: '#10B981' }}>开发成本</span>
            <span className="text-caption text-[var(--text-secondary)]">便利性</span>
          </div>

          {/* Double arrow */}
          <div className="flex flex-col items-center">
            <span className="text-body-sm" style={{ color: '#10B981' }}>↔</span>
            <span className="text-caption text-[var(--text-light)]">转移</span>
          </div>

          {/* Node: 确认成本 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: '#F9731615', color: '#F97316' }}>✅</div>
            <span className="text-caption font-bold mt-1" style={{ color: '#F97316' }}>确认成本</span>
            <span className="text-caption text-[var(--text-secondary)]">确定性</span>
          </div>
        </div>
        <p className="text-caption text-center mt-3 text-[var(--text-secondary)]">
          三项成本构成成本三角，降低任一角成本意味着将开销转移至其余两角
        </p>
      </div>
    </section>
  );
};

export default memo(Slide16_CostStrategy);
