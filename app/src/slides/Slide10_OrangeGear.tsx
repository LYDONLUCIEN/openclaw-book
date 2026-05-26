import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const OC = '#F97316';

// ── 社区仓库 ──
const REPOS = [
  { name: 'anthropics/skills', desc: '官方仓库 · 17 个核心 Skill', source: 'Anthropic 官方' },
  { name: 'mattpocock/skills', desc: '工程师实战派 · grill-me / tdd / caveman', source: '社区热门' },
  { name: 'VoltAgent/awesome-agent-skills', desc: '67.3K Skills · 跨平台兼容', source: '社区精选' },
  { name: 'Jeffallan/claude-skills', desc: '66 Skills · 12 类别 · 9.3k stars', source: '社区精选' },
  { name: 'ComposioHQ/awesome-claude-skills', desc: '1000+ 生产级 Skills 合集', source: '社区精选' },
];

// ── 代表性 Skills 分类 ──
const SKILL_CATEGORIES = [
  {
    icon: '📄',
    title: '文档生成',
    color: '#3B82F6',
    skills: [
      { name: 'pptx', desc: 'PowerPoint 演示文稿创建' },
      { name: 'docx', desc: 'Word 文档生成与编辑' },
      { name: 'xlsx', desc: 'Excel 数据表格处理' },
      { name: 'pdf', desc: 'PDF 解析与表单填写' },
    ],
  },
  {
    icon: '🌐',
    title: 'Web 抓取',
    color: '#10B981',
    skills: [
      { name: 'firecrawl', desc: '网页抓取与结构化解析' },
      { name: 'web-artifacts', desc: 'Web 组件打包构建' },
      { name: 'mcp-builder', desc: 'MCP 服务器开发工具' },
    ],
  },
  {
    icon: '📐',
    title: '需求管理',
    color: '#8B5CF6',
    skills: [
      { name: 'grill-me', desc: '需求深度交叉质询' },
      { name: 'to-prd', desc: '对话转产品需求文档' },
      { name: 'to-issues', desc: '需求拆解为可执行任务' },
      { name: 'triage', desc: 'Issue 状态流转管理' },
    ],
  },
  {
    icon: '🎨',
    title: '创意设计',
    color: '#EC4899',
    skills: [
      { name: 'canvas-design', desc: 'Canvas 艺术创作' },
      { name: 'algorithmic-art', desc: '算法生成艺术' },
      { name: 'theme-factory', desc: '主题风格批量生成' },
      { name: 'frontend-design', desc: '前端界面设计实现' },
    ],
  },
  {
    icon: '🧪',
    title: '开发流程',
    color: '#F59E0B',
    skills: [
      { name: 'tdd', desc: '测试驱动开发循环' },
      { name: 'diagnose', desc: '系统化 Bug 诊断' },
      { name: 'caveman', desc: '极致压缩 Token 输出' },
      { name: 'webapp-testing', desc: 'Web 应用自动化测试' },
    ],
  },
  {
    icon: '🛠',
    title: 'Skill 创造',
    color: '#06B6D4',
    skills: [
      { name: 'skill-creator', desc: 'Skill 开发脚手架' },
      { name: 'doc-coauthoring', desc: '协作文档共编' },
      { name: 'claude-api', desc: 'Claude API 多语言集成' },
    ],
  },
];

// ── Skill 元数据示例（后台可编辑） ──
const SKILL_METADATA = `---
name: report-gen
description: 根据数据自动生成业务报告
version: 1.0.0
trigger:
  - "写一份.*报告"
  - "生成.*周报"
tools: [read_file, web_search]
---`;

// ── 业务场景示例（后台可编辑） ──
const BUSINESS_SCENARIOS = [
  { icon: '📋', title: 'reference', desc: '参考资料，相关业务知识，业务数据，业务流程的详细描述' },
  { icon: '🖥', title: 'scripts', desc: '工具脚本，具体功能的执行与实现代码，结果更精准' },
  { icon: '📊', title: 'examples', desc: '使用样例，举例说明不同情况与场景使用方法，使用更可控' },
];

const Slide10_OrangeGear: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.og-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo('.og-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 0.1);

      // Left column
      tl.fromTo('.og-stats', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 0.3);
      tl.fromTo('.og-screenshot', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
      tl.fromTo('.og-repo-row', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.06 }, 0.7);

      // Right column
      tl.fromTo('.og-cat', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.6);
      tl.fromTo('.og-meta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2);

      // Bottom
      tl.fromTo('.og-bottom', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-14 pb-16 px-4 md:px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* 标题 */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="og-title text-h1 md:text-display font-bold text-[var(--text-primary)] opacity-0 flex items-center gap-2">
          <ChapterBadge chapter={1} />
          Skills 生态全景
        </h2>
        <span className="og-badge text-caption px-2.5 py-1 rounded-full font-bold text-white opacity-0"
          style={{ backgroundColor: OC }}>橙装</span>
      </div>

      <div className="max-w-6xl w-full flex-1 grid grid-cols-1 md:grid-cols-5 gap-3 items-start">

        {/* ══ 左栏：生态规模 + 仓库 (2/5) ══ */}
        <div className="md:col-span-2 flex flex-col gap-2.5">

          {/* 大数字统计 */}
          <div className="og-stats rounded-xl border-2 p-3 text-center"
            style={{ borderColor: `${OC}50`, backgroundColor: `${OC}08` }}>
            <div className="flex items-center justify-center gap-5">
              <div>
                <p className="text-h2 font-bold" style={{ color: OC }}>67.3K</p>
                <p className="text-caption text-[var(--text-secondary)]">社区 Skills</p>
              </div>
              <div className="w-px h-8" style={{ backgroundColor: `${OC}30` }} />
              <div>
                <p className="text-h2 font-bold" style={{ color: OC }}>17</p>
                <p className="text-caption text-[var(--text-secondary)]">官方 Skills</p>
              </div>
              <div className="w-px h-8" style={{ backgroundColor: `${OC}30` }} />
              <div>
                <p className="text-h2 font-bold" style={{ color: OC }}>10+</p>
                <p className="text-caption text-[var(--text-secondary)]">精选仓库</p>
              </div>
            </div>
          </div>

          {/* ClawHub 技能市场截图 */}
          <div className="og-screenshot rounded-xl border-2 overflow-hidden flex-shrink-0"
            style={{ borderColor: `${OC}40`, backgroundColor: `${OC}04` }}>
            <div className="flex items-center gap-2 px-3 py-1.5 border-b" style={{ borderColor: `${OC}20` }}>
              <span className="text-caption font-bold" style={{ color: OC }}>ClawHub 技能市场</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${OC}15`, color: OC }}>67.3K skills</span>
            </div>
            <div className="p-2">
              <img
                src="/images/clawhub2.png"
                alt="ClawHub 技能市场"
                className="w-full rounded-lg border"
                style={{ borderColor: `${OC}20`, backgroundColor: '#f8f9fa', maxHeight: '32dvh', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* 仓库列表 */}
          <div className="rounded-xl border p-2.5" style={{ borderColor: `${OC}25`, backgroundColor: `${OC}05` }}>
            <p className="text-caption font-bold mb-1.5" style={{ color: OC }}>精选仓库</p>
            <div className="space-y-1">
              {REPOS.map((repo, i) => (
                <div key={i} className="og-repo-row flex items-start gap-2 px-2 py-1 rounded-lg opacity-0"
                  style={{ backgroundColor: `${OC}06` }}>
                  <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: OC }} />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-[var(--text-primary)] truncate">{repo.name}</p>
                    <p className="text-[9px] text-[var(--text-secondary)] truncate">{repo.desc}</p>
                  </div>
                  <span className="shrink-0 text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: `${OC}12`, color: OC }}>{repo.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 右栏：Skills 分类 + 元数据 (3/5) ══ */}
        <div className="md:col-span-3 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title} className="og-cat rounded-xl border p-2.5 flex flex-col opacity-0"
                style={{ borderColor: `${cat.color}30`, backgroundColor: `${cat.color}05` }}>
                {/* 类目标题 */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm">{cat.icon}</span>
                  <span className="text-body-sm font-bold" style={{ color: cat.color }}>{cat.title}</span>
                </div>

                {/* Skills 列表 */}
                <div className="space-y-0.5 flex-1">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-1.5">
                      <span className="shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: `${cat.color}60` }} />
                      <span className="text-caption font-bold text-[var(--text-primary)]">{skill.name}</span>
                      <span className="text-[9px] text-[var(--text-secondary)] truncate">{skill.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skill 元数据格式 + 业务示例 */}
          <div className="og-meta grid grid-cols-1 md:grid-cols-2 gap-2.5 opacity-0">
            {/* 元数据格式 */}
            <div className="rounded-xl border-2 overflow-hidden"
              style={{ borderColor: `${OC}30`, backgroundColor: '#0D1117' }}>
              <div className="flex items-center gap-2 px-3 py-1 border-b"
                style={{ borderColor: `${OC}20`, backgroundColor: `${OC}10` }}>
                <span className="text-sm">📄</span>
                <span className="text-body-sm font-bold" style={{ color: OC }}>Skill 元数据格式</span>
              </div>
              <pre className="px-3 py-1.5 text-[11px] leading-relaxed overflow-x-auto"
                style={{ color: '#C9D1D9', fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace' }}>{SKILL_METADATA}</pre>
            </div>

            {/* 业务场景 */}
            <div className="rounded-xl border-2 p-2.5"
              style={{ borderColor: `${OC}30`, backgroundColor: `${OC}05` }}>
              <p className="text-body-sm font-bold mb-1.5" style={{ color: OC }}>skills包含内容</p>
              <div className="space-y-1.5">
                {BUSINESS_SCENARIOS.map((s) => (
                  <div key={s.title} className="flex items-start gap-2">
                    <span className="text-sm shrink-0">{s.icon}</span>
                    <div>
                      <p className="text-body-sm font-bold text-[var(--text-primary)]">{s.title}</p>
                      <p className="text-caption text-[var(--text-secondary)]">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部总结 */}
      <div className="og-bottom mt-3 rounded-xl border-2 px-6 py-2.5 text-center opacity-0"
        style={{ borderColor: OC, backgroundColor: `${OC}10`, boxShadow: `0 0 30px ${OC}15` }}>
        <p className="text-body font-bold" style={{ color: OC }}>
          官方 17 + 社区 67.3K — Skills 正在成为 AI Agent 的应用商店
        </p>
      </div>
    </section>
  );
};

export default memo(Slide10_OrangeGear);
