import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Zap, Cable, AlertTriangle } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide09_OpenClawArch: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v3-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v3-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v3-flow', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.4 });
      gsap.fromTo('.v3-limit', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v3-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v3.0 自主调度</h2>
        <span className="v3-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#8B5CF6' }}>紫装</span>
      </div>
      <p className="text-body text-[var(--text-secondary)] mb-6 max-w-lg text-center">
        v2.0 每个场景都要手动开发 Workflow。v3.0 让 AI 自己选择、决策、调度
      </p>

      <div className="max-w-2xl w-full">
        {/* ReAct Flow */}
        <div className="v3-flow rounded-xl border-2 p-5 mb-4 opacity-0" style={{ borderColor: '#8B5CF6', backgroundColor: '#8B5CF608' }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={20} style={{ color: '#8B5CF6' }} />
            <span className="text-body font-bold" style={{ color: '#8B5CF6' }}>ReAct 范式</span>
            <span className="text-caption px-1.5 rounded" style={{ backgroundColor: '#8B5CF612', color: '#8B5CF6' }}>紫装</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            {['🤔 思考', '🔧 行动', '👀 观察'].map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-[var(--text-light)]">→</span>}
                <span className="px-3 py-1.5 rounded-lg text-body-sm font-semibold" style={{ backgroundColor: '#8B5CF610' }}>{step}</span>
              </React.Fragment>
            ))}
            <span className="text-[var(--text-light)]">→</span>
            <span className="px-3 py-1.5 rounded-lg text-body-sm font-semibold" style={{ backgroundColor: '#8B5CF610' }}>🔁 循环</span>
          </div>
          <p className="text-caption text-[var(--text-secondary)] text-center">
            AI 自主规划步骤、选择工具、执行操作、观察结果，循环直到完成
          </p>
        </div>

        {/* MCP */}
        <div className="v3-flow rounded-xl border-2 p-5 mb-4 opacity-0" style={{ borderColor: '#8B5CF6', backgroundColor: '#8B5CF608' }}>
          <div className="flex items-center gap-2 mb-3">
            <Cable size={20} style={{ color: '#8B5CF6' }} />
            <span className="text-body font-bold" style={{ color: '#8B5CF6' }}>MCP 模型上下文协议</span>
            <span className="text-caption px-1.5 rounded" style={{ backgroundColor: '#8B5CF612', color: '#8B5CF6' }}>紫装</span>
          </div>
          <p className="text-body-sm text-[var(--text-secondary)]">
            标准化了 AI 调用外部工具的协议。就像 USB-C 接口——所有工具用统一的方式接入，AI 不需要为每个工具单独适配。
          </p>
        </div>

        {/* Benefits */}
        <div className="v3-flow rounded-xl border p-4 mb-4 opacity-0" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <p className="text-body-sm font-bold text-[var(--text-primary)] mb-2">v3.0 的进步</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5 text-caption">
              <span className="text-[var(--success)]">✓</span>
              <span className="text-[var(--text-secondary)]">AI 自主选择工具和策略</span>
            </div>
            <div className="flex items-center gap-1.5 text-caption">
              <span className="text-[var(--success)]">✓</span>
              <span className="text-[var(--text-secondary)]">不用每个场景单独开发</span>
            </div>
            <div className="flex items-center gap-1.5 text-caption">
              <span className="text-[var(--success)]">✓</span>
              <span className="text-[var(--text-secondary)]">更灵活，覆盖更多场景</span>
            </div>
            <div className="flex items-center gap-1.5 text-caption">
              <span className="text-[var(--success)]">✓</span>
              <span className="text-[var(--text-secondary)]">降低了开发成本</span>
            </div>
          </div>
        </div>

        <div className="v3-limit max-w-xl w-full rounded-xl border-2 p-4 text-center" style={{ borderColor: 'var(--accent)30', backgroundColor: 'var(--accent)05' }}>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <AlertTriangle size={14} style={{ color: 'var(--accent)' }} />
            <span className="text-body-sm font-bold" style={{ color: 'var(--accent)' }}>v3.0 的局限</span>
          </div>
          <p className="text-body-sm text-[var(--text-primary)]">
            AI 自主决策带来了<strong>更多不确定性</strong>。且上下文越长，注意力稀释越严重。<br />
            <span className="text-[var(--text-secondary)]">→ 怎么在保持灵活性的同时控制不确定性？</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide09_OpenClawArch);
