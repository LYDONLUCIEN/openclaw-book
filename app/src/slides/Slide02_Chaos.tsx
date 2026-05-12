import React, { useRef, memo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const TAGS = [
  // 记忆问题组 (蓝)
  { text: '上下文窗口', group: 0 }, { text: '注意力稀释', group: 0 }, { text: '渐进式披露', group: 0 }, { text: 'Harness', group: 0 }, { text: '压缩', group: 0 }, { text: 'Fine-tuning', group: 0 },
  // 知识问题组 (绿)
  { text: 'RAG', group: 1 }, { text: '知识图谱', group: 1 }, { text: 'Skills', group: 1 }, { text: 'Vector DB', group: 1 }, { text: 'Embedding', group: 1 }, { text: 'Prompt', group: 1 },
  // 行动问题组 (橙)
  { text: 'MCP', group: 2 }, { text: 'Tools', group: 2 }, { text: '工作流', group: 2 }, { text: 'API', group: 2 }, { text: '自动化', group: 2 }, { text: 'ReAct', group: 2 },
];
const EXTRA = ['LLM', 'Agent', 'Coze', 'Dify', 'n8n', 'Claude Code', 'OpenClaw', 'Hermes', 'FastGPT', 'AutoGPT', 'Manus', 'Copilot', 'Vibe Coding'];
const GROUP_COLORS = ['var(--primary)', 'var(--success)', 'var(--accent)'];
const GROUP_LABELS = ['🔵 记忆问题', '🟢 知识问题', '🟠 行动问题'];

const Slide02_Chaos: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tags = containerRef.current!.querySelectorAll('.chaos-tag');
      gsap.set(tags, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ delay: 0.3 });
      // Phase 1: tags fly in randomly
      tl.to(tags, { opacity: 1, scale: 1, duration: 0.4, stagger: { each: 0.03, from: 'random' }, ease: 'back.out(2)' });

      // Phase 2: after 3s, converge
      tl.to({}, { duration: 2, onComplete: () => setPhase(1) });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useEffect(() => {
    if (phase !== 1 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const groups = containerRef.current!.querySelectorAll('[data-group]');
      groups.forEach((el) => {
        const g = parseInt((el as HTMLElement).dataset.group || '0');
        const row = g;
        gsap.to(el, { x: 0, y: row * 70, duration: 0.8, ease: 'power3.out', delay: g * 0.15 });
      });
      gsap.fromTo('.chaos-title', { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.chaos-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.2 });
      gsap.fromTo('.chaos-group-label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.2, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, [phase]);

  const allTags = [...TAGS.map(t => ({ ...t, isExtra: false })), ...EXTRA.map(t => ({ text: t, group: -1, isExtra: true }))];

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {phase === 0 && allTags.map((tag, i) => {
        const x = (Math.random() - 0.5) * 80;
        const y = (Math.random() - 0.5) * 60;
        const rot = (Math.random() - 0.5) * 30;
        return (
          <span key={i} className="chaos-tag absolute px-3 py-1.5 rounded-full text-caption font-semibold border whitespace-nowrap" style={{
            left: `${45 + x}%`, top: `${40 + y}%`, transform: `rotate(${rot}deg)`,
            borderColor: tag.isExtra ? 'var(--border)' : GROUP_COLORS[tag.group],
            color: tag.isExtra ? 'var(--text-light)' : GROUP_COLORS[tag.group],
            backgroundColor: tag.isExtra ? 'var(--bg-secondary)' : `${GROUP_COLORS[tag.group]}10`,
          }}>
            {tag.text}
          </span>
        );
      })}

      {phase === 1 && (
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="chaos-title text-h1 font-bold text-[var(--text-primary)] mb-3 opacity-0">
            这些概念，到底是什么关系？
          </h2>
          <p className="chaos-subtitle text-body text-[var(--text-secondary)] mb-8 opacity-0">
            看起来很乱，但其实都在解决大模型的三个核心问题
          </p>
          <div className="flex flex-col gap-5 max-w-2xl mx-auto">
            {[0, 1, 2].map(g => (
              <div key={g} className="flex items-center gap-4">
                <span className="chaos-group-label text-body font-bold min-w-[100px] text-left opacity-0" style={{ color: GROUP_COLORS[g] }}>{GROUP_LABELS[g]}</span>
                <div className="flex flex-wrap gap-2">
                  {TAGS.filter(t => t.group === g).map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-caption font-semibold border" style={{ borderColor: GROUP_COLORS[g], color: GROUP_COLORS[g], backgroundColor: `${GROUP_COLORS[g]}10` }}>
                      {t.text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Slide02_Chaos);
