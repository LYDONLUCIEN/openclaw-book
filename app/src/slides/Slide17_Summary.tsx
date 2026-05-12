import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Brain, Globe, BookOpen, Rocket, Shield, Users, PiggyBank } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const conclusions = [
  {
    icon: Brain,
    emoji: '🏗️',
    title: '模型底座决定Agent的「智商」',
    points: [
      '优先建设内部大模型能力',
      '九天大模型 + MoMA平台是核心资产',
      '模型质量直接决定Agent能力上限',
    ],
  },
  {
    icon: Globe,
    emoji: '🌐',
    title: '浏览器自动化是打通内部系统的关键',
    points: [
      'Agent + RPA升级是必要路径',
      '磐匠17,000+数字员工是基础',
      '"观摩式"无代码生成降低门槛',
    ],
  },
  {
    icon: BookOpen,
    emoji: '📚',
    title: 'Skills生态决定Agent的「专业能力」',
    points: [
      '内部Skills仓库建设是当务之急',
      '三层方法：自有为主 + 公共优质为辅 + 按需自建',
      '聚智平台150+内置行业技能',
    ],
  },
];

const deploymentSteps = ['试点', '验证', '持久化技能', '规模化'];

const Slide17: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Title section
      tl.fromTo('.s17-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.s17-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

      // Conclusion cards — stagger one by one
      tl.fromTo('.s17-card', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.2');

      // Highlighted quote panel
      tl.fromTo('.s17-quote', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, '-=0.1');

      // Deployment path steps
      tl.fromTo('.s17-step', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.2');

      // CTA
      tl.fromTo('.s17-cta', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });

      // Expandable section
      tl.fromTo('.s17-expand', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="s17-title text-display-xl font-extrabold text-[var(--primary)] tracking-tight opacity-0">总结与展望</h2>
          <p className="s17-subtitle text-h3 text-[var(--text-secondary)] mt-3 opacity-0">三个关键结论</p>
        </div>

        {/* Three Conclusion Cards */}
        <div className="flex flex-col gap-5 mb-10">
          {conclusions.map((item, idx) => (
            <div key={idx} className="s17-card opacity-0 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-card hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-accent)] flex items-center justify-center shrink-0">
                  <span className="text-xl">{item.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-h3 font-semibold text-[var(--text-primary)] mb-3">{item.title}</h3>
                  <ul className="space-y-1.5">
                    {item.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-body-sm text-[var(--text-secondary)]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Quote Panel */}
        <div className="s17-quote opacity-0 rounded-2xl p-6 mb-8 border border-[var(--primary)]/20" style={{ background: 'linear-gradient(135deg, var(--bg-accent), var(--primary)/5)' }}>
          <p className="text-h2 font-bold text-[var(--primary)] mb-2">碳硅协同</p>
          <p className="text-body text-[var(--text-secondary)] leading-relaxed">
            Agent不是取代人类，而是增强人类。碳硅协同 — 每个人都可以通过指挥多个Agent成为「超级个体」
          </p>
        </div>

        {/* Four-Step Deployment Path */}
        <div className="s17-step opacity-0 flex items-center justify-center gap-2 mb-10 flex-wrap">
          {deploymentSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] shadow-card">
                <span className="text-data-sm font-mono font-bold text-[var(--accent)]">{idx + 1}</span>
                <span className="text-body-sm font-semibold text-[var(--text-primary)]">{step}</span>
              </div>
              {idx < deploymentSteps.length - 1 && (
                <span className="text-[var(--text-light)] text-lg font-light">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Call to Action */}
        <div className="s17-cta opacity-0 text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
            <Rocket className="w-5 h-5 text-white" />
            <span className="text-body font-bold text-white">今天就选一个高频重复任务，让Agent试运行！</span>
          </div>
        </div>

        {/* Expandable: Organizational Suggestions */}
        <div className="s17-expand opacity-0">
          <ExpandableSection toggleLabel="组织保障建议" hintText="点击展开">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-body-sm font-semibold text-[var(--text-primary)]">人才培养</p>
                  <p className="text-body-sm text-[var(--text-secondary)]">设立「Agent指挥官」角色，培养员工与AI协作的能力</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-body-sm font-semibold text-[var(--text-primary)]">安全合规</p>
                  <p className="text-body-sm text-[var(--text-secondary)]">审计日志 + 最小权限原则，确保Agent操作可追溯</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PiggyBank className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-body-sm font-semibold text-[var(--text-primary)]">成本管理</p>
                  <p className="text-body-sm text-[var(--text-secondary)]">内部模型优先，控制外部API调用成本</p>
                </div>
              </div>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide17);
