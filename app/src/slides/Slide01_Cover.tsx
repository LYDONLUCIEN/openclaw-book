import React, { useRef, memo, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HelpCircle, Cpu, Sparkles, Brain, Bot, Code2, Wrench, MessageSquare, BookOpen, Layers, Zap, Search, Database, GitBranch, Terminal, Puzzle, Eye } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const TAGS = [
  { text: 'Skill', icon: Puzzle },
  { text: 'Agent', icon: Bot },
  { text: 'ReAct', icon: Zap },
  { text: 'Function Call', icon: GitBranch },
  { text: 'RAG', icon: Search },
  { text: 'Workflow', icon: Layers },
  { text: 'MCP', icon: Wrench },
  { text: 'Harness Eng.', icon: Wrench },
  { text: 'Prompt', icon: MessageSquare },
  { text: 'OpenClaw', icon: Code2 },
  { text: 'Hermes Agent', icon: Sparkles },
  { text: 'Claude Code', icon: Terminal },
  { text: 'Fine-tuning', icon: Cpu },
  { text: 'Embedding', icon: Layers },
  { text: 'Vector DB', icon: Database },
  { text: 'AutoGPT', icon: Bot },
  { text: 'Coze', icon: Layers },
  { text: 'Dify', icon: Layers },
  { text: 'Manus', icon: Eye },
  { text: 'Copilot', icon: Cpu },
  { text: 'AI Model', icon: Brain },
  { text: 'Few-shot', icon: BookOpen },
  { text: 'Tool Use', icon: Wrench },
  { text: 'Vibe Coding', icon: Sparkles },
];

const COLORS = [
  'var(--primary)', 'var(--accent)', 'var(--secondary)',
  'var(--success)', 'var(--text-secondary)', '#8B5CF6', '#EC4899',
];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const QUESTIONS = [
  { q: 'Skill、Agent、ReAct、Function Call、Harness Eng…\n这些到底都是什么？', sub: '感觉每个都在说不同的东西' },
  { q: 'OpenClaw 是什么？', sub: '为什么大家都在讨论它？' },
  { q: '为什么网上铺天盖地，我却完全用不起来 OpenClaw？', sub: '配置了半天，效果还不如手写代码' },
];

const Slide01_Cover: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  const tagPositions = useMemo(() =>
    TAGS.map((_, i) => ({
      x: (seededRandom(i * 7 + 1) - 0.5) * 78,
      y: (seededRandom(i * 13 + 3) - 0.5) * 62,
      rot: (seededRandom(i * 11 + 5) - 0.5) * 28,
      scale: 0.7 + seededRandom(i * 17 + 7) * 0.5,
    })),
  []);

  // Phase 0: tags fly in
  useGSAP(() => {
    if (!isActive || phase !== 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tags = containerRef.current!.querySelectorAll('.chaos-tag');
      gsap.set(tags, { opacity: 0, scale: 0.3 });
      gsap.to(tags, {
        opacity: 0.6,
        scale: (i: number) => tagPositions[i]?.scale || 1,
        duration: 0.5,
        stagger: { each: 0.03, from: 'random' },
        ease: 'back.out(2)',
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  // Phase 1: questions animate in
  useGSAP(() => {
    if (!isActive || phase !== 1 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.q-card', { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  const handleClick = () => {
    setPhase(phase < 1 ? phase + 1 : 0);
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={handleClick}>

      {/* Background tags (always rendered, fade with phase) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${phase === 0 ? 'opacity-100' : 'opacity-[0.06]'}`}>
        {TAGS.map((tag, i) => {
          const pos = tagPositions[i];
          const color = COLORS[i % COLORS.length];
          const Icon = tag.icon;
          return (
            <span key={i}
              className="chaos-tag absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold border whitespace-nowrap"
              style={{
                left: `${45 + pos.x}%`, top: `${42 + pos.y}%`,
                borderColor: color, color: color, backgroundColor: 'var(--bg-secondary)',
              }}>
              <Icon size={14} strokeWidth={2} />
              {tag.text}
            </span>
          );
        })}
      </div>

      {/* Phase 0: Prompt */}
      {phase === 0 && (
        <div className="relative z-10 text-center">
          <h2 className="text-h1 font-bold text-[var(--text-primary)] mb-3">
            你可能听过这些名词……
          </h2>
          <p className="text-body text-[var(--text-light)] animate-pulse">
            点击提出你的疑问 →
          </p>
        </div>
      )}

      {/* Phase 1: Three Questions */}
      {phase === 1 && (
        <div className="relative z-10 max-w-2xl w-full space-y-4">
          <div className="text-center mb-6">
            <HelpCircle className="w-12 h-12 mx-auto mb-3 text-[var(--accent)]" strokeWidth={1.5} />
            <h2 className="text-h2 font-bold text-[var(--text-primary)]">你可能正面临这些问题</h2>
          </div>

          {QUESTIONS.map((item, i) => (
            <div key={i} className="q-card rounded-xl border-2 p-5 opacity-0"
              style={{
                borderColor: i === 0 ? 'var(--primary)' : i === 1 ? 'var(--accent)' : 'var(--secondary)',
                backgroundColor: i === 0 ? 'var(--primary)06' : i === 1 ? 'var(--accent)06' : 'var(--secondary)06',
              }}>
              <h3 className="text-body font-bold text-[var(--text-primary)] leading-relaxed">
                {item.q.split('\n').map((line, j) => (
                  <span key={j}>{j > 0 && <br />}{line}</span>
                ))}
              </h3>
              <p className="text-caption text-[var(--text-secondary)] mt-1">{item.sub}</p>
            </div>
          ))}

          <p className="text-body text-[var(--text-light)] text-center mt-4 animate-pulse">
            接下来，让我们逐一回答 →
          </p>
        </div>
      )}

      {/* Bottom hint */}
      <div className="absolute bottom-8 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击任意处继续' : '点击重置'}
      </div>
    </section>
  );
};

export default memo(Slide01_Cover);
