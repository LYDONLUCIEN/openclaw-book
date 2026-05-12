import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Sparkles,
  Wrench,
  User,
  MessageCircle,
  Brain,
  Search,
  Clock,
} from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';
import Badge from '@/components/Badge';

interface SlideProps {
  isActive: boolean;
}

/**
 * Slide 08 — OpenClaw Memory System Part 2
 * 4-layer pyramid memory architecture with insight panel
 * GSAP builds pyramid from bottom (Session) up to top (SOUL)
 */
const Slide08_OpenClaw2: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        // 1. Badge
        tl.fromTo(
          '.slide08-badge',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0
        );

        // 2. Title
        tl.fromTo(
          '.slide08-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.1
        );

        // 3. Subtitle
        tl.fromTo(
          '.slide08-subtitle',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0.3
        );

        // 4. Pyramid layers — bottom up (Session → USER → TOOLS → SOUL)
        tl.fromTo(
          '.slide08-layer-session',
          { opacity: 0, x: -60, scaleY: 0.5, transformOrigin: 'center bottom' },
          { opacity: 1, x: 0, scaleY: 1, duration: 0.6, ease: 'back.out(1.3)' },
          0.6
        );

        tl.fromTo(
          '.slide08-layer-user',
          { opacity: 0, x: -60, scaleY: 0.5, transformOrigin: 'center bottom' },
          { opacity: 1, x: 0, scaleY: 1, duration: 0.6, ease: 'back.out(1.3)' },
          0.85
        );

        tl.fromTo(
          '.slide08-layer-tools',
          { opacity: 0, x: -60, scaleY: 0.5, transformOrigin: 'center bottom' },
          { opacity: 1, x: 0, scaleY: 1, duration: 0.6, ease: 'back.out(1.3)' },
          1.1
        );

        tl.fromTo(
          '.slide08-layer-soul',
          { opacity: 0, x: -60, scaleY: 0.5, transformOrigin: 'center bottom' },
          { opacity: 1, x: 0, scaleY: 1, duration: 0.6, ease: 'back.out(1.3)' },
          1.35
        );

        // 5. Insight panel
        tl.fromTo(
          '.slide08-insight',
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
          1.7
        );

        // 6. Insight items staggered
        tl.fromTo(
          '.slide08-insight-item',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
          2.0
        );

        // 7. Expandable section
        tl.fromTo(
          '.slide08-expandable',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          2.5
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [isActive] }
  );

  // Layer color configs
  const layerConfig = {
    soul: {
      gradient: 'linear-gradient(135deg, #FF6B35, #FF9A56)',
      icon: Sparkles,
      tagColor: '#FF6B35',
    },
    tools: {
      gradient: 'linear-gradient(135deg, #0066CC, #3399FF)',
      icon: Wrench,
      tagColor: '#0066CC',
    },
    user: {
      gradient: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
      icon: User,
      tagColor: '#00B4D8',
    },
    session: {
      gradient: 'linear-gradient(135deg, #2EC4B6, #5DD9CD)',
      icon: MessageCircle,
      tagColor: '#2EC4B6',
    },
  };

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="slide08-badge mb-4 opacity-0">
          <Badge variant="primary">
            <Brain className="w-3.5 h-3.5 mr-1.5 inline" strokeWidth={2} />
            <span>核心架构</span>
          </Badge>
        </div>

        {/* Title */}
        <h2 className="slide08-title text-h1 md:text-display-xl font-extrabold text-[var(--text-primary)] text-center opacity-0">
          四层记忆系统
        </h2>
        <p className="slide08-subtitle text-body text-[var(--text-secondary)] text-center mt-2 opacity-0">
          从身份到实时 — Agent如何「记住」一切
        </p>

        {/* Main Content: Pyramid + Insight */}
        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Pyramid Column — takes 3/5 */}
          <div className="md:col-span-3 flex flex-col items-center">
            {/* Layer 4 (top) — SOUL — smallest width */}
            <div className="slide08-layer-soul w-[75%] md:w-[60%] opacity-0">
              <div
                className="rounded-t-2xl p-5 text-white shadow-card"
                style={{ background: layerConfig.soul.gradient }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" strokeWidth={2} />
                  <span className="text-h3 font-bold">SOUL 灵魂层</span>
                </div>
                <p className="text-body-sm font-medium opacity-90 mb-2">
                  Agent的身份与性格 — 永久存储
                </p>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-caption font-mono backdrop-blur-sm">
                  "你是一个网络运维专家，善于分析复杂网络故障，沟通风格简洁专业..."
                </div>
              </div>
            </div>

            {/* Layer 3 — TOOLS */}
            <div className="slide08-layer-tools w-[85%] md:w-[72%] opacity-0">
              <div
                className="p-5 text-white shadow-card"
                style={{ background: layerConfig.tools.gradient }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5" strokeWidth={2} />
                  <span className="text-h3 font-bold">TOOLS 工具层</span>
                </div>
                <p className="text-body-sm font-medium opacity-90 mb-2">
                  Agent掌握的技能 — 动态更新
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Shell执行', '文件读写', 'HTTP请求', '数据库查询', '代码解释器', 'Web搜索'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-white/20 rounded-md px-2 py-0.5 text-caption font-medium backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                  <span className="bg-white/20 rounded-md px-2 py-0.5 text-caption font-medium backdrop-blur-sm">
                    +13,723 more
                  </span>
                </div>
              </div>
            </div>

            {/* Layer 2 — USER */}
            <div className="slide08-layer-user w-[92%] md:w-[82%] opacity-0">
              <div
                className="p-5 text-white shadow-card"
                style={{ background: layerConfig.user.gradient }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5" strokeWidth={2} />
                  <span className="text-h3 font-bold">USER 用户层</span>
                </div>
                <p className="text-body-sm font-medium opacity-90 mb-2">
                  用户偏好与上下文 — 持久化在MEMORY.md
                </p>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-caption font-mono backdrop-blur-sm">
                  "用户偏好简体中文，关注网络指标监控，习惯在飞书接收报告，时区UTC+8..."
                </div>
              </div>
            </div>

            {/* Layer 1 (bottom) — SESSION — largest width */}
            <div className="slide08-layer-session w-full opacity-0">
              <div
                className="rounded-b-2xl p-5 text-white shadow-card"
                style={{ background: layerConfig.session.gradient }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5" strokeWidth={2} />
                  <span className="text-h3 font-bold">Session 会话层</span>
                </div>
                <p className="text-body-sm font-medium opacity-90 mb-2">
                  当前对话上下文 — 实时，随对话增长
                </p>
                <div className="flex items-center gap-3 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="flex flex-col gap-1 text-caption font-mono">
                    <span className="opacity-80">[用户] 帮我检查服务器负载</span>
                    <span className="opacity-80">[Agent] 当前CPU使用率67%，内存82%...</span>
                    <span className="opacity-60">[用户] 有什么异常吗？</span>
                    <span className="opacity-40">[Agent] 正在分析...</span>
                  </div>
                  <span className="ml-auto text-caption font-bold whitespace-nowrap bg-white/25 rounded px-2 py-1">
                    实时增长 ↗
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Panel — takes 2/5 */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="slide08-insight rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-card opacity-0">
              <h3 className="text-h3 font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
                记忆压缩与检索
              </h3>

              <div className="space-y-4">
                {/* Insight 1 */}
                <div className="slide08-insight-item opacity-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Search className="w-4 h-4 text-[var(--primary)]" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-body-sm font-semibold text-[var(--text-primary)]">
                        语义搜索
                      </h4>
                      <p className="text-caption text-[var(--text-secondary)] mt-0.5">
                        Embedding + BM25混合检索，兼顾语义理解与关键词精确匹配
                      </p>
                    </div>
                  </div>
                </div>

                {/* Insight 2 */}
                <div className="slide08-insight-item opacity-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-body-sm font-semibold text-[var(--text-primary)]">
                        预压缩机制
                      </h4>
                      <p className="text-caption text-[var(--text-secondary)] mt-0.5">
                        长对话自动摘要，在上下文溢出前主动压缩历史信息
                      </p>
                    </div>
                  </div>
                </div>

                {/* Insight 3 — Performance Metric */}
                <div className="slide08-insight-item opacity-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--success)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-[var(--success)]" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-body-sm font-semibold text-[var(--text-primary)]">
                        检索性能
                      </h4>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-data font-mono font-extrabold text-[var(--success)]">
                          200
                        </span>
                        <span className="text-body-sm font-semibold text-[var(--success)]">
                          ms
                        </span>
                      </div>
                      <p className="text-caption text-[var(--text-secondary)] mt-0.5">
                        平均检索延迟，确保对话流畅体验
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer legend */}
            <div className="slide08-insight rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 opacity-0">
              <p className="text-caption font-semibold text-[var(--text-light)] mb-2 uppercase tracking-wider">
                层级特性
              </p>
              <div className="space-y-1.5 text-caption text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: layerConfig.soul.gradient }}
                  />
                  <span>SOUL — 永久 · 定义Agent身份</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: layerConfig.tools.gradient }}
                  />
                  <span>TOOLS — 动态 · 技能按需加载</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: layerConfig.user.gradient }}
                  />
                  <span>USER — 持久 · 跨会话记住偏好</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: layerConfig.session.gradient }}
                  />
                  <span>Session — 实时 · 随对话动态增长</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Section */}
        <div className="slide08-expandable mt-8 w-full max-w-4xl opacity-0">
          <ExpandableSection
            toggleLabel="为什么记忆对Agent至关重要？"
            hintText="点击展开"
          >
            <div className="text-body-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                没有记忆的Agent每次对话都是<strong className="text-[var(--accent)]">「失忆」</strong>状态
                — 它不知道你是谁、不知道你的偏好、不记得上一轮对话说了什么。
                每一次交互都要从零开始，这对于企业场景是不可接受的。
              </p>
              <p>
                OpenClaw的四层记忆系统解决了这个根本问题：
                <strong className="text-[var(--text-primary)]">SOUL层</strong>让Agent拥有稳定的「人格」，
                <strong className="text-[var(--text-primary)]">TOOLS层</strong>让它知道自己会什么，
                <strong className="text-[var(--text-primary)]">USER层</strong>让它记住每个用户的独特需求，
                <strong className="text-[var(--text-primary)]">Session层</strong>则保证当前对话的连贯性。
              </p>
              <p>
                更关键的是，OpenClaw的预压缩机制确保即使在超长对话中，Agent也不会因为上下文窗口溢出而「遗忘」。
                配合Embedding+BM25混合检索，在{' '}
                <strong className="text-[var(--success)]">200ms</strong> 内就能从海量记忆中精准找到相关信息。
              </p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide08_OpenClaw2);
