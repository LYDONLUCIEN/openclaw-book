import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const HARNESS_ITEMS = [
  { icon: '🧠', title: '记忆持久化', desc: '跨会话上下文保持' },
  { icon: '⏰', title: '定时调度', desc: 'Cron任务自动化执行' },
  { icon: '💓', title: '健康监测', desc: '心跳检测与自愈机制' },
  { icon: '🔒', title: '环境隔离', desc: '沙箱运行与权限管控' },
];

const CODE_LINES = [
  { text: '---', color: '#F59E0B' },
  { text: 'name: data-analysis', color: '#79c0ff' },
  { text: 'description: 数据分析处理', color: '#79c0ff' },
  { text: '---', color: '#F59E0B' },
  { text: '## 处理流程', color: '#d2a8ff' },
  { text: '1. 读取数据源', color: '#a5d6ff' },
  { text: '2. 清洗与转换', color: '#a5d6ff' },
  { text: '3. 输出分析报告', color: '#a5d6ff' },
];

const Slide10_OrangeGear: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Title
      tl.fromTo('.og-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo('.og-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 0.1);

      // Left column - Skills
      tl.fromTo('.og-left', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.og-skill-flow', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.7);
      tl.fromTo('.og-skill-stat', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.3)' }, 0.9);
      tl.fromTo('.og-skill-code', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.0);

      // Right column - Harness
      tl.fromTo('.og-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.og-harness-item', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 }, 0.8);

      // Bottom emphasis
      tl.fromTo('.og-emphasis', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 1.4);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="og-title text-h1 md:text-display font-bold text-[var(--text-primary)] opacity-0">
          v4.0 橙装 — Skills + Harness
        </h2>
        <span className="og-badge text-caption px-2.5 py-1 rounded-full font-bold text-white opacity-0"
          style={{ backgroundColor: '#F97316' }}>橙装</span>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Skills */}
        <div className="og-left rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <h3 className="text-h3 font-bold mb-3" style={{ color: '#F97316' }}>Skills 渐进式技能加载</h3>

          {/* Key point */}
          <div className="og-skill-flow rounded-lg px-3 py-2 mb-3 opacity-0"
            style={{ backgroundColor: '#F9731610' }}>
            <p className="text-body-sm font-bold mb-1" style={{ color: '#F97316' }}>
              启动加载名称摘要(~97字符/项)
            </p>
            <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>
              使用时按需读取完整定义，降低初始Token消耗
            </p>
          </div>

          {/* Stat */}
          <div className="og-skill-stat rounded-lg border-2 px-4 py-2.5 text-center mb-3 opacity-0"
            style={{ borderColor: '#F97316', backgroundColor: '#F9731615' }}>
            <p className="text-body font-bold" style={{ color: '#F97316' }}>
              200 Skills ≈ 4.8k tokens 初始占用
            </p>
          </div>

          {/* Code block */}
          <div className="og-skill-code rounded-xl border p-3 opacity-0"
            style={{ borderColor: '#F9731640', backgroundColor: '#0d1117' }}>
            <p className="text-caption font-bold mb-1.5" style={{ color: '#F97316' }}>SKILL.md 格式</p>
            <pre className="text-caption font-mono leading-relaxed">
              {CODE_LINES.map((line, i) => (
                <div key={i} style={{ color: line.color }}>{line.text}</div>
              ))}
            </pre>
          </div>
        </div>

        {/* Right: Harness */}
        <div className="og-right rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#F9731650', backgroundColor: '#F9731608' }}>
          <h3 className="text-h3 font-bold mb-3" style={{ color: '#F97316' }}>Harness 工程化控制层</h3>

          {/* 2x2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {HARNESS_ITEMS.map((item) => (
              <div key={item.title}
                className="og-harness-item rounded-xl border-2 p-3.5 text-center opacity-0"
                style={{ borderColor: '#F9731640', backgroundColor: '#F9731608' }}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>{item.title}</p>
                <p className="text-caption text-[var(--text-secondary)] mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-3 rounded-lg px-3 py-2 text-center"
            style={{ backgroundColor: '#F9731610' }}>
            <p className="text-caption font-bold" style={{ color: '#F97316' }}>
              工程化保障：记忆、调度、监控、安全四位一体
            </p>
          </div>
        </div>
      </div>

      {/* Bottom emphasis */}
      <div className="og-emphasis rounded-xl border-2 px-6 py-3.5 mt-5 opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F9731610', boxShadow: '0 0 30px #F9731620' }}>
        <p className="text-body font-bold text-center" style={{ color: '#F97316' }}>
          确定性↑ 完备性↑ 便利性↑ — 三特性首次同时提升
        </p>
      </div>
    </section>
  );
};

export default memo(Slide10_OrangeGear);
