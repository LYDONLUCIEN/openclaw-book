import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Store,
  Home,
  ShieldCheck,
  Building2,
  DollarSign,
  AlertTriangle,
  FileCode2,
  BarChart3,
  Terminal,
  Palette,
  Plug,
  Wrench,
  Lock,
  Wifi,
  TrendingDown,
  Zap,
} from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import Badge from '@/components/Badge';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps {
  isActive: boolean;
}

/**
 * Slide 09 — ClawHub & Self-Hosting Part 3
 * Two-column layout: ClawHub marketplace + Self-hosting benefits
 * Bottom insight bar with four pillars
 */
const Slide09_OpenClaw3: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        // 1. Badge
        tl.fromTo(
          '.slide09-badge',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0
        );

        // 2. Title
        tl.fromTo(
          '.slide09-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.1
        );

        // 3. Subtitle
        tl.fromTo(
          '.slide09-subtitle',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0.3
        );

        // 4. Left column header
        tl.fromTo(
          '.slide09-left-header',
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
          0.5
        );

        // 5. Category badges
        tl.fromTo(
          '.slide09-cat-badge',
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.06, ease: 'back.out(1.3)' },
          0.7
        );

        // 6. Top skills
        tl.fromTo(
          '.slide09-top-skill',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
          1.1
        );

        // 7. Warning panel
        tl.fromTo(
          '.slide09-warning',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          1.4
        );

        // 8. Right column header
        tl.fromTo(
          '.slide09-right-header',
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
          0.6
        );

        // 9. Benefit cards
        tl.fromTo(
          '.slide09-benefit',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          0.9
        );

        // 10. Bottom insight bar
        tl.fromTo(
          '.slide09-insight-bar',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          1.8
        );

        // 11. Pillar items
        tl.fromTo(
          '.slide09-pillar',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.2)' },
          2.1
        );

        // 12. Expandable
        tl.fromTo(
          '.slide09-expandable',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          2.5
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [isActive] }
  );

  const categories = [
    { label: '办公效率', icon: FileCode2 },
    { label: '开发工具', icon: Terminal },
    { label: '数据分析', icon: BarChart3 },
    { label: '系统运维', icon: Wrench },
    { label: '通信集成', icon: Plug },
    { label: '创意设计', icon: Palette },
  ];

  const topSkills = [
    {
      name: 'Shell执行器',
      desc: '安全沙箱内执行系统命令',
      downloads: '1.2M',
    },
    {
      name: '多模态理解',
      desc: '图片/音频/视频智能分析',
      downloads: '890K',
    },
    {
      name: '自动化工作流',
      desc: '定时任务+事件触发编排',
      downloads: '756K',
    },
  ];

  const benefits = [
    {
      icon: Home,
      title: '数据主权',
      desc: '所有数据留在企业内部，不经过任何第三方服务器，满足合规要求',
    },
    {
      icon: ShieldCheck,
      title: '安全可控',
      desc: '自定义安全策略、权限管理、审计日志，完全掌控Agent行为边界',
    },
    {
      icon: Building2,
      title: '内网运行',
      desc: '零外部依赖，支持完全离线部署，内网环境稳定运行',
    },
    {
      icon: DollarSign,
      title: '成本可控',
      desc: '支持DeepSeek等经济模型，成本仅为Claude的1/21，按需切换',
    },
  ];

  const pillars = [
    { label: '数据主权', icon: Lock },
    { label: '模型自由 10+供应商', icon: Zap },
    { label: '渠道覆盖 24+平台', icon: Wifi },
    { label: '成本控制', icon: TrendingDown },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="slide09-badge mb-4 opacity-0">
          <Badge variant="success">
            <Store className="w-3.5 h-3.5 mr-1.5 inline" strokeWidth={2} />
            <span>生态与部署</span>
          </Badge>
        </div>

        {/* Title */}
        <h2 className="slide09-title text-h1 md:text-display-xl font-extrabold text-[var(--text-primary)] text-center opacity-0">
          ClawHub技能市场 & 自托管部署
        </h2>
        <p className="slide09-subtitle text-body text-[var(--text-secondary)] text-center mt-2 opacity-0">
          为什么OpenClaw在企业级场景中胜出
        </p>

        {/* Two Column Layout */}
        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column — ClawHub Marketplace */}
          <div>
            {/* Section Header */}
            <div className="slide09-left-header flex items-center gap-3 mb-5 opacity-0">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center">
                <Store className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-h3 font-bold text-[var(--text-primary)]">
                  ClawHub技能市场
                </h3>
              </div>
            </div>

            {/* Big Number */}
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-data font-mono font-extrabold text-[var(--accent)] leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                13,729
              </span>
              <span className="text-h3 font-bold text-[var(--accent)]">Skills</span>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <span
                    key={cat.label}
                    className="slide09-cat-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-caption font-medium border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-secondary)] opacity-0"
                  >
                    <CatIcon className="w-3.5 h-3.5" strokeWidth={2} />
                    {cat.label}
                  </span>
                );
              })}
            </div>

            {/* Top 3 Recommended Skills */}
            <div className="space-y-3 mb-5">
              <p className="text-caption font-semibold text-[var(--text-light)] uppercase tracking-wider">
                TOP 3 热门技能
              </p>
              {topSkills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="slide09-top-skill flex items-center gap-3 p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] opacity-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-body-sm font-bold text-[var(--primary)]">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-body-sm font-semibold text-[var(--text-primary)]">
                      {skill.name}
                    </h4>
                    <p className="text-caption text-[var(--text-secondary)]">
                      {skill.desc}
                    </p>
                  </div>
                  <span className="text-caption font-mono text-[var(--success)] flex-shrink-0">
                    {skill.downloads}
                  </span>
                </div>
              ))}
            </div>

            {/* Warning Panel */}
            <div className="slide09-warning rounded-xl border-2 border-red-300/50 bg-red-50/10 p-4 opacity-0">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <div>
                  <h4 className="text-body-sm font-bold text-red-300 mb-1">
                    质量警示
                  </h4>
                  <p className="text-caption text-red-200/80 leading-relaxed">
                    超 <strong>50%</strong> 为低质量/重复技能，约{' '}
                    <strong>20%</strong> 被标记为潜在恶意。
                    <strong>ClawHavoc事件</strong>影响了{' '}
                    <strong>135,000+</strong> 台设备，提醒企业在使用第三方Skills时必须进行安全审计。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Self-Hosting Benefits */}
          <div>
            {/* Section Header */}
            <div className="slide09-right-header flex items-center gap-3 mb-5 opacity-0">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[var(--primary)]" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-h3 font-bold text-[var(--text-primary)]">
                  自托管部署
                </h3>
              </div>
            </div>

            {/* Benefit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="slide09-benefit opacity-0">
                  <FeatureCard
                    icon={b.icon}
                    title={b.title}
                    description={b.desc}
                  />
                </div>
              ))}
            </div>

            {/* Cost Comparison Highlight */}
            <div className="mt-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] p-4">
              <p className="text-caption font-semibold text-[var(--text-light)] uppercase tracking-wider mb-2">
                成本对比
              </p>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-body-sm font-bold text-[var(--text-secondary)]">
                      DeepSeek
                    </span>
                  </div>
                  <div className="mt-1 w-full h-3 rounded-full bg-[var(--success)]/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--success)]"
                      style={{ width: '4.8%' }}
                    />
                  </div>
                  <span className="text-caption text-[var(--success)] font-semibold mt-0.5 block">
                    约1/21成本
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-body-sm font-bold text-[var(--text-secondary)]">
                      Claude
                    </span>
                  </div>
                  <div className="mt-1 w-full h-3 rounded-full bg-[var(--accent)]/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--accent)]"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <span className="text-caption text-[var(--accent)] font-semibold mt-0.5 block">
                    基准价格
                  </span>
                </div>
              </div>
              <p className="text-caption text-[var(--text-light)] mt-2">
                OpenClaw支持随时切换底层模型，无需修改Agent逻辑
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Insight Bar — Four Pillars */}
        <div className="slide09-insight-bar mt-8 w-full rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-card opacity-0">
          <p className="text-caption font-semibold text-[var(--text-light)] uppercase tracking-wider mb-3">
            OpenClaw成功的四大支柱
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.label}
                  className="slide09-pillar flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] opacity-0"
                >
                  <PillarIcon
                    className="w-4.5 h-4.5 text-[var(--primary)] flex-shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-body-sm font-semibold text-[var(--text-primary)]">
                    {pillar.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expandable Section */}
        <div className="slide09-expandable mt-6 w-full opacity-0">
          <ExpandableSection
            toggleLabel="OpenClaw的设计哲学"
            hintText="点击展开"
          >
            <div className="text-body-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                OpenClaw秉承<strong className="text-[var(--text-primary)]">Unix哲学</strong>：
                做一件事，做到极致。整个系统只有 <strong className="text-[var(--accent)]">4个核心工具</strong>：
                Read、Write、Edit、Bash。听起来简单得不可思议，但这正是其强大之处。
              </p>
              <p>
                通过这4个原子操作的组合，Agent可以完成从文件管理、代码编写、系统运维到数据分析的几乎所有任务。
                复杂功能不是通过堆砌内置工具实现的，而是通过{' '}
                <strong className="text-[var(--text-primary)]">Skills机制</strong> 让社区自由扩展。
              </p>
              <p>
                这种「少即是多」的设计让OpenClaw的核心极其稳定可靠，同时通过Skills生态保持无限的可扩展性。
                每个Skill都是一个独立的沙箱，不会影响核心系统的安全性 — 这也是为什么即使ClawHub上存在恶意Skills，
                OpenClaw的核心架构依然安全。
              </p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide09_OpenClaw3);
