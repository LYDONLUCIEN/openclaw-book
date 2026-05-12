import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BookOpen, Zap, Brain } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const COLUMNS = [
  { title: '解决知识问题', color: 'var(--success)', icon: BookOpen, items: [
    { label: 'Skills = 业务流程的"食谱"', desc: '不只知道事实，还知道怎么做' },
    { label: 'SKILL.md 标准', desc: '三部分：元数据+工作流步骤+约束' },
    { label: '示例：日报生成Skill', desc: '知道去哪取数据+数据格式+报告模板' },
  ]},
  { title: '解决行动问题', color: 'var(--accent)', icon: Zap, items: [
    { label: 'Skills = 工具的"组合配方"', desc: '编排多个工具完成复杂任务' },
    { label: 'Tools vs Skills', desc: '工具是厨具，技能是食谱' },
    { label: '示例：日报Skill编排', desc: 'query_database + format + send_email' },
  ]},
  { title: '解决记忆问题', color: 'var(--primary)', icon: Brain, items: [
    { label: 'Skills = 渐进式加载', desc: '只加载当前需要的Skill指令' },
    { label: 'Token消耗对比', desc: '2,700 vs 50,000 — 节省94%' },
    { label: '任务完成率', desc: '25% → 95%（LangChain实验）' },
  ]},
];

const Slide10_OpenClawSkills: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.sk-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.sk-col', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, delay: 0.3 });
      gsap.fromTo('.sk-bottom', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="sk-title text-center mb-8">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">Skills：连接知识、行动和记忆的桥梁</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">OpenClaw的Skills系统同时解决了三个核心问题</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl w-full mb-6">
        {COLUMNS.map((col, ci) => (
          <div key={ci} className="sk-col rounded-2xl p-5 border-2" style={{ borderColor: col.color, backgroundColor: `${col.color}05` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${col.color}15` }}>
                <col.icon className="w-5 h-5" style={{ color: col.color }} strokeWidth={2} />
              </div>
              <h3 className="text-body font-bold" style={{ color: col.color }}>{col.title}</h3>
            </div>
            <div className="space-y-3">
              {col.items.map((item, ii) => (
                <div key={ii} className="p-3 rounded-lg" style={{ backgroundColor: `${col.color}08` }}>
                  <p className="text-body-sm font-semibold text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-caption text-[var(--text-secondary)] mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sk-bottom rounded-xl p-4 text-center max-w-3xl w-full" style={{ background: 'linear-gradient(90deg, var(--bg-accent), var(--bg-secondary))', border: '1px solid var(--border)' }}>
        <p className="text-body font-bold text-[var(--text-primary)]">ClawHub技能市场：13,729个注册Skills</p>
        <p className="text-caption text-[var(--accent)] mt-1">⚠️ 超50%低质量/重复，约20%被标记潜在恶意 — 选择优质Skills很重要</p>
      </div>
    </section>
  );
};

export default memo(Slide10_OpenClawSkills);
