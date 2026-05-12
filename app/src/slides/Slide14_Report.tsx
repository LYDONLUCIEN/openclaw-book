import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  FileBarChart, Bot, User, ArrowRight, Database,
  Server, CreditCard, Landmark, FileSpreadsheet, Presentation, TrendingUp
} from 'lucide-react';
import DataCard from '@/components/DataCard';
import ExpandableSection from '@/components/ExpandableSection';
import FlowDiagram from '@/components/FlowDiagram';

interface SlideProps { isActive: boolean; }

const Slide14_Report: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  const sourceNodes = [
    { id: 'src-crm', title: 'CRM系统', description: '客户数据', icon: Database },
    { id: 'src-billing', title: '计费系统', description: '收入数据', icon: CreditCard },
    { id: 'src-nms', title: '网管系统', description: '网络指标', icon: Server },
    { id: 'src-finance', title: '财务系统', description: '财务报表', icon: Landmark },
  ];

  const flowNodes = [
    { id: 'input', title: '数据源', description: '8个系统', icon: Database, active: false },
    { id: 'agent', title: 'AI Agent', description: '采集分析', icon: Bot, active: true },
    { id: 'output', title: '输出成果', description: '标准化报告', icon: FileBarChart, active: false },
  ];

  const outputItems = [
    { icon: Presentation, text: '20页PPT报告' },
    { icon: FileSpreadsheet, text: 'Excel数据表' },
    { icon: TrendingUp, text: '趋势分析图表' },
  ];

  const beforeItems = [
    { text: '2-3天 完成报告', highlight: '2-3天' },
    { text: '登录8个系统手动导出', highlight: '8个系统' },
    { text: '手动截图汇总', highlight: '' },
    { text: '格式不统一，数据口径差异', highlight: '' },
  ];

  const afterItems = [
    { text: '30分钟 自动生成', highlight: '30分钟' },
    { text: 'Agent自动登录采集数据', highlight: 'Agent' },
    { text: '智能生成图表和分析', highlight: '智能' },
    { text: '标准化输出，口径一致', highlight: '' },
  ];

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.s14-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.s14-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      tl.fromTo('.s14-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      // Source system icons
      tl.fromTo('.s14-source', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.2');

      // Flow diagram
      tl.fromTo('.s14-flow', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2');

      // Before/After
      tl.fromTo('.s14-before', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
      tl.fromTo('.s14-arrow', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2');
      tl.fromTo('.s14-after', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

      // Metric
      tl.fromTo('.s14-metric', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2');

      // Counter
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 99,
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.out',
        onUpdate: () => setDisplayValue(Math.round(counterObj.val)),
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-7">
        {/* Header */}
        <div className="s14-title text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FileBarChart className="w-8 h-8 text-[var(--accent)]" strokeWidth={2} />
            <h2 className="text-h1 font-extrabold text-[var(--primary)]">场景2：月度经营分析报告</h2>
          </div>
          <p className="s14-subtitle text-h3 text-[var(--text-secondary)]">从2-3天到30分钟的质变</p>
          <div className="s14-divider w-24 h-0.5 mx-auto mt-4 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)' }} />
        </div>

        {/* Data Source Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {sourceNodes.map((src) => (
            <div key={src.id} className="s14-source flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border)]">
              <src.icon className="w-6 h-6 text-[var(--primary)]" strokeWidth={2} />
              <span className="text-caption font-medium text-[var(--text-secondary)]">{src.title}</span>
            </div>
          ))}
          <div className="s14-source flex items-center gap-1 px-3 py-3">
            <span className="text-caption text-[var(--text-light)]">+ 其他4个系统</span>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="s14-flow w-full">
          <FlowDiagram
            nodes={flowNodes}
            layout="horizontal"
          />
        </div>

        {/* Output items */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {outputItems.map((item, i) => (
            <div key={i} className="s14-flow flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-accent)] border border-[var(--border)]">
              <item.icon className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
              <span className="text-body-sm font-medium text-[var(--text-secondary)]">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-stretch">
          {/* Before */}
          <div className="s14-before rounded-2xl p-5 border border-[var(--border)] bg-[var(--card-bg)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <User className="w-4 h-4 text-red-400" strokeWidth={2} />
              </div>
              <h3 className="text-h3 font-bold text-[var(--text-primary)]">Before</h3>
            </div>
            <ul className="space-y-2.5">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-body-sm text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: item.highlight ? item.text.replace(item.highlight, `<strong class="text-[var(--text-primary)]">${item.highlight}</strong>`) : item.text }} />
                </li>
              ))}
            </ul>
          </div>

          <div className="s14-arrow hidden md:flex items-center justify-center px-4">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-accent)] border-2 border-[var(--secondary)] flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-[var(--secondary)]" strokeWidth={2.5} />
            </div>
          </div>

          {/* After */}
          <div className="s14-after rounded-2xl p-5 border-2 border-[var(--accent)] bg-[var(--bg-accent)]/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 font-bold text-[var(--primary)]">After</h3>
            </div>
            <ul className="space-y-2.5">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-body-sm text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: item.highlight ? item.text.replace(item.highlight, `<strong class="text-[var(--accent)]">${item.highlight}</strong>`) : item.text }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hero Metric */}
        <div className="s14-metric w-full max-w-xs">
          <DataCard
            value={displayValue}
            suffix="%"
            label="时间节省（最高）"
            description="月度报告生成效率"
            showArrow
          />
        </div>

        {/* Expandable */}
        <div className="s14-metric w-full max-w-2xl">
          <ExpandableSection toggleLabel="Agent如何处理数据不一致" hintText="点击展开">
            <div className="space-y-3 text-body-sm text-[var(--text-secondary)]">
              <p>当不同系统数据口径不一致时，Agent会自动<strong className="text-[var(--primary)]">标注差异</strong>并提示用户确认。</p>
              <p>具体机制：数据采集后进行交叉验证 → 识别口径差异（如统计周期、计算方法不同） → 自动标注差异项 → 生成数据质量报告 → 提供统一口径建议。</p>
              <p>Agent内置了<strong className="text-[var(--primary)]">8个系统</strong>的数据字典映射关系，能够在采集阶段自动进行标准化转换。</p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide14_Report);
