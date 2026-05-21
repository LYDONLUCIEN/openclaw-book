import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroOrb1 from '@/components/assets/HeroOrb1';
import HeroOrb2 from '@/components/assets/HeroOrb2';

interface SlideProps { isActive: boolean; }

const Slide00_Cover: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo('.cover-top-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });

      if (titleLine1Ref.current) {
        const chars1 = titleLine1Ref.current.querySelectorAll('.char');
        tl.fromTo(chars1, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.03, ease: 'back.out(1.7)' }, 0.4);
      }

      if (titleLine2Ref.current) {
        const chars2 = titleLine2Ref.current.querySelectorAll('.char');
        tl.fromTo(chars2, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.03, ease: 'back.out(1.7)' }, 0.7);
      }

      tl.fromTo('.cover-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 1.3);
      tl.fromTo('.cover-footer', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.5);

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, { y: -20, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, { y: 20, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 3 });
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const renderChars = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
        {char === ' ' ? ' ' : char}
      </span>
    ));

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-8 pb-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div ref={orb1Ref} className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none hidden md:block" style={{ opacity: 0.06, filter: 'blur(80px)' }}>
        <HeroOrb1 width={500} height={500} />
      </div>
      <div ref={orb2Ref} className="absolute -bottom-20 -left-20 w-[400px] h-[400px] pointer-events-none hidden md:block" style={{ opacity: 0.05, filter: 'blur(80px)' }}>
        <HeroOrb2 width={400} height={400} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <div className="cover-top-title mb-10 opacity-0">
          <span className="text-h3 md:text-h2 font-semibold tracking-[0.15em] text-[var(--text-secondary)]">
            北京移动专家讲座
          </span>
        </div>

        <div ref={titleLine1Ref} className="text-display md:text-display-xl text-[var(--primary)] leading-[1.1] tracking-[-0.02em] font-extrabold">
          <span className="inline-block">{renderChars('OpenClaw 入门指南')}</span>
        </div>

        <div ref={titleLine2Ref} className="text-h1 md:text-display text-[var(--primary-dark)] leading-[1.15] tracking-[-0.02em] font-bold mt-4">
          <span className="inline-block">{renderChars('从理解到实战')}</span>
        </div>

        <div className="cover-divider w-[160px] h-0.5 mt-10 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)', transform: 'scaleX(0)' }} />

        <div className="cover-footer mt-10 text-body text-[var(--text-light)] opacity-0">
          <span>北京公司数智化部 · 2026年5月</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide00_Cover);
