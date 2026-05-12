import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Brain, BookOpen, Bot } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const PROBLEMS = [
  { icon: Brain, title: '模型记不住', subtitle: '上下文记忆能力有限', color: 'var(--primary)', issues: ['注意力稀释', '信息过载', '对话丢失'], solutions: ['渐进式披露', '上下文压缩', 'Harness工程'] },
  { icon: BookOpen, title: '模型不懂业务', subtitle: '没有业务知识和流程', color: 'var(--success)', issues: ['不懂公司业务', '不知道流程', '缺乏专业知识'], solutions: ['RAG', '知识图谱', 'Skills'] },
  { icon: Bot, title: '模型没有手脚', subtitle: '无法精确执行操作', color: 'var(--accent)', issues: ['无法调用系统', '不能操作工具', '缺乏确定性'], solutions: ['MCP协议', '工作流', 'Tools'] },
];

const Slide04_ThreeProblems: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.tp-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.tp-card', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.3)', delay: 0.3 });
      gsap.fromTo('.tp-bottom', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="tp-title text-center mb-10">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">大模型的三个核心问题</h2>
        <p className="text-body text-[var(--text-secondary)] mt-2">解决了这三个问题，大模型就能进化为AI Agent</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        {PROBLEMS.map((p, i) => (
          <div key={i} className="tp-card rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover" style={{ borderColor: p.color, background: `linear-gradient(135deg, ${p.color}08, var(--bg-primary))` }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${p.color}15` }}>
              <p.icon className="w-7 h-7" style={{ color: p.color }} strokeWidth={2} />
            </div>
            <h3 className="text-h2 font-bold mb-1" style={{ color: p.color }}>{p.title}</h3>
            <p className="text-body-sm text-[var(--text-secondary)] mb-4">{p.subtitle}</p>
            <div className="space-y-2 mb-4">
              {p.issues.map((issue, j) => (
                <div key={j} className="flex items-center gap-2 text-body-sm">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-[var(--text-primary)]">{issue}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t" style={{ borderColor: `${p.color}20` }}>
              <p className="text-caption text-[var(--text-light)] mb-2">解决方案</p>
              <div className="flex flex-wrap gap-1.5">
                {p.solutions.map((s, j) => (
                  <span key={j} className="px-2 py-0.5 rounded text-caption font-semibold" style={{ backgroundColor: `${p.color}15`, color: p.color }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="tp-bottom mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}>
          <span className="text-body font-bold text-white">解决这三个问题</span>
          <span className="text-body text-white/80">→</span>
          <span className="text-body font-bold text-white">大模型进化为AI Agent</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide04_ThreeProblems);
