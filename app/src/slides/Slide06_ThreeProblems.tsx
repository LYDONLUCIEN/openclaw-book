import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, Ear, Eye, Brain } from 'lucide-react';

interface SlideProps { isActive: boolean }

// Order: 输入 → 处理 → 输出
const PROBLEMS = [
  {
    icon: Ear,
    stage: '输入端',
    title: '意图模糊',
    desc: '用户表达模糊导致模型理解偏差',
    detail: '自然语言输入天然存在歧义性与不完整性，用户意图难以精确传达。缺乏结构化引导时，模型对上下文语境的解读容易产生偏差，导致输出偏离预期。',
    cost: '操作成本↑',
    color: '#EF4444',
  },
  {
    icon: Eye,
    stage: '处理端',
    title: '注意力稀释',
    desc: '上下文过长导致关键信息被忽略',
    detail: '随着对话轮次增加与上下文累积，模型的有效注意力被分散，关键指令与约束条件被淹没在冗余信息中，导致上下文窗口压力增大、核心信息遗漏。',
    cost: '开发成本↑',
    color: '#F59E0B',
  },
  {
    icon: Brain,
    stage: '输出端',
    title: '模型幻觉',
    desc: '概率性生成缺乏事实依据',
    detail: '大语言模型基于概率分布生成内容，本质上是"最可能的下一个Token"而非"正确的下一个Token"。在知识边界之外，模型会生成看似合理但缺乏事实依据的内容。',
    cost: '确认成本↑',
    color: '#EF4444',
  },
];

const Slide06_ThreeProblems: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.tp-title', { opacity: 0, y: -25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.tp-analogy', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.25 });
      gsap.fromTo('.tp-card', { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.3)', delay: 0.5 });
      gsap.fromTo('.tp-bottom', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="tp-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-3 opacity-0">
        裸体大模型的三个核心问题
      </h2>

      {/* Analogy */}
      <div className="tp-analogy mb-8 opacity-0">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <AlertTriangle size={18} style={{ color: '#F59E0B' }} />
          <span className="text-body-sm text-[var(--text-secondary)]">
            类比清北应届生：记忆有限（输入）、理解偏差（处理）、执行出错（输出）
          </span>
        </div>
      </div>

      {/* Three problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {PROBLEMS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="tp-card rounded-xl border-2 p-6 opacity-0"
              style={{ borderColor: p.color, backgroundColor: `${p.color}06` }}>
              {/* Stage badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${p.color}15` }}>
                  <Icon size={24} style={{ color: p.color }} />
                </div>
                <span className="text-body-sm font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                  {p.stage}
                </span>
              </div>

              {/* Problem title */}
              <h3 className="text-h2 font-bold mb-3" style={{ color: p.color }}>{p.title}</h3>

              {/* Professional description */}
              <p className="text-body-sm text-[var(--text-secondary)] mb-3 leading-relaxed">{p.desc}</p>

              {/* Detailed explanation */}
              <p className="text-caption text-[var(--text-light)] leading-relaxed mb-4">{p.detail}</p>

              {/* Cost tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg"
                style={{ backgroundColor: `${p.color}10` }}>
                <span className="text-body-sm font-bold" style={{ color: p.color }}>{p.cost}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom summary */}
      <div className="tp-bottom mt-8 text-center max-w-4xl opacity-0">
        <div className="rounded-xl border p-5"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <p className="text-body-lg font-bold text-[var(--text-primary)]">
            三种不确定性对应三种成本，通过工程手段逐个击破
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide06_ThreeProblems);
