import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroOrb1 from '@/components/assets/HeroOrb1';
import HeroOrb2 from '@/components/assets/HeroOrb2';
import Badge from '@/components/Badge';

interface SlideProps { isActive: boolean; }

/**
 * Slide 18 — Thank You Page
 * Mirrors the cover slide design with floating orbs and SplitText animation
 */
const Slide18_Thanks: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Badge fades in first
      tl.fromTo(
        '.thanks-badge',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );

      // 2. Title — per-character animation
      if (titleLine1Ref.current) {
        const chars1 = titleLine1Ref.current.querySelectorAll('.char');
        tl.fromTo(
          chars1,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.7)' },
          0.4
        );
      }

      // 3. Title line 2 — per-character animation
      if (titleLine2Ref.current) {
        const chars2 = titleLine2Ref.current.querySelectorAll('.char');
        tl.fromTo(
          chars2,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.7)' },
          0.65
        );
      }

      // 4. Subtitle
      tl.fromTo(
        '.thanks-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        1.1
      );

      // 5. Decorative divider
      tl.fromTo(
        '.thanks-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' },
        1.3
      );

      // 6. Contact info
      tl.fromTo(
        '.thanks-contact',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.5
      );

      // 7. Resource badges
      tl.fromTo(
        '.thanks-resources .res-badge',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
        1.7
      );

      // Continuous orb floating animation
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -20,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: 20,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  // Split text into characters for animation
  const renderChars = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Decorative Orb 1 — Top-right */}
      <div
        ref={orb1Ref}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none hidden md:block"
        style={{ opacity: 0.06, filter: 'blur(80px)' }}
      >
        <HeroOrb1 width={500} height={500} />
      </div>

      {/* Decorative Orb 2 — Bottom-left */}
      <div
        ref={orb2Ref}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] pointer-events-none hidden md:block"
        style={{ opacity: 0.05, filter: 'blur(80px)' }}
      >
        <HeroOrb2 width={400} height={400} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="thanks-badge mb-6 opacity-0">
          <Badge variant="primary">
            <span>AI Agent技术讲座 · 2026</span>
          </Badge>
        </div>

        {/* Title — Line 1 */}
        <div
          ref={titleLine1Ref}
          className="text-display-xl text-[var(--primary)] leading-[1.05] tracking-[-0.03em] font-extrabold"
        >
          <span className="inline-block">{renderChars('感谢聆听')}</span>
        </div>

        {/* Title — Line 2 */}
        <div
          ref={titleLine2Ref}
          className="text-display-xl text-[var(--primary)] leading-[1.05] tracking-[-0.03em] font-extrabold mt-1"
        >
          <span className="inline-block">{renderChars('Q & A')}</span>
        </div>

        {/* Subtitle */}
        <p className="thanks-subtitle text-h2 text-[var(--text-secondary)] mt-6 max-w-[600px] opacity-0">
          从OpenClaw到企业落地
        </p>

        {/* Decorative Divider */}
        <div
          className="thanks-divider w-[120px] h-0.5 mt-8 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)',
            transform: 'scaleX(0)',
          }}
        />

        {/* Contact Info */}
        <div className="thanks-contact mt-8 text-body-sm text-[var(--text-light)] opacity-0">
          <span>技术部 · 中国移动</span>
        </div>

        {/* Resource Badges */}
        <div className="thanks-resources flex flex-wrap items-center justify-center gap-3 mt-8">
          <div className="res-badge opacity-0">
            <Badge variant="accent">
              <span>OpenClaw官网</span>
            </Badge>
          </div>
          <div className="res-badge opacity-0">
            <Badge variant="primary">
              <span>聚智智能体平台</span>
            </Badge>
          </div>
          <div className="res-badge opacity-0">
            <Badge variant="success">
              <span>磐匠RPA</span>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide18_Thanks);
