import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Search, GitBranch } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide08_ReAct: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v2-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v2-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v2-card', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, delay: 0.4 });
      gsap.fromTo('.v2-limit', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const tools = [
    {
      name: 'RAG 检索增强',
      icon: Search,
      color: '#3B82F6',
      tier: '蓝装',
      solves: '按需加载知识，不用全记住',
      how: '把知识存入向量库，AI 需要时检索相关片段，精准注入上下文',
      benefit: '减少了 Prompt 长度，知识更精准',
    },
    {
      name: 'Workflow 工作流',
      icon: GitBranch,
      color: '#3B82F6',
      tier: '蓝装',
      solves: '用代码代替描述，增加处理确定性',
      how: '把标准流程固化为节点图，AI 按流程执行，减少随机性',
      benefit: '流程确定性强，输出可控',
    },
  ];

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v2-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v2.0 流程标准化</h2>
        <span className="v2-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#3B82F6' }}>蓝装</span>
      </div>
      <p className="text-body text-[var(--text-secondary)] mb-5 max-w-lg text-center">
        v1.0 知识和工具都靠 Prompt 塞进去，太粗糙。v2.0 用 RAG 按需加载 + Workflow 固化流程
      </p>

      <div className="max-w-2xl w-full space-y-3">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          const isExp = expanded === i;
          return (
            <div key={i}
              className={`v2-card rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${isExp ? 'ring-1' : ''}`}
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
                  <p className="text-caption mt-1"><span className="font-bold" style={{ color: tool.color }}>效果：</span>{tool.benefit}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="v2-limit max-w-xl w-full mt-5 rounded-xl border-2 p-4 text-center" style={{ borderColor: 'var(--accent)30', backgroundColor: 'var(--accent)05' }}>
        <p className="text-body-sm text-[var(--text-primary)]">
          <span className="font-bold" style={{ color: 'var(--accent)' }}>v2.0 的局限：</span>
          Workflow 效果不错，但开发成本高、局限性大——每个场景都要单独开发。<br />
          <span className="text-[var(--text-secondary)]">→ 能不能让 AI 自己选择和调度？</span>
        </p>
      </div>
    </section>
  );
};

export default memo(Slide08_ReAct);
