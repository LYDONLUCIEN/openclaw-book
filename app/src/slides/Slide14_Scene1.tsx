import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const MISCONCEPTIONS = [
  { wrong: '"OpenClaw什么都能做"', right: '它降低了执行和调度门槛，但没降低规划门槛' },
  { wrong: '"不需要开发了"', right: 'Skill编写、流程梳理依然是开发成本' },
  { wrong: '"拿来就能用"', right: '需要前期投入20-30小时"养虾"' },
];

const SUITABLE = [
  { title: '高频重复场景（>50次）', desc: '前期投入可以摊销', icon: '🔄' },
  { title: '可接受一定不确定性', desc: '创作类、建议类、分析类', icon: '✍️' },
  { title: '有成熟系统工具', desc: '用确定性工具降低不确定度', icon: '🔧' },
  { title: '多变、难以穷举规则', desc: 'AI的灵活性是优势', icon: '🌀' },
];

const UNSUITABLE = [
  { title: '100%确定性要求', desc: '金融交易、法务文件、权限管理', icon: '🏦' },
  { title: '一次性/低频任务', desc: '投入无法摊销，不如人工', icon: '1️⃣' },
  { title: '规则完全明确的流程', desc: 'Workflow更高效，Token成本=0', icon: '📋' },
];

const Slide14_Scene1: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      if (phase === 0) {
        gsap.fromTo('.sc-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
        gsap.fromTo('.sc-miscon', { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3 });
        gsap.fromTo('.sc-quote', { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.8 });
        gsap.fromTo('.sc-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.2 });
      } else if (phase === 1) {
        gsap.fromTo('.sc-scenarios', { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  const handleClick = () => {
    setPhase(phase === 0 ? 1 : 0);
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={handleClick}>

      <h2 className="sc-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        为什么很多人用不好 OpenClaw？
      </h2>

      {phase === 0 && (
        <>
          <div className="max-w-2xl w-full space-y-3 mb-5">
            {MISCONCEPTIONS.map((m, i) => (
              <div key={i} className="sc-miscon rounded-xl border-2 p-4 opacity-0"
                style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent)06' }}>
                <div className="flex items-start gap-2">
                  <XCircle size={16} style={{ color: 'var(--accent)' }} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="text-body-sm text-[var(--text-light)] line-through">{m.wrong}</span>
                    <div className="flex items-start gap-1.5 mt-1">
                      <CheckCircle size={14} style={{ color: 'var(--success)' }} className="shrink-0 mt-0.5" />
                      <span className="text-caption text-[var(--text-primary)]">{m.right}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sc-quote rounded-xl border-2 p-4 max-w-xl text-center opacity-0"
            style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)08' }}>
            <Lightbulb size={20} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
            <p className="text-h3 font-bold text-[var(--primary)]">
              "智能引入度变成了新的成本维度。"
            </p>
            <p className="text-caption text-[var(--text-secondary)] mt-2">
              从裸模型到OpenClaw，我们一直在支付"教AI懂业务"的代价。<br />
              这个成本被摊销到了开发、使用、反馈的全链路。
            </p>
          </div>

          <p className="sc-hint text-body text-[var(--text-light)] mt-5 opacity-0">
            点击查看适用场景 →
          </p>
        </>
      )}

      {phase === 1 && (
        <div className="sc-scenarios max-w-4xl w-full opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span className="text-body font-bold" style={{ color: 'var(--success)' }}>适合 OpenClaw</span>
              </div>
              <div className="space-y-2">
                {SUITABLE.map((s, i) => (
                  <div key={i} className="rounded-lg border p-3"
                    style={{ borderColor: 'var(--success)40', backgroundColor: 'var(--success)05' }}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{s.icon}</span>
                      <span className="text-caption font-bold text-[var(--text-primary)]">{s.title}</span>
                    </div>
                    <p className="text-caption text-[var(--text-secondary)] pl-7">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle size={18} style={{ color: 'var(--accent)' }} />
                <span className="text-body font-bold" style={{ color: 'var(--accent)' }}>不适合 OpenClaw</span>
              </div>
              <div className="space-y-2">
                {UNSUITABLE.map((s, i) => (
                  <div key={i} className="rounded-lg border p-3"
                    style={{ borderColor: 'var(--accent)40', backgroundColor: 'var(--accent)05' }}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{s.icon}</span>
                      <span className="text-caption font-bold text-[var(--text-primary)]">{s.title}</span>
                    </div>
                    <p className="text-caption text-[var(--text-secondary)] pl-7">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 p-4 mt-5 text-center"
            style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)08' }}>
            <p className="text-h3 font-bold text-[var(--primary)]">
              "你可以外包你的思考，但不能外包你的理解。"
            </p>
            <p className="text-caption text-[var(--text-secondary)] mt-2">
              AI不是六边形战士，而是尖刺状的能力——代码能力很突出，但有些地方常识性低得吓人。<br />
              在关键的决策、审美、判断方面，保留你的理解。
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击查看适用场景' : '点击返回'}
      </div>
    </section>
  );
};

export default memo(Slide14_Scene1);
