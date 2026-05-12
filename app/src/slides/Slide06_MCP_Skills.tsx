import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Bot,
  Plug,
  Database,
  Globe,
  FileText,
  Mail,
  Terminal,
  Code,
  BarChart3,
  ArrowDown,
  Lightbulb,
} from 'lucide-react';
import Badge from '@/components/Badge';
import FeatureCard from '@/components/FeatureCard';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps {
  isActive: boolean;
}

const TOOL_ICONS = [Database, Globe, FileText, Mail, Terminal];

const SKILLS = [
  {
    icon: FileText,
    title: '日报生成',
    description: '自动采集数据，生成结构化日报',
  },
  {
    icon: Code,
    title: '代码审查',
    description: '自动review代码，提出改进建议',
  },
  {
    icon: BarChart3,
    title: '数据分析',
    description: '提取、清洗、可视化数据',
  },
  {
    icon: Globe,
    title: '浏览器操作',
    description: '自动化网页操作和表单填写',
  },
];

const Slide06_MCP_Skills: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isActive || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        // Title
        tl.fromTo(
          '.mcp-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        // Subtitle
        tl.fromTo(
          '.mcp-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

        // Left panel — MCP
        tl.fromTo(
          '.mcp-panel',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        );

        // MCP layers stagger
        tl.fromTo(
          '.mcp-layer',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.3'
        );

        // Tool icons
        tl.fromTo(
          '.mcp-tool-icon',
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        );

        // Right panel — Skills
        tl.fromTo(
          '.skills-panel',
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        );

        // Skill cards stagger
        tl.fromTo(
          '.skill-card',
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.3'
        );

        // Data cards
        tl.fromTo(
          '.mcp-data',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.2'
        );

        // Insight bar
        tl.fromTo(
          '.insight-bar',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.1'
        );

        // Expandable
        tl.fromTo(
          '.skills-expandable',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
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
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="mcp-title text-h1 font-extrabold"
            style={{ color: 'var(--primary)', opacity: 0 }}
          >
            MCP协议 & Skills系统
          </h2>
          <p
            className="mcp-subtitle text-body mt-3 max-w-lg mx-auto"
            style={{ color: 'var(--text-secondary)', opacity: 0 }}
          >
            Agent的「通用插头」和「技能证书」
          </p>
        </div>

        {/* Two-column layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* LEFT — MCP Protocol */}
          <div
            className="mcp-panel flex flex-col p-6 rounded-2xl border"
            style={{
              opacity: 0,
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Plug
                className="w-5 h-5"
                style={{ color: 'var(--primary)' }}
                strokeWidth={2}
              />
              <h3
                className="text-h2 font-bold"
                style={{ color: 'var(--primary)' }}
              >
                MCP协议
              </h3>
              <Badge variant="primary">Model Context Protocol</Badge>
            </div>

            {/* 3-layer diagram */}
            <div className="flex flex-col items-center gap-3 mb-6">
              {/* Agent Layer */}
              <div
                className="mcp-layer w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2"
                style={{
                  opacity: 0,
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--bg-accent)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Bot className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <span
                    className="text-h3 font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    Agent
                  </span>
                  <p
                    className="text-caption"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    智能体大脑
                  </p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex flex-col items-center">
                <ArrowDown
                  className="w-5 h-5"
                  style={{ color: 'var(--secondary)' }}
                  strokeWidth={2}
                />
              </div>

              {/* MCP Layer */}
              <div
                className="mcp-layer w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2"
                style={{
                  opacity: 0,
                  borderColor: 'var(--secondary)',
                  backgroundColor: '#ECFEFF',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--secondary)' }}
                >
                  <Plug className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <span
                    className="text-h3 font-bold"
                    style={{ color: 'var(--secondary)' }}
                  >
                    MCP协议层
                  </span>
                  <p
                    className="text-caption"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    标准化通信接口
                  </p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex flex-col items-center">
                <ArrowDown
                  className="w-5 h-5"
                  style={{ color: 'var(--secondary)' }}
                  strokeWidth={2}
                />
              </div>

              {/* Tools Layer */}
              <div
                className="mcp-layer w-full flex flex-col items-center gap-3 px-5 py-4 rounded-xl border-2"
                style={{
                  opacity: 0,
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <span
                  className="text-caption font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  工具层 (Tools)
                </span>
                <div className="flex items-center gap-3">
                  {TOOL_ICONS.map((Icon, i) => (
                    <div
                      key={i}
                      className="mcp-tool-icon w-10 h-10 rounded-lg flex items-center justify-center border"
                      style={{
                        opacity: 0,
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: 'var(--text-secondary)' }}
                        strokeWidth={1.8}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key data row */}
            <div className="grid grid-cols-3 gap-3">
              <div
                className="mcp-data text-center px-3 py-3 rounded-xl"
                style={{
                  opacity: 0,
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <span
                  className="text-data-sm font-mono font-extrabold"
                  style={{ color: 'var(--primary)' }}
                >
                  1
                </span>
                <span
                  className="text-caption block mt-0.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  统一协议
                </span>
              </div>
              <div
                className="mcp-data text-center px-3 py-3 rounded-xl"
                style={{
                  opacity: 0,
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <span
                  className="text-data-sm font-mono font-extrabold"
                  style={{ color: 'var(--accent)' }}
                >
                  2000+
                </span>
                <span
                  className="text-caption block mt-0.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  MCP服务器
                </span>
              </div>
              <div
                className="mcp-data text-center px-3 py-3 rounded-xl"
                style={{
                  opacity: 0,
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <span
                  className="text-data-sm font-mono font-extrabold"
                  style={{ color: 'var(--success)' }}
                >
                  M×N→M+N
                </span>
                <span
                  className="text-caption block mt-0.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  集成简化
                </span>
              </div>
            </div>

            {/* Analogy badge */}
            <div className="mt-4 flex justify-center">
              <Badge variant="accent">MCP = AI的USB-C</Badge>
            </div>
          </div>

          {/* RIGHT — Skills System */}
          <div
            className="skills-panel flex flex-col"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-5 px-1">
              <Code
                className="w-5 h-5"
                style={{ color: 'var(--accent)' }}
                strokeWidth={2}
              />
              <h3
                className="text-h2 font-bold"
                style={{ color: 'var(--accent)' }}
              >
                Skills系统
              </h3>
              <Badge variant="success">可复用能力</Badge>
            </div>

            <div className="flex flex-col gap-3">
              {SKILLS.map((skill) => (
                <div
                  key={skill.title}
                  className="skill-card"
                  style={{ opacity: 0 }}
                >
                  <FeatureCard
                    icon={skill.icon}
                    title={skill.title}
                    description={skill.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insight Bar */}
        <div
          className="insight-bar w-full max-w-4xl flex items-center gap-3 px-6 py-4 rounded-xl border mb-6"
          style={{
            opacity: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <Lightbulb
            className="w-5 h-5 flex-shrink-0"
            style={{ color: 'var(--accent)' }}
            strokeWidth={2}
          />
          <p className="text-body-sm" style={{ color: 'var(--text-primary)' }}>
            <span className="font-semibold">Skills vs Tools：</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              工具是厨具，技能是食谱。工具提供原子能力，Skills将工具组合成完整的工作流。
            </span>
          </p>
        </div>

        {/* Expandable Section */}
        <div className="skills-expandable w-full max-w-4xl" style={{ opacity: 0 }}>
          <ExpandableSection
            toggleLabel="SKILL.md标准"
            hintText="点击展开"
          >
            <div className="text-body-sm" style={{ color: 'var(--text-secondary)' }}>
              <p className="mb-2">
                SKILL.md是一种标准化的技能描述格式，已被30+平台采用。每个技能通过一个SKILL.md文件完整定义。
              </p>
              <p className="mb-2">
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>三部分结构：</span>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <span className="font-semibold">元数据</span> — 名称、版本、描述、触发条件
                </li>
                <li>
                  <span className="font-semibold">工作流步骤</span> — 详细的执行流程和工具调用链
                </li>
                <li>
                  <span className="font-semibold">约束条件</span> — 安全限制、权限要求、超时设置
                </li>
              </ul>
            </div>
          </ExpandableSection>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide06_MCP_Skills);
