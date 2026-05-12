import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const LAYERS = [
  { name: '工具协议层', color: '#FF6B35', items: [{ n: 'MCP', d: 'AI的USB-C标准接口', o: '开源' }, { n: 'APIs', d: '传统接口协议', o: '开源' }, { n: 'A2A', d: 'Google Agent间通信', o: '开源' }] },
  { name: 'Agent产品层', color: '#0066CC', items: [{ n: 'OpenClaw ⭐', d: '开源Agent操作系统,278K Stars', o: '开源', hl: true }, { n: 'Claude Code', d: '编程Agent终端工具', o: '闭源' }, { n: 'Manus', d: '通用Agent(Meta收购)', o: '闭源' }] },
  { name: 'Agent平台层', color: '#10B981', items: [{ n: 'Dify', d: '可视化Agent开发平台', o: '开源' }, { n: 'Coze(扣子)', d: '字节AI办公全家桶', o: '闭源' }, { n: 'n8n', d: '工作流自动化+AI', o: '开源' }] },
  { name: 'LLM底座层', color: '#64748B', items: [{ n: 'OpenAI', d: 'GPT系列', o: '闭源' }, { n: 'Anthropic', d: 'Claude系列', o: '闭源' }, { n: '开源模型', d: 'DeepSeek/GLM/九天', o: '开源' }] },
];

const Slide03_Ecosystem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ text: string; open: string } | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.eco-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.eco-layer', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="eco-title text-center mb-8">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">AI Agent 生态全景</h2>
        <p className="text-body text-[var(--text-secondary)] mt-2">每个产品都在解决什么问题？</p>
      </div>

      <div className="max-w-4xl w-full space-y-3">
        {LAYERS.map((layer, li) => (
          <div key={li} className="eco-layer rounded-xl p-4 border-2" style={{ borderColor: layer.color, backgroundColor: `${layer.color}08` }}>
            <span className="text-body font-bold mb-2 block" style={{ color: layer.color }}>{layer.name}</span>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item, ii) => (
                <span key={ii}
                  className={`px-3 py-1.5 rounded-lg text-caption font-semibold border cursor-pointer transition-all duration-200 hover:scale-105 ${item.hl ? 'ring-2 ring-offset-1' : ''}`}
                  style={{ borderColor: layer.color, color: layer.color, backgroundColor: item.hl ? `${layer.color}20` : 'var(--bg-primary)' }}
                  onMouseEnter={() => setTooltip({ text: item.d, open: item.o })}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {item.n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {tooltip && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-card text-body-sm max-w-[260px]" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}>
          <p className="text-[var(--text-primary)]">{tooltip.text}</p>
          <span className="text-caption" style={{ color: tooltip.open === '开源' ? 'var(--success)' : 'var(--accent)' }}>{tooltip.open}</span>
        </div>
      )}

      <p className="text-caption text-[var(--text-light)] mt-6">⭐ 本讲座以 OpenClaw 为主线案例</p>
    </section>
  );
};

export default memo(Slide03_Ecosystem);
