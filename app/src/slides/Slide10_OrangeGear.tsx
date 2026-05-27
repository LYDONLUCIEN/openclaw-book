import React, { useRef, memo, useState, useCallback } from 'react';
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

// ── Modal: Skill 元数据完整文档 ──
const MetadataModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(content, { opacity: 0, scale: 0.92, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' });
    });
    return () => ctx.revert();
  }, []);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) { onClose(); return; }
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(content, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in' }, 0);
    tl.to(overlay, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.05);
  }, [onClose]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={handleClose}>
      <div ref={contentRef} className="w-[90vw] max-w-3xl max-h-[85vh] rounded-2xl border-2 overflow-hidden flex flex-col"
        style={{ borderColor: `${OC}50`, backgroundColor: '#0D1117' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b shrink-0" style={{ borderColor: `${OC}20`, backgroundColor: `${OC}10` }}>
          <div className="flex items-center gap-2">
            <span className="text-base">📄</span>
            <span className="text-body-sm font-bold" style={{ color: OC }}>Skill 完整文件结构</span>
          </div>
          <button onClick={handleClose} className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors" style={{ fontSize: 14 }}>✕</button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* 元信息色块 */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: `${OC}12`, borderColor: `${OC}30` }}>
            <p className="text-body-sm font-bold mb-2" style={{ color: OC }}>元信息 (Metadata)</p>
            <pre className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ color: '#C9D1D9', fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace' }}>{`---
name: report-gen
description: 根据数据自动生成业务报告
version: 1.0.0
trigger:
  - "写一份.*报告"
  - "生成.*周报"
  - "总结.*数据"
tools: [read_file, web_search]
tags: [报告, 自动化, 业务]
---`}</pre>
          </div>

          {/* 提示词工程色块 */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: '#1C2333', borderColor: '#30363D' }}>
            <p className="text-body-sm font-bold mb-3" style={{ color: '#58A6FF' }}>提示词工程 (Prompt Engineering)</p>

            {/* 文字描述 */}
            <div className="rounded-lg p-3 mb-2.5 border" style={{ backgroundColor: `${OC}08`, borderColor: `${OC}20` }}>
              <p className="text-[11px] font-bold mb-1" style={{ color: OC }}>文字描述</p>
              <p className="text-[11px] leading-relaxed" style={{ color: '#C9D1D9' }}>{`你是一个专业的业务报告生成助手。根据用户提供的数据和需求，自动生成结构清晰、数据准确、格式规范的业务报告。支持周报、月报、季报等多种报告类型。`}</p>
            </div>

            {/* 业务知识 */}
            <div className="rounded-lg p-3 mb-2.5 border" style={{ backgroundColor: '#0D442920', borderColor: '#23863640' }}>
              <p className="text-[11px] font-bold mb-1" style={{ color: '#3FB950' }}>业务知识</p>
              <pre className="text-[10px] leading-relaxed whitespace-pre-wrap" style={{ color: '#C9D1D9' }}>{`报告结构标准：
├── 摘要 (Executive Summary)  — 核心结论，控制在3行内
├── 关键指标 (KPI)           — 同比/环比变化，标注↑↓
├── 趋势分析 (Trend)          — 折线/柱状图数据描述
├── 异常说明 (Anomaly)        — 偏离阈值>15% 的项
└── 行动建议 (Action Items)    — 优先级排序，责任到人`}</pre>
            </div>

            {/* 业务流程 */}
            <div className="rounded-lg p-3 mb-2.5 border" style={{ backgroundColor: '#1F1B4B20', borderColor: '#6366F140' }}>
              <p className="text-[11px] font-bold mb-1" style={{ color: '#818CF8' }}>业务流程</p>
              <pre className="text-[10px] leading-relaxed whitespace-pre-wrap" style={{ color: '#C9D1D9' }}>{`1. 接收用户指令 → 解析报告类型与时间范围
2. 读取数据源 → 调用 read_file 获取原始数据
3. 数据清洗 → 去重、补缺、格式统一
4. 指标计算 → 同比/环比/累计/均值
5. 结构化输出 → 按模板填充各章节
6. 质量校验 → 数据一致性、逻辑完整性检查`}</pre>
            </div>

            {/* 脚本 */}
            <div className="rounded-lg p-3 mb-2.5 border" style={{ backgroundColor: '#42200620', borderColor: '#D9770640' }}>
              <p className="text-[11px] font-bold mb-1" style={{ color: '#FBBF24' }}>脚本</p>
              <pre className="text-[10px] leading-relaxed whitespace-pre-wrap" style={{ color: '#C9D1D9', fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace' }}>{`# 计算环比增长率
def calc_qoq(current, previous):
    if previous == 0: return None
    return round((current - previous) / previous * 100, 2)

# 生成趋势摘要
def trend_summary(metrics: dict) -> str:
    lines = []
    for k, v in metrics.items():
        change = calc_qoq(v['current'], v['previous'])
        arrow = "↑" if change > 0 else "↓"
        lines.append(f"{k}: {v['current']} ({arrow}{abs(change)}%)")
    return "\\n".join(lines)`}</pre>
            </div>

            {/* 使用案例 */}
            <div className="rounded-lg p-3 border" style={{ backgroundColor: '#4C1D9520', borderColor: '#A78BFA40' }}>
              <p className="text-[11px] font-bold mb-1" style={{ color: '#A78BFA' }}>使用案例</p>
              <div className="space-y-1.5 text-[10px]" style={{ color: '#C9D1D9' }}>
                <p><span className="font-bold" style={{ color: OC }}>案例 1：</span>用户说"帮我写一份本周销售周报" → 系统自动读取销售数据，生成包含KPI趋势、异常说明和行动建议的周报。</p>
                <p><span className="font-bold" style={{ color: OC }}>案例 2：</span>用户说"生成Q3季度运营报告" → 系统汇总三个月数据，输出含同比环比分析的季度报告。</p>
                <p><span className="font-bold" style={{ color: OC }}>案例 3：</span>用户说"总结昨天的客服数据" → 系统提取昨日工单、响应时间、满意度指标，生成日度简报。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Modal: Skills 文件目录结构 ──
const DirectoryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(content, { opacity: 0, scale: 0.92, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' });
    });
    return () => ctx.revert();
  }, []);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) { onClose(); return; }
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(content, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in' }, 0);
    tl.to(overlay, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.05);
  }, [onClose]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={handleClose}>
      <div ref={contentRef} className="w-[90vw] max-w-2xl max-h-[85vh] rounded-2xl border-2 overflow-hidden flex flex-col"
        style={{ borderColor: `${OC}50`, backgroundColor: '#0D1117' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b shrink-0" style={{ borderColor: `${OC}20`, backgroundColor: `${OC}10` }}>
          <div className="flex items-center gap-2">
            <span className="text-base">📂</span>
            <span className="text-body-sm font-bold" style={{ color: OC }}>report-gen / Skill 目录结构</span>
          </div>
          <button onClick={handleClose} className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors" style={{ fontSize: 14 }}>✕</button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {/* 文件树 */}
          <pre className="text-[11px] leading-relaxed p-3 rounded-xl border" style={{ color: '#C9D1D9', backgroundColor: '#161B22', borderColor: '#30363D', fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace' }}>{`report-gen/
├── SKILL.md                 # Skill 主入口文件（元信息+提示词）
├── reference/
│   ├── report-structure.md  # 报告结构标准与规范
│   ├── kpi-definitions.md   # KPI 指标定义与计算公式
│   ├── industry-templates/  # 行业报告模板集
│   │   ├── tech-weekly.md
│   │   ├── sales-monthly.md
│   │   └── finance-quarterly.md
│   └── glossary.md          # 业务术语对照表
├── scripts/
│   ├── calc-metrics.py      # 指标计算脚本
│   ├── data-cleaner.py      # 数据清洗工具
│   ├── chart-generator.py   # 图表生成辅助
│   └── validators.py        # 数据校验规则
└── examples/
    ├── weekly-report.json   # 周报输入输出示例
    ├── monthly-report.json  # 月报输入输出示例
    └── edge-cases.json      # 边界场景处理示例`}</pre>

          {/* 各目录说明 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="rounded-lg p-3 border" style={{ backgroundColor: '#0D442920', borderColor: '#23863640' }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-sm">📋</span>
                <p className="text-[11px] font-bold" style={{ color: '#3FB950' }}>reference/</p>
              </div>
              <p className="text-[10px] leading-relaxed" style={{ color: '#8B949E' }}>参考资料：报告结构标准、KPI定义、行业模板、术语表。为 Agent 提供领域知识支撑。</p>
            </div>
            <div className="rounded-lg p-3 border" style={{ backgroundColor: '#42200620', borderColor: '#D9770640' }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-sm">🖥</span>
                <p className="text-[11px] font-bold" style={{ color: '#FBBF24' }}>scripts/</p>
              </div>
              <p className="text-[10px] leading-relaxed" style={{ color: '#8B949E' }}>工具脚本：指标计算、数据清洗、图表生成、校验规则。提升 Agent 执行精度。</p>
            </div>
            <div className="rounded-lg p-3 border" style={{ backgroundColor: '#4C1D9520', borderColor: '#A78BFA40' }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-sm">📊</span>
                <p className="text-[11px] font-bold" style={{ color: '#A78BFA' }}>examples/</p>
              </div>
              <p className="text-[10px] leading-relaxed" style={{ color: '#8B949E' }}>使用样例：周报/月报的输入输出示例、边界场景。让 Agent 输出更可控。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slide10_OrangeGear: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<'metadata' | 'directory' | null>(null);

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
    <>
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-14 pb-16 px-4 md:px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* 标题 */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="og-title text-h1 md:text-display font-bold text-[var(--text-primary)] opacity-0 flex items-center gap-2">
          <ChapterBadge chapter={1} />
          Skills生态——所有人都能参与其中的开源社区
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
            <div className="rounded-xl border-2 overflow-hidden cursor-pointer hover:border-[var(--color)] transition-colors"
              style={{ borderColor: `${OC}30`, backgroundColor: '#0D1117', '--color': `${OC}70` } as React.CSSProperties}
              onClick={() => setModal('metadata')}>
              <div className="flex items-center justify-between px-3 py-1 border-b"
                style={{ borderColor: `${OC}20`, backgroundColor: `${OC}10` }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm">📄</span>
                  <span className="text-body-sm font-bold" style={{ color: OC }}>Skill 元数据格式</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${OC}25`, color: OC }}>点击展开</span>
              </div>
              <pre className="px-3 py-1.5 text-[11px] leading-relaxed overflow-x-auto"
                style={{ color: '#C9D1D9', fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace' }}>{SKILL_METADATA}</pre>
            </div>

            {/* 业务场景 */}
            <div className="rounded-xl border-2 p-2.5 cursor-pointer hover:border-[var(--color)] transition-colors"
              style={{ borderColor: `${OC}30`, backgroundColor: `${OC}05`, '--color': `${OC}70` } as React.CSSProperties}
              onClick={() => setModal('directory')}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-body-sm font-bold" style={{ color: OC }}>skills包含内容</p>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${OC}25`, color: OC }}>点击展开</span>
              </div>
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
          无需自己开发，复用他人经验 — Skills 正在成为 AI Agent 的应用商店
        </p>
      </div>
    </section>

      {/* Modals */}
      {modal === 'metadata' && <MetadataModal onClose={() => setModal(null)} />}
      {modal === 'directory' && <DirectoryModal onClose={() => setModal(null)} />}
    </>
  );
};

export default memo(Slide10_OrangeGear);
