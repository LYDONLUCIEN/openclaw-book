import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Server, Cpu, MessageSquare, Star, GitFork, TrendingUp } from 'lucide-react';
import DataCard from '@/components/DataCard';
import FlowDiagram from '@/components/FlowDiagram';
import type { FlowNode } from '@/components/FlowDiagram';
import ExpandableSection from '@/components/ExpandableSection';
import Badge from '@/components/Badge';

interface SlideProps {
  isActive: boolean;
}

/**
 * Slide 07 — OpenClaw Architecture Part 1
 * Hero counter animation, 3-tier architecture diagram, key stats
 */
const Slide07_OpenClaw1: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [displayCount, setDisplayCount] = useState(0);

  // Counter animation — count up from 0 to 278,932
  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 278932,
        duration: 2.5,
        delay: 0.4,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayCount(Math.round(counterObj.val));
        },
      });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        // 1. Subtitle badge
        tl.fromTo(
          '.slide07-subtitle-badge',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0
        );

        // 2. Title
        tl.fromTo(
          '.slide07-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.1
        );

        // 3. Star icon glow
        tl.fromTo(
          '.slide07-star-icon',
          { opacity: 0, scale: 0.5, rotation: -30 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.5)' },
          0.5
        );

        // 4. Counter subtitle
        tl.fromTo(
          '.slide07-counter-sub',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          1.5
        );

        // 5. Architecture section title
        tl.fromTo(
          '.slide07-arch-title',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          1.8
        );

        // 6. Architecture diagram
        tl.fromTo(
          '.slide07-arch-diagram',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          2.0
        );

        // 7. Channel badges
        tl.fromTo(
          '.slide07-channel-badge',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.3)' },
          2.3
        );

        // 8. Data cards
        tl.fromTo(
          '.slide07-data-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' },
          2.5
        );

        // 9. Expandable section
        tl.fromTo(
          '.slide07-expandable',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          3.0
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [isActive] }
  );

  // Architecture flow nodes
  const archNodes: FlowNode[] = [
    {
      id: 'gateway',
      title: 'Gateway 网关',
      description: '大脑，始终运行，协调一切',
      icon: Server,
      active: true,
    },
    {
      id: 'node',
      title: 'Node 节点',
      description: '手脚，执行具体任务',
      icon: Cpu,
    },
    {
      id: 'channel',
      title: 'Channel 渠道',
      description: '感官，20+平台接入',
      icon: MessageSquare,
    },
  ];

  const channels = [
    '飞书',
    '钉钉',
    '企业微信',
    'QQ',
    'Telegram',
    'Discord',
    'Slack',
    'WhatsApp',
    'LINE',
  ];

  // Format number with commas
  const formatNumber = (num: number) =>
    num.toLocaleString('en-US');

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Subtitle Badge */}
        <div className="slide07-subtitle-badge mb-4 opacity-0">
          <Badge variant="accent">
            <Star className="w-3.5 h-3.5 mr-1.5 inline" strokeWidth={2.5} />
            <span>开源AI Agent操作系统</span>
          </Badge>
        </div>

        {/* Title */}
        <h2 className="slide07-title text-h1 md:text-display-xl font-extrabold text-[var(--text-primary)] text-center opacity-0">
          OpenClaw深度解析
        </h2>
        <p className="text-body text-[var(--text-secondary)] text-center mt-2">
          全球GitHub Star排名第一 · 开源AI Agent操作系统
        </p>

        {/* Hero Counter Section */}
        <div className="mt-10 mb-4 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <Star
              className="slide07-star-icon w-10 h-10 md:w-14 md:h-14 text-yellow-400 opacity-0"
              strokeWidth={1.5}
              fill="currentColor"
            />
            <span
              ref={counterRef}
              className="text-data font-mono font-extrabold text-[var(--accent)] leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              {formatNumber(displayCount)}
            </span>
          </div>
          <p className="slide07-counter-sub text-body text-[var(--text-secondary)] mt-2 opacity-0 flex items-center gap-2">
            <GitFork className="w-4 h-4" strokeWidth={2} />
            GitHub Stars
          </p>
          <div className="slide07-counter-sub mt-2 opacity-0 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[var(--success)]" strokeWidth={2.5} />
            <span className="text-body-sm font-semibold text-[var(--success)]">
              发布不到4个月 · 全球开源第一
            </span>
          </div>
        </div>

        {/* 3-Tier Architecture Diagram */}
        <div className="mt-8 w-full max-w-3xl">
          <h3 className="slide07-arch-title text-h3 font-bold text-[var(--text-primary)] text-center mb-6 opacity-0">
            三层架构设计
          </h3>
          <div className="slide07-arch-diagram opacity-0">
            <FlowDiagram nodes={archNodes} layout="vertical" className="w-full" />
          </div>

          {/* Channel Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {channels.map((ch) => (
              <span
                key={ch}
                className="slide07-channel-badge px-3 py-1 rounded-full text-caption font-medium border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-secondary)] opacity-0"
              >
                {ch}
              </span>
            ))}
            <span className="slide07-channel-badge text-caption font-semibold text-[var(--secondary)] opacity-0">
              + 15 more
            </span>
          </div>
        </div>

        {/* Key Stats Row */}
        <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="slide07-data-card opacity-0">
            <DataCard
              value="13,729"
              label="注册技能"
              description="社区贡献的Skills生态"
              suffix="Skills"
              className="h-full"
            />
          </div>
          <div className="slide07-data-card opacity-0">
            <DataCard
              value="100%"
              label="完全开源"
              description="代码完全开放，可审计可定制"
              suffix="开源"
              showArrow
              className="h-full"
            />
          </div>
          <div className="slide07-data-card opacity-0">
            <DataCard
              value="4"
              label="四层记忆系统"
              description="从身份到会话的完整记忆架构"
              suffix="层"
              className="h-full"
            />
          </div>
        </div>

        {/* Expandable Section — Birth Story */}
        <div className="slide07-expandable mt-8 w-full max-w-3xl opacity-0">
          <ExpandableSection
            toggleLabel="OpenClaw的诞生故事"
            hintText="点击展开"
          >
            <div className="text-body-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                <strong className="text-[var(--text-primary)]">Peter Steinberger</strong>，
                奥地利知名独立开发者，曾是iOS开发工具PSPDFKit的创始人。2025年底，他看到了AI Agent领域的巨大潜力，
                决定打造一个真正开放的AI Agent操作系统。
              </p>
              <p>
                <strong className="text-[var(--accent)]">2026年1月</strong>，OpenClaw正式在GitHub发布。
                凭借其优雅的架构设计、对数据主权的坚持、以及对多模型多平台的开放支持，
                迅速引爆了全球开发者社区。
              </p>
              <p>
                发布仅 <strong className="text-[var(--primary)]">4个月</strong>，
                便登顶GitHub全球Star排行榜，超越了过去十年积累的无数项目，
                成为开源AI Agent领域的绝对领导者。目前已有超过{' '}
                <strong className="text-[var(--success)]">3,500+</strong> 位开发者参与了代码贡献。
              </p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide07_OpenClaw1);
