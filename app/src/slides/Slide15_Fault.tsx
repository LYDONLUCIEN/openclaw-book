import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Bot, User, ArrowRight, ShieldAlert,
  Activity, Search, Cpu, Wrench, Zap, RefreshCw
} from 'lucide-react';
import DataCard from '@/components/DataCard';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide15_Fault: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  const loopSteps = [
    { id: 'monitor', icon: Activity, title: '监控', sub: 'Monitor', desc: '实时采集告警', color: 'var(--primary)' },
    { id: 'detect', icon: Search, title: '检测', sub: 'Detect', desc: '1000:1告警压缩', color: 'var(--secondary)' },
    { id: 'analyze', icon: Cpu, title: '分析', sub: 'Analyze', desc: '知识图谱匹配300+故障', color: 'var(--accent)' },
    { id: 'resolve', icon: Wrench, title: '处置', sub: 'Resolve', desc: '生成处置建议', color: 'var(--success)' },
  ];

  const beforeItems = [
    { text: '2-4小时 排查故障', highlight: '2-4小时' },
    { text: '告警风暴人工筛选', highlight: '告警风暴' },
    { text: '凭经验判断故障原因', highlight: '' },
    { text: '手动查资料翻手册', highlight: '' },
  ];

  const afterItems = [
    { text: '10分钟 快速响应', highlight: '10分钟' },
    { text: '智能压缩归类告警', highlight: '智能压缩' },
    { text: '知识图谱精准匹配', highlight: '知识图谱' },
    { text: '自动生成处置方案', highlight: '' },
  ];

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.s15-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.s15-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      tl.fromTo('.s15-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      // Loop steps — circular entrance
      tl.fromTo('.s15-loop-step', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)' }, '-=0.2');
      tl.fromTo('.s15-loop-arrow', { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.08 }, '-=0.3');

      // Before/After
      tl.fromTo('.s15-before', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
      tl.fromTo('.s15-arrow', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2');
      tl.fromTo('.s15-after', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

      // Metric
      tl.fromTo('.s15-metric', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2');

      // Highlight
      tl.fromTo('.s15-highlight', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      // Counter
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 96,
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.out',
        onUpdate: () => setDisplayValue(Math.round(counterObj.val)),
      });

      // Pulsing center icon
      gsap.to('.s15-pulse', {
        scale: 1.1,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-7">
        {/* Header */}
        <div className="s15-title text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ShieldAlert className="w-8 h-8 text-[var(--accent)]" strokeWidth={2} />
            <h2 className="text-h1 font-extrabold text-[var(--primary)]">场景3：网络故障智能诊断</h2>
          </div>
          <p className="s15-subtitle text-h3 text-[var(--text-secondary)]">从2-4小时到10分钟的快速响应</p>
          <div className="s15-divider w-24 h-0.5 mx-auto mt-4 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)' }} />
        </div>

        {/* Loop Diagram — 4-step circular process */}
        <div className="relative w-full max-w-xl mx-auto">
          <div className="grid grid-cols-2 gap-5 relative">
            {loopSteps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className={`s15-loop-step flex flex-col items-center text-center p-5 rounded-2xl bg-[var(--card-bg)] border-2 transition-all duration-300 ${i === 0 ? 'border-[var(--primary)]' : i === 1 ? 'border-[var(--secondary)]' : i === 2 ? 'border-[var(--accent)]' : 'border-[var(--success)]'}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `color-mix(in srgb, ${step.color} 15%, transparent)` }}>
                    <step.icon className="w-6 h-6" style={{ color: step.color }} strokeWidth={2} />
                  </div>
                  <span className="text-h3 font-bold text-[var(--primary)]">{step.title}</span>
                  <span className="text-caption text-[var(--text-light)] mt-0.5">{step.sub}</span>
                  <span className="text-body-sm text-[var(--text-secondary)] mt-2">{step.desc}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* Center pulse */}
          <div className="s15-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[var(--bg-accent)] border-2 border-[var(--secondary)] flex items-center justify-center pointer-events-none z-10">
            <RefreshCw className="w-6 h-6 text-[var(--secondary)]" strokeWidth={2} />
          </div>
          {/* Curved loop arrows (simplified as connecting lines) */}
          <div className="s15-loop-arrow absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 pointer-events-none" style={{ background: 'linear-gradient(90deg, var(--primary) 25%, var(--secondary) 25%, var(--secondary) 50%, var(--accent) 50%, var(--accent) 75%, var(--success) 75%)', opacity: 0.2 }} />
        </div>

        {/* Before / After */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-stretch">
          <div className="s15-before rounded-2xl p-5 border border-[var(--border)] bg-[var(--card-bg)]">
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

          <div className="s15-arrow hidden md:flex items-center justify-center px-4">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-accent)] border-2 border-[var(--secondary)] flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-[var(--secondary)]" strokeWidth={2.5} />
            </div>
          </div>

          <div className="s15-after rounded-2xl p-5 border-2 border-[var(--accent)] bg-[var(--bg-accent)]/30">
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
        <div className="s15-metric w-full max-w-xs">
          <DataCard
            value={displayValue}
            suffix="%"
            label="响应加速"
            description="故障诊断效率提升"
            showArrow
          />
        </div>

        {/* Highlight */}
        <div className="s15-highlight flex items-center gap-3 px-6 py-4 rounded-xl bg-[var(--bg-accent)] border border-[var(--border)] max-w-2xl">
          <Zap className="w-5 h-5 text-[var(--accent)] flex-shrink-0" strokeWidth={2} />
          <p className="text-body-sm text-[var(--text-secondary)]">
            湖南移动SPN网络AI Agent已投入<strong className="text-[var(--primary)]">实战运行</strong>
          </p>
        </div>

        {/* Expandable */}
        <div className="s15-highlight w-full max-w-2xl">
          <ExpandableSection toggleLabel="1000:1告警压缩如何实现" hintText="点击展开">
            <div className="space-y-3 text-body-sm text-[var(--text-secondary)]">
              <p>Agent通过<strong className="text-[var(--primary)]">相关性分析、时序聚类</strong>和<strong className="text-[var(--primary)]">优先级排序</strong>三重机制，将数千条告警压缩为少量关键事件。</p>
              <p>第一步：基于时间窗口和拓扑关系，将相关告警聚类为事件组。第二步：利用故障知识图谱匹配300+已知故障类型。第三步：对未匹配事件进行异常模式识别，生成新故障假设。</p>
              <p>最终输出包含根因分析、影响范围评估和分级处置建议，运维人员只需确认执行即可。</p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide15_Fault);
