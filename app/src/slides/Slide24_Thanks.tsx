import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const Slide24_Thanks: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.th-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)' });
      tl.fromTo('.th-dept', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.6);
      tl.fromTo('.th-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0.9);
      tl.fromTo('.th-date', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        <h1 className="th-title text-display-xl font-extrabold leading-[1.05] tracking-[-0.03em]"
          style={{ color: 'var(--primary)' }}>
          谢谢聆听
        </h1>

        <p className="th-dept text-h3 text-[var(--text-secondary)] mt-5">
          北京公司数智化部
        </p>

        <div className="th-divider w-[120px] h-0.5 mt-6 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', transform: 'scaleX(0)' }} />

        <div className="th-date mt-8 text-body-sm text-[var(--text-light)]">
          <span>2026年5月</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide24_Thanks);
