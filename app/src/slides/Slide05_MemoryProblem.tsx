import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GraduationCap, Brain, BookOpen, Bot, MessageSquare, AlertTriangle } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide05_MemoryProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ob-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.ob-profile', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.3 });
      gsap.fromTo('.ob-problem', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, delay: 0.6 });
      gsap.fromTo('.ob-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || phase !== 1) return;
    const ctx = gsap.context(() => {
      gsap.to('.ob-problem', { opacity: 0.15, duration: 0.3 });
      gsap.fromTo('.ob-prompt', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  useGSAP(() => {
    if (!isActive || phase !== 2) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ob-summary', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={() => setPhase(phase < 2 ? phase + 1 : 0)}>

      <h2 className="ob-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        聪明的应届生入职了
      </h2>
      <p className="ob-title text-body text-[var(--text-secondary)] mb-5 opacity-0">
        按我们去年的介绍，大模型就像一个刚招进来的清北应届生——聪明，但什么都不懂
      </p>

      {/* Employee Profile */}
      <div className="ob-profile rounded-xl border-2 p-5 max-w-md w-full mb-5 opacity-0"
        style={{ borderColor: '#8B5CF6', backgroundColor: '#8B5CF608' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B5CF615' }}>
            <GraduationCap size={24} style={{ color: '#8B5CF6' }} />
          </div>
          <div>
            <span className="text-body font-bold text-[var(--text-primary)]">LLM 大模型</span>
            <span className="text-caption text-[var(--text-secondary)] block">清华应届生 · 通用能力极强</span>
          </div>
        </div>
        <div className="flex gap-4 text-caption">
          <span><span className="font-bold" style={{ color: 'var(--accent)' }}>C:10</span> 复杂度低</span>
          <span><span className="font-bold" style={{ color: 'var(--primary)' }}>P:40</span> 参与度高</span>
          <span><span className="font-bold" style={{ color: 'var(--success)' }}>U:80</span> 不确定度高</span>
        </div>
      </div>

      {/* 3 Core Problems */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl w-full">
        {[
          { icon: Brain, title: '记不住', desc: '上下文有限，信息过载就忘', color: 'var(--primary)' },
          { icon: BookOpen, title: '不懂业务', desc: '没有公司知识和流程', color: 'var(--success)' },
          { icon: Bot, title: '没有手脚', desc: '无法调用系统和工具', color: 'var(--accent)' },
        ].map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="ob-problem rounded-xl border-2 p-4 opacity-0"
              style={{ borderColor: p.color, backgroundColor: `${p.color}08` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: `${p.color}15` }}>
                <Icon size={20} style={{ color: p.color }} />
              </div>
              <h3 className="text-body font-bold mb-0.5" style={{ color: p.color }}>{p.title}</h3>
              <p className="text-caption text-[var(--text-secondary)]">{p.desc}</p>
            </div>
          );
        })}
      </div>

      <p className="ob-hint text-body text-[var(--text-light)] mt-4 opacity-0">
        它天然不知道我们的业务知识，会胡说。怎么教他？点击继续 →
      </p>

      {/* Phase 1: Prompt as teaching method */}
      {phase >= 1 && (
        <div className="ob-prompt max-w-2xl w-full mt-3 opacity-0">
          <div className="rounded-xl border-2 p-4" style={{ borderColor: '#8B5CF6', backgroundColor: '#8B5CF608' }}>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={18} style={{ color: '#8B5CF6' }} />
              <span className="text-body font-bold" style={{ color: '#8B5CF6' }}>第一课：所有教学都通过 Prompt（上下文）</span>
            </div>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              不管是业务知识、操作指令还是工具说明，<span className="font-bold text-[var(--text-primary)]">全部都是通过上下文（Prompt）喂给大模型的</span>。
              多轮对话里的每一句话，都是上下文的一部分。
            </p>
            <div className="flex items-start gap-1.5 mt-2">
              <AlertTriangle size={12} style={{ color: 'var(--accent)' }} className="shrink-0 mt-0.5" />
              <p className="text-caption" style={{ color: 'var(--accent)' }}>
                但光靠Prompt不够——记不住太长的内容，效率低，执行不确定。
                所以我们需要一件件给他穿上装备。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: Summary bridge */}
      {phase >= 2 && (
        <div className="ob-summary text-center max-w-xl mt-4 opacity-0">
          <p className="text-body font-bold text-[var(--text-primary)]">
            接下来的每一页，就是给这位应届生一件件装备的过程
          </p>
          <p className="text-caption text-[var(--text-light)] mt-1">
            每解决一个问题，就会引出一个新问题——直到 OpenClaw 完全体
          </p>
        </div>
      )}

      <div className="absolute bottom-5 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击继续' : phase === 1 ? '点击查看总结' : '点击重置'}
      </div>
    </section>
  );
};

export default memo(Slide05_MemoryProblem);
