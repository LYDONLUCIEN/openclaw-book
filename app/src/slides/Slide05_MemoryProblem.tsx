import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GraduationCap, MessageSquare, Ghost, Brain, ChevronRight } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const PROBLEMS = [
  {
    stage: '输入',
    stageEn: 'Input',
    icon: MessageSquare,
    title: '意图澄清',
    desc: '用户说"帮我处理一下"，AI 不知道要处理什么',
    detail: '自然语言越便利，输入就越模糊。AI 需要反复追问才能理解用户真正想做什么。',
    color: 'var(--primary)',
    propImpact: '影响确定性',
  },
  {
    stage: '处理',
    stageEn: 'Processing',
    icon: Ghost,
    title: '模型幻觉',
    desc: '自信地给出错误答案，不擅长计算，缺少知识',
    detail: '大模型本质是概率模型，不是知识库也不是计算器。不知道的知识会编造，不会算的题会硬算。',
    color: 'var(--accent)',
    propImpact: '影响确定性',
  },
  {
    stage: '输出',
    stageEn: 'Output',
    icon: Brain,
    title: '注意力稀释',
    desc: '上下文越长，模型越"笨"，质量急剧下降',
    detail: '研究表明上下文超过一定长度后，准确率下降 30-40%。信息越多反而越不靠谱。',
    color: 'var(--success)',
    propImpact: '影响完备性',
  },
];

const Slide05_MemoryProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  // Phase 0: entrance animation
  useGSAP(() => {
    if (!isActive || phase !== 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ob-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.ob-profile', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.3 });
      gsap.fromTo('.ob-problem', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, delay: 0.7 });
      gsap.fromTo('.ob-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  // Phase 1: expanded detail
  useGSAP(() => {
    if (!isActive || expanded === null || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ob-detail', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, expanded] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={() => setPhase(phase < 1 ? phase + 1 : 0)}>

      <h2 className="ob-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        聪明的应届生入职了
      </h2>
      <p className="ob-title text-body text-[var(--text-secondary)] mb-4 opacity-0">
        大模型就像一个清北应届生——聪明，但什么都不懂。在输入→处理→输出的每个环节都有困难。
      </p>

      {/* Employee Profile Card */}
      <div className="ob-profile rounded-xl border-2 p-4 max-w-md w-full mb-5 opacity-0"
        style={{ borderColor: '#8B5CF6', backgroundColor: '#8B5CF608' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B5CF615' }}>
            <GraduationCap size={24} style={{ color: '#8B5CF6' }} />
          </div>
          <div className="flex-1">
            <span className="text-body font-bold text-[var(--text-primary)]">LLM 大模型</span>
            <span className="text-caption text-[var(--text-secondary)] block">清北应届生 · 通用能力极强</span>
          </div>
          <div className="flex gap-3 text-caption">
            <span><span className="font-bold" style={{ color: 'var(--success)' }}>确定:20</span></span>
            <span><span className="font-bold" style={{ color: 'var(--accent)' }}>完备:90</span></span>
            <span><span className="font-bold" style={{ color: 'var(--primary)' }}>便利:60</span></span>
          </div>
        </div>
      </div>

      {/* Three Core Problems: Input → Processing → Output */}
      <div className="max-w-4xl w-full">
        <div className="flex items-start justify-center gap-2 md:gap-3">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            const isExp = expanded === i;
            return (
              <React.Fragment key={i}>
                <div className="flex-1 max-w-xs">
                  <div className="ob-problem rounded-xl border-2 p-4 cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: isExp ? p.color : `${p.color}60`,
                      backgroundColor: isExp ? `${p.color}08` : `${p.color}04`,
                      boxShadow: isExp ? `0 0 12px ${p.color}20` : 'none',
                    }}
                    onClick={(e) => { e.stopPropagation(); setExpanded(isExp ? null : i); }}>
                    <div className="text-center">
                      <span className="text-caption font-bold px-2 py-0.5 rounded-full inline-block mb-2"
                        style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                        {p.stage} / {p.stageEn}
                      </span>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                        style={{ backgroundColor: `${p.color}15` }}>
                        <Icon size={20} style={{ color: p.color }} />
                      </div>
                      <h3 className="text-body font-bold mb-1" style={{ color: p.color }}>{p.title}</h3>
                      <p className="text-caption text-[var(--text-secondary)]">{p.desc}</p>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExp && (
                    <div className="ob-detail mt-2 rounded-lg border p-3 text-left"
                      style={{ borderColor: `${p.color}40`, backgroundColor: `${p.color}06` }}>
                      <p className="text-caption text-[var(--text-secondary)] leading-relaxed">{p.detail}</p>
                      <span className="text-caption font-semibold mt-1 inline-block" style={{ color: p.color }}>{p.propImpact}</span>
                    </div>
                  )}
                </div>
                {i < 2 && (
                  <div className="flex items-center pt-10">
                    <ChevronRight size={18} style={{ color: 'var(--text-light)' }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <p className="ob-hint text-body text-[var(--text-light)] mt-5 opacity-0">
        输入模糊、处理不可靠、输出不稳定——怎么逐个解决？→
      </p>

      <div className="absolute bottom-5 text-caption text-[var(--text-light)]">
        点击卡片展开详情 | 点击空白切换
      </div>
    </section>
  );
};

export default memo(Slide05_MemoryProblem);
