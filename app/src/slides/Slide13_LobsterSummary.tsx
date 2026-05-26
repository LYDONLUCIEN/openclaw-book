import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';
import ClickableImage from '@/components/ImageOverlay';

interface SlideProps { isActive: boolean; }

const PRODUCTS = [
  {
    name: 'Hermes Agent',
    desc: '自动沉淀流程为Skill，自我优化闭环',
    tag: 'Skills思路实现',
    color: '#3B82F6',
    imgSrc: '/images/hermes-agent.png',
  },
  {
    name: 'EvoMap',
    desc: '社区投票筛选优质Skill，群体智慧择优',
    tag: 'Skills思路实现',
    color: '#10B981',
    imgSrc: '/images/evomap.png',
  },
  {
    name: 'Claude Code',
    desc: '能自我改造的Agent，具备干细胞级自适应能力',
    tag: 'Harness思路实现',
    color: '#8B5CF6',
    imgSrc: '/images/claude-code.png',
  },
];

const Slide13_LobsterSummary: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Title
      tl.fromTo('.ls-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });

      // Section label
      tl.fromTo('.ls-section-label', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4 }, 0.3);

      // Product cards
      tl.fromTo('.ls-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, 0.4);

      // Summary section
      tl.fromTo('.ls-summary-title', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, 1.0);
      tl.fromTo('.ls-quote', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.3);
      tl.fromTo('.ls-detail', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.5);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="ls-title text-h1 md:text-display-xl font-bold text-[var(--text-primary)] mb-5 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        其它类龙虾产品定位
      </h2>

      {/* Section label */}
      <div className="ls-section-label mb-4 opacity-0">
        <span className="text-body-sm font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#F9731615', color: '#F97316' }}>
          同类产品对比
        </span>
      </div>

      {/* Product cards */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-6">
        {PRODUCTS.map((product) => (
          <div key={product.name}
            className="ls-card rounded-xl border-2 p-4 md:p-5 opacity-0"
            style={{ borderColor: `${product.color}50`, backgroundColor: `${product.color}08` }}>
            {/* Image placeholder */}
            <div className="ls-card-img w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center mb-3 overflow-hidden relative"
              style={{ borderColor: `${product.color}30`, backgroundColor: `${product.color}06` }}>
              <ClickableImage src={product.imgSrc} alt={product.name}
                className="w-full h-full object-contain relative z-10"
                onLoad={(e) => { ((e.target as HTMLImageElement).nextElementSibling as HTMLElement)?.remove(); }}
                onError={(e) => { (e.target as HTMLImageElement).remove(); }} />
              <span className="text-caption text-[var(--text-secondary)] opacity-40">
                待添加图片
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: product.color }} />
              <h3 className="text-body-lg font-bold" style={{ color: product.color }}>{product.name}</h3>
            </div>
            <p className="text-body-sm text-[var(--text-primary)] mb-2">{product.desc}</p>
            <span className="text-caption px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: `${product.color}12`, color: product.color }}>
              {product.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Positioning summary */}
      <div className="max-w-4xl w-full">
        <div className="ls-summary-title rounded-2xl border-2 p-5 text-center mb-4 opacity-0"
          style={{ borderColor: '#F97316', backgroundColor: '#F9731608', boxShadow: '0 0 25px #F9731615' }}>
          <p className="text-h3 font-bold" style={{ color: '#F97316' }}>
            龙虾 = 具备自我迭代机制的智能体框架
          </p>
        </div>

        {/* Quote */}
        <div className="ls-quote rounded-xl border px-5 py-3 text-center mb-3 opacity-0"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <p className="text-body-sm text-[var(--text-secondary)] italic leading-relaxed">
            "龙虾是Agent框架的一个产品实现，非行业标准亦非最终形态"
          </p>
        </div>

        {/* Detail */}
        <div className="ls-detail text-center opacity-0">
          <p className="text-caption text-[var(--text-secondary)]">
            同类产品共享Skills与Harness的核心思路，差异在于实现路径与场景侧重
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide13_LobsterSummary);
