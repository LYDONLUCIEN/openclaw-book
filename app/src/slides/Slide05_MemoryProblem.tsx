import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Layers, Minimize2, Shield } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }
const BLOCKS = ['任务指令', '系统角色', '历史对话1', '历史对话2', '工具描述A', '工具描述B', '知识库片段1', '知识库片段2', '工具描述C', '工具描述D', '报告模板', '数据字典'];

const Slide05_MemoryProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [simulating, setSimulating] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.mem-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.mem-problem', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.mem-solution', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, delay: 0.5 });
      gsap.fromTo('.mem-insight', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!simulating || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const blocks = containerRef.current!.querySelectorAll('.ctx-block');
      blocks.forEach((b, i) => {
        gsap.fromTo(b, { opacity: 0, y: 10 }, { opacity: Math.max(0.15, 1 - i * 0.08), y: 0, duration: 0.3, delay: i * 0.15 });
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [simulating] });

  const solutions = [
    { icon: Layers, title: '渐进式披露', desc: '不一次性加载所有信息，只加载当前需要的。Skills系统就是这个思路。', metric: '2,700 vs 50,000 tokens' },
    { icon: Minimize2, title: '上下文压缩', desc: '长对话自动摘要，Embedding+BM25语义搜索保留关键信息。', metric: '200ms 检索延迟' },
    { icon: Shield, title: 'Harness工程', desc: '预设身份和约束（SOUL层），减少模型的无效探索。', metric: '约束优先原则' },
  ];

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="mem-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">问题1：记忆问题</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">上下文记忆能力有限 — 注意力稀释导致"记不住"</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full mb-6">
        {/* Problem demo */}
        <div className="mem-problem">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-h3 font-bold text-[var(--primary)]">上下文窗口模拟</h3>
            <button onClick={() => { setSimulating(true); setShowSolution(false); }} className="px-3 py-1 rounded-lg text-caption font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
              {simulating ? '重新模拟' : '▶ 模拟注意力稀释'}
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] p-3 min-h-[260px] bg-[var(--bg-secondary)]">
            {!simulating ? (
              <p className="text-body-sm text-[var(--text-light)] text-center py-10">点击"模拟"按钮，观察上下文逐渐被填满时，前面内容的注意力如何被稀释</p>
            ) : !showSolution ? (
              <div className="space-y-1.5">
                {BLOCKS.map((b, i) => (
                  <div key={i} className="ctx-block rounded px-3 py-1.5 text-caption" style={{ backgroundColor: `rgba(0, 102, 204, ${Math.max(0.08, 0.3 - i * 0.02)})`, color: 'var(--text-primary)' }}>
                    {b} <span className="float-right text-[var(--text-light)]">{i < 3 ? '✅ 清晰' : i < 7 ? '⚠️ 模糊' : '❌ 丢失'}</span>
                  </div>
                ))}
                <button onClick={() => setShowSolution(true)} className="w-full mt-2 py-2 rounded-lg text-caption font-bold text-white" style={{ backgroundColor: 'var(--success)' }}>看到问题？点击查看解决方案 →</button>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="rounded px-3 py-2 text-caption font-bold text-white" style={{ backgroundColor: 'var(--primary)', opacity: 1 }}>✅ 只加载：当前任务指令 + 相关Skill</div>
                <div className="rounded px-3 py-1.5 text-caption border border-dashed" style={{ borderColor: 'var(--border)', color: 'var(--text-light)' }}>⬇ 其余内容按需渐进加载...</div>
                <p className="text-caption text-[var(--success)] mt-3 font-semibold">💡 渐进式披露：只加载需要的，注意力不再稀释！</p>
              </div>
            )}
          </div>
        </div>

        {/* Solutions */}
        <div className="space-y-4">
          {solutions.map((s, i) => (
            <div key={i} className={`mem-solution rounded-xl p-5 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${showSolution && i === 0 ? 'ring-2' : ''}`} style={{ borderColor: 'var(--primary)' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-accent)] flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-[var(--primary)]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-body font-bold text-[var(--text-primary)]">{s.title}</h4>
                    <span className="text-caption px-2 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--primary)] font-semibold">{s.metric}</span>
                  </div>
                  <p className="text-body-sm text-[var(--text-secondary)] mt-1">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mem-insight max-w-5xl mx-auto w-full">
        <div className="rounded-xl p-4 text-center" style={{ background: 'linear-gradient(90deg, var(--bg-accent), var(--bg-secondary))', border: '1px solid var(--border)' }}>
          <p className="text-body font-bold text-[var(--primary)]">💡 Skills的渐进式加载是解决上下文问题的核心方案 — 节省94%的token消耗</p>
        </div>
        <div className="mt-4">
          <ExpandableSection toggleLabel="为什么256K上下文仍然不够？" hintText="点击展开">
            <p className="text-body-sm text-[var(--text-secondary)]">即使模型支持256K token上下文，实际使用中工具描述、知识库文档、历史对话等会迅速占满窗口。研究表明，当上下文超过64K token时，模型对开头内容的注意力显著下降。渐进式披露（只加载当前Skill的指令）是工业界验证过的最佳实践。</p>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide05_MemoryProblem);
