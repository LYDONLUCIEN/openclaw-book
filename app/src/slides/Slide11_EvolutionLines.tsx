import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const EVOLUTION_LINES = [
  {
    id: 'input',
    label: '输入/便利性',
    color: 'var(--primary)',
    rawColor: '#3B82F6',
    nodes: ['提示词', 'RAG', 'Skills'],
    subtitle: '逐步解决输入不确定性',
  },
  {
    id: 'process',
    label: '处理/完备性',
    color: 'var(--accent)',
    rawColor: '#F59E0B',
    nodes: ['Function Call', 'MCP', 'Skills'],
    subtitle: '逐步解决处理不确定性',
  },
  {
    id: 'output',
    label: '输出/确定性',
    color: 'var(--success)',
    rawColor: '#10B981',
    nodes: ['Prompt Eng', 'Workflow', 'ReAct', 'Harness'],
    subtitle: '逐步解决输出不确定性',
  },
];

const Slide11_EvolutionLines: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Title
      tl.fromTo('.el-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });

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
      });

      // Convergence box
      tl.fromTo('.el-converge', { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)',
      }, 1.8);

      // Bottom note
      tl.fromTo('.el-note', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 2.1);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="el-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-8 opacity-0">
        装备演进三条线
      </h2>

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
                  {/* Node */}
                  <div className={`el-node-${line.id}-${nodeIndex} flex items-center gap-2 px-4 py-2 rounded-lg border-2 opacity-0`}
                    style={{ borderColor: line.rawColor, backgroundColor: `${line.rawColor}10` }}>
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: line.rawColor }} />
                    <span className="text-body-sm font-bold whitespace-nowrap" style={{ color: line.rawColor }}>{node}</span>
                  </div>
                </React.Fragment>
              ))}

              {/* Arrow pointing to convergence */}
              <svg width="50" height="20" className="flex-shrink-0">
                <line x1="0" y1="10" x2="40" y2="10" stroke={line.rawColor} strokeWidth="2" />
                <polygon points="35,6 40,10 35,14" fill={line.rawColor} />
              </svg>
            </div>
          </div>
        ))}

        {/* Convergence box */}
        <div className="el-converge flex justify-center opacity-0">
          <div className="rounded-xl border-2 px-10 py-5 text-center"
            style={{ borderColor: '#F97316', backgroundColor: '#F9731615', boxShadow: '0 0 25px #F9731620' }}>
            <p className="text-h2 font-bold" style={{ color: '#F97316' }}>Skills + Harness</p>
            <p className="text-body-sm text-[var(--text-secondary)] mt-2">龙虾两大核心技术</p>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="el-note mt-8 text-center opacity-0">
        <p className="text-body font-semibold" style={{ color: '#F97316' }}>
          所有演进路径的终点 = 龙虾两大核心技术
        </p>
      </div>
    </section>
  );
};

export default memo(Slide11_EvolutionLines);
