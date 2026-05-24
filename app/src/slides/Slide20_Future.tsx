import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const COST_PATHS = [
  {
    icon: '🎯',
    title: '精准描述',
    cost: '操作成本↑',
    desc: '使用更精准的描述要求，更多操作成本弥补不确定性',
    color: '#3B82F6',
  },
  {
    icon: '🔧',
    title: '确定性开发',
    cost: '开发成本↑',
    desc: '使用更确定性的开发方式，开发成本弥补不确定性',
    color: '#10B981',
  },
  {
    icon: '✅',
    title: '充分检查',
    cost: '确认成本↑',
    desc: '使用更多检查保证效果，确认成本弥补不确定性',
    color: '#D97706',
  },
];

const FORCES = [
  {
    icon: '🧠',
    title: '更好的模型',
    source: '来自全世界研发人员和数据的力量',
    details: [
      '更优模型 → 更高 Token 投入 → 更好推理与生成质量',
      '模型能力持续进化，降低所有人的使用门槛',
    ],
    color: '#8B5CF6',
  },
  {
    icon: '🔗',
    title: '更多的工具协同',
    source: '来自不同厂商开发的工具力量',
    details: [
      'Vibe Coding + Workflow + Agent 框架组合部署',
      '工具生态日益丰富，不断扩展能力边界',
    ],
    color: '#0891B2',
  },
  {
    icon: '👥',
    title: '更多人的力量',
    source: '让所有人的经验都能沉淀下来',
    details: [
      '从个人工具升级为团队基础设施，应对更复杂场景',
      '每个人完善场景丰富度，而非一人开发众人使用',
    ],
    color: '#F97316',
  },
];

const GROUPS = [
  { icon: '🎮', label: 'VibeCoding\n小伙伴', color: '#8B5CF6' },
  { icon: '⚙️', label: 'Workflow\n小伙伴', color: '#0891B2' },
  { icon: '👨‍💼', label: '同事经验', color: '#F97316' },
];

const Slide20_Future: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.pw-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' });

      // Cost paths
      tl.fromTo('.pw-cost-label', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.2);
      tl.fromTo('.pw-cost', { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.3)' }, 0.3);

      // Force cards
      tl.fromTo('.pw-force-label', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7);
      tl.fromTo('.pw-force', { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.4)' }, 0.8);

      // Bottom
      tl.fromTo('.pw-groups', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }, 1.5);
      tl.fromTo('.pw-quote', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, 1.7);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="pw-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={2} />
        汇聚众人力量，突破成本天花板
      </h2>

      {/* Section 1: Three cost transfer strategies */}
      <div className="max-w-6xl w-full mb-3">
        <p className="pw-cost-label text-body-sm font-bold mb-2 opacity-0" style={{ color: '#64748B' }}>
          三条路径：以成本转移弥补不确定性
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {COST_PATHS.map((c, i) => (
            <div key={i}
              className="pw-cost rounded-xl border-2 p-3 opacity-0"
              style={{ borderColor: `${c.color}50`, backgroundColor: `${c.color}08` }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">{c.icon}</span>
                <span className="text-body-sm font-bold" style={{ color: c.color }}>{c.title}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-auto"
                  style={{ backgroundColor: `${c.color}15`, color: c.color }}>{c.cost}</span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Three breakthrough forces */}
      <div className="max-w-6xl w-full mb-3">
        <p className="pw-force-label text-body-sm font-bold mb-2 opacity-0" style={{ color: '#64748B' }}>
          突破：汇聚三方力量实现成本突破
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {FORCES.map((f, i) => (
            <div key={i}
              className="pw-force rounded-xl border-2 p-3 md:p-4 flex flex-col opacity-0"
              style={{ borderColor: `${f.color}50`, backgroundColor: `${f.color}06` }}>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{f.icon}</span>
                <h3 className="text-body font-bold" style={{ color: f.color }}>{f.title}</h3>
              </div>

              <p className="text-body-sm text-[var(--text-primary)] font-semibold mb-2">{f.source}</p>

              <div className="space-y-1 flex-1">
                {f.details.map((d, j) => (
                  <div key={j}
                    className="rounded-md border px-2.5 py-1.5"
                    style={{ borderColor: `${f.color}20`, backgroundColor: `${f.color}05` }}>
                    <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Convergence: groups → challenge */}
      <div className="pw-groups flex items-center justify-center gap-3 md:gap-5 opacity-0">
        {GROUPS.map((g, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-0.5"
                style={{ backgroundColor: `${g.color}12` }}>
                <span className="text-lg">{g.icon}</span>
              </div>
              <span className="text-[9px] font-semibold text-[var(--text-secondary)] text-center whitespace-pre-line leading-tight"
                style={{ color: g.color }}>
                {g.label}
              </span>
            </div>
            {i < GROUPS.length - 1 && (
              <span className="text-body font-bold text-[var(--text-light)]">+</span>
            )}
          </React.Fragment>
        ))}
        <span className="text-body font-bold text-[var(--text-light)]">→</span>
        <span className="text-body-lg font-bold" style={{
          background: 'linear-gradient(135deg, #8B5CF6, #0891B2, #F97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          挑战更大的 Boss
        </span>
      </div>

      {/* Bottom quote */}
      <div className="pw-quote rounded-xl border-2 px-5 py-3 max-w-5xl w-full text-center mt-auto opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
        <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>
          成本叠加时间的可能性，即从消耗转化为投资
        </p>
        <p className="text-caption text-[var(--text-secondary)] mt-0.5">
          每个人都去完善场景的丰富度，而不是一个程序员独自开发其他人用
        </p>
      </div>
    </section>
  );
};

export default memo(Slide20_Future);
