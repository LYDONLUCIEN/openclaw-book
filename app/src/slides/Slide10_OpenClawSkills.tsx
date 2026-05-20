import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Package, Brain, FolderTree, FileText, BookOpen } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const SKILL_MD_CONTENT = `---
name: signal-coverage-query
description: "查询用户所在区域的基站信号覆盖情况。当用户反馈信号差、打不了电话、上网慢等信号相关问题时触发。"
---

# 信号覆盖查询

你是电信客户服务专家。当用户反馈信号问题时，按以下流程处理。

## 判断条件

先确认用户是否真的存在信号问题：
- 信号格数 ≤ 2 格
- 通话频繁中断或无法拨出
- 上网速度明显低于预期

## 处理流程

### Step 1: 确认位置
询问用户的具体地址（小区名称 + 楼栋 + 楼层）。

### Step 2: 查询基站信息
使用 query_signal_tower 工具，传入用户地址和 2000 米半径。
关注返回的字段：
- distance: 距离最近基站的公里数
- signal_strength: 信号强度（dBm）
- coverage_level: 覆盖等级

### Step 3: 排查原因
按概率从高到低排查：
1. **基站距离过远**（> 3km）→ 覆盖不足
2. **建筑物遮挡**（高层/地下室）→ 信号衰减
3. **SIM卡老化**（使用>3年）→ 接触不良
4. **终端不支持** → 频段不匹配

### Step 4: 给出解决方案

**短期方案（当天生效）：**
- 开通 VoWiFi（WiFi通话），需确认终端支持
- 切换到 2.6GHz 频段（穿透性更好）

**长期方案（1-7天）：**
- 提交网优工单，由网优部门现场测试
- 如附近有新建基站计划，告知预计开通时间

## 输出格式

回复用户时包含以下要素：
1. 问题确认（复述用户的问题）
2. 原因分析（最可能的原因 + 依据）
3. 解决方案（短期 + 长期）
4. 后续跟进（工单号 + 预计处理时间）`;

const SKILL_DIR = `signal-coverage-query/
├── SKILL.md              ← 技能定义（元数据 + 正文）
├── scripts/
│   └── check_coverage.sh ← 确定性辅助脚本（可选）
└── references/
    └── base_station_list.md ← 知识文档（按需加载）`;

const HARNESS_POINTS = [
  { title: '自动记录经验', desc: '每次对话后自动提取关键信息，形成可复用的知识', icon: '📝' },
  { title: '自动总结模式', desc: '从大量对话中识别共性，抽象为通用策略', icon: '🔍' },
  { title: '自动优化 Skill', desc: '根据使用反馈持续改进提示词和流程', icon: '⚡' },
  { title: '集体智慧沉淀', desc: '所有人的经验汇聚，越用越聪明', icon: '🧠' },
];

const Slide10_OpenClawSkills: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'skills' | 'harness'>('skills');
  const [showFullSkill, setShowFullSkill] = useState(false);
  const [scriptsExpanded, setScriptsExpanded] = useState(false);
  const [harnessExpanded, setHarnessExpanded] = useState(false);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v4-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v4-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v4-tabs', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v4-content', { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, tab] });

  useGSAP(() => {
    if (!isActive || !showFullSkill || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v4-fullskill', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, showFullSkill] });

  useGSAP(() => {
    if (!isActive || !scriptsExpanded || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v4-scripts-detail', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, scriptsExpanded] });

  useGSAP(() => {
    if (!isActive || !harnessExpanded || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.harness-point', { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, harnessExpanded] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v4-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v4.0 龙虾！</h2>
        <span className="v4-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#F97316' }}>橙装</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--success)10', color: 'var(--success)' }}>确定性 ↑</span>
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)10', color: 'var(--accent)' }}>完备性 ↑</span>
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--primary)10', color: 'var(--primary)' }}>便利性 ↑</span>
      </div>

      {/* Tabs */}
      <div className="v4-tabs flex gap-2 mb-4 opacity-0">
        <button
          className="px-4 py-2 rounded-lg text-body-sm font-bold transition-all"
          style={tab === 'skills' ? { backgroundColor: '#F97316', color: 'white' } : { backgroundColor: '#F9731610', color: '#F97316' }}
          onClick={(e) => { e.stopPropagation(); setTab('skills'); }}>
          <Package size={14} className="inline mr-1" />Skills 详细结构
        </button>
        <button
          className="px-4 py-2 rounded-lg text-body-sm font-bold transition-all"
          style={tab === 'harness' ? { backgroundColor: '#F97316', color: 'white' } : { backgroundColor: '#F9731610', color: '#F97316' }}
          onClick={(e) => { e.stopPropagation(); setTab('harness'); }}>
          <Brain size={14} className="inline mr-1" />Harness 驾驭术
        </button>
      </div>

      {/* Content */}
      <div className="v4-content max-w-3xl w-full">
        {tab === 'skills' && (
          <div>
            {/* Directory structure */}
            <div className="rounded-xl border-2 p-4 mb-3" style={{ borderColor: '#F9731640', backgroundColor: '#0d1117' }}>
              <div className="flex items-center gap-2 mb-2">
                <FolderTree size={14} style={{ color: '#F97316' }} />
                <span className="text-caption font-bold" style={{ color: '#F97316' }}>Skill 目录结构</span>
              </div>
              <pre className="text-caption font-mono leading-relaxed" style={{ color: '#c9d1d9' }}>{SKILL_DIR}</pre>
              <p className="text-caption mt-2" style={{ color: '#8b949e' }}>
                SKILL.md = YAML frontmatter（元数据）+ Markdown 正文（指令）。这是唯一必需的文件。
              </p>
            </div>

            {/* SKILL.md content */}
            <div className="rounded-xl border-2 p-4 mb-3" style={{ borderColor: '#F9731640', backgroundColor: '#0d1117' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText size={14} style={{ color: '#F97316' }} />
                  <span className="text-caption font-bold" style={{ color: '#F97316' }}>SKILL.md（完整示例）</span>
                </div>
                <button className="text-caption font-bold px-2 py-0.5 rounded transition-all"
                  style={{ backgroundColor: '#F9731615', color: '#F97316' }}
                  onClick={(e) => { e.stopPropagation(); setShowFullSkill(!showFullSkill); }}>
                  {showFullSkill ? '收起' : '展开全文'}
                </button>
              </div>

              <pre className="text-caption font-mono leading-relaxed overflow-x-auto max-h-[50dvh] overflow-y-auto" style={{ color: '#c9d1d9' }}>
                {SKILL_MD_CONTENT.split('\n').map((line, i) => {
                  let color = '#c9d1d9';
                  if (line.startsWith('---')) color = '#F59E0B';
                  else if (line.startsWith('name:') || line.startsWith('description:')) color = '#79c0ff';
                  else if (line.startsWith('# ')) color = '#F97316';
                  else if (line.startsWith('## ')) color = '#d2a8ff';
                  else if (line.startsWith('### ')) color = '#7ee787';
                  else if (line.startsWith('**') && line.endsWith('**')) color = '#ffa657';
                  else if (line.startsWith('- ')) color = '#a5d6ff';
                  else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) color = '#a5d6ff';
                  else if (line.startsWith('>') || line.startsWith('  ')) color = '#8b949e';
                  return <div key={i} style={{ color }}>{line}</div>;
                })}
              </pre>
            </div>

            {/* Format explanation */}
            <div className="rounded-xl border p-3 mb-3" style={{ borderColor: '#F9731630', backgroundColor: '#F9731608' }}>
              <p className="text-caption font-bold mb-1" style={{ color: '#F97316' }}>SKILL.md 格式要点：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-caption">
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold shrink-0" style={{ color: '#79c0ff' }}>name</span>
                  <span className="text-[var(--text-secondary)]">技能标识符（小写+连字符）</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold shrink-0" style={{ color: '#79c0ff' }}>description</span>
                  <span className="text-[var(--text-secondary)]">做什么 + 何时触发（Agent 靠这个决定是否使用）</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold shrink-0" style={{ color: '#7ee787' }}>正文</span>
                  <span className="text-[var(--text-secondary)]">完整的 Markdown 指令（流程、规则、输出格式）</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold shrink-0" style={{ color: '#d2a8ff' }}>scripts/</span>
                  <span className="text-[var(--text-secondary)]">可选：确定性辅助脚本</span>
                </div>
              </div>
            </div>

            {/* scripts & references usage examples */}
            <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: '#F9731640', backgroundColor: '#0d1117' }}>
              <div
                className="cursor-pointer flex items-center justify-between p-3"
                onClick={(e) => { e.stopPropagation(); setScriptsExpanded(!scriptsExpanded); }}>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} style={{ color: '#F97316' }} />
                  <span className="text-caption font-bold" style={{ color: '#F97316' }}>scripts 与 references 的使用方式</span>
                </div>
                <span className="text-caption font-bold px-2 py-0.5 rounded transition-all" style={{ backgroundColor: '#F9731615', color: '#F97316' }}>
                  {scriptsExpanded ? '收起' : '展开'}
                </span>
              </div>

              {scriptsExpanded && (
                <div className="v4-scripts-detail px-4 pb-4">
                  <div className="mb-3">
                    <p className="text-caption font-bold mb-1" style={{ color: '#d2a8ff' }}>## scripts/ — 确定性辅助脚本</p>
                    <p className="text-caption mb-1" style={{ color: '#8b949e' }}>
                      当 SKILL.md 中需要执行确定性操作时（如查询覆盖数据、调用内部API），可以通过 scripts/ 目录存放脚本文件，在 SKILL.md 正文中通过工具调用引用。
                    </p>
                    <div className="rounded-lg p-2 mt-1" style={{ backgroundColor: '#161b22' }}>
                      <p className="text-caption font-bold mb-0.5" style={{ color: '#7ee787' }}>示例：在 SKILL.md 中引用脚本</p>
                      <p className="text-caption font-mono" style={{ color: '#c9d1d9' }}>### Step 2: 查询基站信息</p>
                      <p className="text-caption font-mono" style={{ color: '#ffa657' }}>
                        使用 <span style={{ color: '#79c0ff' }}>{`execute_script("scripts/check_coverage.sh", {address: user_address, radius: 2000})`}</span> 执行辅助脚本
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-caption font-bold mb-1" style={{ color: '#d2a8ff' }}>## references/ — 知识文档</p>
                    <p className="text-caption mb-1" style={{ color: '#8b949e' }}>
                      当 Skill 需要大量领域知识时（如基站列表、频段参数），放在 references/ 目录中，Agent 按需读取，避免塞满系统提示。
                    </p>
                    <div className="rounded-lg p-2 mt-1" style={{ backgroundColor: '#161b22' }}>
                      <p className="text-caption font-bold mb-0.5" style={{ color: '#7ee787' }}>示例：在 SKILL.md 中引用文档</p>
                      <p className="text-caption font-mono" style={{ color: '#ffa657' }}>
                        {'>'} 需要查询频段参数时，请使用 <span style={{ color: '#79c0ff' }}>read</span> 工具读取 <span style={{ color: '#79c0ff' }}>references/base_station_list.md</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'harness' && (
          <div>
            {/* Part A: Horse metaphor */}
            <div className="rounded-xl border-2 p-5 mb-4 text-center" style={{ borderColor: '#F97316', backgroundColor: '#F9731608', boxShadow: '0 0 20px #F9731615' }}>
              <div className="text-4xl mb-3">🏇</div>
              <p className="text-h3 font-bold mb-2" style={{ color: '#F97316' }}>
                为什么叫 Harness（驾驭术）？
              </p>
              <p className="text-body text-[var(--text-secondary)] max-w-lg mx-auto">
                大模型就像一匹<span className="font-bold text-[var(--text-primary)]">烈马</span>——力量巨大但难以驾驭。
              </p>
              <p className="text-body text-[var(--text-secondary)] mt-2 max-w-lg mx-auto">
                <span className="font-bold" style={{ color: '#F97316' }}>Harness</span> 是介于模型和应用之间的
                <span className="font-bold text-[var(--text-primary)]">工程控制层</span>，
                把模型能力转化为<span className="font-bold" style={{ color: '#F97316' }}>可控、可审计的业务流程</span>。
              </p>
            </div>

            {/* Part B: Comparison table */}
            <div className="rounded-xl border-2 p-4 mb-3" style={{ borderColor: '#F9731640', backgroundColor: '#0d1117' }}>
              <div className="grid grid-cols-2 gap-0 text-caption">
                {/* Header row */}
                <div className="text-center font-bold py-2 border-b-2 border-r" style={{ color: '#8b949e', borderColor: '#F9731630' }}>
                  传统 Prompt Engineering
                </div>
                <div className="text-center font-bold py-2 border-b-2" style={{ color: '#F97316', borderColor: '#F9731630' }}>
                  Harness Engineering
                </div>
                {/* Data rows */}
                <div className="py-1.5 px-2 border-r" style={{ color: '#8b949e', borderColor: '#F9731620' }}>
                  写更好的提示词
                </div>
                <div className="py-1.5 px-2" style={{ color: '#c9d1d9' }}>
                  <span className="font-mono font-bold" style={{ color: '#F97316' }}>Tools</span>：工具注册与路由
                </div>
                <div className="py-1.5 px-2 border-r" style={{ color: '#8b949e', borderColor: '#F9731620' }}>
                  让模型"更听话"
                </div>
                <div className="py-1.5 px-2" style={{ color: '#c9d1d9' }}>
                  <span className="font-mono font-bold" style={{ color: '#F97316' }}>Memory</span>：持久记忆与上下文组装
                </div>
                <div className="py-1.5 px-2 border-r" style={{ color: '#8b949e', borderColor: '#F9731620' }}>
                  靠模型自己的能力
                </div>
                <div className="py-1.5 px-2" style={{ color: '#c9d1d9' }}>
                  <span className="font-mono font-bold" style={{ color: '#F97316' }}>Triggers</span>：定时调度与事件触发
                </div>
                <div className="py-1.5 px-2 border-r" style={{ color: '#8b949e', borderColor: '#F9731620' }}>
                  一次对话一个任务
                </div>
                <div className="py-1.5 px-2" style={{ color: '#c9d1d9' }}>
                  <span className="font-mono font-bold" style={{ color: '#F97316' }}>Instruction</span>：Skill 指令体系
                </div>
                <div className="py-1.5 px-2 border-r" style={{ color: '#8b949e', borderColor: '#F9731620' }}>
                  手动管理上下文
                </div>
                <div className="py-1.5 px-2" style={{ color: '#c9d1d9' }}>
                  <span className="font-mono font-bold" style={{ color: '#F97316' }}>Output</span>：输出校验与格式控制
                </div>
                <div className="py-1.5 px-2 border-r" style={{ borderColor: '#F9731620' }}></div>
                <div className="py-1.5 px-2" style={{ color: '#c9d1d9' }}>
                  <span className="font-mono font-bold" style={{ color: '#F97316' }}>Channel</span>：多端触达与消息路由
                </div>
              </div>
            </div>

            {/* Part B summary line */}
            <div className="text-center mb-3 px-4 py-2 rounded-lg" style={{ backgroundColor: '#F9731610' }}>
              <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>
                Harness 不是让模型更聪明，而是用工程手段确保模型的每一步都在可控范围内。
              </p>
            </div>

            {/* Part C: Expandable self-evolution section */}
            <div className="cursor-pointer rounded-xl border-2 p-4 text-center mb-3"
              style={{ borderColor: '#F9731640', backgroundColor: '#F9731605' }}
              onClick={(e) => { e.stopPropagation(); setHarnessExpanded(!harnessExpanded); }}>
              <span className="text-body-sm font-bold" style={{ color: '#F97316' }}>
                {harnessExpanded ? '收起详情' : 'Harness 的自我进化能力（点击展开）'}
              </span>
            </div>

            {harnessExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {HARNESS_POINTS.map((p, i) => (
                  <div key={i} className="harness-point rounded-lg border-2 p-3"
                    style={{ borderColor: '#F9731640', backgroundColor: '#F9731608' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-caption font-bold" style={{ color: '#F97316' }}>{p.title}</span>
                    </div>
                    <p className="text-caption text-[var(--text-secondary)] pl-7">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Slide10_OpenClawSkills);
