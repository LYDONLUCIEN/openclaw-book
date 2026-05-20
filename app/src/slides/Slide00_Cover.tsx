import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Calendar } from 'lucide-react';
import HeroOrb1 from '@/components/assets/HeroOrb1';
import HeroOrb2 from '@/components/assets/HeroOrb2';
import Badge from '@/components/Badge';

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

      tl.fromTo('.cover-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });

      if (titleLine1Ref.current) {
        const chars1 = titleLine1Ref.current.querySelectorAll('.char');
        tl.fromTo(chars1, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.02, ease: 'back.out(1.7)' }, 0.4);
      }

      if (titleLine2Ref.current) {
        const chars2 = titleLine2Ref.current.querySelectorAll('.char');
        tl.fromTo(chars2, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.02, ease: 'back.out(1.7)' }, 0.55);
      }

      tl.fromTo('.cover-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.0);
      tl.fromTo('.cover-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 1.2);
      tl.fromTo('.cover-presenter', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.4);

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
        <div className="cover-badge mb-6 opacity-0">
          <Badge variant="primary">
            <Calendar className="w-3.5 h-3.5 mr-1.5 inline" strokeWidth={2} />
            <span>中国移动内部培训 · 2026年5月</span>
          </Badge>
        </div>

        <div ref={titleLine1Ref} className="text-h1 md:text-display-lg text-[var(--primary)] leading-[1.15] tracking-[-0.02em] font-extrabold">
          <span className="inline-block">{renderChars('OpenClaw入门指南')}</span>
        </div>

        <div ref={titleLine2Ref} className="text-h2 md:text-h1 text-[var(--primary-dark)] leading-[1.15] tracking-[-0.02em] font-bold mt-2">
          <span className="inline-block">{renderChars('从理解特性到快速上手')}</span>
        </div>

        <p className="cover-subtitle text-h3 text-[var(--text-secondary)] mt-6 max-w-[600px] opacity-0">
          企业AI智能体技术讲座
        </p>

        <div className="cover-divider w-[120px] h-0.5 mt-8 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)', transform: 'scaleX(0)' }} />

        <div className="cover-presenter mt-8 text-body-sm text-[var(--text-light)] opacity-0">
          <span>技术部 · 2026年5月</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide00_Cover);
