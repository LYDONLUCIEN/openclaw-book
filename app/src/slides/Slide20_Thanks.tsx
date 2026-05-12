import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Calendar } from 'lucide-react';
import HeroOrb1 from '@/components/assets/HeroOrb1';
import HeroOrb2 from '@/components/assets/HeroOrb2';
import Badge from '@/components/Badge';

interface SlideProps { isActive: boolean; }

const Slide20_Thanks: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo('.thanks-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(chars, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.7)' }, 0.4);
      }

      tl.fromTo('.thanks-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.0)
        .fromTo('.thanks-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 1.2)
        .fromTo('.thanks-contact', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.4)
        .fromTo('.thanks-resource', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 1.6);

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
        <div className="thanks-badge mb-6 opacity-0">
          <Badge variant="primary">
            <Calendar className="w-3.5 h-3.5 mr-1.5 inline" strokeWidth={2} />
            <span>AI Agent技术讲座 · 2026</span>
          </Badge>
        </div>

        <div ref={titleRef} className="text-display-xl text-[var(--primary)] leading-[1.05] tracking-[-0.03em] font-extrabold">
          <span className="inline-block">{renderChars('感谢聆听')}</span>
        </div>

        <p className="thanks-subtitle text-h2 text-[var(--text-secondary)] mt-6 max-w-[600px] opacity-0">
          从问题到解决方案
        </p>

        <div className="thanks-divider w-[120px] h-0.5 mt-8 origin-center" style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)', transform: 'scaleX(0)' }} />

        <div className="thanks-contact mt-8 text-body-sm text-[var(--text-light)] opacity-0">
          <span>技术部 · 中国移动</span>
        </div>

        <div className="flex items-center gap-3 mt-8">
          <span className="thanks-resource opacity-0"><Badge variant="accent">OpenClaw官网</Badge></span>
          <span className="thanks-resource opacity-0"><Badge variant="primary">聚智智能体平台</Badge></span>
          <span className="thanks-resource opacity-0"><Badge variant="success">磐匠数字员工</Badge></span>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide20_Thanks);
