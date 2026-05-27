import React, { useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const EVOLUTION_LINES = [
  {
    id: 'input',
    label: '输入 / 理解偏差',
    color: 'var(--primary)',
    rawColor: '#3B82F6',
    nodes: [
      { name: '提示词(Prompt)', tooltip: '手工填写专业知识' },
      { name: '知识库检索(RAG)', tooltip: '专业知识自动检索载入' },
      { name: 'Skills', tooltip: '渐进式沉淀业务知识' },
    ],
    subtitle: '业务知识精准查询，自动输入',
  },
  {
    id: 'process',
    label: '处理 / 信息遗漏',
    color: 'var(--accent)',
    rawColor: '#F59E0B',
    nodes: [
      { name: '函数调用(Function Call)', tooltip: '给出计算方法' },
      { name: '工具协议(MCP)', tooltip: '给出已有系统工具' },
      { name: 'Skills', tooltip: '加载方式减少长度，自带工具处理问题' },
    ],
    subtitle: '已有工具代替模型处理',
  },
  {
    id: 'output',
    label: '输出 / 结果失控',
    color: 'var(--success)',
    rawColor: '#10B981',
    nodes: [
      { name: '提示词工程(Prompt Engineering)', tooltip: '背景、角色、职责、要求、示例，约束输出' },
      { name: '工作流(Workflow)', tooltip: '固化流程保证过程可控' },
      { name: '智能体(ReAct)', tooltip: '自动思考，自动执行，自动纠正' },
      { name: 'Harness Engineering', tooltip: '更主动，更懂你，更可控，更聪明' },
    ],
    subtitle: '流程把控，实时校验',
  },
];

const Slide11_EvolutionLines: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTooltip, setHoveredTooltip] = useState<{ text: string; rect: DOMRect } | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Title
      tl.fromTo('.el-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });

      // Timeline arrow
      tl.fromTo('.el-timeline', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3);

      // Each evolution line animates from left to right
      EVOLUTION_LINES.forEach((line, lineIndex) => {
        const delay = 0.4 + lineIndex * 0.35;
        tl.fromTo(`.el-line-${line.id}`, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, delay);

        // Animate each node
        line.nodes.forEach((_, nodeIndex) => {
          tl.fromTo(`.el-node-${line.id}-${nodeIndex}`, { opacity: 0, scale: 0.5 }, {
            opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)',
          }, delay + 0.15 + nodeIndex * 0.12);
        });

        // Animate the trailing dots
        tl.fromTo(`.el-dots-${line.id}`, { opacity: 0 }, { opacity: 1, duration: 0.5 }, delay + 0.15 + line.nodes.length * 0.12 + 0.1);
      });

      // Bottom insight cards
      tl.fromTo('.el-insight-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 2.0);
      tl.fromTo('.el-insight-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 2.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const handleMouseEnter = (e: React.MouseEvent, tooltip: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredTooltip({ text: tooltip, rect });
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="el-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-3 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        装备演进三条线
      </h2>

      {/* Timeline arrow — full width, aligned with content */}
      <div className="el-timeline relative w-full max-w-6xl mb-5 opacity-0 h-5">
        {/* Long arrow line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px]" style={{
          background: 'linear-gradient(to right, var(--primary) 0%, var(--accent) 60%, var(--success) 100%)',
        }} />
        {/* Arrow head at right end */}
        <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0 h-0" style={{
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '8px solid var(--success)',
        }} />
        {/* 2023 label — left end */}
        <span className="absolute left-0 top-full mt-0.5 text-caption text-[var(--text-secondary)] whitespace-nowrap">2023 AI元年</span>
        {/* 2025 label — ~60% */}
        <span className="absolute left-[60%] top-full mt-0.5 text-caption text-[var(--text-secondary)] whitespace-nowrap -translate-x-1/2">2025 Agent元年</span>
        {/* Today label — right end */}
        <span className="absolute right-0 top-full mt-0.5 text-caption font-bold text-[var(--text-primary)] whitespace-nowrap">今天 ···</span>
      </div>

      {/* Tooltip */}
      {hoveredTooltip && (
        <div
          className="fixed z-50 pointer-events-none rounded-lg px-4 py-2 shadow-lg max-w-xs"
          style={{
            top: hoveredTooltip.rect.top - 44,
            left: hoveredTooltip.rect.left + hoveredTooltip.rect.width / 2,
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            fontSize: '13px',
            lineHeight: '1.5',
          }}
        >
          {hoveredTooltip.text}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid var(--text-primary)',
            }}
          />
        </div>
      )}

      {/* Evolution lines */}
      <div className="max-w-6xl w-full space-y-6">
        {EVOLUTION_LINES.map((line) => (
          <div key={line.id} className={`el-line-${line.id} opacity-0`}>
            {/* Line label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-body font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: line.rawColor }}>
                {line.label}
              </span>
              <span className="text-body-sm text-[var(--text-secondary)]">{line.subtitle}</span>
            </div>

            {/* Nodes and connectors */}
            <div className="flex items-center gap-0 pl-2 overflow-x-auto">
              {line.nodes.map((node, nodeIndex) => (
                <React.Fragment key={nodeIndex}>
                  {/* Connector arrow */}
                  {nodeIndex > 0 && (
                    <svg width="40" height="20" className="flex-shrink-0 -mx-1">
                      <line x1="0" y1="10" x2="40" y2="10"
                        stroke={line.rawColor} strokeWidth="2" />
                      <polygon points="35,6 40,10 35,14" fill={line.rawColor} />
                    </svg>
                  )}
                  {/* Node with tooltip */}
                  <div
                    className={`el-node-${line.id}-${nodeIndex} flex items-center gap-2 px-4 py-2 rounded-lg border-2 opacity-0 cursor-default transition-shadow duration-200 hover:shadow-md`}
                    style={{ borderColor: line.rawColor, backgroundColor: `${line.rawColor}10` }}
                    onMouseEnter={(e) => handleMouseEnter(e, node.tooltip)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                  >
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: line.rawColor }} />
                    <span className="text-body-sm font-bold whitespace-nowrap" style={{ color: line.rawColor }}>{node.name}</span>
                  </div>
                </React.Fragment>
              ))}

              {/* Arrow + trailing dots */}
              <svg width="50" height="20" className="flex-shrink-0">
                <line x1="0" y1="10" x2="30" y2="10" stroke={line.rawColor} strokeWidth="2" />
                <polygon points="25,6 30,10 25,14" fill={line.rawColor} />
              </svg>
              <span className={`el-dots-${line.id} text-h2 font-bold tracking-widest opacity-0`}
                style={{ color: line.rawColor }}>
                ···
              </span>
            </div>
          </div>
        ))}

        {/* Core insight: two cards side by side */}
        <div className="flex justify-center gap-6 mt-8">
          <div className="el-insight-1 rounded-xl border-2 px-6 py-4 max-w-md text-center opacity-0"
            style={{ borderColor: '#F97316', backgroundColor: '#F9731615' }}>
            <p className="text-h3 font-bold" style={{ color: '#F97316' }}>Skills — 复用</p>
            <p className="text-body-sm text-[var(--text-secondary)] mt-2">
              复用业务知识与经验，降低模型的<br /><span className="font-bold text-[var(--text-primary)]">操作成本</span>与<span className="font-bold text-[var(--text-primary)]">开发成本</span>
            </p>
          </div>
          <div className="el-insight-2 rounded-xl border-2 px-6 py-4 max-w-md text-center opacity-0"
            style={{ borderColor: '#F97316', backgroundColor: '#F9731615' }}>
            <p className="text-h3 font-bold" style={{ color: '#F97316' }}>Harness — 积累</p>
            <p className="text-body-sm text-[var(--text-secondary)] mt-2">
              积累行业实践经验，降低工程化的<br /><span className="font-bold text-[var(--text-primary)]">开发成本</span>与<span className="font-bold text-[var(--text-primary)]">确认成本</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide11_EvolutionLines);
