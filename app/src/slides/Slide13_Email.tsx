import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Clock, Bot, User, ArrowRight, Sparkles, Database, Eye } from 'lucide-react';
import DataCard from '@/components/DataCard';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide13_Email: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Title entrance
      tl.fromTo('.s13-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.s13-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      tl.fromTo('.s13-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      // Before panel
      tl.fromTo('.s13-before', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
      // Arrow
      tl.fromTo('.s13-arrow', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2');
      // After panel
      tl.fromTo('.s13-after', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

      // Hero metric
      tl.fromTo('.s13-metric', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2');

      // Highlight
      tl.fromTo('.s13-highlight', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      // Counter animation
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 90,
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.out',
        onUpdate: () => setDisplayValue(Math.round(counterObj.val)),
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const beforeItems = [
    { icon: Clock, text: '每天花费 30分钟 处理邮件', highlight: '30分钟' },
    { icon: User, text: '手动分类、回复、转发', highlight: '' },
    { icon: Database, text: '16个知识库逐一检索', highlight: '16个' },
    { icon: Eye, text: '重要邮件可能遗漏', highlight: '' },
  ];

  const afterItems = [
    { icon: Clock, text: '每天仅需 3分钟 审核', highlight: '3分钟' },
    { icon: Bot, text: 'Agent自动分类+草拟回复', highlight: 'Agent' },
    { icon: Sparkles, text: '并行检索16个知识库', highlight: '并行' },
    { icon: Eye, text: '优先级排序，不遗漏', highlight: '' },
  ];

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <div className="s13-title text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Mail className="w-8 h-8 text-[var(--accent)]" strokeWidth={2} />
            <h2 className="text-h1 font-extrabold text-[var(--primary)]">场景1：日常办公自动化</h2>
          </div>
          <p className="s13-subtitle text-h3 text-[var(--text-secondary)]">邮件处理 — 从30分钟到3分钟</p>
          <div className="s13-divider w-24 h-0.5 mx-auto mt-4 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)' }} />
        </div>

        {/* Before / After Comparison */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-stretch">
          {/* Before */}
          <div className="s13-before rounded-2xl p-6 border border-[var(--border)] bg-[var(--card-bg)]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-red-400" strokeWidth={2} />
              </div>
              <h3 className="text-h3 font-bold text-[var(--text-primary)]">Before（人工）</h3>
            </div>
            <ul className="space-y-3">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-body-sm text-[var(--text-secondary)]">
                  <item.icon className="w-4 h-4 mt-0.5 text-[var(--text-light)] flex-shrink-0" strokeWidth={2} />
                  <span dangerouslySetInnerHTML={{ __html: item.highlight ? item.text.replace(item.highlight, `<strong class="text-[var(--text-primary)]">${item.highlight}</strong>`) : item.text }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <div className="s13-arrow hidden md:flex items-center justify-center px-4">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-accent)] border-2 border-[var(--secondary)] flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-[var(--secondary)]" strokeWidth={2.5} />
            </div>
          </div>

          {/* After */}
          <div className="s13-after rounded-2xl p-6 border-2 border-[var(--accent)] bg-[var(--bg-accent)]/30">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 font-bold text-[var(--primary)]">After（Agent）</h3>
            </div>
            <ul className="space-y-3">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-body-sm text-[var(--text-secondary)]">
                  <item.icon className="w-4 h-4 mt-0.5 text-[var(--accent)] flex-shrink-0" strokeWidth={2} />
                  <span dangerouslySetInnerHTML={{ __html: item.highlight ? item.text.replace(item.highlight, `<strong class="text-[var(--accent)]">${item.highlight}</strong>`) : item.text }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hero Metric */}
        <div className="s13-metric w-full max-w-xs">
          <DataCard
            value={displayValue}
            suffix="%"
            label="时间节省"
            description="邮件处理效率提升"
            showArrow
          />
        </div>

        {/* Key Highlight */}
        <div className="s13-highlight flex items-center gap-3 px-6 py-4 rounded-xl bg-[var(--bg-accent)] border border-[var(--border)] max-w-2xl">
          <Sparkles className="w-5 h-5 text-[var(--accent)] flex-shrink-0" strokeWidth={2} />
          <p className="text-body-sm text-[var(--text-secondary)]">
            广西移动AI办公助手已覆盖<strong className="text-[var(--primary)]">16个知识库</strong>，日处理邮件量超过<strong className="text-[var(--primary)]">1000封</strong>
          </p>
        </div>

        {/* Expandable Details */}
        <div className="s13-highlight w-full max-w-2xl">
          <ExpandableSection toggleLabel="实现细节" hintText="点击展开">
            <div className="space-y-3 text-body-sm text-[var(--text-secondary)]">
              <p>Agent使用<strong className="text-[var(--primary)]">RAG（检索增强生成）</strong>技术检索知识库，结合用户历史偏好生成个性化回复草稿。</p>
              <p>工作流程：邮件到达 → 意图识别 → 并行知识库检索 → 上下文整合 → 草稿生成 → 人工审核确认。</p>
              <p>支持多种邮件类型：客户咨询、内部协作、故障通知、审批流转等，每类邮件有专属处理模板和优先级规则。</p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide13_Email);
