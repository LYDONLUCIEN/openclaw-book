import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const points = [
  {
    num: '1',
    title: '确定性源于工程投入，而非模型本身',
    detail: '模型提供概率性推理，确定性需通过Prompt/RAG/Skill/Harness等工程手段叠加实现',
  },
  {
    num: '2',
    title: '三特性是演进方向，非可达终点',
    detail: '成本不会消失只会转移，每项技术升级都在重新分配三类成本的比重',
  },
  {
    num: '3',
    title: '有效使用Agent的前提是理解其边界',
    detail: '认知边界决定使用上限，理解模型的局限才能合理设计人机协作流程',
  },
];

const Slide22_FinalWords: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.final-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.final-point-0', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, 0.3)
        .fromTo('.final-point-1', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, 0.5)
        .fromTo('.final-point-2', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, 0.7)
        .fromTo('.final-quote', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.3)' }, 1.0)
        .fromTo('.final-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.4);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="final-title text-center mb-6">
        <h2 className="text-h1 md:text-display font-bold text-[var(--text-primary)]">核心结论</h2>
      </div>

      <div className="max-w-4xl w-full space-y-5 flex-1">
        {points.map((point, i) => (
          <div key={i}
            className={`final-point-${i} flex items-start gap-4 rounded-xl p-5 border`}
            style={{ borderColor: '#F9731620', backgroundColor: '#F9731608' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-body font-bold text-white"
              style={{ backgroundColor: '#F97316' }}>
              {point.num}
            </div>
            <div>
              <h3 className="text-body-lg font-bold text-[var(--text-primary)]">{point.title}</h3>
              <p className="text-caption text-[var(--text-secondary)] mt-1 leading-relaxed">{point.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote box */}
      <div className="final-quote max-w-4xl w-full rounded-xl p-5 border-2"
        style={{ borderColor: '#F97316', backgroundColor: '#F973160A' }}>
        <p className="text-body-sm text-[var(--text-primary)] leading-relaxed text-center">
          偷懒付出的成本终将转移至其他环节。投入时间与精力构建的理解与经验，才是长期竞争优势。成本叠加时间维度，即从消耗转化为投资。
        </p>
      </div>

      {/* Call to action */}
      <div className="final-cta max-w-4xl w-full rounded-xl p-4 text-center border-2"
        style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)08' }}>
        <p className="text-body-sm font-bold" style={{ color: 'var(--primary)' }}>
          从今日起，选取一个L1场景启动实践验证
        </p>
      </div>
    </section>
  );
};

export default memo(Slide22_FinalWords);
