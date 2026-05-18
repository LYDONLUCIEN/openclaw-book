import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Package, Brain, TrendingUp, Crown } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const INNOVATIONS = [
  {
    icon: Package,
    title: 'Skills 渐进式加载',
    color: '#F97316',
    desc: '工具 + 流程 + 知识，融合成一个技能包',
    detail: '不再是全塞给 AI，而是用到时才加载。机制上解决了注意力稀释问题。',
    key: '渐进式加载 → 降低模型输入长度 → 提升准确性',
    benefit: '足够简单，降低了业务开发成本',
  },
  {
    icon: Brain,
    title: 'Harness Engineering 经验沉淀',
    color: '#F97316',
    desc: '自动记录、自动总结、自动复用',
    detail: '每次对话后自动总结经验 → 下次直接调用。输入的澄清、输出的纠错都自动化了。',
    key: '自动化记忆 → 减少重复劳动 → 越用越好',
    benefit: '不是第一次就完美，而是越来越好',
  },
];

const Slide10_OpenClawSkills: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v4-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v4-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v4-card', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, delay: 0.4 });
      gsap.fromTo('.v4-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || phase !== 1 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v4-insight', { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={() => setPhase(phase < 1 ? phase + 1 : 0)}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v4-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v4.0 龙虾！</h2>
        <span className="v4-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#F97316' }}>橙装</span>
      </div>
      <p className="text-body text-[var(--text-secondary)] mb-5 max-w-lg text-center">
        OpenClaw 的核心突破：Skills 把能力融合，Harness 把经验沉淀。不是一次完美，而是越用越好。
      </p>

      <div className="max-w-2xl w-full space-y-4">
        {INNOVATIONS.map((inn, i) => {
          const Icon = inn.icon;
          return (
            <div key={i} className="v4-card rounded-xl border-2 p-5 opacity-0"
              style={{ borderColor: inn.color, backgroundColor: `${inn.color}08` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${inn.color}15`, color: inn.color }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-body font-bold" style={{ color: inn.color }}>{inn.title}</span>
                    <span className="text-caption px-1.5 rounded" style={{ backgroundColor: `${inn.color}12`, color: inn.color }}>橙装</span>
                  </div>
                  <span className="text-caption text-[var(--text-secondary)]">{inn.desc}</span>
                </div>
              </div>
              <p className="text-body-sm text-[var(--text-secondary)] mb-2">{inn.detail}</p>
              <div className="rounded-lg px-3 py-2" style={{ backgroundColor: `${inn.color}10` }}>
                <p className="text-caption font-semibold" style={{ color: inn.color }}>{inn.key}</p>
                <p className="text-caption text-[var(--text-secondary)] mt-0.5">→ {inn.benefit}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="v4-hint text-body text-[var(--text-light)] mt-5 opacity-0">
        点击查看关键洞察 →
      </p>

      {phase >= 1 && (
        <div className="v4-insight max-w-2xl w-full mt-4 opacity-0">
          <div className="rounded-xl border-2 p-5" style={{ borderColor: '#F97316', backgroundColor: '#F9731608', boxShadow: '0 0 20px #F9730B15' }}>
            <div className="flex items-center gap-2 mb-3">
              <Crown size={20} style={{ color: '#F97316' }} />
              <span className="text-body font-bold" style={{ color: '#F97316' }}>关键洞察</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <TrendingUp size={16} style={{ color: '#F97316' }} className="shrink-0 mt-0.5" />
                <p className="text-body-sm text-[var(--text-primary)]">
                  <span className="font-bold">输入的澄清</span>自动化了（Memory 自动记录偏好）
                </p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp size={16} style={{ color: '#F97316' }} className="shrink-0 mt-0.5" />
                <p className="text-body-sm text-[var(--text-primary)]">
                  <span className="font-bold">输出的纠错</span>自动化了（Harness 自动总结经验）
                </p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp size={16} style={{ color: '#F97316' }} className="shrink-0 mt-0.5" />
                <p className="text-body-sm text-[var(--text-primary)]">
                  <span className="font-bold">所有人的能力</span>被 Skills 融合共享（集体智慧）
                </p>
              </div>
            </div>
            <p className="text-caption text-[var(--text-secondary)] mt-3 text-center">
              所以不是第一次就完美，而是每一次使用都在变得更好。
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Slide10_OpenClawSkills);
