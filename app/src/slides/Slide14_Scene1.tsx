import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrendingUp, Code, Wrench, CheckCircle, XCircle, Sparkles } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const STRATEGIES = [
  {
    title: '更强的模型底座',
    color: 'var(--success)',
    icon: TrendingUp,
    points: [
      '等待模型能力提升 → 确定性自然上升',
      '更好的外部工具 → 完备性水涨船高',
    ],
    summary: '让模型自己变强',
  },
  {
    title: '更多确定性的开发',
    color: 'var(--accent)',
    icon: Code,
    points: [
      '用代码固化关键流程 → 降低不确定性',
      '用测试覆盖边界情况 → 提升可靠性',
    ],
    summary: '用工程手段补齐模型短板',
  },
  {
    title: '更精准的经验沉淀',
    color: 'var(--primary)',
    icon: Wrench,
    points: [
      '充分表达需求边界：做什么、不做什么、做到什么程度',
      '精准定位偏差：不是"不够好"，而是"哪一步出了问题"',
    ],
    summary: '反馈越精确，迭代越高效',
  },
];

const SUITABLE = [
  { title: '高频重复场景（> 50 次）', desc: '便利性投入可摊销' },
  { title: '可接受 < 100% 确定性', desc: '确定性要求适度宽容' },
  { title: '有成熟系统工具辅助', desc: '确定性工具保障关键环节' },
  { title: '多变、难穷举的规则', desc: '完备性的灵活优势' },
];

const UNSUITABLE = [
  { title: '100% 确定性（金融 / 法务 / 权限）', desc: '确定性无法达标' },
  { title: '低频一次性任务', desc: '便利性投入无法摊销' },
  { title: '规则明确的固定流程', desc: '无需 AI 增加不确定度' },
  { title: '成本预算有限或要求高效率', desc: 'Token 消耗叠加，响应延迟显著' },
];

const Slide14_Scene1: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.scene-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.scene-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      if (phase === 0) {
        gsap.fromTo('.scene-strategy', { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out', delay: 0.4 });
        gsap.fromTo('.scene-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.0 });
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase === 0] });

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      if (phase === 1) {
        gsap.fromTo('.scene-phase1', { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        gsap.fromTo('.scene-suitable-card', { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, delay: 0.2 });
        gsap.fromTo('.scene-unsuitable-card', { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, delay: 0.2 });
        gsap.fromTo('.scene-quote', { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.7 });
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase === 1] });

  const handleClick = () => {
    setPhase(phase === 0 ? 1 : 0);
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={handleClick}>

      <h2 className="scene-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        怎么做好龙虾？
      </h2>
      <p className="scene-subtitle text-body text-[var(--text-secondary)] mb-5 max-w-xl text-center opacity-0">
        三个特性都高，需要三种投入
      </p>

      {phase === 0 && (
        <>
          {/* 3 strategy cards */}
          <div className="max-w-3xl w-full space-y-3">
            {STRATEGIES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i}
                  className="scene-strategy rounded-xl border-2 p-4 transition-all duration-300 opacity-0"
                  style={{
                    borderColor: s.color,
                    backgroundColor: `${s.color}06`,
                  }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                      <Icon size={16} />
                    </div>
                    <span className="text-body-sm font-bold" style={{ color: s.color }}>{s.title}</span>
                  </div>
                  <ul className="space-y-1.5 pl-11">
                    {s.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-caption text-[var(--text-secondary)]">
                        <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: s.color }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pl-11 mt-2">
                    <span className="text-caption font-bold" style={{ color: s.color }}>
                      {s.summary}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="scene-hint text-body text-[var(--text-light)] mt-5 opacity-0">
            点击查看适用与不适用场景 →
          </p>
        </>
      )}

      {phase === 1 && (
        <div className="scene-phase1 max-w-4xl w-full opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Suitable */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span className="text-body font-bold" style={{ color: 'var(--success)' }}>适合 OpenClaw</span>
              </div>
              <div className="space-y-2">
                {SUITABLE.map((s, i) => (
                  <div key={i}
                    className="scene-suitable-card rounded-lg border p-3 opacity-0"
                    style={{ borderColor: 'var(--success)40', backgroundColor: 'var(--success)05' }}>
                    <span className="text-caption font-bold text-[var(--text-primary)] block">{s.title}</span>
                    <p className="text-caption text-[var(--text-secondary)] mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Unsuitable */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle size={18} style={{ color: 'var(--accent)' }} />
                <span className="text-body font-bold" style={{ color: 'var(--accent)' }}>不适合 OpenClaw</span>
              </div>
              <div className="space-y-2">
                {UNSUITABLE.map((s, i) => (
                  <div key={i}
                    className="scene-unsuitable-card rounded-lg border p-3 opacity-0"
                    style={{ borderColor: 'var(--accent)40', backgroundColor: 'var(--accent)05' }}>
                    <span className="text-caption font-bold text-[var(--text-primary)] block">{s.title}</span>
                    <p className="text-caption text-[var(--text-secondary)] mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom quote */}
          <div className="scene-quote rounded-xl border-2 p-4 mt-5 text-center opacity-0"
            style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)08' }}>
            <Sparkles size={18} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
            <p className="text-body font-bold text-[var(--primary)]">
              "Agent 的上限取决于你的耐心和标准。你愿意投入多少调教，它就能达到多少水平。"
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击查看适用场景' : '点击返回'}
      </div>
    </section>
  );
};

export default memo(Slide14_Scene1);
