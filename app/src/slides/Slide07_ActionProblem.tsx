import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Bot, Plug, Database, Globe, FileText } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide07_ActionProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mcpStep, setMcpStep] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.act-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.act-demo', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.act-compare', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (mcpStep <= 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      if (mcpStep === 1) gsap.fromTo('.packet-right', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
      if (mcpStep === 2) gsap.fromTo('.packet-left', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [mcpStep] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="act-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">问题3：行动问题</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">模型只能生成文字，不能执行操作</p>
      </div>

      {/* MCP Call Simulator */}
      <div className="act-demo max-w-4xl mx-auto w-full rounded-2xl p-6 border-2 mb-6" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-h3 font-bold text-[var(--accent)]">MCP工具调用模拟</h3>
          <button onClick={() => setMcpStep(mcpStep >= 2 ? 0 : mcpStep + 1)} className="px-4 py-2 rounded-lg text-body-sm font-bold text-white" style={{ backgroundColor: 'var(--accent)' }}>
            {mcpStep >= 2 ? '重置演示' : mcpStep === 0 ? '▶ 发送MCP请求' : '接收响应 →'}
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Agent */}
          <div className="flex flex-col items-center p-4 rounded-xl border-2 min-w-[120px]" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--bg-primary)' }}>
            <Bot className="w-8 h-8 text-[var(--primary)]" strokeWidth={2} />
            <span className="text-caption font-bold text-[var(--primary)] mt-1">Agent</span>
          </div>

          {/* MCP Layer + packets */}
          <div className="flex-1 flex flex-col items-center gap-2 relative min-h-[100px]">
            <div className="p-3 rounded-xl border-2 border-[var(--accent)] bg-[var(--bg-primary)]">
              <Plug className="w-6 h-6 text-[var(--accent)]" strokeWidth={2} />
              <span className="text-caption text-[var(--accent)]">MCP</span>
            </div>
            {mcpStep >= 1 && (
              <div className="packet-right w-full rounded-lg p-2 text-xs font-mono bg-[var(--primary)] text-white text-center">
                📤 {`{ tool: "query_database", sql: "SELECT * FROM alerts" }`}
              </div>
            )}
            {mcpStep >= 2 && (
              <div className="packet-left w-full rounded-lg p-2 text-xs font-mono border text-center" style={{ borderColor: 'var(--success)', color: 'var(--success)' }}>
                📥 {`{ rows: 156, critical: 3, warning: 23 }`}
              </div>
            )}
          </div>

          {/* Tools */}
          <div className="flex flex-col items-center p-4 rounded-xl border-2 min-w-[120px]" style={{ borderColor: 'var(--success)', backgroundColor: 'var(--bg-primary)' }}>
            <div className="flex gap-1.5">
              <Database className="w-5 h-5 text-[var(--success)]" /><Globe className="w-5 h-5 text-[var(--success)]" /><FileText className="w-5 h-5 text-[var(--success)]" />
            </div>
            <span className="text-caption font-bold text-[var(--success)] mt-1">Tools</span>
          </div>
        </div>
      </div>

      {/* MCP vs Skills comparison */}
      <div className="act-compare grid md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full mb-4">
        <div className="rounded-xl p-5 border border-red-300 bg-red-50" style={{ borderColor: '#fca5a5', backgroundColor: '#fef2f2' }}>
          <h4 className="text-body font-bold text-red-600 mb-2">⚠️ MCP的问题</h4>
          <p className="text-body-sm text-[var(--text-secondary)]">每次调用要加载完整的工具描述schema</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-6 rounded bg-red-200 flex items-center justify-end pr-2">
              <span className="text-caption font-bold text-red-700">50,000 tokens</span>
            </div>
          </div>
          <p className="text-caption text-red-500 mt-1">上下文被大量工具描述占满 → 注意力稀释</p>
        </div>
        <div className="rounded-xl p-5 border border-green-300 bg-green-50" style={{ borderColor: '#86efac', backgroundColor: '#f0fdf4' }}>
          <h4 className="text-body font-bold text-green-600 mb-2">✅ Skills的解决方案</h4>
          <p className="text-body-sm text-[var(--text-secondary)]">只加载当前需要的Skill指令</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-[12%] h-6 rounded bg-green-400 flex items-center justify-center">
              <span className="text-caption font-bold text-white">2.7K</span>
            </div>
            <div className="w-[88%] h-6 rounded bg-green-100 flex items-center px-2">
              <span className="text-caption text-green-600">节省的空间 ✨</span>
            </div>
          </div>
          <p className="text-caption text-green-600 mt-1">节省94%上下文，任务完成率 25% → 95%</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <div className="rounded-xl p-4 text-center" style={{ background: 'linear-gradient(90deg, var(--bg-accent), var(--bg-secondary))', border: '1px solid var(--border)' }}>
          <p className="text-body font-bold text-[var(--text-primary)]">💡 MCP解决了"能不能调用"的问题，Skills解决了"调用效率"的问题</p>
        </div>
        <div className="mt-3">
          <ExpandableSection toggleLabel="MCP协议的细节" hintText="点击展开">
            <p className="text-body-sm text-[var(--text-secondary)]">MCP（Model Context Protocol）由Anthropic于2024年11月发布，被类比为"AI的USB-C"。它解决了M×N集成问题（M个模型×N个工具），通过一个标准协议连接所有模型和工具。目前已近2000个MCP服务器，Linux基金会成立了Agentic AI Foundation来管理。但MCP每次加载完整工具描述，在上下文有限时效率较低，这正是Skills渐进式加载的价值所在。</p>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide07_ActionProblem);
