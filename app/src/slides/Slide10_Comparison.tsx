import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ComparisonTable from '@/components/ComparisonTable';
import type { ComparisonColumn, ComparisonRow } from '@/components/ComparisonTable';
import ExpandableSection from '@/components/ExpandableSection';
import Badge from '@/components/Badge';

interface SlideProps {
  isActive: boolean;
}

const columns: ComparisonColumn[] = [
  { key: 'openclaw', header: 'OpenClaw', featured: true },
  { key: 'hermes', header: 'Hermes Agent' },
  { key: 'claude', header: 'Claude Code' },
];

const rows: ComparisonRow[] = [
  {
    feature: '定位',
    values: {
      openclaw: '通用AI操作系统',
      hermes: '自进化数字助手',
      claude: '专业编程Agent',
    },
  },
  {
    feature: '开源',
    values: {
      openclaw: true,
      hermes: false,
      claude: false,
    },
  },
  {
    feature: 'Skills数量',
    values: {
      openclaw: '13,729',
      hermes: '118',
      claude: '专业领域',
    },
    highlight: 'openclaw',
  },
  {
    feature: '平台覆盖',
    values: {
      openclaw: '24+',
      hermes: '6',
      claude: 'IDE(8平台)',
    },
    highlight: 'openclaw',
  },
  {
    feature: '自托管',
    values: {
      openclaw: true,
      hermes: false,
      claude: false,
    },
  },
  {
    feature: '安全认证',
    values: {
      openclaw: '社区审计',
      hermes: '零CVE',
      claude: 'SOC 2 Type II',
    },
  },
  {
    feature: '核心优势',
    values: {
      openclaw: '模型自由 + 渠道广',
      hermes: 'GEPA自进化',
      claude: 'SWE-bench 87.6%',
    },
  },
  {
    feature: '价格',
    values: {
      openclaw: 'DeepSeek 1/21',
      hermes: '订阅制',
      claude: '$200+/月',
    },
  },
];

const Slide10_Comparison: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        tl.fromTo(
          '.s10-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        tl.fromTo(
          '.s10-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

        tl.fromTo(
          '.s10-table',
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.2'
        );

        tl.fromTo(
          '.s10-takeaway',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        );

        tl.fromTo(
          '.s10-expand',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [isActive] }
  );

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="s10-title text-h1 font-bold text-[var(--primary)] opacity-0">
            三Agent横向对比
          </h2>
          <p className="s10-subtitle text-body text-[var(--text-secondary)] mt-3 opacity-0">
            OpenClaw vs Hermes Agent vs Claude Code
          </p>
        </div>

        {/* Comparison Table */}
        <div className="s10-table opacity-0">
          <ComparisonTable columns={columns} rows={rows} />
        </div>

        {/* Takeaway Bar */}
        <div
          className="s10-takeaway rounded-xl p-4 text-center opacity-0"
          style={{
            background:
              'linear-gradient(135deg, var(--bg-accent), var(--bg-secondary))',
            border: '1px solid var(--border)',
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Badge variant="accent">选型口诀</Badge>
          </div>
          <p className="text-body font-semibold text-[var(--text-primary)] mt-2">
            要广度选
            <span className="text-[var(--accent)] font-bold"> OpenClaw</span>
            ，要自进化选
            <span className="text-[var(--accent)] font-bold"> Hermes</span>
            ，要编程选
            <span className="text-[var(--accent)] font-bold"> Claude Code</span>
          </p>
        </div>

        {/* Expandable: Anthropic Ban */}
        <div className="s10-expand opacity-0">
          <ExpandableSection
            toggleLabel="Anthropic禁令事件"
            hintText="点击展开详情"
          >
            <div className="space-y-3">
              <p className="text-body-sm text-[var(--text-primary)]">
                <strong>2026年4月</strong>，Anthropic正式禁止OpenClaw使用Claude订阅计划，
                这意味着OpenClaw用户无法继续以$20/月的Claude Pro价格调用Claude模型。
              </p>
              <div className="flex flex-wrap gap-3">
                <div
                  className="flex-1 min-w-[200px] rounded-lg p-3"
                  style={{
                    backgroundColor: 'var(--bg-accent)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="text-caption text-[var(--text-light)]">
                    禁令前成本
                  </span>
                  <p className="text-data font-bold text-[var(--success)]">
                    $200<span className="text-h3">/月</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-h2 text-[var(--text-light)]">&rarr;</span>
                </div>
                <div
                  className="flex-1 min-w-[200px] rounded-lg p-3"
                  style={{
                    backgroundColor: 'var(--bg-accent)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="text-caption text-[var(--text-light)]">
                    禁令后成本
                  </span>
                  <p className="text-data font-bold text-[var(--accent)]">
                    $800-1200+<span className="text-h3">/月</span>
                  </p>
                </div>
              </div>
              <p className="text-body-sm text-[var(--text-secondary)]">
                这一事件直接推动了OpenClaw社区转向DeepSeek、Qwen等开源模型，
                也验证了"模型自由"策略的战略价值——当供应商政策变动时，
                拥有多模型切换能力的平台可以快速应对，避免业务中断。
              </p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide10_Comparison);
