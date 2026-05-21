import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const suitableItems = [
  '结果可接受有限不确定性（非金融/法务等零容忍领域）',
  '任务可异步执行或接受处理延迟',
  '场景复用频次高，前期开发投入可摊销',
  '具备成熟工具链辅助（MCP服务/Skill库）',
];

const notSuitableItems = [
  '零误差确定性要求（财务核算、合规审查）',
  '低频一次性任务，开发ROI不足',
  '规则明确且变更频率低，传统开发更经济',
  'Token预算与时间成本约束严格',
];

interface FlowStep {
  question: string;
  noLabel: string;
  noType: 'fail' | 'warn';
}

const flowSteps: FlowStep[] = [
  { question: '允许结果偏差？', noLabel: '不建议', noType: 'fail' },
  { question: '可异步/离线？', noLabel: '需评估时效性', noType: 'warn' },
  { question: '复用频次≥阈值？', noLabel: '需评估ROI', noType: 'warn' },
  { question: '工具链成熟？', noLabel: '需先行开发', noType: 'warn' },
];

const noColorMap: Record<string, string> = { fail: '#EF4444', warn: '#F97316' };

const Slide21_SelfCheck: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.selfcheck-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.selfcheck-col-left', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.3)
        .fromTo('.selfcheck-col-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.5)
        .fromTo('.selfcheck-bottom', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.0);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="selfcheck-title text-center mb-6">
        <h2 className="text-h1 md:text-display font-bold text-[var(--text-primary)]">场景适配评估</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full flex-1">
        {/* Left column: Suitable vs Not Suitable */}
        <div className="selfcheck-col-left flex-1 space-y-4">
          {/* Suitable */}
          <div className="rounded-xl p-5 border-l-4" style={{ borderColor: '#10B981', backgroundColor: '#10B98108' }}>
            <h3 className="text-body-lg font-bold mb-3" style={{ color: '#10B981' }}>
              ✅ 适用场景
            </h3>
            <div className="space-y-1.5">
              {suitableItems.map((item, i) => (
                <div key={i} className="text-body-sm text-[var(--text-primary)] pl-2">
                  · {item}
                </div>
              ))}
            </div>
          </div>

          {/* Not Suitable */}
          <div className="rounded-xl p-5 border-l-4" style={{ borderColor: '#EF4444', backgroundColor: '#EF444408' }}>
            <h3 className="text-body-lg font-bold mb-3" style={{ color: '#EF4444' }}>
              ❌ 不适用场景
            </h3>
            <div className="space-y-1.5">
              {notSuitableItems.map((item, i) => (
                <div key={i} className="text-body-sm text-[var(--text-primary)] pl-2">
                  · {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Flowchart */}
        <div className="selfcheck-col-right flex-1 flex flex-col items-center">
          <div className="rounded-xl p-5 border w-full" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}>
            <h3 className="text-body-lg font-bold text-[var(--text-primary)] text-center mb-4">决策流程</h3>

            <div className="flex flex-col items-center">
              {/* Start node */}
              <div className="px-4 py-1.5 rounded-full text-body-sm font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
                开始评估
              </div>
              <div className="w-0.5 h-4" style={{ backgroundColor: 'var(--border)' }} />

              {flowSteps.map((step, i) => (
                <React.Fragment key={i}>
                  {/* Question box */}
                  <div className="w-full rounded-lg p-2.5 text-center text-body-sm font-semibold border"
                    style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)08', color: 'var(--text-primary)' }}>
                    {step.question}
                  </div>

                  {/* No branch (right) + Yes continuation */}
                  <div className="flex items-start w-full my-1">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-0.5 h-3" style={{ backgroundColor: 'var(--border)' }} />
                      <span className="text-caption font-bold" style={{ color: '#10B981' }}>是 ↓</span>
                      <div className="w-0.5 h-3" style={{ backgroundColor: 'var(--border)' }} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-caption font-bold" style={{ color: '#EF4444' }}>否 →</span>
                      <span className="text-caption font-bold px-2 py-0.5 rounded"
                        style={{ color: noColorMap[step.noType], backgroundColor: `${noColorMap[step.noType]}15` }}>
                        {step.noType === 'fail' ? '❌' : '⚠️'} {step.noLabel}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              ))}

              {/* Final success node */}
              <div className="px-4 py-2 rounded-lg text-body-sm font-bold text-white text-center"
                style={{ backgroundColor: '#10B981' }}>
                ✅ 适用，启动建设
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom quote */}
      <div className="selfcheck-bottom max-w-6xl w-full rounded-xl border-2 p-4 text-center opacity-0"
        style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)06' }}>
        <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
          先验证业务需求，再选择技术方案
        </p>
      </div>
    </section>
  );
};

export default memo(Slide21_SelfCheck);
