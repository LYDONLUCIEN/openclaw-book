import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Layers, Cpu, Wrench } from 'lucide-react';

interface SlideProps { isActive: boolean }

const PILLARS = [
  {
    icon: Layers,
    title: 'Skills 技能库',
    desc: '技能标准化封装，渐进式加载，按需调用降低 Token 消耗',
    detail: '将知识、工具、API 以标准化接口封装为可复用技能单元，支持运行时动态加载与卸载，实现资源按需分配，显著降低单次推理的 Token 开销与延迟。',
    color: '#F97316',
  },
  {
    icon: Cpu,
    title: '大模型引擎',
    desc: '核心推理引擎，自然语言理解与生成',
    detail: '作为智能体的认知中枢，负责意图解析、多步推理、上下文关联与内容生成。模型能力直接决定 Agent 的理解深度与输出质量，是整个架构的性能瓶颈与核心价值所在。',
    color: '#8B5CF6',
  },
  {
    icon: Wrench,
    title: 'Harness 工程框架',
    desc: '工程化控制层：记忆/调度/监控/隔离，保障系统稳定性',
    detail: '提供运行时基础设施，包括短期/长期记忆管理、任务调度与编排、执行监控与异常恢复、资源隔离与权限管控，确保 Agent 在复杂场景下的可靠性与可控性。',
    color: '#F97316',
  },
];

const Slide05_CoreTech: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-title', { opacity: 0, y: -25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.ct-note', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.ct-pillar', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.3)', delay: 0.4 });
      gsap.fromTo('.ct-bottom', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.9 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="ct-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0">
        🦞 龙虾的核心技术拆解
      </h2>

      {/* Top note */}
      <div className="ct-note mb-8 opacity-0">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <span className="text-body-sm text-[var(--text-secondary)]">
            架构复杂，聚焦三项核心技术：技能封装 · 推理引擎 · 工程框架
          </span>
        </div>
      </div>

      {/* Three pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="ct-pillar rounded-xl border-2 p-6 opacity-0"
              style={{ borderColor: p.color, backgroundColor: `${p.color}06` }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${p.color}15` }}>
                <Icon size={32} style={{ color: p.color }} />
              </div>
              <h3 className="text-h3 font-bold mb-3 text-center" style={{ color: p.color }}>{p.title}</h3>
              <p className="text-body-sm text-[var(--text-secondary)] mb-3 text-center leading-relaxed">{p.desc}</p>
              <p className="text-caption text-[var(--text-light)] leading-relaxed">{p.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="ct-bottom mt-8 text-center opacity-0">
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <span className="text-body font-bold text-[var(--text-primary)]">
            从裸体大模型开始，逐步穿装备 —— 逐层叠加工程能力
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide05_CoreTech);
