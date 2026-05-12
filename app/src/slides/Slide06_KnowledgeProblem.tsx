import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Search, Share2, FileText, ChevronRight } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide06_KnowledgeProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ragStep, setRagStep] = useState(-1);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.kn-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.kn-problem', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.kn-solution', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, delay: 0.6 });
      gsap.fromTo('.kn-rag', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (ragStep < 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(`.rag-step-${ragStep}`, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' });
      if (ragStep > 0) {
        gsap.fromTo(`.rag-arrow-${ragStep - 1}`, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.3 });
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [ragStep] });

  const ragSteps = [
    { label: '用户提问', icon: '💬', content: '"公司最新的运维流程是什么？"' },
    { label: '向量检索', icon: '🔍', content: 'Embedding → 搜索知识库 → 匹配Top-K文档' },
    { label: '检索结果', icon: '📄', content: '找到3篇相关文档（运维流程v3.2.pdf）' },
    { label: '喂给模型', icon: '🧠', content: '原文 + 检索到的文档一起输入模型' },
    { label: '生成回答', icon: '✅', content: '基于文档内容给出准确回答' },
  ];

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="kn-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">问题2：知识问题</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">模型的知识截止在训练数据 — 不懂公司业务</p>
      </div>

      <div className="kn-problem flex items-center justify-center gap-3 mb-6 p-4 rounded-xl bg-[var(--bg-secondary)] max-w-2xl mx-auto w-full">
        <span className="text-2xl">🧠</span>
        <span className="text-body text-[var(--text-light)]">模型 →</span>
        <span className="text-body text-[var(--accent)]">"公司最新的运维流程是什么？"</span>
        <span className="text-body text-[var(--text-light)]">→</span>
        <span className="text-body font-bold text-red-400">❌ 不知道</span>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto w-full mb-6">
        {[
          { icon: Search, title: 'RAG', subtitle: '检索增强生成', desc: '用户提问→向量检索知识库→检索到文档→喂给模型→结合文档回答', tag: '解决"知道什么"', color: 'var(--primary)' },
          { icon: Share2, title: '知识图谱', subtitle: '结构化知识表示', desc: '节点和边连接业务概念，RAG做不了的关联推理，图谱可以', tag: '解决"知道关联"', color: 'var(--success)' },
          { icon: FileText, title: 'Skills', subtitle: '业务流程知识', desc: '不只"知道什么"，还"知道怎么做"。日报Skill=知道去哪取数据+数据格式+报告模板', tag: '解决"知道怎么做"', color: 'var(--accent)' },
        ].map((s, i) => (
          <div key={i} className="kn-solution rounded-xl p-5 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-card" style={{ borderColor: s.color }}>
            <s.icon className="w-8 h-8 mb-3" style={{ color: s.color }} strokeWidth={2} />
            <h3 className="text-h3 font-bold" style={{ color: s.color }}>{s.title}</h3>
            <p className="text-caption text-[var(--text-light)] mb-2">{s.subtitle}</p>
            <p className="text-body-sm text-[var(--text-secondary)] mb-3">{s.desc}</p>
            <span className="inline-block px-2 py-0.5 rounded text-caption font-bold" style={{ backgroundColor: `${s.color}15`, color: s.color }}>{s.tag}</span>
          </div>
        ))}
      </div>

      {/* RAG Interactive Demo */}
      <div className="kn-rag max-w-3xl mx-auto w-full rounded-xl p-5 border" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--bg-accent)' }}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-body font-bold text-[var(--primary)]">RAG检索过程演示</h4>
          <button onClick={() => setRagStep(ragStep >= ragSteps.length - 1 ? -1 : ragStep + 1)} className="px-3 py-1 rounded-lg text-caption font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
            {ragStep >= ragSteps.length - 1 ? '重置' : ragStep < 0 ? '▶ 开始演示' : '下一步 →'}
          </button>
        </div>
        <div className="flex items-start gap-2 overflow-x-auto pb-2">
          {ragSteps.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className={`rag-arrow-${i - 1} w-5 h-5 text-[var(--text-light)] flex-shrink-0 mt-4 opacity-0`} />}
              <div className={`rag-step-${i} flex-shrink-0 rounded-lg p-3 min-w-[140px] border ${i <= ragStep ? 'bg-[var(--card-bg)] border-[var(--primary)]' : 'bg-[var(--bg-secondary)] border-[var(--border)] opacity-30'}`}>
                <span className="text-xl">{s.icon}</span>
                <p className="text-caption font-bold text-[var(--text-primary)] mt-1">{s.label}</p>
                <p className="text-caption text-[var(--text-secondary)] text-xs mt-0.5">{s.content}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full mt-4">
        <ExpandableSection toggleLabel="RAG vs 知识图谱 vs Skills — 什么场景用什么？" hintText="点击展开">
          <div className="space-y-2 text-body-sm text-[var(--text-secondary)]">
            <p><strong>RAG</strong>：适合问答场景——"XX指标是多少？"、"最新的流程是什么？"</p>
            <p><strong>知识图谱</strong>：适合推理场景——"故障A和B是否有关联？"、"影响范围包括哪些？"</p>
            <p><strong>Skills</strong>：适合流程场景——"帮我生成日报"、"处理这批邮件"、"执行数据稽核"</p>
          </div>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide06_KnowledgeProblem);
