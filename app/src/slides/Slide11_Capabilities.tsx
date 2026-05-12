import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Database,
  FileText,
  Globe,
  BarChart3,
  Workflow,
  AlertTriangle,
  Calculator,
  Cpu,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import Badge from '@/components/Badge';

interface SlideProps {
  isActive: boolean;
}

const strengths = [
  {
    icon: Database,
    title: '信息处理',
    description: 'RAG检索、文档总结、知识问答，快速从海量数据中提取关键信息',
    emoji: '📊',
  },
  {
    icon: FileText,
    title: '内容生成',
    description: '报告撰写、邮件起草、代码生成，基于上下文的高质量内容输出',
    emoji: '✍️',
  },
  {
    icon: Globe,
    title: '系统操作',
    description: '浏览器自动化、API调用、跨系统操作，打通信息孤岛',
    emoji: '🌐',
  },
  {
    icon: BarChart3,
    title: '数据分析',
    description: '数据提取、清洗、可视化，将原始数据转化为可操作洞察',
    emoji: '📈',
  },
  {
    icon: Workflow,
    title: '流程自动化',
    description: '定时任务、跨系统编排、审批流转，解放重复性劳动',
    emoji: '⚙️',
  },
];

const limitations = [
  {
    icon: Calculator,
    title: '精确数学计算',
    description: '大模型本质是概率模型，复杂运算需调用外部工具',
  },
  {
    icon: Cpu,
    title: '物理世界操作',
    description: '无法直接操控硬件设备，需要物联网中间层',
  },
  {
    icon: Lightbulb,
    title: '创造性判断',
    description: '艺术审美、战略决策等高阶认知仍需人类主导',
  },
  {
    icon: ShieldCheck,
    title: '授权决策',
    description: '涉及人事、财务等敏感领域必须由人类审批',
  },
];

const Slide11_Capabilities: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        // Title
        tl.fromTo(
          '.s11-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        tl.fromTo(
          '.s11-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

        // Strength section label
        tl.fromTo(
          '.s11-strength-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
          '-=0.2'
        );

        // Strength cards - staggered grid entrance
        tl.fromTo(
          '.s11-strength-card',
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.4)',
          },
          '-=0.1'
        );

        // Divider
        tl.fromTo(
          '.s11-divider',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        );

        // Limitation section label
        tl.fromTo(
          '.s11-limit-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
          '-=0.2'
        );

        // Limitation cards
        tl.fromTo(
          '.s11-limit-card',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.1'
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [isActive] }
  );

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="s11-title text-h1 font-bold text-[var(--primary)] opacity-0">
            Agent能力全景
          </h2>
          <p className="s11-subtitle text-body text-[var(--text-secondary)] mt-3 opacity-0">
            能做什么？不能做什么？
          </p>
        </div>

        {/* Strengths Section */}
        <div>
          <div className="s11-strength-label flex items-center gap-2 mb-4 opacity-0">
            <Badge variant="success">Agent擅长的5件事</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strengths.map((item, index) => (
              <div
                key={item.title}
                className={`s11-strength-card opacity-0 ${
                  index >= 3 ? 'md:col-span-1' : ''
                }`}
              >
                <FeatureCard
                  icon={item.icon}
                  title={`${item.emoji} ${item.title}`}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="s11-divider flex items-center gap-4 opacity-0">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]">
            <AlertTriangle className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-caption font-semibold text-[var(--text-secondary)]">
              理性认知
            </span>
          </div>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Limitations Section */}
        <div>
          <div className="s11-limit-label flex items-center gap-2 mb-4 opacity-0">
            <Badge variant="accent">Agent不擅长的4件事</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {limitations.map((item) => (
              <div key={item.title} className="s11-limit-card opacity-0">
                <div
                  className="flex flex-col p-5 rounded-xl h-full border border-dashed border-[var(--border)] bg-[var(--bg-secondary)]/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center mb-3">
                    <item.icon
                      className="w-5 h-5 text-[var(--text-light)]"
                      strokeWidth={2}
                    />
                  </div>
                  <h4 className="text-body-sm font-semibold text-[var(--text-secondary)] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-caption text-[var(--text-light)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide11_Capabilities);
