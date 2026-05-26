import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';
import ClickableImage from '@/components/ImageOverlay';

interface SlideProps { isActive: boolean; }

const LEVELS = [
  {
    level: 1, title: '人设对话', desc: '角色设定与知识注入',
    detail: 'System Prompt + RAG，定义Agent身份与知识边界',
    tag: '确定性 · 完备性↑', color: '#10B981', img: 'level1-demo.png',
  },
  {
    level: 2, title: '任务助理', desc: '多轮对话完成任务',
    detail: 'Function Call + MCP，多轮交互完成复杂任务',
    tag: '完备性↑ 便利性↑', color: '#3B82F6', img: 'level2-demo.png',
  },
  {
    level: 3, title: '定时调度', desc: 'Cron 自动化执行',
    detail: 'Harness调度引擎，定时触发无人值守任务',
    tag: '便利性↑↑ 确定性·', color: '#8B5CF6', img: 'level3-demo.png',
  },
  {
    level: 4, title: '自主决策', desc: '自主规划执行',
    detail: 'Agent自主拆解目标、规划路径，需人工监管兜底',
    tag: '三特性↑', color: '#F97316', img: 'level4-demo.png',
  },
];

const Slide15_FourProblems: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.fp-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      LEVELS.forEach((_, i) => {
        tl.fromTo(`.fp-cell-${i}`, { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.3)' }, 0.3 + i * 0.12);
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="fp-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={2} />
        翻越三座山（2）：四类使用模式
      </h2>

      {/* 2x2 grid — tight spacing */}
      <div className="max-w-6xl w-full grid grid-cols-2 gap-2.5 flex-1">
        {LEVELS.map((lv, i) => (
          <div key={i}
            className={`fp-cell-${i} rounded-xl border-2 p-2.5 flex flex-col opacity-0`}
            style={{ borderColor: `${lv.color}50`, backgroundColor: `${lv.color}08` }}>

            {/* Header: badge + title + desc in one line */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                style={{ backgroundColor: `${lv.color}15`, color: lv.color }}>
                L{lv.level}
              </span>
              <span className="text-body-sm font-bold" style={{ color: lv.color }}>{lv.title}</span>
              <span className="text-[10px] text-[var(--text-light)]">{lv.desc}</span>
            </div>

            <p className="text-[10px] text-[var(--text-secondary)] mb-1.5 leading-tight">{lv.detail}</p>

            {/* Image placeholder — very compact */}
            <div className="mt-auto rounded-md border-2 border-dashed aspect-[2.5/1] flex items-center justify-center overflow-hidden relative"
              style={{ borderColor: `${lv.color}25`, backgroundColor: `${lv.color}05` }}>
              <ClickableImage src={`/images/levels/${lv.img}`} alt={`L${lv.level} demo`}
                className="w-full h-full object-contain relative z-10"
                onLoad={(e) => { ((e.target as HTMLImageElement).nextElementSibling as HTMLElement)?.remove(); }}
                onError={(e) => { (e.target as HTMLImageElement).remove(); }} />
              <span className="text-[9px] text-[var(--text-secondary)] opacity-40 absolute">
                L{lv.level} 演示截图
              </span>
            </div>

            <span className="text-[9px] font-semibold mt-1" style={{ color: lv.color }}>{lv.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Slide15_FourProblems);
