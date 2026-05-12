import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';
import Badge from '@/components/Badge';
import DataCard from '@/components/DataCard';

interface SlideProps {
  isActive: boolean;
}

const steps = [
  { label: '用户指令', short: '指令' },
  { label: '任务分解', short: '分解' },
  { label: '数据采集(×3)', short: '采集' },
  { label: '数据清洗', short: '清洗' },
  { label: '生成报告', short: '生成' },
  { label: '格式转换', short: '转换' },
  { label: '审查检查', short: '审查' },
  { label: '自我纠错', short: '纠错' },
  { label: '最终交付', short: '交付' },
  { label: '持久化技能', short: '持久' },
];

const Slide12_Scenario: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        // Title
        tl.fromTo(
          '.s12-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        tl.fromTo(
          '.s12-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

        // Timeline steps — light up one by one
        tl.fromTo(
          '.s12-step',
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            stagger: 0.12,
            ease: 'back.out(2)',
          },
          '-=0.1'
        );

        // Connector lines between steps
        tl.fromTo(
          '.s12-connector',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.2,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '<'
        );

        // Before/After section
        tl.fromTo(
          '.s12-compare',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );

        // Data cards
        tl.fromTo(
          '.s12-data',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.3'
        );

        // Expandable
        tl.fromTo(
          '.s12-expand',
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
        <div className="text-center">
          <h2 className="s12-title text-h1 font-bold text-[var(--primary)] opacity-0">
            场景穿透：网络运维周报生成
          </h2>
          <p className="s12-subtitle text-body text-[var(--text-secondary)] mt-3 opacity-0">
            从用户指令到最终结果的10步全流程
          </p>
        </div>

        {/* Horizontal 10-Step Timeline */}
        <div className="s12-timeline overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex items-center min-w-[900px] py-4">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Step Circle + Label */}
                <div className="s12-step flex flex-col items-center opacity-0 flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white/20"
                    style={{
                      background:
                        index < 7
                          ? 'var(--primary)'
                          : index === 8
                          ? 'var(--accent)'
                          : 'var(--success)',
                    }}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-caption font-medium text-[var(--text-secondary)] whitespace-nowrap text-center max-w-[80px]">
                    {step.short}
                  </span>
                </div>
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="s12-connector flex-1 h-0.5 bg-[var(--border)] mx-1 opacity-0 origin-left" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Before / After Comparison */}
        <div className="s12-compare grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0">
          {/* Before Card */}
          <div
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-[var(--text-light)]" />
              <h3 className="text-h3 font-bold text-[var(--text-secondary)]">
                人工处理
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { icon: Clock, text: '耗时 2-3小时' },
                { icon: XCircle, text: '多系统手动登录' },
                { icon: XCircle, text: '数据手动汇总' },
                { icon: XCircle, text: '容易遗漏错误' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <item.icon className="w-4 h-4 text-[var(--text-light)] mt-0.5 flex-shrink-0" />
                  <span className="text-body-sm text-[var(--text-secondary)]">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Card */}
          <div
            className="rounded-xl p-5 border-2 relative overflow-hidden"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--success)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at top right, var(--success), transparent)',
                opacity: 0.06,
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                <h3 className="text-h3 font-bold text-[var(--primary)]">
                  Agent自动处理
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: Clock, text: '耗时 5-10分钟' },
                  { icon: CheckCircle2, text: '自动登录采集' },
                  { icon: CheckCircle2, text: '智能汇总分析' },
                  { icon: CheckCircle2, text: '自检纠错交付' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <item.icon className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                    <span className="text-body-sm text-[var(--text-primary)]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="s12-data opacity-0">
            <DataCard
              value="18x"
              label="效率提升"
              description="时间从2-3h降至5-10min"
              showArrow
            />
          </div>
          <div className="s12-data opacity-0">
            <DataCard
              value="99.2%"
              label="数据完整率"
              description="自检纠错后数据质量"
            />
          </div>
          <div className="s12-data opacity-0">
            <DataCard
              value="3"
              label="系统打通"
              description="网管、告警、工单系统"
            />
          </div>
          <div className="s12-data opacity-0">
            <DataCard
              value="0"
              label="人工干预"
              description="全流程无需人工介入"
            />
          </div>
        </div>

        {/* Expandable: Self-Correction Detail */}
        <div className="s12-expand opacity-0">
          <ExpandableSection
            toggleLabel="第8步：自我纠错的细节"
            hintText="点击展开"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="accent">场景</Badge>
                <p className="text-body-sm text-[var(--text-primary)]">
                  Agent在生成报告后，发现缺少"光衰告警"类别的数据
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  {
                    step: '1. 发现异常',
                    detail: '报告模板要求包含5类告警，但实际数据只覆盖了4类',
                    status: 'current' as const,
                  },
                  {
                    step: '2. 自动诊断',
                    detail: '检查原始数据源，发现字段名从"optical_alarm"变更为"fiber_attenuation"',
                    status: 'current' as const,
                  },
                  {
                    step: '3. 重新获取',
                    detail: '使用新字段名重新查询数据库，获取完整数据集',
                    status: 'current' as const,
                  },
                  {
                    step: '4. 验证完整性',
                    detail: '确认5类告警数据齐全后，重新生成报告章节',
                    status: 'emerging' as const,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 pl-1"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{
                        backgroundColor:
                          item.status === 'emerging'
                            ? 'var(--success)'
                            : 'var(--primary)',
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-[var(--text-primary)]">
                        {item.step}
                      </p>
                      <p className="text-caption text-[var(--text-secondary)] mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-lg p-3 mt-2"
                style={{
                  backgroundColor: 'var(--bg-accent)',
                  border: '1px solid var(--border)',
                }}
              >
                <p className="text-body-sm text-[var(--text-primary)]">
                  <strong>关键洞察：</strong>
                  自我纠错是Agent区别于简单脚本的核心能力。传统自动化遇到字段变更会直接报错，
                  而Agent能够理解变更的语义含义，自主完成修复。
                </p>
              </div>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide12_Scenario);
