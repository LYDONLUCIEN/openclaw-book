import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CheckCircle, Loader, Compass } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const Slide19_Summary: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      className: 'outlook-current',
      icon: CheckCircle,
      color: '#10B981',
      title: '已有能力',
      items: [
        { label: '聚智平台', desc: '工作流 Agent + 辅助编码，内部效率工具已上线' },
        { label: '磐匠 Agent', desc: '自然语言描述流程，低门槛构建自动化任务' },
      ],
    },
    {
      className: 'outlook-building',
      icon: Loader,
      color: '#3B82F6',
      title: '正在建设',
      items: [
        { label: '云虾', desc: '无状态沙箱环境，Agent 运行不再依赖本地部署' },
        { label: '安全管控', desc: '权限细粒度控制、环境隔离、操作审计链路' },
        { label: '可信 Skill 仓库', desc: '统一审核与分发，技能资产化管理' },
      ],
    },
    {
      className: 'outlook-future',
      icon: Compass,
      color: '#F97316',
      title: '未来方向',
      items: [
        { label: '统一管理平台', desc: '一站式 Agent 生命周期管理：创建、调试、部署、监控' },
        { label: '更强模型底座', desc: '接入更优模型能力，确定性成本持续下降' },
        { label: '开放生态', desc: 'Skill 市场共建，能力共享，从单打独斗到集体智慧' },
      ],
    },
  ];

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.outlook-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.outlook-current', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.3)
        .fromTo('.outlook-building', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.5)
        .fromTo('.outlook-future', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.7)
        .fromTo('.outlook-quote', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, 1.1);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="outlook-title text-center mb-8">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">未来展望</h2>
        <p className="text-body text-[var(--text-secondary)] mt-2">从工具到平台，从个人到生态</p>
      </div>

      <div className="space-y-4 max-w-3xl w-full">
        {sections.map((section) => (
          <div
            key={section.className}
            className={section.className + ' rounded-xl p-5 border-l-4'}
            style={{
              borderColor: section.color,
              backgroundColor: `${section.color}06`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${section.color}15` }}>
                <section.icon className="w-4 h-4" style={{ color: section.color }} strokeWidth={2} />
              </div>
              <h3 className="text-body font-bold" style={{ color: section.color }}>{section.title}</h3>
            </div>
            <div className="space-y-1.5 ml-12">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[var(--bg-primary)]">
                  <span className="text-caption font-bold text-[var(--text-primary)] shrink-0">{item.label}</span>
                  <span className="text-caption text-[var(--text-secondary)]">— {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="outlook-quote max-w-3xl w-full rounded-xl border-2 p-5 mt-6 text-center" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)06' }}>
        <p className="text-body-sm text-[var(--text-primary)] leading-relaxed">
          Agent 不会取代人，但会用 Agent 的人会取代不会用的人。
        </p>
      </div>
    </section>
  );
};

export default memo(Slide19_Summary);
