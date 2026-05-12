import React, { useRef, memo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Brain, Zap, Eye, CheckCircle } from 'lucide-react';

interface SlideProps { isActive: boolean; }

interface Step { type: 'think' | 'act' | 'observe' | 'done'; label: string; content: string; toolReq?: string; toolRes?: string; }

const STEPS: Step[] = [
  { type: 'think', label: 'THINK 思考', content: '用户要求生成网络运维周报。我需要：1) 查询本周告警数据 2) 获取网络性能指标 3) 生成报告。先从查询告警数据开始。' },
  { type: 'act', label: 'ACT 行动', content: '调用 query_database 工具查询告警数据', toolReq: '{ tool: "query_database", sql: "SELECT * FROM alerts WHERE week=\'current\'" }' },
  { type: 'observe', label: 'OBSERVE 观察', content: '本周共156条告警，其中3条严重、23条警告。严重告警集中在SPN网络。', toolRes: '{ rows: 156, critical: 3, warning: 23, normal: 130 }' },
  { type: 'think', label: 'THINK 思考', content: '已获取告警数据，3条严重告警在SPN网络。接下来查询SPN网络性能指标...' },
  { type: 'act', label: 'ACT 行动', content: '调用 query_api 工具查询SPN性能', toolReq: '{ tool: "query_api", endpoint: "/api/spn/performance" }' },
  { type: 'observe', label: 'OBSERVE 观察', content: 'SPN网络可用率99.97%，平均时延12ms，均在正常范围。', toolRes: '{ availability: "99.97%", latency: "12ms", throughput: "850Gbps" }' },
  { type: 'done', label: '✅ 任务完成', content: '综合分析完成：告警数据和性能指标已收集，生成周报。' },
];

const TYPE_COLORS = { think: 'var(--primary)', act: 'var(--accent)', observe: 'var(--success)', done: 'var(--secondary)' };
const TYPE_ICONS = { think: Brain, act: Zap, observe: Eye, done: CheckCircle };

const Slide08_ReAct: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [typing, setTyping] = useState('');

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.react-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.react-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useEffect(() => {
    if (currentStep < 0 || currentStep >= STEPS.length) return;
    const step = STEPS[currentStep];
    let idx = 0;
    setTyping('');
    const timer = setInterval(() => {
      idx++;
      setTyping(step.content.slice(0, idx));
      if (idx >= step.content.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [currentStep]);

  const nextStep = () => setCurrentStep(prev => (prev >= STEPS.length - 1 ? -1 : prev + 1));

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="react-title text-center mb-2">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">ReAct：思考→行动→观察</h2>
      </div>
      <p className="react-subtitle text-body text-[var(--text-secondary)] text-center mb-6">
        当模型有了记忆+知识+行动能力，它就能自主完成复杂任务
      </p>

      <div className="max-w-3xl mx-auto w-full flex-1">
        {/* Steps display */}
        <div className="space-y-3 mb-4">
          {STEPS.slice(0, currentStep + 1).map((step, i) => {
            const color = TYPE_COLORS[step.type];
            const Icon = TYPE_ICONS[step.type];
            const isCurrent = i === currentStep;
            return (
              <div key={i} className={`rounded-xl p-4 border-l-4 ${isCurrent ? 'shadow-card' : 'opacity-70'}`} style={{ borderColor: color, backgroundColor: isCurrent ? `${color}08` : 'var(--bg-secondary)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4" style={{ color }} strokeWidth={2} />
                  <span className="text-caption font-bold" style={{ color }}>{step.label}</span>
                </div>
                <p className="text-body-sm text-[var(--text-primary)] font-mono">{isCurrent ? typing : step.content}{isCurrent && typing.length < step.content.length && <span className="animate-pulse">|</span>}</p>
                {step.toolReq && (isCurrent ? currentStep === i : true) && (
                  <div className="mt-2 rounded-lg p-2 text-xs font-mono bg-[var(--bg-secondary)] border">
                    <span className="text-[var(--accent)]">📤 请求: </span>{step.toolReq}
                    {step.toolRes && <><br /><span className="text-[var(--success)]">📥 返回: </span>{step.toolRes}</>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Control */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button onClick={nextStep} className="px-6 py-2.5 rounded-full text-body font-bold text-white transition-all duration-200 hover:scale-105" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}>
            {currentStep < 0 ? '▶ 开始ReAct模拟' : currentStep >= STEPS.length - 1 ? '🔄 重新演示' : `下一步 → (${currentStep + 1}/${STEPS.length})`}
          </button>
        </div>

        {/* Progress bar */}
        {currentStep >= 0 && (
          <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] mb-4">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))' }} />
          </div>
        )}

        {/* Bottom insight */}
        <div className="rounded-xl p-4 text-center" style={{ background: 'linear-gradient(90deg, var(--bg-accent), var(--bg-secondary))', border: '1px solid var(--border)' }}>
          <p className="text-body font-bold text-[var(--text-primary)]">
            ReAct核心：不是一次回答，而是 <span style={{ color: 'var(--primary)' }}>思考</span> → <span style={{ color: 'var(--accent)' }}>调用工具</span> → <span style={{ color: 'var(--success)' }}>观察结果</span> → 继续思考 的循环
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide08_ReAct);
