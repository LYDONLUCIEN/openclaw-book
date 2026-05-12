import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ShieldCheck, Bot, User, ArrowRight,
  Download, Filter, ScanSearch, FileText, Award, CheckCircle2
} from 'lucide-react';
import DataCard from '@/components/DataCard';
import ExpandableSection from '@/components/ExpandableSection';
import FlowDiagram from '@/components/FlowDiagram';
import Badge from '@/components/Badge';

interface SlideProps { isActive: boolean; }

const Slide16_Audit: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  const processNodes = [
    { id: 'ingest', title: '采集', description: '从5个系统抽取数据', icon: Download },
    { id: 'validate', title: '校验', description: '规则引擎+AI双重校验', icon: Filter },
    { id: 'detect', title: '检测', description: '异常模式识别', icon: ScanSearch },
    { id: 'report', title: '报告', description: '自动生成合规报告', icon: FileText },
  ];

  const beforeItems = [
    { text: '5个工作日 完成稽核', highlight: '5个工作日' },
    { text: '5个系统手动核对', highlight: '5个系统' },
    { text: '人工比对规则逐条检查', highlight: '' },
    { text: 'Excel逐行检查易出错', highlight: '' },
  ];

  const afterItems = [
    { text: '1小时 完成全部稽核', highlight: '1小时' },
    { text: 'Agent自动采集比对', highlight: 'Agent' },
    { text: '智能规则匹配+异常标注', highlight: '智能' },
    { text: '自动生成合规报告', highlight: '' },
  ];

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.s16-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.s16-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      tl.fromTo('.s16-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      // Process flow
      tl.fromTo('.s16-flow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');

      // Before/After
      tl.fromTo('.s16-before', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
      tl.fromTo('.s16-arrow', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2');
      tl.fromTo('.s16-after', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

      // Metric
      tl.fromTo('.s16-metric', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2');

      // Highlight
      tl.fromTo('.s16-highlight', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      // Compliance badge
      tl.fromTo('.s16-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.3');

      // Counter
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 98,
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
        <div className="s16-title text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ShieldCheck className="w-8 h-8 text-[var(--accent)]" strokeWidth={2} />
            <h2 className="text-h1 font-extrabold text-[var(--primary)]">场景4：跨系统数据稽核</h2>
          </div>
          <p className="s16-subtitle text-h3 text-[var(--text-secondary)]">从5天到1小时的合规利器</p>
          <div className="s16-divider w-24 h-0.5 mx-auto mt-4 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)' }} />
        </div>

        {/* 4-Step Process Flow */}
        <div className="s16-flow w-full overflow-x-auto">
          <FlowDiagram
            nodes={processNodes}
            layout="horizontal"
          />
        </div>

        {/* Before / After */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-stretch">
          {/* Before */}
          <div className="s16-before rounded-2xl p-5 border border-[var(--border)] bg-[var(--card-bg)]">
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

          <div className="s16-arrow hidden md:flex items-center justify-center px-4">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-accent)] border-2 border-[var(--secondary)] flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-[var(--secondary)]" strokeWidth={2.5} />
            </div>
          </div>

          {/* After */}
          <div className="s16-after rounded-2xl p-5 border-2 border-[var(--accent)] bg-[var(--bg-accent)]/30">
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
        <div className="s16-metric w-full max-w-xs">
          <DataCard
            value={displayValue}
            suffix="%"
            label="时间节省"
            description="跨系统数据稽核效率"
            showArrow
          />
        </div>

        {/* Highlight + Badge */}
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl">
          <div className="s16-highlight flex-1 flex items-center gap-3 px-6 py-4 rounded-xl bg-[var(--bg-accent)] border border-[var(--border)]">
            <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0" strokeWidth={2} />
            <p className="text-body-sm text-[var(--text-secondary)]">
              甘肃移动每月处理<strong className="text-[var(--primary)]">5000+票据</strong>，准确率从<strong className="text-[var(--primary)]">92%</strong>提升至<strong className="text-[var(--success)]">99.7%</strong>
            </p>
          </div>
          <div className="s16-badge">
            <Badge variant="success">
              <Award className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
              满足SOX合规要求
            </Badge>
          </div>
        </div>

        {/* Expandable */}
        <div className="s16-highlight w-full max-w-2xl">
          <ExpandableSection toggleLabel="合规与审计日志" hintText="点击展开">
            <div className="space-y-3 text-body-sm text-[var(--text-secondary)]">
              <p>所有Agent操作都有<strong className="text-[var(--primary)]">完整审计轨迹</strong>，满足内部合规要求和外部审计标准。</p>
              <p>审计日志包含：操作时间戳、执行动作、涉及数据范围、校验规则命中情况、异常标注详情、操作人员确认记录。</p>
              <p>日志数据采用<strong className="text-[var(--primary)]">区块链式防篡改</strong>存储，确保审计证据的完整性和不可抵赖性，满足SOX法案对内部控制的严格要求。</p>
              <p>支持按月、按季度自动生成合规报告，直接提交审计部门审核。</p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide16_Audit);
