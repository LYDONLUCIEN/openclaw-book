import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Brain, Zap, Eye, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import Badge from '@/components/Badge';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps {
  isActive: boolean;
}

const CYCLE_STEPS = [
  {
    key: 'think',
    label: 'THINK',
    zh: '思考',
    desc: '分析当前状态，决定下一步行动',
    icon: Brain,
    color: 'var(--primary)',
    bgColor: 'var(--bg-accent)',
  },
  {
    key: 'act',
    label: 'ACT',
    zh: '行动',
    desc: '调用工具执行操作',
    icon: Zap,
    color: 'var(--accent)',
    bgColor: '#FFF7ED',
  },
  {
    key: 'observe',
    label: 'OBSERVE',
    zh: '观察',
    desc: '获取执行结果，更新认知',
    icon: Eye,
    color: 'var(--secondary)',
    bgColor: '#ECFDF5',
  },
];

const EXAMPLE_STEPS = [
  {
    step: 1,
    type: 'THINK',
    content: '用户要生成周报，我需要先收集数据',
    color: 'var(--primary)',
  },
  {
    step: 2,
    type: 'ACT',
    content: '调用数据库API，查询本周运维指标',
    color: 'var(--accent)',
  },
  {
    step: 3,
    type: 'OBSERVE',
    content: '获取到12项指标数据，异常率2.3%',
    color: 'var(--secondary)',
  },
];

const Slide05_ReAct: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        // Title
        tl.fromTo(
          '.react-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        // Subtitle
        tl.fromTo(
          '.react-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

        // Cycle nodes appear one by one
        tl.fromTo(
          '.cycle-node',
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
          },
          '-=0.1'
        );

        // Arrows draw in
        tl.fromTo(
          '.cycle-arrow',
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=0.3'
        );

        // Center label
        tl.fromTo(
          '.cycle-center',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        );

        // Example steps
        tl.fromTo(
          '.example-step',
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.1'
        );

        // Insight panel
        tl.fromTo(
          '.insight-panel',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.1'
        );

        // Expandable
        tl.fromTo(
          '.react-expandable',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        );

        // Continuous subtle pulse on the loop
        if (loopRef.current) {
          gsap.to(loopRef.current, {
            scale: 1.02,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [isActive] }
  );

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 react-title" style={{ opacity: 0 }}>
          <h2 className="text-h1 font-extrabold" style={{ color: 'var(--primary)' }}>
            ReAct范式
          </h2>
          <p
            className="text-body mt-3 max-w-xl mx-auto react-subtitle"
            style={{ color: 'var(--text-secondary)', opacity: 0 }}
          >
            Agent的核心工作原理 — 思考→行动→观察的循环
          </p>
        </div>

        {/* Circular ReAct Loop Diagram */}
        <div
          ref={loopRef}
          className="relative flex items-center justify-center mb-10"
          style={{ width: 380, height: 300 }}
        >
          {/* Center label */}
          <div
            className="cycle-center absolute flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            <div
              className="flex flex-col items-center px-5 py-3 rounded-full"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <RotateCcw
                className="w-6 h-6 mb-1"
                style={{ color: 'var(--primary)' }}
                strokeWidth={2}
              />
              <span
                className="text-caption font-bold uppercase tracking-wider"
                style={{ color: 'var(--text-secondary)' }}
              >
                ReAct Loop
              </span>
            </div>
          </div>

          {/* Top node — THINK */}
          <div
            className="cycle-node absolute flex flex-col items-center p-4 rounded-2xl border-2 shadow-card"
            style={{
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: 0,
              borderColor: CYCLE_STEPS[0].color,
              backgroundColor: CYCLE_STEPS[0].bgColor,
            }}
          >
            <Brain
              className="w-8 h-8 mb-1.5"
              style={{ color: CYCLE_STEPS[0].color }}
              strokeWidth={2}
            />
            <span
              className="text-h3 font-bold"
              style={{ color: CYCLE_STEPS[0].color }}
            >
              {CYCLE_STEPS[0].label}
            </span>
            <span className="text-caption" style={{ color: CYCLE_STEPS[0].color }}>
              {CYCLE_STEPS[0].zh}
            </span>
          </div>

          {/* Bottom-left node — ACT */}
          <div
            className="cycle-node absolute flex flex-col items-center p-4 rounded-2xl border-2 shadow-card"
            style={{
              bottom: 0,
              left: 0,
              opacity: 0,
              borderColor: CYCLE_STEPS[1].color,
              backgroundColor: CYCLE_STEPS[1].bgColor,
            }}
          >
            <Zap
              className="w-8 h-8 mb-1.5"
              style={{ color: CYCLE_STEPS[1].color }}
              strokeWidth={2}
            />
            <span
              className="text-h3 font-bold"
              style={{ color: CYCLE_STEPS[1].color }}
            >
              {CYCLE_STEPS[1].label}
            </span>
            <span className="text-caption" style={{ color: CYCLE_STEPS[1].color }}>
              {CYCLE_STEPS[1].zh}
            </span>
          </div>

          {/* Bottom-right node — OBSERVE */}
          <div
            className="cycle-node absolute flex flex-col items-center p-4 rounded-2xl border-2 shadow-card"
            style={{
              bottom: 0,
              right: 0,
              opacity: 0,
              borderColor: CYCLE_STEPS[2].color,
              backgroundColor: CYCLE_STEPS[2].bgColor,
            }}
          >
            <Eye
              className="w-8 h-8 mb-1.5"
              style={{ color: CYCLE_STEPS[2].color }}
              strokeWidth={2}
            />
            <span
              className="text-h3 font-bold"
              style={{ color: CYCLE_STEPS[2].color }}
            >
              {CYCLE_STEPS[2].label}
            </span>
            <span className="text-caption" style={{ color: CYCLE_STEPS[2].color }}>
              {CYCLE_STEPS[2].zh}
            </span>
          </div>

          {/* Arrow: THINK → ACT (curved left) */}
          <svg
            className="cycle-arrow absolute inset-0 pointer-events-none"
            width="380"
            height="300"
            viewBox="0 0 380 300"
            style={{ opacity: 0 }}
          >
            <defs>
              <marker id="arrowThinkAct" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-secondary)" />
              </marker>
            </defs>
            <path
              d="M 170 90 C 120 130, 100 170, 120 210"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              strokeDasharray="6,4"
              fill="none"
              markerEnd="url(#arrowThinkAct)"
            />
          </svg>

          {/* Arrow: ACT → OBSERVE (bottom) */}
          <svg
            className="cycle-arrow absolute inset-0 pointer-events-none"
            width="380"
            height="300"
            viewBox="0 0 380 300"
            style={{ opacity: 0 }}
          >
            <defs>
              <marker id="arrowActObserve" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-secondary)" />
              </marker>
            </defs>
            <path
              d="M 180 260 C 220 280, 260 280, 280 260"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              strokeDasharray="6,4"
              fill="none"
              markerEnd="url(#arrowActObserve)"
            />
          </svg>

          {/* Arrow: OBSERVE → THINK (curved right) */}
          <svg
            className="cycle-arrow absolute inset-0 pointer-events-none"
            width="380"
            height="300"
            viewBox="0 0 380 300"
            style={{ opacity: 0 }}
          >
            <defs>
              <marker id="arrowObserveThink" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-secondary)" />
              </marker>
            </defs>
            <path
              d="M 290 210 C 310 170, 300 130, 230 90"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              strokeDasharray="6,4"
              fill="none"
              markerEnd="url(#arrowObserveThink)"
            />
          </svg>
        </div>

        {/* Practical Example Steps */}
        <div className="w-full max-w-2xl mb-8">
          <h3
            className="text-h3 font-semibold mb-4 flex items-center gap-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <ArrowRight className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            实际案例：生成运维周报
          </h3>
          <div className="flex flex-col gap-3">
            {EXAMPLE_STEPS.map((step) => (
              <div
                key={step.step}
                className="example-step flex items-start gap-4 px-5 py-3.5 rounded-xl border"
                style={{
                  opacity: 0,
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-caption font-bold"
                  style={{
                    backgroundColor: step.color,
                    color: '#FFFFFF',
                  }}
                >
                  {step.step}
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-caption font-bold uppercase tracking-wider"
                    style={{ color: step.color }}
                  >
                    {step.type}
                  </span>
                  <span
                    className="text-body-sm mt-0.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {step.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Panel */}
        <div
          className="insight-panel w-full max-w-2xl flex items-start gap-3 p-5 rounded-xl border mb-6"
          style={{
            opacity: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <Lightbulb
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: 'var(--accent)' }}
            strokeWidth={2}
          />
          <div>
            <span
              className="text-body-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              与传统AI的区别
            </span>
            <p className="text-body-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              <Badge variant="accent" className="mr-1">传统AI</Badge>
              一次回答，无法修正错误；
              <Badge variant="success" className="mx-1">Agent</Badge>
              通过思考-行动-观察循环，迭代执行直到任务完成
            </p>
          </div>
        </div>

        {/* Expandable Section */}
        <div className="react-expandable w-full max-w-2xl" style={{ opacity: 0 }}>
          <ExpandableSection
            toggleLabel="ReAct的学术背景"
            hintText="点击展开"
          >
            <p className="text-body-sm" style={{ color: 'var(--text-secondary)' }}>
              ReAct（Reasoning + Acting）由Princeton大学和Google Research于2022年联合提出，
              论文标题为 <em>"ReAct: Synergizing Reasoning and Acting in Language Models"</em>。
              核心发现：让大语言模型同时进行推理和行动，比纯推理（Chain-of-Thought）
              或纯行动的效果都要好，显著提升了任务完成率和事实准确性。
            </p>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide05_ReAct);
