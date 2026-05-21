import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { User, Bot } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const ITERATIONS = [
  { round: 1, desc: '需求描述 → 结构化大纲' },
  { round: 2, desc: '叙事重构 → 三特性框架确立' },
  { round: 3, desc: '内容填充 → 真实代码与数据替换' },
  { round: 'N', desc: '逐页精调 → 文案、动画、配色优化' },
];

const HUMAN_TASKS = ['叙事结构', '审美判断', '内容取舍', '关键决策'];
const AI_TASKS = ['代码实现', '动画设计', '初稿生成', '批量修改'];

const Slide18_PresentationItself: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pi-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.pi-timeline', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3 });
      gsap.fromTo('.pi-col', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out', delay: 0.8 });
      gsap.fromTo('.pi-quote', { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 1.2 });
      gsap.fromTo('.pi-footer', { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 1.5 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="pi-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-5 opacity-0">
        实战案例：本课件的诞生过程
      </h2>

      {/* Timeline */}
      <div className="max-w-5xl w-full mb-5">
        <div className="flex items-start gap-0">
          {ITERATIONS.map((it, i) => (
            <div key={i} className="pi-timeline flex-1 flex flex-col items-center opacity-0">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-body-sm font-bold text-white mb-2"
                style={{ backgroundColor: '#F97316' }}>
                {it.round}
              </div>
              <div className="text-center px-1">
                <p className="text-caption font-bold" style={{ color: '#F97316' }}>
                  第{it.round}轮
                </p>
                <p className="text-caption text-[var(--text-secondary)] mt-0.5" style={{ fontSize: '10px' }}>
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Connecting line */}
        <div className="hidden sm:flex items-center justify-center mt-1 mb-3"
          style={{ margin: '0 40px' }}>
          <div className="flex-1 h-0.5 rounded-full" style={{ backgroundColor: '#F9731640' }} />
          <div className="flex-1 h-0.5 rounded-full" style={{ backgroundColor: '#F9731660' }} />
          <div className="flex-1 h-0.5 rounded-full" style={{ backgroundColor: '#F9731680' }} />
        </div>
      </div>

      {/* Two columns: division of labor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl w-full mb-5">
        {/* Human */}
        <div className="pi-col rounded-xl border-2 p-5 opacity-0"
          style={{ borderColor: '#3B82F6', backgroundColor: '#3B82F606' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#3B82F615', color: '#3B82F6' }}>
              <User size={16} />
            </div>
            <span className="text-body font-bold" style={{ color: '#3B82F6' }}>
              {'🧑'} 人类职责
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {HUMAN_TASKS.map((task, i) => (
              <span key={i}
                className="rounded-full px-3 py-1 text-caption font-semibold"
                style={{ backgroundColor: '#3B82F612', color: '#3B82F6' }}>
                {task}
              </span>
            ))}
          </div>
        </div>

        {/* AI */}
        <div className="pi-col rounded-xl border-2 p-5 opacity-0"
          style={{ borderColor: '#10B981', backgroundColor: '#10B98106' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#10B98115', color: '#10B981' }}>
              <Bot size={16} />
            </div>
            <span className="text-body font-bold" style={{ color: '#10B981' }}>
              {'🤖'} AI 职责
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {AI_TASKS.map((task, i) => (
              <span key={i}
                className="rounded-full px-3 py-1 text-caption font-semibold"
                style={{ backgroundColor: '#10B98112', color: '#10B981' }}>
                {task}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Prominent quote */}
      <div className="pi-quote rounded-2xl border-2 px-8 py-5 max-w-5xl w-full text-center mb-4 opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
        <p className="text-h3 font-bold" style={{ color: '#F97316' }}>
          &ldquo;可以外包思考过程，但不能外包理解本身&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="pi-footer rounded-xl border p-3 max-w-5xl w-full text-center opacity-0"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
        <p className="text-caption text-[var(--text-secondary)]">
          本课件 = 开发成本弥补确定性的工程实践
        </p>
      </div>
    </section>
  );
};

export default memo(Slide18_PresentationItself);
