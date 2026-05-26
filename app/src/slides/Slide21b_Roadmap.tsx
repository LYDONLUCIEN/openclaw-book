import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';
import ClickableImage from '@/components/ImageOverlay';

interface SlideProps { isActive: boolean; }

const PRODUCTS = [
  { label: '聚智平台', tag: '智能体', image: '/images/slide22-juzhi.png' },
  { label: '灵畿平台', tag: '代码开发', image: '/images/slide22-lingji.png' },
  { label: 'MobileClaw', tag: '移动智能体', image: '/images/slide22-mobileclaw.png' },
];

const SECTIONS = [
  {
    icon: '✅',
    color: '#10B981',
    title: '已有能力',
    items: [
      { label: '聚智平台', tag: '智能体', desc: '工作流 Agent 构建，内部效率工具已上线运行' },
      { label: '磐匠 Agent', tag: '数字员工', desc: '自然语言描述流程，低门槛构建自动化任务' },
      { label: '灵畿平台', tag: '代码开发', desc: 'AI 辅助编码开发，提升研发效率与质量' },
    ],
  },
  {
    icon: '🔧',
    color: '#3B82F6',
    title: '正在建设',
    items: [
      { label: '本地龙虾', desc: '开箱即用的本地 Agent 运行环境' },
      { label: '云虾沙箱', desc: '安全隔离运行环境，Agent 无需本地部署' },
      { label: '安全管控', desc: '权限细粒度控制、环境隔离、合规审计链路' },
    ],
  },
  {
    icon: '🔮',
    color: '#F97316',
    title: '未来方向',
    items: [
      { label: 'MobileClaw', desc: '移动端智能体，随时随地调用 AI 能力' },
      { label: 'JoinAI', desc: '多人协作 Agent 平台，团队共构智能工作流' },
      { label: '开放生态', desc: 'Skill 市场共建共享，从单打独斗到集体智慧' },
    ],
  },
];

const Slide21b_Roadmap: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.rm-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.rm-subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.2);

      tl.fromTo('.rm-section', { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.3)' }, 0.4);

      tl.fromTo('.rm-imgs', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4 }, 1.0);

      tl.fromTo('.rm-bottom', { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, 1.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="rm-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-1 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={3} />
        移动公司发展计划
      </h2>

      <p className="rm-subtitle text-body-sm text-[var(--text-secondary)] text-center mb-4 opacity-0">
        从已有工具到开放生态，一步步构建 Agent 能力版图
      </p>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {SECTIONS.map((sec) => (
          <div key={sec.title}
            className="rm-section rounded-xl border-2 p-4 md:p-5 opacity-0 flex flex-col"
            style={{ borderColor: `${sec.color}40`, backgroundColor: `${sec.color}05` }}>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{sec.icon}</span>
              <h3 className="text-body-lg font-bold" style={{ color: sec.color }}>{sec.title}</h3>
            </div>

            <div className="space-y-2.5 flex-1">
              {sec.items.map((item) => (
                <div key={item.label}
                  className="rounded-lg border px-3 py-2"
                  style={{ borderColor: `${sec.color}20`, backgroundColor: `${sec.color}08` }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-body-sm font-bold text-[var(--text-primary)]">{item.label}</p>
                    {'tag' in item && item.tag && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${sec.color}15`, color: sec.color }}>{item.tag}</span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Product screenshots */}
      <div className="rm-imgs max-w-6xl w-full grid grid-cols-3 gap-3 mt-3 opacity-0">
        {PRODUCTS.map((p) => (
          <div key={p.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-body-sm font-bold" style={{ color: '#10B981' }}>{p.label}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: '#10B98115', color: '#10B981' }}>{p.tag}</span>
            </div>
            <div className="rm-img rounded-lg border-2 aspect-[16/10] overflow-hidden"
              style={{ borderColor: '#10B98140', backgroundColor: '#10B98105' }}>
              {p.image && (
                <ClickableImage src={p.image} alt={p.label} className="w-full h-full object-contain" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rm-bottom mt-auto pt-4 max-w-4xl w-full text-center opacity-0">
        <div className="rounded-xl border-2 px-6 py-3"
          style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
          <p className="text-body font-bold" style={{ color: '#F97316' }}>
            中国移动token运营战略方向！
          </p>
          <p className="text-body-sm text-[var(--text-secondary)] mt-0.5">
            集团AI开发工具，省内办公AI助理，移动云服务龙虾携手打造数智化转型
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide21b_Roadmap);
