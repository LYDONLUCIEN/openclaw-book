import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroOrb1 from '@/components/assets/HeroOrb1';
import HeroOrb2 from '@/components/assets/HeroOrb2';

interface SlideProps { isActive: boolean; }

const Slide21_Thanks: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (contentRef.current) {
        const chars = contentRef.current.querySelectorAll('.char');
        tl.fromTo(chars, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.7)' }, 0.2);
      }

      tl.fromTo('.thanks-qa', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.8)
        .fromTo('.thanks-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 1.1)
        .fromTo('.thanks-footer', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.3);

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
    <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div ref={orb1Ref} className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none hidden md:block" style={{ opacity: 0.06, filter: 'blur(80px)' }}>
        <HeroOrb1 width={500} height={500} />
      </div>
      <div ref={orb2Ref} className="absolute -bottom-20 -left-20 w-[400px] h-[400px] pointer-events-none hidden md:block" style={{ opacity: 0.05, filter: 'blur(80px)' }}>
        <HeroOrb2 width={400} height={400} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <div ref={contentRef} className="text-display-xl text-[var(--primary)] leading-[1.05] tracking-[-0.03em] font-extrabold">
          <span className="inline-block">{renderChars('谢谢聆听')}</span>
        </div>

        <p className="thanks-qa text-h2 text-[var(--text-secondary)] mt-6 max-w-[600px] opacity-0">
          Q &amp; A
        </p>

        <div className="thanks-divider w-[120px] h-0.5 mt-8 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)', transform: 'scaleX(0)' }} />

        <div className="thanks-footer mt-8 text-body-sm text-[var(--text-light)] opacity-0">
          <span>技术部 · 2026年5月</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide21_Thanks);
