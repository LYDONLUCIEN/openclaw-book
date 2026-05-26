import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Network, Backpack, Zap, Package, BookOpen, Heart, Server,
  MessageCircle, CalendarCheck, ChevronRight, Layers, Cpu, Wrench,
} from 'lucide-react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean }

// ── 分类色 ──
const CAT = {
  harness: { color: '#3B82F6', label: 'Harness 工程层', icon: Wrench },
  agent:   { color: '#8B5CF6', label: 'Agent原生', icon: Cpu },
  skills:  { color: '#F97316', label: 'Skills 能力层', icon: Package },
};

// ── 10 个模块 ──
interface Mod {
  id: string;
  name: string;
  sub: string;
  icon: typeof Network;
  cat: 'harness' | 'agent' | 'skills';
  analogy: string;
  bullets: string[];
  insight: string;
}

const MODS: Mod[] = [
  {
    id: 'channel', name: 'Channel', sub: '多端通道', icon: MessageCircle, cat: 'harness',
    analogy: '全渠道接入 — 消除 CLI 壁垒，随时随地使用',
    bullets: [
      '飞书 / 企微 / 钉钉 — 企业即时通讯',
      'WhatsApp / Telegram / Slack / Discord',
      'WebChat / iMessage / Signal',
      '语音转文字：语音消息自动处理',
      '多账号路由：不同账号绑定不同 Agent',
    ],
    insight: '不需要打开终端——任何设备、任何渠道都能用',
  },
  {
    id: 'gateway', name: 'Gateway', sub: '请求路由 · 访问控制', icon: Network, cat: 'harness',
    analogy: '中枢神经 — 所有消息的统一入口与调度中心',
    bullets: [
      '路由分发：消息从哪来，交给哪个 Agent',
      '会话管理：多轮对话上下文保持',
      '命令队列：序列化执行，防止工具并发冲突',
      'WebSocket 控制面：所有组件实时通信',
    ],
    insight: '单一进程掌控全局——路由、排队、会话、心跳都从这里发出',
  },
  {
    id: 'context', name: 'Context Assembly', sub: '历史 · 提示词 · 记忆', icon: Backpack, cat: 'harness',
    analogy: '出发前的行囊 — 决定模型能看到什么',
    bullets: [
      '系统提示：角色设定 + 安全规则',
      '技能列表：仅注入摘要（~24 tokens/个），按需加载',
      '记忆文件：用户偏好 + 长期记忆 + 每日日志',
      '工具定义：MCP 注册的工具 JSON Schema',
      '压缩机制：上下文超限时自动摘要老消息',
    ],
    insight: '200 个 Skill 仅占 ~4.8k tokens——用摘要换空间',
  },
  {
    id: 'react', name: 'ReAct Loop', sub: '推理 · 决策 · 规划', icon: Zap, cat: 'agent',
    analogy: '动力引擎 — 持续 思考→行动→观察→再思考',
    bullets: [
      '思考（Thought）：理解当前状态，规划下一步',
      '行动（Action）：调用工具执行操作',
      '观察（Observation）：获取执行结果',
      '循环：直到任务完成或无法继续',
      '流式输出：边思考边响应',
    ],
    insight: '1.6% 是 AI 决策逻辑，98.4% 是工程基础设施',
  },
  {
    id: 'llm', name: 'LLM', sub: '大模型 · 语言理解', icon: Cpu, cat: 'agent',
    analogy: '认知核心 — 理解指令、生成回复、推理规划',
    bullets: [
      '多模态理解：文本、图片、代码',
      '指令遵循：理解复杂任务指令',
      '推理能力：逻辑分析与规划',
      '上下文感知：理解会话历史',
      '模型选择：按任务选用不同规模模型',
    ],
    insight: 'Agent 的智能底座——没有大模型，一切工程都是空壳',
  },
  {
    id: 'skills', name: 'Skills', sub: '技能库 · 定义集', icon: Package, cat: 'skills',
    analogy: '技能商城 — 从通才变成专家',
    bullets: [
      'SKILL.md 格式：YAML 元数据 + Markdown 指令',
      '渐进式加载：只注入摘要，调用时读取全文',
      '优先级：工作区 > 项目 > 个人 > 全局',
      'ClawHub：公开技能注册中心，一键安装',
    ],
    insight: '技能越装越多，Token 不线性增长——按需加载是关键',
  },
  {
    id: 'node', name: 'Node', sub: '执行节点 · 命令执行', icon: Server, cat: 'harness',
    analogy: 'Agent 的手脚 — 实际干活的车间',
    bullets: [
      '工具执行层：运行命令、读写文件、调 API',
      'Agent 持久化：长期运行不中断',
      '节点任务分配：多设备协同',
      '沙箱隔离（规划中）：无状态执行，不污染宿主',
    ],
    insight: '执行与决策分离——模型负责想，Node 负责做',
  },
  {
    id: 'memory', name: 'Memory', sub: '状态存储', icon: BookOpen, cat: 'skills',
    analogy: '经验本 — 跨会话积累，越用越懂你',
    bullets: [
      'SOUL.md：人格身份（我是谁）',
      'AGENTS.md：行为规则（我该怎么做）',
      'USER.md：用户偏好（对方是谁）',
      'MEMORY.md：长期记忆（积累的知识）',
      'TOOLS.md / HEARTBEAT.md / 每日日志',
      '混合搜索：向量语义 + SQLite 关键词精确匹配',
    ],
    insight: '纯 Markdown + SQLite——人可读、可编辑、可版本控制',
  },
  {
    id: 'heartbeat', name: 'Heartbeat', sub: '定时触发 · 主动行为', icon: Heart, cat: 'harness',
    analogy: '定时巡更 — 从被动响应到主动执行',
    bullets: [
      '定时触发：默认 30 分钟唤醒一次',
      '读取 HEARTBEAT.md 任务清单',
      '无任务 → 静默（HEARTBEAT_OK，不打扰用户）',
      '有任务 → 自动执行并推送通知',
    ],
    insight: 'Agent 不必等人来问——它可以主动做',
  },
  {
    id: 'scheduler', name: 'Scheduler', sub: '任务计划 · 条件触发', icon: CalendarCheck, cat: 'harness',
    analogy: '日程管家 — 按条件自动触发，不中断主会话',
    bullets: [
      '条件触发：满足预设条件时自动执行',
      '不中断主会话：后台并行运行',
      '与 Heartbeat 协同：定期巡检 + 条件触发双保险',
    ],
    insight: '从「人找 Agent」到「Agent 找人」——自动化的最后一块拼图',
  },
];

// ── SVG 架构图数据 ──
// 四层布局：接入层 → 认知层 → 执行层 → 基础服务
interface Box { x: number; y: number; w: number; h: number }
const B: Record<string, Box> = {
  channel:   { x: 140, y: 15, w: 160, h: 36 },
  gateway:   { x: 380, y: 15, w: 160, h: 36 },
  context:   { x: 40,  y: 95, w: 155, h: 36 },
  llm:       { x: 230, y: 95, w: 155, h: 36 },
  react:     { x: 420, y: 95, w: 160, h: 36 },
  skills:    { x: 140, y: 175, w: 160, h: 36 },
  node:      { x: 380, y: 175, w: 160, h: 36 },
  memory:    { x: 55,  y: 255, w: 135, h: 36 },
  heartbeat: { x: 260, y: 255, w: 145, h: 36 },
  scheduler: { x: 470, y: 255, w: 145, h: 36 },
};

// 获取盒子中心点
const cx = (id: string) => B[id].x + B[id].w / 2;
const cy = (id: string) => B[id].y + B[id].h / 2;
const bBottom = (id: string) => B[id].y + B[id].h;
const bRight = (id: string) => B[id].x + B[id].w;
const bTop = (id: string) => B[id].y;
const bLeft = (id: string) => B[id].x;

// 连线：只有水平+垂直的直角路径
interface Edge {
  d: string;          // SVG path
  label: string;
  lx: number; ly: number; // label position
  dashed?: boolean;
  color: string;
}

const EDGES: Edge[] = [
  // ── Layer 1: Channel → Gateway (horizontal) ──
  {
    d: `M${bRight('channel')},${cy('channel')} L${bLeft('gateway')},${cy('gateway')}`,
    label: '请求', lx: 345, ly: cy('channel') - 5, color: '#3B82F6',
  },
  // ── Layer 1→2: Gateway → Context Assembly (stepped: down, left, down) ──
  {
    d: `M${cx('gateway')},${bBottom('gateway')} L${cx('gateway')},78 L${cx('context')},78 L${cx('context')},${bTop('context')}`,
    label: '路由', lx: (cx('gateway') + cx('context')) / 2, ly: 74, color: '#3B82F6',
  },
  // ── Layer 2: Context → LLM (horizontal) ──
  {
    d: `M${bRight('context')},${cy('context')} L${bLeft('llm')},${cy('llm')}`,
    label: '上下文', lx: (bRight('context') + bLeft('llm')) / 2, ly: cy('context') - 5, color: '#8B5CF6',
  },
  // ── Layer 2: LLM → ReAct Loop (horizontal) ──
  {
    d: `M${bRight('llm')},${cy('llm')} L${bLeft('react')},${cy('react')}`,
    label: '推理', lx: (bRight('llm') + bLeft('react')) / 2, ly: cy('llm') - 5, color: '#8B5CF6',
  },
  // ── Layer 2→3: ReAct Loop → Node (vertical) ──
  {
    d: `M${cx('react')},${bBottom('react')} L${cx('node')},${bTop('node')}`,
    label: '执行', lx: cx('react') + 8, ly: (bBottom('react') + bTop('node')) / 2 + 3, color: '#8B5CF6',
  },
  // ── Layer 3: Skills ↔ Node (horizontal, bidirectional) ──
  {
    d: `M${bRight('skills')},${cy('skills')} L${bLeft('node')},${cy('node')}`,
    label: '定义 / 执行', lx: 345, ly: cy('skills') - 5, color: '#10B981',
  },
  // ── Layer 3→4: Skills → Memory (stepped: down, left, down) ──
  {
    d: `M${cx('skills')},${bBottom('skills')} L${cx('skills')},238 L${cx('memory')},238 L${cx('memory')},${bTop('memory')}`,
    label: '记录', lx: (cx('skills') + cx('memory')) / 2 - 8, ly: 234, color: '#F97316',
  },
  // ── Layer 4→1: Heartbeat → Gateway (dashed: up-right-up) ──
  {
    d: `M${cx('heartbeat')},${bTop('heartbeat')} L${cx('heartbeat')},238 L620,238 L620,${cy('gateway')} L${bRight('gateway')},${cy('gateway')}`,
    label: '唤醒', lx: 616, ly: 150, color: '#94a3b8', dashed: true,
  },
  // ── Layer 2→4: ReAct Loop → Scheduler (stepped: right, down) ──
  {
    d: `M${bRight('react')},${cy('react')} L540,${cy('react')} L540,${bTop('scheduler')}`,
    label: '触发', lx: 545, ly: (cy('react') + bTop('scheduler')) / 2 + 3, color: '#94a3b8', dashed: true,
  },
];

// 层信息
const LAYERS = [
  { label: '接入层', color: '#3B82F6', y: 2, h: 62 },
  { label: '认知层', color: '#8B5CF6', y: 72, h: 62 },
  { label: '执行层', color: '#10B981', y: 162, h: 62 },
  { label: '基础服务', color: '#F59E0B', y: 242, h: 62 },
];

// ── 主流程步骤 ──
const MAIN_FLOW = [
  'Channel 接收消息',
  'Gateway 分配路由',
  'Context Assembly 组装上下文',
  'ReAct Loop 推理 → 决策',
  '调用 Skills / Node 执行',
  '结果反馈给 LLM 继续循环',
  'Memory 持久化',
];

// ── Slide 组件 ──
const Slide05_CoreTech: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  // 入场动画
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s5-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo('.s5-flow',  { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.s5-hint',  { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.7 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  // Phase 1 归类动画
  useGSAP(() => {
    if (!isActive || phase !== 1 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s5-cat-group', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  // Phase 2 详情动画
  useGSAP(() => {
    if (!isActive || phase !== 2 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s5-detail', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase, selected] });

  const selMod = MODS.find(m => m.id === selected);
  const goPhase = (p: number) => { if (p === 0) setSelected(null); setPhase(p); };

  const handleModuleClick = (id: string) => {
    if (phase === 0) { setSelected(id); setPhase(2); }
    else if (phase === 1) { setSelected(id); setPhase(2); }
    else { setSelected(id === selected ? null : id); if (id === selected) setPhase(1); }
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="s5-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        OpenClaw 核心架构
      </h2>

      {/* ═══ Phase 0：分层架构图 ═══ */}
      {phase === 0 && (
        <div className="s5-flow max-w-6xl w-full flex-1 flex gap-5 opacity-0">
          {/* 左：SVG 架构图 */}
          <div className="flex-1 min-w-0">
            <svg viewBox="0 0 660 310" className="w-full" style={{ maxHeight: 'calc(100dvh - 180px)' }}>
              <defs>
                <marker id="ah" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
                </marker>
                <marker id="ah-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#3B82F6" />
                </marker>
                <marker id="ah-p" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
                </marker>
                <marker id="ah-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
                </marker>
                <marker id="ah-o" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#F97316" />
                </marker>
              </defs>

              {/* 层背景 */}
              {LAYERS.map((l, i) => (
                <g key={i}>
                  <rect x={48} y={l.y} width={600} height={l.h} rx={6}
                    fill={`${l.color}05`} stroke={`${l.color}12`} strokeWidth={1} />
                  <text x={55} y={l.y + 12} fontSize={8} fontWeight={700} fill={`${l.color}60`} fontFamily="system-ui, sans-serif">
                    {l.label}
                  </text>
                </g>
              ))}

              {/* 连线 */}
              {EDGES.map((e, i) => {
                const markerId = e.color === '#3B82F6' ? 'ah-b' : e.color === '#8B5CF6' ? 'ah-p' : e.color === '#10B981' ? 'ah-g' : e.color === '#F97316' ? 'ah-o' : 'ah';
                return (
                  <g key={i}>
                    <path d={e.d} fill="none" stroke={e.color} strokeWidth={1.5}
                      strokeDasharray={e.dashed ? '5 3' : 'none'} opacity={e.dashed ? 0.5 : 0.55}
                      markerEnd={`url(#${markerId})`} />
                    <text x={e.lx} y={e.ly} textAnchor="middle" fontSize={8} fill={e.color} opacity={0.8} fontFamily="system-ui, sans-serif">
                      {e.label}
                    </text>
                  </g>
                );
              })}

              {/* 模块盒子 */}
              {MODS.map((mod) => {
                const b = B[mod.id];
                if (!b) return null;
                const c = CAT[mod.cat].color;
                return (
                  <g key={mod.id}
                    onClick={() => handleModuleClick(mod.id)}
                    style={{ cursor: 'pointer' }}
                    className="s5-box">
                    <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6}
                      fill={`${c}0A`} stroke={`${c}60`} strokeWidth={1.5} />
                    {/* icon placeholder — 用文字 emoji 代替 */}
                    <text x={b.x + 10} y={cy(mod.id) + 4} fontSize={12} dominantBaseline="middle">
                      {mod.id === 'channel' ? '📡' : mod.id === 'gateway' ? '🌐' : mod.id === 'context' ? '🎒' : mod.id === 'react' ? '⚡' : mod.id === 'llm' ? '🧠' : mod.id === 'skills' ? '📦' : mod.id === 'node' ? '🖥️' : mod.id === 'memory' ? '📖' : mod.id === 'heartbeat' ? '💓' : '📅'}
                    </text>
                    <text x={b.x + 26} y={cy(mod.id) - 3} fontSize={10} fontWeight={700} fill={c} dominantBaseline="middle" fontFamily="system-ui, sans-serif">
                      {mod.name}
                    </text>
                    <text x={b.x + 26} y={cy(mod.id) + 10} fontSize={7} fill={`${c}99`} dominantBaseline="middle" fontFamily="system-ui, sans-serif">
                      {mod.sub}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* 图例 */}
            <div className="flex items-center justify-center gap-5 mt-1">
              {Object.values(CAT).map((cat, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-sm" style={{ backgroundColor: cat.color }} />
                  <span className="text-[10px] text-[var(--text-light)]">{cat.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <span className="w-4 border-t border-dashed" style={{ borderColor: '#94a3b8' }} />
                <span className="text-[10px] text-[var(--text-light)]">后台/反馈</span>
              </div>
            </div>
          </div>

          {/* 右：主流程说明 */}
          <div className="w-52 shrink-0 flex flex-col gap-3">
            <div className="rounded-xl border p-3.5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-caption font-bold text-[var(--text-primary)] mb-2.5">主流程（会话级）</p>
              <div className="space-y-1.5">
                {MAIN_FLOW.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[10px] font-bold shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)', fontSize: 8 }}>{i + 1}</span>
                    <span className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-3.5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-caption font-bold text-[var(--text-primary)] mb-1.5">并行流程（后台）</p>
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                Heartbeat：30min 定时巡检<br />
                Scheduler：条件触发，不中断主会话
              </p>
            </div>
            <button className="w-full py-2 rounded-lg border-2 text-body-sm font-bold transition-all"
              style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)08', color: 'var(--primary)' }}
              onClick={() => goPhase(1)}>
              <Layers size={14} className="inline mr-1" />按分类归组 →
            </button>
          </div>
        </div>
      )}

      {/* ═══ Phase 1：分类归组 ═══ */}
      {phase === 1 && (
        <div className="s5-cat-group max-w-6xl w-full grid grid-cols-3 gap-5 opacity-0">
          {(['harness', 'agent', 'skills'] as const).map((catKey) => {
            const cat = CAT[catKey];
            const CatIcon = cat.icon;
            const mods = MODS.filter(m => m.cat === catKey);
            return (
              <div key={catKey} className="rounded-xl border-2 p-4" style={{ borderColor: `${cat.color}50`, backgroundColor: `${cat.color}04` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <CatIcon size={16} style={{ color: cat.color }} />
                  </div>
                  <span className="text-body font-bold" style={{ color: cat.color }}>{cat.label}</span>
                </div>
                <div className="space-y-2">
                  {mods.map((mod) => {
                    const Icon = mod.icon;
                    return (
                      <div key={mod.id}
                        className="flex items-center gap-2.5 rounded-lg border p-2.5 cursor-pointer transition-all duration-200 hover:shadow-md"
                        style={{ borderColor: `${cat.color}40`, backgroundColor: `${cat.color}06` }}
                        onClick={() => handleModuleClick(mod.id)}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${cat.color}12` }}>
                          <Icon size={14} style={{ color: cat.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-body-sm font-bold block" style={{ color: cat.color }}>{mod.name}</span>
                          <span className="text-[10px] text-[var(--text-light)]">{mod.sub}</span>
                        </div>
                        <ChevronRight size={14} style={{ color: cat.color, opacity: 0.4 }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ Phase 2：模块详情 ═══ */}
      {phase === 2 && selMod && (
        <div className="s5-detail max-w-6xl w-full grid grid-cols-1 md:grid-cols-5 gap-4 opacity-0">
          {/* 左：所属分类 */}
          <div className="md:col-span-2 rounded-xl border-2 p-4"
            style={{ borderColor: `${CAT[selMod.cat].color}40`, backgroundColor: `${CAT[selMod.cat].color}04` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${CAT[selMod.cat].color}15` }}>
                {(() => { const I = CAT[selMod.cat].icon; return <I size={14} style={{ color: CAT[selMod.cat].color }} />; })()}
              </div>
              <span className="text-body-sm font-bold" style={{ color: CAT[selMod.cat].color }}>{CAT[selMod.cat].label}</span>
            </div>
            <div className="space-y-1.5">
              {MODS.filter(m => m.cat === selMod.cat).map((mod) => {
                const Icon = mod.icon;
                const c = CAT[mod.cat].color;
                const isSel = mod.id === selMod.id;
                return (
                  <div key={mod.id}
                    className={`flex items-center gap-2 rounded-lg border p-2 cursor-pointer transition-all duration-200 ${isSel ? 'ring-1' : ''}`}
                    style={{ borderColor: isSel ? c : `${c}30`, backgroundColor: isSel ? `${c}10` : 'transparent' }}
                    onClick={() => setSelected(mod.id)}>
                    <Icon size={13} style={{ color: c }} />
                    <span className={`text-caption ${isSel ? 'font-bold' : ''}`} style={{ color: isSel ? c : 'var(--text-secondary)' }}>{mod.name}</span>
                    {isSel && <span className="ml-auto text-[9px] px-1 rounded" style={{ backgroundColor: `${c}15`, color: c }}>当前</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右：详情 */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="rounded-xl border-2 p-4"
              style={{ borderColor: `${CAT[selMod.cat].color}50`, backgroundColor: `${CAT[selMod.cat].color}06` }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${CAT[selMod.cat].color}15` }}>
                  <selMod.icon size={20} style={{ color: CAT[selMod.cat].color }} />
                </div>
                <div>
                  <span className="text-body font-bold" style={{ color: CAT[selMod.cat].color }}>{selMod.name}</span>
                  <span className="text-caption text-[var(--text-light)] ml-1.5">{selMod.sub}</span>
                </div>
              </div>
              <p className="text-body-sm text-[var(--text-secondary)] italic">{selMod.analogy}</p>
            </div>
            <div className="rounded-xl border p-4 flex-1"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
              <ul className="space-y-2">
                {selMod.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-body-sm text-[var(--text-secondary)]">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CAT[selMod.cat].color }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 p-3.5"
              style={{ borderColor: CAT[selMod.cat].color, backgroundColor: `${CAT[selMod.cat].color}08`, boxShadow: `0 0 16px ${CAT[selMod.cat].color}10` }}>
              <p className="text-caption font-bold mb-1" style={{ color: CAT[selMod.cat].color }}>核心洞察</p>
              <p className="text-body-sm text-[var(--text-primary)] font-semibold">{selMod.insight}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── 底部导航 ── */}
      <div className="s5-hint mt-auto pt-3 flex items-center justify-center gap-3 opacity-0">
        {phase === 1 && (
          <button className="px-4 py-2 rounded-lg border-2 text-body-sm font-bold transition-all"
            style={{ borderColor: 'var(--text-light)', backgroundColor: 'transparent', color: 'var(--text-light)' }}
            onClick={() => goPhase(0)}>
            ← 返回架构图
          </button>
        )}
        {phase === 2 && (
          <button className="px-4 py-2 rounded-lg border-2 text-body-sm font-bold transition-all"
            style={{ borderColor: 'var(--text-light)', backgroundColor: 'transparent', color: 'var(--text-light)' }}
            onClick={() => goPhase(1)}>
            ← 返回分类视图
          </button>
        )}
        <span className="text-caption text-[var(--text-light)]">
          {phase === 0 ? '点击模块查看详情' : phase === 1 ? '点击模块查看详情' : '点击左侧切换模块'}
        </span>
      </div>
    </section>
  );
};

export default memo(Slide05_CoreTech);
