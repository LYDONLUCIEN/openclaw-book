import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const SKILLS_REPOS = [
  { name: 'GitHub MCP Server', count: '66+ 工具' },
  { name: 'Anthropic Reference', count: '20 服务器' },
  { name: 'OpenClaw / ClawHub', count: '13,729 skills' },
  { name: 'PulseMCP 目录', count: '15,710+ 服务器' },
];

const HARNESS_ITEMS = [
  { icon: '🧠', title: '记忆', desc: 'Markdown 持久化 + SQLite 索引，跨会话知识保持' },
  { icon: '⏰', title: '调度', desc: 'Cron 任务 + JSON 持久化，支持失败重试与退避' },
  { icon: '💓', title: '监控', desc: '心跳检测 + 自动恢复，保障长时运行稳定性' },
  { icon: '🔒', title: '安全', desc: '沙箱隔离 + 权限管控，环境与数据安全边界' },
];

const Slide12_SkillsHarness: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const barWith = Math.round((8000 / 55000) * 100);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo('.sh-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });

      // Left column (Harness)
      tl.fromTo('.sh-left', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.sh-harness-item', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }, 0.5);

      // Right column (Skills)
      tl.fromTo('.sh-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.sh-repo-row', { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.08 }, 0.6);
      tl.fromTo('.sh-token-section', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.0);
      tl.fromTo('.sh-bar-no', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 1.2);
      tl.fromTo('.sh-bar-yes', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 1.4);

      // Quote
      tl.fromTo('.sh-quote', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.6);

      // Bottom
      tl.fromTo('.sh-bottom', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.9);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="sh-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-5 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        Harness:众人智慧 共驭模型
      </h2>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Harness */}
        <div className="sh-left rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🛠</span>
            <h3 className="text-h3 font-bold" style={{ color: '#F97316' }}>Harness 工程体系</h3>
          </div>

          <div className="space-y-2.5">
            {HARNESS_ITEMS.map((item) => (
              <div key={item.title}
                className="sh-harness-item rounded-lg border-2 px-3 py-2.5 flex items-start gap-3 opacity-0"
                style={{ borderColor: '#F9731630', backgroundColor: '#F9731608' }}>
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>{item.title}</p>
                  <p className="text-caption text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skills */}
        <div className="sh-right rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📦</span>
            <h3 className="text-h3 font-bold" style={{ color: '#F97316' }}>Skills 技能生态</h3>
          </div>

          {/* Repo table */}
          <div className="space-y-1.5 mb-4">
            {SKILLS_REPOS.map((repo, i) => (
              <div key={i}
                className="sh-repo-row flex items-center justify-between px-3 py-1.5 rounded-lg border opacity-0"
                style={{ borderColor: '#F9731620', backgroundColor: '#F9731608' }}>
                <span className="text-body-sm text-[var(--text-primary)]">{repo.name}</span>
                <span className="text-caption font-bold whitespace-nowrap" style={{ color: '#F97316' }}>{repo.count}</span>
              </div>
            ))}
          </div>

          {/* Token comparison */}
          <div className="sh-token-section rounded-lg border border-[#F9731630] bg-[#F9731608] p-3 opacity-0">
            <p className="text-caption font-bold mb-2" style={{ color: '#F97316' }}>
              Token 消耗对比（5个典型MCP服务器）
            </p>

            <div className="mb-2">
              <div className="flex justify-between text-caption mb-0.5">
                <span className="text-[var(--text-secondary)]">无Skills（全量加载）</span>
                <span className="font-bold text-red-400">~55,000</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-red-400/10 overflow-hidden">
                <div className="sh-bar-no h-full rounded-full bg-red-400/60 origin-left" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-caption mb-0.5">
                <span className="text-[var(--text-secondary)]">有Skills（渐进加载）</span>
                <span className="font-bold" style={{ color: '#10B981' }}>~8,000</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-emerald-400/10 overflow-hidden">
                <div className="sh-bar-yes h-full rounded-full origin-left" style={{ width: `${barWith}%`, backgroundColor: '#10B981' }} />
              </div>
            </div>

            <p className="text-caption text-center mt-2 font-bold" style={{ color: '#10B981' }}>
              Token 减少 85%
            </p>
          </div>

          {/* Warning */}
          <div className="sh-skill-warn mt-3 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2">
            <p className="text-caption font-semibold text-amber-400">
              Skill数量与Token成本正相关，按需加载是关键
            </p>
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

      {/* Bottom summary — pushed to bottom with breathing room */}
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
