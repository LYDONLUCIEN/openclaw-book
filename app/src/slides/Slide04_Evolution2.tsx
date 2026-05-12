import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageSquare, Handshake, Bot } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import ExpandableSection from '@/components/ExpandableSection';
import Badge from '@/components/Badge';

interface SlideProps {
  isActive: boolean;
}

const Slide04_Evolution2: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.agent-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });

      // Formula: reveal segments one by one
      tl.fromTo('.formula-seg', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.3)' }, 0.35);

      // Example comparison
      tl.fromTo('.agent-example', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 1.0);

      // Three cards from below
      tl.fromTo('.agent-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 1.2);

      tl.fromTo('.agent-expand', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 agent-title opacity-0">
          <h2 className="text-display text-[var(--primary)] font-extrabold tracking-tight">
            什么是AI Agent？
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-2">
            一个公式理解Agent的本质
          </p>
        </div>

        {/* Formula Card */}
        <div className="mb-8 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-card">
          <p className="text-caption text-[var(--text-light)] mb-3 font-medium uppercase tracking-wider">核心公式</p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span className="formula-seg opacity-0 inline-flex items-center px-4 py-2 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] text-h3 font-bold">
              Agent
            </span>
            <span className="formula-seg opacity-0 text-h2 text-[var(--text-light)] font-bold">=</span>
            <span className="formula-seg opacity-0 inline-flex items-center px-3 py-2 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] text-body-sm font-semibold">
              大模型
            </span>
            <span className="formula-seg opacity-0 text-h3 text-[var(--text-light)]">+</span>
            <span className="formula-seg opacity-0 inline-flex items-center px-3 py-2 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] text-body-sm font-semibold">
              工具调用
            </span>
            <span className="formula-seg opacity-0 text-h3 text-[var(--text-light)]">+</span>
            <span className="formula-seg opacity-0 inline-flex items-center px-3 py-2 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] text-body-sm font-semibold">
              记忆
            </span>
            <span className="formula-seg opacity-0 text-h3 text-[var(--text-light)]">+</span>
            <span className="formula-seg opacity-0 inline-flex items-center px-3 py-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] text-body-sm font-semibold">
              自主迭代(ReAct)
            </span>
          </div>
        </div>

        {/* "订机票" Example */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="agent-example opacity-0 p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary">ChatGPT</Badge>
              <span className="text-caption text-[var(--text-light)]">只告诉你</span>
            </div>
            <p className="text-body-sm text-[var(--text-secondary)] italic">
              "建议你去携程搜索北京到上海的航班，选择上午的班次比较便宜..."
            </p>
          </div>
          <div className="agent-example opacity-0 p-5 rounded-2xl border-2 border-[var(--accent)]/40 bg-[var(--accent)]/5">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent">Agent</Badge>
              <span className="text-caption text-[var(--text-light)]">直接帮你做</span>
            </div>
            <p className="text-body-sm text-[var(--text-primary)] font-medium">
              "已为您找到最优航班 CA1234（08:30出发，¥580），并完成预订。电子票已发送至您的邮箱。"
            </p>
          </div>
        </div>

        {/* Three Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="agent-card opacity-0">
            <FeatureCard
              icon={MessageSquare}
              title="ChatGPT"
              description="你告诉它怎么做 → 它回答你"
              badge={<Badge variant="primary">问答</Badge>}
            />
          </div>
          <div className="agent-card opacity-0">
            <FeatureCard
              icon={Handshake}
              title="Copilot"
              description="你和它一起做 → 它辅助你"
              badge={<Badge variant="success">辅助</Badge>}
            />
          </div>
          <div className="agent-card opacity-0">
            <FeatureCard
              icon={Bot}
              title="Agent"
              description="你告诉它目标 → 它自主完成"
              badge={<Badge variant="accent">自主</Badge>}
            />
          </div>
        </div>

        {/* Expandable */}
        <div className="agent-expand opacity-0">
          <ExpandableSection toggleLabel="为什么2026年是Agent元年？" hintText="点击展开">
            <div className="text-body-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <p>
                三大技术突破汇聚：①<strong className="text-[var(--text-primary)]">推理能力飞跃</strong>
                — Claude Opus 4.6、GPT-5.2等模型具备复杂多步推理能力；
                ②<strong className="text-[var(--text-primary)]">工具调用标准化</strong>
                — MCP协议让Agent可以可靠地调用外部工具和数据源；
                ③<strong className="text-[var(--text-primary)]">长上下文窗口</strong>
                — 256K+ token支持处理复杂业务流程。
              </p>
              <p>
                正如Anthropic CEO Dario Amodei所言："2026年，AI Agent将从实验室走向生产环境，
                成为每个企业的标准配置。"OpenAI CEO Sam Altman也指出："我们正在进入AI自主执行任务的新纪元。"
              </p>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide04_Evolution2);
