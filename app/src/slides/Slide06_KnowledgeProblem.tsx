import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, MessageSquare, Ghost, Brain } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const PROBLEMS = [
  {
    icon: MessageSquare,
    title: '意图澄清',
    desc: '操作越便利，用户输入越模糊',
    detail: '用户说"帮我处理一下"，AI不知道要处理什么。自然语言的便利性带来了输入的不确定性。',
    color: 'var(--primary)',
    costImpact: 'P 参与度：用户需要反复澄清意图',
  },
  {
    icon: Ghost,
    title: '模型幻觉',
    desc: '不擅长计算，缺少知识，输出不确定',
    detail: '大模型本质是概率模型，不是知识库也不是计算器。它会自信地给出错误答案。',
    color: 'var(--accent)',
    costImpact: 'U 不确定度：输出结果不可靠',
  },
  {
    icon: Brain,
    title: '注意力稀释',
    desc: '上下文越长，模型越"笨"',
    detail: '研究表明上下文超过一定长度后，模型准确率下降30-40%。信息越多反而越不靠谱。',
    color: 'var(--success)',
    costImpact: 'U 不确定度：长对话质量显著下降',
  },
];

const Slide06_KnowledgeProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.p6-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.p6-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.p6-card', { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.3)', delay: 0.4 });
      gsap.fromTo('.p6-footer', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="p6-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        大模型的四大问题
      </h2>
      <p className="p6-subtitle text-body text-[var(--text-secondary)] mb-6 max-w-xl text-center opacity-0">
        清华应届生虽然聪明，但直接上岗会遇到三个核心困难
      </p>

      <div className="max-w-3xl w-full space-y-4">
        {PROBLEMS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="p6-card rounded-xl border-2 p-5 opacity-0"
              style={{ borderColor: p.color, backgroundColor: `${p.color}06` }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${p.color}15` }}>
                  <Icon size={20} style={{ color: p.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-body font-bold mb-1" style={{ color: p.title === '模型幻觉' ? p.color : undefined }}>{p.title}</h3>
                  <p className="text-body-sm text-[var(--text-primary)] mb-1">{p.desc}</p>
                  <p className="text-caption text-[var(--text-secondary)] leading-relaxed">{p.detail}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <AlertTriangle size={12} style={{ color: p.color }} />
                    <span className="text-caption font-semibold" style={{ color: p.color }}>{p.costImpact}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="p6-footer text-body text-[var(--text-light)] mt-6">
        怎么解决？让我们看看 v1.0 的方案 →
      </p>
    </section>
  );
};

export default memo(Slide06_KnowledgeProblem);
