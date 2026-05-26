import React, { useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const ROWS = [
  {
    color: '#F97316',
    tag: '01',
    left: {
      title: '三特性与智能成本的不可能三角',
      points: ['便利性 ↔ 操作成本', '完备性 ↔ 开发成本', '确定性 ↔ 确认成本'],
    },
    right: {
      line1: '三种智能成本',
      line2: '相互转移',
    },
  },
  {
    color: '#8B5CF6',
    tag: '02',
    left: {
      title: 'Harness 与 Skills 的角色',
      points: [
        '模型智能：众人之数据与时代发展',
        'Harness：开发人员与工程师经验的沉淀',
        'Skills：业务人员与业务经验的沉淀',
      ],
    },
    right: {
      line1: '智能体的发展史：',
      line2: '知识准确理解 + 过程确定可控',
    },
  },
  {
    color: '#10B981',
    tag: '03',
    left: {
      title: '众人之力托举',
      points: ['时间、精力、金钱的投入', '让准入门槛变得可以接受', '学习到的东西是未来的机会'],
    },
    right: {
      line1: '成本加上时间的可能性',
      line2: '就是投资',
    },
  },
];

const BIG_WORDS = [
  { text: '先', color: '#F97316' },
  { text: '玩', color: '#3B82F6' },
  { text: '起', color: '#8B5CF6' },
  { text: '来', color: '#10B981' },
];

const Slide23_Thanks: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const handleClick = useCallback(() => {
    if (revealed || !containerRef.current) return;
    setRevealed(true);

    gsap.context(() => {
      gsap.to('.sm-content', {
        opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => gsap.set('.sm-content', { display: 'none' }),
      });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.set('.sm-reveal', { display: 'flex', opacity: 0 });
      tl.to('.sm-reveal', { opacity: 1, duration: 0.4 });
      tl.fromTo('.sm-big-word',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
      );
    }, containerRef);
  }, [revealed]);

  // Reset on slide re-enter
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    if (revealed) {
      setRevealed(false);
      gsap.context(() => {
        gsap.set('.sm-content', { display: '', opacity: 1 });
        gsap.set('.sm-reveal', { display: 'none', opacity: 0 });
        gsap.set('.sm-big-word', { opacity: 0, y: 40 });
      }, containerRef);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.sm-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      ROWS.forEach((_, i) => {
        tl.fromTo(`.sm-row-${i}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.3 + i * 0.2);
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full h-[100dvh] flex flex-col items-center pt-14 pb-16 px-4 md:px-8 relative overflow-hidden cursor-pointer"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={handleClick}>

      {/* Summary content */}
      <div className="sm-content flex flex-col items-center w-full h-full">
        <h2 className="sm-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-4 opacity-0 flex items-center gap-2">
          <ChapterBadge chapter={3} />
          最后总结
        </h2>

        {/* 3×3 Grid */}
        <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto grid grid-rows-3 gap-3">

          {/* Row 0: Impossible Triangle */}
          <div className="sm-row-0 min-h-0 grid grid-cols-[2fr_3fr_2fr] gap-3 rounded-xl border-2 p-3 md:p-4 opacity-0"
            style={{ borderColor: `${ROWS[0].color}30`, backgroundColor: `${ROWS[0].color}06` }}>

            <div className="flex flex-col justify-center">
              <span className="text-caption font-bold px-2 py-0.5 rounded inline-block w-fit mb-2"
                style={{ backgroundColor: `${ROWS[0].color}15`, color: ROWS[0].color }}>{ROWS[0].tag}</span>
              <h3 className="text-body font-bold text-[var(--text-primary)] mb-2">{ROWS[0].left.title}</h3>
              <ul className="space-y-1">
                {ROWS[0].left.points.map((p) => (
                  <li key={p} className="text-caption text-[var(--text-secondary)] leading-snug flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: ROWS[0].color }}>●</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <svg viewBox="0 0 240 150" className="w-full max-w-[260px]">
                <line x1="120" y1="28" x2="20" y2="120" stroke={`${ROWS[0].color}40`} strokeWidth="1.5" strokeDasharray="5,3" />
                <line x1="120" y1="28" x2="220" y2="120" stroke={`${ROWS[0].color}40`} strokeWidth="1.5" strokeDasharray="5,3" />
                <line x1="20" y1="120" x2="220" y2="120" stroke={`${ROWS[0].color}40`} strokeWidth="1.5" strokeDasharray="5,3" />
                <circle cx="120" cy="88" r="18" fill={`${ROWS[0].color}15`} stroke={ROWS[0].color} strokeWidth="1.2" />
                <text x="120" y="92" textAnchor="middle" fill={ROWS[0].color} fontSize="10" fontWeight="bold">成本</text>
                <circle cx="120" cy="28" r="13" fill="#3B82F620" stroke="#3B82F6" strokeWidth="1.2" />
                <text x="120" y="10" textAnchor="middle" fill="#3B82F6" fontSize="10" fontWeight="bold">操作成本</text>
                <circle cx="20" cy="120" r="13" fill="#10B98120" stroke="#10B981" strokeWidth="1.2" />
                <text x="20" y="142" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">开发成本</text>
                <circle cx="220" cy="120" r="13" fill="#F9731620" stroke="#F97316" strokeWidth="1.2" />
                <text x="220" y="142" textAnchor="middle" fill="#F97316" fontSize="10" fontWeight="bold">确认成本</text>
              </svg>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-body-lg md:text-h3 font-bold leading-relaxed" style={{ color: ROWS[0].color }}>
                  {ROWS[0].right.line1}
                </p>
                <p className="text-body-lg md:text-h3 font-bold leading-relaxed" style={{ color: ROWS[0].color }}>
                  {ROWS[0].right.line2}
                </p>
              </div>
            </div>
          </div>

          {/* Row 1: Harness & Skills */}
          <div className="sm-row-1 min-h-0 grid grid-cols-[2fr_3fr_2fr] gap-3 rounded-xl border-2 p-3 md:p-4 opacity-0"
            style={{ borderColor: `${ROWS[1].color}30`, backgroundColor: `${ROWS[1].color}06` }}>

            <div className="flex flex-col justify-center">
              <span className="text-caption font-bold px-2 py-0.5 rounded inline-block w-fit mb-2"
                style={{ backgroundColor: `${ROWS[1].color}15`, color: ROWS[1].color }}>{ROWS[1].tag}</span>
              <h3 className="text-body font-bold text-[var(--text-primary)] mb-2">{ROWS[1].left.title}</h3>
              <ul className="space-y-1">
                {ROWS[1].left.points.map((p) => (
                  <li key={p} className="text-caption text-[var(--text-secondary)] leading-snug flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: ROWS[1].color }}>●</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                  <div className="px-5 py-2 rounded-lg border-2 text-body-sm font-bold text-center"
                    style={{ borderColor: '#10B981', color: '#10B981', backgroundColor: '#10B98118' }}>
                    Skills 工具层
                  </div>
                  <div className="px-5 py-2 rounded-lg border-2 text-body-sm font-bold text-center"
                    style={{ borderColor: ROWS[1].color, color: ROWS[1].color, backgroundColor: `${ROWS[1].color}10` }}>
                    Harness 编排层
                  </div>
                  <div className="px-5 py-2 rounded-lg border text-body-sm font-bold text-center"
                    style={{ borderColor: '#3B82F660', color: '#3B82F6AA', backgroundColor: '#3B82F608' }}>
                    大模型基座
                  </div>
                </div>
                <svg width="24" height="100" viewBox="0 0 24 100" className="flex-shrink-0">
                  <line x1="12" y1="8" x2="12" y2="92" stroke={ROWS[1].color} strokeWidth="2" />
                  <polygon points="5,12 12,2 19,12" fill={ROWS[1].color} />
                  <polygon points="5,88 12,98 19,88" fill={ROWS[1].color} />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-body-lg md:text-h3 font-bold leading-relaxed" style={{ color: ROWS[1].color }}>
                  {ROWS[1].right.line1}
                </p>
                <p className="text-body-lg md:text-h3 font-bold leading-relaxed" style={{ color: ROWS[1].color }}>
                  {ROWS[1].right.line2}
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Cost + Time */}
          <div className="sm-row-2 min-h-0 grid grid-cols-[2fr_3fr_2fr] gap-3 rounded-xl border-2 p-3 md:p-4 opacity-0"
            style={{ borderColor: `${ROWS[2].color}30`, backgroundColor: `${ROWS[2].color}06` }}>

            <div className="flex flex-col justify-center">
              <span className="text-caption font-bold px-2 py-0.5 rounded inline-block w-fit mb-2"
                style={{ backgroundColor: `${ROWS[2].color}15`, color: ROWS[2].color }}>{ROWS[2].tag}</span>
              <h3 className="text-body font-bold text-[var(--text-primary)] mb-2">{ROWS[2].left.title}</h3>
              <ul className="space-y-1">
                {ROWS[2].left.points.map((p) => (
                  <li key={p} className="text-caption text-[var(--text-secondary)] leading-snug flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: ROWS[2].color }}>●</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {['时间', '精力', '金钱'].map((item) => (
                    <div key={item} className="px-4 py-2 rounded-lg border-2 text-body-sm font-bold"
                      style={{ borderColor: `${ROWS[2].color}60`, color: ROWS[2].color, backgroundColor: `${ROWS[2].color}10` }}>
                      {item}
                    </div>
                  ))}
                  <svg width="32" height="16" viewBox="0 0 32 16" className="flex-shrink-0">
                    <line x1="0" y1="8" x2="22" y2="8" stroke={ROWS[2].color} strokeWidth="2.5" />
                    <polygon points="18,3 32,8 18,13" fill={ROWS[2].color} />
                  </svg>
                  <div className="px-5 py-2 rounded-lg border-2 text-body-sm font-bold"
                    style={{ borderColor: ROWS[2].color, color: ROWS[2].color, backgroundColor: `${ROWS[2].color}15` }}>
                    投资
                  </div>
                </div>
                <div className="w-full px-3 py-2 rounded-lg border-2 text-center text-caption font-bold"
                  style={{ borderColor: '#6366F180', color: '#6366F1', backgroundColor: '#6366F110' }}>
                  AI 能力迭代 ── 托举跨越门槛，成本转化为投资
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-body-lg md:text-h3 font-bold leading-relaxed" style={{ color: ROWS[2].color }}>
                  {ROWS[2].right.line1}
                </p>
                <p className="text-body-lg md:text-h3 font-bold leading-relaxed" style={{ color: ROWS[2].color }}>
                  {ROWS[2].right.line2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big words reveal */}
      <div className="sm-reveal hidden absolute inset-0 flex-col items-center justify-center z-20"
        style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="flex items-center gap-8 md:gap-16">
          {BIG_WORDS.map((w) => (
            <span key={w.text}
              className="sm-big-word text-[22vw] md:text-[18vw] font-extrabold leading-none select-none"
              style={{ color: w.color }}>
              {w.text}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default memo(Slide23_Thanks);
