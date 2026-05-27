import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const HARNESS_MODULES = [
  { icon: '🔌', tag: '更方便', name: 'Channel', desc: '接入日常办公软件，使用更方便', color: '#3B82F6' },
  { icon: '⏰', tag: '更主动', name: 'Scheduler', desc: '定时调度与任务编排，主动推进工作', color: '#10B981' },
  { icon: '🚪', tag: '更可控', name: 'Gateway', desc: '流量管控与安全审计，执行过程可控', color: '#8B5CF6' },
  { icon: '💓', tag: '更稳定', name: 'Heartbeat', desc: '心跳检测与自动恢复，保障长时稳定', color: '#F59E0B' },
];

const KNOWLEDGE_ITEMS = [
  { icon: '📚', tag: '更博学', name: 'Skills', desc: '按需加载领域知识与业务能力', color: '#3B82F6' },
  { icon: '🧠', tag: '更懂你', name: 'Memory', desc: '持久化记忆用户偏好与历史上下文', color: '#EC4899' },
  { icon: '🔗', tag: '更清晰', name: '上下文加载', desc: '渐进式上下文管理，信息分层注入', color: '#8B5CF6' },
];

const Slide12_SkillsHarness: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo('.sh-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });

      // Left column (Harness)
      tl.fromTo('.sh-left', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.sh-harness-item', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }, 0.5);

      // Right column (Knowledge)
      tl.fromTo('.sh-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.sh-knowledge-item', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }, 0.6);

      // Quote
      tl.fromTo('.sh-quote', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2);

      // Bottom
      tl.fromTo('.sh-bottom', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="sh-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-5 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
Harness工程:众人智慧 共驭模型
      </h2>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Harness 工程体系 */}
        <div className="sh-left rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🛠</span>
            <h3 className="text-h3 font-bold" style={{ color: '#F97316' }}>流程体验优化</h3>
          </div>

          <div className="space-y-2.5">
            {HARNESS_MODULES.map((mod) => (
              <div key={mod.name}
                className="sh-harness-item rounded-lg border-2 px-3 py-2.5 flex items-center gap-3 opacity-0"
                style={{ borderColor: `${mod.color}40`, backgroundColor: `${mod.color}08` }}>
                <span className="text-xl shrink-0">{mod.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-body-sm font-bold text-[var(--text-primary)]">{mod.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: `${mod.color}18`, color: mod.color }}>{mod.tag}</span>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)]">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 知识经验载入 */}
        <div className="sh-right rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📦</span>
            <h3 className="text-h3 font-bold" style={{ color: '#F97316' }}>知识经验载入</h3>
          </div>

          <div className="space-y-2.5">
            {KNOWLEDGE_ITEMS.map((item) => (
              <div key={item.name}
                className="sh-knowledge-item rounded-lg border-2 px-3 py-2.5 flex items-center gap-3 opacity-0"
                style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}08` }}>
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-body-sm font-bold text-[var(--text-primary)]">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: `${item.color}18`, color: item.color }}>{item.tag}</span>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OpenClaw golden quote */}
      <div className="sh-quote mt-5 rounded-xl border-2 px-6 py-3 text-center max-w-4xl w-full opacity-0"
        style={{ borderColor: '#F9731640', backgroundColor: '#F973160A' }}>
        <p className="text-body font-bold" style={{ color: '#F97316' }}>
          Openclaw: 用工程手段<span style={{ color: '#EF4444', textShadow: '0 0 8px #EF444466' }}>众包开发成本</span>——让每个使用者以极低门槛参与，在社区中深度沉淀与持续迭代
        </p>
      </div>

      {/* Bottom summary */}
      <div className="sh-bottom mt-auto pt-4 rounded-xl border-2 px-6 py-3 text-center opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F9731610' }}>
        <p className="text-body font-bold" style={{ color: '#F97316' }}>
          Skills解决"AI知道什么"，Harness解决"如何稳定执行"
        </p>
      </div>
    </section>
  );
};

export default memo(Slide12_SkillsHarness);
