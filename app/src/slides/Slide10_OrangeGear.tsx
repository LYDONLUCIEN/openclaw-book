import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean }

// ── 浅色主题颜色 ──
const CL = {
  dir:    '#92400e',   // 目录文字
  dirNote:'#b45309',   // 目录注释
  skill:  '#c2410c',   // SKILL.md 关键字
  field:  '#1d4ed8',   // YAML 字段
  head:   '#ea580c',   // markdown 标题
  body:   '#374151',   // 正文
  dim:    '#6b7280',   // 注释/弱文字
  tool:   '#b45309',   // 工具调用
};

// ── Skills 目录结构 ──
const DIR_LINES = [
  { text: 'signal-coverage-query/', color: CL.dir },
  { text: '├── SKILL.md', color: CL.skill, note: '← 技能定义' },
  { text: '├── scripts/', color: CL.dir },
  { text: '│   └── check_coverage.sh', color: '#16a34a', note: '← 辅助脚本' },
  { text: '└── references/', color: CL.dir },
  { text: '    └── base_station_list.md', color: CL.field, note: '← 知识文档' },
];

// ── SKILL.md 完整示例（浅色语法高亮） ──
const SKILL_MD = [
  { text: '---', c: '#d97706' },
  { text: 'name: signal-coverage-query', c: CL.field },
  { text: 'description: "查询用户所在区域的基站信号覆盖', c: CL.field },
  { text: '  情况。当用户反馈信号差时触发。"', c: CL.field },
  { text: '---', c: '#d97706' },
  { text: '# 信号覆盖查询', c: CL.head },
  { text: '## 判断条件', c: '#7c3aed' },
  { text: '确认用户是否真的存在信号问题：', c: CL.dim },
  { text: '- 信号格数 ≤ 2 格', c: CL.body },
  { text: '- 通话频繁中断或无法拨出', c: CL.body },
  { text: '## 处理流程', c: '#7c3aed' },
  { text: '### Step 1: 确认位置', c: '#15803d' },
  { text: '询问具体地址（小区 + 楼栋 + 楼层）', c: CL.dim },
  { text: '### Step 2: 查询基站', c: '#15803d' },
  { text: '调用 query_signal_tower(address, radius=2000)', c: CL.tool },
  { text: '关注: distance / signal_strength / coverage_level', c: CL.dim },
  { text: '### Step 3: 排查原因', c: '#15803d' },
  { text: '1. 基站距离过远(>3km) → 覆盖不足', c: CL.body },
  { text: '2. 建筑物遮挡(高层/地下室) → 信号衰减', c: CL.body },
  { text: '3. SIM卡老化(>3年) → 接触不良', c: CL.body },
  { text: '### Step 4: 解决方案', c: '#15803d' },
  { text: '短期: 开通 VoWiFi / 切换 2.6GHz 频段', c: CL.body },
  { text: '长期: 提交网优工单 / 告知新基站计划', c: CL.body },
  { text: '## 脚本调用', c: '#7c3aed' },
  { text: '> 执行 scripts/check_coverage.sh', c: CL.dim },
  { text: '> 参数: {address, radius, sim_age, device_model}', c: CL.dim },
  { text: '## 输出格式', c: '#7c3aed' },
  { text: '1. 问题确认  2. 原因分析', c: CL.body },
  { text: '3. 解决方案  4. 后续跟进(工单号)', c: CL.body },
];

// ── Harness 马鞍组件 ──
const SADDLE_PARTS = [
  { emoji: '🪢', part: '缰绳', name: 'Tools', desc: '工具注册与路由——引导方向' },
  { emoji: '🦶', part: '马镫', name: 'Memory', desc: '持久记忆与上下文——稳定支撑' },
  { emoji: '🧱', part: '鞍垫', name: 'Triggers', desc: '定时调度与事件触发——减震缓冲' },
  { emoji: '📏', part: '肚带', name: 'Instruction', desc: 'Skill 指令体系——固定约束' },
  { emoji: '🎯', part: '辔头', name: 'Output', desc: '输出校验与格式控制——精准控制' },
  { emoji: '📡', part: '缰绳延伸', name: 'Channel', desc: '多端触达与消息路由——全域通信' },
];

const Slide10_OrangeGear: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.og-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo('.og-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 0.1);
      tl.fromTo('.og-left', { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.og-right', { opacity: 0, x: 25 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.og-saddle', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 0.6);
      tl.fromTo('.og-sp', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06 }, 0.8);
      tl.fromTo('.og-emphasis', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }, 1.3);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* 标题 */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="og-title text-h1 md:text-display font-bold text-[var(--text-primary)] opacity-0 flex items-center gap-2">
          <ChapterBadge chapter={1} />
          v4.0 橙装 — Skills + Harness
        </h2>
        <span className="og-badge text-caption px-2.5 py-1 rounded-full font-bold text-white opacity-0"
          style={{ backgroundColor: '#F97316' }}>橙装</span>
      </div>

      {/* 两栏布局 — items-start 让 grid 行高取内容最高者，两侧自然对齐 */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

        {/* ══ 左栏：Skills ══ */}
        <div className="og-left flex flex-col gap-2 opacity-0">
          {/* 目录结构 */}
          <div className="rounded-xl border p-3" style={{ borderColor: '#F9731630', backgroundColor: '#F9731606' }}>
            <p className="text-caption font-bold mb-1.5" style={{ color: '#F97316' }}>📂 Skill 目录结构</p>
            <pre className="text-[10px] font-mono leading-relaxed">
              {DIR_LINES.map((line, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span style={{ color: line.color }}>{line.text}</span>
                  {line.note && <span className="text-[9px] text-[var(--text-light)]">{line.note}</span>}
                </div>
              ))}
            </pre>
          </div>

          {/* SKILL.md 完整示例 */}
          <div className="rounded-xl border p-3 flex-1" style={{ borderColor: '#F9731640', backgroundColor: '#F9731606' }}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-caption font-bold" style={{ color: '#F97316' }}>📄 SKILL.md 完整示例</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F9731615', color: '#F97316' }}>信号覆盖查询</span>
            </div>
            <pre className="text-[10px] font-mono leading-[1.55] overflow-hidden">
              {SKILL_MD.map((line, i) => (
                <div key={i} style={{ color: line.c }}>{line.text}</div>
              ))}
            </pre>
          </div>

          {/* Token 统计 */}
          <div className="rounded-lg border-2 px-3 py-1.5 text-center" style={{ borderColor: '#F97316', backgroundColor: '#F9731615' }}>
            <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>
              200 Skills ≈ 4.8k tokens 初始占用 — 按需加载，不线性增长
            </p>
          </div>
        </div>

        {/* ══ 右栏：Harness 马鞍 ══ */}
        <div className="og-right flex flex-col gap-2 opacity-0">
          {/* 马鞍比喻 */}
          <div className="og-saddle rounded-xl border-2 p-4 text-center" style={{ borderColor: '#F97316', backgroundColor: '#F9731608', boxShadow: '0 0 20px #F9731612' }}>
            <div className="text-3xl mb-2">🏇</div>
            <p className="text-h3 font-bold mb-2" style={{ color: '#F97316' }}>
              Harness = 马鞍
            </p>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
              大模型是一匹<span className="font-bold text-[var(--text-primary)]">烈马</span>——力量巨大但难以驾驭。
            </p>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mt-1">
              <span className="font-bold" style={{ color: '#F97316' }}>Harness</span> 是介于骑手与马之间的
              <span className="font-bold text-[var(--text-primary)]">工程控制层</span>，
              把模型的原始能力转化为<span className="font-bold" style={{ color: '#F97316' }}>可控、可审计的业务流程</span>。
            </p>
          </div>

          {/* 马鞍六组件 */}
          <div className="grid grid-cols-2 gap-1.5">
            {SADDLE_PARTS.map((sp) => (
              <div key={sp.name} className="og-sp rounded-lg border p-2.5 opacity-0"
                style={{ borderColor: '#F9731630', backgroundColor: '#F9731605' }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">{sp.emoji}</span>
                  <span className="text-caption font-bold" style={{ color: '#F97316' }}>{sp.part}</span>
                  <span className="text-[9px] text-[var(--text-light)]">{sp.name}</span>
                </div>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{sp.desc}</p>
              </div>
            ))}
          </div>

          {/* 对比：裸骑 vs 戴马鞍 */}
          <div className="rounded-xl border p-3" style={{ borderColor: '#F9731630', backgroundColor: '#F9731606' }}>
            <div className="grid grid-cols-2 gap-2 text-caption">
              <div className="text-center py-1.5 rounded" style={{ backgroundColor: '#f1f5f9' }}>
                <p className="font-bold text-[var(--text-light)] mb-0.5">裸骑大模型</p>
                <p className="text-[10px] text-[var(--text-light)]">靠模型自己 → 不确定、不可控</p>
              </div>
              <div className="text-center py-1.5 rounded" style={{ backgroundColor: '#F9731610' }}>
                <p className="font-bold" style={{ color: '#F97316' }}>戴上马鞍</p>
                <p className="text-[10px] text-[var(--text-secondary)]">工程化控制 → 可靠、可审计</p>
              </div>
            </div>
          </div>

          {/* 自我进化能力 */}
          <div className="rounded-xl border-2 p-3 flex-1" style={{ borderColor: '#F9731640', backgroundColor: '#F9731606' }}>
            <p className="text-caption font-bold mb-2" style={{ color: '#F97316' }}>🔁 自我进化能力</p>
            <div className="space-y-1.5">
              {[
                { t: '自动记录经验', d: '每次对话后自动提取关键信息，形成可复用知识' },
                { t: '自动总结模式', d: '从大量对话中识别共性，抽象为通用策略' },
                { t: '自动优化 Skill', d: '根据使用反馈持续改进提示词和流程' },
                { t: '集体智慧沉淀', d: '所有人的经验汇聚，越用越聪明' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F97316' }} />
                  <div>
                    <span className="text-[10px] font-bold" style={{ color: '#F97316' }}>{item.t}</span>
                    <span className="text-[10px] text-[var(--text-secondary)] ml-1">{item.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 核心 */}
          <div className="rounded-lg px-3 py-2 text-center" style={{ backgroundColor: '#F9731610' }}>
            <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>
              Harness 不是让模型更聪明，而是用工程手段确保每一步都在可控范围内
            </p>
          </div>
        </div>
      </div>

      {/* 底部强调 */}
      <div className="og-emphasis rounded-xl border-2 px-6 py-3 mt-4 opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F9731610', boxShadow: '0 0 30px #F9731620' }}>
        <p className="text-body font-bold text-center" style={{ color: '#F97316' }}>
          确定性↑ 完备性↑ 便利性↑ — 三特性首次同时提升
        </p>
      </div>
    </section>
  );
};

export default memo(Slide10_OrangeGear);
