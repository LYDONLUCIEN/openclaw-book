import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }
const DATA = [
  { dim: '生态丰富度', OpenClaw: 95, Hermes: 40, ClaudeCode: 60 },
  { dim: '安全性', OpenClaw: 70, Hermes: 95, ClaudeCode: 90 },
  { dim: '成本优势', OpenClaw: 95, Hermes: 60, ClaudeCode: 30 },
  { dim: '易用性', OpenClaw: 80, Hermes: 75, ClaudeCode: 70 },
  { dim: '平台覆盖', OpenClaw: 95, Hermes: 30, ClaudeCode: 20 },
  { dim: '自托管能力', OpenClaw: 100, Hermes: 0, ClaudeCode: 0 },
];

const Slide12_Comparison: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cmp-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.cmp-chart', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.3 });
      gsap.fromTo('.cmp-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, delay: 0.8 });
      gsap.fromTo('.cmp-bottom', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const cards = [
    { name: 'OpenClaw', color: '#FF6B35', pros: ['278K Stars', '13,729 Skills', '24+平台', '自托管', '模型自由'], cons: ['安全事件', '质量参差'] },
    { name: 'Hermes Agent', color: '#00B4D8', pros: ['GEPA自进化+40%', '零CVE', '173倍检索加速'], cons: ['仅118 Skills', '6平台'] },
    { name: 'Claude Code', color: '#0066CC', pros: ['SWE-bench 87.6%', 'SOC 2认证', '深度IDE集成'], cons: ['只会编程', '$200+/月'] },
  ];

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="cmp-title text-center mb-4">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">三Agent横向对比</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">OpenClaw vs Hermes Agent vs Claude Code</p>
      </div>

      <div className="cmp-chart w-full max-w-lg mx-auto mb-4">
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={DATA}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <Radar name="OpenClaw" dataKey="OpenClaw" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.15} strokeWidth={2} />
            <Radar name="Hermes" dataKey="Hermes" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.1} strokeWidth={2} />
            <Radar name="Claude Code" dataKey="ClaudeCode" stroke="#0066CC" fill="#0066CC" fillOpacity={0.1} strokeWidth={2} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-3 gap-4 max-w-4xl w-full mb-4">
        {cards.map((c, i) => (
          <div key={i} className="cmp-card rounded-xl p-4 border-2" style={{ borderColor: c.color }}>
            <h4 className="text-body font-bold mb-2" style={{ color: c.color }}>{c.name}</h4>
            <div className="space-y-1">
              {c.pros.map((p, j) => <p key={j} className="text-caption text-[var(--success)]">✅ {p}</p>)}
              {c.cons.map((c2, j) => <p key={j} className="text-caption text-[var(--accent)]">⚠️ {c2}</p>)}
            </div>
          </div>
        ))}
      </div>

      <div className="cmp-bottom max-w-4xl w-full">
        <div className="rounded-xl p-3 text-center mb-3" style={{ background: 'linear-gradient(90deg, var(--bg-accent), var(--bg-secondary))', border: '1px solid var(--border)' }}>
          <p className="text-body-sm font-bold text-[var(--text-primary)]">选型口诀：要广度选OpenClaw，要自进化选Hermes，要编程选Claude Code</p>
        </div>
        <ExpandableSection toggleLabel="其他AI产品速览" hintText="点击展开">
          <div className="grid grid-cols-2 gap-2 text-caption">
            <p><strong>Coze(扣子)</strong>：字节AI办公全家桶，写作/PPT/建站/设计</p>
            <p><strong>Dify</strong>：可视化Agent开发平台，50K+ Stars</p>
            <p><strong>n8n</strong>：工作流自动化+AI，500+集成</p>
            <p><strong>Manus</strong>：通用Agent，被Meta收购</p>
          </div>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide12_Comparison);
