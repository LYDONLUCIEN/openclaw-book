import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrendingUp, Star, ShoppingBag, ChevronRight, Image } from 'lucide-react';
import ClickableImage from '@/components/ImageOverlay';

interface SlideProps { isActive: boolean; }

const COL1_NEWS = [
  { label: '375K+ Stars', source: 'GitHub 历史级增速' },
  { label: '全球开源排名第1', source: 'OSRank 2026' },
  { label: '发布数周登顶热榜', source: 'GitHub Trending' },
  { label: '社区贡献者遍布全球', source: 'Contributors' },
];

const COL2_VENDORS = [
  { name: 'OpenClaw', color: '#F97316' },
  { name: 'ArClaw', color: '#8B5CF6' },
  { name: 'Autoclaw', color: '#3B82F6' },
  { name: 'Qclaw', color: '#10B981' },
  { name: 'Maxclaw', color: '#EC4899' },
  { name: 'Workbudy', color: '#F59E0B' },
  { name: 'Hermes', color: '#06B6D4' },
];

const MOBILE_STRATEGY = { label: '各大厂商纷纷下场', desc: '免费部署龙虾，token运营关键抓手' };

const COL3_TERMS = ['Prompt', 'RAG', 'ReAct', 'MCP', 'Function Call', 'Workflow', 'Skills', 'Harness', 'Fine-tuning', 'Embedding', 'Vector DB', 'Vibe Coding'];

const COL3_HIGHLIGHTS = [
  { icon: '🔥', text: '催生现象级 AI 应用 Motlbook 诞生' },
  { icon: '🤖', text: '全 AI Agent 自主讨论的论坛，人类旁观' },
  { icon: '👥', text: '已有 170 万+ Agent 进入社群自主讨论' },
  { icon: '💬', text: '出现「天网」「末世」「赛博永生」等帖子' },
];

const QUESTIONS = [
  { q: '龙虾到底是什么？能用来做什么？', color: 'var(--primary)' },
  { q: '龙虾种类繁多，我应如何选择？', color: 'var(--accent)' },
  { q: '面对实际业务场景，如何有效落地？', color: 'var(--secondary)' },
];

function HoverCard({
  colIndex, hoveredCol, onEnter, onLeave, borderColor, bgColor, children,
}: {
  colIndex: number;
  hoveredCol: number | null;
  onEnter: () => void;
  onLeave: () => void;
  borderColor: string;
  bgColor: string;
  children: React.ReactNode;
}) {
  const isHovered = hoveredCol === colIndex;
  const isOther = hoveredCol !== null && hoveredCol !== colIndex;

  return (
    <div
      className="s1-col h-full opacity-0"
      onMouseEnter={(e) => { e.stopPropagation(); onEnter(); }}
      onMouseLeave={onLeave}
    >
      <div
        className="flex flex-col h-full rounded-xl border-2 p-5 md:p-6"
        style={{
          borderColor,
          backgroundColor: bgColor,
          transform: isHovered ? 'scale(1.04)' : isOther ? 'scale(0.96)' : 'scale(1)',
          filter: isOther ? 'blur(2px)' : 'none',
          opacity: isOther ? 0.5 : 1,
          zIndex: isHovered ? 10 : 1,
          transition: 'transform 0.3s ease-out, filter 0.3s ease-out, opacity 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

const Slide01_Cover: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  useGSAP(() => {
    if (!isActive || phase !== 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s1-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo('.s1-col', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.3)', delay: 0.3 });
      gsap.fromTo('.s1-hint', { opacity: 0 }, { opacity: 0.6, duration: 0.4, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  useGSAP(() => {
    if (!isActive || phase !== 1 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.s1-cols', { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' });
      gsap.fromTo('.s1-problem-title', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.s1-problem-img', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)', delay: 0.5 });
      gsap.fromTo('.s1-problem-desc', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.9 });
      gsap.fromTo('.s1-hint', { opacity: 0 }, { opacity: 0.6, duration: 0.4, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  useGSAP(() => {
    if (!isActive || phase !== 2 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s1-q-card', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.3)', delay: 0.3 });
      gsap.fromTo('.s1-conclusion', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)', delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  React.useEffect(() => {
    if (!isActive) setHoveredCol(null);
  }, [isActive]);

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={() => setPhase(phase < 2 ? phase + 1 : 0)}>

      {/* Title */}
      <h2 className="s1-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-4 opacity-0">
        OpenClaw 横空出世
      </h2>

      {/* Phase 0: Three columns — 龙虾爆火(左) · 现象级应用(中) · 各家争奇斗艳(右) */}
      {phase === 0 && (
        <div className="s1-cols w-full max-w-6xl flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

            {/* Column 1: 龙虾爆火 */}
            <HoverCard colIndex={0} hoveredCol={hoveredCol}
              onEnter={() => setHoveredCol(0)} onLeave={() => setHoveredCol(null)}
              borderColor="var(--primary)60" bgColor="var(--primary)04">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} style={{ color: 'var(--primary)' }} />
                <h3 className="text-body font-bold" style={{ color: 'var(--primary)' }}>龙虾爆火</h3>
              </div>
              <div className="space-y-2 mb-3">
                {COL1_NEWS.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--primary)08' }}>
                    <Star size={12} style={{ color: 'var(--primary)' }} />
                    <span className="text-body-sm font-semibold" style={{ color: 'var(--primary)' }}>{item.label}</span>
                    <span className="text-caption text-[var(--text-light)] ml-auto">{item.source}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto w-full rounded-lg overflow-hidden border"
                style={{ borderColor: 'var(--primary)30' }}>
                <ClickableImage src="/images/github-trend.png" alt="GitHub 趋势图" className="w-full h-auto object-contain" />
              </div>
            </HoverCard>

            {/* Column 2: 现象级 AI 应用诞生 */}
            <HoverCard colIndex={1} hoveredCol={hoveredCol}
              onEnter={() => setHoveredCol(1)} onLeave={() => setHoveredCol(null)}
              borderColor="var(--secondary)60" bgColor="var(--secondary)04">
              <div className="flex items-center gap-2 mb-3">
                <Image size={16} style={{ color: 'var(--secondary)' }} />
                <h3 className="text-body font-bold" style={{ color: 'var(--secondary)' }}>现象级 AI 应用诞生</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {COL3_TERMS.map((term, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full text-[11px] font-medium border"
                    style={{ borderColor: 'var(--text-light)40', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)' }}>
                    {term}
                  </span>
                ))}
              </div>
              <div className="space-y-1.5 mb-3">
                {COL3_HIGHLIGHTS.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ backgroundColor: 'var(--secondary)08' }}>
                    <span className="text-caption shrink-0">{item.icon}</span>
                    <span className="text-body-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto w-full rounded-lg overflow-hidden border"
                style={{ borderColor: 'var(--secondary)30' }}>
                <ClickableImage src="/images/huanpi.png" alt="现象级应用截图" className="w-full h-auto object-contain" />
              </div>
            </HoverCard>

            {/* Column 3: 各家龙虾争奇斗艳 */}
            <HoverCard colIndex={2} hoveredCol={hoveredCol}
              onEnter={() => setHoveredCol(2)} onLeave={() => setHoveredCol(null)}
              borderColor="var(--accent)60" bgColor="var(--accent)04">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag size={16} style={{ color: 'var(--accent)' }} />
                <h3 className="text-body font-bold" style={{ color: 'var(--accent)' }}>各家龙虾争奇斗艳</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {COL2_VENDORS.map((v, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border text-caption font-semibold"
                    style={{ borderColor: v.color, color: v.color, backgroundColor: `${v.color}08` }}>
                    {v.name}
                  </span>
                ))}
              </div>
              <div className="rounded-lg px-3 py-2.5 border-2 mb-3" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent)08' }}>
                <span className="text-body-sm font-bold block" style={{ color: 'var(--accent)' }}>{MOBILE_STRATEGY.label}</span>
                <span className="text-caption text-[var(--text-secondary)]">{MOBILE_STRATEGY.desc}</span>
              </div>
              <div className="mt-auto w-full rounded-lg overflow-hidden border"
                style={{ borderColor: 'var(--accent)30' }}>
                <ClickableImage src="/images/lobster-news.png" alt="龙虾热门新闻" className="w-full h-auto object-contain" />
              </div>
            </HoverCard>

          </div>

          <div className="s1-hint text-center mt-6 opacity-0">
            <p className="text-body text-[var(--text-light)] flex items-center justify-center gap-2">
              点击收拢 <ChevronRight size={14} />
            </p>
          </div>
        </div>
      )}

      {/* Phase 1: 遇到使用问题 */}
      {phase === 1 && (
        <div className="s1-problem w-full max-w-5xl flex flex-col items-center justify-center flex-1">
          <h2 className="s1-problem-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-6 opacity-0">
            遇到使用问题
          </h2>
          <div className="s1-problem-img grid grid-cols-2 gap-6 w-full max-w-4xl opacity-0">
            <ClickableImage
              src="/images/slide-from-hot-to-cold.png"
              alt="从夯到拉"
              className="w-full h-auto rounded-xl shadow-lg"
            />
            <ClickableImage
              src="/images/claw-info-explosion.png"
              alt="信息爆炸"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          <div className="s1-problem-desc mt-6 text-center max-w-2xl opacity-0">
            <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed mb-2">
              看了很多测评，依然不会下手。
            </p>
            <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
              使用过程不顺，效果不好，甚至产生焦虑。
            </p>
          </div>
        </div>
      )}

      {/* Phase 2: Collapsed - three questions */}
      {phase === 2 && (
        <div className="s1-summary w-full max-w-4xl">
          <div className="space-y-5">
            {QUESTIONS.map((item, i) => (
              <div key={i} className="s1-q-card rounded-xl border-2 p-5 md:p-6 opacity-0"
                style={{ borderColor: `${item.color}80`, backgroundColor: `${item.color}08` }}>
                <div className="flex items-center gap-4">
                  <span className="text-h2 font-extrabold shrink-0" style={{ color: item.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-body-lg font-bold text-[var(--text-primary)] leading-relaxed">
                    {item.q}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="s1-conclusion text-center mt-8">
            <h2 className="text-h1 md:text-display font-bold text-[var(--text-primary)]">
              以智力成本视角解构龙虾，直击本质
            </h2>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击继续' : phase === 1 ? '点击继续' : '点击重新开始'}
      </div>
    </section>
  );
};

export default memo(Slide01_Cover);
