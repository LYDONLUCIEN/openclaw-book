import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Database, GitBranch, ArrowRight, ArrowUp, CheckCircle } from 'lucide-react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean }

const BLUE = '#3B82F6';

const RAG_STEPS = ['文档分块', '向量编码', '相似度检索', '上下文注入'];
const WORKFLOW_STEPS = ['条件分支', 'DAG 调度', '确定性输出'];

const Slide08_BlueGear: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.bl-title', { opacity: 0, y: -25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.bl-badge', { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)', delay: 0.15 });
      gsap.fromTo('.bl-columns', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.35 });
      gsap.fromTo('.bl-stats', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.7 });
      gsap.fromTo('.bl-analogy', { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.9 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="bl-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        v2.0 蓝装 — 流程标准化
      </h2>

      {/* Version badge */}
      <div className="bl-badge inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 opacity-0"
        style={{ backgroundColor: `${BLUE}15`, border: `1px solid ${BLUE}40` }}>
        <span className="text-caption font-bold" style={{ color: BLUE }}>Blue Gear</span>
      </div>

      {/* Two-column content */}
      <div className="bl-columns grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full opacity-0">

        {/* Left: RAG */}
        <div className="rounded-xl border-2 p-5 md:p-6"
          style={{ borderColor: BLUE, backgroundColor: `${BLUE}06` }}>
          <div className="flex items-center gap-2 mb-4">
            <Database size={22} style={{ color: BLUE }} />
            <h3 className="text-h3 font-bold" style={{ color: BLUE }}>RAG 检索增强生成</h3>
          </div>

          {/* Flow steps */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mb-4">
            {RAG_STEPS.map((step, i) => (
              <React.Fragment key={i}>
                <div className="px-3 py-2 rounded-lg text-caption font-bold text-center"
                  style={{ backgroundColor: `${BLUE}10`, color: BLUE, border: `1px solid ${BLUE}30` }}>
                  {step}
                </div>
                {i < RAG_STEPS.length - 1 && (
                  <ArrowRight size={16} style={{ color: BLUE }} className="shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-caption text-[var(--text-light)] leading-relaxed mb-3">
            外部知识库自动检索，降低输入端知识缺失。将文档切分为语义块并编码为向量，根据用户查询实时检索最相关的上下文片段注入 Prompt，无需人工编写领域知识。
          </p>

          <div className="flex items-center gap-2">
            <CheckCircle size={16} style={{ color: BLUE }} />
            <span className="text-body-sm font-bold" style={{ color: BLUE }}>外部知识库自动检索，降低输入端知识缺失</span>
          </div>
        </div>

        {/* Right: Workflow */}
        <div className="rounded-xl border-2 p-5 md:p-6"
          style={{ borderColor: BLUE, backgroundColor: `${BLUE}06` }}>
          <div className="flex items-center gap-2 mb-4">
            <GitBranch size={22} style={{ color: BLUE }} />
            <h3 className="text-h3 font-bold" style={{ color: BLUE }}>Workflow 工作流编排</h3>
          </div>

          {/* Flow steps */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mb-4">
            {WORKFLOW_STEPS.map((step, i) => (
              <React.Fragment key={i}>
                <div className="px-3 py-2 rounded-lg text-caption font-bold text-center"
                  style={{ backgroundColor: `${BLUE}10`, color: BLUE, border: `1px solid ${BLUE}30` }}>
                  {step}
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <ArrowRight size={16} style={{ color: BLUE }} className="shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-caption text-[var(--text-light)] leading-relaxed mb-3">
            标准化流程约束，降低处理端不确定性。通过 DAG（有向无环图）定义任务节点与执行依赖，条件分支实现动态路由，确保每一步的输入输出均经过预定义校验。
          </p>

          <div className="flex items-center gap-2">
            <CheckCircle size={16} style={{ color: BLUE }} />
            <span className="text-body-sm font-bold" style={{ color: BLUE }}>标准化流程约束，降低处理端不确定性</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bl-stats mt-6 flex items-center gap-6 flex-wrap justify-center opacity-0">
        <div className="flex items-center gap-2">
          <span className="text-body-lg font-bold" style={{ color: BLUE }}>确定性↑</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body-lg font-bold" style={{ color: BLUE }}>完备性↑↑</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body-lg font-bold text-[var(--text-secondary)]">便利性·</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: '#F59E0B10' }}>
          <ArrowUp size={16} style={{ color: '#F59E0B' }} />
          <span className="text-body-sm font-bold" style={{ color: '#F59E0B' }}>开发成本↑（需构建知识库与流程设计）</span>
        </div>
      </div>

      {/* Analogy */}
      <div className="bl-analogy mt-5 text-center opacity-0">
        <p className="text-body-sm text-[var(--text-light)]">
          类比：配备操作手册与知识库 —— 流程标准化但灵活性受限
        </p>
      </div>
    </section>
  );
};

export default memo(Slide08_BlueGear);
