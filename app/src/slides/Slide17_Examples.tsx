import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FileText, BarChart3 } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const L2_PROCESS = [
  '需求描述',
  '初版生成',
  '风格校准',
  '迭代优化',
  '定稿输出',
];

const L3_PROCESS = [
  '数据源接入',
  '脚本化处理',
  '统计计算',
  '报告输出',
  '定时触发',
];

const Slide17_Examples: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ex-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.ex-col', { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.ex-step', { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, delay: 0.7 });
      gsap.fromTo('.ex-key', { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="ex-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-6 opacity-0">
        实战场景示例
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full flex-1">
        {/* Left: Level 2 */}
        <div className="ex-col rounded-xl border-2 p-6 opacity-0"
          style={{ borderColor: '#3B82F6', backgroundColor: '#3B82F606' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#3B82F615', color: '#3B82F6' }}>
              <FileText size={20} />
            </div>
            <span className="text-body font-bold" style={{ color: '#3B82F6' }}>
              Level 2 &mdash; 任务助理
            </span>
          </div>

          <h3 className="text-body-sm font-bold text-[var(--text-primary)] mb-3">
            场景：材料报告撰写
          </h3>

          {/* Process flow */}
          <div className="flex flex-wrap items-center gap-1 mb-4">
            {L2_PROCESS.map((step, i) => (
              <React.Fragment key={i}>
                <span className="ex-step rounded-md px-2 py-1 text-caption font-semibold opacity-0"
                  style={{ backgroundColor: '#3B82F612', color: '#3B82F6' }}>
                  {step}
                </span>
                {i < L2_PROCESS.length - 1 && (
                  <span className="text-caption" style={{ color: '#3B82F680' }}>{'→'}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Key insight */}
          <div className="ex-key rounded-lg p-3 mb-3 opacity-0"
            style={{ backgroundColor: '#3B82F612', borderLeft: '3px solid #3B82F6' }}>
            <p className="text-caption font-bold" style={{ color: '#3B82F6' }}>
              多次迭代 + 精确描述 = 操作成本投入换取输出质量提升
            </p>
          </div>

          <p className="text-caption text-[var(--text-light)]" style={{ fontSize: '10px' }}>
            Agent逐步学习写作风格与格式偏好，后续任务效率递增
          </p>
        </div>

        {/* Right: Level 3 */}
        <div className="ex-col rounded-xl border-2 p-6 opacity-0"
          style={{ borderColor: '#8B5CF6', backgroundColor: '#8B5CF606' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#8B5CF615', color: '#8B5CF6' }}>
              <BarChart3 size={20} />
            </div>
            <span className="text-body font-bold" style={{ color: '#8B5CF6' }}>
              Level 3 &mdash; 定时调度
            </span>
          </div>

          <h3 className="text-body-sm font-bold text-[var(--text-primary)] mb-3">
            场景：周报/日报自动生成
          </h3>

          {/* Process flow */}
          <div className="flex flex-wrap items-center gap-1 mb-4">
            {L3_PROCESS.map((step, i) => (
              <React.Fragment key={i}>
                <span className="ex-step rounded-md px-2 py-1 text-caption font-semibold opacity-0"
                  style={{ backgroundColor: '#8B5CF612', color: '#8B5CF6' }}>
                  {step}
                </span>
                {i < L3_PROCESS.length - 1 && (
                  <span className="text-caption" style={{ color: '#8B5CF680' }}>{'→'}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Key insight */}
          <div className="ex-key rounded-lg p-3 mb-3 opacity-0"
            style={{ backgroundColor: '#8B5CF612', borderLeft: '3px solid #8B5CF6' }}>
            <p className="text-caption font-bold" style={{ color: '#8B5CF6' }}>
              确定性开发 + 自动化调度 = 开发成本投入换取人力释放
            </p>
          </div>

          <p className="text-caption text-[var(--text-light)]" style={{ fontSize: '10px' }}>
            Agent编写数据处理脚本，准确执行计算与汇总，定时自动运行
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide17_Examples);
