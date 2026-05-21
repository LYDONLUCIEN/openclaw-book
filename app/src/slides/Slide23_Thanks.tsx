import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroOrb1 from '@/components/assets/HeroOrb1';
import HeroOrb2 from '@/components/assets/HeroOrb2';

interface SlideProps { isActive: boolean; }

const Slide23_Thanks: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo('.thanks-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)' })
        .fromTo('.thanks-dept', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.6)
        .fromTo('.thanks-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0.9)
        .fromTo('.thanks-qr', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, 1.1)
        .fromTo('.thanks-date', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.4);

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, { y: -20, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, { y: 20, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 3 });
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center pt-8 pb-16 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Background orbs */}
      <div ref={orb1Ref} className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none hidden md:block"
        style={{ opacity: 0.06, filter: 'blur(80px)' }}>
        <HeroOrb1 width={500} height={500} />
      </div>
      <div ref={orb2Ref} className="absolute -bottom-20 -left-20 w-[400px] h-[400px] pointer-events-none hidden md:block"
        style={{ opacity: 0.05, filter: 'blur(80px)' }}>
        <HeroOrb2 width={400} height={400} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        <h1 className="thanks-title text-display-xl font-extrabold leading-[1.05] tracking-[-0.03em]"
          style={{ color: 'var(--primary)' }}>
          谢谢聆听
        </h1>

        <p className="thanks-dept text-h3 text-[var(--text-secondary)] mt-5">
          北京公司数智化部
        </p>

        <div className="thanks-divider w-[120px] h-0.5 mt-6 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', transform: 'scaleX(0)' }} />

        {/* QR code placeholder */}
        <div className="thanks-qr mt-8 w-48 h-48 border-2 border-dashed rounded-xl flex items-center justify-center"
          style={{ borderColor: 'var(--border)' }}>
          <p className="text-caption text-[var(--text-light)] px-4 text-center leading-snug">
            [二维码占位：<br />内部社区/入门文档链接]
          </p>
        </div>

        <div className="thanks-date mt-8 text-body-sm text-[var(--text-light)]">
          <span>2026年5月</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide23_Thanks);
