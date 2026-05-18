import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageSquare, Wrench, AlertTriangle } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide07_ActionProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v1-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v1-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v1-card', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, delay: 0.4 });
      gsap.fromTo('.v1-limit', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const tools = [
    {
      name: 'Prompt 提示词',
      icon: MessageSquare,
      color: '#10B981',
      tier: '绿装',
      solves: '描述意图 + 提供知识背景',
      how: '用自然语言把需求、知识、指令都写进上下文',
      problem: 'Prompt 不能无限长，知识写不全，指令描述不精确',
    },
    {
      name: 'Function-call',
      icon: Wrench,
      color: '#10B981',
      tier: '绿装',
      solves: '让 AI 调用确定性工具',
      how: '定义工具接口，AI 按需调用，计算和查询交给系统',
      problem: '工具不能都写在提示词里，工具多了 AI 也会混乱',
    },
  ];

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v1-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v1.0 人工教学</h2>
        <span className="v1-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#10B981' }}>绿装</span>
      </div>
      <p className="text-body text-[var(--text-secondary)] mb-5 max-w-lg text-center">
        最朴素的方式：用 Prompt 描述意图和知识，用 Function-call 补充工具能力
      </p>

      <div className="max-w-2xl w-full space-y-3">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          const isExp = expanded === i;
          return (
            <div key={i}
              className={`v1-card rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${isExp ? 'ring-1' : ''}`}
              style={{ borderColor: tool.color, backgroundColor: isExp ? `${tool.color}08` : `${tool.color}04` }}
              onClick={(e) => { e.stopPropagation(); setExpanded(isExp ? null : i); }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body font-bold" style={{ color: tool.color }}>{tool.name}</span>
                    <span className="text-caption px-1.5 rounded" style={{ backgroundColor: `${tool.color}12`, color: tool.color }}>{tool.tier}</span>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)] mt-0.5">解决：{tool.solves}</p>
                </div>
              </div>
              {isExp && (
                <div className="mt-3 ml-13 pl-2 border-l-2" style={{ borderColor: `${tool.color}30` }}>
                  <p className="text-caption text-[var(--text-secondary)]"><span className="font-bold">做法：</span>{tool.how}</p>
                  <div className="flex items-start gap-1 mt-1.5">
                    <AlertTriangle size={12} style={{ color: 'var(--accent)' }} className="shrink-0 mt-0.5" />
                    <p className="text-caption" style={{ color: 'var(--accent)' }}>{tool.problem}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="v1-limit max-w-xl w-full mt-5 rounded-xl border-2 p-4 text-center" style={{ borderColor: 'var(--accent)30', backgroundColor: 'var(--accent)05' }}>
        <p className="text-body-sm text-[var(--text-primary)]">
          <span className="font-bold" style={{ color: 'var(--accent)' }}>v1.0 的局限：</span>
          Prompt 不能无限长，Function-call 不能都写在提示词里。<br />
          <span className="text-[var(--text-secondary)]">→ 如何更精准、更高效地获取知识和结果？</span>
        </p>
      </div>
    </section>
  );
};

export default memo(Slide07_ActionProblem);
