import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const SKILLS_ITEMS = [
  '社区驱动的技能包仓库',
  '业务知识与流程的标准化封装',
  '渐进式加载：仅注入名称与摘要，调用时按需加载完整定义',
  '推荐仓库：OpenClaw Official / Community Hub',
];

const HARNESS_ITEMS = [
  { icon: '🧠', title: '记忆', desc: 'Markdown持久化 + SQLite索引，跨会话知识保持' },
  { icon: '⏰', title: '调度', desc: 'Cron任务 + JSON持久化，支持失败重试与退避' },
  { icon: '💓', title: '监控', desc: '心跳检测 + 自动恢复，保障长时运行稳定性' },
  { icon: '🔒', title: '安全', desc: '沙箱隔离 + 权限管控，环境与数据安全边界' },
];

const Slide12_SkillsHarness: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Title
      tl.fromTo('.sh-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });

      // Left column
      tl.fromTo('.sh-left', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.sh-skill-item', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }, 0.5);
      tl.fromTo('.sh-skill-warn', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.0);

      // Right column
      tl.fromTo('.sh-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.sh-harness-item', { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }, 0.6);

      // Bottom summary
      tl.fromTo('.sh-bottom', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.3);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="sh-title text-h1 md:text-display-xl font-bold text-[var(--text-primary)] mb-5 opacity-0">
        Skills 生态与 Harness 工程体系
      </h2>

      {/* Two-column layout */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Left: Skills */}
        <div className="sh-left rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📦</span>
            <h3 className="text-h3 font-bold" style={{ color: '#F97316' }}>Skills 技能生态</h3>
          </div>

          <div className="space-y-2.5">
            {SKILLS_ITEMS.map((item, i) => (
              <div key={i}
                className="sh-skill-item flex items-start gap-2 px-3 py-2 rounded-lg border opacity-0"
                style={{ borderColor: '#F9731625', backgroundColor: '#F9731608' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#F97316' }} />
                <span className="text-body-sm" style={{ color: 'var(--text-primary)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="sh-skill-warn mt-4 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 opacity-0">
            <p className="text-caption font-semibold text-amber-400">
              Skill数量与Token成本正相关，按需加载是关键
            </p>
          </div>
        </div>

        {/* Right: Harness */}
        <div className="sh-right rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🛠</span>
            <h3 className="text-h3 font-bold" style={{ color: '#F97316' }}>Harness 工程体系</h3>
          </div>

          <div className="space-y-2.5">
            {HARNESS_ITEMS.map((item) => (
              <div key={item.title}
                className="sh-harness-item rounded-lg border-2 px-3 py-2.5 flex items-start gap-3 opacity-0"
                style={{ borderColor: '#F9731630', backgroundColor: '#F9731608' }}>
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>{item.title}</p>
                  <p className="text-caption text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom summary */}
      <div className="sh-bottom rounded-xl border-2 px-6 py-3 text-center opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F9731610' }}>
        <p className="text-body font-bold" style={{ color: '#F97316' }}>
          Skills解决"知道什么"，Harness解决"怎么稳定地执行"
        </p>
      </div>
    </section>
  );
};

export default memo(Slide12_SkillsHarness);
